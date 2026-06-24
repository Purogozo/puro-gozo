"use client";

import { useQuiz } from "@/lib/store";

// Áudio sempre opt-in (default mudo), toggle persistente
export function AudioToggle({ dark = false }: { dark?: boolean }) {
  const audioOn = useQuiz((s) => s.audioOn);
  const toggle = useQuiz((s) => s.toggleAudio);
  const tone = dark ? "text-marfim/70" : "text-lavanda";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={audioOn ? "Desligar som" : "Ligar som"}
      className={`fixed right-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full border ${dark ? "border-marfim/25" : "border-nevoa/40"} backdrop-blur-sm transition-opacity hover:opacity-100 ${tone} opacity-60`}
    >
      {audioOn ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
      )}
    </button>
  );
}
