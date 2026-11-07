"""Read-only checks of the collected source files; never cleans or rewrites them.

Run with Python 3.10+: python scripts/verify_source_snapshot.py
Uses only the Python standard library. Exits nonzero on integrity/schema failures.
"""
from collections import Counter, defaultdict
import csv
from decimal import Decimal
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"


def read_table(filename, header_start):
    lines = (RAW / filename).read_text(encoding="utf-8-sig").splitlines()
    start = next(i for i, line in enumerate(lines) if line.startswith(header_start))
    table = list(csv.reader(lines[start:]))
    header, rows = table[0], [row for row in table[1:] if any(row)]
    bad = [start + i + 2 for i, row in enumerate(rows) if len(row) != len(header)]
    if bad:
        raise ValueError(f"Unexpected CSV width in {filename}, lines {bad}")
    return header, rows


def audit():
    manifest = json.loads((ROOT / "data" / "source_manifest.json").read_text("utf-8"))
    integrity = []
    for source in manifest["sources"]:
        path = ROOT / source["local_path"]
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        integrity.append({"source_id": source["id"], "sha256_matches": digest == source["sha256"]})
    assert all(item["sha256_matches"] for item in integrity), "Source snapshot changed"

    headers, rows = read_table("sipri_india_supplier_tiv_2010_2025.csv", "Supplier,")
    suppliers = [r for r in rows if not r[0].startswith("Total exports to")]
    totals = [r for r in rows if r[0] == "Total exports to India"]
    assert len(totals) == 1, "Expected one India total"
    years = [str(year) for year in range(2010, 2026)]
    assert headers[1:17] == years, "Unexpected year coverage"
    supplier_map = {r[0]: dict(zip(headers, r)) for r in suppliers}
    assert len(supplier_map) == len(suppliers), "Duplicate supplier rows"

    register_header, register_rows = read_table("sipri_india_transfer_register_2010_2025.csv", "SIPRI AT Database ID,")
    records = [dict(zip(register_header, row)) for row in register_rows]
    assert all(r["Recipient"] == "India" for r in records), "Unexpected recipient"
    assert all(2010 <= int(r["Delivery year"]) <= 2025 for r in records), "Delivery outside filter"
    assert not (len(register_rows) - len(set(tuple(r) for r in register_rows))), "Exact duplicate rows"
    assert all(Decimal(r["Deliveries in the Year Range"]) >= 0 for r in records)
    assert all(Decimal(r["TIV delivery values"]) >= 0 for r in records)

    period_headers, period_rows = read_table("sipri_india_supplier_tiv_comparison_periods.csv", "Supplier,")
    period_map = {row[0]: row for row in period_rows}
    # Repeated 'Percentage' headers are intentional in the original export.
    # Locate by the preceding period; a DictReader would silently lose columns.
    expected = {("Russia", "2011-2015"): "70%", ("Russia", "2016-2020"): "51%",
                ("Russia", "2021-2025"): "40%", ("France", "2021-2025"): "29%",
                ("Israel", "2021-2025"): "15%"}
    published_checks = []
    for (supplier, period), value in expected.items():
        observed = period_map[supplier][period_headers.index(period) + 1]
        published_checks.append({"supplier": supplier, "period": period, "published_share": value,
                                 "export_share": observed, "matches": observed == value})
    assert all(item["matches"] for item in published_checks), "Published reference mismatch"

    by_supplier_year = defaultdict(Decimal)
    for row in records:
        by_supplier_year[(row["Supplier"], row["Delivery year"])] += Decimal(row["TIV delivery values"])
    rounding_exceptions = []
    max_difference = Decimal(0)
    for supplier, row in supplier_map.items():
        for year in years:
            if row[year] != "":
                delta = abs(by_supplier_year[(supplier, year)] - Decimal(row[year]))
                max_difference = max(max_difference, delta)
                if delta > Decimal("0.5"):
                    rounding_exceptions.append({"supplier": supplier, "year": year, "difference_million_tiv": str(delta)})
    # This is a consistency observation, not an assumption that rounded exports
    # must reconcile perfectly or that a blank proves no real-world transfer.

    rafale = [r for r in records if r["Designation"] == "Rafale" and r["Supplier"] == "France"]
    rafale_total = sum(Decimal(r["Deliveries in the Year Range"]) for r in rafale)
    assert rafale_total == 36, "Rafale programme total differs from MoD reference"

    return {
        "status": "passed_structural_checks_with_documented_field_conflicts",
        "scope": "India pilot, delivery years 2010-2025; no global ML training dataset yet",
        "source_integrity": integrity,
        "supplier_table": {"supplier_labels": len(suppliers), "years": len(years),
                           "blank_annual_cells": sum(r[year] == "" for r in supplier_map.values() for year in years),
                           "rounded_zero_annual_cells": sum(r[year].strip() != "" and Decimal(r[year]) == 0 for r in supplier_map.values() for year in years),
                           "includes_unknown_supplier": "unknown supplier(s)" in supplier_map},
        "transfer_register": {"annual_delivery_rows": len(records),
                              "unique_deal_ids": len({r["SIPRI AT Database ID"] for r in records}),
                              "distinct_designation_labels": len({r["Designation"] for r in records}),
                              "categories": dict(sorted(Counter(r["Armament category"] for r in records).items())),
                              "supplier_labels": len({r["Supplier"] for r in records}),
                              "quantity_estimate_flag_values": dict(Counter(r["Deliveries in the Year Range is estimate"] for r in records)),
                              "duplicate_deal_year_keys": sum(n - 1 for n in Counter((r["SIPRI AT Database ID"], r["Delivery year"]) for r in records).values() if n > 1)},
        "published_reference_checks": published_checks,
        "annual_tiv_cross_check": {"max_difference_million_tiv": str(max_difference),
                                   "cells_over_half_million": rounding_exceptions,
                                   "interpretation": "Register sums compared with displayed integer supplier cells; preserve both originals."},
        "rafale_example": {"delivered_quantity": int(rafale_total), "unit": "aircraft", "recipient": "India", "supplier": "France",
                           "delivery_years": [int(r["Delivery year"]) for r in rafale],
                           "quantity_estimate_flags": [r["Deliveries in the Year Range is estimate"] for r in rafale],
                           "quantity_corroborated_by": "pib_mod_review_2022",
                           "current_inventory": None,
                           "unresolved_fields": {"order_date_export": sorted({r["Order date"] for r in rafale}),
                                                 "local_production_export": sorted({r["Local production"] for r in rafale})}},
        "review_note": "See docs/data_quality_notes.md. Passing these checks does not authenticate every individual field."
    }


if __name__ == "__main__":
    try:
        result = audit()
    except (AssertionError, ValueError, KeyError, OSError, StopIteration) as exc:
        print(f"Verification failed: {exc}", file=sys.stderr)
        sys.exit(1)
    print(json.dumps(result, ensure_ascii=False, indent=2))
