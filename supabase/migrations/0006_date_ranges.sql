-- ============================================================
-- 0006 — filtros de data + métricas de conversão / abandono
-- ============================================================
-- As views da 0001/0004 agregam o período INTEIRO. O dashboard passou a ter
-- filtro de data (hoje / 7 dias / mês / personalizado), então cada agregação
-- vira uma FUNÇÃO que recebe [p_from, p_to) — intervalo semiaberto (inclui o
-- início, exclui o fim).
--
-- Segurança (mesma postura das views travadas na 0002): SECURITY INVOKER
-- (padrão) + EXECUTE revogado de public/anon/authenticated e concedido só a
-- service_role — a chave secreta do servidor. A chave publishable não executa.
--
-- Convenção de tempo: os limites chegam já calculados em UTC pelo servidor
-- (referência America/Sao_Paulo, offset fixo -03:00 — o Brasil não usa horário
-- de verão desde 2019). Filtro por: pg_events.created_at, pg_sessions.started_at
-- e pg_purchases.created_at.

-- ── KPIs do topo + conversão/abandono/reembolso ─────────────
create or replace function pg_overview_range(p_from timestamptz, p_to timestamptz)
returns table (
  sessoes           bigint,
  completaram_quiz  bigint,
  clicaram_checkout bigint,
  vendas            bigint,
  receita           numeric,
  abandono_checkout bigint,
  reembolsos        bigint,
  reembolso_valor   numeric
)
language sql
stable
as $$
  with sess as (
    select session_id, completed, checkout_click
    from pg_sessions
    where started_at >= p_from and started_at < p_to
  )
  select
    (select count(*) from sess),
    (select count(*) from sess where completed),
    (select count(*) from sess where checkout_click),
    (select count(*) from pg_purchases
      where event_type in ('PURCHASE_APPROVED','PURCHASE_COMPLETE')
        and created_at >= p_from and created_at < p_to),
    (select coalesce(sum(value),0) from pg_purchases
      where event_type in ('PURCHASE_APPROVED','PURCHASE_COMPLETE')
        and created_at >= p_from and created_at < p_to),
    -- Abandono: sessão que CLICOU no checkout e da qual NENHUMA transação foi
    -- registrada (foi pro Hotmart e nada voltou). Compra reembolsada tem linha
    -- em pg_purchases, então não conta como abandono — entra no bloco de baixo.
    (select count(*) from sess s
      where s.checkout_click
        and not exists (
          select 1 from pg_purchases p where p.session_id = s.session_id
        )),
    (select count(*) from pg_purchases
      where event_type in ('PURCHASE_REFUNDED','PURCHASE_CHARGEBACK','PURCHASE_PROTEST')
        and created_at >= p_from and created_at < p_to),
    (select coalesce(sum(value),0) from pg_purchases
      where event_type in ('PURCHASE_REFUNDED','PURCHASE_CHARGEBACK','PURCHASE_PROTEST')
        and created_at >= p_from and created_at < p_to);
$$;

-- ── Funil tela a tela (mesma lógica da view pg_funnel_screens) ─
create or replace function pg_funnel_screens_range(p_from timestamptz, p_to timestamptz)
returns table (
  screen                int,
  sessoes               bigint,
  pct_do_inicio         numeric,
  sessoes_tela_anterior bigint,
  queda_pct             numeric
)
language sql
stable
as $$
  with base as (
    select screen, count(distinct session_id) as sessoes
    from pg_events
    where event = 'screen_view' and not is_preview and screen is not null
      and created_at >= p_from and created_at < p_to
    group by screen
  )
  select
    screen,
    sessoes,
    round(100.0 * sessoes
          / nullif(first_value(sessoes) over (order by screen), 0), 1),
    lag(sessoes) over (order by screen),
    round(100.0 * (lag(sessoes) over (order by screen) - sessoes)
          / nullif(lag(sessoes) over (order by screen), 0), 1)
  from base
  order by screen;
$$;

-- ── Funil por variante A/B e perfil (agrupa por pg_sessions, ver 0004) ─
create or replace function pg_funnel_by_variant_range(p_from timestamptz, p_to timestamptz)
returns table (
  variant       text,
  path          text,
  sessoes       bigint,
  completaram   bigint,
  foram_checkout bigint
)
language sql
stable
as $$
  select
    coalesce(variant, 'desconhecida'),
    coalesce(path, 'desconhecido'),
    count(*),
    count(*) filter (where completed),
    count(*) filter (where checkout_click)
  from pg_sessions
  where started_at >= p_from and started_at < p_to
  group by 1, 2
  order by 3 desc;
$$;

-- ── Vendas por dia (fuso Brasília, só pagamento efetivo) ─────
create or replace function pg_sales_daily_range(p_from timestamptz, p_to timestamptz)
returns table (
  dia     date,
  vendas  bigint,
  receita numeric
)
language sql
stable
as $$
  select
    (created_at at time zone 'America/Sao_Paulo')::date,
    count(*),
    coalesce(sum(value),0)
  from pg_purchases
  where event_type in ('PURCHASE_APPROVED','PURCHASE_COMPLETE')
    and created_at >= p_from and created_at < p_to
  group by 1
  order by 1 desc;
$$;

-- ── Vendas por status da Hotmart (surfaça TUDO que o webhook grava) ─
-- Aprovado, completo, reembolso, chargeback, boleto impresso, PIX gerado,
-- expirado, saiu do carrinho… o que a Hotmart enviar aparece aqui.
create or replace function pg_purchases_by_status_range(p_from timestamptz, p_to timestamptz)
returns table (
  event_type text,
  quantidade bigint,
  valor      numeric
)
language sql
stable
as $$
  select
    coalesce(event_type, '(desconhecido)'),
    count(*),
    coalesce(sum(value),0)
  from pg_purchases
  where created_at >= p_from and created_at < p_to
  group by 1
  order by 2 desc;
$$;

-- ── Travas de acesso: só service_role executa ───────────────
do $$
declare fn text;
begin
  foreach fn in array array[
    'pg_overview_range',
    'pg_funnel_screens_range',
    'pg_funnel_by_variant_range',
    'pg_sales_daily_range',
    'pg_purchases_by_status_range'
  ] loop
    execute format(
      'revoke all on function %I(timestamptz, timestamptz) from public, anon, authenticated;', fn);
    execute format(
      'grant execute on function %I(timestamptz, timestamptz) to service_role;', fn);
  end loop;
end $$;
