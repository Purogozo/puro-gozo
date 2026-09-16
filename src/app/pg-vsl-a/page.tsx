import type { Metadata } from "next";
import { METODO } from "@/lib/metodo-copy";
import { PageTracker } from "@/components/sales/PageTracker";
import { StickyBar } from "@/components/sales/StickyBar";
import { VslDelay } from "@/components/metodo/VslDelay";
import { VSL_REVEAL_CLASS, VSL_REVEAL_KEY } from "@/lib/vsl-delay";
import { VslTopo } from "@/components/metodo/VslTopo";
import { Callout } from "@/components/metodo/Callout";
import { Dor } from "@/components/metodo/Dor";
import { Culpa } from "@/components/metodo/Culpa";
import { Tentou } from "@/components/metodo/Tentou";
import { Virada } from "@/components/metodo/Virada";
import { QuemSou } from "@/components/metodo/QuemSou";
import { Mecanismo } from "@/components/metodo/Mecanismo";
import { MetodoIntro } from "@/components/metodo/MetodoIntro";
import { MesmoQue } from "@/components/metodo/MesmoQue";
import { Prova } from "@/components/metodo/Prova";
import { Diferente } from "@/components/metodo/Diferente";
import { Dentro } from "@/components/metodo/Dentro";
import { Passos } from "@/components/metodo/Passos";
import { PraVoce } from "@/components/metodo/PraVoce";
import { Bonus } from "@/components/metodo/Bonus";
import { Oferta } from "@/components/metodo/Oferta";
import { Bio } from "@/components/metodo/Bio";
import { Garantia } from "@/components/metodo/Garantia";
import { Faq } from "@/components/metodo/Faq";
import { DoisCaminhos } from "@/components/metodo/DoisCaminhos";
import { Rodape } from "@/components/metodo/Rodape";

// ============================================================
// ROTA /pg-vsl-a · PÁGINA DE VENDAS long-form COM VSL E IMAGENS — R$ 297
//
// Era /metodo até 16/09/2026 (nunca foi ao ar com esse nome). Virou a
// VARIANTE A do roteador /pg-vsl-ab (ver src/lib/vsl-ab.ts e proxy.ts):
// os anúncios apontam pra /pg-vsl-ab, que sorteia e redireciona pra
// /pg-vsl-<variante>, com cookie pra pessoa cair sempre na mesma. Os nomes
// internos (pasta components/metodo, metodo-copy.ts, funil "metodo" no
// tracking) NÃO mudaram — só a rota pública.
// (12x de R$ 30,72 · âncora R$ 697 · garantia 7 dias + 30 dias; era R$ 197
// até 16/09/2026)
//
// Criada em 15/09/2026 a partir do brief de 21 blocos do cliente. É uma
// SEGUNDA página de vendas do mesmo produto: a / segue a R$ 47 com a copy
// dela (sales-copy.ts); esta tem copy própria (metodo-copy.ts), tracking
// próprio (metodo-tracking.ts, funil "metodo") e checkout próprio
// (METODO_CHECKOUT_URL, off=rp7h9z5a — ver config.ts).
//
// Reaproveita da página /: Section (ritmo de fundos), Cta e StickyBar
// (com funnel="metodo"), PageTracker, Logo e as fotos reais da Andreia.
// As demais imagens foram geradas por IA (KIE · nano-banana) e vivem em
// public/metodo/ — ver components/metodo/Foto.tsx.
//
// RITMO DE FUNDO (nunca 3 seguidas iguais) e DESTINO DOS BOTÕES (regra do
// cliente: acima da oferta = âncora #oferta; da oferta pra baixo = checkout):
//
//                           fundo     botão
//   00 VSL (+logo+preço) .. BRANCO    → CHECKOUT  (nova em 16/09/2026; exceção
//                                                    pedida pelo cliente à regra abaixo)
//   01 Callout ............ marfim    —
//   02 Cenas da dor ....... ESCURO    —
//   03 Culpa .............. areia     —
//   04 Tudo que tentou .... marfim    —
//   05 Virada ............. VINHO     → #oferta   (1º CTA da página)
//   06 Quem sou (curta) ... marfim    —
//   07 Mecanismo .......... areia     —
//   08 Método ............. marfim    → #oferta
//   09 Mesmo que .......... ESCURO    —
//   10 Prova .............. areia     —
//   11 Por que é diferente  marfim    —
//   12 Dentro ............. ESCURO    —
//   13 3 passos ........... marfim    → #oferta
//   14 É pra você se ...... ESCURO    —
//   15 Bônus .............. marfim    —
//   16 Oferta (#oferta) ... areia     → CHECKOUT  ← daqui pra baixo é checkout
//   17 Bio ................ marfim    → CHECKOUT
//   18 Garantia ........... ESCURO    —
//   19 FAQ ................ marfim    → CHECKOUT
//   20 Dois caminhos ...... VINHO     → CHECKOUT
//   21 Rodapé ............. tinta     —
//
// Tudo Server Component / SSR, como a /: o texto e as imagens chegam no
// HTML sem depender de hidratação. Client: Cta, StickyBar, PageTracker,
// VslDelay.
//
// DELAY DA VSL (16/09/2026): tudo abaixo do vídeo — preço/botão da seção 0,
// seções 1–21, rodapé e sticky bar — fica escondido (`data-vsl-delay`) até o
// vídeo passar de 14:20. Ver components/metodo/VslDelay.tsx. Pra revisar a
// página inteira sem esperar: `?revelar=1`.
//
// ⚠️ Mesmo alerta da /: esta página é SSR de copy crua no domínio limpo
// (reconectasexualidade.com.br). robots noindex é herdado do layout, e a
// metadata abaixo é clínica de propósito. Decidir antes de apontar campanha.
// ============================================================

