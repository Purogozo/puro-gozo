"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Screen, ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { trackEvent } from "@/lib/tracking";
import { useReducedMotion, DIARY } from "@/lib/motion";
import { Stagger, Item, Eyebrow, Headline, Subhead } from "../Parts";
import { OptionCard } from "@/components/ui/OptionCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export function SelectScreen({
  screen,
  content,
}: {
  screen: Screen;
  content: ScreenContent;
}) {
  const reduced = useReducedMotion();
  const next = useQuiz((s) => s.next);
  const setAnswer = useQuiz((s) => s.setAnswer);
  const stored = useQuiz((s) => s.answers[screen.id]);

  const multi = screen.type === "multi";
  const dark = !!screen.intimate;
  const hasReassurance = !!content.reassurance;

  const [selected, setSelected] = useState<string[]>(
    Array.isArray(stored) ? stored : stored ? [stored as string] : []
  );

  function choose(id: string) {
    if (multi) {
      setSelected((cur) =>
        cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
      );
      return;
    }
    setSelected([id]);
    setAnswer(screen.id, id);
    trackEvent("option_select", { screen: screen.id, option: id });
    if (!hasReassurance) {
      // auto-advance com micro-delay para "sentir" a escolha
      window.setTimeout(() => next(), reduced ? 120 : 420);
    }
  }

  function continueMulti() {
    setAnswer(screen.id, selected);
    trackEvent("option_select", { screen: screen.id, options: selected });
    next();
  }

  return (
    <div
      className={`mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-6 pb-10 pt-20 ${
        dark ? "text-marfim" : ""
      }`}
    >
      <Stagger className="flex flex-col gap-5">
        {content.eyebrow && <Eyebrow dark={dark}>{content.eyebrow}</Eyebrow>}
        <Headline dark={dark} size={content.headline.length > 90 ? "md" : "lg"}>
          {content.headline}
        </Headline>
        {content.subhead && <Subhead dark={dark}>{content.subhead}</Subhead>}

        {/* corpo opcional (ex.: T10 contexto) */}
        {content.body?.map((p, i) => (
          <Item key={i}>
            <p
              className={`font-sans text-[0.95rem] leading-relaxed ${
                dark ? "text-marfim/85" : "text-tinta/85"
              }`}
              style={{ fontWeight: 300 }}
            >
              {p}
            </p>
          </Item>
        ))}

        <div className="mt-1 flex flex-col gap-3">
          {content.options?.map((opt, i) => (
            <Item key={opt.id}>
              <OptionCard
                option={opt}
                index={i}
                multi={multi}
                dark={dark}
                selected={selected.includes(opt.id)}
                onSelect={() => choose(opt.id)}
              />
            </Item>
          ))}
        </div>

        {/* microcopy de privacidade */}
        {content.microcopy && (
          <Item>
            <p
              className={`mt-1 text-center font-sans text-[0.8rem] ${
                dark ? "text-nevoa" : "text-lavanda"
              }`}
            >
              {content.microcopy}
            </p>
          </Item>
        )}

        {/* acolhimento (T10) + continuar manual */}
        <AnimatePresence>
          {hasReassurance && selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: DIARY }}
              className="mt-2 flex flex-col gap-4"
            >
              <p className="rounded-2xl border-l-2 border-rose bg-white/[0.06] px-5 py-4 font-serif text-[1.02rem] italic leading-relaxed text-marfim/90">
                {content.reassurance}
              </p>
              <div className="flex justify-center">
                <PrimaryButton onClick={() => next()}>CONTINUAR →</PrimaryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* botão continuar (múltipla escolha) */}
        {multi && (
          <Item>
            <div className="mt-3 flex justify-center">
              <PrimaryButton
                disabled={selected.length === 0}
                onClick={continueMulti}
              >
                {content.cta ?? "CONTINUAR"} →
              </PrimaryButton>
            </div>
          </Item>
        )}
      </Stagger>
    </div>
  );
}
