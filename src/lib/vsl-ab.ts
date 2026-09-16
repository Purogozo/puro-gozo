// ============================================================
// PURO GOZO · Roteador /pg-vsl-ab (páginas de vendas com VSL)
//
// Os anúncios apontam pra UMA URL (/pg-vsl-ab). O proxy sorteia uma
// variante, grava o cookie e REDIRECIONA pra /pg-vsl-<variante>, levando a
// query inteira (UTMs, fbclid…). Redirect, não rewrite, de propósito:
//  - cada variante continua sendo página estática (sem headers() no render);
//  - a URL final identifica a variante em qualquer relatório (Pixel,
//    event_source_url da CAPI, Hotmart via UTMs) sem parâmetro extra.
//
// PRA ADICIONAR UMA VARIANTE: criar a rota src/app/pg-vsl-<x>/ e incluir
// "<x>" em VSL_VARIANTS. Só isso — o sorteio é uniforme entre as listadas.
// PRA ENCERRAR O TESTE: deixar só a vencedora na lista (quem tinha cookie de
// uma variante removida é re-sorteado).
// ============================================================

export const VSL_ROUTER_PATH = "/pg-vsl-ab";
export const VSL_COOKIE = "pg_vsl_ab";
export const VSL_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias, como o pg_ab_v2

// ⚠️ Hoje só existe a A (R$ 297). Adicione "b" quando a rota /pg-vsl-b existir.
export const VSL_VARIANTS = ["a"] as const;
export type VslVariant = (typeof VSL_VARIANTS)[number];

export function isVslVariant(v: string | null | undefined): v is VslVariant {
  return !!v && (VSL_VARIANTS as readonly string[]).includes(v);
}

export function vslPath(v: VslVariant): string {
  return `/pg-vsl-${v}`;
}

export function pickVslVariant(): VslVariant {
  return VSL_VARIANTS[Math.floor(Math.random() * VSL_VARIANTS.length)];
}
