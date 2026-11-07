let requestId=0;
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const names={india:'India',russia:'Russia',united_states:'United States'};
export async function loadInsights(){
  const id=++requestId,content=document.querySelector('#ml-results');
  content.textContent='Loading historical review...';
  try{
    const recipient=document.querySelector('#ml-recipient').value;
    const year=document.querySelector('#ml-year').value;
    const response=await fetch(`/api/insights?recipient=${recipient}&year=${year}`);
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||'ML results are unavailable.');
    if(id!==requestId)return;
    const flagsOnly=document.querySelector('#ml-flags-only').checked;
    const rows=data.rows.filter(r=>!flagsOnly||r.flagged);
    const flags=data.rows.filter(r=>r.flagged).length;
    document.querySelector('#ml-summary').innerHTML=`<div class="metric"><span>Transitions reviewed</span><strong>${data.rows.length}</strong><small>Selected recipient and years</small></div><div class="metric"><span>Model review flags</span><strong>${flags}</strong><small>Above the training threshold</small></div><div class="metric"><span>Training observations</span><strong>${data.training_rows}</strong><small>Three recipients, 2011–2020</small></div>`;
    document.querySelector('#ml-method').innerHTML=`<h2>How to read these results</h2><p>Isolation Forest compares changes in supplier share and recorded transfer volume. It learns from 2011–2020; results below cover unseen 2021–2025 transitions. Each row compares one year with its previous year.</p><p>The unusualness percentile ranks a change against training observations. It is <strong>not a probability</strong>. “Review” means the score exceeds the training 95th-percentile threshold. Evidence describes the observed change, not its political cause.</p><p>Full evaluation: ${data.model_flags} model flags; ${data.baseline_flags} flags from a simple ≥10 percentage-point share-change rule; ${data.overlap_flags} flagged by both. Agreement between model flags across three random seeds: ${(100*data.mean_seed_jaccard).toFixed(1)}% mean Jaccard overlap. This measures stability, not accuracy.</p><details><summary>Data limits and model details</summary><ul>${data.limitations.map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ul><p>scikit-learn ${escapeHtml(data.sklearn_version)} · ${data.trees} trees · seed ${data.seed}. Inputs: absolute share change, signed log volume ratio and log absolute volume change. No future years are used to fit the model or threshold.</p><a href="#sources">Inspect source records</a> · <a href="/api/insights?recipient=${recipient}&year=${year}" target="_blank" rel="noopener">Open result data</a></details>`;
    content.innerHTML=rows.length?`<div class="ml-table-wrap"><table class="ml-table"><thead><tr><th>Relationship / year</th><th>Unusualness percentile</th><th>Observed change</th><th>Review status</th></tr></thead><tbody>${rows.map(r=>`<tr><td><strong>${escapeHtml(r.supplier)} → ${names[r.recipient]}</strong><br>${r.year-1} → ${r.year}</td><td><strong>${r.unusualness_percentile.toFixed(1)}</strong> / 100<br><small>Relative to training observations</small></td><td>${escapeHtml(r.evidence)}</td><td><span class="${r.flagged?'ml-flag':''}">${r.flagged?'Review':'Below threshold'}</span><br><small>${r.baseline_flag?'Also exceeds 10 pp baseline':'Below 10 pp baseline'}</small></td></tr>`).join('')}</tbody></table></div>`:'<p>No flagged changes match these filters. Turn off “Review flags only” to inspect all scored transitions.</p>';
  }catch(error){if(id===requestId)content.textContent=error.message;}
}
export function installInsights(){
  for(const id of ['ml-recipient','ml-year','ml-flags-only'])document.getElementById(id).addEventListener('change',loadInsights);
}
