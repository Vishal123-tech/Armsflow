var Pm=[{id:"karwar",country:"india",name:"Naval Base Karwar",city:"Karwar",kind:"Naval base",coordinates:[74.1,14.8],source:"India Ministry of Defence / PIB",url:"https://www.pib.gov.in/PressReleasePage.aspx?PRID=2017557",sourceDate:"2024-04-09"},{id:"norfolk",country:"united_states",name:"Naval Station Norfolk",city:"Norfolk",kind:"Naval base",coordinates:[-76.3,36.9],source:"US Navy",url:"https://cnrma.cnic.navy.mil/Installations/NAVSTA-Norfolk/",sourceDate:"Undated"},{id:"portsmouth",country:"united_kingdom",name:"HMNB Portsmouth",city:"Portsmouth",kind:"Naval base",coordinates:[-1.1,50.8],source:"Royal Navy",url:"https://www.royalnavy.mod.uk/locations-and-operations/bases-and-stations/hmnb-portsmouth",sourceDate:"Undated"},{id:"toulon",country:"france",name:"Base navale de Toulon",city:"Toulon",kind:"Naval base",coordinates:[5.9,43.1],source:"French Ministry of the Armed Forces",url:"https://www.defense.gouv.fr/marine/mieux-nous-connaitre/notre-organisation",sourceDate:"Undated"},{id:"haifa",country:"israel",name:"Haifa naval base",city:"Haifa",kind:"Naval base",coordinates:[35,32.8],source:"Israeli Navy / IDF",url:"https://m.www.idf.il/en/mini-sites/israeli-navy/",sourceDate:"Undated"},{id:"zhanjiang",country:"china",name:"Zhanjiang military port",city:"Zhanjiang",kind:"Military port",coordinates:[110.4,21.3],source:"China Ministry of National Defense",url:"https://eng.mod.gov.cn/xb/News_213114/TopStories/16226088.html",sourceDate:"2023"},{id:"jauhar",country:"pakistan",name:"PNS Jauhar / PNEC",city:"Karachi",kind:"Naval training institution",coordinates:[67,24.9],source:"Pakistan Navy Engineering College / NUST",url:"https://pnec.nust.edu.pk/contact/",sourceDate:"Undated"},{id:"severomorsk",country:"russia",name:"Northern Fleet headquarters",city:"Severomorsk",kind:"Naval headquarters",coordinates:[33.4,69.1],source:"US Defense Intelligence Agency \u2014 Russia Military Power",url:"https://www.govinfo.gov/content/pkg/GOVPUB-D5_200-PURL-gpo82226/pdf/GOVPUB-D5_200-PURL-gpo82226.pdf",sourceDate:"2017 (historical reference)"}],Us=!1,ks="all";function Jh(n,t,e,i){document.querySelector("#base-controls")?.remove();let r=document.createElement("section");r.id="base-controls",r.className="base-controls",r.innerHTML='<label><input type="checkbox"> Show military bases & facilities</label> <label>Coverage <select><option value="all">All curated countries</option><option value="recipient">Selected recipient</option></select></label><p class="base-coverage"></p><div class="base-list"></div><div class="base-detail" aria-live="polite"></div>',n.before(r);let o=r.querySelector("input"),s=r.querySelector("select");o.checked=Us,s.value=ks;let a="http://www.w3.org/2000/svg",c=document.createElementNS(a,"g");c.classList.add("base-layer"),n.append(c);function l(h){let d=r.querySelector(".base-detail");d.replaceChildren();let p=document.createElement("h3");p.textContent=h.name;let f=document.createElement("p");f.textContent=`${i[h.country]} \xB7 ${h.city} \xB7 ${h.kind}. Approximate city-area marker. Source date: ${h.sourceDate}; reviewed 9 November 2026. Current operational status is not tracked.`;let x=document.createElement("a");x.textContent=`Source: ${h.source} \u2197`,x.href=h.url,x.target="_blank",x.rel="noopener noreferrer",d.append(p,f,x)}function u(){Us=o.checked,ks=s.value,c.replaceChildren(),r.querySelector(".base-detail").replaceChildren();let h=Pm.filter(p=>ks==="all"||p.country===e),d=r.querySelector(".base-list");if(d.replaceChildren(),d.hidden=!Us,r.querySelector(".base-coverage").textContent=`${h.length} curated public examples ${ks==="all"?"across 8 countries":`for ${i[e]}`}. Partial coverage; North Korea and Ukraine have no verified entries yet. City-area approximations, not base boundaries. Independent of the import-period filter.`,!Us){n.dispatchEvent(new Event("mapcontentchange"));return}for(let p of h){let f=t(p.coordinates),x=document.createElementNS(a,"g");x.classList.add("base-marker"),x.dataset.x=f[0],x.dataset.y=f[1],x.setAttribute("transform",`translate(${f})`),x.setAttribute("tabindex","0"),x.setAttribute("role","button"),x.setAttribute("aria-label",`${p.name}, ${p.city}, approximate location`);let m=document.createElementNS(a,"path");m.setAttribute("d","M0,-8 L8,0 L0,8 L-8,0 Z");let g=document.createElementNS(a,"title");g.textContent=p.name,x.append(m,g),x.addEventListener("click",S=>{S.stopPropagation(),l(p)}),x.addEventListener("keydown",S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),S.stopPropagation(),l(p))}),c.append(x);let M=document.createElement("button");M.type="button",M.textContent=p.name,M.addEventListener("click",()=>l(p)),d.append(M)}n.dispatchEvent(new Event("mapcontentchange"))}o.addEventListener("change",u),s.addEventListener("change",u),u()}var Ve=n=>String(n).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),$i=n=>(100*n).toFixed(1)+"%",wl,bl=0;function Kh(n){let t=wl.selected,e=wl.matches.find(a=>a.country===n);if(!e)return;let i=[...new Set([...Object.keys(t.shares),...Object.keys(e.shares)])].sort((a,c)=>Math.max(t.shares[c]||0,e.shares[c]||0)-Math.max(t.shares[a]||0,e.shares[a]||0)).slice(0,8),r=1-i.reduce((a,c)=>a+(t.shares[c]||0),0),o=1-i.reduce((a,c)=>a+(e.shares[c]||0),0),s=i.map(a=>[a,t.shares[a]||0,e.shares[a]||0]);(r>1e-8||o>1e-8)&&s.push(["Other identified suppliers",Math.max(0,r),Math.max(0,o)]),document.querySelector("#similarity-comparison").innerHTML=`<div class="panel-heading"><h2>${Ve(t.country)} & ${Ve(e.country)}</h2><span class="muted small">SHARE OF IDENTIFIED-SUPPLIER TIV</span></div><p class="similarity-legend"><span class="selected-country-key">\u25CF ${Ve(t.country)}</span><span class="match-country-key">\u25CF ${Ve(e.country)}</span></p>${s.map(([a,c,l])=>`<div class="profile-bar-row"><strong>${Ve(a)}</strong><div><div class="profile-bar-track"><i style="width:${c*100}%"></i><span>${$i(c)}</span></div><div class="profile-bar-track match"><i style="width:${l*100}%"></i><span>${$i(l)}</span></div></div></div>`).join("")}<p class="data-footnote">Recorded import volume: ${Ve(t.country)} ${t.total_tiv.toLocaleString(void 0,{maximumFractionDigits:2})}; ${Ve(e.country)} ${e.total_tiv.toLocaleString(void 0,{maximumFractionDigits:2})} million TIV. Similar supplier mixes can occur at very different import volumes.</p>`,document.querySelectorAll("[data-profile-match]").forEach(a=>a.setAttribute("aria-pressed",String(a.dataset.profileMatch===n)))}async function Al(){let n=++bl,t=document.querySelector("#similarity-matches"),e=document.querySelector("#similarity-recipient");t.textContent="Comparing supplier profiles...",document.querySelector("#similarity-summary").innerHTML="",document.querySelector("#similarity-method").innerHTML="",document.querySelector("#similarity-comparison").innerHTML="";try{let i=await fetch("/api/similarity?recipient="+encodeURIComponent(e.value||"India")),r=await i.json();if(!i.ok)throw new Error(r.error||"Profiles are unavailable.");if(n!==bl)return;wl=r,e.innerHTML=r.countries.map(s=>`<option ${s===r.selected.country?"selected":""}>${Ve(s)}</option>`).join("");let o=r.selected;document.querySelector("#similarity-summary").innerHTML=`<div class="metric"><span>Countries / territories compared</span><strong>${r.eligible_count}</strong><small>Qualified profiles from the global register</small></div><div class="metric"><span>${Ve(o.country)} suppliers</span><strong>${o.supplier_count}</strong><small>${$i(o.unknown_share)} unknown TIV excluded from matching</small></div><div class="metric"><span>Top-five neighbor stability</span><strong>${o.stability===null?"N/A":$i(o.stability)}</strong><small>Average retained when one year is omitted (${o.stability_runs}/5 runs)</small></div>`,t.innerHTML=`<h2>Closest supplier profiles</h2><p class="muted small">Click a match to compare its suppliers. Score measures mix similarity, not an alliance or probability.</p><div class="similarity-cards">${o.neighbors.map((s,a)=>`<button type="button" class="similarity-card" data-profile-match="${Ve(s.country)}" aria-pressed="false"><span class="eyebrow">MATCH ${a+1}</span><strong>${Ve(s.country)}</strong><span class="similarity-score">${s.similarity.toFixed(1)}<small> / 100</small></span><span class="small">Shared suppliers: ${s.shared_suppliers.map(c=>Ve(c.supplier)).join(", ")||"None"}</span></button>`).join("")}</div>`,t.querySelectorAll("[data-profile-match]").forEach(s=>s.addEventListener("click",()=>Kh(s.dataset.profileMatch))),document.querySelector("#similarity-method").innerHTML=`<h2>How the comparison works</h2><p>Each country is represented by its supplier shares across 2021\u20132025. An unsupervised nearest-neighbor model compares square-root shares using Hellinger distance. Score = 100 \xD7 (1 \u2212 distance): identical mixes score 100; completely disjoint suppliers score 0. Import volume is shown separately.</p><p>Coverage: ${r.register_rows.toLocaleString()} annual delivery rows, ${r.source_recipient_count} source recipients, ${r.eligible_count} qualified profiles and ${r.supplier_dimensions} supplier dimensions. Profiles need at least ${r.minimum_known_tiv} million identified-supplier TIV and no more than ${$i(r.maximum_unknown_share)} unknown-supplier TIV.</p><p>Across the cohort, omitting one year retains ${$i(r.mean_leave_year_out_overlap)} of top-five neighbors on average. A cosine-distance comparison retains ${$i(r.mean_cosine_top5_overlap)}. These measure sensitivity, not accuracy.</p><details><summary>Source, exclusions and limitations</summary><p><a href="${Ve(r.source.url)}" target="_blank" rel="noopener">SIPRI global transfer register</a> \xB7 retrieved ${Ve(r.source.retrieved)}. ${Ve(r.source.filters)}.</p><ul>${r.limitations.map(s=>`<li>${Ve(s)}</li>`).join("")}</ul><h3>Excluded recipients (${r.excluded.length})</h3><ul>${r.excluded.map(s=>`<li>${Ve(s.country)}: ${Ve(s.reason)}</li>`).join("")}</ul><a href="/api/similarity?recipient=${encodeURIComponent(o.country)}" target="_blank" rel="noopener">Open comparison data and source hash</a></details>`,Kh(o.neighbors[0].country)}catch(i){n===bl&&(t.textContent=i.message)}}function Qh(){document.querySelector("#similarity-recipient").addEventListener("change",Al)}var El=0,Os=n=>String(n).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Im={india:"India",russia:"Russia",united_states:"United States"};async function Tl(){let n=++El,t=document.querySelector("#ml-results");t.textContent="Loading historical review...",document.querySelector("#ml-summary").innerHTML="",document.querySelector("#ml-method").innerHTML="";try{let e=document.querySelector("#ml-recipient").value,i=document.querySelector("#ml-year").value,r=await fetch(`/api/insights?recipient=${e}&year=${i}`),o=await r.json();if(!r.ok)throw new Error(o.error||"ML results are unavailable.");if(n!==El)return;let s=document.querySelector("#ml-flags-only").checked,a=o.rows.filter(l=>!s||l.flagged),c=o.rows.filter(l=>l.flagged).length;document.querySelector("#ml-summary").innerHTML=`<div class="metric"><span>Transitions reviewed</span><strong>${o.rows.length}</strong><small>Selected recipient and years</small></div><div class="metric"><span>Model review flags</span><strong>${c}</strong><small>Above the training threshold</small></div><div class="metric"><span>Training observations</span><strong>${o.training_rows}</strong><small>Three recipients, 2011\u20132020</small></div>`,document.querySelector("#ml-method").innerHTML=`<h2>How to read these results</h2><p>Isolation Forest compares changes in supplier share and recorded transfer volume. It learns from 2011\u20132020; results below cover unseen 2021\u20132025 transitions. Each row compares one year with its previous year.</p><p>The unusualness percentile ranks a change against training observations. It is <strong>not a probability</strong>. \u201CReview\u201D means the score exceeds the training 95th-percentile threshold. Evidence describes the observed change, not its political cause.</p><p>Full evaluation: ${o.model_flags} model flags; ${o.baseline_flags} flags from a simple \u226510 percentage-point share-change rule; ${o.overlap_flags} flagged by both. Agreement between model flags across three random seeds: ${(100*o.mean_seed_jaccard).toFixed(1)}% mean Jaccard overlap. This measures stability, not accuracy.</p><details><summary>Data limits and model details</summary><ul>${o.limitations.map(l=>`<li>${Os(l)}</li>`).join("")}</ul><p>scikit-learn ${Os(o.sklearn_version)} \xB7 ${o.trees} trees \xB7 seed ${o.seed}. Inputs: absolute share change, signed log volume ratio and log absolute volume change. No future years are used to fit the model or threshold.</p><a href="#sources">Inspect source records</a> \xB7 <a href="/api/insights?recipient=${e}&year=${i}" target="_blank" rel="noopener">Open result data</a></details>`,t.innerHTML=a.length?`<div class="ml-table-wrap"><table class="ml-table"><thead><tr><th>Relationship / year</th><th>Unusualness percentile</th><th>Observed change</th><th>Review status</th></tr></thead><tbody>${a.map(l=>`<tr><td><strong>${Os(l.supplier)} \u2192 ${Im[l.recipient]}</strong><br>${l.year-1} \u2192 ${l.year}</td><td><strong>${l.unusualness_percentile.toFixed(1)}</strong> / 100<br><small>Relative to training observations</small></td><td>${Os(l.evidence)}</td><td><span class="${l.flagged?"ml-flag":""}">${l.flagged?"Review":"Below threshold"}</span><br><small>${l.baseline_flag?"Also exceeds 10 pp baseline":"Below 10 pp baseline"}</small></td></tr>`).join("")}</tbody></table></div>`:"<p>No flagged changes match these filters. Turn off \u201CReview flags only\u201D to inspect all scored transitions.</p>"}catch(e){n===El&&(t.textContent=e.message)}}function td(){for(let n of["ml-recipient","ml-year","ml-flags-only"])document.getElementById(n).addEventListener("change",Tl)}var ed=[{name:"New York",country:"United States of America",coordinates:[-73.995718,40.721562],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:1904e4,minZoom:3.5},{name:"Mumbai",country:"India",coordinates:[72.875839,19.068408],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:18978e3,minZoom:3.5},{name:"S\xE3o Paulo",country:"Brazil",coordinates:[-46.626966,-23.556734],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:18845e3,minZoom:3.5},{name:"Delhi",country:"India",coordinates:[77.228058,28.671939],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:15926e3,minZoom:3.5},{name:"Shanghai",country:"China",coordinates:[121.434559,31.218398],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:14987e3,minZoom:3.5},{name:"Kolkata",country:"India",coordinates:[88.369126,22.569579],kind:"Major population centre in source estimates",population:14787e3,minZoom:3.5},{name:"Los Angeles",country:"United States of America",coordinates:[-118.231986,34.049219],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:125e5,minZoom:3.5},{name:"Karachi",country:"Pakistan",coordinates:[66.988063,24.871938],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1213e4,minZoom:3.5},{name:"Rio de Janeiro",country:"Brazil",coordinates:[-43.212117,-22.907308],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:11748e3,minZoom:3.5},{name:"\u014Csaka",country:"Japan",coordinates:[135.503754,34.691095],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:11294e3,minZoom:3.5},{name:"Istanbul",country:"Turkey",coordinates:[28.974277,41.017602],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:10061e3,minZoom:3.5},{name:"Lagos",country:"Nigeria",coordinates:[3.389585,6.445208],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:9466e3,minZoom:3.5},{name:"Chicago",country:"United States of America",coordinates:[-87.635237,41.847961],kind:"World city in Natural Earth; Major population centre in source estimates",population:899e4,minZoom:3.5},{name:"Guangzhou",country:"China",coordinates:[113.261785,23.124723],kind:"Major population centre in source estimates",population:8829e3,minZoom:3.5},{name:"Shenzhen",country:"China",coordinates:[114.061154,22.548097],kind:"Major population centre in source estimates",population:7581e3,minZoom:3.5},{name:"Wuhan",country:"China",coordinates:[114.268071,30.581977],kind:"Major population centre in source estimates",population:7243e3,minZoom:3.5},{name:"Hong Kong",country:"Hong Kong S.A.R.",coordinates:[114.183064,22.306927],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:7206e3,minZoom:3.5},{name:"Tianjin",country:"China",coordinates:[117.196607,39.082772],kind:"Major population centre in source estimates",population:718e4,minZoom:3.5},{name:"Chennai",country:"India",coordinates:[80.278053,13.091934],kind:"Major population centre in source estimates",population:7163e3,minZoom:3.5},{name:"Bengaluru",country:"India",coordinates:[77.558064,12.971941],kind:"Major population centre in source estimates",population:6787e3,minZoom:3.5},{name:"Lahore",country:"Pakistan",coordinates:[74.348079,31.561917],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:6577e3,minZoom:3.5},{name:"Chongqing",country:"China",coordinates:[106.593036,29.566923],kind:"Major population centre in source estimates",population:6461e3,minZoom:3.5},{name:"Hyderabad",country:"India",coordinates:[78.478008,17.401929],kind:"Major population centre in source estimates",population:6376e3,minZoom:3.5},{name:"Amaravati",country:"India",coordinates:[80.52432,16.533658],kind:"Major population centre in source estimates",population:58e5,minZoom:3.5},{name:"Miami",country:"United States of America",coordinates:[-80.226052,25.789557],kind:"World city in Natural Earth; Major population centre in source estimates",population:5585e3,minZoom:3.5},{name:"Belo Horizonte",country:"Brazil",coordinates:[-43.91695,-19.91308],kind:"Major population centre in source estimates",population:5575e3,minZoom:3.5},{name:"Philadelphia",country:"United States of America",coordinates:[-75.179841,39.945942],kind:"Major population centre in source estimates",population:5492e3,minZoom:3.5},{name:"Ahmedabad",country:"India",coordinates:[72.578058,23.031999],kind:"Major population centre in source estimates",population:5375e3,minZoom:3.5},{name:"Ho Chi Minh City",country:"Vietnam",coordinates:[106.702985,10.762125],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:5314e3,minZoom:3.5},{name:"Toronto",country:"Canada",coordinates:[-79.389459,43.664645],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:5213e3,minZoom:3.5},{name:"Barcelona",country:"Spain",coordinates:[2.181424,41.385245],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:492e4,minZoom:3.5},{name:"Sydney",country:"Australia",coordinates:[151.212548,-33.871373],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:463e4,minZoom:3.5},{name:"Atlanta",country:"United States of America",coordinates:[-84.367642,33.739457],kind:"World city in Natural Earth; Major population centre in source estimates",population:4506e3,minZoom:3.5},{name:"Boston",country:"United States of America",coordinates:[-71.07196,42.331906],kind:"World city in Natural Earth; Major population centre in source estimates",population:4467e3,minZoom:3.5},{name:"Melbourne",country:"Australia",coordinates:[144.97307,-37.818086],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:417e4,minZoom:3.5},{name:"San Francisco",country:"United States of America",coordinates:[-122.3996,37.784263],kind:"World city in Natural Earth; Major population centre in source estimates",population:345e4,minZoom:3.5},{name:"Johannesburg",country:"South Africa",coordinates:[28.028064,-26.168099],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:3435e3,minZoom:3.5},{name:"Casablanca",country:"Morocco",coordinates:[-7.618313,33.601922],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:3181e3,minZoom:3.5},{name:"Milan",country:"Italy",coordinates:[9.203063,45.471921],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:2945e3,minZoom:3.5},{name:"Frankfurt",country:"Germany",coordinates:[8.675015,50.099977],kind:"World city in Natural Earth; Major population centre in source estimates",population:2895e3,minZoom:3.5},{name:"Hamburg",country:"Germany",coordinates:[9.998053,53.551971],kind:"World city in Natural Earth; Major population centre in source estimates",population:1757e3,minZoom:3.5},{name:"Dubai",country:"United Arab Emirates",coordinates:[55.286946,25.214912],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:1379e3,minZoom:3.5},{name:"Auckland",country:"New Zealand",coordinates:[174.763027,-36.848055],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:1377200,minZoom:3.5},{name:"Munich",country:"Germany",coordinates:[11.573048,48.131888],kind:"World city in Natural Earth; Major population centre in source estimates",population:1275e3,minZoom:3.5},{name:"Geneva",country:"Switzerland",coordinates:[6.140028,46.210008],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:124e4,minZoom:3.5},{name:"Z\xFCrich",country:"Switzerland",coordinates:[8.548064,47.381934],kind:"World city in Natural Earth; Major population centre in source estimates; One of the two largest mapped cities in this country",population:1108e3,minZoom:3.5},{name:"Haora",country:"India",coordinates:[88.318516,22.584698],kind:"Major population centre in source estimates",population:4841638,minZoom:5},{name:"Dallas",country:"United States of America",coordinates:[-96.794687,32.771958],kind:"Major population centre in source estimates",population:4798e3,minZoom:5},{name:"Shenyeng",country:"China",coordinates:[123.448028,41.806925],kind:"Major population centre in source estimates",population:4787e3,minZoom:5},{name:"Pune",country:"India",coordinates:[73.851892,18.516394],kind:"Major population centre in source estimates",population:4672e3,minZoom:5},{name:"St.  Petersburg",country:"Russia",coordinates:[30.314074,59.94096],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:4553e3,minZoom:5},{name:"Chattogram",country:"Bangladesh",coordinates:[91.798022,22.331938],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:4529e3,minZoom:5},{name:"Dongguan",country:"China",coordinates:[113.750474,23.021537],kind:"Major population centre in source estimates",population:4528e3,minZoom:5},{name:"Houston",country:"United States of America",coordinates:[-95.348436,29.741273],kind:"Major population centre in source estimates",population:4459e3,minZoom:5},{name:"Guadalajara",country:"Mexico",coordinates:[-103.33198,20.671962],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:4198e3,minZoom:5},{name:"Alexandria",country:"Egypt",coordinates:[29.94805,31.201965],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:4165e3,minZoom:5},{name:"Chengdu",country:"China",coordinates:[104.068074,30.671946],kind:"Major population centre in source estimates",population:4123e3,minZoom:5},{name:"Detroit",country:"United States of America",coordinates:[-83.051334,42.333558],kind:"Major population centre in source estimates",population:4101e3,minZoom:5},{name:"Yangon",country:"Myanmar",coordinates:[96.164732,16.7853],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:4088e3,minZoom:5},{name:"Xian",country:"China",coordinates:[108.89305,34.276971],kind:"Major population centre in source estimates",population:4009e3,minZoom:5},{name:"Porto Alegre",country:"Brazil",coordinates:[-51.201958,-30.048069],kind:"Major population centre in source estimates",population:3917e3,minZoom:5},{name:"New Taipei",country:"Taiwan",coordinates:[121.465,25.012778],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:3893740,minZoom:5},{name:"Surat",country:"India",coordinates:[72.838094,21.20193],kind:"Major population centre in source estimates",population:3842e3,minZoom:5},{name:"Hechi",country:"China",coordinates:[108.083,24.695252],kind:"Major population centre in source estimates",population:383e4,minZoom:5},{name:"Monterrey",country:"Mexico",coordinates:[-100.331931,25.671941],kind:"Major population centre in source estimates",population:3712e3,minZoom:5},{name:"Yokohama",country:"Japan",coordinates:[139.602021,35.430656],kind:"Major population centre in source estimates",population:3697894,minZoom:5},{name:"Nanjing",country:"China",coordinates:[118.778029,32.051965],kind:"Major population centre in source estimates",population:3679e3,minZoom:5},{name:"Montr\xE9al",country:"Canada",coordinates:[-73.585243,45.501945],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:3678e3,minZoom:5},{name:"Guiyang",country:"China",coordinates:[106.718093,26.581989],kind:"Major population centre in source estimates",population:3662e3,minZoom:5},{name:"Recife",country:"Brazil",coordinates:[-34.908766,-8.060532],kind:"Major population centre in source estimates",population:3651e3,minZoom:5},{name:"Harbin",country:"China",coordinates:[126.648039,45.75193],kind:"Major population centre in source estimates",population:3621e3,minZoom:5},{name:"Fortaleza",country:"Brazil",coordinates:[-38.581927,-3.748072],kind:"Major population centre in source estimates",population:3602319,minZoom:5},{name:"\xDCr\xFCmqi",country:"China",coordinates:[87.57306,43.806958],kind:"Major population centre in source estimates",population:3575e3,minZoom:5},{name:"Phoenix",country:"United States of America",coordinates:[-112.067365,33.448322],kind:"Major population centre in source estimates",population:3551e3,minZoom:5},{name:"Zhangzhou",country:"China",coordinates:[117.670016,24.520375],kind:"Major population centre in source estimates",population:3531147,minZoom:5},{name:"Salvador",country:"Brazil",coordinates:[-38.481933,-12.968026],kind:"Major population centre in source estimates",population:3484e3,minZoom:5},{name:"Busan",country:"South Korea",coordinates:[129.008102,35.096999],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:348e4,minZoom:5},{name:"Medell\xEDn",country:"Colombia",coordinates:[-75.576956,6.276949],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:3297e3,minZoom:5},{name:"Nagoya",country:"Japan",coordinates:[136.913046,35.156943],kind:"Major population centre in source estimates",population:323e4,minZoom:5},{name:"Changchun",country:"China",coordinates:[125.338042,43.866954],kind:"Major population centre in source estimates",population:3183e3,minZoom:5},{name:"Dalian",country:"China",coordinates:[121.627885,38.924784],kind:"Major population centre in source estimates",population:3167e3,minZoom:5},{name:"Kanpur",country:"India",coordinates:[80.31805,26.461945],kind:"Major population centre in source estimates",population:3162e3,minZoom:5},{name:"Kano",country:"Nigeria",coordinates:[8.518092,12.001923],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:314e4,minZoom:5},{name:"Curitiba",country:"Brazil",coordinates:[-49.321944,-25.418067],kind:"Major population centre in source estimates",population:3084e3,minZoom:5},{name:"Seattle",country:"United States of America",coordinates:[-122.315322,47.600423],kind:"Major population centre in source estimates",population:3074e3,minZoom:5},{name:"Zibo",country:"China",coordinates:[117.99646,36.821365],kind:"Major population centre in source estimates",population:3061e3,minZoom:5},{name:"Jeddah",country:"Saudi Arabia",coordinates:[39.217252,21.518835],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:3012e3,minZoom:5},{name:"Irvine",country:"United States of America",coordinates:[-117.82995,33.680411],kind:"Major population centre in source estimates",population:3010232,minZoom:5},{name:"Hangzhou",country:"China",coordinates:[120.168073,30.25192],kind:"Major population centre in source estimates",population:3007e3,minZoom:5},{name:"Benoni",country:"South Africa",coordinates:[28.327994,-26.147635],kind:"Major population centre in source estimates",population:2986e3,minZoom:5},{name:"Stuttgart",country:"Germany",coordinates:[9.199996,48.77998],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2944700,minZoom:5},{name:"Kunming",country:"China",coordinates:[102.69744,25.042859],kind:"Major population centre in source estimates",population:2931e3,minZoom:5},{name:"Jaipur",country:"India",coordinates:[75.808042,26.923079],kind:"Major population centre in source estimates",population:2917e3,minZoom:5},{name:"San Diego",country:"United States of America",coordinates:[-117.150881,32.718914],kind:"Major population centre in source estimates",population:2916e3,minZoom:5},{name:"Taiyuan",country:"China",coordinates:[112.543112,37.876958],kind:"Major population centre in source estimates",population:2913e3,minZoom:5},{name:"Qingdao",country:"China",coordinates:[120.328063,36.091925],kind:"Major population centre in source estimates",population:2866e3,minZoom:5},{name:"Surabaya",country:"Indonesia",coordinates:[112.748887,-7.24729],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2845e3,minZoom:5},{name:"Jinan",country:"China",coordinates:[116.993073,36.676928],kind:"Major population centre in source estimates",population:2798e3,minZoom:5},{name:"Fukuoka",country:"Japan",coordinates:[130.408068,33.596961],kind:"Major population centre in source estimates",population:2792e3,minZoom:5},{name:"Campinas",country:"Brazil",coordinates:[-47.055885,-22.907898],kind:"Major population centre in source estimates",population:2791e3,minZoom:5},{name:"Kaohsiung",country:"Taiwan",coordinates:[120.266602,22.633307],kind:"Major population centre in source estimates",population:2769072,minZoom:5},{name:"Quezon City",country:"Philippines",coordinates:[121.029966,14.650435],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2761720,minZoom:5},{name:"Katowice",country:"Poland",coordinates:[19.020017,50.26038],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2746e3,minZoom:5},{name:"Aleppo",country:"Syria",coordinates:[37.168074,36.231917],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2738e3,minZoom:5},{name:"Durban",country:"South Africa",coordinates:[31.010944,-29.860662],kind:"Major population centre in source estimates",population:2729e3,minZoom:5},{name:"Lucknow",country:"India",coordinates:[80.913053,26.856985],kind:"Major population centre in source estimates",population:2695e3,minZoom:5},{name:"Giza",country:"Egypt",coordinates:[31.190024,30.009989],kind:"Major population centre in source estimates",population:2681863,minZoom:5},{name:"Zhengzhou",country:"China",coordinates:[113.663147,34.756942],kind:"Major population centre in source estimates",population:2636e3,minZoom:5},{name:"Taichung",country:"Taiwan",coordinates:[120.681667,24.152078],kind:"Major population centre in source estimates",population:2629323,minZoom:5},{name:"Ibadan",country:"Nigeria",coordinates:[3.928036,7.381972],kind:"Major population centre in source estimates",population:2628e3,minZoom:5},{name:"Faisalabad",country:"Pakistan",coordinates:[73.108051,31.411927],kind:"Major population centre in source estimates",population:2617e3,minZoom:5},{name:"Minneapolis",country:"United States of America",coordinates:[-93.253732,44.981925],kind:"Major population centre in source estimates",population:2616e3,minZoom:5},{name:"Fuzhou",country:"China",coordinates:[119.2981,26.081942],kind:"Major population centre in source estimates",population:2606e3,minZoom:5},{name:"Changsha",country:"China",coordinates:[112.968047,28.201916],kind:"Major population centre in source estimates",population:2604e3,minZoom:5},{name:"\u0130zmir",country:"Turkey",coordinates:[27.149848,38.438096],kind:"Major population centre in source estimates",population:2587e3,minZoom:5},{name:"Xiangtan",country:"China",coordinates:[112.900023,27.850431],kind:"Major population centre in source estimates",population:2586948,minZoom:5},{name:"Lanzhou",country:"China",coordinates:[103.790054,36.057974],kind:"Major population centre in source estimates",population:2561e3,minZoom:5},{name:"Incheon",country:"South Korea",coordinates:[126.640288,37.478094],kind:"Major population centre in source estimates",population:255e4,minZoom:5},{name:"Sapporo",country:"Japan",coordinates:[141.338099,43.076925],kind:"Major population centre in source estimates",population:2544e3,minZoom:5},{name:"Xiamen",country:"China",coordinates:[118.078071,24.451938],kind:"Major population centre in source estimates",population:2519e3,minZoom:5},{name:"Guayaquil",country:"Ecuador",coordinates:[-79.921988,-2.218088],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2514e3,minZoom:5},{name:"George Town",country:"Malaysia",coordinates:[100.329368,5.413613],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:25e5,minZoom:5},{name:"San Juan",country:"Puerto Rico",coordinates:[-66.129979,18.440023],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2478905,minZoom:5},{name:"Mashhad",country:"Iran",coordinates:[59.568051,36.271966],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2469e3,minZoom:5},{name:"Daegu",country:"South Korea",coordinates:[128.605026,35.868735],kind:"Major population centre in source estimates",population:246e4,minZoom:5},{name:"Nagpur",country:"India",coordinates:[79.088048,21.171906],kind:"Major population centre in source estimates",population:2454e3,minZoom:5},{name:"Jinxi",country:"China",coordinates:[120.828033,40.752287],kind:"Major population centre in source estimates",population:2426e3,minZoom:5},{name:"Shijiazhuang",country:"China",coordinates:[114.478032,38.05196],kind:"Major population centre in source estimates",population:2417e3,minZoom:5},{name:"Jilin",country:"China",coordinates:[126.548097,43.851917],kind:"Major population centre in source estimates",population:2396e3,minZoom:5},{name:"Omdurman",country:"Sudan",coordinates:[32.480022,15.616681],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2395159,minZoom:5},{name:"Bandung",country:"Indonesia",coordinates:[107.568067,-6.948083],kind:"Major population centre in source estimates",population:2394e3,minZoom:5},{name:"Bekasi",country:"Indonesia",coordinates:[106.972323,-6.217257],kind:"Major population centre in source estimates",population:2378211,minZoom:5},{name:"Mannheim",country:"Germany",coordinates:[8.470015,49.500375],kind:"Major population centre in source estimates",population:2362e3,minZoom:5},{name:"Wenzhou",country:"China",coordinates:[120.648147,28.021927],kind:"Major population centre in source estimates",population:235e4,minZoom:5},{name:"Nanchang",country:"China",coordinates:[115.87805,28.681938],kind:"Major population centre in source estimates",population:235e4,minZoom:5},{name:"Tampa",country:"United States of America",coordinates:[-82.460567,27.948934],kind:"Major population centre in source estimates",population:2314e3,minZoom:5},{name:"Vancouver",country:"Canada",coordinates:[-123.12359,49.275362],kind:"Major population centre in source estimates",population:2313328,minZoom:5},{name:"Denver",country:"United States of America",coordinates:[-104.985962,39.741134],kind:"Major population centre in source estimates",population:2313e3,minZoom:5},{name:"Birmingham",country:"United Kingdom",coordinates:[-1.921943,52.47692],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2285e3,minZoom:5},{name:"Baltimore",country:"United States of America",coordinates:[-76.614582,39.281516],kind:"Major population centre in source estimates",population:2255e3,minZoom:5},{name:"Cali",country:"Colombia",coordinates:[-76.501912,3.401905],kind:"Major population centre in source estimates",population:2254e3,minZoom:5},{name:"Sendai",country:"Japan",coordinates:[140.869667,38.268441],kind:"Major population centre in source estimates",population:225e4,minZoom:5},{name:"Naples",country:"Italy",coordinates:[14.243066,40.841971],kind:"Major population centre in source estimates",population:225e4,minZoom:5},{name:"Manchester",country:"United Kingdom",coordinates:[-2.248685,53.47532],kind:"Major population centre in source estimates",population:223e4,minZoom:5},{name:"St. Louis",country:"United States of America",coordinates:[-90.241926,38.636964],kind:"Major population centre in source estimates",population:2199e3,minZoom:5},{name:"Puebla",country:"Mexico",coordinates:[-98.203737,19.032594],kind:"Major population centre in source estimates",population:2195e3,minZoom:5},{name:"Nanchong",country:"China",coordinates:[106.128051,30.782378],kind:"Major population centre in source estimates",population:2174e3,minZoom:5},{name:"Nanning",country:"China",coordinates:[108.318099,22.821934],kind:"Major population centre in source estimates",population:2167e3,minZoom:5},{name:"Bel\xE9m",country:"Brazil",coordinates:[-48.481969,-1.448057],kind:"Major population centre in source estimates",population:2167e3,minZoom:5},{name:"Patna",country:"India",coordinates:[85.128093,25.626905],kind:"Major population centre in source estimates",population:2158e3,minZoom:5},{name:"Zaozhuang",country:"China",coordinates:[117.568077,34.881947],kind:"Major population centre in source estimates",population:2145e3,minZoom:5},{name:"Yantai",country:"China",coordinates:[121.398075,37.532354],kind:"Major population centre in source estimates",population:2116e3,minZoom:5},{name:"Medan",country:"Indonesia",coordinates:[98.648094,3.58192],kind:"Major population centre in source estimates",population:2115e3,minZoom:5},{name:"Santa Cruz",country:"Bolivia",coordinates:[-63.227942,-17.751972],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2102998,minZoom:5},{name:"Xuzhou",country:"China",coordinates:[117.178074,34.281958],kind:"Major population centre in source estimates",population:2091e3,minZoom:5},{name:"Linyi",country:"China",coordinates:[118.32803,35.081935],kind:"Major population centre in source estimates",population:2082e3,minZoom:5},{name:"Maracaibo",country:"Venezuela",coordinates:[-71.661924,10.731923],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:2072e3,minZoom:5},{name:"Dammam",country:"Saudi Arabia",coordinates:[50.097724,26.430138],kind:"Major population centre in source estimates",population:2054710,minZoom:5},{name:"Haikou",country:"China",coordinates:[110.320026,20.050002],kind:"Major population centre in source estimates",population:2046189,minZoom:5},{name:"Hiroshima",country:"Japan",coordinates:[132.440967,34.389781],kind:"Major population centre in source estimates",population:2045e3,minZoom:5},{name:"Fort Lauderdale",country:"United States of America",coordinates:[-80.141785,26.136065],kind:"Major population centre in source estimates",population:2042042,minZoom:5},{name:"Long Beach",country:"United States of America",coordinates:[-118.200337,33.777018],kind:"Major population centre in source estimates",population:2036134,minZoom:5},{name:"Baotou",country:"China",coordinates:[109.820074,40.654153],kind:"Major population centre in source estimates",population:2036e3,minZoom:5},{name:"Hefei",country:"China",coordinates:[117.278068,31.851977],kind:"Major population centre in source estimates",population:2035e3,minZoom:5},{name:"Indore",country:"India",coordinates:[75.863077,22.717005],kind:"Major population centre in source estimates",population:2026e3,minZoom:5},{name:"Goi\xE2nia",country:"Brazil",coordinates:[-49.301971,-16.718081],kind:"Major population centre in source estimates",population:2022e3,minZoom:5},{name:"Haiphong",country:"Vietnam",coordinates:[106.678147,20.831952],kind:"Major population centre in source estimates",population:1969e3,minZoom:5},{name:"Suzhou",country:"China",coordinates:[116.976943,33.638057],kind:"Major population centre in source estimates",population:1964e3,minZoom:5},{name:"Nanyang",country:"China",coordinates:[112.528074,33.002346],kind:"Major population centre in source estimates",population:1944e3,minZoom:5},{name:"Ningbo",country:"China",coordinates:[121.548092,29.881917],kind:"Major population centre in source estimates",population:1923e3,minZoom:5},{name:"Douala",country:"Cameroon",coordinates:[9.708045,4.062356],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1906e3,minZoom:5},{name:"Cleveland",country:"United States of America",coordinates:[-81.696944,41.471933],kind:"Major population centre in source estimates",population:189e4,minZoom:5},{name:"Tangshan",country:"China",coordinates:[118.192431,39.626283],kind:"Major population centre in source estimates",population:1879e3,minZoom:5},{name:"Tainan",country:"Taiwan",coordinates:[120.200043,23.000003],kind:"Major population centre in source estimates",population:1876312,minZoom:5},{name:"Portland",country:"United States of America",coordinates:[-122.681936,45.52197],kind:"Major population centre in source estimates",population:1875e3,minZoom:5},{name:"Datong",country:"China",coordinates:[113.298053,40.081966],kind:"Major population centre in source estimates",population:1873e3,minZoom:5},{name:"Saidu",country:"Pakistan",coordinates:[72.349992,34.750035],kind:"Major population centre in source estimates",population:1860310,minZoom:5},{name:"Brisbane",country:"Australia",coordinates:[153.033147,-27.453085],kind:"Major population centre in source estimates",population:186e4,minZoom:5},{name:"Rawalpindi",country:"Pakistan",coordinates:[73.067502,33.591002],kind:"Major population centre in source estimates",population:1858e3,minZoom:5},{name:"Pittsburgh",country:"United States of America",coordinates:[-80.001931,40.431945],kind:"Major population centre in source estimates",population:1838e3,minZoom:5},{name:"Las Vegas",country:"United States of America",coordinates:[-115.151362,36.164763],kind:"Major population centre in source estimates",population:1823e3,minZoom:5},{name:"Barranquilla",country:"Colombia",coordinates:[-74.801913,10.961934],kind:"Major population centre in source estimates",population:1798e3,minZoom:5},{name:"Shuyang",country:"China",coordinates:[118.77336,34.129866],kind:"Major population centre in source estimates",population:177e4,minZoom:5},{name:"Valencia",country:"Venezuela",coordinates:[-67.981967,10.231927],kind:"Major population centre in source estimates",population:177e4,minZoom:5},{name:"Vadodara",country:"India",coordinates:[73.178073,22.311965],kind:"Major population centre in source estimates",population:1756e3,minZoom:5},{name:"Shangqiu",country:"China",coordinates:[115.64961,34.412942],kind:"Major population centre in source estimates",population:1753e3,minZoom:5},{name:"Manaus",country:"Brazil",coordinates:[-60.001963,-3.098086],kind:"Major population centre in source estimates",population:1753e3,minZoom:5},{name:"Wuxi",country:"China",coordinates:[120.298039,31.581942],kind:"Major population centre in source estimates",population:1749e3,minZoom:5},{name:"Palembang",country:"Indonesia",coordinates:[104.748084,-2.978093],kind:"Major population centre in source estimates",population:1749e3,minZoom:5},{name:"San Bernardino",country:"United States of America",coordinates:[-117.30198,34.12233],kind:"Major population centre in source estimates",population:1745e3,minZoom:5},{name:"Essen",country:"Germany",coordinates:[7.016615,51.449998],kind:"Major population centre in source estimates",population:1742135,minZoom:5},{name:"Bhopal",country:"India",coordinates:[77.408047,23.251934],kind:"Major population centre in source estimates",population:1727e3,minZoom:5},{name:"Hohhot",country:"China",coordinates:[111.65805,40.821921],kind:"Major population centre in source estimates",population:1726e3,minZoom:5},{name:"Luoyang",country:"China",coordinates:[112.444471,34.64377],kind:"Major population centre in source estimates",population:1715e3,minZoom:5},{name:"Santos",country:"Brazil",coordinates:[-46.328496,-23.961836],kind:"Major population centre in source estimates",population:1709e3,minZoom:5},{name:"Jianmen",country:"China",coordinates:[113.158061,30.651999],kind:"Major population centre in source estimates",population:1708e3,minZoom:5},{name:"Vit\xF3ria",country:"Brazil",coordinates:[-40.353943,-20.332042],kind:"Major population centre in source estimates",population:1704e3,minZoom:5},{name:"Coimbatore",country:"India",coordinates:[76.948075,11.001906],kind:"Major population centre in source estimates",population:1696e3,minZoom:5},{name:"Daqing",country:"China",coordinates:[124.998062,46.581905],kind:"Major population centre in source estimates",population:1693e3,minZoom:5},{name:"Luan",country:"China",coordinates:[116.478065,31.752293],kind:"Major population centre in source estimates",population:169e4,minZoom:5},{name:"Wanzhou",country:"China",coordinates:[108.400039,30.819991],kind:"Major population centre in source estimates",population:168e4,minZoom:5},{name:"San Jose",country:"United States of America",coordinates:[-121.888179,37.330943],kind:"Major population centre in source estimates",population:1668e3,minZoom:5},{name:"Turin",country:"Italy",coordinates:[7.668015,45.072333],kind:"Major population centre in source estimates",population:1652e3,minZoom:5},{name:"Suzhou",country:"China",coordinates:[120.618071,31.302424],kind:"Major population centre in source estimates",population:165e4,minZoom:5},{name:"Ludhiana",country:"India",coordinates:[75.870312,30.929708],kind:"Major population centre in source estimates",population:1649e3,minZoom:5},{name:"Kumasi",country:"Ghana",coordinates:[-1.63196,6.691937],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1646e3,minZoom:5},{name:"Qiqihar",country:"China",coordinates:[123.988046,47.346923],kind:"Major population centre in source estimates",population:1641e3,minZoom:5},{name:"Anshan",country:"China",coordinates:[122.938085,41.116967],kind:"Major population centre in source estimates",population:1639e3,minZoom:5},{name:"Cincinnati",country:"United States of America",coordinates:[-84.458868,39.163831],kind:"Major population centre in source estimates",population:1636e3,minZoom:5},{name:"Zhongli",country:"Taiwan",coordinates:[121.216776,24.965025],kind:"Major population centre in source estimates",population:1632616,minZoom:5},{name:"Handan",country:"China",coordinates:[114.478032,36.581921],kind:"Major population centre in source estimates",population:1631e3,minZoom:5},{name:"Taian",country:"China",coordinates:[117.11813,36.201944],kind:"Major population centre in source estimates",population:1629e3,minZoom:5},{name:"Isfahan",country:"Iran",coordinates:[51.698092,32.701951],kind:"Major population centre in source estimates",population:1628e3,minZoom:5},{name:"Sacramento",country:"United States of America",coordinates:[-121.471984,38.576967],kind:"Major population centre in source estimates",population:1604e3,minZoom:5},{name:"Shantou",country:"China",coordinates:[116.66808,23.371952],kind:"Major population centre in source estimates",population:1601e3,minZoom:5},{name:"Agra",country:"India",coordinates:[78.013075,27.172366],kind:"Major population centre in source estimates",population:1592e3,minZoom:5},{name:"Zhanjiang",country:"China",coordinates:[110.378076,21.20193],kind:"Major population centre in source estimates",population:159e4,minZoom:5},{name:"Kalyan",country:"India",coordinates:[73.160175,19.250232],kind:"Major population centre in source estimates",population:1576614,minZoom:5},{name:"Xiantao",country:"China",coordinates:[113.438096,30.372352],kind:"Major population centre in source estimates",population:1556e3,minZoom:5},{name:"Weifang",country:"China",coordinates:[119.155626,36.702285],kind:"Major population centre in source estimates",population:1553e3,minZoom:5},{name:"Khulna",country:"Bangladesh",coordinates:[89.558055,22.841933],kind:"Major population centre in source estimates",population:1553e3,minZoom:5},{name:"Tijuana",country:"Mexico",coordinates:[-117.081942,32.501963],kind:"Major population centre in source estimates",population:1553e3,minZoom:5},{name:"Santiago",country:"Dominican Republic",coordinates:[-70.670012,19.50001],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1550753,minZoom:5},{name:"Xinyang",country:"China",coordinates:[114.068032,32.132322],kind:"Major population centre in source estimates",population:1541e3,minZoom:5},{name:"Luzhou",country:"China",coordinates:[105.378071,28.881926],kind:"Major population centre in source estimates",population:1537e3,minZoom:5},{name:"Perth",country:"Australia",coordinates:[115.838053,-31.953069],kind:"Major population centre in source estimates",population:1532e3,minZoom:5},{name:"Toluca",country:"Mexico",coordinates:[-99.653179,19.289308],kind:"Major population centre in source estimates",population:1531e3,minZoom:5},{name:"Leeds",country:"United Kingdom",coordinates:[-1.551348,53.790017],kind:"Major population centre in source estimates",population:1529e3,minZoom:5},{name:"Vishakhapatnam",country:"India",coordinates:[83.219848,17.682903],kind:"Major population centre in source estimates",population:1529e3,minZoom:5},{name:"K\u014Dbe",country:"Japan",coordinates:[135.169982,34.679988],kind:"Major population centre in source estimates",population:1528478,minZoom:5},{name:"Multan",country:"Pakistan",coordinates:[71.453062,30.201923],kind:"Major population centre in source estimates",population:1522e3,minZoom:5},{name:"Kochi",country:"India",coordinates:[76.22197,10.016953],kind:"Major population centre in source estimates",population:1519e3,minZoom:5},{name:"Gujranwala",country:"Pakistan",coordinates:[74.183076,32.162372],kind:"Major population centre in source estimates",population:1513e3,minZoom:5},{name:"Oakland",country:"United States of America",coordinates:[-122.278038,37.804725],kind:"Major population centre in source estimates",population:1510271,minZoom:5},{name:"Niter\xF3i",country:"Brazil",coordinates:[-43.105826,-22.882534],kind:"Major population centre in source estimates",population:1500513,minZoom:5},{name:"Ganzhou",country:"China",coordinates:[114.950027,25.91998],kind:"Major population centre in source estimates",population:15e5,minZoom:5},{name:"Florence",country:"Italy",coordinates:[11.25,43.780001],kind:"Major population centre in source estimates",population:15e5,minZoom:5},{name:"Liuzhou",country:"China",coordinates:[109.413529,24.320777],kind:"Major population centre in source estimates",population:1497e3,minZoom:5},{name:"Bursa",country:"Turkey",coordinates:[29.068052,40.201933],kind:"Major population centre in source estimates",population:1492e3,minZoom:5},{name:"Virginia Beach",country:"United States of America",coordinates:[-75.980265,36.85516],kind:"Major population centre in source estimates",population:1491e3,minZoom:5},{name:"Le\xF3n",country:"Mexico",coordinates:[-101.701976,21.151933],kind:"Major population centre in source estimates",population:1488e3,minZoom:5},{name:"Nasik",country:"India",coordinates:[73.778036,20.002365],kind:"Major population centre in source estimates",population:1473e3,minZoom:5},{name:"San Antonio",country:"United States of America",coordinates:[-98.492693,29.419848],kind:"Major population centre in source estimates",population:1473e3,minZoom:5},{name:"Fushun",country:"China",coordinates:[123.868054,41.867335],kind:"Major population centre in source estimates",population:147e4,minZoom:5},{name:"Changde",country:"China",coordinates:[111.6781,29.031943],kind:"Major population centre in source estimates",population:1469e3,minZoom:5},{name:"Kansas City",country:"United States of America",coordinates:[-94.60604,39.109034],kind:"Major population centre in source estimates",population:1469e3,minZoom:5},{name:"Daejeon",country:"South Korea",coordinates:[127.423082,36.337491],kind:"Major population centre in source estimates",population:1468e3,minZoom:5},{name:"Neijiang",country:"China",coordinates:[105.048066,29.582323],kind:"Major population centre in source estimates",population:1466e3,minZoom:5},{name:"Quanzhou",country:"China",coordinates:[118.578041,24.901962],kind:"Major population centre in source estimates",population:1463e3,minZoom:5},{name:"Kharkiv",country:"Ukraine",coordinates:[36.248079,50.001929],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1461e3,minZoom:5},{name:"Hyderabad",country:"Pakistan",coordinates:[68.373043,25.381933],kind:"Major population centre in source estimates",population:1459e3,minZoom:5},{name:"C\xF3rdoba",country:"Argentina",coordinates:[-64.18424,-31.398012],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1452e3,minZoom:5},{name:"Huainan",country:"China",coordinates:[116.978035,32.63193],kind:"Major population centre in source estimates",population:1451e3,minZoom:5},{name:"Kaduna",country:"Nigeria",coordinates:[7.438054,10.521961],kind:"Major population centre in source estimates",population:1442e3,minZoom:5},{name:"Ft.  Worth",country:"United States of America",coordinates:[-97.340038,32.739977],kind:"Major population centre in source estimates",population:1440454,minZoom:5},{name:"Gwangju",country:"South Korea",coordinates:[126.908488,35.172911],kind:"Major population centre in source estimates",population:144e4,minZoom:5},{name:"Kawasaki",country:"Japan",coordinates:[139.705002,35.529988],kind:"Major population centre in source estimates",population:1437266,minZoom:5},{name:"Indianapolis",country:"United States of America",coordinates:[-86.171994,39.751934],kind:"Major population centre in source estimates",population:1436e3,minZoom:5},{name:"Suining",country:"China",coordinates:[105.531387,30.535279],kind:"Major population centre in source estimates",population:1425e3,minZoom:5},{name:"Karaj",country:"Iran",coordinates:[50.968059,35.802305],kind:"Major population centre in source estimates",population:1423e3,minZoom:5},{name:"Lyon",country:"France",coordinates:[4.828085,45.771954],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1423e3,minZoom:5},{name:"Tabriz",country:"Iran",coordinates:[46.2993,38.088237],kind:"Major population centre in source estimates",population:1413e3,minZoom:5},{name:"Davao",country:"Philippines",coordinates:[125.62805,7.111963],kind:"Major population centre in source estimates",population:1402e3,minZoom:5},{name:"Marseille",country:"France",coordinates:[5.373064,43.291925],kind:"Major population centre in source estimates",population:14e5,minZoom:5},{name:"Meerut",country:"India",coordinates:[77.698055,29.002358],kind:"Major population centre in source estimates",population:1398e3,minZoom:5},{name:"Mianyang",country:"China",coordinates:[104.689993,31.464828],kind:"Major population centre in source estimates",population:1396e3,minZoom:5},{name:"Semarang",country:"Indonesia",coordinates:[110.418074,-6.964672],kind:"Major population centre in source estimates",population:1396e3,minZoom:5},{name:"Faridabad",country:"India",coordinates:[77.314721,28.435279],kind:"Major population centre in source estimates",population:1394e3,minZoom:5},{name:"Novosibirsk",country:"Russia",coordinates:[82.958096,55.031906],kind:"Major population centre in source estimates",population:1389e3,minZoom:5},{name:"Milwaukee",country:"United States of America",coordinates:[-87.916673,43.029608],kind:"Major population centre in source estimates",population:1388e3,minZoom:5},{name:"Makkah",country:"Saudi Arabia",coordinates:[39.818094,21.431967],kind:"Major population centre in source estimates",population:1385e3,minZoom:5},{name:"Maanshan",country:"China",coordinates:[118.485148,31.672564],kind:"Major population centre in source estimates",population:1366302,minZoom:5},{name:"Yiyang",country:"China",coordinates:[112.328086,28.602356],kind:"Major population centre in source estimates",population:1352e3,minZoom:5},{name:"Lubumbashi",country:"Congo (Kinshasa)",coordinates:[27.478072,-11.678079],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1352e3,minZoom:5},{name:"Varanasi",country:"India",coordinates:[82.998094,25.331936],kind:"Major population centre in source estimates",population:1352e3,minZoom:5},{name:"Orlando",country:"United States of America",coordinates:[-81.381976,28.511923],kind:"Major population centre in source estimates",population:135e4,minZoom:5},{name:"Ciudad Ju\xE1rez",country:"Mexico",coordinates:[-106.491994,31.692323],kind:"Major population centre in source estimates",population:1343e3,minZoom:5},{name:"Ghaziabad",country:"India",coordinates:[77.406445,28.662327],kind:"Major population centre in source estimates",population:1341e3,minZoom:5},{name:"Heze",country:"China",coordinates:[115.448103,35.231926],kind:"Major population centre in source estimates",population:1338e3,minZoom:5},{name:"Porto",country:"Portugal",coordinates:[-8.621947,41.151952],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1337e3,minZoom:5},{name:"Asansol",country:"India",coordinates:[86.981387,23.685279],kind:"Major population centre in source estimates",population:1328e3,minZoom:5},{name:"Changzhou",country:"China",coordinates:[119.968033,31.78193],kind:"Major population centre in source estimates",population:1327e3,minZoom:5},{name:"Mosul",country:"Iraq",coordinates:[43.143059,36.346948],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1316e3,minZoom:5},{name:"Yekaterinburg",country:"Russia",coordinates:[60.598014,56.851976],kind:"Major population centre in source estimates",population:1313e3,minZoom:5},{name:"Peshawar",country:"Pakistan",coordinates:[71.533057,34.006962],kind:"Major population centre in source estimates",population:1303e3,minZoom:5},{name:"Mandalay",country:"Myanmar",coordinates:[96.083083,21.971934],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:13e5,minZoom:5},{name:"Jamshedpur",country:"India",coordinates:[86.195573,22.789481],kind:"Major population centre in source estimates",population:13e5,minZoom:5},{name:"Mbuji-Mayi",country:"Congo (Kinshasa)",coordinates:[23.59805,-6.148081],kind:"Major population centre in source estimates",population:1295e3,minZoom:5},{name:"Madurai",country:"India",coordinates:[78.118081,9.921972],kind:"Major population centre in source estimates",population:1294e3,minZoom:5},{name:"Adana",country:"Turkey",coordinates:[35.318058,36.996935],kind:"Major population centre in source estimates",population:1293e3,minZoom:5},{name:"Sheffield",country:"United Kingdom",coordinates:[-1.499997,53.366677],kind:"Major population centre in source estimates",population:1292900,minZoom:5},{name:"Jabalpur",country:"India",coordinates:[79.953112,23.177003],kind:"Major population centre in source estimates",population:1285e3,minZoom:5},{name:"Nizhny Novgorod",country:"Russia",coordinates:[43.998148,56.334953],kind:"Major population centre in source estimates",population:1278e3,minZoom:5},{name:"Providence",country:"United States of America",coordinates:[-71.416926,41.823048],kind:"Major population centre in source estimates",population:1277e3,minZoom:5},{name:"Chifeng",country:"China",coordinates:[118.948044,42.271961],kind:"Major population centre in source estimates",population:1277e3,minZoom:5},{name:"Duisburg",country:"Germany",coordinates:[6.750017,51.429973],kind:"Major population centre in source estimates",population:1276757,minZoom:5},{name:"Columbus",country:"United States of America",coordinates:[-82.991956,39.98192],kind:"Major population centre in source estimates",population:127e4,minZoom:5},{name:"Huaiyin",country:"China",coordinates:[119.065967,33.585165],kind:"Major population centre in source estimates",population:1264e3,minZoom:5},{name:"Makassar",country:"Indonesia",coordinates:[119.430082,-5.138013],kind:"Major population centre in source estimates",population:1262e3,minZoom:5},{name:"Rajkot",country:"India",coordinates:[70.798063,22.311965],kind:"Major population centre in source estimates",population:126e4,minZoom:5},{name:"West Palm Beach",country:"United States of America",coordinates:[-80.123621,26.74502],kind:"Major population centre in source estimates",population:125e4,minZoom:5},{name:"Dhanbad",country:"India",coordinates:[86.41804,23.802339],kind:"Major population centre in source estimates",population:1246e3,minZoom:5},{name:"Mudangiang",country:"China",coordinates:[129.588066,44.576963],kind:"Major population centre in source estimates",population:1244e3,minZoom:5},{name:"Shiraz",country:"Iran",coordinates:[52.568065,29.631906],kind:"Major population centre in source estimates",population:124e4,minZoom:5},{name:"Huzhou",country:"China",coordinates:[120.098051,30.872321],kind:"Major population centre in source estimates",population:1231e3,minZoom:5},{name:"Tianshui",country:"China",coordinates:[105.918038,34.601964],kind:"Major population centre in source estimates",population:1225e3,minZoom:5},{name:"Liupanshui",country:"China",coordinates:[104.831386,26.596381],kind:"Major population centre in source estimates",population:1221e3,minZoom:5},{name:"D\xFCsseldorf",country:"Germany",coordinates:[6.779989,51.220374],kind:"Major population centre in source estimates",population:122e4,minZoom:5},{name:"Maoming",country:"China",coordinates:[110.870018,21.920405],kind:"Major population centre in source estimates",population:1217715,minZoom:5},{name:"Seville",country:"Spain",coordinates:[-5.980007,37.405015],kind:"Major population centre in source estimates",population:1212045,minZoom:5},{name:"Amritsar",country:"India",coordinates:[74.868047,31.641938],kind:"Major population centre in source estimates",population:1212e3,minZoom:5},{name:"Vila Velha",country:"Brazil",coordinates:[-51.216652,3.216663],kind:"Major population centre in source estimates",population:1209091,minZoom:5},{name:"Vila Velha",country:"Brazil",coordinates:[-40.290233,-20.338046],kind:"Major population centre in source estimates",population:1209091,minZoom:5},{name:"Almaty",country:"Kazakhstan",coordinates:[76.91309,43.326936],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1209e3,minZoom:5},{name:"Warangal",country:"India",coordinates:[79.57999,18.009998],kind:"Major population centre in source estimates",population:1203853,minZoom:5},{name:"Rosario",country:"Argentina",coordinates:[-60.668253,-32.949184],kind:"Major population centre in source estimates",population:1203e3,minZoom:5},{name:"Allahabad",country:"India",coordinates:[81.838061,25.456941],kind:"Major population centre in source estimates",population:1201e3,minZoom:5},{name:"Benin City",country:"Nigeria",coordinates:[5.618062,6.342423],kind:"Major population centre in source estimates",population:119e4,minZoom:5},{name:"Jining",country:"China",coordinates:[116.548087,35.402355],kind:"Major population centre in source estimates",population:1186e3,minZoom:5},{name:"Macei\xF3",country:"Brazil",coordinates:[-35.73192,-9.61805],kind:"Major population centre in source estimates",population:1186e3,minZoom:5},{name:"Abbottabad",country:"Pakistan",coordinates:[73.199501,34.149503],kind:"Major population centre in source estimates",population:1183647,minZoom:5},{name:"Banghazi",country:"Libya",coordinates:[20.064777,32.118679],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:118e4,minZoom:5},{name:"Cilacap",country:"Indonesia",coordinates:[109.015402,-7.71882],kind:"Major population centre in source estimates",population:1174964,minZoom:5},{name:"Raleigh",country:"United States of America",coordinates:[-78.647035,35.772696],kind:"Major population centre in source estimates",population:1163515,minZoom:5},{name:"Austin",country:"United States of America",coordinates:[-97.744724,30.268895],kind:"Major population centre in source estimates",population:1161e3,minZoom:5},{name:"Glasgow",country:"United Kingdom",coordinates:[-4.239101,55.86227],kind:"Major population centre in source estimates",population:116e4,minZoom:5},{name:"Leshan",country:"China",coordinates:[103.731402,29.569042],kind:"Major population centre in source estimates",population:1157e3,minZoom:5},{name:"Adelaide",country:"Australia",coordinates:[138.598059,-34.933042],kind:"Major population centre in source estimates",population:1145e3,minZoom:5},{name:"Shangrao",country:"China",coordinates:[117.969998,28.470393],kind:"Major population centre in source estimates",population:1144577,minZoom:5},{name:"Torre\xF3n",country:"Mexico",coordinates:[-103.421949,25.571999],kind:"Major population centre in source estimates",population:1144e3,minZoom:5},{name:"Srinagar",country:"India",coordinates:[74.828309,34.069474],kind:"Major population centre in source estimates",population:114e4,minZoom:5},{name:"Vijayawada",country:"India",coordinates:[80.628057,16.521905],kind:"Major population centre in source estimates",population:1137e3,minZoom:5},{name:"Samara",country:"Russia",coordinates:[50.149349,53.196953],kind:"Major population centre in source estimates",population:1137e3,minZoom:5},{name:"Omsk",country:"Russia",coordinates:[73.398008,54.991934],kind:"Major population centre in source estimates",population:1135e3,minZoom:5},{name:"Birmingham",country:"United States of America",coordinates:[-86.824995,33.530006],kind:"Major population centre in source estimates",population:1128047,minZoom:5},{name:"Nampo",country:"North Korea",coordinates:[125.450488,38.768867],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1127e3,minZoom:5},{name:"Yulin",country:"China",coordinates:[110.148064,22.63192],kind:"Major population centre in source estimates",population:1127e3,minZoom:5},{name:"Xianyang",country:"China",coordinates:[108.712776,34.347501],kind:"Major population centre in source estimates",population:1126e3,minZoom:5},{name:"Cagayan de Oro",country:"Philippines",coordinates:[124.685299,8.45084],kind:"Major population centre in source estimates",population:1121561,minZoom:5},{name:"Can Tho",country:"Vietnam",coordinates:[105.770019,10.049993],kind:"Major population centre in source estimates",population:1121e3,minZoom:5},{name:"Barquisimeto",country:"Venezuela",coordinates:[-69.301913,10.051938],kind:"Major population centre in source estimates",population:1116e3,minZoom:5},{name:"Kazan",country:"Russia",coordinates:[49.124399,55.751888],kind:"Major population centre in source estimates",population:1115e3,minZoom:5},{name:"Aurangabad",country:"India",coordinates:[75.328948,19.861686],kind:"Major population centre in source estimates",population:1113e3,minZoom:5},{name:"Calgary",country:"Canada",coordinates:[-114.081944,51.084938],kind:"Major population centre in source estimates",population:111e4,minZoom:5},{name:"Nezahualcoyotl",country:"Mexico",coordinates:[-99.029987,19.410016],kind:"Major population centre in source estimates",population:1109363,minZoom:5},{name:"Baoding",country:"China",coordinates:[115.468897,38.85834],kind:"Major population centre in source estimates",population:1107e3,minZoom:5},{name:"Zigong",country:"China",coordinates:[104.778056,29.401946],kind:"Major population centre in source estimates",population:1105e3,minZoom:5},{name:"Sharjah",country:"United Arab Emirates",coordinates:[55.406478,25.371383],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1103027,minZoom:5},{name:"Ankang",country:"China",coordinates:[109.020002,32.679981],kind:"Major population centre in source estimates",population:11e5,minZoom:5},{name:"Huambo",country:"Angola",coordinates:[15.758064,-12.74804],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:11e5,minZoom:5},{name:"Ikare",country:"Nigeria",coordinates:[5.76,7.53043],kind:"Major population centre in source estimates",population:1099931,minZoom:5},{name:"Bhilai",country:"India",coordinates:[81.372213,21.211262],kind:"Major population centre in source estimates",population:1097e3,minZoom:5},{name:"Jinhua",country:"China",coordinates:[119.649999,29.120043],kind:"Major population centre in source estimates",population:1092852,minZoom:5},{name:"Chelyabinsk",country:"Russia",coordinates:[61.436722,55.156937],kind:"Major population centre in source estimates",population:1091e3,minZoom:5},{name:"Natal",country:"Brazil",coordinates:[-35.24195,-5.778077],kind:"Major population centre in source estimates",population:1088e3,minZoom:5},{name:"Mesa",country:"United States of America",coordinates:[-111.820967,33.414796],kind:"Major population centre in source estimates",population:1085394,minZoom:5},{name:"Changwon",country:"South Korea",coordinates:[128.583562,35.219102],kind:"Major population centre in source estimates",population:1081499,minZoom:5},{name:"Memphis",country:"United States of America",coordinates:[-90.028777,35.144701],kind:"Major population centre in source estimates",population:1081e3,minZoom:5},{name:"Zhuzhou",country:"China",coordinates:[113.148088,27.831938],kind:"Major population centre in source estimates",population:108e4,minZoom:5},{name:"Suwon",country:"South Korea",coordinates:[127.008947,37.259735],kind:"Major population centre in source estimates",population:1078e3,minZoom:5},{name:"Vereeniging",country:"South Africa",coordinates:[27.958042,-26.647656],kind:"Major population centre in source estimates",population:1074e3,minZoom:5},{name:"Xiangyang",country:"China",coordinates:[112.128098,32.021941],kind:"Major population centre in source estimates",population:1069e3,minZoom:5},{name:"Ulsan",country:"South Korea",coordinates:[129.315008,35.548677],kind:"Major population centre in source estimates",population:1061e3,minZoom:5},{name:"Zhucheng",country:"China",coordinates:[119.380093,35.989959],kind:"Major population centre in source estimates",population:106e4,minZoom:5},{name:"Edmonton",country:"Canada",coordinates:[-113.501928,53.551971],kind:"Major population centre in source estimates",population:1058e3,minZoom:5},{name:"Sholapur",country:"India",coordinates:[75.898062,17.672352],kind:"Major population centre in source estimates",population:1057e3,minZoom:5},{name:"Rostov",country:"Russia",coordinates:[39.71071,47.236594],kind:"Major population centre in source estimates",population:1052e3,minZoom:5},{name:"Dnipro",country:"Ukraine",coordinates:[34.998078,48.481918],kind:"Major population centre in source estimates",population:105e4,minZoom:5},{name:"Xining",country:"China",coordinates:[101.768059,36.621944],kind:"Major population centre in source estimates",population:1048e3,minZoom:5},{name:"Norfolk",country:"United States of America",coordinates:[-76.280006,36.849959],kind:"Major population centre in source estimates",population:1047869,minZoom:5},{name:"Zhangjiakou",country:"China",coordinates:[114.852027,40.805255],kind:"Major population centre in source estimates",population:1046e3,minZoom:5},{name:"Lille",country:"France",coordinates:[3.078062,50.651915],kind:"Major population centre in source estimates",population:1044e3,minZoom:5},{name:"Gaziantep",country:"Turkey",coordinates:[37.383048,37.07693],kind:"Major population centre in source estimates",population:1044e3,minZoom:5},{name:"Ranchi",country:"India",coordinates:[85.32808,23.371952],kind:"Major population centre in source estimates",population:1044e3,minZoom:5},{name:"S\xE3o Lu\xEDs",country:"Brazil",coordinates:[-44.267937,-2.514039],kind:"Major population centre in source estimates",population:1038e3,minZoom:5},{name:"Zhuhai",country:"China",coordinates:[113.565832,22.27889],kind:"Major population centre in source estimates",population:1023e3,minZoom:5},{name:"Florian\xF3polis",country:"Brazil",coordinates:[-48.521966,-27.578039],kind:"Major population centre in source estimates",population:1023e3,minZoom:5},{name:"Port Elizabeth",country:"South Africa",coordinates:[25.598083,-33.968088],kind:"Major population centre in source estimates",population:1021e3,minZoom:5},{name:"Port Harcourt",country:"Nigeria",coordinates:[7.008055,4.811948],kind:"Major population centre in source estimates",population:102e4,minZoom:5},{name:"Jiamusi",country:"China",coordinates:[130.348072,46.831967],kind:"Major population centre in source estimates",population:102e4,minZoom:5},{name:"Bridgeport",country:"United States of America",coordinates:[-73.201907,41.181925],kind:"Major population centre in source estimates",population:1018e3,minZoom:5},{name:"Ufa",country:"Russia",coordinates:[56.038085,54.791921],kind:"Major population centre in source estimates",population:1018e3,minZoom:5},{name:"Hengyang",country:"China",coordinates:[112.58807,26.881971],kind:"Major population centre in source estimates",population:1016e3,minZoom:5},{name:"Buffalo",country:"United States of America",coordinates:[-78.881948,42.881924],kind:"Major population centre in source estimates",population:1016e3,minZoom:5},{name:"Benxi",country:"China",coordinates:[123.748061,41.332329],kind:"Major population centre in source estimates",population:1012e3,minZoom:5},{name:"Haifa",country:"Israel",coordinates:[34.978079,32.822357],kind:"Major population centre in source estimates",population:1011e3,minZoom:5},{name:"Medina",country:"Saudi Arabia",coordinates:[39.578057,24.501935],kind:"Major population centre in source estimates",population:101e4,minZoom:5},{name:"Bucaramanga",country:"Colombia",coordinates:[-73.127829,7.132039],kind:"Major population centre in source estimates",population:1009e3,minZoom:5},{name:"Maracay",country:"Venezuela",coordinates:[-67.597753,10.248826],kind:"Major population centre in source estimates",population:1007e3,minZoom:5},{name:"Rotterdam",country:"Netherlands",coordinates:[4.478028,51.921915],kind:"Major population centre in source estimates",population:1005e3,minZoom:5},{name:"Homs",country:"Syria",coordinates:[36.718076,34.731905],kind:"Major population centre in source estimates",population:1005e3,minZoom:5},{name:"Cologne",country:"Germany",coordinates:[6.948059,50.93195],kind:"Major population centre in source estimates",population:1004e3,minZoom:5},{name:"Qinhuangdao",country:"China",coordinates:[119.618081,39.932311],kind:"Major population centre in source estimates",population:1003e3,minZoom:5},{name:"Fez",country:"Morocco",coordinates:[-5.002323,34.056545],kind:"Major population centre in source estimates",population:1002e3,minZoom:5},{name:"Yongzhou",country:"China",coordinates:[111.609135,26.41792],kind:"Major population centre in source estimates",population:1e6,minZoom:5},{name:"Cochabamba",country:"Bolivia",coordinates:[-66.169977,-17.410011],kind:"Major population centre in source estimates",population:1e6,minZoom:5},{name:"Da Nang",country:"Vietnam",coordinates:[108.249971,16.060039],kind:"Major population centre in source estimates",population:1e6,minZoom:5},{name:"Baoshan",country:"China",coordinates:[99.15001,25.119977],kind:"Major population centre in source estimates",population:1e6,minZoom:5},{name:"Aden",country:"Yemen",coordinates:[45.00949,12.779723],kind:"Major population centre in source estimates; One of the two largest mapped cities in this country",population:1e6,minZoom:5},{name:"Antwerpen",country:"Belgium",coordinates:[4.413071,51.222319],kind:"One of the two largest mapped cities in this country",population:92e4,minZoom:5},{name:"Az Zarqa",country:"Jordan",coordinates:[36.100008,32.069992],kind:"One of the two largest mapped cities in this country",population:894691,minZoom:5},{name:"Concepci\xF3n",country:"Chile",coordinates:[-73.050022,-36.830014],kind:"One of the two largest mapped cities in this country",population:889725,minZoom:5},{name:"Mombasa",country:"Kenya",coordinates:[39.687972,-4.03808],kind:"One of the two largest mapped cities in this country",population:882e3,minZoom:5},{name:"Callao",country:"Peru",coordinates:[-77.134967,-12.070027],kind:"One of the two largest mapped cities in this country",population:876877,minZoom:5},{name:"Thessaloniki",country:"Greece",coordinates:[22.883055,40.698052],kind:"One of the two largest mapped cities in this country",population:828e3,minZoom:5},{name:"Oran",country:"Algeria",coordinates:[-.621919,35.711948],kind:"One of the two largest mapped cities in this country",population:798e3,minZoom:5},{name:"Fargona",country:"Uzbekistan",coordinates:[71.780001,40.389975],kind:"One of the two largest mapped cities in this country",population:75e4,minZoom:5},{name:"Moshi",country:"Tanzania",coordinates:[37.339984,-3.339604],kind:"One of the two largest mapped cities in this country",population:721018,minZoom:5},{name:"Kandahar",country:"Afghanistan",coordinates:[65.694946,31.61002],kind:"One of the two largest mapped cities in this country",population:715542,minZoom:5},{name:"Bulawayo",country:"Zimbabwe",coordinates:[28.580002,-20.169998],kind:"One of the two largest mapped cities in this country",population:699385,minZoom:5},{name:"San Pedro Sula",country:"Honduras",coordinates:[-88.029986,15.500022],kind:"One of the two largest mapped cities in this country",population:680091,minZoom:5},{name:"Pointe-Noire",country:"Congo (Brazzaville)",coordinates:[11.880039,-4.770007],kind:"One of the two largest mapped cities in this country",population:659084,minZoom:5},{name:"Blantyre",country:"Malawi",coordinates:[34.989947,-15.790007],kind:"One of the two largest mapped cities in this country",population:584877,minZoom:5},{name:"Quetzaltenango",country:"Guatemala",coordinates:[-91.520006,14.829959],kind:"One of the two largest mapped cities in this country",population:575263,minZoom:5},{name:"Macau",country:"Macau S.A.R",coordinates:[113.544375,22.189135],kind:"One of the two largest mapped cities in this country",population:568700,minZoom:5},{name:"Bouak\xE9",country:"Ivory Coast",coordinates:[-5.030014,7.689982],kind:"One of the two largest mapped cities in this country",population:567481,minZoom:5},{name:"Santiago de Cuba",country:"Cuba",coordinates:[-75.821326,20.025017],kind:"One of the two largest mapped cities in this country",population:555865,minZoom:5},{name:"Matola",country:"Mozambique",coordinates:[32.460024,-25.969592],kind:"One of the two largest mapped cities in this country",population:543907,minZoom:5},{name:"G\xF6teborg",country:"Sweden",coordinates:[11.97863,57.709147],kind:"One of the two largest mapped cities in this country",population:537797,minZoom:5},{name:"\u1E6Car\u0101bulus",country:"Lebanon",coordinates:[35.831661,34.438267],kind:"One of the two largest mapped cities in this country",population:53e4,minZoom:5},{name:"Gaza City",country:"Palestine",coordinates:[34.445019,31.529999],kind:"One of the two largest mapped cities in this country",population:505700,minZoom:5},{name:"San Lorenzo",country:"Paraguay",coordinates:[-57.52004,-25.340018],kind:"One of the two largest mapped cities in this country",population:5e5,minZoom:5},{name:"Homyel",country:"Belarus",coordinates:[31.000009,52.430016],kind:"One of the two largest mapped cities in this country",population:480951,minZoom:5},{name:"Ostrava",country:"Czechia",coordinates:[18.249986,49.830355],kind:"One of the two largest mapped cities in this country",population:478963,minZoom:5},{name:"Nazret",country:"Ethiopia",coordinates:[39.269996,8.549981],kind:"One of the two largest mapped cities in this country",population:476892,minZoom:5},{name:"Shymkent",country:"Kazakhstan",coordinates:[69.595018,42.320012],kind:"One of the two largest mapped cities in this country",population:465392,minZoom:5},{name:"Sfax",country:"Tunisia",coordinates:[10.720007,34.750035],kind:"One of the two largest mapped cities in this country",population:453050,minZoom:5},{name:"Khujand",country:"Tajikistan",coordinates:[69.619926,40.289981],kind:"One of the two largest mapped cities in this country",population:437684,minZoom:5},{name:"Spanish Town",country:"Jamaica",coordinates:[-76.949991,17.983332],kind:"One of the two largest mapped cities in this country",population:432704,minZoom:5},{name:"Kitwe",country:"Zambia",coordinates:[28.220024,-12.810033],kind:"One of the two largest mapped cities in this country",population:404901,minZoom:5},{name:"Mbale",country:"Uganda",coordinates:[34.169997,1.09041],kind:"One of the two largest mapped cities in this country",population:402368,minZoom:5},{name:"Chiang Mai",country:"Thailand",coordinates:[98.980046,18.799975],kind:"One of the two largest mapped cities in this country",population:397211,minZoom:5},{name:"Osh",country:"Kyrgyzstan",coordinates:[72.790017,40.540405],kind:"One of the two largest mapped cities in this country",population:391277,minZoom:5},{name:"Alajuela",country:"Costa Rica",coordinates:[-84.230037,10.02002],kind:"One of the two largest mapped cities in this country",population:387743,minZoom:5},{name:"Kaunas",country:"Lithuania",coordinates:[23.880031,54.950404],kind:"One of the two largest mapped cities in this country",population:374643,minZoom:5},{name:"Bobo Dioulasso",country:"Burkina Faso",coordinates:[-4.289981,11.179975],kind:"One of the two largest mapped cities in this country",population:360106,minZoom:5},{name:"Linz",country:"Austria",coordinates:[14.288781,48.319233],kind:"One of the two largest mapped cities in this country",population:349161,minZoom:5},{name:"Plovdiv",country:"Bulgaria",coordinates:[24.753982,42.153976],kind:"One of the two largest mapped cities in this country",population:340494,minZoom:5},{name:"Lalitpur",country:"Nepal",coordinates:[85.333334,27.666618],kind:"One of the two largest mapped cities in this country",population:337785,minZoom:5},{name:"Ia\u0219i",country:"Romania",coordinates:[27.574947,47.168347],kind:"One of the two largest mapped cities in this country",population:325914,minZoom:5},{name:"Antsirabe",country:"Madagascar",coordinates:[47.033294,-19.850017],kind:"One of the two largest mapped cities in this country",population:307921,minZoom:5},{name:"Ganca",country:"Azerbaijan",coordinates:[46.350028,40.684996],kind:"One of the two largest mapped cities in this country",population:303268,minZoom:5},{name:"Curepipe",country:"Mauritius",coordinates:[57.516634,-20.31619],kind:"One of the two largest mapped cities in this country",population:299975,minZoom:5},{name:"Thi\xE8s",country:"Senegal",coordinates:[-16.930011,14.8104],kind:"One of the two largest mapped cities in this country",population:293001,minZoom:5},{name:"Mayag\xFCez",country:"Puerto Rico",coordinates:[-67.139711,18.20151],kind:"One of the two largest mapped cities in this country",population:291339,minZoom:5},{name:"Cap-Ha\xEFtien",country:"Haiti",coordinates:[-72.212516,19.759222],kind:"One of the two largest mapped cities in this country",population:281487,minZoom:5},{name:"Al Khalil",country:"Palestine",coordinates:[35.095573,31.540593],kind:"One of the two largest mapped cities in this country",population:280321,minZoom:5},{name:"Tampere",country:"Finland",coordinates:[23.750013,61.500005],kind:"One of the two largest mapped cities in this country",population:259279,minZoom:5},{name:"Mendefera",country:"Eritrea",coordinates:[38.816328,14.885976],kind:"One of the two largest mapped cities in this country",population:257390,minZoom:5},{name:"Ni\u0161",country:"Serbia",coordinates:[21.899996,43.330416],kind:"One of the two largest mapped cities in this country",population:25e4,minZoom:5},{name:"Jaffna",country:"Sri Lanka",coordinates:[80.005028,9.675002],kind:"One of the two largest mapped cities in this country",population:25e4,minZoom:5},{name:"Miskolc",country:"Hungary",coordinates:[20.780013,48.100409],kind:"One of the two largest mapped cities in this country",population:247757,minZoom:5},{name:"Berbera",country:"Somaliland",coordinates:[45.016415,10.43555],kind:"One of the two largest mapped cities in this country",population:242344,minZoom:5},{name:"Seeb",country:"Oman",coordinates:[58.182536,23.680246],kind:"One of the two largest mapped cities in this country",population:237816,minZoom:5},{name:"\xC5rhus",country:"Denmark",coordinates:[10.210684,56.157204],kind:"One of the two largest mapped cities in this country",population:237551,minZoom:5},{name:"Ko\u0161ice",country:"Slovakia",coordinates:[21.25001,48.730448],kind:"One of the two largest mapped cities in this country",population:236563,minZoom:5},{name:"Kismaayo",country:"Somalia",coordinates:[42.518324,-.356633],kind:"One of the two largest mapped cities in this country",population:234852,minZoom:5},{name:"T\xFCrkmenabat",country:"Turkmenistan",coordinates:[63.580036,39.110002],kind:"One of the two largest mapped cities in this country",population:234817,minZoom:5},{name:"Santa Ana",country:"El Salvador",coordinates:[-89.559764,13.99461],kind:"One of the two largest mapped cities in this country",population:234478,minZoom:5},{name:"Sikasso",country:"Mali",coordinates:[-5.68,11.320406],kind:"One of the two largest mapped cities in this country",population:225753,minZoom:5},{name:"Nyanza",country:"Rwanda",coordinates:[29.740035,-2.349587],kind:"One of the two largest mapped cities in this country",population:225209,minZoom:5},{name:"Banja Luka",country:"Bosnia and Herzegovina",coordinates:[17.179974,44.780405],kind:"One of the two largest mapped cities in this country",population:221738,minZoom:5},{name:"Gueckedou",country:"Guinea",coordinates:[-10.151001,8.553996],kind:"One of the two largest mapped cities in this country",population:221715,minZoom:5},{name:"Saint-Louis",country:"Mauritania",coordinates:[-16.510011,16.01999],kind:"One of the two largest mapped cities in this country",population:220792,minZoom:5},{name:"Split",country:"Croatia",coordinates:[16.469992,43.520404],kind:"One of the two largest mapped cities in this country",population:214741,minZoom:5},{name:"Bergen",country:"Norway",coordinates:[5.324522,60.391002],kind:"One of the two largest mapped cities in this country",population:213585,minZoom:5},{name:"Col\xF3n",country:"Panama",coordinates:[-79.87498,9.365021],kind:"One of the two largest mapped cities in this country",population:204e3,minZoom:5},{name:"Rivera",country:"Uruguay",coordinates:[-55.560004,-30.899575],kind:"One of the two largest mapped cities in this country",population:2e5,minZoom:5},{name:"Brikama",country:"The Gambia",coordinates:[-16.65995,13.280364],kind:"One of the two largest mapped cities in this country",population:195136,minZoom:5},{name:"Al Jahra",country:"Kuwait",coordinates:[47.658062,29.337471],kind:"One of the two largest mapped cities in this country",population:194193,minZoom:5},{name:"Bongor",country:"Chad",coordinates:[15.387164,10.285947],kind:"One of the two largest mapped cities in this country",population:193941,minZoom:5},{name:"Cork",country:"Ireland",coordinates:[-8.46511,51.892838],kind:"One of the two largest mapped cities in this country",population:188907,minZoom:5},{name:"Gibraltar",country:"Gibraltar",coordinates:[-5.346014,36.128342],kind:"One of the two largest mapped cities in this country",population:187083,minZoom:5},{name:"Yei",country:"South Sudan",coordinates:[30.680029,4.090382],kind:"One of the two largest mapped cities in this country",population:185e3,minZoom:5},{name:"Kutaisi",country:"Georgia",coordinates:[42.729991,42.249991],kind:"One of the two largest mapped cities in this country",population:183945,minZoom:5},{name:"Bo",country:"Sierra Leone",coordinates:[-11.740018,7.970016],kind:"One of the two largest mapped cities in this country",population:174354,minZoom:5},{name:"Bata",country:"Equatorial Guinea",coordinates:[9.769987,1.870001],kind:"One of the two largest mapped cities in this country",population:173046,minZoom:5},{name:"Prizren",country:"Kosovo",coordinates:[20.750092,42.22932],kind:"One of the two largest mapped cities in this country",population:171464,minZoom:5},{name:"San Fernando",country:"Trinidad and Tobago",coordinates:[-61.459377,10.280462],kind:"One of the two largest mapped cities in this country",population:166039,minZoom:5},{name:"Elbasan",country:"Albania",coordinates:[20.083828,41.121507],kind:"One of the two largest mapped cities in this country",population:165010,minZoom:5},{name:"Le\xF3n",country:"Nicaragua",coordinates:[-86.879436,12.435557],kind:"One of the two largest mapped cities in this country",population:164441,minZoom:5},{name:"Malakal",country:"South Sudan",coordinates:[31.65599,9.536897],kind:"One of the two largest mapped cities in this country",population:160765,minZoom:5},{name:"Tiraspol",country:"Moldova",coordinates:[29.639989,46.853095],kind:"One of the two largest mapped cities in this country",population:157e3,minZoom:5},{name:"Battambang",country:"Cambodia",coordinates:[103.200047,13.100013],kind:"One of the two largest mapped cities in this country",population:154773,minZoom:5},{name:"Lemosos",country:"Cyprus",coordinates:[33.033322,34.675414],kind:"One of the two largest mapped cities in this country",population:154e3,minZoom:5},{name:"Gyumri",country:"Armenia",coordinates:[43.847494,40.789434],kind:"One of the two largest mapped cities in this country",population:148381,minZoom:5},{name:"Willemstad",country:"Curacao",coordinates:[-68.872356,12.11229],kind:"One of the two largest mapped cities in this country",population:146813,minZoom:5},{name:"Papeete",country:"French Polynesia",coordinates:[-149.566669,-17.533363],kind:"One of the two largest mapped cities in this country",population:131695,minZoom:5},{name:"Lae",country:"Papua New Guinea",coordinates:[146.990035,-6.732988],kind:"One of the two largest mapped cities in this country",population:131052,minZoom:5},{name:"Agana",country:"Guam",coordinates:[144.750017,13.470016],kind:"One of the two largest mapped cities in this country",population:122411,minZoom:5},{name:"Tetovo",country:"North Macedonia",coordinates:[20.970079,42.00923],kind:"One of the two largest mapped cities in this country",population:119132,minZoom:5},{name:"Sokod\xE9",country:"Togo",coordinates:[1.149997,8.990471],kind:"One of the two largest mapped cities in this country",population:117811,minZoom:5},{name:"Port-Gentil",country:"Gabon",coordinates:[8.780022,-.720022],kind:"One of the two largest mapped cities in this country",population:116836,minZoom:5},{name:"Maribor",country:"Slovenia",coordinates:[15.650042,46.540478],kind:"One of the two largest mapped cities in this country",population:114228,minZoom:5},{name:"Daugavpils",country:"Latvia",coordinates:[26.509999,55.87996],kind:"One of the two largest mapped cities in this country",population:111564,minZoom:5},{name:"Manzini",country:"eSwatini",coordinates:[31.388005,-26.495001],kind:"One of the two largest mapped cities in this country",population:110537,minZoom:5},{name:"Louangphrabang",country:"Laos",coordinates:[102.14161,19.884534],kind:"One of the two largest mapped cities in this country",population:107142,minZoom:5},{name:"Tartu",country:"Estonia",coordinates:[26.709884,58.383941],kind:"One of the two largest mapped cities in this country",population:101092,minZoom:5}];var Cl=[{name:"Tokyo",country:"Japan",coordinates:[139.749462,35.686963],kind:"Admin-0 capital",population:35676e3},{name:"Mexico City",country:"Mexico",coordinates:[-99.132934,19.444388],kind:"Admin-0 capital",population:19028e3},{name:"Dhaka",country:"Bangladesh",coordinates:[90.406634,23.725006],kind:"Admin-0 capital",population:12797394},{name:"Buenos Aires",country:"Argentina",coordinates:[-58.432513,-34.610715],kind:"Admin-0 capital",population:12795e3},{name:"Cairo",country:"Egypt",coordinates:[31.248022,30.051906],kind:"Admin-0 capital",population:11893e3},{name:"Beijing",country:"China",coordinates:[116.394201,39.90172],kind:"Admin-0 capital",population:11106e3},{name:"Manila",country:"Philippines",coordinates:[120.980271,14.606105],kind:"Admin-0 capital",population:111e5},{name:"Moscow",country:"Russia",coordinates:[37.613577,55.75411],kind:"Admin-0 capital",population:10452e3},{name:"Paris",country:"France",coordinates:[2.352992,48.858092],kind:"Admin-0 capital",population:9904e3},{name:"Seoul",country:"South Korea",coordinates:[126.997785,37.568295],kind:"Admin-0 capital",population:9796e3},{name:"Jakarta",country:"Indonesia",coordinates:[106.827492,-6.172472],kind:"Admin-0 capital",population:9125e3},{name:"London",country:"United Kingdom",coordinates:[-.118668,51.501941],kind:"Admin-0 capital",population:8567e3},{name:"Lima",country:"Peru",coordinates:[-77.052008,-12.046067],kind:"Admin-0 capital",population:8012e3},{name:"Tehran",country:"Iran",coordinates:[51.422398,35.673889],kind:"Admin-0 capital",population:7873e3},{name:"Kinshasa",country:"Congo (Kinshasa)",coordinates:[15.313026,-4.327778],kind:"Admin-0 capital",population:7843e3},{name:"Bogota",country:"Colombia",coordinates:[-74.08529,4.598369],kind:"Admin-0 capital",population:7772e3},{name:"Taipei",country:"Taiwan",coordinates:[121.568333,25.035833],kind:"Admin-0 capital",population:6900273},{name:"Bangkok",country:"Thailand",coordinates:[100.514699,13.751945],kind:"Admin-0 capital",population:6704e3},{name:"Santiago",country:"Chile",coordinates:[-70.650504,-33.440205],kind:"Admin-0 capital",population:572e4},{name:"Madrid",country:"Spain",coordinates:[-3.685297,40.401972],kind:"Admin-0 capital",population:5567e3},{name:"Singapore",country:"Singapore",coordinates:[103.853875,1.294979],kind:"Admin-0 capital",population:5183700},{name:"Luanda",country:"Angola",coordinates:[13.232481,-8.83634],kind:"Admin-0 capital",population:5172900},{name:"Baghdad",country:"Iraq",coordinates:[44.391923,33.340594],kind:"Admin-0 capital",population:5054e3},{name:"Khartoum",country:"Sudan",coordinates:[32.532233,15.590024],kind:"Admin-0 capital",population:4754e3},{name:"Riyadh",country:"Saudi Arabia",coordinates:[46.720487,24.634497],kind:"Admin-0 capital",population:4465e3},{name:"Hanoi",country:"Vietnam",coordinates:[105.848068,21.035273],kind:"Admin-0 capital",population:4378e3},{name:"Washington,  D.C.",country:"United States of America",coordinates:[-77.011364,38.901495],kind:"Admin-0 capital",population:4338e3},{name:"Abidjan",country:"Ivory Coast",coordinates:[-4.020207,5.323126],kind:"Admin-0 capital",population:3802e3},{name:"Bras\xEDlia",country:"Brazil",coordinates:[-47.917998,-15.781394],kind:"Admin-0 capital",population:3716996},{name:"Ankara",country:"Turkey",coordinates:[32.862446,39.929184],kind:"Admin-0 capital",population:3716e3},{name:"Berlin",country:"Germany",coordinates:[13.399603,52.523764],kind:"Admin-0 capital",population:3406e3},{name:"Algiers",country:"Algeria",coordinates:[3.048607,36.765011],kind:"Admin-0 capital",population:3354e3},{name:"Rome",country:"Italy",coordinates:[12.481313,41.897902],kind:"Admin-0 capital",population:3339e3},{name:"Pyongyang",country:"North Korea",coordinates:[125.752745,39.021385],kind:"Admin-0 capital",population:33e5},{name:"Kabul",country:"Afghanistan",coordinates:[69.181314,34.518636],kind:"Admin-0 capital",population:3277e3},{name:"Athens",country:"Greece",coordinates:[23.731375,37.985272],kind:"Admin-0 capital",population:3242e3},{name:"Cape Town",country:"South Africa",coordinates:[18.433042,-33.918065],kind:"Admin-0 capital",population:3215e3},{name:"Tel Aviv",country:"Israel",coordinates:[34.768066,32.081937],kind:"Admin-0 capital alt",population:3112e3},{name:"Addis Ababa",country:"Ethiopia",coordinates:[38.698059,9.035256],kind:"Admin-0 capital",population:31e5},{name:"Nairobi",country:"Kenya",coordinates:[36.814711,-1.281401],kind:"Admin-0 capital",population:301e4},{name:"Caracas",country:"Venezuela",coordinates:[-66.918983,10.502944],kind:"Admin-0 capital",population:2985e3},{name:"Dar es Salaam",country:"Tanzania",coordinates:[39.266396,-6.798067],kind:"Admin-0 capital",population:293e4},{name:"Lisbon",country:"Portugal",coordinates:[-9.146812,38.724669],kind:"Admin-0 capital",population:2812e3},{name:"Kyiv",country:"Ukraine",coordinates:[30.514682,50.435313],kind:"Admin-0 capital",population:2709e3},{name:"Dakar",country:"Senegal",coordinates:[-17.475076,14.717778],kind:"Admin-0 capital",population:2604e3},{name:"Damascus",country:"Syria",coordinates:[36.29805,33.50198],kind:"Admin-0 capital",population:2466e3},{name:"Tunis",country:"Tunisia",coordinates:[10.179678,36.802778],kind:"Admin-0 capital",population:2412500},{name:"Vienna",country:"Austria",coordinates:[16.364693,48.201961],kind:"Admin-0 capital",population:24e5},{name:"Tripoli",country:"Libya",coordinates:[13.180012,32.8925],kind:"Admin-0 capital",population:2189e3},{name:"Tashkent",country:"Uzbekistan",coordinates:[69.268823,41.303828],kind:"Admin-0 capital",population:2184e3},{name:"Havana",country:"Cuba",coordinates:[-82.366128,23.133905],kind:"Admin-0 capital",population:2174e3},{name:"Santo Domingo",country:"Dominican Republic",coordinates:[-69.929742,18.470745],kind:"Admin-0 capital",population:2154e3},{name:"Baku",country:"Azerbaijan",coordinates:[49.860271,40.397218],kind:"Admin-0 capital",population:2122300},{name:"Accra",country:"Ghana",coordinates:[-.218662,5.55198],kind:"Admin-0 capital",population:2121e3},{name:"Kuwait City",country:"Kuwait",coordinates:[47.976355,29.371664],kind:"Admin-0 capital",population:2063e3},{name:"Sanaa",country:"Yemen",coordinates:[44.204648,15.356679],kind:"Admin-0 capital",population:2008e3},{name:"Port-au-Prince",country:"Haiti",coordinates:[-72.33798,18.54297],kind:"Admin-0 capital",population:1998e3},{name:"Bucharest",country:"Romania",coordinates:[26.098001,44.435318],kind:"Admin-0 capital",population:1942e3},{name:"Asunci\xF3n",country:"Paraguay",coordinates:[-57.625834,-25.290671],kind:"Admin-0 capital",population:187e4},{name:"Beirut",country:"Lebanon",coordinates:[35.507762,33.873921],kind:"Admin-0 capital",population:1846e3},{name:"Kyoto",country:"Japan",coordinates:[135.748052,35.031938],kind:"Admin-0 capital alt",population:1805e3},{name:"Minsk",country:"Belarus",coordinates:[27.564681,53.901923],kind:"Admin-0 capital",population:1805e3},{name:"Brussels",country:"Belgium",coordinates:[4.331371,50.835263],kind:"Admin-0 capital",population:1743e3},{name:"Warsaw",country:"Poland",coordinates:[21.005347,52.230872],kind:"Admin-0 capital",population:1707e3},{name:"Rabat",country:"Morocco",coordinates:[-6.836408,34.025307],kind:"Admin-0 capital",population:1705e3},{name:"Quito",country:"Ecuador",coordinates:[-78.501997,-.213042],kind:"Admin-0 capital",population:1701e3},{name:"Antananarivo",country:"Madagascar",coordinates:[47.514678,-18.914691],kind:"Admin-0 capital",population:1697e3},{name:"Budapest",country:"Hungary",coordinates:[19.081375,47.501952],kind:"Admin-0 capital",population:1679e3},{name:"Yaound\xE9",country:"Cameroon",coordinates:[11.514705,3.868647],kind:"Admin-0 capital",population:1611e3},{name:"La Paz",country:"Bolivia",coordinates:[-68.151931,-16.496028],kind:"Admin-0 capital",population:159e4},{name:"Abuja",country:"Nigeria",coordinates:[7.489505,9.05462],kind:"Admin-0 capital",population:1576e3},{name:"Harare",country:"Zimbabwe",coordinates:[31.042764,-17.815844],kind:"Admin-0 capital",population:1572e3},{name:"Montevideo",country:"Uruguay",coordinates:[-56.186823,-34.905376],kind:"Admin-0 capital",population:1513e3},{name:"Bamako",country:"Mali",coordinates:[-8.001985,12.65196],kind:"Admin-0 capital",population:1494e3},{name:"Conakry",country:"Guinea",coordinates:[-13.682181,9.533469],kind:"Admin-0 capital",population:1494e3},{name:"Phnom Penh",country:"Cambodia",coordinates:[104.914689,11.551976],kind:"Admin-0 capital",population:1466e3},{name:"Lom\xE9",country:"Togo",coordinates:[1.220811,6.133883],kind:"Admin-0 capital",population:1452e3},{name:"Doha",country:"Qatar",coordinates:[51.532968,25.286556],kind:"Admin-0 capital",population:145e4},{name:"Kuala Lumpur",country:"Malaysia",coordinates:[101.688699,3.139797],kind:"Admin-0 capital",population:1448e3},{name:"Maputo",country:"Mozambique",coordinates:[32.587217,-25.953332],kind:"Admin-0 capital",population:1446e3},{name:"San Salvador",country:"El Salvador",coordinates:[-89.215576,13.70328],kind:"Admin-0 capital",population:1433e3},{name:"Kampala",country:"Uganda",coordinates:[32.581378,.318605],kind:"Admin-0 capital",population:142e4},{name:"The Hague",country:"Netherlands",coordinates:[4.269961,52.080037],kind:"Admin-0 capital alt",population:1406e3},{name:"Brazzaville",country:"Congo (Brazzaville)",coordinates:[15.282744,-4.25724],kind:"Admin-0 capital",population:1355e3},{name:"Pretoria",country:"South Africa",coordinates:[28.227483,-25.704975],kind:"Admin-0 capital",population:1338e3},{name:"Lusaka",country:"Zambia",coordinates:[28.281382,-15.414698],kind:"Admin-0 capital",population:1328e3},{name:"San Jos\xE9",country:"Costa Rica",coordinates:[-84.078814,9.930371],kind:"Admin-0 capital",population:1284e3},{name:"Panama City",country:"Panama",coordinates:[-79.534983,8.969963],kind:"Admin-0 capital",population:1281e3},{name:"Stockholm",country:"Sweden",coordinates:[18.0663,59.324127],kind:"Admin-0 capital",population:1264e3},{name:"Sofia",country:"Bulgaria",coordinates:[23.314708,42.685295],kind:"Admin-0 capital",population:1185e3},{name:"Prague",country:"Czechia",coordinates:[14.422939,50.086967],kind:"Admin-0 capital",population:1162e3},{name:"Ouagadougou",country:"Burkina Faso",coordinates:[-1.52667,12.372262],kind:"Admin-0 capital",population:1149e3},{name:"Ottawa",country:"Canada",coordinates:[-75.701961,45.418643],kind:"Admin-0 capital",population:1145e3},{name:"Helsinki",country:"Finland",coordinates:[24.932457,60.163804],kind:"Admin-0 capital",population:1115e3},{name:"Yerevan",country:"Armenia",coordinates:[44.511606,40.183097],kind:"Admin-0 capital",population:1102e3},{name:"Mogadishu",country:"Somalia",coordinates:[45.364732,2.068627],kind:"Admin-0 capital",population:11e5},{name:"Tbilisi",country:"Georgia",coordinates:[44.78885,41.726956],kind:"Admin-0 capital",population:11e5},{name:"Belgrade",country:"Serbia",coordinates:[20.466045,44.820591],kind:"Admin-0 capital",population:1099e3},{name:"Dushanbe",country:"Tajikistan",coordinates:[68.773879,38.560035],kind:"Admin-0 capital",population:1086244},{name:"K\xF8benhavn",country:"Denmark",coordinates:[12.56154,55.68051],kind:"Admin-0 capital",population:1085e3},{name:"Amman",country:"Jordan",coordinates:[35.931354,31.951971],kind:"Admin-0 capital",population:106e4},{name:"Dublin",country:"Ireland",coordinates:[-6.25698,53.346731],kind:"Admin-0 capital",population:1059e3},{name:"Monrovia",country:"Liberia",coordinates:[-10.79966,6.314582],kind:"Admin-0 capital",population:1041e3},{name:"Amsterdam",country:"Netherlands",coordinates:[4.914694,52.351914],kind:"Admin-0 capital",population:1031e3},{name:"Jerusalem",country:"Israel",coordinates:[35.206626,31.778408],kind:"Admin-0 capital",population:1029300},{name:"Guatemala City",country:"Guatemala",coordinates:[-90.528911,14.623081],kind:"Admin-0 capital",population:1024e3},{name:"N'Djamena",country:"Chad",coordinates:[15.047202,12.115042],kind:"Admin-0 capital",population:989e3},{name:"Tegucigalpa",country:"Honduras",coordinates:[-87.219475,14.103991],kind:"Admin-0 capital",population:946e3},{name:"Kingston",country:"Jamaica",coordinates:[-76.767434,17.977077],kind:"Admin-0 capital",population:937700},{name:"Naypyidaw",country:"Myanmar",coordinates:[96.116673,19.768503],kind:"Admin-0 capital",population:93e4},{name:"Djibouti",country:"Djibouti",coordinates:[43.148002,11.595014],kind:"Admin-0 capital",population:923e3},{name:"Managua",country:"Nicaragua",coordinates:[-86.270437,12.154962],kind:"Admin-0 capital",population:92e4},{name:"Niamey",country:"Niger",coordinates:[2.11471,13.518652],kind:"Admin-0 capital",population:915e3},{name:"Tirana",country:"Albania",coordinates:[19.818883,41.327541],kind:"Admin-0 capital",population:895350},{name:"Kathmandu",country:"Nepal",coordinates:[85.314696,27.718638],kind:"Admin-0 capital",population:895e3},{name:"Ulaanbaatar",country:"Mongolia",coordinates:[106.91467,47.918619],kind:"Admin-0 capital",population:885e3},{name:"Kigali",country:"Rwanda",coordinates:[30.058586,-1.951644],kind:"Admin-0 capital",population:86e4},{name:"Valpara\xEDso",country:"Chile",coordinates:[-71.617026,-33.047739],kind:"Admin-0 capital alt",population:854e3},{name:"Bishkek",country:"Kyrgyzstan",coordinates:[74.583258,42.875025],kind:"Admin-0 capital",population:837e3},{name:"Oslo",country:"Norway",coordinates:[10.748033,59.918636],kind:"Admin-0 capital",population:835e3},{name:"Bangui",country:"Central African Republic",coordinates:[18.558288,4.366644],kind:"Admin-0 capital",population:831925},{name:"Freetown",country:"Sierra Leone",coordinates:[-13.236162,8.471957],kind:"Admin-0 capital",population:827e3},{name:"Islamabad",country:"Pakistan",coordinates:[73.08063,33.689368],kind:"Admin-0 capital",population:78e4},{name:"Cotonou",country:"Benin",coordinates:[2.404355,6.36298],kind:"Admin-0 capital",population:762e3},{name:"Vientiane",country:"Laos",coordinates:[102.59998,17.966693],kind:"Admin-0 capital",population:754e3},{name:"Riga",country:"Latvia",coordinates:[24.099965,56.950024],kind:"Admin-0 capital",population:742572},{name:"Nouakchott",country:"Mauritania",coordinates:[-15.97534,18.086427],kind:"Admin-0 capital",population:742144},{name:"Muscat",country:"Oman",coordinates:[58.378311,23.585179],kind:"Admin-0 capital",population:734697},{name:"Ashgabat",country:"Turkmenistan",coordinates:[58.383299,37.949995],kind:"Admin-0 capital",population:727700},{name:"Zagreb",country:"Croatia",coordinates:[15.999995,45.800007],kind:"Admin-0 capital",population:722526},{name:"Sarajevo",country:"Bosnia and Herzegovina",coordinates:[18.383002,43.850022],kind:"Admin-0 capital",population:696731},{name:"Chi\u0219in\u0103u",country:"Moldova",coordinates:[28.857711,47.005024],kind:"Admin-0 capital",population:688134},{name:"Lilongwe",country:"Malawi",coordinates:[33.783302,-13.983295],kind:"Admin-0 capital",population:646750},{name:"Asmara",country:"Eritrea",coordinates:[38.933324,15.333339],kind:"Admin-0 capital",population:620802},{name:"Abu Dhabi",country:"United Arab Emirates",coordinates:[54.366593,24.466684],kind:"Admin-0 capital",population:603492},{name:"Port Louis",country:"Mauritius",coordinates:[57.499994,-20.166639],kind:"Admin-0 capital",population:595491},{name:"Libreville",country:"Gabon",coordinates:[9.457965,.385389],kind:"Admin-0 capital",population:578156},{name:"Manama",country:"Bahrain",coordinates:[50.583052,26.236136],kind:"Admin-0 capital",population:563920},{name:"Vilnius",country:"Lithuania",coordinates:[25.316635,54.683366],kind:"Admin-0 capital",population:542366},{name:"Skopje",country:"North Macedonia",coordinates:[21.433461,42.000006],kind:"Admin-0 capital",population:494087},{name:"Hargeisa",country:"Somaliland",coordinates:[44.06531,9.560022],kind:"Admin-0 capital",population:477876},{name:"Pristina",country:"Kosovo",coordinates:[21.165984,42.66671],kind:"Admin-0 capital",population:465186},{name:"Bloemfontein",country:"South Africa",coordinates:[26.229913,-29.119994],kind:"Admin-0 capital",population:463064},{name:"Baguio",country:"Philippines",coordinates:[120.569943,16.429991],kind:"Admin-0 capital alt",population:447824},{name:"Bratislava",country:"Slovakia",coordinates:[17.116981,48.150018],kind:"Admin-0 capital",population:423737},{name:"Bissau",country:"Guinea Bissau",coordinates:[-15.598361,11.865024],kind:"Admin-0 capital",population:403339},{name:"Tallinn",country:"Estonia",coordinates:[24.728041,59.433877],kind:"Admin-0 capital",population:394024},{name:"Wellington",country:"New Zealand",coordinates:[174.777201,-41.292068],kind:"Admin-0 capital",population:393400},{name:"Valletta",country:"Malta",coordinates:[14.514711,35.899732],kind:"Admin-0 capital",population:368250},{name:"Maseru",country:"Lesotho",coordinates:[27.483273,-29.316674],kind:"Admin-0 capital",population:361324},{name:"Nur-Sultan",country:"Kazakhstan",coordinates:[71.427774,51.181125],kind:"Admin-0 capital",population:345604},{name:"Bujumbura",country:"Burundi",coordinates:[29.360006,-3.376087],kind:"Admin-0 capital",population:331700},{name:"Canberra",country:"Australia",coordinates:[149.129026,-35.283029],kind:"Admin-0 capital",population:327700},{name:"New Delhi",country:"India",coordinates:[77.19998,28.600023],kind:"Admin-0 capital",population:317797},{name:"Ljubljana",country:"Slovenia",coordinates:[14.514969,46.055288],kind:"Admin-0 capital",population:314807},{name:"Porto-Novo",country:"Benin",coordinates:[2.616626,6.483311],kind:"Admin-0 capital alt",population:3e5},{name:"Bandar Seri Begawan",country:"Brunei",coordinates:[114.933284,4.883331],kind:"Admin-0 capital",population:296500},{name:"Port-of-Spain",country:"Trinidad and Tobago",coordinates:[-61.517031,10.651997],kind:"Admin-0 capital",population:294934},{name:"Port Moresby",country:"Papua New Guinea",coordinates:[147.192504,-9.464708],kind:"Admin-0 capital",population:283733},{name:"Bern",country:"Switzerland",coordinates:[7.466976,46.916683],kind:"Admin-0 capital",population:275329},{name:"Windhoek",country:"Namibia",coordinates:[17.083546,-22.570006],kind:"Admin-0 capital",population:268132},{name:"Georgetown",country:"Guyana",coordinates:[-58.167029,6.801974],kind:"Admin-0 capital",population:264350},{name:"Paramaribo",country:"Suriname",coordinates:[-55.167031,5.83503],kind:"Admin-0 capital",population:254169},{name:"Dili",country:"East Timor",coordinates:[125.579456,-8.559388],kind:"Admin-0 capital",population:234331},{name:"Nassau",country:"The Bahamas",coordinates:[-77.350044,25.08339],kind:"Admin-0 capital",population:227940},{name:"Sucre",country:"Bolivia",coordinates:[-65.259516,-19.040971],kind:"Admin-0 capital",population:224838},{name:"Nicosia",country:"Cyprus",coordinates:[33.366635,35.166677],kind:"Admin-0 capital",population:224300},{name:"Dodoma",country:"Tanzania",coordinates:[35.750004,-6.183306],kind:"Admin-0 capital alt",population:218269},{name:"Colombo",country:"Sri Lanka",coordinates:[79.857751,6.931966],kind:"Admin-0 capital",population:217e3},{name:"Gaborone",country:"Botswana",coordinates:[25.911948,-24.646314],kind:"Admin-0 capital",population:208411},{name:"Yamoussoukro",country:"Ivory Coast",coordinates:[-5.275503,6.818381],kind:"Admin-0 capital",population:206499},{name:"Bridgetown",country:"Barbados",coordinates:[-59.616527,13.102003],kind:"Admin-0 capital",population:191152},{name:"Laayoune",country:"Morocco",coordinates:[-13.200006,27.149982],kind:"Admin-0 capital alt",population:188084},{name:"Suva",country:"Fiji",coordinates:[178.441707,-18.133016],kind:"Admin-0 capital",population:175399},{name:"Reykjav\xEDk",country:"Iceland",coordinates:[-21.936546,64.143459],kind:"Admin-0 capital",population:166212},{name:"Malabo",country:"Equatorial Guinea",coordinates:[8.783278,3.750015],kind:"Admin-0 capital",population:155963},{name:"Podgorica",country:"Montenegro",coordinates:[19.266307,42.465972],kind:"Admin-0 capital",population:145850},{name:"Moroni",country:"Comoros",coordinates:[43.240244,-11.704158],kind:"Admin-0 capital",population:128698},{name:"Sri Jayawardenepura Kotte",country:"Sri Lanka",coordinates:[79.949993,6.900004],kind:"Admin-0 capital alt",population:115826},{name:"Praia",country:"Cape Verde",coordinates:[-23.516689,14.916698],kind:"Admin-0 capital",population:113364},{name:"Mal\xE9",country:"Maldives",coordinates:[73.508901,4.172037],kind:"Admin-0 capital",population:112927},{name:"Luxembourg",country:"Luxembourg",coordinates:[6.130003,49.61166],kind:"Admin-0 capital",population:107260},{name:"Thimphu",country:"Bhutan",coordinates:[89.639014,27.472986],kind:"Admin-0 capital",population:98676},{name:"Mbabane",country:"eSwatini",coordinates:[31.133335,-26.316651],kind:"Admin-0 capital",population:90138},{name:"S\xE3o Tom\xE9",country:"Sao Tome and Principe",coordinates:[6.72965,.337466],kind:"Admin-0 capital",population:88219},{name:"Honiara",country:"Solomon Islands",coordinates:[159.949766,-9.437994],kind:"Admin-0 capital",population:76328},{name:"Putrajaya",country:"Malaysia",coordinates:[101.695037,2.932515],kind:"Admin-0 capital alt",population:67964},{name:"Apia",country:"Samoa",coordinates:[-171.768599,-13.835715],kind:"Admin-0 capital",population:61916},{name:"Andorra",country:"Andorra",coordinates:[1.526594,42.510753],kind:"Admin-0 capital",population:53998},{name:"Hamilton",country:"Bermuda",coordinates:[-64.783937,32.29419],kind:"Admin-0 region capital",population:52320},{name:"Kingstown",country:"Saint Vincent and the Grenadines",coordinates:[-61.220236,13.155756],kind:"Admin-0 capital",population:49485},{name:"Port Vila",country:"Vanuatu",coordinates:[168.316641,-17.73335],kind:"Admin-0 capital",population:44040},{name:"Banjul",country:"The Gambia",coordinates:[-16.591701,13.453876],kind:"Admin-0 capital",population:43094},{name:"Nuku'alofa",country:"Tonga",coordinates:[-175.220564,-21.138512],kind:"Admin-0 capital",population:42620},{name:"Castries",country:"Saint Lucia",coordinates:[-60.992875,14.007875],kind:"Admin-0 capital",population:37963},{name:"Monaco",country:"Monaco",coordinates:[7.406913,43.739646],kind:"Admin-0 capital",population:36371},{name:"Vaduz",country:"Liechtenstein",coordinates:[9.51667,47.133724],kind:"Admin-0 capital",population:36281},{name:"Saint John's",country:"Antigua and Barbuda",coordinates:[-61.850034,17.118036],kind:"Admin-0 capital",population:35499},{name:"Saint George's",country:"Grenada",coordinates:[-61.741643,12.052633],kind:"Admin-0 capital",population:33734},{name:"Victoria",country:"Seychelles",coordinates:[55.44999,-4.616632],kind:"Admin-0 capital",population:33576},{name:"San Marino",country:"San Marino",coordinates:[12.44177,43.936096],kind:"Admin-0 capital",population:29579},{name:"Tarawa",country:"Kiribati",coordinates:[173.017571,1.338188],kind:"Admin-0 capital",population:28802},{name:"Majuro",country:"Marshall Islands",coordinates:[171.38,7.103004],kind:"Admin-0 capital",population:25400},{name:"Roseau",country:"Dominica",coordinates:[-61.387013,15.301016],kind:"Admin-0 capital",population:23336},{name:"Basseterre",country:"Saint Kitts and Nevis",coordinates:[-62.717009,17.302031],kind:"Admin-0 capital",population:21887},{name:"Belmopan",country:"Belize",coordinates:[-88.767073,17.252033],kind:"Admin-0 capital",population:15220},{name:"Lobamba",country:"eSwatini",coordinates:[31.199997,-26.466667],kind:"Admin-0 capital alt",population:9782},{name:"Melekeok",country:"Palau",coordinates:[134.626549,7.487396],kind:"Admin-0 capital",population:7026},{name:"Funafuti",country:"Tuvalu",coordinates:[179.216647,-8.516652],kind:"Admin-0 capital",population:4749},{name:"Palikir",country:"Federated States of Micronesia",coordinates:[158.149974,6.916644],kind:"Admin-0 capital",population:4645},{name:"Vatican City",country:"Vatican",coordinates:[12.453387,41.903282],kind:"Admin-0 capital",population:832},{name:"Bir Lehlou",country:"Western Sahara",coordinates:[-9.652522,26.119167],kind:"Admin-0 capital alt",population:500}];function nd(n){let t=1,e=0,i=0,r=null,o=!1,s=0,a={scale:1,x:0,y:0},c=[],l=[],u=[],h=[],d=[],p=document.createElement("div");p.className="map-zoom-controls",p.setAttribute("role","group"),p.setAttribute("aria-label","Map navigation"),p.innerHTML='<button type="button" aria-label="Zoom map in">+</button><button type="button" aria-label="Zoom map out">\u2212</button><button type="button" aria-label="Reset map view">Reset</button><output aria-live="polite">100%</output><span>Scroll to zoom \xB7 drag to pan \xB7 zoom closer for countries, capitals & major cities</span>';let f=document.createElement("p");f.className="map-capital-credit",f.innerHTML='Gold: capitals / alternate seats &middot; Teal: major cities. <a href="https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/" target="_blank" rel="noopener noreferrer">Natural Earth</a> geographic reference. Cities selected by source world-city designation, population or national size rank; not a power ranking.',f.style.cssText="font-size:11px;color:#b4ba9c;padding:0 20px",n.after(f),n.before(p),n.setAttribute("tabindex","0");function x(){let _=Math.max(.1,n.getBoundingClientRect().width/900)*a.scale,E=[];for(let A of l)A.dataset.baseRadius||(A.dataset.baseRadius=A.getAttribute("r")),A.setAttribute("r",+A.dataset.baseRadius/a.scale),A.style.vectorEffect="non-scaling-stroke",A.style.pointerEvents="none";for(let A of d)A.setAttribute("transform",`translate(${A.dataset.x},${A.dataset.y}) scale(${1/a.scale})`);for(let A of h)if(A.style.fontSize=`${12/_}px`,A.style.strokeWidth=`${3/_}px`,A.style.display!=="none"){let y=+A.getAttribute("x"),w=+A.getAttribute("y");E.push([y,w-12/_,y+(A.textContent.length*7+6)/_,w+4/_])}for(let A of u){let y=A.querySelector("text"),w=+y.getAttribute("x"),N=+y.getAttribute("y"),C=(y.childNodes[0].textContent.length*6+12)/_,R=[w,N-10/_,w+C,N+5/_],O=a.scale>=Number(A.dataset.minZoom||2.5)&&w>=a.x&&w<=a.x+900/a.scale&&N>=a.y&&N<=a.y+490/a.scale&&!E.some(z=>R[0]<z[2]&&R[2]>z[0]&&R[1]<z[3]&&R[3]>z[1]);A.style.display=O?"":"none",A.style.pointerEvents="none",y.style.fontSize=`${11/_}px`,y.style.strokeWidth=`${3/_}px`,y.setAttribute("dx",5/_),y.setAttribute("dy",3/_),O&&E.push(R)}for(let A of c){let y=+A.getAttribute("x"),w=+A.getAttribute("y"),N=(A.textContent.length*6+8)/_,C=[y-N/2,w-11/_,y+N/2,w+4/_];A.style.fontSize=`${11/_}px`,A.style.strokeWidth=`${2.5/_}px`;let R=y>=a.x&&y<=a.x+900/a.scale&&w>=a.y&&w<=a.y+490/a.scale&&!E.some(O=>C[0]<O[2]&&C[2]>O[0]&&C[1]<O[3]&&C[3]>O[1]);A.style.display=R?"":"none",R&&E.push(C)}}function m(){s=0;let _=r||matchMedia("(prefers-reduced-motion:reduce)").matches?1:.3;a.scale+=(t-a.scale)*_,a.x+=(e-a.x)*_,a.y+=(i-a.y)*_;let E=Math.abs(t-a.scale)<.001&&Math.abs(e-a.x)<.02&&Math.abs(i-a.y)<.02;E&&(a={scale:t,x:e,y:i}),n.setAttribute("viewBox",`${a.x} ${a.y} ${900/a.scale} ${490/a.scale}`),n.dataset.zoom=a.scale.toFixed(2),x(),E||(s=requestAnimationFrame(m))}function g(){let _=900/t,E=490/t;e=Math.max(0,Math.min(900-_,e)),i=Math.max(0,Math.min(490-E,i)),s||(s=requestAnimationFrame(m)),p.querySelector("output").textContent=`${Math.round(t*100)}%`,p.children[0].disabled=t>=12,p.children[1].disabled=t<=1}function M(_,E=.5,A=.5){let y=t;t=Math.max(1,Math.min(12,t*_)),e+=E*(900/y-900/t),i+=A*(490/y-490/t),g()}p.children[0].addEventListener("click",()=>M(1.35)),p.children[1].addEventListener("click",()=>M(1/1.35)),p.children[2].addEventListener("click",()=>{t=1,e=i=0,g()}),n.addEventListener("wheel",_=>{_.preventDefault();let E=n.getBoundingClientRect();M(Math.exp(-Math.max(-160,Math.min(160,_.deltaY*(_.deltaMode===1?16:1)))*.002),(_.clientX-E.left)/E.width,(_.clientY-E.top)/E.height)},{passive:!1}),n.addEventListener("dblclick",_=>{_.preventDefault();let E=n.getBoundingClientRect();M(1.6,(_.clientX-E.left)/E.width,(_.clientY-E.top)/E.height)}),n.addEventListener("pointerdown",_=>{_.button!==0||r||(o=!1,t=a.scale,e=a.x,i=a.y,r={id:_.pointerId,startX:_.clientX,startY:_.clientY,x:e,y:i})}),n.addEventListener("pointermove",_=>{if(!r||_.pointerId!==r.id)return;let E=_.clientX-r.startX,A=_.clientY-r.startY;if(Math.abs(E)+Math.abs(A)>5&&t>1){o=!0,n.setPointerCapture(_.pointerId);let y=n.getBoundingClientRect();e=r.x-E/y.width*900/t,i=r.y-A/y.height*490/t,g()}});function S(_){!r||_.pointerId!==r.id||(r&&n.hasPointerCapture(_.pointerId)&&n.releasePointerCapture(_.pointerId),r=null)}n.addEventListener("pointerup",S),n.addEventListener("pointercancel",S),n.addEventListener("pointerleave",()=>{o||(r=null)}),n.addEventListener("click",_=>{o&&(_.preventDefault(),_.stopImmediatePropagation(),o=!1)},!0),n.addEventListener("mapcontentchange",()=>{c=[...n.querySelectorAll(".country-name")],l=[...n.querySelectorAll("circle")],u=[...n.querySelectorAll(".capital-marker")],h=[...n.querySelectorAll(".map-label")],d=[...n.querySelectorAll(".base-marker")],x()}),n.addEventListener("maplabelchange",x),new ResizeObserver(x).observe(n),n.addEventListener("keydown",_=>{(_.key==="+"||_.key==="=")&&(_.preventDefault(),M(1.35)),_.key==="-"&&(_.preventDefault(),M(1/1.35)),_.key==="0"&&(t=1,e=i=0,g())}),g()}var id={"AE-3007":{src:"/static/equipment/cc61124eaa64.jpg",alt:"AE 3007 installed engine",credit:"YSSYguy at English Wikipedia \xB7 CC BY-SA 3.0",url:"https://commons.wikimedia.org/wiki/File:AE_3007engine1.JPG",license:"https://creativecommons.org/licenses/by-sa/3.0",caption:"AE 3007 installed engine",title:"File:AE 3007engine1.JPG",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"AGM-114 Hellfire-2":{src:"/static/equipment/9f7b5d53440a.jpg",alt:"AGM-114 family photograph; exact variant unconfirmed",credit:"TSGT Scott Reed, U.S. Air Force \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:AGM-114_Hellfire_hung_on_a_Predator_drone.JPEG",license:"https://commons.wikimedia.org/wiki/File:AGM-114_Hellfire_hung_on_a_Predator_drone.JPEG",caption:"AGM-114 family photograph; exact variant unconfirmed",title:"File:AGM-114 Hellfire hung on a Predator drone.JPEG",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"AGM-114L Hellfire":{src:"/static/equipment/002bedd3e41b.png",alt:"AGM-114L launch photograph",credit:"Anonymous United States Navy photographer \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:USS_Detroit_(LCS-7)_fires_AGM-114L_Longbow_Hellfire_missile.png",license:"https://commons.wikimedia.org/wiki/File:USS_Detroit_(LCS-7)_fires_AGM-114L_Longbow_Hellfire_missile.png",caption:"AGM-114L launch photograph",title:"File:USS Detroit (LCS-7) fires AGM-114L Longbow Hellfire missile.png",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"AH-64E Apache":{src:"/static/equipment/36e604378ebe.jpg",alt:"Indian Air Force AH-64E",credit:"Shanze1 \xB7 CC BY-SA 4.0",url:"https://commons.wikimedia.org/wiki/File:IAF_AH-64E_Apache_in_Aero_India_2023.jpg",license:"https://creativecommons.org/licenses/by-sa/4.0",caption:"Indian Air Force AH-64E",title:"File:IAF AH-64E Apache in Aero India 2023.jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"APG-78 Longbow":{src:"/static/equipment/2dcd6942c666.jpg",alt:"APG-78 radar on Japanese AH-64D",credit:"Hunini \xB7 CC BY-SA 3.0",url:"https://commons.wikimedia.org/wiki/File:JGSDF_AH-64D%EF%BC%8874506%EF%BC%89_APG-78_Longbow_millimeter-wave_fire-control_radar.JPG",license:"https://creativecommons.org/licenses/by-sa/3.0",caption:"APG-78 radar on Japanese AH-64D",title:"File:JGSDF AH-64D\uFF0874506\uFF09 APG-78 Longbow millimeter-wave fire-control radar.JPG",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},APKWS:{src:"/static/equipment/apkws.jpg",alt:"Sourced APKWS equipment illustration",credit:"Vslv \xB7 CC BY-SA 4.0",url:"https://commons.wikimedia.org/wiki/File:APKWS.jpg",license:"https://creativecommons.org/licenses/by-sa/4.0",caption:"Sourced APKWS illustration (not a photograph)",title:"File:2023-05-12 APKWS 001.jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"C-130J Hercules":{src:"/static/equipment/3a4825237ad6.jpg",alt:"Indian Air Force C-130J",credit:"Indian Air Force \xB7 GODL-India",url:"https://commons.wikimedia.org/wiki/File:Indian_Air_Force_Lockheed_C-130J_Hercules.jpg",license:"https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf",caption:"Indian Air Force C-130J",title:"File:Indian Air Force Lockheed C-130J Hercules.jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"C-17":{src:"/static/equipment/0600c220d023.jpg",alt:"C-17 aircraft; US operator",credit:"Balon Greyjoy \xB7 CC0",url:"https://commons.wikimedia.org/wiki/File:20190327_C-17_Globemaster_Tail_10-0218_Kadena_AB-37.jpg",license:"http://creativecommons.org/publicdomain/zero/1.0/deed.en",caption:"C-17 aircraft; US operator",title:"File:20190327 C-17 Globemaster Tail 10-0218 Kadena AB-37.jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"CH-47F":{src:"/static/equipment/1143286a000f.jpg",alt:"CH-47 family photograph; exact variant unconfirmed",credit:"Elena Baladelli (according to Exif data) \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:An_Army_CH-47_Chinook_helicopter_during_a_training_exercise_(210120-A-II094-096M).jpg",license:"https://commons.wikimedia.org/wiki/File:An_Army_CH-47_Chinook_helicopter_during_a_training_exercise_(210120-A-II094-096M).jpg",caption:"CH-47 family photograph; exact variant unconfirmed",title:"File:An Army CH-47 Chinook helicopter during a training exercise (210120-A-II094-096M).jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},Excalibur:{src:"/static/equipment/00edbd472e06.jpg",alt:"Inert XM982 display round",credit:"United States Army \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:XM982_Excalibur_inert_(cropped).jpg",license:"https://commons.wikimedia.org/wiki/File:XM982_Excalibur_inert_(cropped).jpg",caption:"Inert XM982 display round",title:"File:XM982 Excalibur inert (cropped).jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"F-404 (8000)":{src:"/static/equipment/9aa0eb0902e2.jpg",alt:"F404-GE-400 engine photograph",credit:"U.S. Navy photo by Mass Communication Specialist 3rd Class John Phillip Wagner Jr. \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:US_Navy_091014-N-3038W-676_The_aviation_intermediate_maintenance_department_jet_shop_performs_a_jet_engine_test_cell_on_a_F404-GE-400_jet_engine_for_a_F-A-18C.jpg",license:"https://commons.wikimedia.org/wiki/File:US_Navy_091014-N-3038W-676_The_aviation_intermediate_maintenance_department_jet_shop_performs_a_jet_engine_test_cell_on_a_F404-GE-400_jet_engine_for_a_F-A-18C.jpg",caption:"F404-GE-400 engine photograph",title:"File:US Navy 091014-N-3038W-676 The aviation intermediate maintenance department jet shop performs a jet engine test cell on a F404-GE-400 jet engine for a F-A-18C.jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"Harpoon Block-2":{src:"/static/equipment/13e1eba87051.jpg",alt:"Harpoon family launcher; exact variant unconfirmed",credit:"Sengoku2501 \xB7 CC BY-SA 4.0",url:"https://commons.wikimedia.org/wiki/File:Harpoon_anti-ship_missile_mounted_on_F803_Zr._Ms._Tromp.jpg",license:"https://creativecommons.org/licenses/by-sa/4.0",caption:"Harpoon family launcher; exact variant unconfirmed",title:"File:Harpoon anti-ship missile mounted on F803 Zr. Ms. Tromp.jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"JDAM-ER":{src:"/static/equipment/66c2d0d6fe00.jpg",alt:"JDAM-ER carried by Ukrainian Su-27",credit:"Ukrainian Air Force \xB7 CC BY 4.0",url:"https://commons.wikimedia.org/wiki/File:JDAM-ER_ukrainian_air_force_su-27.jpg",license:"https://creativecommons.org/licenses/by/4.0",caption:"JDAM-ER carried by Ukrainian Su-27",title:"File:JDAM-ER ukrainian air force su-27.jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"KC-135":{src:"/static/equipment/a71a63b1f88f.jpg",alt:"KC-135R aircraft",credit:"Bob Jones \xB7 CC BY-SA 2.0",url:"https://commons.wikimedia.org/wiki/File:KC-135R_landing_at_RAF_Mildenhall_-_141008.jpg",license:"https://creativecommons.org/licenses/by-sa/2.0",caption:"KC-135R aircraft",title:"File:KC-135R landing at RAF Mildenhall - 141008.jpg",retrieved:"2026-11-07",changes:"Thumbnail resized by Wikimedia; no additional edits"},"LM-2500 (30001-35000)":{src:"/static/equipment/73c89d8caae9.jpg",alt:"LM2500 family turbine; power variant unconfirmed",credit:"Europepress \xB7 CC0",url:"https://commons.wikimedia.org/wiki/File:Lm2500.jpg",license:"http://creativecommons.org/publicdomain/zero/1.0/deed.en",caption:"LM2500 family turbine; power variant unconfirmed",title:"File:Lm2500.jpg",retrieved:"2026-11-07",changes:"Wikimedia thumbnail; no additional editing"},"MH-60R Seahawk":{src:"/static/equipment/caab82e65900.jpg",alt:"MH-60R aircraft; US operator",credit:"U.S. Navy photo by Photographer's Mate 3rd Class Rebecca J. Moat \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:MH-60R_Seahawk.jpg",license:"https://commons.wikimedia.org/wiki/File:MH-60R_Seahawk.jpg",caption:"MH-60R aircraft; US operator",title:"File:MH-60R Seahawk.jpg",retrieved:"2026-11-07",changes:"Wikimedia thumbnail; no additional editing"},"MQ-9 UAV":{src:"/static/equipment/4b1a84f7d388.jpg",alt:"MQ-9 Reaper aircraft; US operator",credit:"U.S. Air Force Photo / Lt. Col. Leslie Pratt \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:MQ-9_Reaper_UAV.jpg",license:"https://commons.wikimedia.org/wiki/File:MQ-9_Reaper_UAV.jpg",caption:"MQ-9 Reaper aircraft; US operator",title:"File:MQ-9 Reaper UAV.jpg",retrieved:"2026-11-07",changes:"Wikimedia thumbnail; no additional editing"},"P-8A Poseidon":{src:"/static/equipment/b01d3032e018.jpg",alt:"P-8A aircraft; US operator",credit:"U.S. Navy photo by Mass Communication Specialist 2nd Class Eric A. Pastor \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:P-8A_Poseidon_of_VP-16_in_flight_in_2013.jpg",license:"https://commons.wikimedia.org/wiki/File:P-8A_Poseidon_of_VP-16_in_flight_in_2013.jpg",caption:"P-8A aircraft; US operator",title:"File:P-8A Poseidon of VP-16 in flight in 2013.jpg",retrieved:"2026-11-07",changes:"Wikimedia thumbnail; no additional editing"},"Mk-54 LWT":{src:"/static/equipment/05a960345bbb.jpg",alt:"Mark 54 torpedo photograph",credit:"U.S. Navy photo by Mass Communication Specialist Seaman Cory Rose \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:WTUS_PostWWII_mk54_pic.jpg",license:"https://commons.wikimedia.org/wiki/File:WTUS_PostWWII_mk54_pic.jpg",caption:"Mark 54 torpedo photograph",title:"File:WTUS PostWWII mk54 pic.jpg",retrieved:"2026-11-07",changes:"Wikimedia thumbnail; no additional editing"},Stinger:{src:"/static/equipment/stinger.jpg",alt:"FIM-92 Stinger photograph",caption:"FIM-92 Stinger",credit:"The U.S. Army \xB7 Public domain",url:"https://commons.wikimedia.org/wiki/File:Flickr_-_The_U.S._Army_-_FIM-92_Stinger_missile.jpg",license:"https://commons.wikimedia.org/wiki/File:Flickr_-_The_U.S._Army_-_FIM-92_Stinger_missile.jpg",retrieved:"2026-11-07",changes:"Wikimedia thumbnail; no additional editing"}};var Ui={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ki={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zd=0,hu=1,Gd=2;var es=1,$a=2,Zr=3,Oi=0,qe=1,Qn=2,cr=0,jr=1,du=2,pu=3,fu=4,Vd=5;var lr=100,Hd=101,Wd=102,Zd=103,jd=104,Xd=200,qd=201,$d=202,Yd=203,mu=204,gu=205,Jd=206,Kd=207,Qd=208,tp=209,ep=210,np=211,ip=212,rp=213,op=214,ha=0,da=1,pa=2,Lr=3,fa=4,ma=5,ga=6,ya=7,Ya=0,sp=1,ap=2,ti=0,yu=1,_u=2,xu=3,ns=4,vu=5,Mu=6,Su=7;var bu=300,ur=301,Xr=302,Ja=303,Ka=304,_a=1e3,$n=1001,xa=1002,We=1003,cp=1004;var is=1005;var rn=1006,Qa=1007;var gi=1008;var un=1009,wu=1010,Au=1011,qr=1012,tc=1013,Gn=1014,Pn=1015,Vn=1016,ec=1017,nc=1018,hr=1020,Eu=35902,Tu=35899,Cu=1021,Ru=1022,Hn=1023,di=1026,yi=1027,ic=1028,rc=1029,Fi=1030,oc=1031;var sc=1033,rs=33776,os=33777,ss=33778,as=33779,ac=35840,cc=35841,lc=35842,uc=35843,hc=36196,dc=37492,pc=37496,fc=37488,mc=37489,cs=37490,gc=37491,yc=37808,_c=37809,xc=37810,vc=37811,Mc=37812,Sc=37813,bc=37814,wc=37815,Ac=37816,Ec=37817,Tc=37818,Cc=37819,Rc=37820,Pc=37821,Ic=36492,Lc=36494,Nc=36495,Dc=36283,Uc=36284,ls=36285,kc=36286;var xo=2300,va=2301,la=2302,Ql=2303,tu=2400,eu=2401,nu=2402;var lp=3200;var us=0,up=1,_i="",gn="srgb",vo="srgb-linear",Mo="linear",de="srgb";var ua=7680;var hp=519,dp=512,pp=513,fp=514,Pu=515,mp=516,gp=517,Iu=518,Lu=519,yp=35044;var Nu="300 es",Tn=2e3,Nr=2001;function Um(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function km(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function So(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function _p(){let n=So("canvas");return n.style.display="block",n}var rd={},Dr=null;function Du(...n){let t="THREE."+n.shift();Dr?Dr("log",t,...n):console.log(t,...n)}function xp(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ft(...n){n=xp(n);let t="THREE."+n.shift();if(Dr)Dr("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function zt(...n){n=xp(n);let t="THREE."+n.shift();if(Dr)Dr("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function er(...n){let t=n.join(" ");t in rd||(rd[t]=!0,Ft(...n))}function vp(n,t,e){return new Promise(function(i,r){function o(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:i()}}setTimeout(o,e)})}var Mp={[ha]:ha,[pa]:ga,[fa]:fa,[Lr]:ma,[da]:da,[ga]:pa,[ya]:ya,[ma]:Lr},Bn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let r=i[t];if(r!==void 0){let o=r.indexOf(e);o!==-1&&r.splice(o,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let r=i.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,t);t.target=null}}},Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],od=1234567,mo=Math.PI/180,Ur=180/Math.PI;function dr(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]).toLowerCase()}function qt(n,t,e){return Math.max(t,Math.min(e,n))}function Uu(n,t){return(n%t+t)%t}function Om(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function Fm(n,t,e){return n!==t?(e-n)/(t-n):0}function go(n,t,e){return(1-e)*n+e*t}function Bm(n,t,e,i){return go(n,t,1-Math.exp(-e*i))}function zm(n,t=1){return t-Math.abs(Uu(n,t*2)-t)}function Gm(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Vm(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Hm(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Wm(n,t){return n+Math.random()*(t-n)}function Zm(n){return n*(.5-Math.random())}function jm(n){n!==void 0&&(od=n);let t=od+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xm(n){return n*mo}function qm(n){return n*Ur}function $m(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function Ym(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ku(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Jm(n,t,e,i,r){let o=Math.cos,s=Math.sin,a=o(e/2),c=s(e/2),l=o((t+i)/2),u=s((t+i)/2),h=o((t-i)/2),d=s((t-i)/2),p=o((i-t)/2),f=s((i-t)/2);switch(r){case"XYX":n.set(a*u,c*h,c*d,a*l);break;case"YZY":n.set(c*d,a*u,c*h,a*l);break;case"ZXZ":n.set(c*h,c*d,a*u,a*l);break;case"XZX":n.set(a*u,c*f,c*p,a*l);break;case"YXY":n.set(c*p,a*u,c*f,a*l);break;case"ZYZ":n.set(c*f,c*p,a*u,a*l);break;default:Ft("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ou(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Sp(n,t){if(t.constructor===Float32Array)return n;let e=Ou(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/e,-1)}function bp(n,t){if(t.constructor===Float32Array)return n;let e=Ou(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*e)}var hs={DEG2RAD:mo,RAD2DEG:Ur,generateUUID:dr,clamp:qt,euclideanModulo:Uu,mapLinear:Om,inverseLerp:Fm,lerp:go,damp:Bm,pingpong:zm,smoothstep:Gm,smootherstep:Vm,randInt:Hm,randFloat:Wm,randFloatSpread:Zm,seededRandom:jm,degToRad:Xm,radToDeg:qm,isPowerOfTwo:$m,ceilPowerOfTwo:Ym,floorPowerOfTwo:ku,setQuaternionFromProperEuler:Jm,normalize:bp,denormalize:Sp},rt=class{static{this.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),r=Math.sin(e),o=this.x-t.x,s=this.y-t.y;return this.x=o*i-s*r+t.x,this.y=o*r+s*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},_n=class{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,o,s,a){let c=i[r+0],l=i[r+1],u=i[r+2],h=i[r+3],d=o[s+0],p=o[s+1],f=o[s+2],x=o[s+3];if(h!==x||c!==d||l!==p||u!==f){let m=c*d+l*p+u*f+h*x;m<0&&(d=-d,p=-p,f=-f,x=-x,m=-m);let g=1-a;if(m<.9995){let M=Math.acos(m),S=Math.sin(M);g=Math.sin(g*M)/S,a=Math.sin(a*M)/S,c=c*g+d*a,l=l*g+p*a,u=u*g+f*a,h=h*g+x*a}else{c=c*g+d*a,l=l*g+p*a,u=u*g+f*a,h=h*g+x*a;let M=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=M,l*=M,u*=M,h*=M}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,o,s){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],h=o[s],d=o[s+1],p=o[s+2],f=o[s+3];return t[e]=a*f+u*h+c*p-l*d,t[e+1]=c*f+u*d+l*h-a*p,t[e+2]=l*f+u*p+a*d-c*h,t[e+3]=u*f-a*h-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,r=t._y,o=t._z,s=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),h=a(o/2),d=c(i/2),p=c(r/2),f=c(o/2);switch(s){case"XYZ":this._x=d*u*h+l*p*f,this._y=l*p*h-d*u*f,this._z=l*u*f+d*p*h,this._w=l*u*h-d*p*f;break;case"YXZ":this._x=d*u*h+l*p*f,this._y=l*p*h-d*u*f,this._z=l*u*f-d*p*h,this._w=l*u*h+d*p*f;break;case"ZXY":this._x=d*u*h-l*p*f,this._y=l*p*h+d*u*f,this._z=l*u*f+d*p*h,this._w=l*u*h-d*p*f;break;case"ZYX":this._x=d*u*h-l*p*f,this._y=l*p*h+d*u*f,this._z=l*u*f-d*p*h,this._w=l*u*h+d*p*f;break;case"YZX":this._x=d*u*h+l*p*f,this._y=l*p*h+d*u*f,this._z=l*u*f-d*p*h,this._w=l*u*h-d*p*f;break;case"XZY":this._x=d*u*h-l*p*f,this._y=l*p*h-d*u*f,this._z=l*u*f+d*p*h,this._w=l*u*h+d*p*f;break;default:Ft("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],r=e[4],o=e[8],s=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=i+a+h;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(o-l)*p,this._z=(s-r)*p}else if(i>a&&i>h){let p=2*Math.sqrt(1+i-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(o+l)/p}else if(a>h){let p=2*Math.sqrt(1+a-i-h);this._w=(o-l)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+h-i-a);this._w=(s-r)/p,this._x=(o+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,r=t._y,o=t._z,s=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+s*a+r*l-o*c,this._y=r*u+s*c+o*a-i*l,this._z=o*u+s*l+i*c-r*a,this._w=s*u-i*a-r*c-o*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,r=t._y,o=t._z,s=t._w,a=this.dot(t);a<0&&(i=-i,r=-r,o=-o,s=-s,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+r*e,this._z=this._z*c+o*e,this._w=this._w*c+s*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+r*e,this._z=this._z*c+o*e,this._w=this._w*c+s*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class{static{this.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,r=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*r,this.y=o[1]*e+o[4]*i+o[7]*r,this.z=o[2]*e+o[5]*i+o[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,o=t.elements,s=1/(o[3]*e+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*r+o[12])*s,this.y=(o[1]*e+o[5]*i+o[9]*r+o[13])*s,this.z=(o[2]*e+o[6]*i+o[10]*r+o[14])*s,this}applyQuaternion(t){let e=this.x,i=this.y,r=this.z,o=t.x,s=t.y,a=t.z,c=t.w,l=2*(s*r-a*i),u=2*(a*e-o*r),h=2*(o*i-s*e);return this.x=e+c*l+s*h-a*u,this.y=i+c*u+a*l-o*h,this.z=r+c*h+o*u-s*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,r=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r,this.y=o[1]*e+o[5]*i+o[9]*r,this.z=o[2]*e+o[6]*i+o[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,r=t.y,o=t.z,s=e.x,a=e.y,c=e.z;return this.x=r*c-o*a,this.y=o*s-i*c,this.z=i*a-r*s,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Rl.copy(this).projectOnVector(t),this.sub(Rl)}reflect(t){return this.sub(Rl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Rl=new k,sd=new _n,Ht=class{static{this.prototype.isMatrix3=!0}constructor(t,e,i,r,o,s,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,o,s,a,c,l)}set(t,e,i,r,o,s,a,c,l){let u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=o,u[5]=c,u[6]=i,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,o=this.elements,s=i[0],a=i[3],c=i[6],l=i[1],u=i[4],h=i[7],d=i[2],p=i[5],f=i[8],x=r[0],m=r[3],g=r[6],M=r[1],S=r[4],_=r[7],E=r[2],A=r[5],y=r[8];return o[0]=s*x+a*M+c*E,o[3]=s*m+a*S+c*A,o[6]=s*g+a*_+c*y,o[1]=l*x+u*M+h*E,o[4]=l*m+u*S+h*A,o[7]=l*g+u*_+h*y,o[2]=d*x+p*M+f*E,o[5]=d*m+p*S+f*A,o[8]=d*g+p*_+f*y,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],r=t[2],o=t[3],s=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*s*u-e*a*l-i*o*u+i*a*c+r*o*l-r*s*c}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],o=t[3],s=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*s-a*l,d=a*c-u*o,p=l*o-s*c,f=e*h+i*d+r*p;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/f;return t[0]=h*x,t[1]=(r*l-u*i)*x,t[2]=(a*i-r*s)*x,t[3]=d*x,t[4]=(u*e-r*c)*x,t[5]=(r*o-a*e)*x,t[6]=p*x,t[7]=(i*c-l*e)*x,t[8]=(s*e-i*o)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,o,s,a){let c=Math.cos(o),l=Math.sin(o);return this.set(i*c,i*l,-i*(c*s+l*a)+s+t,-r*l,r*c,-r*(-l*s+c*a)+a+e,0,0,1),this}scale(t,e){return er("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Pl.makeScale(t,e)),this}rotate(t){return er("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Pl.makeRotation(-t)),this}translate(t,e){return er("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Pl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Pl=new Ht,ad=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cd=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Km(){let n={enabled:!0,workingColorSpace:vo,spaces:{},convert:function(r,o,s){return this.enabled===!1||o===s||!o||!s||(this.spaces[o].transfer===de&&(r.r=hi(r.r),r.g=hi(r.g),r.b=hi(r.b)),this.spaces[o].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[o].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===de&&(r.r=Ir(r.r),r.g=Ir(r.g),r.b=Ir(r.b))),r},workingToColorSpace:function(r,o){return this.convert(r,this.workingColorSpace,o)},colorSpaceToWorking:function(r,o){return this.convert(r,o,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===_i?Mo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,o=this.workingColorSpace){return r.fromArray(this.spaces[o].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,o,s){return r.copy(this.spaces[s].fromXYZ).multiply(this.spaces[o].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[vo]:{primaries:t,whitePoint:i,transfer:Mo,toXYZ:ad,fromXYZ:cd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:gn},outputColorSpaceConfig:{drawingBufferColorSpace:gn}},[gn]:{primaries:t,whitePoint:i,transfer:de,toXYZ:ad,fromXYZ:cd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:gn}}}),n}var oe=Km();function hi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ir(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var yr,Ma=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{yr===void 0&&(yr=So("canvas")),yr.width=t.width,yr.height=t.height;let r=yr.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=yr}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=So("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let r=i.getImageData(0,0,t.width,t.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=hi(o[s]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(hi(e[i]/255)*255):e[i]=hi(e[i]);return{data:e,width:t.width,height:t.height}}else return Ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Qm=0,kr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=dr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push(Il(r[s].image)):o.push(Il(r[s]))}else o=Il(r);i.url=o}return e||(t.images[this.uuid]=i),i}};function Il(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ma.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ft("Texture: Unable to serialize Texture."),{})}var t0=0,Ll=new k,ln=class n extends Bn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=$n,r=$n,o=rn,s=gi,a=Hn,c=un,l=n.DEFAULT_ANISOTROPY,u=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=dr(),this.name="",this.source=new kr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=o,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ll).x}get height(){return this.source.getSize(Ll).y}get depth(){return this.source.getSize(Ll).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Ft(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){Ft(`Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _a:t.x=t.x-Math.floor(t.x);break;case $n:t.x=t.x<0?0:1;break;case xa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _a:t.y=t.y-Math.floor(t.y);break;case $n:t.y=t.y<0?0:1;break;case xa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=bu;ln.DEFAULT_ANISOTROPY=1;var Se=class{static{this.prototype.isVector4=!0}constructor(t=0,e=0,i=0,r=1){this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,o=this.w,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r+s[12]*o,this.y=s[1]*e+s[5]*i+s[9]*r+s[13]*o,this.z=s[2]*e+s[6]*i+s[10]*r+s[14]*o,this.w=s[3]*e+s[7]*i+s[11]*r+s[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,o,c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],p=c[5],f=c[9],x=c[2],m=c[6],g=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(f-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(f+m)<.1&&Math.abs(l+p+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(l+1)/2,_=(p+1)/2,E=(g+1)/2,A=(u+d)/4,y=(h+x)/4,w=(f+m)/4;return S>_&&S>E?S<.01?(i=0,r=.707106781,o=.707106781):(i=Math.sqrt(S),r=A/i,o=y/i):_>E?_<.01?(i=.707106781,r=0,o=.707106781):(r=Math.sqrt(_),i=A/r,o=w/r):E<.01?(i=.707106781,r=.707106781,o=0):(o=Math.sqrt(E),i=y/o,r=w/o),this.set(i,r,o,e),this}let M=Math.sqrt((m-f)*(m-f)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(m-f)/M,this.y=(h-x)/M,this.z=(d-u)/M,this.w=Math.acos((l+p+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Sa=class extends Bn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e),this.textures=[];let r=i.count;for(let o=0;o<r;o++)this.textures[o]=new ln({width:t,height:e,depth:i.depth}),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let r=Object.assign({},t.textures[e].image);this.textures[e].source=new kr(r)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},xn=class extends Sa{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},bo=class extends ln{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=We,this.minFilter=We,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ba=class extends ln{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=We,this.minFilter=We,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var fe=class n{static{this.prototype.isMatrix4=!0}constructor(t,e,i,r,o,s,a,c,l,u,h,d,p,f,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,o,s,a,c,l,u,h,d,p,f,x,m)}set(t,e,i,r,o,s,a,c,l,u,h,d,p,f,x,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=r,g[1]=o,g[5]=s,g[9]=a,g[13]=c,g[2]=l,g[6]=u,g[10]=h,g[14]=d,g[3]=p,g[7]=f,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,r=1/_r.setFromMatrixColumn(t,0).length(),o=1/_r.setFromMatrixColumn(t,1).length(),s=1/_r.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*s,e[9]=i[9]*s,e[10]=i[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,r=t.y,o=t.z,s=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(o),h=Math.sin(o);if(t.order==="XYZ"){let d=s*u,p=s*h,f=a*u,x=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=p+f*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=f+p*l,e[10]=s*c}else if(t.order==="YXZ"){let d=c*u,p=c*h,f=l*u,x=l*h;e[0]=d+x*a,e[4]=f*a-p,e[8]=s*l,e[1]=s*h,e[5]=s*u,e[9]=-a,e[2]=p*a-f,e[6]=x+d*a,e[10]=s*c}else if(t.order==="ZXY"){let d=c*u,p=c*h,f=l*u,x=l*h;e[0]=d-x*a,e[4]=-s*h,e[8]=f+p*a,e[1]=p+f*a,e[5]=s*u,e[9]=x-d*a,e[2]=-s*l,e[6]=a,e[10]=s*c}else if(t.order==="ZYX"){let d=s*u,p=s*h,f=a*u,x=a*h;e[0]=c*u,e[4]=f*l-p,e[8]=d*l+x,e[1]=c*h,e[5]=x*l+d,e[9]=p*l-f,e[2]=-l,e[6]=a*c,e[10]=s*c}else if(t.order==="YZX"){let d=s*c,p=s*l,f=a*c,x=a*l;e[0]=c*u,e[4]=x-d*h,e[8]=f*h+p,e[1]=h,e[5]=s*u,e[9]=-a*u,e[2]=-l*u,e[6]=p*h+f,e[10]=d-x*h}else if(t.order==="XZY"){let d=s*c,p=s*l,f=a*c,x=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+x,e[5]=s*u,e[9]=p*h-f,e[2]=f*h-p,e[6]=a*u,e[10]=x*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(e0,t,n0)}lookAt(t,e,i){let r=this.elements;return fn.subVectors(t,e),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),bi.crossVectors(i,fn),bi.lengthSq()===0&&(Math.abs(i.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),bi.crossVectors(i,fn)),bi.normalize(),Fs.crossVectors(fn,bi),r[0]=bi.x,r[4]=Fs.x,r[8]=fn.x,r[1]=bi.y,r[5]=Fs.y,r[9]=fn.y,r[2]=bi.z,r[6]=Fs.z,r[10]=fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,o=this.elements,s=i[0],a=i[4],c=i[8],l=i[12],u=i[1],h=i[5],d=i[9],p=i[13],f=i[2],x=i[6],m=i[10],g=i[14],M=i[3],S=i[7],_=i[11],E=i[15],A=r[0],y=r[4],w=r[8],N=r[12],C=r[1],R=r[5],O=r[9],z=r[13],P=r[2],I=r[6],F=r[10],B=r[14],et=r[3],W=r[7],J=r[11],K=r[15];return o[0]=s*A+a*C+c*P+l*et,o[4]=s*y+a*R+c*I+l*W,o[8]=s*w+a*O+c*F+l*J,o[12]=s*N+a*z+c*B+l*K,o[1]=u*A+h*C+d*P+p*et,o[5]=u*y+h*R+d*I+p*W,o[9]=u*w+h*O+d*F+p*J,o[13]=u*N+h*z+d*B+p*K,o[2]=f*A+x*C+m*P+g*et,o[6]=f*y+x*R+m*I+g*W,o[10]=f*w+x*O+m*F+g*J,o[14]=f*N+x*z+m*B+g*K,o[3]=M*A+S*C+_*P+E*et,o[7]=M*y+S*R+_*I+E*W,o[11]=M*w+S*O+_*F+E*J,o[15]=M*N+S*z+_*B+E*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],r=t[8],o=t[12],s=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],p=t[14],f=t[3],x=t[7],m=t[11],g=t[15],M=c*p-l*d,S=a*p-l*h,_=a*d-c*h,E=s*p-l*u,A=s*d-c*u,y=s*h-a*u;return e*(x*M-m*S+g*_)-i*(f*M-m*E+g*A)+r*(f*S-x*E+g*y)-o*(f*_-x*A+m*y)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],r=t[8],o=t[1],s=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(s*u-a*l)-i*(o*u-a*c)+r*(o*l-s*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],o=t[3],s=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],p=t[11],f=t[12],x=t[13],m=t[14],g=t[15],M=e*a-i*s,S=e*c-r*s,_=e*l-o*s,E=i*c-r*a,A=i*l-o*a,y=r*l-o*c,w=u*x-h*f,N=u*m-d*f,C=u*g-p*f,R=h*m-d*x,O=h*g-p*x,z=d*g-p*m,P=M*z-S*O+_*R+E*C-A*N+y*w;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/P;return t[0]=(a*z-c*O+l*R)*I,t[1]=(r*O-i*z-o*R)*I,t[2]=(x*y-m*A+g*E)*I,t[3]=(d*A-h*y-p*E)*I,t[4]=(c*C-s*z-l*N)*I,t[5]=(e*z-r*C+o*N)*I,t[6]=(m*_-f*y-g*S)*I,t[7]=(u*y-d*_+p*S)*I,t[8]=(s*O-a*C+l*w)*I,t[9]=(i*C-e*O-o*w)*I,t[10]=(f*A-x*_+g*M)*I,t[11]=(h*_-u*A-p*M)*I,t[12]=(a*N-s*R-c*w)*I,t[13]=(e*R-i*N+r*w)*I,t[14]=(x*S-f*E-m*M)*I,t[15]=(u*E-h*S+d*M)*I,this}scale(t){let e=this.elements,i=t.x,r=t.y,o=t.z;return e[0]*=i,e[4]*=r,e[8]*=o,e[1]*=i,e[5]*=r,e[9]*=o,e[2]*=i,e[6]*=r,e[10]*=o,e[3]*=i,e[7]*=r,e[11]*=o,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),r=Math.sin(e),o=1-i,s=t.x,a=t.y,c=t.z,l=o*s,u=o*a;return this.set(l*s+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*s,0,l*c-r*a,u*c+r*s,o*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,o,s){return this.set(1,i,o,0,t,1,s,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){let r=this.elements,o=e._x,s=e._y,a=e._z,c=e._w,l=o+o,u=s+s,h=a+a,d=o*l,p=o*u,f=o*h,x=s*u,m=s*h,g=a*h,M=c*l,S=c*u,_=c*h,E=i.x,A=i.y,y=i.z;return r[0]=(1-(x+g))*E,r[1]=(p+_)*E,r[2]=(f-S)*E,r[3]=0,r[4]=(p-_)*A,r[5]=(1-(d+g))*A,r[6]=(m+M)*A,r[7]=0,r[8]=(f+S)*y,r[9]=(m-M)*y,r[10]=(1-(d+x))*y,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){let r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];let o=this.determinantAffine();if(o===0)return i.set(1,1,1),e.identity(),this;let s=_r.set(r[0],r[1],r[2]).length(),a=_r.set(r[4],r[5],r[6]).length(),c=_r.set(r[8],r[9],r[10]).length();o<0&&(s=-s),Un.copy(this);let l=1/s,u=1/a,h=1/c;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=h,Un.elements[9]*=h,Un.elements[10]*=h,e.setFromRotationMatrix(Un),i.x=s,i.y=a,i.z=c,this}makePerspective(t,e,i,r,o,s,a=Tn,c=!1){let l=this.elements,u=2*o/(e-t),h=2*o/(i-r),d=(e+t)/(e-t),p=(i+r)/(i-r),f,x;if(c)f=o/(s-o),x=s*o/(s-o);else if(a===Tn)f=-(s+o)/(s-o),x=-2*s*o/(s-o);else if(a===Nr)f=-s/(s-o),x=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,o,s,a=Tn,c=!1){let l=this.elements,u=2/(e-t),h=2/(i-r),d=-(e+t)/(e-t),p=-(i+r)/(i-r),f,x;if(c)f=1/(s-o),x=s/(s-o);else if(a===Tn)f=-2/(s-o),x=-(s+o)/(s-o);else if(a===Nr)f=-1/(s-o),x=-o/(s-o);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=f,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},_r=new k,Un=new fe,e0=new k(0,0,0),n0=new k(1,1,1),bi=new k,Fs=new k,fn=new k,ld=new fe,ud=new _n,Yn=class n{constructor(t=0,e=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let r=t.elements,o=r[0],s=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],d=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,o),this._z=0);break;case"ZXY":this._x=Math.asin(qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,o)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-qt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ld.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ld,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ud.setFromEuler(this),this.setFromQuaternion(ud,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yn.DEFAULT_ORDER="XYZ";var wo=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},i0=0,hd=new k,xr=new _n,si=new fe,Bs=new k,so=new k,r0=new k,o0=new _n,dd=new k(1,0,0),pd=new k(0,1,0),fd=new k(0,0,1),md={type:"added"},s0={type:"removed"},vr={type:"childadded",child:null},Nl={type:"childremoved",child:null},Ne=class n extends Bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:i0++}),this.uuid=dr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new k,e=new Yn,i=new _n,r=new k(1,1,1);function o(){i.setFromEuler(e,!1)}function s(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new fe},normalMatrix:{value:new Ht}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return xr.setFromAxisAngle(t,e),this.quaternion.multiply(xr),this}rotateOnWorldAxis(t,e){return xr.setFromAxisAngle(t,e),this.quaternion.premultiply(xr),this}rotateX(t){return this.rotateOnAxis(dd,t)}rotateY(t){return this.rotateOnAxis(pd,t)}rotateZ(t){return this.rotateOnAxis(fd,t)}translateOnAxis(t,e){return hd.copy(t).applyQuaternion(this.quaternion),this.position.add(hd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(dd,t)}translateY(t){return this.translateOnAxis(pd,t)}translateZ(t){return this.translateOnAxis(fd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Bs.copy(t):Bs.set(t,e,i);let r=this.parent;this.updateWorldMatrix(!0,!1),so.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(so,Bs,this.up):si.lookAt(Bs,so,this.up),this.quaternion.setFromRotationMatrix(si),r&&(si.extractRotation(r.matrixWorld),xr.setFromRotationMatrix(si),this.quaternion.premultiply(xr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(zt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(md),vr.child=t,this.dispatchEvent(vr),vr.child=null):zt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(s0),Nl.child=t,this.dispatchEvent(Nl),Nl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),si.multiply(t.parent.matrixWorld)),t.applyMatrix4(si),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(md),vr.child=t,this.dispatchEvent(vr),vr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){let s=this.children[i].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,t,r0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,o0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,r=t.z,o=this.matrix.elements;o[12]+=e-o[0]*e-o[4]*i-o[8]*r,o[13]+=i-o[1]*e-o[5]*i-o[9]*r,o[14]+=r-o[2]*e-o[6]*i-o[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let o=this.children;for(let s=0,a=o.length;s<a;s++)o[s].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];o(t.shapes,h)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));r.material=a}else r.material=o(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(o(t.animations,c))}}if(e){let a=s(t.geometries),c=s(t.materials),l=s(t.textures),u=s(t.images),h=s(t.shapes),d=s(t.skeletons),p=s(t.animations),f=s(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),f.length>0&&(i.nodes=f)}return i.object=r,i;function s(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let r=t.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ne.DEFAULT_UP=new k(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Cn=class extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}},a0={type:"move"},Or=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,o=null,s=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){s=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),g=this._getHandJoint(l,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,f=.005;l.inputState.pinching&&d>p+f?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-f&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(a0)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Cn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},wp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},zs={h:0,s:0,l:0};function Dl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Vt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=gn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=oe.workingColorSpace){if(t=Uu(t,1),e=qt(e,0,1),i=qt(i,0,1),e===0)this.r=this.g=this.b=i;else{let o=i<=.5?i*(1+e):i+e-i*e,s=2*i-o;this.r=Dl(s,o,t+1/3),this.g=Dl(s,o,t),this.b=Dl(s,o,t-1/3)}return oe.colorSpaceToWorking(this,r),this}setStyle(t,e=gn){function i(o){o!==void 0&&parseFloat(o)<1&&Ft("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseFloat(o[1]))/100,Math.min(100,parseFloat(o[2]))/100,Math.min(100,parseFloat(o[3]))/100,e);break;case"hsl":case"hsla":if(o=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:Ft("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(o,16),e);Ft("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=gn){let i=wp[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ft("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hi(t.r),this.g=hi(t.g),this.b=hi(t.b),this}copyLinearToSRGB(t){return this.r=Ir(t.r),this.g=Ir(t.g),this.b=Ir(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=gn){return oe.workingToColorSpace(Ke.copy(this),t),Math.round(qt(Ke.r*255,0,255))*65536+Math.round(qt(Ke.g*255,0,255))*256+Math.round(qt(Ke.b*255,0,255))}getHexString(t=gn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(Ke.copy(this),e);let i=Ke.r,r=Ke.g,o=Ke.b,s=Math.max(i,r,o),a=Math.min(i,r,o),c,l,u=(a+s)/2;if(a===s)c=0,l=0;else{let h=s-a;switch(l=u<=.5?h/(s+a):h/(2-s-a),s){case i:c=(r-o)/h+(r<o?6:0);break;case r:c=(o-i)/h+2;break;case o:c=(i-r)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(Ke.copy(this),e),t.r=Ke.r,t.g=Ke.g,t.b=Ke.b,t}getStyle(t=gn){oe.workingToColorSpace(Ke.copy(this),t);let e=Ke.r,i=Ke.g,r=Ke.b;return t!==gn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(wi),this.setHSL(wi.h+t,wi.s+e,wi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(wi),t.getHSL(zs);let i=go(wi.h,zs.h,e),r=go(wi.s,zs.s,e),o=go(wi.l,zs.l,e);return this.setHSL(i,r,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,r=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*r,this.g=o[1]*e+o[4]*i+o[7]*r,this.b=o[2]*e+o[5]*i+o[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ke=new Vt;Vt.NAMES=wp;var nr=class extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},kn=new k,ai=new k,Ul=new k,ci=new k,Mr=new k,Sr=new k,gd=new k,kl=new k,Ol=new k,Fl=new k,Bl=new Se,zl=new Se,Gl=new Se,Ci=class n{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),kn.subVectors(t,e),r.cross(kn);let o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(t,e,i,r,o){kn.subVectors(r,e),ai.subVectors(i,e),Ul.subVectors(t,e);let s=kn.dot(kn),a=kn.dot(ai),c=kn.dot(Ul),l=ai.dot(ai),u=ai.dot(Ul),h=s*l-a*a;if(h===0)return o.set(0,0,0),null;let d=1/h,p=(l*c-a*u)*d,f=(s*u-a*c)*d;return o.set(1-p-f,f,p)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(t,e,i,r,o,s,a,c){return this.getBarycoord(t,e,i,r,ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,ci.x),c.addScaledVector(s,ci.y),c.addScaledVector(a,ci.z),c)}static getInterpolatedAttribute(t,e,i,r,o,s){return Bl.setScalar(0),zl.setScalar(0),Gl.setScalar(0),Bl.fromBufferAttribute(t,e),zl.fromBufferAttribute(t,i),Gl.fromBufferAttribute(t,r),s.setScalar(0),s.addScaledVector(Bl,o.x),s.addScaledVector(zl,o.y),s.addScaledVector(Gl,o.z),s}static isFrontFacing(t,e,i,r){return kn.subVectors(i,e),ai.subVectors(t,e),kn.cross(ai).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),kn.cross(ai).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,o){return n.getInterpolation(t,this.a,this.b,this.c,e,i,r,o)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,r=this.b,o=this.c,s,a;Mr.subVectors(r,i),Sr.subVectors(o,i),kl.subVectors(t,i);let c=Mr.dot(kl),l=Sr.dot(kl);if(c<=0&&l<=0)return e.copy(i);Ol.subVectors(t,r);let u=Mr.dot(Ol),h=Sr.dot(Ol);if(u>=0&&h<=u)return e.copy(r);let d=c*h-u*l;if(d<=0&&c>=0&&u<=0&&c-u>0)return s=c/(c-u),e.copy(i).addScaledVector(Mr,s);Fl.subVectors(t,o);let p=Mr.dot(Fl),f=Sr.dot(Fl);if(f>=0&&p<=f)return e.copy(o);let x=p*l-c*f;if(x<=0&&l>=0&&f<=0)return a=l/(l-f),e.copy(i).addScaledVector(Sr,a);let m=u*f-p*h;if(m<=0&&h-u>=0&&p-f>=0)return gd.subVectors(o,r),a=(h-u)/(h-u+(p-f)),e.copy(r).addScaledVector(gd,a);let g=1/(m+x+d);return s=x*g,a=d*g,e.copy(i).addScaledVector(Mr,s).addScaledVector(Sr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Rn=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let s=0,a=o.count;s<a;s++)t.isMesh===!0?t.getVertexPosition(s,On):On.fromBufferAttribute(o,s),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Gs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Gs.copy(i.boundingBox)),Gs.applyMatrix4(t.matrixWorld),this.union(Gs)}let r=t.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ao),Vs.subVectors(this.max,ao),br.subVectors(t.a,ao),wr.subVectors(t.b,ao),Ar.subVectors(t.c,ao),Ai.subVectors(wr,br),Ei.subVectors(Ar,wr),Yi.subVectors(br,Ar);let e=[0,-Ai.z,Ai.y,0,-Ei.z,Ei.y,0,-Yi.z,Yi.y,Ai.z,0,-Ai.x,Ei.z,0,-Ei.x,Yi.z,0,-Yi.x,-Ai.y,Ai.x,0,-Ei.y,Ei.x,0,-Yi.y,Yi.x,0];return!Vl(e,br,wr,Ar,Vs)||(e=[1,0,0,0,1,0,0,0,1],!Vl(e,br,wr,Ar,Vs))?!1:(Hs.crossVectors(Ai,Ei),e=[Hs.x,Hs.y,Hs.z],Vl(e,br,wr,Ar,Vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(li),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},li=[new k,new k,new k,new k,new k,new k,new k,new k],On=new k,Gs=new Rn,br=new k,wr=new k,Ar=new k,Ai=new k,Ei=new k,Yi=new k,ao=new k,Vs=new k,Hs=new k,Ji=new k;function Vl(n,t,e,i,r){for(let o=0,s=n.length-3;o<=s;o+=3){Ji.fromArray(n,o);let a=r.x*Math.abs(Ji.x)+r.y*Math.abs(Ji.y)+r.z*Math.abs(Ji.z),c=t.dot(Ji),l=e.dot(Ji),u=i.dot(Ji);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Le=new k,Ws=new rt,c0=0,Fn=class extends Bn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:c0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=yp,this.updateRanges=[],this.gpuType=Pn,this.version=0,this._normalizationScale=t!==void 0?Ou(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ws.fromBufferAttribute(this,e),Ws.applyMatrix3(t),this.setXY(e,Ws.x,Ws.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,o){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),r=this._normalize(r),o=this._normalize(o)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Sp(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):bp(t,this.array)}};var Ao=class extends Fn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Eo=class extends Fn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var le=class extends Fn{constructor(t,e,i){super(new Float32Array(t),e,i)}},l0=new Rn,co=new k,Hl=new k,pi=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):l0.setFromPoints(t).getCenter(i);let r=0;for(let o=0,s=t.length;o<s;o++)r=Math.max(r,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;co.subVectors(t,this.center);let e=co.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(co,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Hl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(co.copy(t.center).add(Hl)),this.expandByPoint(co.copy(t.center).sub(Hl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},u0=0,En=new fe,Wl=new Ne,Er=new k,mn=new Rn,lo=new Rn,He=new k,Ze=class n extends Bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=dr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Um(t)?Eo:Ao)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let o=new Ht().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return En.makeRotationFromQuaternion(t),this.applyMatrix4(En),this}rotateX(t){return En.makeRotationX(t),this.applyMatrix4(En),this}rotateY(t){return En.makeRotationY(t),this.applyMatrix4(En),this}rotateZ(t){return En.makeRotationZ(t),this.applyMatrix4(En),this}translate(t,e,i){return En.makeTranslation(t,e,i),this.applyMatrix4(En),this}scale(t,e,i){return En.makeScale(t,e,i),this.applyMatrix4(En),this}lookAt(t){return Wl.lookAt(t),Wl.updateMatrix(),this.applyMatrix4(Wl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Er).negate(),this.translate(Er.x,Er.y,Er.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let r=0,o=t.length;r<o;r++){let s=t[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new le(i,3))}else{let i=Math.min(t.length,e.count);for(let r=0;r<i;r++){let o=t[r];e.setXYZ(r,o.x,o.y,o.z||0)}t.length>e.count&&Ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){zt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){let o=e[i];mn.setFromBufferAttribute(o),this.morphTargetsRelative?(He.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(He),He.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(He)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&zt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){zt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let i=this.boundingSphere.center;if(mn.setFromBufferAttribute(t),e)for(let o=0,s=e.length;o<s;o++){let a=e[o];lo.setFromBufferAttribute(a),this.morphTargetsRelative?(He.addVectors(mn.min,lo.min),mn.expandByPoint(He),He.addVectors(mn.max,lo.max),mn.expandByPoint(He)):(mn.expandByPoint(lo.min),mn.expandByPoint(lo.max))}mn.getCenter(i);let r=0;for(let o=0,s=t.count;o<s;o++)He.fromBufferAttribute(t,o),r=Math.max(r,i.distanceToSquared(He));if(e)for(let o=0,s=e.length;o<s;o++){let a=e[o],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)He.fromBufferAttribute(a,l),c&&(Er.fromBufferAttribute(t,l),He.add(Er)),r=Math.max(r,i.distanceToSquared(He))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&zt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){zt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,r=e.normal,o=e.uv,s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new Fn(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));let a=[],c=[],l=new Uint8Array(i.count);for(let N=0;N<i.count;N++)a[N]=new k,c[N]=new k;let u=new k,h=new k,d=new k,p=new rt,f=new rt,x=new rt,m=new k,g=new k;function M(N,C,R){l[N]=l[C]=l[R]=1,u.fromBufferAttribute(i,N),h.fromBufferAttribute(i,C),d.fromBufferAttribute(i,R),p.fromBufferAttribute(o,N),f.fromBufferAttribute(o,C),x.fromBufferAttribute(o,R),h.sub(u),d.sub(u),f.sub(p),x.sub(p);let O=1/(f.x*x.y-x.x*f.y);isFinite(O)&&(m.copy(h).multiplyScalar(x.y).addScaledVector(d,-f.y).multiplyScalar(O),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-x.x).multiplyScalar(O),a[N].add(m),a[C].add(m),a[R].add(m),c[N].add(g),c[C].add(g),c[R].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let N=0,C=S.length;N<C;++N){let R=S[N],O=R.start,z=R.count;for(let P=O,I=O+z;P<I;P+=3)M(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let _=new k,E=new k,A=new k,y=new k;function w(N){A.fromBufferAttribute(r,N),y.copy(A);let C=a[N];_.copy(C),_.sub(A.multiplyScalar(A.dot(C))).normalize(),E.crossVectors(y,C);let O=E.dot(c[N])<0?-1:1;s.setXYZW(N,_.x,_.y,_.z,O)}for(let N=0,C=i.count;N<C;++N)l[N]&&w(N);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Fn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let r=new k,o=new k,s=new k,a=new k,c=new k,l=new k,u=new k,h=new k;if(t)for(let d=0,p=t.count;d<p;d+=3){let f=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,f),o.fromBufferAttribute(e,x),s.fromBufferAttribute(e,m),u.subVectors(s,o),h.subVectors(r,o),u.cross(h),a.fromBufferAttribute(i,f),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(f,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)r.fromBufferAttribute(e,d+0),o.fromBufferAttribute(e,d+1),s.fromBufferAttribute(e,d+2),u.subVectors(s,o),h.subVectors(r,o),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)He.fromBufferAttribute(t,e),He.normalize(),t.setXYZ(e,He.x,He.y,He.z)}toNonIndexed(){function t(a,c){let l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u),p=0,f=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*u;for(let g=0;g<u;g++)d[f++]=l[p++]}return new Fn(d,u,h)}if(this.index===null)return Ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=t(c,i);e.setAttribute(a,l)}let o=this.morphAttributes;for(let a in o){let c=[],l=o[a];for(let u=0,h=l.length;u<h;u++){let d=l[u],p=t(d,i);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,c=s.length;a<c;a++){let l=s[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let r={},o=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){let p=l[h];u.push(p.toJSON(t.data))}u.length>0&&(r[c]=u,o=!0)}o&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let r=t.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(e))}let o=t.morphAttributes;for(let l in o){let u=[],h=o[l];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let s=t.groups;for(let l=0,u=s.length;l<u;l++){let h=s[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Zl=new k,h0=new k,d0=new Ht,yn=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let r=Zl.subVectors(i,e).cross(h0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let r=t.delta(Zl),o=this.normal.dot(r);if(o===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/o;return i===!0&&(s<0||s>1)?null:e.copy(t.start).addScaledVector(r,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||d0.getNormalMatrix(t),r=this.coplanarPoint(Zl).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},p0=0,zn=class extends Bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:p0++}),this.uuid=dr(),this.name="",this.type="Material",this.blending=jr,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mu,this.blendDst=gu,this.blendEquation=lr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ua,this.stencilZFail=ua,this.stencilZPass=ua,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Ft(`Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){Ft(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(o=>o.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(o){let s=[];for(let a in o){let c=o[a];delete c.metadata,s.push(c)}return s}if(e){let o=r(t.textures),s=r(t.images);o.length>0&&(i.textures=o),s.length>0&&(i.images=s)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Vt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new yn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new rt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new rt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let r=e.length;i=new Array(r);for(let o=0;o!==r;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ui=new k,jl=new k,Zs=new k,js=new k,ir=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ui)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ui.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ui.copy(this.origin).addScaledVector(this.direction,e),ui.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){jl.copy(t).add(e).multiplyScalar(.5),Zs.copy(e).sub(t).normalize(),js.copy(this.origin).sub(jl);let o=t.distanceTo(e)*.5,s=-this.direction.dot(Zs),a=js.dot(this.direction),c=-js.dot(Zs),l=js.lengthSq(),u=Math.abs(1-s*s),h,d,p,f;if(u>0)if(h=s*c-a,d=s*a-c,f=o*u,h>=0)if(d>=-f)if(d<=f){let x=1/u;h*=x,d*=x,p=h*(h+s*d+2*a)+d*(s*h+d+2*c)+l}else d=o,h=Math.max(0,-(s*d+a)),p=-h*h+d*(d+2*c)+l;else d=-o,h=Math.max(0,-(s*d+a)),p=-h*h+d*(d+2*c)+l;else d<=-f?(h=Math.max(0,-(-s*o+a)),d=h>0?-o:Math.min(Math.max(-o,-c),o),p=-h*h+d*(d+2*c)+l):d<=f?(h=0,d=Math.min(Math.max(-o,-c),o),p=d*(d+2*c)+l):(h=Math.max(0,-(s*o+a)),d=h>0?o:Math.min(Math.max(-o,-c),o),p=-h*h+d*(d+2*c)+l);else d=s>0?-o:o,h=Math.max(0,-(s*d+a)),p=-h*h+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(jl).addScaledVector(Zs,d),p}intersectSphere(t,e){if(t.radius<0)return null;ui.subVectors(t.center,this.origin);let i=ui.dot(this.direction),r=ui.dot(ui)-i*i,o=t.radius*t.radius;if(r>o)return null;let s=Math.sqrt(o-r),a=i-s,c=i+s;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,o,s,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),u>=0?(o=(t.min.y-d.y)*u,s=(t.max.y-d.y)*u):(o=(t.max.y-d.y)*u,s=(t.min.y-d.y)*u),i>s||o>r||((o>i||isNaN(i))&&(i=o),(s<r||isNaN(r))&&(r=s),h>=0?(a=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,ui)!==null}intersectTriangle(t,e,i,r,o){let s=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,h=t.x-s.x,d=t.y-s.y,p=t.z-s.z,f=e.x-s.x,x=e.y-s.y,m=e.z-s.z,g=i.x-s.x,M=i.y-s.y,S=i.z-s.z,_=Math.abs(c),E=Math.abs(l),A=Math.abs(u),y,w,N,C,R,O,z,P,I,F,B,et;if(_>=E&&_>=A?(N=c,O=h,I=f,et=g,c>=0?(y=l,w=u,C=d,R=p,z=x,P=m,F=M,B=S):(y=u,w=l,C=p,R=d,z=m,P=x,F=S,B=M)):E>=A?(N=l,O=d,I=x,et=M,l>=0?(y=u,w=c,C=p,R=h,z=m,P=f,F=S,B=g):(y=c,w=u,C=h,R=p,z=f,P=m,F=g,B=S)):(N=u,O=p,I=m,et=S,u>=0?(y=c,w=l,C=h,R=d,z=f,P=x,F=g,B=M):(y=l,w=c,C=d,R=h,z=x,P=f,F=M,B=g)),N===0)return null;let W=y/N,J=w/N,K=1/N,bt=C-W*O,Pt=R-J*O,X=z-W*I,at=P-J*I,Et=F-W*et,Ut=B-J*et,vt=Et*at-Ut*X,kt=bt*Ut-Pt*Et,xe=X*Pt-at*bt;if(r){if(vt<0||kt<0||xe<0)return null}else if((vt<0||kt<0||xe<0)&&(vt>0||kt>0||xe>0))return null;let Bt=vt+kt+xe;if(Bt===0)return null;let Kt=K*(vt*O+kt*I+xe*et);return(Bt>0?Kt<0:Kt>0)?null:this.at(Kt/Bt,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wa=class extends zn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},yd=new fe,Ki=new ir,Xs=new pi,_d=new k,qs=new k,$s=new k,Ys=new k,Xl=new k,Js=new k,xd=new k,Ks=new k,be=class extends Ne{constructor(t=new Ze,e=new wa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){let i=this.geometry,r=i.attributes.position,o=i.morphAttributes.position,s=i.morphTargetsRelative;e.fromBufferAttribute(r,t);let a=this.morphTargetInfluences;if(o&&a){Js.set(0,0,0);for(let c=0,l=o.length;c<l;c++){let u=a[c],h=o[c];u!==0&&(Xl.fromBufferAttribute(h,t),s?Js.addScaledVector(Xl,u):Js.addScaledVector(Xl.sub(e),u))}e.add(Js)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xs.copy(i.boundingSphere),Xs.applyMatrix4(o),Ki.copy(t.ray).recast(t.near),!(Xs.containsPoint(Ki.origin)===!1&&(Ki.intersectSphere(Xs,_d)===null||Ki.origin.distanceToSquared(_d)>(t.far-t.near)**2))&&(yd.copy(o).invert(),Ki.copy(t.ray).applyMatrix4(yd),!(i.boundingBox!==null&&Ki.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ki)))}_computeIntersections(t,e,i){let r,o=this.geometry,s=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,u=o.attributes.uv1,h=o.attributes.normal,d=o.groups,p=o.drawRange;if(a!==null)if(Array.isArray(s))for(let f=0,x=d.length;f<x;f++){let m=d[f],g=s[m.materialIndex],M=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let _=M,E=S;_<E;_+=3){let A=a.getX(_),y=a.getX(_+1),w=a.getX(_+2);r=Qs(this,g,t,i,l,u,h,A,y,w),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let f=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=f,g=x;m<g;m+=3){let M=a.getX(m),S=a.getX(m+1),_=a.getX(m+2);r=Qs(this,s,t,i,l,u,h,M,S,_),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let f=0,x=d.length;f<x;f++){let m=d[f],g=s[m.materialIndex],M=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let _=M,E=S;_<E;_+=3){let A=_,y=_+1,w=_+2;r=Qs(this,g,t,i,l,u,h,A,y,w),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let f=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=f,g=x;m<g;m+=3){let M=m,S=m+1,_=m+2;r=Qs(this,s,t,i,l,u,h,M,S,_),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}};function f0(n,t,e,i,r,o,s,a){let c;if(t.side===qe?c=i.intersectTriangle(s,o,r,!0,a):c=i.intersectTriangle(r,o,s,t.side===Oi,a),c===null)return null;Ks.copy(a),Ks.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(Ks);return l<e.near||l>e.far?null:{distance:l,point:Ks.clone(),object:n}}function Qs(n,t,e,i,r,o,s,a,c,l){n.getVertexPosition(a,qs),n.getVertexPosition(c,$s),n.getVertexPosition(l,Ys);let u=f0(n,t,e,i,qs,$s,Ys,xd);if(u){let h=new k;Ci.getBarycoord(xd,qs,$s,Ys,h),r&&(u.uv=Ci.getInterpolatedAttribute(r,a,c,l,h,new rt)),o&&(u.uv1=Ci.getInterpolatedAttribute(o,a,c,l,h,new rt)),s&&(u.normal=Ci.getInterpolatedAttribute(s,a,c,l,h,new k),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new k,materialIndex:0};Ci.getNormal(qs,$s,Ys,d.normal),u.face=d,u.barycoord=h}return u}var To=class extends ln{constructor(t=null,e=1,i=1,r,o,s,a,c,l=We,u=We,h,d){super(null,s,a,c,l,u,r,o,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Co=class extends Fn{constructor(t,e,i,r=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Tr=new fe,vd=new fe,ta=[],Md=new Rn,m0=new fe,uo=new be,ho=new pi,Ro=class extends be{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Co(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,m0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Rn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Tr),Md.copy(t.boundingBox).applyMatrix4(Tr),this.boundingBox.union(Md)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Tr),ho.copy(t.boundingSphere).applyMatrix4(Tr),this.boundingSphere.union(ho)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,r=this.morphTexture.source.data.data,o=i.length+1,s=t*o+1;for(let a=0;a<i.length;a++)i[a]=r[s+a]}raycast(t,e){let i=this.matrixWorld,r=this.count;if(uo.geometry=this.geometry,uo.material=this.material,uo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ho.copy(this.boundingSphere),ho.applyMatrix4(i),t.ray.intersectsSphere(ho)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,Tr),vd.multiplyMatrices(i,Tr),uo.matrixWorld=vd,uo.raycast(t,ta);for(let s=0,a=ta.length;s<a;s++){let c=ta[s];c.instanceId=o,c.object=this,e.push(c)}ta.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Co(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new To(new Float32Array(r*this.count),r,this.count,ic,Pn));let o=this.morphTexture.source.data.data,s=0;for(let l=0;l<i.length;l++)s+=i[l];let a=this.geometry.morphTargetsRelative?1:1-s,c=r*t;return o[c]=a,o.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Qi=new pi,g0=new rt(.5,.5),ea=new k,Ri=class{constructor(t=new yn,e=new yn,i=new yn,r=new yn,o=new yn,s=new yn){this.planes=[t,e,i,r,o,s]}set(t,e,i,r,o,s){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Tn,i=!1){let r=this.planes,o=t.elements,s=o[0],a=o[1],c=o[2],l=o[3],u=o[4],h=o[5],d=o[6],p=o[7],f=o[8],x=o[9],m=o[10],g=o[11],M=o[12],S=o[13],_=o[14],E=o[15];if(r[0].setComponents(l-s,p-u,g-f,E-M).normalize(),r[1].setComponents(l+s,p+u,g+f,E+M).normalize(),r[2].setComponents(l+a,p+h,g+x,E+S).normalize(),r[3].setComponents(l-a,p-h,g-x,E-S).normalize(),i)r[4].setComponents(c,d,m,_).normalize(),r[5].setComponents(l-c,p-d,g-m,E-_).normalize();else if(r[4].setComponents(l-c,p-d,g-m,E-_).normalize(),e===Tn)r[5].setComponents(l+c,p+d,g+m,E+_).normalize();else if(e===Nr)r[5].setComponents(c,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(t){Qi.center.set(0,0,0);let e=g0.distanceTo(t.center);return Qi.radius=.7071067811865476+e,Qi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(t){let e=this.planes,i=t.center,r=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let r=e[i];if(ea.x=r.normal.x>0?t.max.x:t.min.x,ea.y=r.normal.y>0?t.max.y:t.min.y,ea.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ea)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Sd=new fe,Aa=class n{constructor(){this.coordinateSystem=Tn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let r=0;r<e.length;r++){let o=e[r];Sd.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),i[r]===void 0&&(i[r]=new Ri),i[r].setFromProjectionMatrix(Sd,o.coordinateSystem,o.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let r=0;r<t._count;r++)e[r]===void 0&&(e[r]=new Ri),e[r].copy(i[r]);return this._count=t._count,this}clone(){return new n().copy(this)}};var rr=class extends zn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ea=new k,Ta=new k,bd=new fe,po=new ir,na=new pi,ql=new k,wd=new k,Fr=class extends Ne{constructor(t=new Ze,e=new rr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let r=1,o=e.count;r<o;r++)Ea.fromBufferAttribute(e,r-1),Ta.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=Ea.distanceTo(Ta);t.setAttribute("lineDistance",new le(i,1))}else Ft("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,r=this.matrixWorld,o=t.params.Line.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),na.copy(i.boundingSphere),na.applyMatrix4(r),na.radius+=o,t.ray.intersectsSphere(na)===!1)return;bd.copy(r).invert(),po.copy(t.ray).applyMatrix4(bd);let a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){let p=Math.max(0,s.start),f=Math.min(u.count,s.start+s.count);for(let x=p,m=f-1;x<m;x+=l){let g=u.getX(x),M=u.getX(x+1),S=ia(this,t,po,c,g,M,x);S&&e.push(S)}if(this.isLineLoop){let x=u.getX(f-1),m=u.getX(p),g=ia(this,t,po,c,x,m,f-1);g&&e.push(g)}}else{let p=Math.max(0,s.start),f=Math.min(d.count,s.start+s.count);for(let x=p,m=f-1;x<m;x+=l){let g=ia(this,t,po,c,x,x+1,x);g&&e.push(g)}if(this.isLineLoop){let x=ia(this,t,po,c,f-1,p,f-1);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}};function ia(n,t,e,i,r,o,s){let a=n.geometry.attributes.position;if(Ea.fromBufferAttribute(a,r),Ta.fromBufferAttribute(a,o),e.distanceSqToSegment(Ea,Ta,ql,wd)>i)return;ql.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(ql);if(!(l<t.near||l>t.far))return{distance:l,point:wd.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var Ad=new k,Ed=new k,Ca=class extends Fr{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let r=0,o=e.count;r<o;r+=2)Ad.fromBufferAttribute(e,r),Ed.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Ad.distanceTo(Ed);t.setAttribute("lineDistance",new le(i,1))}else Ft("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Po=class extends ln{constructor(t=[],e=ur,i,r,o,s,a,c,l,u){super(t,e,i,r,o,s,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var fi=class extends ln{constructor(t,e,i=Gn,r,o,s,a=We,c=We,l,u=di,h=1){if(u!==di&&u!==yi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:h};super(d,r,o,s,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new kr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Io=class extends fi{constructor(t,e=Gn,i=ur,r,o,s=We,a=We,c,l=di){let u={width:t,height:t,depth:1},h=[u,u,u,u,u,u];super(t,t,e,i,r,o,s,a,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Lo=class extends ln{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Jn=class n extends Ze{constructor(t=1,e=1,i=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:o,depthSegments:s};let a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);let c=[],l=[],u=[],h=[],d=0,p=0;f("z","y","x",-1,-1,i,e,t,s,o,0),f("z","y","x",1,-1,i,e,-t,s,o,1),f("x","z","y",1,1,t,i,e,r,s,2),f("x","z","y",1,-1,t,i,-e,r,s,3),f("x","y","z",1,-1,t,e,i,r,o,4),f("x","y","z",-1,-1,t,e,-i,r,o,5),this.setIndex(c),this.setAttribute("position",new le(l,3)),this.setAttribute("normal",new le(u,3)),this.setAttribute("uv",new le(h,2));function f(x,m,g,M,S,_,E,A,y,w,N){let C=_/y,R=E/w,O=_/2,z=E/2,P=A/2,I=y+1,F=w+1,B=0,et=0,W=new k;for(let J=0;J<F;J++){let K=J*R-z;for(let bt=0;bt<I;bt++){let Pt=bt*C-O;W[x]=Pt*M,W[m]=K*S,W[g]=P,l.push(W.x,W.y,W.z),W[x]=0,W[m]=0,W[g]=A>0?1:-1,u.push(W.x,W.y,W.z),h.push(bt/y),h.push(1-J/w),B+=1}}for(let J=0;J<w;J++)for(let K=0;K<y;K++){let bt=d+K+I*J,Pt=d+K+I*(J+1),X=d+(K+1)+I*(J+1),at=d+(K+1)+I*J;c.push(bt,Pt,at),c.push(Pt,X,at),et+=6}a.addGroup(p,et,N),p+=et,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Pi=class n extends Ze{constructor(t=1,e=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:r},e=Math.max(3,e);let o=[],s=[],a=[],c=[],l=new k,u=new rt;s.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){let p=i+h/e*r;l.x=t*Math.cos(p),l.y=t*Math.sin(p),s.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(s[d]/t+1)/2,u.y=(s[d+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)o.push(h,h+1,0);this.setIndex(o),this.setAttribute("position",new le(s,3)),this.setAttribute("normal",new le(a,3)),this.setAttribute("uv",new le(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},No=class n extends Ze{constructor(t=1,e=1,i=1,r=32,o=1,s=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),o=Math.floor(o);let u=[],h=[],d=[],p=[],f=0,x=[],m=i/2,g=0;M(),s===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new le(h,3)),this.setAttribute("normal",new le(d,3)),this.setAttribute("uv",new le(p,2));function M(){let _=new k,E=new k,A=0,y=(e-t)/i;for(let w=0;w<=o;w++){let N=[],C=w/o,R=C*(e-t)+t;for(let O=0;O<=r;O++){let z=O/r,P=z*c+a,I=Math.sin(P),F=Math.cos(P);E.x=R*I,E.y=-C*i+m,E.z=R*F,h.push(E.x,E.y,E.z),_.set(I,y,F).normalize(),d.push(_.x,_.y,_.z),p.push(z,1-C),N.push(f++)}x.push(N)}for(let w=0;w<r;w++)for(let N=0;N<o;N++){let C=x[N][w],R=x[N+1][w],O=x[N+1][w+1],z=x[N][w+1];(t>0||N!==0)&&(u.push(C,R,z),A+=3),(e>0||N!==o-1)&&(u.push(R,O,z),A+=3)}l.addGroup(g,A,0),g+=A}function S(_){let E=f,A=new rt,y=new k,w=0,N=_===!0?t:e,C=_===!0?1:-1;for(let O=1;O<=r;O++)h.push(0,m*C,0),d.push(0,C,0),p.push(.5,.5),f++;let R=f;for(let O=0;O<=r;O++){let P=O/r*c+a,I=Math.cos(P),F=Math.sin(P);y.x=N*F,y.y=m*C,y.z=N*I,h.push(y.x,y.y,y.z),d.push(0,C,0),A.x=I*.5+.5,A.y=F*.5*C+.5,p.push(A.x,A.y),f++}for(let O=0;O<r;O++){let z=E+O,P=R+O;_===!0?u.push(P,P+1,z):u.push(P+1,P,z),w+=3}l.addGroup(g,w,_===!0?1:2),g+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var vn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ft("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,r=this.getPoint(0),o=0;e.push(0);for(let s=1;s<=t;s++)i=this.getPoint(s/t),o+=i.distanceTo(r),e.push(o),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),r=0,o=i.length,s;e?s=e:s=t*i[o-1];let a=0,c=o-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=i[r]-s,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===s)return r/(o-1);let u=i[r],d=i[r+1]-u,p=(s-u)/d;return(r+p)/(o-1)}getTangent(t,e){let r=t-1e-4,o=t+1e-4;r<0&&(r=0),o>1&&(o=1);let s=this.getPoint(r),a=this.getPoint(o),c=e||(s.isVector2?new rt:new k);return c.copy(a).sub(s).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new k,r=[],o=[],s=[],a=new k,c=new fe;for(let p=0;p<=t;p++){let f=p/t;r[p]=this.getTangentAt(f,new k)}o[0]=new k,s[0]=new k;let l=Number.MAX_VALUE,u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=l&&(l=u,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),d<=l&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),o[0].crossVectors(r[0],a),s[0].crossVectors(r[0],o[0]);for(let p=1;p<=t;p++){if(o[p]=o[p-1].clone(),s[p]=s[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();let f=Math.acos(qt(r[p-1].dot(r[p]),-1,1));o[p].applyMatrix4(c.makeRotationAxis(a,f))}s[p].crossVectors(r[p],o[p])}if(e===!0){let p=Math.acos(qt(o[0].dot(o[t]),-1,1));p/=t,r[0].dot(a.crossVectors(o[0],o[t]))>0&&(p=-p);for(let f=1;f<=t;f++)o[f].applyMatrix4(c.makeRotationAxis(r[f],p*f)),s[f].crossVectors(r[f],o[f])}return{tangents:r,normals:o,binormals:s}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Br=class extends vn{constructor(t=0,e=0,i=1,r=1,o=0,s=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=o,this.aEndAngle=s,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new rt){let i=e,r=Math.PI*2,o=this.aEndAngle-this.aStartAngle,s=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=r;for(;o>r;)o-=r;o<Number.EPSILON&&(s?o=0:o=r),this.aClockwise===!0&&!s&&(o===r?o=-r:o=o-r);let a=this.aStartAngle+t*o,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*u-p*h+this.aX,l=d*h+p*u+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ra=class extends Br{constructor(t,e,i,r,o,s){super(t,e,i,i,r,o,s),this.isArcCurve=!0,this.type="ArcCurve"}};function Fu(){let n=0,t=0,e=0,i=0;function r(o,s,a,c){n=o,t=a,e=-3*o+3*s-2*a-c,i=2*o-2*s+a+c}return{initCatmullRom:function(o,s,a,c,l){r(s,a,l*(a-o),l*(c-s))},initNonuniformCatmullRom:function(o,s,a,c,l,u,h){let d=(s-o)/l-(a-o)/(l+u)+(a-s)/u,p=(a-s)/u-(c-s)/(u+h)+(c-a)/h;d*=u,p*=u,r(s,a,d,p)},calc:function(o){let s=o*o,a=s*o;return n+t*o+e*s+i*a}}}var Td=new k,Cd=new k,$l=new Fu,Yl=new Fu,Jl=new Fu,Pa=class extends vn{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new k){let i=e,r=this.points,o=r.length,s=(o-(this.closed?0:1))*t,a=Math.floor(s),c=s-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%o]:(Cd.subVectors(r[0],r[1]).add(r[0]),l=Cd);let h=r[a%o],d=r[(a+1)%o];if(this.closed||a+2<o?u=r[(a+2)%o]:(Td.subVectors(r[o-1],r[o-2]).add(r[o-1]),u=Td),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,f=Math.pow(l.distanceToSquared(h),p),x=Math.pow(h.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(u),p);x<1e-4&&(x=1),f<1e-4&&(f=x),m<1e-4&&(m=x),$l.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,f,x,m),Yl.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,f,x,m),Jl.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,f,x,m)}else this.curveType==="catmullrom"&&($l.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Yl.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Jl.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return i.set($l.calc(c),Yl.calc(c),Jl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(new k().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Rd(n,t,e,i,r){let o=(i-t)*.5,s=(r-e)*.5,a=n*n,c=n*a;return(2*e-2*i+o+s)*c+(-3*e+3*i-2*o-s)*a+o*n+e}function y0(n,t){let e=1-n;return e*e*t}function _0(n,t){return 2*(1-n)*n*t}function x0(n,t){return n*n*t}function yo(n,t,e,i){return y0(n,t)+_0(n,e)+x0(n,i)}function v0(n,t){let e=1-n;return e*e*e*t}function M0(n,t){let e=1-n;return 3*e*e*n*t}function S0(n,t){return 3*(1-n)*n*n*t}function b0(n,t){return n*n*n*t}function _o(n,t,e,i,r){return v0(n,t)+M0(n,e)+S0(n,i)+b0(n,r)}var Do=class extends vn{constructor(t=new rt,e=new rt,i=new rt,r=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new rt){let i=e,r=this.v0,o=this.v1,s=this.v2,a=this.v3;return i.set(_o(t,r.x,o.x,s.x,a.x),_o(t,r.y,o.y,s.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ia=class extends vn{constructor(t=new k,e=new k,i=new k,r=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new k){let i=e,r=this.v0,o=this.v1,s=this.v2,a=this.v3;return i.set(_o(t,r.x,o.x,s.x,a.x),_o(t,r.y,o.y,s.y,a.y),_o(t,r.z,o.z,s.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Uo=class extends vn{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},La=class extends vn{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ko=class extends vn{constructor(t=new rt,e=new rt,i=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new rt){let i=e,r=this.v0,o=this.v1,s=this.v2;return i.set(yo(t,r.x,o.x,s.x),yo(t,r.y,o.y,s.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Na=class extends vn{constructor(t=new k,e=new k,i=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new k){let i=e,r=this.v0,o=this.v1,s=this.v2;return i.set(yo(t,r.x,o.x,s.x),yo(t,r.y,o.y,s.y),yo(t,r.z,o.z,s.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Oo=class extends vn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){let i=e,r=this.points,o=(r.length-1)*t,s=Math.floor(o),a=o-s,c=r[s===0?s:s-1],l=r[s],u=r[s>r.length-2?r.length-1:s+1],h=r[s>r.length-3?r.length-1:s+2];return i.set(Rd(a,c.x,l.x,u.x,h.x),Rd(a,c.y,l.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(r.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let r=t.points[e];this.points.push(new rt().fromArray(r))}return this}},iu=Object.freeze({__proto__:null,ArcCurve:Ra,CatmullRomCurve3:Pa,CubicBezierCurve:Do,CubicBezierCurve3:Ia,EllipseCurve:Br,LineCurve:Uo,LineCurve3:La,QuadraticBezierCurve:ko,QuadraticBezierCurve3:Na,SplineCurve:Oo}),Da=class extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new iu[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),r=this.getCurveLengths(),o=0;for(;o<r.length;){if(r[o]>=i){let s=r[o]-i,a=this.curves[o],c=a.getLength(),l=c===0?0:1-s/c;return a.getPointAt(l,e)}o++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let r=0,o=this.curves;r<o.length;r++){let s=o[r],a=s.isEllipseCurve?t*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?t*s.points.length:t,c=s.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let r=t.curves[e];this.curves.push(new iu[r.type]().fromJSON(r))}return this.cacheLengths=null,this}},Fo=class extends Da{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Uo(this.currentPoint.clone(),new rt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){let o=new ko(this.currentPoint.clone(),new rt(t,e),new rt(i,r));return this.curves.push(o),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,o,s){let a=new Do(this.currentPoint.clone(),new rt(t,e),new rt(i,r),new rt(o,s));return this.curves.push(a),this.currentPoint.set(o,s),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Oo(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,o,s){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,r,o,s),this}absarc(t,e,i,r,o,s){return this.absellipse(t,e,i,i,r,o,s),this}ellipse(t,e,i,r,o,s,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,i,r,o,s,a,c),this}absellipse(t,e,i,r,o,s,a,c){let l=new Br(t,e,i,r,o,s,a,c);if(this.curves.length>0){let h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},or=class extends Fo{constructor(t){super(t),this.uuid=dr(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let r=t.holes[e];this.holes.push(new Fo().fromJSON(r))}return this}};function w0(n,t,e=2){let i=t&&t.length,r=i?t[0]*e:n.length,o=Ap(n,0,r,e,!0),s=[];if(!o||o.next===o.prev)return s;let a,c,l;if(i&&(o=R0(n,t,o,e)),n.length>80*e){a=n[0],c=n[1];let u=a,h=c;for(let d=e;d<r;d+=e){let p=n[d],f=n[d+1];p<a&&(a=p),f<c&&(c=f),p>u&&(u=p),f>h&&(h=f)}l=Math.max(u-a,h-c),l=l!==0?32767/l:0}return Bo(o,s,e,a,c,l,0),s}function Ap(n,t,e,i,r){let o;if(r===z0(n,t,e,i)>0)for(let s=t;s<e;s+=i)o=Pd(s/i|0,n[s],n[s+1],o);else for(let s=e-i;s>=t;s-=i)o=Pd(s/i|0,n[s],n[s+1],o);return o&&zr(o,o.next)&&(Go(o),o=o.next),o}function sr(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(zr(e,e.next)||Ae(e.prev,e,e.next)===0)){if(Go(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Bo(n,t,e,i,r,o,s){if(!n)return;!s&&o&&D0(n,i,r,o);let a=n;for(;n.prev!==n.next;){let c=n.prev,l=n.next;if(o?E0(n,i,r,o):A0(n)){t.push(c.i,n.i,l.i),Go(n),n=l.next,a=l.next;continue}if(n=l,n===a){s?s===1?(n=T0(sr(n),t),Bo(n,t,e,i,r,o,2)):s===2&&C0(n,t,e,i,r,o):Bo(sr(n),t,e,i,r,o,1);break}}}function A0(n){let t=n.prev,e=n,i=n.next;if(Ae(t,e,i)>=0)return!1;let r=t.x,o=e.x,s=i.x,a=t.y,c=e.y,l=i.y,u=Math.min(r,o,s),h=Math.min(a,c,l),d=Math.max(r,o,s),p=Math.max(a,c,l),f=i.next;for(;f!==t;){if(f.x>=u&&f.x<=d&&f.y>=h&&f.y<=p&&fo(r,a,o,c,s,l,f.x,f.y)&&Ae(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function E0(n,t,e,i){let r=n.prev,o=n,s=n.next;if(Ae(r,o,s)>=0)return!1;let a=r.x,c=o.x,l=s.x,u=r.y,h=o.y,d=s.y,p=Math.min(a,c,l),f=Math.min(u,h,d),x=Math.max(a,c,l),m=Math.max(u,h,d),g=ru(p,f,t,e,i),M=ru(x,m,t,e,i),S=n.prevZ,_=n.nextZ;for(;S&&S.z>=g&&_&&_.z<=M;){if(S.x>=p&&S.x<=x&&S.y>=f&&S.y<=m&&S!==r&&S!==s&&fo(a,u,c,h,l,d,S.x,S.y)&&Ae(S.prev,S,S.next)>=0||(S=S.prevZ,_.x>=p&&_.x<=x&&_.y>=f&&_.y<=m&&_!==r&&_!==s&&fo(a,u,c,h,l,d,_.x,_.y)&&Ae(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;S&&S.z>=g;){if(S.x>=p&&S.x<=x&&S.y>=f&&S.y<=m&&S!==r&&S!==s&&fo(a,u,c,h,l,d,S.x,S.y)&&Ae(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;_&&_.z<=M;){if(_.x>=p&&_.x<=x&&_.y>=f&&_.y<=m&&_!==r&&_!==s&&fo(a,u,c,h,l,d,_.x,_.y)&&Ae(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function T0(n,t){let e=n;do{let i=e.prev,r=e.next.next;!zr(i,r)&&Tp(i,e,e.next,r)&&zo(i,r)&&zo(r,i)&&(t.push(i.i,e.i,r.i),Go(e),Go(e.next),e=n=r),e=e.next}while(e!==n);return sr(e)}function C0(n,t,e,i,r,o){let s=n;do{let a=s.next.next;for(;a!==s.prev;){if(s.i!==a.i&&O0(s,a)){let c=Cp(s,a);s=sr(s,s.next),c=sr(c,c.next),Bo(s,t,e,i,r,o,0),Bo(c,t,e,i,r,o,0);return}a=a.next}s=s.next}while(s!==n)}function R0(n,t,e,i){let r=[];for(let o=0,s=t.length;o<s;o++){let a=t[o]*i,c=o<s-1?t[o+1]*i:n.length,l=Ap(n,a,c,i,!1);l===l.next&&(l.steiner=!0),r.push(k0(l))}r.sort(P0);for(let o=0;o<r.length;o++)e=I0(r[o],e);return e}function P0(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=i-r}return e}function I0(n,t){let e=L0(n,t);if(!e)return t;let i=Cp(e,n);return sr(i,i.next),sr(e,e.next)}function L0(n,t){let e=t,i=n.x,r=n.y,o=-1/0,s;if(zr(n,e))return e;do{if(zr(n,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){let h=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>o&&(o=h,s=e.x<e.next.x?e:e.next,h===i))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,u=1/0;e=s;do{if(i>=e.x&&e.x>=c&&i!==e.x&&Ep(r<l?i:o,r,c,l,r<l?o:i,r,e.x,e.y)){let h=Math.abs(r-e.y)/(i-e.x);zo(e,n)&&(h<u||h===u&&(e.x>s.x||e.x===s.x&&N0(s,e)))&&(s=e,u=h)}e=e.next}while(e!==a);return s}function N0(n,t){return Ae(n.prev,n,t.prev)<0&&Ae(t.next,n,n.next)<0}function D0(n,t,e,i){let r=n;do r.z===0&&(r.z=ru(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,U0(r)}function U0(n){let t,e=1;do{let i=n,r;n=null;let o=null;for(t=0;i;){t++;let s=i,a=0;for(let l=0;l<e&&(a++,s=s.nextZ,!!s);l++);let c=e;for(;a>0||c>0&&s;)a!==0&&(c===0||!s||i.z<=s.z)?(r=i,i=i.nextZ,a--):(r=s,s=s.nextZ,c--),o?o.nextZ=r:n=r,r.prevZ=o,o=r;i=s}o.nextZ=null,e*=2}while(t>1);return n}function ru(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function k0(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Ep(n,t,e,i,r,o,s,a){return(r-s)*(t-a)>=(n-s)*(o-a)&&(n-s)*(i-a)>=(e-s)*(t-a)&&(e-s)*(o-a)>=(r-s)*(i-a)}function fo(n,t,e,i,r,o,s,a){return!(n===s&&t===a)&&Ep(n,t,e,i,r,o,s,a)}function O0(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!F0(n,t)&&(zo(n,t)&&zo(t,n)&&B0(n,t)&&(Ae(n.prev,n,t.prev)||Ae(n,t.prev,t))||zr(n,t)&&Ae(n.prev,n,n.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function zr(n,t){return n.x===t.x&&n.y===t.y}function Tp(n,t,e,i){let r=oa(Ae(n,t,e)),o=oa(Ae(n,t,i)),s=oa(Ae(e,i,n)),a=oa(Ae(e,i,t));return!!(r!==o&&s!==a||r===0&&ra(n,e,t)||o===0&&ra(n,i,t)||s===0&&ra(e,n,i)||a===0&&ra(e,t,i))}function ra(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function oa(n){return n>0?1:n<0?-1:0}function F0(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Tp(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function zo(n,t){return Ae(n.prev,n,n.next)<0?Ae(n,t,n.next)>=0&&Ae(n,n.prev,t)>=0:Ae(n,t,n.prev)<0||Ae(n,n.next,t)<0}function B0(n,t){let e=n,i=!1,r=(n.x+t.x)/2,o=(n.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&r<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Cp(n,t){let e=ou(n.i,n.x,n.y),i=ou(t.i,t.x,t.y),r=n.next,o=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,o.next=i,i.prev=o,i}function Pd(n,t,e,i){let r=ou(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Go(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function ou(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function z0(n,t,e,i){let r=0;for(let o=t,s=e-i;o<e;o+=i)r+=(n[s]-n[o])*(n[o+1]+n[s+1]),s=o;return r}var su=class{static triangulate(t,e,i=2){return w0(t,e,i)}},tr=class n{static area(t){let e=t.length,i=0;for(let r=e-1,o=0;o<e;r=o++)i+=t[r].x*t[o].y-t[o].x*t[r].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],r=[],o=[];Id(t),Ld(i,t);let s=t.length;e.forEach(Id);for(let c=0;c<e.length;c++)r.push(s),s+=e[c].length,Ld(i,e[c]);let a=su.triangulate(i,r);for(let c=0;c<a.length;c+=3)o.push(a.slice(c,c+3));return o}};function Id(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Ld(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var Gr=class n extends Ze{constructor(t=new or([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,r=[],o=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];s(l)}this.setAttribute("position",new le(r,3)),this.setAttribute("uv",new le(o,2)),this.computeVertexNormals();function s(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,f=e.bevelSize!==void 0?e.bevelSize:p-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:G0,S,_=!1,E,A,y,w;if(g){S=g.getSpacedPoints(u),_=!0,d=!1;let tt=g.isCatmullRomCurve3?g.closed:!1;E=g.computeFrenetFrames(u,tt),A=new k,y=new k,w=new k}d||(m=0,p=0,f=0,x=0);let N=a.extractPoints(l),C=N.shape,R=N.holes;if(!tr.isClockWise(C)){C=C.reverse();for(let tt=0,ht=R.length;tt<ht;tt++){let ct=R[tt];tr.isClockWise(ct)&&(R[tt]=ct.reverse())}}function z(tt){let ct=10000000000000001e-36,At=tt[0];for(let _t=1;_t<=tt.length;_t++){let Zt=_t%tt.length,Lt=tt[Zt],ee=Lt.x-At.x,ne=Lt.y-At.y,ce=ee*ee+ne*ne,U=Math.max(Math.abs(Lt.x),Math.abs(Lt.y),Math.abs(At.x),Math.abs(At.y)),Pe=ct*U*U;if(ce<=Pe){tt.splice(Zt,1),_t--;continue}At=Lt}}z(C),R.forEach(z);let P=R.length,I=C;for(let tt=0;tt<P;tt++){let ht=R[tt];C=C.concat(ht)}function F(tt,ht,ct){return ht||zt("ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(ht,ct)}let B=C.length;function et(tt,ht,ct){let At,_t,Zt,Lt=tt.x-ht.x,ee=tt.y-ht.y,ne=ct.x-tt.x,ce=ct.y-tt.y,U=Lt*Lt+ee*ee,Pe=Lt*ce-ee*ne;if(Math.abs(Pe)>Number.EPSILON){let Qt=Math.sqrt(U),ge=Math.sqrt(ne*ne+ce*ce),mt=ht.x-ee/Qt,Te=ht.y+Lt/Qt,Ot=ct.x-ce/ge,Gt=ct.y+ne/ge,T=((Ot-mt)*ce-(Gt-Te)*ne)/(Lt*ce-ee*ne);At=mt+Lt*T-tt.x,_t=Te+ee*T-tt.y;let v=At*At+_t*_t;if(v<=2)return new rt(At,_t);Zt=Math.sqrt(v/2)}else{let Qt=!1;Lt>Number.EPSILON?ne>Number.EPSILON&&(Qt=!0):Lt<-Number.EPSILON?ne<-Number.EPSILON&&(Qt=!0):Math.sign(ee)===Math.sign(ce)&&(Qt=!0),Qt?(At=-ee,_t=Lt,Zt=Math.sqrt(U)):(At=Lt,_t=ee,Zt=Math.sqrt(U/2))}return new rt(At/Zt,_t/Zt)}let W=[];for(let tt=0,ht=I.length,ct=ht-1,At=tt+1;tt<ht;tt++,ct++,At++)ct===ht&&(ct=0),At===ht&&(At=0),W[tt]=et(I[tt],I[ct],I[At]);let J=[],K,bt=W.concat();for(let tt=0,ht=P;tt<ht;tt++){let ct=R[tt];K=[];for(let At=0,_t=ct.length,Zt=_t-1,Lt=At+1;At<_t;At++,Zt++,Lt++)Zt===_t&&(Zt=0),Lt===_t&&(Lt=0),K[At]=et(ct[At],ct[Zt],ct[Lt]);J.push(K),bt=bt.concat(K)}let Pt;if(m===0)Pt=tr.triangulateShape(I,R);else{let tt=[],ht=[];for(let ct=0;ct<m;ct++){let At=ct/m,_t=p*Math.cos(At*Math.PI/2),Zt=f*Math.sin(At*Math.PI/2)+x;for(let Lt=0,ee=I.length;Lt<ee;Lt++){let ne=F(I[Lt],W[Lt],Zt);kt(ne.x,ne.y,-_t),At===0&&tt.push(ne)}for(let Lt=0,ee=P;Lt<ee;Lt++){let ne=R[Lt];K=J[Lt];let ce=[];for(let U=0,Pe=ne.length;U<Pe;U++){let Qt=F(ne[U],K[U],Zt);kt(Qt.x,Qt.y,-_t),At===0&&ce.push(Qt)}At===0&&ht.push(ce)}}Pt=tr.triangulateShape(tt,ht)}let X=Pt.length,at=f+x;for(let tt=0;tt<B;tt++){let ht=d?F(C[tt],bt[tt],at):C[tt];_?(y.copy(E.normals[0]).multiplyScalar(ht.x),A.copy(E.binormals[0]).multiplyScalar(ht.y),w.copy(S[0]).add(y).add(A),kt(w.x,w.y,w.z)):kt(ht.x,ht.y,0)}for(let tt=1;tt<=u;tt++)for(let ht=0;ht<B;ht++){let ct=d?F(C[ht],bt[ht],at):C[ht];_?(y.copy(E.normals[tt]).multiplyScalar(ct.x),A.copy(E.binormals[tt]).multiplyScalar(ct.y),w.copy(S[tt]).add(y).add(A),kt(w.x,w.y,w.z)):kt(ct.x,ct.y,h/u*tt)}for(let tt=m-1;tt>=0;tt--){let ht=tt/m,ct=p*Math.cos(ht*Math.PI/2),At=f*Math.sin(ht*Math.PI/2)+x;for(let _t=0,Zt=I.length;_t<Zt;_t++){let Lt=F(I[_t],W[_t],At);kt(Lt.x,Lt.y,h+ct)}for(let _t=0,Zt=R.length;_t<Zt;_t++){let Lt=R[_t];K=J[_t];for(let ee=0,ne=Lt.length;ee<ne;ee++){let ce=F(Lt[ee],K[ee],At);_?kt(ce.x,ce.y+S[u-1].y,S[u-1].x+ct):kt(ce.x,ce.y,h+ct)}}}Et(),Ut();function Et(){let tt=r.length/3;if(d){let ht=0,ct=B*ht;for(let At=0;At<X;At++){let _t=Pt[At];xe(_t[2]+ct,_t[1]+ct,_t[0]+ct)}ht=u+m*2,ct=B*ht;for(let At=0;At<X;At++){let _t=Pt[At];xe(_t[0]+ct,_t[1]+ct,_t[2]+ct)}}else{for(let ht=0;ht<X;ht++){let ct=Pt[ht];xe(ct[2],ct[1],ct[0])}for(let ht=0;ht<X;ht++){let ct=Pt[ht];xe(ct[0]+B*u,ct[1]+B*u,ct[2]+B*u)}}i.addGroup(tt,r.length/3-tt,0)}function Ut(){let tt=r.length/3,ht=0;vt(I,ht),ht+=I.length;for(let ct=0,At=R.length;ct<At;ct++){let _t=R[ct];vt(_t,ht),ht+=_t.length}i.addGroup(tt,r.length/3-tt,1)}function vt(tt,ht){let ct=tt.length;for(;--ct>=0;){let At=ct,_t=ct-1;_t<0&&(_t=tt.length-1);for(let Zt=0,Lt=u+m*2;Zt<Lt;Zt++){let ee=B*Zt,ne=B*(Zt+1),ce=ht+At+ee,U=ht+_t+ee,Pe=ht+_t+ne,Qt=ht+At+ne;Bt(ce,U,Pe,Qt)}}}function kt(tt,ht,ct){c.push(tt),c.push(ht),c.push(ct)}function xe(tt,ht,ct){Kt(tt),Kt(ht),Kt(ct);let At=r.length/3,_t=M.generateTopUV(i,r,At-3,At-2,At-1);te(_t[0]),te(_t[1]),te(_t[2])}function Bt(tt,ht,ct,At){Kt(tt),Kt(ht),Kt(At),Kt(ht),Kt(ct),Kt(At);let _t=r.length/3,Zt=M.generateSideWallUV(i,r,_t-6,_t-3,_t-2,_t-1);te(Zt[0]),te(Zt[1]),te(Zt[3]),te(Zt[1]),te(Zt[2]),te(Zt[3])}function Kt(tt){r.push(c[tt*3+0]),r.push(c[tt*3+1]),r.push(c[tt*3+2])}function te(tt){o.push(tt.x),o.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return V0(e,i,t)}static fromJSON(t,e){let i=[];for(let o=0,s=t.shapes.length;o<s;o++){let a=e[t.shapes[o]];i.push(a)}let r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new iu[r.type]().fromJSON(r)),new n(i,t.options)}},G0={generateTopUV:function(n,t,e,i,r){let o=t[e*3],s=t[e*3+1],a=t[i*3],c=t[i*3+1],l=t[r*3],u=t[r*3+1];return[new rt(o,s),new rt(a,c),new rt(l,u)]},generateSideWallUV:function(n,t,e,i,r,o){let s=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[i*3],u=t[i*3+1],h=t[i*3+2],d=t[r*3],p=t[r*3+1],f=t[r*3+2],x=t[o*3],m=t[o*3+1],g=t[o*3+2];return Math.abs(a-u)<Math.abs(s-l)?[new rt(s,1-c),new rt(l,1-h),new rt(d,1-f),new rt(x,1-g)]:[new rt(a,1-c),new rt(u,1-h),new rt(p,1-f),new rt(m,1-g)]}};function V0(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){let o=n[i];e.shapes.push(o.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var ar=class n extends Ze{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};let o=t/2,s=e/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,h=t/a,d=e/c,p=[],f=[],x=[],m=[];for(let g=0;g<u;g++){let M=g*d-s;for(let S=0;S<l;S++){let _=S*h-o;f.push(_,-M,0),x.push(0,0,1),m.push(S/a),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let M=0;M<a;M++){let S=M+l*g,_=M+l*(g+1),E=M+1+l*(g+1),A=M+1+l*g;p.push(S,_,A),p.push(_,E,A)}this.setIndex(p),this.setAttribute("position",new le(f,3)),this.setAttribute("normal",new le(x,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var Vo=class n extends Ze{constructor(t=1,e=32,i=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(s+a,Math.PI),l=0,u=[],h=new k,d=new k,p=[],f=[],x=[],m=[];for(let g=0;g<=i;g++){let M=[],S=g/i,_=s+S*a,E=t*Math.cos(_),A=Math.sqrt(t*t-E*E),y=0;g===0&&s===0?y=.5/e:g===i&&c===Math.PI&&(y=-.5/e);for(let w=0;w<=e;w++){let N=w/e,C=r+N*o;h.x=-A*Math.cos(C),h.y=E,h.z=A*Math.sin(C),f.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(N+y,1-S),M.push(l++)}u.push(M)}for(let g=0;g<i;g++)for(let M=0;M<e;M++){let S=u[g][M+1],_=u[g][M],E=u[g+1][M],A=u[g+1][M+1];(g!==0||s>0)&&p.push(S,_,A),(g!==i-1||c<Math.PI)&&p.push(_,E,A)}this.setIndex(p),this.setAttribute("position",new le(f,3)),this.setAttribute("normal",new le(x,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ho=class n extends Ze{constructor(t=1,e=.4,i=12,r=48,o=Math.PI*2,s=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:r,arc:o,thetaStart:s,thetaLength:a},i=Math.floor(i),r=Math.floor(r);let c=[],l=[],u=[],h=[],d=new k,p=new k,f=new k;for(let x=0;x<=i;x++){let m=s+x/i*a;for(let g=0;g<=r;g++){let M=g/r*o;p.x=(t+e*Math.cos(m))*Math.cos(M),p.y=(t+e*Math.cos(m))*Math.sin(M),p.z=e*Math.sin(m),l.push(p.x,p.y,p.z),d.x=t*Math.cos(M),d.y=t*Math.sin(M),f.subVectors(p,d).normalize(),u.push(f.x,f.y,f.z),h.push(g/r),h.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=r;m++){let g=(r+1)*x+m-1,M=(r+1)*(x-1)+m-1,S=(r+1)*(x-1)+m,_=(r+1)*x+m;c.push(g,M,_),c.push(M,S,_)}this.setIndex(c),this.setAttribute("position",new le(l,3)),this.setAttribute("normal",new le(u,3)),this.setAttribute("uv",new le(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var Wo=class extends zn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Vt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function pr(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let r=n[e][i];if(Nd(r))r.isRenderTargetTexture?(Ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone();else if(Array.isArray(r))if(Nd(r[0])){let o=[];for(let s=0,a=r.length;s<a;s++)o[s]=r[s].clone();t[e][i]=o}else t[e][i]=r.slice();else t[e][i]=r}}return t}function tn(n){let t={};for(let e=0;e<n.length;e++){let i=pr(n[e]);for(let r in i)t[r]=i[r]}return t}function Nd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function H0(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Bu(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var Rp={clone:pr,merge:tn},W0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Z0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Kn=class extends zn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=W0,this.fragmentShader=Z0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=pr(t.uniforms),this.uniformsGroups=H0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?e.uniforms[r]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[r]={type:"m4",value:s.toArray()}:e.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let r=t.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=e[r.value]||null;break;case"c":this.uniforms[i].value=new Vt().setHex(r.value);break;case"v2":this.uniforms[i].value=new rt().fromArray(r.value);break;case"v3":this.uniforms[i].value=new k().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Se().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ht().fromArray(r.value);break;case"m4":this.uniforms[i].value=new fe().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ua=class extends Kn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},mi=class extends zn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=us,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Zo=class extends mi{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new rt(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Vt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Vt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Vt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(t){this._diffuseRoughness>0!=t>0&&this.version++,this._diffuseRoughness=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}get iridescenceThicknessRange(){return er('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(t){er('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=t[0],this.iridescenceThicknessMaximum=t[1]}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.diffuseRoughness=t.diffuseRoughness,this.diffuseRoughnessMap=t.diffuseRoughnessMap,this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum,this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var jo=class extends zn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=us,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Ya,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},ka=class extends zn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Oa=class extends zn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Cr(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function sa(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Ii=class{constructor(t,e,i,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,r=e[i],o=e[i-1];n:{t:{let s;e:{i:if(!(t<r)){for(let a=i+2;;){if(r===void 0){if(t<o)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(o=r,r=e[++i],t<r)break t}s=e.length;break e}if(!(t>=o)){let a=e[1];t<a&&(i=2,o=a);for(let c=i-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=o,o=e[--i-1],t>=o)break t}s=i,i=0;break e}break n}for(;i<s;){let a=i+s>>>1;t<e[a]?s=a:i=a+1}if(r=e[i],o=e[i-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,o,r)}return this.interpolate_(i,o,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,r=this.valueSize,o=t*r;for(let s=0;s!==r;++s)e[s]=i[o+s];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Fa=class extends Ii{constructor(t,e,i,r){super(t,e,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tu,endingEnd:tu}}intervalChanged_(t,e,i){let r=this.parameterPositions,o=t-2,s=t+1,a=r[o],c=r[s];if(a===void 0)switch(this.getSettings_().endingStart){case eu:o=t,a=2*e-i;break;case nu:o=r.length-2,a=e+r[o]-r[o+1];break;default:o=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case eu:s=t,c=2*i-e;break;case nu:s=1,c=i+r[1]-r[0];break;default:s=t-1,c=e}let l=(i-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(t,e,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,f=(i-e)/(r-e),x=f*f,m=x*f,g=-d*m+2*d*x-d*f,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*f+1,S=(-1-p)*m+(1.5+p)*x+.5*f,_=p*m-p*x;for(let E=0;E!==a;++E)o[E]=g*s[u+E]+M*s[l+E]+S*s[c+E]+_*s[h+E];return o}},Ba=class extends Ii{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(i-e)/(r-e),h=1-u;for(let d=0;d!==a;++d)o[d]=s[l+d]*h+s[c+d]*u;return o}},za=class extends Ii{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t){return this.copySampleValue_(t-1)}},Ga=class extends Ii{interpolate_(t,e,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,h=this.outTangents;if(!u||!h){let f=(i-e)/(r-e),x=1-f;for(let m=0;m!==a;++m)o[m]=s[l+m]*x+s[c+m]*f;return o}let d=a*2,p=t-1;for(let f=0;f!==a;++f){let x=s[l+f],m=s[c+f],g=p*d+f*2,M=h[g],S=h[g+1],_=t*d+f*2,E=u[_],A=u[_+1],y=X0(i,e,M,E,r);o[f]=Pp(y,x,S,A,m)}return o}};function Pp(n,t,e,i,r){let o=1-n;return o*o*o*t+3*o*o*n*e+3*o*n*n*i+n*n*n*r}function j0(n,t,e,i,r){let o=1-n;return 3*o*o*(e-t)+6*o*n*(i-e)+3*n*n*(r-i)}function X0(n,t,e,i,r){let o=(n-t)/(r-t);for(let s=0;s<8;s++){let a=Pp(o,t,e,i,r)-n;if(Math.abs(a)<1e-10)break;let c=j0(o,t,e,i,r);if(Math.abs(c)<1e-10)break;o=Math.max(0,Math.min(1,o-a/c))}return o}var Mn=class{constructor(t,e,i,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Cr(e,this.TimeBufferType),this.values=Cr(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Cr(t.times,Array),values:Cr(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(i.interpolation=r),sa(t.settings)&&(i.settings={inTangents:Cr(t.settings.inTangents,Array),outTangents:Cr(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new za(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ba(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Fa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ga(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case xo:e=this.InterpolantFactoryMethodDiscrete;break;case va:e=this.InterpolantFactoryMethodLinear;break;case la:e=this.InterpolantFactoryMethodSmooth;break;case Ql:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ft("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xo;case this.InterpolantFactoryMethodLinear:return va;case this.InterpolantFactoryMethodSmooth:return la;case this.InterpolantFactoryMethodBezier:return Ql}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]+=t;sa(this.settings)&&(Dd(this.settings.inTangents,t),Dd(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]*=t;sa(this.settings)&&(Ud(this.settings.inTangents,t),Ud(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,r=i.length,o=0,s=r-1;for(;o!==r&&i[o]<t;)++o;for(;s!==-1&&i[s]>e;)--s;if(++s,o!==0||s!==r){o>=s&&(s=Math.max(s,1),o=s-1);let a=this.getValueSize();this.times=i.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(zt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,r=this.values,o=i.length;o===0&&(zt("KeyframeTrack: Track is empty.",this),t=!1);let s=null;for(let a=0;a!==o;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){zt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(s!==null&&s>c){zt("KeyframeTrack: Out of order keys.",this,a,c,s),t=!1;break}s=c}if(r!==void 0&&km(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){zt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===la,o=t.length-1,s=1;for(let a=1;a<o;++a){let c=!1,l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(r)c=!0;else{let h=a*i,d=h-i,p=h+i;for(let f=0;f!==i;++f){let x=e[h+f];if(x!==e[d+f]||x!==e[p+f]){c=!0;break}}}if(c){if(a!==s){t[s]=t[a];let h=a*i,d=s*i;for(let p=0;p!==i;++p)e[d+p]=e[h+p]}++s}}if(o>0){t[s]=t[o];for(let a=o*i,c=s*i,l=0;l!==i;++l)e[c+l]=e[a+l];++s}return s!==t.length?(this.times=t.slice(0,s),this.values=e.slice(0,s*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,r=new i(this.name,t,e);return r.createInterpolant=this.createInterpolant,sa(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Dd(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]+=t}function Ud(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Mn.prototype.ValueTypeName="";Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=va;var Li=class extends Mn{constructor(t,e,i){super(t,e,i)}};Li.prototype.ValueTypeName="bool";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=xo;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var Va=class extends Mn{constructor(t,e,i,r){super(t,e,i,r)}};Va.prototype.ValueTypeName="color";var Ha=class extends Mn{constructor(t,e,i,r){super(t,e,i,r)}};Ha.prototype.ValueTypeName="number";var Wa=class extends Ii{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=(i-e)/(r-e),l=t*a;for(let u=l+a;l!==u;l+=4)_n.slerpFlat(o,0,s,l-a,s,l,c);return o}},Xo=class extends Mn{constructor(t,e,i,r){super(t,e,i,r)}InterpolantFactoryMethodLinear(t){return new Wa(this.times,this.values,this.getValueSize(),t)}};Xo.prototype.ValueTypeName="quaternion";Xo.prototype.InterpolantFactoryMethodSmooth=void 0;var Ni=class extends Mn{constructor(t,e,i){super(t,e,i)}};Ni.prototype.ValueTypeName="string";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=xo;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Za=class extends Mn{constructor(t,e,i,r){super(t,e,i,r)}};Za.prototype.ValueTypeName="vector";var ja=class{constructor(t,e,i){let r=this,o=!1,s=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,o===!1&&r.onStart!==void 0&&r.onStart(u,s,a),o=!0},this.itemEnd=function(u){s++,r.onProgress!==void 0&&r.onProgress(u,s,a),s===a&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){let p=l[h],f=l[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return f}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ip=new ja,Xa=class{constructor(t){this.manager=t!==void 0?t:Ip,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(r,o){i.load(t,r,e,o)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Xa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vr=class extends Ne{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},qo=class extends Vr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Vt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Kl=new fe,kd=new k,Od=new k,$o=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ri,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;kd.setFromMatrixPosition(t.matrixWorld),e.position.copy(kd),Od.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Od),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,r){Kl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Kl,t.coordinateSystem,t.reversedDepth);let o=this._frameExtents,s=r?r.z/o.x:1,a=r?r.w/o.y:1,c=r?r.x/o.x:0,l=r?r.y/o.y:0;t.coordinateSystem===Nr||t.reversedDepth?e.set(.5*s,0,0,.5*s+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*s,0,0,.5*s+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Kl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},aa=new k,ca=new _n,qn=new k,Yo=class extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(aa,ca,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(aa,ca,qn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(aa,ca,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(aa,ca,qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ti=new k,Fd=new rt,Bd=new rt,Qe=class extends Yo{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ur*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(mo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ur*2*Math.atan(Math.tan(mo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ti.x,Ti.y).multiplyScalar(-t/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ti.x,Ti.y).multiplyScalar(-t/Ti.z)}getViewSize(t,e){return this.getViewBounds(t,Fd,Bd),e.subVectors(Bd,Fd)}setViewOffset(t,e,i,r,o,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(mo*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,o=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let c=s.fullWidth,l=s.fullHeight;o+=s.offsetX*r/c,e-=s.offsetY*i/l,r*=s.width/c,i*=s.height/l}let a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var au=class extends $o{constructor(){super(new Qe(90,1,.5,500)),this.isPointLightShadow=!0}},Jo=class extends Vr{constructor(t,e,i=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new au}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Ko=class extends Yo{constructor(t=-1,e=1,i=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,o=i-t,s=i+t,a=r+e,c=r-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,s=o+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},cu=class extends $o{constructor(){super(new Ko(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hr=class extends Vr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new cu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Rr=-90,Pr=1,Wr=class extends Ne{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Qe(Rr,Pr,t,e);r.layers=this.layers,this.add(r);let o=new Qe(Rr,Pr,t,e);o.layers=this.layers,this.add(o);let s=new Qe(Rr,Pr,t,e);s.layers=this.layers,this.add(s);let a=new Qe(Rr,Pr,t,e);a.layers=this.layers,this.add(a);let c=new Qe(Rr,Pr,t,e);c.layers=this.layers,this.add(c);let l=new Qe(Rr,Pr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,r,o,s,a,c]=e;for(let l of e)this.remove(l);if(t===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Nr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[o,s,a,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),f=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,1,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(i,2,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.mipmapsAutoUpdate=x,t.setRenderTarget(i,5,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(h,d,p),t.xr.enabled=f,i.texture.needsPMREMUpdate=!0}},qa=class extends Qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var zu="\\[\\]\\.:\\/",q0=new RegExp("["+zu+"]","g"),Gu="[^"+zu+"]",$0="[^"+zu.replace("\\.","")+"]",Y0=/((?:WC+[\/:])*)/.source.replace("WC",Gu),J0=/(WCOD+)?/.source.replace("WCOD",$0),K0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gu),Q0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gu),tg=new RegExp("^"+Y0+J0+K0+Q0+"$"),eg=["material","materials","bones","map"],lu=class{constructor(t,e,i){let r=i||ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=i.length;r!==o;++r)i[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},ve=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(q0,"")}static parseTrackName(t){let e=tg.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let o=i.nodeName.substring(r+1);eg.indexOf(o)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=o)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(o){for(let s=0;s<o.length;s++){let a=o[s];if(a.name===e||a.uuid===e)return a;let c=i(a.children);if(c)return c}return null},r=i(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)t[e++]=i[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,r=e.propertyName,o=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ft("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){zt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){zt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){zt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){zt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){zt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let s=t[r];if(s===void 0){let l=e.nodeName;zt("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}c=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=o}else s.fromArray!==void 0&&s.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(c=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ve.Composite=lu;ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ve.prototype.GetterByBindingType=[ve.prototype._getValue_direct,ve.prototype._getValue_array,ve.prototype._getValue_arrayElement,ve.prototype._getValue_toArray];ve.prototype.SetterByBindingTypeAndVersioning=[[ve.prototype._setValue_direct,ve.prototype._setValue_direct_setNeedsUpdate,ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_array,ve.prototype._setValue_array_setNeedsUpdate,ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_arrayElement,ve.prototype._setValue_arrayElement_setNeedsUpdate,ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_fromArray,ve.prototype._setValue_fromArray_setNeedsUpdate,ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var EM=new Float32Array(1);var Di=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var uu=class{static{this.prototype.isMatrix2=!0}constructor(t,e,i,r){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,r){let o=this.elements;return o[0]=t,o[2]=e,o[1]=i,o[3]=r,this}};var Qo=class extends Ca{constructor(t=10,e=10,i=4473924,r=8947848){i=new Vt(i),r=new Vt(r);let o=e/2,s=t/e,a=t/2,c=[],l=[];for(let d=0,p=0,f=-a;d<=e;d++,f+=s){c.push(-a,0,f,a,0,f),c.push(f,0,-a,f,0,a);let x=d===o?i:r;x.toArray(l,p),p+=3,x.toArray(l,p),p+=3,x.toArray(l,p),p+=3,x.toArray(l,p),p+=3}let u=new Ze;u.setAttribute("position",new le(c,3)),u.setAttribute("color",new le(l,3));let h=new rr({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};var ts=class extends Bn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Vu(n,t,e,i){let r=ng(i);switch(e){case Cu:return n*t;case ic:return n*t/r.components*r.byteLength;case rc:return n*t/r.components*r.byteLength;case Fi:return n*t*2/r.components*r.byteLength;case oc:return n*t*2/r.components*r.byteLength;case Ru:return n*t*3/r.components*r.byteLength;case Hn:return n*t*4/r.components*r.byteLength;case sc:return n*t*4/r.components*r.byteLength;case rs:case os:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ss:case as:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case cc:case uc:return Math.max(n,16)*Math.max(t,8)/4;case ac:case lc:return Math.max(n,8)*Math.max(t,8)/2;case hc:case dc:case fc:case mc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case pc:case cs:case gc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case yc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case _c:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case xc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case vc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Mc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Sc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case bc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case wc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ac:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ec:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Tc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Cc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Rc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Pc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ic:case Lc:case Nc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Dc:case Uc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case ls:case kc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ng(n){switch(n){case un:case wu:return{byteLength:1,components:1};case qr:case Au:case Vn:return{byteLength:2,components:1};case ec:case nc:return{byteLength:2,components:4};case Gn:case tc:case Pn:return{byteLength:4,components:1};case Eu:case Tu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Qp(){let n=null,t=!1,e=null,i=null;function r(o,s){i=n.requestAnimationFrame(r),e(o,s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){n=o}}}function rg(n){let t=new WeakMap;function e(a,c){let l=a.array,u=a.usage,h=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,c,l){let u=c.array,h=c.updateRanges;if(n.bindBuffer(l,a),h.length===0)n.bufferSubData(l,0,u);else{h.sort((p,f)=>p.start-f.start);let d=0;for(let p=1;p<h.length;p++){let f=h[d],x=h[p];x.start<=f.start+f.count+1?f.count=Math.max(f.count,x.start+x.count-f.start):(++d,h[d]=x)}h.length=d+1;for(let p=0,f=h.length;p<f;p++){let x=h[p];n.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function s(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:o,update:s}}var og=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ag=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ug=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,fg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_g=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Cg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Rg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ig=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ng=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ug=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Og=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Fg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Bg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Gg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$g=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Yg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Jg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ty=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ey=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ny=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,iy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ry=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,oy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sy=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ay=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ly=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,py=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,my=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_y=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,My=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,by=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ay=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ey=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ty=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ry=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Py=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Iy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ly=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ny=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Dy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ky=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Oy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,By=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Gy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Hy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$y=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ky=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Qy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,t_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,e_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,n_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,i_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,r_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,o_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a_=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,h_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,d_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,p_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,f_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,m_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,__=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,x_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,b_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,A_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,E_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,R_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,N_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,D_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,k_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,O_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jt={alphahash_fragment:og,alphahash_pars_fragment:sg,alphamap_fragment:ag,alphamap_pars_fragment:cg,alphatest_fragment:lg,alphatest_pars_fragment:ug,aomap_fragment:hg,aomap_pars_fragment:dg,batching_pars_vertex:pg,batching_vertex:fg,begin_vertex:mg,beginnormal_vertex:gg,bsdfs:yg,iridescence_fragment:_g,bumpmap_pars_fragment:xg,clipping_planes_fragment:vg,clipping_planes_pars_fragment:Mg,clipping_planes_pars_vertex:Sg,clipping_planes_vertex:bg,color_fragment:wg,color_pars_fragment:Ag,color_pars_vertex:Eg,color_vertex:Tg,common:Cg,defaultnormal_vertex:Rg,displacementmap_pars_vertex:Pg,displacementmap_vertex:Ig,emissivemap_fragment:Lg,emissivemap_pars_fragment:Ng,colorspace_fragment:Dg,colorspace_pars_fragment:Ug,envmap_fragment:kg,envmap_common_pars_fragment:Og,envmap_pars_fragment:Fg,envmap_pars_vertex:Bg,envmap_physical_pars_fragment:Yg,envmap_vertex:zg,fog_vertex:Gg,fog_pars_vertex:Vg,fog_fragment:Hg,fog_pars_fragment:Wg,gradientmap_pars_fragment:Zg,lightmap_pars_fragment:jg,lights_lambert_fragment:Xg,lights_lambert_pars_fragment:qg,lights_pars_begin:$g,lights_toon_fragment:Jg,lights_toon_pars_fragment:Kg,lights_phong_fragment:Qg,lights_phong_pars_fragment:ty,lights_physical_fragment:ey,lights_physical_pars_fragment:ny,lights_fragment_begin:iy,lights_fragment_maps:ry,lights_fragment_end:oy,lightprobes_pars_fragment:sy,logdepthbuf_fragment:ay,logdepthbuf_pars_fragment:cy,logdepthbuf_pars_vertex:ly,logdepthbuf_vertex:uy,map_fragment:hy,map_pars_fragment:dy,map_particle_fragment:py,map_particle_pars_fragment:fy,metalnessmap_fragment:my,metalnessmap_pars_fragment:gy,morphinstance_vertex:yy,morphcolor_vertex:_y,morphnormal_vertex:xy,morphtarget_pars_vertex:vy,morphtarget_vertex:My,normal_fragment_begin:Sy,normal_fragment_maps:by,normal_pars_fragment:wy,normal_pars_vertex:Ay,normal_vertex:Ey,normalmap_pars_fragment:Ty,clearcoat_normal_fragment_begin:Cy,clearcoat_normal_fragment_maps:Ry,clearcoat_pars_fragment:Py,iridescence_pars_fragment:Iy,opaque_fragment:Ly,packing:Ny,premultiplied_alpha_fragment:Dy,project_vertex:Uy,dithering_fragment:ky,dithering_pars_fragment:Oy,roughnessmap_fragment:Fy,roughnessmap_pars_fragment:By,shadowmap_pars_fragment:zy,shadowmap_pars_vertex:Gy,shadowmap_vertex:Vy,shadowmask_pars_fragment:Hy,skinbase_vertex:Wy,skinning_pars_vertex:Zy,skinning_vertex:jy,skinnormal_vertex:Xy,specularmap_fragment:qy,specularmap_pars_fragment:$y,tonemapping_fragment:Yy,tonemapping_pars_fragment:Jy,transmission_fragment:Ky,transmission_pars_fragment:Qy,uv_pars_fragment:t_,uv_pars_vertex:e_,uv_vertex:n_,worldpos_vertex:i_,background_vert:r_,background_frag:o_,backgroundCube_vert:s_,backgroundCube_frag:a_,cube_vert:c_,cube_frag:l_,depth_vert:u_,depth_frag:h_,distance_vert:d_,distance_frag:p_,equirect_vert:f_,equirect_frag:m_,linedashed_vert:g_,linedashed_frag:y_,meshbasic_vert:__,meshbasic_frag:x_,meshlambert_vert:v_,meshlambert_frag:M_,meshmatcap_vert:S_,meshmatcap_frag:b_,meshnormal_vert:w_,meshnormal_frag:A_,meshphong_vert:E_,meshphong_frag:T_,meshphysical_vert:C_,meshphysical_frag:R_,meshtoon_vert:P_,meshtoon_frag:I_,points_vert:L_,points_frag:N_,shadow_vert:D_,shadow_frag:U_,sprite_vert:k_,sprite_frag:O_},St={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},ni={basic:{uniforms:tn([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:tn([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Vt(0)},envMapIntensity:{value:1}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:tn([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:tn([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:tn([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:tn([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:tn([St.points,St.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:tn([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:tn([St.common,St.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:tn([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:tn([St.sprite,St.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distance:{uniforms:tn([St.common,St.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distance_vert,fragmentShader:Jt.distance_frag},shadow:{uniforms:tn([St.lights,St.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};ni.physical={uniforms:tn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ht},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var Oc={r:0,b:0,g:0},F_=new fe,tf=new Ht;tf.set(-1,0,0,0,1,0,0,0,1);function B_(n,t,e,i,r,o){let s=new Vt(0),a=r===!0?0:1,c,l,u=null,h=0,d=null;function p(M){let S=M.isScene===!0?M.background:null;if(S&&S.isTexture){let _=M.backgroundBlurriness>0;S=t.get(S,_)}return S}function f(M){let S=!1,_=p(M);_===null?m(s,a):_&&_.isColor&&(m(_,1),S=!0);let E=n.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,S){let _=p(S);_&&_.isCubeTexture?(l===void 0&&(l=new be(new Jn(1,1,1),new Kn({name:"BackgroundCubeMaterial",uniforms:pr(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,A,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(F_.makeRotationFromEuler(S.backgroundRotation)).transpose(),_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(tf),l.material.toneMapped=oe.getTransfer(_.colorSpace)!==de,(u!==_||h!==_.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=_,h=_.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new be(new ar(2,2),new Kn({name:"BackgroundMaterial",uniforms:pr(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=oe.getTransfer(_.colorSpace)!==de,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||h!==_.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=_,h=_.version,d=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,S){M.getRGB(Oc,Bu(n)),e.buffers.color.setClear(Oc.r,Oc.g,Oc.b,S,o)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(M,S=1){s.set(M),a=S,m(s,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(s,a)},render:f,addToRenderList:x,dispose:g}}function z_(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),o=r,s=!1;function a(R,O,z,P,I){let F=!1,B=h(R,P,z,O);o!==B&&(o=B,l(o.object)),F=p(R,P,z,I),F&&f(R,P,z,I),I!==null&&t.update(I,n.ELEMENT_ARRAY_BUFFER),(F||s)&&(s=!1,_(R,O,z,P),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function c(){return n.createVertexArray()}function l(R){return n.bindVertexArray(R)}function u(R){return n.deleteVertexArray(R)}function h(R,O,z,P){let I=P.wireframe===!0,F=i[O.id];F===void 0&&(F={},i[O.id]=F);let B=R.isInstancedMesh===!0?R.id:0,et=F[B];et===void 0&&(et={},F[B]=et);let W=et[z.id];W===void 0&&(W={},et[z.id]=W);let J=W[I];return J===void 0&&(J=d(c()),W[I]=J),J}function d(R){let O=[],z=[],P=[];for(let I=0;I<e;I++)O[I]=0,z[I]=0,P[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:z,attributeDivisors:P,object:R,attributes:{},index:null}}function p(R,O,z,P){let I=o.attributes,F=O.attributes,B=0,et=z.getAttributes();for(let W in et)if(et[W].location>=0){let K=I[W],bt=F[W];if(bt===void 0&&(W==="instanceMatrix"&&R.instanceMatrix&&(bt=R.instanceMatrix),W==="instanceColor"&&R.instanceColor&&(bt=R.instanceColor)),K===void 0||K.attribute!==bt||bt&&K.data!==bt.data)return!0;B++}return o.attributesNum!==B||o.index!==P}function f(R,O,z,P){let I={},F=O.attributes,B=0,et=z.getAttributes();for(let W in et)if(et[W].location>=0){let K=F[W];K===void 0&&(W==="instanceMatrix"&&R.instanceMatrix&&(K=R.instanceMatrix),W==="instanceColor"&&R.instanceColor&&(K=R.instanceColor));let bt={};bt.attribute=K,K&&K.data&&(bt.data=K.data),I[W]=bt,B++}o.attributes=I,o.attributesNum=B,o.index=P}function x(){let R=o.newAttributes;for(let O=0,z=R.length;O<z;O++)R[O]=0}function m(R){g(R,0)}function g(R,O){let z=o.newAttributes,P=o.enabledAttributes,I=o.attributeDivisors;z[R]=1,P[R]===0&&(n.enableVertexAttribArray(R),P[R]=1),I[R]!==O&&(n.vertexAttribDivisor(R,O),I[R]=O)}function M(){let R=o.newAttributes,O=o.enabledAttributes;for(let z=0,P=O.length;z<P;z++)O[z]!==R[z]&&(n.disableVertexAttribArray(z),O[z]=0)}function S(R,O,z,P,I,F,B){B===!0?n.vertexAttribIPointer(R,O,z,I,F):n.vertexAttribPointer(R,O,z,P,I,F)}function _(R,O,z,P){x();let I=P.attributes,F=z.getAttributes(),B=O.defaultAttributeValues;for(let et in F){let W=F[et];if(W.location>=0){let J=I[et];if(J===void 0&&(et==="instanceMatrix"&&R.instanceMatrix&&(J=R.instanceMatrix),et==="instanceColor"&&R.instanceColor&&(J=R.instanceColor)),J!==void 0){let K=J.normalized,bt=J.itemSize,Pt=t.get(J);if(Pt===void 0)continue;let X=Pt.buffer,at=Pt.type,Et=Pt.bytesPerElement,Ut=at===n.INT||at===n.UNSIGNED_INT||J.gpuType===tc;if(J.isInterleavedBufferAttribute){let vt=J.data,kt=vt.isInterleavedBuffer===!0?vt.stride:vt.itemSize,xe=J.offset;if(vt.isInstancedInterleavedBuffer||vt.isInstancedBufferAttribute){for(let Bt=0;Bt<W.locationSize;Bt++)g(W.location+Bt,vt.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let Bt=0;Bt<W.locationSize;Bt++)m(W.location+Bt);n.bindBuffer(n.ARRAY_BUFFER,X);for(let Bt=0;Bt<W.locationSize;Bt++)S(W.location+Bt,bt/W.locationSize,at,K,kt*Et,(xe+bt/W.locationSize*Bt)*Et,Ut)}else{if(J.isInstancedBufferAttribute){for(let vt=0;vt<W.locationSize;vt++)g(W.location+vt,J.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let vt=0;vt<W.locationSize;vt++)m(W.location+vt);n.bindBuffer(n.ARRAY_BUFFER,X);for(let vt=0;vt<W.locationSize;vt++)S(W.location+vt,bt/W.locationSize,at,K,bt*Et,bt/W.locationSize*vt*Et,Ut)}}else if(B!==void 0){let K=B[et];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(W.location,K);break;case 3:n.vertexAttrib3fv(W.location,K);break;case 4:n.vertexAttrib4fv(W.location,K);break;default:n.vertexAttrib1fv(W.location,K)}}}}M()}function E(){N();for(let R in i){let O=i[R];for(let z in O){let P=O[z];for(let I in P){let F=P[I];for(let B in F)u(F[B].object),delete F[B];delete P[I]}}delete i[R]}}function A(R){if(i[R.id]===void 0)return;let O=i[R.id];for(let z in O){let P=O[z];for(let I in P){let F=P[I];for(let B in F)u(F[B].object),delete F[B];delete P[I]}}delete i[R.id]}function y(R){for(let O in i){let z=i[O];for(let P in z){let I=z[P];if(I[R.id]===void 0)continue;let F=I[R.id];for(let B in F)u(F[B].object),delete F[B];delete I[R.id]}}}function w(R){for(let O in i){let z=i[O],P=R.isInstancedMesh===!0?R.id:0,I=z[P];if(I!==void 0){for(let F in I){let B=I[F];for(let et in B)u(B[et].object),delete B[et];delete I[F]}delete z[P],Object.keys(z).length===0&&delete i[O]}}}function N(){C(),s=!0,o!==r&&(o=r,l(o.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:N,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfObject:w,releaseStatesOfProgram:y,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function G_(n,t,e){let i;function r(c){i=c}function o(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function s(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let p=0;p<u;p++)d+=l[p];e.update(d,i,1)}this.setMode=r,this.render=o,this.renderInstances=s,this.renderMultiDraw=a}function V_(n,t,e,i){let r;function o(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let y=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(y){return!(y!==Hn&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){let w=y===Vn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(y!==un&&y!==Pn&&!w&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(Ft("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&h===!1;e.reversedDepthBuffer===!0&&h===!1&&Ft("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&h===!0&&Ft("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:f,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:_,maxSamples:E,samples:A}}function H_(n){let t=this,e=null,i=0,r=!1,o=!1,s=new yn,a=new Ht,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,p){let f=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,g=n.get(h);if(!r||f===null||f.length===0||o&&!m)o?u(null):l();else{let M=o?0:i,S=M*4,_=g.clippingState||null;c.value=_,_=u(f,d,S,p);for(let E=0;E!==S;++E)_[E]=e[E];g.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,d,p,f){let x=h!==null?h.length:0,m=null;if(x!==0){if(m=c.value,f!==!0||m===null){let g=p+x*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<g)&&(m=new Float32Array(g));for(let S=0,_=p;S!==x;++S,_+=4)s.copy(h[S]).applyMatrix4(M,a),s.normal.toArray(m,_),m[_+3]=s.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var fs=class extends xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Po(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Jn(5,5,5),o=new Kn({name:"CubemapFromEquirect",uniforms:pr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qe,blending:cr});o.uniforms.tEquirect.value=e;let s=new be(r,o),a=e.minFilter;return e.minFilter===gi&&(e.minFilter=rn),new Wr(1,10,this).update(t,s),e.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){let o=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,i,r);t.setRenderTarget(o)}},Lp=256,W_=3,Z_=20,ef=256,nf=16,j_=3,X_=new k,q_=new Vt,Yr=class n{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Wr(1,10,null),this._boxMesh=new be(new Jn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,i=.1,r=100,o={}){let{size:s=256,position:a=X_}=o,c=this._renderer;this._setSize(s);let l=this._allocateTarget(),u=this._getSourceTarget(!0);e>0&&(u.texture.mipmapsAutoUpdate=!1);let h=c.autoClear,d=c.autoClearColor,p=c.autoClearDepth,f=c.autoClearStencil,x=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(t.background=c.getClearColor(q_));let m=new Wr(i,r,u);return m.position.copy(a),m.update(c,t),c.autoClear=h,c.autoClearColor=d,c.autoClearDepth=p,c.autoClearStencil=f,t.background=x,e>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Up(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Lp,ku(t))}_fromTexture(t,e){t.mapping===ur||t.mapping===Xr?this._setSize(t.image.length===0?Lp:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,e=Np(t,!1,!1),i=Math.log2(t)-W_;for(let r=0;r<=i;r++)e.texture.mipmaps.push({width:t>>r,height:t>>r});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==e||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Np(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,i){let r=this._boxMesh,o=this._cubeCamera;r.material=i,o.renderTarget=t,o.activeMipmapLevel=e;let s=t.width>>e;t.viewport.set(0,0,s,s),o.update(this._renderer,r),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===ur||t.mapping===Xr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Up()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Dp()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=$_(),this._integrationMaterial=Y_());let e=this._cubeSize,i=t.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;let o=this._integrationMaterial.uniforms;o.envMap.value=this._sourceTarget.texture,o.sourceLod.value=Math.log2(e/nf);for(let s=0;s<=i;s++){let a=n.lodToRoughness(s,i);if(s>i-j_)o.roughness.value=a,this._renderCube(t,s,this._integrationMaterial);else{let c=a>0?Math.log2(e)+.5*Math.log2(6/(ef*Math.pow(a,4)))+.5:0;r.roughness.value=a,r.lodBias.value=c,this._renderCube(t,s,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=J_());let i=this._blurMaterial,r=i.uniforms,o=this._sourceTarget;r.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,r.envMap.value=o.texture,this._renderCube(t,0,i),r.envMap.value=t.texture,this._renderCube(o,0,i)}};function Np(n,t,e){return new fs(n,{minFilter:gi,generateMipmaps:t,type:Vn,colorSpace:vo,depthBuffer:e})}function ms(n,t,e){return new Kn({name:n,uniforms:t,vertexShader:Jt.cube_vert,fragmentShader:e,side:qe,blending:cr,depthTest:!1,depthWrite:!1})}function $_(){return ms("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ef}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Y_(){return ms("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:nf}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function J_(){return ms("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Z_}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Dp(){return ms("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Up(){return ms("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function K_(n){let t=new WeakMap,e=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?s(d):o(d)}function o(d){if(d&&d.isTexture){let p=d.mapping;if(p===Ja||p===Ka)if(t.has(d)){let f=t.get(d).texture;return a(f,d.mapping)}else{let f=d.image;if(f&&f.height>0){let x=new fs(f.height);return x.fromEquirectangularTexture(n,d),t.set(d,x),d.addEventListener("dispose",l),a(x.texture,d.mapping)}else return null}}return d}function s(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let p=d.mapping,f=p===Ja||p===Ka,x=p===ur||p===Xr;if(f||x){let m=e.get(d),g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new Yr(n)),m=f?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{let M=d.image;return f&&M&&M.height>0||x&&M&&c(M)?(i===null&&(i=new Yr(n)),m=f?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function a(d,p){return p===Ja?d.mapping=ur:p===Ka&&(d.mapping=Xr),d}function c(d){let p=0,f=6;for(let x=0;x<f;x++)d[x]!==void 0&&p++;return p===f}function l(d){let p=d.target;p.removeEventListener("dispose",l);let f=t.get(p);f!==void 0&&(t.delete(p),f.dispose())}function u(d){let p=d.target;p.removeEventListener("dispose",u);let f=e.get(p);f!==void 0&&(e.delete(p),f.dispose())}function h(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Q_(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let r=n.getExtension(i);return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let r=e(i);return r===null&&er("WebGLRenderer: "+i+" extension not supported."),r}}}function t1(n,t,e,i){let r={},o=new WeakMap,s=new FinalizationRegistry(f=>delete r[f]);function a(f){c(f.target)}function c(f){f.index!==null&&t.remove(f.index);for(let m in f.attributes)t.remove(f.attributes[m]);f.removeEventListener("dispose",a),delete r[f.id],s.unregister(f);let x=o.get(f);x&&(t.remove(x),o.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function l(f,x){return r[x.id]!==void 0||(x.addEventListener("dispose",a),r[x.id]=new WeakRef(x),s.register(x,x.id,x),e.memory.geometries++),x}function u(f){let x=f.attributes;for(let m in x)t.update(x[m],n.ARRAY_BUFFER)}function h(f){let x=f.index,m=f.attributes.position,g=0;if(m===void 0)return;let M=x!==null?x.array.length:m.array.length/3-1,S=m.count>=65535?Eo:Ao,_=new S(Math.ceil(M/3)*6,1),E=_.array;if(x!==null){let y=x.array;g=x.version;for(let w=0,N=0;w<M;w+=3){let C=y[w+0],R=y[w+1],O=y[w+2];E[N++]=C,E[N++]=R,E[N++]=R,E[N++]=O,E[N++]=O,E[N++]=C}}else{g=m.version;for(let y=0,w=0;y<M;y+=3){let N=y+0,C=y+1,R=y+2;E[w++]=N,E[w++]=C,E[w++]=C,E[w++]=R,E[w++]=R,E[w++]=N}}_.version=g;let A=o.get(f);A&&t.remove(A),o.set(f,_)}function d(f){let x=o.get(f);if(x){let m=f.index;m!==null&&x.version<m.version&&h(f)}else h(f);return o.get(f)}function p(){for(let f in r){let x=r[f].deref();x!==void 0&&c(x)}}return{get:l,update:u,getWireframeAttribute:d,dispose:p}}function e1(n,t,e){let i;function r(h){i=h}let o,s;function a(h){o=h.type,s=h.bytesPerElement}function c(h,d){n.drawElements(i,d,o,h*s),e.update(d,i,1)}function l(h,d,p){p!==0&&(n.drawElementsInstanced(i,d,o,h*s,p),e.update(d,i,p))}function u(h,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,o,h,0,p);let x=0;for(let m=0;m<p;m++)x+=d[m];e.update(x,i,1)}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function n1(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,s,a){switch(e.calls++,s){case n.TRIANGLES:e.triangles+=a*(o/3);break;case n.LINES:e.lines+=a*(o/2);break;case n.LINE_STRIP:e.lines+=a*(o-1);break;case n.LINE_LOOP:e.lines+=a*o;break;case n.POINTS:e.points+=a*o;break;default:zt("WebGLInfo: Unknown draw mode:",s);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function i1(n,t,e){let i=new WeakMap,r=new Se;function o(s,a,c){let l=s.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=i.get(a);if(d===void 0||d.count!==h){let N=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",N)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,f=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],S=0;p===!0&&(S=1),f===!0&&(S=2),x===!0&&(S=3);let _=a.attributes.position.count*S,E=1;_>t.maxTextureSize&&(E=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let A=new Float32Array(_*E*4*h),y=new bo(A,_,E,h);y.type=Pn,y.needsUpdate=!0;let w=S*4;for(let C=0;C<h;C++){let R=m[C],O=g[C],z=M[C],P=_*E*4*C;for(let I=0;I<R.count;I++){let F=I*w;p===!0&&(r.fromBufferAttribute(R,I),A[P+F+0]=r.x,A[P+F+1]=r.y,A[P+F+2]=r.z,A[P+F+3]=0),f===!0&&(r.fromBufferAttribute(O,I),A[P+F+4]=r.x,A[P+F+5]=r.y,A[P+F+6]=r.z,A[P+F+7]=0),x===!0&&(r.fromBufferAttribute(z,I),A[P+F+8]=r.x,A[P+F+9]=r.y,A[P+F+10]=r.z,A[P+F+11]=z.itemSize===4?r.w:1)}}d={count:h,texture:y,size:new rt(_,E)},i.set(a,d),a.addEventListener("dispose",N)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,e);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let f=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",f),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:o}}function r1(n,t,e,i,r){let o=new WeakMap;function s(l){let u=r.render.frame,h=l.geometry,d=t.get(l,h);if(o.get(d)!==u&&(t.update(d),o.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),o.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),o.set(l,u))),l.isSkinnedMesh){let p=l.skeleton;o.get(p)!==u&&(p.update(),o.set(p,u))}return d}function a(){o=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:s,dispose:a}}var o1={[yu]:"LINEAR_TONE_MAPPING",[_u]:"REINHARD_TONE_MAPPING",[xu]:"CINEON_TONE_MAPPING",[ns]:"ACES_FILMIC_TONE_MAPPING",[Mu]:"AGX_TONE_MAPPING",[Su]:"NEUTRAL_TONE_MAPPING",[vu]:"CUSTOM_TONE_MAPPING"};function s1(n,t,e,i,r,o){let s=new xn(t,e,{type:n,depthBuffer:r,stencilBuffer:o,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,u=new Ze;u.setAttribute("position",new le([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new le([0,2,0,0,2,0],2));let h=new Ua({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new be(u,h),p=new Ko(-1,1,1,-1,0,1),f=null,x=null,m=!1,g,M=null,S=[],_=!1;this.setSize=function(E,A){s.setSize(E,A),a!==null&&a.setSize(E,A),c!==null&&c.setSize(E,A);for(let y=0;y<S.length;y++){let w=S[y];w.setSize&&w.setSize(E,A)}},this.setEffects=function(E){S=E,_=S.length>0&&S[0].isRenderPass===!0;let A=s.width,y=s.height;S.length>0&&a===null&&(a=new xn(A,y,{type:Vn,depthBuffer:!1,stencilBuffer:!1}),c=new xn(A,y,{type:Vn,depthBuffer:!1,stencilBuffer:!1}));let w=r===!0&&S.some(N=>N.needsDepthTexture===!0);w!==(s.depthTexture!==null)&&(w===!0&&l===null&&(l=new fi(A,y),o===!0&&(l.format=yi,l.type=hr)),s.dispose(),s.depthTexture=w?l:null,s.resolveDepthBuffer=w,s.storeMultisampledDepthBuffer=w);for(let N=0;N<S.length;N++){let C=S[N];C.setSize&&C.setSize(A,y),w&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(l)}},this.begin=function(E,A){if(m||E.toneMapping===ti&&S.length===0)return!1;if(M=A,A!==null){let y=A.width,w=A.height;(s.width!==y||s.height!==w)&&this.setSize(y,w)}return _===!1&&E.setRenderTarget(s),g=E.toneMapping,E.toneMapping=ti,!0},this.hasRenderPass=function(){return _},this.end=function(E,A){E.toneMapping=g,m=!0;let y=s,w=a;for(let N=0;N<S.length;N++){let C=S[N];C.enabled!==!1&&(C.render(E,w,y,A),C.needsSwap!==!1&&(y=w,w=w===a?c:a))}if(f!==E.outputColorSpace||x!==E.toneMapping){f=E.outputColorSpace,x=E.toneMapping,h.defines={},oe.getTransfer(f)===de&&(h.defines.SRGB_TRANSFER="");let N=o1[x];N&&(h.defines[N]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=y.texture,E.setRenderTarget(M),E.render(d,p),M=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){s.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),u.dispose(),h.dispose()}}var rf=new ln,of=new fi(1,1),sf=new Io(1),af=new bo,cf=new ba,lf=new Po,kp=[],Op=[],Fp=new Float32Array(16),Bp=new Float32Array(9),zp=new Float32Array(4);function Jr(n,t,e){let i=n[0];if(i<=0||i>0)return n;let r=t*e,o=kp[r];if(o===void 0&&(o=new Float32Array(r),kp[r]=o),t!==0){i.toArray(o,0);for(let s=1,a=0;s!==t;++s)a+=e,n[s].toArray(o,a)}return o}function De(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ue(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function zc(n,t){let e=Op[t];e===void 0&&(e=new Int32Array(t),Op[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function a1(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function c1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;n.uniform2fv(this.addr,t),Ue(e,t)}}function l1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(De(e,t))return;n.uniform3fv(this.addr,t),Ue(e,t)}}function u1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;n.uniform4fv(this.addr,t),Ue(e,t)}}function h1(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(De(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(De(e,i))return;zp.set(i),n.uniformMatrix2fv(this.addr,!1,zp),Ue(e,i)}}function d1(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(De(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(De(e,i))return;Bp.set(i),n.uniformMatrix3fv(this.addr,!1,Bp),Ue(e,i)}}function p1(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(De(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(De(e,i))return;Fp.set(i),n.uniformMatrix4fv(this.addr,!1,Fp),Ue(e,i)}}function f1(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function m1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;n.uniform2iv(this.addr,t),Ue(e,t)}}function g1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;n.uniform3iv(this.addr,t),Ue(e,t)}}function y1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;n.uniform4iv(this.addr,t),Ue(e,t)}}function _1(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function x1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;n.uniform2uiv(this.addr,t),Ue(e,t)}}function v1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;n.uniform3uiv(this.addr,t),Ue(e,t)}}function M1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;n.uniform4uiv(this.addr,t),Ue(e,t)}}function Gc(n){return n.version===0&&(n.compareFunction=Lu,n.needsUpdate=!0),n}function S1(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let o;this.type===n.SAMPLER_2D_SHADOW?o=Gc(of):o=rf,e.setTexture2D(t||o,r)}function b1(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||cf,r)}function w1(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let o;this.type===n.SAMPLER_CUBE_SHADOW?o=Gc(sf):o=lf,e.setTextureCube(t||o,r)}function A1(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||af,r)}function E1(n){switch(n){case 5126:return a1;case 35664:return c1;case 35665:return l1;case 35666:return u1;case 35674:return h1;case 35675:return d1;case 35676:return p1;case 5124:case 35670:return f1;case 35667:case 35671:return m1;case 35668:case 35672:return g1;case 35669:case 35673:return y1;case 5125:return _1;case 36294:return x1;case 36295:return v1;case 36296:return M1;case 35678:case 36198:case 36298:case 36306:case 35682:return S1;case 35679:case 36299:case 36307:return b1;case 35680:case 36300:case 36308:case 36293:return w1;case 36289:case 36303:case 36311:case 36292:return A1}}function T1(n,t){n.uniform1fv(this.addr,t)}function C1(n,t){let e=Jr(t,this.size,2);n.uniform2fv(this.addr,e)}function R1(n,t){let e=Jr(t,this.size,3);n.uniform3fv(this.addr,e)}function P1(n,t){let e=Jr(t,this.size,4);n.uniform4fv(this.addr,e)}function I1(n,t){let e=Jr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function L1(n,t){let e=Jr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function N1(n,t){let e=Jr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function D1(n,t){n.uniform1iv(this.addr,t)}function U1(n,t){n.uniform2iv(this.addr,t)}function k1(n,t){n.uniform3iv(this.addr,t)}function O1(n,t){n.uniform4iv(this.addr,t)}function F1(n,t){n.uniform1uiv(this.addr,t)}function B1(n,t){n.uniform2uiv(this.addr,t)}function z1(n,t){n.uniform3uiv(this.addr,t)}function G1(n,t){n.uniform4uiv(this.addr,t)}function V1(n,t,e){let i=this.cache,r=t.length,o=zc(e,r);De(i,o)||(n.uniform1iv(this.addr,o),Ue(i,o));let s;this.type===n.SAMPLER_2D_SHADOW?s=Gc(of):s=rf;for(let a=0;a!==r;++a)e.setTexture2D(t[a]||s,o[a])}function H1(n,t,e){let i=this.cache,r=t.length,o=zc(e,r);De(i,o)||(n.uniform1iv(this.addr,o),Ue(i,o));for(let s=0;s!==r;++s)e.setTexture3D(t[s]||cf,o[s])}function W1(n,t,e){let i=this.cache,r=t.length,o=zc(e,r);De(i,o)||(n.uniform1iv(this.addr,o),Ue(i,o));let s;this.type===n.SAMPLER_CUBE_SHADOW?s=Gc(sf):s=lf;for(let a=0;a!==r;++a)e.setTextureCube(t[a]||s,o[a])}function Z1(n,t,e){let i=this.cache,r=t.length,o=zc(e,r);De(i,o)||(n.uniform1iv(this.addr,o),Ue(i,o));for(let s=0;s!==r;++s)e.setTexture2DArray(t[s]||af,o[s])}function j1(n){switch(n){case 5126:return T1;case 35664:return C1;case 35665:return R1;case 35666:return P1;case 35674:return I1;case 35675:return L1;case 35676:return N1;case 5124:case 35670:return D1;case 35667:case 35671:return U1;case 35668:case 35672:return k1;case 35669:case 35673:return O1;case 5125:return F1;case 36294:return B1;case 36295:return z1;case 36296:return G1;case 35678:case 36198:case 36298:case 36306:case 35682:return V1;case 35679:case 36299:case 36307:return H1;case 35680:case 36300:case 36308:case 36293:return W1;case 36289:case 36303:case 36311:case 36292:return Z1}}var Zu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=E1(e.type)}},ju=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=j1(e.type)}},Xu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let r=this.seq;for(let o=0,s=r.length;o!==s;++o){let a=r[o];a.setValue(t,e[a.id],i)}}},Hu=/(\w+)(\])?(\[|\.)?/g;function Gp(n,t){n.seq.push(t),n.map[t.id]=t}function X1(n,t,e){let i=n.name,r=i.length;for(Hu.lastIndex=0;;){let o=Hu.exec(i),s=Hu.lastIndex,a=o[1],c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&s+2===r){Gp(e,l===void 0?new Zu(a,n,t):new ju(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new Xu(a),Gp(e,h)),e=h}}}var $r=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let a=t.getActiveUniform(e,s),c=t.getUniformLocation(e,a.name);X1(a,c,this)}let r=[],o=[];for(let s of this.seq)s.type===t.SAMPLER_2D_SHADOW||s.type===t.SAMPLER_CUBE_SHADOW||s.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(s):o.push(s);r.length>0&&(this.seq=r.concat(o))}setValue(t,e,i,r){let o=this.map[e];o!==void 0&&o.setValue(t,i,r)}setOptional(t,e,i){let r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let o=0,s=e.length;o!==s;++o){let a=e[o],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,e){let i=[];for(let r=0,o=t.length;r!==o;++r){let s=t[r];s.id in e&&i.push(s)}return i}};function Vp(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var q1=37297,$1=0;function Y1(n,t){let e=n.split(`
`),i=[],r=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let s=r;s<o;s++){let a=s+1;i.push(`${a===t?">":" "} ${a}: ${e[s]}`)}return i.join(`
`)}var Hp=new Ht;function J1(n){oe._getMatrix(Hp,oe.workingColorSpace,n);let t=`mat3( ${Hp.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(n)){case Mo:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return Ft("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Wp(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),o=(n.getShaderInfoLog(t)||"").trim();if(i&&o==="")return"";let s=/ERROR: 0:(\d+)/.exec(o);if(s){let a=parseInt(s[1]);return e.toUpperCase()+`

`+o+`

`+Y1(n.getShaderSource(t),a)}else return o}function K1(n,t){let e=J1(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Q1={[yu]:"Linear",[_u]:"Reinhard",[xu]:"Cineon",[ns]:"ACESFilmic",[Mu]:"AgX",[Su]:"Neutral",[vu]:"Custom"};function tx(n,t){let e=Q1[t];return e===void 0?(Ft("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Fc=new k;function ex(){oe.getLuminanceCoefficients(Fc);let n=Fc.x.toFixed(4),t=Fc.y.toFixed(4),e=Fc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function ix(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function rx(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let o=n.getActiveAttrib(t,r),s=o.name,a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),e[s]={type:o.type,location:n.getAttribLocation(t,s),locationSize:a}}return e}function ps(n){return n!==""}function Zp(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function jp(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ox=/^[ \t]*#include +<([\w\d./]+)>/gm;function qu(n){return n.replace(ox,sx)}function sx(n,t){let e=Jt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return qu(e)}var ax=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xp(n){return n.replace(ax,cx)}function cx(n,t,e,i){let r="";for(let o=parseInt(t);o<parseInt(e);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function qp(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var lx={[es]:"SHADOWMAP_TYPE_PCF",[Zr]:"SHADOWMAP_TYPE_VSM"};function ux(n){return lx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var hx={[Xr]:"ENVMAP_MODE_REFRACTION"};function dx(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":hx[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var px={[Ya]:"ENVMAP_BLENDING_MULTIPLY",[sp]:"ENVMAP_BLENDING_MIX",[ap]:"ENVMAP_BLENDING_ADD"};function fx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":px[n.combine]||"ENVMAP_BLENDING_NONE"}function mx(n,t,e,i){let r=n.getContext(),o=e.defines,s=e.vertexShader,a=e.fragmentShader,c=ux(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=dx(e),h=fx(e),d=nx(e),p=ix(o),f=r.createProgram(),x,m,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ps).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ps).join(`
`),m.length>0&&(m+=`
`)):(x=[qp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),m=[qp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ti?"#define TONE_MAPPING":"",e.toneMapping!==ti?Jt.tonemapping_pars_fragment:"",e.toneMapping!==ti?tx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,K1("linearToOutputTexel",e.outputColorSpace),ex(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),s=qu(s),s=Zp(s,e),s=jp(s,e),a=qu(a),a=Zp(a,e),a=jp(a,e),s=Xp(s),a=Xp(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,x=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",e.glslVersion===Nu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Nu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let M=g+x+s,S=g+m+a,_=Vp(r,r.VERTEX_SHADER,M),E=Vp(r,r.FRAGMENT_SHADER,S);r.attachShader(f,_),r.attachShader(f,E),e.index0AttributeName!==void 0?r.bindAttribLocation(f,0,e.index0AttributeName):e.hasPositionAttribute===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f);function A(C){if(n.debug.checkShaderErrors){let R=r.getProgramInfoLog(f)||"",O=r.getShaderInfoLog(_)||"",z=r.getShaderInfoLog(E)||"",P=R.trim(),I=O.trim(),F=z.trim(),B=!0,et=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if(B=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,f,_,E);else{let W=Wp(r,_,"vertex"),J=Wp(r,E,"fragment");zt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+P+`
`+W+`
`+J)}else P!==""?Ft("WebGLProgram: Program Info Log:",P):(I===""||F==="")&&(et=!1);et&&(C.diagnostics={runnable:B,programLog:P,vertexShader:{log:I,prefix:x},fragmentShader:{log:F,prefix:m}})}r.deleteShader(_),r.deleteShader(E),y=new $r(r,f),w=rx(r,f)}let y;this.getUniforms=function(){return y===void 0&&A(this),y};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(f,q1)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=$1++,this.cacheKey=t,this.usedTimes=1,this.program=f,this.vertexShader=_,this.fragmentShader=E,this}var gx=0,$u=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let r=this._getShaderCacheForMaterial(t);return r.has(e)===!1&&(r.add(e),e.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Yu(t),e.set(t,i)),i}},Yu=class{constructor(t){this.id=gx++,this.code=t,this.usedTimes=0}};function yx(n){return n===Fi||n===cs||n===ls}function _x(n,t,e,i,r,o){let s=new wo,a=new $u,c=new Set,l=[],u=new Map,h=i.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function f(y,w,N,C,R,O){let z=C.fog,P=R.geometry,I=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?C.environment:null,F=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,B=t.get(y.envMap||I,F),et=d[y.type],W=i.precision;y.precision!==null&&(W=i.getMaxPrecision(y.precision),W!==y.precision&&Ft("WebGLProgram.getParameters:",y.precision,"not supported, using",W,"instead."));let J=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,K=J!==void 0?J.length:0,bt=0;P.morphAttributes.position!==void 0&&(bt=1),P.morphAttributes.normal!==void 0&&(bt=2),P.morphAttributes.color!==void 0&&(bt=3);let Pt,X,at,Et;if(et){let Mt=ni[et];Pt=Mt.vertexShader,X=Mt.fragmentShader}else{Pt=y.vertexShader,X=y.fragmentShader;let Mt=a.getVertexShaderStage(y),pe=a.getFragmentShaderStage(y);a.update(y,Mt,pe),at=Mt.id,Et=pe.id}let Ut=n.getRenderTarget(),vt=n.state.buffers.depth.getReversed(),kt=R.isInstancedMesh===!0,xe=R.isBatchedMesh===!0,Bt=!!y.map,Kt=!!y.matcap,te=!!B,tt=te&&B.isPMREMTexture===!0,ht=!!y.aoMap,ct=!!y.lightMap,At=!!y.bumpMap&&y.wireframe===!1,_t=!!y.normalMap,Zt=!!y.displacementMap,Lt=!!y.emissiveMap,ee=!!y.metalnessMap,ne=!!y.roughnessMap,ce=y.anisotropy>0,U=y.clearcoat>0,Pe=y.diffuseRoughness>0,Qt=y.dispersion>0,ge=y.retroreflectivity>0,mt=y.iridescence>0,Te=y.sheen>0,Ot=y.transmission>0,Gt=ce&&!!y.anisotropyMap,T=U&&!!y.clearcoatMap,v=U&&!!y.clearcoatNormalMap,V=U&&!!y.clearcoatRoughnessMap,it=Pe&&!!y.diffuseRoughnessMap,Q=mt&&!!y.iridescenceMap,lt=mt&&!!y.iridescenceThicknessMap,gt=Te&&!!y.sheenColorMap,q=Te&&!!y.sheenRoughnessMap,$=!!y.specularMap,dt=!!y.specularColorMap,L=!!y.specularIntensityMap,Y=Ot&&!!y.transmissionMap,j=Ot&&!!y.thicknessMap,pt=!!y.gradientMap,st=!!y.alphaMap,ut=y.alphaTest>0,Nt=!!y.alphaHash,Yt=!!y.extensions,ot=ti;y.toneMapped&&(Ut===null||Ut.isXRRenderTarget===!0)&&(ot=n.toneMapping);let Dt=tt?B.isCompressedCubeTexture?B.image[0].mipmaps:B.mipmaps:null,Xt={shaderID:et,shaderType:y.type,shaderName:y.name,vertexShader:Pt,fragmentShader:X,defines:y.defines,customVertexShaderID:at,customFragmentShaderID:Et,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:W,batching:xe,batchingColor:xe&&R._colorsTexture!==null,instancing:kt,instancingColor:kt&&R.instanceColor!==null,instancingMorph:kt&&R.morphTexture!==null,outputColorSpace:Ut===null?n.outputColorSpace:Ut.isXRRenderTarget===!0?Ut.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Bt,matcap:Kt,envMap:te,envMapMode:te&&B.mapping,envMapPMREM:tt,envMapMaxLod:tt?Dt.length-1:null,envMapSize:tt?Dt[0].width:null,aoMap:ht,lightMap:ct,bumpMap:At,normalMap:_t,displacementMap:Zt,emissiveMap:Lt,normalMapObjectSpace:_t&&y.normalMapType===up,normalMapTangentSpace:_t&&y.normalMapType===us,packedNormalMap:_t&&y.normalMapType===us&&yx(y.normalMap.format),metalnessMap:ee,roughnessMap:ne,anisotropy:ce,anisotropyMap:Gt,clearcoat:U,clearcoatMap:T,clearcoatNormalMap:v,clearcoatRoughnessMap:V,diffuseRoughness:Pe,diffuseRoughnessMap:it,dispersion:Qt,retroreflection:ge,iridescence:mt,iridescenceMap:Q,iridescenceThicknessMap:lt,sheen:Te,sheenColorMap:gt,sheenRoughnessMap:q,specularMap:$,specularColorMap:dt,specularIntensityMap:L,transmission:Ot,transmissionMap:Y,thicknessMap:j,gradientMap:pt,opaque:y.transparent===!1&&y.blending===jr&&y.alphaToCoverage===!1,alphaMap:st,alphaTest:ut,alphaHash:Nt,combine:y.combine,mapUv:Bt&&p(y.map.channel),aoMapUv:ht&&p(y.aoMap.channel),lightMapUv:ct&&p(y.lightMap.channel),bumpMapUv:At&&p(y.bumpMap.channel),normalMapUv:_t&&p(y.normalMap.channel),displacementMapUv:Zt&&p(y.displacementMap.channel),emissiveMapUv:Lt&&p(y.emissiveMap.channel),metalnessMapUv:ee&&p(y.metalnessMap.channel),roughnessMapUv:ne&&p(y.roughnessMap.channel),anisotropyMapUv:Gt&&p(y.anisotropyMap.channel),clearcoatMapUv:T&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:v&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:V&&p(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:it&&p(y.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:q&&p(y.sheenRoughnessMap.channel),specularMapUv:$&&p(y.specularMap.channel),specularColorMapUv:dt&&p(y.specularColorMap.channel),specularIntensityMapUv:L&&p(y.specularIntensityMap.channel),transmissionMapUv:Y&&p(y.transmissionMap.channel),thicknessMapUv:j&&p(y.thicknessMap.channel),alphaMapUv:st&&p(y.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(_t||ce),vertexNormals:!!P.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!P.attributes.uv&&(Bt||st),fog:!!z,useFog:y.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||P.attributes.normal===void 0&&_t===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:vt,skinning:R.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:bt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:O.filter(Mt=>Mt.texture!==null).length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:ot,decodeVideoTexture:Bt&&y.map.isVideoTexture===!0&&oe.getTransfer(y.map.colorSpace)===de,decodeVideoTextureEmissive:Lt&&y.emissiveMap.isVideoTexture===!0&&oe.getTransfer(y.emissiveMap.colorSpace)===de,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Qn,flipSided:y.side===qe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Yt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&y.extensions.multiDraw===!0||xe)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Xt.vertexUv1s=c.has(1),Xt.vertexUv2s=c.has(2),Xt.vertexUv3s=c.has(3),c.clear(),Xt}function x(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let N in y.defines)w.push(N),w.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(m(w,y),g(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function m(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapPMREM),y.push(w.envMapMaxLod),y.push(w.envMapSize),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.diffuseRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.numSunLights),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numSunLightShadows),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.numLightProbeGrids),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function g(y,w){s.disableAll(),w.instancing&&s.enable(0),w.instancingColor&&s.enable(1),w.instancingMorph&&s.enable(2),w.matcap&&s.enable(3),w.envMap&&s.enable(4),w.normalMapObjectSpace&&s.enable(5),w.normalMapTangentSpace&&s.enable(6),w.clearcoat&&s.enable(7),w.iridescence&&s.enable(8),w.alphaTest&&s.enable(9),w.vertexColors&&s.enable(10),w.vertexAlphas&&s.enable(11),w.vertexUv1s&&s.enable(12),w.vertexUv2s&&s.enable(13),w.vertexUv3s&&s.enable(14),w.vertexTangents&&s.enable(15),w.anisotropy&&s.enable(16),w.alphaHash&&s.enable(17),w.batching&&s.enable(18),w.dispersion&&s.enable(19),w.retroreflection&&s.enable(24),w.diffuseRoughness&&s.enable(25),w.batchingColor&&s.enable(20),w.gradientMap&&s.enable(21),w.packedNormalMap&&s.enable(22),w.vertexNormals&&s.enable(23),y.push(s.mask),s.disableAll(),w.fog&&s.enable(0),w.useFog&&s.enable(1),w.flatShading&&s.enable(2),w.logarithmicDepthBuffer&&s.enable(3),w.reversedDepthBuffer&&s.enable(4),w.skinning&&s.enable(5),w.morphTargets&&s.enable(6),w.morphNormals&&s.enable(7),w.morphColors&&s.enable(8),w.premultipliedAlpha&&s.enable(9),w.shadowMapEnabled&&s.enable(10),w.doubleSided&&s.enable(11),w.flipSided&&s.enable(12),w.useDepthPacking&&s.enable(13),w.dithering&&s.enable(14),w.transmission&&s.enable(15),w.sheen&&s.enable(16),w.opaque&&s.enable(17),w.pointsUvs&&s.enable(18),w.decodeVideoTexture&&s.enable(19),w.decodeVideoTextureEmissive&&s.enable(20),w.alphaToCoverage&&s.enable(21),w.numLightProbeGrids>0&&s.enable(22),w.hasPositionAttribute&&s.enable(23),y.push(s.mask)}function M(y){let w=d[y.type],N;if(w){let C=ni[w];N=Rp.clone(C.uniforms)}else N=y.uniforms;return N}function S(y,w){let N=u.get(w);return N!==void 0?++N.usedTimes:(N=new mx(n,w,y,r),l.push(N),u.set(w,N)),N}function _(y){if(--y.usedTimes===0){let w=l.indexOf(y);l[w]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function E(y){a.remove(y)}function A(){a.dispose()}return{getParameters:f,getProgramCacheKey:x,getUniforms:M,acquireProgram:S,releaseProgram:_,releaseShaderCache:E,programs:l,dispose:A}}function xx(){let n=new WeakMap;function t(s){return n.has(s)}function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function i(s){n.delete(s)}function r(s,a,c){n.get(s)[a]=c}function o(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:o}}function vx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function $p(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Yp(){let n=[],t=0,e=[],i=[],r=[];function o(){t=0,e.length=0,i.length=0,r.length=0}function s(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function a(d,p,f,x,m,g){let M=n[t];return M===void 0?(M={id:d.id,object:d,geometry:p,material:f,materialVariant:s(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:g},n[t]=M):(M.id=d.id,M.object=d,M.geometry=p,M.material=f,M.materialVariant=s(d),M.groupOrder=x,M.renderOrder=d.renderOrder,M.z=m,M.group=g),t++,M}function c(d,p,f,x,m,g,M){M.reversedDepth===!0&&(m=-m);let S=a(d,p,f,x,m,g);f.transmission>0?i.push(S):f.transparent===!0?r.push(S):e.push(S)}function l(d,p,f,x,m,g){let M=a(d,p,f,x,m,g);f.transmission>0?i.unshift(M):f.transparent===!0?r.unshift(M):e.unshift(M)}function u(d,p){e.length>1&&e.sort(d||vx),i.length>1&&i.sort(p||$p),r.length>1&&r.sort(p||$p)}function h(){for(let d=t,p=n.length;d<p;d++){let f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:r,init:o,push:c,unshift:l,finish:h,sort:u}}function Mx(){let n=new WeakMap;function t(i,r){let o=n.get(i),s;return o===void 0?(s=new Yp,n.set(i,[s])):r>=o.length?(s=new Yp,o.push(s)):s=o[r],s}function e(){n=new WeakMap}return{get:t,dispose:e}}function Sx(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new k,color:new Vt};break;case"SpotLight":e={position:new k,direction:new k,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new k,halfWidth:new k,halfHeight:new k};break}return n[t.id]=e,e}}}function bx(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var wx=0;function Ax(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Ex(n){let t=new Sx,e=bx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new k);let r=new k,o=new fe,s=new fe;function a(l){let u=0,h=0,d=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let p=0,f=0,x=0,m=0,g=0,M=0,S=0,_=0,E=0,A=0,y=0,w=0,N=0,C=0;l.sort(Ax);for(let O=0,z=l.length;O<z;O++){let P=l[O],I=P.color,F=P.intensity,B=P.distance,et=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Fi?et=P.shadow.map.texture:et=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=I.r*F,h+=I.g*F,d+=I.b*F;else if(P.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(P.sh.coefficients[W],F);C++}else if(P.isSunLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let J=P.shadow,K=e.get(P);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),i.sunShadow[f]=K,i.sunShadowMap[f]=et;let bt=J.getViewportCount();for(let Pt=0;Pt<bt;Pt++)i.sunShadowMatrix[x+Pt]=J.getMatrix(Pt),i.sunShadowCascade[x+Pt]=J._cascadeData[Pt];x+=bt,f++}i.sun[p]=W,p++}else if(P.isDirectionalLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let J=P.shadow,K=e.get(P);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,i.directionalShadow[m]=K,i.directionalShadowMap[m]=et,i.directionalShadowMatrix[m]=P.shadow.matrix,E++}i.directional[m]=W,m++}else if(P.isSpotLight){let W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(I).multiplyScalar(F),W.distance=B,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,i.spot[M]=W;let J=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,J.updateMatrices(P),P.castShadow&&N++),i.spotLightMatrix[M]=J.matrix,P.castShadow){let K=e.get(P);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,i.spotShadow[M]=K,i.spotShadowMap[M]=et,y++}M++}else if(P.isRectAreaLight){let W=t.get(P);W.color.copy(I).multiplyScalar(F),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),i.rectArea[S]=W,S++}else if(P.isPointLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){let J=P.shadow,K=e.get(P);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,K.shadowCameraNear=J.camera.near,K.shadowCameraFar=J.camera.far,i.pointShadow[g]=K,i.pointShadowMap[g]=et,i.pointShadowMatrix[g]=P.shadow.matrix,A++}i.point[g]=W,g++}else if(P.isHemisphereLight){let W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(F),W.groundColor.copy(P.groundColor).multiplyScalar(F),i.hemi[_]=W,_++}}S>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=St.LTC_FLOAT_1,i.rectAreaLTC2=St.LTC_FLOAT_2):(i.rectAreaLTC1=St.LTC_HALF_1,i.rectAreaLTC2=St.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;let R=i.hash;(R.sunLength!==p||R.directionalLength!==m||R.pointLength!==g||R.spotLength!==M||R.rectAreaLength!==S||R.hemiLength!==_||R.numSunShadows!==f||R.numDirectionalShadows!==E||R.numPointShadows!==A||R.numSpotShadows!==y||R.numSpotMaps!==w||R.numLightProbes!==C)&&(i.sun.length=p,i.directional.length=m,i.spot.length=M,i.rectArea.length=S,i.point.length=g,i.hemi.length=_,i.sunShadow.length=f,i.sunShadowMap.length=f,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=y,i.spotShadowMap.length=y,i.spotLightMatrix.length=y+w-N,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=C,R.sunLength=p,R.directionalLength=m,R.pointLength=g,R.spotLength=M,R.rectAreaLength=S,R.hemiLength=_,R.numSunShadows=f,R.numDirectionalShadows=E,R.numPointShadows=A,R.numSpotShadows=y,R.numSpotMaps=w,R.numLightProbes=C,i.version=wx++)}function c(l,u){let h=0,d=0,p=0,f=0,x=0,m=0,g=u.matrixWorldInverse;for(let M=0,S=l.length;M<S;M++){let _=l[M];if(_.isSunLight){let E=i.sun[h];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(g),h++}else if(_.isDirectionalLight){let E=i.directional[d];E.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),d++}else if(_.isSpotLight){let E=i.spot[f];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),f++}else if(_.isRectAreaLight){let E=i.rectArea[x];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(g),s.identity(),o.copy(_.matrixWorld),o.premultiply(g),s.extractRotation(o),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(s),E.halfHeight.applyMatrix4(s),x++}else if(_.isPointLight){let E=i.point[p];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(g),p++}else if(_.isHemisphereLight){let E=i.hemi[m];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(g),m++}}}return{setup:a,setupView:c,state:i}}function Jp(n){let t=new Ex(n),e=[],i=[],r=[];function o(h){u.camera=h,e.length=0,i.length=0,r.length=0}function s(h){h.isLightProbeGrid?r.push(h):e.push(h)}function a(h){i.push(h)}function c(){t.setup(e),r.sort((h,d)=>h.priority-d.priority||h.id-d.id)}function l(h){t.setupView(e,h)}let u={lightsArray:e,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:o,state:u,setupLights:c,setupLightsView:l,pushLight:s,pushShadow:a}}function Tx(n){let t=new WeakMap;function e(r,o=0){let s=t.get(r),a;return s===void 0?(a=new Jp(n),t.set(r,[a])):o>=s.length?(a=new Jp(n),s.push(a)):a=s[o],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var Cx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Px=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],Ix=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Kp=new fe,ds=new k,Wu=new k;function Lx(n,t,e){let i=new Ri,r=new rt,o=new rt,s=new Se,a=new ka,c=new Oa,l={},u=e.maxTextureSize,h={[Oi]:qe,[qe]:Oi,[Qn]:Qn},d=new Kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:Cx,fragmentShader:Rx}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let f=new Ze;f.setAttribute("position",new Fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new be(f,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=es;let g=this.type;this.render=function(A,y,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===$a&&(Ft("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=es);let N=n.getRenderTarget(),C=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),O=n.state;O.setBlending(cr),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let z=g!==this.type;z&&y.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(I=>I.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,I=A.length;P<I;P++){let F=A[P],B=F.shadow;if(B===void 0){Ft("WebGLShadowMap:",F,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);let et=B.getFrameExtents();r.multiply(et),o.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(o.x=Math.floor(u/et.x),r.x=o.x*et.x,B.mapSize.x=o.x),r.y>u&&(o.y=Math.floor(u/et.y),r.y=o.y*et.y,B.mapSize.y=o.y));let W=n.state.buffers.depth.getReversed();if(B.camera._reversedDepth=W,B.map===null||z===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Zr){if(F.isPointLight){Ft("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new xn(r.x,r.y,{format:Fi,type:Vn,minFilter:rn,magFilter:rn,generateMipmaps:!1}),B.map.texture.name=F.name+".shadowMap",B.map.depthTexture=new fi(r.x,r.y,Pn),B.map.depthTexture.name=F.name+".shadowMapDepth",B.map.depthTexture.format=di,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=We,B.map.depthTexture.magFilter=We}else F.isPointLight?(B.map=new fs(r.x),B.map.depthTexture=new Io(r.x,Gn)):(B.map=new xn(r.x,r.y),B.map.depthTexture=new fi(r.x,r.y,Gn)),B.map.depthTexture.name=F.name+".shadowMap",B.map.depthTexture.format=di,this.type===es?(B.map.depthTexture.compareFunction=W?Iu:Pu,B.map.depthTexture.minFilter=rn,B.map.depthTexture.magFilter=rn):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=We,B.map.depthTexture.magFilter=We);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==r.x||B.map.height!==r.y)&&B.map.setSize(r.x,r.y);let J=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();F.isPointLight!==!0&&B.updateMatrices(F,w);let K=(B.camera.layers.mask&4294967294)!==0?B.camera.layers:w.layers;for(let bt=0;bt<J;bt++){let Pt=B.getCamera(bt);if(F.isPointLight){let X=B.camera,at=B.matrix,Et=F.distance||X.far;Et!==X.far&&(X.far=Et,X.updateProjectionMatrix()),ds.setFromMatrixPosition(F.matrixWorld),X.position.copy(ds),Wu.copy(X.position),Wu.add(Px[bt]),X.up.copy(Ix[bt]),X.lookAt(Wu),X.updateMatrixWorld(),at.makeTranslation(-ds.x,-ds.y,-ds.z),Kp.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Kp,X.coordinateSystem,X.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)n.setRenderTarget(B.map,bt),n.clear();else{bt===0&&(n.setRenderTarget(B.map),n.clear());let X=B.getViewport(bt);s.set(o.x*X.x,o.y*X.y,o.x*X.z,o.y*X.w),O.viewport(s)}i=B.getFrustum(bt),_(y,w,Pt,F,K,this.type)}B.isPointLightShadow!==!0&&this.type===Zr&&M(B,w),B.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(N,C,R)};function M(A,y){let w=t.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null?A.mapPass=new xn(r.x,r.y,{format:Fi,type:Vn}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value.set(A.map.width,A.map.height),d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(y,null,w,d,x,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(y,null,w,p,x,null)}function S(A,y,w,N){let C=null,R=w.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)C=R;else if(C=w.isPointLight===!0?c:a,n.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let O=C.uuid,z=y.uuid,P=l[O];P===void 0&&(P={},l[O]=P);let I=P[z];I===void 0&&(I=C.clone(),P[z]=I,y.addEventListener("dispose",E)),C=I}if(C.visible=y.visible,C.wireframe=y.wireframe,N===Zr?C.side=y.shadowSide!==null?y.shadowSide:y.side:C.side=y.shadowSide!==null?y.shadowSide:h[y.side],C.alphaMap=y.alphaMap,C.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,C.map=y.map,C.clipShadows=y.clipShadows,C.clippingPlanes=y.clippingPlanes,C.clipIntersection=y.clipIntersection,C.displacementMap=y.displacementMap,C.displacementScale=y.displacementScale,C.displacementBias=y.displacementBias,C.wireframeLinewidth=y.wireframeLinewidth,C.linewidth=y.linewidth,w.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let O=n.properties.get(C);O.light=w}return C}function _(A,y,w,N,C,R){if(A.visible===!1)return;if(A.layers.test(C)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&R===Zr)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,A.matrixWorld);let P=t.update(A),I=A.material;if(Array.isArray(I)){let F=P.groups;for(let B=0,et=F.length;B<et;B++){let W=F[B],J=I[W.materialIndex];if(J&&J.visible){let K=S(A,J,N,R);A.onBeforeShadow(n,A,y,w,P,K,W),n.renderBufferDirect(w,null,P,K,A,W),A.onAfterShadow(n,A,y,w,P,K,W)}}}else if(I.visible){let F=S(A,I,N,R);A.onBeforeShadow(n,A,y,w,P,F,null),n.renderBufferDirect(w,null,P,F,A,null),A.onAfterShadow(n,A,y,w,P,F,null)}}let z=A.children;for(let P=0,I=z.length;P<I;P++)_(z[P],y,w,N,C,R)}function E(A){A.target.removeEventListener("dispose",E);for(let w in l){let N=l[w],C=A.target.uuid;C in N&&(N[C].dispose(),delete N[C])}}}function Nx(n,t){function e(){let L=!1,Y=new Se,j=null,pt=new Se(0,0,0,0);return{setMask:function(st){j!==st&&!L&&(n.colorMask(st,st,st,st),j=st)},setLocked:function(st){L=st},setClear:function(st,ut,Nt,Yt,ot){ot===!0&&(st*=Yt,ut*=Yt,Nt*=Yt),Y.set(st,ut,Nt,Yt),pt.equals(Y)===!1&&(n.clearColor(st,ut,Nt,Yt),pt.copy(Y))},reset:function(){L=!1,j=null,pt.set(-1,0,0,0)}}}function i(){let L=!1,Y=!1,j=null,pt=null,st=null;return{setReversed:function(ut){if(Y!==ut){let Nt=t.get("EXT_clip_control");ut?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT),Y=ut;let Yt=st;st=null,this.setClear(Yt)}},getReversed:function(){return Y},setTest:function(ut){ut?vt(n.DEPTH_TEST):kt(n.DEPTH_TEST)},setMask:function(ut){j!==ut&&!L&&(n.depthMask(ut),j=ut)},setFunc:function(ut){if(Y&&(ut=Mp[ut]),pt!==ut){switch(ut){case ha:n.depthFunc(n.NEVER);break;case da:n.depthFunc(n.ALWAYS);break;case pa:n.depthFunc(n.LESS);break;case Lr:n.depthFunc(n.LEQUAL);break;case fa:n.depthFunc(n.EQUAL);break;case ma:n.depthFunc(n.GEQUAL);break;case ga:n.depthFunc(n.GREATER);break;case ya:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pt=ut}},setLocked:function(ut){L=ut},setClear:function(ut){st!==ut&&(st=ut,Y&&(ut=1-ut),n.clearDepth(ut))},reset:function(){L=!1,j=null,pt=null,st=null,Y=!1}}}function r(){let L=!1,Y=null,j=null,pt=null,st=null,ut=null,Nt=null,Yt=null,ot=null;return{setTest:function(Dt){L||(Dt?vt(n.STENCIL_TEST):kt(n.STENCIL_TEST))},setMask:function(Dt){Y!==Dt&&!L&&(n.stencilMask(Dt),Y=Dt)},setFunc:function(Dt,Xt,Mt){(j!==Dt||pt!==Xt||st!==Mt)&&(n.stencilFunc(Dt,Xt,Mt),j=Dt,pt=Xt,st=Mt)},setOp:function(Dt,Xt,Mt){(ut!==Dt||Nt!==Xt||Yt!==Mt)&&(n.stencilOp(Dt,Xt,Mt),ut=Dt,Nt=Xt,Yt=Mt)},setLocked:function(Dt){L=Dt},setClear:function(Dt){ot!==Dt&&(n.clearStencil(Dt),ot=Dt)},reset:function(){L=!1,Y=null,j=null,pt=null,st=null,ut=null,Nt=null,Yt=null,ot=null}}}let o=new e,s=new i,a=new r,c={},l=new WeakMap,u={},h={},d={},p=new WeakMap,f=[],x=null,m=!1,g=null,M=null,S=null,_=null,E=null,A=null,y=null,w=new Vt(0,0,0),N=0,C=!1,R=null,O=null,z=null,P=null,I=null,F=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,et=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(W)[1]),B=et>=1):W.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),B=et>=2);let J=null,K={},bt=n.getParameter(n.SCISSOR_BOX),Pt=n.getParameter(n.VIEWPORT),X=new Se().fromArray(bt),at=new Se().fromArray(Pt);function Et(L,Y,j,pt){let st=new Uint8Array(4),ut=n.createTexture();n.bindTexture(L,ut),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Nt=0;Nt<j;Nt++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(Y,0,n.RGBA,1,1,pt,0,n.RGBA,n.UNSIGNED_BYTE,st):n.texImage2D(Y+Nt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,st);return ut}let Ut={};Ut[n.TEXTURE_2D]=Et(n.TEXTURE_2D,n.TEXTURE_2D,1),Ut[n.TEXTURE_CUBE_MAP]=Et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ut[n.TEXTURE_2D_ARRAY]=Et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ut[n.TEXTURE_3D]=Et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),vt(n.DEPTH_TEST),s.setFunc(Lr),At(!1),_t(hu),vt(n.CULL_FACE),ht(cr);function vt(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function kt(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function xe(L,Y){return d[L]!==Y?(n.bindFramebuffer(L,Y),d[L]=Y,L===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Y),L===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Y),!0):!1}function Bt(L,Y){let j=f,pt=!1;if(L){j=p.get(Y),j===void 0&&(j=[],p.set(Y,j));let st=L.textures;if(j.length!==st.length||j[0]!==n.COLOR_ATTACHMENT0){for(let ut=0,Nt=st.length;ut<Nt;ut++)j[ut]=n.COLOR_ATTACHMENT0+ut;j.length=st.length,pt=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,pt=!0);pt&&n.drawBuffers(j)}function Kt(L){return x!==L?(n.useProgram(L),x=L,!0):!1}let te={[lr]:n.FUNC_ADD,[Hd]:n.FUNC_SUBTRACT,[Wd]:n.FUNC_REVERSE_SUBTRACT};te[Zd]=n.MIN,te[jd]=n.MAX;let tt={[Xd]:n.ZERO,[qd]:n.ONE,[$d]:n.SRC_COLOR,[mu]:n.SRC_ALPHA,[ep]:n.SRC_ALPHA_SATURATE,[Qd]:n.DST_COLOR,[Jd]:n.DST_ALPHA,[Yd]:n.ONE_MINUS_SRC_COLOR,[gu]:n.ONE_MINUS_SRC_ALPHA,[tp]:n.ONE_MINUS_DST_COLOR,[Kd]:n.ONE_MINUS_DST_ALPHA,[np]:n.CONSTANT_COLOR,[ip]:n.ONE_MINUS_CONSTANT_COLOR,[rp]:n.CONSTANT_ALPHA,[op]:n.ONE_MINUS_CONSTANT_ALPHA};function ht(L,Y,j,pt,st,ut,Nt,Yt,ot,Dt){if(L===cr){m===!0&&(kt(n.BLEND),m=!1);return}if(m===!1&&(vt(n.BLEND),m=!0),L!==Vd){if(L!==g||Dt!==C){if((M!==lr||E!==lr)&&(n.blendEquation(n.FUNC_ADD),M=lr,E=lr),Dt)switch(L){case jr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case du:n.blendFunc(n.ONE,n.ONE);break;case pu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case fu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:zt("WebGLState: Invalid blending: ",L);break}else switch(L){case jr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case du:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case pu:zt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fu:zt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:zt("WebGLState: Invalid blending: ",L);break}S=null,_=null,A=null,y=null,w.set(0,0,0),N=0,g=L,C=Dt}return}st=st||Y,ut=ut||j,Nt=Nt||pt,(Y!==M||st!==E)&&(n.blendEquationSeparate(te[Y],te[st]),M=Y,E=st),(j!==S||pt!==_||ut!==A||Nt!==y)&&(n.blendFuncSeparate(tt[j],tt[pt],tt[ut],tt[Nt]),S=j,_=pt,A=ut,y=Nt),(Yt.equals(w)===!1||ot!==N)&&(n.blendColor(Yt.r,Yt.g,Yt.b,ot),w.copy(Yt),N=ot),g=L,C=!1}function ct(L,Y){L.side===Qn?kt(n.CULL_FACE):vt(n.CULL_FACE);let j=L.side===qe;Y&&(j=!j),At(j),L.blending===jr&&L.transparent===!1?ht(cr):ht(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),o.setMask(L.colorWrite);let pt=L.stencilWrite;a.setTest(pt),pt&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Lt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?vt(n.SAMPLE_ALPHA_TO_COVERAGE):kt(n.SAMPLE_ALPHA_TO_COVERAGE)}function At(L){R!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),R=L)}function _t(L){L!==zd?(vt(n.CULL_FACE),L!==O&&(L===hu?n.cullFace(n.BACK):L===Gd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):kt(n.CULL_FACE),O=L}function Zt(L){L!==z&&(B&&n.lineWidth(L),z=L)}function Lt(L,Y,j){L?(vt(n.POLYGON_OFFSET_FILL),(P!==Y||I!==j)&&(P=Y,I=j,s.getReversed()&&(Y=-Y,j=-j),n.polygonOffset(Y,j))):kt(n.POLYGON_OFFSET_FILL)}function ee(L){L?vt(n.SCISSOR_TEST):kt(n.SCISSOR_TEST)}function ne(L){L===void 0&&(L=n.TEXTURE0+F-1),J!==L&&(n.activeTexture(L),J=L)}function ce(L,Y,j){j===void 0&&(J===null?j=n.TEXTURE0+F-1:j=J);let pt=K[j];pt===void 0&&(pt={type:void 0,texture:void 0},K[j]=pt),(pt.type!==L||pt.texture!==Y)&&(J!==j&&(n.activeTexture(j),J=j),n.bindTexture(L,Y||Ut[L]),pt.type=L,pt.texture=Y)}function U(){let L=K[J];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Pe(){try{n.compressedTexImage2D(...arguments)}catch(L){zt("WebGLState:",L)}}function Qt(){try{n.compressedTexImage3D(...arguments)}catch(L){zt("WebGLState:",L)}}function ge(){try{n.texSubImage2D(...arguments)}catch(L){zt("WebGLState:",L)}}function mt(){try{n.texSubImage3D(...arguments)}catch(L){zt("WebGLState:",L)}}function Te(){try{n.compressedTexSubImage2D(...arguments)}catch(L){zt("WebGLState:",L)}}function Ot(){try{n.compressedTexSubImage3D(...arguments)}catch(L){zt("WebGLState:",L)}}function Gt(){try{n.texStorage2D(...arguments)}catch(L){zt("WebGLState:",L)}}function T(){try{n.texStorage3D(...arguments)}catch(L){zt("WebGLState:",L)}}function v(){try{n.texImage2D(...arguments)}catch(L){zt("WebGLState:",L)}}function V(){try{n.texImage3D(...arguments)}catch(L){zt("WebGLState:",L)}}function it(L){return h[L]!==void 0?h[L]:n.getParameter(L)}function Q(L,Y){h[L]!==Y&&(n.pixelStorei(L,Y),h[L]=Y)}function lt(L){X.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),X.copy(L))}function gt(L){at.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),at.copy(L))}function q(L,Y){let j=l.get(Y);j===void 0&&(j=new WeakMap,l.set(Y,j));let pt=j.get(L);pt===void 0&&(pt=n.getUniformBlockIndex(Y,L.name),n.uniformBlockBinding(Y,pt,pt),j.set(L,pt))}function $(L,Y,j){let st=l.get(Y).get(L);c[st]!==j&&(n.bindBufferBase(n.UNIFORM_BUFFER,st,j),c[st]=j)}function dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},J=null,K={},d={},c={},p=new WeakMap,f=[],x=null,m=!1,g=null,M=null,S=null,_=null,E=null,A=null,y=null,w=new Vt(0,0,0),N=0,C=!1,R=null,O=null,z=null,P=null,I=null,X.set(0,0,n.canvas.width,n.canvas.height),at.set(0,0,n.canvas.width,n.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:vt,disable:kt,bindFramebuffer:xe,drawBuffers:Bt,useProgram:Kt,setBlending:ht,setMaterial:ct,setFlipSided:At,setCullFace:_t,setLineWidth:Zt,setPolygonOffset:Lt,setScissorTest:ee,activeTexture:ne,bindTexture:ce,unbindTexture:U,compressedTexImage2D:Pe,compressedTexImage3D:Qt,texImage2D:v,texImage3D:V,pixelStorei:Q,getParameter:it,updateUBOMapping:q,uniformBlockBinding:$,texStorage2D:Gt,texStorage3D:T,texSubImage2D:ge,texSubImage3D:mt,compressedTexSubImage2D:Te,compressedTexSubImage3D:Ot,scissor:lt,viewport:gt,reset:dt}}function Dx(n,t,e,i,r,o,s){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new rt,u=new WeakMap,h=new Set,d,p=new WeakMap,f=new Set,x=new FinalizationRegistry(T=>f.delete(T)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return m?new OffscreenCanvas(T,v):So("canvas")}function M(T,v,V){let it=1,Q=Gt(T);if((Q.width>V||Q.height>V)&&(it=V/Math.max(Q.width,Q.height)),it<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let lt=Math.floor(it*Q.width),gt=Math.floor(it*Q.height);d===void 0&&(d=g(lt,gt));let q=v?g(lt,gt):d;return q.width=lt,q.height=gt,q.getContext("2d").drawImage(T,0,0,lt,gt),Ft("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+lt+"x"+gt+")."),q}else return"data"in T&&Ft("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function S(T){return T.generateMipmaps}function _(T){n.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(T,v,V,it,Q,lt=!1){if(T!==null){if(n[T]!==void 0)return n[T];Ft("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let gt;it&&(gt=t.get("EXT_texture_norm16"),gt||Ft("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=v;if(v===n.RED&&(V===n.FLOAT&&(q=n.R32F),V===n.HALF_FLOAT&&(q=n.R16F),V===n.UNSIGNED_BYTE&&(q=n.R8),V===n.UNSIGNED_SHORT&&gt&&(q=gt.R16_EXT),V===n.SHORT&&gt&&(q=gt.R16_SNORM_EXT)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(q=n.R8UI),V===n.UNSIGNED_SHORT&&(q=n.R16UI),V===n.UNSIGNED_INT&&(q=n.R32UI),V===n.BYTE&&(q=n.R8I),V===n.SHORT&&(q=n.R16I),V===n.INT&&(q=n.R32I)),v===n.RG&&(V===n.FLOAT&&(q=n.RG32F),V===n.HALF_FLOAT&&(q=n.RG16F),V===n.UNSIGNED_BYTE&&(q=n.RG8),V===n.UNSIGNED_SHORT&&gt&&(q=gt.RG16_EXT),V===n.SHORT&&gt&&(q=gt.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(q=n.RG8UI),V===n.UNSIGNED_SHORT&&(q=n.RG16UI),V===n.UNSIGNED_INT&&(q=n.RG32UI),V===n.BYTE&&(q=n.RG8I),V===n.SHORT&&(q=n.RG16I),V===n.INT&&(q=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(q=n.RGB8UI),V===n.UNSIGNED_SHORT&&(q=n.RGB16UI),V===n.UNSIGNED_INT&&(q=n.RGB32UI),V===n.BYTE&&(q=n.RGB8I),V===n.SHORT&&(q=n.RGB16I),V===n.INT&&(q=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),V===n.UNSIGNED_INT&&(q=n.RGBA32UI),V===n.BYTE&&(q=n.RGBA8I),V===n.SHORT&&(q=n.RGBA16I),V===n.INT&&(q=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_SHORT&&gt&&(q=gt.RGB16_EXT),V===n.SHORT&&gt&&(q=gt.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),v===n.RGBA){let $=lt?Mo:oe.getTransfer(Q);V===n.FLOAT&&(q=n.RGBA32F),V===n.HALF_FLOAT&&(q=n.RGBA16F),V===n.UNSIGNED_BYTE&&(q=$===de?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&gt&&(q=gt.RGBA16_EXT),V===n.SHORT&&gt&&(q=gt.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function y(T,v){let V;return T?v===null||v===Gn||v===hr?V=n.DEPTH24_STENCIL8:v===Pn?V=n.DEPTH32F_STENCIL8:v===qr&&(V=n.DEPTH24_STENCIL8,Ft("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Gn||v===hr?V=n.DEPTH_COMPONENT24:v===Pn?V=n.DEPTH_COMPONENT32F:v===qr&&(V=n.DEPTH_COMPONENT16),V}function w(T,v){return S(T)===!0||T.isFramebufferTexture&&T.minFilter!==We&&T.minFilter!==rn?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function N(T){let v=new WeakRef(T);i.get(T).__ref=v,f.add(v),x.register(T,v,v)}function C(T){let v=i.get(T).__ref;v!==void 0&&(f.delete(v),x.unregister(v))}function R(T){z(T.target)}function O(T){P(T.target)}function z(T){T.removeEventListener("dispose",R),C(T),F(T),T.isVideoTexture&&u.delete(T),T.isHTMLTexture&&h.delete(T)}function P(T){T.removeEventListener("dispose",O),C(T),et(T)}function I(){for(let T of f){let v=T.deref();v!==void 0&&(v.isRenderTarget===!0?P(v):z(v))}f.clear(),h.clear()}function F(T){let v=i.get(T);if(v.__webglInit===void 0)return;let V=T.source,it=p.get(V);if(it){let Q=it[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&B(T),Object.keys(it).length===0&&p.delete(V)}i.remove(T)}function B(T){let v=i.get(T);n.deleteTexture(v.__webglTexture);let V=T.source,it=p.get(V);delete it[v.__cacheKey],s.memory.textures--}function et(T){let v=i.get(T);v.__depthDisposeCallback&&v.__depthDisposeCallback();let V=T.depthTexture;if(V&&V.renderTarget===T&&z(V),T.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(v.__webglFramebuffer[Q]))for(let lt=0;lt<v.__webglFramebuffer[Q].length;lt++)n.deleteFramebuffer(v.__webglFramebuffer[Q][lt]);else n.deleteFramebuffer(v.__webglFramebuffer[Q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[Q])}else{if(Array.isArray(v.__webglFramebuffer))for(let Q=0;Q<v.__webglFramebuffer.length;Q++)n.deleteFramebuffer(v.__webglFramebuffer[Q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Q=0;Q<v.__webglColorRenderbuffer.length;Q++)v.__webglColorRenderbuffer[Q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[Q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let it=T.textures;for(let Q=0,lt=it.length;Q<lt;Q++){let gt=i.get(it[Q]);gt.__webglTexture&&(n.deleteTexture(gt.__webglTexture),s.memory.textures--),i.remove(it[Q])}i.remove(T)}let W=0;function J(){W=0}function K(){return W}function bt(T){W=T}function Pt(){let T=W;return T>=r.maxTextures&&Ft("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+r.maxTextures),W+=1,T}function X(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.mipmapsAutoUpdate),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function at(T,v){let V=i.get(T);if(T.isVideoTexture&&Te(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&V.__version!==T.version){let it=T.image;if(it===null)Ft("WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)Ft("WebGLRenderer: Texture marked for update but image is incomplete");else{ct(V,T,v);return}}else T.isExternalTexture&&(V.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function Et(T,v){let V=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&V.__version!==T.version){ct(V,T,v);return}else T.isExternalTexture&&(V.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function Ut(T,v){let V=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&V.__version!==T.version){ct(V,T,v);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function vt(T,v){let V=i.get(T);if(T.version>0&&V.__version!==T.version){At(V,T,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}let kt={[_a]:n.REPEAT,[$n]:n.CLAMP_TO_EDGE,[xa]:n.MIRRORED_REPEAT},xe={[We]:n.NEAREST,[cp]:n.NEAREST_MIPMAP_NEAREST,[is]:n.NEAREST_MIPMAP_LINEAR,[rn]:n.LINEAR,[Qa]:n.LINEAR_MIPMAP_NEAREST,[gi]:n.LINEAR_MIPMAP_LINEAR},Bt={[dp]:n.NEVER,[Lu]:n.ALWAYS,[pp]:n.LESS,[Pu]:n.LEQUAL,[fp]:n.EQUAL,[Iu]:n.GEQUAL,[mp]:n.GREATER,[gp]:n.NOTEQUAL};function Kt(T,v){if(v.type===Pn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===rn||v.magFilter===Qa||v.magFilter===is||v.magFilter===gi||v.minFilter===rn||v.minFilter===Qa||v.minFilter===is||v.minFilter===gi)&&Ft("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,kt[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,kt[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,kt[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,xe[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,xe[v.minFilter]),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Bt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===We||v.minFilter!==is&&v.minFilter!==gi||v.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function te(T,v){let V=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",R),N(v));let it=v.source,Q=p.get(it);Q===void 0&&(Q={},p.set(it,Q));let lt=X(v);if(lt!==T.__cacheKey){Q[lt]===void 0&&(Q[lt]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,V=!0),Q[lt].usedTimes++;let gt=Q[T.__cacheKey];gt!==void 0&&(Q[T.__cacheKey].usedTimes--,gt.usedTimes===0&&B(v)),T.__cacheKey=lt,T.__webglTexture=Q[lt].texture}return V}function tt(T,v,V){return Math.floor(Math.floor(T/V)/v)}function ht(T,v,V,it){let lt=T.updateRanges;if(lt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,it,v.data);else{lt.sort((L,Y)=>L.start-Y.start);let gt=0;for(let L=1;L<lt.length;L++){let Y=lt[gt],j=lt[L],pt=Y.start+Y.count,st=tt(j.start,v.width,4),ut=tt(Y.start,v.width,4);j.start<=pt+1&&st===ut&&tt(j.start+j.count-1,v.width,4)===st?Y.count=Math.max(Y.count,j.start+j.count-Y.start):(++gt,lt[gt]=j)}lt.length=gt+1;let q=e.getParameter(n.UNPACK_ROW_LENGTH),$=e.getParameter(n.UNPACK_SKIP_PIXELS),dt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let L=0,Y=lt.length;L<Y;L++){let j=lt[L],pt=Math.floor(j.start/4),st=Math.ceil(j.count/4),ut=pt%v.width,Nt=Math.floor(pt/v.width),Yt=st,ot=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,ut),e.pixelStorei(n.UNPACK_SKIP_ROWS,Nt),e.texSubImage2D(n.TEXTURE_2D,0,ut,Nt,Yt,ot,V,it,v.data)}T.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,$),e.pixelStorei(n.UNPACK_SKIP_ROWS,dt)}}function ct(T,v,V){let it=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(it=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(it=n.TEXTURE_3D);let Q=te(T,v),lt=v.source;e.bindTexture(it,T.__webglTexture,n.TEXTURE0+V);let gt=i.get(lt);if(lt.version!==gt.__version||Q===!0){if(e.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ot=oe.getPrimaries(oe.workingColorSpace),Dt=v.colorSpace===_i?null:oe.getPrimaries(v.colorSpace),Xt=v.colorSpace===_i||ot===Dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt)}e.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let $=M(v.image,!1,r.maxTextureSize);$=Ot(v,$);let dt=o.convert(v.format,v.colorSpace),L=o.convert(v.type),Y=A(v.internalFormat,dt,L,v.normalized,v.colorSpace,v.isVideoTexture);Kt(it,v);let j,pt=v.mipmaps,st=v.isVideoTexture!==!0,ut=gt.__version===void 0||Q===!0,Nt=lt.dataReady,Yt=w(v,$);if(v.isDepthTexture)Y=y(v.format===yi,v.type),ut&&(st?e.texStorage2D(n.TEXTURE_2D,1,Y,$.width,$.height):e.texImage2D(n.TEXTURE_2D,0,Y,$.width,$.height,0,dt,L,null));else if(v.isDataTexture)if(pt.length>0){st&&ut&&e.texStorage2D(n.TEXTURE_2D,Yt,Y,pt[0].width,pt[0].height);for(let ot=0,Dt=pt.length;ot<Dt;ot++)j=pt[ot],st?Nt&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,j.width,j.height,dt,L,j.data):e.texImage2D(n.TEXTURE_2D,ot,Y,j.width,j.height,0,dt,L,j.data);v.generateMipmaps=!1}else st?(ut&&e.texStorage2D(n.TEXTURE_2D,Yt,Y,$.width,$.height),Nt&&ht(v,$,dt,L)):e.texImage2D(n.TEXTURE_2D,0,Y,$.width,$.height,0,dt,L,$.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){st&&ut&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Yt,Y,pt[0].width,pt[0].height,$.depth);for(let ot=0,Dt=pt.length;ot<Dt;ot++)if(j=pt[ot],v.format!==Hn)if(dt!==null)if(st){if(Nt)if(v.layerUpdates.size>0){let Xt=Vu(j.width,j.height,v.format,v.type);for(let Mt of v.layerUpdates){let pe=j.data.subarray(Mt*Xt/j.data.BYTES_PER_ELEMENT,(Mt+1)*Xt/j.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,Mt,j.width,j.height,1,dt,pe)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,j.width,j.height,$.depth,dt,j.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ot,Y,j.width,j.height,$.depth,0,j.data,0,0);else Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else st?Nt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,j.width,j.height,$.depth,dt,L,j.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ot,Y,j.width,j.height,$.depth,0,dt,L,j.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{st&&ut&&e.texStorage2D(n.TEXTURE_2D,Yt,Y,pt[0].width,pt[0].height);for(let ot=0,Dt=pt.length;ot<Dt;ot++)j=pt[ot],v.format!==Hn?dt!==null?st?Nt&&e.compressedTexSubImage2D(n.TEXTURE_2D,ot,0,0,j.width,j.height,dt,j.data):e.compressedTexImage2D(n.TEXTURE_2D,ot,Y,j.width,j.height,0,j.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?Nt&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,j.width,j.height,dt,L,j.data):e.texImage2D(n.TEXTURE_2D,ot,Y,j.width,j.height,0,dt,L,j.data)}else if(v.isDataArrayTexture)if(st){if(ut&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Yt,Y,$.width,$.height,$.depth),Nt)if(v.layerUpdates.size>0){let ot=Vu($.width,$.height,v.format,v.type);for(let Dt of v.layerUpdates){let Xt=$.data.subarray(Dt*ot/$.data.BYTES_PER_ELEMENT,(Dt+1)*ot/$.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Dt,$.width,$.height,1,dt,L,Xt)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,dt,L,$.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Y,$.width,$.height,$.depth,0,dt,L,$.data);else if(v.isData3DTexture)st?(ut&&e.texStorage3D(n.TEXTURE_3D,Yt,Y,$.width,$.height,$.depth),Nt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,dt,L,$.data)):e.texImage3D(n.TEXTURE_3D,0,Y,$.width,$.height,$.depth,0,dt,L,$.data);else if(v.isFramebufferTexture){if(ut)if(st)e.texStorage2D(n.TEXTURE_2D,Yt,Y,$.width,$.height);else{let ot=$.width,Dt=$.height;for(let Xt=0;Xt<Yt;Xt++)e.texImage2D(n.TEXTURE_2D,Xt,Y,ot,Dt,0,dt,L,null),ot>>=1,Dt>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){let ot=n.canvas;if(ot.hasAttribute("layoutsubtree")||ot.setAttribute("layoutsubtree","true"),$.parentNode!==ot){ot.appendChild($),h.add(v),ot.onpaint=Dt=>{let Xt=Dt.changedElements;for(let Mt of h)Xt.includes(Mt.image)&&(Mt.needsUpdate=!0)},ot.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,$);else{let Xt=n.RGBA,Mt=n.RGBA,pe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Xt,Mt,pe,$)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(pt.length>0){if(st&&ut){let ot=Gt(pt[0]);e.texStorage2D(n.TEXTURE_2D,Yt,Y,ot.width,ot.height)}for(let ot=0,Dt=pt.length;ot<Dt;ot++)j=pt[ot],st?Nt&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,dt,L,j):e.texImage2D(n.TEXTURE_2D,ot,Y,dt,L,j);v.generateMipmaps=!1}else if(st){if(ut){let ot=Gt($);e.texStorage2D(n.TEXTURE_2D,Yt,Y,ot.width,ot.height)}Nt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,L,$)}else e.texImage2D(n.TEXTURE_2D,0,Y,dt,L,$);S(v)&&v.mipmapsAutoUpdate===!0&&_(it),gt.__version=lt.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function At(T,v,V){if(v.image.length!==6)return;let it=te(T,v),Q=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+V);let lt=i.get(Q);if(Q.version!==lt.__version||it===!0){e.activeTexture(n.TEXTURE0+V);let gt=oe.getPrimaries(oe.workingColorSpace),q=v.colorSpace===_i?null:oe.getPrimaries(v.colorSpace),$=v.colorSpace===_i||gt===q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let dt=v.isCompressedTexture||v.image[0].isCompressedTexture,L=v.image[0]&&v.image[0].isDataTexture,Y=[];for(let Mt=0;Mt<6;Mt++)!dt&&!L?Y[Mt]=M(v.image[Mt],!0,r.maxCubemapSize):Y[Mt]=L?v.image[Mt].image:v.image[Mt],Y[Mt]=Ot(v,Y[Mt]);let j=Y[0],pt=o.convert(v.format,v.colorSpace),st=o.convert(v.type),ut=A(v.internalFormat,pt,st,v.normalized,v.colorSpace),Nt=v.isVideoTexture!==!0,Yt=lt.__version===void 0||it===!0,ot=Q.dataReady,Dt=w(v,j);Kt(n.TEXTURE_CUBE_MAP,v);let Xt;if(v.isDepthTexture){if(ut=y(v.format===yi,v.type),Yt)if(Nt)e.texStorage2D(n.TEXTURE_CUBE_MAP,1,ut,j.width,j.height);else for(let Mt=0;Mt<6;Mt++)e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ut,j.width,j.height,0,pt,st,null)}else if(dt){Nt&&Yt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Dt,ut,j.width,j.height);for(let Mt=0;Mt<6;Mt++){Xt=Y[Mt].mipmaps;for(let pe=0;pe<Xt.length;pe++){let ze=Xt[pe];v.format!==Hn?pt!==null?Nt?ot&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,pe,0,0,ze.width,ze.height,pt,ze.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,pe,ut,ze.width,ze.height,0,ze.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,pe,0,0,ze.width,ze.height,pt,st,ze.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,pe,ut,ze.width,ze.height,0,pt,st,ze.data)}}}else{if(Xt=v.mipmaps,Nt&&Yt){Xt.length>0&&Dt++;let Mt=Gt(Y[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Dt,ut,Mt.width,Mt.height)}for(let Mt=0;Mt<6;Mt++)if(L){Nt?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Y[Mt].width,Y[Mt].height,pt,st,Y[Mt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ut,Y[Mt].width,Y[Mt].height,0,pt,st,Y[Mt].data);for(let pe=0;pe<Xt.length;pe++){let Mi=Xt[pe].image[Mt].image;Nt?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,pe+1,0,0,Mi.width,Mi.height,pt,st,Mi.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,pe+1,ut,Mi.width,Mi.height,0,pt,st,Mi.data)}}else{Nt?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,pt,st,Y[Mt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ut,pt,st,Y[Mt]);for(let pe=0;pe<Xt.length;pe++){let ze=Xt[pe];Nt?ot&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,pe+1,0,0,pt,st,ze.image[Mt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,pe+1,ut,pt,st,ze.image[Mt])}}}S(v)&&v.mipmapsAutoUpdate===!0&&_(n.TEXTURE_CUBE_MAP),lt.__version=Q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function _t(T,v,V,it,Q,lt){let gt=o.convert(V.format,V.colorSpace),q=o.convert(V.type),$=A(V.internalFormat,gt,q,V.normalized,V.colorSpace),dt=i.get(v),L=i.get(V);if(L.__renderTarget=v,!dt.__hasExternalTextures){let Y=Math.max(1,v.width>>lt),j=Math.max(1,v.height>>lt);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?e.texImage3D(Q,lt,$,Y,j,v.depth,0,gt,q,null):e.texImage2D(Q,lt,$,Y,j,0,gt,q,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),mt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,Q,L.__webglTexture,0,ge(v)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,it,Q,L.__webglTexture,lt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Zt(T,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer){let it=v.depthTexture,Q=it&&it.isDepthTexture?it.type:null,lt=y(v.stencilBuffer,Q),gt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;mt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ge(v),lt,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,ge(v),lt,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,lt,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,gt,n.RENDERBUFFER,T)}else{let it=v.textures;for(let Q=0;Q<it.length;Q++){let lt=it[Q],gt=o.convert(lt.format,lt.colorSpace),q=o.convert(lt.type),$=A(lt.internalFormat,gt,q,lt.normalized,lt.colorSpace);mt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ge(v),$,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,ge(v),$,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,$,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Lt(T,v,V){let it=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=i.get(v.depthTexture);Q.__renderTarget=v;let lt=it?v.depthTexture.image[0]:v.depthTexture.image;(!Q.__webglTexture||lt.width!==v.width||lt.height!==v.height)&&(lt.width=v.width,lt.height=v.height,v.depthTexture.needsUpdate=!0),it?vt(v.depthTexture,0):at(v.depthTexture,0);let gt=Q.__webglTexture,q=ge(v),$=it?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,dt=v.depthTexture.format===yi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===di)mt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,dt,$,gt,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,dt,$,gt,0);else if(v.depthTexture.format===yi)mt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,dt,$,gt,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,dt,$,gt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ee(T){let v=i.get(T),V=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let it=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),it){let Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,it.removeEventListener("dispose",Q)};it.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=it}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let it=0;it<6;it++)Lt(v.__webglFramebuffer[it],T,it);else T.texture.mipmaps.length>0?Lt(v.__webglFramebuffer[0],T,0):Lt(v.__webglFramebuffer,T,0);else if(V){v.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[it]),v.__webglDepthbuffer[it]===void 0)v.__webglDepthbuffer[it]=n.createRenderbuffer(),Zt(v.__webglDepthbuffer[it],T,!1);else{let Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=v.__webglDepthbuffer[it];n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,lt)}}else if(T.texture.mipmaps.length>0?e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Zt(v.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,lt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ne(T,v,V){let it=i.get(T);v!==void 0&&_t(it.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&ee(T)}function ce(T){let v=T.texture,V=i.get(T),it=i.get(v);T.addEventListener("dispose",O),N(T);let Q=T.textures,lt=T.isWebGLCubeRenderTarget===!0,gt=Q.length>1;if(gt||(it.__webglTexture===void 0&&(it.__webglTexture=n.createTexture()),it.__version=v.version,s.memory.textures++),lt){V.__webglFramebuffer=[];for(let q=0;q<6;q++)if(v.mipmaps.length>0){V.__webglFramebuffer[q]=[];for(let $=0;$<v.mipmaps.length;$++)V.__webglFramebuffer[q][$]=n.createFramebuffer()}else V.__webglFramebuffer[q]=n.createFramebuffer()}else{if(v.mipmaps.length>0){V.__webglFramebuffer=[];for(let q=0;q<v.mipmaps.length;q++)V.__webglFramebuffer[q]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(gt)for(let q=0,$=Q.length;q<$;q++){let dt=i.get(Q[q]);dt.__webglTexture===void 0&&(dt.__webglTexture=n.createTexture(),s.memory.textures++)}if(T.samples>0&&mt(T)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let q=0;q<Q.length;q++){let $=Q[q];V.__webglColorRenderbuffer[q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[q]);let dt=o.convert($.format,$.colorSpace),L=o.convert($.type),Y=A($.internalFormat,dt,L,$.normalized,$.colorSpace,T.isXRRenderTarget===!0),j=ge(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,j,Y,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+q,n.RENDERBUFFER,V.__webglColorRenderbuffer[q])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),Zt(V.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(lt){e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),Kt(n.TEXTURE_CUBE_MAP,v);for(let q=0;q<6;q++)if(v.mipmaps.length>0)for(let $=0;$<v.mipmaps.length;$++)_t(V.__webglFramebuffer[q][$],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,$);else _t(V.__webglFramebuffer[q],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);S(v)?_(n.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),e.unbindTexture()}else if(gt){for(let q=0,$=Q.length;q<$;q++){let dt=Q[q],L=i.get(dt),Y=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Y=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Y,L.__webglTexture),Kt(Y,dt),_t(V.__webglFramebuffer,T,dt,n.COLOR_ATTACHMENT0+q,Y,0),S(dt)&&_(Y)}e.unbindTexture()}else{let q=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(q=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(q,it.__webglTexture),Kt(q,v),v.mipmaps.length>0)for(let $=0;$<v.mipmaps.length;$++)_t(V.__webglFramebuffer[$],T,v,n.COLOR_ATTACHMENT0,q,$);else _t(V.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,q,0);S(v)?_(q):v.mipmaps.length>0&&n.texParameteri(q,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),e.unbindTexture()}T.depthBuffer&&ee(T)}function U(T){let v=T.textures;for(let V=0,it=v.length;V<it;V++){let Q=v[V];if(S(Q)&&Q.mipmapsAutoUpdate===!0){let lt=E(T),gt=i.get(Q).__webglTexture;e.bindTexture(lt,gt),_(lt),e.unbindTexture()}}}let Pe=[];function Qt(T){if(T.samples>0){if(mt(T)===!1){let v=T.textures,V=T.width,it=T.height,Q=n.COLOR_BUFFER_BIT,lt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=i.get(T),q=v.length>1;if(q)for(let dt=0;dt<v.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let dt=0;dt<v.length;dt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);let L=i.get(v[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,L,0)}n.blitFramebuffer(0,0,V,it,0,0,V,it,Q,n.NEAREST),c===!0&&(Pe.length=0,Pe.push(n.COLOR_ATTACHMENT0+dt),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&Pe.push(lt),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Pe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),q)for(let dt=0;dt<v.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);let L=i.get(v[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,L,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){let v=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function ge(T){return Math.min(r.maxSamples,T.samples)}function mt(T){let v=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Te(T){let v=s.render.frame;u.get(T)!==v&&(u.set(T,v),T.update())}function Ot(T,v){let V=T.colorSpace,it=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||V!==vo&&V!==_i&&(oe.getTransfer(V)===de?(it!==Hn||Q!==un)&&Ft("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):zt("WebGLTextures: Unsupported texture color space:",V)),v}function Gt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=Pt,this.resetTextureUnits=J,this.getTextureUnits=K,this.setTextureUnits=bt,this.setTexture2D=at,this.setTexture2DArray=Et,this.setTexture3D=Ut,this.setTextureCube=vt,this.rebindTextures=ne,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=ee,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=mt,this.dispose=I}function Ux(n,t){function e(i,r=_i){let o,s=oe.getTransfer(r);if(i===un)return n.UNSIGNED_BYTE;if(i===ec)return n.UNSIGNED_SHORT_4_4_4_4;if(i===nc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Eu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Tu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===wu)return n.BYTE;if(i===Au)return n.SHORT;if(i===qr)return n.UNSIGNED_SHORT;if(i===tc)return n.INT;if(i===Gn)return n.UNSIGNED_INT;if(i===Pn)return n.FLOAT;if(i===Vn)return n.HALF_FLOAT;if(i===Cu)return n.ALPHA;if(i===Ru)return n.RGB;if(i===Hn)return n.RGBA;if(i===di)return n.DEPTH_COMPONENT;if(i===yi)return n.DEPTH_STENCIL;if(i===ic)return n.RED;if(i===rc)return n.RED_INTEGER;if(i===Fi)return n.RG;if(i===oc)return n.RG_INTEGER;if(i===sc)return n.RGBA_INTEGER;if(i===rs||i===os||i===ss||i===as)if(s===de)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===rs)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===os)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ss)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===as)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===rs)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===os)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ss)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===as)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ac||i===cc||i===lc||i===uc)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===ac)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===cc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===lc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===uc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===hc||i===dc||i===pc||i===fc||i===mc||i===cs||i===gc)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(i===hc||i===dc)return s===de?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===pc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC;if(i===fc)return o.COMPRESSED_R11_EAC;if(i===mc)return o.COMPRESSED_SIGNED_R11_EAC;if(i===cs)return o.COMPRESSED_RG11_EAC;if(i===gc)return o.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===yc||i===_c||i===xc||i===vc||i===Mc||i===Sc||i===bc||i===wc||i===Ac||i===Ec||i===Tc||i===Cc||i===Rc||i===Pc)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(i===yc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===_c)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Mc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Sc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===bc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===wc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ac)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ec)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Tc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Cc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Rc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Pc)return s===de?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ic||i===Lc||i===Nc)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(i===Ic)return s===de?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Lc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Nc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Dc||i===Uc||i===ls||i===kc)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(i===Dc)return o.COMPRESSED_RED_RGTC1_EXT;if(i===Uc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ls)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===kc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var kx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ox=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ju=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Lo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Kn({vertexShader:kx,fragmentShader:Ox,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new be(new ar(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ku=class extends Bn{constructor(t,e){super();let i=this,r=null,o=1,s=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,p=null,f=null,x=typeof XRWebGLBinding<"u",m=new Ju,g={},M=e.getContextAttributes(),S=null,_=null,E=[],A=[],y=new rt,w=null,N=null,C=new Qe;C.viewport=new Se;let R=new Qe;R.viewport=new Se;let O=[C,R],z=new qa,P=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let at=E[X];return at===void 0&&(at=new Or,E[X]=at),at.getTargetRaySpace()},this.getControllerGrip=function(X){let at=E[X];return at===void 0&&(at=new Or,E[X]=at),at.getGripSpace()},this.getHand=function(X){let at=E[X];return at===void 0&&(at=new Or,E[X]=at),at.getHandSpace()};function F(X){let at=A.indexOf(X.inputSource);if(at===-1)return;let Et=E[at];Et!==void 0&&(Et.update(X.inputSource,X.frame,l||s),Et.dispatchEvent({type:X.type,data:X.inputSource}))}function B(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",et);for(let X=0;X<E.length;X++){let at=A[X];at!==null&&(A[X]=null,E[X].disconnect(at))}P=null,I=null,m.reset();for(let X in g)delete g[X];if(t.setRenderTarget(S),p=null,d=null,h=null,r=null,_=null,Pt.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(y.width,y.height,!1),N!==null){let X=N.camera;X.fov=N.fov,X.zoom=N.zoom,X.updateProjectionMatrix(),N=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){o=X,i.isPresenting===!0&&Ft("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&Ft("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(r,e)),h},this.getFrame=function(){return f},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(S=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",B),r.addEventListener("inputsourceschange",et),M.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(y),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Et=null,Ut=null,vt=null;M.depth&&(vt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Et=M.stencil?yi:di,Ut=M.stencil?hr:Gn);let kt={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:o};h=this.getBinding(),d=h.createProjectionLayer(kt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new xn(d.textureWidth,d.textureHeight,{format:Hn,type:un,depthTexture:new fi(d.textureWidth,d.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,Et),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Et={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(r,e,Et),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new xn(p.framebufferWidth,p.framebufferHeight,{format:Hn,type:un,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(a),Pt.setContext(r),Pt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function et(X){for(let at=0;at<X.removed.length;at++){let Et=X.removed[at],Ut=A.indexOf(Et);Ut>=0&&(A[Ut]=null,E[Ut].disconnect(Et))}for(let at=0;at<X.added.length;at++){let Et=X.added[at],Ut=A.indexOf(Et);if(Ut===-1){for(let kt=0;kt<E.length;kt++)if(kt>=A.length){A.push(Et),Ut=kt;break}else if(A[kt]===null){A[kt]=Et,Ut=kt;break}if(Ut===-1)break}let vt=E[Ut];vt&&vt.connect(Et)}}function W(X,at){at===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(at.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let at=X.near,Et=X.far;m.texture!==null&&(m.depthNear>0&&(at=m.depthNear),m.depthFar>0&&(Et=m.depthFar)),z.near=R.near=C.near=at,z.far=R.far=C.far=Et,(P!==z.near||I!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),P=z.near,I=z.far),z.layers.mask=X.layers.mask|6,C.layers.mask=z.layers.mask&-5,R.layers.mask=z.layers.mask&-3;let Ut=X.parent,vt=z.cameras;W(z,Ut);for(let kt=0;kt<vt.length;kt++)W(vt[kt],Ut);z.projectionMatrix.copy(C.projectionMatrix),z.projectionMatrixInverse.copy(C.projectionMatrixInverse),N===null&&X.isPerspectiveCamera&&(N={camera:X,fov:X.fov,zoom:X.zoom}),J(X,z,Ut)};function J(X,at,Et){Et===null?X.matrix.copy(at.matrixWorld):(X.matrix.copy(Et.matrixWorld),X.matrix.invert(),X.matrix.multiply(at.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(at.projectionMatrix),X.projectionMatrixInverse.copy(at.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ur*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(X){return g[X]};let K=null;function bt(X,at){if(u=at.getViewerPose(l||s),f=at,u!==null){let Et=u.views;p!==null&&(t.setRenderTargetFramebuffer(_,p.framebuffer),t.setRenderTarget(_));let Ut=!1;Et.length!==z.cameras.length&&(z.cameras.length=0,Ut=!0);for(let Bt=0;Bt<Et.length;Bt++){let Kt=Et[Bt],te=null;if(p!==null)te=p.getViewport(Kt);else{let ht=h.getViewSubImage(d,Kt);te=ht.viewport,Bt===0&&(t.setRenderTargetTextures(_,ht.colorTexture,ht.depthStencilTexture),t.setRenderTarget(_))}let tt=O[Bt];tt===void 0&&(tt=new Qe,tt.layers.enable(Bt),tt.viewport=new Se,O[Bt]=tt),tt.matrix.fromArray(Kt.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(Kt.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(te.x,te.y,te.width,te.height),Bt===0&&(z.matrix.copy(tt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Ut===!0&&z.cameras.push(tt)}let vt=r.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){h=i.getBinding();let Bt=h.getDepthInformation(Et[0]);Bt&&Bt.isValid&&Bt.texture&&m.init(Bt,r.renderState)}if(vt&&vt.includes("camera-access")&&x){t.state.unbindTexture(),h=i.getBinding();for(let Bt=0;Bt<Et.length;Bt++){let Kt=Et[Bt].camera;if(Kt){let te=g[Kt];te||(te=new Lo,g[Kt]=te);let tt=h.getCameraImage(Kt);te.sourceTexture=tt}}}}for(let Et=0;Et<E.length;Et++){let Ut=A[Et],vt=E[Et];Ut!==null&&vt!==void 0&&vt.update(Ut,at,l||s)}K&&K(X,at),at.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:at}),f=null}let Pt=new Qp;Pt.setAnimationLoop(bt),this.setAnimationLoop=function(X){K=X},this.dispose=function(){}}},Fx=new fe,uf=new Ht;uf.set(-1,0,0,0,1,0,0,0,1);function Bx(n,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Bu(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,M,S,_){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?o(m,g):g.isMeshLambertMaterial?(o(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(o(m,g),h(m,g)):g.isMeshPhongMaterial?(o(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(o(m,g),d(m,g),g.isMeshPhysicalMaterial&&p(m,g,_)):g.isMeshMatcapMaterial?(o(m,g),f(m,g)):g.isMeshDepthMaterial?o(m,g):g.isMeshDistanceMaterial?(o(m,g),x(m,g)):g.isMeshNormalMaterial?o(m,g):g.isLineBasicMaterial?(s(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?c(m,g,M,S):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function o(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===qe&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===qe&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let M=t.get(g),S=M.envMap,_=M.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(Fx.makeRotationFromEuler(_)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(uf),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function s(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,M,S){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*M,m.scale.value=S*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function h(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function p(m,g,M){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===qe&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function f(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){let M=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function zx(n,t,e,i){let r={},o={};function s(M,S){let _=S.program;i.uniformBlockBinding(M,_,r[M.id])}function a(M,S){let _=r[M.id];_===void 0&&(f(M),_=c(M),r[M.id]=_,M.addEventListener("dispose",m));let E=S.program;i.updateUBOMapping(M,E);let A=t.render.frame;o[M.id]!==A&&(l(M),o[M.id]=A)}function c(M){let S=n.createBuffer(),_=M.__size,E=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,_,E),n.bindBuffer(n.UNIFORM_BUFFER,null),S}function l(M){let S=r[M.id],_=M.uniforms,E=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let A=0,y=_.length;A<y;A++){let w=_[A];if(Array.isArray(w))for(let N=0,C=w.length;N<C;N++)u(w[N],A,N,E);else u(w,A,0,E)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(M,S,_,E){if(d(M,S,_,E)===!0){let A=M.__offset,y=M.value;if(Array.isArray(y)){let w=0;for(let N=0;N<y.length;N++){let C=y[N],R=x(C,!0);h(C,M.__data,w),w+=R.storage/Float32Array.BYTES_PER_ELEMENT}}else h(y,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,A,M.__data)}}function h(M,S,_){typeof M=="number"||typeof M=="boolean"?S[_]=M:M.isMatrix3?(S[_]=M.elements[0],S[_+1]=M.elements[1],S[_+2]=M.elements[2],S[_+3]=0,S[_+4]=M.elements[3],S[_+5]=M.elements[4],S[_+6]=M.elements[5],S[_+7]=0,S[_+8]=M.elements[6],S[_+9]=M.elements[7],S[_+10]=M.elements[8],S[_+11]=0):ArrayBuffer.isView(M)?S.set(M.subarray(0,S.length-_),_):M.toArray(S,_)}function d(M,S,_,E){let A=M.value,y=S+"_"+_;if(Array.isArray(A)){E[y]===void 0&&(E[y]=[]);let w=E[y],N=!1;for(let C=0;C<A.length;C++)p(A[C],w,C)===!0&&(N=!0);return N}return p(A,E,y)}function p(M,S,_){if(S[_]===void 0)return typeof M=="number"||typeof M=="boolean"?S[_]=M:ArrayBuffer.isView(M)?S[_]=M.slice():S[_]=M.clone(),!0;{let E=S[_];if(typeof M=="number"||typeof M=="boolean"){if(E!==M)return S[_]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(E.equals(M)===!1)return E.copy(M),!0}}return!1}function f(M){let S=M.uniforms,_=0,E=16;for(let y=0,w=S.length;y<w;y++){let N=Array.isArray(S[y])?S[y]:[S[y]];for(let C=0,R=N.length;C<R;C++){let O=N[C],z=Array.isArray(O.value)?O.value:[O.value],P=Array.isArray(S[y])||Array.isArray(O.value),I=_;for(let B=0,et=z.length;B<et;B++){let W=z[B],J=x(W,P),K=_%E,bt=K%J.boundary,Pt=K+bt;_+=bt,Pt!==0&&E-Pt<J.storage&&(_+=E-Pt),B===0&&(I=_),_+=J.storage}let F=O.type==="int"?Int32Array:O.type==="uint"?Uint32Array:Float32Array;O.__data=new F((_-I)/Float32Array.BYTES_PER_ELEMENT),O.__offset=I}}let A=_%E;return A>0&&(_+=E-A),M.__size=_,M.__cache={},this}function x(M,S){let _={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=16,_.storage=48):M.isMatrix4?(_.boundary=16,_.storage=64):M.isTexture?Ft("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(_.boundary=16,_.storage=M.byteLength):Ft("WebGLRenderer: Unsupported uniform value type.",M),S===!0&&(_.boundary=16,_.storage=Math.ceil(_.storage/16)*16),_}function m(M){let S=M.target;S.removeEventListener("dispose",m),n.deleteBuffer(r[S.id]),delete r[S.id],delete o[S.id]}function g(){for(let M in r)n.deleteBuffer(r[M]);r={},o={}}return{bind:s,update:a,dispose:g}}var Gx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ei=null;function Vx(){return ei===null&&(ei=new To(Gx,16,16,Fi,Vn),ei.name="DFG_LUT",ei.minFilter=rn,ei.magFilter=rn,ei.wrapS=$n,ei.wrapT=$n,ei.generateMipmaps=!1,ei.needsUpdate=!0),ei}var Bc=class{constructor(t={}){let{canvas:e=_p(),context:i=null,depth:r=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:p=un}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=s;let x=p,m=new Set([sc,oc,rc]),g=new Set([un,Gn,qr,hr,ec,nc]),M=new Uint32Array(4),S=new Int32Array(4),_={textures:[],min:[],max:[],resolution:[]},E=null,A=null,y=[],w=[],N=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,R=!1,O=null,z=null,P=null,I=null;this._outputColorSpace=gn;let F=0,B=0,et=null,W=-1,J=null,K=new Se,bt=new Se,Pt=null,X=new Vt(0),at=0,Et=e.width,Ut=e.height,vt=1,kt=null,xe=null,Bt=new Se(0,0,Et,Ut),Kt=new Se(0,0,Et,Ut),te=!1,tt=new Ri,ht=new Aa,ct=!1,At=!1,_t=new fe,Zt=new k,Lt=new Se,ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ne=!1;function ce(){return et===null?vt:1}let U=i;function Pe(b,D){return e.getContext(b,D)}let Qt,ge,mt,Te,Ot,Gt,T,v,V,it,Q,lt,gt,q,$,dt,L,Y,j,pt,st,ut,Nt;try{let b={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Dt,!1),e.addEventListener("webglcontextrestored",Xt,!1),e.addEventListener("webglcontextcreationerror",Mt,!1),U===null){let D="webgl2";if(U=Pe(D,b),U===null)throw Pe(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Yt()}catch(b){throw e.removeEventListener("webglcontextlost",Dt,!1),e.removeEventListener("webglcontextrestored",Xt,!1),e.removeEventListener("webglcontextcreationerror",Mt,!1),zt("WebGLRenderer: "+b.message),b}function Yt(){Qt=new Q_(U),Qt.init(),st=new Ux(U,Qt),ge=new V_(U,Qt,t,st),mt=new Nx(U,Qt),ge.reversedDepthBuffer&&d&&mt.buffers.depth.setReversed(!0),z=U.createFramebuffer(),P=U.createFramebuffer(),I=U.createFramebuffer(),Te=new n1(U),Ot=new xx,Gt=new Dx(U,Qt,mt,Ot,ge,st,Te),T=new K_(C),v=new rg(U),ut=new z_(U,v),V=new t1(U,v,Te,ut),it=new r1(U,V,v,ut,Te),Y=new i1(U,ge,Gt),$=new H_(Ot),Q=new _x(C,T,Qt,ge,ut,$),lt=new Bx(C,Ot),gt=new Mx,q=new Tx(Qt),L=new B_(C,T,mt,it,f,c),dt=new Lx(C,it,ge),Nt=new zx(U,Te,ge,mt),j=new G_(U,Qt,Te),pt=new e1(U,Qt,Te),Te.programs=Q.programs,C.capabilities=ge,C.extensions=Qt,C.properties=Ot,C.renderLists=gt,C.shadowMap=dt,C.state=mt,C.info=Te}x!==un&&(N=new s1(x,e.width,e.height,a,r,o));let ot=new Ku(C,U);this.xr=ot,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let b=Qt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Qt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return vt},this.setPixelRatio=function(b){b!==void 0&&(vt=b,this.setSize(Et,Ut,!1))},this.getSize=function(b){return b.set(Et,Ut)},this.setSize=function(b,D,Z=!0){if(ot.isPresenting){Ft("WebGLRenderer: Can't change size while VR device is presenting.");return}Et=b,Ut=D,e.width=Math.floor(b*vt),e.height=Math.floor(D*vt),Z===!0&&(e.style.width=b+"px",e.style.height=D+"px"),N!==null&&N.setSize(e.width,e.height),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(Et*vt,Ut*vt).floor()},this.setDrawingBufferSize=function(b,D,Z){Et=b,Ut=D,vt=Z,e.width=Math.floor(b*Z),e.height=Math.floor(D*Z),this.setViewport(0,0,b,D)},this.setEffects=function(b){if(x===un){zt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let D=0;D<b.length;D++)if(b[D].isOutputPass===!0){Ft("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(K)},this.getViewport=function(b){return b.copy(Bt)},this.setViewport=function(b,D,Z,G){b.isVector4?Bt.set(b.x,b.y,b.z,b.w):Bt.set(b,D,Z,G),mt.viewport(K.copy(Bt).multiplyScalar(ce()).round())},this.getScissor=function(b){return b.copy(Kt)},this.setScissor=function(b,D,Z,G){b.isVector4?Kt.set(b.x,b.y,b.z,b.w):Kt.set(b,D,Z,G),mt.scissor(bt.copy(Kt).multiplyScalar(ce()).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(b){mt.setScissorTest(te=b)},this.setOpaqueSort=function(b){kt=b},this.setTransparentSort=function(b){xe=b},this.getClearColor=function(b){return b.copy(L.getClearColor())},this.setClearColor=function(){L.setClearColor(...arguments)},this.getClearAlpha=function(){return L.getClearAlpha()},this.setClearAlpha=function(){L.setClearAlpha(...arguments)},this.clear=function(b=!0,D=!0,Z=!0){let G=0;if(b){let H=!1;if(et!==null){let yt=et.texture.format;H=m.has(yt)}if(H){let yt=et.texture.type,Tt=g.has(yt),ft=L.getClearColor(),wt=L.getClearAlpha(),It=ft.r,Wt=ft.g,ie=ft.b;Tt?(M[0]=It,M[1]=Wt,M[2]=ie,M[3]=wt,U.clearBufferuiv(U.COLOR,0,M)):(S[0]=It,S[1]=Wt,S[2]=ie,S[3]=wt,U.clearBufferiv(U.COLOR,0,S))}else G|=U.COLOR_BUFFER_BIT}D&&(G|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),O=b},this.dispose=function(){e.removeEventListener("webglcontextlost",Dt,!1),e.removeEventListener("webglcontextrestored",Xt,!1),e.removeEventListener("webglcontextcreationerror",Mt,!1),L.dispose(),gt.dispose(),q.dispose(),Gt.dispose(),Ot.dispose(),T.dispose(),it.dispose(),V.dispose(),ut.dispose(),Nt.dispose(),Q.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",Gh),ot.removeEventListener("sessionend",Vh),ji.stop()};function Dt(b){b.preventDefault(),Du("WebGLRenderer: Context Lost."),R=!0}function Xt(){Du("WebGLRenderer: Context Restored."),R=!1;let b=Te.autoReset,D=dt.enabled,Z=dt.autoUpdate,G=dt.needsUpdate,H=dt.type;Yt(),Te.autoReset=b,dt.enabled=D,dt.autoUpdate=Z,dt.needsUpdate=G,dt.type=H}function Mt(b){zt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function pe(b){let D=b.target;D.removeEventListener("dispose",pe),ze(D)}function ze(b){Mi(b),Ot.remove(b)}function Mi(b){let D=Ot.get(b).programs;D!==void 0&&(D.forEach(function(Z){Q.releaseProgram(Z)}),b.isShaderMaterial&&Q.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,Z,G,H,yt){D===null&&(D=ee);let Tt=H.isMesh&&H.matrixWorld.determinantAffine()<0,ft=Tm(b,D,Z,G,H);mt.setMaterial(G,Tt);let wt=Z.index,It=1;if(G.wireframe===!0){if(wt=V.getWireframeAttribute(Z),wt===void 0)return;It=2}let Wt=Z.drawRange,ie=Z.attributes.position,Ct=Wt.start*It,re=(Wt.start+Wt.count)*It;yt!==null&&(Ct=Math.max(Ct,yt.start*It),re=Math.min(re,(yt.start+yt.count)*It)),wt!==null?(Ct=Math.max(Ct,0),re=Math.min(re,wt.count)):ie!=null&&(Ct=Math.max(Ct,0),re=Math.min(re,ie.count));let Ie=re-Ct;if(Ie<0||Ie===1/0)return;ut.setup(H,G,ft,Z,wt);let _e,ye=j;if(wt!==null&&(_e=v.get(wt),ye=pt,ye.setIndex(_e)),H.isMesh)G.wireframe===!0?(mt.setLineWidth(G.wireframeLinewidth*ce()),ye.setMode(U.LINES)):ye.setMode(U.TRIANGLES);else if(H.isLine){let $e=G.linewidth;$e===void 0&&($e=1),mt.setLineWidth($e*ce()),H.isLineSegments?ye.setMode(U.LINES):H.isLineLoop?ye.setMode(U.LINE_LOOP):ye.setMode(U.LINE_STRIP)}else H.isPoints?ye.setMode(U.POINTS):H.isSprite&&ye.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))ye.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let $e=H._multiDrawStarts,Rt=H._multiDrawCounts,nn=H._multiDrawCount,ue=wt?v.get(wt).bytesPerElement:1,Xi=Ot.get(G).currentProgram.getUniforms();for(let Ye=0;Ye<nn;Ye++)Xi.setValue(U,"_gl_DrawID",Ye),ye.render($e[Ye]/ue,Rt[Ye])}else if(H.isInstancedMesh)ye.renderInstances(Ct,Ie,H.count);else if(Z.isInstancedBufferGeometry){let $e=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Rt=Math.min(Z.instanceCount,$e);ye.renderInstances(Ct,Ie,Rt)}else ye.render(Ct,Ie)};function zh(b,D,Z,G){O!==null&&b.isNodeMaterial&&O.setObject(G,b),ct===!0&&$.setState(b,Z,!1),b.transparent===!0&&b.side===Qn&&b.forceSinglePass===!1?(b.side=qe,b.needsUpdate=!0,oo(b,D,G),b.side=Oi,b.needsUpdate=!0,oo(b,D,G),b.side=Qn):oo(b,D,G)}this.compile=function(b,D,Z=null){Z===null&&(Z=b),O!==null&&O.renderStart(b,D,Z),A=q.get(Z),A.init(D),w.push(A),Z.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),b!==Z&&b.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(A.pushLight(H),H.castShadow&&A.pushShadow(H))}),A.setupLights(),O!==null&&O.updateLights(A.state.lightsArray),At=this.localClippingEnabled,ct=$.init(this.clippingPlanes,At),ct===!0&&$.setGlobalState(this.clippingPlanes,D),O!==null&&dt.render(A.state.shadowsArray,Z,D);let G=new Set;return b.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let yt=H.material;if(yt)if(Array.isArray(yt))for(let Tt=0;Tt<yt.length;Tt++){let ft=yt[Tt];zh(ft,Z,D,H),G.add(ft)}else zh(yt,Z,D,H),G.add(yt)}),A=w.pop(),O!==null&&O.renderEnd(),G},this.compileAsync=function(b,D,Z=null){let G=this.compile(b,D,Z);return new Promise(H=>{function yt(){if(G.forEach(function(Tt){let wt=Ot.get(Tt).currentProgram;(wt===void 0||wt.isReady())&&G.delete(Tt)}),G.size===0){H(b);return}setTimeout(yt,10)}Qt.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let Ml=null;function Am(b){Ml&&Ml(b)}function Gh(){ji.stop()}function Vh(){ji.start()}let ji=new Qp;ji.setAnimationLoop(Am),typeof self<"u"&&ji.setContext(self),this.setAnimationLoop=function(b){Ml=b,ot.setAnimationLoop(b),b===null?ji.stop():ji.start()},ot.addEventListener("sessionstart",Gh),ot.addEventListener("sessionend",Vh),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){zt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;O!==null&&O.renderStart(b,D);let Z=ot.enabled===!0&&ot.isPresenting===!0,G=N!==null&&(et===null||Z)&&N.begin(C,et);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(D),D=ot.getCamera()),b.isScene===!0&&b.onBeforeRender(C,b,D,et),A=q.get(b,w.length),A.init(D),A.state.textureUnits=Gt.getTextureUnits(),w.push(A),_t.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),D.isArrayCamera?ht.setFromArrayCamera(D):tt.setFromProjectionMatrix(_t,Tn,D.reversedDepth),At=this.localClippingEnabled,ct=$.init(this.clippingPlanes,At),E=gt.get(b,y.length),E.init(),y.push(E),this.info.render.frame++,ot.enabled===!0&&ot.isPresenting===!0){let Tt=C.xr.getDepthSensingMesh();Tt!==null&&Sl(Tt,D,-1/0,C.sortObjects)}Sl(b,D,0,C.sortObjects),E.finish(),O!==null&&O.updateLights(A.state.lightsArray),C.sortObjects===!0&&E.sort(kt,xe),ne=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,ne&&L.addToRenderList(E,b),this.info.autoReset===!0&&this.info.reset(),ct===!0&&$.beginShadows();let H=A.state.shadowsArray;if(dt.render(H,b,D),ct===!0&&$.endShadows(),(G&&N.hasRenderPass())===!1){let Tt=E.opaque,ft=E.transmissive;if(A.setupLights(),D.isArrayCamera){let wt=D.cameras;if(ft.length>0)for(let It=0,Wt=wt.length;It<Wt;It++){let ie=wt[It];Wh(Tt,ft,b,ie)}ne&&L.render(b);for(let It=0,Wt=wt.length;It<Wt;It++){let ie=wt[It];Hh(E,b,ie,ie.viewport)}}else ft.length>0&&Wh(Tt,ft,b,D),ne&&L.render(b),Hh(E,b,D)}et!==null&&B===0&&(Gt.updateMultisampleRenderTarget(et),Gt.updateRenderTargetMipmap(et)),G&&N.end(C),b.isScene===!0&&b.onAfterRender(C,b,D),ut.resetDefaultState(),W=-1,J=null,w.pop(),w.length>0?(A=w[w.length-1],Gt.setTextureUnits(A.state.textureUnits),ct===!0&&$.setGlobalState(C.clippingPlanes,A.state.camera)):A=null,y.pop(),y.length>0?E=y[y.length-1]:E=null,O!==null&&O.renderEnd()};function Sl(b,D,Z,G){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)A.pushLight(b),b.castShadow&&A.pushShadow(b);else if(b.isSprite){let Tt=D.isArrayCamera?ht:tt;if(!b.frustumCulled||b.intersectsFrustum(Tt)){G&&Lt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(_t);let ft=it.update(b),wt=b.material;wt.visible&&E.push(b,ft,wt,Z,Lt.z,null,D)}}else if(b.isMesh||b.isLine||b.isPoints){let Tt=D.isArrayCamera?ht:tt;if(!b.frustumCulled||b.intersectsFrustum(Tt)){let ft=it.update(b),wt=b.material;if(G&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Lt.copy(b.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Lt.copy(ft.boundingSphere.center)),Lt.applyMatrix4(b.matrixWorld).applyMatrix4(_t)),Array.isArray(wt)){let It=ft.groups;for(let Wt=0,ie=It.length;Wt<ie;Wt++){let Ct=It[Wt],re=wt[Ct.materialIndex];re&&re.visible&&E.push(b,ft,re,Z,Lt.z,Ct,D)}}else wt.visible&&E.push(b,ft,wt,Z,Lt.z,null,D)}}}let yt=b.children;for(let Tt=0,ft=yt.length;Tt<ft;Tt++)Sl(yt[Tt],D,Z,G)}function Hh(b,D,Z,G){let{opaque:H,transmissive:yt,transparent:Tt}=b;A.setupLightsView(Z),ct===!0&&$.setGlobalState(C.clippingPlanes,Z),G&&mt.viewport(K.copy(G)),H.length>0&&Ns(H,D,Z),yt.length>0&&Ns(yt,D,Z),Tt.length>0&&Ns(Tt,D,Z),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function Wh(b,D,Z,G){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[G.id]===void 0){let Ct=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[G.id]=new xn(1,1,{generateMipmaps:!0,type:Ct?Vn:un,minFilter:gi,samples:Math.max(4,ge.samples),stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let yt=A.state.transmissionRenderTarget[G.id],Tt=G.viewport||K;yt.setSize(Tt.z*C.transmissionResolutionScale,Tt.w*C.transmissionResolutionScale);let ft=C.getRenderTarget(),wt=C.getActiveCubeFace(),It=C.getActiveMipmapLevel();C.setRenderTarget(yt),C.getClearColor(X),at=C.getClearAlpha(),at<1&&C.setClearColor(16777215,.5),C.clear(),ne&&L.render(Z);let Wt=C.toneMapping;C.toneMapping=ti;let ie=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),A.setupLightsView(G),ct===!0&&$.setGlobalState(C.clippingPlanes,G),Ns(b,Z,G),Gt.updateMultisampleRenderTarget(yt),Gt.updateRenderTargetMipmap(yt),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let re=0,Ie=D.length;re<Ie;re++){let _e=D[re],{object:ye,geometry:$e,material:Rt,group:nn}=_e;if(Rt.side===Qn&&ye.layers.test(G.layers)){let ue=Rt.side;Rt.side=qe,Rt.needsUpdate=!0,Zh(ye,Z,G,$e,Rt,nn),Rt.side=ue,Rt.needsUpdate=!0,Ct=!0}}Ct===!0&&(Gt.updateMultisampleRenderTarget(yt),Gt.updateRenderTargetMipmap(yt))}C.setRenderTarget(ft,wt,It),C.setClearColor(X,at),ie!==void 0&&(G.viewport=ie),C.toneMapping=Wt}function Ns(b,D,Z){let G=D.isScene===!0?D.overrideMaterial:null;for(let H=0,yt=b.length;H<yt;H++){let Tt=b[H],{object:ft,geometry:wt,group:It}=Tt,Wt=Tt.material;Wt.allowOverride===!0&&G!==null&&(Wt=G),ft.layers.test(Z.layers)&&Zh(ft,D,Z,wt,Wt,It)}}function Zh(b,D,Z,G,H,yt){O!==null&&H.isNodeMaterial&&O.setObject(b,H),b.onBeforeRender(C,D,Z,G,H,yt),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(C,D,Z,G,b,yt),H.transparent===!0&&H.side===Qn&&H.forceSinglePass===!1?(H.side=qe,H.needsUpdate=!0,C.renderBufferDirect(Z,D,G,H,b,yt),H.side=Oi,H.needsUpdate=!0,C.renderBufferDirect(Z,D,G,H,b,yt),H.side=Qn):C.renderBufferDirect(Z,D,G,H,b,yt),b.onAfterRender(C,D,Z,G,H,yt)}function jh(b){let D=0;for(let Z of b)Z.texture!==null&&D++;return D}function oo(b,D,Z){D.isScene!==!0&&(D=ee);let G=Ot.get(b),H=A.state.lights,yt=A.state.shadowsArray,Tt=H.state.version,ft=Q.getParameters(b,H.state,yt,D,Z,A.state.lightProbeGridArray),wt=Q.getProgramCacheKey(ft),It=G.programs;G.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?D.environment:null,G.fog=D.fog;let Wt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;G.envMap=T.get(b.envMap||G.environment,Wt),G.envMapRotation=G.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,It===void 0&&(b.addEventListener("dispose",pe),It=new Map,G.programs=It,G.programVariants=new Map);let ie=It.get(wt);if(ie!==void 0){if(G.currentProgram===ie&&G.lightsStateVersion===Tt)return qh(b,ft),ie}else ft.uniforms=Q.getUniforms(b),O!==null&&b.isNodeMaterial&&O.build(b,Z,ft),b.onBeforeCompile(ft,C),ie=Q.acquireProgram(ft,wt),It.set(wt,ie),G.uniforms=ft.uniforms;let Ct=G.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ct.clippingPlanes=$.uniform),qh(b,ft),G.needsLights=Rm(b),G.lightsStateVersion=Tt,G.needsLights&&(Ct.ambientLightColor.value=H.state.ambient,Ct.lightProbe.value=H.state.probe,Ct.sunLights.value=H.state.sun,Ct.sunLightShadows.value=H.state.sunShadow,Ct.directionalLights.value=H.state.directional,Ct.directionalLightShadows.value=H.state.directionalShadow,Ct.spotLights.value=H.state.spot,Ct.spotLightShadows.value=H.state.spotShadow,Ct.rectAreaLights.value=H.state.rectArea,Ct.ltc_1.value=H.state.rectAreaLTC1,Ct.ltc_2.value=H.state.rectAreaLTC2,Ct.pointLights.value=H.state.point,Ct.pointLightShadows.value=H.state.pointShadow,Ct.hemisphereLights.value=H.state.hemi,Ct.sunShadowMatrix.value=H.state.sunShadowMatrix,Ct.sunShadowCascade.value=H.state.sunShadowCascade,Ct.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ct.spotLightMatrix.value=H.state.spotLightMatrix,Ct.spotLightMap.value=H.state.spotLightMap,Ct.pointShadowMatrix.value=H.state.pointShadowMatrix),G.numLightProbeGrids=jh(A.state.lightProbeGridArray),G.currentProgram=ie,G.uniformsList=null,ie}function Em(b,D,Z,G,H){let yt=Ot.get(b),Tt=yt.currentProgram.id+","+G+","+H,ft=yt.programVariants.get(Tt);return ft===void 0?(ft=oo(b,D,Z),yt.programVariants.set(Tt,ft)):(yt.currentProgram=ft,yt.uniformsList=null,yt.outputColorSpace=G,yt.toneMapping=H),ft}function Xh(b){if(b.uniformsList===null){let D=b.currentProgram.getUniforms();b.uniformsList=$r.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function qh(b,D){let Z=Ot.get(b);Z.outputColorSpace=D.outputColorSpace,Z.batching=D.batching,Z.batchingColor=D.batchingColor,Z.instancing=D.instancing,Z.instancingColor=D.instancingColor,Z.instancingMorph=D.instancingMorph,Z.skinning=D.skinning,Z.morphTargets=D.morphTargets,Z.morphNormals=D.morphNormals,Z.morphColors=D.morphColors,Z.morphTargetsCount=D.morphTargetsCount,Z.numClippingPlanes=D.numClippingPlanes,Z.numIntersection=D.numClipIntersection,Z.vertexAlphas=D.vertexAlphas,Z.vertexTangents=D.vertexTangents,Z.toneMapping=D.toneMapping}function Tm(b,D,Z,G,H){D.isScene!==!0&&(D=ee),Gt.resetTextureUnits();let yt=D.fog,Tt=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?D.environment:null,ft=et===null?C.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:oe.workingColorSpace,wt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,It=T.get(G.envMap||Tt,wt),Wt=G.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,ie=!!Z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ct=!!Z.morphAttributes.position,re=!!Z.morphAttributes.normal,Ie=!!Z.morphAttributes.color,_e=ti;G.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(_e=C.toneMapping);let ye=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,$e=ye!==void 0?ye.length:0,Rt=Ot.get(G),nn=A.state.lights;if(ct===!0&&(At===!0||b!==J)){let we=b===J&&G.id===W;$.setState(G,b,we)}let ue=!1,Xi=!1;G.version===Rt.__version?Rt.needsLights&&Rt.lightsStateVersion!==nn.state.version||H.isBatchedMesh&&Rt.batching===!1||!H.isBatchedMesh&&Rt.batching===!0||H.isBatchedMesh&&Rt.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&Rt.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&Rt.instancing===!1||!H.isInstancedMesh&&Rt.instancing===!0||H.isSkinnedMesh&&Rt.skinning===!1||!H.isSkinnedMesh&&Rt.skinning===!0||H.isInstancedMesh&&Rt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Rt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Rt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Rt.instancingMorph===!1&&H.morphTexture!==null||Rt.envMap!==It||G.fog===!0&&Rt.fog!==yt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==$.numPlanes||Rt.numIntersection!==$.numIntersection)||Rt.vertexAlphas!==Wt||Rt.vertexTangents!==ie||Rt.morphTargets!==Ct||Rt.morphNormals!==re||Rt.morphColors!==Ie||Rt.morphTargetsCount!==$e||Rt.numLightProbeGrids!==jh(A.state.lightProbeGridArray)?ue=!0:(Rt.outputColorSpace!==ft||Rt.toneMapping!==_e)&&(Xi=!0):(ue=!0,Rt.__version=G.version);let Ye=Rt.currentProgram;(ue===!0||Xi===!0)&&(Ye=Xi===!0?Em(G,D,H,ft,_e):oo(G,D,H),O&&G.isNodeMaterial&&O.onUpdateProgram(G,Ye,Rt));let Ds=!1,Si=!1,qi=!1,se=Ye.getUniforms(),Xe=Rt.uniforms;if(mt.useProgram(Ye.program)&&(Ds=!0,Si=!0,qi=!0),G.id!==W&&(W=G.id,Si=!0),Ds||J!==b){mt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),se.setValue(U,"projectionMatrix",b.projectionMatrix),se.setValue(U,"viewMatrix",b.matrixWorldInverse);let Ge=se.map.cameraPosition;Ge!==void 0&&Ge.setValue(U,Zt.setFromMatrixPosition(b.matrixWorld)),ge.logarithmicDepthBuffer&&se.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&se.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),J!==b&&(J=b,Si=!0,qi=!0)}if(Rt.needsLights&&(nn.state.sunShadowMap.length>0&&se.setValue(U,"sunShadowMap",nn.state.sunShadowMap,Gt),nn.state.directionalShadowMap.length>0&&se.setValue(U,"directionalShadowMap",nn.state.directionalShadowMap,Gt),nn.state.spotShadowMap.length>0&&se.setValue(U,"spotShadowMap",nn.state.spotShadowMap,Gt),nn.state.pointShadowMap.length>0&&se.setValue(U,"pointShadowMap",nn.state.pointShadowMap,Gt)),H.isSkinnedMesh){se.setOptional(U,H,"bindMatrix"),se.setOptional(U,H,"bindMatrixInverse");let we=H.skeleton;we&&(we.boneTexture===null&&we.computeBoneTexture(),se.setValue(U,"boneTexture",we.boneTexture,Gt))}H.isBatchedMesh&&(se.setOptional(U,H,"batchingTexture"),se.setValue(U,"batchingTexture",H._matricesTexture,Gt),se.setOptional(U,H,"batchingIdTexture"),se.setValue(U,"batchingIdTexture",H._indirectTexture,Gt),se.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&se.setValue(U,"batchingColorTexture",H._colorsTexture,Gt));let Dn=Z.morphAttributes;if((Dn.position!==void 0||Dn.normal!==void 0||Dn.color!==void 0)&&Y.update(H,Z,Ye),(Si||Rt.receiveShadow!==H.receiveShadow)&&(Rt.receiveShadow=H.receiveShadow,se.setValue(U,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&D.environment!==null&&(Xe.envMapIntensity.value=D.environmentIntensity),Xe.dfgLUT!==void 0&&(Xe.dfgLUT.value=Vx()),Si){if(se.setValue(U,"toneMappingExposure",C.toneMappingExposure),Rt.needsLights&&Cm(Xe,qi),yt&&G.fog===!0&&lt.refreshFogUniforms(Xe,yt),lt.refreshMaterialUniforms(Xe,G,vt,Ut,A.state.transmissionRenderTarget[b.id]),Rt.needsLights&&Rt.numLightProbeGrids>0){let we=_,Ge=0;for(let oi of A.state.lightProbeGridArray)oi.texture!==null&&(we.textures[Ge]=oi.texture,we.min[Ge]=oi.boundingBox.min,we.max[Ge]=oi.boundingBox.max,we.resolution[Ge]=oi.resolution,Ge++);for(let oi in we)we[oi].length=Ge;Xe.probesSH.value=we.textures,Xe.probesMin.value=we.min,Xe.probesMax.value=we.max,Xe.probesResolution.value=we.resolution}$r.upload(U,Xh(Rt),Xe,Gt)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&($r.upload(U,Xh(Rt),Xe,Gt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&se.setValue(U,"center",H.center),se.setValue(U,"modelViewMatrix",H.modelViewMatrix),se.setValue(U,"normalMatrix",H.normalMatrix),se.setValue(U,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){let we=G.uniformsGroups;for(let Ge=0,oi=we.length;Ge<oi;Ge++){let Yh=we[Ge];Nt.update(Yh,Ye),Nt.bind(Yh,Ye)}}return Ye}function Cm(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.sunLights.needsUpdate=D,b.sunLightShadows.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function Rm(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(b,D,Z){let G=Ot.get(b);G.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Ot.get(b.texture).__webglTexture=D,Ot.get(b.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Z,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,D){let Z=Ot.get(b);Z.__webglFramebuffer=D,Z.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,Z=0){et=b,F=D,B=Z;let G=null,H=!1,yt=!1;if(b){let ft=Ot.get(b);if(ft.__useDefaultFramebuffer!==void 0){mt.bindFramebuffer(U.FRAMEBUFFER,ft.__webglFramebuffer),K.copy(b.viewport),bt.copy(b.scissor),Pt=b.scissorTest,mt.viewport(K),mt.scissor(bt),mt.setScissorTest(Pt),W=-1;return}else if(ft.__webglFramebuffer===void 0)Gt.setupRenderTarget(b);else if(ft.__hasExternalTextures)Gt.rebindTextures(b,Ot.get(b.texture).__webglTexture,Ot.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Wt=b.depthTexture;if(ft.__boundDepthTexture!==Wt){if(Wt!==null&&Ot.has(Wt)&&(b.width!==Wt.image.width||b.height!==Wt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Gt.setupDepthRenderbuffer(b)}}let wt=b.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(yt=!0);let It=Ot.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(It[D])?G=It[D][Z]:G=It[D],H=!0):b.samples>0&&Gt.useMultisampledRTT(b)===!1?G=Ot.get(b).__webglMultisampledFramebuffer:Array.isArray(It)?G=It[Z]:G=It,K.copy(b.viewport),bt.copy(b.scissor),Pt=b.scissorTest}else K.copy(Bt).multiplyScalar(vt).floor(),bt.copy(Kt).multiplyScalar(vt).floor(),Pt=te;if(Z!==0&&(G=z),mt.bindFramebuffer(U.FRAMEBUFFER,G)&&mt.drawBuffers(b,G),mt.viewport(K),mt.scissor(bt),mt.setScissorTest(Pt),H){let ft=Ot.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,ft.__webglTexture,Z)}else if(yt){let ft=D;for(let wt=0;wt<b.textures.length;wt++){let It=Ot.get(b.textures[wt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+wt,It.__webglTexture,Z,ft)}}else if(b!==null&&Z!==0){let ft=Ot.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ft.__webglTexture,Z)}W=-1};function $h(b){let D=Ot.get(b);return(D.__readFormat!==b.format||D.__readType!==b.type)&&(D.__readFormat=b.format,D.__readType=b.type,D.__formatReadable=ge.textureFormatReadable(b.format),D.__typeReadable=ge.textureTypeReadable(b.type)),D}this.readRenderTargetPixels=function(b,D,Z,G,H,yt,Tt,ft=0){if(!(b&&b.isWebGLRenderTarget)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=Ot.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Tt!==void 0&&(wt=wt[Tt],Array.isArray(wt)&&(wt=wt[0])),wt){mt.bindFramebuffer(U.FRAMEBUFFER,wt);try{let It=b.textures[ft],Wt=It.format,ie=It.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);let Ct=$h(It);if(Ct.__formatReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-G&&Z>=0&&Z<=b.height-H&&U.readPixels(D,Z,G,H,st.convert(Wt),st.convert(ie),yt)}finally{let It=et!==null?Ot.get(et).__webglFramebuffer:null;mt.bindFramebuffer(U.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(b,D,Z,G,H,yt,Tt,ft=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=Ot.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Tt!==void 0&&(wt=wt[Tt],Array.isArray(wt)&&(wt=wt[0])),wt)if(D>=0&&D<=b.width-G&&Z>=0&&Z<=b.height-H){mt.bindFramebuffer(U.FRAMEBUFFER,wt);let It=b.textures[ft],Wt=It.format,ie=It.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);let Ct=$h(It);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,re),U.bufferData(U.PIXEL_PACK_BUFFER,yt.byteLength,U.STREAM_READ),U.readPixels(D,Z,G,H,st.convert(Wt),st.convert(ie),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Ie=et!==null?Ot.get(et).__webglFramebuffer:null;mt.bindFramebuffer(U.FRAMEBUFFER,Ie);let _e=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await vp(U,_e,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,re),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,yt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(re),U.deleteSync(_e),yt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,D=null,Z=0){let G=Math.pow(2,-Z),H=Math.floor(b.image.width*G),yt=Math.floor(b.image.height*G),Tt=D!==null?D.x:0,ft=D!==null?D.y:0;Gt.setTexture2D(b,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,Tt,ft,H,yt),mt.unbindTexture()},this.copyTextureToTexture=function(b,D,Z=null,G=null,H=0,yt=0){let Tt,ft,wt,It,Wt,ie,Ct,re,Ie,_e=b.isCompressedTexture?b.mipmaps[yt]:b.image;if(Z!==null)Tt=Z.max.x-Z.min.x,ft=Z.max.y-Z.min.y,wt=Z.isBox3?Z.max.z-Z.min.z:1,It=Z.min.x,Wt=Z.min.y,ie=Z.isBox3?Z.min.z:0;else{let se=Math.pow(2,-H);Tt=Math.floor(_e.width*se),ft=Math.floor(_e.height*se),b.isDataArrayTexture?wt=_e.depth:b.isData3DTexture?wt=Math.floor(_e.depth*se):wt=1,It=0,Wt=0,ie=0}G!==null?(Ct=G.x,re=G.y,Ie=G.z):(Ct=0,re=0,Ie=0);let ye=st.convert(D.format),$e=st.convert(D.type),Rt;D.isData3DTexture?(Gt.setTexture3D(D,0),Rt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Gt.setTexture2DArray(D,0),Rt=U.TEXTURE_2D_ARRAY):(Gt.setTexture2D(D,0),Rt=U.TEXTURE_2D),mt.activeTexture(U.TEXTURE0),mt.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),mt.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),mt.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);let nn=mt.getParameter(U.UNPACK_ROW_LENGTH),ue=mt.getParameter(U.UNPACK_IMAGE_HEIGHT),Xi=mt.getParameter(U.UNPACK_SKIP_PIXELS),Ye=mt.getParameter(U.UNPACK_SKIP_ROWS),Ds=mt.getParameter(U.UNPACK_SKIP_IMAGES);mt.pixelStorei(U.UNPACK_ROW_LENGTH,_e.width),mt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,_e.height),mt.pixelStorei(U.UNPACK_SKIP_PIXELS,It),mt.pixelStorei(U.UNPACK_SKIP_ROWS,Wt),mt.pixelStorei(U.UNPACK_SKIP_IMAGES,ie);let Si=b.isDataArrayTexture||b.isData3DTexture,qi=D.isDataArrayTexture||D.isData3DTexture;if(b.isDepthTexture){let se=Ot.get(b),Xe=Ot.get(D),Dn=Ot.get(se.__renderTarget),we=Ot.get(Xe.__renderTarget);mt.bindFramebuffer(U.READ_FRAMEBUFFER,Dn.__webglFramebuffer),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Ge=0;Ge<wt;Ge++)Si&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ot.get(b).__webglTexture,H,ie+Ge),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ot.get(D).__webglTexture,yt,Ie+Ge)),U.blitFramebuffer(It,Wt,It+Tt,Wt+ft,Ct,re,Ct+Tt,re+ft,U.DEPTH_BUFFER_BIT,U.NEAREST);mt.bindFramebuffer(U.READ_FRAMEBUFFER,null),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||b.isRenderTargetTexture||Ot.has(b)){let se=Ot.get(b),Xe=Ot.get(D);mt.bindFramebuffer(U.READ_FRAMEBUFFER,P),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,I);for(let Dn=0;Dn<wt;Dn++)Si?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,se.__webglTexture,H,ie+Dn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,se.__webglTexture,H),qi?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Xe.__webglTexture,yt,Ie+Dn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Xe.__webglTexture,yt),H!==0?U.blitFramebuffer(It,Wt,It+Tt,Wt+ft,Ct,re,Ct+Tt,re+ft,U.COLOR_BUFFER_BIT,U.NEAREST):qi?U.copyTexSubImage3D(Rt,yt,Ct,re,Ie+Dn,It,Wt,Tt,ft):U.copyTexSubImage2D(Rt,yt,Ct,re,It,Wt,Tt,ft);mt.bindFramebuffer(U.READ_FRAMEBUFFER,null),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else qi?b.isDataTexture||b.isData3DTexture?U.texSubImage3D(Rt,yt,Ct,re,Ie,Tt,ft,wt,ye,$e,_e.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(Rt,yt,Ct,re,Ie,Tt,ft,wt,ye,_e.data):U.texSubImage3D(Rt,yt,Ct,re,Ie,Tt,ft,wt,ye,$e,_e):b.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,yt,Ct,re,Tt,ft,ye,$e,_e.data):b.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,yt,Ct,re,_e.width,_e.height,ye,_e.data):U.texSubImage2D(U.TEXTURE_2D,yt,Ct,re,Tt,ft,ye,$e,_e);mt.pixelStorei(U.UNPACK_ROW_LENGTH,nn),mt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ue),mt.pixelStorei(U.UNPACK_SKIP_PIXELS,Xi),mt.pixelStorei(U.UNPACK_SKIP_ROWS,Ye),mt.pixelStorei(U.UNPACK_SKIP_IMAGES,Ds),yt===0&&D.generateMipmaps===!0&&D.mipmapsAutoUpdate===!0&&U.generateMipmap(Rt),mt.unbindTexture()},this.initRenderTarget=function(b){Ot.get(b).__webglFramebuffer===void 0&&Gt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Gt.setTextureCube(b,0):b.isData3DTexture?Gt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Gt.setTexture2DArray(b,0):Gt.setTexture2D(b,0),mt.unbindTexture()},this.resetState=function(){F=0,B=0,et=null,mt.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var df={type:"change"},th={type:"start"},ff={type:"end"},Vc=new ir,pf=new yn,Hx=Math.cos(70*hs.DEG2RAD),ke=new k,hn=2*Math.PI,he={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Qu=1e-6,Hc=class extends ts{constructor(t,e=null){super(t,e),this.state=he.NONE,this.target=new k,this.cursor=new k,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ui.ROTATE,MIDDLE:Ui.DOLLY,RIGHT:Ui.PAN},this.touches={ONE:ki.ROTATE,TWO:ki.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new k,this._lastQuaternion=new _n,this._lastTargetPosition=new k,this._quat=new _n().setFromUnitVectors(t.up,new k(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Di,this._sphericalDelta=new Di,this._scale=1,this._panOffset=new k,this._rotateStart=new rt,this._rotateEnd=new rt,this._rotateDelta=new rt,this._panStart=new rt,this._panEnd=new rt,this._panDelta=new rt,this._dollyStart=new rt,this._dollyEnd=new rt,this._dollyDelta=new rt,this._dollyDirection=new k,this._mouse=new rt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Zx.bind(this),this._onPointerDown=Wx.bind(this),this._onPointerUp=jx.bind(this),this._onContextMenu=Qx.bind(this),this._onMouseWheel=$x.bind(this),this._onKeyDown=Yx.bind(this),this._onTouchStart=Jx.bind(this),this._onTouchMove=Kx.bind(this),this._onMouseDown=Xx.bind(this),this._onMouseMove=qx.bind(this),this._interceptControlDown=tv.bind(this),this._interceptControlUp=ev.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=he.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(df),this.update(),this.state=he.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;ke.copy(e).sub(this.target),ke.applyQuaternion(this._quat),this._spherical.setFromVector3(ke),this.autoRotate&&this.state===he.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=hn:i>Math.PI&&(i-=hn),r<-Math.PI?r+=hn:r>Math.PI&&(r-=hn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=s!=this._spherical.radius}if(ke.setFromSpherical(this._spherical),ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){let a=ke.length();s=this._clampDistance(a*this._scale);let c=a-s;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),o=!!c}else if(this.object.isOrthographicCamera){let a=new k(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=c!==this.object.zoom;let l=new k(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),s=ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(Vc.origin.copy(this.object.position),Vc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Vc.direction))<Hx?this.object.lookAt(this.target):(pf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Vc.intersectPlane(pf,this.target))))}else if(this.object.isOrthographicCamera){let s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>Qu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Qu||this._lastTargetPosition.distanceToSquared(this.target)>Qu?(this.dispatchEvent(df),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?hn/60*this.autoRotateSpeed*t:hn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ke.setFromMatrixColumn(e,0),ke.multiplyScalar(-t),this._panOffset.add(ke)}_panUp(t,e){this.screenSpacePanning===!0?ke.setFromMatrixColumn(e,1):(ke.setFromMatrixColumn(e,0),ke.crossVectors(this.object.up,ke)),ke.multiplyScalar(t),this._panOffset.add(ke)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;ke.copy(r).sub(this.target);let o=ke.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*o/i.clientHeight,this.object.matrix),this._panUp(2*e*o/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=t-i.left,o=e-i.top,s=i.width,a=i.height;this._mouse.x=r/s*2-1,this._mouse.y=-(o/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/e.clientHeight),this._rotateUp(hn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,o=Math.sqrt(i*i+r*r);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),o=.5*(t.pageY+i.y);this._rotateEnd.set(r,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/e.clientHeight),this._rotateUp(hn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,o=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let s=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(s,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new rt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function Wx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Zx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function jx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ff),this.state=he.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Xx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ui.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=he.DOLLY;break;case Ui.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}break;case Ui.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(th)}function qx(n){switch(this.state){case he.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case he.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case he.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function $x(n){this.enabled===!1||this.enableZoom===!1||this.state!==he.NONE||(n.preventDefault(),this.dispatchEvent(th),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(ff))}function Yx(n){this.enabled!==!1&&this._handleKeyDown(n)}function Jx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ki.ROTATE:if(this.enableRotate===!1){this.state=he.NONE;break}this._handleTouchStartRotate(n),this.state=he.TOUCH_ROTATE;break;case ki.PAN:if(this.enablePan===!1){this.state=he.NONE;break}this._handleTouchStartPan(n),this.state=he.TOUCH_PAN;break;default:this.state=he.NONE}break;case 2:switch(this.touches.TWO){case ki.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=he.TOUCH_DOLLY_PAN;break;case ki.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=he.TOUCH_DOLLY_ROTATE;break;default:this.state=he.NONE}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(th)}function Kx(n){switch(this._trackPointer(n),this.state){case he.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case he.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case he.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case he.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=he.NONE}}function Qx(n){this.enabled!==!1&&n.preventDefault()}function tv(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ev(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Wc=class extends nr{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new Jn;t.deleteAttribute("uv");let e=new mi({side:qe}),i=new mi,r=new Jo(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let o=new be(t,e);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);let s=new Ro(t,i,6),a=new Ne;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),s.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),s.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),s.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),s.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),s.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),s.setMatrixAt(5,a.matrix),this.add(s);let c=new be(t,Kr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new be(t,Kr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new be(t,Kr(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let h=new be(t,Kr(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);let d=new be(t,Kr(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let p=new be(t,Kr(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function Kr(n){return new jo({color:0,emissive:16777215,emissiveIntensity:n})}var Re=(n,t=.5,e=.35)=>new mi({color:n,roughness:t,metalness:e}),Wn=(n,t,e=[0,0,0])=>{let i=new be(n,t);return i.position.set(...e),i.castShadow=!0,i.receiveShadow=!0,i};function Oe(n,t,e,i){let r=Wn(new Jn(...t),i,e);return n.add(r),r}function Bi(n,t,e,i){let r=Wn(new Vo(1,40,24),i,e);return r.scale.set(...t),n.add(r),r}function je(n,t,e,i,r,o,s="z"){let a=Wn(new No(t,e,i,32),o,r);return s==="z"&&(a.rotation.x=Math.PI/2),s==="x"&&(a.rotation.z=Math.PI/2),n.add(a),a}function zi(n,t,e,i,r){let o=new or(t.map(([c,l])=>new rt(c,l))),s=new Gr(o,{depth:i,bevelEnabled:!0,bevelThickness:.012,bevelSize:.015,bevelSegments:2,steps:1});s.rotateX(Math.PI/2);let a=Wn(s,r,[0,e+i/2,0]);return n.add(a),a}function Zc(n,t,e,i,r){let o=new or(t.map(([c,l])=>new rt(-c,l))),s=new Gr(o,{depth:i,bevelEnabled:!0,bevelSize:.015,bevelThickness:.01,bevelSegments:2});s.rotateY(Math.PI/2);let a=Wn(s,r,[e-i/2,0,0]);return n.add(a),a}function dn(n,t,e=4608846,i=1){let r=new Fr(new Ze().setFromPoints(t.map(o=>new k(...o))),new rr({color:e,linewidth:i}));return n.add(r),r}function gf(n,t,e,i=40){let r=[],o=[];t.forEach(([c,l,u,h=0])=>{for(let d=0;d<i;d++){let p=d/i*Math.PI*2;r.push(Math.cos(p)*l,Math.sin(p)*u+h,c)}});for(let c=0;c<t.length-1;c++)for(let l=0;l<i;l++){let u=c*i+l,h=c*i+(l+1)%i,d=u+i,p=h+i;o.push(u,d,h,h,d,p)}let s=new Ze;s.setAttribute("position",new le(r,3)),s.setIndex(o),s.computeVertexNormals();let a=Wn(s,e);return n.add(a),a}function jc(n,t,e,i,r,o="z"){let s=Wn(new Ho(t,e,8,48),r,i);return o==="x"&&(s.rotation.y=Math.PI/2),o==="y"&&(s.rotation.x=Math.PI/2),n.add(s),s}function mf(){let n=new Cn,t=Re(9674654,.43,.5),e=Re(6846584,.4,.65),i=Re(1582372,.6,.3),r=Re(6712424,.3,.85);gf(n,[[5.7,.015,.015,0],[5.1,.13,.12,0],[4.25,.29,.25,.03],[3.25,.42,.34,.05],[2,.56,.43,.04],[.8,.65,.47,.03],[-.8,.77,.46,.02],[-2.5,.76,.42,.04],[-3.9,.65,.36,.02],[-4.6,.55,.32,0]],t);for(let a of[-1,1]){zi(n,[[a*.55,1.5],[a*3.55,-2.55],[a*3.8,-2.95],[a*3.75,-3.3],[a*.7,-3.05]],-.08,.065,t),zi(n,[[a*.55,2.4],[a*1.75,1.65],[a*1.9,1.25],[a*.6,1.15]],.16,.055,e),dn(n,[[a*.72,-.025,-1.95],[a*3.1,-.025,-2.9]],5070169),dn(n,[[a*1.55,-.027,-.5],[a*2.75,-.027,-2.78]],6254441),je(n,.055,.055,1.05,[a*3.7,-.06,-2.85],e),Bi(n,[.42,.31,1.65],[a*.43,-.04,-2.85],t),je(n,.31,.34,.68,[a*.37,-.04,-4.35],r),jc(n,.3,.035,[a*.37,-.04,-4.72],e);let c=Wn(new Pi(.265,32),i,[a*.37,-.04,-4.76]);c.rotation.y=Math.PI,n.add(c);for(let u=0;u<16;u++){let h=u*Math.PI/8;dn(n,[[a*.37+Math.cos(h)*.32,-.04+Math.sin(h)*.32,-4.06],[a*.37+Math.cos(h)*.3,-.04+Math.sin(h)*.3,-4.69]],3160889)}Bi(n,[.28,.27,.85],[a*.64,-.12,.8],t);let l=Wn(new Pi(.21,32),i,[a*.67,-.1,1.57]);l.scale.x=.85,n.add(l),dn(n,[[a*.5,.31,3.1],[a*.7,.32,1.7],[a*.76,.3,.1],[a*.72,.29,-2]],6517100)}Zc(n,[[-1.85,.38],[-3.25,2.08],[-4.15,2.26],[-4.38,.3]],0,.08,t),dn(n,[[.051,.55,-3.98],[.051,1.92,-3.85]],5859680);let o=new Zo({color:1521723,metalness:.5,roughness:.13,clearcoat:1,clearcoatRoughness:.12});Bi(n,[.445,.16,1.13],[0,.43,2.1],e),Bi(n,[.405,.345,1.08],[0,.46,2.1],o);let s=[];for(let a=0;a<=64;a++){let c=a*Math.PI/32;s.push([Math.cos(c)*.415,.5,2.1+Math.sin(c)*1.07])}dn(n,s,7965057),dn(n,[[0,.52,3.15],[0,.77,2.55],[0,.8,2],[0,.69,1.3],[0,.49,1.03]],8950666);for(let a of[-1,1]){let c=Wn(new Pi(.11,32),Re(5402467,.8,.1),[a*2,-.035,-1.72]);c.rotation.x=-Math.PI/2,n.add(c),jc(n,.11,.014,[a*2,-.028,-1.72],Re(11383712,.8,.1),"y")}return n}function nv(){let n=new Cn,t=Re(7436635,.75,.2),e=Re(5266758,.7,.25),i=Re(2567463,.85,.3),r=Re(5923920,.65,.4),o=Re(1383961,.7,.25);Oe(n,[2.6,.65,4.8],[0,.05,0],e),zi(n,[[-1.38,2.15],[-1.07,2.7],[1.07,2.7],[1.38,2.15],[1.38,-2.35],[-1.38,-2.35]],.43,.38,t);for(let a of[-1,1]){Oe(n,[.58,.9,4.45],[a*1.48,-.24,0],i);for(let c=0;c<6;c++){let l=-1.85+c*.74;je(n,.43,.43,.22,[a*1.8,-.25,l],r,"x"),jc(n,.35,.045,[a*1.93,-.25,l],i,"x"),je(n,.12,.12,.25,[a*1.82,-.25,l],e,"x")}for(let c=0;c<21;c++)for(let l of[-.72,.23])Oe(n,[.65,.1,.16],[a*1.48,l,-2.1+c*.21],e);for(let c=0;c<5;c++)Oe(n,[.09,.54,.85],[a*1.82,.36,-1.85+c*.9],t);Oe(n,[.15,.22,3.8],[a*1.18,.8,-.2],e)}je(n,.93,1.1,.15,[0,.7,0],e,"y"),Bi(n,[1.13,.48,1.23],[0,.97,-.1],t);for(let a of[-1,1])for(let c=0;c<3;c++){let l=Oe(n,[.34,.27,.43],[a*(.58+c*.16),1.13,.75-c*.42],e);l.rotation.y=a*-.3}je(n,.16,.22,.6,[0,1.05,1.1],e),je(n,.075,.1,3.4,[0,1.05,2.75],t),je(n,.12,.1,.22,[0,1.05,4.46],e);let s=Wn(new Pi(.065,16),o,[0,1.05,4.58]);n.add(s),je(n,.34,.34,.12,[-.36,1.37,-.2],e,"y"),je(n,.28,.28,.1,[.48,1.36,-.35],t,"y"),Oe(n,[.28,.19,.18],[.45,1.45,.25],o),je(n,.014,.018,1.05,[-.7,1.65,-.65],o,"y");for(let a=0;a<8;a++)Oe(n,[1.4,.025,.055],[0,.66,-1.5-a*.08],o);for(let a of[-1,1])Bi(n,[.12,.1,.07],[a*.92,.59,2.45],Re(13881510,.25,.4));return n}function iv(){let n=new Cn,t=Re(9082771,.6,.45),e=Re(5860453,.75,.25),i=Re(2374460,.3,.45),r=Re(5860198,.5,.5),o=[[-.82,-5.1],[-1.08,-3.7],[-1.05,2.9],[-.7,4.65],[0,6.1],[.7,4.65],[1.05,2.9],[1.08,-3.7],[.82,-5.1]];zi(n,o,-.15,.75,t),zi(n,o,.24,.05,e),Oe(n,[1.7,.65,2.9],[0,.6,.6],t),Oe(n,[1.5,.7,1.7],[0,1.25,1.1],t),Oe(n,[1.28,.35,1.1],[0,1.76,1.2],t),Oe(n,[1.34,.18,.035],[0,1.7,1.77],i);for(let s of[-1,1])Oe(n,[.035,.18,.8],[s*.66,1.7,1.15],i);Oe(n,[.72,.95,.9],[0,1.47,-.6],r),Oe(n,[.75,.1,.95],[0,1.98,-.6],i),je(n,.045,.08,2.2,[0,2.45,.25],t,"y"),Oe(n,[1.22,.1,.16],[0,3.35,.25],r),Oe(n,[.9,.48,.12],[0,3.05,.25],t),Bi(n,[.32,.28,.32],[0,2.14,1.2],Re(12042677,.75,.1)),Oe(n,[1.6,.65,1.3],[0,.58,-1.8],t),je(n,.37,.45,.32,[0,.4,3.9],t,"y"),Bi(n,[.4,.25,.48],[0,.65,3.9],t),je(n,.045,.06,.95,[0,.65,4.65],r);for(let s of[-1,1]){for(let a=0;a<20;a++)je(n,.012,.012,.22,[s*(a<3?.76:1),.4,-4.7+a*.46],t,"y");dn(n,[[s*.8,.51,-4.8],[s*1,.51,-3.6],[s*1,.51,2.7],[s*.64,.51,4.6]],11647920);for(let a=0;a<8;a++)Oe(n,[.035,.06,.13],[s*1.08,.06,-2.5+a*.6],i)}return jc(n,.66,.012,[0,.285,-3.65],Re(13816756,.9,.1),"y"),dn(n,[[-.2,.29,-4.03],[-.2,.29,-3.3]],12633518),dn(n,[[.2,.29,-4.03],[.2,.29,-3.3]],12633518),dn(n,[[-.2,.29,-3.67],[.2,.29,-3.67]],12633518),n}function rv(){let n=new Cn,t=Re(4082761,.4,.6),e=Re(4741716,.5,.5),i=Re(1516319,.7,.25);gf(n,[[5.5,.015,.02],[5.15,.42,.4],[4.5,.73,.68],[3.2,.85,.76],[0,.86,.78],[-2.9,.83,.75],[-4.2,.53,.5],[-5,.22,.22],[-5.5,.045,.045]],t),Zc(n,[[1.5,.65],[1.25,1.7],[.6,1.95],[-.7,1.88],[-1.1,.7]],0,.45,e),zi(n,[[-.2,1.05],[-1.65,.55],[-1.65,.23],[-.2,.25]],1.25,.07,e),zi(n,[[.2,1.05],[1.65,.55],[1.65,.23],[.2,.25]],1.25,.07,e),je(n,.035,.035,.55,[.05,2.12,.25],i,"y"),je(n,.025,.025,.3,[-.1,2.03,.75],i,"y"),Zc(n,[[-3.75,.35],[-4.6,1.35],[-5.1,1.35],[-4.9,.1]],0,.06,e),Zc(n,[[-3.75,-.35],[-4.6,-1.15],[-5.1,-1.15],[-4.9,-.1]],0,.06,e);for(let r of[-1,1])zi(n,[[r*.3,-3.8],[r*1.35,-4.55],[r*1.35,-5.05],[r*.2,-4.9]],0,.06,e);for(let r of[3,-2.4]){let o=[];for(let s=0;s<=48;s++){let a=s*Math.PI/24;o.push([Math.cos(a)*.857,Math.sin(a)*.776,r])}dn(n,o,2504754)}return dn(n,[[0,.79,3.7],[0,.8,1.55]],8754055),dn(n,[[0,.79,-1.3],[0,.72,-3.4]],8754055),je(n,.13,.06,.4,[0,0,-5.45],e),n}function yf(n){return({rafale:mf,tank:nv,frigate:iv,submarine:rv}[n]||mf)()}var Xc=class{constructor(t){this.container=t,this.enabled=!0,this.model=null,this.spin=!1,this.wire=!1,this.scene=new nr,this.camera=new Qe(35,1,.1,150),this.renderer=new Bc({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=$a,this.renderer.toneMapping=ns,this.renderer.toneMappingExposure=1.25,t.append(this.renderer.domElement);let e=new Yr(this.renderer),i=new Wc;this.environment=e.fromScene(i,.04).texture,this.scene.environment=this.environment,i.dispose(),e.dispose(),this.scene.add(new qo(14542804,2635050,2.2));let r=new Hr(15790303,4.2);r.position.set(-6,12,8),r.castShadow=!0,r.shadow.mapSize.set(2048,2048),Object.assign(r.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:40}),r.shadow.bias=-5e-4,this.scene.add(r);let o=new Hr(11979227,2.5);o.position.set(8,6,-8),this.scene.add(o),this.floor=new be(new ar(100,100),new Wo({opacity:.23})),this.floor.rotation.x=-Math.PI/2,this.floor.receiveShadow=!0,this.scene.add(this.floor),this.grid=new Qo(90,90,7505256,6123605),this.grid.material.transparent=!0,this.grid.material.opacity=.13,this.scene.add(this.grid),this.controls=new Hc(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enablePan=!1,this.controls.minDistance=9,this.controls.maxDistance=35,this.controls.maxPolarAngle=Math.PI*.88,this.controls.autoRotateSpeed=.5,this.controls.target.set(0,0,0),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),t.addEventListener("keydown",s=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","+","-"].includes(s.key))if(s.preventDefault(),s.key==="+"||s.key==="-")this.zoom(s.key==="+"?.86:1.16);else{let a=new Di().setFromVector3(this.camera.position);s.key==="ArrowLeft"&&(a.theta-=.12),s.key==="ArrowRight"&&(a.theta+=.12),s.key==="ArrowUp"&&(a.phi=Math.max(.03,a.phi-.12)),s.key==="ArrowDown"&&(a.phi=Math.min(Math.PI*.86,a.phi+.12)),this.camera.position.setFromSpherical(a),this.controls.update()}}),this.last=performance.now(),this.tick(),this.reset()}resize(){let t=this.container.clientWidth,e=this.container.clientHeight;!t||!e||(this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix())}setModel(t){if(this.model&&(this.scene.remove(this.model),this.model.traverse(a=>{if(a.geometry?.dispose(),a.material)for(let c of Array.isArray(a.material)?a.material:[a.material])c.dispose()}),this.model=null),!t){this.renderer.domElement.hidden=!0;return}this.renderer.domElement.hidden=!1,this.model=yf(t);let e=new Rn().setFromObject(this.model),i=e.getSize(new k),r=e.getCenter(new k),o=10/Math.max(i.x,i.z);this.model.scale.setScalar(o),this.model.position.copy(r).multiplyScalar(-o);let s=(e.min.y-r.y)*o-.5;this.floor.position.y=s,this.grid.position.y=s+.01,this.scene.add(this.model),this.setWireframe(this.wire),this.reset(),this.resize(),this.renderer.domElement.setAttribute("data-model",t)}reset(){this.angle("perspective")}angle(t){let e={perspective:[-12,8,15],top:[0,21,.02],side:[21,2,0]};this.camera.position.set(...e[t]),this.controls.target.set(0,0,0),this.controls.update()}zoom(t){let e=hs.clamp(this.camera.position.length()*t,9,35);this.camera.position.setLength(e),this.controls.update()}setWireframe(t){this.wire=t,this.model?.traverse(e=>{if(e.isMesh)for(let i of Array.isArray(e.material)?e.material:[e.material])i.wireframe=t})}tick(){requestAnimationFrame(()=>this.tick());let t=performance.now(),e=Math.min((t-this.last)/1e3,.1);this.last=t,this.enabled&&!document.hidden&&(this.controls.autoRotate=this.spin,this.controls.update(e),this.renderer.render(this.scene,this.camera))}};function qc(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function ov(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function _f(n){let t,e,i;n.length!==2?(t=qc,e=(a,c)=>qc(n(a),c),i=(a,c)=>n(a)-c):(t=n===qc||n===ov?n:sv,e=n,i=n);function r(a,c,l=0,u=a.length){if(l<u){if(t(c,c)!==0)return u;do{let h=l+u>>>1;e(a[h],c)<0?l=h+1:u=h}while(l<u)}return l}function o(a,c,l=0,u=a.length){if(l<u){if(t(c,c)!==0)return u;do{let h=l+u>>>1;e(a[h],c)<=0?l=h+1:u=h}while(l<u)}return l}function s(a,c,l=0,u=a.length){let h=r(a,c,l,u-1);return h>l&&i(a[h-1],c)>-i(a[h],c)?h-1:h}return{left:r,center:s,right:o}}function sv(){return 0}function av(n){return n===null?NaN:+n}var xf=_f(qc),Bw=xf.right,zw=xf.left,Gw=_f(av).center;var Vw=vf(Mf),Hw=vf(cv);function vf(n){return function(t,e,i=e){if(!((e=+e)>=0))throw new RangeError("invalid rx");if(!((i=+i)>=0))throw new RangeError("invalid ry");let{data:r,width:o,height:s}=t;if(!((o=Math.floor(o))>=0))throw new RangeError("invalid width");if(!((s=Math.floor(s!==void 0?s:r.length/o))>=0))throw new RangeError("invalid height");if(!o||!s||!e&&!i)return t;let a=e&&n(e),c=i&&n(i),l=r.slice();return a&&c?(Qr(a,l,r,o,s),Qr(a,r,l,o,s),Qr(a,l,r,o,s),to(c,r,l,o,s),to(c,l,r,o,s),to(c,r,l,o,s)):a?(Qr(a,r,l,o,s),Qr(a,l,r,o,s),Qr(a,r,l,o,s)):c&&(to(c,r,l,o,s),to(c,l,r,o,s),to(c,r,l,o,s)),t}}function Qr(n,t,e,i,r){for(let o=0,s=i*r;o<s;)n(t,e,o,o+=i,1)}function to(n,t,e,i,r){for(let o=0,s=i*r;o<i;++o)n(t,e,o,o+s,i)}function cv(n){let t=Mf(n);return(e,i,r,o,s)=>{r<<=2,o<<=2,s<<=2,t(e,i,r+0,o+0,s),t(e,i,r+1,o+1,s),t(e,i,r+2,o+2,s),t(e,i,r+3,o+3,s)}}function Mf(n){let t=Math.floor(n);if(t===n)return lv(n);let e=n-t,i=2*n+1;return(r,o,s,a,c)=>{if(!((a-=c)>=s))return;let l=t*o[s],u=c*t,h=u+c;for(let d=s,p=s+u;d<p;d+=c)l+=o[Math.min(a,d)];for(let d=s,p=a;d<=p;d+=c)l+=o[Math.min(a,d+u)],r[d]=(l+e*(o[Math.max(s,d-h)]+o[Math.min(a,d+h)]))/i,l-=o[Math.max(s,d-u)]}}function lv(n){let t=2*n+1;return(e,i,r,o,s)=>{if(!((o-=s)>=r))return;let a=n*i[r],c=s*n;for(let l=r,u=r+c;l<u;l+=s)a+=i[Math.min(o,l)];for(let l=r,u=o;l<=u;l+=s)a+=i[Math.min(o,l+c)],e[l]=a/t,a-=i[Math.max(r,l-c)]}}var on=class{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){let e=this._partials,i=0;for(let r=0;r<this._n&&r<32;r++){let o=e[r],s=t+o,a=Math.abs(t)<Math.abs(o)?t-(s-o):o-(s-t);a&&(e[i++]=a),t=s}return e[i]=t,this._n=i+1,this}valueOf(){let t=this._partials,e=this._n,i,r,o,s=0;if(e>0){for(s=t[--e];e>0&&(i=s,r=t[--e],s=i+r,o=r-(s-i),!o););e>0&&(o<0&&t[e-1]<0||o>0&&t[e-1]>0)&&(r=o*2,i=s+r,r==i-s&&(s=i))}return s}};var uv=Array.prototype,Ww=uv.slice;var Zw=Math.sqrt(50),jw=Math.sqrt(10),Xw=Math.sqrt(2);function*hv(n){for(let t of n)yield*t}function eh(n){return Array.from(hv(n))}var qw=dv(Math.random);function dv(n){return function(e,i=0,r=e.length){let o=r-(i=+i);for(;o;){let s=n()*o--|0,a=e[o+i];e[o+i]=e[s+i],e[s+i]=a}return e}}var me=1e-6,tl=1e-12,ae=Math.PI,en=ae/2,Sf=ae/4,Ln=ae*2,Zn=180/ae,Ee=ae/180,Me=Math.abs,Cs=Math.atan,Gi=Math.atan2,$t=Math.cos;var Hf=Math.exp,sh=Math.hypot,Wf=Math.log;var jt=Math.sin,pv=Math.sign||function(n){return n>0?1:n<0?-1:0},Xn=Math.sqrt,Zf=Math.tan;function jf(n){return n>1?0:n<-1?ae:Math.acos(n)}function Nn(n){return n>1?en:n<-1?-en:Math.asin(n)}function Sn(){}function el(n,t){n&&wf.hasOwnProperty(n.type)&&wf[n.type](n,t)}var bf={Feature:function(n,t){el(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,i=-1,r=e.length;++i<r;)el(e[i].geometry,t)}},wf={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)n=e[i],t.point(n[0],n[1],n[2])},LineString:function(n,t){ah(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)ah(e[i],t,0)},Polygon:function(n,t){Af(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)Af(e[i],t)},GeometryCollection:function(n,t){for(var e=n.geometries,i=-1,r=e.length;++i<r;)el(e[i],t)}};function ah(n,t,e){var i=-1,r=n.length-e,o;for(t.lineStart();++i<r;)o=n[i],t.point(o[0],o[1],o[2]);t.lineEnd()}function Af(n,t){var e=-1,i=n.length;for(t.polygonStart();++e<i;)ah(n[e],t,1);t.polygonEnd()}function fr(n,t){n&&bf.hasOwnProperty(n.type)?bf[n.type](n,t):el(n,t)}var Kw=new on,Qw=new on;function ch(n){return[Gi(n[1],n[0]),Nn(n[2])]}function no(n){var t=n[0],e=n[1],i=$t(e);return[i*$t(t),i*jt(t),jt(e)]}function $c(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function nl(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function nh(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function Yc(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function lh(n){var t=Xn(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}var gs,il,rl,ol,sl,al,cl,ll,uh,hh,dh,Xf,qf,sn,an,cn,jn={sphere:Sn,point:Ah,lineStart:Ef,lineEnd:Tf,polygonStart:function(){jn.lineStart=gv,jn.lineEnd=yv},polygonEnd:function(){jn.lineStart=Ef,jn.lineEnd=Tf}};function Ah(n,t){n*=Ee,t*=Ee;var e=$t(t);Rs(e*$t(n),e*jt(n),jt(t))}function Rs(n,t,e){++gs,rl+=(n-rl)/gs,ol+=(t-ol)/gs,sl+=(e-sl)/gs}function Ef(){jn.point=fv}function fv(n,t){n*=Ee,t*=Ee;var e=$t(t);sn=e*$t(n),an=e*jt(n),cn=jt(t),jn.point=mv,Rs(sn,an,cn)}function mv(n,t){n*=Ee,t*=Ee;var e=$t(t),i=e*$t(n),r=e*jt(n),o=jt(t),s=Gi(Xn((s=an*o-cn*r)*s+(s=cn*i-sn*o)*s+(s=sn*r-an*i)*s),sn*i+an*r+cn*o);il+=s,al+=s*(sn+(sn=i)),cl+=s*(an+(an=r)),ll+=s*(cn+(cn=o)),Rs(sn,an,cn)}function Tf(){jn.point=Ah}function gv(){jn.point=_v}function yv(){$f(Xf,qf),jn.point=Ah}function _v(n,t){Xf=n,qf=t,n*=Ee,t*=Ee,jn.point=$f;var e=$t(t);sn=e*$t(n),an=e*jt(n),cn=jt(t),Rs(sn,an,cn)}function $f(n,t){n*=Ee,t*=Ee;var e=$t(t),i=e*$t(n),r=e*jt(n),o=jt(t),s=an*o-cn*r,a=cn*i-sn*o,c=sn*r-an*i,l=sh(s,a,c),u=Nn(l),h=l&&-u/l;uh.add(h*s),hh.add(h*a),dh.add(h*c),il+=u,al+=u*(sn+(sn=i)),cl+=u*(an+(an=r)),ll+=u*(cn+(cn=o)),Rs(sn,an,cn)}function Yf(n){gs=il=rl=ol=sl=al=cl=ll=0,uh=new on,hh=new on,dh=new on,fr(n,jn);var t=+uh,e=+hh,i=+dh,r=sh(t,e,i);return r<tl&&(t=al,e=cl,i=ll,il<me&&(t=rl,e=ol,i=sl),r=sh(t,e,i),r<tl)?[NaN,NaN]:[Gi(e,t)*Zn,Nn(i/r)*Zn]}function ph(n,t){function e(i,r){return i=n(i,r),t(i[0],i[1])}return n.invert&&t.invert&&(e.invert=function(i,r){return i=t.invert(i,r),i&&n.invert(i[0],i[1])}),e}function fh(n,t){return Me(n)>ae&&(n-=Math.round(n/Ln)*Ln),[n,t]}fh.invert=fh;function xv(n,t,e){return(n%=Ln)?t||e?ph(Rf(n),Pf(t,e)):Rf(n):t||e?Pf(t,e):fh}function Cf(n){return function(t,e){return t+=n,Me(t)>ae&&(t-=Math.round(t/Ln)*Ln),[t,e]}}function Rf(n){var t=Cf(n);return t.invert=Cf(-n),t}function Pf(n,t){var e=$t(n),i=jt(n),r=$t(t),o=jt(t);function s(a,c){var l=$t(c),u=$t(a)*l,h=jt(a)*l,d=jt(c),p=d*e+u*i;return[Gi(h*r-p*o,u*e-d*i),Nn(p*r+h*o)]}return s.invert=function(a,c){var l=$t(c),u=$t(a)*l,h=jt(a)*l,d=jt(c),p=d*r-h*o;return[Gi(h*r+d*o,u*e+p*i),Nn(p*e-u*i)]},s}function vv(n,t,e,i,r,o){if(e){var s=$t(t),a=jt(t),c=i*e;r==null?(r=t+i*Ln,o=t-c/2):(r=If(s,r),o=If(s,o),(i>0?r<o:r>o)&&(r+=i*Ln));for(var l,u=r;i>0?u>o:u<o;u-=c)l=ch([s,-a*$t(u),-a*jt(u)]),n.point(l[0],l[1])}}function If(n,t){t=no(t),t[0]-=n,lh(t);var e=jf(-t[1]);return((-t[2]<0?-e:e)+Ln-me)%Ln}function Jf(){var n=[],t;return{point:function(e,i,r){t.push([e,i,r])},lineStart:function(){n.push(t=[])},lineEnd:Sn,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}}function Qc(n,t){return Me(n[0]-t[0])<me&&Me(n[1]-t[1])<me}function Jc(n,t,e,i){this.x=n,this.z=t,this.o=e,this.e=i,this.v=!1,this.n=this.p=null}function Kf(n,t,e,i,r){var o=[],s=[],a,c;if(n.forEach(function(f){if(!((x=f.length-1)<=0)){var x,m=f[0],g=f[x],M;if(Qc(m,g)){if(!m[2]&&!g[2]){for(r.lineStart(),a=0;a<x;++a)r.point((m=f[a])[0],m[1]);r.lineEnd();return}g[0]+=2*me}o.push(M=new Jc(m,f,null,!0)),s.push(M.o=new Jc(m,null,M,!1)),o.push(M=new Jc(g,f,null,!1)),s.push(M.o=new Jc(g,null,M,!0))}}),!!o.length){for(s.sort(t),Lf(o),Lf(s),a=0,c=s.length;a<c;++a)s[a].e=e=!e;for(var l=o[0],u,h;;){for(var d=l,p=!0;d.v;)if((d=d.n)===l)return;u=d.z,r.lineStart();do{if(d.v=d.o.v=!0,d.e){if(p)for(a=0,c=u.length;a<c;++a)r.point((h=u[a])[0],h[1]);else i(d.x,d.n.x,1,r);d=d.n}else{if(p)for(u=d.p.z,a=u.length-1;a>=0;--a)r.point((h=u[a])[0],h[1]);else i(d.x,d.p.x,-1,r);d=d.p}d=d.o,u=d.z,p=!p}while(!d.v);r.lineEnd()}}}function Lf(n){if(t=n.length){for(var t,e=0,i=n[0],r;++e<t;)i.n=r=n[e],r.p=i,i=r;i.n=r=n[0],r.p=i}}function ih(n){return Me(n[0])<=ae?n[0]:pv(n[0])*((Me(n[0])+ae)%Ln-ae)}function Mv(n,t){var e=ih(t),i=t[1],r=jt(i),o=[jt(e),-$t(e),0],s=0,a=0,c=new on;r===1?i=en+me:r===-1&&(i=-en-me);for(var l=0,u=n.length;l<u;++l)if(d=(h=n[l]).length)for(var h,d,p=h[d-1],f=ih(p),x=p[1]/2+Sf,m=jt(x),g=$t(x),M=0;M<d;++M,f=_,m=A,g=y,p=S){var S=h[M],_=ih(S),E=S[1]/2+Sf,A=jt(E),y=$t(E),w=_-f,N=w>=0?1:-1,C=N*w,R=C>ae,O=m*A;if(c.add(Gi(O*N*jt(C),g*y+O*$t(C))),s+=R?w+N*Ln:w,R^f>=e^_>=e){var z=nl(no(p),no(S));lh(z);var P=nl(o,z);lh(P);var I=(R^w>=0?-1:1)*Nn(P[2]);(i>I||i===I&&(z[0]||z[1]))&&(a+=R^w>=0?1:-1)}}return(s<-me||s<me&&c<-tl)^a&1}function Qf(n,t,e,i){return function(r){var o=t(r),s=Jf(),a=t(s),c=!1,l,u,h,d={point:p,lineStart:x,lineEnd:m,polygonStart:function(){d.point=g,d.lineStart=M,d.lineEnd=S,u=[],l=[]},polygonEnd:function(){d.point=p,d.lineStart=x,d.lineEnd=m,u=eh(u);var _=Mv(l,i);u.length?(c||(r.polygonStart(),c=!0),Kf(u,bv,_,e,r)):_&&(c||(r.polygonStart(),c=!0),r.lineStart(),e(null,null,1,r),r.lineEnd()),c&&(r.polygonEnd(),c=!1),u=l=null},sphere:function(){r.polygonStart(),r.lineStart(),e(null,null,1,r),r.lineEnd(),r.polygonEnd()}};function p(_,E){n(_,E)&&r.point(_,E)}function f(_,E){o.point(_,E)}function x(){d.point=f,o.lineStart()}function m(){d.point=p,o.lineEnd()}function g(_,E){h.push([_,E]),a.point(_,E)}function M(){a.lineStart(),h=[]}function S(){g(h[0][0],h[0][1]),a.lineEnd();var _=a.clean(),E=s.result(),A,y=E.length,w,N,C;if(h.pop(),l.push(h),h=null,!!y){if(_&1){if(N=E[0],(w=N.length-1)>0){for(c||(r.polygonStart(),c=!0),r.lineStart(),A=0;A<w;++A)r.point((C=N[A])[0],C[1]);r.lineEnd()}return}y>1&&_&2&&E.push(E.pop().concat(E.shift())),u.push(E.filter(Sv))}}return d}}function Sv(n){return n.length>1}function bv(n,t){return((n=n.x)[0]<0?n[1]-en-me:en-n[1])-((t=t.x)[0]<0?t[1]-en-me:en-t[1])}var Nf=Qf(function(){return!0},wv,Ev,[-ae,-en]);function wv(n){var t=NaN,e=NaN,i=NaN,r;return{lineStart:function(){n.lineStart(),r=1},point:function(o,s){var a=o>0?ae:-ae,c=Me(o-t);Me(c-ae)<me?(n.point(t,e=(e+s)/2>0?en:-en),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(a,e),n.point(o,e),r=0):i!==a&&c>=ae&&(Me(t-i)<me&&(t-=i*me),Me(o-a)<me&&(o-=a*me),e=Av(t,e,o,s),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(a,e),r=0),n.point(t=o,e=s),i=a},lineEnd:function(){n.lineEnd(),t=e=NaN},clean:function(){return 2-r}}}function Av(n,t,e,i){var r,o,s=jt(n-e);return Me(s)>me?Cs((jt(t)*(o=$t(i))*jt(e)-jt(i)*(r=$t(t))*jt(n))/(r*o*s)):(t+i)/2}function Ev(n,t,e,i){var r;if(n==null)r=e*en,i.point(-ae,r),i.point(0,r),i.point(ae,r),i.point(ae,0),i.point(ae,-r),i.point(0,-r),i.point(-ae,-r),i.point(-ae,0),i.point(-ae,r);else if(Me(n[0]-t[0])>me){var o=n[0]<t[0]?ae:-ae;r=e*o/2,i.point(-o,r),i.point(0,r),i.point(o,r)}else i.point(t[0],t[1])}function Tv(n){var t=$t(n),e=2*Ee,i=t>0,r=Me(t)>me;function o(u,h,d,p){vv(p,n,e,d,u,h)}function s(u,h){return $t(u)*$t(h)>t}function a(u){var h,d,p,f,x;return{lineStart:function(){f=p=!1,x=1},point:function(m,g){var M=[m,g],S,_=s(m,g),E=i?_?0:l(m,g):_?l(m+(m<0?ae:-ae),g):0;if(!h&&(f=p=_)&&u.lineStart(),_!==p&&(S=c(h,M),(!S||Qc(h,S)||Qc(M,S))&&(M[2]=1)),_!==p)x=0,_?(u.lineStart(),S=c(M,h),u.point(S[0],S[1])):(S=c(h,M),u.point(S[0],S[1],2),u.lineEnd()),h=S;else if(r&&h&&i^_){var A;!(E&d)&&(A=c(M,h,!0))&&(x=0,i?(u.lineStart(),u.point(A[0][0],A[0][1]),u.point(A[1][0],A[1][1]),u.lineEnd()):(u.point(A[1][0],A[1][1]),u.lineEnd(),u.lineStart(),u.point(A[0][0],A[0][1],3)))}_&&(!h||!Qc(h,M))&&u.point(M[0],M[1]),h=M,p=_,d=E},lineEnd:function(){p&&u.lineEnd(),h=null},clean:function(){return x|(f&&p)<<1}}}function c(u,h,d){var p=no(u),f=no(h),x=[1,0,0],m=nl(p,f),g=$c(m,m),M=m[0],S=g-M*M;if(!S)return!d&&u;var _=t*g/S,E=-t*M/S,A=nl(x,m),y=Yc(x,_),w=Yc(m,E);nh(y,w);var N=A,C=$c(y,N),R=$c(N,N),O=C*C-R*($c(y,y)-1);if(!(O<0)){var z=Xn(O),P=Yc(N,(-C-z)/R);if(nh(P,y),P=ch(P),!d)return P;var I=u[0],F=h[0],B=u[1],et=h[1],W;F<I&&(W=I,I=F,F=W);var J=F-I,K=Me(J-ae)<me,bt=K||J<me;if(!K&&et<B&&(W=B,B=et,et=W),bt?K?B+et>0^P[1]<(Me(P[0]-I)<me?B:et):B<=P[1]&&P[1]<=et:J>ae^(I<=P[0]&&P[0]<=F)){var Pt=Yc(N,(-C+z)/R);return nh(Pt,y),[P,ch(Pt)]}}}function l(u,h){var d=i?n:ae-n,p=0;return u<-d?p|=1:u>d&&(p|=2),h<-d?p|=4:h>d&&(p|=8),p}return Qf(s,a,o,i?[0,-n]:[-ae,n-ae])}function Cv(n,t,e,i,r,o){var s=n[0],a=n[1],c=t[0],l=t[1],u=0,h=1,d=c-s,p=l-a,f;if(f=e-s,!(!d&&f>0)){if(f/=d,d<0){if(f<u)return;f<h&&(h=f)}else if(d>0){if(f>h)return;f>u&&(u=f)}if(f=r-s,!(!d&&f<0)){if(f/=d,d<0){if(f>h)return;f>u&&(u=f)}else if(d>0){if(f<u)return;f<h&&(h=f)}if(f=i-a,!(!p&&f>0)){if(f/=p,p<0){if(f<u)return;f<h&&(h=f)}else if(p>0){if(f>h)return;f>u&&(u=f)}if(f=o-a,!(!p&&f<0)){if(f/=p,p<0){if(f>h)return;f>u&&(u=f)}else if(p>0){if(f<u)return;f<h&&(h=f)}return u>0&&(n[0]=s+u*d,n[1]=a+u*p),h<1&&(t[0]=s+h*d,t[1]=a+h*p),!0}}}}}var ys=1e9,Kc=-ys;function Rv(n,t,e,i){function r(l,u){return n<=l&&l<=e&&t<=u&&u<=i}function o(l,u,h,d){var p=0,f=0;if(l==null||(p=s(l,h))!==(f=s(u,h))||c(l,u)<0^h>0)do d.point(p===0||p===3?n:e,p>1?i:t);while((p=(p+h+4)%4)!==f);else d.point(u[0],u[1])}function s(l,u){return Me(l[0]-n)<me?u>0?0:3:Me(l[0]-e)<me?u>0?2:1:Me(l[1]-t)<me?u>0?1:0:u>0?3:2}function a(l,u){return c(l.x,u.x)}function c(l,u){var h=s(l,1),d=s(u,1);return h!==d?h-d:h===0?u[1]-l[1]:h===1?l[0]-u[0]:h===2?l[1]-u[1]:u[0]-l[0]}return function(l){var u=l,h=Jf(),d,p,f,x,m,g,M,S,_,E,A,y={point:w,lineStart:O,lineEnd:z,polygonStart:C,polygonEnd:R};function w(I,F){r(I,F)&&u.point(I,F)}function N(){for(var I=0,F=0,B=p.length;F<B;++F)for(var et=p[F],W=1,J=et.length,K=et[0],bt,Pt,X=K[0],at=K[1];W<J;++W)bt=X,Pt=at,K=et[W],X=K[0],at=K[1],Pt<=i?at>i&&(X-bt)*(i-Pt)>(at-Pt)*(n-bt)&&++I:at<=i&&(X-bt)*(i-Pt)<(at-Pt)*(n-bt)&&--I;return I}function C(){u=h,d=[],p=[],A=!0}function R(){var I=N(),F=A&&I,B=(d=eh(d)).length;(F||B)&&(l.polygonStart(),F&&(l.lineStart(),o(null,null,1,l),l.lineEnd()),B&&Kf(d,a,I,o,l),l.polygonEnd()),u=l,d=p=f=null}function O(){y.point=P,p&&p.push(f=[]),E=!0,_=!1,M=S=NaN}function z(){d&&(P(x,m),g&&_&&h.rejoin(),d.push(h.result())),y.point=w,_&&u.lineEnd()}function P(I,F){var B=r(I,F);if(p&&f.push([I,F]),E)x=I,m=F,g=B,E=!1,B&&(u.lineStart(),u.point(I,F));else if(B&&_)u.point(I,F);else{var et=[M=Math.max(Kc,Math.min(ys,M)),S=Math.max(Kc,Math.min(ys,S))],W=[I=Math.max(Kc,Math.min(ys,I)),F=Math.max(Kc,Math.min(ys,F))];Cv(et,W,n,t,e,i)?(_||(u.lineStart(),u.point(et[0],et[1])),u.point(W[0],W[1]),B||u.lineEnd(),A=!1):B&&(u.lineStart(),u.point(I,F),A=!1)}M=I,S=F,_=B}return y}}var mh=n=>n,rh=new on,gh=new on,tm,em,yh,_h,xi={point:Sn,lineStart:Sn,lineEnd:Sn,polygonStart:function(){xi.lineStart=Pv,xi.lineEnd=Lv},polygonEnd:function(){xi.lineStart=xi.lineEnd=xi.point=Sn,rh.add(Me(gh)),gh=new on},result:function(){var n=rh/2;return rh=new on,n}};function Pv(){xi.point=Iv}function Iv(n,t){xi.point=nm,tm=yh=n,em=_h=t}function nm(n,t){gh.add(_h*n-yh*t),yh=n,_h=t}function Lv(){nm(tm,em)}var io=1/0,ul=io,Es=-io,hl=Es,dl={point:Nv,lineStart:Sn,lineEnd:Sn,polygonStart:Sn,polygonEnd:Sn,result:function(){var n=[[io,ul],[Es,hl]];return Es=hl=-(ul=io=1/0),n}};function Nv(n,t){n<io&&(io=n),n>Es&&(Es=n),t<ul&&(ul=t),t>hl&&(hl=t)}var xh=0,vh=0,_s=0,pl=0,fl=0,eo=0,Mh=0,Sh=0,xs=0,im,rm,ii,ri,In={point:mr,lineStart:Df,lineEnd:Uf,polygonStart:function(){In.lineStart=kv,In.lineEnd=Ov},polygonEnd:function(){In.point=mr,In.lineStart=Df,In.lineEnd=Uf},result:function(){var n=xs?[Mh/xs,Sh/xs]:eo?[pl/eo,fl/eo]:_s?[xh/_s,vh/_s]:[NaN,NaN];return xh=vh=_s=pl=fl=eo=Mh=Sh=xs=0,n}};function mr(n,t){xh+=n,vh+=t,++_s}function Df(){In.point=Dv}function Dv(n,t){In.point=Uv,mr(ii=n,ri=t)}function Uv(n,t){var e=n-ii,i=t-ri,r=Xn(e*e+i*i);pl+=r*(ii+n)/2,fl+=r*(ri+t)/2,eo+=r,mr(ii=n,ri=t)}function Uf(){In.point=mr}function kv(){In.point=Fv}function Ov(){om(im,rm)}function Fv(n,t){In.point=om,mr(im=ii=n,rm=ri=t)}function om(n,t){var e=n-ii,i=t-ri,r=Xn(e*e+i*i);pl+=r*(ii+n)/2,fl+=r*(ri+t)/2,eo+=r,r=ri*n-ii*t,Mh+=r*(ii+n),Sh+=r*(ri+t),xs+=r*3,mr(ii=n,ri=t)}function sm(n){this._context=n}sm.prototype={_radius:4.5,pointRadius:function(n){return this._radius=n,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(n,t){switch(this._point){case 0:{this._context.moveTo(n,t),this._point=1;break}case 1:{this._context.lineTo(n,t);break}default:{this._context.moveTo(n+this._radius,t),this._context.arc(n,t,this._radius,0,Ln);break}}},result:Sn};var bh=new on,oh,am,cm,vs,Ms,Ts={point:Sn,lineStart:function(){Ts.point=Bv},lineEnd:function(){oh&&lm(am,cm),Ts.point=Sn},polygonStart:function(){oh=!0},polygonEnd:function(){oh=null},result:function(){var n=+bh;return bh=new on,n}};function Bv(n,t){Ts.point=lm,am=vs=n,cm=Ms=t}function lm(n,t){vs-=n,Ms-=t,bh.add(Xn(vs*vs+Ms*Ms)),vs=n,Ms=t}var kf,ml,Of,Ff,gl=class{constructor(t){this._append=t==null?um:zv(t),this._radius=4.5,this._=""}pointRadius(t){return this._radius=+t,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(t,e){switch(this._point){case 0:{this._append`M${t},${e}`,this._point=1;break}case 1:{this._append`L${t},${e}`;break}default:{if(this._append`M${t},${e}`,this._radius!==Of||this._append!==ml){let i=this._radius,r=this._;this._="",this._append`m0,${i}a${i},${i} 0 1,1 0,${-2*i}a${i},${i} 0 1,1 0,${2*i}z`,Of=i,ml=this._append,Ff=this._,this._=r}this._+=Ff;break}}}result(){let t=this._;return this._="",t.length?t:null}};function um(n){let t=1;this._+=n[0];for(let e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function zv(n){let t=Math.floor(n);if(!(t>=0))throw new RangeError(`invalid digits: ${n}`);if(t>15)return um;if(t!==kf){let e=10**t;kf=t,ml=function(r){let o=1;this._+=r[0];for(let s=r.length;o<s;++o)this._+=Math.round(arguments[o]*e)/e+r[o]}}return ml}function hm(n,t){let e=3,i=4.5,r,o;function s(a){return a&&(typeof i=="function"&&o.pointRadius(+i.apply(this,arguments)),fr(a,r(o))),o.result()}return s.area=function(a){return fr(a,r(xi)),xi.result()},s.measure=function(a){return fr(a,r(Ts)),Ts.result()},s.bounds=function(a){return fr(a,r(dl)),dl.result()},s.centroid=function(a){return fr(a,r(In)),In.result()},s.projection=function(a){return arguments.length?(r=a==null?(n=null,mh):(n=a).stream,s):n},s.context=function(a){return arguments.length?(o=a==null?(t=null,new gl(e)):new sm(t=a),typeof i!="function"&&o.pointRadius(i),s):t},s.pointRadius=function(a){return arguments.length?(i=typeof a=="function"?a:(o.pointRadius(+a),+a),s):i},s.digits=function(a){if(!arguments.length)return e;if(a==null)e=null;else{let c=Math.floor(a);if(!(c>=0))throw new RangeError(`invalid digits: ${a}`);e=c}return t===null&&(o=new gl(e)),s},s.projection(n).digits(e).context(t)}function Eh(n){return function(t){var e=new wh;for(var i in n)e[i]=n[i];return e.stream=t,e}}function wh(){}wh.prototype={constructor:wh,point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function Th(n,t,e){var i=n.clipExtent&&n.clipExtent();return n.scale(150).translate([0,0]),i!=null&&n.clipExtent(null),fr(e,n.stream(dl)),t(dl.result()),i!=null&&n.clipExtent(i),n}function dm(n,t,e){return Th(n,function(i){var r=t[1][0]-t[0][0],o=t[1][1]-t[0][1],s=Math.min(r/(i[1][0]-i[0][0]),o/(i[1][1]-i[0][1])),a=+t[0][0]+(r-s*(i[1][0]+i[0][0]))/2,c=+t[0][1]+(o-s*(i[1][1]+i[0][1]))/2;n.scale(150*s).translate([a,c])},e)}function Gv(n,t,e){return dm(n,[[0,0],t],e)}function Vv(n,t,e){return Th(n,function(i){var r=+t,o=r/(i[1][0]-i[0][0]),s=(r-o*(i[1][0]+i[0][0]))/2,a=-o*i[0][1];n.scale(150*o).translate([s,a])},e)}function Hv(n,t,e){return Th(n,function(i){var r=+t,o=r/(i[1][1]-i[0][1]),s=-o*i[0][0],a=(r-o*(i[1][1]+i[0][1]))/2;n.scale(150*o).translate([s,a])},e)}var Bf=16,Wv=$t(30*Ee);function zf(n,t){return+t?jv(n,t):Zv(n)}function Zv(n){return Eh({point:function(t,e){t=n(t,e),this.stream.point(t[0],t[1])}})}function jv(n,t){function e(i,r,o,s,a,c,l,u,h,d,p,f,x,m){var g=l-i,M=u-r,S=g*g+M*M;if(S>4*t&&x--){var _=s+d,E=a+p,A=c+f,y=Xn(_*_+E*E+A*A),w=Nn(A/=y),N=Me(Me(A)-1)<me||Me(o-h)<me?(o+h)/2:Gi(E,_),C=n(N,w),R=C[0],O=C[1],z=R-i,P=O-r,I=M*z-g*P;(I*I/S>t||Me((g*z+M*P)/S-.5)>.3||s*d+a*p+c*f<Wv)&&(e(i,r,o,s,a,c,R,O,N,_/=y,E/=y,A,x,m),m.point(R,O),e(R,O,N,_,E,A,l,u,h,d,p,f,x,m))}}return function(i){var r,o,s,a,c,l,u,h,d,p,f,x,m={point:g,lineStart:M,lineEnd:_,polygonStart:function(){i.polygonStart(),m.lineStart=E},polygonEnd:function(){i.polygonEnd(),m.lineStart=M}};function g(w,N){w=n(w,N),i.point(w[0],w[1])}function M(){h=NaN,m.point=S,i.lineStart()}function S(w,N){var C=no([w,N]),R=n(w,N);e(h,d,u,p,f,x,h=R[0],d=R[1],u=w,p=C[0],f=C[1],x=C[2],Bf,i),i.point(h,d)}function _(){m.point=g,i.lineEnd()}function E(){M(),m.point=A,m.lineEnd=y}function A(w,N){S(r=w,N),o=h,s=d,a=p,c=f,l=x,m.point=S}function y(){e(h,d,u,p,f,x,o,s,r,a,c,l,Bf,i),m.lineEnd=_,_()}return m}}var Xv=Eh({point:function(n,t){this.stream.point(n*Ee,t*Ee)}});function qv(n){return Eh({point:function(t,e){var i=n(t,e);return this.stream.point(i[0],i[1])}})}function $v(n,t,e,i,r){function o(s,a){return s*=i,a*=r,[t+n*s,e-n*a]}return o.invert=function(s,a){return[(s-t)/n*i,(e-a)/n*r]},o}function Gf(n,t,e,i,r,o){if(!o)return $v(n,t,e,i,r);var s=$t(o),a=jt(o),c=s*n,l=a*n,u=s/n,h=a/n,d=(a*e-s*t)/n,p=(a*t+s*e)/n;function f(x,m){return x*=i,m*=r,[c*x-l*m+t,e-l*x-c*m]}return f.invert=function(x,m){return[i*(u*x-h*m+d),r*(p-h*x-u*m)]},f}function Yv(n){return Jv(function(){return n})()}function Jv(n){var t,e=150,i=480,r=250,o=0,s=0,a=0,c=0,l=0,u,h=0,d=1,p=1,f=null,x=Nf,m=null,g,M,S,_=mh,E=.5,A,y,w,N,C;function R(I){return w(I[0]*Ee,I[1]*Ee)}function O(I){return I=w.invert(I[0],I[1]),I&&[I[0]*Zn,I[1]*Zn]}R.stream=function(I){return N&&C===I?N:N=Xv(qv(u)(x(A(_(C=I)))))},R.preclip=function(I){return arguments.length?(x=I,f=void 0,P()):x},R.postclip=function(I){return arguments.length?(_=I,m=g=M=S=null,P()):_},R.clipAngle=function(I){return arguments.length?(x=+I?Tv(f=I*Ee):(f=null,Nf),P()):f*Zn},R.clipExtent=function(I){return arguments.length?(_=I==null?(m=g=M=S=null,mh):Rv(m=+I[0][0],g=+I[0][1],M=+I[1][0],S=+I[1][1]),P()):m==null?null:[[m,g],[M,S]]},R.scale=function(I){return arguments.length?(e=+I,z()):e},R.translate=function(I){return arguments.length?(i=+I[0],r=+I[1],z()):[i,r]},R.center=function(I){return arguments.length?(o=I[0]%360*Ee,s=I[1]%360*Ee,z()):[o*Zn,s*Zn]},R.rotate=function(I){return arguments.length?(a=I[0]%360*Ee,c=I[1]%360*Ee,l=I.length>2?I[2]%360*Ee:0,z()):[a*Zn,c*Zn,l*Zn]},R.angle=function(I){return arguments.length?(h=I%360*Ee,z()):h*Zn},R.reflectX=function(I){return arguments.length?(d=I?-1:1,z()):d<0},R.reflectY=function(I){return arguments.length?(p=I?-1:1,z()):p<0},R.precision=function(I){return arguments.length?(A=zf(y,E=I*I),P()):Xn(E)},R.fitExtent=function(I,F){return dm(R,I,F)},R.fitSize=function(I,F){return Gv(R,I,F)},R.fitWidth=function(I,F){return Vv(R,I,F)},R.fitHeight=function(I,F){return Hv(R,I,F)};function z(){var I=Gf(e,0,0,d,p,h).apply(null,t(o,s)),F=Gf(e,i-I[0],r-I[1],d,p,h);return u=xv(a,c,l),y=ph(t,F),w=ph(u,y),A=zf(y,E),P()}function P(){return N=C=null,R}return function(){return t=n.apply(this,arguments),R.invert=t.invert&&O,z()}}function pm(n){return function(t,e){var i=$t(t),r=$t(e),o=n(i*r);return o===1/0?[2,0]:[o*r*jt(t),o*jt(e)]}}function Ps(n){return function(t,e){var i=Xn(t*t+e*e),r=n(i),o=jt(r),s=$t(r);return[Gi(t*o,i*s),Nn(i&&e*o/i)]}}var Kv=pm(function(n){return Xn(2/(1+n))});Kv.invert=Ps(function(n){return 2*Nn(n/2)});var Qv=pm(function(n){return(n=jf(n))&&n/jt(n)});Qv.invert=Ps(function(n){return n});function tM(n,t){return[n,Wf(Zf((en+t)/2))]}tM.invert=function(n,t){return[n,2*Cs(Hf(t))-en]};function Vf(n,t){return[n,t]}Vf.invert=Vf;var Ss=1.340264,bs=-.081106,ws=893e-6,As=.003796,yl=Xn(3)/2,eM=12;function nM(n,t){var e=Nn(yl*jt(t)),i=e*e,r=i*i*i;return[n*$t(e)/(yl*(Ss+3*bs*i+r*(7*ws+9*As*i))),e*(Ss+bs*i+r*(ws+As*i))]}nM.invert=function(n,t){for(var e=t,i=e*e,r=i*i*i,o=0,s,a,c;o<eM&&(a=e*(Ss+bs*i+r*(ws+As*i))-t,c=Ss+3*bs*i+r*(7*ws+9*As*i),e-=s=a/c,i=e*e,r=i*i*i,!(Me(s)<tl));++o);return[yl*n*(Ss+3*bs*i+r*(7*ws+9*As*i))/$t(e),Nn(jt(e)/yl)]};function iM(n,t){var e=$t(t),i=$t(n)*e;return[e*jt(n)/i,jt(t)/i]}iM.invert=Ps(Cs);function fm(n,t){var e=t*t,i=e*e;return[n*(.8707-.131979*e+i*(-.013791+i*(.003971*e-.001529*i))),t*(1.007226+e*(.015085+i*(-.044475+.028874*e-.005916*i)))]}fm.invert=function(n,t){var e=t,i=25,r;do{var o=e*e,s=o*o;e-=r=(e*(1.007226+o*(.015085+s*(-.044475+.028874*o-.005916*s)))-t)/(1.007226+o*(.015085*3+s*(-.044475*7+.028874*9*o-.005916*11*s)))}while(Me(r)>me&&--i>0);return[n/(.8707+(o=e*e)*(-.131979+o*(-.013791+o*o*o*(.003971-.001529*o)))),e]};function mm(){return Yv(fm).scale(175.295)}function rM(n,t){return[$t(t)*jt(n),jt(t)]}rM.invert=Ps(Nn);function oM(n,t){var e=$t(t),i=1+$t(n)*e;return[e*jt(n)/i,jt(t)/i]}oM.invert=Ps(function(n){return 2*Cs(n)});function sM(n,t){return[Wf(Zf((en+t)/2)),-n]}sM.invert=function(n,t){return[-t,2*Cs(Hf(n))-en]};function Ch(n){return n}function _l(n){if(n==null)return Ch;var t,e,i=n.scale[0],r=n.scale[1],o=n.translate[0],s=n.translate[1];return function(a,c){c||(t=e=0);var l=2,u=a.length,h=new Array(u);for(h[0]=(t+=a[0])*i+o,h[1]=(e+=a[1])*r+s;l<u;)h[l]=a[l],++l;return h}}function gm(n,t){for(var e,i=n.length,r=i-t;r<--i;)e=n[r],n[r++]=n[i],n[i]=e}function Rh(n,t){return typeof t=="string"&&(t=n.objects[t]),t.type==="GeometryCollection"?{type:"FeatureCollection",features:t.geometries.map(function(e){return ym(n,e)})}:ym(n,t)}function ym(n,t){var e=t.id,i=t.bbox,r=t.properties==null?{}:t.properties,o=Ph(n,t);return e==null&&i==null?{type:"Feature",properties:r,geometry:o}:i==null?{type:"Feature",id:e,properties:r,geometry:o}:{type:"Feature",id:e,bbox:i,properties:r,geometry:o}}function Ph(n,t){var e=_l(n.transform),i=n.arcs;function r(u,h){h.length&&h.pop();for(var d=i[u<0?~u:u],p=0,f=d.length;p<f;++p)h.push(e(d[p],p));u<0&&gm(h,f)}function o(u){return e(u)}function s(u){for(var h=[],d=0,p=u.length;d<p;++d)r(u[d],h);return h.length<2&&h.push(h[0]),h}function a(u){for(var h=s(u);h.length<4;)h.push(h[0]);return h}function c(u){return u.map(a)}function l(u){var h=u.type,d;switch(h){case"GeometryCollection":return{type:h,geometries:u.geometries.map(l)};case"Point":d=o(u.coordinates);break;case"MultiPoint":d=u.coordinates.map(o);break;case"LineString":d=s(u.arcs);break;case"MultiLineString":d=u.arcs.map(s);break;case"Polygon":d=c(u.arcs);break;case"MultiPolygon":d=u.arcs.map(c);break;default:return null}return{type:h,coordinates:d}}return l(t)}var nt=n=>document.querySelector(n),An=n=>[...document.querySelectorAll(n)],xt=n=>String(n??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Fe=(n,t=0)=>n==null?"\u2014":new Intl.NumberFormat("en-IN",{maximumFractionDigits:t,minimumFractionDigits:t}).format(n),bn=n=>n==null?"\u2014":`${Fe(n,1)}%`,vm=(n,t)=>n===t?String(n):`${n}\u2013${t}`,gr=n=>n?.replaceAll("-","\u2013"),Zi=n=>n.replace(/\s+-+$/,""),ro={russia:"#b5c08a",france:"#75a8bb",israel:"#7ba89a",united_states:"#edb948"},kh={russia:"Russia",france:"France",israel:"Israel",united_states:"United States"},pn,Be,Mm,Ih=0,Hi=0,Lh=0,_m=0,Nh,Dh,Ce="india",wn={india:"India",russia:"Russia",united_states:"United States"};async function vi(n){let t=await fetch(n),e=await t.json();if(!t.ok)throw new Error(e.error||"The data could not be loaded.");return e}function Is(n){nt("#global-error").textContent=n.message,nt("#global-error").hidden=!1}function vl(){nt("#global-error").hidden=!0}function Wi(n,t,e="",i=""){return`<div class="metric"><span class="metric-label">${xt(n)}</span><div class="metric-value">${xt(t)}${i?`<small>${xt(i)}</small>`:""}</div>${e?`<div class="metric-note">${xt(e)}</div>`:""}</div>`}function uM(n){let t={rafale:"M100 4L108 53 151 86 153 94 111 81 108 108 117 118 116 123 101 116 84 123 83 118 92 108 89 81 47 94 49 86 92 53Z",tank:"M24 76L34 66 151 66 167 77 171 96 162 107 34 107 24 97ZM47 63L62 46 110 42 128 57 184 55 187 61 126 65Z",frigate:"M13 91L177 91 192 79 155 77 144 68 118 68 111 52 98 52 98 29 94 29 94 52 80 52 71 73 53 73 48 85 14 85Z",submarine:"M14 82C14 65 39 59 68 60L74 38 94 33 109 38 116 59 165 62 178 72 189 65 191 69 183 82 193 93 191 97 177 91 164 101 50 103C28 101 15 96 14 82Z"};return`<svg viewBox="0 0 200 130" aria-hidden="true"><path d="${t[n]||t.rafale}"/>${n==="tank"?'<path d="M38 94h117M40 86h115" fill="none"/>':""}</svg>`}function xl(n){let t=Zi(n.designation),e=id[t];return e?{html:`<img src="${xt(e.src)}" alt="${xt(e.alt)}" loading="lazy">`,credit:`${e.caption} \xB7 ${e.credit}`,url:e.url,license:e.license}:t==="T-90S"?{html:'<img src="/static/equipment/t90.jpg" alt="Indian Army T-90S tank" loading="lazy">',credit:"Photo: cell105 / Commons \xB7 CC BY 2.0",url:"https://commons.wikimedia.org/wiki/File:Indian_Army_T-90.jpg",license:"https://creativecommons.org/licenses/by/2.0/"}:t==="Su-30MK"?{html:'<img src="/static/equipment/su30.jpg" alt="Indian Air Force Su-30MKI; representative variant photograph" loading="lazy">',credit:"Su-30MKI variant \xB7 Sanil Nath \xB7 CC BY 4.0",url:"https://commons.wikimedia.org/wiki/File:Sukhoi_Su-30MKi.jpg",license:"https://creativecommons.org/licenses/by/4.0/"}:{html:'<span class="photo-unavailable">Photo not yet verified</span>',credit:"No verified photograph for this equipment record"}}function hM(n){let t=xl(n);return`<article class="weapon-photo-card"><button data-record="${n.equipment_id}" class="weapon-photo-open"><span class="weapon-photo">${t.html}</span><span class="weapon-card-body"><span class="eyebrow">${xt(n.category)}</span><strong>${xt(Zi(n.designation))} \u2197</strong><span>${xt(n.description)}</span><span>${n.estimated_rows?"\u2248":""}${Fe(n.delivered_quantity)} recorded deliveries \xB7 ${vm(n.first_delivery_year,n.last_delivery_year)}</span></span></button><div class="weapon-credit">${t.url?`<a href="${t.url}" target="_blank" rel="noopener">${xt(t.credit)}</a> \xB7 <a href="${t.license}" target="_blank" rel="noopener">License</a>`:t.credit}</div></article>`}var Uh=0;async function Sm(n,t="india"){let e=nt("#equipment-details");e||(e=document.createElement("dialog"),e.id="equipment-details",e.setAttribute("aria-labelledby","detail-title"),document.body.append(e));let i=++Uh;e.innerHTML='<div class="dialog-heading"><h2 id="detail-title">Equipment details</h2><button class="icon-button detail-close" aria-label="Close weapon details">\xD7</button></div><div class="detail-body">Loading source records\u2026</div>',e.querySelector(".detail-close").onclick=()=>e.close(),e.open||e.showModal();try{let r=await vi(`/api/equipment/${encodeURIComponent(n)}?recipient=${encodeURIComponent(t)}`);if(i!==Uh)return;nt("#detail-title").textContent=Zi(r.designation);let o=xl(r),s=a=>a===!0?"Estimated":a===!1?"Not flagged":"Unspecified";e.querySelector(".detail-body").innerHTML=`<div class="detail-overview"><div><div class="detail-photo">${o.html}</div><p class="weapon-credit">${o.url?`<a href="${xt(o.url)}" target="_blank" rel="noopener">${xt(o.credit)}</a> \xB7 <a href="${xt(o.license)}" target="_blank" rel="noopener">License</a>`:xt(o.credit)}</p></div><div><span class="eyebrow">${xt(r.category)}</span><h3>${xt(r.description)}</h3><dl class="record-facts"><div><dt>Suppliers</dt><dd>${xt(r.suppliers.join(", "))}</dd></div><div><dt>Recipient</dt><dd>${xt(r.recipient)}</dd></div><div><dt>Recorded deliveries</dt><dd>${r.estimated_rows?"\u2248":""}${Fe(r.delivered_quantity)}</dd></div><div><dt>Delivery years</dt><dd>${r.delivery_years.join(", ")}</dd></div><div><dt>Transfer volume</dt><dd>${Fe(r.tiv_million,2)} million TIV</dd></div><div><dt>Quantity estimates</dt><dd>${r.estimated_rows} of ${r.deliveries.length} rows</dd></div></dl><p class="history-note">Historical deliveries within 2010\u20132025, not current inventory. TIV is not a price. Technical specifications are not included in this source register.</p>${r.model?'<button class="button primary" id="detail-3d">Open 3D viewer \u2197</button>':""}</div></div>
    <h3>Delivery records</h3><p class="history-note">Scroll horizontally to inspect all recorded fields. Unknown source values remain unspecified.</p><div class="table-scroll"><table><thead><tr><th>Year</th><th>Supplier</th><th>Quantity</th><th>Quantity flag</th><th>Order year</th><th>Condition</th><th>Local production (raw)</th><th>Delivered TIV (million)</th><th>Deal / source line</th></tr></thead><tbody>${r.deliveries.map(a=>`<tr><td>${a.delivery_year}${a.delivery_year_estimated?" (est.)":""}</td><td>${xt(a.supplier)}</td><td>${Fe(a.quantity_delivered)}</td><td>${s(a.quantity_estimated)}</td><td>${a.order_year??"Unspecified"}${a.order_year_estimated?" (est.)":""}</td><td>${xt(a.condition_reported||"Unspecified")}</td><td>${xt(a.local_production_reported??"Unspecified")}</td><td>${Fe(a.tiv_delivered_million,3)}</td><td>${xt(a.sipri_deal_id)} / ${a.source_line}</td></tr>`).join("")}</tbody></table></div>
    <h3>Source and verification</h3><p><a href="${xt(r.source.url)}" target="_blank" rel="noopener">${xt(r.source.publisher)} \xB7 ${xt(r.source.title)} \u2197</a></p><p class="history-note">Retrieved ${xt(r.source.retrieved_date)}</p>${r.claims.map(a=>`<p class="history-issue"><a href="${xt(a.url)}" target="_blank" rel="noopener">${xt(a.publisher)}</a>: ${xt(a.field_name)} \u2014 ${xt(a.value_text)}. ${xt(a.note)}</p>`).join("")}${r.issues.length?"<h3>Open quality notes</h3>"+r.issues.map(a=>`<p class="history-issue">${xt(a.description)}</p>`).join(""):'<p class="history-note">No equipment-specific quality issue is logged. This does not mean every field was independently verified.</p>'}`,e.querySelector("#detail-3d")?.addEventListener("click",()=>{e.close(),location.hash="explorer",Oh(n)})}catch(r){i===Uh&&(e.querySelector(".detail-body").textContent=r.message)}}async function Oh(n){let t=++Ih;vl();try{let e=await vi(`/api/equipment/${encodeURIComponent(n)}`);if(t!==Ih)return;Mm=e;let i=Zi(e.designation),r=e.delivery_years;nt("#viewer-category").textContent=`${String(Object.keys(pn.models).indexOf(n)+1||1).padStart(2,"0")} / ${e.category.toUpperCase()}`,nt("#viewer-watermark").textContent=i.toUpperCase(),nt("#viewer-status").classList.remove("error"),Be&&(Be.setModel(e.model?.key),nt("#viewer-status").hidden=!!e.model),e.model||(nt("#viewer-status").textContent="A 3D exterior is not included for this record yet. Explore its verified delivery data alongside.",nt("#viewer-status").hidden=!1);let o=e.claims.find(l=>l.claim_id==="rafale_programme_deliveries"),s=(e.estimated_rows&&!o?"\u2248":"")+Fe(e.delivered_quantity),a=e.category==="Aircraft"?"Aircraft":e.category==="Ships"?"Vessels":e.category==="Armoured vehicles"?"Vehicles":"Units",c=e.estimated_rows?`${e.estimated_rows} of ${e.deliveries.length} delivery records have estimated quantities.`:"No quantity estimates flagged in these records.";e.unspecified_estimate_rows&&(c+=` ${e.unspecified_estimate_rows} flags unspecified.`),o&&(c="Programme total corroborated by India\u2019s Ministry of Defence. Two yearly quantities are estimated."),nt("#equipment-panel").innerHTML=`<div class="record-intro"><div class="record-route"><span>${xt(e.suppliers.join(" / "))}</span><span>\u2192</span><span>INDIA</span></div><h2 class="record-name">${xt(i.toUpperCase())}</h2><p class="record-description">${xt(e.description)}</p></div>

      <div class="record-quantity"><strong>${xt(s)}</strong><div>${a} delivered<small>${vm(r[0],r.at(-1))}<br>Historical deliveries</small></div></div>

      <dl class="record-facts"><div><dt>Category</dt><dd>${xt(e.category)}</dd></div><div><dt>Recipient</dt><dd>India</dd></div><div><dt>Transfer volume</dt><dd>${Fe(e.tiv_million,1)} million TIV</dd></div></dl>

      <p class="estimate-note">${xt(c)}</p>

      <div class="record-source"><span>${o?"CORROBORATING SOURCE":"SOURCE RECORD"}</span><a href="${xt(o?.url||e.source.url)}" target="_blank" rel="noopener">${o?"PIB / Ministry of Defence":"SIPRI Arms Transfers Database"} <span>\u2197</span></a><p>${o?"Year-end review 2022 \xB7 completed programme deliveries":"2010\u20132025 delivery register \xB7 retrieved 6 Nov 2026"}</p></div>

      <button class="button primary" id="show-history">View transfer history <span>\u2198</span></button>`,nt("#show-history").addEventListener("click",dM),An(".equipment-card").forEach(l=>l.classList.toggle("active",l.dataset.equipment===n)),An(".view-presets [data-angle]").forEach(l=>l.classList.toggle("active",l.dataset.angle==="perspective")),nt("#history-section").hidden=!0,document.title=`${i} \xB7 ArmsFlow`}catch(e){t===Ih&&Is(e)}}function dM(){let n=Mm;n&&(nt("#history-heading").textContent=`${Zi(n.designation)} \xB7 delivery history`,nt("#history-content").innerHTML=`<p class="history-note">${n.deliveries.length} source records within 2010\u20132025. Quantities are historical deliveries, not current inventory.</p><div class="table-scroll"><table><thead><tr><th>Delivery year</th><th>Supplier</th><th>Quantity</th><th>Quantity estimate</th><th>Deal reference</th></tr></thead><tbody>${n.deliveries.map(t=>`<tr><td>${t.delivery_year}${t.delivery_year_estimated?" (estimated)":""}</td><td>${xt(t.supplier)}</td><td>${Fe(t.quantity_delivered)}</td><td>${t.quantity_estimated===!0?"Estimated":t.quantity_estimated===!1?"Not flagged":"Unspecified"}</td><td>${xt(t.sipri_deal_id)} <span class="muted">/ source line ${t.source_line}</span></td></tr>`).join("")}</tbody></table></div>

    ${n.issues.map(t=>`<div class="history-issue">${xt(t.description)}</div>`).join("")}<p class="history-note"><a href="${xt(n.source.url)}" target="_blank" rel="noopener">Open SIPRI\u2019s original transfer register \u2197</a></p>`,nt("#history-section").hidden=!1,nt("#history-section").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth",block:"start"}))}async function pM(){let n=await vi("/api/equipment?models_only=1"),t=Object.keys(pn.models);n.items.sort((e,i)=>t.indexOf(e.equipment_id)-t.indexOf(i.equipment_id)),nt("#featured-grid").innerHTML=n.items.map((e,i)=>`<button class="equipment-card ${i===0?"active":""}" data-equipment="${e.equipment_id}" aria-label="Inspect ${xt(Zi(e.designation))} in 3D"><span class="card-art">${uM(e.model.key)}</span><span class="card-copy"><span class="card-category">${xt(e.category)}</span><span class="card-name">${xt(Zi(e.designation))}</span><span class="card-meta">${xt(e.suppliers)} \u2192 India</span></span><span class="card-3d">3D</span></button>`).join(""),An(".equipment-card").forEach(e=>e.addEventListener("click",()=>Oh(e.dataset.equipment)))}async function Ls(){let n=++_m,t=new URLSearchParams({recipient:nt("#library-recipient").value,q:nt("#library-search").value,category:nt("#library-category").value,models_only:nt("#library-models").checked?"1":"0"});nt("#library-status").textContent="Searching source records\u2026";try{let e=await vi(`/api/equipment?${t}`);if(n!==_m)return;nt("#library-status").textContent=`${e.count} equipment record${e.count===1?"":"s"} \xB7 deliveries within 2010\u20132025`,nt("#library-list").innerHTML=e.items.length?e.items.map(i=>`<button class="library-item" data-equipment="${i.equipment_id}"><span class="eyebrow">${xt(i.category)}</span><h3>${xt(Zi(i.designation))}</h3><p>${xt(i.description)}</p><div class="library-item-bottom"><span>${xt(i.suppliers)} \xB7 ${Fe(i.delivered_quantity)} recorded</span>${i.model?'<span class="model-tag">3D VIEW \u2197</span>':"<span>RECORD \u2197</span>"}</div></button>`).join(""):'<p class="empty-state">No equipment matches these filters. Try another name or category.</p>',An(".library-item").forEach(i=>i.addEventListener("click",()=>{nt("#library-dialog").close(),Sm(i.dataset.equipment,nt("#library-recipient").value)}))}catch(e){nt("#library-status").textContent=e.message,nt("#library-list").innerHTML=""}}var Vi={jordan:400,austria:40,belgium:56,portugal:620,greece:300,pakistan:586,romania:642,serbia:688,slovakia:703,new_zealand:554,iran:364,north_korea:408,china:156,turkiye:792,belarus:112,sweden:752,norway:578,finland:246,japan:392,singapore:702,taiwan:158,india:356,russia:643,france:250,israel:376,united_states:840,united_kingdom:826,germany:276,south_korea:410,ukraine:804,uzbekistan:860,italy:380,spain:724,south_africa:710,switzerland:756,canada:124,netherlands:528,denmark:208,australia:36,brazil:76,kyrgyzstan:417,poland:616,czechia:203};async function fM(n,t){Nh||(Nh=fetch("/static/world.json").then(S=>{if(!S.ok)throw new Error("Map geometry could not be loaded.");return S.json()}));let e=await Nh,i=Rh(e,e.objects.countries);i.features=i.features.filter(S=>Number(S.id)!==10);let r=mm().fitExtent([[15,30],[885,450]],i),o=hm(r),s=n.filter(S=>S.recorded_tiv_million>0&&Vi[S.supplier_id]),a=new Set(s.map(S=>Vi[S.supplier_id]));Dh||(Dh=fetch("/static/india-soi-display.json").then(S=>{if(!S.ok)throw new Error("India geometry could not be loaded.");return S.json()}));let c=await Dh;if(t!==Hi)return;let l=i.features.filter(S=>Number(S.id)!==356).map(S=>`<path data-country-id="${S.id}" d="${o(S)}" class="map-country ${Number(S.id)===Vi[Ce]?"recipient-country":a.has(Number(S.id))?"supplier-country":""}"><title>${xt(S.properties.name)}</title></path>`).join(""),u=new Map(i.features.map(S=>[Number(S.id),r(Yf(S))])),h={356:[79,22],840:[-98,39],643:[95,61],250:[2,47],578:[10,64],826:[-2,54],156:[104,35],586:[69,30],376:[35,31],408:[127,40],804:[32,49]};for(let[S,_]of Object.entries(h))u.set(Number(S),r(_));let d=u.get(Vi[Ce]),p=[],f=i.features.filter(S=>Number(S.id)!==Vi[Ce]).sort((S,_)=>o.area(_)-o.area(S)).map(S=>{let _=h[Number(S.id)]?r(h[Number(S.id)]):o.centroid(S);if(!_.every(Number.isFinite))return"";let E=S.properties.name==="United States of America"?"United States":S.properties.name,A=E.length*4.7+8,y=[_[0]-A/2,_[1]-7,_[0]+A/2,_[1]+7];return p.push(y),`<text class="country-name" data-area="${o.area(S)}" data-name="${xt(E)}" x="${_[0]}" y="${_[1]}" text-anchor="middle">${xt(E)}</text>`}).join(""),x=[...Cl,...ed].map((S,_)=>{let E=r(S.coordinates),A=_<Cl.length,y=A?"#efcd79":"#89d4d1";return`<g class="capital-marker ${A?"":"major-city-marker"}" data-min-zoom="${A?2.5:S.minZoom}" style="display:none"><circle cx="${E[0]}" cy="${E[1]}" r="${A?2.5:2}" fill="${y}"/><text class="capital-name" x="${E[0]}" y="${E[1]}" text-anchor="start" fill="${y}" stroke="#10170f" stroke-linejoin="round" paint-order="stroke">${xt(S.name)}<title>${xt(S.name)} | ${xt(S.country)} | ${xt(S.kind)}</title></text></g>`}).join(""),m=s,g="",M="";for(let[S,_]of m.entries()){let E=u.get(Vi[_.supplier_id]);if(!E)continue;let A=(E[0]+d[0])/2,y=Math.min(E[1],d[1])-Math.min(90,Math.abs(E[0]-d[0])*.22+22);g+=`<path data-connection="${_.supplier_id}" style="display:none" class="map-flow" d="M${E[0]},${E[1]} Q${A},${y} ${d[0]},${d[1]}"/>`,M+=`<circle data-connection="${_.supplier_id}" style="display:none" class="map-pin" cx="${E[0]}" cy="${E[1]}" r="${S<3?5:3.5}"><title>${xt(_.supplier)}: ${bn(_.share_percent)}</title></circle>`;{let w=_.supplier_id==="israel"?[8,15]:[8,-9];M+=`<text data-connection="${_.supplier_id}" style="display:none" class="map-label" x="${E[0]+w[0]}" y="${E[1]+w[1]}">${xt(_.supplier)}</text>`}}nt("#network-map").innerHTML=l+`<path data-country-id="356" d="${o(c)}" class="map-country ${Ce==="india"?"recipient-country":a.has(356)?"supplier-country":""}"><title>India \u2014 Survey of India depiction</title></path>`+g+f+x+M+`<circle cx="${d[0]}" cy="${d[1]}" r="14" fill="#edb94811" stroke="#edb94855"/><circle class="map-pin india" cx="${d[0]}" cy="${d[1]}" r="6"/><text class="map-label" x="${d[0]+12}" y="${d[1]+18}">${wn[Ce]}</text>`,Jh(nt("#network-map"),r,Ce,wn)}function mM(n){let t=Hi;nt("#network-map").dispatchEvent(new Event("mapcontentchange"));let e=nt("#country-connection");e||(e=document.createElement("section"),e.id="country-connection",e.style.padding="20px",nt("#network-map").after(e));let i=nt("#country-hover");i||(i=document.createElement("p"),i.id="country-hover",i.className="country-hover",nt("#network-map").before(i)),i.textContent="Hover over a country to see its name \xB7 click to explore",e.textContent=`Click a supplier to explore its connection to ${wn[Ce]}.`;let r=0;An("#network-map .map-country").forEach(o=>{let s=o.querySelector("title")?.textContent||"India";o.addEventListener("pointerenter",()=>i.textContent=s.startsWith("India")?"India":s),o.addEventListener("focus",()=>i.textContent=s.startsWith("India")?"India":s),o.style.cursor="pointer",o.setAttribute("tabindex","0"),o.setAttribute("role","button"),o.setAttribute("aria-label",`Select ${s}`);async function a(){let c=++r;An("#network-map .map-country").forEach(u=>{u.style.stroke="",u.style.strokeWidth=""}),o.style.stroke="#ffdf76",o.style.strokeWidth="2";let l=n.find(u=>Vi[u.supplier_id]===Number(o.dataset.countryId));if(An("#network-map [data-connection]").forEach(u=>{u.style.display=u.dataset.connection===l?.supplier_id?"":"none"}),nt("#network-map").dispatchEvent(new Event("maplabelchange")),s.startsWith("India")&&Ce==="india"||Number(o.dataset.countryId)===Vi[Ce]){e.innerHTML=`<h3>${wn[Ce]} \xB7 recipient</h3><p>Choose a supplier country to inspect this connection.</p>`;return}if(!l||!l.recorded_tiv_million){e.innerHTML=`<h3>${xt(s)} \u2192 ${wn[Ce]}</h3><p>No recorded transfer volume in the selected period in this dataset.</p>`;return}e.innerHTML=`<h3>${xt(l.supplier)} \u2192 ${wn[Ce]}</h3><p>${bn(l.share_percent)} of import TIV \xB7 ${Fe(l.recorded_tiv_million,2)} million TIV \xB7 ${xt(nt("#supplier-period").selectedOptions[0].text)}</p><div class="country-equipment">Loading equipment\u2026</div>`;try{let u=await vi(`/api/equipment?recipient=${Ce}&supplier=${encodeURIComponent(l.supplier_id)}`);if(c!==r||t!==Hi)return;e.querySelector(".country-equipment").innerHTML='<p>Equipment across the full 2010\u20132025 snapshot. Sourced equipment photos. Variant or family photos are identified in each caption.</p><div class="weapon-photo-grid">'+u.items.sort((h,d)=>+!!xl(d).url-+!!xl(h).url).map(hM).join("")+"</div>",e.querySelectorAll("[data-record]").forEach(h=>h.addEventListener("click",()=>Sm(h.dataset.record,Ce)))}catch(u){c===r&&t===Hi&&e.querySelector(".country-equipment")&&(e.querySelector(".country-equipment").textContent=u.message)}}o.addEventListener("click",a),o.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),a())})}),An("#network-map .map-pin, #network-map .map-label, #network-map .map-flow").forEach(o=>o.style.pointerEvents="none")}function gM(n){let a=u=>45+(u-2010)/15*1027,c=u=>200-u/100*175,l="";for(let u of[0,25,50,75,100])l+=`<line class="chart-grid" x1="45" y1="${c(u)}" x2="1072" y2="${c(u)}"/><text class="chart-text" x="36" y="${c(u)+4}" text-anchor="end">${u}%</text>`;for(let u of[2010,2013,2016,2019,2022,2025])l+=`<text class="chart-text" x="${a(u)}" y="226" text-anchor="middle">${u}</text>`;for(let[u,h]of Object.entries(ro)){let d=n.filter(f=>f.supplier_id===u),p=d.map(f=>`${a(f.year)},${c(f.share_percent)}`).join(" ");l+=`<polyline points="${p}" fill="none" stroke="${h}" stroke-width="2.3"/>`+d.map(f=>`<circle cx="${a(f.year)}" cy="${c(f.share_percent)}" r="2.8" fill="${h}"><title>${kh[u]}, ${f.year}: ${bn(f.share_percent)}</title></circle>`).join("")}nt("#timeline-chart").innerHTML=`<svg viewBox="0 0 1100 235" role="img" aria-label="Annual supplier shares for ${wn[Ce]}">${l}</svg>`,nt("#timeline-legend").innerHTML=Object.entries(ro).map(([u,h])=>`<span><i style="background:${h}"></i>${kh[u]}</span>`).join("")}async function Fh(){let n=++Hi;vl(),nt("#country-spending").textContent="Loading spending context...",nt("#supplier-metrics").textContent="Loading supplier data...",nt("#supplier-ranking").innerHTML="",nt("#timeline-chart").innerHTML="",nt("#network-map").innerHTML="",nt("#country-connection")&&(nt("#country-connection").textContent="Choose a country after the map loads.");try{let t=await vi(`/api/overview?recipient=${Ce}&period=${encodeURIComponent(nt("#supplier-period").value)}`);if(n!==Hi)return;let e=t.summary,i=t.spending,r=i.series.at(-1),o=(a,c,l=1)=>a[c]==null?"Unavailable":(a[c+"_status"]==="estimate"?"\u2248 ":a[c+"_status"]==="highly_uncertain"?"Highly uncertain: ":"")+Fe(a[c],l);if(nt("#country-spending").innerHTML=`<div class="panel-heading"><h2>${xt(wn[Ce])} \xB7 military spending</h2><a href="${xt(i.source.url)}" target="_blank" rel="noopener">SIPRI source \u2197</a></div><p><strong>2025: ${o(r,"current_usd_million")} million current US$</strong> \xB7 ${r.gdp_percent==null?"GDP share unavailable":o(r,"gdp_percent")+"% of GDP"}</p><p class="muted small">Total military spending, not weapons-import spending. Separate from TIV. \u2248 denotes a SIPRI estimate; unavailable values are not zero. Country footnotes are in the source workbook.</p><details><summary>View annual spending, 2010\u20132025</summary><div class="table-scroll"><table><thead><tr><th>Year</th><th>Current US$ million</th><th>Constant 2024 US$ million</th><th>% GDP</th></tr></thead><tbody>${i.series.map(a=>`<tr><td>${a.year}</td><td>${o(a,"current_usd_million")}</td><td>${o(a,"constant_2024_usd_million")}</td><td>${o(a,"gdp_percent")}</td></tr>`).join("")}</tbody></table></div></details>`,!["ok","no_recorded_imports"].includes(e.metric_status))throw new Error("Complete supplier metrics are not available for this period.");nt("#supplier-metrics").innerHTML=Wi("Import volume",Fe(e.total_tiv_million),"Recorded deliveries","million TIV")+Wi("Largest supplier share",bn(e.top_supplier_share==null?null:e.top_supplier_share*100),e.top_suppliers)+Wi("Top 3 suppliers",bn(e.top_three_share==null?null:e.top_three_share*100),"Share of recorded import TIV")+Wi("Supplier concentration",Fe(e.hhi,3),"HHI \xB7 0 to 1");let s=t.suppliers.filter(a=>a.recorded_tiv_million>0).slice(0,4);if(Object.keys(ro).forEach(a=>delete ro[a]),s.forEach((a,c)=>{ro[a.supplier_id]=["#b5c08a","#75a8bb","#7ba89a","#edb948"][c],kh[a.supplier_id]=a.supplier}),nt("#supplier-ranking").innerHTML=t.suppliers.filter(a=>a.recorded_tiv_million>0).map(a=>`<div class="ranking-row"><div class="rank-label"><strong>${xt(a.supplier)}</strong><span>${bn(a.share_percent)}</span></div><div class="rank-track"><div class="rank-bar" style="width:${a.share_percent}%;background:${ro[a.supplier_id]||"#718264"}"></div></div></div>`).join(""),e.total_tiv_million||(nt("#supplier-ranking").innerHTML='<p class="empty-state">No recorded imports in this period. This does not describe current holdings or domestic production.</p>'),gM(t.timeline),await fM(t.suppliers,n),n!==Hi)return;mM(t.suppliers)}catch(t){n===Hi&&Is(t)}}function bm(){let n=nt("#compare-before").value,t=pn.comparisons.filter(i=>i.earlier_period_id===n),e=nt("#compare-after").value;nt("#compare-after").innerHTML=t.map(i=>`<option value="${i.later_period_id}">${gr(i.later_period_id)}</option>`).join(""),t.some(i=>i.later_period_id===e)&&(nt("#compare-after").value=e)}async function Bh(){let n=++Lh;vl();try{let t=await vi(`/api/compare?${new URLSearchParams({before:nt("#compare-before").value,after:nt("#compare-after").value})}`);if(n!==Lh)return;let e=t.summary;if(e.comparison_status!=="ok")throw new Error("This comparison has incomplete data or no recorded deliveries.");nt("#comparison-metrics").innerHTML=Wi("Earlier import volume",Fe(e.earlier_total_tiv_million),gr(e.earlier_period_id),"million TIV")+Wi("Later import volume",Fe(e.later_total_tiv_million),gr(e.later_period_id),"million TIV")+Wi("Volume change",`${e.volume_change_percent>=0?"+":""}${bn(e.volume_change_percent)}`,"Change in recorded import TIV")+Wi("Supplier-mix distance",Fe(e.supplier_mix_distance,3),"0 = identical \xB7 1 = no overlap");let i=[...t.suppliers].sort((r,o)=>Math.abs(o.share_change_pp)-Math.abs(r.share_change_pp)).slice(0,8).sort((r,o)=>o.share_change_pp-r.share_change_pp);nt("#comparison-chart").innerHTML=i.map(r=>`<div class="comparison-row"><span class="supplier-name">${xt(r.supplier)}</span><div class="comparison-bars"><div style="width:${r.earlier_share*100}%" title="Earlier: ${bn(r.earlier_share*100)}"></div><div style="width:${r.later_share*100}%" title="Later: ${bn(r.later_share*100)}"></div></div><span class="comparison-values">${bn(r.earlier_share*100)} \u2192 <strong>${bn(r.later_share*100)}</strong></span><span class="change-pill ${r.share_change_pp<0?"negative":""}">${r.share_change_pp>=0?"+":""}${Fe(r.share_change_pp,1)} pp</span></div>`).join(""),nt("#comparison-table").innerHTML=`<table><thead><tr><th>Supplier</th><th>${gr(e.earlier_period_id)}</th><th>${gr(e.later_period_id)}</th><th>Share change</th></tr></thead><tbody>${t.suppliers.map(r=>`<tr><td>${xt(r.supplier)}</td><td>${bn(r.earlier_share*100)}</td><td>${bn(r.later_share*100)}</td><td>${r.share_change_pp>=0?"+":""}${Fe(r.share_change_pp,2)} pp</td></tr>`).join("")}</tbody></table>`}catch(t){n===Lh&&Is(t)}}async function yM(){try{let n=await vi("/api/sources");nt("#source-registry").innerHTML=n.sources.map(t=>`<a class="source-row" href="${xt(t.url)}" target="_blank" rel="noopener"><span class="source-publisher">${xt(t.publisher)}</span><span class="source-title">${xt(t.title)}</span><span class="source-open">Open source \u2197</span></a>`).join(""),nt("#source-issues").innerHTML=n.issues.map(t=>`<article><h3>${xt(t.field_name.replaceAll("_"," "))}</h3><p>${xt(t.description)}</p></article>`).join("")}catch(n){Is(n)}}function wm(){let n=location.hash.slice(1)||"explorer";["explorer","suppliers","compare","sources","insights","similarity"].includes(n)||(n="explorer"),An(".view").forEach(t=>t.hidden=t.id!==`view-${n}`),An("[data-nav]").forEach(t=>{t.classList.toggle("active",t.dataset.nav===n),t.dataset.nav===n?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")}),vl(),Be&&(Be.enabled=n==="explorer",Be.resize()),pn&&(n==="suppliers"&&Fh(),n==="compare"&&Bh(),n==="sources"&&yM(),n==="insights"&&Tl(),n==="similarity"&&Al()),document.title=`${{explorer:"Weapons explorer",suppliers:"Supplier network",compare:"Compare periods",sources:"Sources",insights:"ML insights",similarity:"Similar countries"}[n]} \xB7 ArmsFlow`}async function _M(){try{pn=await vi("/api/meta"),wn=pn.countries;let n='<optgroup label="Nuclear-armed states">'+pn.nuclear_armed_states.map(c=>`<option value="${c}">${xt(wn[c])}</option>`).join("")+'</optgroup><optgroup label="Additional countries"><option value="ukraine">Ukraine</option></optgroup>';nt("#library-recipient").innerHTML=n,nt("#library-recipient").addEventListener("change",Ls);let t=document.createElement("select");t.id="recipient-select",t.setAttribute("aria-label","Recipient country"),t.innerHTML=n;let e=document.createElement("label");e.className="select-label",e.append("Recipient country",t),nt("#supplier-period").parentElement.before(e);let i=document.createElement("p");i.id="recipient-scope",i.className="data-footnote",nt("#supplier-metrics").before(i),i.textContent="SIPRI major conventional-arms deliveries, 2010\u20132025. Nuclear status is context, not nuclear transfer data.";let r=document.createElement("section");r.className="focus-countries panel",r.innerHTML='<h2>Featured: nuclear-armed states</h2><p class="muted small">Nine states identified by SIPRI (2026). Conventional imports only; domestic production and nuclear arsenals are not measured here. <a href="'+pn.nuclear_status_source+'" target="_blank" rel="noopener">Classification source \u2197</a></p><div class="focus-country-buttons">'+pn.nuclear_armed_states.map(c=>'<button type="button" class="button" data-recipient="'+c+'">'+xt(wn[c])+"</button>").join("")+"</div>",i.before(r),r.querySelectorAll("[data-recipient]").forEach(c=>c.setAttribute("aria-pressed",String(c.dataset.recipient===Ce))),r.querySelectorAll("[data-recipient]").forEach(c=>c.addEventListener("click",()=>{t.value=c.dataset.recipient,t.dispatchEvent(new Event("change"))})),t.addEventListener("change",()=>{Ce=t.value,r.querySelectorAll("[data-recipient]").forEach(c=>c.setAttribute("aria-pressed",String(c.dataset.recipient===Ce))),nt("#network-map").setAttribute("aria-label",`World map showing suppliers to ${wn[Ce]}`),nt("#view-suppliers .map-panel h2").textContent=`Suppliers to ${wn[Ce]}`,i.textContent="SIPRI major conventional-arms deliveries, 2010\u20132025. Nuclear status is context, not nuclear transfer data. No records does not imply no weapons.",Fh()}),nt("#equipment-count").textContent=pn.counts.equipment,nt("#library-category").innerHTML+=[...pn.equipment_categories].map(c=>`<option value="${xt(c)}">${xt(c)}</option>`).join("");let o=pn.periods,s=[["five_year","Five-year periods"],["full","Full snapshot"],["annual","Annual periods"],["rolling_five_year","Other five-year windows"]];nt("#supplier-period").innerHTML=s.map(([c,l])=>`<optgroup label="${l}">${o.filter(u=>u.period_kind===c).map(u=>`<option value="${u.period_id}">${gr(u.period_id)}</option>`).join("")}</optgroup>`).join(""),nt("#supplier-period").value="2021-2025";let a=[...new Set(pn.comparisons.map(c=>c.earlier_period_id))];a.sort((c,l)=>+(l.length===9&&l.slice(0,4)!==l.slice(5))-+(c.length===9&&c.slice(0,4)!==c.slice(5))||c.localeCompare(l)),nt("#compare-before").innerHTML=a.map(c=>`<option value="${c}">${gr(c)}</option>`).join(""),nt("#compare-before").value="2011-2015",bm(),nt("#compare-after").value="2021-2025";try{Be=new Xc(nt("#model-canvas"))}catch(c){nt("#viewer-status").textContent="3D rendering is unavailable in this browser. The verified equipment records remain available.",nt("#viewer-status").classList.add("error"),console.warn("WebGL viewer unavailable",c)}await Promise.all([pM(),Oh(pn.default_equipment)]),wm()}catch(n){Is(n),nt("#viewer-status").textContent="Start the local server and verify the database to explore ArmsFlow."}}nt("#open-library").addEventListener("click",()=>{nt("#library-dialog").showModal(),Ls(),setTimeout(()=>nt("#library-search").focus(),0)});nt("#close-library").addEventListener("click",()=>nt("#library-dialog").close());nt("#library-dialog").addEventListener("click",n=>{if(n.target===nt("#library-dialog")){let t=n.target.getBoundingClientRect();(n.clientX<t.left||n.clientX>t.right||n.clientY<t.top||n.clientY>t.bottom)&&n.target.close()}});var xm;nt("#library-search").addEventListener("input",()=>{clearTimeout(xm),xm=setTimeout(Ls,180)});nt("#library-category").addEventListener("change",Ls);nt("#library-models").addEventListener("change",Ls);nt("#supplier-period").addEventListener("change",Fh);nt("#compare-before").addEventListener("change",()=>{bm(),Bh()});nt("#compare-after").addEventListener("change",Bh);nt("#close-history").addEventListener("click",()=>{nt("#history-section").hidden=!0,nt("#show-history")?.focus()});An("[data-angle]").forEach(n=>n.addEventListener("click",()=>{Be?.angle(n.dataset.angle),An("[data-angle]").forEach(t=>t.classList.toggle("active",t===n))}));nt("#reset-view").addEventListener("click",()=>{Be?.reset(),An("[data-angle]").forEach(n=>n.classList.toggle("active",n.dataset.angle==="perspective"))});nt("#auto-rotate").addEventListener("click",n=>{Be&&(Be.spin=!Be.spin,n.currentTarget.setAttribute("aria-pressed",String(Be.spin)))});nt("#wireframe").addEventListener("click",n=>{Be&&(Be.setWireframe(!Be.wire),n.currentTarget.setAttribute("aria-pressed",String(Be.wire)))});nt("#zoom-in").addEventListener("click",()=>Be?.zoom(.86));nt("#zoom-out").addEventListener("click",()=>Be?.zoom(1.16));nt("#fullscreen").addEventListener("click",async()=>{try{document.fullscreenElement?await document.exitFullscreen():await nt("#viewer-panel").requestFullscreen()}catch{nt("#viewer-status").textContent="Fullscreen is unavailable. The viewer still supports rotate and zoom.",nt("#viewer-status").hidden=!1}});window.addEventListener("hashchange",wm);window.addEventListener("resize",()=>Be?.resize());Qh();td();nd(nt("#network-map"));_M();
/*! For license information please see app.js.LEGAL.txt */
