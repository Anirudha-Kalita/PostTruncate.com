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
  /** locale → tool name used in WebApplication JSON-LD schema */
  schemaName: Record<string, string>;
  /** Plain English description of platform character/word limits — used as a shared reference when authoring content. Not rendered directly. */
  platformLimits: string;
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
      en: 'Twitter Character Counter — Count X / Twitter Chars Free',
      es: 'Contador de Caracteres para Twitter — Cuenta tus tweets gratis',
      de: 'Twitter Zeichenzähler — X / Twitter Zeichen zählen kostenlos',
      fr: 'Compteur de Caractères Twitter — Comptez vos tweets gratuitement',
      pt: 'Contador de Caracteres do Twitter — Conte seus tweets grátis',
      it: 'Contatore di Caratteri Twitter — Conta i caratteri di X gratis',
      nl: 'Twitter Tekenteller — Tel je X / Twitter tekens gratis',
      ja: 'Twitter文字数カウンター — X/Twitterの文字数を無料でチェック',
      zh: 'Twitter字符计数器 — 免费统计X/Twitter字符数',
      da: 'Twitter Tegntæller — Tæl X / Twitter tegn gratis',
    },

    metaDescriptions: {
      en: 'Free Twitter character counter. See exactly how many characters your tweet uses, how links count as 23 chars, and split long posts into threads automatically.',
      es: 'Contador de caracteres para Twitter gratis. Comprueba cuántos caracteres tiene tu tweet, cómo los enlaces cuentan como 23 caracteres y divide textos largos en hilos.',
      de: 'Kostenloser Twitter-Zeichenzähler. Zeigt auf einen Blick, wie viele Zeichen dein Tweet hat, warum Links immer 23 Zeichen zählen und wie du Threads erstellst.',
      fr: 'Compteur de caractères Twitter gratuit. Vérifiez combien de caractères contient votre tweet, pourquoi les liens comptent 23 caractères et divisez vos longs textes en fils.',
      pt: 'Contador de caracteres para Twitter gratuito. Veja quantos caracteres seu tweet usa, como links contam como 23 caracteres e divida textos longos em threads.',
      it: 'Contatore di caratteri Twitter gratuito. Controlla quanti caratteri ha il tuo tweet, come i link contano 23 caratteri e dividi i testi lunghi in thread.',
      nl: 'Gratis Twitter tekenteller. Zie precies hoeveel tekens je tweet gebruikt, waarom links altijd 23 tekens tellen en splits lange berichten automatisch op in threads.',
      ja: 'Twitterの文字数を無料でリアルタイムカウント。ツイートの文字数、リンクが23文字にカウントされる仕組み、スレッドへの自動分割機能を確認できます。',
      zh: '免费Twitter字符计数器。实时查看推文字符数，了解链接固定计为23个字符的规则，并将长文本自动拆分为推文串。',
      da: 'Gratis Twitter tegntæller. Se præcis hvor mange tegn dit tweet bruger, hvorfor links altid tæller som 23 tegn, og opdel lange tekster i tråde automatisk.',
    },

    content: {
      en: `<h2>The 280-character limit explained</h2>
<p>Every tweet on <strong>X (formerly Twitter)</strong> is capped at <strong>280 characters</strong>. That ceiling covers letters, spaces, punctuation, emoji, and line breaks — everything visible in the compose box. Hit 281 and the platform simply won't let you post. Knowing exactly where you stand before you hit send is the difference between a clean publish and a last-second scramble to cut words.</p>
<p>PostTruncate's <strong>Twitter character counter</strong> updates in real time as you type. A colour-coded meter shows your remaining budget at a glance, turning amber as you approach the limit and red the moment you go over. No more counting on your fingers or pasting into the native app just to check.</p>

<h2>Why links always count as 23 characters</h2>
<p>Here's the rule that trips up almost everyone: <strong>every URL you paste into a tweet — no matter how short or long — is wrapped by Twitter's t.co shortener and counts as exactly 23 characters</strong>. A two-character link and a 200-character link eat the same 23 characters from your budget. This is true even if the URL never appears shortened in the published tweet.</p>
<p>PostTruncate applies the same weighted-length calculation that Twitter's own API uses, so the character count you see here matches exactly what the platform accepts. Paste three links into your draft and the counter deducts 69 characters automatically — no guesswork required.</p>

<h2>Threads: when one tweet isn't enough</h2>
<p>Long-form ideas don't have to be crushed into 280 characters. Twitter threads let you chain multiple tweets together, published as a connected sequence under your handle. There is no hard limit on thread length — you can go as long as the idea demands.</p>
<p>The challenge is splitting your text at natural boundaries so each tweet reads as a self-contained thought. Do it wrong and a sentence gets sliced mid-word, or a tweet starts with a dangling conjunction that confuses readers arriving mid-thread.</p>
<p>PostTruncate's <strong>thread splitter</strong> handles this automatically. Paste your full post into the editor and the tool divides it into numbered tweet-sized segments, each staying safely under 280 characters, each breaking at a sentence boundary where possible. You can review every segment before copying to X.</p>

<h2>Why character count affects engagement</h2>
<p>Studies of X engagement data consistently show that <strong>tweets between 71 and 100 characters receive the highest reply and retweet rates</strong>. Shorter tweets leave room for quoted replies; longer tweets feel like a wall of text on mobile. The 280-character limit is a ceiling, not a target — the most shareable tweets typically use well under half the available space.</p>
<p>Staying tight also forces clarity. If you can say something in 140 characters, the 280-character version is almost always weaker. Use the counter to draft lean, then expand with a thread if the idea genuinely needs more room.</p>`,

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
      en: 'Instagram Character Counter — Check Caption Length & Hashtags Free',
      es: 'Contador de Caracteres para Instagram — Comprueba tu pie de foto gratis',
      de: 'Instagram Zeichenzähler — Caption-Länge und Hashtags kostenlos prüfen',
      fr: 'Compteur de Caractères Instagram — Vérifiez légende et hashtags gratuitement',
      pt: 'Contador de Caracteres do Instagram — Verifique legenda e hashtags grátis',
      it: 'Contatore di Caratteri Instagram — Controlla didascalia e hashtag gratis',
      nl: 'Instagram Tekenteller — Controleer bijschriftlengte en hashtags gratis',
      ja: 'Instagram文字数カウンター — キャプション文字数とハッシュタグを無料チェック',
      zh: 'Instagram字符计数器 — 免费检查说明文字长度和标签数量',
      da: 'Instagram Tegntæller — Tjek billedtekst og hashtags gratis',
    },

    metaDescriptions: {
      en: 'Free Instagram caption counter. See your 2200-char limit, preview the critical 125-char fold, and catch the 5-hashtag limit that silently kills posts before you publish.',
      es: 'Contador de caracteres para Instagram gratis. Controla el límite de 2200 caracteres, visualiza el corte de los 125 caracteres y evita el límite de 5 hashtags que silencia tus publicaciones.',
      de: 'Kostenloser Instagram-Zeichenzähler. Behalte das 2200-Zeichen-Limit im Blick, sieh den kritischen 125-Zeichen-Fold in der Vorschau und vermeide das 5-Hashtag-Limit.',
      fr: 'Compteur de caractères Instagram gratuit. Vérifiez votre limite de 2200 caractères, prévisualisez la coupure à 125 caractères et évitez la limite de 5 hashtags.',
      pt: 'Contador de caracteres para Instagram gratuito. Veja o limite de 2200 caracteres, visualize o corte crítico de 125 caracteres e evite o limite de 5 hashtags.',
      it: 'Contatore di caratteri Instagram gratuito. Controlla il limite di 2200 caratteri, visualizza in anteprima la soglia critica dei 125 caratteri ed evita il limite di 5 hashtag.',
      nl: 'Gratis Instagram tekenteller. Zie je 2200-tekenlimiet, bekijk de kritieke 125-tekenvouw en vermijd de 5-hashtaglimiet die berichten stil laat mislukken.',
      ja: 'Instagram無料文字数カウンター。2200文字の上限確認、125文字の折り返し点プレビュー、投稿を無音で失敗させる5ハッシュタグ制限を事前にチェック。',
      zh: '免费Instagram字符计数器。查看2200字符上限，预览关键的125字符折叠点，并避免超过5个标签导致帖子静默发布失败。',
      da: 'Gratis Instagram tegntæller. Se din 2200-tegn-grænse, forhåndsvis den kritiske 125-tegn-fold, og undgå 5-hashtag-grænsen der lydløst slår opslag fejl.',
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
      en: 'LinkedIn Character Counter — Check Post Length & Both Feed Folds Free',
      es: 'Contador de Caracteres para LinkedIn — Comprueba el límite y los cortes del feed gratis',
      de: 'LinkedIn Zeichenzähler — Beitragslänge und beide Feed-Folds kostenlos prüfen',
      fr: 'Compteur de Caractères LinkedIn — Vérifiez longueur et plis du fil gratuitement',
      pt: 'Contador de Caracteres do LinkedIn — Verifique o limite e os cortes do feed grátis',
      it: 'Contatore di Caratteri LinkedIn — Controlla lunghezza del post e soglie del feed gratis',
      nl: 'LinkedIn Tekenteller — Controleer berichtlengte en beide feedvouwen gratis',
      ja: 'LinkedIn文字数カウンター — 投稿文字数とデスクトップ・モバイル両方の折り返し点を無料チェック',
      zh: 'LinkedIn字符计数器 — 免费检查帖子长度及桌面与移动端两个折叠点',
      da: 'LinkedIn Tegntæller — Tjek indlægslængde og begge feed-fold gratis',
    },

    metaDescriptions: {
      en: 'Free LinkedIn character counter. Track the 3000-char limit, preview the ~210-char desktop fold and ~140-char mobile fold live, and front-load your hook before either cut.',
      es: 'Contador de caracteres para LinkedIn gratis. Controla el límite de 3000 caracteres, visualiza el corte de escritorio (~210) y móvil (~140) en tiempo real y pon el gancho antes del corte.',
      de: 'Kostenloser LinkedIn-Zeichenzähler. Verfolge das 3000-Zeichen-Limit, sieh den Desktop-Fold (~210) und Mobile-Fold (~140) live in der Vorschau und platziere deinen Hook davor.',
      fr: 'Compteur de caractères LinkedIn gratuit. Suivez la limite de 3000 caractères, prévisualisez le pli bureau (~210) et mobile (~140) en direct, et placez votre accroche avant la coupure.',
      pt: 'Contador de caracteres do LinkedIn gratuito. Acompanhe o limite de 3000 caracteres, visualize o corte desktop (~210) e mobile (~140) em tempo real e coloque seu gancho antes do corte.',
      it: 'Contatore di caratteri LinkedIn gratuito. Tieni traccia del limite di 3000 caratteri, visualizza in anteprima la soglia desktop (~210) e mobile (~140) in tempo reale.',
      nl: 'Gratis LinkedIn tekenteller. Volg de 2200-tekenlimiet, bekijk de desktopvouw (~210) en mobiele vouw (~140) live en zet je hook vóór de knip.',
      ja: 'LinkedIn無料文字数カウンター。3000文字の上限追跡、デスクトップ折り返し（約210文字）とモバイル折り返し（約140文字）のリアルタイムプレビュー、フック前置きの確認に。',
      zh: '免费LinkedIn字符计数器。追踪3000字符上限，实时预览桌面端折叠点（约210字符）和移动端折叠点（约140字符），确保钩子内容在折叠前呈现。',
      da: 'Gratis LinkedIn tegntæller. Spor 3000-tegn-grænsen, forhåndsvis desktop-folden (~210) og mobil-folden (~140) live, og placer dit hook før begge klip.',
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
      en: 'Facebook Character Counter — Check Post Length, Fold & Unicode Issues Free',
      es: 'Contador de Caracteres para Facebook — Comprueba longitud, corte y Unicode gratis',
      de: 'Facebook Zeichenzähler — Beitragslänge, Fold und Unicode-Probleme kostenlos prüfen',
      fr: 'Compteur de Caractères Facebook — Vérifiez longueur, pli et problèmes Unicode gratuitement',
      pt: 'Contador de Caracteres do Facebook — Verifique comprimento, corte e problemas Unicode grátis',
      it: 'Contatore di Caratteri Facebook — Controlla lunghezza, soglia e problemi Unicode gratis',
      nl: 'Facebook Tekenteller — Controleer berichtlengte, vouw en Unicode-problemen gratis',
      ja: 'Facebook文字数カウンター — 投稿の長さ・折り返し・Unicode問題を無料チェック',
      zh: 'Facebook字符计数器 — 免费检查帖子长度、折叠点和Unicode问题',
      da: 'Facebook Tegntæller — Tjek indlægslængde, fold og Unicode-problemer gratis',
    },

    metaDescriptions: {
      en: 'Free Facebook character counter. See the ~480-char feed fold, understand why posts under 80 chars get more reach, and catch fancy Unicode fonts that break screen readers before you post.',
      es: 'Contador de caracteres para Facebook gratis. Visualiza el corte de ~480 caracteres, entiende por qué los posts de menos de 80 caracteres tienen más alcance y detecta fuentes Unicode que rompen los lectores de pantalla.',
      de: 'Kostenloser Facebook-Zeichenzähler. Sieh den ~480-Zeichen-Fold, versteh warum Beiträge unter 80 Zeichen mehr Reichweite haben, und erkenne Unicode-Schriftarten, die Screenreader brechen.',
      fr: 'Compteur de caractères Facebook gratuit. Visualisez le pli à ~480 caractères, comprenez pourquoi les publications sous 80 caractères ont plus de portée et détectez les polices Unicode qui cassent les lecteurs d\'écran.',
      pt: 'Contador de caracteres do Facebook gratuito. Veja o corte de ~480 caracteres, entenda por que posts abaixo de 80 caracteres têm mais alcance e detecte fontes Unicode que quebram leitores de tela.',
      it: 'Contatore di caratteri Facebook gratuito. Visualizza la soglia a ~480 caratteri, capisci perché i post sotto gli 80 caratteri hanno più portata e individua i font Unicode che rompono gli screen reader.',
      nl: 'Gratis Facebook tekenteller. Zie de ~480-tekenvouw, begrijp waarom berichten onder de 80 tekens meer bereik hebben en vang Unicode-lettertypen die schermlezers breken voordat je post.',
      ja: '無料Facebook文字数カウンター。約480文字のフィード折り返し確認、80文字未満の投稿がリーチを高める理由の把握、スクリーンリーダーを壊すUnicodeフォントの事前検出に対応。',
      zh: '免费Facebook字符计数器。查看约480字符的信息流折叠点，了解80字符以内的帖子为何获得更多触达，并在发布前检测会破坏屏幕阅读器的花体Unicode字体。',
      da: 'Gratis Facebook tegntæller. Se ~480-tegn-folden, forstå hvorfor opslag under 80 tegn får mere rækkevidde, og fang fancy Unicode-skrifttyper der ødelægger skærmlæsere før du poster.',
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
    id: 'sms',
    editorAnchor: 'workspace',
    lastUpdated: '2026-05-15',
    platformLimits:
      '160 characters per segment in GSM-7 encoding, 70 characters per segment in Unicode encoding, multipart GSM reduces to 153 chars per segment, multipart Unicode reduces to 67 chars per segment, GSM extended characters (€ [ ] { } |) count as 2 characters each',

    slugs: {
      en: 'sms-character-counter',
      es: 'contador-sms',
      de: 'sms-zeichenzaehler',
      fr: 'compteur-sms',
      pt: 'contador-sms',
      it: 'contatore-sms',
      nl: 'sms-tekenteller',
      ja: 'sms-moji-kaunta',
      zh: 'sms-zi-fu-ji-shu',
      da: 'sms-tegntaeller',
    },

    schemaName: {
      en: 'SMS Character Counter',
      es: 'Contador de Caracteres SMS',
      de: 'SMS-Zeichenzähler',
      fr: 'Compteur de Caractères SMS',
      pt: 'Contador de Caracteres SMS',
      it: 'Contatore di Caratteri SMS',
      nl: 'SMS-tekenteller',
      ja: 'SMS 文字数カウンター',
      zh: 'SMS 字符计数器',
      da: 'SMS-tegntæller',
    },

    titles: {
      en: 'SMS Character Counter — GSM-7 vs Unicode Segments Explained Free',
      es: 'Contador de Caracteres SMS — GSM-7 vs Unicode y segmentos gratis',
      de: 'SMS-Zeichenzähler — GSM-7 vs. Unicode-Segmente kostenlos erklärt',
      fr: 'Compteur de Caractères SMS — GSM-7 vs Unicode et segments gratuitement',
      pt: 'Contador de Caracteres SMS — GSM-7 vs Unicode e segmentos grátis',
      it: 'Contatore di Caratteri SMS — GSM-7 vs Unicode e segmenti gratis',
      nl: 'SMS-tekenteller — GSM-7 vs. Unicode-segmenten gratis uitgelegd',
      ja: 'SMS文字数カウンター — GSM-7とUnicodeのセグメント数を無料で確認',
      zh: 'SMS字符计数器 — 免费了解GSM-7与Unicode编码及短信段数',
      da: 'SMS-tegntæller — GSM-7 vs. Unicode-segmenter forklaret gratis',
    },

    metaDescriptions: {
      en: 'Free SMS character counter. See your encoding mode (GSM-7 or Unicode), segment count, and exactly why adding one emoji drops your limit from 160 to 70 characters.',
      es: 'Contador de caracteres SMS gratis. Visualiza el modo de codificación (GSM-7 o Unicode), el número de segmentos y por qué añadir un emoji reduce tu límite de 160 a 70 caracteres.',
      de: 'Kostenloser SMS-Zeichenzähler. Sieh deinen Codierungsmodus (GSM-7 oder Unicode), die Segmentanzahl und warum ein einzelnes Emoji dein Limit von 160 auf 70 Zeichen halbiert.',
      fr: 'Compteur de caractères SMS gratuit. Visualisez votre mode d\'encodage (GSM-7 ou Unicode), le nombre de segments, et pourquoi un seul emoji réduit votre limite de 160 à 70 caractères.',
      pt: 'Contador de caracteres SMS gratuito. Veja o modo de codificação (GSM-7 ou Unicode), o número de segmentos e por que adicionar um emoji reduz seu limite de 160 para 70 caracteres.',
      it: 'Contatore di caratteri SMS gratuito. Visualizza la modalità di codifica (GSM-7 o Unicode), il conteggio dei segmenti e perché aggiungere una sola emoji riduce il limite da 160 a 70 caratteri.',
      nl: 'Gratis SMS-tekenteller. Zie je coderingsmodus (GSM-7 of Unicode), segmentaantal en precies waarom één emoji je limiet van 160 naar 70 tekens terugbrengt.',
      ja: '無料SMS文字数カウンター。エンコードモード（GSM-7またはUnicode）、セグメント数、絵文字1つで上限が160文字から70文字に下がる理由をリアルタイムで確認できます。',
      zh: '免费SMS字符计数器。实时查看编码模式（GSM-7或Unicode）、短信段数，以及为什么添加一个表情符号会将字符上限从160降至70。',
      da: 'Gratis SMS-tegntæller. Se din kodningsmetode (GSM-7 eller Unicode), segmentantal, og præcis hvorfor én emoji sænker din grænse fra 160 til 70 tegn.',
    },

    content: {
      en: `<h2>The two SMS encodings that control your character limit</h2>
<p>Most people assume an SMS holds 160 characters. That's true — but only for messages that use <strong>GSM-7 encoding</strong>. GSM-7 is the character set that covers standard Latin letters, digits, punctuation, and a handful of common symbols. When every character in your message belongs to this set, the 160-character limit applies and a single message costs exactly one SMS credit.</p>
<p>The moment your message contains a character outside GSM-7 — most commonly an emoji, a curly quotation mark, or a letter with an uncommon accent — the entire message is automatically re-encoded in <strong>Unicode (UCS-2)</strong>. Unicode supports virtually every character humans have ever written, but it uses more data per character. The consequence is immediate: <strong>your per-segment limit drops from 160 characters to 70</strong>. A message you believed was comfortably under the limit can suddenly become two or three paid segments.</p>
<p>PostTruncate's <strong>SMS character counter</strong> detects the encoding of your message in real time, displays whether you're in GSM-7 or Unicode mode, and shows the current segment count so you always know exactly what you're sending — and what it will cost.</p>

<h2>The emoji trap: one character, half the limit</h2>
<p>This is the most common and most expensive SMS mistake. You draft a professional message, add a thumbs-up emoji at the end as an afterthought, and instantly transform a single-segment message into a two-segment message — doubling your SMS cost for every recipient.</p>
<p><strong>Every emoji forces the entire message into Unicode mode</strong>, not just the part after the emoji. A 155-character message with one emoji at position 156 doesn't cost one SMS — it costs three (155 characters ÷ 67 Unicode multipart characters per segment). The same applies to curly quotes (" "), em dashes (—), and any character not in the GSM-7 alphabet.</p>
<p>PostTruncate flags the exact character that triggered Unicode mode, so you can decide whether to remove it or accept the additional segments with full awareness of the cost.</p>

<h2>Multipart messages: the hidden per-segment cost</h2>
<p>When a message exceeds one segment, the carrier network must break it into multiple parts and reassemble them on the recipient's device. This reassembly requires a small <strong>header in each segment</strong> — 7 bytes for GSM-7 and 3 bytes for Unicode — which reduces the usable characters per part.</p>
<p>In practice: a single GSM-7 message holds <strong>160 characters</strong>, but a two-part GSM-7 message holds only <strong>153 characters per segment</strong> (306 total). A single Unicode message holds <strong>70 characters</strong>, and a two-part Unicode message holds only <strong>67 per segment</strong> (134 total). Going even slightly over 160 (or 70) characters doesn't just add one segment — it also recalculates the capacity of all previous segments.</p>
<p>This is why a 161-character GSM-7 message doesn't cost "160 + 1". It costs two segments of 153, giving you 306 total characters but charging for two SMS credits. PostTruncate shows real-time segment boundaries so you never accidentally cross a threshold without noticing.</p>

<h2>GSM extended characters: the double-cost symbols</h2>
<p>Within GSM-7, there is a small set of characters that occupy the <strong>extended character table</strong>: <strong>€ [ ] { } \\ | ~</strong> and the caret <strong>^</strong>. Each of these counts as <strong>two characters</strong> in your SMS budget, not one. A message containing four euro signs has effectively used 8 characters from the GSM-7 limit, not 4.</p>
<p>This surprises developers and marketers equally. A promotional message like "Save €10 on your next order [terms apply]" uses 48 visible characters but consumes 52 GSM-7 character slots — the €, [, and ] each cost 2. PostTruncate counts extended characters at their true two-slot weight, so the number you see is the number that matters for billing.</p>`,

      es: `<h2>Las dos codificaciones SMS que controlan tu límite de caracteres</h2>
<p>La mayoría de las personas asume que un SMS tiene 160 caracteres. Es cierto, pero solo para los mensajes que usan la codificación <strong>GSM-7</strong>. GSM-7 es el conjunto de caracteres que incluye letras latinas estándar, dígitos, puntuación y algunos símbolos comunes. Cuando todos los caracteres de tu mensaje pertenecen a este conjunto, se aplica el límite de 160 caracteres y un único mensaje cuesta exactamente un crédito SMS.</p>
<p>En el momento en que tu mensaje contiene un carácter fuera de GSM-7 —normalmente un emoji, una comilla tipográfica o una letra con un acento poco común— todo el mensaje se recodifica automáticamente en <strong>Unicode (UCS-2)</strong>. Unicode admite prácticamente todos los caracteres que los seres humanos hayan escrito, pero usa más datos por carácter. La consecuencia es inmediata: <strong>tu límite por segmento cae de 160 a 70 caracteres</strong>. Un mensaje que creías que estaba cómodamente dentro del límite puede convertirse de repente en dos o tres segmentos de pago.</p>
<p>El <strong>contador de caracteres SMS</strong> de PostTruncate detecta la codificación de tu mensaje en tiempo real, muestra si estás en modo GSM-7 o Unicode, e indica el número de segmentos actual para que siempre sepas exactamente qué estás enviando.</p>

<h2>La trampa del emoji: un carácter, la mitad del límite</h2>
<p>Este es el error SMS más común y más costoso. Redactas un mensaje profesional, añades un emoji de pulgar arriba al final como ocurrencia de último momento y, de repente, conviertes un mensaje de un segmento en uno de dos segmentos, duplicando el coste de SMS por cada destinatario.</p>
<p><strong>Cada emoji fuerza todo el mensaje al modo Unicode</strong>, no solo la parte posterior al emoji. Un mensaje de 155 caracteres con un emoji en la posición 156 no cuesta un SMS, sino tres (155 caracteres ÷ 67 caracteres Unicode multiparte por segmento). Lo mismo ocurre con las comillas tipográficas (" "), las rayas (—) y cualquier carácter que no esté en el alfabeto GSM-7.</p>

<h2>Mensajes de múltiples partes: el coste oculto por segmento</h2>
<p>Cuando un mensaje supera un segmento, la red del operador debe dividirlo en varias partes y reensamblarlas en el dispositivo del destinatario. Este reensamblaje requiere un pequeño <strong>encabezado en cada segmento</strong> —7 bytes para GSM-7 y 3 bytes para Unicode— que reduce los caracteres utilizables por parte.</p>
<p>En la práctica: un mensaje GSM-7 de un solo segmento tiene <strong>160 caracteres</strong>, pero un mensaje GSM-7 de dos partes solo tiene <strong>153 caracteres por segmento</strong> (306 en total). Un mensaje Unicode tiene <strong>70 caracteres</strong>, y uno de dos partes solo <strong>67 por segmento</strong> (134 en total). Superar ligeramente los 160 (o 70) caracteres no solo añade un segmento, también recalcula la capacidad de todos los segmentos anteriores.</p>

<h2>Caracteres extendidos GSM: los símbolos de doble coste</h2>
<p>Dentro de GSM-7 hay un pequeño conjunto de caracteres que ocupan la <strong>tabla de caracteres extendida</strong>: <strong>€ [ ] { } \\ | ~</strong> y el acento circunflejo <strong>^</strong>. Cada uno de estos cuenta como <strong>dos caracteres</strong> en tu presupuesto de SMS. Un mensaje que contiene cuatro signos de euro ha usado efectivamente 8 caracteres del límite GSM-7, no 4.</p>
<p>PostTruncate cuenta los caracteres extendidos con su verdadero peso de dos posiciones, de modo que el número que ves es el que importa para la facturación.</p>`,

      de: `<h2>Die zwei SMS-Kodierungen, die dein Zeichenlimit bestimmen</h2>
<p>Die meisten Menschen gehen davon aus, dass eine SMS 160 Zeichen fasst. Das stimmt — aber nur für Nachrichten, die <strong>GSM-7-Kodierung</strong> verwenden. GSM-7 ist der Zeichensatz, der Standard-Lateinbuchstaben, Ziffern, Satzzeichen und eine Handvoll gängiger Symbole abdeckt. Wenn jedes Zeichen deiner Nachricht zu diesem Set gehört, gilt das 160-Zeichen-Limit, und eine einzelne Nachricht kostet genau ein SMS-Guthaben.</p>
<p>Sobald deine Nachricht ein Zeichen außerhalb von GSM-7 enthält — am häufigsten ein Emoji, ein typografisches Anführungszeichen oder ein Buchstabe mit einem ungewöhnlichen Akzent — wird die gesamte Nachricht automatisch in <strong>Unicode (UCS-2)</strong> umkodiert. Unicode unterstützt nahezu alle Zeichen, die Menschen je geschrieben haben, benötigt aber mehr Datenspeicher pro Zeichen. Die Folge ist unmittelbar: <strong>Dein Limit pro Segment sinkt von 160 auf 70 Zeichen</strong>. Eine Nachricht, die du für gut innerhalb des Limits gehalten hast, kann plötzlich zu zwei oder drei kostenpflichtigen Segmenten werden.</p>
<p>PostTruncates <strong>SMS-Zeichenzähler</strong> erkennt die Kodierung deiner Nachricht in Echtzeit, zeigt an, ob du im GSM-7- oder Unicode-Modus bist, und gibt die aktuelle Segmentanzahl aus, damit du immer genau weißt, was du sendest — und was es kostet.</p>

<h2>Die Emoji-Falle: ein Zeichen, die halbe Kapazität</h2>
<p>Das ist der häufigste und teuerste SMS-Fehler. Du verfasst eine professionelle Nachricht, fügst am Ende als Nachgedanken ein Daumen-hoch-Emoji hinzu — und verwandelst damit sofort eine Einzel-Segment-Nachricht in eine Zwei-Segment-Nachricht, was die SMS-Kosten für jeden Empfänger verdoppelt.</p>
<p><strong>Jedes Emoji zwingt die gesamte Nachricht in den Unicode-Modus</strong>, nicht nur den Teil nach dem Emoji. Eine 155-Zeichen-Nachricht mit einem Emoji an Position 156 kostet nicht eine SMS — sondern drei (155 Zeichen ÷ 67 Unicode-Multipart-Zeichen pro Segment). Dasselbe gilt für typografische Anführungszeichen (" "), Gedankenstriche (—) und jedes Zeichen, das nicht im GSM-7-Alphabet enthalten ist.</p>

<h2>Mehrteilige Nachrichten: die versteckten Kosten pro Segment</h2>
<p>Wenn eine Nachricht ein Segment überschreitet, muss das Mobilfunknetz sie in mehrere Teile aufteilen und beim Empfänger wieder zusammensetzen. Dieses Zusammensetzen erfordert einen kleinen <strong>Header in jedem Segment</strong> — 7 Byte für GSM-7 und 3 Byte für Unicode — der die nutzbaren Zeichen pro Teil reduziert.</p>
<p>In der Praxis: Eine einzelne GSM-7-Nachricht fasst <strong>160 Zeichen</strong>, eine zweiteilige GSM-7-Nachricht jedoch nur <strong>153 Zeichen pro Segment</strong> (306 insgesamt). Eine einzelne Unicode-Nachricht fasst <strong>70 Zeichen</strong>, eine zweiteilige nur <strong>67 pro Segment</strong> (134 insgesamt). Nur geringfügig über 160 (oder 70) Zeichen zu gehen, fügt nicht nur ein Segment hinzu — es berechnet auch die Kapazität aller vorherigen Segmente neu.</p>

<h2>Erweiterte GSM-Zeichen: die Doppelkosten-Symbole</h2>
<p>Innerhalb von GSM-7 gibt es eine kleine Gruppe von Zeichen, die zur <strong>erweiterten Zeichentabelle</strong> gehören: <strong>€ [ ] { } \\ | ~</strong> und das Zirkumflex <strong>^</strong>. Jedes davon zählt als <strong>zwei Zeichen</strong> in deinem SMS-Budget, nicht als eines. Eine Nachricht mit vier Euro-Zeichen hat effektiv 8 Zeichen des GSM-7-Limits verbraucht, nicht 4.</p>
<p>PostTruncate zählt erweiterte Zeichen mit ihrem tatsächlichen Gewicht von zwei Slots, sodass die angezeigte Zahl die ist, die für die Abrechnung zählt.</p>`,

      fr: `<h2>Les deux encodages SMS qui contrôlent votre limite de caractères</h2>
<p>La plupart des gens supposent qu'un SMS contient 160 caractères. C'est vrai — mais uniquement pour les messages utilisant l'encodage <strong>GSM-7</strong>. GSM-7 est le jeu de caractères couvrant les lettres latines standard, les chiffres, la ponctuation et une poignée de symboles courants. Lorsque chaque caractère de votre message appartient à cet ensemble, la limite de 160 caractères s'applique et un seul message coûte exactement un crédit SMS.</p>
<p>Dès que votre message contient un caractère hors GSM-7 — le plus souvent un emoji, un guillemet typographique ou une lettre avec un accent inhabituel — le message entier est automatiquement ré-encodé en <strong>Unicode (UCS-2)</strong>. Unicode prend en charge pratiquement tous les caractères que les humains ont jamais écrits, mais utilise plus de données par caractère. La conséquence est immédiate : <strong>votre limite par segment passe de 160 à 70 caractères</strong>. Un message que vous pensiez être confortablement dans les limites peut soudainement devenir deux ou trois segments payants.</p>
<p>Le <strong>compteur de caractères SMS</strong> de PostTruncate détecte l'encodage de votre message en temps réel, affiche si vous êtes en mode GSM-7 ou Unicode, et indique le nombre de segments actuel pour que vous sachiez toujours exactement ce que vous envoyez.</p>

<h2>Le piège de l'emoji : un caractère, la moitié de la limite</h2>
<p>C'est l'erreur SMS la plus courante et la plus coûteuse. Vous rédigez un message professionnel, ajoutez un emoji pouce levé à la fin comme une pensée de dernière minute, et transformez instantanément un message à un segment en un message à deux segments — doublant votre coût SMS par destinataire.</p>
<p><strong>Chaque emoji force l'intégralité du message en mode Unicode</strong>, pas seulement la partie après l'emoji. Un message de 155 caractères avec un emoji à la position 156 ne coûte pas un SMS — il en coûte trois (155 caractères ÷ 67 caractères Unicode multipart par segment). Il en va de même pour les guillemets typographiques (" "), les tirets cadratins (—) et tout caractère absent de l'alphabet GSM-7.</p>

<h2>Messages en plusieurs parties : le coût caché par segment</h2>
<p>Lorsqu'un message dépasse un segment, le réseau de l'opérateur doit le diviser en plusieurs parties et les réassembler sur l'appareil du destinataire. Ce réassemblage nécessite un petit <strong>en-tête dans chaque segment</strong> — 7 octets pour GSM-7 et 3 octets pour Unicode — ce qui réduit les caractères utilisables par partie.</p>
<p>En pratique : un seul message GSM-7 contient <strong>160 caractères</strong>, mais un message GSM-7 en deux parties n'en contient que <strong>153 par segment</strong> (306 au total). Un seul message Unicode contient <strong>70 caractères</strong>, et un message en deux parties seulement <strong>67 par segment</strong> (134 au total). Dépasser légèrement 160 (ou 70) caractères n'ajoute pas seulement un segment — cela recalcule aussi la capacité de tous les segments précédents.</p>

<h2>Caractères étendus GSM : les symboles à double coût</h2>
<p>Dans GSM-7, il existe un petit ensemble de caractères appartenant à la <strong>table des caractères étendus</strong> : <strong>€ [ ] { } \\ | ~</strong> et le caret <strong>^</strong>. Chacun d'eux compte comme <strong>deux caractères</strong> dans votre budget SMS. Un message contenant quatre signes euro a effectivement utilisé 8 caractères de la limite GSM-7, pas 4.</p>
<p>PostTruncate compte les caractères étendus à leur vrai poids de deux emplacements, de sorte que le nombre affiché est celui qui compte pour la facturation.</p>`,

      pt: `<h2>As duas codificações de SMS que controlam seu limite de caracteres</h2>
<p>A maioria das pessoas assume que um SMS cabe 160 caracteres. Isso é verdade — mas apenas para mensagens que usam a codificação <strong>GSM-7</strong>. GSM-7 é o conjunto de caracteres que cobre letras latinas padrão, dígitos, pontuação e alguns símbolos comuns. Quando todos os caracteres da sua mensagem pertencem a esse conjunto, o limite de 160 caracteres se aplica e uma única mensagem custa exatamente um crédito de SMS.</p>
<p>No momento em que sua mensagem contém um caractere fora do GSM-7 — mais comumente um emoji, uma aspas tipográfica ou uma letra com acento incomum — toda a mensagem é automaticamente recodificada em <strong>Unicode (UCS-2)</strong>. O Unicode suporta praticamente todos os caracteres que os seres humanos já escreveram, mas usa mais dados por caractere. A consequência é imediata: <strong>seu limite por segmento cai de 160 para 70 caracteres</strong>. Uma mensagem que você acreditava estar confortavelmente dentro do limite pode de repente se tornar dois ou três segmentos pagos.</p>
<p>O <strong>contador de caracteres SMS</strong> do PostTruncate detecta a codificação da sua mensagem em tempo real, exibe se você está no modo GSM-7 ou Unicode e mostra o número atual de segmentos para que você sempre saiba exatamente o que está enviando.</p>

<h2>A armadilha do emoji: um caractere, metade do limite</h2>
<p>Este é o erro de SMS mais comum e mais caro. Você elabora uma mensagem profissional, adiciona um emoji de polegar para cima no final como um pensamento de última hora e, de repente, transforma uma mensagem de um segmento em uma de dois segmentos — dobrando o custo de SMS para cada destinatário.</p>
<p><strong>Cada emoji força toda a mensagem para o modo Unicode</strong>, não apenas a parte após o emoji. Uma mensagem de 155 caracteres com um emoji na posição 156 não custa um SMS — custa três (155 caracteres ÷ 67 caracteres Unicode multiparte por segmento). O mesmo vale para aspas tipográficas (" "), travessões (—) e qualquer caractere que não esteja no alfabeto GSM-7.</p>

<h2>Mensagens multipartes: o custo oculto por segmento</h2>
<p>Quando uma mensagem excede um segmento, a rede da operadora deve dividi-la em várias partes e remontá-las no dispositivo do destinatário. Essa remontagem requer um pequeno <strong>cabeçalho em cada segmento</strong> — 7 bytes para GSM-7 e 3 bytes para Unicode — que reduz os caracteres utilizáveis por parte.</p>
<p>Na prática: uma única mensagem GSM-7 comporta <strong>160 caracteres</strong>, mas uma mensagem GSM-7 de duas partes comporta apenas <strong>153 caracteres por segmento</strong> (306 no total). Uma única mensagem Unicode comporta <strong>70 caracteres</strong>, e uma de duas partes apenas <strong>67 por segmento</strong> (134 no total). Ultrapassar ligeiramente os 160 (ou 70) caracteres não apenas adiciona um segmento — também recalcula a capacidade de todos os segmentos anteriores.</p>

<h2>Caracteres estendidos do GSM: os símbolos de custo duplo</h2>
<p>Dentro do GSM-7, há um pequeno conjunto de caracteres que pertencem à <strong>tabela de caracteres estendida</strong>: <strong>€ [ ] { } \\ | ~</strong> e o circunflexo <strong>^</strong>. Cada um deles conta como <strong>dois caracteres</strong> no seu orçamento de SMS. Uma mensagem com quatro sinais de euro efetivamente usou 8 caracteres do limite GSM-7, não 4.</p>
<p>O PostTruncate conta os caracteres estendidos com seu verdadeiro peso de dois slots, de modo que o número exibido é o que importa para a cobrança.</p>`,

      it: `<h2>Le due codifiche SMS che controllano il tuo limite di caratteri</h2>
<p>La maggior parte delle persone dà per scontato che un SMS contenga 160 caratteri. È vero — ma solo per i messaggi che usano la codifica <strong>GSM-7</strong>. GSM-7 è il set di caratteri che copre le lettere latine standard, le cifre, la punteggiatura e una manciata di simboli comuni. Quando ogni carattere del tuo messaggio appartiene a questo set, si applica il limite di 160 caratteri e un singolo messaggio costa esattamente un credito SMS.</p>
<p>Nel momento in cui il tuo messaggio contiene un carattere fuori da GSM-7 — il più delle volte una emoji, una virgoletta tipografica o una lettera con un accento insolito — l'intero messaggio viene automaticamente ricodificato in <strong>Unicode (UCS-2)</strong>. Unicode supporta praticamente tutti i caratteri che gli esseri umani abbiano mai scritto, ma utilizza più dati per carattere. La conseguenza è immediata: <strong>il tuo limite per segmento scende da 160 a 70 caratteri</strong>. Un messaggio che credevi fosse comodamente entro il limite può diventare improvvisamente due o tre segmenti a pagamento.</p>
<p>Il <strong>contatore di caratteri SMS</strong> di PostTruncate rileva la codifica del tuo messaggio in tempo reale, mostra se sei in modalità GSM-7 o Unicode e indica il numero di segmenti attuale, così sai sempre esattamente cosa stai inviando.</p>

<h2>La trappola delle emoji: un carattere, la metà del limite</h2>
<p>Questo è l'errore SMS più comune e più costoso. Scrivi un messaggio professionale, aggiungi una emoji pollice su alla fine come ripensamento e trasformi istantaneamente un messaggio a un segmento in uno a due segmenti — raddoppiando il costo SMS per ogni destinatario.</p>
<p><strong>Ogni emoji forza l'intero messaggio in modalità Unicode</strong>, non solo la parte dopo la emoji. Un messaggio di 155 caratteri con una emoji in posizione 156 non costa un SMS — ne costa tre (155 caratteri ÷ 67 caratteri Unicode multipart per segmento). Lo stesso vale per le virgolette tipografiche (" "), i trattini em (—) e qualsiasi carattere non presente nell'alfabeto GSM-7.</p>

<h2>Messaggi in più parti: il costo nascosto per segmento</h2>
<p>Quando un messaggio supera un segmento, la rete dell'operatore deve dividerlo in più parti e riassemblarle sul dispositivo del destinatario. Questo riassemblaggio richiede una piccola <strong>intestazione in ogni segmento</strong> — 7 byte per GSM-7 e 3 byte per Unicode — che riduce i caratteri utilizzabili per parte.</p>
<p>In pratica: un singolo messaggio GSM-7 contiene <strong>160 caratteri</strong>, ma un messaggio GSM-7 in due parti contiene solo <strong>153 caratteri per segmento</strong> (306 in totale). Un singolo messaggio Unicode contiene <strong>70 caratteri</strong>, e uno in due parti solo <strong>67 per segmento</strong> (134 in totale). Superare di poco i 160 (o 70) caratteri non aggiunge solo un segmento — ricalcola anche la capacità di tutti i segmenti precedenti.</p>

<h2>Caratteri estesi GSM: i simboli a doppio costo</h2>
<p>All'interno di GSM-7 esiste un piccolo insieme di caratteri che appartengono alla <strong>tabella dei caratteri estesi</strong>: <strong>€ [ ] { } \\ | ~</strong> e il caret <strong>^</strong>. Ognuno di questi conta come <strong>due caratteri</strong> nel tuo budget SMS. Un messaggio che contiene quattro segni euro ha effettivamente usato 8 caratteri del limite GSM-7, non 4.</p>
<p>PostTruncate conta i caratteri estesi al loro vero peso di due slot, in modo che il numero visualizzato sia quello che conta per la fatturazione.</p>`,

      nl: `<h2>De twee sms-coderingen die je tekenlimiet bepalen</h2>
<p>De meeste mensen gaan ervan uit dat een sms 160 tekens bevat. Dat klopt — maar alleen voor berichten die gebruikmaken van <strong>GSM-7-codering</strong>. GSM-7 is de tekenset die standaard Latijnse letters, cijfers, leestekens en een handvol veelgebruikte symbolen dekt. Wanneer elk teken in je bericht tot deze set behoort, geldt de limiet van 160 tekens en kost een enkel bericht precies één sms-tegoed.</p>
<p>Zodra je bericht een teken bevat buiten GSM-7 — het vaakst een emoji, een typografisch aanhalingsteken of een letter met een ongebruikelijk accent — wordt het volledige bericht automatisch hergecodeerd naar <strong>Unicode (UCS-2)</strong>. Unicode ondersteunt vrijwel elk teken dat mensen ooit hebben geschreven, maar gebruikt meer data per teken. Het gevolg is onmiddellijk: <strong>je limiet per segment daalt van 160 naar 70 tekens</strong>. Een bericht waarvan je dacht dat het ruimschoots binnen de limiet viel, kan plotseling twee of drie betaalde segmenten worden.</p>
<p>PostTruncates <strong>sms-tekenteller</strong> detecteert de codering van je bericht in real time, toont of je in GSM-7- of Unicode-modus bent, en geeft het huidige segmentaantal weer zodat je altijd precies weet wat je verstuurt.</p>

<h2>De emoji-val: één teken, de helft van de limiet</h2>
<p>Dit is de meest voorkomende en duurste sms-fout. Je schrijft een professioneel bericht, voegt als nagedachte aan het einde een duim-omhoog-emoji toe, en transformeert daarmee onmiddellijk een bericht van één segment in een bericht van twee segmenten — waarmee je de sms-kosten per ontvanger verdubbelt.</p>
<p><strong>Elke emoji dwingt het volledige bericht naar Unicode-modus</strong>, niet alleen het deel na de emoji. Een bericht van 155 tekens met één emoji op positie 156 kost niet één sms — het kost er drie (155 tekens ÷ 67 Unicode-multiparttekens per segment). Hetzelfde geldt voor typografische aanhalingstekens (" "), gedachtestreepjes (—) en elk teken dat niet in het GSM-7-alfabet staat.</p>

<h2>Meerdelige berichten: de verborgen kosten per segment</h2>
<p>Wanneer een bericht één segment overschrijdt, moet het netwerk van de provider het in meerdere delen splitsen en op het apparaat van de ontvanger weer samenvoegen. Dit samenvoegen vereist een kleine <strong>header in elk segment</strong> — 7 bytes voor GSM-7 en 3 bytes voor Unicode — waardoor de bruikbare tekens per deel worden verminderd.</p>
<p>In de praktijk: een enkel GSM-7-bericht bevat <strong>160 tekens</strong>, maar een tweedelig GSM-7-bericht bevat slechts <strong>153 tekens per segment</strong> (306 in totaal). Een enkel Unicode-bericht bevat <strong>70 tekens</strong>, en een tweedelig bericht slechts <strong>67 per segment</strong> (134 in totaal). Iets boven de 160 (of 70) tekens gaan voegt niet alleen een segment toe — het herberekent ook de capaciteit van alle voorgaande segmenten.</p>

<h2>Uitgebreide GSM-tekens: de symbolen met dubbele kosten</h2>
<p>Binnen GSM-7 bestaat er een kleine set tekens die tot de <strong>uitgebreide tekentabel</strong> behoren: <strong>€ [ ] { } \\ | ~</strong> en het dakje <strong>^</strong>. Elk van deze telt als <strong>twee tekens</strong> in je sms-budget, niet als één. Een bericht met vier eurotekens heeft effectief 8 tekens van de GSM-7-limiet verbruikt, niet 4.</p>
<p>PostTruncate telt uitgebreide tekens op hun werkelijke gewicht van twee slots, zodat het weergegeven aantal het getal is dat telt voor de facturering.</p>`,

      ja: `<h2>文字制限を決める2つのSMSエンコーディング</h2>
<p>ほとんどの人はSMSが160文字まで送れると思っています。それは正しいですが、<strong>GSM-7エンコーディング</strong>を使うメッセージに限った話です。GSM-7は標準的なラテン文字、数字、句読点、一般的な記号をカバーする文字セットです。メッセージのすべての文字がこのセットに属している場合、160文字の制限が適用され、1通のメッセージは正確に1SMSクレジットを消費します。</p>
<p>メッセージにGSM-7外の文字が含まれた瞬間——最もよくあるのは絵文字、カーリークオーテーションマーク、珍しいアクセント付きの文字——メッセージ全体が自動的に<strong>Unicode（UCS-2）</strong>で再エンコードされます。Unicodeは人類が書いたほぼすべての文字をサポートしますが、1文字あたりのデータ使用量が多くなります。結果はすぐに現れます。<strong>1セグメントあたりの制限が160文字から70文字に下がります</strong>。制限内に余裕があると思っていたメッセージが、突然2〜3セグメントの有料送信になることがあります。</p>
<p>PostTruncateの<strong>SMS文字数カウンター</strong>はメッセージのエンコーディングをリアルタイムで検出し、GSM-7モードかUnicodeモードかを表示し、現在のセグメント数を示します。送信前に正確な内容と料金を把握できます。</p>

<h2>絵文字の罠：1文字で制限が半分に</h2>
<p>これはSMSで最もよくある、そして最もコストがかかるミスです。プロフェッショナルなメッセージを作成し、思いつきで最後に👍の絵文字を追加した瞬間、1セグメントのメッセージが2セグメントになり、すべての受信者へのSMSコストが2倍になります。</p>
<p><strong>絵文字はメッセージ全体をUnicodeモードに強制します</strong>——絵文字より後の部分だけでなく、メッセージ全体です。156文字目に絵文字がある155文字のメッセージは1通のSMSでは送れません——3通分かかります（155文字 ÷ Unicodeマルチパートの67文字/セグメント）。カーリークオート（" "）、ダッシュ（—）、GSM-7アルファベットにない文字でも同じことが起きます。</p>

<h2>マルチパートメッセージ：隠れたセグメントあたりのコスト</h2>
<p>メッセージが1セグメントを超えると、キャリアネットワークはそれを複数の部分に分割し、受信者のデバイスで再組み立てする必要があります。この再組み立てには各セグメントに小さな<strong>ヘッダー</strong>が必要です——GSM-7では7バイト、Unicodeでは3バイト——これにより各部分で使用できる文字数が減ります。</p>
<p>具体的には：GSM-7の1セグメントメッセージは<strong>160文字</strong>ですが、2パートのGSM-7メッセージは<strong>1セグメントあたり153文字</strong>（合計306文字）になります。Unicodeの1セグメントは<strong>70文字</strong>で、2パートでは<strong>1セグメントあたり67文字</strong>（合計134文字）です。160文字（または70文字）をほんの少し超えるだけで、セグメントが1つ増えるだけでなく、すべての既存セグメントの容量も再計算されます。</p>

<h2>GSM拡張文字：2スロット消費する記号</h2>
<p>GSM-7の中に、<strong>拡張文字テーブル</strong>に属する小さな文字セットがあります。<strong>€ [ ] { } \\ | ~</strong>とキャレット<strong>^</strong>です。これらはSMSの文字数カウントで<strong>それぞれ2文字分</strong>として数えられます。ユーロ記号が4つあるメッセージは、4文字ではなく8文字をGSM-7の制限から消費したことになります。</p>
<p>PostTruncateは拡張文字を正確に2スロット分の重みでカウントするため、表示される文字数は請求に直結する正確な数値です。</p>`,

      zh: `<h2>决定字符限制的两种短信编码方式</h2>
<p>大多数人以为短信能发160个字符。这是对的——但仅限于使用<strong>GSM-7编码</strong>的消息。GSM-7是覆盖标准拉丁字母、数字、标点符号和少量常见符号的字符集。当消息中所有字符都属于这个字符集时，160字符的限制生效，一条短信恰好消耗一个短信套餐额度。</p>
<p>一旦消息包含GSM-7以外的字符——最常见的是表情符号、弯引号或带有不常见重音符号的字母——整条消息会自动以<strong>Unicode（UCS-2）</strong>重新编码。Unicode支持人类有史以来书写的几乎所有字符，但每个字符消耗更多数据。结果立竿见影：<strong>每段字符上限从160个降至70个</strong>。你以为安全在限制范围内的消息，可能突然变成两三个付费短信段。</p>
<p>PostTruncate的<strong>SMS字符计数器</strong>实时检测消息的编码方式，显示当前处于GSM-7模式还是Unicode模式，并实时显示短信段数，让你在发送前始终清楚地知道发送内容和费用。</p>

<h2>表情符号陷阱：一个字符，限制减半</h2>
<p>这是最常见也是最昂贵的短信错误。你起草了一条专业消息，临时在末尾加了一个👍表情，瞬间将一段短信变成两段——对每位接收者的短信成本翻倍。</p>
<p><strong>每个表情符号都会将整条消息强制切换到Unicode模式</strong>——不只是表情符号之后的部分，而是整条消息。一条156位置带有一个表情符号的155字符消息，不是1条短信的费用——而是3条（155字符 ÷ Unicode多段每段67字符）。弯引号（" "）、破折号（—）以及任何不在GSM-7字母表中的字符都会触发相同情况。</p>

<h2>多段短信：隐藏的每段费用</h2>
<p>当消息超过一段时，运营商网络必须将其拆分为多个部分，并在接收方设备上重新组装。这一重组过程需要在每段中添加一个小型<strong>信息头</strong>——GSM-7为7字节，Unicode为3字节——这减少了每部分可用的字符数。</p>
<p>实际效果：单段GSM-7消息容纳<strong>160个字符</strong>，但两段GSM-7消息每段只能容纳<strong>153个字符</strong>（共306个）。单段Unicode消息容纳<strong>70个字符</strong>，两段则每段只有<strong>67个字符</strong>（共134个）。略微超过160个（或70个）字符，不只是增加一段——还会重新计算所有已有段的容量。</p>

<h2>GSM扩展字符：消耗双倍槽位的符号</h2>
<p>GSM-7中有一小组字符属于<strong>扩展字符表</strong>：<strong>€ [ ] { } \\ | ~</strong>以及脱字符<strong>^</strong>。这些字符在短信额度计算中各占<strong>两个字符</strong>，而非一个。包含四个欧元符号的消息，实际上消耗了GSM-7限制中的8个字符槽位，而非4个。</p>
<p>PostTruncate以真实的双槽位权重计算扩展字符，因此显示的数字正是计费所依据的数字。</p>`,

      da: `<h2>De to SMS-kodningsmetoder der styrer din tegngrænse</h2>
<p>De fleste antager, at en SMS rummer 160 tegn. Det passer — men kun for beskeder der bruger <strong>GSM-7-kodning</strong>. GSM-7 er det tegnsæt der dækker standard latinske bogstaver, tal, tegnsætning og en håndfuld almindelige symboler. Når hvert tegn i din besked tilhører dette sæt, gælder grænsen på 160 tegn, og en enkelt besked koster præcis én SMS-kredit.</p>
<p>I det øjeblik din besked indeholder et tegn uden for GSM-7 — oftest en emoji, et typografisk anførselstegn eller et bogstav med en usædvanlig accent — omsættes hele beskeden automatisk til <strong>Unicode (UCS-2)</strong>. Unicode understøtter stort set alle tegn mennesker nogensinde har skrevet, men bruger mere data per tegn. Konsekvensen er øjeblikkelig: <strong>din per-segment-grænse falder fra 160 til 70 tegn</strong>. En besked du troede var godt inden for grænsen, kan pludselig blive to eller tre betalte segmenter.</p>
<p>PostTruncates <strong>SMS-tegntæller</strong> registrerer kodningen af din besked i realtid, viser om du er i GSM-7- eller Unicode-tilstand, og angiver det aktuelle segmentantal så du altid ved præcis, hvad du sender.</p>

<h2>Emoji-fælden: ét tegn, halvt grænsen</h2>
<p>Dette er den mest almindelige og dyreste SMS-fejl. Du udarbejder en professionel besked, tilføjer en tommelfinger-op-emoji til sidst som en eftertanke, og forvandler øjeblikkeligt en enkeltsegment-besked til en tosegment-besked — og fordobler din SMS-pris pr. modtager.</p>
<p><strong>Enhver emoji tvinger hele beskeden til Unicode-tilstand</strong> — ikke kun den del der følger efter emojien. En besked på 155 tegn med én emoji på position 156 koster ikke én SMS — den koster tre (155 tegn ÷ 67 Unicode-multipart-tegn per segment). Det samme gælder for typografiske anførselstegn (" "), tankestreger (—) og ethvert tegn der ikke er i GSM-7-alfabetet.</p>

<h2>Flerdelede beskeder: den skjulte pris per segment</h2>
<p>Når en besked overstiger ét segment, skal operatørnetværket dele den i flere dele og samle den igen på modtagerens enhed. Denne samling kræver en lille <strong>header i hvert segment</strong> — 7 bytes for GSM-7 og 3 bytes for Unicode — som reducerer de anvendelige tegn per del.</p>
<p>I praksis: en enkelt GSM-7-besked rummer <strong>160 tegn</strong>, men en todelt GSM-7-besked rummer kun <strong>153 tegn per segment</strong> (306 i alt). En enkelt Unicode-besked rummer <strong>70 tegn</strong>, og en todelt kun <strong>67 per segment</strong> (134 i alt). At gå bare lidt over 160 (eller 70) tegn tilføjer ikke kun ét segment — det genberegner også kapaciteten for alle tidligere segmenter.</p>

<h2>Udvidede GSM-tegn: symbolerne med dobbeltomkostning</h2>
<p>Inden for GSM-7 findes der et lille sæt tegn der hører til den <strong>udvidede tegntabel</strong>: <strong>€ [ ] { } \\ | ~</strong> og cirkumflekset <strong>^</strong>. Hvert af disse tæller som <strong>to tegn</strong> i dit SMS-budget, ikke ét. En besked der indeholder fire euro-tegn, har effektivt brugt 8 tegn af GSM-7-grænsen, ikke 4.</p>
<p>PostTruncate tæller udvidede tegn til deres sande vægt på to slots, så det viste antal er det tal der betyder noget for opkrævningen.</p>`,
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
      en: 'Threads Character Counter — 500 Char Limit, Links & Chain Posts Explained',
      es: 'Contador de Caracteres para Threads — Límite de 500, enlaces y cadenas explicados',
      de: 'Threads Zeichenzähler — 500-Zeichen-Limit, Links und Ketten erklärt',
      fr: 'Compteur de Caractères Threads — Limite 500, liens et chaînes expliqués',
      pt: 'Contador de Caracteres do Threads — Limite de 500, links e encadeamentos explicados',
      it: 'Contatore di Caratteri Threads — Limite 500, link e catene spiegati',
      nl: 'Threads Tekenteller — 500-tekenlimiet, links en ketens uitgelegd',
      ja: 'Threads文字数カウンター — 500文字制限・リンクカウント・連鎖投稿を解説',
      zh: 'Threads字符计数器 — 500字符限制、链接计数与连锁帖文详解',
      da: 'Threads Tegntæller — 500-tegn-grænse, links og kæder forklaret',
    },

    metaDescriptions: {
      en: 'Free Threads character counter. See your 500-char limit in real time, understand how full-length links eat your budget unlike X, and auto-chain overflow into numbered reply posts.',
      es: 'Contador de caracteres para Threads gratis. Visualiza el límite de 500 caracteres en tiempo real, entiende por qué los enlaces completos consumen más espacio que en X y encadena automáticamente el texto sobrante.',
      de: 'Kostenloser Threads-Zeichenzähler. Verfolge das 500-Zeichen-Limit in Echtzeit, versteh warum Links den vollen Platz beanspruchen und verkette überschüssigen Text automatisch als Antwortposts.',
      fr: 'Compteur de caractères Threads gratuit. Visualisez votre limite de 500 caractères en temps réel, comprenez pourquoi les liens complets consomment plus d\'espace qu\'sur X et enchaînez automatiquement le texte excédentaire.',
      pt: 'Contador de caracteres do Threads gratuito. Veja o limite de 500 caracteres em tempo real, entenda por que links completos consomem mais espaço do que no X e encadeie automaticamente o texto excedente.',
      it: 'Contatore di caratteri Threads gratuito. Visualizza il limite di 500 caratteri in tempo reale, capisci perché i link completi consumano più spazio che su X e concatena automaticamente il testo in eccesso.',
      nl: 'Gratis Threads tekenteller. Zie je 500-tekenlimiet in real time, begrijp waarom volledige links meer ruimte kosten dan op X en koppel automatisch overflow aan genummerde antwoordposts.',
      ja: '無料Threads文字数カウンター。500文字の制限をリアルタイムで確認、XとはXとは異なりリンクが文字数をフルで消費する仕組みを理解、超過分を自動で番号付きリプライに分割。',
      zh: '免费Threads字符计数器。实时查看500字符上限，了解链接与X不同会按完整长度计入字符数，并将超出内容自动拆分为编号回复帖。',
      da: 'Gratis Threads tegntæller. Se din 500-tegn-grænse i realtid, forstå hvorfor fulde links bruger mere plads end på X, og kæd automatisk overflow til nummererede svar-opslag.',
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
  {
    id: 'google-serp',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-05',
    platformLimits:
      'Page title: 60 characters before Google truncates in search results (~600px pixel width), meta description: 155 characters before truncation in search snippets',

    slugs: {
      en: 'google-serp-preview',
      es: 'simulador-serp-google',
      de: 'google-serp-vorschau',
      fr: 'apercu-serp-google',
      pt: 'simulador-serp-google',
      it: 'anteprima-serp-google',
      nl: 'google-serp-voorbeeld',
      ja: 'google-serp-pureza',
      zh: 'google-serp-mo-ni-qi',
      da: 'google-serp-forhaandsvisning',
    },

    schemaName: {
      en: 'Google SERP Preview Tool',
      es: 'Simulador SERP de Google',
      de: 'Google SERP Vorschau-Tool',
      fr: 'Outil d\'aperçu SERP Google',
      pt: 'Simulador SERP do Google',
      it: 'Strumento di Anteprima SERP Google',
      nl: 'Google SERP Voorbeeld Tool',
      ja: 'Google SERPプレビューツール',
      zh: 'Google SERP 预览工具',
      da: 'Google SERP Forhåndsvisningsværktøj',
    },

    titles: {
      en: 'Google SERP Preview Tool — Check Title Tag & Meta Description Length Free',
      es: 'Simulador SERP de Google — Comprueba el título y la meta descripción gratis',
      de: 'Google SERP Vorschau-Tool — Title Tag und Meta Description kostenlos prüfen',
      fr: 'Aperçu SERP Google — Vérifiez title tag et meta description gratuitement',
      pt: 'Simulador SERP do Google — Verifique title tag e meta description grátis',
      it: 'Anteprima SERP Google — Controlla title tag e meta description gratis',
      nl: 'Google SERP Voorbeeld — Controleer title tag en meta description gratis',
      ja: 'Google SERPプレビューツール — タイトルタグとメタディスクリプションの文字数を無料確認',
      zh: 'Google SERP预览工具 — 免费检查标题标签和元描述长度',
      da: 'Google SERP Forhåndsvisning — Tjek title tag og meta description gratis',
    },

    metaDescriptions: {
      en: 'Free Google SERP preview tool. Check your title tag stays under 60 chars, meta description under 155 chars, and see exactly how your page will look in Google search results before you publish.',
      es: 'Simulador SERP de Google gratis. Comprueba que tu title tag no supere los 60 caracteres, la meta descripción los 155, y visualiza exactamente cómo aparecerá tu página en Google antes de publicar.',
      de: 'Kostenloses Google SERP Vorschau-Tool. Prüfe ob dein Title Tag unter 60 Zeichen und deine Meta Description unter 155 Zeichen bleibt, und sieh wie deine Seite in den Google-Suchergebnissen aussieht.',
      fr: 'Outil d\'aperçu SERP Google gratuit. Vérifiez que votre title tag reste sous 60 caractères, la meta description sous 155, et visualisez exactement comment votre page apparaîtra dans Google.',
      pt: 'Simulador SERP do Google gratuito. Verifique se o title tag fica abaixo de 60 caracteres, a meta description abaixo de 155, e veja exatamente como sua página aparecerá no Google.',
      it: 'Strumento di anteprima SERP Google gratuito. Controlla che il title tag rimanga sotto i 60 caratteri, la meta description sotto i 155, e visualizza come apparirà la tua pagina su Google.',
      nl: 'Gratis Google SERP voorbeeld tool. Controleer of je title tag onder de 60 tekens blijft, meta description onder de 155, en zie precies hoe je pagina in Google zoekresultaten verschijnt.',
      ja: '無料Google SERPプレビューツール。タイトルタグが60文字以内、メタディスクリプションが155文字以内かを確認し、公開前にGoogleの検索結果での表示を正確にプレビューできます。',
      zh: '免费Google SERP预览工具。检查标题标签是否在60字符以内，元描述是否在155字符以内，并在发布前精确预览页面在Google搜索结果中的显示效果。',
      da: 'Gratis Google SERP forhåndsvisningsværktøj. Tjek at dit title tag holder sig under 60 tegn, meta description under 155, og se præcis hvordan din side vil se ud i Googles søgeresultater.',
    },

    content: {
      en: `<h2>Why the title tag character limit decides your click-through rate</h2>
<p>Your page's title tag is the single most visible element in a Google search result — the blue headline that users read before deciding whether to click. Google displays titles up to roughly <strong>600 pixels wide</strong>, which translates to approximately <strong>60 characters</strong> for average-weight Latin text. Beyond that, the title is cut off with an ellipsis and the end of your message disappears.</p>
<p>Truncated titles consistently underperform complete ones. When a user can't read the full title, they lose the context that would have made them click. Worse, if the keyword that matches their search query is positioned toward the end of a long title, it may be the exact word that gets cut — eliminating the relevance signal that would have earned the click.</p>
<p>PostTruncate's <strong>Google SERP preview tool</strong> shows your title in a live Google-style snippet as you type. The preview updates instantly, so you can see whether your title fits cleanly or trails off with "…" before you publish the page.</p>

<h2>Meta description length: 155 characters and the truncation risk</h2>
<p>The meta description is the grey body text beneath the title in a Google search snippet. It doesn't directly affect rankings, but it has a significant impact on <strong>click-through rate</strong> — the proportion of users who see your result and choose to visit your page. A well-written meta description tells the user exactly what they'll find on your page and why it's worth their click.</p>
<p>Google truncates meta descriptions at approximately <strong>155 characters</strong> on desktop (shorter on mobile). A description that runs to 200 characters may look complete in your CMS, but in the actual search result it ends mid-sentence — cutting off the call to action, the key benefit statement, or the specific detail that would have differentiated your result from competitors.</p>
<p>PostTruncate's <strong>meta description length checker</strong> counts your characters in real time and previews the description exactly as it will appear in a Google snippet, including the truncation point if you go over.</p>

<h2>How Google actually decides what to show in snippets</h2>
<p>Google doesn't always use your meta description verbatim. When the search query matches a passage on your page more closely than your meta description, Google may replace your description with an extracted snippet from the page body. This is not something you can fully control, but you can influence it. <strong>A meta description that reads like natural search intent — answering the query directly — is more likely to be preserved by Google</strong> than a generic marketing tagline.</p>
<p>The same principle applies to titles. If your title tag is too generic or too long, Google may rewrite it entirely. Keeping your title specific, under 60 characters, and front-loaded with the primary keyword gives Google less reason to override it.</p>

<h2>The pixel-width nuance: why character count isn't the full story</h2>
<p>Google measures title width in pixels, not characters. A title composed entirely of narrow letters like "i", "l", and "t" can fit more characters than a title using wide letters like "W", "M", and "m". PostTruncate tracks both character count and estimated pixel width simultaneously, flagging titles that are safe on character count but may still truncate due to wide characters. This is the same calculation Google uses — not a generic approximation.</p>

<h2>Write once, preview before you publish</h2>
<p>Most SEO writers draft in a CMS or spreadsheet, switch to a separate SERP preview tool, copy the text, check, adjust, then paste back. PostTruncate integrates the <strong>live SERP preview</strong> directly into the writing editor, so the entire workflow happens in one place. Type your title and description, see the Google snippet update in real time, confirm it looks right, and copy it to your CMS — no tab switching required.</p>`,

      es: `<h2>Por qué el límite de caracteres del title tag decide tu tasa de clics</h2>
<p>El title tag de tu página es el elemento más visible en un resultado de búsqueda de Google: el titular azul que los usuarios leen antes de decidir si hacen clic. Google muestra títulos de hasta aproximadamente <strong>600 píxeles de ancho</strong>, lo que equivale a unos <strong>60 caracteres</strong> para texto latino de peso medio. A partir de ahí, el título se corta con puntos suspensivos y el final de tu mensaje desaparece.</p>
<p>Los títulos truncados tienen un rendimiento consistentemente inferior a los completos. Cuando un usuario no puede leer el título completo, pierde el contexto que le habría llevado a hacer clic. Lo que es peor, si la palabra clave que coincide con su búsqueda está hacia el final de un título largo, puede ser exactamente la palabra que se corte, eliminando la señal de relevancia que habría ganado el clic.</p>
<p>El <strong>simulador SERP de Google</strong> de PostTruncate muestra tu título en un fragmento de estilo Google en tiempo real mientras escribes. La vista previa se actualiza al instante, para que veas si tu título encaja limpiamente o se corta con "…" antes de publicar la página.</p>

<h2>Longitud de la meta descripción: 155 caracteres y el riesgo de truncamiento</h2>
<p>La meta descripción es el texto gris bajo el título en un fragmento de búsqueda de Google. No afecta directamente al posicionamiento, pero tiene un impacto significativo en la <strong>tasa de clics</strong>. Una meta descripción bien escrita dice al usuario exactamente qué encontrará en tu página y por qué vale la pena su clic.</p>
<p>Google trunca las meta descripciones a aproximadamente <strong>155 caracteres</strong> en escritorio (menos en móvil). Una descripción de 200 caracteres puede parecer completa en tu CMS, pero en el resultado de búsqueda real termina a mitad de frase, cortando la llamada a la acción, el beneficio clave o el detalle específico que habría diferenciado tu resultado del de los competidores.</p>
<p>El <strong>comprobador de longitud de meta descripción</strong> de PostTruncate cuenta tus caracteres en tiempo real y muestra la descripción exactamente como aparecerá en un fragmento de Google, incluyendo el punto de truncamiento si te excedes.</p>

<h2>Cómo decide realmente Google lo que muestra en los fragmentos</h2>
<p>Google no siempre usa tu meta descripción tal cual. Cuando la consulta de búsqueda coincide más con un pasaje de tu página que con tu meta descripción, Google puede sustituirla por un fragmento extraído del cuerpo de la página. <strong>Una meta descripción que responde directamente a la consulta tiene más probabilidades de ser conservada por Google</strong> que un tagline de marketing genérico.</p>

<h2>El matiz del ancho en píxeles: por qué el recuento de caracteres no lo es todo</h2>
<p>Google mide el ancho del título en píxeles, no en caracteres. Un título compuesto principalmente de letras estrechas puede admitir más caracteres que uno con letras anchas. PostTruncate rastrea tanto el recuento de caracteres como el ancho estimado en píxeles simultáneamente, marcando los títulos que son seguros en recuento de caracteres pero que aún podrían truncarse por letras anchas.</p>

<h2>Escribe una vez, previsualiza antes de publicar</h2>
<p>PostTruncate integra la <strong>vista previa SERP en vivo</strong> directamente en el editor de escritura. Escribe tu título y descripción, observa cómo se actualiza el fragmento de Google en tiempo real, confirma que se ve bien y cópialo a tu CMS, sin cambiar de pestaña.</p>`,

      de: `<h2>Warum das Zeichen-Limit des Title Tags deine Klickrate bestimmt</h2>
<p>Der Title Tag deiner Seite ist das sichtbarste Element in einem Google-Suchergebnis — die blaue Überschrift, die Nutzerinnen und Nutzer lesen, bevor sie entscheiden, ob sie klicken. Google zeigt Titel bis zu einer Breite von etwa <strong>600 Pixeln</strong> an, was ungefähr <strong>60 Zeichen</strong> für lateinischen Text mit Durchschnittsbreite entspricht. Darüber hinaus wird der Titel mit einem Auslassungszeichen abgeschnitten.</p>
<p>Abgeschnittene Titel performen konsequent schlechter als vollständige. Wenn Nutzerinnen und Nutzer den vollständigen Titel nicht lesen können, fehlt ihnen der Kontext, der sie zum Klicken bewogen hätte. Noch schlimmer: Wenn das Keyword, das ihrer Suchanfrage entspricht, am Ende eines langen Titels steht, kann es genau das Wort sein, das wegfällt — und damit das Relevanzsignal, das den Klick verdient hätte.</p>
<p>PostTruncates <strong>Google SERP Vorschau-Tool</strong> zeigt deinen Titel in einem Live-Google-Snippet-Stil während du tippst. Die Vorschau aktualisiert sich sofort, sodass du siehst, ob dein Titel sauber passt oder mit „…" endet, bevor du die Seite veröffentlichst.</p>

<h2>Meta Description-Länge: 155 Zeichen und das Abschneidungsrisiko</h2>
<p>Die Meta Description ist der graue Fließtext unter dem Titel in einem Google-Suchergebnis. Sie beeinflusst das Ranking nicht direkt, hat aber einen erheblichen Einfluss auf die <strong>Klickrate</strong>. Eine gut formulierte Meta Description sagt Nutzenden genau, was sie auf deiner Seite finden werden und warum es ihren Klick wert ist.</p>
<p>Google schneidet Meta Descriptions bei ungefähr <strong>155 Zeichen</strong> auf dem Desktop ab (kürzer auf Mobilgeräten). Eine Beschreibung mit 200 Zeichen mag in deinem CMS vollständig aussehen, endet im tatsächlichen Suchergebnis aber mitten im Satz — und schneidet damit den Call-to-Action, die Kernbotschaft oder das spezifische Detail ab, das dein Ergebnis von Wettbewerbern unterschieden hätte.</p>
<p>PostTruncates <strong>Meta Description Längenchecker</strong> zählt deine Zeichen in Echtzeit und zeigt die Beschreibung genau so in der Vorschau, wie sie in einem Google-Snippet erscheinen wird, einschließlich des Abschneidepunkts wenn du das Limit überschreitest.</p>

<h2>Wie Google wirklich entscheidet, was in Snippets angezeigt wird</h2>
<p>Google verwendet deine Meta Description nicht immer wörtlich. Wenn die Suchanfrage besser zu einem Textpassage auf deiner Seite passt als zu deiner Meta Description, kann Google sie durch einen extrahierten Snippet aus dem Seiteninhalt ersetzen. <strong>Eine Meta Description, die wie eine natürliche Suchanfrage klingt — die Anfrage direkt beantwortet — wird von Google eher beibehalten</strong> als ein generischer Marketing-Slogan.</p>

<h2>Die Pixel-Breiten-Nuance: Warum Zeichenanzahl nicht alles ist</h2>
<p>Google misst die Titelbreite in Pixeln, nicht in Zeichen. Ein Titel aus überwiegend schmalen Buchstaben kann mehr Zeichen aufnehmen als einer mit breiten Buchstaben. PostTruncate verfolgt gleichzeitig Zeichenzahl und geschätzte Pixelbreite und kennzeichnet Titel, die beim Zeichencount sicher sind, aber durch breite Zeichen noch immer abgeschnitten werden könnten.</p>

<h2>Einmal schreiben, vor der Veröffentlichung prüfen</h2>
<p>PostTruncate integriert die <strong>Live-SERP-Vorschau</strong> direkt in den Schreibeditor. Tippe Titel und Beschreibung ein, sieh das Google-Snippet in Echtzeit, bestätige das Ergebnis und kopiere es in dein CMS — ohne Tabs wechseln zu müssen.</p>`,

      fr: `<h2>Pourquoi la limite de caractères du title tag détermine votre taux de clics</h2>
<p>Le title tag de votre page est l'élément le plus visible dans un résultat de recherche Google — le titre bleu que les utilisateurs lisent avant de décider de cliquer. Google affiche les titres jusqu'à environ <strong>600 pixels de large</strong>, ce qui correspond à environ <strong>60 caractères</strong> pour du texte latin de poids moyen. Au-delà, le titre est tronqué avec des points de suspension.</p>
<p>Les titres tronqués sous-performent systématiquement par rapport aux titres complets. Quand un utilisateur ne peut pas lire le titre entier, il perd le contexte qui l'aurait incité à cliquer. Pire encore, si le mot-clé correspondant à sa recherche se trouve vers la fin d'un long titre, c'est peut-être exactement le mot qui sera coupé — supprimant le signal de pertinence qui aurait décroché le clic.</p>
<p>L'<strong>outil d'aperçu SERP Google</strong> de PostTruncate affiche votre titre dans un extrait de style Google en temps réel pendant que vous tapez. L'aperçu se met à jour instantanément, pour que vous voyiez si votre titre s'intègre proprement ou se termine par "…" avant de publier la page.</p>

<h2>Longueur de la méta description : 155 caractères et le risque de troncature</h2>
<p>La méta description est le texte gris sous le titre dans un extrait de recherche Google. Elle n'affecte pas directement le classement, mais a un impact significatif sur le <strong>taux de clics</strong>. Une méta description bien rédigée dit précisément à l'utilisateur ce qu'il trouvera sur votre page et pourquoi ça vaut son clic.</p>
<p>Google tronque les méta descriptions à environ <strong>155 caractères</strong> sur bureau (moins sur mobile). Une description de 200 caractères peut sembler complète dans votre CMS, mais dans le résultat de recherche réel, elle se termine en milieu de phrase — coupant l'appel à l'action, le bénéfice clé ou le détail spécifique qui aurait différencié votre résultat de ceux des concurrents.</p>
<p>Le <strong>vérificateur de longueur de méta description</strong> de PostTruncate compte vos caractères en temps réel et affiche la description exactement telle qu'elle apparaîtra dans un extrait Google, y compris le point de troncature si vous dépassez la limite.</p>

<h2>Comment Google décide réellement ce qui s'affiche dans les extraits</h2>
<p>Google n'utilise pas toujours votre méta description telle quelle. Quand la requête de recherche correspond mieux à un passage de votre page qu'à votre méta description, Google peut la remplacer par un extrait tiré du corps de la page. <strong>Une méta description qui ressemble à une intention de recherche naturelle — répondant directement à la requête — a plus de chances d'être conservée par Google</strong> qu'un slogan marketing générique.</p>

<h2>La nuance de la largeur en pixels : pourquoi le nombre de caractères ne suffit pas</h2>
<p>Google mesure la largeur du titre en pixels, pas en caractères. Un titre composé principalement de lettres étroites peut accueillir plus de caractères qu'un titre avec des lettres larges. PostTruncate suit simultanément le nombre de caractères et la largeur estimée en pixels, signalant les titres qui sont sûrs en nombre de caractères mais qui pourraient encore être tronqués en raison de lettres larges.</p>

<h2>Rédigez une fois, prévisualisez avant de publier</h2>
<p>PostTruncate intègre l'<strong>aperçu SERP en direct</strong> directement dans l'éditeur de rédaction. Tapez votre titre et votre description, regardez l'extrait Google se mettre à jour en temps réel, confirmez le résultat et copiez-le dans votre CMS — sans changer d'onglet.</p>`,

      pt: `<h2>Por que o limite de caracteres do title tag decide sua taxa de cliques</h2>
<p>O title tag da sua página é o elemento mais visível em um resultado de busca do Google — o título azul que os usuários leem antes de decidir clicar. O Google exibe títulos de até aproximadamente <strong>600 pixels de largura</strong>, o que equivale a cerca de <strong>60 caracteres</strong> para texto latino de peso médio. Além disso, o título é cortado com reticências.</p>
<p>Títulos truncados consistentemente têm desempenho inferior aos completos. Quando um usuário não consegue ler o título completo, perde o contexto que o teria levado a clicar. Pior ainda, se a palavra-chave que corresponde à busca estiver no final de um título longo, pode ser exatamente a palavra que é cortada — eliminando o sinal de relevância que teria conquistado o clique.</p>
<p>A <strong>ferramenta de simulação SERP do Google</strong> do PostTruncate exibe seu título em um snippet no estilo Google em tempo real enquanto você digita. A visualização é atualizada instantaneamente, para que você veja se seu título se encaixa com clareza ou termina com "…" antes de publicar a página.</p>

<h2>Comprimento da meta description: 155 caracteres e o risco de truncamento</h2>
<p>A meta description é o texto cinza abaixo do título em um snippet de busca do Google. Ela não afeta diretamente o ranking, mas tem um impacto significativo na <strong>taxa de cliques</strong>. Uma meta description bem escrita diz ao usuário exatamente o que encontrará na sua página e por que vale o clique.</p>
<p>O Google trunca as meta descriptions em aproximadamente <strong>155 caracteres</strong> no desktop (menos no mobile). Uma descrição de 200 caracteres pode parecer completa no seu CMS, mas no resultado de busca real termina no meio de uma frase — cortando a chamada para ação, o benefício principal ou o detalhe específico que diferenciaria seu resultado dos concorrentes.</p>
<p>O <strong>verificador de comprimento de meta description</strong> do PostTruncate conta seus caracteres em tempo real e exibe a descrição exatamente como aparecerá em um snippet do Google, incluindo o ponto de truncamento se você ultrapassar o limite.</p>

<h2>Como o Google decide o que mostrar nos snippets</h2>
<p>O Google nem sempre usa sua meta description literalmente. Quando a consulta de busca corresponde melhor a um trecho da sua página do que à sua meta description, o Google pode substituí-la por um snippet extraído do corpo da página. <strong>Uma meta description que soa como intenção de busca natural — respondendo diretamente à consulta — tem mais chances de ser preservada pelo Google</strong> do que um slogan de marketing genérico.</p>

<h2>A nuance da largura em pixels: por que a contagem de caracteres não é tudo</h2>
<p>O Google mede a largura do título em pixels, não em caracteres. Um título composto principalmente de letras estreitas pode caber mais caracteres do que um com letras largas. O PostTruncate rastreia simultaneamente a contagem de caracteres e a largura estimada em pixels, sinalizando títulos que estão seguros na contagem de caracteres, mas que ainda podem ser truncados devido a letras largas.</p>

<h2>Escreva uma vez, visualize antes de publicar</h2>
<p>O PostTruncate integra a <strong>visualização SERP ao vivo</strong> diretamente no editor de escrita. Digite seu título e descrição, veja o snippet do Google atualizar em tempo real, confirme que está correto e copie para o seu CMS — sem trocar de aba.</p>`,

      it: `<h2>Perché il limite di caratteri del title tag determina il tuo tasso di clic</h2>
<p>Il title tag della tua pagina è l'elemento più visibile in un risultato di ricerca Google — il titolo blu che gli utenti leggono prima di decidere se cliccare. Google mostra i titoli fino a circa <strong>600 pixel di larghezza</strong>, equivalente a circa <strong>60 caratteri</strong> per testo latino di peso medio. Oltre questo limite, il titolo viene tagliato con i puntini di sospensione.</p>
<p>I titoli troncati performano sistematicamente peggio di quelli completi. Quando un utente non riesce a leggere il titolo per intero, perde il contesto che lo avrebbe spinto a cliccare. Peggio ancora, se la parola chiave che corrisponde alla sua ricerca si trova verso la fine di un titolo lungo, potrebbe essere esattamente la parola che viene tagliata — eliminando il segnale di rilevanza che avrebbe guadagnato il clic.</p>
<p>Lo <strong>strumento di anteprima SERP Google</strong> di PostTruncate mostra il tuo titolo in uno snippet in stile Google in tempo reale mentre scrivi. L'anteprima si aggiorna all'istante, così puoi vedere se il tuo titolo si adatta perfettamente o finisce con "…" prima di pubblicare la pagina.</p>

<h2>Lunghezza della meta description: 155 caratteri e il rischio di troncatura</h2>
<p>La meta description è il testo grigio sotto il titolo in uno snippet di ricerca Google. Non influisce direttamente sul posizionamento, ma ha un impatto significativo sul <strong>tasso di clic</strong>. Una meta description ben scritta dice all'utente esattamente cosa troverà sulla tua pagina e perché vale il suo clic.</p>
<p>Google tronca le meta description a circa <strong>155 caratteri</strong> su desktop (meno su mobile). Una descrizione di 200 caratteri può sembrare completa nel tuo CMS, ma nel risultato di ricerca reale finisce a metà frase — tagliando la call to action, il beneficio principale o il dettaglio specifico che avrebbe differenziato il tuo risultato dai concorrenti.</p>
<p>Il <strong>controllore della lunghezza della meta description</strong> di PostTruncate conta i tuoi caratteri in tempo reale e mostra la descrizione esattamente come apparirà in uno snippet Google, incluso il punto di troncatura se superi il limite.</p>

<h2>Come Google decide davvero cosa mostrare negli snippet</h2>
<p>Google non utilizza sempre la tua meta description alla lettera. Quando la query di ricerca corrisponde meglio a un passaggio della tua pagina che alla tua meta description, Google può sostituirla con uno snippet estratto dal corpo della pagina. <strong>Una meta description che assomiglia a un'intenzione di ricerca naturale — rispondendo direttamente alla query — ha più probabilità di essere mantenuta da Google</strong> rispetto a uno slogan di marketing generico.</p>

<h2>La sfumatura della larghezza in pixel: perché il conteggio dei caratteri non basta</h2>
<p>Google misura la larghezza del titolo in pixel, non in caratteri. Un titolo composto principalmente da lettere strette può contenere più caratteri di uno con lettere larghe. PostTruncate tiene traccia simultaneamente del conteggio dei caratteri e della larghezza stimata in pixel, segnalando i titoli che sono sicuri nel conteggio ma che potrebbero comunque essere troncati a causa di caratteri larghi.</p>

<h2>Scrivi una volta, visualizza prima di pubblicare</h2>
<p>PostTruncate integra l'<strong>anteprima SERP live</strong> direttamente nell'editor di scrittura. Digita titolo e descrizione, guarda lo snippet Google aggiornarsi in tempo reale, conferma il risultato e copialo nel tuo CMS — senza cambiare scheda.</p>`,

      nl: `<h2>Waarom de tekenlimiet van de title tag je klikfrequentie bepaalt</h2>
<p>De title tag van je pagina is het meest zichtbare element in een Google-zoekresultaat — de blauwe kop die gebruikers lezen voordat ze beslissen of ze klikken. Google geeft titels weer tot ongeveer <strong>600 pixels breed</strong>, wat neerkomt op ruwweg <strong>60 tekens</strong> voor Latijnse tekst van gemiddeld gewicht. Daarboven wordt de titel afgekapt met een ellips.</p>
<p>Afgekapte titels presteren consequent slechter dan volledige. Wanneer een gebruiker de volledige titel niet kan lezen, mist hij de context die hem zou hebben aangezet tot klikken. Erger nog: als het zoekwoord dat overeenkomt met zijn zoekopdracht aan het einde van een lange titel staat, kan het precies het woord zijn dat wegvalt — waardoor het relevantiesignaal verdwijnt dat de klik had verdiend.</p>
<p>PostTruncates <strong>Google SERP voorbeeld tool</strong> toont je titel in een live Google-stijl snippet terwijl je typt. De voorvertoning wordt direct bijgewerkt, zodat je kunt zien of je titel netjes past of eindigt met "…" voordat je de pagina publiceert.</p>

<h2>Lengte van de meta description: 155 tekens en het afkaprisico</h2>
<p>De meta description is de grijze bodytekst onder de titel in een Google-zoekresultaatfragment. Het beïnvloedt het ranking niet direct, maar heeft een aanzienlijke impact op de <strong>klikfrequentie</strong>. Een goed geschreven meta description vertelt de gebruiker precies wat hij op je pagina zal vinden en waarom het zijn klik waard is.</p>
<p>Google kapt meta descriptions af bij ongeveer <strong>155 tekens</strong> op desktop (korter op mobiel). Een beschrijving van 200 tekens kan er in je CMS compleet uitzien, maar in het daadwerkelijke zoekresultaat eindigt het halverwege een zin — waarbij de call-to-action, de kernboodschap of het specifieke detail wordt afgeknipt dat jouw resultaat had onderscheiden van concurrenten.</p>
<p>PostTruncates <strong>meta description lengte checker</strong> telt je tekens in real time en toont de beschrijving precies zoals die in een Google-fragment zal verschijnen, inclusief het afkappunt als je over de limiet gaat.</p>

<h2>Hoe Google echt beslist wat er in snippets staat</h2>
<p>Google gebruikt je meta description niet altijd letterlijk. Wanneer de zoekopdracht beter overeenkomt met een passage op je pagina dan met je meta description, kan Google die vervangen door een geëxtraheerd fragment uit de paginatekst. <strong>Een meta description die klinkt als een natuurlijke zoekintentie — die de vraag direct beantwoordt — heeft meer kans door Google bewaard te worden</strong> dan een generieke marketingslogan.</p>

<h2>De pixelbreedtenuance: waarom tekentelling niet alles is</h2>
<p>Google meet titelbreedtes in pixels, niet in tekens. Een titel van voornamelijk smalle letters kan meer tekens bevatten dan een titel met brede letters. PostTruncate houdt gelijktijdig tekentelling en geschatte pixelbreedte bij, en markeert titels die veilig zijn qua tekentelling maar mogelijk toch worden afgeknipt door brede tekens.</p>

<h2>Schrijf één keer, bekijk voor publicatie</h2>
<p>PostTruncate integreert de <strong>live SERP-voorvertoning</strong> direct in de schrijfeditor. Typ je titel en beschrijving, zie het Google-snippet in real time bijwerken, bevestig dat het er goed uitziet en kopieer het naar je CMS — zonder van tabblad te wisselen.</p>`,

      ja: `<h2>タイトルタグの文字数制限がクリック率を左右する理由</h2>
<p>ページのタイトルタグはGoogleの検索結果で最も目に入る要素です——ユーザーがクリックするかどうかを判断する前に読む青いヘッドラインです。Googleは約<strong>600ピクセル幅</strong>のタイトルを表示します。これは平均的なラテン文字テキストで約<strong>60文字</strong>に相当します。それを超えると、タイトルは省略記号で切り取られ、メッセージの末尾が消えてしまいます。</p>
<p>切り取られたタイトルは完全なタイトルよりも一貫してパフォーマンスが低下します。ユーザーがタイトル全体を読めないと、クリックを後押しするはずだったコンテキストが失われます。さらに悪いことに、検索クエリに一致するキーワードが長いタイトルの末尾に配置されていると、そのキーワードが切り取られる可能性があります——クリックを獲得するはずだった関連性シグナルが消えてしまうのです。</p>
<p>PostTruncateの<strong>Google SERPプレビューツール</strong>は入力中にGoogleスタイルのスニペットでタイトルをリアルタイム表示します。プレビューは即座に更新されるため、ページを公開する前にタイトルがきれいに収まるか、「…」で終わるかを確認できます。</p>

<h2>メタディスクリプションの長さ：155文字と切り捨てリスク</h2>
<p>メタディスクリプションはGoogleの検索スニペットでタイトルの下に表示されるグレーの本文テキストです。ランキングに直接影響しませんが、<strong>クリック率</strong>——検索結果を見てページを訪問することを選ぶユーザーの割合——に大きな影響を与えます。良く書かれたメタディスクリプションはユーザーにそのページで何が見つかるか、なぜクリックする価値があるかを正確に伝えます。</p>
<p>Googleはデスクトップでメタディスクリプションを約<strong>155文字</strong>で切り捨てます（モバイルではさらに短い）。200文字の説明はCMSでは完全に見えても、実際の検索結果では文の途中で終わり、競合との差別化ポイントとなるはずだった行動喚起、主要なベネフィット、または具体的な詳細が切り取られます。</p>
<p>PostTruncateの<strong>メタディスクリプション文字数チェッカー</strong>はリアルタイムで文字数をカウントし、Googleスニペットでの実際の表示をプレビューします。制限を超えた場合は切り捨てポイントも表示します。</p>

<h2>Googleがスニペットに何を表示するかを実際に決める仕組み</h2>
<p>Googleは常にメタディスクリプションをそのまま使用するわけではありません。検索クエリがメタディスクリプションよりもページ内のある文章と一致する場合、Googleはページ本文から抽出したスニペットで置き換えることがあります。<strong>自然な検索意図のように読めるメタディスクリプション——クエリに直接答えるもの——は、一般的なマーケティングのタグラインよりもGoogleに保持される可能性が高い</strong>のです。</p>

<h2>ピクセル幅の細かい話：文字数だけでは不十分な理由</h2>
<p>Googleはタイトルの幅を文字数ではなくピクセルで測定します。「i」「l」「t」などの細い文字で構成されたタイトルは、「W」「M」「m」などの幅広い文字のタイトルより多くの文字を収められます。PostTruncateは文字数と推定ピクセル幅を同時に追跡し、文字数では安全でも幅広い文字のために切り捨てられる可能性があるタイトルにフラグを立てます。</p>

<h2>一度書いて、公開前にプレビューする</h2>
<p>PostTruncateは<strong>ライブSERPプレビュー</strong>をライティングエディターに直接統合しています。タイトルと説明を入力し、Googleスニペットがリアルタイムで更新されるのを確認し、正しく見えることを確認してCMSにコピーするまで、タブを切り替える必要がありません。</p>`,

      zh: `<h2>为什么标题标签的字符限制决定了你的点击率</h2>
<p>页面的标题标签是Google搜索结果中最显眼的元素——用户在决定是否点击之前会先阅读这个蓝色标题。Google展示的标题最宽约<strong>600像素</strong>，对于平均字重的拉丁文字约对应<strong>60个字符</strong>。超出这个范围，标题就会被省略号截断，你的信息末尾就此消失。</p>
<p>被截断的标题始终比完整标题表现差。当用户无法读到完整标题时，就失去了原本能驱使他们点击的上下文信息。更糟糕的是，如果与搜索词匹配的关键词位于长标题的末尾，那被截断的很可能正是那个词——带走了本该赢得点击的相关性信号。</p>
<p>PostTruncate的<strong>Google SERP预览工具</strong>在你输入时实时以Google风格的摘要显示你的标题。预览即时更新，让你在发布页面前就能看清标题是否整洁呈现，还是以"…"收尾。</p>

<h2>元描述长度：155个字符与截断风险</h2>
<p>元描述是Google搜索摘要中标题下方的灰色正文文字。它不直接影响排名，但对<strong>点击率</strong>有显著影响——即看到你的结果后选择访问页面的用户比例。写得好的元描述会精确告诉用户页面上有什么，以及为什么值得点击。</p>
<p>Google在桌面端将元描述截断至约<strong>155个字符</strong>（移动端更短）。一段200字符的描述在你的CMS里看起来完整，但在实际搜索结果中却半句而止——行动号召、核心价值主张或本能让你从竞争对手中脱颖而出的具体细节就此消失。</p>
<p>PostTruncate的<strong>元描述长度检查器</strong>实时计算字符数，并精确预览描述在Google摘要中的显示效果，超出限制时还会显示截断点。</p>

<h2>Google实际上如何决定摘要中显示什么</h2>
<p>Google并不总是原封不动地使用你的元描述。当搜索查询与页面正文某段内容的匹配度高于元描述时，Google可能会用从页面正文提取的片段来替换。<strong>读起来像自然搜索意图的元描述——直接回答查询——比通用的营销口号更有可能被Google保留</strong>。</p>

<h2>像素宽度的细微差别：为什么字符数并非全部</h2>
<p>Google以像素而非字符数衡量标题宽度。由"i""l""t"等细字母构成的标题比含有"W""M""m"等宽字母的标题能容纳更多字符。PostTruncate同时追踪字符数和估算的像素宽度，标记那些字符数安全但可能因宽字符而被截断的标题。</p>

<h2>写一次，发布前预览</h2>
<p>PostTruncate将<strong>实时SERP预览</strong>直接集成到写作编辑器中。输入标题和描述，看Google摘要实时更新，确认效果满意后复制到CMS——无需切换标签页。</p>`,

      da: `<h2>Hvorfor title tag-tegn­grænsen bestemmer din klikrate</h2>
<p>Din sides title tag er det mest synlige element i et Google-søgeresultat — den blå overskrift som brugere læser, inden de beslutter om de vil klikke. Google viser titler op til ca. <strong>600 pixels brede</strong>, svarende til omtrent <strong>60 tegn</strong> for latinsk tekst af gennemsnitsvægt. Ud over det afkortes titlen med en ellipse, og slutningen af dit budskab forsvinder.</p>
<p>Afkortede titler klarer sig konsekvent dårligere end komplette. Når en bruger ikke kan læse den fulde titel, mister de den kontekst der ville have fået dem til at klikke. Endnu værre: Hvis det nøgleord der matcher deres søgning er placeret mod slutningen af en lang titel, kan det være præcis det ord der skæres væk — og dermed forsvinder det relevanssignal der ville have fortjent klikket.</p>
<p>PostTruncates <strong>Google SERP forhåndsvisningsværktøj</strong> viser din titel i et live Google-stil-uddrag mens du skriver. Forhåndsvisningen opdateres øjeblikkeligt, så du kan se om din titel passer rent eller slutter med "…" inden du publicerer siden.</p>

<h2>Meta description-længde: 155 tegn og afkorteringsrisikoen</h2>
<p>Meta description er den grå brødtekst under titlen i et Google-søgeresultatuddrag. Det påvirker ikke rangordning direkte, men har en betydelig indvirkning på <strong>klikraten</strong>. En velskrevet meta description fortæller brugeren præcis hvad de vil finde på din side og hvorfor det er deres klik værd.</p>
<p>Google afkorter meta descriptions ved ca. <strong>155 tegn</strong> på desktop (kortere på mobil). En beskrivelse på 200 tegn kan se komplet ud i dit CMS, men i det faktiske søgeresultat slutter den midt i en sætning — og klipper den call to action, det centrale budskab eller det specifikke detalje der ville have adskilt dit resultat fra konkurrenternes.</p>
<p>PostTruncates <strong>meta description-længdekontrol</strong> tæller dine tegn i realtid og viser beskrivelsen præcis som den vil fremstå i et Google-uddrag, inklusiv afkorteringspunktet hvis du overskrider grænsen.</p>

<h2>Hvordan Google faktisk beslutter hvad der vises i uddrag</h2>
<p>Google bruger ikke altid din meta description ordret. Når søgeforespørgslen matcher et afsnit på din side bedre end din meta description, kan Google erstatte den med et uddrag fra sidens indhold. <strong>En meta description der lyder som naturlig søgeintention — der besvarer forespørgslen direkte — har større sandsynlighed for at blive bevaret af Google</strong> end et generisk markedsføringsslogan.</p>

<h2>Pixel-bredde-nuancen: hvorfor tegntælling ikke er det hele</h2>
<p>Google måler titelbredde i pixels, ikke i tegn. En titel sammensat af smalle bogstaver kan rumme flere tegn end en med brede bogstaver. PostTruncate sporer samtidig tegntælling og estimeret pixelbredde og markerer titler der er sikre på tegntælling men stadig kan blive afkortet på grund af brede tegn.</p>

<h2>Skriv én gang, forhåndsvis inden publicering</h2>
<p>PostTruncate integrerer <strong>live SERP-forhåndsvisning</strong> direkte i skrivereditoren. Skriv din titel og beskrivelse, se Google-uddraget opdatere sig i realtid, bekræft at det ser rigtigt ud, og kopiér det til dit CMS — uden at skifte faner.</p>`,
    },
  },
];
