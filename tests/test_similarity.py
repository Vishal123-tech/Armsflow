import json
from decimal import Decimal
import unittest
import numpy as np
from pipeline.similarity import ROOT, load_records, aggregate, make_profiles, rank_profiles
from web import create_app


class SimilarityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data=json.loads((ROOT/'data/processed/supplier_similarity.json').read_text())

    def test_source_and_conservation(self):
        records=load_records()
        self.assertEqual(len(records),4761)
        self.assertEqual({r['year'] for r in records},set(range(2021,2026)))
        self.assertEqual(len({(r['deal_id'],r['year']) for r in records}),len(records))
        matrix=aggregate(records)
        self.assertEqual(sum(r['volume'] for r in records),sum(sum(v.values()) for v in matrix.values()))
        self.assertAlmostEqual(float(sum(matrix['India'].values())),12665.76)
        self.assertEqual(len(matrix),170)

    def test_eligibility_and_unknown_normalization(self):
        profiles,excluded=make_profiles({'A':{'X':Decimal(100),'unknown supplier(s)':Decimal(10)},
            'B':{'X':Decimal(100),'unknown supplier(s)':Decimal(20)},
            'Tiny':{'X':Decimal(99)},'Actor*':{'X':Decimal(1000)}})
        self.assertEqual(set(profiles),{'A'})
        self.assertEqual(profiles['A']['shares'],{'X':1.})
        self.assertEqual(profiles['A']['total_tiv'],110.)
        self.assertEqual(len(excluded),3)

    def test_distance_extremes_and_scale_invariance(self):
        p={'A':{'shares':{'x':1.}},'B':{'shares':{'x':1.}},'C':{'shares':{'y':1.}}}
        neighbors,_=rank_profiles(p)
        self.assertEqual(neighbors['A'][0]['country'],'B')
        self.assertAlmostEqual(neighbors['A'][0]['similarity'],100.)
        self.assertAlmostEqual(neighbors['A'][1]['similarity'],0.)
        matrix={'A':{'x':Decimal(100),'y':Decimal(200)},'B':{'x':Decimal(1000),'y':Decimal(2000)}}
        profiles,_=make_profiles(matrix)
        self.assertEqual(profiles['A']['shares'],profiles['B']['shares'])

    def test_neighbor_order_independent_formula(self):
        profiles=self.data['profiles']
        for name,p in profiles.items():
            self.assertAlmostEqual(sum(p['shares'].values()),1.)
            self.assertNotIn(name,[r['country'] for r in p['neighbors']])
            self.assertEqual(len(p['neighbors']),5)
            candidates=[]
            for other,q in profiles.items():
                if other==name:continue
                suppliers=set(p['shares'])|set(q['shares'])
                distance=np.sqrt(sum((np.sqrt(p['shares'].get(s,0))-np.sqrt(q['shares'].get(s,0)))**2 for s in suppliers)/2)
                candidates.append((round(float(distance),12),other))
            expected=[name for d,name in sorted(candidates)[:5]]
            self.assertEqual(expected,[r['country'] for r in p['neighbors']])
            self.assertTrue(p['stability'] is None or 0<=p['stability']<=1)

    def test_api_and_invalid_recipient(self):
        client=create_app().test_client()
        for country in ['India','United States','China']:
            response=client.get('/api/similarity',query_string={'recipient':country})
            self.assertEqual(response.status_code,200)
            self.assertEqual(response.json['selected']['country'],country)
            self.assertEqual(len(response.json['matches']),5)
            self.assertEqual(len(response.json['countries']),80)
        self.assertEqual(client.get('/api/similarity?recipient=invalid').status_code,400)
        self.assertEqual(client.get('/api/similarity?recipient=African%20Union**').status_code,400)


if __name__=='__main__':unittest.main()
