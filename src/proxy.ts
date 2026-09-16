import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AB_COOKIE, VARIANTS, normalizeVariant, type Variant } from "@/lib/ab";
import {
  VSL_COOKIE,
  VSL_COOKIE_MAX_AGE,
  VSL_ROUTER_PATH,
  isVslVariant,
  pickVslVariant,
  vslPath,
} from "@/lib/vsl-ab";

function isVariant(v: string | undefined | null): v is Variant {
  return !!v && (VARIANTS as readonly string[]).includes(v);
}

// ── /pg-vsl-ab · roteador das páginas de vendas com VSL (16/09/2026) ──
// Sorteia (ou lê do cookie) a variante e redireciona pra /pg-vsl-<x>
// preservando a query. `?v=a` força uma variante (e sai da query final).
// Ver src/lib/vsl-ab.ts pra lista de variantes e o porquê do redirect.
function routeVsl(request: NextRequest) {
  const url = request.nextUrl;
  const forced = url.searchParams.get("v");
  const existing = request.cookies.get(VSL_COOKIE)?.value;

  const variant = isVslVariant(forced)
    ? forced
    : isVslVariant(existing)
      ? existing
      : pickVslVariant();

  const dest = url.clone();
  dest.pathname = vslPath(variant);
  dest.searchParams.delete("v");

  // 307: temporário, pra nem navegador nem CDN grudarem no destino — o
  // sorteio tem que continuar acontecendo aqui a cada visitante novo.
  const res = NextResponse.redirect(dest, 307);
  if (variant !== existing) {
    res.cookies.set(VSL_COOKIE, variant, {
      path: "/",
      maxAge: VSL_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
  return res;
}

// Distribuição A/B estável por sessão (server-side).
// A variante é fixada num cookie e propagada via header x-pg-ab
// para o render do mesmo request (evita flash de hidratação).
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === VSL_ROUTER_PATH) return routeVsl(request);

  const forced = request.nextUrl.searchParams.get("v");
  const existing = request.cookies.get(AB_COOKIE)?.value;

  let variant: Variant;
  if (isVariant(forced)) {
    variant = forced;
  } else if (isVariant(existing)) {
    variant = existing;
  } else {
    // sorteio uniforme entre os 3 braços (~33% cada)
    variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
  }
  variant = normalizeVariant(variant);

  const headers = new Headers(request.headers);
  headers.set("x-pg-ab", variant);

  const res = NextResponse.next({ request: { headers } });
  if (variant !== existing) {
    res.cookies.set(AB_COOKIE, variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }
  return res;
}

// ⚠️ Era "/" até 14/08/2026, quando a página de vendas assumiu a raiz e o
// quiz foi pra /quiz. O sorteio precisa acontecer no MESMO request que
// renderiza a T1 — é o header x-pg-ab que evita o flash de hidratação —,
// então o matcher tem que acompanhar a rota do quiz. Rodar na raiz agora só
// gastaria cookie em quem nunca vai ver a headline testada.
//
// /pg-vsl-ab (16/09/2026): roteador das páginas com VSL — só redireciona,
// não renderiza nada (não existe src/app/pg-vsl-ab/).
export const config = {
  matcher: ["/quiz", "/pg-vsl-ab"],
};
