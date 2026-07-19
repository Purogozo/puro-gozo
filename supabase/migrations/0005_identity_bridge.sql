-- ============================================================
-- 0005 — ponte de identidade
-- ============================================================
-- O Purchase vem do webhook da Hotmart, servidor-a-servidor: não há navegador
-- na requisição. Hoje ele sai SEM fbp, fbc, IP e user-agent — que estão entre
-- os sinais de maior peso na correspondência da Meta. Pior: usar o IP/UA da
-- requisição seria o IP da HOTMART, não da compradora.
--
-- Estas colunas guardam os sinais do navegador capturados durante o quiz. Na
-- hora da compra o webhook faz xcod → session_id → SELECT e reidrata o evento.
--
-- Também é requisito formal: a doc da Meta diz que action_source "website"
-- EXIGE event_source_url e client_user_agent.

alter table pg_sessions
  add column if not exists fbp         text,
  add column if not exists fbc         text,
  add column if not exists client_ip   text,
  add column if not exists user_agent  text,
  add column if not exists landing_url text;

-- ⚠️ Derruba a assinatura ANTIGA (9 args) ANTES de criar a nova (14 args).
-- Adicionar parâmetros com default cria uma SOBRECARGA, não substitui: as duas
-- passam a existir, e aí qualquer REVOKE/DROP sem lista de argumentos falha com
-- "function name is not unique" e derruba a migração inteira.
drop function if exists pg_upsert_session(
  uuid, uuid, int, text, text, text, jsonb, boolean, boolean
);

-- Recria a função com os novos campos, mantendo a semântica monotônica da 0003.
create or replace function pg_upsert_session(
  p_session_id  uuid,
  p_visitor_id  uuid    default null,
  p_screen      int     default null,
  p_path        text    default null,
  p_profile     text    default null,
  p_variant     text    default null,
  p_utm         jsonb   default null,
  p_completed   boolean default false,
  p_checkout    boolean default false,
  p_fbp         text    default null,
  p_fbc         text    default null,
  p_client_ip   text    default null,
  p_user_agent  text    default null,
  p_landing_url text    default null
) returns void
language plpgsql
as $$
begin
  insert into pg_sessions as s (
    session_id, visitor_id, max_screen, path, profile, variant,
    utm, completed, checkout_click,
    fbp, fbc, client_ip, user_agent, landing_url
  )
  values (
    p_session_id, p_visitor_id, coalesce(p_screen, 1), p_path, p_profile,
    p_variant, coalesce(p_utm, '{}'::jsonb),
    coalesce(p_completed, false), coalesce(p_checkout, false),
    p_fbp, p_fbc, p_client_ip, p_user_agent, p_landing_url
  )
  on conflict (session_id) do update set
    last_seen_at   = now(),
    max_screen     = greatest(s.max_screen, excluded.max_screen),
    visitor_id     = coalesce(s.visitor_id, excluded.visitor_id),
    path           = coalesce(s.path,       excluded.path),
    profile        = coalesce(s.profile,    excluded.profile),
    variant        = coalesce(s.variant,    excluded.variant),
    utm            = case when s.utm = '{}'::jsonb then excluded.utm else s.utm end,
    completed      = s.completed      or excluded.completed,
    checkout_click = s.checkout_click or excluded.checkout_click,
    -- Sinais de identidade: o PRIMEIRO valor não-nulo vence.
    -- O fbc nasce do fbclid do anúncio e não muda na sessão; o fbp idem.
    -- IP/UA: preferimos o do início da sessão, mais próximo do clique no anúncio.
    fbp            = coalesce(s.fbp,         excluded.fbp),
    fbc            = coalesce(s.fbc,         excluded.fbc),
    client_ip      = coalesce(s.client_ip,   excluded.client_ip),
    user_agent     = coalesce(s.user_agent,  excluded.user_agent),
    landing_url    = coalesce(s.landing_url, excluded.landing_url);
end
$$;

-- Assinatura explícita: sem ela o REVOKE falha se houver qualquer sobrecarga.
revoke all on function pg_upsert_session(
  uuid, uuid, int, text, text, text, jsonb, boolean, boolean,
  text, text, text, text, text
) from public, anon, authenticated;
