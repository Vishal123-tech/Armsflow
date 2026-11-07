"""Install verified Step 3 SQL metrics without changing the source tables."""
import argparse
from datetime import datetime, timezone
from decimal import Decimal
import hashlib
import json
import os
from pathlib import Path
import shutil
import uuid

import duckdb
from .build_database import ROOT, table_fingerprints
from .clean import digest, prepare

VERSION = "1.0.0"
BASE_TABLES = ("source_snapshot","raw_row","entity","equipment","transfer_deal","delivery",
               "bilateral_annual","recipient_annual","supplier_period","recipient_period","evidence_claim","quality_issue")
METRIC_VIEWS = ("metric_supplier_year","metric_supplier_period","metric_period_shares","metric_period_summary",
                "metric_supplier_changes","metric_period_changes")


def period_id(start,end):
    return f"{start}-{end}"


def default_periods():
    periods = [(period_id(y,y),y,y,"annual") for y in range(2010,2026)]
    periods += [(period_id(y-4,y),y-4,y,"five_year" if y in (2015,2020,2025) else "rolling_five_year") for y in range(2014,2026)]
    return periods + [("2010-2025",2010,2025,"full")]


def default_comparisons():
    pairs = [("2011-2015","2016-2020","five_year"),("2016-2020","2021-2025","five_year"),
             ("2011-2015","2021-2025","long_term")]
    pairs += [(period_id(y-1,y-1),period_id(y,y),"annual") for y in range(2011,2026)]
    return [(f"{a}_to_{b}",a,b,kind) for a,b,kind in pairs]


def install(con, periods=None, comparisons=None, sql_path=ROOT / "sql/metrics.sql"):
    periods = default_periods() if periods is None else periods
    comparisons = default_comparisons() if comparisons is None else comparisons
    mapping = {row[0]:row for row in periods}
    if len(mapping)!=len(periods):
        raise ValueError("Duplicate analysis periods")
    for _,start,end,_ in periods:
        if type(start) is not int or type(end) is not int or not 2010 <= start <= end <= 2025:
            raise ValueError("Analysis period is outside the pilot coverage")
    for _,earlier,later,_ in comparisons:
        a,b = mapping[earlier],mapping[later]
        if a[2]>=b[1] or a[2]-a[1]!=b[2]-b[1]:
            raise ValueError("Compare equal-length, non-overlapping periods in chronological order")
    con.execute(Path(sql_path).read_text("utf-8"))
    con.execute("DELETE FROM analysis_comparison")
    con.execute("DELETE FROM analysis_period")
    if periods:
        con.executemany("INSERT INTO analysis_period VALUES (?,?,?,?)",periods)
    if comparisons:
        con.executemany("INSERT INTO analysis_comparison VALUES (?,?,?,?)",comparisons)


def verify(con):
    checks=[]

    def check(name, condition, detail=None):
        checks.append({"check":name,"passed":bool(condition),"detail":detail})
        if not condition:
            raise ValueError(f"Metric verification failed: {name}: {detail}")

    scalar = lambda sql: con.execute(sql).fetchone()[0]
    check("pilot_periods_complete",scalar("SELECT count(*) FROM metric_period_summary WHERE metric_status<>'ok'")==0)
    error=scalar("SELECT max(abs(total_share-1)) FROM (SELECT period_id,recipient_id,sum(share) AS total_share FROM metric_period_shares WHERE metric_status='ok' GROUP BY period_id,recipient_id)")
    check("shares_sum_to_one",error is not None and error<1e-12,{"maximum_error":error})
    check("hhi_and_top_three_in_bounds",scalar("SELECT count(*) FROM metric_period_summary WHERE hhi<0 OR hhi>1.000000000001 OR top_three_share<0 OR top_three_share>1.000000000001")==0)
    check("distance_in_bounds",scalar("SELECT count(*) FROM metric_period_changes WHERE supplier_mix_distance<0 OR supplier_mix_distance>1.000000000001")==0)
    change_error=scalar("SELECT max(abs(change_sum)) FROM (SELECT comparison_id,sum(share_change_pp) AS change_sum FROM metric_supplier_changes GROUP BY comparison_id)")
    check("share_changes_balance",change_error is not None and change_error<1e-10,{"maximum_error_pp":change_error})
    check("unknown_supplier_retained",scalar("SELECT count(*) FROM metric_period_shares WHERE supplier_id='unknown_supplier'")==len(default_periods()))
    check("rounded_zeros_resolved_by_register",scalar("SELECT count(*) FROM metric_supplier_year WHERE source_coverage_status='rounded_zero' AND recorded_tiv_million>0")==11)
    check("no_identified_years_documented",scalar("SELECT count(*) FROM metric_supplier_year WHERE source_coverage_status='no_identified_deliveries' AND recorded_tiv_million=0")==167)
    references=con.execute("""SELECT p.supplier_id,p.start_year,p.end_year,p.reported_tiv_million,p.reported_share_percent,
      p.raw_share,m.recorded_tiv_million,m.share_percent
      FROM supplier_period p JOIN metric_period_shares m ON p.recipient_id=m.recipient_id AND p.supplier_id=m.supplier_id
      AND p.start_year=m.start_year AND p.end_year=m.end_year ORDER BY p.start_year,p.supplier_id""").fetchall()
    volume_errors=[]
    share_errors=[]
    for supplier,start,end,reported_tiv,reported_share,raw_share,tiv,share in references:
        if reported_tiv is None:
            if tiv!=0:
                volume_errors.append([supplier,start,end,"expected no identified volume"])
        elif abs(tiv-reported_tiv)>Decimal("0.5"):
            volume_errors.append([supplier,start,end,str(tiv-reported_tiv)])
        if reported_share is not None:
            text=raw_share.strip().rstrip("%")
            decimals=len(text.split(".")[1]) if "." in text else 0
            tolerance=0.5*10**(-decimals)+1e-10
            if abs(share-float(reported_share))>tolerance:
                share_errors.append([supplier,start,end,share,float(reported_share),tolerance])
    check("all_88_published_supplier_periods_reconciled",len(references)==88 and not volume_errors,volume_errors)
    check("published_shares_match_display_precision",not share_errors,share_errors)
    totals=con.execute("""SELECT p.start_year,p.end_year,p.reported_total_tiv_million,m.total_tiv_million
      FROM recipient_period p JOIN metric_period_summary m ON p.recipient_id=m.recipient_id
      AND p.start_year=m.start_year AND p.end_year=m.end_year""").fetchall()
    check("published_recipient_period_totals_reconciled",len(totals)==4 and all(abs(r[2]-r[3])<=Decimal("0.5") for r in totals))
    check("equal_length_comparisons",scalar("""SELECT count(*) FROM analysis_comparison c JOIN analysis_period a ON a.period_id=c.earlier_period_id
      JOIN analysis_period b ON b.period_id=c.later_period_id WHERE a.end_year-a.start_year<>b.end_year-b.start_year OR a.end_year>=b.start_year""")==0)
    return checks


