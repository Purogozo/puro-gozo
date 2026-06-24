"use client";

import { useReducedMotion as useReducedMotionRaw } from "motion/react";
import type { Variants, Transition } from "motion/react";

// Easing assinatura "virar a página de um diário"
export const DIARY: Transition["ease"] = [0.22, 1, 0.36, 1];

// Transição cinematográfica entre telas (cross-fade + leve deslize vertical)
export function pageVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.12 } },
      exit: { opacity: 0, transition: { duration: 0.08 } },
    };
  }
  return {
    initial: { opacity: 0, y: 26 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: DIARY },
    },
    exit: {
      opacity: 0,
      y: -22,
      transition: { duration: 0.36, ease: DIARY },
    },
  };
}

// Revelação escalonada: eyebrow → headline → corpo → opções (stagger ~60ms)
export function staggerContainer(reduced: boolean): Variants {
  return {
    initial: {},
    animate: {
      transition: reduced
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.06, delayChildren: 0.12 },
    },
  };
}

export function staggerItem(reduced: boolean): Variants {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.12 } },
    };
  }
  return {
    initial: { opacity: 0, y: 14 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: DIARY },
    },
  };
}

// Sempre boolean (o hook bruto pode retornar null antes da hidratação)
export function useReducedMotion(): boolean {
  return !!useReducedMotionRaw();
}

// Háptico discreto no mobile
export function haptic(pattern: number | number[] = 14) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* no-op */
    }
  }
}
