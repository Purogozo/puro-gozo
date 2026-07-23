"use client";

// Gráficos por dia do dashboard. SVG inline, sem dependência.
// Regra de design (guia dataviz): UM eixo por gráfico — nunca eixo duplo. Por
// isso faturamento/investimento/lucro (todos R$) ficam num gráfico de 3 linhas,
// e vendas (contagem) num gráfico separado. Cores categóricas validadas pra
// daltonismo sobre o fundo escuro. Legenda sempre pra ≥2 séries; rótulo direto
// no último ponto; hover com tooltip.

import { useState } from "react";

export type DayPoint = {
  dia: string; // YYYY-MM-DD
  vendas: number;
  faturamento: number;
  investimento: number;
  lucro: number;
};

const COR = {
  faturamento: "#1f9478", // verde-azulado
  investimento: "#bf8730", // âmbar
  lucro: "#4a86e0", // azul
  vendas: "#c97d90", // rose da marca (série única)
  grid: "rgba(251,244,246,0.10)",
  eixo: "rgba(251,244,246,0.28)",
  texto: "#b5b2c8", // névoa
};

const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(n);
const brlFull = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
const int = (n: number) => new Intl.NumberFormat("pt-BR").format(n);
const diaCurto = (iso: string) => {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
};

export default function SalesChart({
  data,
  adsReady,
}: {
  data: DayPoint[];
  adsReady: boolean;
}) {
  if (data.length === 0) {
    return <p className="text-sm text-nevoa/60">Sem dados no período.</p>;
  }

  const moneySeries = adsReady
    ? [
        { key: "faturamento", label: "Faturamento", cor: COR.faturamento },
        { key: "investimento", label: "Investimento", cor: COR.investimento },
        { key: "lucro", label: "Lucro", cor: COR.lucro },
      ]
    : [{ key: "faturamento", label: "Faturamento", cor: COR.faturamento }];

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          {moneySeries.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5 text-xs text-nevoa">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ background: s.cor }}
              />
              {s.label}
            </span>
          ))}
          {!adsReady && (
            <span className="text-xs text-nevoa/60">
              (defina <code>META_ADS_TOKEN</code> pra ver investimento e lucro)
            </span>
          )}
        </div>
        <LineChart
          data={data}
          series={moneySeries as { key: keyof DayPoint; label: string; cor: string }[]}
          format={brl}
          formatFull={brlFull}
          includeZero
        />
      </div>

      <div>
        <p className="mb-2 text-xs text-nevoa">Vendas por dia</p>
        <LineChart
          data={data}
          series={[{ key: "vendas", label: "Vendas", cor: COR.vendas }]}
          format={int}
          formatFull={int}
          includeZero
        />
      </div>
    </div>
  );
}

