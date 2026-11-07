export function installMapZoom(svg){
  let scale=1,x=0,y=0,drag=null,moved=false,frame=0;
  let drawn={scale:1,x:0,y:0},labels=[];
  const bar=document.createElement('div');bar.className='map-zoom-controls';bar.setAttribute('role','group');bar.setAttribute('aria-label','Map navigation');
  bar.innerHTML='<button type="button" aria-label="Zoom map in">+</button><button type="button" aria-label="Zoom map out">−</button><button type="button" aria-label="Reset map view">Reset</button><output aria-live="polite">100%</output><span>Scroll to zoom · drag to pan · zoom closer for countries, capitals & major cities</span>';
  const credit=document.createElement('p');credit.className='map-capital-credit';credit.innerHTML='Gold: capitals / alternate seats &middot; Teal: major cities. <a href="https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/" target="_blank" rel="noopener noreferrer">Natural Earth</a> geographic reference. Cities selected by source world-city designation, population or national size rank; not a power ranking.';credit.style.cssText='font-size:11px;color:#b4ba9c;padding:0 20px';svg.after(credit);
  svg.before(bar);svg.setAttribute('tabindex','0');
  function updateLabels(){
    const unit=Math.max(.1,svg.getBoundingClientRect().width/900)*drawn.scale,occupied=[];
    for(const el of svg.querySelectorAll('circle')){if(!el.dataset.baseRadius)el.dataset.baseRadius=el.getAttribute('r');el.setAttribute('r',+el.dataset.baseRadius/drawn.scale);el.style.vectorEffect='non-scaling-stroke';el.style.pointerEvents='none';}
    for(const el of svg.querySelectorAll('.map-label')){el.style.fontSize=`${12/unit}px`;el.style.strokeWidth=`${3/unit}px`;}
    for(const group of svg.querySelectorAll('.capital-marker')){
      const el=group.querySelector('text'),px=+el.getAttribute('x'),py=+el.getAttribute('y'),width=(el.childNodes[0].textContent.length*6+12)/unit;
      const box=[px,py-10/unit,px+width,py+5/unit];
      const visible=drawn.scale>=Number(group.dataset.minZoom||2.5)&&px>=drawn.x&&px<=drawn.x+900/drawn.scale&&py>=drawn.y&&py<=drawn.y+490/drawn.scale&&!occupied.some(b=>box[0]<b[2]&&box[2]>b[0]&&box[1]<b[3]&&box[3]>b[1]);
      group.style.display=visible?'':'none';group.style.pointerEvents='none';el.style.fontSize=`${11/unit}px`;el.style.strokeWidth=`${3/unit}px`;el.setAttribute('dx',5/unit);el.setAttribute('dy',3/unit);if(visible)occupied.push(box);
    }
    for(const el of labels){const px=+el.getAttribute('x'),py=+el.getAttribute('y'),width=(el.textContent.length*6+8)/unit,box=[px-width/2,py-11/unit,px+width/2,py+4/unit];el.style.fontSize=`${11/unit}px`;el.style.strokeWidth=`${2.5/unit}px`;const visible=px>=drawn.x&&px<=drawn.x+900/drawn.scale&&py>=drawn.y&&py<=drawn.y+490/drawn.scale&&!occupied.some(b=>box[0]<b[2]&&box[2]>b[0]&&box[1]<b[3]&&box[3]>b[1]);el.style.display=visible?'':'none';if(visible)occupied.push(box);}
  }
  function animate(){frame=0;const t=drag||matchMedia('(prefers-reduced-motion:reduce)').matches?1:.3;drawn.scale+=(scale-drawn.scale)*t;drawn.x+=(x-drawn.x)*t;drawn.y+=(y-drawn.y)*t;const done=Math.abs(scale-drawn.scale)<.001&&Math.abs(x-drawn.x)<.02&&Math.abs(y-drawn.y)<.02;if(done)drawn={scale,x,y};svg.setAttribute('viewBox',`${drawn.x} ${drawn.y} ${900/drawn.scale} ${490/drawn.scale}`);svg.dataset.zoom=drawn.scale.toFixed(2);updateLabels();if(!done)frame=requestAnimationFrame(animate);}
  function render(){const w=900/scale,h=490/scale;x=Math.max(0,Math.min(900-w,x));y=Math.max(0,Math.min(490-h,y));if(!frame)frame=requestAnimationFrame(animate);bar.querySelector('output').textContent=`${Math.round(scale*100)}%`;bar.children[0].disabled=scale>=12;bar.children[1].disabled=scale<=1;}
  function zoom(factor,px=.5,py=.5){const old=scale;scale=Math.max(1,Math.min(12,scale*factor));x+=px*(900/old-900/scale);y+=py*(490/old-490/scale);render();}
  bar.children[0].addEventListener('click',()=>zoom(1.35));bar.children[1].addEventListener('click',()=>zoom(1/1.35));bar.children[2].addEventListener('click',()=>{scale=1;x=y=0;render();});
  svg.addEventListener('wheel',e=>{e.preventDefault();const b=svg.getBoundingClientRect();zoom(Math.exp(-Math.max(-160,Math.min(160,e.deltaY*(e.deltaMode===1?16:1)))*.002),(e.clientX-b.left)/b.width,(e.clientY-b.top)/b.height);},{passive:false});
  svg.addEventListener('dblclick',e=>{e.preventDefault();const b=svg.getBoundingClientRect();zoom(1.6,(e.clientX-b.left)/b.width,(e.clientY-b.top)/b.height);});
  svg.addEventListener('pointerdown',e=>{if(e.button!==0)return;moved=false;scale=drawn.scale;x=drawn.x;y=drawn.y;drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x,y};});
  svg.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;if(Math.abs(dx)+Math.abs(dy)>5&&scale>1){moved=true;svg.setPointerCapture(e.pointerId);const b=svg.getBoundingClientRect();x=drag.x-dx/b.width*900/scale;y=drag.y-dy/b.height*490/scale;render();}});
  function end(e){if(drag&&svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);drag=null;}
  svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);svg.addEventListener('pointerleave',()=>{if(!moved)drag=null;});
  svg.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}},true);
  svg.addEventListener('mapcontentchange',()=>{labels=[...svg.querySelectorAll('.country-name')];updateLabels();});
  svg.addEventListener('maplabelchange',updateLabels);new ResizeObserver(updateLabels).observe(svg);
  svg.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){e.preventDefault();zoom(1.35);}if(e.key==='-'){e.preventDefault();zoom(1/1.35);}if(e.key==='0'){scale=1;x=y=0;render();}});render();
}
