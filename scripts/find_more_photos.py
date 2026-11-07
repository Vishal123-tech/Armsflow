import urllib.request,urllib.parse,json,time,sys,re,html
from pathlib import Path
sys.stdout.reconfigure(encoding='utf-8')
d=json.loads(Path('work/photo_candidates.json').read_text())
queries=['"JDAM-ER"','"KC-135" aircraft','"LM2500"','"MH-60R"','"MQ-9" Reaper','"Mark 54" torpedo','"P-8A" Poseidon','"FIM-92" Stinger','"APS-153"','"CH-47F" Chinook helicopter']
for q in queries:
 try:
  params=dict(action='query',format='json',generator='search',gsrsearch=q+' filetype:bitmap',gsrnamespace=6,gsrlimit=2,prop='imageinfo',iiprop='url|extmetadata',iiurlwidth=600)
  req=urllib.request.Request('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params),headers={'User-Agent':'ArmsFlowResearch/1.0'})
  result=json.load(urllib.request.urlopen(req,timeout=15));items=sorted(result.get('query',{}).get('pages',{}).values(),key=lambda x:x.get('index',0));d[q]=items
  print(q,[(p['title'],p['imageinfo'][0]['extmetadata'].get('LicenseShortName',{}).get('value')) for p in items],result.get('error',''))
 except Exception as e:print(q,str(e))
 time.sleep(1)
Path('work/photo_candidates.json').write_text(json.dumps(d))
