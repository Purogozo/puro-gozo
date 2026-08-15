import { Suspense } from "react";
import type { Viewport } from "next";
import { headers, cookies } from "next/headers";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { normalizeVariant, AB_COOKIE } from "@/lib/ab";

// ============================================================
// ROTA /quiz · funil de quiz de 20 telas
//
// Estava na raiz até 14/08/2026, quando a página de vendas assumiu o /.
// ⚠️ Os anúncios que apontavam pra raiz precisam apontar pra /quiz — senão
// o tráfego do quiz cai na página de vendas sem passar pelo funil.
//
// Preview de tela: /quiz?screen=N · reset: /quiz?reset=1 · A/B: /quiz?v=a|b|c
// O sorteio A/B/C é feito no proxy.ts, cujo matcher acompanhou a mudança.
// ============================================================

// A T1 é uma dobra medida ao pixel (a 2ª linha de opções encosta no limite em
// 375×667). O maximumScale existia aqui desde sempre; ficou preso à rota do
// quiz em vez de valer pro app inteiro — a página de vendas é leitura longa e
// não pode proibir zoom.
export const viewport: Viewport = {
  themeColor: "#363975",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function QuizPage() {
  // variante A/B: header injetado pelo proxy (request atual) → cookie → 'a'
  const h = await headers();
  const c = await cookies();
  const variant = normalizeVariant(
    h.get("x-pg-ab") ?? c.get(AB_COOKIE)?.value
  );

  return (
    <Suspense fallback={<div className="min-h-dvh w-full bg-indigo" />}>
      <QuizFlow variant={variant} />
    </Suspense>
  );
}
