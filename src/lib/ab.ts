// ============================================================
// PURO GOZO · A/B testing (variante estável por sessão)
// Distribuição server-side via proxy.ts (cookie pg_ab).
// Override manual em qualquer ambiente: ?v=a  ou  ?v=b
// ============================================================
export type Variant = "a" | "b";

export const AB_COOKIE = "pg_ab";

// Variantes de copy testadas (edite aqui)
export const AB = {
  // T1, headline da landing
  landingHeadline: {
    a: "Descubra o que apagou o seu desejo sexual e receba o método de uma sexóloga pra você voltar a sentir tesão de verdade.",
    b: "Existe um motivo pra você ter perdido a vontade de transar, e não é falta de tesão.",
  },
  // T19, CTA do resultado
  resultCta: {
    a: "QUERO VOLTAR A SENTIR TESÃO",
    b: "QUERO ABRIR A VÁLVULA AGORA",
  },
} as const;

export function normalizeVariant(v: string | undefined | null): Variant {
  return v === "b" ? "b" : "a";
}
