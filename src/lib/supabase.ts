// ============================================================
// PURO GOZO · Supabase (server-side)
// ============================================================
// Acesso ao PostgREST via fetch puro — sem @supabase/supabase-js. O uso aqui é
// insert/rpc/select simples; a lib traria peso e mais uma dependência sem
// ganho real.
//
// ⚠️ SERVER-ONLY. SUPABASE_SECRET_KEY não tem prefixo NEXT_PUBLIC_ justamente
// pra nunca entrar no bundle do navegador — ela ignora RLS e escreve no banco.
// Nunca importe este módulo de um Client Component.
//
// Filosofia: NADA aqui pode derrubar o caminho crítico. Toda função engole o
// próprio erro (loga e devolve false). O dashboard é observabilidade — se o
// Supabase cair, o funil e o Meta continuam funcionando.

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? "";

/** Se falso, as funções viram no-op silencioso (ex.: dev sem env). */
export const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY);

// Timeout curto: o dashboard nunca justifica segurar uma resposta. Se o
// Supabase estiver lento, desiste e segue.
const TIMEOUT_MS = 4000;

function headers(extra: Record<string, string> = {}): HeadersInit {
  return {
    apikey: SUPABASE_SECRET_KEY,
    Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function request(
  path: string,
  init: RequestInit
): Promise<Response | null> {
  if (!supabaseReady) return null;
  try {
    return await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      ...init,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[supabase] falha de rede:", err);
    return null;
  }
}

/** Insere linha(s). Devolve true só se o banco confirmou. */
export async function sbInsert(
  table: string,
  rows: Record<string, unknown> | Record<string, unknown>[]
): Promise<boolean> {
  const res = await request(table, {
    method: "POST",
    headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify(rows),
  });
  if (!res) return false;
  if (!res.ok) {
    console.error(`[supabase] insert ${table} falhou:`, res.status, await res.text());
    return false;
  }
  return true;
}

/** Insere ou atualiza pela PK (merge-duplicates do PostgREST). */
export async function sbUpsert(
  table: string,
  rows: Record<string, unknown> | Record<string, unknown>[],
  onConflict: string
): Promise<boolean> {
  const res = await request(`${table}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: headers({
      Prefer: "return=minimal,resolution=merge-duplicates",
    }),
    body: JSON.stringify(rows),
  });
  if (!res) return false;
  if (!res.ok) {
    console.error(`[supabase] upsert ${table} falhou:`, res.status, await res.text());
    return false;
  }
  return true;
}

/** Chama uma função SQL (ex.: pg_upsert_session). */
export async function sbRpc(
  fn: string,
  args: Record<string, unknown>
): Promise<boolean> {
  const res = await request(`rpc/${fn}`, {
    method: "POST",
    headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify(args),
  });
  if (!res) return false;
  if (!res.ok) {
    console.error(`[supabase] rpc ${fn} falhou:`, res.status, await res.text());
    return false;
  }
  return true;
}

/** Lê de uma tabela/view. Devolve [] em qualquer falha (dashboard degrada, não quebra). */
export async function sbSelect<T = Record<string, unknown>>(
  table: string,
  query = "select=*"
): Promise<T[]> {
  const res = await request(`${table}?${query}`, {
    method: "GET",
    headers: headers(),
  });
  if (!res || !res.ok) {
    if (res) console.error(`[supabase] select ${table} falhou:`, res.status);
    return [];
  }
  try {
    return (await res.json()) as T[];
  } catch {
    return [];
  }
}
