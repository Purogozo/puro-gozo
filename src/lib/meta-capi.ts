// ============================================================
// PURO GOZO · Meta Conversions API (server-side)
// Envia eventos direto do servidor pro Meta (Graph API), complementando
// o Pixel do navegador. Import APENAS em Route Handlers (usa node:crypto e
// o token secreto — nunca deve ir pro bundle do cliente).
// ============================================================

import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { META_PIXEL_ID } from "./config";

// v25.0 (18/02/2026) é a atual. A v21.0 é de out/2024 e, pela política
// histórica de ~2 anos por versão, está entrando na faixa de descontinuação.
// O contrato de /{PIXEL_ID}/events é estável entre versões.
const GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? "v25.0";
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

// Remove acentos (NFD separa a letra do diacrítico; a faixa U+0300–U+036F são
// as marcas combinantes).
//
// ⚠️ INFERÊNCIA, não regra explícita da Meta. A doc diz apenas que "usar
// caracteres a-z do alfabeto romano é recomendado" e que caracteres especiais
// devem estar em UTF-8 — ela NÃO manda remover diacríticos. Como sha256("josé")
// ≠ sha256("jose"), a escolha importa e não dá pra acertar as duas. Seguimos a
// recomendação explícita (a-z) e aplicamos a MESMA função em todos os campos e
// nas duas pontas, o que ao menos garante consistência interna.
function deburr(v: string): string {
  return v.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Regra da Meta: "Remove symbols, letters, and any leading zeros. Phone numbers
// must include a country code to be used for matching."
// Brasil: (11) 98765-4321 → 5511987654321. Sem "+".
export function hashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  digits = digits.replace(/^0+/, ""); // "remove any leading zeros" (DDD 011 → 11)
  if (!digits) return undefined;

  // Sem código de país o hash não bate com o cadastro da Meta e o sinal é
  // perdido em silêncio. Número nacional brasileiro tem 10 (fixo) ou 11
  // (celular) dígitos; nesse caso prefixamos 55. Se já começa com 55 e tem
  // comprimento de número BR completo (12-13), assumimos que o DDI já veio.
  if (digits.length === 10 || digits.length === 11) digits = "55" + digits;

  return sha256(digits);
}

export function hashName(name?: string | null): string | undefined {
  // "Lowercase only with no punctuation."
  const v = name ? deburr(name.trim().toLowerCase()).replace(/[^a-z]/g, "") : "";
  return sha256(v || undefined);
}

// id anônimo estável (UUID do localStorage no cliente / CPF no Purchase)
export function hashExternalId(id?: string | null): string | undefined {
  return sha256(id?.trim().toLowerCase() || undefined);
}

// Cidade/estado: "Lowercase only with no punctuation, no special characters,
// and no spaces." → "São Paulo" vira "saopaulo".
function normalizeSpaceless(v?: string | null): string | undefined {
  if (!v) return undefined;
  return deburr(v.trim().toLowerCase()).replace(/[^a-z0-9]/g, "") || undefined;
}
export function hashCity(v?: string | null): string | undefined {
  return sha256(normalizeSpaceless(v));
}
export function hashState(v?: string | null): string | undefined {
  return sha256(normalizeSpaceless(v));
}
// "Use lowercase with no spaces and no dash." A regra de truncar nos 5
// primeiros dígitos vale SÓ para os EUA — CEP brasileiro vai com os 8.
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
