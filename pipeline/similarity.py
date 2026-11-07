"""Step 6: reproducible supplier-share nearest neighbours from a global register."""
from collections import defaultdict
from decimal import Decimal
import hashlib
import json
from pathlib import Path

import duckdb
import numpy as np
import sklearn
from sklearn.neighbors import NearestNeighbors
from .clean import REGISTER_HEADER, number, read_export

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT/'data/raw/sipri_global_transfer_register_2021_2025.csv'
MIN_TIV = 100
MAX_UNKNOWN = .10


def load_records(path=SOURCE):
    export = read_export(path, 'SIPRI AT Database ID')
    if export.header != REGISTER_HEADER:
        raise ValueError('Unexpected global register schema.')
    seen, records = set(), []
    for line, cells in export.rows:
        r = dict(zip(export.header, cells))
        year = int(r['Delivery year'])
        if not 2021 <= year <= 2025:
            raise ValueError('Delivery outside selected period.')
        key = (r['SIPRI AT Database ID'], year)
        if key in seen:
            raise ValueError('Duplicate deal/year; refusing double counting.')
        seen.add(key)
        value = number(r['TIV delivery values'], required=True)
        records.append(dict(recipient=r['Recipient'], supplier=r['Supplier'], year=year,
                            volume=value, deal_id=key[0], source_line=line))
    return records


def aggregate(records, omit_year=None):
    matrix = defaultdict(lambda: defaultdict(Decimal))
    for r in records:
        if r['year'] != omit_year:
            matrix[r['recipient']][r['supplier']] += r['volume']
    return matrix


def make_profiles(matrix):
    profiles, excluded = {}, []
    for country, values in sorted(matrix.items()):
        total = float(sum(values.values()))
        unknown = float(sum(v for s, v in values.items() if s.lower().startswith('unknown')))
        known = total - unknown
        reason = None
        if '*' in country or country.lower().startswith('unknown'):
            reason = 'Non-state, international-organization or unidentified recipient'
        elif total <= 0 or known < MIN_TIV:
            reason = 'Less than 100 million identified-supplier TIV in this period'
        elif unknown / total > MAX_UNKNOWN:
            reason = 'More than 10% of recorded TIV has an unknown supplier'
        if reason:
            excluded.append(dict(country=country, reason=reason, total_tiv=total))
            continue
        profiles[country] = dict(country=country, total_tiv=total, known_tiv=known,
            unknown_share=unknown/total, supplier_count=sum(v>0 for s,v in values.items() if not s.lower().startswith('unknown')),
            shares={s:float(v)/known for s,v in sorted(values.items()) if v>0 and not s.lower().startswith('unknown')})
    return profiles, excluded


def rank_profiles(profiles, limit=5):
    countries = sorted(profiles)
    suppliers = sorted({s for p in profiles.values() for s in p['shares']})
    shares = np.array([[profiles[c]['shares'].get(s,0) for s in suppliers] for c in countries])
    if len(countries) < 2:
        raise ValueError('Need at least two eligible profiles.')
    # Euclidean distance on square-root shares / sqrt(2) = Hellinger distance.
    model = NearestNeighbors(metric='euclidean', algorithm='brute', n_jobs=1).fit(np.sqrt(shares))
    distances, indices = model.kneighbors(np.sqrt(shares), n_neighbors=len(countries))
    neighbors = {}
    for i, country in enumerate(countries):
        candidates = [(min(1., max(0.,float(d)/np.sqrt(2))), countries[j])
                      for d,j in zip(distances[i],indices[i]) if j != i]
        candidates.sort(key=lambda x:(round(x[0],12),x[1]))
        neighbors[country] = [dict(country=c, distance=d, similarity=100*(1-d)) for d,c in candidates[:limit]]
    return neighbors, suppliers


