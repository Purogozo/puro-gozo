-- ============================================================
-- PURO GOZO · Dashboard de funil + vendas
-- 0001_init — tabelas, RLS e views de leitura
-- ============================================================
-- Escrita SÓ via chave secreta (server-side), que ignora RLS.
-- RLS ligada e SEM policy = ninguém com chave publishable lê ou escreve.

-- ── Eventos crus do funil (navegador → /api/analytics) ──────
create table if not exists pg_events (
  id           bigserial primary key,
  created_at   timestamptz not null default now(),
  client_ts    timestamptz,
  session_id   uuid not null,
  visitor_id   uuid,
  event        text not null,
  screen       int,
  screen_type  text,
  path         text,
  profile      text,
  variant      text,
  option       text,
  options      jsonb,
  utm          jsonb,
  user_agent   text,
  is_preview   boolean not null default false
);

create index if not exists pg_events_session_idx on pg_events (session_id);
create index if not exists pg_events_created_idx on pg_events (created_at desc);
create index if not exists pg_events_screen_idx  on pg_events (event, screen);

-- Sem índice único em (session_id, screen): um reload repete o screen_view,
-- mas as views contam DISTINCT session_id, então o funil não infla. Preferimos
-- isso a um índice único que faria a rota de ingestão dar erro em duplicata.

-- ── Uma linha por execução do quiz ──────────────────────────
create table if not exists pg_sessions (
  session_id     uuid primary key,
  visitor_id     uuid,
  started_at     timestamptz not null default now(),
  last_seen_at   timestamptz not null default now(),
  max_screen     int not null default 1,
  path           text,
  profile        text,
  variant        text,
  utm            jsonb,
  completed      boolean not null default false,
  checkout_click boolean not null default false
);

create index if not exists pg_sessions_started_idx on pg_sessions (started_at desc);

-- ── Vendas (webhook Hotmart) ────────────────────────────────
create table if not exists pg_purchases (
  transaction  text primary key,
  created_at   timestamptz not null default now(),
  event_type   text,
  status       text,
  value        numeric,
  currency     text,
  session_id   uuid,
  path         text,
  profile      text,
  variant      text,
  raw          jsonb
);

create index if not exists pg_purchases_created_idx on pg_purchases (created_at desc);
create index if not exists pg_purchases_session_idx on pg_purchases (session_id);

-- ── Blindagem de acesso ─────────────────────────────────────
alter table pg_events    enable row level security;
alter table pg_sessions  enable row level security;
alter table pg_purchases enable row level security;

revoke all on pg_events, pg_sessions, pg_purchases from anon, authenticated;

-- ============================================================
-- VIEWS DE LEITURA
-- ============================================================

-- Funil tela a tela: quantas sessões distintas chegaram em cada tela
create or replace view pg_funnel_screens as
with base as (
  select screen, count(distinct session_id) as sessoes
  from pg_events
  where event = 'screen_view' and not is_preview and screen is not null
  group by screen
)
select
  screen,
  sessoes,
  round(100.0 * sessoes
        / nullif(first_value(sessoes) over (order by screen), 0), 1) as pct_do_inicio,
  lag(sessoes) over (order by screen) as sessoes_tela_anterior,
  round(100.0 * (lag(sessoes) over (order by screen) - sessoes)
        / nullif(lag(sessoes) over (order by screen), 0), 1) as queda_pct
from base
order by screen;

-- Funil por variante A/B e por perfil
create or replace view pg_funnel_by_variant as
select
  coalesce(variant, 'desconhecida') as variant,
  coalesce(path, 'desconhecido')    as path,
  count(distinct session_id)                                          as sessoes,
  count(distinct session_id) filter (where event = 'quiz_complete')   as completaram,
  count(distinct session_id) filter (where event = 'checkout_redirect') as foram_checkout
from pg_events
where not is_preview
group by 1, 2
order by sessoes desc;

-- Distribuição de respostas por pergunta
create or replace view pg_answers as
select
  screen,
  option as resposta,
  count(*)                   as respostas,
  count(distinct session_id) as sessoes
from pg_events
where event = 'option_select' and not is_preview and option is not null
group by screen, option
order by screen, respostas desc;

-- Vendas por dia
create or replace view pg_sales_daily as
select
  (created_at at time zone 'America/Sao_Paulo')::date as dia,
  count(*)   as vendas,
  sum(value) as receita
from pg_purchases
where event_type in ('PURCHASE_APPROVED', 'PURCHASE_COMPLETE')
group by 1
order by dia desc;

-- KPIs do topo do dashboard
create or replace view pg_overview as
select
  (select count(*) from pg_sessions)                            as sessoes,
  (select count(*) from pg_sessions where completed)            as completaram_quiz,
  (select count(*) from pg_sessions where checkout_click)       as clicaram_checkout,
  (select count(*) from pg_purchases
     where event_type in ('PURCHASE_APPROVED','PURCHASE_COMPLETE')) as vendas,
  (select coalesce(sum(value), 0) from pg_purchases
     where event_type in ('PURCHASE_APPROVED','PURCHASE_COMPLETE')) as receita;
