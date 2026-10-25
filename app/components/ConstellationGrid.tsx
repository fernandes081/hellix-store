"use client";

import { useEffect, useRef } from "react";

export default function ConstellationGrid() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!host || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, active: false };
    let width = 0, height = 0, nodes: { x:number; y:number; bx:number; by:number; vx:number; vy:number; pulse:number; radius:number }[] = [];
    let frame = 0, visible = true, disposed = false;
    const spacing = 55, reach = 220, link = 75, step = 1 / 60;
    let last = 0, elapsed = 0;
    const resize = () => {
      width = host.clientWidth; height = host.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = [];
      const gap = Math.max(spacing, Math.sqrt(width * height / 1000));
      for (let x = 0; x <= width; x += gap) for (let y = 0; y <= height; y += gap)
        nodes.push({ x, y, bx:x, by:y, vx:0, vy:0, pulse:Math.random()*6.28, radius:1+Math.random() });
      draw();
    };
    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = "rgba(3,4,7,0)";
      ctx.clearRect(0,0,width,height);
      for (let i=0;i<nodes.length;i++) {
        const a=nodes[i];
        for(let j=i+1;j<nodes.length;j++) {
          const b=nodes[j], d=Math.hypot(a.x-b.x,a.y-b.y);
          if(d<link) { ctx.strokeStyle="rgba(255,255,255,"+((1-d/link)*.17)+")";ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke(); }
        }
      }
      for(const n of nodes) {
        const d=pointer.active?Math.hypot(pointer.x-n.x,pointer.y-n.y):Infinity;
        const near=d<reach;
        ctx.fillStyle=near?"rgba(240,166,215,.95)":"rgba(255,255,255,"+(.22+Math.sin(n.pulse)*.08)+")";
        ctx.beginPath();ctx.arc(n.x,n.y,near?n.radius*2:n.radius,0,Math.PI*2);ctx.fill();
      }
    };
    const tick = (now:number) => {
      frame=0;
      if(disposed||!visible||document.hidden||reduceMotion.matches)return;
      elapsed+=Math.min((now-last)/1000,.05);last=now;
      while(elapsed>=step) {
        for(const n of nodes) {
          n.pulse+=step*3;
          const dx=pointer.x-n.x,dy=pointer.y-n.y,d=Math.hypot(dx,dy);
          if(pointer.active&&d>0&&d<reach){const f=(1-d/reach)*24;n.vx-=dx/d*f*step;n.vy-=dy/d*f*step;}
          n.vx+=(n.bx-n.x)*18*step;n.vy+=(n.by-n.y)*18*step;
          n.vx*=.82;n.vy*=.82;n.x+=n.vx;n.y+=n.vy;
        }
        elapsed-=step;
      }
      draw();frame=requestAnimationFrame(tick);
    };
    const start=()=>{if(!frame&&!disposed&&visible&&!document.hidden&&!reduceMotion.matches){last=performance.now();frame=requestAnimationFrame(tick);}};
    const move=(e:PointerEvent)=>{const r=host.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true;start();};
    const leave=()=>{pointer.active=false;};
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();};
    const observer=new ResizeObserver(resize);
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0;}});
    host.addEventListener("pointermove",move,{passive:true});host.addEventListener("pointerleave",leave);
    document.addEventListener("visibilitychange",visibility);reduceMotion.addEventListener("change",visibility);
    observer.observe(host);intersection.observe(host);resize();start();
    return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();host.removeEventListener("pointermove",move);host.removeEventListener("pointerleave",leave);document.removeEventListener("visibilitychange",visibility);reduceMotion.removeEventListener("change",visibility);};
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden"><canvas ref={canvasRef} className="absolute inset-0 h-full w-full" /></div>;
}
