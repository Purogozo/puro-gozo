import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AB_COOKIE, normalizeVariant } from "@/lib/ab";

// Distribuição A/B estável por sessão (server-side).
// A variante é fixada num cookie e propagada via header x-pg-ab
// para o render do mesmo request (evita flash de hidratação).
export function proxy(request: NextRequest) {
  const forced = request.nextUrl.searchParams.get("v");
  const existing = request.cookies.get(AB_COOKIE)?.value;

  let variant: "a" | "b";
  if (forced === "a" || forced === "b") {
    variant = forced;
  } else if (existing === "a" || existing === "b") {
    variant = existing;
  } else {
    variant = Math.random() < 0.5 ? "a" : "b";
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

export const config = {
  matcher: "/",
};
