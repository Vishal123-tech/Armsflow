import { loadSimilarity, installSimilarity } from './similarity.js';
import { loadInsights, installInsights } from './insights.js';
import majorCities from './major-cities.json';
import capitals from './capitals.json';
import { installMapZoom } from './interactions.js';
import equipmentPhotos from './photos.json';
import { EquipmentViewer } from './viewer.js';

import { geoNaturalEarth1,geoPath,geoCentroid } from 'd3-geo';

import { feature } from 'topojson-client';



const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const fmt=(value,digits=0)=>value==null?'—':new Intl.NumberFormat('en-IN',{maximumFractionDigits:digits,minimumFractionDigits:digits}).format(value);

const pct=value=>value==null?'—':`${fmt(value,1)}%`;

const range=(a,b)=>a===b?String(a):`${a}–${b}`;

const periodLabel=value=>value?.replaceAll('-','–');

const cleanName=value=>value.replace(/\s+-+$/,'');

const palette={russia:'#b5c08a',france:'#75a8bb',israel:'#7ba89a',united_states:'#edb948'};

const named={russia:'Russia',france:'France',israel:'Israel',united_states:'United States'};

let meta,viewer,currentRecord,recordRequest=0,overviewRequest=0,compareRequest=0,libraryRequest=0;

let worldPromise,indiaPromise;
let recipientId="india";
let recipientNames={india:"India",russia:"Russia",united_states:"United States"};



async function api(url){const response=await fetch(url);const data=await response.json();if(!response.ok)throw new Error(data.error||'The data could not be loaded.');return data;}

function showError(error){$('#global-error').textContent=error.message;$('#global-error').hidden=false;}

function clearError(){$('#global-error').hidden=true;}

function metric(label,value,note='',unit=''){return `<div class="metric"><span class="metric-label">${esc(label)}</span><div class="metric-value">${esc(value)}${unit?`<small>${esc(unit)}</small>`:''}</div>${note?`<div class="metric-note">${esc(note)}</div>`:''}</div>`;}



function silhouette(key){

  const paths={

    rafale:'M100 4L108 53 151 86 153 94 111 81 108 108 117 118 116 123 101 116 84 123 83 118 92 108 89 81 47 94 49 86 92 53Z',

    tank:'M24 76L34 66 151 66 167 77 171 96 162 107 34 107 24 97ZM47 63L62 46 110 42 128 57 184 55 187 61 126 65Z',

    frigate:'M13 91L177 91 192 79 155 77 144 68 118 68 111 52 98 52 98 29 94 29 94 52 80 52 71 73 53 73 48 85 14 85Z',

    submarine:'M14 82C14 65 39 59 68 60L74 38 94 33 109 38 116 59 165 62 178 72 189 65 191 69 183 82 193 93 191 97 177 91 164 101 50 103C28 101 15 96 14 82Z'

  };

  return `<svg viewBox="0 0 200 130" aria-hidden="true"><path d="${paths[key]||paths.rafale}"/>${key==='tank'?'<path d="M38 94h117M40 86h115" fill="none"/>':''}</svg>`;

}



function equipmentPicture(item){
  const name=cleanName(item.designation);
  const photo=equipmentPhotos[name];
  if(photo)return {html:`<img src="${esc(photo.src)}" alt="${esc(photo.alt)}" loading="lazy">`,credit:`${photo.caption} · ${photo.credit}`,url:photo.url,license:photo.license};
  if(name==='T-90S')return {html:'<img src="/static/equipment/t90.jpg" alt="Indian Army T-90S tank" loading="lazy">',credit:'Photo: cell105 / Commons · CC BY 2.0',url:'https://commons.wikimedia.org/wiki/File:Indian_Army_T-90.jpg',license:'https://creativecommons.org/licenses/by/2.0/'};
  if(name==='Su-30MK')return {html:'<img src="/static/equipment/su30.jpg" alt="Indian Air Force Su-30MKI; representative variant photograph" loading="lazy">',credit:'Su-30MKI variant · Sanil Nath · CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:Sukhoi_Su-30MKi.jpg',license:'https://creativecommons.org/licenses/by/4.0/'};
  return {html:'<span class="photo-unavailable">Photo not yet verified</span>',credit:'No verified photograph for this equipment record'};
}
function equipmentPhotoCard(item){
  const picture=equipmentPicture(item);
  return `<article class="weapon-photo-card"><button data-record="${item.equipment_id}" class="weapon-photo-open"><span class="weapon-photo">${picture.html}</span><span class="weapon-card-body"><span class="eyebrow">${esc(item.category)}</span><strong>${esc(cleanName(item.designation))} ↗</strong><span>${esc(item.description)}</span><span>${item.estimated_rows?'≈':''}${fmt(item.delivered_quantity)} recorded deliveries · ${range(item.first_delivery_year,item.last_delivery_year)}</span></span></button><div class="weapon-credit">${picture.url?`<a href="${picture.url}" target="_blank" rel="noopener">${esc(picture.credit)}</a> · <a href="${picture.license}" target="_blank" rel="noopener">License</a>`:picture.credit}</div></article>`;
}

