"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ScreenContent } from "@/lib/types";
import { useQuiz } from "@/lib/store";
import { useReducedMotion, DIARY, haptic } from "@/lib/motion";
import { PROFILES, JOURNEY } from "@/lib/screens";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

// ── Represa cheia sob pressão, com rachaduras ──────────────
function DamScene({ bursting }: { bursting: boolean }) {
  const reduced = useReducedMotion();
  const cracks = [
    "M 150 0 L 140 60 L 165 110 L 150 180 L 170 240",
    "M 60 30 L 80 90 L 55 150 L 75 210",
    "M 240 40 L 225 100 L 250 160 L 230 220",
  ];

  return (
    <div className="relative mx-auto h-64 w-full max-w-sm overflow-hidden rounded-3xl border border-nevoa/30 shadow-[0_20px_60px_-24px_rgba(110,51,80,0.7)]">
      {/* água represada */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{
          background: "linear-gradient(to top, #6e3350, #a85a76 55%, #c97d90)",
        }}
        initial={{ height: "20%" }}
        animate={
          bursting
            ? { height: "4%", transition: { duration: 0.7, ease: "easeIn" } }
            : { height: "94%", transition: { duration: 1.6, ease: DIARY } }
        }
      >
        {/* superfície ondulando sob pressão */}
        <div className="absolute -top-2 left-0 right-0 h-3 overflow-hidden">
          <svg className={reduced ? "" : "wave-anim"} width="200%" height="14" viewBox="0 0 120 14" preserveAspectRatio="none">
            <path d="M0 7 Q 15 1 30 7 T 60 7 T 90 7 T 120 7 V14 H0 Z" fill="#d68fa0" />
          </svg>
        </div>
        {/* pressão: brilho subindo */}
        {!reduced && !bursting && (
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(60% 40% at 50% 100%, rgba(255,217,168,0.25), transparent)" }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {/* rachaduras na parede */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 250" preserveAspectRatio="none" fill="none">
        {cracks.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#fbf4f6"
            strokeWidth={bursting ? 4 : 1.4}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: bursting ? 0.95 : 0.55,
              transition: { delay: reduced ? 0 : 1.4 + i * 0.25, duration: 1, ease: DIARY },
            }}
          />
        ))}
      </svg>

      {/* jato de água ao romper */}
      <AnimatePresence>
        {bursting && (
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent, #c97d90)" }}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>

      {/* selo-carimbo: DESEJO REPRESADO: ALTO (categórico, sem %) */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10"
        style={{ translateX: "-50%", translateY: "-50%" }}
        initial={{ opacity: 0, scale: 2.2, rotate: -14, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, rotate: -3, filter: "blur(0px)" }}
        transition={{ delay: reduced ? 0 : 0.9, duration: 0.6, ease: [0.2, 1.4, 0.5, 1] }}
        onAnimationComplete={() => !reduced && haptic([10, 40, 12])}
      >
        <div className="flex flex-col items-center rounded-xl border-2 border-marfim/90 bg-vinho/30 px-6 py-3 backdrop-blur-[2px]">
          <span className="eyebrow text-marfim/90" style={{ fontSize: "0.6rem" }}>
            Desejo Represado
          </span>
          <span className="font-serif text-3xl text-marfim" style={{ fontWeight: 700 }}>
            ALTO
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// ── Gráfico da jornada — linha se desenha (azul frio → dourado quente) ──
function JourneyTimeline() {
  const reduced = useReducedMotion();
  return (
    <div className="relative pl-8">
      {/* linha vertical com gradiente de calor */}
      <svg className="absolute left-[10px] top-1 h-full w-2" viewBox="0 0 4 100" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="heat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#363975" />
            <stop offset="55%" stopColor="#c97d90" />
            <stop offset="100%" stopColor="#e7a44f" />
          </linearGradient>
        </defs>
        <motion.line
          x1="2" y1="0" x2="2" y2="100"
          stroke="url(#heat)" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0.2 : 1.8, ease: DIARY }}
        />
      </svg>

      <div className="flex flex-col gap-5">
        {JOURNEY.map((step, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduced ? 0 : 0.3 + i * 0.32, duration: 0.5, ease: DIARY }}
          >
            <span
              className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-marfim"
              style={{ background: i === 0 ? "#363975" : i === JOURNEY.length - 1 ? "#e7a44f" : "#c97d90" }}
            />
            <p className="eyebrow text-rose" style={{ fontSize: "0.6rem" }}>{step.marco}</p>
            <p className="font-serif text-[1.02rem] text-marfim" style={{ fontWeight: 600 }}>{step.camada}</p>
            <p className="font-sans text-[0.86rem] leading-snug text-nevoa" style={{ fontWeight: 300 }}>{step.o_que}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ResultScreen({
  content,
  ctaLabel,
  onAdvance,
}: {
  content: ScreenContent;
  ctaLabel?: string;
  onAdvance?: () => void;
}) {
  const reduced = useReducedMotion();
  const next = useQuiz((s) => s.next);
  const profileKey = useQuiz((s) => s.profile());
  const profile = PROFILES[profileKey];
  const [bursting, setBursting] = useState(false);
  const advance = onAdvance ?? next;

  function abrirValvula() {
    setBursting(true);
    haptic([20, 30, 60]);
    window.setTimeout(() => advance(), reduced ? 200 : 1100);
  }

  return (
    <div className="bg-breathe grain relative min-h-dvh w-full overflow-hidden">
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col gap-7 px-6 pb-14 pt-20">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: DIARY }}>
          <p className="eyebrow text-rose">{content.eyebrow}</p>
          <h1 className="mt-2 font-serif text-[2rem] leading-tight text-marfim" style={{ fontWeight: 700 }}>
            {content.headline}
          </h1>
        </motion.div>

        <DamScene bursting={bursting} />

        {/* perfil desbloqueado */}
        <motion.div
          className="rounded-2xl border border-rose/30 bg-white/[0.05] px-5 py-4 text-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduced ? 0 : 1.5, duration: 0.6, ease: DIARY }}
        >
          <p className="eyebrow text-nevoa" style={{ fontSize: "0.6rem" }}>Seu perfil de camada</p>
          <p className="mt-1 font-serif text-[1.6rem] italic text-rose" style={{ fontWeight: 700 }}>
            {profile.name}
          </p>
          <p className="mt-1 font-sans text-[0.88rem] text-nevoa" style={{ fontWeight: 300 }}>
            {profile.diagnosis}
          </p>
        </motion.div>

        {/* diagnóstico */}
        <div className="flex flex-col gap-4">
          {content.body?.map((p, i) => (
            <motion.p
              key={i}
              className={`font-sans leading-relaxed ${
                p.startsWith("Não acabou") ? "font-serif text-[1.3rem] italic text-marfim" : "text-[0.96rem] text-marfim/85"
              }`}
              style={{ fontWeight: p.startsWith("Não acabou") ? 600 : 300 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 1.7 + i * 0.15, duration: 0.5, ease: DIARY }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <p className="font-sans text-[0.95rem] text-rose-suave" style={{ fontWeight: 400 }}>{content.subhead}</p>

        <JourneyTimeline />

        {/* score qualitativo de probabilidade */}
        <motion.div
          className="flex items-center gap-4 rounded-2xl border border-marfim/15 bg-white/[0.04] px-5 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 2.4, duration: 0.6 }}
        >
          <span className="font-serif text-4xl text-rose" style={{ fontWeight: 700 }}>92%</span>
          <p className="font-sans text-[0.84rem] leading-snug text-nevoa" style={{ fontWeight: 300 }}>
            Probabilidade de você voltar a sentir tesão com o Método — com base nas mulheres com a mesma camada dominante que a sua.
          </p>
        </motion.div>

        {/* CTA — abrir a válvula */}
        <div className="mt-2 flex flex-col items-center gap-3">
          <PrimaryButton pulse full onClick={abrirValvula}>
            {ctaLabel ?? content.cta} →
          </PrimaryButton>
          <div className="flex items-center gap-1.5 text-nevoa/70">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="font-sans text-[0.72rem]">100% privado · ninguém vê suas respostas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