const TITULO =
  "Método de reconexão com o desejo — Andreia Fiamoncini, psicóloga";
const DESCRICAO =
  "Programa em 3 passos desenvolvido por uma psicóloga e sexóloga para mulheres que perderam o interesse na vida íntima. Acesso imediato, 7 dias de garantia incondicional.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    type: "website",
    locale: "pt_BR",
    url: "https://www.reconectasexualidade.com.br/pg-vsl-a",
  },
};

export default function PgVslAPage() {
  const { sticky } = METODO;

  return (
    <>
      <PageTracker funnel="metodo" />
      <VslDelay delaySeconds={METODO.vsl.delaySeconds} />
      {/* Visita repetida: aplica a classe ANTES da primeira pintura, senão a
          página nasceria só com o vídeo e "pularia" ao hidratar. Inline de
          propósito (não passa pelo next/script): precisa rodar no parse. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem(${JSON.stringify(VSL_REVEAL_KEY)})==="1")document.documentElement.classList.add(${JSON.stringify(VSL_REVEAL_CLASS)})}catch(e){}`,
        }}
      />

      <main>
        <VslTopo />
        {/* ── daqui pra baixo: escondido até 14:20 de vídeo ── */}
        <div data-vsl-delay>
          <Callout />
          <Dor />
          <Culpa />
          <Tentou />
          <Virada />
          <QuemSou />
          <Mecanismo />
          <MetodoIntro />
          <MesmoQue />
          <Prova />
          <Diferente />
          <Dentro />
          <Passos />
          <PraVoce />
          <Bonus />
          <Oferta />
          <Bio />
          <Garantia />
          <Faq />
          <DoisCaminhos />
        </div>
      </main>

      <div data-vsl-delay>
        <Rodape />
        <StickyBar
          funnel="metodo"
          label={sticky.label}
          de={sticky.de}
          preco={sticky.preco}
          garantia={sticky.garantia}
          cta={sticky.cta}
        />
      </div>
    </>
  );
}
