// ============================================================
// PURO GOZO · Página de vendas /pg-vsl-a — COPY (v1.0, brief de 15/09/2026)
//
// FONTE ÚNICA DA COPY desta rota. Nenhum componente em components/pg-vsl-a
// inventa texto. A página / continua com a copy dela em sales-copy.ts —
// são duas páginas do mesmo produto, com preço e argumento diferentes.
//
// CONVENÇÃO DE ÊNFASE: `*trecho*` vira <em> (ver `rich()` em rich.tsx).
// Não use HTML aqui.
//
// Imagens: o nome em `img` aponta pra public/metodo/<img>.jpg. Geradas por
// IA (KIE · nano-banana) em 15/09/2026; as da Andreia são fotos reais.
// ============================================================

export const METODO = {
  marca: "Puro Gozo",

  // ── 0 · VSL (topo, acima do callout) ──────────────────────
  // Player VTurb (converteai) entregue pelo cliente em 16/09/2026. O `id` é
  // o do <vturb-smartplayer> e o `script` é o player.js do embed — os dois
  // vêm juntos do painel do VTurb; trocar um sem o outro quebra o player.
  vsl: {
    id: "ab-6aaac130985fc0e8082e6b4c",
    script:
      "https://scripts.converteai.net/5ed159d1-9e63-4c4a-854d-b572ca66f7db/ab-test/6aaac130985fc0e8082e6b4c/player.js",
    // Bloco de preço + botão logo abaixo do vídeo (pedido em 16/09/2026).
    // Os valores (âncora e parcela) vêm de `oferta`, pra nunca divergirem.
    // ⚠️ Este botão vai DIRETO pro checkout mesmo estando acima da oferta —
    // exceção explícita do cliente à regra "acima da oferta = âncora".
    // Delay: tudo abaixo do vídeo (inclusive o preço/botão abaixo) só
    // aparece quando o vídeo passa deste ponto. 14:20 = 860s.
    delaySeconds: 14 * 60 + 20,
    // Headline ACIMA do player (pedido em 21/09/2026, do benchmark das
    // escaladas): promessa de identidade + relógio + reação dele. Duas
    // linhas por tipografia — `headline` é o h1, `subline` a frase de apoio.
    // NÃO tem delay: é a primeira coisa que ela lê.
    headline: "O seu tesão não morreu. Foi desligado.",
    subline:
      "Em 30 dias você religa ele e volta a ser você. E ele vai perceber antes de você contar.",
    eyebrow: "Somente agora",
    precoDe: "De",
    precoPor: "por 12x",
    cta: "Acesso imediato e vitalício",
  },

  // ── 1 · CALLOUT ───────────────────────────────────────────
  callout: {
    h1: "Até quando você vai continuar deitando, cedendo e contando os minutos pro seu marido terminar?",
    intro: "Você já ouviu a mesma coisa mil vezes:",
    conselhos: [
      "Compra uma lingerie, faz um clima.",
      "Marca um jantar romântico.",
      "Toma uma taça de vinho e relaxa.",
      "Conversa com ele.",
    ],
    meio: "É o que todo mundo repete. É o que você vê em todo lugar.",
    pergunta:
      "Mas deixa eu te fazer uma pergunta sincera: se fosse tão simples assim, por que você já tentou de tudo isso e *continua deitando torcendo pra ele desistir*?",
    img: { src: "hero", alt: "Mulher deitada de lado na cama, acordada, olhando pra janela enquanto o marido dorme" },
  },

  // ── 2 · AS CENAS DA DOR ───────────────────────────────────
  dor: {
    cenas: [
      {
        img: { src: "dor-1", alt: "Mulher deitada de costas na cama, acordada, com o marido dormindo ao lado" },
        texto:
          "Você vai dormir mais cedo de propósito, finge que já apagou, e reza pra ele não chegar perto. Todo santo dia.",
      },
      {
        img: { src: "dor-2", alt: "Mulher na cama levando a mão à testa" },
        texto:
          "Quando ele encosta em você, você já inventa uma dor de cabeça — porque a ideia de transar virou um peso.",
      },
      {
        img: { src: "dor-3", alt: "Casal deitado de costas um pro outro na cama" },
        texto:
          "O beijo virou selinho. Vocês viraram dois amigos que dividem a cama. E cada um acha que foi o outro que desistiu.",
      },
    ],
  },

  // ── 3 · A CULPA ───────────────────────────────────────────
  culpa: {
    abre: "E o pior: você dá o seu corpo, não sente nada, e sai da cama se sentindo um objeto — achando que o problema é você.",
    corpo:
      "Você cede pra ele parar de cobrar. Deixa acontecer. E fica com aquela pergunta calada, olhando pro teto:",
    pergunta:
      "“será que a nossa companhia não basta? por que virou obrigação minha, se eu não sinto nada em troca?”",
    img: { src: "culpa", alt: "Mulher sentada na beira da cama desarrumada, de manhã, olhando pras próprias mãos" },
  },

  // ── 4 · TUDO O QUE VOCÊ JÁ TENTOU ─────────────────────────
  tentou: {
    h2: "Você já:",
    itens: [
      "Comprou a lingerie que ficou na gaveta",
      "Marcou o jantar, foi pro motel — e não mudou nada",
      "Foi na ginecologista e ouviu pra “tomar uma taça de vinho e relaxar”",
      "Talvez até tentou testosterona, e só ganhou efeito colateral",
      "Assistiu vídeo escondida tentando entender o que tava errado",
    ],
    fecho: "E nada resolveu. Não porque você não se esforçou. *Porque ninguém mexeu no lugar certo.*",
    img: { src: "tentou", alt: "Criado-mudo com lingerie ainda com etiqueta, taça de vinho pela metade e cartela de comprimidos" },
  },

  // ── 5 · A VIRADA ──────────────────────────────────────────
  virada: {
    eyebrow: "Aqui está a verdade que ninguém teve coragem de te contar:",
    h2: "O seu tesão não morreu. Ele foi *desligado*.",
    paragrafos: [
      "Ele ainda aparece — num flash de memória, numa cena de novela, no chuveiro. Dura um segundo e some. O seu corpo continua produzindo essa faísca todo dia. O que mudou é que existe um momento, muito antes de ele te tocar, em que essa faísca é apagada antes de virar chama — e você nem percebe quando faz isso.",
      "Não é hormônio. Não é a idade. Não é falta de amor por ele. É esse ponto — e ninguém nunca te mostrou onde ele fica.",
    ],
    // O brief dizia "QUERO ENTENDER ISSO — assistir a apresentação". A VSL
    // existe (seção 0, topo), mas o botão segue a regra dos CTAs acima da
    // oferta e leva a #oferta. Se o cliente quiser que ele volte ao vídeo,
    // é trocar o `to` do <Cta> em Virada.tsx por uma âncora no topo.
    cta: "Quero entender isso",
    img: { src: "faisca", alt: "Rosto de mulher no chuveiro, olhos fechados, com um meio sorriso involuntário" },
  },

  // ── 6 · QUEM SOU EU (curta) ───────────────────────────────
  quemSou: {
    eyebrow: "Quem está falando com você",
    paragrafos: [
      "Meu nome é Andreia. Sou psicóloga e sexóloga, e há mais de dez anos eu cuido de mulheres exatamente como você — que perderam a vontade, que transam por obrigação, que se acham a exceção.",
      "E eu preciso te dizer uma coisa: eu passei por tudo isso que eu tô descrevendo. A vergonha de sentir. A dificuldade de falar. A sensação de que existia algo errado comigo. No consultório, vi de perto o tamanho disso — todas achando que eram a única, nenhuma era. Foi aí que eu mergulhei no que a ciência já descobriu sobre a sexualidade da mulher — e encontrei a explicação que muda tudo.",
    ],
    credencial: {
      nome: "Andreia Fiamoncini",
      titulo: "Psicóloga e Sexóloga",
      registro: "CRP 12/11076",
    },
  },

  // ── 7 · O MECANISMO ───────────────────────────────────────
  mecanismo: {
    h2: "Não é sobre o seu corpo ser complicado. A ciência estuda isso há décadas.",
    paragrafos: [
      "Existe um comportamento documentado em centenas de estudos: a mulher que, durante o sexo, assiste a própria cena de fora — a cabeça na louça, na barriga, em “quando isso vai acabar” — em vez de estar dentro do corpo, sentindo. Enquanto a cabeça foge, o corpo não responde. É um dos motivos mais bem estabelecidos de por que a mulher não sente, não chega, não deseja.",
      "E tem mais: talvez você acredite que primeiro vem a vontade, e só depois o sexo. Na mulher, quase sempre é o contrário — o desejo vem *depois* do estímulo certo, quando a cabeça permite. Por isso “não estar com vontade” quando ele te procura não é defeito seu. É o normal. O que ninguém te ensinou foi como acender esse desejo de propósito.",
    ],
    fecho:
      "Esse hábito de fugir, que trabalha contra o seu tesão vinte e quatro horas por dia, é o que eu chamo de *Ponto de Fuga*.",
    img: { src: "mecanismo", alt: "Mulher deitada com o marido abraçado a ela, olhos abertos e distantes" },
  },

  // ── 8 · O MÉTODO ──────────────────────────────────────────
  metodo: {
    abre: "E foi pra desfazer isso que eu criei o *Método Puro Gozo*.",
    corpo:
      "Não é dieta de sexo. Não é aula de posição. Não tem tarefa constrangedora, não tem cena pra reproduzir. É um caminho pra achar o seu Ponto de Fuga e religar o que foi desligado — em 3 passos.",
    cta: "Quero conhecer o método",
  },

  // ── 9 · MESMO QUE… ────────────────────────────────────────
  mesmoQue: {
    itens: [
      "Mesmo que você ache que nasceu sem isso…",
      "Mesmo que faça anos que você nem lembra o que é sentir tesão…",
      "Mesmo que você já tenha tentado de tudo e nada funcionou…",
      "Mesmo que você ache que é tarde demais ou “coisa da idade”…",
    ],
    fecho:
      "O Puro Gozo foi feito exatamente pra mulher que passou por tudo isso. Porque aqui dentro tem dez anos de consultório, o que a ciência já comprovou, e o que eu apliquei com mulheres reais que achavam que essa parte delas tinha acabado.",
  },

  // ── 10 · PROVA SOCIAL ─────────────────────────────────────
  // ⚠️ Relatos reais (os mesmos publicados na página /). Foto/vídeo de cada
  // depoimento ainda NÃO foram entregues — o componente marca o lugar e não
  // inventa rosto nem print. Não fabricar prova.
  prova: {
    h2: "Veja o que mulheres como você estão dizendo",
    depoimentos: [
      {
        destaque: "a vontade voltou, fiz sexo com meu marido e me senti inteira e desejada",
        texto:
          "Em menos de um mês a vontade voltou, fiz sexo com meu marido e me senti inteira e desejada. Fazia tempo que isso não acontecia.",
        nome: "Letícia",
        idade: 41,
      },
      {
        destaque: "o sexo, que era uma coisa chata, virou o melhor momento da semana",
        texto:
          "Eu achava que era a única. Descobrir que não era já mudou como eu chego na cama. Aprendi a falar sobre o que eu gosto na cama, conheci melhor os meus desejos, e o sexo, que era uma coisa chata, virou o melhor momento da semana.",
        nome: "Fernanda",
        idade: 37,
      },
      {
        destaque: "Tive meu primeiro orgasmo!",
        texto:
          "Parei de fingir que tava tudo bem, comprei o método e minha relação com o sexo mudou completamente. Tive meu primeiro orgasmo! A Andreia é incrível, muito profissional, e ensina algo que parece ser tão difícil de uma forma leve e divertida.",
        nome: "Camila",
        idade: 45,
      },
    ],
  },

  // ── 11 · POR QUE É DIFERENTE ──────────────────────────────
  diferente: {
    h2: "Por que o Puro Gozo é diferente de tudo que você já tentou",
    itens: [
      {
        n: "01",
        titulo: "Trata a causa, não o sintoma.",
        corpo:
          "Lingerie, jantar e remédio mexem no sintoma. O Puro Gozo mexe no Ponto de Fuga — a causa que faz o sexo virar obrigação. É por isso que funciona quando o resto não funcionou.",
      },
      {
        n: "02",
        titulo: "É baseado na ciência.",
        corpo:
          "Não é palpite sobre desejo feminino. É o que pesquisas sérias sobre sexualidade da mulher já mostraram — autoconhecimento, presença e a forma como a mente ativa (ou desliga) o desejo.",
      },
      {
        n: "03",
        titulo: "É no seu ritmo, sozinha, e ninguém precisa saber.",
        corpo:
          "Sem vaga de consultório, sem hora marcada, sem depender dele. No seu celular, no seu tempo, com total discrição.",
      },
      {
        n: "04",
        titulo: "Sem constrangimento.",
        corpo:
          "Não é aula de sexo, não tem cena pra imitar, não tem nada que te obrigue a nada.",
      },
    ],
  },

  // ── 12 · DENTRO DO PURO GOZO ──────────────────────────────
  dentro: {
    h2: "Dentro do Puro Gozo você vai ter",
    itens: [
      "O mapa das crenças que travam o seu tesão — de onde vieram e como desmontar",
      "Seu próprio corpo, finalmente conhecido por dentro — onde e como ele responde",
      "A técnica pra trazer a mente de volta pro corpo em segundos, toda vez que a cabeça fugir",
      "Como acender o desejo de propósito — com fantasia sem culpa e os pensamentos que ligam",
      "Como pedir o que você quer com uma frase curta, sem virar briga nem vergonha",
      "Como tirar a pressão do orgasmo — porque perseguir é o que faz ele fugir",
    ],
  },

  // ── 13 · EM 3 PASSOS ──────────────────────────────────────
  passos: {
    h2: "Em 3 passos, é isso que vai acontecer",
    itens: [
      {
        n: "Passo 1",
        verbo: "Descobrir",
        titulo: "onde você foge",
        corpo:
          "Você enxerga, pela primeira vez, quem plantou na sua cabeça que mulher direita não sente — e conhece o seu corpo por dentro. Para de se chamar de fria. A ficha cai: nunca foi você.",
        img: { src: "passo-1", alt: "Mulher se olhando no espelho do banheiro de manhã, com curiosidade" },
      },
      {
        n: "Passo 2",
        verbo: "Reacender",
        titulo: "o tesão",
        corpo:
          "Você aprende que o desejo vem depois do estímulo certo — e como ativar isso de propósito. A primeira faísca volta, fora da cama, no meio do dia. E você percebe: a chave só estava desligada.",
        img: { src: "passo-2", alt: "Mulher sozinha na cozinha à tarde, com um sorriso discreto" },
      },
      {
        n: "Passo 3",
        verbo: "Ficar",
        titulo: "até o fim",
        corpo:
          "Você aprende a permanecer no corpo, a dizer o que quer, e a tirar a pressão do orgasmo. O sexo deixa de ser uma prova pra passar e vira uma coisa que você vive.",
        img: { src: "passo-3", alt: "Casal com as testas encostadas, ela olhando pra ele, presente" },
      },
    ],
    cta: "Quero começar essa jornada",
  },

  // ── 14 · É PRA VOCÊ SE ────────────────────────────────────
  praVoce: {
    h2: "O Puro Gozo é pra você se:",
    itens: [
      "Você já tentou de tudo e continua deitando, cedendo e esperando terminar",
      "O sexo com o seu marido virou obrigação, e você se sente um objeto",
      "Vocês foram virando dois amigos que dividem a cama",
      "Você quer voltar a sentir vontade — por você, não pra agradar ninguém",
    ],
  },

  // ── 15 · BÔNUS ────────────────────────────────────────────
  bonus: {
    h2: "E você ainda leva, de presente",
    itens: [
      {
        n: "Bônus 1",
        nome: "O Mapa do Seu Prazer",
        valor: "R$ 97",
        corpo:
          "Antes de qualquer aula, um diagnóstico rápido te diz, no primeiro dia, onde o SEU tesão trava: se é na cabeça durante o dia, no toque, na hora que ele te procura, ou no ressentimento. Você começa indo direto no ponto certo — em vez de perder mais um ano no escuro.",
        img: { src: "bonus-1", alt: "" },
      },
      {
        n: "Bônus 2",
        nome: "O Na Hora H",
        valor: "R$ 67",
        corpo:
          "Um guia pros momentos em que a cabeça foge no meio do sexo. O que fazer, o que dizer, e como voltar pro corpo em segundos, sem quebrar o clima.",
        img: { src: "bonus-2", alt: "" },
      },
      {
        n: "Bônus 3",
        nome: "A Comunidade Puro Gozo",
        valor: "R$ 36",
        corpo:
          "Porque você passou anos achando que era a única, e não é. Um lugar seguro pra falar o que você nunca falou com ninguém.",
        img: { src: "bonus-3", alt: "" },
      },
    ],
  },

  // ── 16 · STACK OFFER ──────────────────────────────────────
  oferta: {
    h2: "Entrando hoje, você recebe tudo isto:",
    itens: [
      { nome: "O Método Puro Gozo completo", detalhe: "3 passos · 6 pilares · +30 aulas", valor: "R$ 497" },
      { nome: "Bônus 1 — O Mapa do Seu Prazer", detalhe: "", valor: "R$ 97" },
      { nome: "Bônus 2 — O Na Hora H", detalhe: "", valor: "R$ 67" },
      { nome: "Bônus 3 — A Comunidade Puro Gozo", detalhe: "", valor: "R$ 36" },
    ],
    deRotulo: "De:",
    de: "R$ 697",
    porRotulo: "Por apenas…",
    parcelas: "12x de",
    parcela: "R$ 30,72",
    avista: "ou R$ 297 à vista",
    comparacao: "Menos que uma sessão de terapia de casal. Menos que um jantar num restaurante.",
    cta: "Quero meu acesso agora",
    selos: ["🔒 Pagamento 100% seguro", "⚡ Acesso imediato", "🤫 Cobrança discreta"],
  },

  // ── 17 · BIO COMPLETA ─────────────────────────────────────
  bio: {
    eyebrow: "Quem criou o método",
    paragrafos: [
      "Sou psicóloga, especialista em sexualidade, há mais de dez anos cuidando de mulheres com queixa de desejo, prazer, orgasmo, corpo e relação. Criei o Puro Gozo pra colocar tudo o que eu ensino no consultório num lugar onde qualquer mulher pudesse ter acesso — sem depender de uma vaga comigo, sem o valor de uma consulta, no seu ritmo.",
    ],
    fecho:
      "Meu objetivo é simples: te mostrar que essa parte da sua vida não acabou — e que dá pra voltar a sentir.",
    credencial: [
      "Andreia Fiamoncini · Psicóloga e Sexóloga · CRP 12/11076",
      "Mestre em Psicologia pela UFSC",
      "Especialista em Sexualidade pela Faculdade de Medicina do ABC/SP",
    ],
    cta: "Quero voltar a sentir",
  },

  // ── 18 · GARANTIA ─────────────────────────────────────────
  garantia: {
    h2: "A garantia — o risco é meu",
    sete: {
      selo: "7 dias",
      titulo: "7 dias, risco zero.",
      texto:
        "Entrou, não gostou por qualquer motivo, pede nos primeiros 7 dias e devolvo cada centavo, sem pergunta.",
    },
    trinta: {
      selo: "30 dias",
      titulo: "E o risco maior é meu.",
      texto:
        "Eu não vou te prometer que você vai gozar em 7 dias — isso é conversa de picareta, e você já ouviu mentira demais sobre isso. Eu prometo diferente: começa o método. Se em 30 dias você não sentir mudança nenhuma no seu desejo, na sua relação, no seu prazer, me manda uma mensagem e eu devolvo tudo. Porque se depois de um mês comigo você ainda acredita que o problema é você, é porque eu falhei — e eu não cobro por trabalho que não entreguei.",
    },
    fecho:
      "O risco de verdade não é esse valor. É deixar passar mais um ano da sua vida achando que essa parte de você acabou.",
  },

  // ── 19 · FAQ ──────────────────────────────────────────────
  faq: {
    h2: "Perguntas que você provavelmente está se fazendo",
    itens: [
      {
        p: "Vai aparecer alguma coisa comprometedora na fatura do cartão?",
        // ⚠️ PENDENTE — confirmar com o cliente o nome que aparece na fatura
        // e, se couber, escrever aqui ("aparece como …").
        r: "Não. A cobrança é discreta e o acesso é totalmente privado.",
      },
      {
        p: "Alguém vai saber que eu comprei ou o que eu tô assistindo?",
        r: "Não. É só seu, no seu celular, no seu tempo. Ninguém precisa saber.",
      },
      {
        p: "Eu já tentei de tudo e nada resolveu. Por que agora ia ser diferente?",
        r: "Porque lingerie, “apimentar” e remédio tratam o lugar errado. O método mexe na causa que faz o sexo virar obrigação — a que ninguém te explicou.",
      },
      {
        p: "Tem alguma coisa constrangedora, tipo tarefa ou cena pra reproduzir?",
        r: "Não. Não é aula de sexo, não tem cena pra imitar, não tem nada que te obrigue a nada.",
      },
      {
        p: "Passei dos 45 / entrei na menopausa. Ainda funciona?",
        r: "Sim. A menopausa mexe no corpo, mas não é ela que desliga a sua vontade — o que desliga age muito antes, e não tem idade.",
      },
      {
        p: "Não sei nem por onde começar. Vou me perder?",
        r: "Não. No primeiro dia o Mapa do Seu Prazer já te diz onde é a sua fuga. Você começa sabendo onde mexer.",
      },
      {
        p: "Como e quando recebo o acesso? Por quanto tempo é meu?",
        r: "Na hora da compra, direto no seu e-mail e celular, pra assistir quando e quantas vezes quiser.",
      },
      {
        p: "E se eu comprar e sentir que não é pra mim?",
        r: "Você tem 7 dias pra pedir reembolso por qualquer motivo — e ainda a garantia de 30 dias.",
      },
    ],
    cta: "Quero meu acesso agora",
  },

  // ── 20 · OS DOIS CAMINHOS + FECHO ─────────────────────────
  doisCaminhos: {
    h2: "Agora você tem duas escolhas.",
    caminhos: [
      {
        rotulo: "A primeira",
        texto:
          "Fechar essa página e, semana que vem, deitar de novo torcendo pra ele não te procurar — e daqui a um ano estar no mesmo lugar, ou mais longe dele.",
      },
      {
        rotulo: "A segunda",
        texto:
          "Começar hoje, no seu ritmo, sem ninguém saber, e numa quarta-feira qualquer sentir aquele tesão subir de novo — dessa vez sabendo o que fazer com ele.",
      },
    ],
    fecho:
      "A diferença entre os dois caminhos não é o seu corpo. É você parar de deixar isso passar em silêncio. Eu confio no método que criei pra você.",
    cta: "Quero voltar a sentir tesão",
    ctaSub: "acesso imediato e no meu tempo",
    img: { src: "quarta", alt: "Mulher junto à janela aberta numa tarde comum, olhos fechados, sorrindo" },
  },

  // ── 21 · RODAPÉ ───────────────────────────────────────────
  rodape: {
    // ⚠️ PENDENTE — CNPJ e links reais (jurídico). Enquanto `cnpj` for null,
    // a linha não renderiza; links em "#" até as páginas existirem.
    cnpj: null as string | null,
    links: [
      { rotulo: "Termos de Uso", href: "#" },
      { rotulo: "Política de Privacidade", href: "#" },
      { rotulo: "Suporte", href: "#" },
    ],
    copyright: "© 2026 Andreia Fiamoncini · Psicóloga · CRP 12/11076 · Puro Gozo",
    avisos: [
      "Este conteúdo tem caráter educativo e informativo e não substitui acompanhamento psicológico, médico ou terapêutico individualizado.",
      "Resultados variam de mulher para mulher.",
    ],
  },

  // ── STICKY BAR ────────────────────────────────────────────
  sticky: {
    label: "Método Puro Gozo",
    de: "R$ 697",
    preco: "12x de R$ 30,72",
    garantia: "7 dias de garantia",
    cta: "Quero começar",
  },
} as const;
