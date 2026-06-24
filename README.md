# Puro Gozo · Quiz Funnel

Funil de quiz interativo de 20 telas (sexologia feminina / libertação do desejo) da Andreia Fiamoncini. Termina numa página de venda a R$47 com checkout Hotmart. Mobile-first.

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
│  ├─ layout.tsx       # fontes Playfair Display + Jost
│  └─ page.tsx         # lê variante A/B (server) e monta o quiz
├─ proxy.ts            # A/B testing server-side (Next 16: middleware→proxy)
├─ lib/
│  ├─ screens.ts       # ✏️ TODA A COPY DAS 20 TELAS (edite aqui)
│  ├─ types.ts         # tipos do funil
│  ├─ store.ts         # estado Zustand (respostas, caminho, perfil, lead)
│  ├─ config.ts        # ✏️ checkout, analytics, preço da oferta, flags
│  ├─ ab.ts            # ✏️ variantes A/B de copy
│  ├─ tracking.ts      # UTMs + eventos de analytics + checkout
│  └─ motion.ts        # variantes de animação + reduced-motion
└─ components/quiz/
   ├─ QuizFlow.tsx     # controlador (transições, fundo, medidor, lead)
   ├─ ReservoirMeter.tsx  # o medidor-represa (a espinha)
   ├─ LeadCapture.tsx  # captura de lead pós-resultado
   └─ screens/         # 1 componente por tipo de tela
```

## Como editar a copy

Toda a copy vive em **`src/lib/screens.ts`** — não precisa tocar nos componentes.
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

Distribuição estável por sessão via **`src/proxy.ts`** (cookie `pg_ab`, propagado por header pra evitar flash de hidratação). Variantes testadas em `src/lib/ab.ts`:
- **T1** — headline da landing (`landingHeadline`)
- **T19** — CTA do resultado (`resultCta`)

Forçar variante em qualquer ambiente: `?v=a` ou `?v=b`. Adicione novas variantes no objeto `AB` e leia-as onde quiser via a prop `variant`.

## Captura de lead

Overlay no pico de investimento (logo após o resultado, antes da venda). Campos mínimos (e-mail + WhatsApp opcional), validação suave, opção de pular. Desligue com `NEXT_PUBLIC_LEAD_CAPTURE=off`.

## Preview / QA

- Pular pra qualquer tela: `?screen=N` (ex.: `/?screen=12`)
- Recomeçar a jornada: `?reset=1`
- Forçar caminho: responda a T3, ou edite o store.

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
