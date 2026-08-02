"use client";

import { useState } from "react";
import type { Option, ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { AB, type Variant } from "@/lib/ab";
import { haptic } from "@/lib/haptic";
import { trackEvent } from "@/lib/tracking";
import { Logo } from "@/components/brand/Logo";
import { AndreiaPhoto } from "@/components/brand/AndreiaPhoto";

// T1 · landing SEM Framer Motion.
// É a única tela do caminho crítico: precisa vir VISÍVEL já no HTML servido
// (SSR), sem esperar ~800KB de JS hidratar num navegador in-app lento. A
// entrada é uma animação CSS única (.landing-reveal), que roda ao pintar.
// Por isso NADA aqui pode importar "motion/react" (nem via @/lib/motion).
//
// A tela faz a primeira pergunta (idade) em vez de ter um botão que só avança:
// sem passo morto, quem toca numa opção já entrou na avaliação. A resposta é
// gravada em answers[1] e o `next()` cai direto na T3 (a antiga T2 deixou de
// existir como tela própria).
//
// `animateIn`: o shell (QuizFlow) pinta com animateIn (fade de entrada). Quando
// o QuizRunner assume e re-renderiza a mesma T1, passa animateIn={false} pra não
// repetir o fade — a tela já está na posição final, troca imperceptível.

const LANDING_SCREEN_ID = 1;

// Sem hook (o useReducedMotion vive em @/lib/motion, que importa Framer).
// Lido no clique, já no cliente — nunca durante o render, então não há
// divergência de hidratação.
function prefersReduced(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function LandingScreen({
  content,
  variant = "a",
  animateIn = true,
  restore = false,
}: {
  content: ScreenContent;
  variant?: Variant;
  animateIn?: boolean;
  /** Só o QuizRunner passa true — ver comentário do `stored` abaixo. */
  restore?: boolean;
}) {
  const next = useQuiz((s) => s.next);
  const setAnswer = useQuiz((s) => s.setAnswer);
  // A T1 é montada duas vezes: primeiro pelo shell (QuizFlow), depois pelo
  // QuizRunner quando o chunk dele termina de baixar. Se a troca cair no meio do
  // eco, um estado só local nasceria zerado e o eco sumiria da tela. Ler a
  // escolha do store faz ela atravessar a remontagem.
  //
  // Só a instância do QuizRunner (restore) lê o store: ela nunca é renderizada
  // no servidor, então não há como divergir do HTML servido. A do shell, que é
  // a SSR'd, ignora o store e usa apenas o clique local.
  const stored = useQuiz((s) => s.answers[LANDING_SCREEN_ID]) as
    | string
    | undefined;
  const onLanding = useQuiz((s) => s.index === 0);

  // `clicked` é por instância: é o que arma o timer e trava o toque duplo.
  // Quem monta DEPOIS do clique (ou depois de um F5) mostra a escolha pelo
  // store, mas segue clicável — assim ninguém fica preso numa tela morta.
  const [clicked, setClicked] = useState<string | null>(null);

  const headline = AB.landingHeadline[variant] ?? content.headline;
  const options = content.options ?? [];
  const selected =
    clicked ?? (restore && onLanding ? (stored ?? null) : null);
  const echo = selected
    ? (options.find((o) => o.id === selected)?.echo ?? null)
    : null;

  function choose(opt: Option) {
    if (clicked) return; // trava toque duplo enquanto o eco está na tela
    haptic(14);
    setClicked(opt.id);
    setAnswer(LANDING_SCREEN_ID, opt.id);
    trackEvent("option_select", {
      screen: LANDING_SCREEN_ID,
      option: opt.id,
      variant,
    });

    // Só avança se ainda estivermos na T1. Com duas instâncias na jogada, dois
    // timers poderiam empilhar dois next() e pular a T3 inteira.
    const advance = () => {
      if (useQuiz.getState().index === 0) next();
    };

    const reduced = prefersReduced();
    if (opt.echo) {
      // micro-recompensa de auto-relevância antes de avançar. Mais curta que a
      // das telas de dentro (1,5s vs 2,1s): aqui é o primeiro toque da pessoa,
      // e o que mais importa nesse ponto é a sensação de andar.
      window.setTimeout(advance, reduced ? 500 : 1500);
    } else {
      window.setTimeout(advance, reduced ? 120 : 380);
    }
  }

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
        className={`relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center px-6 py-10 text-center ${
          animateIn ? "landing-reveal" : ""
        }`}
      >
        <Logo tone="marfim" className="text-2xl" />

        {/* rosto da sexóloga = ponte com os primeiros 10s do anúncio */}
        <AndreiaPhoto className="mt-5 h-[84px] w-[84px] shrink-0 sm:h-24 sm:w-24" />

        <p className="eyebrow mt-4 text-rose">{content.eyebrow}</p>

        {/* headline: o ÚNICO elemento que muda entre as variantes A/B/C */}
        <h1
          className="mt-3 font-serif text-[1.6rem] leading-[1.18] tracking-[-0.01em] text-marfim sm:text-[2.05rem]"
          style={{ fontWeight: 700 }}
        >
          {headline}
        </h1>

        <p
          className="mt-4 max-w-md font-sans text-[0.94rem] leading-relaxed text-nevoa"
          style={{ fontWeight: 300 }}
        >
          {content.subhead}
        </p>

        {/* primeira pergunta = o CTA. Sem botão que não pergunta nada. */}
        <div className="mt-7 w-full max-w-md">
          {content.prompt && (
            <p
              id="t1-prompt"
              className="font-serif text-[1.05rem] italic leading-snug text-marfim/95"
            >
              {content.prompt}
            </p>
          )}

          <div
            role="group"
            aria-labelledby={content.prompt ? "t1-prompt" : undefined}
            className="mt-4 grid grid-cols-2 gap-2.5"
          >
            {options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => choose(opt)}
                  aria-pressed={isSelected}
                  className={`min-h-[54px] rounded-2xl border px-3 py-3 font-sans text-[0.95rem] leading-snug transition-colors duration-300 active:scale-[0.98] ${
                    isSelected
                      ? "border-rose bg-rose/20 text-marfim"
                      : "border-nevoa/30 bg-white/[0.05] text-marfim hover:border-rose/70"
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* eco de auto-relevância depois da escolha */}
        {echo && (
          <p className="echo-in mt-4 flex max-w-md items-start gap-2 rounded-2xl bg-white/[0.06] px-4 py-3 text-left font-serif text-[0.95rem] italic leading-snug text-rose-suave">
            <span className="not-italic text-rose" aria-hidden>
              ✓
            </span>
            {echo}
          </p>
        )}
      </div>
    </div>
  );
}
