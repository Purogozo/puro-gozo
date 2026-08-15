# Puro Gozo · dois funis num app só

| Rota | O que é | Preço | Checkout |
| --- | --- | --- | --- |
| `/` | **Página de vendas** long-form, 14 seções, texto puro | R$ 97 | `R106650092U?off=jqxrq4se` |
| `/quiz` | **Funil de quiz** de 20 telas | R$ 47 | `R106650092U` |

⚠️ **Mudou em 14/08/2026.** O quiz ficava na raiz; a página de vendas assumiu o
`/` e o quiz foi pra `/quiz`. **Todo anúncio que apontava pra raiz precisa
apontar pra `/quiz`** — senão o tráfego do quiz cai na página de vendas e o
funil morre em silêncio. Isso vale também para `?screen=N` e `?reset=1`, que
agora são `/quiz?screen=N` e `/quiz?reset=1`.

⚠️ **Mesmo produto na Hotmart, ofertas diferentes.** O que separa R$ 97 de
R$ 47 é o parâmetro `off`. `withParams` (`src/lib/params.ts`) anexa as UTMs com
`searchParams.set`, que preserva a query da base — não trocar por concatenação
de string, ou a pessoa lê um preço e paga outro.

⚠️ **A exposição do domínio à análise da Meta aumentou.** Até agora a raiz era
o quiz, cujo HTML servido tinha só a T1. Agora a raiz é uma página SSR de texto
puro: a copy crua inteira vai no HTML e é lida por qualquer rastreador. Foi
exatamente esse tipo de sinal que classificou `purogozo.com` como "conteúdo
inadequado" em 07/2026 e obrigou a migração de domínio. Decidir conscientemente
antes de apontar campanha pra cá.

---

O funil de quiz: 20 telas interativas (sexologia feminina / libertação do
desejo) da Andreia Fiamoncini, terminando numa página de venda a R$ 47 com
checkout Hotmart. Mobile-first.

A tensão de design é proposital: **copy crua, marca sofisticada**. O visual elegante baixa a vergonha pra liberar a verdade. Metáfora-espinha: **desejo = água represada** — vira o medidor de progresso e a recompensa visual do resultado.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** (design tokens em `src/app/globals.css`)
- **Framer Motion** (`motion`) — transições e cenas
- **Zustand** — estado + persistência em `localStorage`

## Rodar

```bash
npm install
cp .env.example .env.local   # preencha o CHECKOUT_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

## Estrutura

```
src/
├─ app/
│  ├─ globals.css      # design tokens da marca + animações (autoritativo)
│  ├─ layout.tsx       # fontes, Meta Pixel, metadata compartilhada
│  ├─ page.tsx         # ROTA / — monta as 14 seções da página de vendas
│  └─ quiz/page.tsx    # ROTA /quiz — lê variante A/B (server) e monta o quiz
├─ proxy.ts            # A/B testing server-side (matcher: /quiz)
├─ lib/
│  ├─ params.ts        # UTMs/click IDs + montagem de URL de checkout (comum)
│  ├─ meta-client.ts   # external_id, fbp, fbc, envio pra CAPI (comum)
│  ├─ config.ts        # ✏️ checkouts, preços por funil, Pixel, flags
│  │
│  │  ── quiz ──
│  ├─ screens.ts       # ✏️ TODA A COPY DAS 20 TELAS
│  ├─ ab.ts            # ✏️ variantes A/B da headline da T1
│  ├─ store.ts         # estado Zustand (respostas, caminho, perfil)
│  ├─ types.ts         # tipos do funil
│  ├─ tracking.ts      # eventos do quiz (Pixel + CAPI + Supabase)
│  ├─ motion.ts        # variantes de animação + reduced-motion
│  │
│  │  ── página de vendas ──
│  ├─ sales-copy.ts    # ✏️ TODA A COPY DAS 14 SEÇÕES
│  ├─ sales-tracking.ts# eventos da página (Pixel + CAPI, SEM Supabase)
│  └─ rich.tsx         # `*asteriscos*` → itálico dentro da copy
└─ components/
   ├─ quiz/            # QuizFlow, QuizRunner, ReservoirMeter, screens/
   └─ sales/           # Section, Cta, StickyBar, PageTracker, sections/
