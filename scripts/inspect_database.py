"""Read a small equipment sample: python scripts/inspect_database.py --equipment Rafale."""
import argparse
import json
from pathlib import Path
import duckdb

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--equipment", default="Rafale", help="Exact source designation")
    args = parser.parse_args()
    with duckdb.connect(str(ROOT / "data/processed/armsflow.duckdb"), read_only=True) as con:
        cursor = con.execute("""SELECT supplier,recipient,designation,delivery_year,quantity_delivered,
          quantity_estimated,source_url,source_line,has_open_quality_issue FROM delivery_detail
          WHERE designation=? ORDER BY delivery_year,supplier,sipri_deal_id LIMIT 30""", [args.equipment])
        names = [column[0] for column in cursor.description]
        print(json.dumps([dict(zip(names,row)) for row in cursor.fetchall()],ensure_ascii=False,indent=2,default=str))


if __name__ == "__main__":
    main()
