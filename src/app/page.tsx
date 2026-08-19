import type { Metadata } from "next";
import { PageTracker } from "@/components/sales/PageTracker";
import { StickyBar } from "@/components/sales/StickyBar";
import { Header } from "@/components/sales/sections/Header";
import { Hero } from "@/components/sales/sections/Hero";
import { DuasMulheres } from "@/components/sales/sections/DuasMulheres";
import { TresCoisas } from "@/components/sales/sections/TresCoisas";
import { PontoDeFuga } from "@/components/sales/sections/PontoDeFuga";
import { Posse } from "@/components/sales/sections/Posse";
import { Metodo } from "@/components/sales/sections/Metodo";
import { QuemCriou } from "@/components/sales/sections/QuemCriou";
import { Prova } from "@/components/sales/sections/Prova";
import { Oferta } from "@/components/sales/sections/Oferta";
import { Garantia } from "@/components/sales/sections/Garantia";
import { DoisCaminhos } from "@/components/sales/sections/DoisCaminhos";
import { PostScriptum } from "@/components/sales/sections/PostScriptum";
import { Rodape } from "@/components/sales/sections/Rodape";

// ============================================================
// ROTA / · PÁGINA DE VENDAS (long-form, texto puro, sem VSL) — R$ 47
//
// Assumiu a raiz em 14/08/2026; o funil de quiz mudou pra /quiz.
//
// RITMO DE FUNDO — a regra do handoff é "nunca 3 seções seguidas com o mesmo
// fundo". O mapa abaixo é a fonte de verdade; se inserir seção nova, confira
// aqui antes de escolher o tom.
//
// DESTINO DOS BOTÕES — a segunda coluna. Regra do cliente (17/08/2026): os
// CTAs acima da oferta são âncora pra #oferta; da oferta pra baixo vão direto
// pro checkout. A prop `to` do <Cta> é obrigatória justamente pra que seção
// nova não herde o destino errado.
//
//                        fundo     botão
//   01 Header ......... marfim     —
//   02 Hero ........... marfim     → #oferta   (header + hero são um bloco só)
//   03 Duas mulheres .. areia      → #oferta
//   04 Três coisas .... ESCURO     —           (gravidade)
//   05 Ponto de fuga .. marfim     —           (leitura longa respira no claro)
//   06 Posse .......... VINHO      → #oferta   (seção-soco)
//   07 Método ......... marfim     → #oferta
//   08 Quem criou ..... areia      → #oferta
//   09 Prova .......... ESCURO     → #oferta
//   10 Oferta ......... marfim     → CHECKOUT  ← daqui pra baixo é checkout
//   11 Garantia ....... areia      —
//   12 Dois caminhos .. ESCURO     → CHECKOUT
//   13 P.S. ........... marfim     → CHECKOUT
//   14 Rodapé ......... tinta      —
//
// A sticky bar é a exceção: ela acompanha a rolagem, então decide o destino em
// tempo real pela mesma regra (ver StickyBar.tsx).
//
// Tudo é Server Component: a página inteira é SSR e o texto chega pintado,
// sem depender de JS. Só três coisas são client — o botão (Cta), a sticky bar
// e o PageTracker. Foi o que custou ~78% de abandono na T1 do quiz quando o
// conteúdo dependia de hidratação; aqui não se repete.
//
// ⚠️ Toda a copy vive em src/lib/sales-copy.ts. Nenhuma seção inventa texto.
// ============================================================

// A metadata do layout descreve o QUIZ ("autoavaliação, resultado em 2
// minutos") — herdar isso aqui seria descrever errado o que a pessoa vai ler.
// Mesmo registro clínico deliberado do resto do app: estas tags são o primeiro
// texto que o rastreador da Meta lê. Não "melhorar" com copy de venda.
// O que não está aqui (verification, robots, metadataBase) é herdado do layout.
const TITULO = "Método de reconexão com o desejo — Andreia Fiamoncini, psicóloga";
const DESCRICAO =
  "Programa desenvolvido por uma psicóloga e sexóloga para mulheres que perderam o interesse na vida íntima. Acesso imediato e garantia de 30 dias.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    type: "website",
    locale: "pt_BR",
    url: "https://www.reconectasexualidade.com.br",
  },
};

export default function Page() {
  return (
    <>
      <PageTracker />

      <main>
        <Header />
        <Hero />
        <DuasMulheres />
        <TresCoisas />
        <PontoDeFuga />
        <Posse />
        <Metodo />
        <QuemCriou />
        <Prova />
        <Oferta />
        <Garantia />
        <DoisCaminhos />
        <PostScriptum />
      </main>

      <Rodape />
      <StickyBar />
    </>
  );
}
