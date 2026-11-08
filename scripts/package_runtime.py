"""Package only the read-only tables and derived results used by the website."""
import hashlib
import json
import tempfile
import zipfile
from pathlib import Path
import duckdb
ROOT = Path(__file__).resolve().parents[1]
TABLES = ("analysis_comparison", "analysis_period", "delivery", "entity", "equipment", "evidence_claim", "metric_period_changes", "metric_period_shares", "metric_period_summary", "metric_supplier_changes", "quality_issue", "transfer_deal")

def main():
    destination = ROOT / "deployment"
    destination.mkdir(exist_ok=True)
    source = ROOT / "data/processed/armsflow.duckdb"
    with tempfile.TemporaryDirectory(dir=ROOT / "work") as temporary:
        database = Path(temporary) / "armsflow.duckdb"
        conn = duckdb.connect(str(database))
        conn.execute("ATTACH '" + str(source).replace("'", "''") + "' AS original (READ_ONLY)")
        for table in TABLES:
            conn.execute(f'CREATE TABLE "{table}" AS SELECT * FROM original."{table}"')
        conn.execute("CREATE TABLE source_snapshot AS SELECT source_id,publisher,title,url,retrieved_date FROM original.source_snapshot")
        conn.close()
        archive = destination / "runtime.zip"
        with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as output:
            output.write(database, "armsflow.duckdb")
            for name in ("additional_recipients.json", "ml_insights.json", "supplier_similarity.json"):
                output.write(ROOT / "data/processed" / name, name)
        manifest = {"sha256": hashlib.sha256(archive.read_bytes()).hexdigest(), "files": ["armsflow.duckdb", "additional_recipients.json", "ml_insights.json", "supplier_similarity.json"], "source": "SIPRI Arms Transfers Database; snapshots collected 6–7 November 2026", "purpose": "Non-commercial educational research demonstration; source rights retained"}
        (destination / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
        print(f"Packaged {archive.stat().st_size:,} bytes; original exports and raw-row tables excluded.")

if __name__ == "__main__":
    main()

