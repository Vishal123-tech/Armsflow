"""Checks data semantics, source integrity, rebuilds and failure safety."""
from decimal import Decimal
import hashlib
import json
from pathlib import Path
import shutil
import tempfile
import unittest

import duckdb
from pipeline.build_database import ROOT, build
from pipeline.clean import flag, number, percent, read_export, tiv_cell, year

TEST_ROOT = ROOT / "tests/.tmp"


class WorkspaceTest(unittest.TestCase):
    def setUp(self):
        TEST_ROOT.mkdir(parents=True, exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(dir=TEST_ROOT)
        self.path = Path(self.temp.name).resolve()
        # Cleanup is limited to this freshly created directory inside the project.
        if not self.path.is_relative_to(TEST_ROOT.resolve()):
            raise RuntimeError("Unexpected temporary-directory location")
        self.addCleanup(self.temp.cleanup)


class ParsingTests(WorkspaceTest):
    def test_zero_and_missing_have_different_meanings(self):
        self.assertEqual(tiv_cell("0 "), (Decimal(0), "rounded_zero"))
        self.assertEqual(tiv_cell("  "), (None, "no_identified_deliveries"))
        self.assertEqual(tiv_cell("0.3"), (Decimal("0.3"), "reported_value"))

    def test_flags_keep_unknown_distinct_from_false(self):
        self.assertIs(flag("No"), False)
        self.assertIs(flag("Yes"), True)
        self.assertIsNone(flag(""))
        with self.assertRaises(ValueError):
            flag("probably")

    def test_invalid_numbers_cannot_be_silently_loaded(self):
        for value in ["NaN", "Infinity", "-1", "1,000", "?", "0.0000001", "1000000000000"]:
            with self.subTest(value=value), self.assertRaises(ValueError):
                number(value)
        with self.assertRaises(ValueError):
            number("", required=True)
        for value in ["2026", "2009", "2020.5"]:
            with self.subTest(year=value), self.assertRaises(ValueError):
                year(value, delivery=True)
        self.assertEqual(percent("7.9%"), Decimal("7.9"))
        for value in ["7.9", "101%"]:
            with self.assertRaises(ValueError):
                percent(value)

    def test_csv_preserves_repeated_headers_quotes_and_line_numbers(self):
        path = self.path / "example.csv"
        path.write_text('Preamble\nSupplier,Percentage,Percentage\n"A, B",40%,29%\n"two\nlines",1%,2%\n', encoding="utf-8")
        export = read_export(path, "Supplier")
        self.assertEqual(export.header, ["Supplier","Percentage","Percentage"])
        self.assertEqual(export.rows[0], (3,["A, B","40%","29%"]))
        self.assertEqual(export.rows[1], (4,["two\nlines","1%","2%"]))


class DatabaseTests(WorkspaceTest):
    def test_snapshot_semantics_and_repeatable_rebuild(self):
        output = self.path / "sample.duckdb"
        first = build(output=output)
        with duckdb.connect(str(output),read_only=True) as con:
            self.assertEqual(con.execute("SELECT count(*) FROM delivery").fetchone()[0],782)
            self.assertEqual(con.execute("SELECT count(*) FROM bilateral_annual").fetchone()[0],352)
            counts = dict(con.execute("SELECT coverage_status,count(*) FROM bilateral_annual GROUP BY coverage_status").fetchall())
            self.assertEqual(counts,{"no_identified_deliveries":167,"rounded_zero":11,"reported_value":174})
            self.assertEqual(con.execute("SELECT count(*) FROM delivery WHERE quantity_estimated IS NULL").fetchone()[0],32)
            self.assertEqual(con.execute("SELECT raw_value FROM bilateral_annual WHERE supplier_id='czechia' AND delivery_year=2010").fetchone()[0],"0 ")
            self.assertEqual(con.execute("SELECT entity_type FROM entity WHERE entity_id='unknown_supplier'").fetchone()[0],"unknown")
            self.assertEqual(con.execute("SELECT count(*) FROM entity WHERE source_label LIKE 'Total%'").fetchone()[0],0)
            periods = con.execute("SELECT reported_share_percent FROM supplier_period WHERE supplier_id='russia' AND source_id='sipri_india_periods' ORDER BY start_year").fetchall()
            self.assertEqual([r[0] for r in periods],[70,51,40])
            self.assertEqual(con.execute("SELECT DISTINCT order_year FROM delivery WHERE sipri_deal_id='58668'").fetchall(),[(2017,)])
            self.assertEqual(con.execute("SELECT value_text FROM evidence_claim WHERE claim_id='rafale_contract_date'").fetchone()[0],"2016-09-23")
            self.assertEqual(con.execute("SELECT sum(quantity_delivered) FROM delivery_detail WHERE designation='Rafale'").fetchone()[0],36)
            self.assertEqual(con.execute("SELECT count(*) FROM quality_issue WHERE status='open'").fetchone()[0],3)
            self.assertEqual(con.execute("SELECT count(*) FROM delivery_detail WHERE source_url IS NULL OR source_line IS NULL").fetchone()[0],0)
        second = build(output=output)
        self.assertEqual(first["logical_data_sha256"],second["logical_data_sha256"])
        self.assertEqual(first["tables"],second["tables"])
        self.assertEqual(first["build_id"],second["build_id"])

    def make_fixture(self):
        fixture = self.path / "fixture"
        fixture.mkdir()
        for relative in ["data/raw","config","pipeline","sql"]:
            shutil.copytree(ROOT / relative, fixture / relative, ignore=shutil.ignore_patterns("__pycache__"))
        shutil.copy2(ROOT / "data/source_manifest.json", fixture / "data/source_manifest.json")
        shutil.copy2(ROOT / "requirements.txt", fixture / "requirements.txt")
        return fixture

    def refresh_register_hash(self, fixture):
        manifest_path = fixture / "data/source_manifest.json"
        manifest = json.loads(manifest_path.read_text("utf-8"))
        for source in manifest["sources"]:
            if source["id"] == "sipri_india_register":
                path = fixture / source["local_path"]
                source["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
                source["bytes"] = path.stat().st_size
        manifest_path.write_text(json.dumps(manifest),encoding="utf-8")

    def test_changed_source_rejected_existing_database_survives(self):
        fixture = self.make_fixture()
        output = self.path / "retained.duckdb"
        build(root=fixture,output=output)
        before = output.read_bytes()
        raw = fixture / "data/raw/sipri_india_supplier_tiv_2010_2025.csv"
        raw.write_bytes(raw.read_bytes()+b"\nchanged\n")
        with self.assertRaisesRegex(ValueError,"hash mismatch"):
            build(root=fixture,output=output)
        self.assertEqual(before,output.read_bytes())

    def test_duplicate_delivery_is_rejected_not_dropped(self):
        fixture = self.make_fixture()
        raw = fixture / "data/raw/sipri_india_transfer_register_2010_2025.csv"
        text = raw.read_text("utf-8")
        raw.write_text(text.rstrip()+"\n"+text.splitlines()[12]+"\n",encoding="utf-8")
        self.refresh_register_hash(fixture)
        output = self.path / "duplicate.duckdb"
        with self.assertRaisesRegex(ValueError,"Duplicate delivery"):
            build(root=fixture,output=output)
        self.assertFalse(output.exists())

    def test_database_constraint_failure_leaves_existing_file_untouched(self):
        fixture = self.make_fixture()
        output = self.path / "retained.duckdb"
        build(root=fixture,output=output)
        before = output.read_bytes()
        evidence_path = fixture / "config/reviewed_evidence.json"
        evidence = json.loads(evidence_path.read_text("utf-8"))
        evidence["claims"][0]["source_id"] = "missing-source"
        evidence_path.write_text(json.dumps(evidence),encoding="utf-8")
        with self.assertRaises(duckdb.ConstraintException):
            build(root=fixture,output=output)
        self.assertEqual(before,output.read_bytes())
        self.assertEqual(list(output.parent.glob(".build-*")),[])


if __name__ == "__main__":
    unittest.main()
