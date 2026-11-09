"""Validate the global register and build focused country equipment records."""
import hashlib
import json
from collections import defaultdict
from decimal import Decimal
from pathlib import Path
from pipeline.clean import read_export, REGISTER_HEADER, number, year, flag, digest
from web.countries import COUNTRIES
ROOT = Path(__file__).resolve().parents[1]

def build():
    path = ROOT / "data/raw/sipri_global_transfer_register_2010_2025.csv"
    export = read_export(path, "SIPRI AT Database ID")
    if export.header != REGISTER_HEADER:
        raise ValueError("Global register schema changed")
    source = dict(publisher="SIPRI", title="Global annual delivery register, 2010–2025", url="https://armstransfers.sipri.org/ArmsTransfer/TransferRegister", retrieved_date="2026-11-08", sha256=hashlib.sha256(path.read_bytes()).hexdigest(), years=[2010,2025], annual_deliveries=True, only_deliveries_in_range=True)
    names = {name: key for key, name in COUNTRIES.items()}
    result = {key: dict(name=name, equipment={}) for key,name in COUNTRIES.items()}
    seen, identities = set(), {}
    totals = defaultdict(Decimal)
    for line, cells in export.rows:
        r = dict(zip(export.header, cells))
        deal, recipient, supplier = r["SIPRI AT Database ID"], r["Recipient"].strip(), r["Supplier"].strip()
        dy = year(r["Delivery year"], delivery=True)
        tiv = number(r["TIV delivery values"], required=True)
        identity = tuple(r[k].strip() for k in ("Designation", "Description", "Armament category"))
        if not deal.isdigit() or (deal,dy) in seen or not all(identity) or not supplier or not recipient:
            raise ValueError(f"Invalid or duplicate record at line {line}")
        seen.add((deal,dy))
        signature=(recipient,supplier,identity)
        if deal in identities and identities[deal]!=signature:
            raise ValueError(f"Conflicting deal identity: {deal}")
        identities[deal]=signature
        if recipient not in names:
            continue
        cid=names[recipient]
        eid="eq_"+digest(identity)[:20]
        item=result[cid]["equipment"].setdefault(eid, dict(equipment_id=eid, designation=identity[0], description=identity[1], category=identity[2], recipient=recipient, deliveries=[], source=source, model=None, claims=[], issues=[]))
        item["deliveries"].append(dict(source_id="sipri_global_register_2010_2025", source_line=line, sipri_deal_id=deal, supplier=supplier, supplier_id=supplier.lower().replace(" ","_"), delivery_year=dy, order_year=year(r["Order date"]), order_year_estimated=flag(r["Order date is estimate"]), quantity_delivered=float(number(r["Deliveries in the Year Range"])) if r["Deliveries in the Year Range"].strip() else None, quantity_estimated=flag(r["Deliveries in the Year Range is estimate"]), delivery_year_estimated=flag(r["Delivery year is estimate"]), condition_reported=r["Status"], local_production_reported=flag(r["Local production"]), tiv_delivered_million=float(tiv)))
        totals[cid]+=tiv
    for cid, country in result.items():
        for item in country["equipment"].values():
            rows=sorted(item["deliveries"],key=lambda r:(r["delivery_year"],r["supplier"],r["sipri_deal_id"]))
            item["deliveries"]=rows
            item.update(delivered_quantity=sum(r["quantity_delivered"] for r in rows) if all(r["quantity_delivered"] is not None for r in rows) else None, tiv_million=round(sum(r["tiv_delivered_million"] for r in rows),6), suppliers=sorted({r["supplier"] for r in rows}), delivery_years=sorted({r["delivery_year"] for r in rows}), first_delivery_year=min(r["delivery_year"] for r in rows), last_delivery_year=max(r["delivery_year"] for r in rows), estimated_rows=sum(r["quantity_estimated"] is True for r in rows), unspecified_estimate_rows=sum(r["quantity_estimated"] is None for r in rows))
        country["total_tiv_million"]=float(totals[cid])
    # Preserve and independently reconcile the previously verified India pilot.
    import duckdb
    con=duckdb.connect(str(ROOT/"data/processed/armsflow.duckdb"),read_only=True)
    old=con.execute("SELECT sipri_deal_id, delivery_year, tiv_delivered_million FROM delivery").fetchall()
    new={(r["sipri_deal_id"],r["delivery_year"]):Decimal(str(r["tiv_delivered_million"])) for i in result["india"]["equipment"].values() for r in i["deliveries"]}
    if {(str(d),y):v for d,y,v in old}!=new:
        raise ValueError("New global register does not reconcile with India pilot")
    con.close()
    payload=dict(source=source,countries=result)
    (ROOT/"data/processed/focus_countries.json").write_text(json.dumps(payload,separators=(",",":")),encoding="utf-8")
    report=dict(source=source,global_rows=len(seen),india_reconciled=True,countries={k:dict(equipment=len(v["equipment"]),delivery_rows=sum(len(i["deliveries"]) for i in v["equipment"].values()),tiv_million=v["total_tiv_million"]) for k,v in result.items()})
    (ROOT/"data/focus_source_manifest.json").write_text(json.dumps(report,indent=2),encoding="utf-8")
    print(json.dumps(report["countries"],indent=2))

if __name__=="__main__":
    build()
