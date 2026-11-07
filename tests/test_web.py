import unittest
from web import create_app
class WebTests(unittest.TestCase):
 def setUp(self): self.client=create_app().test_client()
 def test_routes(self):
  for p in ['/', '/api/health','/api/meta','/api/equipment','/api/overview','/api/compare','/api/sources','/static/app.js','/static/world.json']:
   with self.subTest(path=p):
    with self.client.get(p) as response: self.assertEqual(response.status_code,200)
 def test_records(self):
  self.assertEqual(self.client.get('/api/equipment').json['count'],149)
  self.assertEqual(self.client.get('/api/equipment?models_only=1').json['count'],4)
  r=self.client.get('/api/equipment/eq_8c235db6029020c94826').json
  self.assertEqual(r['delivered_quantity'],36)
  self.assertEqual(r['estimated_rows'],2)
  self.assertEqual(r['delivery_years'],[2019,2020,2021,2022])
 def test_filters(self):
  self.assertEqual(self.client.get('/api/equipment?q=Rafale').json['count'],1)
  self.assertEqual(self.client.get('/api/equipment?q=nonexistentxyz').json['count'],0)
  for p in ['/api/overview?recipient=china','/api/overview?period=bad','/api/compare?before=2021-2025&after=2011-2015']:
   self.assertEqual(self.client.get(p).status_code,400)
  self.assertEqual(self.client.get('/api/equipment/missing').status_code,404)
 def test_metrics(self):
  s=self.client.get('/api/overview').json['summary']
  self.assertAlmostEqual(s['total_tiv_million'],12665.76)
  self.assertAlmostEqual(s['top_supplier_share'],.39557831507939517)
  self.assertEqual(len(self.client.get('/api/sources').json['sources']),9)
if __name__=='__main__': unittest.main()