```

**Por que dois módulos de tracking.** A captura de UTMs (`params.ts`) e os
sinais de correspondência do Meta (`meta-client.ts`) são compartilhados — são
o mesmo visitante e o mesmo Pixel. O que difere é o vocabulário de eventos e,
principalmente, o destino: **só o quiz alimenta o Supabase**. As views do
dashboard montam o funil agrupando por tela com `lag()`, e evento vindo da
página de vendas entraria como ruído na contagem.

**Valor monetário é autoritativo no servidor.** O cliente manda só o rótulo do
funil (`quiz` | `vendas`); `api/meta/capi` traduz pra preço via `FUNNEL_VALUE`
(`config.ts`). Assim cada funil reporta o valor certo sem que ninguém consiga
injetar um número arbitrário no dataset.

## Como editar a copy

**Página de vendas (`/`)** — tudo em `src/lib/sales-copy.ts`, fonte única. Ênfase
em itálico se escreve com `*asteriscos*`. Fotos: `public/andreia-hero.jpg` (4:5),
`public/andreia-retrato.jpg` (quadrada) e `public/mockup-metodo.jpg` (3:4) —
trocar o arquivo basta, nada de código.

**Quiz (`/quiz`)** — toda a copy vive em **`src/lib/screens.ts`** — não precisa tocar nos componentes.
Cada tela tem `universal`, `A` e/ou `B` (caminho). O conteúdo de `A`/`B` sobrescreve
o `universal` campo a campo. Preço e itens da oferta (T20) ficam em `src/lib/config.ts` (`OFFER`).

## Jornada & personalização

- **Bifurcação A/B (caminho)** — derivada da **T3** (status). `Casada`/`Em relacionamento` → caminho **A**; `Solteira`/`Divorciada`/`Viúva` → caminho **B**. As telas 5,7,9,10,15,16,17 renderizam a variante; é uma condição por tela (não dois funis).
- **Perfil** — derivado da **T13**: `A Bem-Comportada` (Programação), `A que Aprendeu a se Calar` (Silêncio), `A que Saiu de Si` (Desconexão). Aparece no resultado e no topo da venda.

## Analytics

Eventos: `screen_view`, `option_select`, `quiz_complete`, `lead_capture`, `cta_click`, `checkout_redirect` — cada um com caminho, perfil, variante e UTMs.

Defina `NEXT_PUBLIC_ANALYTICS_ENDPOINT` (Supabase / Meta CAPI / etc.). Sem ele, os eventos vão pro `console` em dev. Envio via `navigator.sendBeacon`. Lógica em `src/lib/tracking.ts`.

## Checkout (Hotmart)

Defina `NEXT_PUBLIC_CHECKOUT_URL`. O redirect preserva **UTMs + click IDs** (`fbclid`, `gclid`, `ttclid`, `sck`, `src`…) capturados na landing, e injeta `xcod=<caminho>_<perfil>_<variante>` para segmentação. Lista de params em `TRACKED_PARAMS` (`config.ts`).

## A/B testing

Distribuição A/B/C estável por sessão via **`src/proxy.ts`** (cookie `pg_ab_v2`, propagado por header pra evitar flash de hidratação). O matcher é **`/quiz`** — o sorteio precisa acontecer no mesmo request que renderiza a T1.

Única variável em teste (`src/lib/ab.ts`): a **headline da T1** (`landingHeadline`), em 3 braços. O CTA da T19 saiu do teste e virou a constante `RESULT_CTA` — com 3 braços e 2 rótulos ele quebrava a leitura do teste da headline.

Forçar variante: `/quiz?v=a|b|c`.

## Captura de lead

Overlay no pico de investimento (logo após o resultado, antes da venda). Campos mínimos (e-mail + WhatsApp opcional), validação suave, opção de pular. Desligue com `NEXT_PUBLIC_LEAD_CAPTURE=off`.

## Preview / QA

- Pular pra qualquer tela: `/quiz?screen=N` (ex.: `/quiz?screen=12`)
- Recomeçar a jornada: `/quiz?reset=1`
- Forçar variante da headline: `/quiz?v=a|b|c`
- Forçar caminho: responda a T3, ou edite o store.

⚠️ Estes parâmetros só funcionam em `/quiz`. Na raiz eles são ignorados — é a
página de vendas.

## Assets a trocar (placeholders)

- **Foto da Andreia (T4)** — hoje é um monograma "AF". Coloque `public/andreia.jpg` e troque o bloco em `src/components/quiz/screens/LetterScreen.tsx`.
- **Prints de depoimentos (T11, T20)** — hoje são blocos com rosto borrado simulado. Substitua por imagens reais (rosto preservado) em `public/`.

## Acessibilidade

- `prefers-reduced-motion` respeitado (fades simples, sem parallax/ripple).
- Foco visível (borda rosé), navegação por teclado, contraste seguindo as regras do guia (nunca índigo sobre rosé/vinho).
- Áudio sempre opt-in (mudo por padrão), toggle persistente.

## Deploy (Vercel)

```bash
vercel
```
Defina as variáveis de ambiente (`NEXT_PUBLIC_CHECKOUT_URL`, `NEXT_PUBLIC_ANALYTICS_ENDPOINT`) no painel. O `proxy.ts` roda na edge automaticamente.