let detailRequest=0;
async function openEquipmentDetails(id,recipient="india"){
  let dialog=$('#equipment-details');
  if(!dialog){dialog=document.createElement('dialog');dialog.id='equipment-details';dialog.setAttribute('aria-labelledby','detail-title');document.body.append(dialog);}
  const token=++detailRequest;
  dialog.innerHTML='<div class="dialog-heading"><h2 id="detail-title">Equipment details</h2><button class="icon-button detail-close" aria-label="Close weapon details">×</button></div><div class="detail-body">Loading source records…</div>';
  dialog.querySelector('.detail-close').onclick=()=>dialog.close();if(!dialog.open)dialog.showModal();
  try{
    const item=await api(`/api/equipment/${encodeURIComponent(id)}?recipient=${encodeURIComponent(recipient)}`);if(token!==detailRequest)return;
    $('#detail-title').textContent=cleanName(item.designation);
    const picture=equipmentPicture(item);
    const flag=value=>value===true?'Estimated':value===false?'Not flagged':'Unspecified';
    dialog.querySelector('.detail-body').innerHTML=`<div class="detail-overview"><div><div class="detail-photo">${picture.html}</div><p class="weapon-credit">${picture.url?`<a href="${esc(picture.url)}" target="_blank" rel="noopener">${esc(picture.credit)}</a> · <a href="${esc(picture.license)}" target="_blank" rel="noopener">License</a>`:esc(picture.credit)}</p></div><div><span class="eyebrow">${esc(item.category)}</span><h3>${esc(item.description)}</h3><dl class="record-facts"><div><dt>Suppliers</dt><dd>${esc(item.suppliers.join(', '))}</dd></div><div><dt>Recipient</dt><dd>${esc(item.recipient)}</dd></div><div><dt>Recorded deliveries</dt><dd>${item.estimated_rows?'≈':''}${fmt(item.delivered_quantity)}</dd></div><div><dt>Delivery years</dt><dd>${item.delivery_years.join(', ')}</dd></div><div><dt>Transfer volume</dt><dd>${fmt(item.tiv_million,2)} million TIV</dd></div><div><dt>Quantity estimates</dt><dd>${item.estimated_rows} of ${item.deliveries.length} rows</dd></div></dl><p class="history-note">Historical deliveries within 2010–2025, not current inventory. TIV is not a price. Technical specifications are not included in this source register.</p>${item.model?'<button class="button primary" id="detail-3d">Open 3D viewer ↗</button>':''}</div></div>
    <h3>Delivery records</h3><p class="history-note">Scroll horizontally to inspect all recorded fields. Unknown source values remain unspecified.</p><div class="table-scroll"><table><thead><tr><th>Year</th><th>Supplier</th><th>Quantity</th><th>Quantity flag</th><th>Order year</th><th>Condition</th><th>Local production (raw)</th><th>Delivered TIV (million)</th><th>Deal / source line</th></tr></thead><tbody>${item.deliveries.map(r=>`<tr><td>${r.delivery_year}${r.delivery_year_estimated?' (est.)':''}</td><td>${esc(r.supplier)}</td><td>${fmt(r.quantity_delivered)}</td><td>${flag(r.quantity_estimated)}</td><td>${r.order_year??'Unspecified'}${r.order_year_estimated?' (est.)':''}</td><td>${esc(r.condition_reported||'Unspecified')}</td><td>${esc(r.local_production_reported??'Unspecified')}</td><td>${fmt(r.tiv_delivered_million,3)}</td><td>${esc(r.sipri_deal_id)} / ${r.source_line}</td></tr>`).join('')}</tbody></table></div>
    <h3>Source and verification</h3><p><a href="${esc(item.source.url)}" target="_blank" rel="noopener">${esc(item.source.publisher)} · ${esc(item.source.title)} ↗</a></p><p class="history-note">Retrieved ${esc(item.source.retrieved_date)}</p>${item.claims.map(c=>`<p class="history-issue"><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.publisher)}</a>: ${esc(c.field_name)} — ${esc(c.value_text)}. ${esc(c.note)}</p>`).join('')}${item.issues.length?'<h3>Open quality notes</h3>'+item.issues.map(i=>`<p class="history-issue">${esc(i.description)}</p>`).join(''):'<p class="history-note">No equipment-specific quality issue is logged. This does not mean every field was independently verified.</p>'}`;
    dialog.querySelector('#detail-3d')?.addEventListener('click',()=>{dialog.close();location.hash='explorer';loadRecord(id);});
  }catch(error){if(token===detailRequest)dialog.querySelector('.detail-body').textContent=error.message;}
}

