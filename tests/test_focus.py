import unittest
from decimal import Decimal
from pipeline.clean import read_export
from web import create_app
from web.countries import COUNTRIES
from web.focus_data import data, spending

class FocusTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client=create_app().test_client()
        cls.raw=read_export("data/raw/sipri_global_transfer_register_2010_2025.csv","SIPRI AT Database ID")

    def test_country_totals_against_source(self):
        for cid,name in COUNTRIES.items():
            expected=sum((Decimal(r[15]) for _,r in self.raw.rows if r[2]==name and 2021<=int(r[10])<=2025),Decimal(0))
            response=self.client.get('/api/overview?recipient='+cid)
            self.assertEqual(response.status_code,200)
            self.assertAlmostEqual(response.json['summary']['total_tiv_million'],float(expected),places=5)
            self.assertIn(response.json['summary']['metric_status'],('ok','no_recorded_imports'))
            if expected:
                self.assertAlmostEqual(sum(s['share_percent'] for s in response.json['suppliers']),100)

    def test_equipment_scope_and_detail(self):
        for cid,name in COUNTRIES.items():
            response=self.client.get('/api/equipment?recipient='+cid)
            expected=len({(r[3],r[4],r[5]) for _,r in self.raw.rows if r[2]==name})
            self.assertEqual(response.json['count'],expected)
            item=response.json['items'][0]
            detail=self.client.get('/api/equipment/'+item['equipment_id']+'?recipient='+cid)
            self.assertEqual(detail.status_code,200)
            self.assertEqual(detail.json['recipient'],name)
            keys={(r[0],int(r[10])) for _,r in self.raw.rows if r[2]==name}
            self.assertTrue(all((r['sipri_deal_id'],r['delivery_year']) in keys for r in detail.json['deliveries']))

    def test_absence_is_not_zero_capability(self):
        value=self.client.get('/api/overview?recipient=north_korea').json
        self.assertEqual(value['summary']['total_tiv_million'],0)
        self.assertIsNone(value['summary']['hhi'])
        self.assertIsNone(value['summary']['top_supplier_share'])
        self.assertIsNone(spending('north_korea')['series'][-1]['current_usd_million'])
        self.assertEqual(spending('china')['series'][-1]['current_usd_million_status'],'estimate')

    def test_shared_designations_do_not_mix_recipients(self):
        for cid in ('china','pakistan','ukraine'):
            for eid,item in data()['countries'][cid]['equipment'].items():
                self.assertEqual(item['recipient'],COUNTRIES[cid])
                self.assertTrue(all(2010<=r['delivery_year']<=2025 for r in item['deliveries']))
        meta=self.client.get('/api/meta').json
        self.assertEqual(len(meta['nuclear_armed_states']),9)
        self.assertNotIn('ukraine',meta['nuclear_armed_states'])

if __name__=='__main__': unittest.main()
