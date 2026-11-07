"""Reproducible retrospective anomaly detection; never trains on review years."""
import hashlib
import json
import math
from pathlib import Path

import duckdb
import numpy as np
import sklearn
from sklearn.ensemble import IsolationForest

ROOT = Path(__file__).resolve().parents[1]
FEATURES = ['absolute_share_change_pp', 'signed_log_volume_ratio', 'log_absolute_volume_change']


def transitions(series):
    """Use explicit complete annual grids; do not impute unavailable years."""
    totals = {}
    for row in series:
        key = (row['recipient'], row['year'])
        totals[key] = totals.get(key, 0) + row['volume']
    index = {(r['recipient'], r['supplier_id'], r['year']): r for r in series}
    result = []
    for now in series:
        prev = index.get((now['recipient'], now['supplier_id'], now['year'] - 1))
        if prev is None or max(now['volume'], prev['volume']) == 0:
            continue
        before_total = totals[(now['recipient'], prev['year'])]
        after_total = totals[(now['recipient'], now['year'])]
        if before_total <= 0 or after_total <= 0:
            continue
        before = 100 * prev['volume'] / before_total
        after = 100 * now['volume'] / after_total
        delta = after - before
        volume_delta = now['volume'] - prev['volume']
        result.append(dict(now, previous_volume=prev['volume'], previous_share=before,
                           share=after, share_change_pp=delta, volume_change=volume_delta,
                           previous_total=before_total, total=after_total,
                           features=[abs(delta), math.log1p(now['volume']) - math.log1p(prev['volume']),
                                     math.log1p(abs(volume_delta))]))
    return sorted(result, key=lambda r: (r['year'], r['recipient'], r['supplier_id']))


def load_series():
    with duckdb.connect(str(ROOT/'data/processed/armsflow.duckdb'), read_only=True) as db:
        records = db.execute("""SELECT s.start_year,s.supplier_id,e.display_label,s.recorded_tiv_million
          FROM metric_period_shares s JOIN entity e ON e.entity_id=s.supplier_id
          WHERE recipient_id='india' AND period_kind='annual' ORDER BY start_year,supplier_id""").fetchall()
    result = []
    for year, supplier_id, supplier, volume in records:
        if volume is None:
            raise ValueError('Unavailable India TIV must be resolved before training.')
        result.append(dict(recipient='india', year=year, supplier_id=supplier_id,
                           supplier=supplier, volume=float(volume)))
    extra = json.loads((ROOT/'data/processed/additional_recipients.json').read_text())
    for country in ('russia', 'united_states'):
        for row in extra[country]['items']:
            assert len(row['values']) == 16
            for year, value in enumerate(row['values'], 2010):
                # Source blank = no identified deliveries, not missing collection.
                result.append(dict(recipient=country, year=year, supplier_id=row['supplier_id'],
                                   supplier=row['supplier'], volume=float(value or 0)))
    return result


def build():
    series = load_series()
    rows = transitions(series)
    train = [r for r in rows if 2011 <= r['year'] <= 2020]
    review = [r for r in rows if 2021 <= r['year'] <= 2025]
    x_train = np.array([r['features'] for r in train])
    x_review = np.array([r['features'] for r in review])
    if len(train) < 100 or not review:
        raise ValueError('Insufficient historical transitions.')
    model = IsolationForest(n_estimators=300, max_samples='auto', contamination='auto', random_state=42, n_jobs=1)
    model.fit(x_train)
    train_scores = -model.score_samples(x_train)
    scores = -model.score_samples(x_review)
    threshold = float(np.quantile(train_scores, .95))
    flagged_sets = []
    for seed in (7, 21, 42):
        alternate = IsolationForest(n_estimators=300, random_state=seed, n_jobs=1).fit(x_train)
        cutoff = np.quantile(-alternate.score_samples(x_train), .95)
        flagged_sets.append(set(np.where(-alternate.score_samples(x_review) >= cutoff)[0].tolist()))
    stability = []
    for a, b in ((0, 1), (0, 2), (1, 2)):
        union = flagged_sets[a] | flagged_sets[b]
        stability.append(len(flagged_sets[a] & flagged_sets[b]) / len(union) if union else 1.)
    for row, score in zip(review, scores):
        row.update(anomaly_score=float(score), flagged=bool(score >= threshold),
                   baseline_flag=abs(row['share_change_pp']) >= 10,
                   unusualness_percentile=float(100 * np.mean(train_scores <= score)))
        row['evidence'] = (f"Supplier share changed from {row['previous_share']:.1f}% to {row['share']:.1f}% "
                           f"({row['share_change_pp']:+.1f} percentage points). Recorded volume changed from "
                           f"{row['previous_volume']:.2f} to {row['volume']:.2f} million TIV.")
        row['evidence'] += (f" Recipient total: {row['previous_total']:.2f} to {row['total']:.2f} million TIV."
                            + (' Small import totals can amplify percentage changes.' if min(row['previous_total'], row['total']) < 50 else ''))
    review.sort(key=lambda r: -r['anomaly_score'])
    report = dict(model='Isolation Forest', status='Experimental retrospective pilot',
                  sklearn_version=sklearn.__version__, features=FEATURES, seed=42, trees=300,
                  training_years=[2011, 2020], review_years=[2021, 2025],
                  training_rows=len(train), review_rows=len(review), threshold=threshold,
                  threshold_basis='95th percentile of training anomaly scores; analyst review threshold',
                  model_flags=sum(r['flagged'] for r in review),
                  baseline_flags=sum(r['baseline_flag'] for r in review),
                  overlap_flags=sum(r['flagged'] and r['baseline_flag'] for r in review),
                  mean_seed_jaccard=float(np.mean(stability)),
                  training_counts={c: sum(r['recipient'] == c for r in train) for c in ('india','russia','united_states')},
                  source_sha256={str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest()
                                 for p in [ROOT/'data/processed/armsflow.duckdb',ROOT/'data/processed/additional_recipients.json']},
                  limitations=[
                      'No ground-truth anomaly labels: precision, recall and real-world accuracy are not established.',
                      'Unusualness percentile is a ranking against training scores, not a probability or confidence.',
                      'A pooled three-recipient model may reflect recipient size and delivery schedules; it does not infer political causes.',
                      'Historical 2010-2025 snapshot, not live intelligence or a forecast. Later source revisions may affect historical values.',
                      'India uses delivery-register precision; Russia and US use rounded annual TIV. Blanks mean no identified deliveries, rounded zeros can hide small flows.',
                      'Unknown suppliers remain in totals and may receive review flags. TIV is neither currency nor weapon count.'
                  ], rows=review)
    destination = ROOT/'data/processed/ml_insights.json'
    destination.write_text(json.dumps(report, indent=2, allow_nan=False), encoding='utf-8')
    (ROOT/'reports/ml_evaluation.json').write_text(json.dumps({k:v for k,v in report.items() if k!='rows'}, indent=2), encoding='utf-8')
    print(json.dumps({k:report[k] for k in ['training_rows','review_rows','model_flags','baseline_flags','overlap_flags','mean_seed_jaccard']}))
    return report


if __name__ == '__main__':
    build()
