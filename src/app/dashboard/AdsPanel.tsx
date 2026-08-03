// Aba "Anúncios" — retenção do quiz por criativo.
// Server Component: recebe os dados já agregados e só desenha.

import Link from "next/link";
import {
  AGRUPAMENTOS,
  AMOSTRA_MINIMA,
  MARCOS,
  type Agrupamento,
  type ResumoAnuncios,
} from "./ads";

const num = (n: number) => new Intl.NumberFormat("pt-BR").format(n);
const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
const taxa = (parte: number, todo: number) =>
  todo > 0 ? `${((parte / todo) * 100).toFixed(0)}%` : "—";

export default function AdsPanel({
  resumo,
  por,
  hrefPara,
}: {
  resumo: ResumoAnuncios;
  por: Agrupamento;
  /** monta a URL preservando período e aba */
  hrefPara: (por: Agrupamento) => string;
}) {
  const { linhas, sessoesLocais, vendasSemSessao } = resumo;
  const maiorSessoes = linhas[0]?.sessoes ?? 0;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-nevoa">Agrupar por:</span>
        {AGRUPAMENTOS.map((a) => (
          <Link
            key={a.chave}
            href={hrefPara(a.chave)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition ${
              por === a.chave
                ? "bg-rose text-indigo"
                : "bg-marfim/10 text-nevoa hover:bg-marfim/20 hover:text-marfim"
            }`}
          >
            {a.rotulo}
          </Link>
        ))}
      </div>

      {linhas.length === 0 ? (
        <p className="text-sm text-nevoa/60">
          Sem sessões com UTM no período. Se as campanhas estão rodando, confira
          se os links dos anúncios carregam <code>utm_content</code>.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead>
              <tr className="text-nevoa">
                <th className="pb-2 pr-4 font-normal">Anúncio</th>
                <th className="pb-2 pr-4 font-normal">Sessões</th>
                <th className="pb-2 pr-4 font-normal">Tela média</th>
                <th className="pb-2 pr-4 font-normal">Passou da entrada</th>
                <th className="pb-2 pr-4 font-normal">Chegou ao meio</th>
                <th className="pb-2 pr-4 font-normal">Chegou ao resultado</th>
                <th className="pb-2 pr-4 font-normal">Checkout</th>
                <th className="pb-2 pr-4 font-normal">Vendas</th>
              </tr>
            </thead>
            <tbody className="text-marfim">
              {linhas.map((l) => {
                const poucos = l.sessoes < AMOSTRA_MINIMA;
                const retencao = l.sessoes > 0 ? l.resultado / l.sessoes : 0;
                return (
                  <tr
                    key={l.chave}
                    className="border-t border-marfim/10 align-top"
                  >
                    <td className="max-w-[16rem] py-2 pr-4">
                      <span className="block truncate" title={l.chave}>
                        {l.chave}
                      </span>
                      {l.detalhe && (
                        <span
                          className="block truncate text-xs text-nevoa"
                          title={l.detalhe}
                        >
                          {l.detalhe}
                        </span>
                      )}
                      {poucos && (
                        <span className="text-xs text-nevoa/60">
                          amostra pequena
                        </span>
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      <span className="block">{num(l.sessoes)}</span>
                      <span className="mt-1 block h-1 w-16 rounded bg-marfim/10">
                        <span
                          className="block h-1 rounded bg-nevoa/60"
                          style={{
                            width: `${
                              maiorSessoes > 0
                                ? (l.sessoes / maiorSessoes) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </span>
                    </td>
                    <td className="py-2 pr-4">T{l.telaMedia.toFixed(1)}</td>
                    <td className="py-2 pr-4">
                      {taxa(l.entrou, l.sessoes)}
                      <span className="block text-xs text-nevoa">
                        {num(l.entrou)}
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      {taxa(l.meio, l.sessoes)}
                      <span className="block text-xs text-nevoa">
                        {num(l.meio)}
                      </span>
                    </td>
                    {/* a coluna que responde a pergunta: quem FICA até o fim */}
                    <td className="py-2 pr-4">
                      <span
                        className={
                          poucos ? "text-nevoa" : "font-medium text-marfim"
                        }
                      >
                        {taxa(l.resultado, l.sessoes)}
                      </span>
                      <span className="mt-1 block h-1.5 w-20 rounded bg-marfim/10">
                        <span
                          className={`block h-1.5 rounded ${
                            poucos ? "bg-nevoa/40" : "bg-rose"
                          }`}
                          style={{ width: `${Math.max(retencao * 100, 1)}%` }}
                        />
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      {num(l.checkout)}
                      <span className="block text-xs text-nevoa">
                        {taxa(l.checkout, l.sessoes)}
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      {num(l.vendas)}
                      {l.vendas > 0 && (
                        <span className="block text-xs text-nevoa">
                          {brl(l.receita)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 space-y-1 text-xs text-nevoa/70">
        <p>
          <strong>Passou da entrada</strong> = respondeu a idade na T1 e seguiu
          (chegou à T{MARCOS.entrou}). <strong>Chegou ao meio</strong> = viu a
          revelação do mecanismo (T{MARCOS.meio}).{" "}
          <strong>Chegou ao resultado</strong> = terminou o quiz (T
          {MARCOS.resultado}) — é a coluna de retenção de verdade.{" "}
          <strong>Tela média</strong> = até onde a sessão típica daquele anúncio
          foi.
        </p>
        <p>
          Anúncio = <code>utm_content</code> do link (com <code>utm_term</code>{" "}
          de reserva). Quem entra sem UTM cai em “(sem identificação)”.
        </p>
        {vendasSemSessao > 0 && (
          <p>
            {num(vendasSemSessao)} venda(s) sem sessão dentro do período — a
            compra caiu aqui, mas o quiz foi feito antes do intervalo. Aparecem
            no total de vendas, não nas linhas.
          </p>
        )}
        {sessoesLocais > 0 && (
          <p>
            {num(sessoesLocais)} sessão(ões) de teste em localhost foram
            ignoradas.
          </p>
        )}
      </div>
    </>
  );
}
