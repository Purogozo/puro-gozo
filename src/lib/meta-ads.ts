// ============================================================
// PURO GOZO · Meta Ads (Marketing API · Insights) — gasto diário
// ============================================================
// SERVER-ONLY. Lê o gasto de anúncio por dia pra compor investimento e lucro no
// dashboard. Best-effort: qualquer erro vira mapa vazio → o dashboard mostra
// investimento 0 e lucro = faturamento, nunca quebra.
//
// ⚠️ Token: precisa de um System User token com permissão `ads_read` na conta.
// O META_CAPI_TOKEN NÃO serve — é escopo de dataset/Conversões e responde
// "(#200) Provide valid app ID". Por isso lê uma env própria, META_ADS_TOKEN.
//
// ⚠️ Moeda: `spend` vem na moeda da conta de anúncios. Assumimos BRL (conta
// brasileira). Se a conta faturar em outra moeda, o número sai sem conversão.

const GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? "v25.0";
const ADS_TOKEN = process.env.META_ADS_TOKEN ?? "";
// ID da conta de anúncios (não é segredo). Default embutido; env sobrescreve.
const RAW_ACCOUNT = process.env.META_ADS_ACCOUNT_ID ?? "1026891540036744";
const ACCOUNT = RAW_ACCOUNT.startsWith("act_") ? RAW_ACCOUNT : `act_${RAW_ACCOUNT}`;

/** Sem token de Ads, as funções viram no-op (dashboard degrada limpo). */
export const metaAdsReady = Boolean(ADS_TOKEN);

const TIMEOUT_MS = 6000;

/**
 * Gasto por dia no intervalo [since, until] (datas YYYY-MM-DD, fuso da conta).
 * Devolve { 'YYYY-MM-DD': gasto } só com os dias que a API retornar (dias sem
 * gasto podem simplesmente não vir).
 */
export async function fetchDailySpend(
  since: string,
  until: string
): Promise<Record<string, number>> {
  if (!metaAdsReady) return {};

  const params = new URLSearchParams({
    fields: "spend",
    level: "account",
    time_increment: "1",
    time_range: JSON.stringify({ since, until }),
    limit: "500",
    access_token: ADS_TOKEN,
  });

  const out: Record<string, number> = {};
  try {
    // paginação: o `next` já vem com access_token embutido. Guard evita loop.
    let next: string | null =
      `https://graph.facebook.com/${GRAPH_VERSION}/${ACCOUNT}/insights?${params}`;
    let guard = 0;
    while (next && guard++ < 12) {
      const res: Response = await fetch(next, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      });
      const json: {
        data?: { date_start?: string; spend?: string }[];
        paging?: { next?: string };
        error?: { message?: string };
      } = await res.json();
      if (!res.ok) {
        console.error(
          "[meta-ads] insights erro",
          res.status,
          json?.error?.message ?? ""
        );
        return out;
      }
      for (const row of json.data ?? []) {
        if (row.date_start) out[row.date_start] = Number(row.spend) || 0;
      }
      next = json.paging?.next ?? null;
    }
  } catch (e) {
    console.error("[meta-ads] fetch falhou", e);
  }
  return out;
}
