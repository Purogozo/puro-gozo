"use client";

import type { ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { Logo } from "@/components/brand/Logo";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

// T1 · landing SEM Framer Motion.
// É a única tela do caminho crítico: precisa vir VISÍVEL já no HTML servido
// (SSR), sem esperar ~800KB de JS hidratar num navegador in-app lento. A
// entrada é uma animação CSS única (.landing-reveal), que roda ao pintar.
//
// `animateIn`: o shell (QuizFlow) pinta com animateIn (fade de entrada). Quando
// o QuizRunner assume e re-renderiza a mesma T1, passa animateIn={false} pra não
// repetir o fade — a tela já está na posição final, troca imperceptível.
export function LandingScreen({
  content,
  headline,
  animateIn = true,
}: {
  content: ScreenContent;
  headline?: string;
  animateIn?: boolean;
}) {
  const next = useQuiz((s) => s.next);

  return (
    <div className="bg-breathe grain relative min-h-dvh w-full overflow-hidden">
      {/* halo de luz baixa / seda */}
      <div
        className="pointer-events-none absolute inset-0 candle-glow"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 18%, rgba(201,125,144,0.22), transparent 60%)",
        }}
      />

      <div
        className={`relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center px-6 py-16 text-center ${
          animateIn ? "landing-reveal" : ""
        }`}
      >
        <Logo tone="marfim" className="text-3xl" />

        <p className="eyebrow mt-8 text-rose">{content.eyebrow}</p>

        <h1
          className="mt-5 font-serif text-[1.85rem] leading-[1.16] tracking-[-0.01em] text-marfim sm:text-[2.4rem]"
          style={{ fontWeight: 700 }}
        >
          {headline ?? content.headline}
        </h1>

        <p
          className="mt-6 max-w-md font-sans text-[0.98rem] leading-relaxed text-nevoa"
          style={{ fontWeight: 300 }}
        >
          {content.subhead}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <PrimaryButton pulse onClick={() => next()}>
            {content.cta} →
          </PrimaryButton>
          {content.microcopy && (
            <p className="font-sans text-[0.78rem] text-nevoa/90">
              {content.microcopy}
            </p>
          )}
          <div className="mt-1 flex items-center gap-1.5 text-nevoa/70">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="font-sans text-[0.72rem]">
              Suas informações são privadas e protegidas
            </span>
          </div>
        </div>

        {/* cue de "começar" descendo (CSS; desliga sob reduced-motion) */}
        <div className="bob absolute bottom-6 text-nevoa/60">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
