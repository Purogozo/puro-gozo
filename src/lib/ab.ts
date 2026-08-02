// ============================================================
// PURO GOZO · A/B testing (variante estável por sessão)
// Distribuição server-side via proxy.ts (cookie pg_ab_v2).
// Override manual em qualquer ambiente: ?v=a  ·  ?v=b  ·  ?v=c
// ============================================================
export type Variant = "a" | "b" | "c";

export const VARIANTS = ["a", "b", "c"] as const;

// ⚠️ Cookie NOVO (era "pg_ab"). O teste anterior era de 2 braços: quem já tinha
// cookie ficaria preso em a/b e nunca cairia na variante C — o que envenenaria a
// distribuição. Trocar o nome do cookie zera a atribuição de todo mundo.
export const AB_COOKIE = "pg_ab_v2";

// Variantes de copy testadas (edite aqui)
export const AB = {
  // T1 · headline da landing — a ÚNICA coisa que muda entre as 3 variantes.
  // Todo o resto da T1 (eyebrow, subhead, foto, pergunta da idade) é idêntico,
  // pra o teste medir só o efeito da promessa.
  landingHeadline: {
    // A · resultado direto (promessa mais crua, maior upside e maior risco)
    a: "Eu vou te mostrar como voltar a sentir tesão de verdade, mesmo que faça anos que ele sumiu.",
    // B · resultado coberto (mais segura: promete a virada sem nomear a ferida)
    b: "Em menos de 2 minutos, eu vou te provar que o seu prazer ainda está aí dentro.",
    // C · identidade / possibilidade (a mais leve na porta)
    c: "Eu vou te mostrar como reencontrar a mulher que sentia prazer sem pensar duas vezes.",
  },
} as const;

// T19 · CTA do resultado.
// Era uma variante A/B amarrada à MESMA chave da headline — com 3 braços e 2
// rótulos o teste do CTA ficaria quebrado, e ele confundia a leitura do teste da
// headline (duas mudanças por braço). Agora é fixo: o único fator em teste é a
// promessa da T1. Pra voltar a testar o CTA, faça num eixo próprio.
export const RESULT_CTA = "QUERO VOLTAR A SENTIR TESÃO";

export function normalizeVariant(v: string | undefined | null): Variant {
  return v === "b" || v === "c" ? v : "a";
}
