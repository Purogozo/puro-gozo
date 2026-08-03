-- ============================================================
-- 0007 — respostas mais escolhidas por tela
-- ============================================================
-- O funil diz ONDE a pessoa sai. Isto diz O QUE ela responde antes de sair —
-- é o que orienta copy, oferta e criativo (ex.: se 70% respondem "faz anos",
-- o anúncio fala com quem já desistiu, não com quem está morna).
--
-- A view pg_answers da 0001 já fazia quase isso, mas com três buracos que
-- tornavam a leitura errada:
--
--   1. Não filtra período. O dashboard tem filtro de data desde a 0006.
--   2. Ignora a T17, que é múltipla escolha: ali as opções vão no jsonb
--      `options` (array), e a coluna `option` fica NULL. A tela inteira sumia.
--   3. Não separa por caminho. A T10 tem a opção "evito" nos DOIS caminhos
--      com significados diferentes ("invento desculpa pra não transar" no A,
--      "evito até sozinha" no B). Somar os dois inventa uma resposta que não
--      existe. O mesmo vale para "culpa" (T9/T10) e "viva" (T16).
--
-- Convenção de tempo e travas de acesso: iguais às da 0006.

-- ── Caminho a partir da resposta da T3 ──────────────────────
-- Espelha `pathFromStatus` em src/lib/screens.ts — mantenha os dois iguais.
--
-- Por que não usar pg_sessions.path: aquela coluna está furada. O primeiro
-- screen_view (T1) já manda um caminho, mas nessa altura a T3 ainda não foi
-- respondida e o cliente cai no padrão "B"; como o pg_upsert_session guarda o
-- PRIMEIRO valor não-nulo, a sessão inteira fica marcada como B. Medido em
-- produção: 999 de 1000 sessões como "B", enquanto as respostas da T3 mostram
-- maioria casada/relacionamento (= caminho A). A 0008 corrige a coluna; aqui
-- derivamos da resposta, que é a fonte da verdade e vale também pro histórico.
create or replace function pg_path_from_status(p_status text)
returns text
language sql
immutable
as $$
  select case when p_status in ('casada', 'relacionamento') then 'A' else 'B' end;
$$;

-- ── Respostas por tela, no período ──────────────────────────
-- Uma linha por (tela × caminho × opção).
--
-- `sessoes`    = sessões DISTINTAS que ficaram com aquela opção.
-- `total_tela` = sessões distintas que responderam aquela tela naquele caminho.
--                É o denominador honesto: na múltipla escolha a soma das opções
--                passa de 100%, e dividir uma pela outra daria número errado.
--
-- Vale a ÚLTIMA resposta de cada sessão em cada tela, não todo toque.
-- A T10 e a T17 confirmam com botão, então trocar de ideia antes de continuar
-- grava dois option_select. Contando todos, a T10 somava 118% num radio button
-- — número que só faz o leitor duvidar do dashboard. A última é também a que o
-- quiz guarda como resposta e a que define caminho e perfil.
create or replace function pg_answers_range(p_from timestamptz, p_to timestamptz)
returns table (
  screen     int,
  caminho    text,
  opcao      text,
  sessoes    bigint,
  total_tela bigint
)
language sql
stable
as $$
  with ultima as (
    select distinct on (e.session_id, e.screen)
      e.session_id, e.screen as tela, e.option as opcao, e.options as marcadas
    from pg_events e
    where e.event = 'option_select'
      and not e.is_preview
      and e.screen is not null
      and (e.option is not null or jsonb_typeof(e.options) = 'array')
      and e.created_at >= p_from and e.created_at < p_to
    order by e.session_id, e.screen, e.created_at desc
  ),
  escolhas as (
    -- seleção única: uma opção por resposta
    select u.session_id, u.tela, u.opcao
    from ultima u
    where u.opcao is not null
    union all
    -- múltipla escolha (T17): o array jsonb vira uma linha por opção marcada
    select u.session_id, u.tela, marcada.valor
    from ultima u
    cross join lateral jsonb_array_elements_text(u.marcadas) as marcada(valor)
    where jsonb_typeof(u.marcadas) = 'array'
  ),
  -- Caminho de cada sessão pela resposta da T3. A última vale: se a pessoa
  -- voltou e trocou o estado civil, o quiz passou a mostrar o outro caminho.
  -- Sem filtro de período de propósito — a T3 pode ter sido respondida antes
  -- do início do intervalo numa sessão que continuou dentro dele.
  caminhos as (
    select distinct on (e.session_id)
      e.session_id,
      pg_path_from_status(e.option) as caminho
    from pg_events e
    where e.event = 'option_select'
      and e.screen = 3
      and e.option is not null
      and not e.is_preview
    order by e.session_id, e.created_at desc
  ),
  com_caminho as (
    select c.tela, coalesce(p.caminho, 'desconhecido') as caminho,
           c.opcao, c.session_id
    from escolhas c
    left join caminhos p on p.session_id = c.session_id
  ),
  -- Denominador por (tela × caminho), calculado antes de quebrar por opção.
  totais as (
    select x.tela, x.caminho, count(distinct x.session_id) as total
    from com_caminho x
    group by 1, 2
  )
  select
    x.tela,
    x.caminho,
    x.opcao,
    count(distinct x.session_id),
    t.total
  from com_caminho x
  join totais t on t.tela = x.tela and t.caminho = x.caminho
  group by x.tela, x.caminho, x.opcao, t.total
  order by x.tela, x.caminho, 4 desc;
$$;

-- ── Travas de acesso: só service_role executa ───────────────
revoke all on function pg_path_from_status(text)
  from public, anon, authenticated;
grant execute on function pg_path_from_status(text) to service_role;

revoke all on function pg_answers_range(timestamptz, timestamptz)
  from public, anon, authenticated;
grant execute on function pg_answers_range(timestamptz, timestamptz) to service_role;
