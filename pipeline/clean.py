"""Strict parsing of the three collected SIPRI exports. No source file writes."""
import csv
from dataclasses import dataclass
from decimal import Decimal, InvalidOperation
import hashlib
import io
import json
from pathlib import Path
import re

START_YEAR, END_YEAR = 2010, 2025
REGISTER_ID = "sipri_india_register"
ANNUAL_ID = "sipri_india_annual"
PERIOD_ID = "sipri_india_periods"
REGISTER_HEADER = [
    "SIPRI AT Database ID", "Supplier", "Recipient", "Designation", "Description", "Armament category",
    "Order date", "Order date is estimate", "Deliveries in the Year Range",
    "Deliveries in the Year Range is estimate", "Delivery year", "Delivery year is estimate",
    "Status", "SIPRI estimate", "TIV deal unit", "TIV delivery values", "Local production",
]


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"), default=str)


def digest(value):
    return hashlib.sha256(canonical(value).encode("utf-8")).hexdigest()


def number(raw, *, required=False):
    text = raw.strip()
    if not text:
        if required:
            raise ValueError("Required number is blank")
        return None
    try:
        value = Decimal(text)
    except InvalidOperation as exc:
        raise ValueError(f"Invalid number: {raw!r}") from exc
    if not value.is_finite() or value < 0 or value >= Decimal("1000000000000"):
        raise ValueError(f"Number outside supported nonnegative range: {raw!r}")
    if value != value.quantize(Decimal("0.000001")):
        raise ValueError(f"More than six decimal places: {raw!r}")
    return value


def year(raw, *, delivery=False):
    value = number(raw, required=delivery)
    if value is None:
        return None
    low = START_YEAR if delivery else 1900
    if value != value.to_integral_value() or not low <= value <= END_YEAR:
        raise ValueError(f"Year outside pilot scope: {raw!r}")
    return int(value)


def flag(raw):
    values = {"Yes": True, "No": False, "": None}
    try:
        return values[raw.strip()]
    except KeyError as exc:
        raise ValueError(f"Unknown flag, cannot infer boolean: {raw!r}") from exc


def tiv_cell(raw):
    value = number(raw)
    status = "no_identified_deliveries" if value is None else "rounded_zero" if value == 0 else "reported_value"
    return value, status


def percent(raw):
    text = raw.strip()
    if not text:
        return None
    if not text.endswith("%"):
        raise ValueError(f"Percentage marker missing: {raw!r}")
    value = number(text[:-1], required=True)
    if value > 100 or value != value.quantize(Decimal("0.001")):
        raise ValueError(f"Invalid percentage: {raw!r}")
    return value


@dataclass
class Export:
    header: list
    rows: list  # (physical starting line, original cells)


def read_export(path, first_header):
    text = Path(path).read_text(encoding="utf-8-sig")
    lines = text.splitlines(keepends=True)
    starts = [i for i, line in enumerate(lines) if line.startswith(first_header + ",")]
    if len(starts) != 1:
        raise ValueError(f"Expected one CSV header in {path}")
    start = starts[0]
    reader = csv.reader(io.StringIO("".join(lines[start:])), strict=True)
    header = next(reader)
    rows = []
    while True:
        physical_line = start + reader.line_num + 1
        try:
            cells = next(reader)
        except StopIteration:
            break
        if not any(cell.strip() for cell in cells):
            continue
        if len(cells) != len(header):
            raise ValueError(f"Unexpected column count: {path}:{physical_line}")
        rows.append((physical_line, cells))
    return Export(header, rows)


def check_unique(rows, key_indexes, label):
    seen = set()
    for row in rows:
        key = tuple(row[i] for i in key_indexes)
        if key in seen:
            raise ValueError(f"Duplicate {label} key: {key}; no rows silently removed")
        seen.add(key)


