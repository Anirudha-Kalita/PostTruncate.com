// ──────────────────────────────────────────────────────────────────────────
// Tool definition registry for the 70 sub-tool pages.
// Each entry drives one page per locale (10 locales × N tools).
//
// Conventions:
//  • slugs/titles/metaDescriptions/content/schemaName are keyed by locale code.
//  • Falls back to "en" at render time if a locale key is missing.
//  • content values should be 300+ words of keyword-rich, locale-native prose.
//  • editorAnchor is the in-page #hash that deep-links into the Dashboard.
// ──────────────────────────────────────────────────────────────────────────

export interface ToolDefinition {
  /** Stable machine id, e.g. "twitter-character-counter". Never change after publish. */
  id: string;
  /** Hash fragment (without #) that scrolls to this tool's card in the editor. */
  editorAnchor: string;
  /** ISO date-only (YYYY-MM-DD) when this tool's content was last revised. */
  lastUpdated: string;
  /** locale → URL slug segment, e.g. { en: "twitter-character-counter", de: "twitter-zeichenzaehler" } */
  slugs: Record<string, string>;
  /** locale → page <title> */
  titles: Record<string, string>;
  /** locale → meta description (≤160 chars recommended) */
  metaDescriptions: Record<string, string>;
  /** locale → 300+ word body content (may contain inline HTML like <strong>) */
  content: Record<string, string>;
  /** locale → short intro lede shown above the embedded tool on platform pages. Optional. */
  intro?: Record<string, string>;
  /**
   * locale → platform-specific FAQ items, rendered as an accordion and as
   * FAQPage JSON-LD from this single source. Optional; its presence switches a
   * platform page to the standalone template (embedded tool + FAQ + cross-promo).
   */
  faq?: Record<string, { q: string; a: string }[]>;
  /** locale → tool name used in WebApplication JSON-LD schema */
  schemaName: Record<string, string>;
  /** Plain English description of platform character/word limits — used as a shared reference when authoring content. Not rendered directly. */
  platformLimits: string;
  /**
   * Optional cross-promo to a sibling tool (used by the calculator pages):
   * the related tool's `id` plus a locale-keyed promo blurb. The link label and
   * URL are resolved at render time from the related tool's schemaName + slug.
   */
  related?: { id: string; blurb: Record<string, string> };
}

