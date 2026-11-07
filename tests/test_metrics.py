"""Hand-calculated cases test SQL metrics independently of the India dataset."""
from decimal import Decimal
from pathlib import Path
import shutil
import tempfile
import unittest

import duckdb
from pipeline.build_database import ROOT
from pipeline.build_metrics import build_metrics, install


class MetricCases(unittest.TestCase):
    def setUp(self):
        self.con=duckdb.connect()
        self.addCleanup(self.con.close)
        self.con.execute("""
            CREATE TABLE entity(entity_id VARCHAR,display_label VARCHAR,entity_type VARCHAR);
            CREATE TABLE bilateral_annual(source_id VARCHAR,recipient_id VARCHAR,supplier_id VARCHAR,
                delivery_year INTEGER,tiv_million DECIMAL(18,6),coverage_status VARCHAR);
            CREATE TABLE transfer_deal(source_id VARCHAR,sipri_deal_id VARCHAR,recipient_id VARCHAR,supplier_id VARCHAR);
            CREATE TABLE delivery(source_id VARCHAR,sipri_deal_id VARCHAR,delivery_year INTEGER,tiv_delivered_million DECIMAL(18,6));
        """)

    def fixture(self, values, periods=None, comparisons=None):
        """values maps supplier -> {year: TIV}; None explicitly means no identified delivery."""
        for supplier,years in values.items():
            self.con.execute("INSERT INTO entity VALUES (?,?,?)",[supplier,supplier,"unknown" if supplier=="unknown_supplier" else "country"])
            for year,value in years.items():
                status="no_identified_deliveries" if value is None else "rounded_zero" if value==0 else "reported_value"
                self.con.execute("INSERT INTO bilateral_annual VALUES ('sipri_india_annual','india',?,?,?,?)",[supplier,year,value,status])
                if value is not None:
                    deal=f"{supplier}-{year}"
                    self.con.execute("INSERT INTO transfer_deal VALUES ('sipri_india_register',?,'india',?)",[deal,supplier])
                    self.con.execute("INSERT INTO delivery VALUES ('sipri_india_register',?,?,?)",[deal,year,value])
        install(self.con,periods=periods or [("one",2010,2010,"test")],comparisons=comparisons or [])

    def test_hand_calculated_shares_hhi_and_unknown_volume(self):
        self.fixture({"a":{2010:6},"b":{2010:3},"unknown_supplier":{2010:1}})
        shares=dict(self.con.execute("SELECT supplier_id,share FROM metric_period_shares").fetchall())
        self.assertEqual(shares,{"a":0.6,"b":0.3,"unknown_supplier":0.1})
        summary=self.con.execute("SELECT total_tiv_million,hhi,top_three_share,unknown_supplier_share,named_supplier_count FROM metric_period_summary").fetchone()
        self.assertEqual(summary[0],10)
        self.assertAlmostEqual(summary[1],0.46)
        self.assertAlmostEqual(summary[2],1.0)
        self.assertEqual(summary[3:],(0.1,2))

    def test_period_share_uses_volumes_not_average_annual_shares(self):
        self.fixture({"a":{2010:1,2011:90},"b":{2010:9,2011:10}},[("both",2010,2011,"test")])
        share=self.con.execute("SELECT share FROM metric_period_shares WHERE supplier_id='a'").fetchone()[0]
        self.assertAlmostEqual(share,91/110)
        self.assertNotAlmostEqual(share,0.5)

    def test_new_supplier_distance_and_percentage_point_changes(self):
        self.fixture({"a":{2010:10,2011:5},"b":{2010:None,2011:5}},
                     [("before",2010,2010,"test"),("after",2011,2011,"test")],[("shift","before","after","test")])
        distance=self.con.execute("SELECT supplier_mix_distance,volume_change_percent FROM metric_period_changes").fetchone()
        self.assertEqual(distance,(0.5,0.0))
        changes=dict(self.con.execute("SELECT supplier_id,share_change_pp FROM metric_supplier_changes").fetchall())
        self.assertEqual(changes,{"a":-50.0,"b":50.0})

    def test_zero_total_has_no_defined_shares_or_distance(self):
        self.fixture({"a":{2010:None,2011:10},"b":{2010:None,2011:None}},
                     [("before",2010,2010,"test"),("after",2011,2011,"test")],[("shift","before","after","test")])
        row=self.con.execute("SELECT metric_status,total_tiv_million,hhi,top_suppliers FROM metric_period_summary WHERE period_id='before'").fetchone()
        self.assertEqual(row,("no_recorded_deliveries",Decimal(0),None,None))
        row=self.con.execute("SELECT supplier_mix_distance,volume_change_percent,comparison_status FROM metric_period_changes").fetchone()
        self.assertEqual(row,(None,None,"undefined_no_recorded_deliveries"))

    def test_missing_year_is_not_imputed_as_zero(self):
        self.fixture({"a":{2010:6,2011:4},"b":{2010:4}},[("both",2010,2011,"test")])
        self.assertEqual(self.con.execute("SELECT metric_status,total_tiv_million,hhi FROM metric_period_summary").fetchone(),("incomplete_coverage",None,None))
        self.assertEqual(self.con.execute("SELECT count(*) FROM metric_period_shares WHERE share IS NOT NULL").fetchone()[0],0)

    def test_missing_register_tiv_is_not_a_partial_total(self):
        self.fixture({"a":{2010:6},"b":{2010:4}})
        self.con.execute("UPDATE delivery SET tiv_delivered_million=NULL WHERE sipri_deal_id='b-2010'")
        self.assertEqual(self.con.execute("SELECT metric_status,total_tiv_million FROM metric_period_summary").fetchone(),("incomplete_coverage",None))

    def test_all_tied_top_suppliers_are_reported(self):
        self.fixture({"z":{2010:5},"a":{2010:5},"b":{2010:None}})
        self.assertEqual(self.con.execute("SELECT top_suppliers,top_supplier_tie_count,hhi,unknown_supplier_share FROM metric_period_summary").fetchone(),("a / z",2,0.5,0.0))

    def test_top_three_uses_exactly_three_even_with_ties(self):
        self.fixture({name:{2010:1} for name in "abcd"})
        self.assertEqual(self.con.execute("SELECT top_three_share,top_supplier_tie_count FROM metric_period_summary").fetchone(),(0.75,4))

    def test_unfair_or_overlapping_comparisons_rejected(self):
        for periods in [[("a",2010,2011,"test"),("b",2012,2012,"test")],
                        [("a",2010,2011,"test"),("b",2011,2012,"test")]]:
            with self.assertRaisesRegex(ValueError,"equal-length"):
                install(self.con,periods=periods,comparisons=[("bad","a","b","test")])


class MetricRebuild(unittest.TestCase):
    def test_repeatable_metrics_preserve_source_tables(self):
        test_root=ROOT/"tests/.tmp"
        test_root.mkdir(parents=True,exist_ok=True)
        with tempfile.TemporaryDirectory(dir=test_root) as directory:
            path=Path(directory).resolve()
            self.assertTrue(path.is_relative_to(test_root.resolve()))
            database=path/"metrics.duckdb"
            shutil.copy2(ROOT/"data/processed/armsflow.duckdb",database)
            first=build_metrics(database=database)
            second=build_metrics(database=database)
            self.assertEqual(first["metrics_sha256"],second["metrics_sha256"])
            self.assertEqual(first["base_data_sha256"],second["base_data_sha256"])
            self.assertTrue(first["source_tables_unchanged"])
            with duckdb.connect(str(database),read_only=True) as con:
                self.assertEqual(con.execute("SELECT count(*) FROM analysis_metadata").fetchone()[0],1)
                self.assertEqual(con.execute("SELECT count(*) FROM analysis_period").fetchone()[0],29)
                self.assertEqual(con.execute("SELECT count(*) FROM analysis_comparison").fetchone()[0],18)


if __name__=="__main__":
    unittest.main()
