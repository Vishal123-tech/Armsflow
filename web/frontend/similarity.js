const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pct=v=>(100*v).toFixed(1)+'%';
let current,requestId=0;

function compare(country){
  const selected=current.selected,other=current.matches.find(r=>r.country===country);
  if(!other)return;
  const suppliers=[...new Set([...Object.keys(selected.shares),...Object.keys(other.shares)])]
    .sort((a,b)=>Math.max(selected.shares[b]||0,other.shares[b]||0)-Math.max(selected.shares[a]||0,other.shares[a]||0)).slice(0,8);
  const omittedA=1-suppliers.reduce((sum,s)=>sum+(selected.shares[s]||0),0);
  const omittedB=1-suppliers.reduce((sum,s)=>sum+(other.shares[s]||0),0);
  const rows=suppliers.map(s=>[s,selected.shares[s]||0,other.shares[s]||0]);
  if(omittedA>1e-8||omittedB>1e-8)rows.push(['Other identified suppliers',Math.max(0,omittedA),Math.max(0,omittedB)]);
  document.querySelector('#similarity-comparison').innerHTML=`<div class="panel-heading"><h2>${esc(selected.country)} & ${esc(other.country)}</h2><span class="muted small">SHARE OF IDENTIFIED-SUPPLIER TIV</span></div><p class="similarity-legend"><span class="selected-country-key">● ${esc(selected.country)}</span><span class="match-country-key">● ${esc(other.country)}</span></p>${rows.map(([s,a,b])=>`<div class="profile-bar-row"><strong>${esc(s)}</strong><div><div class="profile-bar-track"><i style="width:${a*100}%"></i><span>${pct(a)}</span></div><div class="profile-bar-track match"><i style="width:${b*100}%"></i><span>${pct(b)}</span></div></div></div>`).join('')}<p class="data-footnote">Recorded import volume: ${esc(selected.country)} ${selected.total_tiv.toLocaleString(undefined,{maximumFractionDigits:2})}; ${esc(other.country)} ${other.total_tiv.toLocaleString(undefined,{maximumFractionDigits:2})} million TIV. Similar supplier mixes can occur at very different import volumes.</p>`;
  document.querySelectorAll('[data-profile-match]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.profileMatch===country)));
}

export async function loadSimilarity(){
  const id=++requestId,host=document.querySelector('#similarity-matches'),select=document.querySelector('#similarity-recipient');
  host.textContent='Comparing supplier profiles...';
  document.querySelector('#similarity-summary').innerHTML='';document.querySelector('#similarity-method').innerHTML='';
  document.querySelector('#similarity-comparison').innerHTML='';
  try{
    const response=await fetch('/api/similarity?recipient='+encodeURIComponent(select.value||'India'));
    const data=await response.json();if(!response.ok)throw new Error(data.error||'Profiles are unavailable.');
    if(id!==requestId)return;current=data;
    select.innerHTML=data.countries.map(c=>`<option ${c===data.selected.country?'selected':''}>${esc(c)}</option>`).join('');
    const p=data.selected;
    document.querySelector('#similarity-summary').innerHTML=`<div class="metric"><span>Countries / territories compared</span><strong>${data.eligible_count}</strong><small>Qualified profiles from the global register</small></div><div class="metric"><span>${esc(p.country)} suppliers</span><strong>${p.supplier_count}</strong><small>${pct(p.unknown_share)} unknown TIV excluded from matching</small></div><div class="metric"><span>Top-five neighbor stability</span><strong>${p.stability===null?'N/A':pct(p.stability)}</strong><small>Average retained when one year is omitted (${p.stability_runs}/5 runs)</small></div>`;
    host.innerHTML=`<h2>Closest supplier profiles</h2><p class="muted small">Click a match to compare its suppliers. Score measures mix similarity, not an alliance or probability.</p><div class="similarity-cards">${p.neighbors.map((n,i)=>`<button type="button" class="similarity-card" data-profile-match="${esc(n.country)}" aria-pressed="false"><span class="eyebrow">MATCH ${i+1}</span><strong>${esc(n.country)}</strong><span class="similarity-score">${n.similarity.toFixed(1)}<small> / 100</small></span><span class="small">Shared suppliers: ${n.shared_suppliers.map(s=>esc(s.supplier)).join(', ')||'None'}</span></button>`).join('')}</div>`;
    host.querySelectorAll('[data-profile-match]').forEach(b=>b.addEventListener('click',()=>compare(b.dataset.profileMatch)));
    document.querySelector('#similarity-method').innerHTML=`<h2>How the comparison works</h2><p>Each country is represented by its supplier shares across 2021–2025. An unsupervised nearest-neighbor model compares square-root shares using Hellinger distance. Score = 100 × (1 − distance): identical mixes score 100; completely disjoint suppliers score 0. Import volume is shown separately.</p><p>Coverage: ${data.register_rows.toLocaleString()} annual delivery rows, ${data.source_recipient_count} source recipients, ${data.eligible_count} qualified profiles and ${data.supplier_dimensions} supplier dimensions. Profiles need at least ${data.minimum_known_tiv} million identified-supplier TIV and no more than ${pct(data.maximum_unknown_share)} unknown-supplier TIV.</p><p>Across the cohort, omitting one year retains ${pct(data.mean_leave_year_out_overlap)} of top-five neighbors on average. A cosine-distance comparison retains ${pct(data.mean_cosine_top5_overlap)}. These measure sensitivity, not accuracy.</p><details><summary>Source, exclusions and limitations</summary><p><a href="${esc(data.source.url)}" target="_blank" rel="noopener">SIPRI global transfer register</a> · retrieved ${esc(data.source.retrieved)}. ${esc(data.source.filters)}.</p><ul>${data.limitations.map(l=>`<li>${esc(l)}</li>`).join('')}</ul><h3>Excluded recipients (${data.excluded.length})</h3><ul>${data.excluded.map(e=>`<li>${esc(e.country)}: ${esc(e.reason)}</li>`).join('')}</ul><a href="/api/similarity?recipient=${encodeURIComponent(p.country)}" target="_blank" rel="noopener">Open comparison data and source hash</a></details>`;
    compare(p.neighbors[0].country);
  }catch(error){if(id===requestId)host.textContent=error.message;}
}
export function installSimilarity(){document.querySelector('#similarity-recipient').addEventListener('change',loadSimilarity);}
