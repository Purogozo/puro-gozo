// ============================================================
// PURO GOZO · COPY DAS 20 TELAS  (fonte única, edite aqui)
// Use a copy EXATAMENTE como aprovada. Não suavizar.
// ============================================================
import type { Screen, ScreenContent, Path, Profile, ProfileInfo } from "./types";

export const PROFILES: Record<Profile, ProfileInfo> = {
  programacao: {
    key: "programacao",
    name: "A Bem-Comportada",
    camada: "Camada 1 · A Programação",
    diagnosis:
      "O que te prende é a programação que puseram em você antes de você poder discordar.",
  },
  silencio: {
    key: "silencio",
    name: "A que Aprendeu a se Calar",
    camada: "Camada 2 · O Silêncio",
    diagnosis:
      "Em algum momento você parou de pedir o que queria. Calar doía menos, e virou prisão.",
  },
  desconexao: {
    key: "desconexao",
    name: "A que Saiu de Si",
    camada: "Camada 3 · A Mulher do Outro Lado",
    diagnosis:
      "Você se fechou tanto que perdeu o contato com o próprio corpo. O caminho é voltar pra dentro.",
  },
};

export const SCREENS: Screen[] = [
  // ───────────────────────── T1 · LANDING ─────────────────────────
  {
    id: 1,
    type: "landing",
    meter: 0,
    intimate: true,
    universal: {
      eyebrow: "Avaliação · por uma sexóloga",
      headline:
        "Descubra o que apagou o seu desejo sexual e receba o método de uma sexóloga pra você voltar a sentir tesão de verdade.",
      subhead:
        "Uma avaliação de 2 minutos, criada por uma sexóloga, que identifica por que você perdeu a vontade de transar e te mostra o caminho pra voltar a sentir prazer de verdade, sozinha ou na cama com alguém.",
      cta: "COMEÇAR MINHA AVALIAÇÃO",
    },
  },

  // ───────────────────────── T2 · IDADE ─────────────────────────
  {
    id: 2,
    type: "single",
    meter: 0.05,
    universal: {
      eyebrow: "Sobre você",
      headline: "Qual a sua idade?",
      subhead:
        "Em cada fase da vida o desejo sexual some por um motivo diferente. Sua resposta diz onde o seu travou.",
      options: [
        {
          id: "29-",
          label: "Menos de 29 anos",
          echo: "Antes dos 29, o desejo raramente vem pronto, ele é aprendido. Dá pra começar certo.",
        },
        {
          id: "29-39",
          label: "Entre 29 e 39 anos",
          echo: "Entre 29 e 39, o desejo costuma travar no acúmulo: rotina, cobrança, cabeça cheia.",
        },
        {
          id: "40-49",
          label: "Entre 40 e 49 anos",
          echo: "Dos 40 aos 49 o desejo não morre, ele é silenciado. Faz sentido você estar aqui.",
        },
        {
          id: "50+",
          label: "50 anos ou mais",
          echo: "Aos 50+, ninguém te disse, mas o tesão não tem prazo de validade. Tem é camada por cima.",
        },
      ],
    },
  },

  // ──────────────────── T3 · STATUS / BIFURCAÇÃO ────────────────────
  {
    id: 3,
    type: "single",
    meter: 0.1,
    universal: {
      eyebrow: "Sua vida hoje",
      headline: "E hoje, como é a sua vida?",
      subhead:
        "Pergunto sem rodeio: o que mata o tesão de quem divide a cama todo dia é diferente do que mata o de quem dorme sozinha.",
      options: [
        { id: "casada", emoji: "💍", label: "Casada" },
        { id: "relacionamento", emoji: "❤️", label: "Em um relacionamento" },
        { id: "solteira", emoji: "🦋", label: "Solteira" },
        { id: "divorciada", emoji: "🌅", label: "Divorciada / separada" },
        { id: "viuva", emoji: "🕯️", label: "Viúva" },
      ],
    },
  },

  // ──────────────────── T4 · APRESENTAÇÃO ANDREIA ────────────────────
  {
    id: 4,
    type: "letter",
    meter: 0.16,
    intimate: true,
    universal: {
      eyebrow: "Quem te acompanha",
      headline: "Quem vai te mostrar como reacender a sua chama",
      body: [
        "Sou Andreia Fiamoncini, psicóloga e sexóloga. E eu já fiz o que muitas de vocês fazem: eu fingi.",
        "Fingi gozo. Inventei dor de cabeça, sono, cansaço pra não transar e sentia alívio. No fundo, achava que tinha algo errado comigo.",
        "Não tinha. Meu desejo nunca foi embora, só foi sendo coberto, camada por camada, por tudo que puseram na gente antes de a gente poder discordar.",
        "Quando comecei a tirar essas camadas, apareceu uma mulher que eu nunca tinha conhecido: que sente tesão, que pede, que goza sem pedir licença. E ela sempre esteve ali, embaixo de tudo.",
        "Isso é o Método das 3 Camadas. E é o que essa avaliação começa a fazer com você agora.",
      ],
      cta: "CONTINUAR",
    },
  },

  // ───────────────────────── T5 · OBJETIVO (bifurca) ─────────────────────────
  {
    id: 5,
    type: "single",
    meter: 0.22,
    bifurcates: true,
    A: {
      eyebrow: "Seu objetivo",
      headline:
        "Se você pudesse mudar uma coisa na sua vida sexual hoje, qual seria?",
      options: [
        {
          id: "tesao",
          emoji: "🔥",
          label: "Voltar a sentir tesão",
          sublabel: "faz tempo que não bate vontade nenhuma",
        },
        {
          id: "fingir",
          emoji: "🎭",
          label: "Parar de fingir orgasmo",
          sublabel: "quero gozar de verdade, não atuar",
        },
        {
          id: "automatico",
          emoji: "⏱️",
          label: "Sair do sexo no automático",
          sublabel: "transo de obrigação, contando os minutos pra acabar",
        },
        {
          id: "querer-ele",
          emoji: "💔",
          label: "Voltar a querer transar com ele",
          sublabel: "a gente virou colega de quarto, não transa mais",
        },
        {
          id: "tudo",
          emoji: "✨",
          label: "Tudo isso",
          sublabel: "quero me reencontrar inteira",
        },
      ],
    },
    B: {
      eyebrow: "Seu objetivo",
      headline:
        "Se você pudesse mudar uma coisa na sua relação com o sexo hoje, qual seria?",
      options: [
        {
          id: "tesao",
          emoji: "🔥",
          label: "Voltar a sentir tesão",
          sublabel: "uma vontade minha, sem depender de ninguém",
        },
        {
          id: "reconectar",
          emoji: "🪞",
          label: "Me reconectar com meu corpo",
          sublabel: "esqueci o que é sentir prazer",
        },
        {
          id: "medo",
          emoji: "😰",
          label: "Perder o medo de travar na cama quando aparecer alguém",
        },
        {
          id: "sozinha",
          emoji: "🙊",
          label: "Aprender a gozar sozinha, sem culpa",
        },
        {
          id: "reencontrar",
          emoji: "✨",
          label: "Me reencontrar primeiro, sozinha",
          sublabel: "antes de dividir com qualquer um",
        },
      ],
    },
  },

  // ───────────────────────── T6 · HÁ QUANTO TEMPO ─────────────────────────
  {
    id: 6,
    type: "single",
    meter: 0.28,
    universal: {
      eyebrow: "A resposta mais importante",
      headline:
        "Seja honesta: há quanto tempo você não sente tesão de verdade?",
      subhead: "Ninguém vai ver isso. É a resposta mais importante de todas.",
      options: [
        {
          id: "meses",
          emoji: "🌤️",
          label: "Há alguns meses",
          sublabel: "antes eu sentia, e sinto falta",
        },
        {
          id: "anos",
          emoji: "📅",
          label: "Há alguns anos",
          sublabel: "já nem lembro a última vez que tive vontade",
        },
        {
          id: "sempre",
          emoji: "🪨",
          label: "Desde sempre",
          sublabel: "eu nunca senti o tesão que dizem que eu deveria",
        },
        {
          id: "nao-sei",
          emoji: "🌫️",
          label: "Não sei dizer",
          sublabel: "foi sumindo tão devagar que eu só vi quando já tinha ido",
        },
      ],
    },
  },

  // ───────────────────── T7 · FREQUÊNCIA DO DESEJO (bifurca) ─────────────────────
  {
    id: 7,
    type: "single",
    meter: 0.34,
    bifurcates: true,
    universal: {
      eyebrow: "Seu desejo",
      microcopy:
        "🔒 Essa conversa é só sua. Suas respostas são privadas e não vão pra ninguém.",
      headline: "",
      options: [
        { id: "nenhuma", emoji: "🌑", label: "Nenhuma, sinceramente, vontade zero" },
        { id: "uma-duas", emoji: "🌒", label: "Uma ou duas, e me assustou ver como virou raro" },
        { id: "algumas", emoji: "🌓", label: "Algumas vezes, mas passa rápido, antes de virar qualquer coisa" },
        { id: "varias", emoji: "🌕", label: "Várias, o tesão vem, mas some na hora de transar" },
      ],
    },
    A: {
      headline:
        "No último mês, quantas vezes você realmente quis transar, sem ser pra cumprir tabela, sem ser pra ele parar de cobrar?",
      subhead: "Não a vontade que você finge. A que nasce sozinha, só sua.",
    },
    B: {
      headline:
        "No último mês, quantas vezes despertou uma vontade verdadeira, de transar, de se tocar, sem ninguém por perto pra provocar?",
      subhead: "Aquele tesão que sobe do nada, só seu.",
    },
  },

  // ───────────────────────── T8 · O QUE JÁ TENTOU ─────────────────────────
  {
    id: 8,
    type: "single",
    meter: 0.4,
    universal: {
      eyebrow: "O que te trouxe aqui",
      headline: "O que você já tentou pra fazer o tesão voltar?",
      subhead: "Não existe resposta errada. Só quero entender o que te trouxe até aqui.",
      options: [
        {
          id: "terapia",
          emoji: "🛋️",
          label: "Terapia",
          sublabel: "ajudou em tudo, menos na cama",
        },
        {
          id: "estudo",
          emoji: "📚",
          label: "Li, pesquisei, assisti vídeo",
          sublabel: "entendi a teoria, mas continuei sem sentir nada",
        },
        {
          id: "apimentar",
          emoji: "🍷",
          label: 'Vinho, lingerie, "apimentar"',
          sublabel: "fogo de uma noite que apaga no dia seguinte",
        },
        {
          id: "nada",
          emoji: "🤐",
          label: "Nada",
          sublabel: "eu nunca contei isso pra ninguém, nem pro médico",
        },
        {
          id: "tudo",
          emoji: "🧊",
          label: "Já tentei de tudo",
          sublabel: "e já tinha me conformado que sou fria mesmo",
        },
      ],
    },
  },

  // ─────────────────── T9 · PARA ONDE A CABEÇA VAI (bifurca) ───────────────────
  {
    id: 9,
    type: "single",
    meter: 0.46,
    bifurcates: true,
    A: {
      eyebrow: "Durante o sexo",
      headline: "Durante o sexo, o que vem em pensamento?",
      subhead:
        "A maioria das mulheres está com o corpo na cama e a cabeça a quilômetros. E é por aí que o prazer escapa.",
      options: [
        {
          id: "tarefas",
          emoji: "📋",
          label: "Pra louça, pras contas, pro que eu tenho que resolver amanhã",
        },
        {
          id: "corpo",
          emoji: "🪞",
          label: "Pro meu corpo, se a barriga tá aparecendo, se ele tá reparando",
        },
        {
          id: "acabar",
          emoji: "⏱️",
          label: "Pra quando vai acabar, eu só quero que termine logo",
        },
        {
          id: "finjo",
          emoji: "🎭",
          label: "Eu finjo que tô gostando, mas por dentro não tô ali",
        },
      ],
    },
    B: {
      eyebrow: "Quando você tenta sozinha",
      headline: "Quando você tenta se tocar, ou sentir tesão sozinha, o que acontece?",
      subhead:
        "Não é frescura nem frieza. É o que te ensinaram a sentir quando tenta. Me conta a verdade.",
      options: [
        {
          id: "culpa",
          emoji: "⛅",
          label: "A culpa vem antes do prazer, sinto que tô fazendo algo errado",
        },
        {
          id: "distraio",
          emoji: "🌬️",
          label: "Eu me distraio, perco a vontade no meio e desisto",
        },
        {
          id: "nem-tento",
          emoji: "🚪",
          label: "Eu nem tento mais, virou assunto encerrado",
        },
        {
          id: "sem-gozo",
          emoji: "🌊",
          label: "Eu até começo a sentir, mas não chego a gozo nenhum",
        },
      ],
    },
  },

  // ─────────────────────── T10 · A TELA DA VERDADE (bifurca) ───────────────────────
  {
    id: 10,
    type: "single",
    meter: 0.52,
    intimate: true,
    bifurcates: true,
    A: {
      eyebrow: "A verdade",
      headline:
        "A pergunta que ninguém tem coragem de te fazer: você finge orgasmo?",
      body: [
        "Geme, acelera, faz a cena toda pra ele achar que você gozou, e por dentro você desligou faz tempo, só esperando acabar.",
      ],
      safety: "Aqui ninguém te julga. Não existe resposta certa, só a sua verdade.",
      options: [
        {
          id: "quase-sempre",
          emoji: "🎭",
          label: "Quase toda vez, já nem sei mais como seria não fingir",
        },
        {
          id: "as-vezes",
          emoji: "🌗",
          label: "Às vezes, quando tô cansada, fingir é mais rápido que explicar",
        },
        {
          id: "medo",
          emoji: "😔",
          label: "Finjo há tanto tempo que tenho medo de nunca mais gozar de verdade",
        },
        {
          id: "evito",
          emoji: "🚪",
          label: "Nem isso, eu invento desculpa pra não transar",
        },
      ],
      reassurance:
        "Respira. Você não é a única, a maioria das mulheres já fingiu, e muitas fingem até hoje. Isso nunca foi frieza sua, nem defeito. Foi a saída que te ensinaram. E tem volta, eu vou te mostrar.",
    },
    B: {
      eyebrow: "A verdade",
      headline:
        "A pergunta que ninguém tem coragem de te fazer: você se toca?",
      body: [
        "Se dá prazer sozinha, goza por conta própria, sem culpa, sem aquela voz na cabeça dizendo que é feio, que é errado, que mulher direita não faz isso.",
      ],
      safety: "Aqui ninguém te julga. Não existe resposta certa, só a sua verdade.",
      options: [
        {
          id: "nunca",
          emoji: "🙈",
          label: "Nunca, aprendi que isso não era coisa pra mim",
        },
        {
          id: "culpa",
          emoji: "🌗",
          label: "Às vezes, mas vem sempre com um peso de culpa depois",
        },
        {
          id: "evito",
          emoji: "😔",
          label: "Evito até sozinha, é mais fácil não mexer nesse assunto",
        },
        {
          id: "faz-tempo",
          emoji: "🕯️",
          label: "Faz tanto tempo que eu nem sei mais se consigo gozar",
        },
      ],
      reassurance:
        "Respira. A maioria das mulheres carrega essa mesma culpa. Ela não nasceu em você, plantaram. E o que plantaram, dá pra arrancar.",
    },
  },

  // ───────────────────────── T11 · PROVA SOCIAL ─────────────────────────
  {
    id: 11,
    type: "social",
    meter: 0.58,
    bifurcates: true,
    universal: {
      eyebrow: "Mulheres como você",
      headline:
        "Enquanto você responde, leia o que mulheres como você descobriram aqui",
      body: [
        'Mulheres que achavam exatamente o que talvez você esteja achando agora: "eu sou fria, comigo não tem mais jeito."',
        "Milhares de mulheres já recuperaram o seu desejo e você também pode.",
      ],
      cta: "CONTINUAR",
    },
    A: {
      headline: "",
      options: [
        {
          id: "a1",
          label:
            "Voltei a sentir tesão pelo meu marido depois de 12 anos. Ele perguntou o que tinha mudado.",
        },
        {
          id: "a2",
          label:
            "Parei de fingir. Semana passada eu gozei de verdade, e chorei depois, de alívio.",
        },
      ],
    },
    B: {
      headline: "",
      options: [
        {
          id: "b1",
          label:
            "Aprendi a me dar prazer sem culpa. Cheguei inteira no relacionamento seguinte.",
        },
        {
          id: "b2",
          label:
            "Depois do divórcio achei que tinha acabado pra mim. Hoje eu sinto mais sozinha do que senti em 20 anos de casamento.",
        },
      ],
    },
  },

  // ──────────────────── T12 · REVELAÇÃO DO MECANISMO (pico) ────────────────────
  {
    id: 12,
    type: "mechanism",
    meter: 0.64,
    universal: {
      eyebrow: "A verdade que ninguém te contou",
      headline:
        "Você não é fria. Seu tesão não morreu, ele foi sufocado.",
      body: [
        "Tudo que você já tentou parte de uma mentira: a de que falta alguma coisa em você. Que você precisa aprender a sentir tesão, consertar o que está quebrado.",
        "Não falta nada em você. Sobra.",
      ],
      cta: "", // cta vem dos cards de reação
      options: [
        {
          id: "nunca-pensei",
          emoji: "💭",
          label: "Eu nunca tinha pensado assim, e faz sentido demais",
        },
        {
          id: "explica",
          emoji: "😮‍💨",
          label: "Isso explica coisas que eu nunca consegui explicar",
        },
      ],
    },
  },

  // ─────────────────── T13 · QUAL CAMADA TE PRENDE (perfil) ───────────────────
  {
    id: 13,
    type: "single",
    meter: 0.7,
    universal: {
      eyebrow: "A camada que mais aperta",
      headline: "Qual dessas frases foi plantada dentro de você?",
      subhead: "Escolha a que mais aperta.",
      options: [
        {
          id: "p1",
          emoji: "⛪",
          label: '"Mulher direita não sente tesão, quem sente é vulgar"',
          profile: "programacao",
        },
        {
          id: "p2",
          emoji: "👩‍👧",
          label: '"Sexo é obrigação de esposa. Você dá, mesmo sem vontade"',
          profile: "programacao",
        },
        {
          id: "p3",
          emoji: "🙈",
          label: '"Prazer é coisa pra homem. O seu não importa"',
          profile: "programacao",
        },
        {
          id: "s1",
          emoji: "🤫",
          label:
            '"Em algum momento eu parei de pedir o que eu queria na cama. Calar doía menos"',
          profile: "silencio",
        },
        {
          id: "d1",
          emoji: "🪨",
          label:
            '"Eu me fechei tanto que hoje nem sei mais o que me dá tesão"',
          profile: "desconexao",
        },
      ],
    },
  },

  // ───────────────────────── T14 · DOR E CORPO ─────────────────────────
  {
    id: 14,
    type: "single",
    meter: 0.76,
    universal: {
      eyebrow: "Seu corpo hoje",
      headline: "E o seu corpo, como ele responde quando o sexo chega?",
      subhead:
        "Seu corpo não te traiu. Ele só aprendeu a se proteger do que ensinaram pra ele. Me conta como ele está hoje.",
      options: [
        {
          id: "resseca",
          emoji: "🌵",
          label: 'Fecha, resseca, dói, meu corpo diz "não" antes de eu decidir',
        },
        {
          id: "arde",
          emoji: "😬",
          label: "Arde ou aperta na hora H, e isso me faz fugir do sexo",
        },
        {
          id: "vazio",
          emoji: "🔇",
          label: "Não dói, mas também não sinto nada. É um vazio",
        },
        {
          id: "sem-orgasmo",
          emoji: "🌊",
          label: "Eu até fico excitada, mas o gozo nunca chega",
        },
      ],
    },
  },

  // ───────────────────────── T15 · A RELAÇÃO (bifurca) ─────────────────────────
  {
    id: 15,
    type: "single",
    meter: 0.82,
    intimate: true,
    bifurcates: true,
    A: {
      eyebrow: "Entre vocês dois",
      headline: "Entre vocês dois, na cama, o que sobrou?",
      options: [
        {
          id: "nao-transa",
          emoji: "🛏️",
          label: "A gente não transa mais. Dorme de costas e finge que tá tudo bem",
        },
        {
          id: "obrigacao",
          emoji: "⏱️",
          label: "Transa de vez em quando, por obrigação, sem tesão nenhum",
        },
        {
          id: "estranhos",
          emoji: "🎭",
          label: "Por fora tá tudo bem. Mas na cama a gente virou dois estranhos",
        },
        {
          id: "medo",
          emoji: "💔",
          label: "Tenho medo de que ele procure em outra o que eu não dou mais",
        },
      ],
    },
    B: {
      eyebrow: "A ideia de recomeçar",
      headline: "E a ideia de transar com alguém de novo, o que mexe em você?",
      options: [
        {
          id: "pavor",
          emoji: "😰",
          label: "Tenho pavor de não sentir nada, de travar na hora",
        },
        {
          id: "fechei",
          emoji: "🚪",
          label: "Me fechei depois da última vez. Não quero me expor de novo",
        },
        {
          id: "desisti",
          emoji: "🌫️",
          label: "Nem penso nisso. Foi mais fácil desistir do sexo",
        },
        {
          id: "comigo",
          emoji: "🌅",
          label: "Quero resolver isso comigo antes de levar pra cama de alguém",
        },
      ],
    },
  },

  // ────────────────── T16 · A MULHER DO OUTRO LADO (bifurca opções) ──────────────────
  {
    id: 16,
    type: "single",
    meter: 0.87,
    warm: true,
    bifurcates: true,
    universal: {
      eyebrow: "Imagine por 3 segundos",
      headline:
        "Fecha os olhos por 3 segundos. Imagina você sentindo tesão de verdade, gozando sem fingir, pedindo o que quer sem vergonha. Quando abrir os olhos, o que muda primeiro na sua vida?",
    },
    A: {
      headline: "",
      options: [
        { id: "querer", emoji: "🔥", label: "Eu volto a querer transar e ele sente isso na hora" },
        { id: "provocar", emoji: "👀", label: "Eu paro de evitar e passo a provocar" },
        { id: "falar", emoji: "😈", label: "Eu falo o que eu quero na cama, sem vergonha" },
        { id: "gozar", emoji: "💃", label: "Eu gozo de verdade e não preciso mais fingir nada" },
        { id: "viva", emoji: "👑", label: "Eu me sinto mulher, desejada e viva de novo" },
      ],
    },
    B: {
      headline: "",
      options: [
        { id: "sozinha", emoji: "🔥", label: "Eu aprendo a gozar sozinha, sem culpa nenhuma" },
        { id: "sem-medo", emoji: "🦋", label: "Eu chego sem medo na cama da próxima pessoa" },
        { id: "sei", emoji: "😈", label: "Eu sei o que me dá tesão e não tenho vergonha de querer" },
        { id: "viva", emoji: "💃", label: "Eu me sinto mulher, viva no meu próprio corpo" },
        { id: "permissao", emoji: "👑", label: "Eu paro de esperar permissão pra sentir prazer" },
      ],
    },
  },

  // ──────────────────── T17 · O QUE ESTÁ EM JOGO (múltipla) ────────────────────
  {
    id: 17,
    type: "multi",
    meter: 0.91,
    bifurcates: true,
    universal: {
      eyebrow: "O que está em jogo",
      headline: "O que te trouxe até o fim dessa avaliação hoje?",
      subhead: "Pode marcar mais de uma. Seja sincera com você.",
      cta: "CONTINUAR",
    },
    A: {
      headline: "",
      options: [
        { id: "a1", label: "Não quero daqui a 10 anos ainda estar de costas na cama, sem transar" },
        { id: "a2", label: "Quero voltar a me sentir desejada e também desejar" },
        { id: "a3", label: "Tenho medo de perder meu casamento por causa do sexo" },
        { id: "a4", label: "Cansei de fingir orgasmo e fingir que tá tudo bem" },
        { id: "a5", label: "Quero sentir tesão e gozar de verdade, o que eu nunca tive" },
      ],
    },
    B: {
      headline: "",
      options: [
        { id: "b1", label: "Não quero deixar a vida passar achando que sexo bom não é pra mim" },
        { id: "b2", label: "Quero voltar a me sentir desejável" },
        { id: "b3", label: "Tenho medo de levar essa mesma trava pra próxima relação" },
        { id: "b4", label: "Cansei de fingir, até pra mim, que tá tudo bem" },
        { id: "b5", label: "Quero sentir tesão e gozar de verdade, o que eu nunca tive" },
      ],
    },
  },

  // ───────────────────────── T18 · LOADING ─────────────────────────
  {
    id: 18,
    type: "loading",
    meter: 0.95,
    intimate: true,
    universal: {
      headline: "Encontrando o que apagou o seu desejo...",
      body: [
        "Cruzando suas respostas com o perfil de milhares de mulheres que descobriram aqui o que estava por baixo das camadas delas.",
      ],
      options: [
        { id: "l1", label: "Vendo o que ensinaram errado pra você sobre sexo..." },
        { id: "l2", label: "Achando onde o seu tesão ficou preso..." },
        { id: "l3", label: "Medindo o quanto dele ainda está vivo aí dentro..." },
      ],
    },
  },

  // ──────────────────── T19 · RESULTADO / REPRESA (pico) ────────────────────
  {
    id: 19,
    type: "result",
    meter: 1,
    universal: {
      eyebrow: "Seu diagnóstico",
      headline: "Seu diagnóstico está pronto.",
      body: [
        "Ao contrário do que você sempre temeu, o problema nunca foi falta de tesão. É o oposto: sobra. Você tem muito desejo preso.",
        "E desejo preso não some, ele se acumula, igual água atrás de uma represa, até virar pressão. E essa pressão vira irritação, distância, sexo por obrigação, e aquela sensação de que a sua vida sexual já acabou.",
        "Não acabou. O que está preso pode ser solto, e eu vou te mostrar como.",
      ],
      subhead:
        "Com base no seu perfil, esta é a sua jornada de volta ao prazer pelas 3 Camadas:",
      cta: "QUERO VOLTAR A SENTIR TESÃO",
    },
  },

  // ───────────────────────── T20 · PÁGINA DE VENDAS ─────────────────────────
  {
    id: 20,
    type: "sales",
    meter: 1,
    universal: {
      headline:
        "O plano Puro Gozo te leva camada por camada, da programação que você não escolheu até a mulher que sente, deseja, pede e goza sem pedir licença. A que sempre esteve aí dentro.",
      cta: "QUERO MEU MÉTODO AGORA",
    },
  },
];

