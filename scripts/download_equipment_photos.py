import json,re,html,urllib.request,hashlib,concurrent.futures
from pathlib import Path
c=json.loads(Path('work/photo_candidates.json').read_text())
choices={
'AE-3007':('AE 3007 engine',0,'AE 3007 installed engine'),
'AGM-114 Hellfire-2':('AGM-114 Hellfire missile',0,'AGM-114 family photograph; exact variant unconfirmed'),
'AGM-114L Hellfire':('AGM-114L',0,'AGM-114L launch photograph'),
'AH-64E Apache':('AH-64E Apache',2,'Indian Air Force AH-64E'),
'APG-78 Longbow':('APG-78 radar',0,'APG-78 radar on Japanese AH-64D'),
'APKWS':('"APKWS"',1,'APKWS display rocket'),
'C-130J Hercules':('C-130J Hercules India',0,'Indian Air Force C-130J'),
'C-17':('"C-17" Globemaster',0,'C-17 aircraft; US operator'),
'CH-47F':('"CH-47F"',0,'CH-47 family photograph; exact variant unconfirmed'),
'Excalibur':('"M982" Excalibur',1,'Inert XM982 display round'),
'F-404 (8000)':('"F404" engine',0,'F404-GE-400 engine photograph'),
'Harpoon Block-2':('"Harpoon" missile',0,'Harpoon family launcher; exact variant unconfirmed'),
'JDAM-ER':('"JDAM-ER"',0,'JDAM-ER carried by Ukrainian Su-27'),
'KC-135':('"KC-135" aircraft',0,'KC-135R aircraft')}
def clean(t):return html.unescape(re.sub('<[^>]+>','',t)).strip()
def fetch(pair):
 name,(query,index,caption)=pair;p=c[query][index];i=p['imageinfo'][0];m=i['extmetadata'];url=i.get('thumburl',i['url']);ext='.png' if '.png/' in url or '.png?' in url else '.jpg';fn=hashlib.sha256(name.encode()).hexdigest()[:12]+ext;path=Path('web/static/equipment')/fn
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'ArmsFlowResearch/1.0'});response=urllib.request.urlopen(req,timeout=30);assert response.headers.get_content_type().startswith('image/');path.write_bytes(response.read())
  return name,dict(src='/static/equipment/'+fn,alt=caption,credit=clean(m.get('Artist',{}).get('value','Source credited on Commons'))+' · '+m['LicenseShortName']['value'],url=i['descriptionurl'],license=m.get('LicenseUrl',{}).get('value',i['descriptionurl']),caption=caption,title=p['title'],retrieved='2026-11-07',changes='Thumbnail resized by Wikimedia; no additional edits')
 except Exception as e:print('FAILED',name,e,flush=True);return name,None
out=dict(concurrent.futures.ThreadPoolExecutor(max_workers=2).map(fetch,choices.items()));out={k:v for k,v in out.items() if v};Path('web/frontend/photos.json').write_text(json.dumps(out,indent=2));print('Saved',len(out),'photographs')
