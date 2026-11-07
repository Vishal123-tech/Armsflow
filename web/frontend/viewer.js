import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createEquipmentModel } from './models.js';

export class EquipmentViewer {
  constructor(container){
    this.container=container;this.enabled=true;this.model=null;this.spin=false;this.wire=false;
    this.scene=new T.Scene();this.camera=new T.PerspectiveCamera(35,1,.1,150);
    this.renderer=new T.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFSoftShadowMap;
    this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.25;
    container.append(this.renderer.domElement);
    const pmrem=new T.PMREMGenerator(this.renderer);const room=new RoomEnvironment();
    this.environment=pmrem.fromScene(room,.04).texture;this.scene.environment=this.environment;room.dispose();pmrem.dispose();
    this.scene.add(new T.HemisphereLight(0xdde7d4,0x28352a,2.2));
    const key=new T.DirectionalLight(0xf0f0df,4.2);key.position.set(-6,12,8);key.castShadow=true;
    key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:40});key.shadow.bias=-.0005;this.scene.add(key);
    const rim=new T.DirectionalLight(0xb6c9db,2.5);rim.position.set(8,6,-8);this.scene.add(rim);
    this.floor=new T.Mesh(new T.PlaneGeometry(100,100),new T.ShadowMaterial({opacity:.23}));this.floor.rotation.x=-Math.PI/2;this.floor.receiveShadow=true;this.scene.add(this.floor);
    this.grid=new T.GridHelper(90,90,0x728568,0x5d7055);this.grid.material.transparent=true;this.grid.material.opacity=.13;this.scene.add(this.grid);
    this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.enableDamping=true;this.controls.dampingFactor=.08;
    this.controls.enablePan=false;this.controls.minDistance=9;this.controls.maxDistance=35;this.controls.maxPolarAngle=Math.PI*.88;
    this.controls.autoRotateSpeed=.5;this.controls.target.set(0,0,0);
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(container);
    container.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-'].includes(event.key)){event.preventDefault();if(event.key==='+'||event.key==='-')this.zoom(event.key==='+'?.86:1.16);else{const spherical=new T.Spherical().setFromVector3(this.camera.position);if(event.key==='ArrowLeft')spherical.theta-=.12;if(event.key==='ArrowRight')spherical.theta+=.12;if(event.key==='ArrowUp')spherical.phi=Math.max(.03,spherical.phi-.12);if(event.key==='ArrowDown')spherical.phi=Math.min(Math.PI*.86,spherical.phi+.12);this.camera.position.setFromSpherical(spherical);this.controls.update();}}});
    this.last=performance.now();this.tick();this.reset();
  }
  resize(){const w=this.container.clientWidth,h=this.container.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();}
  setModel(key){
    if(this.model){this.scene.remove(this.model);this.model.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});this.model=null;}
    if(!key){this.renderer.domElement.hidden=true;return;}
    this.renderer.domElement.hidden=false;this.model=createEquipmentModel(key);
    const box=new T.Box3().setFromObject(this.model),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());
    const scale=10/Math.max(size.x,size.z);this.model.scale.setScalar(scale);this.model.position.copy(center).multiplyScalar(-scale);
    const ground=(box.min.y-center.y)*scale-.5;this.floor.position.y=ground;this.grid.position.y=ground+.01;
    this.scene.add(this.model);this.setWireframe(this.wire);this.reset();this.resize();
    this.renderer.domElement.setAttribute('data-model',key);
  }
  reset(){this.angle('perspective');}
  angle(name){const positions={perspective:[-12,8,15],top:[0,21,.02],side:[21,2,0]};this.camera.position.set(...positions[name]);this.controls.target.set(0,0,0);this.controls.update();}
  zoom(multiplier){const distance=T.MathUtils.clamp(this.camera.position.length()*multiplier,9,35);this.camera.position.setLength(distance);this.controls.update();}
  setWireframe(value){this.wire=value;this.model?.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material])m.wireframe=value;});}
  tick(){requestAnimationFrame(()=>this.tick());const now=performance.now();const delta=Math.min((now-this.last)/1000,.1);this.last=now;if(this.enabled&&!document.hidden){this.controls.autoRotate=this.spin;this.controls.update(delta);this.renderer.render(this.scene,this.camera);}}
}
