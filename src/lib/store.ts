"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Path, Profile } from "./types";
import {
  SCREENS,
  pathFromStatus,
  profileFromAnswer,
} from "./screens";

type Answers = Record<number, string | string[]>;

interface QuizState {
  index: number; // posição na lista SCREENS (0-based)
  answers: Answers;
  audioOn: boolean;
  hydrated: boolean;

  // derivados
  path: () => Path;
  profile: () => Profile;
  currentScreenId: () => number;
  meter: () => number;

  // ações
  setAnswer: (screenId: number, value: string | string[]) => void;
  next: () => void;
  prev: () => void;
  goToScreenId: (id: number) => void;
  toggleAudio: () => void;
  reset: () => void;
  setHydrated: () => void;
}

export const useQuiz = create<QuizState>()(
  persist(
    (set, get) => ({
      index: 0,
      answers: {},
      audioOn: false,
      hydrated: false,

      path: () => pathFromStatus(get().answers[3] as string | undefined),
      profile: () => profileFromAnswer(get().answers[13] as string | undefined),
      currentScreenId: () => SCREENS[get().index]?.id ?? 1,
      meter: () => SCREENS[get().index]?.meter ?? 0,

      setAnswer: (screenId, value) =>
        set((s) => ({ answers: { ...s.answers, [screenId]: value } })),

      next: () =>
        set((s) => ({ index: Math.min(s.index + 1, SCREENS.length - 1) })),

      prev: () => set((s) => ({ index: Math.max(s.index - 1, 0) })),

      goToScreenId: (id) => {
        const idx = SCREENS.findIndex((sc) => sc.id === id);
        if (idx >= 0) set({ index: idx });
      },

      toggleAudio: () => set((s) => ({ audioOn: !s.audioOn })),

      reset: () => set({ index: 0, answers: {} }),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "pg-quiz-v1",
      partialize: (s) => ({
        index: s.index,
        answers: s.answers,
        audioOn: s.audioOn,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
