import json
from pathlib import Path
DATA=json.loads((Path(__file__).resolve().parents[1]/'data/processed/additional_recipients.json').read_text())
def overview(country,period):
 start,end=map(int,period.split('-'))
 items=DATA[country]['items']
 volumes=[sum(v or 0 for v in r['values'][start-2010:end-2009]) for r in items]
 total=sum(volumes)
 suppliers=sorted([dict(supplier=r['supplier'],supplier_id=r['supplier_id'],recorded_tiv_million=v,share_percent=100*v/total if total else 0,metric_status='ok') for r,v in zip(items,volumes)],key=lambda x:-x['recorded_tiv_million'])
 shares=[r['share_percent']/100 for r in suppliers]
 timeline=[]
 for i in range(16):
  annual=sum(r['values'][i] or 0 for r in items)
  timeline.extend(dict(year=2010+i,supplier=r['supplier'],supplier_id=r['supplier_id'],share_percent=100*(r['values'][i] or 0)/annual if annual else 0) for r in items)
 return dict(summary=dict(recipient_id=country,period_id=period,metric_status='ok',total_tiv_million=total,top_supplier_share=shares[0] if shares else 0,top_suppliers=suppliers[0]['supplier'] if total else 'No identified deliveries',top_three_share=sum(shares[:3]),hhi=sum(x*x for x in shares)),suppliers=suppliers,timeline=timeline,source=DATA[country]['source'],units='millions of SIPRI TIV (rounded annual cells)')
