import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// Português (pt-PT) — tradução gerada automaticamente por máquina.
// REQUER REVISÃO HUMANA antes do lançamento. Verifique a naturalidade do
// texto, a concordância e a terminologia antes de colocar em produção.
// ──────────────────────────────────────────────────────────────────────────

export const pt: Translations = {
  seo: {
    title:
      'Contador de Caracteres — Ferramenta Gratuita de Contagem de Caracteres e Palavras | PostTruncate',
    description:
      'Pré-visualizador gratuito para redes sociais. Plica do LinkedIn, threads X/Twitter, hashtags e acessibilidade — tudo no seu navegador.',
    skipLink: 'Saltar para o editor',
  },

  nav: {
    brandAria: 'Página inicial do PostTruncate',
    homeAria: 'Página inicial do PostTruncate',
    links: {
      editor: 'Editor',
      guides: 'Guias das Plataformas',
      limits: 'Todos os limites das plataformas',
      tools: 'Ferramentas',
      counters: 'Contadores de caracteres',
      adPreviews: 'Ad Previews',
      faq: 'FAQ',
      about: 'Sobre',
      contact: 'Contacto',
    },
    cta: 'Abrir o editor',
    themeToDark: 'Mudar para o tema escuro',
    themeToLight: 'Mudar para o tema claro',
    language: 'Idioma',
    languageAria: 'Selecionar idioma',
    menuAria: 'Alternar o menu de navegação',
    backToTop: 'Voltar ao topo',
  },

  hero: {
    eyebrow: 'Simulador de pré-visualização e truncagem para redes sociais',
    title: 'Veja exatamente onde cada plataforma corta o seu texto.',
    lede: 'Escreva uma vez e veja a sua publicação a ser apresentada em pré-visualizações nativas do LinkedIn, X, Threads, Instagram e Facebook — com linhas de dobra, divisões de threads, limites de hashtags e avisos de acessibilidade em tempo real à medida que escreve, mais IA de um toque para melhorar a sua publicação na hora.',
    primary: 'Começar a escrever',
    secondary: 'Ver os limites das plataformas',
    badge: 'Pré-visualizações em tempo real. Chega de adivinhação.',
    trust: '100% grátis — sem cadastro · O seu texto nunca sai do navegador · Mais de 10 limites de plataformas',
  },

  howItWorks: {
    heading: 'Como funciona',
    steps: [
      {
        name: 'Cole ou escreva o seu texto',
        text: 'Introduza o seu rascunho no editor e o contador de caracteres atualiza-se instantaneamente enquanto escreve.',
      },
      {
        name: 'Todas as plataformas são apresentadas de uma vez',
        text: 'Os cartões de pré-visualização do LinkedIn, X, Threads, Instagram, Facebook e SMS atualizam-se simultaneamente — sem necessidade de seleção.',
      },
      {
        name: 'Veja exatamente onde o texto é cortado',
        text: 'A pré-visualização destaca o ponto de truncagem para que saiba precisamente o que os leitores irão ver.',
      },
    ],
  },

  toolPage: {
    onThisPage: 'Nesta página',
    lastUpdated: 'Última atualização: {date}',
    crossPromo: {
      heading: 'Precisa verificar outras plataformas?',
      text: 'O PostTruncate não é só para {platform}. O editor completo na página inicial pré-visualiza sua publicação no LinkedIn, X, Instagram, Facebook, Threads e SMS ao mesmo tempo — para você identificar o corte, o limite e as armadilhas de codificação de cada plataforma de uma só vez. Escreva uma vez, verifique em todos os lugares.',
      cta: 'Abrir o editor completo',
    },
    cta: {
      heading: 'Pronto para ver como sua publicação realmente aparece?',
      blurb: 'Cole seu rascunho no editor do PostTruncate e veja instantaneamente pré-visualizações ao vivo para LinkedIn, X, Instagram, Facebook, Threads e SMS — com linhas de corte, divisões de thread e avisos de limite atualizando enquanto você digita. Gratuito, instantâneo e nada sai do seu navegador.',
      button: 'Comece a escrever — é gratuito',
    },
  },

  images: {
    logoAlt: 'Logotipo PostTruncate',
    platformLogo: 'Logotipo do {platform}',
  },

  breadcrumbs: {
    home: 'Início',
  },

  workspace: {
    title: 'O seu espaço de trabalho em tempo real',
    sub: 'Tudo o que está em baixo atualiza-se instantaneamente e permanece no seu dispositivo.',
  },

  seoCopy: {
    ariaLabel: 'Sobre o PostTruncate',
    sections: [
      {
        heading: 'Um contador de caracteres para as redes sociais',
        paragraphs: [
          'O <strong>PostTruncate</strong> é um contador de caracteres gratuito que funciona diretamente no browser, sem necessidade de criar conta ou fazer upload de ficheiros. Cole ou escreva qualquer texto e veja ao instante a contagem de caracteres, palavras, tempo de leitura e distribuição de letras — tudo atualizado à medida que escreve.',
          'É útil para qualquer pessoa que trabalhe com limites de texto: redatores que ajustam um título, programadores que verificam uma string, ou estudantes que controlam a extensão de um trabalho. Como tudo é processado localmente, os seus rascunhos nunca saem do seu dispositivo.',
        ],
      },
      {
        heading: 'Codificação SMS e cálculo de segmentos',
        paragraphs: [
          'Os SMS funcionam com dois modos de codificação e a maioria das ferramentas ignora essa diferença. O PostTruncate deteta automaticamente se a sua mensagem usa <strong>GSM-7</strong> padrão (160 caracteres por mensagem) ou <strong>Unicode</strong> (70 caracteres) — e a mudança pode acontecer ao escrever um único emoji ou carácter especial.',
          'A ferramenta também assinala os caracteres da tabela GSM expandida — como o símbolo do euro (€), parênteses retos ou a barra vertical — que ficam em modo GSM-7 mas consomem dois espaços cada um. Esse custo oculto é frequentemente a razão pela qual as mensagens se dividem de forma inesperada.',
          'Quando o texto ocupa vários segmentos, a <strong>calculadora de segmentos</strong> integrada mostra exatamente quantas mensagens serão enviadas, tendo em conta o overhead do cabeçalho UDH, que reduz o limite por segmento para 153 caracteres (GSM) ou 67 (Unicode).',
        ],
      },
      {
        heading: 'X (Twitter): limites e divisão automática de threads',
        paragraphs: [
          'O X (Twitter) tem duas regras que apanham as pessoas de surpresa: o limite de 280 caracteres e o facto de qualquer link — independentemente do seu comprimento — contar exatamente como 23 caracteres. O PostTruncate aplica ambas, pelo que o contador apresentado corresponde ao que o X vai mostrar após aplicar o encurtador t.co.',
          'Quando o rascunho é demasiado longo, o <strong>divisor de threads</strong> integrado divide-o em tweets numerados em limites naturais de frases — nunca a meio de uma palavra. Cada cartão mostra a sua contagem de caracteres e posição, para que possa rever o thread completo antes de publicar.',
        ],
      },
      {
        heading: 'Limites de caracteres no Instagram e no Facebook',
        paragraphs: [
          'O Instagram permite até 2 200 caracteres numa legenda, mas só mostra os primeiros 125 aproximadamente antes de ocultar o resto por trás de um link «ver mais». O PostTruncate indica exatamente onde cai esse corte, para que a primeira linha visível no feed seja sempre a que importa.',
          'O painel também monitoriza o <strong>número de hashtags</strong> em tempo real. O Instagram não publica silenciosamente publicações com mais de 5 hashtags, pelo que aparece um aviso antes de atingir esse limite. Os espaços são sempre contados, em conformidade com o comportamento da própria plataforma.',
        ],
      },
      {
        heading: 'Contagem de palavras, legibilidade e análise por plataforma',
        paragraphs: [
          'Para além dos limites das plataformas, o PostTruncate também conta palavras, frases, parágrafos e símbolos — tudo em tempo real enquanto escreve. É útil para meta-descrições de SEO, revisões de documentação ou qualquer fluxo de escrita que exija mais do que uma simples contagem de caracteres.',
          'O painel trata corretamente textos multilingues, incluindo sistemas de escrita CJK onde a contagem de caracteres tem um peso semântico diferente. Quer escreva em português, inglês, japonês ou chinês, as contagens refletem o que a plataforma de destino verá realmente.',
        ],
      },
    ],
  },

  guides: {
    eyebrow: 'Guias das plataformas',
    title: 'Conheça todos os limites antes de publicar.',
    lede: 'Uma referência rápida para os pontos de truncagem, os limites máximos e as armadilhas de formatação que reduzem discretamente o seu alcance em cada rede.',
    items: {
      linkedin: {
        name: 'LinkedIn',
        tag: 'A dobra «…ver mais»',
        body: 'O LinkedIn recolhe as publicações a partir de cerca de 210 caracteres no computador e 140 no telemóvel, escondendo tudo o resto atrás de uma ligação «…ver mais». Aquilo que fica acima dessa dobra é toda a sua mensagem no feed — se o seu gancho não resultar aí, a maioria das pessoas nunca o expande. Coloque a tensão, o resultado ou a pergunta logo no início e empurre as hashtags e as ligações para baixo da dobra.',
        facts: [
          ['Dobra no computador', '~210 caracteres'],
          ['Dobra no telemóvel', '~140 caracteres'],
          ['Limite máximo da publicação', '3000 caracteres'],
        ],
      },
      twitter: {
        name: 'X / Twitter',
        tag: 'Threads e peso das ligações',
        body: 'O X conta uma única publicação contra um limite de 280 caracteres, mas cada ligação é encapsulada pelo t.co e contabilizada com um valor fixo de 23 caracteres, por mais longo que seja o URL real. Se ultrapassar os 280, precisa de uma thread. As boas threads quebram nos limites das frases, nunca a meio de uma palavra, e numeram cada tweet para que os leitores possam seguir a ordem. O PostTruncate divide o seu rascunho automaticamente e marca cada cartão com a respetiva posição.',
        facts: [
          ['Limite por tweet', '280 caracteres'],
          ['Cada ligação conta como', '23 caracteres'],
          ['Tweets por thread', 'Ilimitados'],
        ],
      },
      threads: {
        name: 'Threads',
        tag: 'Encadeamento de publicações',
        body: 'O Threads, a aplicação de texto da Meta, dá a cada publicação 500 caracteres — quase o dobro do X — e conta as ligações na totalidade em vez de as encurtar. Se passar dos 500, o resto tem de encadear-se como respostas numeradas. A primeira publicação continua a sustentar o feed, por isso coloque o gancho logo no início, tal como em todo o lado. O PostTruncate mede pela contagem total de caracteres e encadeia os textos longos numa sequência numerada e limpa.',
        facts: [
          ['Limite por publicação', '500 caracteres'],
          ['Ligações contadas', 'Na totalidade'],
          ['Excedente', 'Encadeia como respostas'],
        ],
      },
      instagram: {
        name: 'Instagram',
        tag: 'Limite de hashtags',
        body: 'As legendas do Instagram podem ir até 2200 caracteres, mas só mostram cerca dos primeiros 125 antes de uma ligação «mais». A regra mais rígida são as hashtags: mais de 5 numa única legenda ou comentário e a publicação falha silenciosamente. Acumular dezenas de tags de baixa intenção também é lido como spam. Mantenha as suas tags reduzidas e relevantes e vigie o medidor em tempo real para nunca esbarrar no limite de 5 tags.',
        facts: [
          ['Limite da legenda', '2200 caracteres'],
          ['Limite máximo de hashtags', '5 tags'],
          ['Pré-visualização da legenda', '~125 caracteres'],
        ],
      },
      facebook: {
        name: 'Facebook',
        tag: 'Truncagem do feed',
        body: 'O Facebook trunca as publicações do feed a cerca de 480 caracteres com uma ligação «Ver mais», e o envolvimento cai acentuadamente em blocos longos e sem quebras. As publicações mais curtas, com uma primeira linha clara, têm um desempenho consistentemente superior. A mesma regra de acessibilidade aplica-se em todo o lado: os «tipos de letra decorativos» em pseudo-Unicode parecem a negrito ou cursivos, mas são lidos caráter a caráter — ou totalmente ignorados — pelos leitores de ecrã, reduzindo discretamente o seu alcance.',
        facts: [
          ['Dobra do feed', '~480 caracteres'],
          ['Comprimento com melhor desempenho', 'Menos de 80 caracteres'],
          ['Tipos de letra decorativos', 'Quebram os leitores de ecrã'],
        ],
      },
    },
  },

  hookband: {
    eyebrow: 'Escrever o gancho',
    title: 'A primeira linha é a única que a maioria das pessoas lê.',
    body: 'Em todos os feeds, o texto acima da dobra faz todo o trabalho. Comece com um resultado, uma tensão ou uma pergunta — não com um aquecimento. Mova as ligações e as hashtags para baixo da dobra, mantenha a abertura abaixo do ponto de corte da plataforma e deixe a pré-visualização confirmar que o gancho sobrevive antes de publicar.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Perguntas, respondidas.',
    viewAll: 'Ver todas as FAQ',
    items: [
      {
        q: 'O que é o truncamento de publicações?',
        a: 'O truncamento acontece quando uma plataforma corta a sua publicação — ocultando tudo o que passa da dobra visual atrás de um link «…ver mais» ou rejeitando os caracteres além de um limite rígido. O PostTruncate mostra exatamente onde cada plataforma faz esse corte, ao vivo enquanto escreve, para que a parte importante nunca desapareça abaixo da dobra.',
      },
      {
        q: 'Porque é que as redes sociais truncam as publicações?',
        a: 'Os feeds são feitos para leitura rápida, por isso as plataformas recolhem as publicações longas para manter o scroll fluido e mostrar mais conteúdo no ecrã. Cada plataforma traça a linha num ponto diferente: o LinkedIn dobra por volta dos 140–210 caracteres, o Facebook entre 110 e 480 conforme o dispositivo, o Instagram perto dos 125, e o X impõe simplesmente um limite rígido de 280 caracteres. O que fica abaixo da dobra só é visto por quem toca em «mais» — e a maioria dos leitores nunca o faz.',
      },
      {
        q: 'Que plataformas é que o PostTruncate suporta?',
        a: 'O PostTruncate pré-visualiza LinkedIn, X (Twitter), Threads, Instagram, Facebook e SMS — com contagem de caracteres ao vivo, marcadores de dobra, divisão em threads e cálculo de segmentos SMS para cada um. Inclui ainda uma pré-visualização de SERP do Google para títulos e meta descrições, e um widget contador gratuito para incorporar no seu próprio site.',
      },
      {
        q: 'Qual é a precisão dos limites de caracteres?',
        a: 'O PostTruncate usa os limites publicados e amplamente observados de cada plataforma — 280 para o X, 210/140 para a dobra do LinkedIn, 5 hashtags para o Instagram e um peso fixo de 23 caracteres para as ligações. As plataformas ajustam-nos ocasionalmente, e a apresentação varia ligeiramente consoante o dispositivo, por isso encare as pré-visualizações como uma estimativa aproximada e não como uma garantia perfeita ao píxel.',
      },
      {
        q: 'Os espaços e a pontuação contam como caracteres?',
        a: 'Sim. Cada espaço, quebra de linha e sinal de pontuação conta como um caráter, e tanto o contador do PostTruncate como os limites das plataformas os incluem. A única exceção comum são as ligações no X/Twitter, que se reduzem a um valor fixo de 23 caracteres, independentemente do número de letras, símbolos ou barras que o URL real contenha.',
      },
      {
        q: 'Como é que os emojis afetam a contagem de caracteres?',
        a: 'O PostTruncate conta por pontos de código Unicode, por isso um emoji simples como 🙂 conta como um único caráter. Muitos emojis, porém, são construídos a partir de vários pontos de código unidos — variações de tom de pele, bandeiras e glifos combinados como 👨‍👩‍👧 — e esses registam-se como dois ou mais. A maioria das plataformas, sobretudo o X, também atribui mais peso aos emojis do que às letras simples, por isso um rascunho com muitos emojis consome um pouco mais do seu limite do que a contagem visível de glifos sugere.',
      },
      {
        q: 'Qual é a diferença entre contagem de caracteres e contagem de palavras?',
        a: 'A contagem de caracteres é o total de cada caráter individual — letras, espaços, pontuação e emojis incluídos — e é com base nela que os limites das plataformas são realmente medidos. A contagem de palavras é o número de palavras separadas por espaços, por mais longa que cada uma seja. Um tweet completo de 280 caracteres pode ter apenas 40 palavras, por isso vigie a contagem de caracteres para se manter abaixo de um limite e use a contagem de palavras como indicador de legibilidade.',
      },
      {
        q: 'Porque é que a minha ligação conta como 23 caracteres no X?',
        a: 'O X encapsula automaticamente cada URL com o seu encurtador t.co, que ocupa sempre 23 caracteres, independentemente de a ligação original ser longa ou curta. Assim, uma ligação de 5 caracteres e uma de 200 caracteres custam-lhe exatamente 23 face ao limite de 280. O PostTruncate reflete isto no contador ponderado.',
      },
      {
        q: 'O que são os «tipos de letra decorativos» e porque são assinalados?',
        a: 'Aquelas letras a negrito, em itálico ou em estilo manuscrito que cola de geradores de tipos de letra não são formatação real — são caracteres pseudo-Unicode do bloco de Símbolos Alfanuméricos Matemáticos. Parecem estilizados, mas os leitores de ecrã ou os soletram letra a letra ou os ignoram, o que prejudica tanto a acessibilidade como o seu alcance orgânico. O monitor assinala-os para que possa voltar a texto simples.',
      },
      {
        q: 'O que é que a opção «Sanitizar texto» remove?',
        a: 'Retira caracteres invisíveis e de largura zero — espaços de largura zero, marcas de ordem de bytes, marcas de controlo bidirecional, hífenes suaves e códigos de controlo dispersos. Estes infiltram-se frequentemente quando copia de outras aplicações e quebram silenciosamente as contagens de caracteres e a acessibilidade em clientes móveis mais antigos, sem nunca serem visíveis.',
      },
      {
        q: 'O que é a densidade de palavras-chave e como é que o monitor de excesso protege o meu conteúdo?',
        a: 'A densidade de palavras-chave é a percentagem de vezes que uma palavra aparece em relação ao total de palavras. Repetir demasiado o mesmo termo pode parecer enchimento para motores de busca e leitores. O monitor acompanha a frequência em tempo real e assinala qualquer termo que ultrapasse o limite seguro de 3,0%, para que possa reformular antes de publicar.',
      },
      {
        q: 'Como calculam os temporizadores de leitura e fala a duração da minha publicação?',
        a: 'O temporizador de leitura divide a sua contagem de palavras por uma velocidade média de 275 palavras por minuto. O temporizador de fala usa um ritmo conversacional de 150 palavras por minuto. Assim pode estimar artigos, guiões, newsletters ou vídeos curtos sem sair do editor.',
      },
      {
        q: 'O que faz o Social Sanitizer e porque devo remover emojis ou extrair hashtags?',
        a: 'As ações de limpeza arrumam rascunhos com um clique. O removedor de emojis retira ícones e símbolos especiais quando precisa de texto simples, e o extrator de hashtags remove as etiquetas do corpo do texto e agrupa-as no fim para tornar a legenda mais legível.',
      },
      {
        q: 'O meu texto é enviado para algum lado?',
        a: 'Não. Todo o editor e todas as pré-visualizações funcionam localmente no seu navegador. O seu rascunho nunca sai do seu dispositivo — não há conta, não há carregamento e não há processamento do seu conteúdo num servidor.',
      },
      {
        q: 'A gravação automática de sessão significa que os meus dados ficam guardados num servidor?',
        a: 'Não. Os seus rascunhos nunca são carregados nem guardados em infraestrutura externa. A gravação automática de sessão usa sessionStorage no seu próprio navegador, apenas nesse separador. Se atualizar a página no mesmo separador, o texto é restaurado; quando a sessão do separador termina, o navegador limpa essa cache temporária.',
      },
      {
        q: 'O PostTruncate é gratuito?',
        a: 'Sim, é totalmente gratuito e não exige registo. A ferramenta é financiada por anúncios discretos colocados em espaços reservados que nunca deslocam o esquema da página enquanto trabalha.',
      },
      {
        q: 'Por que meu SMS de 160 caracteres contou de repente como duas mensagens?',
        a: 'Isso acontece por uma mudança na codificação do texto. Os SMS padrão usam codificação GSM-7, que comporta até 160 caracteres numa única mensagem. Assim que o texto inclui um caráter não-GSM — um emoji, um sistema de escrita regional ou certos símbolos — toda a mensagem muda para Unicode, que só suporta 70 caracteres por segmento. Se uma mensagem Unicode ultrapassar 70 caracteres, é adicionado um cabeçalho multipart e o espaço útil por segmento baixa para 67 caracteres. O PostTruncate mostra a codificação ativa e o número de segmentos em tempo real, para que saiba sempre onde ocorre a divisão.',
      },
      {
        q: 'Caracteres especiais e emojis contam como um caractere em um SMS?',
        a: 'Nem sempre. Letras e números padrão contam como um caráter cada. Símbolos da tabela GSM estendida — incluindo o sinal de euro (€), parênteses retos, chavetas e a barra vertical | — contam como dois caracteres cada, mesmo que a mensagem permaneça em modo GSM-7. Os emoji são diferentes: adicionar um força a mensagem inteira para Unicode, reduzindo o limite por segmento de 160 para 70 caracteres.',
      },
    ],
  },

  faqPage: {
    title: 'FAQ — Contador de caracteres e pré-visualizações PostTruncate',
    description:
      'Todas as perguntas sobre o PostTruncate, respondidas: limites de caracteres por plataforma, contagem de emojis e links, segmentação de SMS, privacidade e como funcionam as pré-visualizações ao vivo.',
    eyebrow: 'FAQ',
    heading: 'Perguntas frequentes',
    lede: 'Tudo sobre como o PostTruncate conta, pré-visualiza e protege as suas publicações — agrupado por tema. Clique numa pergunta para expandir a resposta.',
    categories: {
      about: 'Sobre a ferramenta',
      counting: 'Contagem e limites',
      cleanup: 'Limpeza e acessibilidade',
      insights: 'Métricas e análises',
      privacy: 'Privacidade e dados',
      sms: 'SMS',
    },
  },

  limitsPage: {
    title: 'Limites de caracteres das redes sociais 2026 — Tabela completa',
    description:
      'A tabela completa de limites de caracteres para LinkedIn, X (Twitter), Threads, Instagram, Facebook e SMS — limites rígidos, dobras de truncamento e as regras por trás deles.',
    eyebrow: 'Referência',
    heading: 'Todos os limites das plataformas, numa só tabela',
    lede: 'Limites rígidos, dobras de texto visível e comportamento de excesso para cada plataforma que o PostTruncate pré-visualiza. Os números abaixo são as mesmas constantes que o editor ao vivo verifica.',
    table: {
      caption: 'Limites de caracteres e pontos de truncamento por plataforma',
      platform: 'Plataforma',
      limit: 'Limite rígido',
      foldMobile: 'Dobra (móvel)',
      foldDesktop: 'Dobra (desktop)',
      notes: 'Notas',
    },
    noFold: 'Sem dobra',
    notes: {
      linkedin: 'O texto após a dobra fica oculto atrás de «…ver mais».',
      twitter: 'Sem dobra — acima de {limit} caracteres divide-se em thread; cada link conta como {url} caracteres.',
      threads: 'Os links contam por inteiro; o texto além de {limit} caracteres continua como respostas numeradas.',
      instagram: 'A legenda dobra atrás de «mais»; teto rígido de {hashtags} hashtags por publicação.',
      facebook: 'As publicações do feed recolhem atrás de «Ver mais» muito antes do limite técnico.',
      smsGsm: '{single} caracteres numa única mensagem; {multi} por segmento quando se divide.',
      smsUnicode: 'Um emoji ou caráter não GSM muda toda a mensagem para Unicode.',
    },
    rulesHeading: 'Regras de truncamento, plataforma a plataforma',
    rules: {
      linkedin: 'O LinkedIn permite {limit} caracteres por publicação, mas dobra a vista do feed após cerca de {mobile} caracteres no móvel e {desktop} no desktop — o resto fica oculto atrás de «…ver mais». As quebras de linha contam, e a primeira frase concentra quase todos os cliques: coloque o gancho no início e os links abaixo da dobra.',
      twitter: 'O X impõe um teto rígido de {limit} caracteres por publicação e não mostra dobra nenhuma. Cada URL é envolvido pelo encurtador t.co e custa sempre {url} caracteres independentemente do comprimento real, e muitos emojis pesam como dois caracteres. Rascunhos mais longos têm de ser divididos em thread — o PostTruncate fá-lo automaticamente nos limites das palavras.',
      threads: 'O Threads permite {limit} caracteres por publicação e, ao contrário do X, conta os links no comprimento total. No móvel, o feed dobra as publicações longas por volta dos {mobile} caracteres. Tudo o que passar do teto tem de continuar como respostas numeradas encadeadas sob a primeira.',
      instagram: 'As legendas do Instagram podem chegar aos {limit} caracteres, mas o feed mostra apenas cerca dos primeiros {mobile} antes do link «mais». A regra mais dura são os hashtags: mais de {hashtags} numa legenda ou primeiro comentário e a publicação pode falhar silenciosamente.',
      facebook: 'O teto técnico do Facebook é de {limit} caracteres, mas as publicações do feed recolhem atrás de «Ver mais» por volta dos {mobile} caracteres no móvel e {desktop} no desktop. A interação cai a pique em blocos longos sem pausas — o limite prático é a dobra, não o teto.',
      sms: 'Um único SMS comporta {gsmSingle} caracteres na codificação GSM de 7 bits, caindo para {gsmMulti} por segmento quando a mensagem se divide. Qualquer emoji ou caráter não GSM muda a mensagem inteira para Unicode — {uniSingle} caracteres por mensagem única, {uniMulti} por segmento — e alguns símbolos GSM (€, parênteses retos, a barra vertical) contam como dois.',
    },
  },

  footer: {
    homeAria: 'Página inicial do PostTruncate',
    tag: 'Veja exatamente onde cada plataforma corta o seu texto — antes de publicar.',
    columns: {
      tool: {
        title: 'Ferramenta',
        links: [
          'Editor de texto',
          'Pré-visualizações em tempo real',
          'Divisor de threads',
          'Sanitizador Unicode',
          'Widget de incorporação',
        ],
      },
      platforms: {
        title: 'Plataformas',
        links: ['LinkedIn', 'X / Twitter', 'Threads', 'Instagram', 'Facebook'],
      },
      learn: {
        title: 'Aprender',
        links: [
          'Limites de caracteres',
          'FAQ',
          'Escrita de ganchos',
          'Acessibilidade',
        ],
      },
      legal: {
        title: 'Legal',
        links: ['Privacidade', 'Termos', 'Sobre', 'Contacto'],
      },
      guides: {
        title: 'Guias de plataformas',
        links: [
          'X / Twitter',
          'Instagram',
          'LinkedIn',
          'Facebook',
          'Threads',
        ],
      },
    },
    copyright: '© {year} PostTruncate. Feito para criadores em todo o lado.',
    disclaimer:
      'Sem qualquer afiliação com o LinkedIn, o X, a Meta ou o Instagram. Os limites são estimativas e podem mudar.',
  },

  pages: {
    common: {
      lastUpdated: 'Última atualização: {date}',
      lastUpdatedDate: '1 de junho de 2026',
      backHome: '← Voltar ao editor',
    },

    privacy: {
      title: 'Política de Privacidade',
      description:
        'Como o PostTruncate trata os seus dados: o seu texto nunca sai do navegador, não existem contas e nada do que escreve é carregado ou armazenado.',
      intro:
        'O PostTruncate foi concebido com a privacidade em primeiro lugar. Tudo o que escreve é executado localmente no seu navegador — o seu rascunho nunca é carregado, armazenado ou visto por nós. Esta política explica exatamente o que isso significa e os poucos casos limitados em que existem terceiros envolvidos.',
      sections: [
        {
          heading: 'O seu texto permanece no seu dispositivo',
          paragraphs: [
            'O editor, todas as pré-visualizações das plataformas, o divisor de threads e o sanitizador Unicode funcionam totalmente no <strong>seu navegador</strong>. O texto que escreve ou cola é processado no seu próprio dispositivo e <strong>nunca é transmitido para os nossos servidores</strong> — na verdade, o PostTruncate não tem qualquer servidor de conteúdo para onde o enviar. Quando fecha o separador, o seu rascunho desaparece, a menos que o seu navegador opte por o manter localmente.',
            'Como nada é carregado, não podemos ler, armazenar, vender ou partilhar aquilo que escreve. Não há <strong>conta, registo nem início de sessão</strong>, por isso nunca lhe pedimos o seu nome, e-mail ou qualquer dado pessoal para utilizar a ferramenta.',
          ],
        },
        {
          heading: 'O que armazenamos localmente',
          paragraphs: [
            'Um pequeno número de preferências é guardado no <strong>localStorage</strong> do seu navegador para que o site se lembre de como gosta dele — especificamente o tema escolhido (claro ou escuro) e o seu idioma preferido. Estes valores vivem apenas no seu dispositivo, só podem ser lidos pelo PostTruncate e nunca chegam até nós. Pode limpá-los a qualquer momento através das definições do seu navegador.',
          ],
        },
        {
          heading: 'Publicidade',
          paragraphs: [
            'O PostTruncate é financiado por anúncios discretos apresentados em espaços fixos e reservados que nunca deslocam o esquema da página enquanto trabalha. Caso sejam utilizados parceiros publicitários terceiros, estes podem definir os seus próprios cookies ou usar identificadores de dispositivo para mostrar anúncios relevantes, sujeitos às respetivas políticas de privacidade. Estes parceiros nunca recebem o conteúdo do seu rascunho, porque esse conteúdo nunca sai do seu navegador.',
          ],
        },
        {
          heading: 'O formulário de contacto',
          paragraphs: [
            'A única funcionalidade que envia dados para fora do seu dispositivo é o <strong>formulário de contacto</strong>. Quando opta por enviar-nos uma mensagem, o nome, o e-mail e a mensagem que introduz são-nos entregues através de um serviço terceiro de processamento de formulários, para que os possamos ler e responder. Usamos essa informação exclusivamente para lhe responder e não a utilizamos para marketing. Se preferir não recorrer a terceiros, pode enviar-nos um e-mail diretamente.',
          ],
        },
        {
          heading: 'Alterações e contacto',
          paragraphs: [
            'Podemos atualizar esta política à medida que o produto evolui; a data de «última atualização» acima reflete sempre a versão atual. Se tiver alguma questão sobre privacidade, envie-nos um e-mail para <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    terms: {
      title: 'Termos e Condições',
      description:
        'Os termos de utilização do PostTruncate: uma ferramenta gratuita, fornecida tal como está, cujos limites das plataformas são estimativas, disponibilizada sem garantia e sem afiliação a qualquer rede social.',
      intro:
        'Ao utilizar o PostTruncate, concorda com estes termos. São propositadamente curtos e simples — a ferramenta é gratuita, funciona no seu navegador e é fornecida tal como está.',
      sections: [
        {
          heading: 'Utilização do serviço',
          paragraphs: [
            'O PostTruncate é uma ferramenta gratuita para pré-visualizar e otimizar publicações nas redes sociais. Pode usá-la para qualquer fim lícito. Concorda em <strong>não fazer uso indevido do serviço</strong> — por exemplo, tentando perturbá-lo, contornar as suas proteções ou usá-lo para infringir a lei ou violar os direitos de terceiros.',
          ],
        },
        {
          heading: 'Estimativas, não garantias',
          paragraphs: [
            'Os limites de caracteres, os pontos de dobra e as regras de formatação aqui apresentados baseiam-se no comportamento publicado e amplamente observado de cada plataforma. As plataformas <strong>alteram estes limites sem aviso prévio</strong>, e a apresentação varia consoante o dispositivo e a versão da aplicação. Encare cada pré-visualização e contagem como uma estimativa aproximada, não como uma garantia perfeita ao píxel. É da sua responsabilidade rever as suas próprias publicações antes de as publicar.',
          ],
        },
        {
          heading: 'Sem afiliação',
          paragraphs: [
            'O PostTruncate é uma ferramenta independente e <strong>não está afiliado, aprovado nem patrocinado por</strong> LinkedIn, X (Twitter), Meta, Instagram, Facebook ou Threads. Todos os nomes de produtos, logótipos e marcas são propriedade dos respetivos detentores e são aqui usados apenas para descrever o comportamento de cada plataforma.',
          ],
        },
        {
          heading: 'Fornecido «tal como está»',
          paragraphs: [
            'O serviço é fornecido <strong>«tal como está» e «conforme disponível», sem garantias de qualquer tipo</strong>, expressas ou implícitas. Na máxima medida permitida por lei, não nos responsabilizamos por qualquer perda ou dano resultante da utilização — ou da impossibilidade de utilização — da ferramenta, incluindo quaisquer decisões que tome com base nas suas pré-visualizações ou contagens.',
          ],
        },
        {
          heading: 'Alterações a estes termos',
          paragraphs: [
            'Podemos rever estes termos de tempos a tempos; a data de «última atualização» acima reflete a versão atual, e a utilização continuada da ferramenta significa que aceita os termos mais recentes. Dúvidas? Envie um e-mail para <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    about: {
      title: 'Sobre o PostTruncate',
      description:
        'O PostTruncate é uma ferramenta gratuita, que coloca a privacidade em primeiro lugar e mostra aos criadores exatamente onde cada plataforma social corta o seu texto — antes de carregarem em publicar.',
      intro:
        'O PostTruncate existe por uma razão: a primeira linha da sua publicação é a única que a maioria das pessoas lê, e cada plataforma corta-a num ponto diferente. Nós tornamos visíveis esses limites invisíveis.',
      sections: [
        {
          heading: 'O que faz',
          paragraphs: [
            'Escreva ou cole um rascunho uma vez e o PostTruncate apresenta-o tal como o <strong>LinkedIn, o X, o Threads, o Instagram e o Facebook</strong> o farão de facto — a dobra «…ver mais», a divisão de threads aos 280 caracteres, o peso de 23 caracteres das ligações, o limite de 5 hashtags. Vê exatamente o que sobrevive acima da dobra antes de se comprometer a publicar.',
            'Também deteta os problemas discretos que reduzem o seu alcance: caracteres invisíveis de largura zero que quebram as contagens e os leitores de ecrã, e os «tipos de letra decorativos» em pseudo-Unicode que parecem estilizados mas são ilegíveis para a tecnologia de apoio.',
          ],
        },
        {
          heading: 'Porque a criámos',
          paragraphs: [
            'A maioria dos contadores de caracteres dá-lhe apenas um número. Os criadores precisam de mais do que isso — precisam de saber <strong>onde</strong> o texto é cortado em cada rede, porque é aí que o gancho vive ou morre. Quisemos um único espaço de trabalho que simulasse todas as plataformas em simultâneo, funcionasse instantaneamente e respeitasse por completo a sua privacidade.',
          ],
        },
        {
          heading: 'Concebido com a privacidade em primeiro lugar',
          paragraphs: [
            'Tudo funciona no seu navegador. O seu texto nunca é carregado, não existem contas e a ferramenta é gratuita. É financiada por anúncios discretos em espaços reservados que nunca deslocam o esquema da página. Leia todos os detalhes na nossa <a href="../privacy/"><strong>Política de Privacidade</strong></a>.',
          ],
        },
      ],
    },

    contact: {
      title: 'Contacte-nos',
      description:
        'Entre em contacto com a equipa do PostTruncate — envie-nos uma mensagem ou um e-mail diretamente com comentários, relatórios de erros ou questões.',
      intro:
        'Encontrou um erro, reparou num limite de plataforma que mudou ou tem uma ideia para melhorar o PostTruncate? Adorávamos saber a sua opinião.',
      form: {
        name: 'O seu nome',
        email: 'O seu e-mail',
        subject: 'Assunto',
        message: 'Mensagem',
        submit: 'Enviar mensagem',
        sending: 'A enviar…',
        success: 'Obrigado — a sua mensagem está a caminho. Entraremos em contacto consigo em breve.',
        error:
          'Ocorreu um problema ao enviar a sua mensagem. Tente novamente ou envie-nos um e-mail diretamente.',
      },
      altHeading: 'Prefere e-mail?',
      altBody:
        'Pode contactar-nos a qualquer momento através de {email}. Lemos todas as mensagens e respondemos com a maior brevidade possível.',
    },
  },

  embedWidget: {
    title: 'Widget gratuito de contador de caracteres para incorporar — PostTruncate',
    description:
      'Adicione um contador de caracteres em tempo real a qualquer blogue ou site com uma linha de HTML. Controla os limites de X, LinkedIn, Threads, Instagram e SMS.',
    eyebrow: 'Incorporação gratuita',
    heading: 'Incorpore um contador de caracteres em tempo real no seu site',
    lede:
      'Cole uma linha de HTML para adicionar um contador de caracteres em tempo real a qualquer página. Conta caracteres e palavras e controla os limites de X, LinkedIn, Threads, Instagram e SMS — sem sair do seu site.',
    previewLabel: 'Pré-visualização em tempo real',
    copyButton: 'Copiar código de incorporação',
    copiedButton: 'Copiado!',
    codeLabel: 'Código de incorporação',
    audienceHeading: 'Para quem é?',
    forBloggers:
      'Bloggers e criadores de conteúdo podem adicionar um contador de caracteres em tempo real diretamente na sua página de redação, para que os leitores verifiquem os limites das plataformas sem mudar de separador.',
    forEducators:
      'Professores e autores de cursos podem incorporar o contador numa lição, permitindo aos alunos praticar a escrita com restrições de comprimento.',
    forDevelopers:
      'Os programadores podem integrar o widget em qualquer CMS, página de documentação ou ferramenta interna com um único <iframe> — sem chave de API, conta ou etapa de compilação.',
    homepageLinkLabel: 'Incorporar no seu site →',
  },

  errors: {
    notFound: {
      code: '404',
      title: 'Página não encontrada',
      description:
        'A página que procura não existe. Volte ao editor do PostTruncate.',
      heading: 'Esta página foi truncada',
      body: 'A página que procura não existe, foi movida ou nunca existiu. O editor continua exatamente onde o deixou.',
      cta: 'Voltar ao editor',
    },
    serverError: {
      code: '500',
      title: 'Algo correu mal',
      description:
        'Ocorreu um erro inesperado. Volte ao editor do PostTruncate e tente novamente.',
      heading: 'Algo correu mal do nosso lado',
      body: 'É um erro do servidor, não seu. Tente novamente daqui a pouco — o editor funciona inteiramente no seu navegador, por isso o seu texto está seguro de qualquer forma.',
      cta: 'Voltar ao editor',
    },
  },


  banner: {
    text: 'A pré-visualização de {platform} está abaixo',
    close: 'Fechar',
  },

  whyPostTruncate: {
    eyebrow: 'POR QUE POSTTRUNCATE?',
    title: 'Escreva com confiança.<br/>Publique sem preocupações.',
    p1: 'Cada plataforma tem diferentes limites de caracteres e regras de truncamento. PostTruncate mostra exatamente como seu conteúdo aparecerá antes de publicar.',
    p2: 'Economize tempo, aumente o engajamento e faça cada caractere valer com visualizações em tempo real, insights inteligentes e reescrita de tom com IA em um toque.',
    features: {
      realTime: {
        title: 'Visualizações em tempo real',
        desc: 'Veja instantaneamente como seu post aparecerá em mais de 6 plataformas.',
      },
      insights: {
        title: 'Insights inteligentes',
        desc: 'Obtenha pontuações de legibilidade, análise de palavras-chave e dicas de otimização de conteúdo.',
      },
      privacy: {
        title: 'Privacidade em primeiro lugar',
        desc: 'Seu conteúdo nunca é armazenado ou compartilhado. Tudo permanece privado.',
      },
      aiTone: {
        title: 'Reescritor de Tom com IA',
        desc: 'Reescreva instantaneamente sua publicação em um tom profissional, casual, amigável ou conciso com um toque — impulsionado por IA.',
      },
    },
  },

  howTruncationWorks: {
    eyebrow: 'COMO O TRUNCAMENTO FUNCIONA',
    description: 'Cada plataforma possui limites de caracteres e regras de exibição únicos. Quando seu conteúdo excede esses limites, ele é truncado com "..." ou "Ver mais". O PostTruncate simula exatamente como seu post aparecerá.',
    platforms: {
      linkedin: { name: 'LinkedIn', desc: 'Mostra ~220 caracteres antes de "...ver mais"' },
      twitter: { name: 'X (Twitter)', desc: 'Mostra ~125 caracteres antes do truncamento (varia por dispositivo)' },
      instagram: { name: 'Instagram', desc: 'Mostra ~125 caracteres, toque em "mais" para expandir' },
      facebook: { name: 'Facebook', desc: 'Mostra ~160 caracteres antes de "...ver mais"' },
      threads: { name: 'Threads', desc: 'Semelhante ao Instagram com ~125 caracteres antes do truncamento' },
      sms: { name: 'SMS (GSM)', desc: '160 caracteres por SMS para GSM, 70 para Unicode' },
    },
  },

  platformCharacterLimits: {
    eyebrow: "LIMITES DE CARACTERES POR PLATAFORMA",
    headers: {
      platform: "Plataforma",
      characterLimit: "Limite de caracteres",
      shownInFeed: "Mostrado no feed",
      bestPractice: "Melhores práticas",
      notes: "Notas"
    },
    viewAll: "Ver todos os limites de plataformas",
    platforms: {
      linkedin: {
        name: "LinkedIn",
        limit: "3,000",
        shown: "~220 caracteres",
        bestPractice: "Mantenha a mensagem principal no início",
        notes: "Artigos suportam até 125.000 caracteres"
      },
      twitter: {
        name: "X (Twitter)",
        limit: "280",
        shown: "~125 caracteres",
        bestPractice: "Coloque informações importantes no topo",
        notes: "Links reduzem os caracteres disponíveis"
      },
      instagram: {
        name: "Legenda do Instagram",
        limit: "2,200",
        shown: "~125 caracteres",
        bestPractice: "Prenda a atenção cedo, adicione CTA",
        notes: "Hashtags contam para o limite"
      },
      facebook: {
        name: "Publicação do Facebook",
        limit: "63,206",
        shown: "~160 caracteres",
        bestPractice: "Seja conciso",
        notes: "Imagens e links afetam a exibição"
      },
      threads: {
        name: "Threads",
        limit: "500",
        shown: "~125 caracteres",
        bestPractice: "Curto e envolvente",
        notes: "Plataforma baseada em texto da Meta"
      },
      sms: {
        name: "SMS (GSM)",
        limit: "160",
        shown: "160 por SMS",
        bestPractice: "Manter abaixo de 160",
        notes: "Textos mais longos são divididos em vários SMS"
      }
    }
  },

  whoIsItFor: {
      eyebrow: "PARA QUEM É?",
      title: "Perfeito para todos os criadores de conteúdo",
      roles: {
          marketers: {
              title: "Marketers",
              desc: "Otimize campanhas, textos publicitários e posts sociais para maximizar o alcance e o engajamento."
          },
          creators: {
              title: "Criadores",
              desc: "Escreva legendas e threads melhores que obtenham mais curtidas, compartilhamentos e salvamentos."
          },
          agencies: {
              title: "Agências",
              desc: "Gerencie vários clientes e garanta que cada postagem seja perfeitamente otimizada."
          },
          founders: {
              title: "Fundadores",
              desc: "Compartilhe atualizações e construa sua marca com conteúdo claro e impactante."
          }
      }
  },

  ctaBanner: {
    title: 'Pronto para otimizar o seu conteúdo?',
    body: 'Junte-se a milhares de criadores e profissionais de marketing que escrevem melhor, publicam de forma mais inteligente e obtêm mais engajamento.',
    cta: 'Comece a escrever grátis',
    noCard: 'Não é necessário cartão de crédito',
    free: 'Grátis para sempre',
  },

  island: {
    dashboard: {
      loadSample: 'Carregar uma publicação de exemplo →',
      sample:
        'Lançámos uma pequena funcionalidade na semana passada que duplicou discretamente a nossa taxa de conversão de avaliações em clientes pagantes.\n\n' +
        'Sem novos preços. Sem truques de crescimento. Apenas uma alteração ao fluxo de integração que retirou uma única decisão do primeiro ecrã.\n\n' +
        'Aqui está exatamente o que mudámos e as três coisas que medimos antes de o disponibilizar a todos → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
      samples: {
        linkedin:
          'Lançámos uma pequena funcionalidade na semana passada que duplicou discretamente a nossa taxa de conversão de avaliações em clientes pagantes.\n\n' +
          'Sem novos preços. Sem truques de crescimento. Apenas uma alteração ao fluxo de integração que retirou uma única decisão do primeiro ecrã.\n\n' +
          'Aqui está exatamente o que mudámos e as três coisas que medimos antes de o disponibilizar a todos → https://posttruncate.com/blog/onboarding\n\n' +
          '#saas #productled #growth #startups',
        twitter:
          'Na semana passada fizemos uma pequena alteração na integração e a nossa taxa de avaliação para cliente pagante duplicou.\n\n' +
          'Sem novos preços. Sem truques de crescimento. Apenas uma decisão a menos no primeiro ecrã.\n\n' +
          'A análise completa → https://posttruncate.com/blog/onboarding\n\n' +
          '#buildinpublic #saas',
        instagram:
          'Uma pequena alteração. O dobro dos resultados. 🚀\n\n' +
          'Na semana passada retirámos uma única decisão do nosso fluxo de integração — e vimos a nossa taxa de avaliação para cliente pagante duplicar. Sem novos preços, sem truques. ✨\n\n' +
          'A análise completa do que mudámos (e as 3 coisas que medimos) está na nossa bio. 👀\n\n' +
          '.\n.\n.\n' +
          '#saas #startup #designdeproduto #onboarding #crescimento #buildinpublic #empreendedor #techstartup',
        facebook:
          'Uma história rápida da semana passada 👇\n\n' +
          'Fizemos uma pequena alteração na nossa integração — apenas retirámos uma única decisão do primeiro ecrã — e a nossa taxa de avaliação para cliente pagante duplicou. Sem novos preços, sem truques de crescimento elaborados.\n\n' +
          'Escrevemos exatamente o que mudámos e as três coisas que medimos antes do lançamento. Leiam e digam-nos o que acham → https://posttruncate.com/blog/onboarding',
        threads:
          'ok isto é meio incrível — na semana passada retirámos UMA decisão do primeiro ecrã da nossa integração e a taxa de avaliação para cliente pagante literalmente duplicou.\n\n' +
          'sem novos preços. sem truques de crescimento. apenas menos atrito.\n\n' +
          'mais alguém já viu resultados tão grandes com uma alteração tão pequena?',
        sms:
          'Olá! Rapidamente — aquele ajuste de integração que lançámos na semana passada duplicou a nossa taxa de avaliação para cliente pagante. Escrevemos o que mudou + as 3 coisas que medimos: https://posttruncate.com/blog/onboarding',
      },
    },
    workspace: {
      eyebrow: 'Espaço de trabalho',
      title: 'Escreva a sua publicação',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} caráter oculto', other: '{n} caracteres ocultos' },
      placeholder: 'Comece a escrever a sua publicação. Cole um rascunho, adicione algumas ligações e hashtags e veja a pré-visualização de cada plataforma atualizar-se à direita…',
      placeholders: {
        linkedin: "Comece a digitar seu post. Cole um rascunho, adicione alguns links e hashtags, e veja a visualização ao vivo ser atualizada no LinkedIn à direita...",
        facebook: "Comece a digitar seu post. Cole um rascunho, adicione alguns links e hashtags, e veja a visualização ao vivo ser atualizada no Facebook à direita...",
        instagram: "Comece a digitar seu post. Cole um rascunho, adicione alguns links e hashtags, e veja a visualização ao vivo ser atualizada no Instagram à direita...",
        twitter: "Comece a digitar seu post. Cole um rascunho, adicione alguns links e hashtags, e veja a visualização ao vivo ser atualizada no X (Twitter) à direita...",
        threads: "Comece a digitar seu post. Cole um rascunho, adicione alguns links e hashtags, e veja a visualização ao vivo ser atualizada no Threads à direita...",
        sms: "Comece a digitar seu post. Cole um rascunho, adicione alguns links e hashtags, e veja a visualização ao vivo ser atualizada no SMS à direita...",
      },
      counters: {
        characters: 'Caracteres',
        words: 'Palavras',
        lines: 'Linhas',
        paragraphs: 'Parágrafos',
      },
      timers: {
        reading: 'Leitura',
        speaking: 'Fala',
        lessThan30Sec: '< 30 s',
        minute: { one: 'min', other: 'min' },
        second: { one: 's', other: 's' },
      },
      formatterLabel: 'Ferramentas de formato',
      uppercase: 'MAIÚSCULAS',
      lowercase: 'minúsculas',
      titleCase: 'Estilo título',
      sentenceCase: 'Estilo frase',
      emojiStripper: 'Remover emojis',
      hashtagExtractor: 'Extrair hashtags',
      engineLabel: 'Motor de otimização',
      clean: 'Limpar espaços em excesso',
      sanitize: 'Sanitizar texto',
      clear: 'Limpar editor',
      hiddenWarning:
        'Foram encontrados caracteres invisíveis que quebram as contagens e os leitores de ecrã: {codes}. Sanitize para os remover.',
      statusLine: 'A análise em tempo real está ativa',
    },
    imageUpload: {
      add: 'Adicionar imagem',
      replace: 'Substituir imagem',
      remove: 'Remover imagem',
      hint: 'Apenas pré-visualização — nunca enviada nem armazenada. Some ao recarregar.',
    },
    aiImprove: {
      button: 'Melhorar com IA',
      pickTone: 'Melhorar com IA',
      pickToneSub: 'Escolha um tom — a IA reescreve a sua publicação.',
      tones: {
        professional: 'Profissional',
        casual: 'Casual',
        marketing: 'Marketing',
        friendly: 'Amigável',
        concise: 'Conciso',
      },
      cancel: 'Cancelar',
      improving: 'A melhorar a sua publicação…',
      undo: 'Desfazer',
      reverted: 'Texto original restaurado.',
      remaining: {
        one: '{n} de {max} melhoria de IA restante',
        other: '{n} de {max} melhorias de IA restantes',
      },
      limitReached: 'Já usou todas as suas melhorias de IA. Tente novamente em {time}.',
      errorGeneric: 'Não foi possível melhorar o texto. Tente novamente.',
      errorEmpty: 'Escreva algo primeiro.',
      errorTooLong: 'O texto é demasiado longo para Melhorar com IA (máx. {max} caracteres).',
      errorUnavailable: 'Melhorar com IA está temporariamente indisponível.',
    },
    previewPanel: {
      title: 'Pré-visualização ao vivo por plataforma',
      tabAria: 'Pré-visualização do {platform}',
      compareAll: 'Comparar todas',
      showHidden: 'Mostrar texto oculto',
    },
    insights: {
      title: 'Insights avançados',
      sub: 'Análise de escrita, legibilidade, palavras-chave e mais',
      subScoped: 'Legibilidade, Densidade de palavras-chave',
    },
    hookStrip: {
      heading: 'Veja como o seu post se comporta em todo o lado',
      viewAll: 'Ver todos os limites por plataforma',
      limitLabel: 'Limite: {n}',
      perSms: '{n} por SMS',
      survives: 'Gancho visível',
      cut: 'Gancho cortado',
      risk: 'Gancho em risco',
      smsNeeded: '{n} SMS necessários',
      chars: '{n} caracteres',
    },
    common: {
      displayName: 'O Seu Nome',
      handle: 'voce',
      timestamp: '11 h',
      charsSuffix: '{n} caracteres',
      actions: {
        like: 'Gosto',
        comment: 'Comentar',
        share: 'Partilhar',
      },
    },
    sms: {
      placeholder: 'Escreva ou cole aqui a sua mensagem SMS — verá a codificação (GSM-7 ou Unicode), a contagem de caracteres ao vivo e quantos segmentos será enviada.',
      eyebrow: 'SMS',
      title: 'Contador global de caracteres',
      characterCount: 'Contagem de caracteres',
      charactersLeft: 'Caracteres restantes',
      parts: 'Mensagens',
      encoding: 'Codificação',
      encodingGsm: 'GSM 7 bits',
      encodingUnicode: 'Unicode',
      partsValue: '{n} mensagens',
      gsmNote:
        'GSM 7-bit: 160 caracteres para um SMS, depois 153 por SMS concatenado. Caracteres da tabela estendida como €, [, ], {, }, \\ e | contam como 2.',
      unicodeNote:
        'Unicode UTF-16: 70 caracteres para um SMS, depois 67 por SMS concatenado. Aplica-se quando existe qualquer emoji ou escrita não GSM.',
    },
    linkedin: {
      title: 'Pré-visualização da zona do gancho',
      viewAriaLabel: 'Vista da dobra do LinkedIn',
      viewDesktop: 'Computador',
      viewMobile: 'Telemóvel',
      badgeTruncated: 'Texto do feed truncado',
      badgeOverLimit: 'Acima do limite da publicação',
      badgeSafe: 'Linha do gancho segura',
      beforeFold: '{total} / {limit} antes da dobra',
      postLimit: '{total} / {limit} limite da publicação',
      seeMore: '…ver mais',
      headline: 'Fundador e CEO',
      connectionDegree: '3.º',
      placeholder: 'As primeiras linhas da sua publicação aparecem aqui…',
      overLimitNote:
        'As publicações do LinkedIn estão limitadas a {limit} caracteres. Encurte {excess} antes de publicar.',
      truncatedNote:
        'Os leitores veem apenas os primeiros {limit} caracteres no feed. Coloque o gancho logo no início, antes da dobra.',
      safeNote:
        'A sua publicação inteira cabe acima da dobra {view} do LinkedIn — sem truncagem «…ver mais».',
    },
    twitter: {
      title: 'Divisor de threads',
      badgeIdle: 'Inativo',
      badgeThread: 'Thread de {n} tweets',
      badgeSingle: 'Tweet único',
      links: {
        one: '{n} ligação · contada como {weight} cada',
        other: '{n} ligações · contadas como {weight} cada',
      },
      weightedLength: 'Comprimento ponderado',
      placeholder:
        'A pré-visualização do seu tweet aparece aqui. Passe dos {limit} caracteres e divide-se automaticamente numa thread.',
    },
    threads: {
      title: 'Pré-visualização de publicação e cadeia',
      badgeIdle: 'Inativo',
      badgeThread: 'Cadeia de {n} publicações',
      badgeSingle: 'Publicação única',
      links: {
        one: '{n} ligação · contada na totalidade',
        other: '{n} ligações · contadas na totalidade',
      },
      charLength: 'Comprimento em caracteres',
      placeholder:
        'A sua pré-visualização do Threads aparece aqui. Passe dos {limit} caracteres e encadeia-se numa sequência numerada de publicações.',
    },
    meta: {
      title: 'Monitor de formatação',
      badgeNeedsFix: 'Precisa de correção',
      badgeClean: 'Parece limpo',
      badgeCaptionOver: 'Legenda demasiado longa',
      captionLimit: '{total} / {limit} limite da legenda',
      captionOver:
        'As legendas do Instagram estão limitadas a {limit} caracteres. Encurte {excess} antes de publicar.',
      hashtagLabel: 'Concentração de hashtags',
      over: 'Acima do limite máximo do Instagram de {limit} hashtags — a legenda não será publicada. Remova {excess}.',
      approaching:
        'A aproximar-se do limite de 5 tags. Reduza às suas tags de maior intenção.',
      within: 'Confortavelmente dentro do limite de 5 hashtags do Instagram.',
      none: 'Ainda não foram detetadas hashtags.',
      a11yLabel: 'Acessibilidade · tipos de letra decorativos',
      audiencePublic: 'Público',
      flagged: '{n} assinalados',
      flaggedNone: 'Nenhum',
      fancyDetected: {
        one: 'Foi detetado {n} caráter de «tipo de letra» pseudo-Unicode (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Parecem estilizados, mas os leitores de ecrã ignoram-nos ou soletram-nos — prejudicam o alcance e a acessibilidade.',
        other:
          'Foram detetados {n} caracteres de «tipo de letra» pseudo-Unicode (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Parecem estilizados, mas os leitores de ecrã ignoram-nos ou soletram-nos — prejudicam o alcance e a acessibilidade.',
      },
      fancyClean:
        'Não foram detetados caracteres de tipo de letra decorativo. O seu texto é lido corretamente em tecnologia de apoio.',
      footnote:
        '{n} caracteres · Dobra do Facebook ≈ 480 · Limite da legenda do Instagram 2200',
    },
    keywords: {
      eyebrow: 'Palavras-chave',
      title: 'Monitor de utilização excessiva',
      badgeIdle: 'Inativo',
      badgeStuffing: 'Excesso de palavras-chave',
      badgeBalanced: 'Equilibrado',
      colKeyword: 'Palavra-chave',
      colUses: 'Usos',
      colDensity: 'Densidade',
      overused: 'Em excesso',
      empty: 'Comece a escrever para ver as suas palavras-chave mais usadas e a respetiva densidade.',
      stuffingNote:
        'As palavras-chave destacadas ultrapassam {threshold}% de densidade — os motores de pesquisa podem interpretar isto como excesso de palavras-chave. Varie a sua formulação.',
      footnote:
        '{total} palavras · palavras-chave acima de {threshold}% de densidade são assinaladas',
    },
    seoPreview: {
      eyebrow: 'Pré-visualização SEO',
      title: 'Simulador de SERP do Google',
      badgeIdle: 'Inativo',
      badgeSafe: 'Ok',
      badgeWarn: 'Limite excedido',
      titleLabel: 'Título da página',
      titleCounter: '{n} / {limit}',
      pixelNote: '~{px}px · Google corta em ~{max}px',
      titleOverChar:
        'O título excede {limit} caracteres — o Google pode truncar nos resultados de pesquisa.',
      titleOverPixel:
        'O título pode ser cortado nos resultados de pesquisa (limite de ~{max}px de renderização).',
      descLabel: 'Meta descrição',
      descCounter: '{n} / {limit}',
      descOverChar: 'A descrição excede {limit} caracteres.',
      previewLabel: 'Pré-visualização no Google Search',
      titlePlaceholder: 'O título da sua página…',
      descPlaceholder: 'Uma breve descrição da sua página para os resultados de pesquisa…',
    },
    readability: {
      eyebrow: 'Legibilidade',
      title: 'Facilidade de leitura Flesch',
      scoreLabel: 'Facilidade de leitura',
      gradeLabel: 'Nível escolar',
      descriptors: {
        veryEasy: 'Muito fácil',
        easy: 'Fácil',
        fairlyEasy: 'Bastante fácil',
        standard: 'Padrão',
        fairlyDifficult: 'Bastante difícil',
        difficult: 'Difícil',
        veryDifficult: 'Muito difícil',
      },
      tooltip:
        'A facilidade de leitura Flesch avalia o texto numa escala de 0 a 100. Quanto maior a pontuação, mais fácil é a leitura. Entre 60 e 70 é prosa padrão.',
      notApplicable:
        'A fórmula Flesch foi concebida para textos em escrita latina e não se aplica a este idioma. Use a contagem de palavras como medida principal de legibilidade.',
    },
    toolLinks: {
      linkedin: 'Saiba mais sobre os limites de caracteres do LinkedIn →',
      twitter: 'Saiba mais sobre os limites de caracteres do X / Twitter →',
      instagram: 'Saiba mais sobre os limites de caracteres do Instagram →',
      facebook: 'Saiba mais sobre os limites de caracteres do Facebook →',
      threads: 'Saiba mais sobre os limites de caracteres do Threads →',
    },
    embed: {
      placeholder: 'Comece a escrever para contar caracteres…',
      charCount: 'Caracteres',
      wordCount: 'Palavras',
      remaining: '{n} restantes',
      overLimit: '{n} a mais',
      platforms: {
        twitter: 'X / Twitter',
        linkedin: 'LinkedIn',
        threads: 'Threads',
        instagram: 'Instagram',
        sms: 'SMS',
      },
    },
    hook: {
      eyebrow: 'Visibilidade do gancho',
      title: 'Verificação acima da dobra',
      statusPass: 'Gancho sobrevive',
      statusWarn: 'CTA abaixo da dobra',
      statusFail: 'Gancho cortado',
      statusIdle: 'Ainda sem texto',
      reasonEmpty: 'Adicione texto para ver o que sobrevive à dobra.',
      reasonFits: 'Toda a sua publicação cabe acima da dobra — nada fica oculto.',
      reasonHookCut: 'O seu gancho inicial é cortado pela dobra “…mais”.',
      reasonCtaBelow: 'O seu CTA fica abaixo da dobra “…mais”.',
      reasonHookOnly: 'O seu gancho passa a dobra; nenhum CTA detetado.',
      reasonHookAndCta: 'O seu gancho e o seu CTA passam ambos a dobra.',
      xReasonFits: 'Toda a sua publicação cabe num único tweet.',
      xReasonHookCut: 'O seu gancho inicial passa para um segundo tweet.',
      xReasonCtaBelow: 'O seu CTA aparece num tweet encadeado.',
      xReasonHookOnly: 'O seu gancho cabe no primeiro tweet; nenhum CTA detetado.',
      xReasonHookAndCta: 'O seu gancho e CTA cabem no primeiro tweet.',
      foldLabel: 'dobra',
      foldAria: 'Linha da dobra — o texto abaixo fica oculto atrás de “…mais”.',
      summary: '{pass} de {total} plataformas mantêm o gancho visível',
    },
    calculators: {
      wordsPerPage: {
        eyebrow: 'Palavras em páginas',
        title: 'Calculadora de páginas',
        badgeIdle: 'Digite o texto',
        badgeResult: 'Estimado',
        modeAria: 'Escolha como inserir o seu texto',
        modeText: 'Colar texto',
        modeCount: 'N.º de palavras',
        placeholder: 'Cole ou digite o seu texto aqui para contar as palavras…',
        wordsLabel: 'Número de palavras',
        wordsPlaceholder: 'ex.: 1500',
        fontSizeLabel: 'Tamanho da fonte',
        spacingLabel: 'Espaçamento entre linhas',
        spacingSingle: 'Simples',
        spacingOneAndHalf: '1,5 linhas',
        spacingDouble: 'Duplo',
        pagesLabel: 'Páginas',
        wordsStatLabel: 'Palavras',
        perPageNote: '{n} palavras por página nesta configuração',
        referenceHeading: 'Contagens de palavras comuns',
        refWordsCol: 'Palavras',
        refPagesCol: 'Páginas',
        fontLabel: 'Fonte',
        pageFormatLabel: 'Tamanho da página',
        marginsLabel: 'Margens',
        marginTop: 'Superior',
        marginRight: 'Direita',
        marginBottom: 'Inferior',
        marginLeft: 'Esquerda',
        unitsLabel: 'Unidades',
        unitInch: 'polegadas',
        unitCm: 'cm',
        printButton: 'Imprimir',
      },
      readingTime: {
        eyebrow: 'Tempo de leitura e de fala',
        title: 'Calculadora de tempo de leitura',
        badgeIdle: 'Digite o texto',
        badgeResult: 'Estimado',
        modeAria: 'Escolha como inserir o seu texto',
        modeText: 'Colar texto',
        modeCount: 'N.º de palavras',
        placeholder: 'Cole ou digite o seu texto aqui para estimar o tempo de leitura e de fala…',
        wordsLabel: 'Número de palavras',
        wordsPlaceholder: 'ex.: 1500',
        readingSpeedLabel: 'Velocidade de leitura',
        speakingSpeedLabel: 'Velocidade de fala',
        speedSlow: 'Lenta',
        speedAverage: 'Média',
        speedFast: 'Rápida',
        wpmShort: 'ppm',
        wordsStatLabel: 'Palavras',
        referenceHeading: 'Comprimentos comuns',
        refWordsCol: 'Palavras',
        refReadingCol: 'Leitura',
        refSpeakingCol: 'Fala',
      },
      byteCounter: {
        eyebrow: 'Contador de bytes',
        title: 'Calculadora de bytes UTF-8',
        badgeIdle: 'Digite o texto',
        badgeResult: 'Contado',
        placeholder: 'Cole ou digite texto para contar o tamanho em bytes…',
        utf8Label: 'Bytes UTF-8',
        utf16Label: 'Bytes UTF-16',
        utf32Label: 'Bytes UTF-32',
        charactersLabel: 'Caracteres',
        codePointsLabel: 'Pontos de código',
        note: 'O UTF-8 usa de 1 a 4 bytes por caractere: ASCII 1 byte, latim acentuado 2, a maioria do CJK 3 e os emojis 4.',
      },
      emojiDetector: {
        eyebrow: 'Emojis e caracteres ocultos',
        title: 'Contador de emojis e detetor de caracteres invisíveis',
        badgeIdle: 'Digite o texto',
        badgeClean: 'Limpo',
        badgeWarn: 'Ocultos detetados',
        placeholder: 'Cole ou digite texto para contar emojis e detetar caracteres invisíveis…',
        emojiLabel: 'Emojis',
        charactersLabel: 'Caracteres',
        hiddenLabel: 'Caracteres ocultos',
        cleanNote: 'Não foram detetados caracteres invisíveis ou de largura zero.',
        removeButton: 'Remover caracteres ocultos',
        removedNote: 'Removidos {n} caracteres ocultos.',
        note: 'Caracteres invisíveis como espaços de largura zero podem quebrar o copiar e colar, a pesquisa e os leitores de ecrã. Use Remover para os retirar.',
      },
      platformCounter: {
        title: 'Contador de caracteres',
        badgeIdle: 'Digite o texto',
        badgeSafe: 'Dentro do limite',
        badgeOver: 'Acima do limite',
        placeholder: 'Escreva ou cole o seu texto…',
        counter: '{n} / {limit}',
        remaining: '{n} restantes',
        over: '{n} a mais',
        fields: {
          title: 'Título',
          description: 'Descrição',
          caption: 'Legenda',
          bio: 'Biografia',
          post: 'Publicação',
          message: 'Mensagem',
          status: 'Estado',
          about: 'Sobre',
        },
      },
      sentenceCounter: {
        eyebrow: 'Frases e parágrafos',
        title: 'Contador de frases e parágrafos',
        badgeIdle: 'Digite o texto',
        badgeResult: 'Contado',
        placeholder: 'Cole ou digite texto para contar frases e parágrafos…',
        sentencesLabel: 'Frases',
        note: 'A contagem de frases é uma estimativa — abreviaturas e decimais podem alterar ligeiramente o total.',
      },
      clear: 'Limpar',
    },
  },
};
