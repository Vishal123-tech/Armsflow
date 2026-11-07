"""Build a validated DuckDB file atomically. Run: python -m pipeline.build_database."""
import argparse
from datetime import datetime, timezone
from decimal import Decimal
import hashlib
import json
import os
from pathlib import Path
import uuid

import duckdb
from .clean import canonical, digest, prepare

ROOT = Path(__file__).resolve().parents[1]
VERSION = "0.2.0"


def validate_database(con):
    checks = []

    def check(name, passed, detail=None):
        checks.append({"check": name, "passed": bool(passed), "detail": detail})
        if not passed:
            raise ValueError(f"Database validation failed: {name}: {detail}")

    count = lambda sql: con.execute(sql).fetchone()[0]
    check("no_orphan_delivery_rows", count("""SELECT count(*) FROM delivery d LEFT JOIN transfer_deal t
          USING(source_id,sipri_deal_id) WHERE t.sipri_deal_id IS NULL""") == 0)
    check("delivery_sources_are_traceable", count("""SELECT count(*) FROM delivery d LEFT JOIN raw_row r
          USING(source_id,source_line) WHERE r.source_line IS NULL""") == 0)
    check("unknown_supplier_is_retained", count("SELECT count(*) FROM bilateral_annual WHERE supplier_id='unknown_supplier'") == 16)
    check("annual_grid_complete_for_exported_suppliers", count("""SELECT count(*) FROM
          (SELECT supplier_id FROM bilateral_annual GROUP BY supplier_id HAVING count(*)<>16)""") == 0)
    comparison = con.execute("""WITH delivered AS (
      SELECT t.supplier_id,d.delivery_year,sum(d.tiv_delivered_million) AS tiv
      FROM delivery d JOIN transfer_deal t USING(source_id,sipri_deal_id)
      GROUP BY t.supplier_id,d.delivery_year)
      SELECT b.supplier_id,b.delivery_year,b.coverage_status,b.tiv_million,
             coalesce(d.tiv,0) AS register_tiv
      FROM bilateral_annual b LEFT JOIN delivered d USING(supplier_id,delivery_year)""").fetchall()
    diffs = [abs(row[3]-row[4]) for row in comparison if row[3] is not None]
    check("supplier_year_tiv_reconciles", max(diffs, default=Decimal(0)) <= Decimal("0.5"),
          {"maximum_difference_million_tiv": str(max(diffs, default=Decimal(0))), "tolerance": "0.5"})
    check("blank_cells_have_no_register_tiv", all(row[4] == 0 for row in comparison if row[3] is None))
    check("register_supplier_years_have_table_cells", count("""SELECT count(*) FROM delivery d
      JOIN transfer_deal t USING(source_id,sipri_deal_id) LEFT JOIN bilateral_annual b
      ON b.supplier_id=t.supplier_id AND b.delivery_year=d.delivery_year
      WHERE b.supplier_id IS NULL""") == 0)
    total_deltas = con.execute("""SELECT a.delivery_year,abs(a.reported_total_tiv_million-sum(d.tiv_delivered_million))
      FROM recipient_annual a JOIN delivery d ON d.delivery_year=a.delivery_year
      GROUP BY a.delivery_year,a.reported_total_tiv_million""").fetchall()
    max_total_delta = max((r[1] for r in total_deltas), default=Decimal(0))
    check("recipient_year_totals_reconcile", len(total_deltas)==16 and max_total_delta <= Decimal("0.5"),
          {"maximum_difference_million_tiv":str(max_total_delta),"tolerance":"0.5"})
    rafale = count("SELECT sum(quantity_delivered) FROM delivery_detail WHERE designation='Rafale' AND supplier='France'")
    check("rafale_total_matches_mod_reference", rafale==36, {"aircraft":str(rafale)})
    expected = [("russia",2011,2015,70),("russia",2016,2020,51),("russia",2021,2025,40),
                ("france",2021,2025,29),("israel",2021,2025,15)]
    for supplier,start,end,value in expected:
        actual = con.execute("SELECT reported_share_percent FROM supplier_period WHERE supplier_id=? AND start_year=? AND end_year=?",
                             [supplier,start,end]).fetchone()
        check(f"published_reference_{supplier}_{start}_{end}", actual is not None and actual[0]==value)
    return checks


def table_fingerprints(con, tables):
    result = {}
    for name in sorted(tables):
        # Table names are a fixed internal list, never supplied through a UI.
        rows = con.execute(f'SELECT * FROM "{name}"').fetchall()
        result[name] = {"rows":len(rows), "sha256":hashlib.sha256("\n".join(sorted(canonical(row) for row in rows)).encode("utf-8")).hexdigest()}
    return result


def build(root=ROOT, output=None):
    root = Path(root).resolve()
    output = Path(output or root / "data/processed/armsflow.duckdb").resolve()
    if output.suffix != ".duckdb" or output.is_relative_to(root / "data/raw"):
        raise ValueError("Output must be a .duckdb file outside data/raw")
    tables, input_hash = prepare(root)
    code_paths = [root / "pipeline/clean.py", root / "pipeline/build_database.py", root / "sql/schema.sql", root / "requirements.txt"]
    code_hash = digest({p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in code_paths})
    output.parent.mkdir(parents=True, exist_ok=True)
    temp = output.with_name(f".build-{uuid.uuid4().hex}.duckdb")
    con = None
    try:
        con = duckdb.connect(str(temp))
        con.execute("BEGIN TRANSACTION")
        con.execute((root / "sql/schema.sql").read_text("utf-8"))
        for table, rows in tables.items():
            if rows:
                placeholders = ",".join("?" for _ in rows[0])
                con.executemany(f'INSERT INTO "{table}" VALUES ({placeholders})', rows)
        checks = validate_database(con)
        fingerprints = table_fingerprints(con, tables)
        logical_hash = digest(fingerprints)
        timestamp = datetime.now(timezone.utc).isoformat()
        build_id = "build_" + digest([input_hash,code_hash])[:24]
        con.execute("INSERT INTO build_metadata VALUES (?,?,?,?,?,?,?)",
                    [build_id,VERSION,timestamp,input_hash,code_hash,logical_hash,duckdb.__version__])
        con.execute("COMMIT")
        con.close()
        con = None
        # No source or existing database is replaced until every check passes.
        os.replace(temp, output)
    finally:
        if con is not None:
            con.close()
        for path in (temp, Path(str(temp)+".wal")):
            if path.exists():
                path.unlink()
    return {"status":"passed_with_documented_open_issues", "pipeline_version":VERSION,
            "built_at_utc":timestamp, "database":str(output), "build_id":build_id,
            "input_sha256":input_hash, "code_sha256":code_hash, "logical_data_sha256":logical_hash,
            "duckdb_version":duckdb.__version__, "tables":fingerprints, "checks":checks,
            "scope":"India, delivery years 2010-2025; global expansion remains pending",
            "open_quality_issues":len(tables["quality_issue"]),
            "source_files_verified":len(tables["source_snapshot"]),
            "notes":["TIV units: millions of SIPRI TIV, not money or weapon counts.",
                     "NULL annual cells retain no-identified-deliveries status; no zero imputation.",
                     "Source-provided period shares are stored as references; Step 3 metrics are not implemented."]}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--report", type=Path, default=ROOT / "docs/step2_validation.json")
    args = parser.parse_args()
    report = build(output=args.output)
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(f"Built {report['database']}")
    print(f"Validated {report['tables']['delivery']['rows']} delivery rows; {len(report['checks'])} checks passed.")
    print(f"Open quality issues: {report['open_quality_issues']}. Report: {args.report}")


if __name__ == "__main__":
    main()
