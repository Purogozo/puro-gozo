// ============================================================
// PURO GOZO · Dicionário do quiz para o dashboard
// ============================================================
// O dashboard lê números crus do banco: "screen 13", "variant b". Sozinhos eles
// não dizem nada — e a pessoa que lê o funil é quem decide onde mexer. Aqui os
// números viram nome de tela e nome de teste.
//
// A regra é derivar da FONTE sempre que possível (SCREENS, AB): assim mudar a
// copy do quiz atualiza o dashboard junto, sem alguém lembrar de vir aqui.

import { SCREENS } from "@/lib/screens";
import { AB, VARIANTS, type Variant } from "@/lib/ab";
import type { ScreenType } from "@/lib/types";

// Telas cuja headline não descreve o que a tela É (uma carta, um resultado…).
// As de pergunta (single/multi) usam a própria pergunta como rótulo.
const POR_TIPO: Partial<Record<ScreenType, string>> = {
  landing: "Entrada + idade",
  letter: "Carta da Andreia",
  social: "Prova social",
  mechanism: "Mecanismo (pico)",
  loading: "Processando",
  result: "Resultado (pico)",
  sales: "Página de vendas",
};

// Telas que JÁ EXISTIRAM e saíram do fluxo. Sem isto, um período que atravessa
// a mudança mostra uma tela órfã no funil e parece dado corrompido.
const REMOVIDAS: Record<number, string> = {
  2: "Idade — fundida na T1 em 02/08/2026",
};

function corta(s: string, max = 38): string {
  const limpo = s.replace(/\s+/g, " ").trim();
  return limpo.length <= max ? limpo : `${limpo.slice(0, max - 1)}…`;
}

export type RotuloTela = { texto: string; removida: boolean };

export function rotuloDaTela(id: number): RotuloTela {
  const tela = SCREENS.find((s) => s.id === id);
  if (!tela) {
    return {
      texto: REMOVIDAS[id] ?? "tela que não existe mais",
      removida: true,
    };
  }
  const porTipo = POR_TIPO[tela.type];
  if (porTipo) return { texto: porTipo, removida: false };

  // ⚠️ Nada de `??` aqui: nas telas que bifurcam (ex.: T7) o `universal.headline`
  // existe como string VAZIA, e a pergunta de verdade mora em A/B. Com `??` o
  // vazio venceria e o funil mostrava "single" como nome da tela.
  const headline = [
    tela.universal?.headline,
    tela.A?.headline,
    tela.B?.headline,
  ].find((h) => h && h.trim());

  return { texto: headline ? corta(headline) : `tela ${tela.type}`, removida: false };
}

// ── Teste A/B/C da headline da T1 ────────────────────────────
// Desde 02/08/2026 a variante controla SÓ a headline da T1 (o CTA da T19 virou
// fixo). Antes dessa data as letras a/b significavam outras headlines E outro
// CTA — por isso o dashboard avisa quando o período atravessa a virada, senão
// alguém compara duas coisas diferentes achando que é a mesma.
export const TESTE_HEADLINE_DESDE = "2026-08-02";

export const APELIDO_VARIANTE: Record<Variant, string> = {
  a: "Resultado direto",
  b: "Resultado coberto",
  c: "Identidade",
};

export function ehVarianteAtual(v: string): v is Variant {
  return (VARIANTS as readonly string[]).includes(v);
}

/** Headline em teste naquela variante (null se a variante não existe mais). */
export function headlineDaVariante(v: string): string | null {
  return ehVarianteAtual(v) ? AB.landingHeadline[v] : null;
}

export function apelidoDaVariante(v: string): string {
  return ehVarianteAtual(v) ? APELIDO_VARIANTE[v] : "—";
}
