import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AB_COOKIE, VARIANTS, normalizeVariant, type Variant } from "@/lib/ab";

function isVariant(v: string | undefined | null): v is Variant {
  return !!v && (VARIANTS as readonly string[]).includes(v);
}

// Distribuição A/B/C estável por sessão (server-side).
// A variante é fixada num cookie e propagada via header x-pg-ab
// para o render do mesmo request (evita flash de hidratação).
export function proxy(request: NextRequest) {
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
export const config = {
  matcher: "/quiz",
};
