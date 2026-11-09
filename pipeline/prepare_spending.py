"""Extract focused spending series, preserving missing values and estimate flags."""
import hashlib
import json
from pathlib import Path
import openpyxl
from openpyxl.styles.colors import COLOR_INDEX
from web.countries import COUNTRIES
ROOT=Path(__file__).resolve().parents[1]

def build():
    path=ROOT/"data/raw/sipri_milex_1949_2025.xlsx"
    book=openpyxl.load_workbook(path,data_only=True)
    aliases={"united_states":"United States of America","north_korea":"Korea, North"}
    countries={key:dict(name=name,series=[dict(year=y) for y in range(2010,2026)]) for key,name in COUNTRIES.items()}
    for sheet,key,multiplier in [("Current US$","current_usd_million",1),("Constant (2024) US$","constant_2024_usd_million",1),("Share of GDP","gdp_percent",100)]:
        ws=book[sheet]
        years={c.value:c.column for c in ws[6] if isinstance(c.value,int)}
        rows={r[0].value:r for r in ws.iter_rows(min_row=7) if r[0].value}
        for cid,country in countries.items():
            name=aliases.get(cid,country["name"])
            if name not in rows: raise ValueError(f"Missing country {name}")
            row=rows[name]
            for entry in country["series"]:
                cell=row[years[entry["year"]]-1]
                v=cell.value
                if isinstance(v,(int,float)):
                    if v<0: raise ValueError("Negative spending")
                    entry[key]=v*multiplier
                else:
                    if v not in (None,"...",". .","..","xxx",""): raise ValueError(f"Unexpected value {v}")
                    entry[key]=None
                color=cell.font.color
                rgb=COLOR_INDEX[color.indexed] if color and color.type=="indexed" and color.indexed<len(COLOR_INDEX) else color.rgb if color and color.type=="rgb" else ""
                entry[key+"_status"]="unavailable" if entry[key] is None else "highly_uncertain" if rgb[-6:] == "FF0000" else "estimate" if rgb[-6:]=="0000FF" else "not_flagged"
    payload=dict(source=dict(publisher="SIPRI",url="https://www.sipri.org/databases/milex",download_url="https://www.sipri.org/sites/default/files/SIPRI-Milex-data-1949-2025_v1.2.xlsx",retrieved_date="2026-11-08",sha256=hashlib.sha256(path.read_bytes()).hexdigest(),edition="1949â€“2025, v1.2",notes="Calendar-year spending; not arms import expenditure. Workbook country footnotes apply. Unavailable cells are not zero."),countries=countries)
    (ROOT/"data/processed/military_spending.json").write_text(json.dumps(payload,separators=(",",":")),encoding="utf-8")
    (ROOT/"data/spending_source_manifest.json").write_text(json.dumps(payload["source"],indent=2),encoding="utf-8")
    print("Validated 480 country-year measures with source flags.")
if __name__=="__main__": build()