async function loadRecord(id){

  const token=++recordRequest;clearError();

  try{

    const item=await api(`/api/equipment/${encodeURIComponent(id)}`);if(token!==recordRequest)return;

    currentRecord=item;const name=cleanName(item.designation),years=item.delivery_years;

    $('#viewer-category').textContent=`${String(Object.keys(meta.models).indexOf(id)+1||1).padStart(2,'0')} / ${item.category.toUpperCase()}`;

    $('#viewer-watermark').textContent=name.toUpperCase();

    $('#viewer-status').classList.remove('error');

    if(viewer){viewer.setModel(item.model?.key);$('#viewer-status').hidden=!!item.model;}

    if(!item.model){$('#viewer-status').textContent='A 3D exterior is not included for this record yet. Explore its verified delivery data alongside.';$('#viewer-status').hidden=false;}

    const qtyClaim=item.claims.find(c=>c.claim_id==='rafale_programme_deliveries');

    const quantity=(item.estimated_rows&&!qtyClaim?'≈':'')+fmt(item.delivered_quantity);

    const unit=item.category==='Aircraft'?'Aircraft':item.category==='Ships'?'Vessels':item.category==='Armoured vehicles'?'Vehicles':'Units';

    let estimate=item.estimated_rows?`${item.estimated_rows} of ${item.deliveries.length} delivery records have estimated quantities.`:'No quantity estimates flagged in these records.';

    if(item.unspecified_estimate_rows)estimate+=` ${item.unspecified_estimate_rows} flags unspecified.`;

    if(qtyClaim)estimate='Programme total corroborated by India’s Ministry of Defence. Two yearly quantities are estimated.';

    $('#equipment-panel').innerHTML=`<div class="record-intro"><div class="record-route"><span>${esc(item.suppliers.join(' / '))}</span><span>→</span><span>INDIA</span></div><h2 class="record-name">${esc(name.toUpperCase())}</h2><p class="record-description">${esc(item.description)}</p></div>

      <div class="record-quantity"><strong>${esc(quantity)}</strong><div>${unit} delivered<small>${range(years[0],years.at(-1))}<br>Historical deliveries</small></div></div>

      <dl class="record-facts"><div><dt>Category</dt><dd>${esc(item.category)}</dd></div><div><dt>Recipient</dt><dd>India</dd></div><div><dt>Transfer volume</dt><dd>${fmt(item.tiv_million,1)} million TIV</dd></div></dl>

      <p class="estimate-note">${esc(estimate)}</p>

      <div class="record-source"><span>${qtyClaim?'CORROBORATING SOURCE':'SOURCE RECORD'}</span><a href="${esc(qtyClaim?.url||item.source.url)}" target="_blank" rel="noopener">${qtyClaim?'PIB / Ministry of Defence':'SIPRI Arms Transfers Database'} <span>↗</span></a><p>${qtyClaim?'Year-end review 2022 · completed programme deliveries':'2010–2025 delivery register · retrieved 6 Nov 2026'}</p></div>

      <button class="button primary" id="show-history">View transfer history <span>↘</span></button>`;

    $('#show-history').addEventListener('click',showHistory);

    $$('.equipment-card').forEach(card=>card.classList.toggle('active',card.dataset.equipment===id));

    $$('.view-presets [data-angle]').forEach(button=>button.classList.toggle('active',button.dataset.angle==='perspective'));

    $('#history-section').hidden=true;

    document.title=`${name} · ArmsFlow`;

  }catch(error){if(token===recordRequest)showError(error);}

}



function showHistory(){

  const item=currentRecord;if(!item)return;

  $('#history-heading').textContent=`${cleanName(item.designation)} · delivery history`;

  $('#history-content').innerHTML=`<p class="history-note">${item.deliveries.length} source records within 2010–2025. Quantities are historical deliveries, not current inventory.</p><div class="table-scroll"><table><thead><tr><th>Delivery year</th><th>Supplier</th><th>Quantity</th><th>Quantity estimate</th><th>Deal reference</th></tr></thead><tbody>${item.deliveries.map(row=>`<tr><td>${row.delivery_year}${row.delivery_year_estimated?' (estimated)':''}</td><td>${esc(row.supplier)}</td><td>${fmt(row.quantity_delivered)}</td><td>${row.quantity_estimated===true?'Estimated':row.quantity_estimated===false?'Not flagged':'Unspecified'}</td><td>${esc(row.sipri_deal_id)} <span class="muted">/ source line ${row.source_line}</span></td></tr>`).join('')}</tbody></table></div>

    ${item.issues.map(issue=>`<div class="history-issue">${esc(issue.description)}</div>`).join('')}<p class="history-note"><a href="${esc(item.source.url)}" target="_blank" rel="noopener">Open SIPRI’s original transfer register ↗</a></p>`;

  $('#history-section').hidden=false;$('#history-section').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});

}



async function featured(){

  const data=await api('/api/equipment?models_only=1');

  const order=Object.keys(meta.models);data.items.sort((a,b)=>order.indexOf(a.equipment_id)-order.indexOf(b.equipment_id));

  $('#featured-grid').innerHTML=data.items.map((item,i)=>`<button class="equipment-card ${i===0?'active':''}" data-equipment="${item.equipment_id}" aria-label="Inspect ${esc(cleanName(item.designation))} in 3D"><span class="card-art">${silhouette(item.model.key)}</span><span class="card-copy"><span class="card-category">${esc(item.category)}</span><span class="card-name">${esc(cleanName(item.designation))}</span><span class="card-meta">${esc(item.suppliers)} → India</span></span><span class="card-3d">3D</span></button>`).join('');

  $$('.equipment-card').forEach(button=>button.addEventListener('click',()=>loadRecord(button.dataset.equipment)));

}