// Linha do tempo da jornada (T19), gráfico que se desenha
export const JOURNEY = [
  {
    marco: "Ponto de partida",
    camada: "Hoje",
    o_que: "Desejo represado, corpo fechado, fingindo pra dar conta",
  },
  {
    marco: "Primeiros dias",
    camada: "Camada 1 · A Programação",
    o_que: "A culpa começa a afrouxar, você entende que não nasceu fria, te ensinaram a ser",
  },
  {
    marco: "Virada",
    camada: "Camada 2 · O Silêncio",
    o_que: "A cabeça para de fugir na hora do sexo, o corpo volta a responder",
  },
  {
    marco: "Aceleração",
    camada: "Camada 3 · A Mulher do Outro Lado",
    o_que: "O tesão volta a aparecer sozinho, você começa a pedir o que quer",
  },
  {
    marco: "Transformação",
    camada: "Método completo",
    o_que: "Você sente, pede e goza sem fingir e sem pedir licença",
  },
];

// Bandas de camada para o medidor-represa (micro-labels por marco)
export const METER_BANDS = [
  { upTo: 0.4, label: "Camada 1 · A Programação" },
  { upTo: 0.7, label: "Camada 2 · O Silêncio" },
  { upTo: 1.01, label: "Camada 3 · A Mulher do Outro Lado" },
];

