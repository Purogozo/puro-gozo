-- ============================================================
-- 0002 — fecha o acesso público às views
-- ============================================================
-- Problema encontrado ao validar a 0001: as tabelas estavam protegidas por
-- RLS, mas as VIEWS não. No Postgres a view roda com a permissão do DONO
-- (security definer é o padrão), então ela lê a tabela por baixo da RLS.
-- Somado ao GRANT automático que o Supabase dá pra anon/authenticated em
-- objetos novos do schema public, a chave publishable conseguia ler
-- pg_overview (faturamento incluso). Verificado: HTTP 200 com dados.
--
-- Duas camadas de correção:
--   1. security_invoker: a view passa a rodar com a permissão de quem chama,
--      então a RLS da tabela vale também através dela.
--   2. revoke: tira o SELECT de anon/authenticated nas views.
-- A chave secreta (service_role) continua lendo tudo — ela ignora RLS.

alter view pg_funnel_screens    set (security_invoker = true);
alter view pg_funnel_by_variant set (security_invoker = true);
alter view pg_answers           set (security_invoker = true);
alter view pg_sales_daily       set (security_invoker = true);
alter view pg_overview          set (security_invoker = true);

revoke all on pg_funnel_screens, pg_funnel_by_variant, pg_answers,
              pg_sales_daily, pg_overview
  from anon, authenticated;

-- Objetos futuros neste schema já nascem fechados pros papéis públicos.
alter default privileges in schema public
  revoke all on tables from anon, authenticated;