async function loadLibrary(){

  const token=++libraryRequest;const params=new URLSearchParams({recipient:$("#library-recipient").value,q:$('#library-search').value,category:$('#library-category').value,models_only:$('#library-models').checked?'1':'0'});

  $('#library-status').textContent='Searching source records…';

  try{const data=await api(`/api/equipment?${params}`);if(token!==libraryRequest)return;

    $('#library-status').textContent=`${data.count} equipment record${data.count===1?'':'s'} · deliveries within 2010–2025`;

    $('#library-list').innerHTML=data.items.length?data.items.map(item=>`<button class="library-item" data-equipment="${item.equipment_id}"><span class="eyebrow">${esc(item.category)}</span><h3>${esc(cleanName(item.designation))}</h3><p>${esc(item.description)}</p><div class="library-item-bottom"><span>${esc(item.suppliers)} · ${fmt(item.delivered_quantity)} recorded</span>${item.model?'<span class="model-tag">3D VIEW ↗</span>':'<span>RECORD ↗</span>'}</div></button>`).join(''):'<p class="empty-state">No equipment matches these filters. Try another name or category.</p>';

    $$('.library-item').forEach(button=>button.addEventListener('click',()=>{$('#library-dialog').close();openEquipmentDetails(button.dataset.equipment,$("#library-recipient").value);}));

  }catch(error){$('#library-status').textContent=error.message;$('#library-list').innerHTML='';}

}



const iso={jordan:400,austria:40,belgium:56,portugal:620,greece:300,pakistan:586,romania:642,serbia:688,slovakia:703,new_zealand:554,iran:364,north_korea:408,china:156,turkiye:792,belarus:112,sweden:752,norway:578,finland:246,japan:392,singapore:702,taiwan:158,india:356,russia:643,france:250,israel:376,united_states:840,united_kingdom:826,germany:276,south_korea:410,ukraine:804,uzbekistan:860,italy:380,spain:724,south_africa:710,switzerland:756,canada:124,netherlands:528,denmark:208,australia:36,brazil:76,kyrgyzstan:417,poland:616,czechia:203};

async function drawMap(suppliers,requestToken){

  if(!worldPromise)worldPromise=fetch('/static/world.json').then(r=>{if(!r.ok)throw new Error('Map geometry could not be loaded.');return r.json();});

  const topology=await worldPromise;const collection=feature(topology,topology.objects.countries);collection.features=collection.features.filter(f=>Number(f.id)!==10);

  const projection=geoNaturalEarth1().fitExtent([[15,30],[885,450]],collection),path=geoPath(projection);

  const positive=suppliers.filter(s=>s.recorded_tiv_million>0&&iso[s.supplier_id]);

  const ids=new Set(positive.map(s=>iso[s.supplier_id]));

  if(!indiaPromise)indiaPromise=fetch('/static/india-soi-display.json').then(r=>{if(!r.ok)throw new Error('India geometry could not be loaded.');return r.json();});
  const officialIndia=await indiaPromise;
  if(requestToken!==overviewRequest)return;

  const shapes=collection.features.filter(f=>Number(f.id)!==356).map(f=>`<path data-country-id="${f.id}" d="${path(f)}" class="map-country ${Number(f.id)===iso[recipientId]?'recipient-country':ids.has(Number(f.id))?'supplier-country':''}"><title>${esc(f.properties.name)}</title></path>`).join('');

  const centers=new Map(collection.features.map(f=>[Number(f.id),projection(geoCentroid(f))]));

  const india=projection(({india:[79,22],russia:[95,61],united_states:[-98,39],united_kingdom:[-2,54],france:[2,47],china:[104,35],pakistan:[69,30],israel:[35,31],north_korea:[127,40],ukraine:[32,49]})[recipientId]);
  const labelPositions={356:[79,22],840:[-100,39],643:[95,61],250:[2,47],578:[10,64]};
  const occupied=[];
  const countryNames=collection.features.filter(f=>Number(f.id)!==iso[recipientId]).sort((a,b)=>path.area(b)-path.area(a)).map(f=>{
    const point=labelPositions[Number(f.id)]?projection(labelPositions[Number(f.id)]):path.centroid(f);
    if(!point.every(Number.isFinite))return '';
    const label=f.properties.name==='United States of America'?'United States':f.properties.name;
    const width=label.length*4.7+8,box=[point[0]-width/2,point[1]-7,point[0]+width/2,point[1]+7];

    occupied.push(box);
    return `<text class="country-name" data-area="${path.area(f)}" data-name="${esc(label)}" x="${point[0]}" y="${point[1]}" text-anchor="middle">${esc(label)}</text>`;
  }).join('');


  const capitalNames=[...capitals,...majorCities].map((c,index)=>{
    const p=projection(c.coordinates),isCapital=index<capitals.length,color=isCapital?'#efcd79':'#89d4d1';
    return `<g class="capital-marker ${isCapital?'':'major-city-marker'}" data-min-zoom="${isCapital?2.5:c.minZoom}" style="display:none"><circle cx="${p[0]}" cy="${p[1]}" r="${isCapital?2.5:2}" fill="${color}"/><text class="capital-name" x="${p[0]}" y="${p[1]}" text-anchor="start" fill="${color}" stroke="#10170f" stroke-linejoin="round" paint-order="stroke">${esc(c.name)}<title>${esc(c.name)} | ${esc(c.country)} | ${esc(c.kind)}</title></text></g>`;
  }).join('');
  const plotted=positive;

  let flows='',pins='';

  for(const [index,supplier] of plotted.entries()){

    const p=centers.get(iso[supplier.supplier_id]);if(!p)continue;

    const cx=(p[0]+india[0])/2,cy=Math.min(p[1],india[1])-Math.min(90,Math.abs(p[0]-india[0])*.22+22);

    flows+=`<path data-connection="${supplier.supplier_id}" style="display:none" class="map-flow" d="M${p[0]},${p[1]} Q${cx},${cy} ${india[0]},${india[1]}"/>`;

    pins+=`<circle data-connection="${supplier.supplier_id}" style="display:none" class="map-pin" cx="${p[0]}" cy="${p[1]}" r="${index<3?5:3.5}"><title>${esc(supplier.supplier)}: ${pct(supplier.share_percent)}</title></circle>`;

    {const offset=supplier.supplier_id==='israel'?[8,15]:[8,-9];pins+=`<text data-connection="${supplier.supplier_id}" style="display:none" class="map-label" x="${p[0]+offset[0]}" y="${p[1]+offset[1]}">${esc(supplier.supplier)}</text>`;}

  }

  $('#network-map').innerHTML=shapes+`<path data-country-id="356" d="${path(officialIndia)}" class="map-country ${recipientId==='india'?'recipient-country':ids.has(356)?'supplier-country':''}"><title>India — Survey of India depiction</title></path>`+flows+countryNames+capitalNames+pins+`<circle cx="${india[0]}" cy="${india[1]}" r="14" fill="#edb94811" stroke="#edb94855"/><circle class="map-pin india" cx="${india[0]}" cy="${india[1]}" r="6"/><text class="map-label" x="${india[0]+12}" y="${india[1]+18}">${recipientNames[recipientId]}</text>`;

}



