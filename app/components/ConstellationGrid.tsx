"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number; y: number; baseX: number; baseY: number;
  vx: number; vy: number; radius: number; pulse: number; label: string;
};

export default function ConstellationGrid() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!host || !canvas || !ctx) return;

    // Parâmetros equivalentes ao snippet original.
    const ESPACAMENTO = 55;
    const RAIO_CURSOR = 220;
    const FORCA = 1500;
    const MOLA = 18;
    const AMORTECIMENTO = 0.82;
    const CONEXAO = 75;
    const MOSTRAR_ROTULOS = true;
    const STEP = 1 / 60;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, prevX: 0, prevY: 0, active: false };
    let width = 0, height = 0;
    let nodes: NodePoint[] = [];
    let raf = 0, lastTime = 0, accumulator = 0;
    let visible = true, disposed = false;
    let pointColor = "255,255,255", accent = "240,166,215";
    let resizeObserver: ResizeObserver;
    let intersectionObserver: IntersectionObserver;

    function draw() {
      if (!ctx || !width || !height) return;
      ctx.clearRect(0, 0, width, height);

      // Grade espacial para desenhar conexões sem comparar todos os pontos entre si.
      const cells = new Map<string, number[]>();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const key = Math.floor(n.x / CONEXAO) + "," + Math.floor(n.y / CONEXAO);
        if (!cells.has(key)) cells.set(key, []);
        cells.get(key)!.push(i);
      }

      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i], cx = Math.floor(n.x / CONEXAO), cy = Math.floor(n.y / CONEXAO);
        for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) {
          const neighbors = cells.get((cx + ox) + "," + (cy + oy));
          if (!neighbors) continue;
          for (const j of neighbors) {
            if (j <= i) continue;
            const other = nodes[j], distance = Math.hypot(n.x - other.x, n.y - other.y);
            if (distance >= CONEXAO) continue;
            ctx.strokeStyle = "rgba(" + pointColor + "," + ((1 - distance / CONEXAO) * 0.18) + ")";
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(other.x, other.y); ctx.stroke();
          }
        }
      }

      const radius = Math.min(RAIO_CURSOR, width * 0.48, height * 0.48);
      for (const n of nodes) {
        const distance = pointer.active ? Math.hypot(pointer.x - n.x, pointer.y - n.y) : Infinity;
        const near = distance < radius;
        const alpha = near ? 0.95 : 0.25 + Math.sin(n.pulse) * 0.1;
        ctx.fillStyle = "rgba(" + (near ? accent : pointColor) + "," + alpha + ")";
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, near ? n.radius * 2.2 : n.radius + Math.sin(n.pulse) * 0.3), 0, Math.PI * 2);
        ctx.fill();

        // Anéis expansivos e coordenadas surgem junto ao cursor, como no original.
        if (MOSTRAR_ROTULOS && distance < 90) {
          const ring = (n.pulse * 20) % 30 + 4;
          ctx.strokeStyle = "rgba(" + accent + "," + ((1 - ring / 34) * 0.4) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(n.x, n.y, ring, 0, Math.PI * 2); ctx.stroke();
          ctx.font = "8px ui-monospace, SFMono-Regular, Consolas, monospace";
          ctx.fillStyle = "rgba(" + accent + ",.85)";
          ctx.fillText(n.label, n.x + 10, n.y - 10);
        }
      }
    }

    function init() {
      if (disposed || !host) return;
      const w = Math.round(host.clientWidth), h = Math.round(host.clientHeight);
      if (w === width && h === height) return;
      width = w; height = h;
      if (!w || !h) { stop(); return; }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const style = getComputedStyle(host.parentElement || host);
      pointColor = style.getPropertyValue("--cgc-pontos").trim() || "255,255,255";
      accent = style.getPropertyValue("--cgc-destaque").trim() || "240,166,215";
      const spacing = Math.max(ESPACAMENTO, Math.sqrt(w * h / 1000));
      nodes = [];
      for (let col = 0; col <= Math.ceil(w / spacing); col++) {
        for (let row = 0; row <= Math.ceil(h / spacing); row++) {
          const x = col * spacing, y = row * spacing;
          nodes.push({
            x, y, baseX: x, baseY: y, vx: 0, vy: 0,
            radius: 1.2 + Math.random() * 1.2, pulse: Math.random() * Math.PI * 2,
            label: (col * 7).toString(16).toUpperCase() + ":" + (row * 11).toString(16).toUpperCase()
          });
        }
      }
      pointer.active = false; accumulator = 0; draw(); start();
    }

    function move(event: PointerEvent) {
      if (reduced.matches) return;
      const rect = host.getBoundingClientRect();
      const x = (event.clientX - rect.left) * width / rect.width;
      const y = (event.clientY - rect.top) * height / rect.height;
      if (!pointer.active) { pointer.prevX = x; pointer.prevY = y; }
      pointer.x = x; pointer.y = y; pointer.active = true; start();
    }
    function leave() { pointer.active = false; }
    function release(event: PointerEvent) { if (event.pointerType !== "mouse") leave(); }

    function step() {
      const speed = pointer.active
        ? Math.min(50, Math.hypot(pointer.x - pointer.prevX, pointer.y - pointer.prevY) / (STEP * 1000))
        : 0;
      pointer.prevX = pointer.x; pointer.prevY = pointer.y;
      const radius = Math.min(RAIO_CURSOR, width * 0.48, height * 0.48);
      for (const n of nodes) {
        n.pulse += STEP * 3;
        const dx = pointer.x - n.x, dy = pointer.y - n.y, distance = Math.hypot(dx, dy);
        if (pointer.active && distance > 0 && distance < radius) {
          const force = (1 - distance / radius) * (FORCA + speed * 150);
          n.vx -= dx / distance * force * STEP;
          n.vy -= dy / distance * force * STEP;
        }
        n.vx += (n.baseX - n.x) * MOLA * STEP;
        n.vy += (n.baseY - n.y) * MOLA * STEP;
        n.vx *= AMORTECIMENTO; n.vy *= AMORTECIMENTO;
        n.x += n.vx * STEP * 60; n.y += n.vy * STEP * 60;
      }
    }

    function render(now: number) {
      raf = 0;
      if (!host.isConnected) { dispose(); return; }
      if (disposed || !visible || document.hidden || reduced.matches) return;
      accumulator += Math.min((now - lastTime) / 1000, 0.05); lastTime = now;
      while (accumulator >= STEP) { step(); accumulator -= STEP; }
      draw(); raf = requestAnimationFrame(render);
    }
    function start() {
      if (!raf && !disposed && visible && !document.hidden && !reduced.matches && width && height) {
        lastTime = performance.now(); raf = requestAnimationFrame(render);
      }
    }
    function stop() { cancelAnimationFrame(raf); raf = 0; accumulator = 0; leave(); }
    function preference() {
      stop();
      for (const n of nodes) { n.x = n.baseX; n.y = n.baseY; n.vx = n.vy = 0; }
      draw(); start();
    }
    function visibility() { if (document.hidden) stop(); else start(); }
    function dispose() {
      disposed = true; stop(); resizeObserver.disconnect(); intersectionObserver.disconnect();
      const eventTarget = host.parentElement || host;
      eventTarget.removeEventListener("pointermove", move as EventListener); eventTarget.removeEventListener("pointerdown", move as EventListener);
      eventTarget.removeEventListener("pointerleave", leave); eventTarget.removeEventListener("pointercancel", leave);
      eventTarget.removeEventListener("pointerup", release as EventListener);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("scroll", leave, true);
      reduced.removeEventListener("change", preference);
    }

    const eventTarget = host.parentElement || host;
    eventTarget.addEventListener("pointermove", move as EventListener, { passive: true });
    eventTarget.addEventListener("pointerdown", move as EventListener, { passive: true });
    eventTarget.addEventListener("pointerleave", leave);
    eventTarget.addEventListener("pointercancel", leave);
    eventTarget.addEventListener("pointerup", release as EventListener);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("scroll", leave, { passive: true, capture: true });
    reduced.addEventListener("change", preference);
    resizeObserver = new ResizeObserver(init);
    intersectionObserver = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    });
    resizeObserver.observe(host); intersectionObserver.observe(host); init();
    if (document.fonts) document.fonts.ready.then(() => { if (host.isConnected) init(); });
    return dispose;
  }, []);

  // Eventos são escutados na própria seção Hero para que a grade não bloqueie botões.
  return (
    <div ref={hostRef} aria-hidden="true" className="pointer-events-auto absolute inset-0 z-0 overflow-hidden" style={{ touchAction: "pan-y" }}>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}
