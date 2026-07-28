// Háptico discreto no mobile. Vive num módulo próprio (SEM importar motion/react)
// pra poder ser usado por componentes do caminho crítico da T1 — PrimaryButton —
// sem arrastar o Framer Motion pro bundle inicial.
export function haptic(pattern: number | number[] = 14) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* no-op */
    }
  }
}
