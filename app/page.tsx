"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Check, Menu, ShieldCheck, Sparkles, Smartphone, X } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Pureza Farmacêutica",
    body: "Extração por Live Resin, livre de contaminantes e com rigoroso controle de qualidade."
  },
  {
    icon: Smartphone,
    title: "Design Inteligente",
    body: "Smart Screens integrados para monitoramento de dose e bateria em tempo real."
  },
  {
    icon: ShieldCheck,
    title: "Segurança Legal",
    body: "100% alinhado com as regulamentações medicinais. Acesso seguro e transparente."
  }
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen overflow-hidden bg-hellix-black text-hellix-white">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[850px]" />
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Hellix início">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/[0.07] text-xl text-hellix-pink">✦</span>
          <span><span className="block text-lg font-semibold tracking-tight">hellix<span className="text-hellix-pink">.</span>co</span><span className="block text-[9px] tracking-[.28em] text-white/45">MEDICAL WELLNESS</span></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a className="transition hover:text-white" href="#diferenciais">Diferenciais</a>
          <a className="transition hover:text-white" href="#experiencia">Experiência</a>
          <a className="transition hover:text-white" href="#responsabilidade">Responsabilidade</a>
        </nav>
        <a href="#responsabilidade" className="hidden rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm transition hover:bg-white/10 md:inline-flex">Conheça a Hellix <ArrowUpRight className="ml-2 h-4 w-4" /></a>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} className="rounded-xl border border-white/15 p-2 md:hidden">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      {menuOpen && <nav className="relative z-20 mx-5 mb-3 grid gap-1 rounded-2xl border border-white/10 bg-black/90 p-3 backdrop-blur-xl md:hidden">
        {[["Diferenciais", "#diferenciais"], ["Experiência", "#experiencia"], ["Responsabilidade", "#responsabilidade"]].map(([label, href]) => <a key={href} onClick={closeMenu} href={href} className="rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/5">{label}</a>)}
      </nav>}

      <section id="inicio" className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-16 sm:px-8 md:min-h-[690px] md:grid-cols-[1.05fr_.95fr] md:gap-8 md:pb-32 md:pt-20 lg:px-12">
        <div className="relative z-10">
          <Reveal><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs text-white/65"><span className="h-1.5 w-1.5 rounded-full bg-hellix-pink shadow-[0_0_12px_rgba(240,166,215,.8)]" />Tecnologia, informação e responsabilidade</div></Reveal>
          <Reveal delay={0.08}><h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl">A Evolução do <span className="text-gradient">Bem-Estar Consciente.</span></h1></Reveal>
          <Reveal delay={0.16}><p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">Tecnologia de precisão em Pods de THC Medicinal. Pureza certificada, entrega inteligente e a dose exata para o seu equilíbrio diário.</p></Reveal>
          <Reveal delay={0.24}><div className="mt-9 flex flex-wrap items-center gap-4"><a href="#diferenciais" className="group inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-hellix-pink">Explore a Experiência <ArrowDownRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></a><span className="text-xs text-white/40">Conhecimento antes da escolha.</span></div></Reveal>
          <Reveal delay={0.3}><div className="mt-12 flex items-center gap-5 text-xs text-white/40"><span className="flex items-center gap-2"><Check size={14} className="text-hellix-pink" />Design cuidadoso</span><span className="h-1 w-1 rounded-full bg-white/25" /><span>Transparência em primeiro lugar</span></div></Reveal>
        </div>
        <Reveal delay={0.18} className="relative mx-auto flex h-[380px] w-full max-w-lg items-center justify-center sm:h-[450px]">
          <div className="absolute h-72 w-72 rounded-full bg-purple-500/15 blur-[90px]" />
          <div className="absolute h-56 w-56 translate-x-16 translate-y-10 rounded-full bg-pink-400/10 blur-[70px]" />
          <div className="glass absolute right-[8%] top-[15%] rounded-2xl px-4 py-3 text-xs text-white/65"><span className="mb-1 block text-[10px] uppercase tracking-[.2em] text-white/35">Precisão</span><span className="text-sm text-white">Design consciente</span></div>
          <motion.div animate={useReducedMotion() ? undefined : { y: [0, -10, 0], rotate: [7, 8, 7] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 mt-8">
            <div className="device-cap" /><div className="device-shell"><div className="device-inner"><div className="absolute inset-x-4 top-5 h-px bg-white/20" /><div className="absolute left-1/2 top-20 h-28 w-28 -translate-x-1/2 rounded-full bg-fuchsia-300/10 blur-2xl" /><div className="device-screen">HELLIX</div><div className="absolute bottom-7 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-white/30" /></div></div>
          </motion.div>
          <div className="glass absolute bottom-[12%] left-[4%] rounded-2xl px-4 py-3"><span className="block text-[10px] uppercase tracking-[.2em] text-white/35">HELLIX .CO</span><span className="mt-1 block text-sm">Mais clareza. Mais cuidado.</span></div>
        </Reveal>
      </section>

      <section id="diferenciais" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal><div className="mx-auto mb-14 max-w-2xl text-center"><span className="text-xs font-medium uppercase tracking-[.28em] text-hellix-pink">A filosofia Hellix</span><h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">A inovação encontra <span className="text-white/45">a intenção.</span></h2><p className="mx-auto mt-5 max-w-xl leading-7 text-white/55">Cada detalhe importa. Informação transparente e atenção à qualidade devem fazer parte de toda experiência.</p></div></Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, body }, index) => <Reveal key={title} delay={index * 0.1}><article className="glass group h-full rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-8"><div className="mb-9 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-hellix-pink transition group-hover:bg-white/10"><Icon size={22} strokeWidth={1.6} /></div><h3 className="text-xl font-medium tracking-tight">{title}</h3><p className="mt-4 text-sm leading-7 text-white/55">{body}</p></article></Reveal>)}
        </div>
      </section>

      <section id="experiencia" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-purple-500/10 blur-[80px]" />
          <div className="relative grid items-center gap-12 md:grid-cols-[1fr_.8fr]">
            <Reveal><span className="text-xs uppercase tracking-[.28em] text-hellix-pink">Ritual & tecnologia</span><h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Mais que um dispositivo, <span className="text-gradient">um novo ritual.</span></h2><p className="mt-6 max-w-xl leading-8 text-white/60">Do alívio do estresse à melhora do sono. Projetado para quem não abre mão da performance e da saúde.</p></Reveal>
            <Reveal delay={0.12}><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 bg-black/25 p-5"><Sparkles className="mb-5 text-hellix-pink" size={22} /><p className="text-sm font-medium">Experiência pensada</p><p className="mt-2 text-xs leading-5 text-white/45">Atenção aos detalhes e à clareza.</p></div><div className="rounded-2xl border border-white/10 bg-black/25 p-5"><ShieldCheck className="mb-5 text-hellix-purple" size={22} /><p className="text-sm font-medium">Uso responsável</p><p className="mt-2 text-xs leading-5 text-white/45">Respeito às regras aplicáveis.</p></div></div></Reveal>
          </div>
        </div>
      </section>

      <section id="responsabilidade" className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <Reveal><span className="text-xs uppercase tracking-[.28em] text-hellix-pink">Transparência sempre</span><h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">Pronto para elevar sua frequência?</h2><p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">Antes de qualquer decisão, consulte profissionais habilitados e confirme as exigências legais da sua localidade. Disponibilidade, elegibilidade e informações sobre produtos dependem das autorizações e da documentação aplicáveis.</p><a href="mailto:contato@hellix.co" className="mt-8 inline-flex items-center rounded-full border border-white/15 bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-hellix-pink">Adquirir Agora <ArrowUpRight className="ml-2 h-4 w-4" /></a><p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-white/35">Este site não substitui orientação médica nem confirma autorização de comercialização. Não use produtos com THC sem orientação profissional e sem verificar a legislação local.</p></Reveal>
      </section>

      <footer className="relative border-t border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 text-xs text-white/40 sm:flex-row sm:items-center"><a href="#inicio" className="text-sm font-semibold tracking-tight text-white/75">hellix<span className="text-hellix-pink">.</span>co</a><p>© {new Date().getFullYear()} Hellix .co. Informação e responsabilidade.</p><a href="#responsabilidade" className="transition hover:text-white/70">Aviso de responsabilidade</a></div>
      </footer>
    </main>
  );
}