// ── Gráfico de linha genérico (um eixo) ─────────────────────
function LineChart({
  data,
  series,
  format,
  formatFull,
  includeZero,
}: {
  data: DayPoint[];
  series: { key: keyof DayPoint; label: string; cor: string }[];
  format: (n: number) => string;
  formatFull: (n: number) => string;
  includeZero?: boolean;
}) {
  const [hover, setHover] = useState<number | null>(null);

  // viewBox fixo; largura real é responsiva via CSS (width 100%).
  const W = 720;
  const H = 240;
  const padL = 56;
  const padR = 16;
  const padT = 14;
  const padB = 26;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const vals = series.flatMap((s) => data.map((d) => Number(d[s.key]) || 0));
  let yMin = Math.min(...vals);
  let yMax = Math.max(...vals);
  if (includeZero) {
    yMin = Math.min(yMin, 0);
    yMax = Math.max(yMax, 0);
  }
  if (yMin === yMax) yMax = yMin + 1; // evita divisão por zero
  // respiro no topo
  yMax = yMax + (yMax - yMin) * 0.08;

  const n = data.length;
  const x = (i: number) => padL + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => padT + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  // linhas de grade / rótulos do eixo Y (3 marcas)
  const ticks = [yMin, yMin + (yMax - yMin) / 2, yMax];
  // baseline do zero, se estiver dentro do range
  const zeroIn = yMin < 0 && yMax > 0;

  // rótulos do eixo X: no máx ~6, sempre primeiro e último
  const maxLabels = 6;
  const step = Math.max(1, Math.ceil(n / maxLabels));
  const xLabelIdx = new Set<number>();
  for (let i = 0; i < n; i += step) xLabelIdx.add(i);
  xLabelIdx.add(n - 1);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={series.map((s) => s.label).join(", ") + " por dia"}
      >
        {/* grade + rótulos Y */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={padL}
              x2={W - padR}
              y1={y(t)}
              y2={y(t)}
              stroke={COR.grid}
              strokeWidth={1}
            />
            <text
              x={padL - 8}
              y={y(t) + 3}
              textAnchor="end"
              fontSize={11}
              fill={COR.texto}
            >
              {format(t)}
            </text>
          </g>
        ))}
        {/* baseline do zero em destaque */}
        {zeroIn && (
          <line
            x1={padL}
            x2={W - padR}
            y1={y(0)}
            y2={y(0)}
            stroke={COR.eixo}
            strokeWidth={1.5}
          />
        )}

        {/* rótulos X */}
        {data.map((d, i) =>
          xLabelIdx.has(i) ? (
            <text
              key={i}
              x={x(i)}
              y={H - 8}
              textAnchor="middle"
              fontSize={11}
              fill={COR.texto}
            >
              {diaCurto(d.dia)}
            </text>
          ) : null
        )}

        {/* linhas */}
        {series.map((s) => {
          const pts = data.map((d, i) => `${x(i)},${y(Number(d[s.key]) || 0)}`).join(" ");
          const last = data[n - 1];
          return (
            <g key={s.key}>
              <polyline
                points={pts}
                fill="none"
                stroke={s.cor}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* marcadores só se poucos pontos */}
              {n <= 31 &&
                data.map((d, i) => (
                  <circle
                    key={i}
                    cx={x(i)}
                    cy={y(Number(d[s.key]) || 0)}
                    r={3}
                    fill={s.cor}
                  />
                ))}
              {/* rótulo direto no último ponto */}
              <text
                x={Math.min(x(n - 1) + 6, W - padR)}
                y={y(Number(last[s.key]) || 0) - 6}
                textAnchor={n === 1 ? "middle" : "end"}
                fontSize={11}
                fontWeight={600}
                fill={s.cor}
              >
                {format(Number(last[s.key]) || 0)}
              </text>
            </g>
          );
        })}

        {/* crosshair do hover */}
        {hover != null && (
          <line
            x1={x(hover)}
            x2={x(hover)}
            y1={padT}
            y2={padT + innerH}
            stroke={COR.eixo}
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        )}

        {/* camada de captura do mouse */}
        <rect
          x={padL}
          y={padT}
          width={innerW}
          height={innerH}
          fill="transparent"
          onMouseLeave={() => setHover(null)}
          onMouseMove={(e) => {
            const rect = (e.target as SVGRectElement).getBoundingClientRect();
            const frac = (e.clientX - rect.left) / rect.width;
            const idx = Math.round(frac * (n - 1));
            setHover(Math.max(0, Math.min(n - 1, idx)));
          }}
        />
      </svg>

      {/* tooltip */}
      {hover != null && (
        <div
          className="pointer-events-none absolute top-0 rounded-lg bg-tinta px-3 py-2 text-xs shadow-lg ring-1 ring-marfim/10"
          style={{
            left: `${(x(hover) / W) * 100}%`,
            transform:
              x(hover) > W / 2 ? "translateX(-105%)" : "translateX(5%)",
          }}
        >
          <p className="mb-1 font-medium text-marfim">{diaCurto(data[hover].dia)}</p>
          {series.map((s) => (
            <p key={s.key} className="flex items-center gap-1.5 text-nevoa">
              <span
                className="inline-block h-2 w-2 rounded-sm"
                style={{ background: s.cor }}
              />
              {s.label}: <span className="text-marfim">{formatFull(Number(data[hover][s.key]) || 0)}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
