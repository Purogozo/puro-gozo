// Dashboard interno — funil do quiz + vendas.
// Server Component: a chave secreta do Supabase só existe no servidor e nada
// dela chega ao navegador. Renderiza HTML já pronto.

import { Suspense } from "react";
import { isAuthenticated } from "@/lib/dashboard-auth";
import { sbRpcRows, supabaseReady } from "@/lib/supabase";
import { fetchDailySpend, metaAdsReady } from "@/lib/meta-ads";
import LoginForm from "./LoginForm";
import DateFilter from "./DateFilter";
import SalesChart, { type DayPoint } from "./SalesChart";
import { logout } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Dashboard · Puro Gozo",
  robots: { index: false, follow: false }, // nunca em buscador
};

type Overview = {
  sessoes: number;
  completaram_quiz: number;
  clicaram_checkout: number;
  vendas: number;
  receita: number;
  abandono_checkout: number;
  reembolsos: number;
  reembolso_valor: number;
};
type FunnelRow = {
  screen: number;
  sessoes: number;
  pct_do_inicio: number | null;
  queda_pct: number | null;
};
type VariantRow = {
  variant: string;
  path: string;
  sessoes: number;
  completaram: number;
  foram_checkout: number;
};
type SalesRow = { dia: string; vendas: number; receita: number | null };
type StatusRow = { event_type: string; quantidade: number; valor: number | null };

const num = (n: number) => new Intl.NumberFormat("pt-BR").format(n);
const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
const pct = (parte: number, todo: number) =>
  todo > 0 ? `${((parte / todo) * 100).toFixed(1)}%` : "—";

// ── Intervalo de datas ──────────────────────────────────────
// Referência America/Sao_Paulo, offset fixo -03:00 (o Brasil não usa horário de
// verão desde 2019). Os limites saem em UTC (ISO) pro Postgres; intervalo
// semiaberto [from, to). Rótulos em nomes amigáveis para o cabeçalho.
const BR = "-03:00";
const brDateStr = (d: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(d); // YYYY-MM-DD
const brMidnight = (dateStr: string) => new Date(`${dateStr}T00:00:00${BR}`);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);

// Lista de dias YYYY-MM-DD (fuso Brasília) de sinceDay até untilDay, inclusive.
function daysBetween(since: string, until: string): string[] {
  const out: string[] = [];
  let d = brMidnight(since);
  const end = brMidnight(until);
  let guard = 0;
  while (d.getTime() <= end.getTime() && guard++ < 400) {
    out.push(brDateStr(d));
    d = addDays(d, 1);
  }
  return out;
}

