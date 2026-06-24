"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import type { ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { useReducedMotion, DIARY } from "@/lib/motion";
import { Logo } from "@/components/brand/Logo";

// T18, loading: água subindo + linhas de cálculo (typewriter)
export function LoadingScreen({ content }: { content: ScreenContent }) {
  const reduced = useReducedMotion();
  const next = useQuiz((s) => s.next);
  const lines = content.options ?? [];

  useEffect(() => {
    const t = window.setTimeout(() => next(), reduced ? 900 : 4200);
    return () => window.clearTimeout(t);
  }, [next, reduced]);

  return (
    <div className="bg-breathe grain relative min-h-dvh w-full overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-6 text-center">
        <Logo tone="marfim" className="text-xl" />

        {/* coluna de água subindo */}
        <div className="relative mx-auto mt-10 h-40 w-16 overflow-hidden rounded-full border border-nevoa/30">
          <motion.div
            className="absolute inset-x-0 bottom-0"
            style={{ background: "linear-gradient(to top, #6e3350, #c97d90)" }}
            initial={{ height: "10%" }}
            animate={{ height: "92%" }}
            transition={{ duration: reduced ? 0.8 : 4, ease: DIARY }}
          />
        </div>

        <motion.h1
          className="mt-8 font-serif text-[1.5rem] leading-tight text-marfim"
          style={{ fontWeight: 700 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {content.headline}
        </motion.h1>
        {content.body?.[0] && (
          <p className="mt-3 font-sans text-[0.9rem] leading-relaxed text-nevoa" style={{ fontWeight: 300 }}>
            {content.body[0]}
          </p>
        )}

        <div className="mt-7 flex flex-col gap-2.5">
          {lines.map((l, i) => (
            <motion.p
              key={l.id}
              className="font-sans text-[0.86rem] text-rose-suave"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reduced ? 0 : 0.6 + i * 0.9, duration: 0.5, ease: DIARY }}
            >
              <span className="mr-1 text-rose">›</span>
              {l.label}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
