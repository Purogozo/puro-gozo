// Constantes do delay da VSL (/pg-vsl-a), compartilhadas entre o Server
// Component da página (script inline de pré-pintura) e o client component
// VslDelay. Vivem aqui, e não no VslDelay.tsx, porque um módulo "use client"
// só exporta REFERÊNCIAS pro servidor — importar uma string de lá num Server
// Component devolve undefined (aconteceu em 16/09/2026: o script inline saiu
// com `localStorage.getItem(undefined)`).
export const VSL_REVEAL_CLASS = "vsl-revealed";
export const VSL_REVEAL_KEY = "pg-vsl-a-revealed";
