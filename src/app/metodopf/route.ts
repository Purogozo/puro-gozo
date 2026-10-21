import { html } from "./html";

// /metodopf · cópia fiel da página "Método PF" (https://pf.reconectasexualidade.com.br/metodopf, GreatPages),
// baixada em 21/10/2026 com todos os assets em /public/metodopf/assets. Servida inteira, fora do layout
// do app: traz o próprio <head>, o próprio Pixel (1204317727626507), schema.org e canonical originais.
export const dynamic = "force-static";

export function GET() {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
