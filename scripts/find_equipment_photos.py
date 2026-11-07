import urllib.request,urllib.parse,json,concurrent.futures,re,html
from pathlib import Path
queries=['AE 3007 engine','AGM-114 Hellfire missile','AGM-114L','AH-64E Apache','APG-78 radar','APKWS rocket','APS-153 radar','C-130J Hercules India','C-17 India','CBU-97','CH-47F India','M982 Excalibur','General Electric F404 engine','Harpoon Block II missile','JDAM ER','KC-135 Stratotanker','LM2500 gas turbine','MH-60R Seahawk','MQ-9 Reaper','Mark 54 torpedo','P-8A Poseidon','FIM-92 Stinger']
def fetch(q):
 params=dict(action='query',format='json',generator='search',gsrsearch=q+' filetype:bitmap',gsrnamespace=6,gsrlimit=3,prop='imageinfo',iiprop='url|extmetadata',iiurlwidth=600)
 try:
  req=urllib.request.Request('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params),headers={'User-Agent':'ArmsFlowResearch/1.0'})
  d=json.load(urllib.request.urlopen(req,timeout=30));return q,sorted(d.get('query',{}).get('pages',{}).values(),key=lambda x:x.get('index',0))
 except Exception as e:return q,[]
results=dict(concurrent.futures.ThreadPoolExecutor(max_workers=3).map(fetch,queries));Path('work/photo_candidates.json').write_text(json.dumps(results))
for q,items in results.items():
 print(q)
 for i,p in enumerate(items):
  m=p['imageinfo'][0]['extmetadata'];print(i,p['title'], '|',m.get('LicenseShortName',{}).get('value'), '|',html.unescape(re.sub('<[^>]*>','',m.get('ImageDescription',{}).get('value','')))[:180])
