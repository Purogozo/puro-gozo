"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { useReducedMotion, haptic, DIARY } from "@/lib/motion";
import type { Option } from "@/lib/types";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function OptionCard({
  option,
  index,
  selected,
  multi = false,
  dark = false,
  onSelect,
}: {
  option: Option;
  index: number;
  selected: boolean;
  multi?: boolean;
  dark?: boolean;
  onSelect: () => void;
}) {
  const reduced = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!reduced) {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = ripples.length + Math.round(rect.width + rect.height);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setRipples((r) => [...r, { id, x, y }]);
        setTimeout(
          () => setRipples((r) => r.filter((rp) => rp.id !== id)),
          650
        );
      }
      haptic(14);
      onSelect();
    },
    [onSelect, reduced, ripples.length]
  );

  // Paleta clara vs. fundo escuro íntimo
  const base = dark
    ? "border-nevoa/25 bg-white/[0.04] text-marfim hover:border-rose/70"
    : "border-nevoa/40 bg-white text-tinta hover:border-rose/80";
  const sel = dark
    ? "border-rose bg-rose/15 text-marfim"
    : "border-rose bg-[#f7e7eb] text-tinta";

  return (
    <motion.button
      type="button"
      onClick={handle}
      variants={
        reduced
          ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
          : {
              initial: { opacity: 0, y: 16 },
              animate: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.42, ease: DIARY },
              },
            }
      }
      whileTap={reduced ? undefined : { scale: 0.98 }}
      whileHover={reduced ? undefined : { scale: 1.012 }}
      className={`group relative w-full overflow-hidden rounded-2xl border px-5 py-4 text-left transition-colors duration-300 ${
        selected ? sel : base
      }`}
      aria-pressed={selected}
    >
      {/* ripples de água */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute z-0 rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 12,
            height: 12,
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle, rgba(201,125,144,0.45), rgba(201,125,144,0) 70%)",
            animation: "ripple-grow 0.65s ease-out forwards",
          }}
        />
      ))}

      <span className="relative z-10 flex items-center gap-3">
        {/* indicador (check para múltipla / bolinha para única) */}
        <span
          className={`mt-0.5 flex shrink-0 items-center justify-center transition-all duration-300 ${
            multi ? "h-5 w-5 rounded-md" : "h-5 w-5 rounded-full"
          } border ${
            selected
              ? "border-rose bg-rose text-white"
              : dark
                ? "border-nevoa/50"
                : "border-nevoa"
          }`}
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6.5L5 9L9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        <span className="flex-1">
          <span className="flex items-baseline gap-2">
            {option.emoji && (
              <span className="text-lg leading-none">{option.emoji}</span>
            )}
            <span
              className="font-sans text-[0.98rem] leading-snug"
              style={{ fontWeight: 400 }}
            >
              {option.label}
            </span>
          </span>
          {option.sublabel && (
            <span
              className={`mt-1 block font-sans text-[0.82rem] leading-snug ${
                dark ? "text-nevoa" : "text-lavanda"
              }`}
              style={{ fontWeight: 300 }}
            >
              {option.sublabel}
            </span>
          )}
        </span>
      </span>
    </motion.button>
  );
}
