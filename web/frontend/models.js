// Original visual studies in arbitrary scene units. Not engineering models.
import * as T from 'three';

const material=(color,roughness=.5,metalness=.35)=>new T.MeshStandardMaterial({color,roughness,metalness});
const mesh=(g,m,p=[0,0,0])=>{const o=new T.Mesh(g,m);o.position.set(...p);o.castShadow=true;o.receiveShadow=true;return o;};
function box(group,size,pos,mat){const o=mesh(new T.BoxGeometry(...size),mat,pos);group.add(o);return o;}
function sphere(group,size,pos,mat){const o=mesh(new T.SphereGeometry(1,40,24),mat,pos);o.scale.set(...size);group.add(o);return o;}
function cylinder(group,r1,r2,length,pos,mat,axis='z'){
  const o=mesh(new T.CylinderGeometry(r1,r2,length,32),mat,pos);
  if(axis==='z')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.z=Math.PI/2;group.add(o);return o;
}
function plate(group,points,y,thickness,mat){
  const shape=new T.Shape(points.map(([x,z])=>new T.Vector2(x,z)));
  const geo=new T.ExtrudeGeometry(shape,{depth:thickness,bevelEnabled:true,bevelThickness:.012,bevelSize:.015,bevelSegments:2,steps:1});
  geo.rotateX(Math.PI/2);const o=mesh(geo,mat,[0,y+thickness/2,0]);group.add(o);return o;
}
function fin(group,points,x,thickness,mat){
  const shape=new T.Shape(points.map(([z,y])=>new T.Vector2(-z,y)));
  const geo=new T.ExtrudeGeometry(shape,{depth:thickness,bevelEnabled:true,bevelSize:.015,bevelThickness:.01,bevelSegments:2});
  geo.rotateY(Math.PI/2);const o=mesh(geo,mat,[x-thickness/2,0,0]);group.add(o);return o;
}
function line(group,points,color=0x46534e,width=1){const o=new T.Line(new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p))),new T.LineBasicMaterial({color,linewidth:width}));group.add(o);return o;}
function loft(group,sections,mat,segments=40){
  const positions=[],indices=[];
  sections.forEach(([z,rx,ry,cy=0])=>{for(let i=0;i<segments;i++){const a=i/segments*Math.PI*2;positions.push(Math.cos(a)*rx,Math.sin(a)*ry+cy,z);}});
  for(let j=0;j<sections.length-1;j++)for(let i=0;i<segments;i++){const a=j*segments+i,b=j*segments+(i+1)%segments,c=a+segments,d=b+segments;indices.push(a,c,b,b,c,d);}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setIndex(indices);geo.computeVertexNormals();
  const o=mesh(geo,mat);group.add(o);return o;
}
function ring(group,radius,tube,pos,mat,axis='z'){
  const o=mesh(new T.TorusGeometry(radius,tube,8,48),mat,pos);if(axis==='x')o.rotation.y=Math.PI/2;if(axis==='y')o.rotation.x=Math.PI/2;group.add(o);return o;
}

