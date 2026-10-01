import { html } from "./html";

// /protocolo · Funil 3 "Protocolo do Gozo" (quiz → chance → carta → protocolo → oferta), 30/09/2026.
// Página estática servida inteira (Pixel e checkout embutidos no HTML); fora do layout do app
// de propósito — ela traz o próprio <head>, o próprio Pixel (mesmo id) e noindex.
export const dynamic = "force-static";

export function GET() {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