def build_metrics(root=ROOT, database=None):
    root=Path(root).resolve()
    database=Path(database or root / "data/processed/armsflow.duckdb").resolve()
    if not database.is_file() or database.suffix!=".duckdb" or database.is_relative_to(root / "data/raw"):
        raise ValueError("Build the Step 2 .duckdb database outside data/raw first")
    _,input_hash=prepare(root)
    with duckdb.connect(str(database),read_only=True) as con:
        metadata=con.execute("SELECT input_sha256,logical_data_sha256 FROM build_metadata").fetchone()
        base_fingerprints=table_fingerprints(con,BASE_TABLES)
        if metadata is None or metadata[0]!=input_hash or metadata[1]!=digest(base_fingerprints):
            raise ValueError("Source snapshot or base database changed; rebuild Step 2 before analysis")
    temp=database.with_name(f".metrics-{uuid.uuid4().hex}.duckdb")
    con=None
    try:
        shutil.copy2(database,temp)
        con=duckdb.connect(str(temp))
        con.execute("BEGIN TRANSACTION")
        install(con,sql_path=root / "sql/metrics.sql")
        checks=verify(con)
        if table_fingerprints(con,BASE_TABLES)!=base_fingerprints:
            raise ValueError("Analysis modified a base source table")
        logical=digest(table_fingerprints(con,METRIC_VIEWS))
        code_hash=digest({name:hashlib.sha256((root/name).read_bytes()).hexdigest()
                          for name in ("sql/metrics.sql","pipeline/build_metrics.py")})
        timestamp=datetime.now(timezone.utc).isoformat()
        con.execute("""CREATE TABLE IF NOT EXISTS analysis_metadata (
          metric_version VARCHAR,generated_at_utc VARCHAR,base_data_sha256 VARCHAR,code_sha256 VARCHAR,
          metrics_sha256 VARCHAR,volume_basis VARCHAR)""")
        con.execute("DELETE FROM analysis_metadata")
        con.execute("INSERT INTO analysis_metadata VALUES (?,?,?,?,?,?)",
                    [VERSION,timestamp,metadata[1],code_hash,logical,"Sum of SIPRI delivery-register TIV; millions of TIV"])
        counts={view:con.execute(f"SELECT count(*) FROM {view}").fetchone()[0] for view in METRIC_VIEWS}
        con.execute("COMMIT")
        con.close()
        con=None
        os.replace(temp,database)
    finally:
        if con is not None:
            con.close()
        for path in (temp,Path(str(temp)+".wal")):
            if path.exists():
                path.unlink()
    return {"status":"passed", "metric_version":VERSION,"generated_at_utc":timestamp,
            "database":str(database),"base_data_sha256":metadata[1],"metrics_sha256":logical,
            "code_sha256":code_hash,"view_row_counts":counts,"checks":checks,
            "source_tables_unchanged":True,"scope":"India, historical imports of major conventional arms, 2010-2025",
            "interpretation":"Shares describe recorded import TIV, not spending, weapon counts, current inventory or total military dependence."}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--database",type=Path)
    parser.add_argument("--report",type=Path,default=ROOT/"docs/step3_validation.json")
    args=parser.parse_args()
    result=build_metrics(database=args.database)
    args.report.parent.mkdir(parents=True,exist_ok=True)
    args.report.write_text(json.dumps(result,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print(f"Installed metrics: {len(result['checks'])} checks passed; source tables unchanged.")
    print(f"Report: {args.report}")


if __name__=="__main__":
    main()
