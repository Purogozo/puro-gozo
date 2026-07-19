// Autenticação do /dashboard — senha única, sem banco de usuários.
// É uma página interna pra Andreia; um login completo seria peso sem ganho.
//
// O cookie NÃO guarda a senha: guarda o SHA-256 dela. Assim um cookie vazado
// não revela a senha (que pode ser reaproveitada em outro lugar).

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const DASH_COOKIE = "pg_dash";

const PASSWORD = process.env.DASHBOARD_PASSWORD ?? "";

function sha256(v: string): string {
  return createHash("sha256").update(v).digest("hex");
}

/** Comparação em tempo constante — evita descobrir o token por timing. */
function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function tokenFor(password: string): string {
  return sha256(password);
}

export function passwordMatches(candidate: string): boolean {
  // Sem senha configurada o dashboard fica FECHADO (nunca aberto por omissão).
  if (!PASSWORD) return false;
  return safeEqual(sha256(candidate), sha256(PASSWORD));
}

export async function isAuthenticated(): Promise<boolean> {
  if (!PASSWORD) return false;
  const cookie = (await cookies()).get(DASH_COOKIE)?.value;
  if (!cookie) return false;
  return safeEqual(cookie, tokenFor(PASSWORD));
}