def build():
    records = load_records()
    matrix = aggregate(records)
    profiles, excluded = make_profiles(matrix)
    neighbors, suppliers = rank_profiles(profiles)
    # Independent comparison with the already-verified India pilot.
    with duckdb.connect(str(ROOT/'data/processed/armsflow.duckdb'),read_only=True) as db:
        old = db.execute("""SELECT e.display_label,s.recorded_tiv_million FROM metric_period_shares s
          JOIN entity e ON e.entity_id=s.supplier_id WHERE recipient_id='india' AND period_id='2021-2025'""").fetchall()
    diffs = {s:abs(float(matrix['India'].get(s,0))-float(v)) for s,v in old}
    extra_india = set(matrix['India'])-{s for s,v in old}
    if max(diffs.values(),default=0)>1e-6 or any(matrix['India'][s]>0 for s in extra_india):
        raise ValueError('Global register differs from verified India pilot; review before publishing results.')
    stability = {c:[] for c in profiles}
    for year in range(2021,2026):
        reduced_matrix = aggregate(records,omit_year=year)
        # Keep the full-period eligible cohort fixed. Normalize remaining known volume.
        reduced = {}
        for c in profiles:
            known = {s:float(v) for s,v in reduced_matrix[c].items() if not s.lower().startswith('unknown') and v>0}
            total = sum(known.values())
            if total>0:
                reduced[c] = dict(shares={s:v/total for s,v in known.items()})
        reduced_neighbors,_ = rank_profiles(reduced)
        for c in profiles:
            if c not in reduced_neighbors:
                continue
            base={r['country'] for r in neighbors[c]}
            new={r['country'] for r in reduced_neighbors[c]}
            stability[c].append(len(base & new)/len(base))
    # A simple cosine-share comparator exposes sensitivity to the chosen distance.
    countries=sorted(profiles)
    x=np.array([[profiles[c]['shares'].get(s,0) for s in suppliers] for c in countries])
    cos=NearestNeighbors(metric='cosine',algorithm='brute').fit(x)
    ds,ix=cos.kneighbors(x,n_neighbors=len(countries))
    cosine_overlap=[]
    for i,c in enumerate(countries):
        ranked=sorted([(round(float(d),12),countries[j]) for d,j in zip(ds[i],ix[i]) if j!=i])[:5]
        base={r['country'] for r in neighbors[c]}
        cosine_overlap.append(len(base & {v[1] for v in ranked})/5)
    for country,profile in profiles.items():
        profile['neighbors']=neighbors[country]
        profile['stability']=float(np.mean(stability[country])) if stability[country] else None
        profile['stability_runs']=len(stability[country])
        profile['top_suppliers']=[dict(supplier=s,share=v) for s,v in sorted(profile['shares'].items(),key=lambda x:(-x[1],x[0]))[:5]]
        for neighbor in profile['neighbors']:
            other=profiles[neighbor['country']]
            shared=sorted(set(profile['shares']) & set(other['shares']),key=lambda s:-min(profile['shares'][s],other['shares'][s]))
            neighbor['shared_suppliers']=[dict(supplier=s,selected_share=profile['shares'][s],neighbor_share=other['shares'][s]) for s in shared[:4]]
    report=dict(period='2021-2025',model='NearestNeighbors with Hellinger distance',sklearn_version=sklearn.__version__,
                source=dict(publisher='SIPRI Arms Transfers Database',url='https://armstransfers.sipri.org/ArmsTransfer/TransferRegister',
                            retrieved='2026-11-07',path=SOURCE.relative_to(ROOT).as_posix(),sha256=hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
                            filters='All recipients and suppliers; 2021-2025; deliveries broken down by year; only deliveries in range'),
                register_rows=len(records),source_recipient_count=len(matrix),eligible_count=len(profiles),supplier_dimensions=len(suppliers),
                minimum_known_tiv=MIN_TIV,maximum_unknown_share=MAX_UNKNOWN,
                india_reconciliation_max_difference=max(diffs.values()),
                mean_leave_year_out_overlap=float(np.mean([v for values in stability.values() for v in values])),
                mean_cosine_top5_overlap=float(np.mean(cosine_overlap)),excluded=excluded,
                limitations=[
                    'Similarity describes the mix of recorded foreign suppliers, not alliances, political alignment, military strength or domestic production.',
                    'This is descriptive unsupervised nearest-neighbor retrieval, not a predictive model or calibrated probability.',
                    'Profiles sum 2021-2025 delivery TIV before normalization. Procurement timing can change neighbors; review leave-one-year-out stability.',
                    'Eligibility requires at least 100 million known-supplier TIV and at most 10% unknown-supplier share. These are display-quality choices, not statistical guarantees.',
                    'Unknown suppliers remain in reported totals but are removed from the similarity vectors, which are renormalized over identified suppliers.',
                    'Names and recipient designations follow the source. Non-state actors and organizations marked with an asterisk, and unidentified recipients, are excluded.',
                    'No recorded supplier flow is represented by zero in the vectors. Missing TIV or duplicate deal/year rows fail the build. TIV is neither money nor weapon count.',
                    'The same 2021-2025 snapshot is used to fit and query the retrieval index. Stability and distance comparisons are sensitivity checks, not prediction accuracy.'
                ],profiles=profiles)
    (ROOT/'data/processed/supplier_similarity.json').write_text(json.dumps(report,indent=2,allow_nan=False),encoding='utf-8')
    (ROOT/'reports/similarity_validation.json').write_text(json.dumps({k:v for k,v in report.items() if k!='profiles'},indent=2),encoding='utf-8')
    print(json.dumps({k:report[k] for k in ['register_rows','source_recipient_count','eligible_count','supplier_dimensions','mean_leave_year_out_overlap','mean_cosine_top5_overlap']}))
    return report


if __name__=='__main__':build()
