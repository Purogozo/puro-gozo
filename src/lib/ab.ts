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
  // ⚠️ Registro suavizado (19/07/2026): a T1 é a única tela que um revisor da
  // Meta vê ao abrir o site durante a análise da categoria "Conteúdo
  // inadequado". Da T2 em diante a copy crua continua inteira — é lá que ela
  // trabalha, depois da pessoa já ter se comprometido com o quiz.
  // NÃO afeta o rastreador (o <body> servido é vazio); serve pra revisão humana.
  landingHeadline: {
    a: "Descubra o que apagou o seu desejo e receba o método de uma sexóloga pra você voltar a sentir vontade de novo.",
    b: "Existe um motivo pra você ter perdido a vontade, e não é o que te disseram.",
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
