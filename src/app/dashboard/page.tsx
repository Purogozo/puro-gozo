// Dashboard interno — funil do quiz + vendas.
// Server Component: a chave secreta do Supabase só existe no servidor e nada
// dela chega ao navegador. Renderiza HTML já pronto.

import { isAuthenticated } from "@/lib/dashboard-auth";
import { sbSelect, supabaseReady } from "@/lib/supabase";
import LoginForm from "./LoginForm";
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

const num = (n: number) => new Intl.NumberFormat("pt-BR").format(n);
const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
const pct = (parte: number, todo: number) =>
  todo > 0 ? `${((parte / todo) * 100).toFixed(1)}%` : "—";

export default async function DashboardPage() {
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

  // Consultas em paralelo — nenhuma depende da outra.
  const [overviewRows, funil, variantes, vendas] = await Promise.all([
    sbSelect<Overview>("pg_overview"),
    sbSelect<FunnelRow>("pg_funnel_screens"),
    sbSelect<VariantRow>("pg_funnel_by_variant"),
    sbSelect<SalesRow>("pg_sales_daily", "select=*&limit=14"),
  ]);

  const o: Overview = overviewRows[0] ?? {
    sessoes: 0,
    completaram_quiz: 0,
    clicaram_checkout: 0,
    vendas: 0,
    receita: 0,
  };

  const topo = funil[0]?.sessoes ?? 0;
  const semDados = o.sessoes === 0 && funil.length === 0;

  return (
    <main className="min-h-dvh bg-indigo px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-nevoa">Puro Gozo</p>
            <h1 className="font-serif text-3xl text-marfim">Dashboard do funil</h1>
          </div>
          <form action={logout}>
            <button className="text-sm text-nevoa underline hover:text-marfim">
              Sair
            </button>
          </form>
        </header>

        {semDados && (
          <p className="mb-6 rounded-xl bg-marfim/10 p-4 text-sm text-nevoa">
            Nenhum evento registrado ainda. Os dados aparecem assim que o funil
            receber tráfego real (visitas com <code>?screen=</code> são marcadas
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

        {/* ── Vendas ── */}
        <Card titulo="Vendas por dia (14 dias)">
          {vendas.length === 0 ? (
            <Vazio />
          ) : (
            <Tabela
              cabecalho={["Dia", "Vendas", "Receita"]}
              linhas={vendas.map((v) => [
                new Date(v.dia).toLocaleDateString("pt-BR"),
                num(v.vendas),
                brl(Number(v.receita) || 0),
              ])}
            />
          )}
        </Card>

        <p className="mt-8 text-center text-xs text-nevoa/60">
          Reembolsos e chargebacks abatem a receita automaticamente.
        </p>
      </div>
    </main>
  );
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

function Card({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 rounded-2xl bg-tinta/40 p-5">
      <h2 className="mb-4 font-serif text-lg text-marfim">{titulo}</h2>
      {children}
    </section>
  );
}

function Vazio() {
  return <p className="text-sm text-nevoa/60">Sem dados ainda.</p>;
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