function enableCountryClicks(suppliers){
  const installedOverview=overviewRequest;
  $('#network-map').dispatchEvent(new Event('mapcontentchange'));
  let panel=$('#country-connection');
  if(!panel){panel=document.createElement('section');panel.id='country-connection';panel.style.padding='20px';$('#network-map').after(panel);}
  let hover=$('#country-hover');if(!hover){hover=document.createElement('p');hover.id='country-hover';hover.className='country-hover';$('#network-map').before(hover);}hover.textContent='Hover over a country to see its name · click to explore';
  panel.textContent=`Click a supplier to explore its connection to ${recipientNames[recipientId]}.`;
  let requestId=0;
  $$('#network-map .map-country').forEach(el=>{
    const name=el.querySelector('title')?.textContent||'India';
    el.addEventListener('pointerenter',()=>hover.textContent=name.startsWith('India')?'India':name);el.addEventListener('focus',()=>hover.textContent=name.startsWith('India')?'India':name);
    el.style.cursor='pointer';el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label',`Select ${name}`);
    async function select(){
      const token=++requestId;
      $$('#network-map .map-country').forEach(p=>{p.style.stroke='';p.style.strokeWidth='';});el.style.stroke='#ffdf76';el.style.strokeWidth='2';
      const supplier=suppliers.find(s=>iso[s.supplier_id]===Number(el.dataset.countryId));
      $$('#network-map [data-connection]').forEach(p=>{p.style.display=p.dataset.connection===supplier?.supplier_id?'':'none';});
      $('#network-map').dispatchEvent(new Event('maplabelchange'));
      if((name.startsWith('India')&&recipientId==='india')||Number(el.dataset.countryId)===iso[recipientId]){panel.innerHTML=`<h3>${recipientNames[recipientId]} · recipient</h3><p>Choose a supplier country to inspect this connection.</p>`;return;}
      if(!supplier||!supplier.recorded_tiv_million){panel.innerHTML=`<h3>${esc(name)} → ${recipientNames[recipientId]}</h3><p>No recorded transfer volume in the selected period in this dataset.</p>`;return;}
      panel.innerHTML=`<h3>${esc(supplier.supplier)} → ${recipientNames[recipientId]}</h3><p>${pct(supplier.share_percent)} of import TIV · ${fmt(supplier.recorded_tiv_million,2)} million TIV · ${esc($('#supplier-period').selectedOptions[0].text)}</p><div class="country-equipment">Loading equipment…</div>`;
      try{const data=await api(`/api/equipment?recipient=${recipientId}&supplier=${encodeURIComponent(supplier.supplier_id)}`);if(token!==requestId||installedOverview!==overviewRequest)return;
        panel.querySelector('.country-equipment').innerHTML='<p>Equipment across the full 2010–2025 snapshot. Sourced equipment photos. Variant or family photos are identified in each caption.</p><div class="weapon-photo-grid">'+data.items.sort((a,b)=>Number(!!equipmentPicture(b).url)-Number(!!equipmentPicture(a).url)).map(equipmentPhotoCard).join('')+'</div>';
        panel.querySelectorAll('[data-record]').forEach(b=>b.addEventListener('click',()=>openEquipmentDetails(b.dataset.record,recipientId)));
      }catch(error){if(token===requestId&&installedOverview===overviewRequest&&panel.querySelector('.country-equipment'))panel.querySelector('.country-equipment').textContent=error.message;}
    }
    el.addEventListener('click',select);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});
  });
  $$('#network-map .map-pin, #network-map .map-label, #network-map .map-flow').forEach(el=>el.style.pointerEvents='none');
}

