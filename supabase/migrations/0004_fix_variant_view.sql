-- ============================================================
-- 0004 — corrige pg_funnel_by_variant
-- ============================================================
-- Bug encontrado ao validar com dados reais: a view agrupava por variant/path
-- de CADA EVENTO. Como nem todo evento carrega esses campos (option_select não
-- manda path, o primeiro screen_view ainda não tem bifurcação), a MESMA sessão
-- aparecia em várias linhas — uma como "a/solteira", outra como
-- "a/desconhecido", outra como "desconhecida/desconhecido". Uma sessão virava
-- três, e a taxa de conversão por variante ficava diluída e sem sentido.
--
-- Correção: agrupar por pg_sessions, que já tem UMA linha por sessão com
-- path/variant resolvidos pelo merge do pg_upsert_session.

create or replace view pg_funnel_by_variant as
select
  coalesce(variant, 'desconhecida')      as variant,
  coalesce(path, 'desconhecido')         as path,
  count(*)                               as sessoes,
  count(*) filter (where completed)      as completaram,
  count(*) filter (where checkout_click) as foram_checkout
from pg_sessions
group by 1, 2
order by sessoes desc;

-- CREATE OR REPLACE pode não preservar as travas da 0002 — reaplicar sempre.
alter view pg_funnel_by_variant set (security_invoker = true);
revoke all on pg_funnel_by_variant from anon, authenticated;
