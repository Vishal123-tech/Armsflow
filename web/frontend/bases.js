// Curated public references. Coordinates are editorial city-area approximations,
// not surveyed base positions or boundaries. No operational status is inferred.
export const bases = [
  {id:'karwar',country:'india',name:'Naval Base Karwar',city:'Karwar',kind:'Naval base',coordinates:[74.1,14.8],source:'India Ministry of Defence / PIB',url:'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2017557',sourceDate:'2024-04-09'},
  {id:'norfolk',country:'united_states',name:'Naval Station Norfolk',city:'Norfolk',kind:'Naval base',coordinates:[-76.3,36.9],source:'US Navy',url:'https://cnrma.cnic.navy.mil/Installations/NAVSTA-Norfolk/',sourceDate:'Undated'},
  {id:'portsmouth',country:'united_kingdom',name:'HMNB Portsmouth',city:'Portsmouth',kind:'Naval base',coordinates:[-1.1,50.8],source:'Royal Navy',url:'https://www.royalnavy.mod.uk/locations-and-operations/bases-and-stations/hmnb-portsmouth',sourceDate:'Undated'},
  {id:'toulon',country:'france',name:'Base navale de Toulon',city:'Toulon',kind:'Naval base',coordinates:[5.9,43.1],source:'French Ministry of the Armed Forces',url:'https://www.defense.gouv.fr/marine/mieux-nous-connaitre/notre-organisation',sourceDate:'Undated'},
  {id:'haifa',country:'israel',name:'Haifa naval base',city:'Haifa',kind:'Naval base',coordinates:[35,32.8],source:'Israeli Navy / IDF',url:'https://m.www.idf.il/en/mini-sites/israeli-navy/',sourceDate:'Undated'},
  {id:'zhanjiang',country:'china',name:'Zhanjiang military port',city:'Zhanjiang',kind:'Military port',coordinates:[110.4,21.3],source:'China Ministry of National Defense',url:'https://eng.mod.gov.cn/xb/News_213114/TopStories/16226088.html',sourceDate:'2023'},
  {id:'jauhar',country:'pakistan',name:'PNS Jauhar / PNEC',city:'Karachi',kind:'Naval training institution',coordinates:[67,24.9],source:'Pakistan Navy Engineering College / NUST',url:'https://pnec.nust.edu.pk/contact/',sourceDate:'Undated'},
  {id:'severomorsk',country:'russia',name:'Northern Fleet headquarters',city:'Severomorsk',kind:'Naval headquarters',coordinates:[33.4,69.1],source:'US Defense Intelligence Agency — Russia Military Power',url:'https://www.govinfo.gov/content/pkg/GOVPUB-D5_200-PURL-gpo82226/pdf/GOVPUB-D5_200-PURL-gpo82226.pdf',sourceDate:'2017 (historical reference)'}
];

let enabled=false, scope='all';
export function mountBases(svg,projection,recipient,names){
  document.querySelector('#base-controls')?.remove();
  const panel=document.createElement('section');panel.id='base-controls';panel.className='base-controls';
  panel.innerHTML='<label><input type="checkbox"> Show military bases & facilities</label> <label>Coverage <select><option value="all">All curated countries</option><option value="recipient">Selected recipient</option></select></label><p class="base-coverage"></p><div class="base-list"></div><div class="base-detail" aria-live="polite"></div>';
  svg.before(panel);
  const toggle=panel.querySelector('input'),filter=panel.querySelector('select');toggle.checked=enabled;filter.value=scope;
  const ns='http://www.w3.org/2000/svg',layer=document.createElementNS(ns,'g');layer.classList.add('base-layer');svg.append(layer);
  function show(base){
    const detail=panel.querySelector('.base-detail');detail.replaceChildren();
    const title=document.createElement('h3');title.textContent=base.name;
    const text=document.createElement('p');text.textContent=`${names[base.country]} · ${base.city} · ${base.kind}. Approximate city-area marker. Source date: ${base.sourceDate}; reviewed 9 November 2026. Current operational status is not tracked.`;
    const link=document.createElement('a');link.textContent=`Source: ${base.source} ↗`;link.href=base.url;link.target='_blank';link.rel='noopener noreferrer';detail.append(title,text,link);
  }
  function render(){
    enabled=toggle.checked;scope=filter.value;layer.replaceChildren();panel.querySelector('.base-detail').replaceChildren();
    const items=bases.filter(b=>scope==='all'||b.country===recipient),list=panel.querySelector('.base-list');list.replaceChildren();list.hidden=!enabled;
    panel.querySelector('.base-coverage').textContent=`${items.length} curated public examples ${scope==='all'?'across 8 countries':`for ${names[recipient]}`}. Partial coverage; North Korea and Ukraine have no verified entries yet. City-area approximations, not base boundaries. Independent of the import-period filter.`;
    if(!enabled){svg.dispatchEvent(new Event('mapcontentchange'));return;}
    for(const base of items){
      const point=projection(base.coordinates),marker=document.createElementNS(ns,'g');marker.classList.add('base-marker');marker.dataset.x=point[0];marker.dataset.y=point[1];marker.setAttribute('transform',`translate(${point})`);marker.setAttribute('tabindex','0');marker.setAttribute('role','button');marker.setAttribute('aria-label',`${base.name}, ${base.city}, approximate location`);
      const shape=document.createElementNS(ns,'path');shape.setAttribute('d','M0,-8 L8,0 L0,8 L-8,0 Z');const title=document.createElementNS(ns,'title');title.textContent=base.name;marker.append(shape,title);
      marker.addEventListener('click',e=>{e.stopPropagation();show(base);});marker.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();show(base);}});layer.append(marker);
      const button=document.createElement('button');button.type='button';button.textContent=base.name;button.addEventListener('click',()=>show(base));list.append(button);
    }
    svg.dispatchEvent(new Event('mapcontentchange'));
  }
  toggle.addEventListener('change',render);filter.addEventListener('change',render);render();
}