function timeline(rows){

  const width=1100,height=235,left=45,right=28,top=25,bottom=35;

  const x=year=>left+(year-2010)/15*(width-left-right),y=share=>height-bottom-share/100*(height-top-bottom);

  let svg='';for(const share of [0,25,50,75,100])svg+=`<line class="chart-grid" x1="${left}" y1="${y(share)}" x2="${width-right}" y2="${y(share)}"/><text class="chart-text" x="${left-9}" y="${y(share)+4}" text-anchor="end">${share}%</text>`;

  for(const year of [2010,2013,2016,2019,2022,2025])svg+=`<text class="chart-text" x="${x(year)}" y="${height-9}" text-anchor="middle">${year}</text>`;

  for(const [key,color]of Object.entries(palette)){

    const values=rows.filter(r=>r.supplier_id===key);const points=values.map(r=>`${x(r.year)},${y(r.share_percent)}`).join(' ');

    svg+=`<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.3"/>`+values.map(r=>`<circle cx="${x(r.year)}" cy="${y(r.share_percent)}" r="2.8" fill="${color}"><title>${named[key]}, ${r.year}: ${pct(r.share_percent)}</title></circle>`).join('');

  }

  $('#timeline-chart').innerHTML=`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Annual supplier shares for ${recipientNames[recipientId]}">${svg}</svg>`;

  $('#timeline-legend').innerHTML=Object.entries(palette).map(([key,color])=>`<span><i style="background:${color}"></i>${named[key]}</span>`).join('');

}



async function loadOverview(){

  const token=++overviewRequest;clearError();
  $('#country-spending').textContent='Loading spending context...';$('#supplier-metrics').textContent='Loading supplier data...';$('#supplier-ranking').innerHTML='';$('#timeline-chart').innerHTML='';$('#network-map').innerHTML='';if($('#country-connection'))$('#country-connection').textContent='Choose a country after the map loads.';

  try{const data=await api(`/api/overview?recipient=${recipientId}&period=${encodeURIComponent($('#supplier-period').value)}`);if(token!==overviewRequest)return;const s=data.summary;
    const spending=data.spending, latest=spending.series.at(-1);
    const budgetValue=(r,key,digits=1)=>r[key]==null?'Unavailable':(r[key+'_status']==='estimate'?'≈ ':r[key+'_status']==='highly_uncertain'?'Highly uncertain: ':'')+fmt(r[key],digits);
    $('#country-spending').innerHTML=`<div class="panel-heading"><h2>${esc(recipientNames[recipientId])} · military spending</h2><a href="${esc(spending.source.url)}" target="_blank" rel="noopener">SIPRI source ↗</a></div><p><strong>2025: ${budgetValue(latest,'current_usd_million')} million current US$</strong> · ${latest.gdp_percent==null?'GDP share unavailable':budgetValue(latest,'gdp_percent')+'% of GDP'}</p><p class="muted small">Total military spending, not weapons-import spending. Separate from TIV. ≈ denotes a SIPRI estimate; unavailable values are not zero. Country footnotes are in the source workbook.</p><details><summary>View annual spending, 2010–2025</summary><div class="table-scroll"><table><thead><tr><th>Year</th><th>Current US$ million</th><th>Constant 2024 US$ million</th><th>% GDP</th></tr></thead><tbody>${spending.series.map(r=>`<tr><td>${r.year}</td><td>${budgetValue(r,'current_usd_million')}</td><td>${budgetValue(r,'constant_2024_usd_million')}</td><td>${budgetValue(r,'gdp_percent')}</td></tr>`).join('')}</tbody></table></div></details>`;

    if(!['ok','no_recorded_imports'].includes(s.metric_status))throw new Error('Complete supplier metrics are not available for this period.');

    $('#supplier-metrics').innerHTML=metric('Import volume',fmt(s.total_tiv_million),'Recorded deliveries','million TIV')+metric('Largest supplier share',pct(s.top_supplier_share==null?null:s.top_supplier_share*100),s.top_suppliers)+metric('Top 3 suppliers',pct(s.top_three_share==null?null:s.top_three_share*100),'Share of recorded import TIV')+metric('Supplier concentration',fmt(s.hhi,3),'HHI · 0 to 1');

    const top=data.suppliers.filter(r=>r.recorded_tiv_million>0).slice(0,4);Object.keys(palette).forEach(k=>delete palette[k]);top.forEach((r,i)=>{palette[r.supplier_id]=['#b5c08a','#75a8bb','#7ba89a','#edb948'][i];named[r.supplier_id]=r.supplier;});
    $('#supplier-ranking').innerHTML=data.suppliers.filter(r=>r.recorded_tiv_million>0).map(r=>`<div class="ranking-row"><div class="rank-label"><strong>${esc(r.supplier)}</strong><span>${pct(r.share_percent)}</span></div><div class="rank-track"><div class="rank-bar" style="width:${r.share_percent}%;background:${palette[r.supplier_id]||'#718264'}"></div></div></div>`).join('');

    if(!s.total_tiv_million)$('#supplier-ranking').innerHTML='<p class="empty-state">No recorded imports in this period. This does not describe current holdings or domestic production.</p>';timeline(data.timeline);await drawMap(data.suppliers,token);if(token!==overviewRequest)return;enableCountryClicks(data.suppliers);

  }catch(error){if(token===overviewRequest)showError(error);}

}



