"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const products = [
  { name: "TORCH 7G", price: "Gs. 360.000" },
  { name: "8G", price: "Gs. 360.000" },
  { name: "ELF 5G", price: "Gs. 280.000" },
  { name: "ELF 3G", price: "Gs. 250.000" },
  { name: "PULSE", price: "Gs. 290.000" },
  { name: "ESCOBAR 3G", price: "Gs. 240.000" },
];

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-hellix-black px-5 py-10 text-hellix-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
          <ArrowLeft size={16} /> Voltar ao início
        </Link>
        <header className="mb-10 mt-12">
          <p className="text-xs uppercase tracking-[.3em] text-hellix-pink">HELLIX .CO</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Catálogo<span className="text-hellix-pink">.</span></h1>
          <p className="mt-4 text-sm text-white/45">Produtos e valores disponíveis.</p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="rounded-3xl border border-white/10 bg-white/[.035] p-6 transition hover:border-hellix-pink/40 hover:bg-white/[.055]">
              <div className="mb-8 flex h-28 items-center justify-center rounded-2xl border border-white/[.06] bg-black/30">
                <span className="text-3xl font-semibold tracking-[.12em] text-white/15">H.</span>
              </div>
              <h2 className="text-lg font-medium">{product.name}</h2>
              <p className="mt-3 text-xl font-semibold text-hellix-pink">{product.price}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
