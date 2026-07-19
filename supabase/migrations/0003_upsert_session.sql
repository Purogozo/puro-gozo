-- ============================================================
-- 0003 — upsert de sessão com merge correto
-- ============================================================
-- Um upsert comum (PostgREST merge-duplicates) SOBRESCREVE a linha inteira.
-- Isso quebraria o funil: eventos chegam fora de ordem (sendBeacon não garante
-- ordem, e o keepalive do checkout pode chegar depois), então a tela 3 poderia
-- sobrescrever max_screen=19 e o completed=true viraria false.
-- Esta função faz o merge campo a campo, de forma monotônica e atômica.

create or replace function pg_upsert_session(
  p_session_id uuid,
  p_visitor_id uuid    default null,
  p_screen     int     default null,
  p_path       text    default null,
  p_profile    text    default null,
  p_variant    text    default null,
  p_utm        jsonb   default null,
  p_completed  boolean default false,
  p_checkout   boolean default false
) returns void
language plpgsql
as $$
begin
  insert into pg_sessions as s (
    session_id, visitor_id, max_screen, path, profile, variant,
    utm, completed, checkout_click
  )
  values (
    p_session_id, p_visitor_id, coalesce(p_screen, 1), p_path, p_profile,
    p_variant, coalesce(p_utm, '{}'::jsonb),
    coalesce(p_completed, false), coalesce(p_checkout, false)
  )
  on conflict (session_id) do update set
    last_seen_at   = now(),
    -- nunca regride: sempre a tela mais funda alcançada
    max_screen     = greatest(s.max_screen, excluded.max_screen),
    -- primeiro valor não-nulo vence (a bifurcação não muda no meio do quiz)
    visitor_id     = coalesce(s.visitor_id, excluded.visitor_id),
    path           = coalesce(s.path,       excluded.path),
    profile        = coalesce(s.profile,    excluded.profile),
    variant        = coalesce(s.variant,    excluded.variant),
    -- UTM da primeira visita é a que atribui a origem
    utm            = case when s.utm = '{}'::jsonb then excluded.utm else s.utm end,
    -- uma vez verdadeiro, sempre verdadeiro
    completed      = s.completed      or excluded.completed,
    checkout_click = s.checkout_click or excluded.checkout_click;
end
$$;

-- Funções nascem com EXECUTE pra PUBLIC — fechar.
revoke all on function pg_upsert_session from public, anon, authenticated;