function rafale(){
  const g=new T.Group(),skin=material(0x939f9e,.43,.5),edge=material(0x687878,.4,.65),dark=material(0x182524,.6,.3),metal=material(0x666c68,.3,.85);
  loft(g,[[5.7,.015,.015,0],[5.1,.13,.12,0],[4.25,.29,.25,.03],[3.25,.42,.34,.05],[2,.56,.43,.04],[.8,.65,.47,.03],[-.8,.77,.46,.02],[-2.5,.76,.42,.04],[-3.9,.65,.36,.02],[-4.6,.55,.32,0]],skin);
  for(const s of [-1,1]){
    plate(g,[[s*.55,1.5],[s*3.55,-2.55],[s*3.8,-2.95],[s*3.75,-3.3],[s*.7,-3.05]],-.08,.065,skin);
    plate(g,[[s*.55,2.4],[s*1.75,1.65],[s*1.9,1.25],[s*.6,1.15]],.16,.055,edge);
    line(g,[[s*.72,-.025,-1.95],[s*3.1,-.025,-2.9]],0x4d5d59);
    line(g,[[s*1.55,-.027,-.5],[s*2.75,-.027,-2.78]],0x5f6f69);
    cylinder(g,.055,.055,1.05,[s*3.7,-.06,-2.85],edge);
    sphere(g,[.42,.31,1.65],[s*.43,-.04,-2.85],skin);
    cylinder(g,.31,.34,.68,[s*.37,-.04,-4.35],metal);
    ring(g,.3,.035,[s*.37,-.04,-4.72],edge);
    const opening=mesh(new T.CircleGeometry(.265,32),dark,[s*.37,-.04,-4.76]);opening.rotation.y=Math.PI;g.add(opening);
    for(let j=0;j<16;j++){const a=j*Math.PI/8;line(g,[[s*.37+Math.cos(a)*.32,-.04+Math.sin(a)*.32,-4.06],[s*.37+Math.cos(a)*.3,-.04+Math.sin(a)*.3,-4.69]],0x303b39);}
    sphere(g,[.28,.27,.85],[s*.64,-.12,.8],skin);
    const intake=mesh(new T.CircleGeometry(.21,32),dark,[s*.67,-.1,1.57]);intake.scale.x=.85;g.add(intake);
    line(g,[[s*.5,.31,3.1],[s*.7,.32,1.7],[s*.76,.3,.1],[s*.72,.29,-2]],0x63716c);
  }
  fin(g,[[-1.85,.38],[-3.25,2.08],[-4.15,2.26],[-4.38,.3]],0,.08,skin);
  line(g,[[.051,.55,-3.98],[.051,1.92,-3.85]],0x596960);
  const canopy=new T.MeshPhysicalMaterial({color:0x17383b,metalness:.5,roughness:.13,clearcoat:1,clearcoatRoughness:.12});
  sphere(g,[.445,.16,1.13],[0,.43,2.1],edge);
  sphere(g,[.405,.345,1.08],[0,.46,2.1],canopy);
  const rim=[];for(let i=0;i<=64;i++){const a=i*Math.PI/32;rim.push([Math.cos(a)*.415,.5,2.1+Math.sin(a)*1.07]);}line(g,rim,0x798981);
  line(g,[[0,.52,3.15],[0,.77,2.55],[0,.8,2],[0,.69,1.3],[0,.49,1.03]],0x88938a);
  for(const s of [-1,1]){
    const decal=mesh(new T.CircleGeometry(.11,32),material(0x526f63,.8,.1),[s*2,-.035,-1.72]);decal.rotation.x=-Math.PI/2;g.add(decal);
    ring(g,.11,.014,[s*2,-.028,-1.72],material(0xadb3a0,.8,.1),'y');
  }
  return g;
}

function tank(){
  const g=new T.Group(),olive=material(0x71795b,.75,.2),shade=material(0x505d46,.7,.25),track=material(0x272d27,.85,.3),wheel=material(0x5a6450,.65,.4),dark=material(0x151e19,.7,.25);
  box(g,[2.6,.65,4.8],[0,.05,0],shade);
  plate(g,[[-1.38,2.15],[-1.07,2.7],[1.07,2.7],[1.38,2.15],[1.38,-2.35],[-1.38,-2.35]],.43,.38,olive);
  for(const s of [-1,1]){
    box(g,[.58,.9,4.45],[s*1.48,-.24,0],track);
    for(let i=0;i<6;i++){
      const z=-1.85+i*.74;cylinder(g,.43,.43,.22,[s*1.8,-.25,z],wheel,'x');
      ring(g,.35,.045,[s*1.93,-.25,z],track,'x');cylinder(g,.12,.12,.25,[s*1.82,-.25,z],shade,'x');
    }
    for(let i=0;i<21;i++)for(const y of [-.72,.23])box(g,[.65,.1,.16],[s*1.48,y,-2.1+i*.21],shade);
    for(let i=0;i<5;i++)box(g,[.09,.54,.85],[s*1.82,.36,-1.85+i*.9],olive);
    box(g,[.15,.22,3.8],[s*1.18,.8,-.2],shade);
  }
  cylinder(g,.93,1.1,.15,[0,.7,0],shade,'y');
  sphere(g,[1.13,.48,1.23],[0,.97,-.1],olive);
  for(const s of [-1,1])for(let i=0;i<3;i++){
    const o=box(g,[.34,.27,.43],[s*(.58+i*.16),1.13,.75-i*.42],shade);o.rotation.y=s*-.3;
  }
  cylinder(g,.16,.22,.6,[0,1.05,1.1],shade);
  cylinder(g,.075,.1,3.4,[0,1.05,2.75],olive);
  cylinder(g,.12,.1,.22,[0,1.05,4.46],shade);
  const opening=mesh(new T.CircleGeometry(.065,16),dark,[0,1.05,4.58]);g.add(opening);
  cylinder(g,.34,.34,.12,[-.36,1.37,-.2],shade,'y');
  cylinder(g,.28,.28,.1,[.48,1.36,-.35],olive,'y');
  box(g,[.28,.19,.18],[.45,1.45,.25],dark);
  cylinder(g,.014,.018,1.05,[-.7,1.65,-.65],dark,'y');
  for(let i=0;i<8;i++)box(g,[1.4,.025,.055],[0,.66,-1.5-i*.08],dark);
  for(const s of [-1,1])sphere(g,[.12,.1,.07],[s*.92,.59,2.45],material(0xd3d0a6,.25,.4));
  return g;
}

