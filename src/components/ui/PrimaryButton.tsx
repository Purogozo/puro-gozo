"use client";

import { motion } from "motion/react";
import { useReducedMotion, haptic } from "@/lib/motion";

export function PrimaryButton({
  children,
  onClick,
  pulse = false,
  disabled = false,
  full = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  pulse?: boolean;
  disabled?: boolean;
  full?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileTap={reduced || disabled ? undefined : { scale: 0.97 }}
      onClick={() => {
        if (disabled) return;
        haptic(18);
        onClick?.();
      }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full bg-rose px-8 py-4 font-sans text-[0.8rem] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 disabled:cursor-not-allowed disabled:bg-nevoa disabled:text-marfim/70 ${
        pulse && !disabled ? "cta-pulse" : "shadow-[0_8px_30px_-6px_rgba(201,125,144,0.55)]"
      } ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
}
