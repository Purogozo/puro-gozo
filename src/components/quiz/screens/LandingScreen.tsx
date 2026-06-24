"use client";

import { motion } from "motion/react";
import type { ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { useReducedMotion, DIARY } from "@/lib/motion";
import { Logo } from "@/components/brand/Logo";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export function LandingScreen({
  content,
  headline,
}: {
  content: ScreenContent;
  headline?: string;
}) {
  const reduced = useReducedMotion();
  const next = useQuiz((s) => s.next);
  const words = (headline ?? content.headline).split(" ");
  // fator de tempo: 0 sob reduced-motion (revelação imediata)
  const T = reduced ? 0 : 1;
  const wordStep = reduced ? 0 : 0.07;
  const afterWords = 0.5 * T + words.length * wordStep;

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

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: DIARY }}
        >
          <Logo tone="marfim" className="text-3xl" />
        </motion.div>

        <motion.p
          className="eyebrow mt-8 text-rose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {content.eyebrow}
        </motion.p>

        {/* Headline revela palavra a palavra */}
        <h1
          className="mt-5 font-serif text-[1.85rem] leading-[1.16] tracking-[-0.01em] text-marfim sm:text-[2.4rem]"
          style={{ fontWeight: 700 }}
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.5 * T + i * wordStep,
                duration: reduced ? 0.15 : 0.5,
                ease: DIARY,
              }}
            >
              {w}&nbsp;
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-md font-sans text-[0.98rem] leading-relaxed text-nevoa"
          style={{ fontWeight: 300 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: afterWords + 0.1 * T, duration: reduced ? 0.15 : 0.6, ease: DIARY }}
        >
          {content.subhead}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: afterWords + 0.35 * T, duration: reduced ? 0.15 : 0.6, ease: DIARY }}
        >
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
        </motion.div>

        {/* cue de "começar" descendo */}
        {!reduced && (
          <div className="bob absolute bottom-6 text-nevoa/60">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