def prepare(root):
    root = Path(root)
    manifest = json.loads((root / "data/source_manifest.json").read_text("utf-8"))
    sources = manifest["sources"]
    if len({s["id"] for s in sources}) != len(sources):
        raise ValueError("Duplicate source IDs")
    for source in sources:
        path = (root / source["local_path"]).resolve()
        if not path.is_relative_to((root / "data/raw").resolve()):
            raise ValueError("Source file is outside the raw directory")
        if hashlib.sha256(path.read_bytes()).hexdigest() != source["sha256"]:
            raise ValueError(f"Source hash mismatch: {source['id']}; original snapshot changed")
    source_map = {s["id"]: s for s in sources}
    for sid in (REGISTER_ID, ANNUAL_ID, PERIOD_ID):
        query = source_map[sid]["query_filters"]
        if query["recipient"] != "India (IND)":
            raise ValueError("Only the India pilot is supported by this loader")
    register_query = source_map[REGISTER_ID]["query_filters"]
    if (register_query["delivery_year_range"] != [START_YEAR, END_YEAR]
            or not register_query["deliveries_broken_down_by_year"]
            or not register_query["only_deliveries_in_year_range"]):
        raise ValueError("Unsupported transfer register query filters")
    for sid in (ANNUAL_ID, PERIOD_ID):
        query = source_map[sid]["query_filters"]
        if query["report_with"] != "Imported weapons" or query["summarize_by"] != "Country":
            raise ValueError("Expected supplier breakdown of India's imports")
    if source_map[ANNUAL_ID]["query_filters"]["year_range_1"] != [START_YEAR, END_YEAR]:
        raise ValueError("Unexpected annual query range")
    if source_map[PERIOD_ID]["query_filters"]["year_ranges"] != [[2011,2015],[2016,2020],[2021,2025]]:
        raise ValueError("Unexpected comparison query ranges")

    entities = json.loads((root / "config/entities.json").read_text("utf-8"))
    evidence = json.loads((root / "config/reviewed_evidence.json").read_text("utf-8"))
    mapping = {e["source_label"]: e["entity_id"] for e in entities}
    if len(mapping) != len(entities) or len(set(mapping.values())) != len(entities):
        raise ValueError("Entity mapping must be one-to-one in this pilot")

    def entity(raw):
        try:
            return mapping[raw.strip()]
        except KeyError as exc:
            raise ValueError(f"Unmapped entity {raw!r}; review before loading") from exc

    exports = {sid: read_export(root / source_map[sid]["local_path"], "SIPRI AT Database ID" if sid == REGISTER_ID else "Supplier")
               for sid in (REGISTER_ID, ANNUAL_ID, PERIOD_ID)}
    tables = {name: [] for name in ["source_snapshot", "raw_row", "entity", "equipment", "transfer_deal", "delivery",
                                   "bilateral_annual", "recipient_annual", "supplier_period", "recipient_period", "evidence_claim", "quality_issue"]}
    for source in sources:
        sid = source["id"]
        tables["source_snapshot"].append([sid, source["publisher"], source["title"], source["url"], source["local_path"],
                                          source["retrieved_date"], source["sha256"], canonical(source),
                                          canonical(exports[sid].header) if sid in exports else None])
    for sid, export in exports.items():
        tables["raw_row"].extend([sid, line, canonical(cells)] for line, cells in export.rows)
    tables["entity"] = [[e["entity_id"], e["source_label"], e["source_label"], e["entity_type"]] for e in entities]

    register = exports[REGISTER_ID]
    if register.header != REGISTER_HEADER:
        raise ValueError("Transfer register schema changed; review columns before loading")
    equipment, deals = {}, {}
    for line, cells in register.rows:
        r = dict(zip(register.header, cells))
        deal_id = r["SIPRI AT Database ID"].strip()
        if not deal_id.isdigit() or r["Recipient"].strip() != "India":
            raise ValueError(f"Unexpected deal/recipient at line {line}")
        identity = tuple(r[k].strip() for k in ("Designation", "Description", "Armament category"))
        if not all(identity):
            raise ValueError(f"Missing equipment identity at line {line}")
        equipment_id = "eq_" + digest(identity)[:20]
        item = [equipment_id, *identity]
        if equipment_id in equipment and equipment[equipment_id] != item:
            raise ValueError("Equipment identity hash collision")
        equipment[equipment_id] = item
        deal = [REGISTER_ID, deal_id, entity(r["Supplier"]), entity(r["Recipient"]), equipment_id]
        if deal_id in deals and deals[deal_id] != deal:
            raise ValueError(f"Conflicting identity for deal {deal_id}")
        deals[deal_id] = deal
        delivery_year = year(r["Delivery year"], delivery=True)
        order_year = year(r["Order date"])
        if order_year is not None and order_year > delivery_year:
            raise ValueError(f"Order follows delivery for deal {deal_id}")
        tables["delivery"].append([
            REGISTER_ID, deal_id, delivery_year, line, order_year, flag(r["Order date is estimate"]),
            number(r["Deliveries in the Year Range"]), flag(r["Deliveries in the Year Range is estimate"]),
            flag(r["Delivery year is estimate"]), r["Status"].strip(), r["SIPRI estimate"],
            number(r["TIV deal unit"]), number(r["TIV delivery values"]), flag(r["Local production"]),
        ])
    tables["equipment"] = list(equipment.values())
    tables["transfer_deal"] = list(deals.values())
    check_unique(tables["delivery"], (0,1,2), "delivery")

    annual_values = {}
    for sid in (ANNUAL_ID, PERIOD_ID):
        export = exports[sid]
        header = export.header
        expected_header = ["Supplier"]
        ranges = [(2010,2025)] if sid == ANNUAL_ID else [(2011,2015),(2016,2020),(2021,2025)]
        for start, end in ranges:
            expected_header.extend([*(str(y) for y in range(start,end+1)), f"{start}-{end}", "Percentage"])
        expected_header.extend(["Sum total years", "Percentage of total"])
        if header != expected_header:
            raise ValueError(f"Supplier table schema changed: {sid}")
        seen = set()
        total_rows = 0
        for line, cells in export.rows:
            label = cells[0].strip()
            if label in seen:
                raise ValueError(f"Duplicate supplier/total row: {label}")
            seen.add(label)
            is_total = label == "Total exports to India"
            total_rows += is_total
            supplier_id = None if is_total else entity(label)
            for index, name in enumerate(header):
                if name.isdigit():
                    current_year = int(name)
                    value, status = tiv_cell(cells[index])
                    key = (label, current_year)
                    if sid == ANNUAL_ID:
                        annual_values[key] = value
                        if is_total:
                            tables["recipient_annual"].append([sid, "india", current_year, value, cells[index], line])
                        else:
                            tables["bilateral_annual"].append([sid, "india", supplier_id, current_year, value, status, cells[index], line])
                    elif key not in annual_values or annual_values[key] != value:
                        raise ValueError(f"Annual cell differs between exports: {key}")
                elif re.fullmatch(r"\d{4}-\d{4}", name):
                    start, end = map(int, name.split("-"))
                    volume, share = number(cells[index]), percent(cells[index+1])
                    if is_total:
                        tables["recipient_period"].append([sid,"india",start,end,volume,line])
                    else:
                        tables["supplier_period"].append([sid,"india",supplier_id,start,end,volume,share,cells[index],cells[index+1],line])
        if total_rows != 1:
            raise ValueError(f"Expected exactly one India total row: {sid}")
        if sid == ANNUAL_ID:
            annual_labels = seen
        elif seen != annual_labels:
            raise ValueError("Supplier labels differ between exports")

    for claim in evidence["claims"]:
        tables["evidence_claim"].append([claim[k] for k in ["claim_id","source_id","deal_source_id","sipri_deal_id",
                                                           "field_name","value_text","unit","locator","note"]])
    for issue in evidence["issues"]:
        if issue["sipri_deal_id"] is not None and issue["sipri_deal_id"] not in deals:
            raise ValueError("Quality issue refers to an absent deal")
        tables["quality_issue"].append([issue[k] for k in ["issue_id","source_id","sipri_deal_id","field_name",
                                                         "issue_type","related_claim_id","description"]] + ["open"])
    fingerprint = digest({"sources":manifest, "entities":entities, "evidence":evidence})
    return tables, fingerprint
