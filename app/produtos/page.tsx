import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const countries = [
  { name: "Brasil", text: "Verifique as regras sanitárias, de prescrição, acesso, importação e publicidade aplicáveis." },
  { name: "Paraguai", text: "Confirme autorizações locais, requisitos sanitários e regras de importação e distribuição." },
  { name: "Uruguai", text: "Consulte as regras locais para cada produto e modalidade de acesso." }
];

export default function InformacoesPage() {
  return (
    <main className="min-h-screen bg-hellix-black px-5 py-8 text-hellix-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"><ArrowLeft size={16}/> Voltar à página inicial</Link>
        <div className="mt-14 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs tracking-wide text-hellix-pink"><ShieldCheck size={14}/> INFORMAÇÃO RESPONSÁVEL</span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">Informação antes de <span className="text-gradient">qualquer decisão.</span></h1>
          <p className="mt-6 max-w-2xl leading-8 text-white/60">Brasil, Paraguai e Uruguai: a disponibilidade e as condições de acesso dependem das regras aplicáveis a cada produto e país.</p>
          <div className="mt-8 inline-flex rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4"><div><span className="block text-xs text-white/45">STATUS DO SITE</span><strong className="mt-1 block text-sm">Informativo — sem vendas ativas</strong></div></div>
        </div>
        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {countries.map((country) => <article key={country.name} className="glass rounded-3xl p-6"><h2 className="text-lg font-medium">{country.name}</h2><p className="mt-3 text-sm leading-7 text-white/55">{country.text}</p></article>)}
        </section>
        <section className="mt-14 space-y-4">
          <h2 className="text-2xl font-semibold">Princípios Hellix .co</h2>
          {[
            ["O site já vende produtos?", "Não. O site não processa pedidos ou pagamentos. Nenhum produto, preço, estoque ou autorização é anunciado como oferta real nesta página."],
            ["Como são tratadas as informações regulatórias?", "As informações devem ser confirmadas para cada produto e país antes de qualquer divulgação comercial. A documentação da empresa, por si só, não confirma que todos os produtos ou formas de distribuição estejam autorizados em todos os mercados."],
            ["Isso substitui orientação médica?", "Não. O conteúdo é informativo e não substitui avaliação, prescrição ou acompanhamento por profissional de saúde habilitado."]
          ].map(([question, answer]) => <details key={question} className="glass rounded-2xl p-5"><summary className="cursor-pointer font-medium">{question}</summary><p className="mt-3 text-sm leading-7 text-white/55">{answer}</p></details>)}
        </section>
        <footer className="mt-16 border-t border-white/10 py-7 text-xs leading-6 text-white/35">© {new Date().getFullYear()} Hellix .co. Página informativa; sem vendas ou pagamentos ativos.</footer>
      </div>
    </main>
  );
}