function setCompareOptions(){

  const earlier=$('#compare-before').value;

  const choices=meta.comparisons.filter(c=>c.earlier_period_id===earlier);

  const previous=$('#compare-after').value;

  $('#compare-after').innerHTML=choices.map(c=>`<option value="${c.later_period_id}">${periodLabel(c.later_period_id)}</option>`).join('');

  if(choices.some(c=>c.later_period_id===previous))$('#compare-after').value=previous;

}

async function loadCompare(){

  const token=++compareRequest;clearError();

  try{const data=await api(`/api/compare?${new URLSearchParams({before:$('#compare-before').value,after:$('#compare-after').value})}`);if(token!==compareRequest)return;const s=data.summary;

    if(s.comparison_status!=='ok')throw new Error('This comparison has incomplete data or no recorded deliveries.');

    $('#comparison-metrics').innerHTML=metric('Earlier import volume',fmt(s.earlier_total_tiv_million),periodLabel(s.earlier_period_id),'million TIV')+metric('Later import volume',fmt(s.later_total_tiv_million),periodLabel(s.later_period_id),'million TIV')+metric('Volume change',`${s.volume_change_percent>=0?'+':''}${pct(s.volume_change_percent)}`,'Change in recorded import TIV')+metric('Supplier-mix distance',fmt(s.supplier_mix_distance,3),'0 = identical · 1 = no overlap');

    const selected=[...data.suppliers].sort((a,b)=>Math.abs(b.share_change_pp)-Math.abs(a.share_change_pp)).slice(0,8).sort((a,b)=>b.share_change_pp-a.share_change_pp);

    $('#comparison-chart').innerHTML=selected.map(r=>`<div class="comparison-row"><span class="supplier-name">${esc(r.supplier)}</span><div class="comparison-bars"><div style="width:${r.earlier_share*100}%" title="Earlier: ${pct(r.earlier_share*100)}"></div><div style="width:${r.later_share*100}%" title="Later: ${pct(r.later_share*100)}"></div></div><span class="comparison-values">${pct(r.earlier_share*100)} → <strong>${pct(r.later_share*100)}</strong></span><span class="change-pill ${r.share_change_pp<0?'negative':''}">${r.share_change_pp>=0?'+':''}${fmt(r.share_change_pp,1)} pp</span></div>`).join('');

    $('#comparison-table').innerHTML=`<table><thead><tr><th>Supplier</th><th>${periodLabel(s.earlier_period_id)}</th><th>${periodLabel(s.later_period_id)}</th><th>Share change</th></tr></thead><tbody>${data.suppliers.map(r=>`<tr><td>${esc(r.supplier)}</td><td>${pct(r.earlier_share*100)}</td><td>${pct(r.later_share*100)}</td><td>${r.share_change_pp>=0?'+':''}${fmt(r.share_change_pp,2)} pp</td></tr>`).join('')}</tbody></table>`;

  }catch(error){if(token===compareRequest)showError(error);}

}



async function loadSources(){

  try{const data=await api('/api/sources');

    $('#source-registry').innerHTML=data.sources.map(source=>`<a class="source-row" href="${esc(source.url)}" target="_blank" rel="noopener"><span class="source-publisher">${esc(source.publisher)}</span><span class="source-title">${esc(source.title)}</span><span class="source-open">Open source ↗</span></a>`).join('');

    $('#source-issues').innerHTML=data.issues.map(issue=>`<article><h3>${esc(issue.field_name.replaceAll('_',' '))}</h3><p>${esc(issue.description)}</p></article>`).join('');

  }catch(error){showError(error);}

}



function route(){

  let page=location.hash.slice(1)||'explorer';if(!['explorer','suppliers','compare','sources','insights','similarity'].includes(page))page='explorer';

  $$('.view').forEach(section=>section.hidden=section.id!==`view-${page}`);

  $$('[data-nav]').forEach(link=>{link.classList.toggle('active',link.dataset.nav===page);if(link.dataset.nav===page)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});

  clearError();if(viewer){viewer.enabled=page==='explorer';viewer.resize();}

  if(meta){if(page==='suppliers')loadOverview();if(page==='compare')loadCompare();if(page==='sources')loadSources();if(page==='insights')loadInsights();if(page==='similarity')loadSimilarity();}

  document.title=`${({explorer:'Weapons explorer',suppliers:'Supplier network',compare:'Compare periods',sources:'Sources',insights:'ML insights',similarity:'Similar countries'})[page]} · ArmsFlow`;

}