// Resolve o intervalo: `from`/`to` são instantes ISO (UTC) pros filtros do
// Postgres [from, to); `sinceDay`/`untilDay` são as datas YYYY-MM-DD (Brasília)
// pra API de Ads e pra montar o eixo X do gráfico.
function resolveRange(sp: Record<string, string | undefined>) {
  const now = new Date();
  const hoje = brDateStr(now);
  const key = sp.range ?? "7d";

  if (key === "hoje") {
    return {
      key,
      label: "Hoje",
      from: brMidnight(hoje).toISOString(),
      to: now.toISOString(),
      sinceDay: hoje,
      untilDay: hoje,
    };
  }
  if (key === "mes") {
    const primeiro = `${hoje.slice(0, 7)}-01`;
    return {
      key,
      label: "Mês atual",
      from: brMidnight(primeiro).toISOString(),
      to: now.toISOString(),
      sinceDay: primeiro,
      untilDay: hoje,
    };
  }
  if (key === "custom" && sp.from && sp.to) {
    const [a, b] = sp.from <= sp.to ? [sp.from, sp.to] : [sp.to, sp.from];
    return {
      key,
      label: `${a.split("-").reverse().join("/")} → ${b.split("-").reverse().join("/")}`,
      from: brMidnight(a).toISOString(),
      to: addDays(brMidnight(b), 1).toISOString(), // fim do dia inclusivo
      sinceDay: a,
      untilDay: b,
    };
  }
  // padrão: últimos 7 dias (hoje + 6 anteriores)
  const seteDiasAtras = brDateStr(addDays(brMidnight(hoje), -6));
  return {
    key: "7d",
    label: "Últimos 7 dias",
    from: addDays(brMidnight(hoje), -6).toISOString(),
    to: now.toISOString(),
    sinceDay: seteDiasAtras,
    untilDay: hoje,
  };
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  if (!(await isAuthenticated())) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-indigo p-6">
        <LoginForm />
      </main>
    );
  }

  if (!supabaseReady) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-indigo p-6">
        <p className="max-w-md rounded-2xl bg-marfim p-8 text-center text-tinta">
          Supabase não configurado. Faltam <code>SUPABASE_URL</code> e{" "}
          <code>SUPABASE_SECRET_KEY</code> nas variáveis de ambiente.
        </p>
      </main>
    );
  }

  const sp = await searchParams;
  const range = resolveRange(sp);
  const args = { p_from: range.from, p_to: range.to };

  // Consultas em paralelo — nenhuma depende da outra. O gasto de anúncio vem da
  // Meta Ads API (best-effort: falha → mapa vazio, investimento 0).
  const [overviewRows, funil, variantes, vendas, status, gasto] = await Promise.all([
    sbRpcRows<Overview>("pg_overview_range", args),
    sbRpcRows<FunnelRow>("pg_funnel_screens_range", args),
    sbRpcRows<VariantRow>("pg_funnel_by_variant_range", args),
    sbRpcRows<SalesRow>("pg_sales_daily_range", args),
    sbRpcRows<StatusRow>("pg_purchases_by_status_range", args),
    fetchDailySpend(range.sinceDay, range.untilDay),
  ]);

  // Série por dia pro gráfico: faturamento (Hotmart) + investimento (Meta Ads),
  // lucro = faturamento − investimento. Eixo X = todos os dias do período (o
  // pg_sales_daily só traz dias com venda; aqui preenchemos os demais com 0).
  const vendasPorDia = new Map(vendas.map((v) => [v.dia, v]));
  const diasTodos = daysBetween(range.sinceDay, range.untilDay);
  const dias = diasTodos.length > 92 ? diasTodos.slice(-92) : diasTodos; // teto de leitura
  const pontos: DayPoint[] = dias.map((dia) => {
    const v = vendasPorDia.get(dia);
    const faturamento = Number(v?.receita ?? 0);
    const investimento = Number(gasto[dia] ?? 0);
    return {
      dia,
      vendas: Number(v?.vendas ?? 0),
      faturamento,
      investimento,
      lucro: faturamento - investimento,
    };
  });

  const o: Overview = overviewRows[0] ?? {
    sessoes: 0,
    completaram_quiz: 0,
    clicaram_checkout: 0,
    vendas: 0,
    receita: 0,
    abandono_checkout: 0,
    reembolsos: 0,
    reembolso_valor: 0,
  };

  const topo = funil[0]?.sessoes ?? 0;
  const ticket = o.vendas > 0 ? Number(o.receita) / o.vendas : 0;
  const semDados = o.sessoes === 0 && funil.length === 0 && o.vendas === 0;

  return (
    <main className="min-h-dvh bg-indigo px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-nevoa">Puro Gozo</p>
            <h1 className="font-serif text-3xl text-marfim">Dashboard do funil</h1>
            <p className="mt-1 text-sm text-nevoa">Período: {range.label}</p>
          </div>
          <form action={logout}>
            <button className="text-sm text-nevoa underline hover:text-marfim">
              Sair
            </button>
          </form>
        </header>

        {/* ── Filtro de data ── */}
        <div className="mb-6">
          <Suspense fallback={null}>
            <DateFilter />
          </Suspense>
        </div>

        {semDados && (
          <p className="mb-6 rounded-xl bg-marfim/10 p-4 text-sm text-nevoa">
            Nenhum evento no período selecionado. Tente um intervalo maior, ou
            aguarde tráfego real (visitas com <code>?screen=</code> são marcadas
            como preview e ficam de fora).
          </p>
        )}

        {/* ── KPIs ── */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Kpi rotulo="Sessões" valor={num(o.sessoes)} />
          <Kpi
            rotulo="Completaram"
            valor={num(o.completaram_quiz)}
            nota={pct(o.completaram_quiz, o.sessoes)}
          />
          <Kpi
            rotulo="Checkout"
            valor={num(o.clicaram_checkout)}
            nota={pct(o.clicaram_checkout, o.sessoes)}
          />
          <Kpi
            rotulo="Vendas"
            valor={num(o.vendas)}
            nota={pct(o.vendas, o.clicaram_checkout) + " do checkout"}
          />
          <Kpi rotulo="Receita" valor={brl(Number(o.receita) || 0)} destaque />
        </section>

        {/* ── Conversão & abandono ── */}
        <Card titulo="Conversão & abandono">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <Mini rotulo="Sessão → Venda" valor={pct(o.vendas, o.sessoes)} />
            <Mini rotulo="Checkout → Venda" valor={pct(o.vendas, o.clicaram_checkout)} />
            <Mini
              rotulo="Abandono de checkout"
              valor={num(o.abandono_checkout)}
              nota={pct(o.abandono_checkout, o.clicaram_checkout) + " do checkout"}
            />
            <Mini rotulo="Ticket médio" valor={o.vendas > 0 ? brl(ticket) : "—"} />
            <Mini
              rotulo="Reembolsos"
              valor={num(o.reembolsos)}
              nota={o.reembolsos > 0 ? `− ${brl(Number(o.reembolso_valor) || 0)}` : undefined}
            />
          </div>
        </Card>

        {/* ── Gráfico: faturamento / investimento / lucro / vendas por dia ── */}
        <Card titulo="Faturamento, investimento e lucro por dia">
          <SalesChart data={pontos} adsReady={metaAdsReady} />
        </Card>

        {/* ── Funil tela a tela ── */}
        <Card titulo="Funil tela a tela">
          {funil.length === 0 ? (
            <Vazio />
          ) : (
            <ul className="space-y-1.5">
              {funil.map((r) => {
                const largura = topo > 0 ? (r.sessoes / topo) * 100 : 0;
                const queda = Number(r.queda_pct ?? 0);
                return (
                  <li key={r.screen} className="flex items-center gap-3 text-sm">
                    <span className="w-10 shrink-0 text-right text-nevoa">
                      T{r.screen}
                    </span>
                    <div className="h-6 flex-1 overflow-hidden rounded bg-marfim/10">
                      <div
                        className="h-full rounded bg-rose"
                        style={{ width: `${Math.max(largura, 1)}%` }}
                      />
                    </div>
                    <span className="w-14 shrink-0 text-right text-marfim">
                      {num(r.sessoes)}
                    </span>
                    <span className="w-14 shrink-0 text-right text-nevoa">
                      {r.pct_do_inicio ?? "—"}%
                    </span>
                    {/* queda relevante em destaque: é onde está o vazamento */}
                    <span
                      className={`w-16 shrink-0 text-right ${
                        queda >= 20 ? "font-medium text-rose" : "text-nevoa/60"
                      }`}
                    >
                      {r.queda_pct != null ? `−${r.queda_pct}%` : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* ── A/B e caminho ── */}
        <Card titulo="Por variante e caminho">
          {variantes.length === 0 ? (
            <Vazio />
          ) : (
            <Tabela
              cabecalho={["Variante", "Caminho", "Sessões", "Completaram", "Checkout"]}
              linhas={variantes.map((v) => [
                v.variant.toUpperCase(),
                v.path,
                num(v.sessoes),
                `${num(v.completaram)} (${pct(v.completaram, v.sessoes)})`,
                `${num(v.foram_checkout)} (${pct(v.foram_checkout, v.sessoes)})`,
              ])}
            />
          )}
        </Card>

        {/* ── Vendas por status (Hotmart) ── */}
        <Card titulo="Vendas por status (Hotmart)">
          {status.length === 0 ? (
            <Vazio />
          ) : (
            <Tabela
              cabecalho={["Status", "Qtd.", "Valor"]}
              linhas={status.map((s) => [
                statusLabel(s.event_type),
                num(s.quantidade),
                brl(Number(s.valor) || 0),
              ])}
            />
          )}
        </Card>

        {/* ── Vendas por dia ── */}
        <Card titulo="Vendas por dia">
          {vendas.length === 0 ? (
            <Vazio />
          ) : (
            <Tabela
              cabecalho={["Dia", "Vendas", "Receita"]}
              linhas={vendas.map((v) => [
                new Date(v.dia).toLocaleDateString("pt-BR", { timeZone: "UTC" }),
                num(v.vendas),
                brl(Number(v.receita) || 0),
              ])}
            />
          )}
        </Card>

        <p className="mt-8 text-center text-xs text-nevoa/60">
          Reembolsos e chargebacks abatem a receita automaticamente. Datas no fuso
          de Brasília.
        </p>
      </div>
    </main>
  );
}

// Nomes legíveis pros event_type crus da Hotmart.
function statusLabel(t: string): string {
  const mapa: Record<string, string> = {
    PURCHASE_APPROVED: "Aprovada",
    PURCHASE_COMPLETE: "Concluída (fim garantia)",
    PURCHASE_REFUNDED: "Reembolsada",
    PURCHASE_CHARGEBACK: "Chargeback",
    PURCHASE_PROTEST: "Contestação",
    PURCHASE_CANCELED: "Cancelada",
    PURCHASE_EXPIRED: "Expirada",
    PURCHASE_DELAYED: "Atrasada",
    PURCHASE_BILLET_PRINTED: "Boleto impresso",
    PURCHASE_OUT_OF_SHOPPING_CART: "Saiu do carrinho",
  };
  return mapa[t] ?? t;
}

function Kpi({
  rotulo,
  valor,
  nota,
  destaque,
}: {
  rotulo: string;
  valor: string;
  nota?: string;
  destaque?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 ${destaque ? "bg-rose text-indigo" : "bg-marfim/10 text-marfim"}`}
    >
      <p className={`eyebrow ${destaque ? "text-indigo/70" : "text-nevoa"}`}>
        {rotulo}
      </p>
      <p className="mt-1 font-serif text-2xl">{valor}</p>
      {nota && (
        <p className={`text-xs ${destaque ? "text-indigo/70" : "text-nevoa"}`}>
          {nota}
        </p>
      )}
    </div>
  );
}

// Bloco compacto pras métricas derivadas (dentro de um Card).
function Mini({ rotulo, valor, nota }: { rotulo: string; valor: string; nota?: string }) {
  return (
    <div className="rounded-lg bg-indigo/40 p-3">
      <p className="eyebrow text-nevoa">{rotulo}</p>
      <p className="mt-1 font-serif text-xl text-marfim">{valor}</p>
      {nota && <p className="text-xs text-nevoa">{nota}</p>}
    </div>
  );
}

function Card({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 rounded-2xl bg-tinta/40 p-5">
      <h2 className="mb-4 font-serif text-lg text-marfim">{titulo}</h2>
      {children}
    </section>
  );
}

function Vazio() {
  return <p className="text-sm text-nevoa/60">Sem dados no período.</p>;
}

function Tabela({
  cabecalho,
  linhas,
}: {
  cabecalho: string[];
  linhas: (string | number)[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-nevoa">
            {cabecalho.map((c) => (
              <th key={c} className="pb-2 pr-4 font-normal">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-marfim">
          {linhas.map((l, i) => (
            <tr key={i} className="border-t border-marfim/10">
              {l.map((c, j) => (
                <td key={j} className="py-2 pr-4">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
