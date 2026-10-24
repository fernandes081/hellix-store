(()=> {
  const host=document.querySelector('[data-delivery-globe]');
  if(!host||host.dataset.started)return;
  host.dataset.started='1';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cities=[
    {key:'sp',name:'Pix',flag:'🇧🇷',lat:-23.55,lon:-46.63,main:true},
    {key:'lis',name:'MB WAY',flag:'🇵🇹',lat:38.72,lon:-9.14,main:true},
    {key:'mex',name:'SPEI',flag:'🇲🇽',lat:19.43,lon:-99.13,main:true},
    {key:'mum',name:'UPI',flag:'🇮🇳',lat:19.08,lon:72.88,main:true},
    {key:'nyc',name:'ACH',flag:'🇺🇸',lat:40.71,lon:-74},
    {key:'tor',name:'Interac',flag:'🇨🇦',lat:43.65,lon:-79.38},
    {key:'bog',name:'PSE',flag:'🇨🇴',lat:4.71,lon:-74.07},
    {key:'lim',name:'Yape',flag:'🇵🇪',lat:-12.05,lon:-77.04},
    {key:'bue',name:'Mercado Pago',flag:'🇦🇷',lat:-34.6,lon:-58.38},
    {key:'ldn',name:'Faster Payments',flag:'🇬🇧',lat:51.5,lon:-.12},
    {key:'mad',name:'Bizum',flag:'🇪🇸',lat:40.42,lon:-3.7},
    {key:'par',name:'CB',flag:'🇫🇷',lat:48.86,lon:2.35},
    {key:'ber',name:'SEPA Instant',flag:'🇩🇪',lat:52.52,lon:13.4},
    {key:'dxb',name:'Aani',flag:'🇦🇪',lat:25.2,lon:55.27},
    {key:'lag',name:'NIP',flag:'🇳🇬',lat:6.52,lon:3.38},
    {key:'nbo',name:'M-Pesa',flag:'🇰🇪',lat:-1.29,lon:36.82},
    {key:'bkk',name:'PromptPay',flag:'🇹🇭',lat:13.76,lon:100.5},
    {key:'sin',name:'PayNow',flag:'🇸🇬',lat:1.35,lon:103.82},
    {key:'jkt',name:'QRIS',flag:'🇮🇩',lat:-6.2,lon:106.85},
    {key:'sha',name:'Alipay',flag:'🇨🇳',lat:31.23,lon:121.47},
    {key:'tyo',name:'PayPay',flag:'🇯🇵',lat:35.68,lon:139.69},
    {key:'syd',name:'PayID',flag:'🇦🇺',lat:-33.87,lon:151.2}
  ];
  const focusOrder=['sp','lis','mex','mum'];
  const canvas=host.querySelector('canvas');
  const labels=host.querySelector('.delivery-globe-label');
  const load=()=>new Promise((resolve,reject)=>{if(window.THREE)return resolve();const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.async=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
  const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)return;observer.disconnect();load().then(init).catch(()=>{host.classList.add('globe-fallback');labels.textContent='Pix · MB WAY · SPEI · UPI'})},{rootMargin:'1400px'});
  observer.observe(host);
  function init(){
    const T=window.THREE,D=Math.PI/180;
    let renderer,scene,camera,group,raf,rotation=.62,drag=null,focusIndex=0,last=performance.now(),lastFocus=0,seen=true;
    const labelEls=[];
    try{
      renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
      renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.8));
      scene=new T.Scene();camera=new T.PerspectiveCamera(30,1,.1,50);camera.position.set(0,0,5.2);
      const tilt=new T.Group();tilt.rotation.x=.3;scene.add(tilt);group=new T.Group();tilt.add(group);
      const sphere=new T.Mesh(new T.SphereGeometry(.992,64,48),new T.MeshPhongMaterial({color:0xf4edf4,shininess:12}));
      group.add(sphere);
      scene.add(new T.AmbientLight(0xffffff,1.8));
      const light=new T.PointLight(0xf5c4dd,2.1);light.position.set(-2,2,4);scene.add(light);
      const rim=new T.PointLight(0x9d81d8,1.3);rim.position.set(2,-1,-3);scene.add(rim);
      const ll=(lat,lon,r=1)=>{const a=lat*D,o=lon*D,c=Math.cos(a);return new T.Vector3(c*Math.sin(o)*r,Math.sin(a)*r,c*Math.cos(o)*r)};
      // Pontos luminosos na superfície: estética pontilhada do código de referência.
      const positions=[],gold=[],rnd=[];const N=15000,ga=Math.PI*(3-Math.sqrt(5));
      for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),a=i*ga,x=Math.cos(a)*r,z=Math.sin(a)*r;positions.push(x,y,z);gold.push(i%5===0?1:0);rnd.push(Math.random())}
      const pg=new T.BufferGeometry();pg.setAttribute('position',new T.Float32BufferAttribute(positions,3));pg.setAttribute('aR',new T.Float32BufferAttribute(rnd,1));
      const pm=new T.PointsMaterial({color:0xd42ac1,size:.008,transparent:true,opacity:.58,sizeAttenuation:true,depthWrite:false});
      group.add(new T.Points(pg,pm));
      // Meridianos discretos na cor escura da identidade Hellix.
      const gridMat=new T.LineBasicMaterial({color:0x211e27,transparent:true,opacity:.07});
      for(let lat=-60;lat<=60;lat+=30){const p=[];for(let lon=0;lon<=360;lon+=4)p.push(ll(lat,lon,1.002));group.add(new T.Line(new T.BufferGeometry().setFromPoints(p),gridMat))}
      for(let lon=0;lon<360;lon+=30){const p=[];for(let lat=-90;lat<=90;lat+=4)p.push(ll(lat,lon,1.002));group.add(new T.Line(new T.BufferGeometry().setFromPoints(p),gridMat))}
      const start=ll(cities[0].lat,cities[0].lon,1.004);
      const arcs=[];
      cities.slice(1).forEach((c,i)=>{
        const end=ll(c.lat,c.lon,1.004),angle=start.angleTo(end),pts=[];
        for(let j=0;j<=64;j++){const t=j/64;const v=start.clone().lerp(end,t).normalize().multiplyScalar(1.004+(.08+angle/Math.PI*.3)*Math.sin(Math.PI*t));pts.push(v)}
        const material=new T.LineBasicMaterial({color:c.main?0xd42ac1:0x9d81d8,transparent:true,opacity:c.main?.8:.35});
        const line=new T.Line(new T.BufferGeometry().setFromPoints(pts),material);line.userData.phase=i*.17;group.add(line);arcs.push(line);
      });
      const markerRecords=[];
      cities.forEach((c,i)=>{
        const p=ll(c.lat,c.lon,1.014),main=!!c.main;
        const dot=new T.Mesh(new T.SphereGeometry(main?.018:.011,12,10),new T.MeshBasicMaterial({color:i===0?0x211e27:main?0xd42ac1:0x9d81d8}));
        dot.position.copy(p);group.add(dot);
        const ring=new T.Mesh(new T.RingGeometry(.019,.025,28),new T.MeshBasicMaterial({color:0xf05ba7,transparent:true,opacity:.8,side:T.DoubleSide,depthWrite:false}));
        ring.position.copy(p);ring.lookAt(p.clone().multiplyScalar(2));group.add(ring);markerRecords.push({ring,phase:i*.41,main});
        const el=document.createElement('span');el.className='dcg-label'+(main?' dcg-label-main':'');el.innerHTML='<span class="dcg-flag">'+c.flag+'</span><span>'+c.name+'</span>';el.style.opacity='0';host.appendChild(el);labelEls.push({el,c,pos:ll(c.lat,c.lon,1.06),w:0,h:0,on:false});
      });
      function resize(){const r=host.getBoundingClientRect(),w=Math.max(2,r.width),h=Math.max(2,r.height);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();labelEls.forEach(l=>{l.w=0;l.h=0})}
      new ResizeObserver(resize).observe(host);resize();
      host.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;drag={x:e.clientX,r:rotation,lx:e.clientX};host.setPointerCapture?.(e.pointerId)});
      host.addEventListener('pointermove',e=>{if(!drag)return;rotation=drag.r+(e.clientX-drag.x)*.0062});
      const end=()=>{drag=null};host.addEventListener('pointerup',end);host.addEventListener('pointercancel',end);
      function setFocus(i){focusIndex=i;labelEls.forEach(l=>l.el.classList.toggle('is-focus',l.c.key===focusOrder[i]));}
      function frame(now){
        const dt=Math.min(.05,(now-last)/1000);last=now;
        if(!reduced&&!drag)rotation+=dt*.095;
        group.rotation.set(0,rotation,0);
        arcs.forEach((a,i)=>{a.material.opacity=(i<3?.65:.22)+.16*(.5+.5*Math.sin(now*.0015+a.userData.phase))});
        markerRecords.forEach(m=>{const u=reduced?.45:((now*.00045+m.phase)%1);m.ring.scale.setScalar((m.main?1.25:.8)*(1+u*2.4));m.ring.material.opacity=(1-u)*.7});
        scene.updateMatrixWorld();
        const cam=camera.position.clone().normalize(),candidates=labelEls.map(l=>{const p=l.pos.clone().applyMatrix4(group.matrixWorld),f=p.clone().normalize().dot(cam);p.project(camera);if(!l.w){l.w=l.el.offsetWidth||80;l.h=l.el.offsetHeight||22}return{l,x:(p.x*.5+.5)*host.clientWidth,y:(-p.y*.5+.5)*host.clientHeight,f,priority:(l.c.main?2:0)+(l.c.key===focusOrder[focusIndex]?4:0)+f}}).sort((a,b)=>b.priority-a.priority);
        const placed=[];candidates.forEach(o=>{let show=false,x=o.x+8,y=o.y-o.l.h/2;const w=o.l.w,h=o.l.h;if(o.f>.22){const opts=[[o.x+8,o.y-h/2],[o.x-w-8,o.y-h/2],[o.x-w/2,o.y-h-7],[o.x-w/2,o.y+7]];for(const q of opts){const [xx,yy]=q;if(xx<2||yy<2||xx+w>host.clientWidth-2||yy+h>host.clientHeight-2)continue;if(placed.some(a=>xx<a[2]+3&&xx+w+3>a[0]&&yy<a[3]+2&&yy+h+2>a[1]))continue;x=xx;y=yy;show=true;placed.push([x,y,x+w,y+h]);break}}
          if(show||!o.l.on)o.l.el.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px)';
          if(show!==o.l.on){o.l.on=show;o.l.el.style.opacity=show?'1':'0'}
        });
        renderer.render(scene,camera);if(!reduced)raf=requestAnimationFrame(frame);
      }
      setFocus(0);frame(performance.now());
      if(!reduced)setInterval(()=>{if(drag||document.hidden)return;setFocus((focusIndex+1)%focusOrder.length)},4200);
      document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else if(!reduced){last=performance.now();frame(last)}});
      host.classList.add('is-ready');
    }catch(e){host.classList.add('globe-fallback');labels.textContent='Pix · MB WAY · SPEI · UPI';console.warn('Globo indisponível:',e)}
  }
})();