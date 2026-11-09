"""Read-only focused-country queries; no inference of present inventories."""
import json
from functools import lru_cache
from pathlib import Path
from collections import defaultdict
ROOT=Path(__file__).resolve().parents[1]

@lru_cache(maxsize=1)
def data():
    return json.loads((ROOT/"data/processed/focus_countries.json").read_text(encoding="utf-8"))

def equipment(country, query="", category="", supplier="", models=False):
    if models:
        return []
    items=[]
    for item in data()["countries"][country]["equipment"].values():
        if query.lower() not in (item["designation"]+" "+item["description"]).lower() or (category and item["category"]!=category):
            continue
        if supplier and not any(r["supplier_id"]==supplier for r in item["deliveries"]):
            continue
        row={k:v for k,v in item.items() if k not in ("deliveries","claims","issues","source")}
        row["suppliers"]=", ".join(row["suppliers"])
        items.append(row)
    return sorted(items,key=lambda r:r["designation"])

def detail(country,eid):
    return data()["countries"][country]["equipment"].get(eid)

def overview(country,period):
    start,end=map(int,period.split("-"))
    annual=defaultdict(float)
    suppliers={}
    for item in data()["countries"][country]["equipment"].values():
        for row in item["deliveries"]:
            sid=row["supplier_id"]; suppliers[sid]=row["supplier"]
            annual[(sid,row["delivery_year"])]+=row["tiv_delivered_million"]
    volumes={sid:sum(annual[(sid,y)] for y in range(start,end+1)) for sid in suppliers}
    total=sum(volumes.values())
    ranked=sorted([dict(supplier_id=sid,supplier=suppliers[sid],recorded_tiv_million=round(v,6),share_percent=100*v/total if total else 0,metric_status="ok" if total else "no_recorded_imports") for sid,v in volumes.items()],key=lambda r:(-r["recorded_tiv_million"],r["supplier"]))
    shares=[r["share_percent"]/100 for r in ranked]
    timeline=[]
    for y in range(2010,2026):
        t=sum(annual[(sid,y)] for sid in suppliers)
        timeline.extend(dict(year=y,supplier_id=sid,supplier=suppliers[sid],share_percent=100*annual[(sid,y)]/t if t else 0) for sid in suppliers)
    return dict(summary=dict(metric_status="ok" if total else "no_recorded_imports",total_tiv_million=round(total,6),top_supplier_share=max(shares,default=0) if total else None,top_suppliers=ranked[0]["supplier"] if total else "No recorded imports",top_three_share=sum(shares[:3]) if total else None,hhi=sum(s*s for s in shares) if total else None),suppliers=ranked,timeline=timeline,source=data()["source"],units="millions of SIPRI TIV",coverage_note="No records is not evidence of no weapons or no domestic production.")

@lru_cache(maxsize=1)
def spending_data():
    return json.loads((ROOT/"data/processed/military_spending.json").read_text(encoding="utf-8"))

def spending(country):
    return dict(**spending_data()["countries"][country],source=spending_data()["source"])
