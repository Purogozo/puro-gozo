"use client";

import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion, DIARY } from "@/lib/motion";
import { meterBandLabel } from "@/lib/screens";

// Onda de superfície reutilizável (loop horizontal contínuo)
function WaveSurface({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute left-0 right-0 -top-[6px] h-3 overflow-hidden">
      <svg
        className={reduced ? "" : "wave-anim"}
        width="200%"
        height="12"
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <path
          d="M0 6 Q 15 0 30 6 T 60 6 T 90 6 T 120 6 V12 H0 Z"
          fill="#c97d90"
        />
      </svg>
    </div>
  );
}

export function ReservoirMeter({ level }: { level: number }) {
  const reduced = useReducedMotion();
  const pct = Math.max(0, Math.min(1, level)) * 100;
  const band = meterBandLabel(level);

  return (
    <>
      {/* Coluna de água na borda esquerda */}
      <div
        className="fixed left-0 top-0 bottom-0 z-40 w-[12px] sm:w-[16px] pointer-events-none"
        aria-hidden
      >
        <div className="relative h-full w-full bg-indigo/10 backdrop-blur-[1px] border-r border-nevoa/20">
          <motion.div
            className="absolute left-0 right-0 bottom-0 overflow-visible"
            style={{
              background: "linear-gradient(to top, #6e3350, #c97d90)",
              boxShadow: "0 0 14px 1px rgba(201,125,144,0.5)",
            }}
            initial={false}
            animate={{ height: `${pct}%` }}
            transition={
              reduced
                ? { duration: 0.15 }
                : { duration: 1.1, ease: DIARY }
            }
          >
            {pct > 1 && <WaveSurface reduced={reduced} />}
          </motion.div>
        </div>
      </div>

      {/* Micro-label da camada atual */}
      <div className="fixed left-4 sm:left-6 top-4 z-40 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={band}
            className="eyebrow inline-block text-lavanda/90 mix-blend-luminosity"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.4, ease: DIARY }}
            style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}
          >
            {band}
          </motion.span>
        </AnimatePresence>
      </div>
    </>
  );
}