function frigate(){
  const g=new T.Group(),skin=material(0x8a9793,.6,.45),deck=material(0x596c65,.75,.25),dark=material(0x243b3c,.3,.45),detail=material(0x596b66,.5,.5);
  const shape=[[-.82,-5.1],[-1.08,-3.7],[-1.05,2.9],[-.7,4.65],[0,6.1],[.7,4.65],[1.05,2.9],[1.08,-3.7],[.82,-5.1]];
  plate(g,shape,-.15,.75,skin);plate(g,shape,.24,.05,deck);
  box(g,[1.7,.65,2.9],[0,.6,.6],skin);box(g,[1.5,.7,1.7],[0,1.25,1.1],skin);box(g,[1.28,.35,1.1],[0,1.76,1.2],skin);
  box(g,[1.34,.18,.035],[0,1.7,1.77],dark);
  for(const s of [-1,1])box(g,[.035,.18,.8],[s*.66,1.7,1.15],dark);
  box(g,[.72,.95,.9],[0,1.47,-.6],detail);box(g,[.75,.1,.95],[0,1.98,-.6],dark);
  cylinder(g,.045,.08,2.2,[0,2.45,.25],skin,'y');box(g,[1.22,.1,.16],[0,3.35,.25],detail);
  box(g,[.9,.48,.12],[0,3.05,.25],skin);
  sphere(g,[.32,.28,.32],[0,2.14,1.2],material(0xb7c1b5,.75,.1));
  box(g,[1.6,.65,1.3],[0,.58,-1.8],skin);
  cylinder(g,.37,.45,.32,[0,.4,3.9],skin,'y');sphere(g,[.4,.25,.48],[0,.65,3.9],skin);cylinder(g,.045,.06,.95,[0,.65,4.65],detail);
  for(const s of [-1,1]){
    for(let i=0;i<20;i++)cylinder(g,.012,.012,.22,[s*(i<3?.76:1),.4,-4.7+i*.46],skin,'y');
    line(g,[[s*.8,.51,-4.8],[s*1,.51,-3.6],[s*1,.51,2.7],[s*.64,.51,4.6]],0xb1bbb0);
    for(let i=0;i<8;i++)box(g,[.035,.06,.13],[s*1.08,.06,-2.5+i*.6],dark);
  }
  ring(g,.66,.012,[0,.285,-3.65],material(0xd2d3b4,.9,.1),'y');
  line(g,[[-.2,.29,-4.03],[-.2,.29,-3.3]],0xc0c5ae);line(g,[[.2,.29,-4.03],[.2,.29,-3.3]],0xc0c5ae);line(g,[[-.2,.29,-3.67],[.2,.29,-3.67]],0xc0c5ae);
  return g;
}

function submarine(){
  const g=new T.Group(),hull=material(0x3e4c49,.4,.6),finMat=material(0x485a54,.5,.5),dark=material(0x17231f,.7,.25);
  loft(g,[[5.5,.015,.02],[5.15,.42,.4],[4.5,.73,.68],[3.2,.85,.76],[0,.86,.78],[-2.9,.83,.75],[-4.2,.53,.5],[-5,.22,.22],[-5.5,.045,.045]],hull);
  fin(g,[[1.5,.65],[1.25,1.7],[.6,1.95],[-.7,1.88],[-1.1,.7]],0,.45,finMat);
  plate(g,[[-.2,1.05],[-1.65,.55],[-1.65,.23],[-.2,.25]],1.25,.07,finMat);plate(g,[[.2,1.05],[1.65,.55],[1.65,.23],[.2,.25]],1.25,.07,finMat);
  cylinder(g,.035,.035,.55,[.05,2.12,.25],dark,'y');cylinder(g,.025,.025,.3,[-.1,2.03,.75],dark,'y');
  fin(g,[[-3.75,.35],[-4.6,1.35],[-5.1,1.35],[-4.9,.1]],0,.06,finMat);
  fin(g,[[-3.75,-.35],[-4.6,-1.15],[-5.1,-1.15],[-4.9,-.1]],0,.06,finMat);
  for(const s of [-1,1])plate(g,[[s*.3,-3.8],[s*1.35,-4.55],[s*1.35,-5.05],[s*.2,-4.9]],0,.06,finMat);
  for(const z of [3,-2.4]){
    const pts=[];for(let i=0;i<=48;i++){const a=i*Math.PI/24;pts.push([Math.cos(a)*.857,Math.sin(a)*.776,z]);}line(g,pts,0x263832);
  }
  line(g,[[0,.79,3.7],[0,.8,1.55]],0x859387);line(g,[[0,.79,-1.3],[0,.72,-3.4]],0x859387);
  cylinder(g,.13,.06,.4,[0,0,-5.45],finMat);
  return g;
}

export function createEquipmentModel(key){return ({rafale,tank,frigate,submarine}[key]||rafale)();}
