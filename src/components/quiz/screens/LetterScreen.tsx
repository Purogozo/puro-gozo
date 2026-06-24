"use client";

import { motion } from "motion/react";
import type { ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { useReducedMotion, DIARY } from "@/lib/motion";
import { Logo } from "@/components/brand/Logo";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

// T4 — carta/confissão da Andreia (tom quente, luz baixa)
export function LetterScreen({ content }: { content: ScreenContent }) {
  const reduced = useReducedMotion();
  const next = useQuiz((s) => s.next);

  return (
    <div className="bg-breathe grain relative min-h-dvh w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 candle-glow"
        style={{ background: "radial-gradient(90% 50% at 50% 0%, rgba(231,154,125,0.18), transparent 55%)" }}
      />
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 pb-12 pt-16">
        <Logo tone="marfim" className="mx-auto text-xl" />

        {/* foto da Andreia — placeholder com ken-burns (trocar por /public/andreia.jpg) */}
        <motion.div
          className="mx-auto mt-8 h-28 w-28 overflow-hidden rounded-full border border-rose/40"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: reduced ? 1 : [1.08, 1, 1.05] }}
          transition={{ duration: reduced ? 0.4 : 9, ease: "easeInOut", repeat: reduced ? 0 : Infinity, repeatType: "reverse" }}
          style={{ background: "radial-gradient(circle at 50% 35%, #c97d90, #6e3350)" }}
        >
          <div className="flex h-full w-full items-center justify-center font-serif text-3xl italic text-marfim/90">AF</div>
        </motion.div>

        <motion.p className="eyebrow mt-6 text-center text-rose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {content.eyebrow}
        </motion.p>
        <motion.h1
          className="mt-2 text-center font-serif text-[1.6rem] leading-tight text-marfim"
          style={{ fontWeight: 700 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: DIARY }}
        >
          {content.headline}
        </motion.h1>

        <div className="mt-7 flex flex-col gap-4">
          {content.body?.map((p, i) => (
            <motion.p
              key={i}
              className={`leading-relaxed ${
                p.startsWith("Eu chamo")
                  ? "font-serif text-[1.1rem] italic text-rose-suave"
                  : "font-sans text-[0.98rem] text-marfim/85"
              }`}
              style={{ fontWeight: 300 }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: DIARY }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <PrimaryButton onClick={() => next()}>{content.cta} →</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
