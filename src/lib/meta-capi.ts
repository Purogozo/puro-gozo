// ============================================================
// PURO GOZO · Meta Conversions API (server-side)
// Envia eventos direto do servidor pro Meta (Graph API), complementando
// o Pixel do navegador. Import APENAS em Route Handlers (usa node:crypto e
// o token secreto — nunca deve ir pro bundle do cliente).
// ============================================================

import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { META_PIXEL_ID } from "./config";

const GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? "v21.0";
const CAPI_TOKEN = process.env.META_CAPI_TOKEN ?? "";
// Código da aba "Testar eventos" do Events Manager (deixe vazio em produção)
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE ?? "";

const isDev = process.env.NODE_ENV !== "production";

// ── Hashing de PII (SHA-256, exigido pelo Meta) ─────────────
function sha256(value?: string): string | undefined {
  if (!value) return undefined;
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function hashEmail(email?: string | null): string | undefined {
  return sha256(email?.trim().toLowerCase() || undefined);
}

export function hashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, ""); // só dígitos, com DDI
  return sha256(digits || undefined);
}

export function hashName(name?: string | null): string | undefined {
  return sha256(name?.trim().toLowerCase() || undefined);
}

// id anônimo estável (UUID do localStorage no cliente / CPF no Purchase)
export function hashExternalId(id?: string | null): string | undefined {
  return sha256(id?.trim().toLowerCase() || undefined);
}

// Cidade/estado: minúsculo, sem espaços nem pontuação
function normalizeSpaceless(v?: string | null): string | undefined {
  return v?.trim().toLowerCase().replace(/\s+/g, "") || undefined;
}
export function hashCity(v?: string | null): string | undefined {
  return sha256(normalizeSpaceless(v));
}
export function hashState(v?: string | null): string | undefined {
  return sha256(normalizeSpaceless(v));
}
export function hashZip(v?: string | null): string | undefined {
  return sha256(v?.trim().toLowerCase().replace(/[\s-]/g, "") || undefined);
}
// País: ISO 3166-1 alpha-2 minúsculo (ex.: "BR" → "br")
export function hashCountry(v?: string | null): string | undefined {
  return sha256(v?.trim().toLowerCase() || undefined);
}

// ── Tipos ───────────────────────────────────────────────────
export interface CapiUserData {
  em?: string[]; // email (hash)
  ph?: string[]; // telefone (hash)
  fn?: string[]; // primeiro nome (hash)
  ln?: string[]; // sobrenome (hash)
  ct?: string[]; // cidade (hash)
  st?: string[]; // estado (hash)
  zp?: string[]; // CEP (hash)
  country?: string[]; // país ISO2 (hash)
  external_id?: string[]; // id anônimo (hash)
  fbp?: string; // cookie _fbp (NÃO hasheado)
  fbc?: string; // cookie _fbc (NÃO hasheado)
  client_ip_address?: string; // NÃO hasheado
  client_user_agent?: string; // NÃO hasheado
}

export interface CapiEvent {
  event_name: string;
  event_time: number; // unix em SEGUNDOS
  event_id?: string; // compartilhado com o Pixel p/ desduplicação
  event_source_url?: string;
  action_source: "website";
  user_data: CapiUserData;
  custom_data?: Record<string, unknown>;
}

// Monta os sinais de correspondência a partir do request do navegador
// (IP, user-agent, cookies do Pixel). Sem PII — o quiz não coleta lead.
export function userDataFromRequest(req: NextRequest): CapiUserData {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const client_ip_address = fwd.split(",")[0]?.trim() || undefined;
  const client_user_agent = req.headers.get("user-agent") ?? undefined;
  const fbp = req.cookies.get("_fbp")?.value;
  const fbc = req.cookies.get("_fbc")?.value;
  return { client_ip_address, client_user_agent, fbp, fbc };
}

// Remove chaves undefined/vazias antes de enviar (o Meta rejeita objetos sujos)
function clean<T extends Record<string, unknown>>(obj: T): T {
  const out = {} as T;
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    (out as Record<string, unknown>)[k] = v;
  }
  return out;
}

// POST dos eventos pro endpoint do Meta. No-op silencioso se não houver token.
export async function sendCapiEvents(
  events: CapiEvent[]
): Promise<{ ok: boolean; status: number; body?: unknown }> {
  if (!CAPI_TOKEN) {
    if (isDev)
      console.debug(
        "[capi] sem META_CAPI_TOKEN — evento ignorado:",
        events.map((e) => e.event_name).join(", ")
      );
    return { ok: false, status: 0 };
  }

  const data = events.map((e) => ({
    ...e,
    user_data: clean(e.user_data as Record<string, unknown>),
    custom_data: e.custom_data ? clean(e.custom_data) : undefined,
  }));

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(
    CAPI_TOKEN
  )}`;

  const payload: Record<string, unknown> = { data };
  if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => undefined);
    if (!res.ok && isDev) console.error("[capi] erro", res.status, body);
    return { ok: res.ok, status: res.status, body };
  } catch (e) {
    if (isDev) console.error("[capi] fetch falhou", e);
    return { ok: false, status: 0 };
  }
}
