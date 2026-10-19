(function(){
document.querySelectorAll('.card,.box,.vm div,.pack img').forEach(function(e){
e.addEventListener('pointermove',function(v){if(v.pointerType!=='mouse')return;var r=e.getBoundingClientRect(),x=(v.clientX-r.left)/r.width-.5,y=(v.clientY-r.top)/r.height-.5;e.style.transform='perspective(800px) rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg)';});
e.addEventListener('pointerleave',function(){e.style.transform='';});});
if(!window.THREE)return;
var rn=function(a,b){return a+Math.random()*(b-a);},still=matchMedia('(prefers-reduced-motion: reduce)').matches;
function tex(kind){var c=document.createElement('canvas');c.width=c.height=512;var g=c.getContext('2d');g.fillStyle='#e6e6e6';g.fillRect(0,0,512,512);
if(kind=='skin'){for(var i=0;i<320;i++){g.fillStyle='rgba('+(Math.random()<.5?'0,0,0,':'255,255,255,')+rn(.02,.09)+')';g.fillRect(rn(0,512),0,rn(1,5),512);}
for(i=0;i<40;i++){var x=rn(0,512),y=rn(0,512),r=rn(30,90),gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(0,0,0,.08)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,2*r,2*r);}}
else{for(var j=0;j<5000;j++){g.fillStyle='rgba('+(Math.random()<.5?'0,0,0,':'255,255,255,')+rn(.05,.3)+')';g.beginPath();g.arc(rn(0,512),rn(0,512),rn(.5,3),0,6.3);g.fill();}}
var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t;}
var TS=tex('skin'),TN=tex('noise'),TR=TN.clone();TR.repeat.set(6,6);TR.needsUpdate=true;
function P(c,o){return new THREE.MeshPhysicalMaterial(Object.assign({color:c,roughness:.5,metalness:0,side:THREE.DoubleSide},o||{}));}
function mk(cv,fov,ss){var R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.setPixelRatio(Math.min(window.devicePixelRatio||1,2));R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=.95;R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(fov,1,.1,80),es=new THREE.Scene();es.add(new THREE.Mesh(new THREE.SphereGeometry(40,24,16),new THREE.MeshBasicMaterial({side:THREE.BackSide,color:0x8a94a6})));
[[0,30,0,30,30],[-25,10,15,12,20],[25,5,-10,10,16]].forEach(function(l){var m=new THREE.Mesh(new THREE.PlaneGeometry(l[3],l[4]),new THREE.MeshBasicMaterial({color:new THREE.Color(7,6.6,6),side:THREE.DoubleSide}));m.position.set(l[0],l[1],l[2]);m.lookAt(0,0,0);es.add(m);});
S.environment=new THREE.PMREMGenerator(R).fromScene(es,.03).texture;
var d=new THREE.DirectionalLight(0xfff0dd,1.25);d.position.set(5,9,6);d.castShadow=true;d.shadow.mapSize.set(ss,ss);var sc=d.shadow.camera;sc.left=sc.bottom=-8;sc.right=sc.top=8;sc.far=40;d.shadow.bias=-.0004;S.add(d);S.add(new THREE.AmbientLight(0xffffff,.25));
var gr=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.ShadowMaterial({opacity:.32}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;S.add(gr);
return{R:R,S:S,C:C,gr:gr};}
function org(g,a,f,s){g.computeVertexNormals();var p=g.attributes.position,n=g.attributes.normal;for(var i=0;i<p.count;i++){var x=p.getX(i),y=p.getY(i),z=p.getZ(i),v=(Math.sin(x*f+s)*Math.sin(y*f*1.3+s*2)*Math.sin(z*f*.9+s*3)+.5*Math.sin(x*f*2.3+y*f*1.7+s)*Math.cos(z*f*2.1-s))*a;p.setXYZ(i,x+n.getX(i)*v,y+n.getY(i)*v,z+n.getZ(i)*v);}g.computeVertexNormals();return g;}
function bend(g,k){var p=g.attributes.position;for(var i=0;i<p.count;i++){var y=p.getY(i);p.setX(i,p.getX(i)+k*y*y);}g.computeVertexNormals();}
function lat(f,n,h,seg){var a=[];for(var i=0;i<=n;i++){var t=i/n;a.push(new THREE.Vector2(Math.max(.012,f(t)),-h/2+h*t));}return new THREE.LatheGeometry(a,seg||64);}
function onionG(s,hi){return org(lat(function(t){var u=Math.min(1,Math.max(0,(t-.6)/.4)),sm=u*u*(3-2*u);return 1.45*Math.pow(Math.sin(Math.PI*Math.pow(t,.8)),.55)*(1-.62*sm)},hi?70:32,2.6,hi?96:48),.045,1.9,s);}
function me(g,m,x,y,z){var o=new THREE.Mesh(g,m);o.position.set(x||0,y||0,z||0);o.castShadow=o.receiveShadow=true;return o;}
function onion(g,m,nm){var o=new THREE.Group();o.add(me(g,m));var n=me(new THREE.CylinderGeometry(.03,.11,.32,8),nm,0,1.42,0);n.rotation.z=rn(-.25,.25);o.add(n);o.add(me(new THREE.CylinderGeometry(.22,.1,.14,12),nm,0,-1.3,0));return o;}
var neckM=P(0x8A5A3A,{roughness:.9});
/* HERO: pile of onions */
(function(){var cv=document.getElementById('cv');if(!cv)return;try{
var H=mk(cv,32,2048),S=H.S,C=H.C,R=H.R,heap=new THREE.Group(),N=90;
var PAL={red:[0x7A1235,0x8E1B45,0x651030],sum:[0xB87A25,0xC98A2E,0xA86C1F],wht:[0xE6DFCB,0xEEE8D6,0xD8D0B8]},tg=PAL.red.map(function(c){return new THREE.Color(c);});
var ms=PAL.red.map(function(c){return P(c,{map:TS,bumpMap:TS,bumpScale:.15,roughness:.5,clearcoat:.15,clearcoatRoughness:.6,side:THREE.FrontSide,envMapIntensity:.7});});
var ims=[1,4,7].map(function(s,i){var im=new THREE.InstancedMesh(onionG(s),ms[i],N);im.castShadow=im.receiveShadow=true;return im;});
var nim=new THREE.InstancedMesh(new THREE.CylinderGeometry(.03,.11,.32,8),neckM,N*3);nim.castShadow=true;
var o=new THREE.Object3D(),nd=new THREE.Object3D(),col=new THREE.Color();o.add(nd);nd.position.y=1.42;
for(var i=0;i<N*3;i++){var a=rn(0,6.28),rad=Math.sqrt(Math.random())*4.6,s=rn(.3,.4);o.position.set(Math.cos(a)*rad,1.7*Math.max(0,1-Math.pow(rad/5,2))+.38,Math.sin(a)*rad);o.rotation.set(rn(-.7,.7),rn(0,6.28),rn(-.9,.9));o.scale.setScalar(s);nd.rotation.z=rn(-.3,.3);o.updateMatrixWorld(true);var im=ims[i%3],k=(i/3)|0;im.setMatrixAt(k,o.matrix);nim.setMatrixAt(i,nd.matrixWorld);if(im.setColorAt){var v=rn(.82,1.12);col.setRGB(v,v,v);im.setColorAt(k,col);}}
ims.forEach(function(im){im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;heap.add(im);});nim.instanceMatrix.needsUpdate=true;heap.add(nim);S.add(heap);
var mx=0,vis=true;
function rs(){var w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();}rs();addEventListener('resize',rs);
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;});
document.querySelectorAll('#chips button').forEach(function(b){b.onclick=function(){tg=PAL[b.dataset.c].map(function(c){return new THREE.Color(c);});document.querySelectorAll('#chips button').forEach(function(x){x.setAttribute('aria-pressed',x===b);});};});
new IntersectionObserver(function(e){vis=e[0].isIntersecting;}).observe(cv);
(function loop(){requestAnimationFrame(loop);if(!vis)return;if(!still)heap.rotation.y+=.0015;C.position.set(mx*2.5,3.6,10.8);C.lookAt(0,.7,0);ms.forEach(function(m,i){m.color.lerp(tg[i],.08);});R.render(S,C);})();
}catch(e){console.log('3D unavailable',e);}})();
/* PRODUCT SHOWCASE */
(function(){var cv=document.getElementById('cv2');if(!cv)return;try{
var INF=[['Onion','Red, Summer and White onion in mesh, jute or leno bags, in small, medium and big sizes.'],['Chilli','Ask us for varieties, specifications and packing.'],['Beetroot Powder','Ask us for specifications and packing.'],['Turmeric Powder','Ask us for specifications and packing.'],['Spices','Ask us for the range, specifications and packing.'],['Cashew','Ask us for grades, specifications and packing.'],['Raisins','Ask us for grades, specifications and packing.']];
var tabs=document.getElementById('ptabs'),pn=document.getElementById('pn'),pd=document.getElementById('pd'),st=document.getElementById('sst');
var B=[
function(){var g=onion(onionG(5,1),P(0x8E1B45,{map:TS,bumpMap:TS,bumpScale:.25,roughness:.38,clearcoat:.3,clearcoatRoughness:.45}),neckM);for(var q=0;q<18;q++){var a=q/18*6.28,h=me(new THREE.CylinderGeometry(.008,.012,.4,5),neckM,Math.cos(a)*.13,-1.46,Math.sin(a)*.13);h.rotation.z=Math.cos(a)*.5;h.rotation.x=-Math.sin(a)*.5;g.add(h);}return g;},
function(){var g=new THREE.Group(),m=P(0xC8170F,{roughness:.22,clearcoat:1,clearcoatRoughness:.1}),gm=P(0x3A7D2C,{roughness:.6});[[0,0,.35,1],[.8,-.3,-.45,.85]].forEach(function(c){var h=new THREE.Group(),b=org(lat(function(t){return .32*Math.pow(Math.sin(Math.PI*Math.pow(t,.6)),.7)*(.45+.55*t)},70,3.2,64),.02,4,c[3]*3);bend(b,.16);h.add(me(b,m));var cx=.41,cap=me(new THREE.SphereGeometry(.27,24,16),gm,cx,1.62,0);cap.scale.set(1,.55,1);h.add(cap);h.add(me(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(cx,1.65,0),new THREE.Vector3(cx+.02,2.0,0),new THREE.Vector3(cx+.25,2.25,0)]),12,.055,8),gm));h.position.set(c[0],c[1],0);h.rotation.z=c[2];h.scale.setScalar(c[3]);g.add(h);});return g;},
function(){var g=new THREE.Group(),b=me(org(new THREE.SphereGeometry(1.15,64,48),.04,2,3),P(0x6F1744,{map:TS,bumpMap:TS,bumpScale:.5,roughness:.4,clearcoat:.3}));b.scale.set(1,.92,1);g.add(b);var tl=me(new THREE.ConeGeometry(.22,1.3,24),P(0x5E1438,{roughness:.6}),0,-1.55,0);tl.rotation.x=Math.PI;g.add(tl);[[-.4,.5],[0,0],[.4,-.5]].forEach(function(c){var s=me(new THREE.CylinderGeometry(.05,.07,1.2,10),P(0xA82B58,{roughness:.5}),c[0]*.5,1.55,0);s.rotation.z=c[1]*.5;g.add(s);var l=me(org(new THREE.SphereGeometry(.4,24,18),.03,3,1),P(0x2F7D3A,{roughness:.45,clearcoat:.2}),c[0]*1.5,2.25,0);l.scale.set(.6,1,.12);l.rotation.z=c[1]*.4;g.add(l);});return g;},
function(){var g=new THREE.Group(),m=new THREE.PlaneGeometry(5,5,150,150);m.rotateX(-Math.PI/2);var p=m.attributes.position;for(var i=0;i<p.count;i++){var x=p.getX(i),z=p.getZ(i),r=Math.sqrt(x*x+z*z),h=Math.max(0,1-Math.pow(r/2.4,2))*1.7;if(h>0)h+=Math.sin(x*9)*Math.sin(z*8)*.03+Math.sin(x*23+z*17)*.012;p.setY(i,h);}m.computeVertexNormals();g.add(me(m,P(0xDFA013,{map:TR,bumpMap:TR,bumpScale:.5,roughness:1})));
[[-2.1,.15,.6],[2.1,.15,-.7],[1.3,.15,1.6]].forEach(function(c,i){var r=me(org(new THREE.CylinderGeometry(.2,.15,1.2,32,12),.05,5,i),P(0xB8741A,{map:TS,bumpMap:TS,bumpScale:.8,roughness:.8}),c[0],c[1],c[2]);r.rotation.z=1.4;r.rotation.y=c[2];g.add(r);});return g;},
function(){var g=new THREE.Group(),pm=P(0x2B1E16,{map:TR,bumpMap:TR,bumpScale:1,roughness:.55,clearcoat:.2}),pg=[0,1,2].map(function(s){return org(new THREE.SphereGeometry(.16,24,18),.03,11,s*5);});
for(var i=0;i<50;i++){var a=rn(0,6.28),r=Math.sqrt(Math.random())*1.7;g.add(me(pg[i%3],pm,Math.cos(a)*r,Math.max(0,.9-r*.5)*rn(.2,1),Math.sin(a)*r));}
for(i=0;i<8;i++){var a2=rn(0,6.28),r2=rn(.3,1.6),p=me(org(new THREE.SphereGeometry(.2,24,18),.02,9,i),P(0x8DAF58,{map:TS,bumpMap:TS,roughness:.6}),Math.cos(a2)*r2,.5,Math.sin(a2)*r2);p.scale.set(1,.7,.7);g.add(p);}
for(i=0;i<3;i++){var s2=me(org(new THREE.CylinderGeometry(.13,.13,2.3,32,10,true),.015,4,i),P(0x9E5A2C,{map:TS,bumpMap:TS,bumpScale:.8,roughness:.8}),-.4+i*.5,.95+i*.12,-.3+i*.3);s2.rotation.z=1.3+i*.2;s2.rotation.y=i;g.add(s2);}return g;},
function(){var g=new THREE.Group(),m=P(0xE9C994,{roughness:.45,clearcoat:.25,clearcoatRoughness:.4});[[-.9,.5,.4],[1,-.3,-.5],[-.2,-1.1,2.2]].forEach(function(c,i){var k=new THREE.Group();k.add(me(org(new THREE.TorusGeometry(.9,.37,40,72,Math.PI*1.3),.03,3,i*3),m));[0,Math.PI*1.3].forEach(function(a){k.add(me(new THREE.SphereGeometry(.37,24,18),m,.9*Math.cos(a),.9*Math.sin(a),0));});k.position.set(c[0],c[1],0);k.rotation.z=c[2];k.scale.z=.8;g.add(k);});return g;},
function(){var g=new THREE.Group(),m=P(0x3A1B28,{map:TR,bumpMap:TR,bumpScale:1.2,roughness:.5,clearcoat:.5,clearcoatRoughness:.35}),rg=[0,1,2].map(function(s){return org(new THREE.SphereGeometry(.3,40,30),.075,6,s*4);});
for(var i=0;i<26;i++){var a=rn(0,6.28),r=Math.sqrt(Math.random())*1.5,o=me(rg[i%3],m,Math.cos(a)*r,Math.max(0,1.2-r*.8)*rn(.3,1),Math.sin(a)*r);o.scale.set(rn(.8,1.2),rn(.7,1),rn(.9,1.5));o.rotation.set(rn(0,3),rn(0,3),0);g.add(o);}return g;}];
var H=mk(cv,36,2048),S=H.S,C=H.C,R=H.R;H.gr.position.y=-2.1;C.position.set(0,1.6,10);C.lookAt(0,-.2,0);
var pv=new THREE.Group(),cur=null,k=0,ry=0,drag=false,lx=0,T=0,vis=true,sc=1;S.add(pv);
function show(i){if(cur)pv.remove(cur);cur=B[i]();var b=new THREE.Box3().setFromObject(cur),sz=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3());cur.position.sub(c);sc=3.7/Math.max(sz.x,sz.y,sz.z);var w=new THREE.Group();w.add(cur);pv.add(w);cur=w;k=0;pn.textContent=INF[i][0];pd.textContent=INF[i][1];[].forEach.call(tabs.children,function(b,j){b.setAttribute('aria-selected',j==i);});}
INF.forEach(function(x,i){var b=document.createElement('button');b.setAttribute('role','tab');b.textContent=x[0];b.onclick=function(){show(i);};tabs.appendChild(b);});
function rs(){var w=st.clientWidth,h=st.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();}rs();addEventListener('resize',rs);
cv.addEventListener('pointerdown',function(e){drag=true;lx=e.clientX;cv.setPointerCapture(e.pointerId);});
cv.addEventListener('pointermove',function(e){if(drag){ry+=(e.clientX-lx)*.012;lx=e.clientX;}});
['pointerup','pointercancel'].forEach(function(n){cv.addEventListener(n,function(){drag=false;});});
new IntersectionObserver(function(e){vis=e[0].isIntersecting;}).observe(cv);
show(1);
(function loop(){requestAnimationFrame(loop);if(!vis)return;T+=.016;k+=(1-k)*.08;pv.scale.setScalar(Math.max(.01,k)*sc);if(!drag&&!still)ry+=.007;pv.rotation.y=ry;pv.rotation.x=.2;pv.position.y=still?0:Math.sin(T*1.4)*.08;R.render(S,C);})();
}catch(e){console.log('3D unavailable',e);}})();
})();
