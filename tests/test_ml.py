import json
import unittest
import numpy as np
from sklearn.ensemble import IsolationForest
from pipeline.ml_insights import ROOT, load_series, transitions
from web import create_app


class MLTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.result = json.loads((ROOT/'data/processed/ml_insights.json').read_text())
        cls.series = load_series()

    def test_source_grid_and_reconciliation(self):
        grid = {}
        for r in self.series:
            grid.setdefault((r['recipient'],r['supplier_id']), []).append(r['year'])
            self.assertGreaterEqual(r['volume'], 0)
        for years in grid.values():
            self.assertEqual(sorted(years),list(range(2010,2026)))
        india_total = sum(r['volume'] for r in self.series if r['recipient']=='india' and r['year']>=2021)
        self.assertAlmostEqual(india_total,12665.76)

    def test_share_explanation_and_zero_handling(self):
        def row(s,y,v):return dict(recipient='x',supplier_id=s,supplier=s,year=y,volume=v)
        data=[row('a',2020,1),row('b',2020,0),row('a',2021,1),row('b',2021,5)]
        a=next(r for r in transitions(data) if r['supplier_id']=='a')
        self.assertAlmostEqual(a['share_change_pp'],-83.3333333333)
        self.assertEqual(a['volume_change'],0)
        self.assertEqual(a['features'][1],0)
        self.assertEqual(transitions([row('a',2020,0),row('a',2021,0)]),[])
        self.assertEqual(transitions([row('a',2020,1),row('a',2022,5)]),[])

    def test_training_unchanged_by_future_values(self):
        original=[r['features'] for r in transitions(self.series) if r['year']<=2020]
        altered=[dict(r,volume=r['volume']*100 if r['year']>=2021 else r['volume']) for r in self.series]
        changed=[r['features'] for r in transitions(altered) if r['year']<=2020]
        self.assertEqual(original,changed)

    def test_reproduce_threshold_and_scores(self):
        all_rows=transitions(self.series)
        train=np.array([r['features'] for r in all_rows if 2011<=r['year']<=2020])
        model=IsolationForest(n_estimators=300,random_state=42,n_jobs=1).fit(train)
        threshold=float(np.quantile(-model.score_samples(train),.95))
        self.assertAlmostEqual(threshold,self.result['threshold'])
        scores=-model.score_samples(np.array([r['features'] for r in self.result['rows']]))
        for row,score in zip(self.result['rows'],scores):
            self.assertIn(row['year'],range(2021,2026))
            self.assertAlmostEqual(score,row['anomaly_score'])
            self.assertEqual(row['flagged'],score>=threshold)

    def test_api_filters(self):
        client=create_app().test_client()
        for country in ['india','russia','united_states']:
            response=client.get('/api/insights?recipient='+country+'&year=2022')
            self.assertEqual(response.status_code,200)
            for r in response.json['rows']:
                self.assertEqual(r['recipient'],country)
                self.assertEqual(r['year'],2022)
        self.assertEqual(client.get('/api/insights?year=2020').status_code,400)
        self.assertEqual(client.get('/api/insights?recipient=invalid').status_code,400)


if __name__=='__main__': unittest.main()
