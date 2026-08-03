-- ============================================================
-- 0008 — conserta pg_sessions.path
-- ============================================================
-- Bug encontrado ao montar a aba de respostas (0007). A coluna `path` estava
-- praticamente toda como "B": 999 de 1000 sessões. Não bate com a realidade —
-- as respostas da T3 mostram maioria casada/relacionamento, que é o caminho A.
--
-- Causa: no navegador o caminho é derivado da resposta da T3
-- (`pathFromStatus`), e essa função devolve "B" quando ainda não há resposta.
-- O primeiro screen_view sai na T1, quando a T3 nem apareceu — então o evento
-- já viajava com path="B". Como o pg_upsert_session guarda o PRIMEIRO valor
-- não-nulo (a bifurcação não muda no meio do quiz), a sessão inteira ficava
-- carimbada como B e o valor certo, que chegava depois, era descartado.
--
-- Correção em duas frentes:
--   • cliente (src/components/quiz/QuizRunner.tsx): só manda `path` depois que
--     a T3 foi respondida. Antes disso a bifurcação não existe, e null é a
--     resposta honesta — o merge do upsert preenche quando o valor chegar.
--   • aqui: recalcula o histórico a partir das respostas da T3 gravadas em
--     pg_events, que é a fonte da verdade e sempre esteve certa.
--
-- Quem saiu do quiz ANTES da T3 volta para NULL (aparece como "desconhecido"
-- no dashboard). É o número correto: essa pessoa nunca chegou a ter caminho.
-- Por isso a tabela "Variante × caminho" muda bastante depois desta migração —
-- ela estava contando como "sozinha" gente que nem tinha bifurcado.
--
-- Idempotente: pode rodar de novo sem efeito colateral.

with caminho_real as (
  select distinct on (e.session_id)
    e.session_id,
    pg_path_from_status(e.option) as path
  from pg_events e
  where e.event = 'option_select'
    and e.screen = 3
    and e.option is not null
    and not e.is_preview
  order by e.session_id, e.created_at desc
)
update pg_sessions s
set path = c.path
from caminho_real c
where s.session_id = c.session_id
  and s.path is distinct from c.path;

-- Sessão sem resposta da T3 não tem caminho: o que estiver lá foi carimbado
-- pelo padrão do cliente, não por uma escolha da pessoa.
update pg_sessions s
set path = null
where s.path is not null
  and not exists (
    select 1
    from pg_events e
    where e.session_id = s.session_id
      and e.event = 'option_select'
      and e.screen = 3
      and e.option is not null
      and not e.is_preview
  );