export const tools: ToolDefinition[] = [
  {
    id: 'twitter',
    editorAnchor: 'workspace',
    lastUpdated: '2026-05-18',
    platformLimits:
      '280 characters per tweet, links always count as 23 characters regardless of length, unlimited thread tweets',

    slugs: {
      en: 'twitter-character-counter',
      es: 'contador-caracteres-twitter',
      de: 'twitter-zeichenzaehler',
      fr: 'compteur-caracteres-twitter',
      pt: 'contador-caracteres-twitter',
      it: 'contatore-caratteri-twitter',
      nl: 'twitter-tekenteller',
      ja: 'twitter-moji-kaunta',
      zh: 'twitter-zi-fu-ji-shu',
      da: 'twitter-tegntaeller',
    },

    schemaName: {
      en: 'Twitter / X Character Counter',
      es: 'Contador de Caracteres para Twitter / X',
      de: 'Twitter / X Zeichenzähler',
      fr: 'Compteur de Caractères Twitter / X',
      pt: 'Contador de Caracteres do Twitter / X',
      it: 'Contatore di Caratteri per Twitter / X',
      nl: 'Twitter / X Tekenteller',
      ja: 'Twitter / X 文字数カウンター',
      zh: 'Twitter / X 字符计数器',
      da: 'Twitter / X Tegntæller',
    },

    titles: {
      en: 'Twitter / X Character Counter — Free 280-Char Tweet Counter',
      es: 'Contador de Caracteres Twitter / X — Cuenta tus 280 caracteres gratis',
      de: 'Twitter / X Zeichenzähler — 280 Zeichen kostenlos zählen',
      fr: 'Compteur de Caractères Twitter / X — 280 caractères gratuitement',
      pt: 'Contador de Caracteres Twitter / X — Conte os 280 caracteres grátis',
      it: 'Contatore Caratteri Twitter / X — Conta i 280 caratteri gratis',
      nl: 'Twitter / X Tekenteller — Gratis 280-tekens tweetteller',
      ja: 'Twitter / X 文字数カウンター — 280文字を無料でカウント',
      zh: 'Twitter / X 字符计数器 — 免费统计280字符推文',
      da: 'Twitter / X Tegntæller — Tæl 280 tegn gratis',
    },

    metaDescriptions: {
      en: 'Free Twitter/X character counter. Track the 280-character limit live, see why every link counts as 23 chars, and auto-split long posts into clean threads.',
      es: 'Contador de caracteres para Twitter/X gratis. Controla el límite de 280 caracteres en vivo, descubre por qué cada enlace cuenta como 23 y divide textos largos en hilos.',
      de: 'Kostenloser Twitter/X-Zeichenzähler. Verfolge das 280-Zeichen-Limit live, sieh warum jeder Link als 23 Zeichen zählt und teile lange Texte automatisch in Threads.',
      fr: 'Compteur de caractères Twitter/X gratuit. Suivez la limite de 280 caractères en direct, voyez pourquoi chaque lien compte 23 caractères et divisez vos textes en fils.',
      pt: 'Contador de caracteres para Twitter/X gratuito. Acompanhe o limite de 280 caracteres ao vivo, veja por que cada link conta como 23 e divida textos longos em threads.',
      it: 'Contatore di caratteri Twitter/X gratuito. Monitora il limite di 280 caratteri in tempo reale, scopri perché ogni link conta 23 caratteri e dividi i testi lunghi in thread.',
      nl: 'Gratis Twitter/X tekenteller. Volg de 280-tekenlimiet live, zie waarom elke link als 23 tekens telt en splits lange berichten automatisch op in threads.',
      ja: '無料のTwitter/X文字数カウンター。280文字の上限をリアルタイムで確認、リンクが23文字としてカウントされる理由、長文をスレッドに自動分割する機能をチェック。',
      zh: '免费Twitter/X字符计数器。实时追踪280字符上限，了解每个链接为何计为23字符，并将长文本自动拆分为推文串。',
      da: 'Gratis Twitter/X tegntæller. Følg 280-tegns-grænsen live, se hvorfor hvert link tæller som 23 tegn, og opdel lange tekster automatisk i tråde.',
    },

    intro: {
      en: "Check any tweet against X's real limits before you post — the counter below updates live as you type, applies the 23-character link rule, and splits long drafts into clean threads.",
      es: "Comprueba cualquier tweet con los límites reales de X antes de publicar: el contador de abajo se actualiza en vivo mientras escribes, aplica la regla de los 23 caracteres para enlaces y divide los textos largos en hilos limpios.",
      de: "Prüfe jeden Tweet anhand der echten Limits von X, bevor du postest — der Zähler unten aktualisiert sich live beim Tippen, wendet die 23-Zeichen-Regel für Links an und teilt lange Entwürfe in saubere Threads.",
      fr: "Vérifiez n'importe quel tweet selon les vraies limites de X avant de publier : le compteur ci-dessous se met à jour en direct pendant que vous écrivez, applique la règle des 23 caractères pour les liens et divise les longs brouillons en fils nets.",
      pt: "Confira qualquer tweet com os limites reais do X antes de publicar: o contador abaixo é atualizado ao vivo enquanto você digita, aplica a regra dos 23 caracteres para links e divide textos longos em threads organizadas.",
      it: "Controlla qualsiasi tweet con i limiti reali di X prima di pubblicare: il contatore qui sotto si aggiorna in tempo reale mentre scrivi, applica la regola dei 23 caratteri per i link e divide le bozze lunghe in thread ordinati.",
      nl: "Controleer elke tweet aan de echte limieten van X voordat je plaatst — de teller hieronder werkt live bij terwijl je typt, past de 23-tekenregel voor links toe en splitst lange concepten in nette threads.",
      ja: "投稿する前に、Xの実際の制限でツイートをチェック。下のカウンターは入力中にリアルタイムで更新され、リンクの23文字ルールを適用し、長い下書きをきれいなスレッドに分割します。",
      zh: "发布前用 X 的真实限制检查任意推文：下方的计数器在你输入时实时更新，应用链接 23 字符规则，并将长草稿拆分为整齐的推文串。",
      da: "Tjek ethvert tweet mod X's reelle grænser, før du poster — tælleren nedenfor opdateres live, mens du skriver, anvender 23-tegns-reglen for links og opdeler lange udkast i rene tråde.",
    },

    faq: {
      en: [
        {
          q: 'Is the X character limit still 280?',
          a: 'For free accounts, yes — standard posts, replies, and quote posts are all capped at 280 characters. X Premium subscribers can publish long posts of up to 25,000 characters, but everyone reading without Premium still sees the same public post.',
        },
        {
          q: 'Do links and images count toward the 280-character limit?',
          a: 'Links do: every URL counts as a flat 23 characters via the t.co shortener, even when it displays in full. Attached photos, videos, GIFs, and polls don\'t count at all, and a quoted post\'s URL is free too.',
        },
        {
          q: 'Why does my Japanese or emoji-heavy tweet hit the limit so fast?',
          a: 'X uses weighted character counting. Latin letters and digits weigh 1, but characters in CJK ranges (Chinese, Japanese, Korean) and most emoji weigh 2 apiece — so a visually short post can still reach 280. The counter on this page reflects that weighting in real time.',
        },
        {
          q: 'How do I post something longer than 280 characters?',
          a: 'Either subscribe to X Premium for long posts, or split your text into a thread. Paste your draft into the editor above and the thread splitter breaks it into numbered, sub-280 tweets at natural sentence boundaries.',
        },
      ],
      es: [
        { q: "¿El límite de caracteres de X sigue siendo 280?", a: "En las cuentas gratuitas, sí: las publicaciones, respuestas y citas tienen un límite de 280 caracteres. Los suscriptores de X Premium pueden publicar posts largos de hasta 25 000 caracteres, pero quien lee sin Premium ve la misma publicación pública." },
        { q: "¿Los enlaces y las imágenes cuentan para el límite de 280 caracteres?", a: "Los enlaces sí: cada URL cuenta como 23 caracteres fijos por el acortador t.co, aunque se muestre completa. Las fotos, vídeos, GIF y encuestas adjuntos no cuentan, y la URL de una cita tampoco." },
        { q: "¿Por qué mi tweet en japonés o con muchos emojis llega tan rápido al límite?", a: "X usa un recuento ponderado. Las letras y cifras latinas pesan 1, pero los caracteres de los rangos CJK (chino, japonés, coreano) y la mayoría de los emojis pesan 2 cada uno, así que un texto corto a la vista puede alcanzar los 280. El contador de esta página refleja esa ponderación en tiempo real." },
        { q: "¿Cómo publico algo de más de 280 caracteres?", a: "Suscríbete a X Premium para posts largos o divide tu texto en un hilo. Pega tu borrador en el editor de arriba y el divisor de hilos lo separa en tweets numerados de menos de 280 caracteres en los límites naturales de las frases." },
      ],
      de: [
        { q: "Liegt das Zeichenlimit von X immer noch bei 280?", a: "Bei kostenlosen Konten ja: Beiträge, Antworten und Zitate sind auf 280 Zeichen begrenzt. X-Premium-Abonnenten können lange Beiträge mit bis zu 25.000 Zeichen veröffentlichen, doch ohne Premium sieht man denselben öffentlichen Beitrag." },
        { q: "Zählen Links und Bilder zum 280-Zeichen-Limit?", a: "Links schon: Jede URL zählt durch den t.co-Shortener pauschal 23 Zeichen, auch wenn sie vollständig angezeigt wird. Angehängte Fotos, Videos, GIFs und Umfragen zählen gar nicht, und die URL eines Zitats ist ebenfalls frei." },
        { q: "Warum erreicht mein japanischer oder emoji-lastiger Tweet das Limit so schnell?", a: "X verwendet eine gewichtete Zählung. Lateinische Buchstaben und Ziffern wiegen 1, aber Zeichen aus den CJK-Bereichen (Chinesisch, Japanisch, Koreanisch) und die meisten Emojis wiegen je 2 — ein optisch kurzer Beitrag kann so trotzdem 280 erreichen. Der Zähler hier spiegelt diese Gewichtung in Echtzeit wider." },
        { q: "Wie poste ich etwas, das länger als 280 Zeichen ist?", a: "Abonniere X Premium für lange Beiträge oder teile deinen Text in einen Thread. Füge deinen Entwurf in den Editor oben ein und der Thread-Splitter zerlegt ihn an natürlichen Satzgrenzen in nummerierte Tweets unter 280 Zeichen." },
      ],
      fr: [
        { q: "La limite de caractères de X est-elle toujours de 280 ?", a: "Pour les comptes gratuits, oui : les posts, réponses et citations sont limités à 280 caractères. Les abonnés X Premium peuvent publier de longs posts jusqu'à 25 000 caractères, mais sans Premium on voit le même post public." },
        { q: "Les liens et les images comptent-ils dans la limite de 280 caractères ?", a: "Les liens oui : chaque URL compte pour 23 caractères fixes via le raccourcisseur t.co, même affichée en entier. Les photos, vidéos, GIF et sondages joints ne comptent pas, et l'URL d'une citation est gratuite aussi." },
        { q: "Pourquoi mon tweet en japonais ou plein d'émojis atteint-il si vite la limite ?", a: "X utilise un comptage pondéré. Les lettres et chiffres latins pèsent 1, mais les caractères des plages CJK (chinois, japonais, coréen) et la plupart des émojis pèsent 2 chacun — un texte visuellement court peut donc atteindre 280. Le compteur de cette page reflète cette pondération en temps réel." },
        { q: "Comment publier un texte de plus de 280 caractères ?", a: "Abonnez-vous à X Premium pour les longs posts, ou divisez votre texte en fil. Collez votre brouillon dans l'éditeur ci-dessus et le diviseur de fils le découpe en tweets numérotés de moins de 280 caractères aux limites naturelles des phrases." },
      ],
      pt: [
        { q: "O limite de caracteres do X ainda é 280?", a: "Em contas gratuitas, sim: publicações, respostas e citações têm limite de 280 caracteres. Assinantes do X Premium podem publicar posts longos de até 25.000 caracteres, mas quem lê sem Premium vê a mesma publicação pública." },
        { q: "Links e imagens contam para o limite de 280 caracteres?", a: "Links contam: cada URL conta como 23 caracteres fixos pelo encurtador t.co, mesmo exibida por completo. Fotos, vídeos, GIFs e enquetes anexados não contam, e a URL de uma citação também é gratuita." },
        { q: "Por que meu tweet em japonês ou com muitos emojis atinge o limite tão rápido?", a: "O X usa contagem ponderada. Letras e números latinos pesam 1, mas caracteres das faixas CJK (chinês, japonês, coreano) e a maioria dos emojis pesam 2 cada — então um texto curto na aparência pode chegar a 280. O contador desta página reflete esse peso em tempo real." },
        { q: "Como publico algo com mais de 280 caracteres?", a: "Assine o X Premium para posts longos ou divida seu texto em uma thread. Cole seu rascunho no editor acima e o divisor de threads o separa em tweets numerados com menos de 280 caracteres nos limites naturais das frases." },
      ],
      it: [
        { q: "Il limite di caratteri di X è ancora 280?", a: "Per gli account gratuiti sì: post, risposte e citazioni hanno un limite di 280 caratteri. Gli abbonati a X Premium possono pubblicare post lunghi fino a 25.000 caratteri, ma chi legge senza Premium vede lo stesso post pubblico." },
        { q: "I link e le immagini contano per il limite di 280 caratteri?", a: "I link sì: ogni URL conta come 23 caratteri fissi tramite l'abbreviatore t.co, anche se mostrata per intero. Foto, video, GIF e sondaggi allegati non contano, e anche l'URL di una citazione è gratuita." },
        { q: "Perché il mio tweet in giapponese o pieno di emoji raggiunge così in fretta il limite?", a: "X usa un conteggio ponderato. Lettere e cifre latine pesano 1, ma i caratteri degli intervalli CJK (cinese, giapponese, coreano) e la maggior parte delle emoji pesano 2 ciascuno — così un testo visivamente breve può comunque arrivare a 280. Il contatore di questa pagina riflette questo peso in tempo reale." },
        { q: "Come pubblico qualcosa di più lungo di 280 caratteri?", a: "Abbonati a X Premium per i post lunghi, oppure dividi il testo in un thread. Incolla la bozza nell'editor qui sopra e il divisore di thread la suddivide in tweet numerati sotto i 280 caratteri ai confini naturali delle frasi." },
      ],
      nl: [
        { q: "Is de tekenlimiet van X nog steeds 280?", a: "Voor gratis accounts wel: posts, reacties en quotes zijn beperkt tot 280 tekens. X Premium-abonnees kunnen lange posts tot 25.000 tekens plaatsen, maar wie zonder Premium leest, ziet hetzelfde openbare bericht." },
        { q: "Tellen links en afbeeldingen mee voor de limiet van 280 tekens?", a: "Links wel: elke URL telt via de t.co-verkorter als vaste 23 tekens, ook als die volledig wordt getoond. Bijgevoegde foto's, video's, GIF's en polls tellen helemaal niet mee, en de URL van een quote is ook gratis." },
        { q: "Waarom bereikt mijn Japanse of emoji-rijke tweet de limiet zo snel?", a: "X gebruikt gewogen tellen. Latijnse letters en cijfers wegen 1, maar tekens uit de CJK-bereiken (Chinees, Japans, Koreaans) en de meeste emoji wegen er elk 2 — een visueel korte post kan zo toch 280 raken. De teller op deze pagina weerspiegelt die weging in real time." },
        { q: "Hoe plaats ik iets dat langer is dan 280 tekens?", a: "Neem X Premium voor lange posts, of splits je tekst in een thread. Plak je concept in de editor hierboven en de thread-splitter verdeelt het in genummerde tweets onder de 280 tekens op natuurlijke zinsgrenzen." },
      ],
      ja: [
        { q: "Xの文字数制限はまだ280文字ですか？", a: "無料アカウントでははい。投稿・返信・引用はすべて280文字までです。X Premiumの加入者は最大25,000文字の長文投稿を公開できますが、Premiumなしで読む人には同じ公開投稿が表示されます。" },
        { q: "リンクや画像は280文字の制限に含まれますか？", a: "リンクは含まれます。各URLはt.co短縮機能により、全文表示されても一律23文字としてカウントされます。添付した写真・動画・GIF・アンケートはまったくカウントされず、引用元のURLも無料です。" },
        { q: "なぜ日本語や絵文字の多いツイートはすぐ制限に達するのですか？", a: "Xは重み付きカウントを使います。ラテン文字や数字は1、CJK（中国語・日本語・韓国語）の文字とほとんどの絵文字はそれぞれ2の重みです。見た目が短くても280に達することがあります。このページのカウンターはその重み付けをリアルタイムで反映します。" },
        { q: "280文字を超える投稿はどうすればできますか？", a: "X Premiumに加入して長文投稿にするか、テキストをスレッドに分割します。上のエディターに下書きを貼り付けると、スレッド分割機能が自然な文の区切りで280文字未満の番号付きツイートに分けます。" },
      ],
      zh: [
        { q: "X 的字符上限还是 280 吗？", a: "免费账户是的：发帖、回复和引用均上限 280 字符。X Premium 订阅者可发布最多 25,000 字符的长帖，但没有 Premium 的读者看到的仍是同一条公开帖子。" },
        { q: "链接和图片会计入 280 字符上限吗？", a: "链接会：每个 URL 经 t.co 短链接服务固定计为 23 字符，即使完整显示也一样。附带的图片、视频、GIF 和投票完全不计入，引用帖的 URL 也免费。" },
        { q: "为什么我的日文或多表情推文这么快就到上限？", a: "X 采用加权计数。拉丁字母和数字各计 1，但 CJK（中文、日文、韩文）字符和大多数表情各计 2，因此看起来很短的内容也可能达到 280。本页计数器实时反映这种加权。" },
        { q: "怎样才能发布超过 280 字符的内容？", a: "订阅 X Premium 发布长帖，或将文本拆分为推文串。把草稿粘贴到上方编辑器，推文串分割功能会在自然句子边界处将其拆分为不超过 280 字符的编号推文。" },
      ],
      da: [
        { q: "Er tegngrænsen på X stadig 280?", a: "For gratis konti, ja: opslag, svar og citater er begrænset til 280 tegn. X Premium-abonnenter kan udgive lange opslag på op til 25.000 tegn, men uden Premium ser man det samme offentlige opslag." },
        { q: "Tæller links og billeder med i grænsen på 280 tegn?", a: "Links gør: hver URL tæller som faste 23 tegn via t.co-forkorteren, selv når den vises i fuld længde. Vedhæftede fotos, videoer, GIF'er og afstemninger tæller slet ikke, og et citats URL er også gratis." },
        { q: "Hvorfor når mit japanske eller emoji-tunge tweet grænsen så hurtigt?", a: "X bruger vægtet optælling. Latinske bogstaver og tal vejer 1, men tegn i CJK-områderne (kinesisk, japansk, koreansk) og de fleste emoji vejer 2 hver — så et visuelt kort opslag kan stadig nå 280. Tælleren på denne side afspejler den vægtning i realtid." },
        { q: "Hvordan poster jeg noget længere end 280 tegn?", a: "Abonnér på X Premium for lange opslag, eller del din tekst op i en tråd. Indsæt dit udkast i editoren ovenfor, og tråd-splitteren deler det op i nummererede tweets under 280 tegn ved naturlige sætningsgrænser." },
      ],
    },

    content: {
      en: `<h2>The exact character limits on X (Twitter)</h2>
<p>A standard post on <strong>X (formerly Twitter)</strong> is capped at <strong>280 characters</strong>. That budget counts every letter, space, punctuation mark, emoji, and line break shown in the compose box — reach 281 and the Post button locks. Accounts with an <strong>X Premium</strong> subscription can publish <strong>long posts of up to 25,000 characters</strong>, but the 280 ceiling still applies to everyone else, and to most replies and quote posts.</p>
<p>Not everything you attach spends that budget. <strong>Photos, videos, GIFs, and polls cost zero characters</strong>, and when you quote-post, the tweet you are quoting does not eat into your 280 either. What does count are <strong>@mentions and #hashtags</strong> placed inside the body — though the handles shown in the "Replying to…" line above a reply are free.</p>

<h2>Why links always cost 23 characters</h2>
<p>Here is the rule that catches almost everyone: <strong>every URL is wrapped in X's t.co shortener and counts as exactly 23 characters</strong>, no matter how long or short the real address is. A five-character link and a 200-character link both spend 23. PostTruncate applies the same weighted-length math X's own API uses, so paste three links and the counter deducts 69 characters instantly — the number you see is the number X will enforce.</p>

<h2>The emoji and non-Latin trap</h2>
<p>X does not count every character as one. It uses <strong>weighted counting</strong>: standard Latin letters, digits, and common punctuation weigh 1, but characters in <strong>CJK ranges (Chinese, Japanese, Korean) weigh 2</strong>, and most emoji count as 2 as well. A tweet that looks like 150 visible glyphs can therefore hit the 280 ceiling far sooner than you expect. The counter on this page mirrors that weighting, so an emoji-heavy or Japanese draft shows its true cost as you type.</p>

<h2>Common truncation mistakes on X</h2>
<ul>
<li><strong>Pasting a long link near the limit.</strong> Because the link still costs 23 characters, a draft that looks like it fits suddenly will not post.</li>
<li><strong>Trusting the visible glyph count.</strong> Emoji and non-Latin scripts weigh 2, so the compose box fills faster than the letters suggest.</li>
<li><strong>Splitting a thread by hand.</strong> Manual breaks slice sentences mid-word or open a tweet with a dangling "and," confusing anyone who joins the thread halfway.</li>
<li><strong>Burying the hook.</strong> Long Premium posts collapse behind a "Show more" link in the timeline, so a weak first line costs you the click before anyone expands it.</li>
<li><strong>Stacking hashtags at the end.</strong> Three or four trailing tags are the most common reason a finished tweet tips just over 280.</li>
</ul>

<h2>When one tweet isn't enough</h2>
<p>If an idea genuinely needs more room, chain it. <strong>Threads</strong> publish as a connected sequence with no length ceiling, and the engagement data is clear that <strong>tweets of 71–100 characters earn the most replies and retweets</strong> — the 280 limit is a ceiling, not a target. Paste your full draft into the editor above and the <strong>thread splitter</strong> divides it into numbered, sub-280 segments that break on sentence boundaries, so every tweet reads as a complete thought before you copy it to X.</p>`,

      es: `<h2>El límite de 280 caracteres en detalle</h2>
<p>Cada tweet publicado en <strong>X (antes Twitter)</strong> tiene un límite de <strong>280 caracteres</strong>. Este límite incluye letras, espacios, signos de puntuación, emojis y saltos de línea: todo lo que aparece visible en el cuadro de composición. Con 281 caracteres la plataforma simplemente bloquea el envío. Saber exactamente cuánto espacio tienes antes de publicar marca la diferencia entre un tweet impecable y recortar palabras a contrarreloj.</p>
<p>El <strong>contador de caracteres para Twitter</strong> de PostTruncate se actualiza en tiempo real mientras escribes. Un medidor con código de colores muestra el espacio restante de un vistazo: se vuelve ámbar cuando te acercas al límite y rojo en el momento en que lo superas.</p>

<h2>Por qué los enlaces siempre cuentan como 23 caracteres</h2>
<p>Esta es la regla que confunde a casi todo el mundo: <strong>cualquier URL que pegues en un tweet —sin importar su longitud— es envuelta por el acortador t.co de Twitter y cuenta exactamente 23 caracteres</strong>. Un enlace corto y uno largo consumen exactamente la misma cantidad de espacio. Esto ocurre aunque la URL no aparezca acortada en el tweet publicado.</p>
<p>PostTruncate aplica el mismo cálculo de longitud ponderada que usa la propia API de Twitter, por lo que el recuento que ves aquí coincide exactamente con lo que acepta la plataforma. Pega tres enlaces en tu borrador y el contador descuenta 69 caracteres automáticamente.</p>

<h2>Hilos: cuando un tweet no es suficiente</h2>
<p>Las ideas de largo formato no tienen por qué comprimirse en 280 caracteres. Los hilos de Twitter te permiten encadenar varios tweets publicados como una secuencia conectada. No existe un límite de longitud para los hilos: puedes extenderte tanto como la idea lo requiera.</p>
<p>El reto está en dividir el texto en puntos naturales para que cada tweet tenga sentido por sí solo. Si se hace mal, una frase queda cortada en medio de una palabra o un tweet empieza con una conjunción suelta que desorienta a quien llega al hilo en mitad de la secuencia.</p>
<p>El <strong>divisor de hilos</strong> de PostTruncate lo hace automáticamente. Pega tu texto completo en el editor y la herramienta lo divide en segmentos numerados, cada uno por debajo de los 280 caracteres y con cortes en los límites de las frases siempre que sea posible.</p>

<h2>Por qué el recuento de caracteres afecta al engagement</h2>
<p>Los análisis de datos de X muestran de forma consistente que <strong>los tweets de entre 71 y 100 caracteres obtienen las tasas más altas de respuestas y retuits</strong>. Los tweets más cortos dejan espacio para las citas; los más largos se ven como un muro de texto en móvil. El límite de 280 caracteres es un techo, no un objetivo — los tweets más compartidos suelen utilizar menos de la mitad del espacio disponible.</p>`,

      de: `<h2>Das 280-Zeichen-Limit im Detail</h2>
<p>Jeder Tweet auf <strong>X (früher Twitter)</strong> ist auf <strong>280 Zeichen</strong> begrenzt. Dieses Limit umfasst Buchstaben, Leerzeichen, Satzzeichen, Emojis und Zeilenumbrüche — alles, was im Verfassen-Feld sichtbar ist. Bei 281 Zeichen blockiert die Plattform das Absenden schlicht. Zu wissen, wie viel Platz du noch hast, bevor du auf „Senden" drückst, macht den Unterschied zwischen einem sauberen Post und einem hektischen Kürzen in letzter Minute.</p>
<p>Der <strong>Twitter-Zeichenzähler</strong> von PostTruncate aktualisiert sich in Echtzeit während du tippst. Eine farbcodierte Anzeige zeigt dir auf einen Blick, wie viel Budget noch übrig ist — sie wird gelb, wenn du dich dem Limit näherst, und rot, sobald du es überschreitest.</p>

<h2>Warum Links immer 23 Zeichen zählen</h2>
<p>Das ist die Regel, die fast alle überrascht: <strong>Jede URL, die du in einen Tweet einfügst — egal wie kurz oder lang — wird von Twitters t.co-Shortener gekürzt und zählt exakt 23 Zeichen</strong>. Ein kurzer und ein langer Link beanspruchen gleich viel Platz. Das gilt selbst dann, wenn die URL im veröffentlichten Tweet nicht gekürzt erscheint.</p>
<p>PostTruncate verwendet dieselbe gewichtete Längenberechnung wie die Twitter-API selbst. Der angezeigte Zeichenzähler stimmt deshalb exakt mit dem überein, was die Plattform akzeptiert. Füge drei Links ein und der Zähler zieht automatisch 69 Zeichen ab — kein Rätselraten nötig.</p>

<h2>Threads: Wenn ein Tweet nicht reicht</h2>
<p>Ausführliche Gedanken müssen nicht in 280 Zeichen gequetscht werden. Twitter-Threads ermöglichen es, mehrere Tweets miteinander zu verknüpfen, die als zusammenhängende Sequenz unter deinem Account veröffentlicht werden. Es gibt keine Obergrenze für die Thread-Länge — du kannst so ausführlich sein, wie der Inhalt es erfordert.</p>
<p>Die Herausforderung besteht darin, den Text an natürlichen Stellen zu teilen, sodass jeder Tweet für sich allein verständlich ist. Geht das schief, wird ein Satz mitten im Wort getrennt, oder ein Tweet beginnt mit einer losen Konjunktion, die Leserinnen und Leser verwirrt, die in der Mitte einsteigen.</p>
<p>Der <strong>Thread-Splitter</strong> von PostTruncate erledigt das automatisch. Füge deinen vollständigen Text in den Editor ein und das Tool teilt ihn in nummerierte, tweet-große Abschnitte auf — jeder sicher unter 280 Zeichen und wenn möglich an Satzgrenzen getrennt.</p>

<h2>Warum Zeichenanzahl das Engagement beeinflusst</h2>
<p>Analysen von X-Engagementdaten zeigen konsistent: <strong>Tweets zwischen 71 und 100 Zeichen erzielen die höchsten Antwort- und Retweet-Raten</strong>. Kürzere Tweets lassen Raum für zitierte Antworten; längere wirken auf dem Smartphone wie eine Textwand. Das 280-Zeichen-Limit ist eine Obergrenze, kein Ziel — die meistgeteilten Tweets nutzen meist weniger als die Hälfte des verfügbaren Raums.</p>`,

      fr: `<h2>La limite de 280 caractères expliquée</h2>
<p>Chaque tweet publié sur <strong>X (anciennement Twitter)</strong> est limité à <strong>280 caractères</strong>. Ce plafond englobe les lettres, les espaces, la ponctuation, les émojis et les sauts de ligne — tout ce qui est visible dans la zone de rédaction. À 281 caractères, la plateforme bloque simplement l'envoi. Savoir précisément où vous en êtes avant de publier fait toute la différence entre une publication propre et une réécriture de dernière minute.</p>
<p>Le <strong>compteur de caractères Twitter</strong> de PostTruncate se met à jour en temps réel pendant que vous écrivez. Une jauge colorée affiche en un coup d'œil votre budget restant — elle passe à l'orange à l'approche de la limite et au rouge dès que vous la dépassez.</p>

<h2>Pourquoi les liens comptent toujours pour 23 caractères</h2>
<p>Voici la règle qui surprend presque tout le monde : <strong>chaque URL collée dans un tweet — quelle que soit sa longueur — est enveloppée par le raccourcisseur t.co de Twitter et compte exactement 23 caractères</strong>. Un lien court et un lien long consomment exactement le même espace. Cela s'applique même si l'URL n'apparaît pas raccourcie dans le tweet publié.</p>
<p>PostTruncate utilise le même calcul de longueur pondérée que l'API officielle de Twitter, de sorte que le nombre affiché ici correspond exactement à ce que la plateforme acceptera. Collez trois liens dans votre brouillon et le compteur déduira automatiquement 69 caractères — sans aucune approximation.</p>

<h2>Les fils de discussion : quand un tweet ne suffit pas</h2>
<p>Les idées de longue haleine n'ont pas à être compressées en 280 caractères. Les fils de discussion Twitter permettent de chaîner plusieurs tweets publiés comme une séquence liée sous votre nom. Il n'existe pas de limite de longueur pour les fils — vous pouvez vous étendre autant que l'idée le nécessite.</p>
<p>Le défi consiste à diviser le texte à des points naturels pour que chaque tweet soit lisible de façon autonome. Si la découpe est maladroite, une phrase se retrouve coupée en plein milieu, ou un tweet commence par une conjonction isolée qui déroute les lecteurs qui arrivent en milieu de fil.</p>
<p>Le <strong>diviseur de fils</strong> de PostTruncate s'en charge automatiquement. Collez votre texte complet dans l'éditeur et l'outil le découpe en segments numérotés, chacun restant sous les 280 caractères, chacun se terminant à une limite de phrase dans la mesure du possible.</p>

<h2>Pourquoi le nombre de caractères influence l'engagement</h2>
<p>Les analyses des données d'engagement sur X montrent de façon constante que <strong>les tweets de 71 à 100 caractères obtiennent les taux de réponses et de retweets les plus élevés</strong>. Les tweets plus courts laissent de la place pour les citations en réponse ; les plus longs ressemblent à un mur de texte sur mobile. La limite de 280 caractères est un plafond, pas un objectif — les tweets les plus partagés utilisent généralement moins de la moitié de l'espace disponible.</p>`,

      pt: `<h2>O limite de 280 caracteres explicado</h2>
<p>Cada tweet publicado no <strong>X (antigo Twitter)</strong> tem um limite de <strong>280 caracteres</strong>. Esse teto inclui letras, espaços, pontuação, emojis e quebras de linha — tudo o que é visível na caixa de composição. Com 281 caracteres, a plataforma simplesmente bloqueia o envio. Saber exatamente quantos caracteres você usou antes de publicar faz toda a diferença entre uma postagem limpa e uma edição de última hora.</p>
<p>O <strong>contador de caracteres do Twitter</strong> do PostTruncate é atualizado em tempo real enquanto você digita. Um medidor com código de cores mostra seu orçamento restante: fica âmbar conforme você se aproxima do limite e vermelho no momento em que o ultrapassa.</p>

<h2>Por que links sempre contam como 23 caracteres</h2>
<p>Essa é a regra que confunde quase todo mundo: <strong>qualquer URL que você cole em um tweet — independentemente do tamanho — é encurtada pelo t.co do Twitter e conta exatamente 23 caracteres</strong>. Um link curto e um link longo consomem exatamente o mesmo espaço. Isso vale mesmo que a URL não apareça encurtada no tweet publicado.</p>
<p>O PostTruncate usa o mesmo cálculo de comprimento ponderado que a própria API do Twitter, então a contagem exibida aqui corresponde exatamente ao que a plataforma aceita. Cole três links no seu rascunho e o contador desconta 69 caracteres automaticamente — sem precisar adivinhar.</p>

<h2>Threads: quando um tweet não é suficiente</h2>
<p>Ideias mais longas não precisam ser comprimidas em 280 caracteres. As threads do Twitter permitem encadear vários tweets publicados como uma sequência conectada. Não há limite de comprimento para threads — você pode se estender tanto quanto a ideia exigir.</p>
<p>O desafio é dividir o texto em pontos naturais para que cada tweet faça sentido por si só. Se feito errado, uma frase fica cortada no meio ou um tweet começa com uma conjunção solta que confunde leitores que chegam no meio da thread.</p>
<p>O <strong>divisor de threads</strong> do PostTruncate faz isso automaticamente. Cole seu texto completo no editor e a ferramenta o divide em segmentos numerados, cada um abaixo de 280 caracteres, com cortes nos limites de frases sempre que possível.</p>

<h2>Por que a contagem de caracteres afeta o engajamento</h2>
<p>Análises de dados de engajamento do X mostram consistentemente que <strong>tweets entre 71 e 100 caracteres recebem as maiores taxas de resposta e retweet</strong>. Tweets mais curtos deixam espaço para citações em resposta; tweets mais longos parecem uma parede de texto no celular. O limite de 280 caracteres é um teto, não uma meta — os tweets mais compartilhados geralmente usam bem menos da metade do espaço disponível.</p>`,

      it: `<h2>Il limite di 280 caratteri spiegato</h2>
<p>Ogni tweet pubblicato su <strong>X (ex Twitter)</strong> ha un limite di <strong>280 caratteri</strong>. Questo tetto include lettere, spazi, punteggiatura, emoji e interruzioni di riga — tutto ciò che è visibile nella casella di composizione. Con 281 caratteri, la piattaforma blocca semplicemente l'invio. Sapere esattamente quanti caratteri hai usato prima di pubblicare fa la differenza tra un post impeccabile e un'affannosa revisione dell'ultimo minuto.</p>
<p>Il <strong>contatore di caratteri per Twitter</strong> di PostTruncate si aggiorna in tempo reale mentre scrivi. Un indicatore con codice colore mostra il budget rimanente a colpo d'occhio — diventa arancione quando ti avvicini al limite e rosso nel momento in cui lo superi.</p>

<h2>Perché i link contano sempre come 23 caratteri</h2>
<p>Questa è la regola che sorprende quasi tutti: <strong>qualsiasi URL incollata in un tweet — indipendentemente dalla sua lunghezza — viene avvolta dal servizio t.co di Twitter e conta esattamente 23 caratteri</strong>. Un link breve e uno lungo consumano esattamente lo stesso spazio. Questo vale anche se l'URL non appare abbreviata nel tweet pubblicato.</p>
<p>PostTruncate usa lo stesso calcolo di lunghezza ponderata utilizzato dall'API ufficiale di Twitter, quindi il conteggio visualizzato qui corrisponde esattamente a quello che la piattaforma accetta. Incolla tre link nella tua bozza e il contatore detrae 69 caratteri automaticamente — nessuna approssimazione necessaria.</p>

<h2>I thread: quando un tweet non è sufficiente</h2>
<p>Le idee articolate non devono essere compresse in 280 caratteri. I thread di Twitter ti permettono di collegare più tweet pubblicati come una sequenza connessa. Non esiste un limite di lunghezza per i thread — puoi estenderti quanto l'idea richiede.</p>
<p>La sfida è dividere il testo in punti naturali in modo che ogni tweet abbia senso da solo. Se la divisione è sbagliata, una frase viene spezzata nel mezzo o un tweet inizia con una congiunzione isolata che disorienta chi arriva a metà del thread.</p>
<p>Il <strong>divisore di thread</strong> di PostTruncate lo fa in modo automatico. Incolla il tuo testo completo nell'editor e lo strumento lo divide in segmenti numerati, ciascuno sotto i 280 caratteri, con interruzioni ai confini delle frasi ove possibile.</p>

<h2>Perché il conteggio dei caratteri influisce sull'engagement</h2>
<p>Le analisi dei dati di engagement di X mostrano costantemente che <strong>i tweet tra 71 e 100 caratteri ottengono i tassi più alti di risposte e retweet</strong>. I tweet più brevi lasciano spazio per le citazioni in risposta; quelli più lunghi sembrano un muro di testo su mobile. Il limite di 280 caratteri è un tetto, non un obiettivo — i tweet più condivisi usano di solito meno della metà dello spazio disponibile.</p>`,

      nl: `<h2>De 280-tekenlimiet uitgelegd</h2>
<p>Elke tweet op <strong>X (voorheen Twitter)</strong> is beperkt tot <strong>280 tekens</strong>. Dat plafond omvat letters, spaties, leestekens, emoji's en regeleinden — alles wat zichtbaar is in het opstelvenster. Bij 281 tekens weigert het platform simpelweg te publiceren. Precies weten hoeveel ruimte je nog hebt voordat je op verzenden drukt, maakt het verschil tussen een vlekkeloze publicatie en een haastige knipoefening op het laatste moment.</p>
<p>De <strong>Twitter-tekenteller</strong> van PostTruncate werkt in real time terwijl je typt. Een kleurgecodeerde meter toont je resterende budget in één oogopslag — hij wordt oranje als je het limiet nadert en rood zodra je het overschrijdt.</p>

<h2>Waarom links altijd als 23 tekens tellen</h2>
<p>Dit is de regel die bijna iedereen verrast: <strong>elke URL die je in een tweet plakt — hoe kort of lang ook — wordt omhuld door Twitters t.co-verkorter en telt precies 23 tekens</strong>. Een korte en een lange link nemen exact evenveel ruimte in beslag. Dit geldt zelfs als de URL in de gepubliceerde tweet niet als verkorte link verschijnt.</p>
<p>PostTruncate gebruikt dezelfde gewogen lengteberekening als de officiële Twitter-API, zodat het hier getoonde aantal tekens exact overeenkomt met wat het platform accepteert. Plak drie links in je concept en de teller trekt automatisch 69 tekens af — geen giswerk nodig.</p>

<h2>Threads: wanneer één tweet niet genoeg is</h2>
<p>Uitgebreide ideeën hoeven niet in 280 tekens gepropt te worden. Twitter-threads laten je meerdere tweets aan elkaar koppelen, gepubliceerd als een verbonden reeks onder jouw naam. Er is geen maximumlengte voor threads — je kunt zo uitgebreid zijn als het onderwerp vraagt.</p>
<p>De uitdaging is je tekst op natuurlijke grenzen op te splitsen zodat elke tweet op zichzelf leesbaar is. Doe je dat verkeerd, dan wordt een zin halverwege afgebroken of begint een tweet met een loshangende voegwoord dat lezers die halverwege instappen in verwarring brengt.</p>
<p>De <strong>thread-splitter</strong> van PostTruncate doet dit automatisch. Plak je volledige tekst in de editor en het hulpmiddel verdeelt hem in genummerde segmenten, elk veilig onder de 280 tekens, elk bij voorkeur afgebroken op een zingrens.</p>

<h2>Waarom het aantal tekens het engagement beïnvloedt</h2>
<p>Analyses van X-engagementdata laten consistent zien dat <strong>tweets van 71 tot 100 tekens de hoogste reactie- en retweetpercentages halen</strong>. Kortere tweets laten ruimte voor geciteerde reacties; langere tweets lijken op mobiel een muur van tekst. De 280-tekenlimiet is een plafond, geen doel — de meest gedeelde tweets gebruiken doorgaans ruim minder dan de helft van de beschikbare ruimte.</p>`,

      ja: `<h2>280文字制限の仕組み</h2>
<p><strong>X（旧Twitter）</strong>では、1つのツイートに使える文字数は<strong>280文字</strong>までです。この制限には、文字・スペース・句読点・絵文字・改行がすべて含まれます。281文字を超えると、プラットフォームは投稿を受け付けません。送信ボタンを押す前に残り文字数を正確に把握しておくことで、直前の修正に追われることなく、スムーズに投稿できます。</p>
<p>PostTruncateの<strong>Twitter文字数カウンター</strong>は入力するたびにリアルタイムで更新されます。カラーコードのメーターで残りの文字数が一目でわかり、制限に近づくとオレンジ色に、超過した瞬間に赤色に変わります。</p>

<h2>リンクが常に23文字としてカウントされる理由</h2>
<p>これはほとんどの人が驚くルールです。<strong>ツイートに貼り付けたURLは、長さに関わらず、Twitterのt.co短縮サービスによってラップされ、必ず23文字としてカウントされます</strong>。短いリンクも長いリンクも、消費する文字数はまったく同じです。公開されたツイートにURLが短縮形で表示されない場合でも、このルールは適用されます。</p>
<p>PostTruncateはTwitter公式APIが使う重み付き文字数計算を採用しているため、ここに表示される文字数がプラットフォームが認識する数値と完全に一致します。3つのリンクを下書きに貼り付けると、カウンターは自動的に69文字を差し引きます。</p>

<h2>スレッド：1ツイートに収まらないとき</h2>
<p>長い考えを280文字に圧縮する必要はありません。Twitterのスレッド機能を使えば、複数のツイートを一連のシーケンスとして連結して投稿できます。スレッドの長さに上限はなく、アイデアが必要とする分だけ続けられます。</p>
<p>課題は、各ツイートが独立して読めるよう、自然な区切りでテキストを分割することです。分割が不適切だと、文の途中で切れてしまったり、接続詞で始まるツイートが途中から読む人を混乱させたりすることがあります。</p>
<p>PostTruncateの<strong>スレッド分割機能</strong>がこれを自動で処理します。全文をエディターに貼り付けると、ツールが280文字以内の番号付きセグメントに分割し、できる限り文の区切りで分けます。Xにコピーする前に各セグメントを確認できます。</p>

<h2>文字数がエンゲージメントに与える影響</h2>
<p>Xのエンゲージメントデータの分析によると、<strong>71〜100文字のツイートは返信率とリツイート率が最も高い</strong>という結果が一貫して出ています。短いツイートは引用返信のスペースを残し、長いツイートはスマートフォンでテキストの壁のように見えます。280文字制限は上限であって目標ではありません。最も拡散されるツイートは通常、利用可能なスペースの半分以下しか使っていません。</p>`,

      zh: `<h2>280字符限制详解</h2>
<p><strong>X（原推特）</strong>每条推文的上限是<strong>280个字符</strong>。这一限制涵盖字母、空格、标点符号、表情符号和换行符——即输入框中所有可见内容。输入281个字符后，平台会直接拒绝发送。在点击发送之前精确掌握字符使用情况，能让你从容发布，而不是在最后一刻手忙脚乱地删减文字。</p>
<p>PostTruncate的<strong>Twitter字符计数器</strong>在你输入时实时更新。彩色进度条让你一眼看清剩余字符数——接近上限时变为橙色，超过限制时立刻变红。</p>

<h2>为什么链接始终计为23个字符</h2>
<p>这是几乎所有人都会感到意外的规则：<strong>无论链接长短，你粘贴到推文中的每个URL都会被推特的t.co短链接服务处理，固定计为23个字符</strong>。一个两个字符的短链接和一个两百个字符的长链接占用的空间完全相同。即便发布后的推文中链接并未以短链接形式显示，这条规则同样适用。</p>
<p>PostTruncate采用与推特官方API完全相同的加权字符计算方式，因此这里显示的字符数与平台实际接受的数值完全一致。在草稿中粘贴三个链接，计数器会自动扣除69个字符，无需手动计算。</p>

<h2>推文串：当一条推文不够用时</h2>
<p>长篇内容不必压缩到280个字符以内。推文串功能允许你将多条推文连接成一个有序序列发布。推文串没有长度上限——你可以根据内容需要无限延伸。</p>
<p>难点在于找到自然的断句位置，让每条推文都能独立成立。如果分割不当，可能会在句子中间截断，或者让后续推文以一个孤立的连词开头，让半途加入的读者感到困惑。</p>
<p>PostTruncate的<strong>推文串分割功能</strong>会自动完成这项工作。将完整文本粘贴到编辑器中，工具会将其分割成带编号的段落，每段均不超过280个字符，尽可能在句子边界处分割。你可以在复制到X之前预览每个片段。</p>

<h2>字符数如何影响互动效果</h2>
<p>X互动数据分析持续表明，<strong>71至100个字符的推文获得的回复率和转推率最高</strong>。较短的推文为引用回复留出空间；较长的推文在手机上看起来像一堵文字墙。280字符上限是天花板，而非目标——传播最广的推文通常只用到可用空间的一半不到。</p>`,

      da: `<h2>280-tegn-grænsen forklaret</h2>
<p>Hvert tweet på <strong>X (tidligere Twitter)</strong> er begrænset til <strong>280 tegn</strong>. Det loft dækker bogstaver, mellemrum, tegnsætning, emoji og linjeskift — alt, hvad der er synligt i skrivefeltet. Ved 281 tegn afviser platformen simpelthen at sende. At vide præcis, hvor mange tegn du har tilbage, inden du trykker send, er forskellen på en fejlfri publicering og et hektisk klip i sidste øjeblik.</p>
<p>PostTruncates <strong>Twitter-tegntæller</strong> opdateres i realtid, mens du skriver. En farvekodet måler viser dit resterende budget med et blik — den bliver gul, når du nærmer dig grænsen, og rød i det øjeblik, du overskrider den.</p>

<h2>Hvorfor links altid tæller som 23 tegn</h2>
<p>Det er reglen, der overrasker næsten alle: <strong>Enhver URL, du indsætter i et tweet — uanset længde — pakkes ind af Twitters t.co-forkortelsestjeneste og tæller nøjagtigt 23 tegn</strong>. Et kort og et langt link bruger præcis samme plads. Dette gælder, selv hvis URL'en ikke vises som forkortet i det publicerede tweet.</p>
<p>PostTruncate bruger den samme vægtede længdeberegning som Twitters officielle API, så antallet, der vises her, stemmer præcis overens med, hvad platformen accepterer. Indsæt tre links i dit udkast, og tælleren trækker automatisk 69 tegn fra — ingen gætteri nødvendigt.</p>

<h2>Tråde: Når ét tweet ikke er nok</h2>
<p>Lange tanker behøver ikke presses ned i 280 tegn. Twitter-tråde lader dig sammenkæde flere tweets, der udgives som en forbundet sekvens. Der er ingen maksimumlængde for tråde — du kan fortsætte, så længe indholdet kræver det.</p>
<p>Udfordringen er at opdele teksten ved naturlige brud, så hvert tweet giver mening alene. Gøres det forkert, skæres en sætning midt over, eller et tweet begynder med en løs bindeord, der forvirrer læsere, der kommer ind midt i tråden.</p>
<p>PostTruncates <strong>tråd-splitter</strong> klarer dette automatisk. Indsæt din fulde tekst i editoren, og værktøjet deler den op i nummererede segmenter, der hver holder sig under 280 tegn og helst brydes ved sætningsgrænser.</p>

<h2>Hvorfor tegntælling påvirker engagement</h2>
<p>Analyser af X-engagementdata viser konsekvent, at <strong>tweets på 71 til 100 tegn opnår de højeste svarprocenter og retweetrater</strong>. Kortere tweets efterlader plads til citerede svar; længere tweets ligner en tekstmur på mobil. 280-tegn-grænsen er et loft, ikke et mål — de mest delte tweets bruger typisk langt under halvdelen af den tilgængelige plads.</p>`,
    },
  },
  {
    id: 'instagram',
    editorAnchor: 'workspace',
    lastUpdated: '2026-05-22',
    platformLimits:
      '2200 character caption limit, feed truncates at ~125 characters behind a "more" link, maximum 5 hashtags before the post silently fails to publish',

    slugs: {
      en: 'instagram-character-counter',
      es: 'contador-caracteres-instagram',
      de: 'instagram-zeichenzaehler',
      fr: 'compteur-caracteres-instagram',
      pt: 'contador-caracteres-instagram',
      it: 'contatore-caratteri-instagram',
      nl: 'instagram-tekenteller',
      ja: 'instagram-moji-kaunta',
      zh: 'instagram-zi-fu-ji-shu',
      da: 'instagram-tegntaeller',
    },

    schemaName: {
      en: 'Instagram Caption Character Counter',
      es: 'Contador de Caracteres para Instagram',
      de: 'Instagram Zeichenzähler',
      fr: 'Compteur de Caractères Instagram',
      pt: 'Contador de Caracteres do Instagram',
      it: 'Contatore di Caratteri per Instagram',
      nl: 'Instagram Tekenteller',
      ja: 'Instagram 文字数カウンター',
      zh: 'Instagram 字符计数器',
      da: 'Instagram Tegntæller',
    },

    titles: {
      en: 'Instagram Character Counter — Free Caption & Hashtag Counter',
      es: 'Contador de Caracteres Instagram — Contador gratis de pies de foto y hashtags',
      de: 'Instagram Zeichenzähler — Caption- und Hashtag-Zähler kostenlos',
      fr: 'Compteur de Caractères Instagram — Légendes et hashtags gratuitement',
      pt: 'Contador de Caracteres Instagram — Contador grátis de legendas e hashtags',
      it: 'Contatore Caratteri Instagram — Contatore gratis di didascalie e hashtag',
      nl: 'Instagram Tekenteller — Gratis bijschrift- en hashtagteller',
      ja: 'Instagram文字数カウンター — キャプションとハッシュタグを無料カウント',
      zh: 'Instagram字符计数器 — 免费统计说明文字与标签',
      da: 'Instagram Tegntæller — Gratis tæller til billedtekst og hashtags',
    },

    metaDescriptions: {
      en: 'Free Instagram caption counter. Track the 2200-character limit, preview the 125-char "more" fold, and avoid the hashtag traps that quietly cut your reach.',
      es: 'Contador de caracteres para Instagram gratis. Controla el límite de 2200 caracteres, previsualiza el corte de 125 caracteres y evita las trampas de hashtags que reducen tu alcance.',
      de: 'Kostenloser Instagram-Zeichenzähler. Verfolge das 2200-Zeichen-Limit, sieh den 125-Zeichen-Fold in der Vorschau und vermeide Hashtag-Fallen, die deine Reichweite still drosseln.',
      fr: 'Compteur de caractères Instagram gratuit. Suivez la limite de 2200 caractères, prévisualisez la coupure à 125 caractères et évitez les pièges de hashtags qui réduisent votre portée.',
      pt: 'Contador de caracteres para Instagram gratuito. Acompanhe o limite de 2200 caracteres, visualize o corte de 125 caracteres e evite as armadilhas de hashtags que reduzem seu alcance.',
      it: 'Contatore di caratteri Instagram gratuito. Monitora il limite di 2200 caratteri, visualizza in anteprima il taglio a 125 caratteri ed evita le trappole degli hashtag che riducono la portata.',
      nl: 'Gratis Instagram tekenteller. Volg de 2200-tekenlimiet, bekijk de 125-tekenvouw in de voorbeeldweergave en vermijd hashtagvalkuilen die je bereik stilletjes beperken.',
      ja: '無料のInstagramキャプションカウンター。2200文字の上限を追跡し、125文字の折り返し点をプレビューし、リーチを静かに下げるハッシュタグの落とし穴を回避。',
      zh: '免费Instagram说明文字计数器。追踪2200字符上限，预览125字符折叠点，并避开悄悄削减触达的标签陷阱。',
      da: 'Gratis Instagram billedtekst-tæller. Følg 2200-tegns-grænsen, forhåndsvis 125-tegns-folden, og undgå de hashtag-fælder, der stille sænker din rækkevidde.',
    },

    intro: {
      en: "Check your Instagram caption before you post — the editor below counts live against the 2200-character limit, shows where the 125-character “more” fold cuts your text, and flags hashtag overload.",
      es: "Revisa tu pie de foto de Instagram antes de publicar: el editor de abajo cuenta en vivo frente al límite de 2200 caracteres, muestra dónde corta el texto el pliegue de «más» a los 125 caracteres y avisa del exceso de hashtags.",
      de: "Prüfe deine Instagram-Caption vor dem Posten — der Editor unten zählt live gegen das 2200-Zeichen-Limit, zeigt, wo der „Mehr“-Umbruch bei 125 Zeichen deinen Text abschneidet, und warnt vor zu vielen Hashtags.",
      fr: "Vérifiez votre légende Instagram avant de publier : l’éditeur ci-dessous compte en direct par rapport à la limite de 2200 caractères, montre où la coupure « plus » à 125 caractères tronque votre texte et signale le trop-plein de hashtags.",
      pt: "Confira a legenda do seu Instagram antes de publicar: o editor abaixo conta ao vivo em relação ao limite de 2200 caracteres, mostra onde o corte de «mais» aos 125 caracteres trunca seu texto e sinaliza o excesso de hashtags.",
      it: "Controlla la didascalia di Instagram prima di pubblicare: l’editor qui sotto conta in tempo reale rispetto al limite di 2200 caratteri, mostra dove il taglio «altro» a 125 caratteri tronca il testo e segnala l’eccesso di hashtag.",
      nl: "Controleer je Instagram-bijschrift voordat je plaatst — de editor hieronder telt live tegen de limiet van 2200 tekens, laat zien waar de ‘meer’-vouw bij 125 tekens je tekst afkapt en waarschuwt voor te veel hashtags.",
      ja: "投稿する前にInstagramのキャプションをチェック。下のエディターは2200文字の上限に対してリアルタイムでカウントし、125文字の「続きを読む」で本文が切れる位置を示し、ハッシュタグの付けすぎを警告します。",
      zh: "发布前检查你的 Instagram 说明文字：下方编辑器实时对照 2200 字符上限计数，显示 125 字符“更多”折叠点在哪里截断文本，并提示标签过多。",
      da: "Tjek din Instagram-billedtekst, før du poster — editoren nedenfor tæller live mod 2200-tegns-grænsen, viser hvor „mere“-folden ved 125 tegn skærer din tekst af, og advarer om for mange hashtags.",
    },

    faq: {
      en: [
        {
          q: 'What is Instagram\'s caption character limit?',
          a: 'Captions on feed posts, Reels, and carousels are capped at 2200 characters, and comments share the same 2200 limit. Going over simply blocks the caption, so the counter above warns you before you hit it.',
        },
        {
          q: 'Why does my caption get cut off with "… more"?',
          a: 'Instagram collapses captions after roughly 125 characters in the feed — everything after that hides behind "more." Front-load your hook and any call to action into the first line so it lands before the fold.',
        },
        {
          q: 'How many hashtags should I actually use?',
          a: 'You can add up to 30, but stuffing all 30 looks spammy and can suppress reach. Most creators see better results with a focused 3–5 relevant tags, and the editor flags when you pile on too many.',
        },
        {
          q: 'Do emojis and line breaks count toward the limit?',
          a: 'Yes. Emojis, spaces, and every line break count as characters against the 2200 limit — and line breaks in particular eat space fast in a structured, multi-paragraph caption.',
        },
      ],
      es: [
        { q: "¿Cuál es el límite de caracteres de la leyenda de Instagram?", a: "Las leyendas de publicaciones del feed, Reels y carruseles tienen un límite de 2200 caracteres, y los comentarios comparten ese mismo límite de 2200. Si te pasas, la leyenda no se publica, así que el contador de arriba te avisa antes de llegar." },
        { q: "¿Por qué se corta mi leyenda con «… más»?", a: "Instagram colapsa las leyendas tras unos 125 caracteres en el feed: todo lo que sigue se oculta tras «más». Pon tu gancho y cualquier llamada a la acción en la primera línea para que aparezca antes del corte." },
        { q: "¿Cuántos hashtags debería usar realmente?", a: "Puedes añadir hasta 30, pero meter los 30 parece spam y puede reducir tu alcance. La mayoría de creadores obtienen mejores resultados con 3–5 etiquetas relevantes, y el editor te avisa cuando pones demasiadas." },
        { q: "¿Los emojis y los saltos de línea cuentan para el límite?", a: "Sí. Los emojis, los espacios y cada salto de línea cuentan como caracteres frente al límite de 2200, y los saltos de línea en particular consumen espacio rápido en una leyenda estructurada de varios párrafos." },
      ],
      de: [
        { q: "Wie lautet das Zeichenlimit für Instagram-Bildunterschriften?", a: "Bildunterschriften bei Feed-Beiträgen, Reels und Karussells sind auf 2200 Zeichen begrenzt, und Kommentare teilen sich dasselbe Limit von 2200. Wer darüber liegt, kann die Bildunterschrift nicht posten — der Zähler oben warnt dich rechtzeitig." },
        { q: "Warum wird meine Bildunterschrift mit „… mehr“ abgeschnitten?", a: "Instagram klappt Bildunterschriften im Feed nach etwa 125 Zeichen ein — alles danach versteckt sich hinter „mehr“. Setze deinen Hook und jeden Call-to-Action in die erste Zeile, damit er vor dem Umbruch erscheint." },
        { q: "Wie viele Hashtags sollte ich wirklich verwenden?", a: "Du kannst bis zu 30 hinzufügen, aber alle 30 wirken spammig und können die Reichweite drücken. Die meisten Creator fahren mit gezielten 3–5 relevanten Tags besser, und der Editor warnt, wenn es zu viele werden." },
        { q: "Zählen Emojis und Zeilenumbrüche zum Limit?", a: "Ja. Emojis, Leerzeichen und jeder Zeilenumbruch zählen als Zeichen gegen das 2200-Limit — und gerade Zeilenumbrüche verbrauchen in einer strukturierten Bildunterschrift mit mehreren Absätzen schnell Platz." },
      ],
      fr: [
        { q: "Quelle est la limite de caractères d’une légende Instagram ?", a: "Les légendes des publications du fil, des Reels et des carrousels sont limitées à 2200 caractères, et les commentaires partagent cette même limite de 2200. Au-delà, la légende ne se publie pas : le compteur ci-dessus vous prévient avant." },
        { q: "Pourquoi ma légende est-elle coupée par « … plus » ?", a: "Instagram replie les légendes après environ 125 caractères dans le fil : tout ce qui suit se cache derrière « plus ». Placez votre accroche et tout appel à l’action dans la première ligne pour qu’ils apparaissent avant la coupure." },
        { q: "Combien de hashtags faut-il vraiment utiliser ?", a: "Vous pouvez en ajouter jusqu’à 30, mais en mettre 30 fait spam et peut réduire votre portée. La plupart des créateurs obtiennent de meilleurs résultats avec 3 à 5 tags pertinents, et l’éditeur vous alerte quand vous en mettez trop." },
        { q: "Les émojis et les sauts de ligne comptent-ils dans la limite ?", a: "Oui. Les émojis, les espaces et chaque saut de ligne comptent comme des caractères dans la limite de 2200, et les sauts de ligne en particulier consomment vite de l’espace dans une légende structurée en plusieurs paragraphes." },
      ],
      pt: [
        { q: "Qual é o limite de caracteres da legenda do Instagram?", a: "As legendas de publicações do feed, Reels e carrosséis têm limite de 2200 caracteres, e os comentários compartilham esse mesmo limite de 2200. Se passar, a legenda não é publicada, então o contador acima avisa antes de você chegar lá." },
        { q: "Por que minha legenda é cortada com «… mais»?", a: "O Instagram recolhe as legendas após cerca de 125 caracteres no feed: tudo depois disso fica escondido atrás de «mais». Coloque seu gancho e qualquer chamada para ação na primeira linha para que apareça antes do corte." },
        { q: "Quantas hashtags eu realmente devo usar?", a: "Você pode adicionar até 30, mas usar as 30 parece spam e pode reduzir seu alcance. A maioria dos criadores tem melhores resultados com 3 a 5 tags relevantes, e o editor avisa quando você coloca demais." },
        { q: "Emojis e quebras de linha contam para o limite?", a: "Sim. Emojis, espaços e cada quebra de linha contam como caracteres no limite de 2200 — e as quebras de linha em particular consomem espaço rápido em uma legenda estruturada de vários parágrafos." },
      ],
      it: [
        { q: "Qual è il limite di caratteri della didascalia di Instagram?", a: "Le didascalie di post del feed, Reel e caroselli hanno un limite di 2200 caratteri, e i commenti condividono lo stesso limite di 2200. Se superi, la didascalia non viene pubblicata, quindi il contatore qui sopra ti avvisa prima." },
        { q: "Perché la mia didascalia viene tagliata con «… altro»?", a: "Instagram comprime le didascalie dopo circa 125 caratteri nel feed: tutto ciò che segue si nasconde dietro «altro». Metti il tuo gancio e ogni invito all’azione nella prima riga, così compaiono prima del taglio." },
        { q: "Quanti hashtag dovrei usare davvero?", a: "Puoi aggiungerne fino a 30, ma metterli tutti e 30 sembra spam e può ridurre la portata. La maggior parte dei creator ottiene risultati migliori con 3–5 tag pertinenti, e l’editor avvisa quando ne metti troppi." },
        { q: "Le emoji e gli a capo contano per il limite?", a: "Sì. Emoji, spazi e ogni a capo contano come caratteri rispetto al limite di 2200, e gli a capo in particolare consumano spazio in fretta in una didascalia strutturata su più paragrafi." },
      ],
      nl: [
        { q: "Wat is de tekenlimiet voor een Instagram-bijschrift?", a: "Bijschriften bij feedposts, Reels en carrousels zijn beperkt tot 2200 tekens, en reacties delen diezelfde limiet van 2200. Ga je eroverheen, dan wordt het bijschrift niet geplaatst, dus de teller hierboven waarschuwt je op tijd." },
        { q: "Waarom wordt mijn bijschrift afgekapt met ‘… meer’?", a: "Instagram klapt bijschriften in het feed na ongeveer 125 tekens in: alles daarna verdwijnt achter ‘meer’. Zet je hook en elke call-to-action in de eerste regel zodat die vóór de vouw verschijnt." },
        { q: "Hoeveel hashtags moet ik echt gebruiken?", a: "Je kunt er tot 30 toevoegen, maar alle 30 oogt als spam en kan je bereik drukken. De meeste makers presteren beter met 3–5 relevante tags, en de editor waarschuwt als je er te veel plaatst." },
        { q: "Tellen emoji en regeleinden mee voor de limiet?", a: "Ja. Emoji, spaties en elk regeleinde tellen als tekens tegen de limiet van 2200 — en juist regeleinden verbruiken snel ruimte in een gestructureerd bijschrift met meerdere alinea’s." },
      ],
      ja: [
        { q: "Instagramのキャプションの文字数制限は？", a: "フィード投稿・リール・カルーセルのキャプションは2200文字まで、コメントも同じ2200文字の上限です。超えるとキャプションを投稿できないため、上のカウンターが到達前に警告します。" },
        { q: "なぜキャプションが「…続きを読む」で切れるのですか？", a: "Instagramはフィードで約125文字を超えるとキャプションを折りたたみ、それ以降は「続きを読む」の後ろに隠れます。フックや行動喚起は最初の行に置き、折り返しの前に表示されるようにしましょう。" },
        { q: "ハッシュタグは実際いくつ使うべきですか？", a: "最大30個まで付けられますが、30個すべて付けるとスパムっぽく見え、リーチが下がることがあります。多くのクリエイターは関連性の高い3〜5個に絞ると成果が出やすく、付けすぎるとエディターが警告します。" },
        { q: "絵文字や改行は文字数に含まれますか？", a: "はい。絵文字・スペース・改行はすべて2200文字の上限に対して1文字としてカウントされます。とくに改行は、段落を分けた構成のキャプションでは一気に文字数を消費します。" },
      ],
      zh: [
        { q: "Instagram 说明文字的字符上限是多少？", a: "动态帖、Reels 和轮播图的说明文字上限为 2200 字符，评论也共用这 2200 字符的上限。超出后说明文字将无法发布，因此上方计数器会在你到达前提醒。" },
        { q: "为什么我的说明文字会以“……更多”被截断？", a: "Instagram 在动态中超过约 125 字符后会折叠说明文字，之后的内容都藏在“更多”后面。把你的钩子和任何行动号召放在第一行，让它在折叠点之前出现。" },
        { q: "我到底应该用多少个标签？", a: "最多可添加 30 个，但全用 30 个会显得像垃圾信息，并可能压低触达。多数创作者使用 3–5 个相关标签效果更好，添加过多时编辑器会提示。" },
        { q: "表情符号和换行会计入上限吗？", a: "会。表情符号、空格和每个换行都按字符计入 2200 上限，尤其是换行，在分段落的结构化说明文字中会很快消耗字符。" },
      ],
      da: [
        { q: "Hvad er tegngrænsen for en Instagram-billedtekst?", a: "Billedtekster på feed-opslag, Reels og karruseller er begrænset til 2200 tegn, og kommentarer deler den samme grænse på 2200. Går du over, kan billedteksten ikke udgives, så tælleren ovenfor advarer dig i tide." },
        { q: "Hvorfor bliver min billedtekst skåret af med „… mere“?", a: "Instagram folder billedtekster sammen efter cirka 125 tegn i feedet: alt derefter gemmes bag „mere“. Placer din hook og enhver opfordring til handling i første linje, så de vises før folden." },
        { q: "Hvor mange hashtags bør jeg egentlig bruge?", a: "Du kan tilføje op til 30, men alle 30 virker som spam og kan dæmpe din rækkevidde. De fleste skabere får bedre resultater med fokuserede 3–5 relevante tags, og editoren advarer, når du sætter for mange på." },
        { q: "Tæller emoji og linjeskift med i grænsen?", a: "Ja. Emoji, mellemrum og hvert linjeskift tæller som tegn mod grænsen på 2200 — og især linjeskift bruger plads hurtigt i en struktureret billedtekst med flere afsnit." },
      ],
    },

    content: {
      en: `<h2>Instagram's 2200-character caption limit</h2>
<p>Every Instagram caption can hold up to <strong>2200 characters</strong> — enough room for a short essay, a detailed product description, or a multi-point listicle. Unlike Twitter, Instagram isn't built for brevity; longer captions with genuine substance regularly outperform one-liners in saves, shares, and comment depth.</p>
<p>PostTruncate's <strong>Instagram caption counter</strong> tracks your character total in real time as you type, showing both your current count and how much runway you have left before the platform cuts you off. No more pasting into the app to discover you're 40 characters over at the last minute.</p>

<h2>The 125-character fold: the most important number in Instagram copywriting</h2>
<p>While the full caption can run to 2200 characters, <strong>Instagram truncates the feed display at roughly 125 characters</strong>, hiding the rest behind a "more" tap. The words before that fold are the only ones most of your audience will ever read. If your hook isn't in those first 125 characters, you're writing for yourself.</p>
<p>This is why the fold matters more than the total limit. A caption that buries the key message in paragraph three might as well be blank — the algorithm doesn't reward invisible engagement. The best Instagram copywriters treat the 125-character window as its own discipline: a complete, curiosity-provoking thought that earns the "more" tap.</p>
<p>PostTruncate's live preview renders <strong>exactly where the fold falls in your caption</strong>, so you can see at a glance whether your hook lands before the cut or disappears behind it. Adjust the opening line until the most compelling part of your caption is doing its job above the fold.</p>

<h2>The 5-hashtag limit and the silent failure you need to know about</h2>
<p>Instagram has a documented maximum of <strong>30 hashtags per post</strong>, but there's a far more dangerous undocumented threshold: <strong>posts with more than a certain number of hashtags can fail to publish without any error message</strong>. Instagram's spam filters treat heavy hashtag stacking as inauthentic behaviour, and in the current algorithm climate, many accounts report silent suppression — the post appears to publish, but reaches almost no one.</p>
<p>The practical safe ceiling most creators have converged on is <strong>5 highly relevant hashtags</strong>. Not 30, not 10 — five, chosen for genuine topical alignment rather than volume. PostTruncate's caption analyser counts your hashtags in real time and flags when you exceed the threshold, before you hit publish.</p>

<h2>Writing captions that earn saves and shares</h2>
<p>Instagram's algorithm weights <strong>saves</strong> more heavily than likes or follows because a save signals that the content was worth returning to. Captions that earn saves tend to share a common structure: a specific promise in the first line, actionable detail in the body, and a question or call to action that invites a reply.</p>
<p>Use PostTruncate to draft your caption, check the fold preview, confirm your hashtag count, and then copy the final text straight to Instagram — all in one pass, no toggling between apps.</p>`,

      es: `<h2>El límite de 2200 caracteres en Instagram</h2>
<p>Cada pie de foto en Instagram puede tener hasta <strong>2200 caracteres</strong>: espacio suficiente para un texto breve, una descripción detallada de producto o una lista de puntos. A diferencia de Twitter, Instagram no está diseñado para la brevedad; los pies de foto más extensos con contenido genuino suelen superar en guardados, compartidos y comentarios a los textos de una sola línea.</p>
<p>El <strong>contador de caracteres para Instagram</strong> de PostTruncate actualiza en tiempo real el total de caracteres mientras escribes, mostrando tanto el recuento actual como el margen que te queda antes de que la plataforma te corte. Sin más sorpresas al pegar el texto en la app y descubrir que te pasas 40 caracteres en el último momento.</p>

<h2>El corte de los 125 caracteres: el número más importante del copywriting en Instagram</h2>
<p>Aunque el pie de foto completo puede llegar a 2200 caracteres, <strong>Instagram trunca la visualización en el feed aproximadamente a los 125 caracteres</strong>, ocultando el resto detrás de un toque en "más". Las palabras antes de ese corte son las únicas que leerá la mayor parte de tu audiencia. Si tu gancho no está en esos primeros 125 caracteres, estás escribiendo para ti mismo.</p>
<p>Por eso el corte importa más que el límite total. Un pie de foto que entierra el mensaje clave en el tercer párrafo podría estar en blanco: el algoritmo no premia el engagement invisible. Los mejores redactores de Instagram tratan los 125 caracteres como una disciplina propia: un pensamiento completo y que despierte curiosidad, capaz de ganarse el toque en "más".</p>
<p>La vista previa en vivo de PostTruncate muestra <strong>exactamente dónde cae el corte en tu pie de foto</strong>, para que veas de un vistazo si tu gancho llega antes del corte o desaparece tras él.</p>

<h2>El límite de 5 hashtags y el fallo silencioso que debes conocer</h2>
<p>Instagram tiene un máximo documentado de <strong>30 hashtags por publicación</strong>, pero hay un umbral mucho más peligroso y no documentado: <strong>las publicaciones con demasiados hashtags pueden fallar en la publicación sin mostrar ningún mensaje de error</strong>. Los filtros de spam de Instagram tratan el uso masivo de hashtags como comportamiento no auténtico, y muchas cuentas reportan supresión silenciosa: la publicación parece haberse publicado, pero llega a casi nadie.</p>
<p>El límite seguro práctico al que han llegado la mayoría de los creadores es de <strong>5 hashtags muy relevantes</strong>. No 30, no 10: cinco, elegidos por alineación temática genuina, no por volumen. El analizador de pies de foto de PostTruncate cuenta tus hashtags en tiempo real y avisa cuando superas ese umbral.</p>

<h2>Escribir pies de foto que consigan guardados y compartidos</h2>
<p>El algoritmo de Instagram pondera los <strong>guardados</strong> más que los me gusta o los seguidores, porque un guardado indica que el contenido valía la pena volver a consultarlo. Los pies de foto que consiguen guardados suelen compartir una estructura común: una promesa específica en la primera línea, detalles accionables en el cuerpo y una pregunta o llamada a la acción que invita a responder.</p>
<p>Usa PostTruncate para redactar tu pie de foto, comprobar la vista previa del corte, confirmar tu recuento de hashtags y luego copiar el texto final directamente a Instagram, todo en un solo paso.</p>`,

      de: `<h2>Instagrams 2200-Zeichen-Limit</h2>
<p>Jede Instagram-Bildunterschrift kann bis zu <strong>2200 Zeichen</strong> umfassen — genug Platz für einen kurzen Aufsatz, eine detaillierte Produktbeschreibung oder eine mehrteilige Liste. Anders als Twitter ist Instagram nicht auf Kürze ausgelegt; längere Bildunterschriften mit echtem Mehrwert übertreffen Ein-Zeiler bei Speicherungen, Weiterleitungen und Kommentartiefe regelmäßig.</p>
<p>PostTruncates <strong>Instagram-Zeichenzähler</strong> erfasst dein Zeichenvolumen in Echtzeit während des Tippens und zeigt sowohl den aktuellen Stand als auch die verbleibende Reserve, bevor die Plattform dich stoppt. Keine Last-Minute-Überraschungen mehr, wenn du den Text in die App kopierst und feststellst, dass du 40 Zeichen über dem Limit liegst.</p>

<h2>Der 125-Zeichen-Fold: die wichtigste Zahl im Instagram-Copywriting</h2>
<p>Obwohl die vollständige Bildunterschrift bis zu 2200 Zeichen lang sein kann, <strong>blendet Instagram die Feed-Anzeige nach rund 125 Zeichen ab</strong> und versteckt den Rest hinter einem „Mehr"-Tipp. Die Wörter vor diesem Fold sind die einzigen, die der Großteil deines Publikums je lesen wird. Wenn dein Hook nicht in diesen ersten 125 Zeichen steckt, schreibst du für dich selbst.</p>
<p>Deshalb ist der Fold wichtiger als das Gesamtlimit. Eine Bildunterschrift, die die Kernbotschaft im dritten Absatz vergräbt, könnte genauso gut leer sein — der Algorithmus belohnt unsichtbares Engagement nicht. Die besten Instagram-Texter behandeln das 125-Zeichen-Fenster als eigene Disziplin: ein vollständiger, neugierig machender Gedanke, der den „Mehr"-Tipp verdient.</p>
<p>PostTruncates Live-Vorschau zeigt <strong>genau, wo der Fold in deiner Bildunterschrift liegt</strong>, sodass du auf einen Blick erkennen kannst, ob dein Hook vor dem Schnitt landet oder dahinter verschwindet.</p>

<h2>Das 5-Hashtag-Limit und der stille Fehler, den du kennen musst</h2>
<p>Instagram hat ein dokumentiertes Maximum von <strong>30 Hashtags pro Post</strong>, aber es gibt eine weitaus gefährlichere, nicht dokumentierte Schwelle: <strong>Posts mit zu vielen Hashtags können ohne jede Fehlermeldung nicht veröffentlicht werden</strong>. Instagrams Spam-Filter behandeln exzessives Hashtag-Stapeln als unechtes Verhalten, und viele Accounts berichten von stiller Unterdrückung — der Post scheint sich zu veröffentlichen, erreicht aber fast niemanden.</p>
<p>Die praktische sichere Obergrenze, auf die sich die meisten Creator geeinigt haben, sind <strong>5 hochrelevante Hashtags</strong>. Nicht 30, nicht 10 — fünf, gewählt nach echter thematischer Übereinstimmung. PostTruncates Caption-Analyser zählt deine Hashtags in Echtzeit und warnt, wenn du die Schwelle überschreitest.</p>

<h2>Bildunterschriften schreiben, die Speicherungen und Weiterleitungen erzielen</h2>
<p>Instagrams Algorithmus gewichtet <strong>Speicherungen</strong> stärker als Likes oder Follows, weil eine Speicherung signalisiert, dass der Inhalt es wert war, erneut aufgerufen zu werden. Bildunterschriften, die Speicherungen erzielen, teilen in der Regel eine gemeinsame Struktur: ein spezifisches Versprechen in der ersten Zeile, handlungsrelevante Details im Hauptteil und eine Frage oder ein Call-to-Action, der zur Antwort einlädt.</p>
<p>Nutze PostTruncate, um deine Bildunterschrift zu verfassen, die Fold-Vorschau zu prüfen, die Hashtag-Anzahl zu bestätigen und den fertigen Text direkt nach Instagram zu kopieren — alles in einem Durchgang.</p>`,

      fr: `<h2>La limite de 2200 caractères sur Instagram</h2>
<p>Chaque légende Instagram peut contenir jusqu'à <strong>2200 caractères</strong> — assez pour un court texte, une description de produit détaillée ou une liste à points. Contrairement à Twitter, Instagram n'est pas conçu pour la brièveté ; les légendes plus longues avec un contenu de fond surpassent régulièrement les formules lapidaires en enregistrements, partages et profondeur des commentaires.</p>
<p>Le <strong>compteur de caractères Instagram</strong> de PostTruncate suit votre total de caractères en temps réel pendant que vous tapez, indiquant à la fois votre comptage actuel et la marge restante avant que la plateforme ne vous arrête. Fini les mauvaises surprises au moment de coller votre texte dans l'application.</p>

<h2>Le pli à 125 caractères : le chiffre le plus important du copywriting Instagram</h2>
<p>Bien que la légende complète puisse atteindre 2200 caractères, <strong>Instagram tronque l'affichage dans le fil à environ 125 caractères</strong>, cachant le reste derrière un appui sur « plus ». Les mots avant ce pli sont les seuls que la plupart de votre audience lira jamais. Si votre accroche n'est pas dans ces 125 premiers caractères, vous écrivez pour vous-même.</p>
<p>C'est pourquoi le pli compte plus que la limite totale. Une légende qui enterre le message clé dans le troisième paragraphe pourrait tout aussi bien être vide — l'algorithme ne récompense pas l'engagement invisible. Les meilleurs rédacteurs Instagram traitent la fenêtre de 125 caractères comme une discipline à part entière : une pensée complète, qui éveille la curiosité et mérite l'appui sur « plus ».</p>
<p>L'aperçu en direct de PostTruncate affiche <strong>exactement où tombe le pli dans votre légende</strong>, pour que vous voyiez d'un coup d'œil si votre accroche arrive avant la coupure ou disparaît derrière elle.</p>

<h2>La limite de 5 hashtags et l'échec silencieux à connaître absolument</h2>
<p>Instagram a un maximum documenté de <strong>30 hashtags par publication</strong>, mais il existe un seuil bien plus dangereux et non documenté : <strong>les publications avec trop de hashtags peuvent échouer à publier sans aucun message d'erreur</strong>. Les filtres anti-spam d'Instagram traitent l'empilement excessif de hashtags comme un comportement inauthentique, et de nombreux comptes signalent une suppression silencieuse — la publication semble avoir été publiée, mais n'atteint presque personne.</p>
<p>Le plafond pratique et sûr sur lequel la plupart des créateurs se sont accordés est de <strong>5 hashtags très pertinents</strong>. Pas 30, pas 10 — cinq, choisis pour leur alignement thématique réel. L'analyseur de légendes de PostTruncate compte vos hashtags en temps réel et vous avertit lorsque vous dépassez ce seuil.</p>

<h2>Écrire des légendes qui génèrent des enregistrements et des partages</h2>
<p>L'algorithme d'Instagram pondère les <strong>enregistrements</strong> plus lourdement que les mentions J'aime ou les abonnements, car un enregistrement signale que le contenu méritait d'y revenir. Les légendes qui génèrent des enregistrements partagent généralement une structure commune : une promesse précise en première ligne, des détails actionnables dans le corps, et une question ou un appel à l'action qui invite à répondre.</p>
<p>Utilisez PostTruncate pour rédiger votre légende, vérifier l'aperçu du pli, confirmer votre nombre de hashtags, puis copiez le texte final directement vers Instagram — le tout en une seule opération.</p>`,

      pt: `<h2>O limite de 2200 caracteres do Instagram</h2>
<p>Cada legenda do Instagram pode ter até <strong>2200 caracteres</strong> — espaço suficiente para um texto breve, uma descrição detalhada de produto ou uma lista com vários pontos. Ao contrário do Twitter, o Instagram não foi construído para a brevidade; legendas mais longas com conteúdo genuíno superam regularmente as de uma linha em salvamentos, compartilhamentos e profundidade de comentários.</p>
<p>O <strong>contador de caracteres para Instagram</strong> do PostTruncate acompanha o total de caracteres em tempo real enquanto você digita, mostrando tanto a contagem atual quanto a margem restante antes de a plataforma te bloquear. Sem mais surpresas de última hora ao colar o texto no app.</p>

<h2>O corte de 125 caracteres: o número mais importante no copywriting do Instagram</h2>
<p>Embora a legenda completa possa ter até 2200 caracteres, <strong>o Instagram trunca a exibição no feed em torno de 125 caracteres</strong>, escondendo o restante atrás de um toque em "mais". As palavras antes desse corte são as únicas que a maior parte do seu público vai ler. Se o seu gancho não estiver nos primeiros 125 caracteres, você está escrevendo para si mesmo.</p>
<p>É por isso que o corte importa mais do que o limite total. Uma legenda que enterra a mensagem principal no terceiro parágrafo é praticamente invisível — o algoritmo não recompensa engajamento que ninguém vê. Os melhores copywriters do Instagram tratam a janela de 125 caracteres como uma disciplina própria: um pensamento completo e que desperte curiosidade, capaz de conquistar o toque em "mais".</p>
<p>A prévia ao vivo do PostTruncate mostra <strong>exatamente onde o corte cai na sua legenda</strong>, para que você veja de relance se o gancho aparece antes do corte ou desaparece atrás dele.</p>

<h2>O limite de 5 hashtags e a falha silenciosa que você precisa conhecer</h2>
<p>O Instagram tem um máximo documentado de <strong>30 hashtags por postagem</strong>, mas existe um limite muito mais perigoso e não documentado: <strong>postagens com hashtags em excesso podem falhar na publicação sem nenhuma mensagem de erro</strong>. Os filtros de spam do Instagram tratam o empilhamento excessivo de hashtags como comportamento não autêntico, e muitas contas relatam supressão silenciosa — a postagem parece ter sido publicada, mas não alcança quase ninguém.</p>
<p>O teto prático seguro com o qual a maioria dos criadores chegou a um consenso é de <strong>5 hashtags altamente relevantes</strong>. Não 30, não 10 — cinco, escolhidos pela real afinidade temática. O analisador de legendas do PostTruncate conta seus hashtags em tempo real e avisa quando você ultrapassa esse limite.</p>

<h2>Escrever legendas que geram salvamentos e compartilhamentos</h2>
<p>O algoritmo do Instagram pondera os <strong>salvamentos</strong> mais fortemente do que curtidas ou seguidores, porque um salvamento indica que o conteúdo vale a pena revisitar. Legendas que geram salvamentos tendem a compartilhar uma estrutura comum: uma promessa específica na primeira linha, detalhes acionáveis no corpo e uma pergunta ou chamada para ação que convida a uma resposta.</p>
<p>Use o PostTruncate para redigir sua legenda, verificar a prévia do corte, confirmar a contagem de hashtags e copiar o texto final diretamente para o Instagram — tudo em uma única etapa.</p>`,

      it: `<h2>Il limite di 2200 caratteri di Instagram</h2>
<p>Ogni didascalia di Instagram può contenere fino a <strong>2200 caratteri</strong> — spazio sufficiente per un breve saggio, una descrizione dettagliata di prodotto o un elenco articolato. A differenza di Twitter, Instagram non è progettato per la brevità; le didascalie più lunghe con contenuti genuini superano regolarmente le battute in salvataggi, condivisioni e profondità dei commenti.</p>
<p>Il <strong>contatore di caratteri per Instagram</strong> di PostTruncate traccia in tempo reale il totale dei caratteri mentre scrivi, mostrando sia il conteggio attuale sia il margine rimasto prima che la piattaforma ti blocchi. Niente più sorprese all'ultimo minuto quando incolli il testo nell'app.</p>

<h2>La soglia dei 125 caratteri: il numero più importante nel copywriting di Instagram</h2>
<p>Sebbene la didascalia completa possa arrivare a 2200 caratteri, <strong>Instagram tronca la visualizzazione nel feed a circa 125 caratteri</strong>, nascondendo il resto dietro un tocco su "altro". Le parole prima di quella soglia sono le uniche che la maggior parte del tuo pubblico leggerà mai. Se il tuo hook non si trova in quei primi 125 caratteri, stai scrivendo per te stesso.</p>
<p>Per questo la soglia conta più del limite totale. Una didascalia che seppellisce il messaggio chiave nel terzo paragrafo potrebbe essere praticamente vuota — l'algoritmo non premia l'engagement invisibile. I migliori copywriter di Instagram trattano la finestra di 125 caratteri come una disciplina a sé: un pensiero completo, che stimola la curiosità e merita il tocco su "altro".</p>
<p>L'anteprima in diretta di PostTruncate mostra <strong>esattamente dove cade la soglia nella tua didascalia</strong>, così puoi vedere a colpo d'occhio se il tuo hook arriva prima del taglio o scompare dietro di esso.</p>

<h2>Il limite di 5 hashtag e il fallimento silenzioso che devi conoscere</h2>
<p>Instagram ha un massimo documentato di <strong>30 hashtag per post</strong>, ma esiste una soglia molto più pericolosa e non documentata: <strong>i post con troppi hashtag possono non riuscire a essere pubblicati senza alcun messaggio di errore</strong>. I filtri anti-spam di Instagram trattano l'accumulo eccessivo di hashtag come comportamento non autentico, e molti account segnalano una soppressione silenziosa — il post sembra pubblicato, ma raggiunge quasi nessuno.</p>
<p>Il limite pratico sicuro su cui si sono accordati la maggior parte dei creator è di <strong>5 hashtag altamente pertinenti</strong>. Non 30, non 10 — cinque, scelti per un reale allineamento tematico. L'analizzatore di didascalie di PostTruncate conta i tuoi hashtag in tempo reale e ti avvisa quando superi la soglia.</p>

<h2>Scrivere didascalie che ottengono salvataggi e condivisioni</h2>
<p>L'algoritmo di Instagram pesa i <strong>salvataggi</strong> più fortemente dei like o dei follower, perché un salvataggio segnala che il contenuto valeva la pena di essere rivisto. Le didascalie che ottengono salvataggi tendono a condividere una struttura comune: una promessa specifica nella prima riga, dettagli azionabili nel corpo e una domanda o una call to action che invita a rispondere.</p>
<p>Usa PostTruncate per redigere la tua didascalia, controllare l'anteprima della soglia, confermare il conteggio degli hashtag e copiare il testo finale direttamente su Instagram — tutto in un unico passaggio.</p>`,

      nl: `<h2>Instagram's 2200-tekenlimiet</h2>
<p>Elk Instagram-bijschrift kan tot <strong>2200 tekens</strong> bevatten — ruimte genoeg voor een kort essay, een gedetailleerde productbeschrijving of een uitgebreide lijst. Anders dan Twitter is Instagram niet gemaakt voor beknoptheid; langere bijschriften met echte inhoud overtreffen eenregelige teksten regelmatig in opslagen, delingen en de diepte van reacties.</p>
<p>PostTruncates <strong>Instagram-tekenteller</strong> houdt je tekentotaal bij in real time terwijl je typt en toont zowel het huidige aantal als de ruimte die nog over is voordat het platform je stopt. Geen verrassingen meer als je de tekst in de app plakt en ontdekt dat je er 40 tekens over zit.</p>

<h2>De 125-tekenvouw: het belangrijkste getal in Instagram-copywriting</h2>
<p>Hoewel het volledige bijschrift tot 2200 tekens lang kan zijn, <strong>kapt Instagram de feed-weergave af op zo'n 125 tekens</strong> en verbergt de rest achter een tik op "meer". De woorden vóór die vouw zijn de enige die het grootste deel van je publiek ooit zal lezen. Als je hook niet in die eerste 125 tekens staat, schrijf je voor jezelf.</p>
<p>Daarom telt de vouw zwaarder dan de totale limiet. Een bijschrift dat de kernboodschap in de derde alinea verstopt, kan net zo goed leeg zijn — het algoritme beloont onzichtbare betrokkenheid niet. De beste Instagram-copywriters behandelen het 125-teken-venster als een eigen discipline: een complete, nieuwsgierig makende gedachte die de tik op "meer" verdient.</p>
<p>De livevoorvertoning van PostTruncate laat <strong>precies zien waar de vouw in jouw bijschrift valt</strong>, zodat je in één oogopslag ziet of je hook vóór de knip staat of erachter verdwijnt.</p>

<h2>De 5-hashtaglimiet en de stille mislukking die je moet kennen</h2>
<p>Instagram heeft een gedocumenteerd maximum van <strong>30 hashtags per bericht</strong>, maar er is een veel gevaarlijkere, ongedocumenteerde drempel: <strong>berichten met te veel hashtags kunnen zonder enige foutmelding niet worden gepubliceerd</strong>. Instagrams spamfilters behandelen excessief hashtag-stapelen als onecht gedrag, en veel accounts melden stille onderdrukking — het bericht lijkt gepubliceerd, maar bereikt bijna niemand.</p>
<p>Het praktische veilige plafond waarop de meeste creators zijn uitgekomen, is <strong>5 zeer relevante hashtags</strong>. Niet 30, niet 10 — vijf, gekozen op basis van echte thematische aansluiting. PostTruncates bijschriftanalyser telt je hashtags in real time en waarschuwt je wanneer je de drempel overschrijdt.</p>

<h2>Bijschriften schrijven die opslagen en delingen opleveren</h2>
<p>Instagram's algoritme weegt <strong>opslagen</strong> zwaarder dan likes of volgacties, omdat een opslag aangeeft dat de inhoud de moeite waard was om op terug te komen. Bijschriften die opslagen opleveren, hebben doorgaans een vergelijkbare structuur: een specifieke belofte in de eerste regel, bruikbare details in de romp en een vraag of call-to-action die uitnodigt tot een reactie.</p>
<p>Gebruik PostTruncate om je bijschrift te schrijven, de vouwvoorvertoning te controleren, je hashtagaantal te bevestigen en de definitieve tekst rechtstreeks naar Instagram te kopiëren — alles in één keer.</p>`,

      ja: `<h2>Instagramの2200文字キャプション制限</h2>
<p>Instagramのキャプションには最大<strong>2200文字</strong>まで入力できます。短いエッセイ、詳細な商品説明、箇条書きのリストを書くのに十分なスペースです。Twitterと違い、Instagramは簡潔さを求めるプラットフォームではありません。内容の充実した長めのキャプションは、一行コメントよりも保存数・シェア数・コメントの深さで優れた成果を出すことが多いです。</p>
<p>PostTruncateの<strong>Instagram文字数カウンター</strong>は入力中にリアルタイムで文字数を追跡し、現在の文字数と制限まで残りどれくらいかを表示します。アプリに貼り付けてから制限超過に気づく、という最後の砦での焦りがなくなります。</p>

<h2>125文字の折り返し点：Instagramコピーライティングで最重要な数字</h2>
<p>キャプション全体は2200文字まで書けますが、<strong>Instagramはフィード表示を約125文字で切り取り</strong>、残りを「続きを読む」タップの後ろに隠します。その折り返し点より前の言葉だけが、フォロワーの大半が実際に目にする文章です。最初の125文字にフックがなければ、自分のためだけに書いていることになります。</p>
<p>だからこそ、折り返し点は合計文字数の制限より重要です。3段落目に核心を埋めたキャプションは、事実上空白も同然です——アルゴリズムは見えないエンゲージメントを評価しません。優れたInstagramコピーライターは、この125文字の窓を独立した表現の場として扱います。好奇心を刺激し、「続きを読む」をタップさせるに値する完結した一文を作ることが目標です。</p>
<p>PostTruncateのライブプレビューは<strong>キャプション内の折り返し点がどこに来るかを正確に表示</strong>します。フックが切り取られる前に収まっているか、それとも後ろに隠れてしまうかが一目でわかります。</p>

<h2>5ハッシュタグ制限と知っておくべき無音の失敗</h2>
<p>Instagramには投稿あたり<strong>30ハッシュタグ</strong>という公式の上限があります。しかしそれよりはるかに危険な非公式のしきい値も存在します。<strong>ハッシュタグが多すぎる投稿は、エラーメッセージなしに投稿が失敗することがある</strong>のです。InstagramのスパムフィルターはハッシュタグのStackingを不自然な行動として判定し、多くのアカウントが無音のリーチ制限を報告しています——投稿したように見えても、ほぼ誰にも届かない状態です。</p>
<p>多くのクリエイターが行き着いた実践的な安全ラインは<strong>高度に関連性の高い5つのハッシュタグ</strong>です。30でも10でもなく、テーマとの本物の一致を基準に選んだ5つです。PostTruncateのキャプションアナライザーはハッシュタグをリアルタイムで数え、しきい値を超えると警告します。</p>

<h2>保存とシェアを獲得するキャプションの書き方</h2>
<p>Instagramのアルゴリズムは、いいねやフォローよりも<strong>保存</strong>を高く評価します。保存は、そのコンテンツが再び見る価値があると判断されたシグナルだからです。保存を獲得するキャプションには共通した構造があります：1行目に具体的な約束、本文に実践的な内容、そして返信を促す質問またはCTAです。</p>
<p>PostTruncateでキャプションを下書きし、折り返し点のプレビューを確認し、ハッシュタグ数をチェックしてから、最終テキストをInstagramに直接コピーするまで、すべて1つの作業で完結します。</p>`,

      zh: `<h2>Instagram的2200字符说明文字限制</h2>
<p>每条Instagram帖子的说明文字最多可容纳<strong>2200个字符</strong>——足以写一篇短文、详细的产品介绍或多要点列表。与推特不同，Instagram并非为简短而生；内容充实的长说明文字在收藏数、转发数和评论深度上，通常都优于寥寥数语的帖子。</p>
<p>PostTruncate的<strong>Instagram字符计数器</strong>在你输入时实时追踪字符总数，同时显示当前计数和距离平台截止还剩多少空间。再也不用把文字粘贴到App里才发现超出了40个字符。</p>

<h2>125字符折叠点：Instagram文案创作中最关键的数字</h2>
<p>虽然完整说明文字可以长达2200个字符，但<strong>Instagram在信息流中只显示约125个字符</strong>，其余内容隐藏在"更多"点击后面。折叠点之前的文字，是大多数关注者唯一会看到的内容。如果你的钩子不在前125个字符里，就等于在自言自语。</p>
<p>这正是折叠点比总字符数上限更重要的原因。把核心信息埋在第三段的说明文字几乎等于什么都没写——算法不会奖励无人看到的互动。最优秀的Instagram文案作者把125字符窗口当作独立的写作课题：一个完整而令人好奇的想法，能让人点击"更多"继续阅读。</p>
<p>PostTruncate的实时预览能<strong>精确显示你的说明文字在哪里被折叠</strong>，让你一眼看出钩子是在折叠前还是消失在折叠后。调整开头，直到最有吸引力的内容出现在折叠线以上。</p>

<h2>5个标签的限制，以及你必须知道的静默失败</h2>
<p>Instagram有官方记录的每帖最多<strong>30个标签</strong>的上限，但还有一个更危险的未公开阈值：<strong>标签数量过多的帖子可能在没有任何错误提示的情况下发布失败</strong>。Instagram的垃圾信息过器将大量堆砌标签视为非真实行为，许多账号都反映遭遇了静默流量限制——帖子看似发布成功，但几乎没有人看到。</p>
<p>大多数创作者总结出的实际安全上限是<strong>5个高度相关的标签</strong>。不是30个，不是10个——是5个，按真正的主题关联性精选，而非追求数量。PostTruncate的说明文字分析器实时统计你的标签数量，并在超过阈值时发出提示。</p>

<h2>写出能获得收藏和分享的说明文字</h2>
<p>Instagram的算法对<strong>收藏</strong>的权重高于点赞或关注，因为收藏代表内容值得再次查看。能获得收藏的说明文字往往有共同的结构：第一行提出明确的承诺，正文提供可操作的细节，结尾用一个问题或行动号召邀请回复。</p>
<p>使用PostTruncate起草说明文字，检查折叠点预览，确认标签数量，然后一键将最终文字复制到Instagram——全部在一个步骤中完成。</p>`,

      da: `<h2>Instagrams 2200-tegn-billedtekstgrænse</h2>
<p>Hver Instagram-billedtekst kan rumme op til <strong>2200 tegn</strong> — nok til et kort essay, en detaljeret produktbeskrivelse eller en flerpunkts liste. I modsætning til Twitter er Instagram ikke bygget til korthed; længere billedtekster med ægte indhold overgår jævnligt encitater i gemte opslag, delinger og kommentardybde.</p>
<p>PostTruncates <strong>Instagram-tegntæller</strong> sporer dit tegntotal i realtid, mens du skriver, og viser både dit aktuelle antal og den plads, der er tilbage, inden platformen stopper dig. Ingen sidst-øjeblik-overraskelser, når du indsætter teksten i appen.</p>

<h2>125-tegn-folden: det vigtigste tal i Instagram-tekstforfatning</h2>
<p>Selvom den fulde billedtekst kan løbe op til 2200 tegn, <strong>afkorter Instagram feed-visningen ved cirka 125 tegn</strong> og gemmer resten bag et tryk på "mere". Ordene før den fold er de eneste, størstedelen af dit publikum nogensinde vil læse. Hvis dit hook ikke er i de første 125 tegn, skriver du for dig selv.</p>
<p>Derfor tæller folden mere end den samlede grænse. En billedtekst der begraver kernebeskeden i tredje afsnit, kan lige så godt være tom — algoritmen belønner ikke usynligt engagement. De bedste Instagram-tekstforfattere behandler 125-tegn-vinduet som sin egen disciplin: en komplet, nysgerrighedsfremmende tanke, der fortjener et tryk på "mere".</p>
<p>PostTruncates liveforhåndsvisning viser <strong>præcis, hvor folden falder i din billedtekst</strong>, så du med et blik kan se, om dit hook lander før klippet eller forsvinder bag det.</p>

<h2>5-hashtag-grænsen og den stille fejl du skal kende</h2>
<p>Instagram har et dokumenteret maksimum på <strong>30 hashtags per opslag</strong>, men der er en langt mere farlig udokumenteret tærskel: <strong>opslag med for mange hashtags kan mislykkes i at publicere uden nogen fejlmeddelelse</strong>. Instagrams spamfiltre behandler massiv hashtag-stabling som uægte adfærd, og mange konti rapporterer stille undertrykkelse — opslaget ser ud til at være publiceret, men når næsten ingen.</p>
<p>Det praktiske sikre loft, som de fleste indholdsskabere er nået frem til, er <strong>5 meget relevante hashtags</strong>. Ikke 30, ikke 10 — fem, valgt ud fra ægte emnemæssig overensstemmelse. PostTruncates billedtekstanalysator tæller dine hashtags i realtid og advarer dig, når du overskrider tærsklen.</p>

<h2>Skrive billedtekster der opnår gemte opslag og delinger</h2>
<p>Instagrams algoritme vejer <strong>gemte opslag</strong> tungere end likes eller følgere, fordi et gemt opslag signalerer, at indholdet var værd at vende tilbage til. Billedtekster der opnår gemte opslag, deler typisk en fælles struktur: et specifikt løfte i første linje, handlingsorienterede detaljer i kroppen og et spørgsmål eller en opfordring der inviterer til svar.</p>
<p>Brug PostTruncate til at skrive din billedtekst, tjek fold-forhåndsvisningen, bekræft dit hashtag-antal og kopiér derefter den endelige tekst direkte til Instagram — alt i én omgang.</p>`,
    },
  },
  {
    id: 'linkedin',
    editorAnchor: 'workspace',
    lastUpdated: '2026-05-25',
    platformLimits:
      '3000 character post hard limit, desktop feed folds at ~210 characters, mobile feed folds at ~140 characters',

    slugs: {
      en: 'linkedin-character-counter',
      es: 'contador-caracteres-linkedin',
      de: 'linkedin-zeichenzaehler',
      fr: 'compteur-caracteres-linkedin',
      pt: 'contador-caracteres-linkedin',
      it: 'contatore-caratteri-linkedin',
      nl: 'linkedin-tekenteller',
      ja: 'linkedin-moji-kaunta',
      zh: 'linkedin-zi-fu-ji-shu',
      da: 'linkedin-tegntaeller',
    },

    schemaName: {
      en: 'LinkedIn Character Counter',
      es: 'Contador de Caracteres para LinkedIn',
      de: 'LinkedIn Zeichenzähler',
      fr: 'Compteur de Caractères LinkedIn',
      pt: 'Contador de Caracteres do LinkedIn',
      it: 'Contatore di Caratteri per LinkedIn',
      nl: 'LinkedIn Tekenteller',
      ja: 'LinkedIn 文字数カウンター',
      zh: 'LinkedIn 字符计数器',
      da: 'LinkedIn Tegntæller',
    },

    titles: {
      en: 'LinkedIn Character Counter — Free Post Length & Fold Checker',
      es: 'Contador de Caracteres LinkedIn — Comprueba longitud y corte gratis',
      de: 'LinkedIn Zeichenzähler — Beitragslänge und Fold kostenlos prüfen',
      fr: 'Compteur de Caractères LinkedIn — Longueur et pli vérifiés gratuitement',
      pt: 'Contador de Caracteres LinkedIn — Verifique comprimento e corte grátis',
      it: 'Contatore Caratteri LinkedIn — Lunghezza del post e soglia gratis',
      nl: 'LinkedIn Tekenteller — Gratis berichtlengte- en vouwchecker',
      ja: 'LinkedIn文字数カウンター — 投稿の長さと折り返しを無料チェック',
      zh: 'LinkedIn字符计数器 — 免费检查帖子长度与折叠点',
      da: 'LinkedIn Tegntæller — Tjek længde og fold gratis',
    },

    metaDescriptions: {
      en: 'Free LinkedIn character counter. Track the 3000-character limit and preview the ~210-char desktop and ~140-char mobile "see more" folds so your hook lands first.',
      es: 'Contador de caracteres para LinkedIn gratis. Controla el límite de 3000 caracteres y previsualiza los cortes de escritorio (~210) y móvil (~140) para que tu gancho destaque primero.',
      de: 'Kostenloser LinkedIn-Zeichenzähler. Verfolge das 3000-Zeichen-Limit und sieh den Desktop-Fold (~210) und Mobile-Fold (~140) in der Vorschau, damit dein Hook zuerst erscheint.',
      fr: 'Compteur de caractères LinkedIn gratuit. Suivez la limite de 3000 caractères et prévisualisez les plis bureau (~210) et mobile (~140) pour que votre accroche apparaisse en premier.',
      pt: 'Contador de caracteres do LinkedIn gratuito. Acompanhe o limite de 3000 caracteres e visualize os cortes desktop (~210) e mobile (~140) para que seu gancho apareça primeiro.',
      it: 'Contatore di caratteri LinkedIn gratuito. Monitora il limite di 3000 caratteri e visualizza in anteprima le soglie desktop (~210) e mobile (~140) così il tuo gancio appare per primo.',
      nl: 'Gratis LinkedIn tekenteller. Volg de 3000-tekenlimiet en bekijk de desktopvouw (~210) en mobiele vouw (~140) zodat je hook als eerste verschijnt.',
      ja: '無料のLinkedIn文字数カウンター。3000文字の上限を追跡し、デスクトップ（約210文字）とモバイル（約140文字）の折り返しをプレビューして、フックを最初に表示。',
      zh: '免费LinkedIn字符计数器。追踪3000字符上限，预览桌面端（约210字符）与移动端（约140字符）折叠点，让你的钩子率先呈现。',
      da: 'Gratis LinkedIn tegntæller. Følg 3000-tegns-grænsen og forhåndsvis desktop-folden (~210) og mobil-folden (~140), så dit hook vises først.',
    },

    intro: {
      en: "Check your LinkedIn post before you publish — the editor below tracks the 3000-character limit live and shows exactly where the desktop and mobile “see more” folds cut your text.",
      es: "Revisa tu publicación de LinkedIn antes de publicar: el editor de abajo controla en vivo el límite de 3000 caracteres y muestra exactamente dónde cortan el texto los pliegues de «ver más» en escritorio y móvil.",
      de: "Prüfe deinen LinkedIn-Beitrag vor dem Veröffentlichen — der Editor unten verfolgt live das 3000-Zeichen-Limit und zeigt genau, wo die „Mehr anzeigen“-Umbrüche auf Desktop und Mobil deinen Text abschneiden.",
      fr: "Vérifiez votre publication LinkedIn avant de publier : l’éditeur ci-dessous suit en direct la limite de 3000 caractères et montre exactement où les plis « voir plus » sur ordinateur et mobile coupent votre texte.",
      pt: "Confira sua publicação do LinkedIn antes de publicar: o editor abaixo acompanha ao vivo o limite de 3000 caracteres e mostra exatamente onde os cortes de «ver mais» no desktop e no celular truncam seu texto.",
      it: "Controlla il tuo post LinkedIn prima di pubblicare: l’editor qui sotto monitora in tempo reale il limite di 3000 caratteri e mostra esattamente dove le soglie «mostra altro» su desktop e mobile tagliano il testo.",
      nl: "Controleer je LinkedIn-bericht voordat je publiceert — de editor hieronder volgt live de limiet van 3000 tekens en laat precies zien waar de ‘meer weergeven’-vouwen op desktop en mobiel je tekst afkappen.",
      ja: "公開する前にLinkedInの投稿をチェック。下のエディターは3000文字の上限をリアルタイムで追跡し、デスクトップとモバイルの「もっと見る」折り返しが本文を切る位置を正確に示します。",
      zh: "发布前检查你的 LinkedIn 帖子：下方编辑器实时追踪 3000 字符上限，并精确显示桌面端和移动端“查看更多”折叠点在哪里截断文本。",
      da: "Tjek dit LinkedIn-opslag, før du udgiver — editoren nedenfor følger live 3000-tegns-grænsen og viser præcis, hvor „se mere“-foldene på computer og mobil skærer din tekst af.",
    },

    faq: {
      en: [
        {
          q: 'What is LinkedIn\'s character limit for posts?',
          a: 'A LinkedIn text post — or the caption on an image or video post — is capped at 3000 characters. The counter above tracks every character so you always know how much room is left.',
        },
        {
          q: 'Where does LinkedIn cut my post with "see more"?',
          a: 'The feed collapses your post after roughly 210 characters on desktop and about 140 on mobile. Anything past that hides behind "see more," so put your hook in the first line or two before either fold.',
        },
        {
          q: 'Do hashtags and @mentions count toward the limit?',
          a: 'Yes, both count toward the 3000 characters and appear in the body. Mentions also notify the tagged person, so use them deliberately rather than as a way to add length.',
        },
        {
          q: 'Why do my line breaks disappear on LinkedIn?',
          a: 'Pasting from some editors collapses blank lines, and LinkedIn strips certain formatting. The preview above shows how your spacing actually renders, so a wall of text does not slip through by accident.',
        },
      ],
      es: [
        { q: "¿Cuál es el límite de caracteres de LinkedIn para las publicaciones?", a: "Una publicación de texto de LinkedIn —o el pie de una publicación con imagen o vídeo— tiene un límite de 3000 caracteres. El contador de arriba cuenta cada carácter para que siempre sepas cuánto espacio te queda." },
        { q: "¿Dónde corta LinkedIn mi publicación con «ver más»?", a: "El feed colapsa tu publicación tras unos 210 caracteres en escritorio y unos 140 en móvil. Todo lo que sigue se oculta tras «ver más», así que pon tu gancho en la primera o segunda línea, antes de cualquiera de los cortes." },
        { q: "¿Los hashtags y las @menciones cuentan para el límite?", a: "Sí, ambos cuentan para los 3000 caracteres y aparecen en el cuerpo. Las menciones además notifican a la persona etiquetada, así que úsalas con intención y no para alargar el texto." },
        { q: "¿Por qué desaparecen mis saltos de línea en LinkedIn?", a: "Pegar desde algunos editores elimina las líneas en blanco, y LinkedIn descarta cierto formato. La vista previa de arriba muestra cómo se ve realmente tu espaciado, para que no se cuele un muro de texto sin querer." },
      ],
      de: [
        { q: "Wie lautet das Zeichenlimit von LinkedIn für Beiträge?", a: "Ein LinkedIn-Textbeitrag — oder die Bildunterschrift eines Bild- oder Videobeitrags — ist auf 3000 Zeichen begrenzt. Der Zähler oben erfasst jedes Zeichen, sodass du immer weißt, wie viel Platz bleibt." },
        { q: "Wo schneidet LinkedIn meinen Beitrag mit „Mehr anzeigen“ ab?", a: "Der Feed klappt deinen Beitrag nach etwa 210 Zeichen am Desktop und rund 140 am Handy ein. Alles danach versteckt sich hinter „Mehr anzeigen“ — setze deinen Hook also in die erste oder zweite Zeile, vor beide Umbrüche." },
        { q: "Zählen Hashtags und @Erwähnungen zum Limit?", a: "Ja, beide zählen zu den 3000 Zeichen und erscheinen im Text. Erwähnungen benachrichtigen zudem die markierte Person, nutze sie also bewusst und nicht, um Länge zu gewinnen." },
        { q: "Warum verschwinden meine Zeilenumbrüche auf LinkedIn?", a: "Das Einfügen aus manchen Editoren entfernt Leerzeilen, und LinkedIn streicht bestimmte Formatierungen. Die Vorschau oben zeigt, wie dein Abstand tatsächlich aussieht, damit sich nicht versehentlich eine Textwand einschleicht." },
      ],
      fr: [
        { q: "Quelle est la limite de caractères de LinkedIn pour les publications ?", a: "Une publication texte LinkedIn — ou la légende d’une publication avec image ou vidéo — est limitée à 3000 caractères. Le compteur ci-dessus compte chaque caractère pour que vous sachiez toujours combien d’espace il reste." },
        { q: "Où LinkedIn coupe-t-il ma publication avec « voir plus » ?", a: "Le fil replie votre publication après environ 210 caractères sur ordinateur et 140 sur mobile. Tout ce qui suit se cache derrière « voir plus » : placez donc votre accroche dans la première ou la deuxième ligne, avant les deux coupures." },
        { q: "Les hashtags et les @mentions comptent-ils dans la limite ?", a: "Oui, les deux comptent dans les 3000 caractères et apparaissent dans le corps. Les mentions notifient aussi la personne taguée, alors utilisez-les à dessein et non pour rallonger le texte." },
        { q: "Pourquoi mes sauts de ligne disparaissent-ils sur LinkedIn ?", a: "Coller depuis certains éditeurs supprime les lignes vides, et LinkedIn retire certaines mises en forme. L’aperçu ci-dessus montre comment votre espacement s’affiche réellement, pour éviter qu’un mur de texte passe par mégarde." },
      ],
      pt: [
        { q: "Qual é o limite de caracteres do LinkedIn para publicações?", a: "Uma publicação de texto do LinkedIn — ou a legenda de uma publicação com imagem ou vídeo — tem limite de 3000 caracteres. O contador acima conta cada caractere para você sempre saber quanto espaço resta." },
        { q: "Onde o LinkedIn corta minha publicação com «ver mais»?", a: "O feed recolhe sua publicação após cerca de 210 caracteres no desktop e cerca de 140 no celular. Tudo depois disso fica escondido atrás de «ver mais», então coloque seu gancho na primeira ou segunda linha, antes de qualquer corte." },
        { q: "Hashtags e @menções contam para o limite?", a: "Sim, ambos contam para os 3000 caracteres e aparecem no corpo. As menções também notificam a pessoa marcada, então use-as de propósito e não como forma de aumentar o tamanho." },
        { q: "Por que minhas quebras de linha somem no LinkedIn?", a: "Colar de alguns editores elimina as linhas em branco, e o LinkedIn remove certa formatação. A pré-visualização acima mostra como seu espaçamento aparece de verdade, para um paredão de texto não passar sem querer." },
      ],
      it: [
        { q: "Qual è il limite di caratteri di LinkedIn per i post?", a: "Un post di testo su LinkedIn — o la didascalia di un post con immagine o video — ha un limite di 3000 caratteri. Il contatore qui sopra conta ogni carattere, così sai sempre quanto spazio resta." },
        { q: "Dove LinkedIn taglia il mio post con «mostra altro»?", a: "Il feed comprime il post dopo circa 210 caratteri su desktop e circa 140 su mobile. Tutto ciò che segue si nasconde dietro «mostra altro», quindi metti il gancio nella prima o seconda riga, prima di entrambe le soglie." },
        { q: "Gli hashtag e le @menzioni contano per il limite?", a: "Sì, entrambi contano nei 3000 caratteri e compaiono nel corpo. Le menzioni notificano anche la persona taggata, quindi usale con criterio e non per allungare il testo." },
        { q: "Perché i miei a capo spariscono su LinkedIn?", a: "Incollare da alcuni editor elimina le righe vuote, e LinkedIn rimuove certa formattazione. L’anteprima qui sopra mostra come appare davvero la tua spaziatura, così non passa per sbaglio un muro di testo." },
      ],
      nl: [
        { q: "Wat is de tekenlimiet van LinkedIn voor berichten?", a: "Een LinkedIn-tekstbericht — of het bijschrift bij een afbeelding- of videobericht — is beperkt tot 3000 tekens. De teller hierboven telt elk teken, zodat je altijd weet hoeveel ruimte er over is." },
        { q: "Waar kapt LinkedIn mijn bericht af met ‘meer weergeven’?", a: "Het feed klapt je bericht in na ongeveer 210 tekens op desktop en zo’n 140 op mobiel. Alles daarna verdwijnt achter ‘meer weergeven’, dus zet je hook in de eerste of tweede regel, vóór beide vouwen." },
        { q: "Tellen hashtags en @vermeldingen mee voor de limiet?", a: "Ja, beide tellen mee voor de 3000 tekens en verschijnen in de tekst. Vermeldingen sturen ook een melding naar de getagde persoon, dus gebruik ze bewust en niet om lengte toe te voegen." },
        { q: "Waarom verdwijnen mijn regeleinden op LinkedIn?", a: "Plakken vanuit sommige editors verwijdert lege regels, en LinkedIn haalt bepaalde opmaak weg. De voorbeeldweergave hierboven laat zien hoe je witruimte er echt uitziet, zodat er niet per ongeluk een muur van tekst doorheen glipt." },
      ],
      ja: [
        { q: "LinkedInの投稿の文字数制限は？", a: "LinkedInのテキスト投稿、または画像・動画投稿のキャプションは3000文字までです。上のカウンターがすべての文字を数えるので、残りのスペースが常にわかります。" },
        { q: "LinkedInは「もっと見る」でどこで投稿を切りますか？", a: "フィードはデスクトップで約210文字、モバイルで約140文字を超えると投稿を折りたたみます。それ以降は「もっと見る」の後ろに隠れるので、フックは最初の1〜2行、どちらの折り返しよりも前に置きましょう。" },
        { q: "ハッシュタグや@メンションは制限に含まれますか？", a: "はい、どちらも3000文字に含まれ、本文に表示されます。メンションはタグ付けした相手にも通知が届くので、文字数稼ぎではなく意図的に使いましょう。" },
        { q: "なぜLinkedInで改行が消えるのですか？", a: "一部のエディターから貼り付けると空行が詰められ、LinkedInは一部の書式を取り除きます。上のプレビューは実際の行間の見え方を示すので、うっかり文字の壁になるのを防げます。" },
      ],
      zh: [
        { q: "LinkedIn 帖子的字符上限是多少？", a: "LinkedIn 文字帖子（或图片、视频帖子的说明文字）上限为 3000 字符。上方计数器会统计每个字符，让你随时清楚还剩多少空间。" },
        { q: "LinkedIn 会在哪里用“查看更多”截断我的帖子？", a: "信息流在桌面端约 210 字符、移动端约 140 字符后折叠你的帖子，之后的内容都藏在“查看更多”后面。因此把钩子放在前一两行，确保在两个折叠点之前出现。" },
        { q: "话题标签和 @提及会计入上限吗？", a: "会，两者都计入 3000 字符并显示在正文中。提及还会通知被标记的人，所以要有目的地使用，而不是用来凑字数。" },
        { q: "为什么我的换行在 LinkedIn 上消失了？", a: "从某些编辑器粘贴会压缩空行，LinkedIn 也会去除部分格式。上方的预览会显示你的间距实际呈现的样子，避免不小心出现一堵文字墙。" },
      ],
      da: [
        { q: "Hvad er LinkedIns tegngrænse for opslag?", a: "Et LinkedIn-tekstopslag — eller billedteksten på et billed- eller videoopslag — er begrænset til 3000 tegn. Tælleren ovenfor tæller hvert tegn, så du altid ved, hvor meget plads der er tilbage." },
        { q: "Hvor skærer LinkedIn mit opslag af med „se mere“?", a: "Feedet folder dit opslag sammen efter cirka 210 tegn på computer og cirka 140 på mobil. Alt derefter gemmes bag „se mere“, så placer din hook i første eller anden linje, før begge fold." },
        { q: "Tæller hashtags og @-omtaler med i grænsen?", a: "Ja, begge tæller med i de 3000 tegn og vises i teksten. Omtaler giver også besked til den taggede person, så brug dem bevidst og ikke som en måde at fylde op på." },
        { q: "Hvorfor forsvinder mine linjeskift på LinkedIn?", a: "At indsætte fra nogle editorer fjerner tomme linjer, og LinkedIn fjerner visse formateringer. Forhåndsvisningen ovenfor viser, hvordan din linjeafstand faktisk ser ud, så en mur af tekst ikke smutter med ved et uheld." },
      ],
    },

    content: {
      en: `<h2>LinkedIn's 3000-character post limit</h2>
<p>LinkedIn allows up to <strong>3000 characters</strong> per post — significantly more room than Twitter but with its own hidden constraints that trip up even experienced creators. The hard limit is generous enough for a detailed case study, a numbered list, or a short opinion piece, but the real writing challenge isn't the ceiling: it's the two fold points that determine whether anyone reads past the first sentence.</p>
<p>PostTruncate's <strong>LinkedIn character counter</strong> tracks your total in real time, colour-coding the display so you always know how much runway remains before LinkedIn stops accepting input.</p>

<h2>The desktop fold (~210 chars) and the mobile fold (~140 chars)</h2>
<p>This is the detail that separates LinkedIn veterans from everyone else. LinkedIn doesn't have one fold — it has two, and they sit at very different character counts depending on the device your audience is using.</p>
<p>On <strong>desktop</strong>, LinkedIn shows roughly <strong>210 characters</strong> of a post before replacing the rest with a "…see more" link. On <strong>mobile</strong>, that window shrinks to approximately <strong>140 characters</strong> — barely a sentence and a half. The user taps "see more" only if what they've already read compels them to.</p>
<p>Why does the difference matter? Because <strong>the majority of LinkedIn's active users browse on mobile</strong>. A post that hooks brilliantly at character 180 will perform well for desktop readers and fail completely for the mobile audience — which is most of your reach. Writing for both folds means your opening line has to carry the full weight of the post's value proposition within the first 140 characters, while the next 70 characters (before the desktop fold) can add a second layer of context.</p>
<p>PostTruncate renders <strong>both fold markers live as you type</strong>, so you can see in real time exactly which words fall inside the mobile window, which are visible only on desktop, and what disappears behind "see more" on both devices. Adjust your opening until the hook works at 140 characters without relying on the desktop margin.</p>

<h2>Front-loading: the only LinkedIn copywriting rule that consistently drives reach</h2>
<p>The LinkedIn algorithm uses dwell time and early engagement (likes and comments in the first hour) as primary ranking signals. Both depend on whether the opening line stops the scroll. <strong>Front-loading</strong> means putting your most specific, most surprising, or most useful statement first — not as a preamble, not after context-setting, but as the literal first sentence.</p>
<p>Weak openings ("I want to share something I've been thinking about…") burn your 140-character mobile window on throat-clearing. Strong openings ("We cut our onboarding drop-off by 40% by removing one field from the sign-up form") use every character to earn the next tap.</p>
<p>Use PostTruncate to draft your post, watch the mobile fold marker, rewrite the opening until it delivers a complete, compelling reason to read more — then publish with confidence.</p>`,

      es: `<h2>El límite de 3000 caracteres de LinkedIn</h2>
<p>LinkedIn permite hasta <strong>3000 caracteres</strong> por publicación, bastante más que Twitter, pero con sus propias restricciones ocultas que confunden incluso a los creadores más experimentados. El límite es suficientemente generoso para un caso de estudio detallado, una lista numerada o un artículo de opinión breve. Sin embargo, el verdadero reto no es el techo: son los dos puntos de corte que determinan si alguien lee más allá de la primera frase.</p>
<p>El <strong>contador de caracteres para LinkedIn</strong> de PostTruncate actualiza el total en tiempo real con código de colores, para que siempre sepas cuánto margen te queda antes de que LinkedIn deje de aceptar texto.</p>

<h2>El corte de escritorio (~210 caracteres) y el corte móvil (~140 caracteres)</h2>
<p>Este es el detalle que separa a los veteranos de LinkedIn del resto. LinkedIn no tiene un solo corte, tiene dos, y se sitúan en recuentos de caracteres muy distintos según el dispositivo que use tu audiencia.</p>
<p>En <strong>escritorio</strong>, LinkedIn muestra aproximadamente <strong>210 caracteres</strong> de una publicación antes de sustituir el resto con un enlace "…ver más". En <strong>móvil</strong>, esa ventana se reduce a unos <strong>140 caracteres</strong>, apenas una frase y media. El usuario toca "ver más" solo si lo que ya ha leído le resulta lo suficientemente interesante.</p>
<p>¿Por qué importa esta diferencia? Porque <strong>la mayoría de los usuarios activos de LinkedIn navegan en móvil</strong>. Una publicación que engancha brillantemente en el carácter 180 funcionará bien para los lectores de escritorio y fallará por completo para la audiencia móvil, que representa la mayor parte de tu alcance. Escribir para ambos cortes significa que tu primera línea tiene que transmitir el valor esencial de la publicación dentro de los primeros 140 caracteres, mientras que los siguientes 70 (antes del corte de escritorio) pueden añadir una segunda capa de contexto.</p>
<p>PostTruncate muestra <strong>los dos marcadores de corte en tiempo real mientras escribes</strong>, para que veas exactamente qué palabras caen dentro de la ventana móvil, cuáles solo son visibles en escritorio y qué desaparece tras "ver más" en ambos dispositivos.</p>

<h2>El front-loading: la única regla de copywriting en LinkedIn que mejora el alcance</h2>
<p>El algoritmo de LinkedIn usa el tiempo de permanencia y el engagement temprano (me gustas y comentarios en la primera hora) como señales de clasificación principales. Ambas dependen de si la primera línea detiene el desplazamiento. El <strong>front-loading</strong> significa poner primero el dato más específico, más sorprendente o más útil, no como preámbulo, no después de establecer el contexto, sino como la primera frase literal.</p>
<p>Las aperturas débiles ("Quiero compartir algo en lo que he estado pensando…") queman tu ventana móvil de 140 caracteres en aclaraciones innecesarias. Las aperturas fuertes ("Redujimos el abandono en el onboarding un 40% eliminando un solo campo del formulario de registro") usan cada carácter para ganar el siguiente toque.</p>`,

      de: `<h2>LinkedIn's 3000-Zeichen-Limit</h2>
<p>LinkedIn erlaubt bis zu <strong>3000 Zeichen</strong> pro Beitrag — deutlich mehr als Twitter, aber mit eigenen versteckten Tücken, die selbst erfahrene Creator überraschen. Das Limit ist großzügig genug für eine detaillierte Fallstudie, eine nummerierte Liste oder einen kurzen Meinungsbeitrag. Die eigentliche Herausforderung ist jedoch nicht die Obergrenze, sondern die zwei Folds, die darüber entscheiden, ob jemand überhaupt über den ersten Satz hinausliest.</p>
<p>PostTruncates <strong>LinkedIn-Zeichenzähler</strong> verfolgt dein Gesamtvolumen in Echtzeit mit farblicher Anzeige, sodass du jederzeit weißt, wie viel Spielraum noch bleibt, bevor LinkedIn keine Eingaben mehr akzeptiert.</p>

<h2>Der Desktop-Fold (~210 Zeichen) und der Mobile-Fold (~140 Zeichen)</h2>
<p>Das ist das Detail, das LinkedIn-Profis von allen anderen unterscheidet. LinkedIn hat nicht einen Fold — es gibt zwei, und sie liegen bei sehr unterschiedlichen Zeichenzahlen, je nachdem welches Gerät dein Publikum nutzt.</p>
<p>Auf dem <strong>Desktop</strong> zeigt LinkedIn ungefähr <strong>210 Zeichen</strong> eines Beitrags an, bevor der Rest hinter einem „…mehr anzeigen"-Link verschwindet. Auf dem <strong>Smartphone</strong> schrumpft dieses Fenster auf rund <strong>140 Zeichen</strong> — kaum eineinhalb Sätze. Nutzerinnen und Nutzer tippen nur dann auf „mehr anzeigen", wenn das Bisherige sie überzeugt hat.</p>
<p>Warum ist der Unterschied so wichtig? Weil <strong>die Mehrheit der aktiven LinkedIn-Nutzer auf dem Smartphone unterwegs ist</strong>. Ein Beitrag, der erst bei Zeichen 180 wirklich fesselt, funktioniert gut für Desktop-Leser und scheitert vollständig beim mobilen Publikum — das den größten Teil deiner Reichweite ausmacht. Für beide Folds zu schreiben bedeutet, dass deine Eröffnungszeile den vollen Wert des Beitrags innerhalb der ersten 140 Zeichen transportieren muss, während die nächsten 70 Zeichen (vor dem Desktop-Fold) eine zweite Kontextebene ergänzen können.</p>
<p>PostTruncate zeigt <strong>beide Fold-Markierungen live während des Tippens</strong>, sodass du in Echtzeit siehst, welche Wörter ins mobile Fenster fallen, welche nur auf dem Desktop sichtbar sind und was auf beiden Geräten hinter „mehr anzeigen" verschwindet.</p>

<h2>Front-loading: die einzige LinkedIn-Copywriting-Regel, die Reichweite zuverlässig steigert</h2>
<p>Der LinkedIn-Algorithmus nutzt Verweildauer und frühes Engagement (Likes und Kommentare in der ersten Stunde) als primäre Rankingsignale. Beides hängt davon ab, ob die Eröffnungszeile das Scrollen stoppt. <strong>Front-loading</strong> bedeutet, die spezifischste, überraschendste oder nützlichste Aussage an den Anfang zu stellen — nicht als Einleitung, nicht nach dem Kontextaufbau, sondern als wortwörtlich ersten Satz.</p>
<p>Schwache Einstiege („Ich möchte etwas teilen, worüber ich nachgedacht habe…") verbrennen dein 140-Zeichen-Mobilfenster mit nichtsagendem Vorgeplänkel. Starke Einstiege („Wir haben unsere Onboarding-Abbruchrate um 40 % gesenkt, indem wir ein einziges Feld aus dem Anmeldeformular entfernt haben") nutzen jedes Zeichen, um den nächsten Tipp zu verdienen.</p>`,

      fr: `<h2>La limite de 3000 caractères de LinkedIn</h2>
<p>LinkedIn autorise jusqu'à <strong>3000 caractères</strong> par publication — bien plus que Twitter, mais avec ses propres contraintes cachées qui piègent même les créateurs expérimentés. La limite est assez généreuse pour une étude de cas détaillée, une liste numérotée ou un court article d'opinion. Mais le vrai défi n'est pas le plafond : ce sont les deux plis qui déterminent si quelqu'un lit au-delà de la première phrase.</p>
<p>Le <strong>compteur de caractères LinkedIn</strong> de PostTruncate suit votre total en temps réel avec un code couleur, pour que vous sachiez toujours quelle marge il vous reste avant que LinkedIn ne cesse d'accepter du texte.</p>

<h2>Le pli bureau (~210 caractères) et le pli mobile (~140 caractères)</h2>
<p>C'est le détail qui distingue les vétérans de LinkedIn des autres. LinkedIn n'a pas un seul pli — il en a deux, et ils se situent à des nombres de caractères très différents selon l'appareil utilisé par votre audience.</p>
<p>Sur <strong>ordinateur</strong>, LinkedIn affiche environ <strong>210 caractères</strong> d'une publication avant de remplacer le reste par un lien « …voir plus ». Sur <strong>mobile</strong>, cette fenêtre se réduit à environ <strong>140 caractères</strong> — à peine une phrase et demie. L'utilisateur appuie sur « voir plus » uniquement si ce qu'il a déjà lu l'y incite.</p>
<p>Pourquoi cette différence est-elle importante ? Parce que <strong>la majorité des utilisateurs actifs de LinkedIn naviguent sur mobile</strong>. Une publication qui accroche brillamment au caractère 180 fonctionnera bien pour les lecteurs sur ordinateur et échouera complètement pour l'audience mobile — qui représente l'essentiel de votre portée. Écrire pour les deux plis signifie que votre première ligne doit porter toute la valeur de la publication dans les 140 premiers caractères, tandis que les 70 suivants (avant le pli bureau) peuvent ajouter une deuxième couche de contexte.</p>
<p>PostTruncate affiche <strong>les deux marqueurs de pli en direct pendant que vous tapez</strong>, pour que vous voyiez en temps réel quels mots tombent dans la fenêtre mobile, lesquels ne sont visibles que sur ordinateur, et ce qui disparaît derrière « voir plus » sur les deux appareils.</p>

<h2>Le front-loading : la seule règle de copywriting LinkedIn qui génère systématiquement de la portée</h2>
<p>L'algorithme de LinkedIn utilise le temps de lecture et l'engagement précoce (mentions J'aime et commentaires dans la première heure) comme signaux de classement principaux. Les deux dépendent du fait que la première ligne arrête le défilement. Le <strong>front-loading</strong> consiste à mettre en premier votre affirmation la plus précise, la plus surprenante ou la plus utile — pas en préambule, pas après avoir posé le contexte, mais comme première phrase littérale.</p>
<p>Les introductions faibles (« Je veux partager quelque chose à quoi je pensais… ») brûlent votre fenêtre mobile de 140 caractères en préliminaires inutiles. Les introductions fortes (« Nous avons réduit notre taux d'abandon à l'onboarding de 40 % en supprimant un seul champ du formulaire d'inscription ») utilisent chaque caractère pour mériter le prochain appui.</p>`,

      pt: `<h2>O limite de 3000 caracteres do LinkedIn</h2>
<p>O LinkedIn permite até <strong>3000 caracteres</strong> por publicação — bem mais do que o Twitter, mas com suas próprias restrições ocultas que surpreendem até criadores experientes. O limite é generoso o suficiente para um estudo de caso detalhado, uma lista numerada ou um artigo de opinião breve. Porém, o verdadeiro desafio não é o teto: são os dois pontos de corte que determinam se alguém lê além da primeira frase.</p>
<p>O <strong>contador de caracteres do LinkedIn</strong> do PostTruncate acompanha o total em tempo real com código de cores, para que você saiba sempre quanto espaço resta antes de o LinkedIn parar de aceitar texto.</p>

<h2>O corte do desktop (~210 caracteres) e o corte do mobile (~140 caracteres)</h2>
<p>Esse é o detalhe que separa os veteranos do LinkedIn de todo o resto. O LinkedIn não tem um único ponto de corte — tem dois, e eles ficam em contagens de caracteres muito diferentes dependendo do dispositivo que sua audiência usa.</p>
<p>No <strong>desktop</strong>, o LinkedIn exibe aproximadamente <strong>210 caracteres</strong> de uma publicação antes de substituir o restante por um link "…ver mais". No <strong>mobile</strong>, essa janela encolhe para cerca de <strong>140 caracteres</strong> — pouco mais de uma frase. O usuário toca em "ver mais" apenas se o que já leu o convencer a continuar.</p>
<p>Por que essa diferença importa? Porque <strong>a maioria dos usuários ativos do LinkedIn navega pelo mobile</strong>. Uma publicação que prende a atenção de forma brilhante no caractere 180 vai funcionar bem para leitores no desktop e falhar completamente para a audiência mobile — que representa a maior parte do seu alcance. Escrever para os dois cortes significa que sua primeira linha precisa carregar todo o valor da publicação dentro dos primeiros 140 caracteres, enquanto os próximos 70 (antes do corte do desktop) podem acrescentar uma segunda camada de contexto.</p>
<p>O PostTruncate exibe <strong>ambos os marcadores de corte em tempo real enquanto você digita</strong>, para que você veja exatamente quais palavras ficam dentro da janela mobile, quais são visíveis apenas no desktop e o que desaparece atrás de "ver mais" nos dois dispositivos.</p>

<h2>Front-loading: a única regra de copywriting do LinkedIn que aumenta o alcance de forma consistente</h2>
<p>O algoritmo do LinkedIn usa tempo de permanência e engajamento precoce (curtidas e comentários na primeira hora) como sinais primários de classificação. Ambos dependem de a primeira linha parar a rolagem. O <strong>front-loading</strong> significa colocar primeiro a afirmação mais específica, mais surpreendente ou mais útil — não como preâmbulo, não depois de estabelecer contexto, mas como a literalmente primeira frase.</p>
<p>Aberturas fracas ("Quero compartilhar algo sobre o que estive pensando…") desperdiçam sua janela mobile de 140 caracteres em introduções desnecessárias. Aberturas fortes ("Reduzimos o abandono no onboarding em 40% removendo um único campo do formulário de cadastro") usam cada caractere para ganhar o próximo toque.</p>`,

      it: `<h2>Il limite di 3000 caratteri di LinkedIn</h2>
<p>LinkedIn consente fino a <strong>3000 caratteri</strong> per post — significativamente di più di Twitter, ma con i propri vincoli nascosti che sorprendono anche i creator più esperti. Il limite è abbastanza generoso per un caso studio dettagliato, un elenco numerato o un breve articolo di opinione. Tuttavia, la vera sfida non è il tetto: sono i due punti di taglio che determinano se qualcuno legge oltre la prima frase.</p>
<p>Il <strong>contatore di caratteri per LinkedIn</strong> di PostTruncate tiene traccia del totale in tempo reale con un codice colore, così sai sempre quanto margine ti rimane prima che LinkedIn smetta di accettare testo.</p>

<h2>La soglia desktop (~210 caratteri) e la soglia mobile (~140 caratteri)</h2>
<p>Questo è il dettaglio che distingue i veterani di LinkedIn da tutti gli altri. LinkedIn non ha una sola soglia — ne ha due, e si trovano a conteggi di caratteri molto diversi a seconda del dispositivo usato dal tuo pubblico.</p>
<p>Su <strong>desktop</strong>, LinkedIn mostra circa <strong>210 caratteri</strong> di un post prima di sostituire il resto con un link "…vedi altro". Su <strong>mobile</strong>, quella finestra si riduce a circa <strong>140 caratteri</strong> — appena una frase e mezza. L'utente tocca "vedi altro" solo se quello che ha già letto lo convince a continuare.</p>
<p>Perché questa differenza conta così tanto? Perché <strong>la maggior parte degli utenti attivi di LinkedIn naviga da mobile</strong>. Un post che aggancia brillantemente al carattere 180 funzionerà bene per i lettori su desktop e fallirà completamente per il pubblico mobile — che rappresenta la maggior parte della tua portata. Scrivere per entrambe le soglie significa che la tua prima riga deve portare l'intero valore del post nei primi 140 caratteri, mentre i successivi 70 (prima della soglia desktop) possono aggiungere un secondo livello di contesto.</p>
<p>PostTruncate mostra <strong>entrambi i marcatori di soglia in diretta mentre scrivi</strong>, così puoi vedere in tempo reale quali parole rientrano nella finestra mobile, quali sono visibili solo su desktop e cosa scompare dietro "vedi altro" su entrambi i dispositivi.</p>

<h2>Il front-loading: l'unica regola del copywriting su LinkedIn che aumenta costantemente la portata</h2>
<p>L'algoritmo di LinkedIn utilizza il tempo di permanenza e il coinvolgimento precoce (like e commenti nella prima ora) come segnali di classificazione primari. Entrambi dipendono dal fatto che la prima riga fermi lo scorrimento. Il <strong>front-loading</strong> significa mettere per prima l'affermazione più specifica, più sorprendente o più utile — non come preambolo, non dopo aver stabilito il contesto, ma come prima frase letterale.</p>
<p>Le aperture deboli ("Voglio condividere qualcosa a cui stavo pensando…") bruciano la tua finestra mobile di 140 caratteri in preamboli inutili. Le aperture forti ("Abbiamo ridotto il tasso di abbandono nell'onboarding del 40% eliminando un solo campo dal modulo di iscrizione") usano ogni carattere per guadagnare il tocco successivo.</p>`,

      nl: `<h2>LinkedIn's 3000-tekenlimiet</h2>
<p>LinkedIn staat tot <strong>3000 tekens</strong> per bericht toe — aanzienlijk meer dan Twitter, maar met eigen verborgen valkuilen die zelfs ervaren creators verrassen. De limiet is ruim genoeg voor een gedetailleerde casestudy, een genummerde lijst of een kort opiniestuk. De echte uitdaging is echter niet het plafond: dat zijn de twee vouwpunten die bepalen of iemand überhaupt verder leest dan de eerste zin.</p>
<p>PostTruncates <strong>LinkedIn-tekenteller</strong> houdt je totaal bij in real time met een kleurcodering, zodat je altijd weet hoeveel marge nog over is voordat LinkedIn geen invoer meer accepteert.</p>

<h2>De desktopvouw (~210 tekens) en de mobiele vouw (~140 tekens)</h2>
<p>Dit is het detail dat LinkedIn-veteranen van iedereen anders onderscheidt. LinkedIn heeft niet één vouw — het heeft er twee, en ze liggen op sterk verschillende tekenaantallen afhankelijk van het apparaat dat jouw publiek gebruikt.</p>
<p>Op <strong>desktop</strong> toont LinkedIn ruwweg <strong>210 tekens</strong> van een bericht voordat de rest achter een "…meer weergeven"-link verdwijnt. Op <strong>mobiel</strong> krimpt dat venster tot ongeveer <strong>140 tekens</strong> — amper anderhalve zin. De gebruiker tikt alleen op "meer weergeven" als wat hij al gelezen heeft hem daartoe overtuigt.</p>
<p>Waarom maakt het verschil uit? Omdat <strong>de meerderheid van de actieve LinkedIn-gebruikers op mobiel browst</strong>. Een bericht dat briljant hapt bij teken 180, presteert goed voor desktoplezers en faalt volledig voor het mobiele publiek — dat het grootste deel van je bereik uitmaakt. Schrijven voor beide vouwen betekent dat je openingszin de volledige waarde van het bericht moet overbrengen in de eerste 140 tekens, terwijl de volgende 70 (voor de desktopvouw) een tweede laag context kunnen toevoegen.</p>
<p>PostTruncate toont <strong>beide vouwmarkeringen live terwijl je typt</strong>, zodat je in real time ziet welke woorden in het mobiele venster vallen, welke alleen op desktop zichtbaar zijn en wat op beide apparaten achter "meer weergeven" verdwijnt.</p>

<h2>Front-loading: de enige LinkedIn-copywritingregel die bereik consistent verhoogt</h2>
<p>Het LinkedIn-algoritme gebruikt verblijftijd en vroeg engagement (likes en reacties in het eerste uur) als primaire rankingsignalen. Beide hangen af van of de openingszin het scrollen stopt. <strong>Front-loading</strong> betekent je meest specifieke, meest verrassende of meest nuttige uitspraak als eerste plaatsen — niet als inleiding, niet na het stellen van de context, maar als de letterlijk eerste zin.</p>
<p>Zwakke openingen ("Ik wil iets delen waar ik over nagedacht heb…") verbranden je mobiele venster van 140 tekens aan nutteloze aanloop. Sterke openingen ("We verlaagden ons onboarding-afhakepercentage met 40% door één veld uit het aanmeldformulier te halen") gebruiken elk teken om de volgende tik te verdienen.</p>`,

      ja: `<h2>LinkedInの3000文字投稿制限</h2>
<p>LinkedInでは1投稿あたり最大<strong>3000文字</strong>まで入力できます。Twitterよりはるかに多いスペースですが、熟練したクリエイターでも見落としがちな隠れた制約があります。詳細なケーススタディ、番号付きリスト、短い意見記事を書くには十分な制限です。ただし、本当の課題は上限ではありません——誰かが最初の一文を超えて読み続けるかどうかを左右する、2つの折り返し点が問題です。</p>
<p>PostTruncateの<strong>LinkedIn文字数カウンター</strong>は入力中にリアルタイムで文字数をカラーコードで表示し、LinkedInが入力を受け付けなくなるまでの余裕を常に把握できます。</p>

<h2>デスクトップ折り返し（約210文字）とモバイル折り返し（約140文字）</h2>
<p>これがLinkedInのベテランと一般ユーザーを分ける知識です。LinkedInの折り返し点は1つではありません——2つあり、読者が使っているデバイスによってまったく異なる文字数に設定されています。</p>
<p><strong>デスクトップ</strong>では、LinkedInは投稿の約<strong>210文字</strong>を表示し、残りを「…続きを読む」リンクの後ろに隠します。<strong>モバイル</strong>では、そのウィンドウは約<strong>140文字</strong>にまで縮小されます——わずか1文半ほどです。ユーザーが「続きを読む」をタップするのは、すでに読んだ内容が続きを読む価値があると感じさせる場合だけです。</p>
<p>なぜこの違いが重要なのか？<strong>LinkedInのアクティブユーザーの大多数はモバイルで閲覧しているから</strong>です。180文字目で完璧なフックを使っている投稿は、デスクトップ読者には効果的でも、モバイル読者には全く届きません。モバイル読者こそがリーチの大部分を占めます。両方の折り返し点に対応した文章を書くには、最初の140文字以内に投稿の価値を凝縮し、次の70文字（デスクトップ折り返しまで）で第2の文脈層を追加するという構造が必要です。</p>
<p>PostTruncateは入力中に<strong>両方の折り返しマーカーをリアルタイムで表示</strong>します。どの言葉がモバイルウィンドウに収まり、どれがデスクトップのみで見え、どれが両デバイスで「続きを読む」の後ろに消えるかが一目でわかります。</p>

<h2>フロントローディング：LinkedInでリーチを安定して高める唯一のコピーライティング法則</h2>
<p>LinkedInのアルゴリズムは、滞在時間と初期エンゲージメント（最初の1時間内のいいねとコメント）を主要なランキングシグナルとして使います。どちらも最初の一文がスクロールを止めるかどうかにかかっています。<strong>フロントローディング</strong>とは、最も具体的、最も驚き、最も有用な主張を最初に置くことです——前置きとしてではなく、文脈を整えてからでもなく、文字通りの第一文として。</p>
<p>弱い出だし（「ずっと考えてきたことを共有したいと思います…」）は、モバイルの140文字ウィンドウを無意味な前置きで消費します。強い出だし（「登録フォームからフィールドを1つ削除するだけで、オンボーディング離脱率が40%下がりました」）はすべての文字を使って次のタップを勝ち取ります。</p>`,

      zh: `<h2>LinkedIn的3000字符帖子上限</h2>
<p>LinkedIn每篇帖子最多允许<strong>3000个字符</strong>——比推特多得多，但也有自己隐藏的限制，就连经验丰富的创作者也会被绊倒。这个上限对于详细的案例分析、编号列表或短篇观点文章来说已经足够宽裕。但真正的挑战不在于字数上限，而在于两个折叠点——它们决定了读者是否愿意读完第一句话之后的内容。</p>
<p>PostTruncate的<strong>LinkedIn字符计数器</strong>实时追踪你的字符总数，并用颜色编码显示，让你随时了解在LinkedIn停止接受输入之前还剩多少空间。</p>

<h2>桌面端折叠点（约210字符）与移动端折叠点（约140字符）</h2>
<p>这是区分LinkedIn老手与普通用户的关键细节。LinkedIn不只有一个折叠点——它有两个，而且根据读者使用的设备不同，折叠位置的字符数也大相径庭。</p>
<p>在<strong>桌面端</strong>，LinkedIn大约展示<strong>210个字符</strong>，之后用"…查看更多"链接替代其余内容。在<strong>移动端</strong>，这个窗口缩减至约<strong>140个字符</strong>——勉强一句半话。用户只有在已经读到的内容足够吸引人时，才会点击"查看更多"。</p>
<p>为什么这个差异如此重要？因为<strong>LinkedIn活跃用户中大多数在移动设备上浏览</strong>。一篇在第180个字符才出现精彩钩子的帖子，对桌面用户或许有效，但对移动端受众则完全失效——而移动端受众才是你触达范围的主体。为两个折叠点写作，意味着你的第一句话必须在前140个字符内传达帖子的全部价值，而接下来的70个字符（到桌面折叠点之间）则可以补充第二层背景信息。</p>
<p>PostTruncate在你输入时<strong>实时显示两个折叠点标记</strong>，让你清楚看到哪些文字落在移动端窗口内，哪些只在桌面端可见，以及哪些内容在两种设备上都隐藏在"查看更多"后面。</p>

<h2>前置重点：唯一能持续提升LinkedIn触达的文案写作法则</h2>
<p>LinkedIn的算法以停留时间和早期互动（第一个小时内的点赞和评论）作为主要排名信号。两者都取决于第一句话是否能让人停止滑动。<strong>前置重点</strong>意味着把最具体、最出乎意料或最有用的观点放在最前面——不是作为铺垫，不是在交代背景之后，而是作为字面上的第一句话。</p>
<p>薄弱的开头（"我想分享一些我一直在思考的事情……"）会把140字符的移动端窗口浪费在无意义的铺垫上。有力的开头（"我们仅从注册表单中删除了一个字段，就将新用户引导流程的流失率降低了40%"）则让每一个字符都在为下一次点击赢得机会。</p>`,

      da: `<h2>LinkedIns 3000-tegn-grænse</h2>
<p>LinkedIn tillader op til <strong>3000 tegn</strong> per opslag — væsentligt mere end Twitter, men med sine egne skjulte fælder der overrasker selv erfarne skabere. Grænsen er generøs nok til en detaljeret case study, en nummereret liste eller et kort meningsindlæg. Men den egentlige udfordring er ikke loftet: det er de to foldepunkter, der afgør, om nogen overhovedet læser forbi den første sætning.</p>
<p>PostTruncates <strong>LinkedIn-tegntæller</strong> sporer dit total i realtid med farvekodning, så du altid ved, hvor meget plads der er tilbage, inden LinkedIn holder op med at acceptere input.</p>

<h2>Desktop-folden (~210 tegn) og mobil-folden (~140 tegn)</h2>
<p>Det er den detalje, der adskiller LinkedIn-veteraner fra alle andre. LinkedIn har ikke én fold — den har to, og de ligger ved meget forskellige tegnantal afhængigt af, hvilken enhed dit publikum bruger.</p>
<p>På <strong>desktop</strong> viser LinkedIn roughly <strong>210 tegn</strong> af et opslag, før resten gemmes bag et "…se mere"-link. På <strong>mobil</strong> krymper det vindue til cirka <strong>140 tegn</strong> — knap halvanden sætning. Brugeren trykker på "se mere" kun hvis det, vedkommende allerede har læst, overtaler dem til det.</p>
<p>Hvorfor betyder forskellen noget? Fordi <strong>størstedelen af LinkedIns aktive brugere browser på mobil</strong>. Et opslag der hager briljant ved tegn 180, klarer sig godt for desktoplæsere og fejler fuldstændigt for det mobile publikum — der udgør det meste af din rækkevidde. At skrive til begge fold betyder, at din åbningslinje skal bære hele opslagets værdi inden for de første 140 tegn, mens de næste 70 (før desktop-folden) kan tilføje et andet lag kontekst.</p>
<p>PostTruncate viser <strong>begge fold-markeringer live, mens du skriver</strong>, så du i realtid kan se præcis, hvilke ord falder inden for mobilvinduet, hvilke kun er synlige på desktop, og hvad der forsvinder bag "se mere" på begge enheder.</p>

<h2>Front-loading: den eneste LinkedIn-tekstforfattningsregel der konsekvent øger rækkevidden</h2>
<p>LinkedIns algoritme bruger opholdstid og tidligt engagement (likes og kommentarer i den første time) som primære rankingssignaler. Begge afhænger af, om åbningslinjen stopper scrollingen. <strong>Front-loading</strong> betyder at sætte din mest specifikke, mest overraskende eller mest nyttige påstand først — ikke som præambel, ikke efter kontekstopsætning, men som den bogstavelige første sætning.</p>
<p>Svage åbninger ("Jeg vil dele noget, jeg har tænkt over…") brænder dit mobile 140-tegn-vindue af på meningsløs optakt. Stærke åbninger ("Vi sænkede vores onboarding-frafaldsprocent med 40 % ved at fjerne ét felt fra tilmeldingsformularen") bruger hvert tegn til at fortjene det næste tryk.</p>`,
    },
  },
  {
    id: 'facebook',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-01',
    platformLimits:
      '63,206 character technical limit, feed truncates at ~480 characters with a See More link, posts under 80 characters consistently get highest engagement',

    slugs: {
      en: 'facebook-character-counter',
      es: 'contador-caracteres-facebook',
      de: 'facebook-zeichenzaehler',
      fr: 'compteur-caracteres-facebook',
      pt: 'contador-caracteres-facebook',
      it: 'contatore-caratteri-facebook',
      nl: 'facebook-tekenteller',
      ja: 'facebook-moji-kaunta',
      zh: 'facebook-zi-fu-ji-shu',
      da: 'facebook-tegntaeller',
    },

    schemaName: {
      en: 'Facebook Character Counter',
      es: 'Contador de Caracteres para Facebook',
      de: 'Facebook Zeichenzähler',
      fr: 'Compteur de Caractères Facebook',
      pt: 'Contador de Caracteres do Facebook',
      it: 'Contatore di Caratteri per Facebook',
      nl: 'Facebook Tekenteller',
      ja: 'Facebook 文字数カウンター',
      zh: 'Facebook 字符计数器',
      da: 'Facebook Tegntæller',
    },

    titles: {
      en: 'Facebook Character Counter — Free Post & Caption Length Checker',
      es: 'Contador de Caracteres Facebook — Comprueba longitud de posts gratis',
      de: 'Facebook Zeichenzähler — Beitrags- und Caption-Länge kostenlos prüfen',
      fr: 'Compteur de Caractères Facebook — Longueur des publications gratuitement',
      pt: 'Contador de Caracteres Facebook — Verifique o comprimento dos posts grátis',
      it: 'Contatore Caratteri Facebook — Lunghezza di post e didascalie gratis',
      nl: 'Facebook Tekenteller — Gratis bericht- en bijschriftlengte checken',
      ja: 'Facebook文字数カウンター — 投稿とキャプションの長さを無料チェック',
      zh: 'Facebook字符计数器 — 免费检查帖子与说明文字长度',
      da: 'Facebook Tegntæller — Tjek indlægs- og billedtekstlængde gratis',
    },

    metaDescriptions: {
      en: 'Free Facebook character counter. Preview the ~480-char feed fold, see why posts under 80 chars get more reach, and catch Unicode fonts that break accessibility.',
      es: 'Contador de caracteres para Facebook gratis. Previsualiza el corte de ~480 caracteres, descubre por qué los posts de menos de 80 caracteres tienen más alcance y detecta fuentes Unicode problemáticas.',
      de: 'Kostenloser Facebook-Zeichenzähler. Sieh den ~480-Zeichen-Fold in der Vorschau, erfahre warum Beiträge unter 80 Zeichen mehr Reichweite haben und erkenne problematische Unicode-Schriften.',
      fr: 'Compteur de caractères Facebook gratuit. Prévisualisez le pli à ~480 caractères, comprenez pourquoi les publications sous 80 caractères ont plus de portée et repérez les polices Unicode problématiques.',
      pt: 'Contador de caracteres do Facebook gratuito. Visualize o corte de ~480 caracteres, veja por que posts com menos de 80 caracteres têm mais alcance e detecte fontes Unicode problemáticas.',
      it: 'Contatore di caratteri Facebook gratuito. Visualizza in anteprima il taglio a ~480 caratteri, scopri perché i post sotto gli 80 caratteri hanno più portata e individua i font Unicode problematici.',
      nl: 'Gratis Facebook tekenteller. Bekijk de ~480-tekenvouw, zie waarom berichten onder 80 tekens meer bereik krijgen en herken Unicode-lettertypen die de toegankelijkheid breken.',
      ja: '無料のFacebook文字数カウンター。約480文字のフィード折り返しをプレビューし、80文字未満の投稿がリーチを伸ばす理由を把握し、アクセシビリティを壊すUnicodeフォントを検出。',
      zh: '免费Facebook字符计数器。预览约480字符的信息流折叠点，了解80字符以内的帖子为何触达更高，并检测破坏无障碍访问的Unicode字体。',
      da: 'Gratis Facebook tegntæller. Forhåndsvis ~480-tegns-folden, se hvorfor opslag under 80 tegn får mere rækkevidde, og fang Unicode-skrifttyper, der ødelægger tilgængeligheden.',
    },

    intro: {
      en: "Check your Facebook post before you publish — the editor below shows where the ~480-character feed fold cuts your text and flags fancy Unicode fonts that break accessibility.",
      es: "Revisa tu publicación de Facebook antes de publicar: el editor de abajo muestra dónde corta el texto el pliegue del feed a los ~480 caracteres y señala las fuentes Unicode decorativas que rompen la accesibilidad.",
      de: "Prüfe deinen Facebook-Beitrag vor dem Veröffentlichen — der Editor unten zeigt, wo der Feed-Umbruch bei ~480 Zeichen deinen Text abschneidet, und erkennt schicke Unicode-Schriften, die die Barrierefreiheit beeinträchtigen.",
      fr: "Vérifiez votre publication Facebook avant de publier : l’éditeur ci-dessous montre où le pli du fil à ~480 caractères coupe votre texte et signale les polices Unicode fantaisistes qui nuisent à l’accessibilité.",
      pt: "Confira sua publicação do Facebook antes de publicar: o editor abaixo mostra onde o corte do feed aos ~480 caracteres trunca seu texto e sinaliza as fontes Unicode decorativas que prejudicam a acessibilidade.",
      it: "Controlla il tuo post Facebook prima di pubblicare: l’editor qui sotto mostra dove il taglio del feed a ~480 caratteri tronca il testo e segnala i font Unicode decorativi che compromettono l’accessibilità.",
      nl: "Controleer je Facebook-bericht voordat je publiceert — de editor hieronder laat zien waar de feedvouw bij ~480 tekens je tekst afkapt en signaleert chique Unicode-lettertypen die de toegankelijkheid schaden.",
      ja: "公開する前にFacebookの投稿をチェック。下のエディターは約480文字のフィード折り返しが本文を切る位置を示し、アクセシビリティを損なう装飾的なUnicodeフォントを検出します。",
      zh: "发布前检查你的 Facebook 帖子：下方编辑器显示约 480 字符的信息流折叠点在哪里截断文本，并标记会破坏无障碍访问的花式 Unicode 字体。",
      da: "Tjek dit Facebook-opslag, før du udgiver — editoren nedenfor viser, hvor feed-folden ved ~480 tegn skærer din tekst af, og markerer smarte Unicode-skrifttyper, der ødelægger tilgængeligheden.",
    },

    faq: {
      en: [
        {
          q: 'What is Facebook\'s character limit for posts?',
          a: 'A single post can technically hold more than 63,000 characters, so length is rarely the wall. What matters is the feed fold: Facebook hides text after roughly 480 characters behind "See more."',
        },
        {
          q: 'Why do shorter Facebook posts get more reach?',
          a: 'Posts under about 80 characters consistently see higher engagement — they read fully in-feed without a "See more" click and feel more conversational. The counter above helps you keep it tight.',
        },
        {
          q: 'Why do my fancy bold or italic letters look broken to some people?',
          a: 'Those styled letters are pseudo-Unicode symbols, not real formatting. Screen readers skip or mangle them, which hurts accessibility and reach. The editor flags them so you can switch back to plain text.',
        },
        {
          q: 'Do emojis and links count toward the character count?',
          a: 'Yes — emojis and the full link text count as characters in your post, even though Facebook also generates a separate link-preview card. The counter reflects the true character total.',
        },
      ],
      es: [
        { q: "¿Cuál es el límite de caracteres de Facebook para las publicaciones?", a: "Una sola publicación puede contener técnicamente más de 63.000 caracteres, así que la longitud rara vez es el muro. Lo que importa es el pliegue del feed: Facebook oculta el texto tras unos 480 caracteres con «Ver más»." },
        { q: "¿Por qué las publicaciones más cortas de Facebook tienen más alcance?", a: "Las publicaciones de menos de unos 80 caracteres logran de forma constante más interacción: se leen enteras en el feed sin pulsar «Ver más» y resultan más cercanas. El contador de arriba te ayuda a ser conciso." },
        { q: "¿Por qué mis letras decorativas en negrita o cursiva se ven rotas para algunas personas?", a: "Esas letras con estilo son símbolos pseudo-Unicode, no formato real. Los lectores de pantalla las omiten o las leen mal, lo que perjudica la accesibilidad y el alcance. El editor las señala para que vuelvas al texto normal." },
        { q: "¿Los emojis y los enlaces cuentan para el recuento de caracteres?", a: "Sí: los emojis y el texto completo del enlace cuentan como caracteres en tu publicación, aunque Facebook también genere una tarjeta de vista previa aparte. El contador refleja el total real de caracteres." },
      ],
      de: [
        { q: "Wie lautet das Zeichenlimit von Facebook für Beiträge?", a: "Ein einzelner Beitrag kann technisch über 63.000 Zeichen fassen, Länge ist also selten die Hürde. Entscheidend ist der Feed-Umbruch: Facebook verbirgt Text nach etwa 480 Zeichen hinter „Mehr anzeigen“." },
        { q: "Warum haben kürzere Facebook-Beiträge mehr Reichweite?", a: "Beiträge unter etwa 80 Zeichen erzielen durchweg mehr Interaktion — sie sind im Feed komplett lesbar, ohne auf „Mehr anzeigen“ zu klicken, und wirken nahbarer. Der Zähler oben hilft dir, es knapp zu halten." },
        { q: "Warum sehen meine schicken fett- oder kursivgesetzten Buchstaben für manche kaputt aus?", a: "Diese stilisierten Buchstaben sind Pseudo-Unicode-Symbole, keine echte Formatierung. Screenreader überspringen oder verstümmeln sie, was Barrierefreiheit und Reichweite schadet. Der Editor markiert sie, damit du zu normalem Text zurückkehren kannst." },
        { q: "Zählen Emojis und Links zur Zeichenanzahl?", a: "Ja — Emojis und der vollständige Linktext zählen als Zeichen in deinem Beitrag, auch wenn Facebook zusätzlich eine separate Link-Vorschaukarte erzeugt. Der Zähler zeigt die tatsächliche Gesamtzahl." },
      ],
      fr: [
        { q: "Quelle est la limite de caractères de Facebook pour les publications ?", a: "Une seule publication peut techniquement contenir plus de 63 000 caractères, la longueur est donc rarement le mur. Ce qui compte, c’est le pli du fil : Facebook masque le texte après environ 480 caractères derrière « Voir plus »." },
        { q: "Pourquoi les publications Facebook plus courtes ont-elles plus de portée ?", a: "Les publications de moins de 80 caractères obtiennent régulièrement plus d’engagement : elles se lisent entièrement dans le fil sans clic « Voir plus » et paraissent plus conviviales. Le compteur ci-dessus vous aide à rester concis." },
        { q: "Pourquoi mes lettres fantaisie en gras ou en italique semblent-elles cassées pour certains ?", a: "Ces lettres stylisées sont des symboles pseudo-Unicode, pas une vraie mise en forme. Les lecteurs d’écran les sautent ou les déforment, ce qui nuit à l’accessibilité et à la portée. L’éditeur les signale pour que vous reveniez au texte simple." },
        { q: "Les émojis et les liens comptent-ils dans le nombre de caractères ?", a: "Oui — les émojis et le texte complet du lien comptent comme des caractères dans votre publication, même si Facebook génère aussi une carte d’aperçu de lien distincte. Le compteur reflète le total réel de caractères." },
      ],
      pt: [
        { q: "Qual é o limite de caracteres do Facebook para publicações?", a: "Uma única publicação pode tecnicamente conter mais de 63.000 caracteres, então o comprimento raramente é o muro. O que importa é o corte do feed: o Facebook oculta o texto após cerca de 480 caracteres atrás de «Ver mais»." },
        { q: "Por que publicações mais curtas no Facebook têm mais alcance?", a: "Publicações com menos de cerca de 80 caracteres têm consistentemente mais engajamento: são lidas por inteiro no feed sem clicar em «Ver mais» e parecem mais próximas. O contador acima ajuda você a ser conciso." },
        { q: "Por que minhas letras decorativas em negrito ou itálico parecem quebradas para algumas pessoas?", a: "Essas letras estilizadas são símbolos pseudo-Unicode, não formatação real. Os leitores de tela as ignoram ou as leem errado, o que prejudica a acessibilidade e o alcance. O editor as sinaliza para você voltar ao texto comum." },
        { q: "Emojis e links contam para a contagem de caracteres?", a: "Sim — emojis e o texto completo do link contam como caracteres na sua publicação, mesmo que o Facebook também gere um cartão de pré-visualização separado. O contador reflete o total real de caracteres." },
      ],
      it: [
        { q: "Qual è il limite di caratteri di Facebook per i post?", a: "Un singolo post può tecnicamente contenere più di 63.000 caratteri, quindi la lunghezza è raramente il muro. Ciò che conta è il taglio del feed: Facebook nasconde il testo dopo circa 480 caratteri dietro «Altro»." },
        { q: "Perché i post Facebook più brevi hanno più portata?", a: "I post sotto circa 80 caratteri ottengono costantemente più interazione: si leggono per intero nel feed senza cliccare «Altro» e risultano più diretti. Il contatore qui sopra ti aiuta a restare conciso." },
        { q: "Perché le mie lettere decorative in grassetto o corsivo appaiono rotte ad alcune persone?", a: "Quelle lettere stilizzate sono simboli pseudo-Unicode, non vera formattazione. Gli screen reader le saltano o le storpiano, danneggiando accessibilità e portata. L’editor le segnala così puoi tornare al testo normale." },
        { q: "Le emoji e i link contano nel conteggio dei caratteri?", a: "Sì — le emoji e l’intero testo del link contano come caratteri nel post, anche se Facebook genera pure una scheda di anteprima separata. Il contatore riflette il totale reale dei caratteri." },
      ],
      nl: [
        { q: "Wat is de tekenlimiet van Facebook voor berichten?", a: "Eén bericht kan technisch meer dan 63.000 tekens bevatten, dus lengte is zelden de muur. Wat telt is de feedvouw: Facebook verbergt tekst na ongeveer 480 tekens achter ‘Meer weergeven’." },
        { q: "Waarom krijgen kortere Facebook-berichten meer bereik?", a: "Berichten onder ongeveer 80 tekens krijgen consequent meer interactie: ze zijn volledig leesbaar in het feed zonder ‘Meer weergeven’ en voelen persoonlijker. De teller hierboven helpt je het kort te houden." },
        { q: "Waarom zien mijn chique vette of cursieve letters er voor sommige mensen kapot uit?", a: "Die gestileerde letters zijn pseudo-Unicode-symbolen, geen echte opmaak. Schermlezers slaan ze over of verhaspelen ze, wat de toegankelijkheid en het bereik schaadt. De editor markeert ze zodat je terug kunt naar gewone tekst." },
        { q: "Tellen emoji en links mee voor het aantal tekens?", a: "Ja — emoji en de volledige linktekst tellen als tekens in je bericht, ook al maakt Facebook daarnaast een aparte linkvoorbeeldkaart. De teller toont het werkelijke totale aantal tekens." },
      ],
      ja: [
        { q: "Facebookの投稿の文字数制限は？", a: "1件の投稿は技術的には63,000文字以上入るため、長さが壁になることはほとんどありません。重要なのはフィードの折り返しで、Facebookは約480文字を超えるとテキストを「もっと見る」の後ろに隠します。" },
        { q: "なぜ短いFacebook投稿のほうがリーチが伸びるのですか？", a: "約80文字未満の投稿は一貫してエンゲージメントが高く、「もっと見る」を押さずにフィードで全文読め、より親しみやすく感じられます。上のカウンターが簡潔さを保つ手助けをします。" },
        { q: "なぜ装飾的な太字や斜体の文字が一部の人には壊れて見えるのですか？", a: "それらの装飾文字は本物の書式ではなく擬似Unicode記号です。スクリーンリーダーは読み飛ばしたり誤読したりするため、アクセシビリティとリーチを損ないます。エディターが検出するので、通常のテキストに戻せます。" },
        { q: "絵文字やリンクは文字数に含まれますか？", a: "はい。絵文字とリンクの全文は投稿の文字数に含まれます。Facebookが別途リンクプレビューカードを生成してもです。カウンターは実際の合計文字数を反映します。" },
      ],
      zh: [
        { q: "Facebook 帖子的字符上限是多少？", a: "单条帖子技术上可容纳超过 63,000 字符，因此长度很少成为障碍。关键在于信息流折叠点：Facebook 在约 480 字符后用“查看更多”隐藏文本。" },
        { q: "为什么较短的 Facebook 帖子触达更高？", a: "约 80 字符以内的帖子互动率持续更高：无需点击“查看更多”即可在信息流中读完，也更显亲切。上方计数器帮助你保持简洁。" },
        { q: "为什么我的花式粗体或斜体字母对某些人显示为乱码？", a: "那些样式化字母是伪 Unicode 符号，并非真正的格式。屏幕阅读器会跳过或读错它们，从而损害无障碍访问和触达。编辑器会标记它们，方便你改回普通文本。" },
        { q: "表情符号和链接会计入字符数吗？", a: "会——表情符号和完整的链接文本都计入帖子的字符数，即使 Facebook 还会另外生成链接预览卡片。计数器反映真实的字符总数。" },
      ],
      da: [
        { q: "Hvad er Facebooks tegngrænse for opslag?", a: "Et enkelt opslag kan teknisk rumme mere end 63.000 tegn, så længden er sjældent muren. Det vigtige er feed-folden: Facebook skjuler tekst efter cirka 480 tegn bag „Se mere“." },
        { q: "Hvorfor får kortere Facebook-opslag mere rækkevidde?", a: "Opslag under cirka 80 tegn får konsekvent mere engagement: de kan læses helt i feedet uden et „Se mere“-klik og virker mere personlige. Tælleren ovenfor hjælper dig med at holde det kort." },
        { q: "Hvorfor ser mine smarte fede eller kursive bogstaver i stykker ud for nogle?", a: "De stiliserede bogstaver er pseudo-Unicode-symboler, ikke rigtig formatering. Skærmlæsere springer dem over eller forvansker dem, hvilket skader tilgængelighed og rækkevidde. Editoren markerer dem, så du kan skifte tilbage til almindelig tekst." },
        { q: "Tæller emoji og links med i tegnantallet?", a: "Ja — emoji og hele linkteksten tæller som tegn i dit opslag, selvom Facebook også laver et separat link-forhåndsvisningskort. Tælleren afspejler det reelle samlede tegnantal." },
      ],
    },

    content: {
      en: `<h2>Facebook's character limits: what actually matters</h2>
<p>Facebook's technical character ceiling sits at a nearly unlimited <strong>63,206 characters</strong> — far more than anyone should ever use for a feed post. The real constraint is behavioural, not technical. <strong>The feed truncates at approximately 480 characters</strong> with a "See More" link, and engagement data consistently shows that posts cleared well before that fold outperform long-form updates by a significant margin.</p>
<p>PostTruncate's <strong>Facebook character counter</strong> tracks your running total in real time with a colour-coded display, marking both the 80-character sweet spot and the 480-character fold so you can make an informed decision before publishing — not after watching your reach flatline.</p>

<h2>The 480-character fold: what hides behind "See More"</h2>
<p>When a Facebook post exceeds approximately 480 characters in the feed, the platform collapses the remaining text behind a "See More" tap. This is not simply a display limitation — it is a friction point. Every additional tap required to read your full post is a drop-off opportunity, and mobile users in particular scroll past collapsed posts without engaging.</p>
<p>Posts that stay under the fold receive the full text treatment in the feed: no interruption, no tap required, no decision to make. The reader absorbs the entire message before they've consciously chosen to engage, which is exactly when organic sharing and commenting happens most naturally.</p>

<h2>Why posts under 80 characters consistently outperform longer ones</h2>
<p>Facebook's own engagement research — and years of third-party analysis — point to the same conclusion: <strong>posts under 80 characters receive significantly higher like, comment, and share rates</strong> than longer equivalents. The reasons are straightforward. Short posts render fully at a glance on every device. They leave visual whitespace that makes the post feel less demanding. And they force the writer to say one thing clearly, rather than three things vaguely.</p>
<p>This doesn't mean every post should be a single sentence. It means the opening line — the part of the post visible before any tap — should be able to stand alone. If the whole message fits in 80 characters, publish it at 80. If it genuinely needs more, keep the essential point in those first 80 characters and expand below the fold.</p>

<h2>Fancy Unicode fonts: the reach killer nobody talks about</h2>
<p>A growing number of Facebook users copy-paste text formatted with <strong>Unicode lookalike characters</strong> — the kind that make regular letters appear bold, italic, or styled in novelty fonts without using actual formatting. These characters are not real text. They are symbols that happen to resemble letters.</p>
<p>The consequences are serious. <strong>Screen readers used by blind and low-vision users read these characters as garbled nonsense</strong> — a sentence formatted in Unicode bold becomes a string of incomprehensible symbol names. Beyond accessibility, Facebook's algorithm treats heavy use of pseudo-Unicode text as a spam signal, silently suppressing the post's organic distribution.</p>
<p>PostTruncate detects pseudo-Unicode characters in real time and flags them before you publish, so you can replace them with standard text and restore both accessibility and reach.</p>`,

      es: `<h2>Los límites de caracteres en Facebook: lo que realmente importa</h2>
<p>El límite técnico de caracteres en Facebook es de <strong>63.206 caracteres</strong>, mucho más de lo que nadie debería usar jamás en una publicación del feed. La restricción real es de comportamiento, no técnica. <strong>El feed se trunca a aproximadamente 480 caracteres</strong> con un enlace "Ver más", y los datos de engagement muestran de manera constante que las publicaciones que se quedan bien por debajo de ese corte superan a las actualizaciones largas por un margen significativo.</p>
<p>El <strong>contador de caracteres para Facebook</strong> de PostTruncate actualiza tu recuento en tiempo real con una pantalla codificada por colores, marcando tanto el punto óptimo de 80 caracteres como el corte de 480, para que puedas tomar una decisión informada antes de publicar.</p>

<h2>El corte de 480 caracteres: qué se esconde detrás del "Ver más"</h2>
<p>Cuando una publicación de Facebook supera aproximadamente 480 caracteres en el feed, la plataforma colapsa el texto restante detrás de un toque en "Ver más". Esto no es solo una limitación de visualización: es un punto de fricción. Cada toque adicional necesario para leer tu publicación completa es una oportunidad de abandono, y los usuarios de móvil, en particular, hacen scroll pasando las publicaciones colapsadas sin interactuar.</p>
<p>Las publicaciones que se mantienen por debajo del corte reciben el tratamiento de texto completo en el feed: sin interrupciones, sin necesidad de tocar nada. El lector absorbe todo el mensaje antes de haber decidido conscientemente interactuar, que es exactamente cuando se producen los compartidos y comentarios orgánicos con más naturalidad.</p>

<h2>Por qué las publicaciones de menos de 80 caracteres superan sistemáticamente a las más largas</h2>
<p>La propia investigación de engagement de Facebook, así como años de análisis de terceros, apuntan a la misma conclusión: <strong>las publicaciones de menos de 80 caracteres reciben tasas significativamente más altas de me gustas, comentarios y compartidos</strong> que las equivalentes más largas. Las razones son claras. Las publicaciones cortas se muestran completamente de un vistazo en todos los dispositivos. Dejan espacio visual que hace que la publicación se sienta menos exigente. Y obligan al escritor a decir una cosa con claridad, en lugar de tres cosas de forma vaga.</p>

<h2>Las fuentes Unicode decorativas: el asesino silencioso del alcance</h2>
<p>Un número creciente de usuarios de Facebook copia y pega texto formateado con <strong>caracteres Unicode similares a letras</strong>, del tipo que hace que las letras normales parezcan en negrita, cursiva o en fuentes decorativas sin usar formato real. Estos caracteres no son texto real: son símbolos que se parecen a las letras.</p>
<p>Las consecuencias son graves. <strong>Los lectores de pantalla utilizados por personas ciegas o con baja visión leen estos caracteres como texto incomprensible</strong>: una frase formateada en negrita Unicode se convierte en una cadena de nombres de símbolos ininteligibles. Más allá de la accesibilidad, el algoritmo de Facebook trata el uso intensivo de pseudo-texto Unicode como una señal de spam, suprimiendo silenciosamente la distribución orgánica de la publicación.</p>
<p>PostTruncate detecta los caracteres pseudo-Unicode en tiempo real y los señala antes de que publiques, para que puedas reemplazarlos con texto estándar y recuperar tanto la accesibilidad como el alcance.</p>`,

      de: `<h2>Facebooks Zeichenlimits: Was wirklich zählt</h2>
<p>Facebooks technisches Zeichenlimit liegt bei <strong>63.206 Zeichen</strong> — weit mehr, als jemals in einem Feed-Beitrag sinnvoll wäre. Die eigentliche Einschränkung ist verhaltensbasiert, nicht technisch. <strong>Der Feed blendet Beiträge nach etwa 480 Zeichen</strong> mit einem „Mehr anzeigen"-Link ab, und Engagement-Daten zeigen konsistent, dass Beiträge deutlich unterhalb dieses Folds länge Aktualisierungen um ein Vielfaches übertreffen.</p>
<p>PostTruncates <strong>Facebook-Zeichenzähler</strong> verfolgt deinen laufenden Gesamtstand in Echtzeit mit farbkodierter Anzeige und markiert sowohl den optimalen 80-Zeichen-Bereich als auch den 480-Zeichen-Fold, damit du eine fundierte Entscheidung treffen kannst, bevor du veröffentlichst.</p>

<h2>Der 480-Zeichen-Fold: Was hinter „Mehr anzeigen" steckt</h2>
<p>Wenn ein Facebook-Beitrag im Feed etwa 480 Zeichen überschreitet, klappt die Plattform den restlichen Text hinter einem „Mehr anzeigen"-Tipp zusammen. Das ist nicht nur eine Anzeige­beschränkung — es ist ein Reibungspunkt. Jeder zusätzliche Tipp, den Leser brauchen, um den vollen Beitrag zu lesen, ist eine Absprung­möglichkeit. Mobile Nutzer scrollen besonders häufig an zusammengefalteten Beiträgen vorbei, ohne zu interagieren.</p>
<p>Beiträge, die unter dem Fold bleiben, werden im Feed vollständig angezeigt: keine Unterbrechung, kein Tipp erforderlich. Die Leserin oder der Leser nimmt die gesamte Botschaft auf, bevor sie oder er bewusst entschieden hat, sich zu engagieren — genau dann geschieht organisches Teilen und Kommentieren am natürlichsten.</p>

<h2>Warum Beiträge unter 80 Zeichen konsequent besser abschneiden</h2>
<p>Facebooks eigene Engagement-Forschung und jahrelange Drittanbieter-Analysen kommen zum selben Ergebnis: <strong>Beiträge unter 80 Zeichen erzielen deutlich höhere Like-, Kommentar- und Teilen-Raten</strong> als längere Entsprechungen. Die Gründe liegen auf der Hand. Kurze Beiträge werden auf jedem Gerät auf einen Blick vollständig angezeigt. Sie lassen visuellen Weißraum, der den Beitrag weniger anspruchsvoll wirken lässt. Und sie zwingen den Schreiber, eine Sache klar zu sagen, statt drei Dinge vage anzudeuten.</p>

<h2>Dekorative Unicode-Schriften: der stille Reichweiten-Killer</h2>
<p>Immer mehr Facebook-Nutzer kopieren und fügen Text ein, der mit <strong>Unicode-Lookalike-Zeichen</strong> formatiert ist — der Art, die normale Buchstaben ohne echte Formatierung fett, kursiv oder in Zierschriften erscheinen lässt. Diese Zeichen sind kein echter Text. Es sind Symbole, die zufällig wie Buchstaben aussehen.</p>
<p>Die Folgen sind ernst. <strong>Screenreader, die von blinden und sehbehinderten Menschen verwendet werden, lesen diese Zeichen als unverständliches Kauderwelsch</strong> — ein in Unicode-Fettdruck formatierter Satz wird zu einer Kette unverständlicher Symbolnamen. Jenseits der Barrierefreiheit behandelt Facebooks Algorithmus intensiven Pseudo-Unicode-Text als Spam-Signal und unterdrückt die organische Verbreitung des Beitrags stillschweigend.</p>
<p>PostTruncate erkennt Pseudo-Unicode-Zeichen in Echtzeit und markiert sie, bevor du veröffentlichst, damit du sie durch Standardtext ersetzen und sowohl Barrierefreiheit als auch Reichweite wiederherstellen kannst.</p>`,

      fr: `<h2>Les limites de caractères sur Facebook : ce qui compte vraiment</h2>
<p>Le plafond technique de caractères sur Facebook est de <strong>63 206 caractères</strong> — bien plus que quiconque ne devrait jamais utiliser pour une publication dans le fil. La vraie contrainte est comportementale, pas technique. <strong>Le fil tronque à environ 480 caractères</strong> avec un lien « Voir plus », et les données d'engagement montrent systématiquement que les publications bien en dessous de ce pli surpassent les mises à jour longues par une marge significative.</p>
<p>Le <strong>compteur de caractères Facebook</strong> de PostTruncate suit votre total en cours en temps réel avec un affichage codé par couleur, marquant à la fois le point idéal de 80 caractères et le pli à 480 caractères pour que vous puissiez prendre une décision éclairée avant de publier.</p>

<h2>Le pli à 480 caractères : ce qui se cache derrière « Voir plus »</h2>
<p>Lorsqu'une publication Facebook dépasse environ 480 caractères dans le fil, la plateforme réduit le texte restant derrière un appui sur « Voir plus ». Il ne s'agit pas seulement d'une limitation d'affichage — c'est un point de friction. Chaque appui supplémentaire nécessaire pour lire votre publication complète est une occasion d'abandon, et les utilisateurs mobiles en particulier font défiler devant les publications réduites sans interagir.</p>
<p>Les publications qui restent sous le pli bénéficient d'un traitement en texte intégral dans le fil : aucune interruption, aucun appui requis. Le lecteur absorbe le message complet avant d'avoir consciemment choisi d'interagir — c'est précisément à ce moment-là que le partage et les commentaires organiques se produisent le plus naturellement.</p>

<h2>Pourquoi les publications de moins de 80 caractères surpassent systématiquement les plus longues</h2>
<p>Les propres recherches de Facebook sur l'engagement — et des années d'analyses tierces — aboutissent à la même conclusion : <strong>les publications de moins de 80 caractères reçoivent des taux de mentions J'aime, commentaires et partages significativement plus élevés</strong> que leurs équivalents plus longs. Les raisons sont simples. Les publications courtes s'affichent entièrement en un coup d'œil sur tous les appareils. Elles laissent un espace visuel qui rend la publication moins exigeante. Et elles forcent l'auteur à dire une chose clairement, plutôt que trois choses vaguement.</p>

<h2>Les polices Unicode décoratives : le tueur de portée dont personne ne parle</h2>
<p>Un nombre croissant d'utilisateurs Facebook copient-collent du texte formaté avec des <strong>caractères Unicode similaires à des lettres</strong> — ceux qui font apparaître des lettres ordinaires en gras, en italique ou dans des polices fantaisie sans utiliser de vrai formatage. Ces caractères ne sont pas du vrai texte. Ce sont des symboles qui ressemblent par hasard à des lettres.</p>
<p>Les conséquences sont graves. <strong>Les lecteurs d'écran utilisés par les personnes aveugles ou malvoyantes lisent ces caractères comme du charabia incompréhensible</strong> — une phrase formatée en gras Unicode devient une chaîne de noms de symboles inintelligibles. Au-delà de l'accessibilité, l'algorithme de Facebook traite une utilisation intensive de pseudo-texte Unicode comme un signal de spam, supprimant silencieusement la distribution organique de la publication.</p>
<p>PostTruncate détecte les pseudo-caractères Unicode en temps réel et les signale avant que vous ne publiiez, afin que vous puissiez les remplacer par du texte standard et restaurer à la fois l'accessibilité et la portée.</p>`,

      pt: `<h2>Os limites de caracteres no Facebook: o que realmente importa</h2>
<p>O limite técnico de caracteres no Facebook é de <strong>63.206 caracteres</strong> — muito mais do que qualquer pessoa deveria usar em uma publicação do feed. A restrição real é comportamental, não técnica. <strong>O feed trunca em aproximadamente 480 caracteres</strong> com um link "Ver mais", e os dados de engajamento mostram consistentemente que publicações bem abaixo desse corte superam atualizações longas por uma margem significativa.</p>
<p>O <strong>contador de caracteres do Facebook</strong> do PostTruncate acompanha seu total em tempo real com um display codificado por cores, marcando tanto o ponto ideal de 80 caracteres quanto o corte de 480, para que você possa tomar uma decisão informada antes de publicar.</p>

<h2>O corte de 480 caracteres: o que se esconde atrás do "Ver mais"</h2>
<p>Quando uma publicação do Facebook ultrapassa aproximadamente 480 caracteres no feed, a plataforma recolhe o texto restante atrás de um toque em "Ver mais". Isso não é apenas uma limitação de exibição — é um ponto de atrito. Cada toque adicional necessário para ler sua publicação completa é uma oportunidade de abandono, e os usuários de mobile em particular rolam passando pelas publicações recolhidas sem interagir.</p>
<p>Publicações que ficam abaixo do corte recebem o tratamento de texto completo no feed: sem interrupção, sem necessidade de tocar. O leitor absorve toda a mensagem antes de ter decidido conscientemente interagir — exatamente quando o compartilhamento e os comentários orgânicos acontecem de forma mais natural.</p>

<h2>Por que publicações abaixo de 80 caracteres superam consistentemente as mais longas</h2>
<p>A própria pesquisa de engajamento do Facebook — e anos de análises de terceiros — apontam para a mesma conclusão: <strong>publicações abaixo de 80 caracteres recebem taxas significativamente mais altas de curtidas, comentários e compartilhamentos</strong> do que equivalentes mais longas. As razões são simples. Publicações curtas são exibidas completamente de relance em qualquer dispositivo. Elas deixam espaço visual que torna a publicação menos exigente. E forçam o autor a dizer uma coisa claramente, em vez de três coisas de forma vaga.</p>

<h2>Fontes Unicode decorativas: o assassino silencioso do alcance</h2>
<p>Um número crescente de usuários do Facebook copia e cola texto formatado com <strong>caracteres Unicode parecidos com letras</strong> — o tipo que faz letras comuns parecerem em negrito, itálico ou em fontes decorativas sem usar formatação real. Esses caracteres não são texto real. São símbolos que por acaso se parecem com letras.</p>
<p>As consequências são sérias. <strong>Leitores de tela usados por pessoas cegas ou com baixa visão leem esses caracteres como texto incompreensível</strong> — uma frase formatada em negrito Unicode vira uma sequência de nomes de símbolos ininteligíveis. Além da acessibilidade, o algoritmo do Facebook trata o uso intenso de pseudo-texto Unicode como sinal de spam, suprimindo silenciosamente a distribuição orgânica da publicação.</p>
<p>O PostTruncate detecta pseudo-caracteres Unicode em tempo real e os sinaliza antes que você publique, para que possa substituí-los por texto padrão e restaurar tanto a acessibilidade quanto o alcance.</p>`,

      it: `<h2>I limiti di caratteri su Facebook: quello che conta davvero</h2>
<p>Il limite tecnico di caratteri su Facebook è di <strong>63.206 caratteri</strong> — molto più di quanto chiunque dovrebbe mai usare in un post del feed. Il vero vincolo è comportamentale, non tecnico. <strong>Il feed tronca a circa 480 caratteri</strong> con un link "Vedi altro", e i dati sull'engagement mostrano sistematicamente che i post ben al di sotto di questa soglia superano gli aggiornamenti lunghi di un margine significativo.</p>
<p>Il <strong>contatore di caratteri per Facebook</strong> di PostTruncate tiene traccia del tuo totale progressivo in tempo reale con un display codificato a colori, segnando sia il punto ideale di 80 caratteri sia la soglia a 480, per consentirti di prendere una decisione informata prima di pubblicare.</p>

<h2>La soglia a 480 caratteri: cosa si nasconde dietro "Vedi altro"</h2>
<p>Quando un post Facebook supera circa 480 caratteri nel feed, la piattaforma comprime il testo rimanente dietro un tocco su "Vedi altro". Non si tratta solo di un limite di visualizzazione — è un punto di attrito. Ogni tocco aggiuntivo necessario per leggere il post completo è un'opportunità di abbandono, e gli utenti mobile in particolare scorrono davanti ai post compressi senza interagire.</p>
<p>I post che restano sotto la soglia ricevono il trattamento a testo intero nel feed: nessuna interruzione, nessun tocco richiesto. Il lettore assorbe l'intero messaggio prima di aver scelto consapevolmente di interagire — esattamente quando la condivisione e i commenti organici avvengono nel modo più naturale.</p>

<h2>Perché i post sotto gli 80 caratteri superano sistematicamente quelli più lunghi</h2>
<p>La ricerca sull'engagement di Facebook — e anni di analisi di terze parti — puntano alla stessa conclusione: <strong>i post sotto gli 80 caratteri ricevono tassi significativamente più alti di like, commenti e condivisioni</strong> rispetto agli equivalenti più lunghi. Le ragioni sono chiare. I post brevi vengono visualizzati completamente a colpo d'occhio su qualsiasi dispositivo. Lasciano spazio visivo che rende il post meno impegnativo. E costringono l'autore a dire una cosa chiaramente, invece di tre cose vagamente.</p>

<h2>I font Unicode decorativi: il killer silenzioso della portata</h2>
<p>Un numero crescente di utenti Facebook copia e incolla testo formattato con <strong>caratteri Unicode simili a lettere</strong> — il tipo che fa apparire le lettere comuni in grassetto, corsivo o in font decorativi senza usare la vera formattazione. Questi caratteri non sono testo reale. Sono simboli che per caso assomigliano a lettere.</p>
<p>Le conseguenze sono serie. <strong>Gli screen reader usati da persone non vedenti o ipovedenti leggono questi caratteri come testo incomprensibile</strong> — una frase formattata in grassetto Unicode diventa una stringa di nomi di simboli ininteligibili. Al di là dell'accessibilità, l'algoritmo di Facebook tratta l'uso intensivo di pseudo-testo Unicode come segnale di spam, sopprimendo silenziosamente la distribuzione organica del post.</p>
<p>PostTruncate rileva i pseudo-caratteri Unicode in tempo reale e li segnala prima che tu pubblichi, così puoi sostituirli con testo standard e ripristinare sia l'accessibilità che la portata.</p>`,

      nl: `<h2>Facebooks tekenlimits: wat er écht toe doet</h2>
<p>Facebooks technische tekenplafond ligt op <strong>63.206 tekens</strong> — veel meer dan iemand ooit voor een feedbericht zou moeten gebruiken. De echte beperking is gedragsmatig, niet technisch. <strong>De feed kapt af bij ongeveer 480 tekens</strong> met een "Meer weergeven"-link, en betrokkenheidsdata laten consistent zien dat berichten ruim onder die vouw lange updates met een aanzienlijke marge overtreffen.</p>
<p>PostTruncates <strong>Facebook-tekenteller</strong> houdt je lopende totaal bij in real time met een kleurgecodeerde weergave, en markeert zowel het ideale 80-tekenpunt als de 480-tekenvouw zodat je een weloverwogen beslissing kunt nemen vóór je publiceert.</p>

<h2>De 480-tekenvouw: wat er achter "Meer weergeven" schuilt</h2>
<p>Wanneer een Facebook-bericht in de feed de 480 tekens overschrijdt, vouwt het platform de resterende tekst achter een tik op "Meer weergeven". Dit is niet alleen een weergavebeperking — het is een wrijvingspunt. Elke extra tik die lezers nodig hebben om je volledige bericht te lezen, is een afhaakmogelijkheid. Mobiele gebruikers scrollen in het bijzonder langs ingeklapte berichten zonder te reageren.</p>
<p>Berichten die onder de vouw blijven, krijgen de volledige tekstbehandeling in de feed: geen onderbreking, geen tik vereist. De lezer absorbeert de volledige boodschap voordat hij bewust heeft gekozen om te reageren — precies het moment waarop organisch delen en reageren het meest vanzelfsprekend plaatsvindt.</p>

<h2>Waarom berichten onder de 80 tekens consequent beter presteren</h2>
<p>Facebooks eigen betrokkenheidsonderzoek — en jaren aan externe analyses — wijzen allemaal dezelfde kant op: <strong>berichten onder de 80 tekens ontvangen aanzienlijk hogere like-, reactie- en deelpercentages</strong> dan langere tegenhangers. De redenen zijn duidelijk. Korte berichten worden op elk apparaat in één oogopslag volledig weergegeven. Ze laten visuele witruimte over die het bericht minder veeleisend laat aanvoelen. En ze dwingen de schrijver om één ding helder te zeggen, in plaats van drie dingen vaag.</p>

<h2>Decoratieve Unicode-lettertypen: de stille bereikdoder</h2>
<p>Een groeiend aantal Facebook-gebruikers kopieert en plakt tekst opgemaakt met <strong>Unicode-lookalike-tekens</strong> — het soort dat gewone letters zonder echte opmaak vet, cursief of in sierschriften laat verschijnen. Deze tekens zijn geen echte tekst. Het zijn symbolen die toevallig op letters lijken.</p>
<p>De gevolgen zijn ernstig. <strong>Schermlezers die door blinde en slechtziende gebruikers worden gebruikt, lezen deze tekens als onbegrijpelijk gebrabbel</strong> — een in Unicode-vet opgemaakte zin wordt een reeks onbegrijpelijke symboolnamen. Buiten de toegankelijkheid behandelt Facebooks algoritme intensief gebruik van pseudo-Unicode-tekst als een spamsignaal, waardoor de organische verspreiding van het bericht stil wordt onderdrukt.</p>
<p>PostTruncate detecteert pseudo-Unicode-tekens in real time en markeert ze voordat je publiceert, zodat je ze kunt vervangen door standaardtekst en zowel toegankelijkheid als bereik kunt herstellen.</p>`,

      ja: `<h2>Facebookの文字制限：本当に重要なこと</h2>
<p>Facebookの技術的な文字数上限は<strong>63,206文字</strong>——フィード投稿に使うには多すぎる数字です。実際の制限は技術的なものではなく、行動的なものです。<strong>フィードは約480文字で切り取られ</strong>、「続きを読む」リンクが表示されます。エンゲージメントデータは一貫して、この折り返し点よりずっと前に収まる投稿が長文の更新を大きく上回ることを示しています。</p>
<p>PostTruncateの<strong>Facebook文字数カウンター</strong>は入力中にリアルタイムで合計文字数をカラーコードで表示し、80文字の最適ポイントと480文字の折り返し点の両方をマークします。公開後に気づくのではなく、公開前に判断できます。</p>

<h2>480文字の折り返し点：「続きを読む」の後ろに隠れるもの</h2>
<p>FacebookのフィードでPost文字数が約480文字を超えると、プラットフォームは残りのテキストを「続きを読む」タップの後ろに折りたたみます。これは単なる表示上の制限ではなく、摩擦ポイントです。全文を読むために余分なタップが必要になるたびに、離脱の機会が生まれます。特にモバイルユーザーは、折りたたまれた投稿はエンゲージメントせずにスクロールして通り過ぎることが多いです。</p>
<p>折り返し点以内に収まる投稿はフィードでテキスト全文が表示されます。途中で切れることも、タップも必要ありません。読者は意識的にエンゲージメントを選ぶ前にメッセージ全体を受け取ります——オーガニックなシェアやコメントが最も自然に生まれる瞬間です。</p>

<h2>80文字未満の投稿が一貫して長文を上回る理由</h2>
<p>Facebook自身のエンゲージメント調査と、何年にもわたるサードパーティ分析は同じ結論を示しています。<strong>80文字未満の投稿は、長い投稿と比べていいね・コメント・シェア率が大幅に高い</strong>のです。理由は明確です。短い投稿はあらゆるデバイスで一瞬で全文が表示されます。視覚的な余白を生み、投稿が負担に感じられません。そして筆者に、3つのことをあいまいに述べるのではなく、1つのことを明確に言うことを強制します。</p>

<h2>装飾的なUnicodeフォント：誰も語らないリーチの破壊者</h2>
<p>Facebookユーザーの中には、<strong>Unicodeの似せ文字</strong>を使ってフォーマットされたテキストをコピー&ペーストする人が増えています——本物のフォーマットを使わずに、通常の文字を太字・斜体・装飾フォントのように見せるタイプです。これらの文字は本物のテキストではありません。たまたま文字に似ているだけの記号です。</p>
<p>その影響は深刻です。<strong>視覚障害者や弱視の方が使うスクリーンリーダーは、これらの文字を意味不明な文字列として読み上げます</strong>——Unicode太字でフォーマットされた文章は、理解不能なシンボル名の羅列になってしまいます。アクセシビリティの問題だけでなく、Facebookのアルゴリズムは疑似Unicode文字の多用をスパムシグナルとして扱い、投稿のオーガニックリーチを静かに抑制します。</p>
<p>PostTruncateは疑似Unicode文字をリアルタイムで検出し、公開前にフラグを立てます。標準テキストに置き換えることで、アクセシビリティとリーチの両方を回復できます。</p>`,

      zh: `<h2>Facebook的字符限制：真正重要的是什么</h2>
<p>Facebook的技术字符上限是<strong>63,206个字符</strong>——远远超过任何人在信息流帖子中应该使用的数量。真正的限制是行为层面的，而非技术层面的。<strong>信息流在约480个字符处截断</strong>，显示"查看更多"链接。互动数据持续表明，远低于这一折叠点的帖子，在互动效果上明显优于长篇更新。</p>
<p>PostTruncate的<strong>Facebook字符计数器</strong>实时追踪你的字符总数，用颜色编码的显示方式标记80字符的最佳点和480字符的折叠点，让你在发布前而非发布后才能做出明智的决策。</p>

<h2>480字符折叠点："查看更多"后面隐藏了什么</h2>
<p>当Facebook帖子在信息流中超过约480个字符时，平台会将剩余文字折叠在"查看更多"点击后面。这不仅仅是显示限制——它是一个摩擦点。读者需要额外点击才能读完你的帖子，每一次点击都是一个离开的机会。移动端用户尤其容易直接滑过折叠的帖子而不与其互动。</p>
<p>保持在折叠点以内的帖子在信息流中获得完整文字展示：没有中断，无需点击。读者在有意识地选择互动之前便已接收完整信息——而这正是有机分享和评论最自然发生的时机。</p>

<h2>为什么80字符以内的帖子持续优于更长的帖子</h2>
<p>Facebook自身的互动研究——以及多年的第三方分析——都指向同一结论：<strong>80字符以内的帖子获得的点赞、评论和分享率明显高于更长的同类帖子</strong>。原因很直接。短帖子在任何设备上一眼就能完整显示。它们留有视觉空白，让帖子感觉不那么有压迫感。而且它们迫使作者清晰地表达一件事，而非含糊地说三件事。</p>

<h2>装饰性Unicode字体：无人谈及的触达杀手</h2>
<p>越来越多的Facebook用户会复制粘贴用<strong>Unicode仿字符</strong>格式化的文字——这类字符让普通字母在不使用真正格式的情况下看起来像粗体、斜体或装饰字体。这些字符不是真正的文字，而是碰巧长得像字母的符号。</p>
<p>其后果相当严重。<strong>盲人和低视力用户使用的屏幕阅读器会将这些字符读成乱码</strong>——用Unicode粗体格式化的句子会变成一串难以理解的符号名称。除了无障碍问题之外，Facebook的算法将大量使用伪Unicode文字视为垃圾信息信号，悄然压制帖子的有机传播。</p>
<p>PostTruncate实时检测伪Unicode字符，并在发布前进行标记，让你能用标准文字替换它们，同时恢复无障碍性和触达效果。</p>`,

      da: `<h2>Facebooks tegn­grænser: hvad der faktisk betyder noget</h2>
<p>Facebooks tekniske tegnloft ligger på <strong>63.206 tegn</strong> — langt mere end nogen nogensinde burde bruge i et feedopslag. Den reelle begrænsning er adfærdsmæssig, ikke teknisk. <strong>Feedet afkorter ved ca. 480 tegn</strong> med et "Se mere"-link, og engagementdata viser konsekvent, at opslag der er godt under den fold, overgår lange opdateringer med en betydelig margin.</p>
<p>PostTruncates <strong>Facebook-tegntæller</strong> sporer dit løbende total i realtid med farvekodning og markerer både det ideelle 80-tegnspunkt og 480-tegns-folden, så du kan træffe en informeret beslutning inden publicering — ikke efter at have set din rækkevidde flade ud.</p>

<h2>480-tegns-folden: hvad der gemmer sig bag "Se mere"</h2>
<p>Når et Facebook-opslag i feedet overstiger ca. 480 tegn, folder platformen den resterende tekst sammen bag et "Se mere"-tryk. Det er ikke blot en visningsbegrænsning — det er et friktionspunkt. Hvert ekstra tryk, der kræves for at læse dit fulde opslag, er en frafaldsmulighed. Mobilbrugere scroller i særdeleshed forbi sammenklappede opslag uden at interagere.</p>
<p>Opslag der holder sig under folden, modtager fuld tekstbehandling i feedet: ingen afbrydelse, intet tryk påkrævet. Læseren absorberer hele budskabet, før de bevidst har valgt at engagere sig — præcis det tidspunkt, hvor organisk deling og kommentering sker mest naturligt.</p>

<h2>Hvorfor opslag under 80 tegn konsekvent klarer sig bedre</h2>
<p>Facebooks egen engagementforskning — og års tredjeparts-analyser — peger på den samme konklusion: <strong>opslag under 80 tegn modtager væsentligt højere like-, kommentar- og delingsrater</strong> end længere modparter. Grundene er enkle. Korte opslag vises fuldstændigt i et øjeblik på alle enheder. De efterlader visuelt hvidt rum, der får opslaget til at føles mindre krævende. Og de tvinger skribenten til at sige én ting klart, frem for tre ting uklart.</p>

<h2>Dekorative Unicode-skrifttyper: den stille rækkevidde-dræber</h2>
<p>Et stigende antal Facebook-brugere kopierer og indsætter tekst formateret med <strong>Unicode-lookalike-tegn</strong> — den slags der får normale bogstaver til at se fede, kursive eller stiliserede ud uden at bruge rigtig formatering. Disse tegn er ikke rigtig tekst. De er symboler, der tilfældigvis ligner bogstaver.</p>
<p>Konsekvenserne er alvorlige. <strong>Skærmlæsere brugt af blinde og svagsynede læser disse tegn som uforståelig volapyk</strong> — en sætning formateret med Unicode-fed bliver til en streng af uforståelige symbolnavne. Ud over tilgængelighed behandler Facebooks algoritme intensiv brug af pseudo-Unicode-tekst som et spam-signal og undertrykker lydløst opslagets organiske distribution.</p>
<p>PostTruncate registrerer pseudo-Unicode-tegn i realtid og markerer dem, inden du publicerer, så du kan erstatte dem med standardtekst og gendanne både tilgængelighed og rækkevidde.</p>`,
    },
  },
  {
    id: 'threads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-05-28',
    platformLimits:
      '500 characters per post, links counted in full (not shortened like X), overflow chains as numbered reply posts, first post carries all feed weight',

    slugs: {
      en: 'threads-character-counter',
      es: 'contador-caracteres-threads',
      de: 'threads-zeichenzaehler',
      fr: 'compteur-caracteres-threads',
      pt: 'contador-caracteres-threads',
      it: 'contatore-caratteri-threads',
      nl: 'threads-tekenteller',
      ja: 'threads-moji-kaunta',
      zh: 'threads-zi-fu-ji-shu',
      da: 'threads-tegntaeller',
    },

    schemaName: {
      en: 'Threads Character Counter',
      es: 'Contador de Caracteres para Threads',
      de: 'Threads Zeichenzähler',
      fr: 'Compteur de Caractères Threads',
      pt: 'Contador de Caracteres do Threads',
      it: 'Contatore di Caratteri per Threads',
      nl: 'Threads Tekenteller',
      ja: 'Threads 文字数カウンター',
      zh: 'Threads 字符计数器',
      da: 'Threads Tegntæller',
    },

    titles: {
      en: 'Threads Character Counter — Free 500-Char Post Counter',
      es: 'Contador de Caracteres Threads — Contador gratis de 500 caracteres',
      de: 'Threads Zeichenzähler — Kostenloser 500-Zeichen-Postzähler',
      fr: 'Compteur de Caractères Threads — Compteur gratuit de 500 caractères',
      pt: 'Contador de Caracteres Threads — Contador grátis de 500 caracteres',
      it: 'Contatore Caratteri Threads — Contatore gratis di 500 caratteri',
      nl: 'Threads Tekenteller — Gratis 500-tekens berichtenteller',
      ja: 'Threads文字数カウンター — 500文字の投稿を無料カウント',
      zh: 'Threads字符计数器 — 免费统计500字符帖文',
      da: 'Threads Tegntæller — Gratis 500-tegns indlægstæller',
    },

    metaDescriptions: {
      en: 'Free Threads character counter. Track the 500-character limit live, see how full-length links eat your budget unlike X, and auto-chain overflow into replies.',
      es: 'Contador de caracteres para Threads gratis. Controla el límite de 500 caracteres en vivo, descubre cómo los enlaces completos consumen tu espacio a diferencia de X y encadena el texto sobrante en respuestas.',
      de: 'Kostenloser Threads-Zeichenzähler. Verfolge das 500-Zeichen-Limit live, sieh wie vollständige Links anders als bei X deinen Platz verbrauchen und verkette Überschuss automatisch als Antworten.',
      fr: 'Compteur de caractères Threads gratuit. Suivez la limite de 500 caractères en direct, voyez comment les liens complets consomment votre espace contrairement à X et enchaînez le surplus en réponses.',
      pt: 'Contador de caracteres do Threads gratuito. Acompanhe o limite de 500 caracteres ao vivo, veja como links completos consomem seu espaço ao contrário do X e encadeie o excedente em respostas.',
      it: 'Contatore di caratteri Threads gratuito. Monitora il limite di 500 caratteri in tempo reale, scopri come i link completi consumano lo spazio a differenza di X e concatena le eccedenze in risposte.',
      nl: 'Gratis Threads tekenteller. Volg de 500-tekenlimiet live, zie hoe volledige links anders dan op X je ruimte opslokken en koppel overschot automatisch aan antwoorden.',
      ja: '無料のThreads文字数カウンター。500文字の上限をリアルタイムで追跡し、Xと違ってフルのリンクが文字数を消費する仕組みを確認し、超過分を返信に自動連結。',
      zh: '免费Threads字符计数器。实时追踪500字符上限，了解链接为何不同于X会按完整长度计入，并将超出内容自动连缀为回复。',
      da: 'Gratis Threads tegntæller. Følg 500-tegns-grænsen live, se hvordan fulde links bruger din plads i modsætning til X, og kæd overskud automatisk til svar.',
    },

    intro: {
      en: "Check your Threads post before you publish — the counter below tracks the 500-character limit live and auto-chains anything longer into numbered reply posts.",
      es: "Revisa tu publicación de Threads antes de publicar: el contador de abajo controla en vivo el límite de 500 caracteres y encadena automáticamente todo lo que sobre en respuestas numeradas.",
      de: "Prüfe deinen Threads-Beitrag vor dem Veröffentlichen — der Zähler unten verfolgt live das 500-Zeichen-Limit und verkettet alles Längere automatisch zu nummerierten Antwortbeiträgen.",
      fr: "Vérifiez votre publication Threads avant de publier : le compteur ci-dessous suit en direct la limite de 500 caractères et enchaîne automatiquement tout dépassement en réponses numérotées.",
      pt: "Confira sua publicação do Threads antes de publicar: o contador abaixo acompanha ao vivo o limite de 500 caracteres e encadeia automaticamente qualquer excedente em respostas numeradas.",
      it: "Controlla il tuo post Threads prima di pubblicare: il contatore qui sotto monitora in tempo reale il limite di 500 caratteri e concatena automaticamente tutto ciò che eccede in risposte numerate.",
      nl: "Controleer je Threads-bericht voordat je publiceert — de teller hieronder volgt live de limiet van 500 tekens en koppelt alles wat langer is automatisch aan genummerde antwoordberichten.",
      ja: "公開する前にThreadsの投稿をチェック。下のカウンターは500文字の上限をリアルタイムで追跡し、超過分を自動で番号付きの返信投稿に連結します。",
      zh: "发布前检查你的 Threads 帖子：下方计数器实时追踪 500 字符上限，并将任何超出内容自动连缀为编号回复帖。",
      da: "Tjek dit Threads-opslag, før du udgiver — tælleren nedenfor følger live 500-tegns-grænsen og kæder automatisk alt længere sammen til nummererede svar-opslag.",
    },

    faq: {
      en: [
        {
          q: 'What is the character limit on Threads?',
          a: 'Each Threads post is capped at 500 characters. Need more room? Chain additional posts together — the tool above splits overflow into numbered replies automatically.',
        },
        {
          q: 'Do links count differently on Threads than on X?',
          a: 'Yes. Unlike X, which collapses every link to 23 characters, Threads counts the full visible URL against your 500. A long link can eat a big chunk of your budget, so shorten it first.',
        },
        {
          q: 'How do I post something longer than 500 characters?',
          a: 'Add it as a chained reply under your original post. Paste your full draft into the editor above and it breaks the text into 500-character segments at natural sentence boundaries.',
        },
        {
          q: 'Do emojis and line breaks count toward the 500 limit?',
          a: 'Yes — emojis, spaces, and line breaks all count. Threads gives you less room than it looks, so the live counter keeps you from getting cut off mid-thought.',
        },
      ],
      es: [
        { q: "¿Cuál es el límite de caracteres en Threads?", a: "Cada publicación de Threads tiene un límite de 500 caracteres. ¿Necesitas más espacio? Encadena publicaciones adicionales: la herramienta de arriba divide el sobrante en respuestas numeradas automáticamente." },
        { q: "¿Los enlaces cuentan distinto en Threads que en X?", a: "Sí. A diferencia de X, que reduce cada enlace a 23 caracteres, Threads cuenta la URL visible completa contra tus 500. Un enlace largo puede consumir buena parte de tu espacio, así que acórtalo primero." },
        { q: "¿Cómo publico algo de más de 500 caracteres?", a: "Añádelo como respuesta encadenada bajo tu publicación original. Pega tu borrador completo en el editor de arriba y lo dividirá en segmentos de 500 caracteres en los límites naturales de las frases." },
        { q: "¿Los emojis y los saltos de línea cuentan para el límite de 500?", a: "Sí: los emojis, los espacios y los saltos de línea cuentan todos. Threads ofrece menos espacio del que parece, así que el contador en vivo evita que te corten a media idea." },
      ],
      de: [
        { q: "Wie lautet das Zeichenlimit bei Threads?", a: "Jeder Threads-Beitrag ist auf 500 Zeichen begrenzt. Brauchst du mehr Platz? Verkette weitere Beiträge — das Tool oben teilt den Überschuss automatisch in nummerierte Antworten auf." },
        { q: "Zählen Links bei Threads anders als bei X?", a: "Ja. Anders als X, das jeden Link auf 23 Zeichen reduziert, zählt Threads die vollständige sichtbare URL zu deinen 500. Ein langer Link kann einen großen Teil deines Budgets fressen, kürze ihn also vorher." },
        { q: "Wie poste ich etwas, das länger als 500 Zeichen ist?", a: "Füge es als verkettete Antwort unter deinem ursprünglichen Beitrag hinzu. Füge deinen vollständigen Entwurf in den Editor oben ein, und er teilt den Text an natürlichen Satzgrenzen in 500-Zeichen-Segmente auf." },
        { q: "Zählen Emojis und Zeilenumbrüche zum 500-Limit?", a: "Ja — Emojis, Leerzeichen und Zeilenumbrüche zählen alle. Threads bietet weniger Platz, als es aussieht, daher bewahrt dich der Live-Zähler davor, mitten im Gedanken abgeschnitten zu werden." },
      ],
      fr: [
        { q: "Quelle est la limite de caractères sur Threads ?", a: "Chaque publication Threads est limitée à 500 caractères. Besoin de plus de place ? Enchaînez d’autres publications : l’outil ci-dessus répartit automatiquement le surplus en réponses numérotées." },
        { q: "Les liens comptent-ils différemment sur Threads que sur X ?", a: "Oui. Contrairement à X, qui réduit chaque lien à 23 caractères, Threads compte l’URL visible complète dans vos 500. Un lien long peut consommer une grande partie de votre espace, alors raccourcissez-le d’abord." },
        { q: "Comment publier un texte de plus de 500 caractères ?", a: "Ajoutez-le en réponse enchaînée sous votre publication d’origine. Collez votre brouillon complet dans l’éditeur ci-dessus et il découpe le texte en segments de 500 caractères aux limites naturelles des phrases." },
        { q: "Les émojis et les sauts de ligne comptent-ils dans la limite de 500 ?", a: "Oui — les émojis, les espaces et les sauts de ligne comptent tous. Threads offre moins de place qu’il n’y paraît, donc le compteur en direct vous évite d’être coupé en pleine idée." },
      ],
      pt: [
        { q: "Qual é o limite de caracteres no Threads?", a: "Cada publicação do Threads tem limite de 500 caracteres. Precisa de mais espaço? Encadeie publicações adicionais: a ferramenta acima divide o excedente em respostas numeradas automaticamente." },
        { q: "Os links contam de forma diferente no Threads e no X?", a: "Sim. Ao contrário do X, que reduz cada link a 23 caracteres, o Threads conta a URL visível completa nos seus 500. Um link longo pode consumir boa parte do seu espaço, então encurte-o primeiro." },
        { q: "Como publico algo com mais de 500 caracteres?", a: "Adicione como resposta encadeada sob a publicação original. Cole seu rascunho completo no editor acima e ele divide o texto em segmentos de 500 caracteres nos limites naturais das frases." },
        { q: "Emojis e quebras de linha contam para o limite de 500?", a: "Sim — emojis, espaços e quebras de linha contam todos. O Threads oferece menos espaço do que parece, então o contador ao vivo evita que você seja cortado no meio de uma ideia." },
      ],
      it: [
        { q: "Qual è il limite di caratteri su Threads?", a: "Ogni post di Threads ha un limite di 500 caratteri. Ti serve più spazio? Concatena altri post: lo strumento qui sopra divide automaticamente l’eccedenza in risposte numerate." },
        { q: "I link contano diversamente su Threads rispetto a X?", a: "Sì. A differenza di X, che riduce ogni link a 23 caratteri, Threads conta l’intera URL visibile nei tuoi 500. Un link lungo può consumare gran parte del tuo spazio, quindi accorcialo prima." },
        { q: "Come pubblico qualcosa di più lungo di 500 caratteri?", a: "Aggiungilo come risposta concatenata sotto il post originale. Incolla la bozza completa nell’editor qui sopra e dividerà il testo in segmenti da 500 caratteri ai confini naturali delle frasi." },
        { q: "Le emoji e gli a capo contano per il limite di 500?", a: "Sì — emoji, spazi e a capo contano tutti. Threads offre meno spazio di quanto sembri, quindi il contatore in tempo reale ti evita di essere tagliato a metà pensiero." },
      ],
      nl: [
        { q: "Wat is de tekenlimiet op Threads?", a: "Elk Threads-bericht is beperkt tot 500 tekens. Meer ruimte nodig? Koppel extra berichten aan elkaar: het hulpmiddel hierboven splitst het surplus automatisch op in genummerde antwoorden." },
        { q: "Tellen links anders op Threads dan op X?", a: "Ja. Anders dan X, dat elke link tot 23 tekens terugbrengt, telt Threads de volledige zichtbare URL mee voor je 500. Een lange link kan een groot deel van je ruimte opslokken, dus kort hem eerst in." },
        { q: "Hoe plaats ik iets dat langer is dan 500 tekens?", a: "Voeg het toe als gekoppeld antwoord onder je oorspronkelijke bericht. Plak je volledige concept in de editor hierboven en die splitst de tekst op in segmenten van 500 tekens op natuurlijke zinsgrenzen." },
        { q: "Tellen emoji en regeleinden mee voor de limiet van 500?", a: "Ja — emoji, spaties en regeleinden tellen allemaal mee. Threads geeft je minder ruimte dan het lijkt, dus de live teller voorkomt dat je midden in een gedachte wordt afgekapt." },
      ],
      ja: [
        { q: "Threadsの文字数制限は？", a: "Threadsの各投稿は500文字までです。もっとスペースが必要なら、投稿を連結しましょう。上のツールが超過分を自動で番号付きの返信に分割します。" },
        { q: "リンクはThreadsとXで数え方が違いますか？", a: "はい。すべてのリンクを23文字に短縮するXとは異なり、Threadsは表示されるURL全体を500文字に算入します。長いリンクは文字数を大きく消費するので、先に短縮しましょう。" },
        { q: "500文字を超える投稿はどうすればできますか？", a: "元の投稿の下に連結した返信として追加します。上のエディターに全文を貼り付けると、自然な文の区切りで500文字ごとのセグメントに分割します。" },
        { q: "絵文字や改行は500文字の上限に含まれますか？", a: "はい。絵文字・スペース・改行はすべてカウントされます。Threadsは見た目より余裕がないため、リアルタイムのカウンターが考えの途中で切れるのを防ぎます。" },
      ],
      zh: [
        { q: "Threads 的字符上限是多少？", a: "Threads 每条帖子上限为 500 字符。需要更多空间？把多条帖子连缀起来——上方工具会将超出内容自动拆分为编号回复。" },
        { q: "链接在 Threads 和 X 上的计数方式不同吗？", a: "不同。与把每个链接都缩为 23 字符的 X 不同，Threads 会按可见的完整 URL 计入你的 500 字符。长链接会占用很大一部分空间，所以先缩短它。" },
        { q: "怎样才能发布超过 500 字符的内容？", a: "把它作为连缀回复添加在原帖下方。把完整草稿粘贴到上方编辑器，它会在自然句子边界处将文本拆分为 500 字符的片段。" },
        { q: "表情符号和换行会计入 500 上限吗？", a: "会——表情符号、空格和换行都计入。Threads 的可用空间比看上去少，因此实时计数器能防止你在表达到一半时被截断。" },
      ],
      da: [
        { q: "Hvad er tegngrænsen på Threads?", a: "Hvert Threads-opslag er begrænset til 500 tegn. Brug for mere plads? Kæd flere opslag sammen — værktøjet ovenfor deler automatisk overskuddet op i nummererede svar." },
        { q: "Tæller links anderledes på Threads end på X?", a: "Ja. I modsætning til X, der reducerer hvert link til 23 tegn, tæller Threads hele den synlige URL med i dine 500. Et langt link kan bruge en stor del af din plads, så forkort det først." },
        { q: "Hvordan poster jeg noget længere end 500 tegn?", a: "Tilføj det som et kædet svar under dit oprindelige opslag. Indsæt hele dit udkast i editoren ovenfor, og den deler teksten op i 500-tegns-segmenter ved naturlige sætningsgrænser." },
        { q: "Tæller emoji og linjeskift med i grænsen på 500?", a: "Ja — emoji, mellemrum og linjeskift tæller alle med. Threads giver dig mindre plads, end det ser ud til, så live-tælleren forhindrer, at du bliver skåret af midt i en tanke." },
      ],
    },

    content: {
      en: `<h2>Threads' 500-character limit: nearly double X's ceiling</h2>
<p>Threads gives you <strong>500 characters per post</strong> — almost twice the 280-character limit on X/Twitter. That extra room changes how you write. You have enough space to make an argument with supporting detail, share a short story with a proper arc, or pose a question with context that earns a thoughtful reply. You don't have to cut the nuance.</p>
<p>PostTruncate's <strong>Threads character counter</strong> updates in real time as you type, showing your current count against the 500-character ceiling with a colour-coded indicator that turns amber near the limit and red the moment you exceed it. No more pasting into the app only to discover you're 12 characters over.</p>

<h2>Links on Threads count in full — unlike X</h2>
<p>This is where Threads diverges most sharply from X in a way that catches writers off guard. On X, every URL you paste is wrapped by the t.co shortener and counts as a flat <strong>23 characters</strong>, regardless of how long the actual link is. On <strong>Threads, links count at their full character length</strong>.</p>
<p>Paste a 75-character URL into a Threads post and you've used 75 of your 500 characters — not 23. Add two links and you might have burned through 150 characters before writing a single word of content. Writers who habitually draft on X and then copy to Threads are regularly surprised by posts that look fine in one editor and overflow in the other.</p>
<p>PostTruncate applies the correct per-platform link counting logic. Switch between platforms in the editor and the character count updates to reflect the actual rules of each network, not a generic approximation.</p>

<h2>Chains: how Threads handles overflow</h2>
<p>When a piece of writing exceeds 500 characters, Threads doesn't block you from posting — it lets you <strong>chain posts together as a reply sequence</strong>. Post 1 appears in the feed; Posts 2, 3, and beyond appear as threaded replies visible to anyone who taps into the chain. This works well for structured content: a numbered argument, a how-to guide, or a story told in stages.</p>
<p>The critical constraint is that <strong>the first post carries all the feed impression weight</strong>. Posts 2 through N are only visible to users who specifically engage with Post 1. If your hook is buried in Post 3, most of your audience will never see it. Every chain should be written so that Post 1 stands completely alone as a compelling statement — the rest of the chain rewards readers who want more, not readers who need it to understand the first post.</p>
<p>PostTruncate's chain splitter divides your full draft into 500-character segments automatically, numbering each post and breaking at sentence boundaries where possible. You can review every post in the chain before copying them to Threads.</p>

<h2>Writing for the Threads feed</h2>
<p>Threads rewards <strong>conversational, direct writing</strong> over polished broadcast copy. The platform's reply culture means strong posts generate reply chains of their own — your first post doesn't just need to say something, it needs to invite a response. Ending the first post with a genuine question or a stated opinion that readers can push back on is consistently more effective than ending with a call to action.</p>
<p>Use PostTruncate to draft, count, chain, and optimise your Threads posts before you publish — all without toggling between apps.</p>`,

      es: `<h2>El límite de 500 caracteres de Threads: casi el doble que X</h2>
<p>Threads te da <strong>500 caracteres por publicación</strong>, casi el doble del límite de 280 caracteres de X/Twitter. Ese espacio adicional cambia la forma de escribir. Tienes suficiente espacio para construir un argumento con detalle de apoyo, contar una historia breve con un arco narrativo real o plantear una pregunta con contexto que invite a una respuesta reflexiva. No tienes que eliminar los matices.</p>
<p>El <strong>contador de caracteres para Threads</strong> de PostTruncate se actualiza en tiempo real mientras escribes, mostrando tu recuento actual frente al límite de 500 caracteres con un indicador codificado por colores que se vuelve ámbar cerca del límite y rojo en el momento en que lo superas.</p>

<h2>Los enlaces en Threads se cuentan por completo — a diferencia de X</h2>
<p>Aquí es donde Threads se diferencia más claramente de X de una manera que sorprende a los escritores. En X, cada URL que pegas es envuelta por el acortador t.co y cuenta como <strong>23 caracteres fijos</strong>, independientemente de la longitud real del enlace. En <strong>Threads, los enlaces cuentan con su longitud completa de caracteres</strong>.</p>
<p>Pega una URL de 75 caracteres en una publicación de Threads y habrás usado 75 de tus 500 caracteres, no 23. Añade dos enlaces y es posible que hayas consumido 150 caracteres antes de escribir una sola palabra de contenido. Los escritores que habitualmente redactan en X y luego copian a Threads se sorprenden con frecuencia al ver publicaciones que parecen bien en un editor y se desbordan en el otro.</p>
<p>PostTruncate aplica la lógica correcta de conteo de enlaces por plataforma. Cambia entre plataformas en el editor y el recuento de caracteres se actualiza para reflejar las reglas reales de cada red.</p>

<h2>Cadenas: cómo Threads gestiona el desbordamiento</h2>
<p>Cuando un texto supera los 500 caracteres, Threads no te bloquea la publicación: te permite <strong>encadenar publicaciones como una secuencia de respuestas</strong>. La publicación 1 aparece en el feed; las publicaciones 2, 3 y siguientes aparecen como respuestas en hilo visibles para cualquiera que acceda a la cadena. Esto funciona bien para contenido estructurado: un argumento numerado, una guía paso a paso o una historia contada en etapas.</p>
<p>La restricción crítica es que <strong>la primera publicación acumula todo el peso de las impresiones en el feed</strong>. Las publicaciones 2 en adelante solo son visibles para los usuarios que interactúan específicamente con la publicación 1. Cada cadena debe escribirse de modo que la publicación 1 se sostenga completamente sola como una afirmación convincente.</p>
<p>El divisor de cadenas de PostTruncate divide tu borrador completo en segmentos de 500 caracteres automáticamente, numerando cada publicación y cortando en los límites de las oraciones siempre que sea posible.</p>

<h2>Escribir para el feed de Threads</h2>
<p>Threads recompensa la escritura <strong>conversacional y directa</strong> frente al texto de difusión pulido. Terminar la primera publicación con una pregunta genuina o una opinión declarada sobre la que los lectores puedan opinar es consistentemente más efectivo que terminar con una llamada a la acción.</p>`,

      de: `<h2>Threads' 500-Zeichen-Limit: fast doppelt so viel wie X</h2>
<p>Threads gibt dir <strong>500 Zeichen pro Beitrag</strong> — fast doppelt so viel wie das 280-Zeichen-Limit auf X/Twitter. Dieser zusätzliche Raum verändert die Art, wie du schreibst. Du hast genug Platz, um ein Argument mit unterstützenden Details zu entwickeln, eine kurze Geschichte mit echtem Bogen zu erzählen oder eine Frage mit Kontext zu stellen, die eine durchdachte Antwort verdient. Du musst die Nuancen nicht streichen.</p>
<p>PostTruncates <strong>Threads-Zeichenzähler</strong> aktualisiert sich in Echtzeit während du tippst und zeigt deinen aktuellen Stand gegenüber dem 500-Zeichen-Limit mit einem farbkodierten Indikator, der kurz vor dem Limit gelb und im Moment des Überschreitens rot wird.</p>

<h2>Links auf Threads zählen vollständig — anders als bei X</h2>
<p>Hier unterscheidet sich Threads am deutlichsten von X — auf eine Art, die Schreibende regelmäßig überrascht. Bei X wird jede eingefügte URL vom t.co-Shortener erfasst und zählt pauschal als <strong>23 Zeichen</strong>, unabhängig von der tatsächlichen Länge des Links. Bei <strong>Threads zählen Links in ihrer vollen Zeichenlänge</strong>.</p>
<p>Füge eine 75-Zeichen-URL in einen Threads-Beitrag ein und du hast 75 deiner 500 Zeichen verbraucht — nicht 23. Ergänze zwei Links und du hast möglicherweise 150 Zeichen aufgebraucht, bevor du ein einziges Wort Inhalt geschrieben hast. Wer gewohnheitsmäßig auf X entwirft und dann zu Threads kopiert, erlebt regelmäßig, dass Beiträge im einen Editor passen und im anderen überlaufen.</p>
<p>PostTruncate wendet die korrekte plattformspezifische Link-Zähllogik an. Wechsle zwischen Plattformen im Editor und die Zeichenzahl aktualisiert sich entsprechend den tatsächlichen Regeln des jeweiligen Netzwerks.</p>

<h2>Ketten: Wie Threads mit Überlauf umgeht</h2>
<p>Wenn ein Text 500 Zeichen überschreitet, blockiert Threads dich nicht — es ermöglicht dir, <strong>Beiträge als Antwortsequenz zu verketten</strong>. Beitrag 1 erscheint im Feed; Beiträge 2, 3 und folgende erscheinen als Thread-Antworten, die für jeden sichtbar sind, der in die Kette eintaucht. Das funktioniert gut für strukturierte Inhalte: ein nummeriertes Argument, eine Schritt-für-Schritt-Anleitung oder eine Geschichte in Etappen.</p>
<p>Die entscheidende Einschränkung ist, dass <strong>der erste Beitrag das gesamte Gewicht der Feed-Impressionen trägt</strong>. Beiträge 2 bis N sind nur für Nutzerinnen und Nutzer sichtbar, die konkret mit Beitrag 1 interagieren. Jede Kette sollte so geschrieben sein, dass Beitrag 1 als überzeugende Aussage völlig alleine steht.</p>
<p>PostTruncates Ketten-Splitter unterteilt deinen vollständigen Entwurf automatisch in 500-Zeichen-Segmente, nummeriert jeden Beitrag und trennt nach Möglichkeit an Satzgrenzen.</p>

<h2>Für den Threads-Feed schreiben</h2>
<p>Threads belohnt <strong>gesprächiges, direktes Schreiben</strong> gegenüber poliertem Broadcast-Text. Den ersten Beitrag mit einer echten Frage oder einer formulierten Meinung zu beenden, über die Lesende diskutieren können, ist konsequent effektiver als mit einem Call-to-Action zu enden.</p>`,

      fr: `<h2>La limite de 500 caractères de Threads : presque le double de X</h2>
<p>Threads vous donne <strong>500 caractères par publication</strong> — presque le double de la limite de 280 caractères de X/Twitter. Cet espace supplémentaire change la façon d'écrire. Vous avez assez de place pour construire un argument avec des détails, raconter une courte histoire avec un vrai arc narratif ou poser une question avec du contexte qui mérite une réponse réfléchie. Vous n'avez pas à sacrifier les nuances.</p>
<p>Le <strong>compteur de caractères Threads</strong> de PostTruncate se met à jour en temps réel pendant que vous tapez, affichant votre compte actuel par rapport au plafond de 500 caractères avec un indicateur coloré qui devient orange près de la limite et rouge dès que vous la dépassez.</p>

<h2>Les liens sur Threads sont comptés en entier — contrairement à X</h2>
<p>C'est là que Threads diverge le plus nettement de X d'une façon qui surprend les rédacteurs. Sur X, chaque URL collée est encapsulée par le raccourcisseur t.co et compte comme <strong>23 caractères fixes</strong>, quelle que soit la longueur réelle du lien. Sur <strong>Threads, les liens comptent à leur longueur complète de caractères</strong>.</p>
<p>Collez une URL de 75 caractères dans une publication Threads et vous avez utilisé 75 de vos 500 caractères — pas 23. Ajoutez deux liens et vous avez peut-être consommé 150 caractères avant d'écrire un seul mot de contenu. Les rédacteurs qui rédigent habituellement sur X puis copient vers Threads sont régulièrement surpris par des publications qui semblent correctes dans un éditeur et débordent dans l'autre.</p>
<p>PostTruncate applique la logique de comptage des liens correcte par plateforme. Changez de plateforme dans l'éditeur et le nombre de caractères se met à jour pour refléter les règles réelles de chaque réseau.</p>

<h2>Les chaînes : comment Threads gère le débordement</h2>
<p>Lorsqu'un texte dépasse 500 caractères, Threads ne vous bloque pas — il vous permet de <strong>chaîner des publications comme une séquence de réponses</strong>. La publication 1 apparaît dans le fil ; les publications 2, 3 et suivantes apparaissent comme des réponses en fil visibles par quiconque explore la chaîne. Cela fonctionne bien pour du contenu structuré : un argument numéroté, un guide pas à pas ou une histoire racontée par étapes.</p>
<p>La contrainte critique est que <strong>la première publication porte tout le poids des impressions du fil</strong>. Les publications 2 à N ne sont visibles que pour les utilisateurs qui interagissent spécifiquement avec la publication 1. Chaque chaîne doit être écrite de sorte que la publication 1 se tienne complètement seule comme une déclaration convaincante.</p>
<p>Le diviseur de chaînes de PostTruncate divise automatiquement votre brouillon complet en segments de 500 caractères, numérote chaque publication et coupe aux limites des phrases dans la mesure du possible.</p>

<h2>Écrire pour le fil Threads</h2>
<p>Threads récompense l'écriture <strong>conversationnelle et directe</strong> plutôt que le texte de diffusion soigné. Terminer la première publication avec une vraie question ou une opinion affirmée sur laquelle les lecteurs peuvent réagir est systématiquement plus efficace que de terminer par un appel à l'action.</p>`,

      pt: `<h2>O limite de 500 caracteres do Threads: quase o dobro do X</h2>
<p>O Threads oferece <strong>500 caracteres por publicação</strong> — quase o dobro do limite de 280 caracteres do X/Twitter. Esse espaço extra muda a forma de escrever. Você tem espaço suficiente para construir um argumento com detalhes de apoio, contar uma história curta com um arco narrativo real ou fazer uma pergunta com contexto que mereça uma resposta cuidadosa. Você não precisa cortar as nuances.</p>
<p>O <strong>contador de caracteres para Threads</strong> do PostTruncate é atualizado em tempo real enquanto você digita, mostrando sua contagem atual em relação ao teto de 500 caracteres com um indicador codificado por cores que fica âmbar perto do limite e vermelho no momento em que você o ultrapassa.</p>

<h2>Links no Threads contam por completo — diferente do X</h2>
<p>É aqui que o Threads diverge mais claramente do X de uma forma que pega os escritores de surpresa. No X, cada URL colada é envolvida pelo encurtador t.co e conta como <strong>23 caracteres fixos</strong>, independentemente do tamanho real do link. No <strong>Threads, os links contam com seu comprimento total de caracteres</strong>.</p>
<p>Cole uma URL de 75 caracteres em uma publicação do Threads e você usou 75 dos seus 500 caracteres — não 23. Adicione dois links e pode ter consumido 150 caracteres antes de escrever uma única palavra de conteúdo. Escritores que costumam redigir no X e depois copiam para o Threads ficam regularmente surpresos com publicações que parecem corretas em um editor e ultrapassam o limite no outro.</p>
<p>O PostTruncate aplica a lógica correta de contagem de links por plataforma. Troque de plataforma no editor e a contagem de caracteres se atualiza para refletir as regras reais de cada rede.</p>

<h2>Encadeamentos: como o Threads trata o overflow</h2>
<p>Quando um texto excede 500 caracteres, o Threads não bloqueia a publicação — ele permite <strong>encadear publicações como uma sequência de respostas</strong>. A publicação 1 aparece no feed; as publicações 2, 3 e seguintes aparecem como respostas encadeadas visíveis para qualquer pessoa que entre no encadeamento. Isso funciona bem para conteúdo estruturado: um argumento numerado, um guia passo a passo ou uma história contada em etapas.</p>
<p>A restrição crítica é que <strong>a primeira publicação carrega todo o peso das impressões no feed</strong>. As publicações 2 em diante são visíveis apenas para os usuários que interagem especificamente com a publicação 1. Cada encadeamento deve ser escrito de modo que a publicação 1 se sustente completamente sozinha como uma declaração convincente.</p>
<p>O divisor de encadeamentos do PostTruncate divide seu rascunho completo em segmentos de 500 caracteres automaticamente, numerando cada publicação e cortando nos limites de frases sempre que possível.</p>

<h2>Escrever para o feed do Threads</h2>
<p>O Threads recompensa a escrita <strong>conversacional e direta</strong> em vez de texto de transmissão polido. Terminar a primeira publicação com uma pergunta genuína ou uma opinião declarada sobre a qual os leitores possam se posicionar é consistentemente mais eficaz do que terminar com uma chamada para ação.</p>`,

      it: `<h2>Il limite di 500 caratteri di Threads: quasi il doppio di X</h2>
<p>Threads ti dà <strong>500 caratteri per post</strong> — quasi il doppio del limite di 280 caratteri di X/Twitter. Questo spazio aggiuntivo cambia il modo in cui scrivi. Hai abbastanza spazio per costruire un argomento con dettagli di supporto, raccontare una breve storia con un arco narrativo vero o porre una domanda con contesto che meriti una risposta ponderata. Non devi tagliare le sfumature.</p>
<p>Il <strong>contatore di caratteri per Threads</strong> di PostTruncate si aggiorna in tempo reale mentre scrivi, mostrando il tuo conteggio attuale rispetto al limite di 500 caratteri con un indicatore colorato che diventa ambra vicino al limite e rosso nel momento in cui lo superi.</p>

<h2>I link su Threads contano per intero — a differenza di X</h2>
<p>Qui Threads si discosta più nettamente da X in un modo che sorprende i redattori. Su X, ogni URL incollata viene avvolta dall'abbreviatore t.co e conta come <strong>23 caratteri fissi</strong>, indipendentemente dalla lunghezza effettiva del link. Su <strong>Threads, i link contano per la loro lunghezza completa di caratteri</strong>.</p>
<p>Incolla un URL di 75 caratteri in un post Threads e hai usato 75 dei tuoi 500 caratteri — non 23. Aggiungi due link e potresti aver consumato 150 caratteri prima di scrivere una singola parola di contenuto. I redattori che abitualmente scrivono su X e poi copiano su Threads sono regolarmente sorpresi da post che sembrano corretti in un editor e che tracimano nell'altro.</p>
<p>PostTruncate applica la logica di conteggio dei link corretta per ciascuna piattaforma. Passa da una piattaforma all'altra nell'editor e il conteggio dei caratteri si aggiorna per riflettere le regole reali di ogni rete.</p>

<h2>Catene: come Threads gestisce l'overflow</h2>
<p>Quando un testo supera i 500 caratteri, Threads non ti blocca — ti permette di <strong>concatenare post come una sequenza di risposte</strong>. Il post 1 appare nel feed; i post 2, 3 e seguenti appaiono come risposte in thread visibili a chiunque entri nella catena. Questo funziona bene per contenuti strutturati: un argomento numerato, una guida passo a passo o una storia raccontata a tappe.</p>
<p>Il vincolo critico è che <strong>il primo post porta tutto il peso delle impressioni del feed</strong>. I post da 2 in poi sono visibili solo agli utenti che interagiscono specificamente con il post 1. Ogni catena dovrebbe essere scritta in modo che il post 1 regga completamente da solo come un'affermazione convincente.</p>
<p>Il divisore di catene di PostTruncate divide automaticamente la tua bozza completa in segmenti di 500 caratteri, numerando ogni post e interrompendo ai confini delle frasi ove possibile.</p>

<h2>Scrivere per il feed di Threads</h2>
<p>Threads premia la scrittura <strong>colloquiale e diretta</strong> rispetto al testo di trasmissione curato. Concludere il primo post con una domanda genuina o un'opinione dichiarata su cui i lettori possano esprimersi è sistematicamente più efficace che concludere con una call to action.</p>`,

      nl: `<h2>Threads' 500-tekenlimiet: bijna het dubbele van X</h2>
<p>Threads geeft je <strong>500 tekens per bericht</strong> — bijna het dubbele van de 280-tekenlimiet van X/Twitter. Die extra ruimte verandert hoe je schrijft. Je hebt genoeg ruimte om een argument met ondersteunende details te maken, een kort verhaal met een echte boog te vertellen of een vraag met context te stellen die een doordacht antwoord verdient. Je hoeft de nuance niet te schrappen.</p>
<p>PostTruncates <strong>Threads-tekenteller</strong> werkt in real time terwijl je typt en toont je huidige telling ten opzichte van het plafond van 500 tekens met een kleurgecodeerde indicator die oranje wordt in de buurt van de limiet en rood zodra je die overschrijdt.</p>

<h2>Links op Threads tellen volledig mee — anders dan op X</h2>
<p>Hier wijkt Threads het meest van X af op een manier die schrijvers regelmatig verrast. Op X wordt elke geplakte URL omhuld door de t.co-verkorter en telt als een vaste <strong>23 tekens</strong>, ongeacht de werkelijke lengte van de link. Op <strong>Threads tellen links voor hun volledige tekenlengtemee</strong>.</p>
<p>Plak een URL van 75 tekens in een Threads-bericht en je hebt 75 van je 500 tekens gebruikt — niet 23. Voeg twee links toe en je hebt misschien 150 tekens verbruikt voordat je een enkel woord inhoud hebt geschreven. Schrijvers die gewoonlijk op X ontwerpen en dan naar Threads kopiëren, zijn regelmatig verrast door berichten die er in de ene editor goed uitzien en in de andere overlopen.</p>
<p>PostTruncate past de juiste platformspecifieke linktellingslogica toe. Wissel van platform in de editor en het aantal tekens wordt bijgewerkt om de werkelijke regels van elk netwerk te weerspiegelen.</p>

<h2>Ketens: hoe Threads met overflow omgaat</h2>
<p>Wanneer een tekst 500 tekens overschrijdt, blokkeert Threads je niet — het laat je <strong>berichten samenvoegen als een antwoordsequentie</strong>. Bericht 1 verschijnt in de feed; berichten 2, 3 en verder verschijnen als geneste antwoorden die zichtbaar zijn voor iedereen die in de keten tikt. Dit werkt goed voor gestructureerde inhoud: een genummerd argument, een stap-voor-stap-gids of een verhaal in etappes verteld.</p>
<p>De cruciale beperking is dat <strong>het eerste bericht al het gewicht van de feed-impressies draagt</strong>. Berichten 2 tot N zijn alleen zichtbaar voor gebruikers die specifiek met bericht 1 interageren. Elke keten moet zo zijn geschreven dat bericht 1 volledig alleen staat als een overtuigende uitspraak.</p>
<p>PostTruncates ketensplitter verdeelt je volledige concept automatisch in segmenten van 500 tekens, nummert elk bericht en breekt waar mogelijk bij zinsgrenzen.</p>

<h2>Schrijven voor de Threads-feed</h2>
<p>Threads beloont <strong>conversationeel, direct schrijven</strong> boven gepolijste broadcast-tekst. Het eerste bericht eindigen met een echte vraag of een uitgesproken mening waarop lezers kunnen reageren, is consistent effectiever dan eindigen met een call-to-action.</p>`,

      ja: `<h2>Threadsの500文字制限：Xのほぼ2倍のスペース</h2>
<p>Threadsでは1投稿あたり<strong>500文字</strong>まで使えます——X/Twitterの280文字制限のほぼ2倍です。この余裕が文章の書き方を変えます。補足的な詳細を添えた論拠を展開したり、起承転結のある短い話を書いたり、深い返信を引き出す文脈付きの問いを立てたりするのに十分なスペースがあります。ニュアンスをカットする必要はありません。</p>
<p>PostTruncateの<strong>Threads文字数カウンター</strong>は入力中にリアルタイムで更新され、500文字の上限に対する現在の文字数をカラーコードのインジケーターで表示します。制限に近づくとオレンジ色になり、超えた瞬間に赤色に変わります。</p>

<h2>Threadsのリンクはフルカウント——Xとはここが違う</h2>
<p>これがThreadsとXの最も大きな違いの一つで、多くのライターが驚くポイントです。Xでは、貼り付けたURLはすべてt.co短縮サービスによって処理され、実際のリンクの長さに関わらず一律<strong>23文字</strong>としてカウントされます。一方<strong>Threadsでは、リンクの実際の文字数がそのままカウントされます</strong>。</p>
<p>75文字のURLをThreadsの投稿に貼り付けると、500文字のうち75文字が消費されます——23文字ではありません。2つのリンクを追加すると、コンテンツを1文字も書く前に150文字を使い切ってしまう可能性があります。XでコピーしてからThreadsに貼り付けることに慣れているライターが、片方のエディターでは問題なくもう片方ではオーバーしているという状況に頻繁に驚かされます。</p>
<p>PostTruncateはプラットフォームごとに正しいリンクカウントロジックを適用します。エディターでプラットフォームを切り替えると、各ネットワークの実際のルールを反映した文字数が表示されます。</p>

<h2>連鎖投稿：Threadsのオーバーフロー処理</h2>
<p>投稿が500文字を超えても、Threadsは投稿をブロックしません。<strong>投稿をリプライシーケンスとして連結できます</strong>。投稿1がフィードに表示され、投稿2以降は連鎖のタップで見られるスレッドリプライとして表示されます。番号付きの論点、手順ガイド、段階的なストーリーなど、構造化されたコンテンツに適しています。</p>
<p>重要な制約は<strong>投稿1がフィードの全インプレッションを担う</strong>という点です。投稿2以降は、投稿1に具体的にエンゲージメントしたユーザーにのみ表示されます。フックが投稿3に埋まっていたら、ほとんどの読者はそこまで到達しません。連鎖の投稿1は、それ単独で完結した説得力のある内容として成立するように書く必要があります。</p>
<p>PostTruncateの連鎖分割機能は全文を自動的に500文字のセグメントに分割し、各投稿に番号を付け、可能な限り文の区切りで分割します。Threadsにコピーする前に各投稿を確認できます。</p>

<h2>Threadsフィードのための文章作法</h2>
<p>Threadsは洗練されたブロードキャスト型の文章より<strong>会話的で直接的な文章</strong>を評価します。最初の投稿を本物の質問や読者が反論できる意見で締めくくるほうが、行動喚起で締めくくるよりも一貫して高い効果を発揮します。</p>`,

      zh: `<h2>Threads的500字符限制：几乎是X的两倍</h2>
<p>Threads每篇帖子提供<strong>500个字符</strong>——几乎是X/Twitter 280字符限制的两倍。这额外的空间改变了写作方式。你有足够的空间用支撑性细节构建一个论点，讲述一个有完整弧度的短故事，或提出一个带有背景的问题来引发深思的回复。你不必削减细节和层次。</p>
<p>PostTruncate的<strong>Threads字符计数器</strong>在你输入时实时更新，用颜色编码的指示器显示当前字符数与500字符上限的关系——接近上限时变为橙色，超过时立即变红。</p>

<h2>Threads的链接按完整长度计入——与X不同</h2>
<p>这是Threads与X最显著的区别之一，也是经常让创作者措手不及的地方。在X上，每个粘贴的链接都由t.co短链接服务处理，无论实际链接有多长，一律计为<strong>23个字符</strong>。而在<strong>Threads上，链接按其实际字符长度完整计入</strong>。</p>
<p>将一个75字符的链接粘贴到Threads帖子中，你已经使用了500个字符中的75个——而不是23个。添加两个链接，你可能在写下一个字的内容之前就已经消耗了150个字符。习惯在X上起草然后复制到Threads的创作者，经常遇到在一个编辑器里显示正常、在另一个编辑器里超出限制的情况。</p>
<p>PostTruncate为每个平台应用正确的链接计数逻辑。在编辑器中切换平台，字符数会自动更新，反映每个网络的实际规则。</p>

<h2>连锁帖：Threads如何处理超出内容</h2>
<p>当内容超过500个字符时，Threads不会阻止你发帖——它允许你<strong>将帖子链接为回复序列</strong>。第1帖出现在信息流中；第2、3帖及之后的帖子以连锁回复的形式出现，点击进入连锁的用户可以看到。这对于结构化内容效果良好：编号论点、操作指南或分阶段讲述的故事。</p>
<p>关键限制是<strong>第1帖承载了信息流的全部曝光权重</strong>。第2帖及之后的内容只对与第1帖产生具体互动的用户可见。如果钩子埋在第3帖，大多数读者永远不会看到它。每个连锁帖都应该让第1帖作为一个令人信服的独立陈述完整呈现。</p>
<p>PostTruncate的连锁分割功能自动将完整草稿分割为500字符的段落，为每帖编号，并尽可能在句子边界处分割。复制到Threads之前可以预览每一帖。</p>

<h2>为Threads信息流写作</h2>
<p>Threads青睐<strong>对话式、直接的写作</strong>，而非经过精心打磨的广播式文案。用真正的问题或读者可以表达不同意见的观点结束第1帖，始终比以行动号召结束更有效。</p>`,

      da: `<h2>Threads' 500-tegn-grænse: næsten det dobbelte af X</h2>
<p>Threads giver dig <strong>500 tegn per opslag</strong> — næsten det dobbelte af X/Twitters 280-tegns-grænse. Den ekstra plads ændrer måden du skriver på. Du har nok plads til at bygge et argument med understøttende detaljer, fortælle en kort historie med et rigtigt forløb eller stille et spørgsmål med kontekst, der fortjener et gennemtænkt svar. Du behøver ikke at skære nuancerne væk.</p>
<p>PostTruncates <strong>Threads-tegntæller</strong> opdateres i realtid mens du skriver og viser dit aktuelle antal i forhold til 500-tegns-loftet med en farvekoderet indikator der bliver gul nær grænsen og rød i det øjeblik du overskrider den.</p>

<h2>Links på Threads tæller fuldt ud — i modsætning til X</h2>
<p>Her adskiller Threads sig mest markant fra X på en måde der overrasker skribenter. På X pakkes enhver indsat URL ind af t.co-forkorteren og tæller som faste <strong>23 tegn</strong>, uanset linkenes faktiske længde. På <strong>Threads tæller links med deres fulde tegnlængde</strong>.</p>
<p>Indsæt en URL på 75 tegn i et Threads-opslag, og du har brugt 75 af dine 500 tegn — ikke 23. Tilføj to links, og du har måske brugt 150 tegn inden du har skrevet et eneste ord indhold. Skribenter der sædvanligvis skriver på X og derefter kopierer til Threads, overraskes regelmæssigt af opslag der ser fine ud i én editor og flyder over i den anden.</p>
<p>PostTruncate anvender den korrekte platformsspecifikke linkoptællingslogik. Skift platform i editoren og tegntallet opdateres for at afspejle de faktiske regler for hvert netværk.</p>

<h2>Kæder: hvordan Threads håndterer overflow</h2>
<p>Når et tekststykke overskrider 500 tegn, blokerer Threads dig ikke — det lader dig <strong>kæde opslag sammen som en svars-sekvens</strong>. Opslag 1 vises i feedet; opslag 2, 3 og frem vises som trådede svar der er synlige for alle der tapper ind i kæden. Det fungerer godt til struktureret indhold: et nummereret argument, en trin-for-trin-guide eller en historie fortalt i etaper.</p>
<p>Den kritiske begrænsning er at <strong>det første opslag bærer al feed-impressionsvægt</strong>. Opslag 2 til N er kun synlige for brugere der specifikt engagerer sig med opslag 1. Hvert kæde-opslag bør skrives så opslag 1 står helt alene som en overbevisende udtalelse.</p>
<p>PostTruncates kæde-splitter opdeler automatisk dit fulde udkast i segmenter på 500 tegn, nummererer hvert opslag og bryder ved sætningsgrænser hvor det er muligt.</p>

<h2>At skrive til Threads-feedet</h2>
<p>Threads belønner <strong>samtaleorienteret, direkte skrivning</strong> frem for poleret broadcast-tekst. At afslutte det første opslag med et ægte spørgsmål eller en udtalt holdning som læsere kan sætte spørgsmålstegn ved, er konsekvent mere effektivt end at afslutte med en opfordring til handling.</p>`,
    },
  },
];