// ── Helpers ──────────────────────────────────────────────
export function pathFromStatus(status: string | undefined): Path {
  if (status === "casada" || status === "relacionamento") return "A";
  return "B";
}

// Resolve conteúdo da tela para o caminho atual (universal tem prioridade
// campo a campo; opções/headline específicas do caminho sobrescrevem vazios)
export function resolveContent(screen: Screen, path: Path): ScreenContent {
  const variant = path === "A" ? screen.A : screen.B;
  const base = screen.universal ?? ({} as ScreenContent);
  if (!variant) return base;
  return {
    ...base,
    ...Object.fromEntries(
      Object.entries(variant).filter(([, v]) => v !== undefined && v !== "")
    ),
    // opções do caminho sempre vencem quando existem
    options: variant.options ?? base.options,
    headline: variant.headline || base.headline,
  };
}

export function profileFromAnswer(optionId: string | undefined): Profile {
  const opt = SCREENS.find((s) => s.id === 13)?.universal?.options?.find(
    (o) => o.id === optionId
  );
  return opt?.profile ?? "programacao";
}

export const meterBandLabel = (meter: number): string =>
  METER_BANDS.find((b) => meter < b.upTo)?.label ?? METER_BANDS[0].label;

// ── Recibo de personalização ──────────────────────────────
// Ecoa as respostas dela (T9, T10, T15) em fragmentos que completam
// "Você disse que ...". Auto-relevância = dopamina + oferta sob medida.
const RECEIPT_FRAGMENTS: Record<number, Record<string, string>> = {
  10: {
    // caminho A (finge orgasmo)
    "quase-sempre": "finge quase toda vez",
    "as-vezes": "finge quando cansa, pra não ter que explicar",
    medo: "tem medo de nunca mais gozar de verdade",
    evito: "inventa desculpa pra não transar",
    // caminho B (se toca)
    nunca: "nunca se permitiu se tocar",
    culpa: "sente culpa toda vez que tenta",
    "faz-tempo": "não sabe mais se ainda consegue gozar",
  },
  9: {
    tarefas: "sua cabeça foge pra louça, pras contas",
    corpo: "fica vigiando o próprio corpo",
    acabar: "só quer que o sexo termine logo",
    finjo: "finge que tá ali, mas não está",
    distraio: "perde a vontade no meio e desiste",
    "nem-tento": "nem tenta mais",
    "sem-gozo": "começa a sentir, mas não chega ao gozo",
  },
  15: {
    "nao-transa": "vocês não transam mais",
    obrigacao: "transa por obrigação, sem tesão nenhum",
    estranhos: "viraram dois estranhos na cama",
    pavor: "tem pavor de travar com alguém",
    fechei: "se fechou depois da última vez",
    desisti: "achou mais fácil desistir do sexo",
  },
};

export function buildReceipt(
  answers: Record<number, string | string[]>
): string | null {
  const frags: string[] = [];
  for (const id of [10, 9, 15]) {
    const ans = answers[id];
    const key = Array.isArray(ans) ? ans[0] : ans;
    const frag = key ? RECEIPT_FRAGMENTS[id]?.[key] : undefined;
    if (frag) frags.push(frag);
  }
  if (frags.length === 0) return null;
  return `Você disse que ${frags.join(". Que ")}.`;
}
