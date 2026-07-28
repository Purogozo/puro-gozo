"use client";

import { haptic } from "@/lib/haptic";

// Botão primário SEM Framer Motion: o "whileTap" virou `active:scale` em CSS.
// Isso mantém o PrimaryButton fora do bundle inicial pesado — ele é usado na T1,
// que precisa pintar instantânea, sem esperar o Framer carregar.
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
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        haptic(18);
        onClick?.();
      }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full bg-rose px-8 py-4 font-sans text-[0.8rem] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-nevoa disabled:text-marfim/70 disabled:active:scale-100 ${
        pulse && !disabled ? "cta-pulse" : "shadow-[0_8px_30px_-6px_rgba(201,125,144,0.55)]"
      } ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
