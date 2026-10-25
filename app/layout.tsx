import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hellix .co — Bem-estar consciente",
  description: "Informação clara sobre bem-estar, procedência e uso responsável, respeitando as regras aplicáveis em cada localidade.",
  applicationName: "Hellix .co",
  metadataBase: new URL("https://hellix-store.vercel.app"),
  openGraph: {
    title: "Hellix .co — Bem-estar consciente",
    description: "Tecnologia, informação e responsabilidade.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