async function init(){

  try{

    meta=await api('/api/meta');
    recipientNames=meta.countries;
    const options='<optgroup label="Nuclear-armed states">'+meta.nuclear_armed_states.map(id=>`<option value="${id}">${esc(recipientNames[id])}</option>`).join('')+'</optgroup><optgroup label="Additional countries"><option value="ukraine">Ukraine</option></optgroup>';
    $('#library-recipient').innerHTML=options;
    $('#library-recipient').addEventListener('change',loadLibrary);
    const chooser=document.createElement('select');chooser.id='recipient-select';chooser.setAttribute('aria-label','Recipient country');chooser.innerHTML=options;const recipientLabel=document.createElement('label');recipientLabel.className='select-label';recipientLabel.append('Recipient country',chooser);$('#supplier-period').parentElement.before(recipientLabel);
    const scope=document.createElement('p');scope.id='recipient-scope';scope.className='data-footnote';$('#supplier-metrics').before(scope);scope.textContent='SIPRI major conventional-arms deliveries, 2010–2025. Nuclear status is context, not nuclear transfer data.';
    const focus=document.createElement('section');focus.className='focus-countries panel';focus.innerHTML='<h2>Featured: nuclear-armed states</h2><p class="muted small">Nine states identified by SIPRI (2026). Conventional imports only; domestic production and nuclear arsenals are not measured here. <a href="'+meta.nuclear_status_source+'" target="_blank" rel="noopener">Classification source ↗</a></p><div class="focus-country-buttons">'+meta.nuclear_armed_states.map(id=>'<button type="button" class="button" data-recipient="'+id+'">'+esc(recipientNames[id])+'</button>').join('')+'</div>';scope.before(focus);focus.querySelectorAll('[data-recipient]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.recipient===recipientId)));focus.querySelectorAll('[data-recipient]').forEach(b=>b.addEventListener('click',()=>{chooser.value=b.dataset.recipient;chooser.dispatchEvent(new Event('change'));}));
    chooser.addEventListener('change',()=>{recipientId=chooser.value;focus.querySelectorAll('[data-recipient]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.recipient===recipientId)));$('#network-map').setAttribute('aria-label',`World map showing suppliers to ${recipientNames[recipientId]}`);$('#view-suppliers .map-panel h2').textContent=`Suppliers to ${recipientNames[recipientId]}`;scope.textContent='SIPRI major conventional-arms deliveries, 2010–2025. Nuclear status is context, not nuclear transfer data. No records does not imply no weapons.';loadOverview();});$('#equipment-count').textContent=meta.counts.equipment;

    $('#library-category').innerHTML+=[...meta.equipment_categories].map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('');

    const p=meta.periods;const groups=[['five_year','Five-year periods'],['full','Full snapshot'],['annual','Annual periods'],['rolling_five_year','Other five-year windows']];

    $('#supplier-period').innerHTML=groups.map(([kind,label])=>`<optgroup label="${label}">${p.filter(r=>r.period_kind===kind).map(r=>`<option value="${r.period_id}">${periodLabel(r.period_id)}</option>`).join('')}</optgroup>`).join('');$('#supplier-period').value='2021-2025';

    const before=[...new Set(meta.comparisons.map(c=>c.earlier_period_id))];before.sort((a,b)=>Number(b.length===9&&b.slice(0,4)!==b.slice(5))-Number(a.length===9&&a.slice(0,4)!==a.slice(5))||a.localeCompare(b));

    $('#compare-before').innerHTML=before.map(id=>`<option value="${id}">${periodLabel(id)}</option>`).join('');$('#compare-before').value='2011-2015';setCompareOptions();$('#compare-after').value='2021-2025';

    try{viewer=new EquipmentViewer($('#model-canvas'));}catch(error){$('#viewer-status').textContent='3D rendering is unavailable in this browser. The verified equipment records remain available.';$('#viewer-status').classList.add('error');console.warn('WebGL viewer unavailable',error);}

    await Promise.all([featured(),loadRecord(meta.default_equipment)]);

    route();

  }catch(error){showError(error);$('#viewer-status').textContent='Start the local server and verify the database to explore ArmsFlow.';}

}



$('#open-library').addEventListener('click',()=>{$('#library-dialog').showModal();loadLibrary();setTimeout(()=>$('#library-search').focus(),0);});

$('#close-library').addEventListener('click',()=>$('#library-dialog').close());

$('#library-dialog').addEventListener('click',e=>{if(e.target===$('#library-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});

let searchTimer;$('#library-search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(loadLibrary,180);});

$('#library-category').addEventListener('change',loadLibrary);$('#library-models').addEventListener('change',loadLibrary);

$('#supplier-period').addEventListener('change',loadOverview);$('#compare-before').addEventListener('change',()=>{setCompareOptions();loadCompare();});$('#compare-after').addEventListener('change',loadCompare);

$('#close-history').addEventListener('click',()=>{$('#history-section').hidden=true;$('#show-history')?.focus();});

$$('[data-angle]').forEach(button=>button.addEventListener('click',()=>{viewer?.angle(button.dataset.angle);$$('[data-angle]').forEach(b=>b.classList.toggle('active',b===button));}));

$('#reset-view').addEventListener('click',()=>{viewer?.reset();$$('[data-angle]').forEach(b=>b.classList.toggle('active',b.dataset.angle==='perspective'));});

$('#auto-rotate').addEventListener('click',e=>{if(viewer){viewer.spin=!viewer.spin;e.currentTarget.setAttribute('aria-pressed',String(viewer.spin));}});

$('#wireframe').addEventListener('click',e=>{if(viewer){viewer.setWireframe(!viewer.wire);e.currentTarget.setAttribute('aria-pressed',String(viewer.wire));}});

$('#zoom-in').addEventListener('click',()=>viewer?.zoom(.86));$('#zoom-out').addEventListener('click',()=>viewer?.zoom(1.16));

$('#fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('#viewer-panel').requestFullscreen();}catch{$('#viewer-status').textContent='Fullscreen is unavailable. The viewer still supports rotate and zoom.';$('#viewer-status').hidden=false;}});

window.addEventListener('hashchange',route);window.addEventListener('resize',()=>viewer?.resize());

installSimilarity();
installInsights();
installMapZoom($('#network-map'));
init();

