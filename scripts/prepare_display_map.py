import json
from pathlib import Path
from shapely.geometry import LinearRing
source=Path('web/static/india-soi.json');d=json.loads(source.read_text());rings=d['geometry']['coordinates'];before=sum(map(len,rings))
# Simplify each closed ring independently, retaining every island/ring and orientation.
result=[]
for ring in rings:
 simplified=list(LinearRing(ring).simplify(.002,preserve_topology=True).coords)
 if len(simplified)<4:simplified=ring
 result.append([[round(x,6),round(y,6)] for x,y in simplified])
d['geometry']['coordinates']=result;d['properties']['display_generalization']='0.002 degree tolerance; all source rings retained; original source preserved'
out=Path('web/static/india-soi-display.json');out.write_text(json.dumps(d,separators=(',',':')))
assert len(rings)==len(result)
report={'original_vertices':before,'display_vertices':sum(map(len,result)),'original_bytes':source.stat().st_size,'display_bytes':out.stat().st_size,'rings_retained':len(result)}
Path('docs/map_optimization.json').write_text(json.dumps(report,indent=2));print(report)
