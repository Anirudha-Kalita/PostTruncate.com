// ──────────────────────────────────────────────────────────────────────────
// Utility/calculator tool registry — the "Tools" suite.
//
// Parallel to src/data/tools.ts (platform pages) but for generic, high-volume
// text utilities. Each entry drives one page per locale at
//   /[lang]/tools/<slug>/
// rendered by src/components/CalculatorPageContent.astro, with a live Preact
// island chosen by `id` in the route's component map.
//
// Reuses the ToolDefinition shape so it composes with the same content helpers
// (prepareToolContent / buildCanonicalSlugs) and StructuredData component.
//
// Conventions (mirror tools.ts):
//  • slugs/titles/metaDescriptions/content/schemaName/faq/intro keyed by locale.
//  • Falls back to "en" at render time if a locale key is missing.
//  • content is 300+ words of keyword-rich, locale-native prose with <h2> blocks
//    (the <h2> order is shared across locales — it drives the on-page jump nav).
//  • editorAnchor/platformLimits are unused by calculators but kept to satisfy
//    the shared ToolDefinition interface.
// ──────────────────────────────────────────────────────────────────────────

import type { ToolDefinition } from './tools';

export const calculators: ToolDefinition[] = [
  {
    id: 'words-per-page',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits:
      'Single-spaced 12pt ≈ 500 words/page; double-spaced 12pt ≈ 250 words/page',

    related: {
      id: 'reading-time',
      blurb: {
        en: 'Once you know how many pages your text fills, find out how long it takes to read or present. Our reading time calculator estimates silent reading and out-loud speaking duration at any pace.',
        es: 'Cuando ya sepas cuántas páginas ocupa tu texto, descubre cuánto se tarda en leerlo o exponerlo. Nuestra calculadora de tiempo de lectura estima la lectura silenciosa y el tiempo de habla a cualquier ritmo.',
        de: 'Wenn du weißt, wie viele Seiten dein Text füllt, finde heraus, wie lange das Lesen oder Vortragen dauert. Unser Lesezeit-Rechner schätzt stille Lese- und laute Sprechzeit in jedem Tempo.',
        fr: 'Une fois que vous savez combien de pages occupe votre texte, découvrez le temps nécessaire pour le lire ou le présenter. Notre calculateur de temps de lecture estime la lecture silencieuse et la diction à voix haute à tout rythme.',
        pt: 'Depois de saber quantas páginas o seu texto ocupa, descubra quanto tempo leva a lê-lo ou apresentá-lo. A nossa calculadora de tempo de leitura estima a leitura silenciosa e a fala em voz alta a qualquer ritmo.',
        it: 'Una volta che sai quante pagine occupa il tuo testo, scopri quanto tempo serve per leggerlo o presentarlo. Il nostro calcolatore del tempo di lettura stima la lettura silenziosa e l’esposizione a voce alta a qualsiasi ritmo.',
        nl: 'Als je weet hoeveel pagina’s je tekst vult, ontdek dan hoelang het duurt om hem te lezen of te presenteren. Onze leestijd-calculator schat stille leestijd en spreektijd hardop in elk tempo.',
        ja: 'テキストが何ページになるか分かったら、次は読む・話すのにかかる時間も確認しましょう。読了時間計算ツールが、任意のペースでの黙読時間と音読時間を見積もります。',
        zh: '知道文本占多少页之后，再看看读完或讲完需要多久。我们的阅读时间计算器可按任意速度估算默读时间和朗读时间。',
        da: 'Når du ved, hvor mange sider din tekst fylder, kan du finde ud af, hvor lang tid det tager at læse eller fremlægge den. Vores læsetid-beregner estimerer stille læsetid og taletid højt i ethvert tempo.',
      },
    },

    slugs: {
      en: 'words-per-page-calculator',
      es: 'calculadora-palabras-por-pagina',
      de: 'woerter-pro-seite-rechner',
      fr: 'calculateur-mots-par-page',
      pt: 'calculadora-palavras-por-pagina',
      it: 'calcolatore-parole-per-pagina',
      nl: 'woorden-per-pagina-calculator',
      ja: 'tango-peji-keisan',
      zh: 'zi-shu-zhuan-ye-shu',
      da: 'ord-per-side-beregner',
    },

    schemaName: {
      en: 'Words to Pages Calculator',
      es: 'Calculadora de Palabras por Página',
      de: 'Wörter-pro-Seite-Rechner',
      fr: 'Calculateur de Mots par Page',
      pt: 'Calculadora de Palavras por Página',
      it: 'Calcolatore di Parole per Pagina',
      nl: 'Woorden-per-pagina-calculator',
      ja: '単語数からページ数の計算ツール',
      zh: '字数转页数计算器',
      da: 'Ord-per-side-beregner',
    },

    titles: {
      en: 'Words to Pages Calculator — How Many Pages Is 1,000 Words?',
      es: 'Calculadora de Palabras por Página — ¿Cuántas páginas son 1000 palabras?',
      de: 'Wörter-pro-Seite-Rechner — Wie viele Seiten sind 1000 Wörter?',
      fr: 'Calculateur de Mots par Page — Combien de pages font 1000 mots ?',
      pt: 'Calculadora de Palavras por Página — Quantas páginas são 1000 palavras?',
      it: 'Calcolatore di Parole per Pagina — Quante pagine sono 1000 parole?',
      nl: 'Woorden-per-pagina-calculator — Hoeveel pagina’s zijn 1000 woorden?',
      ja: '単語数からページ数の計算ツール — 1000語は何ページ？',
      zh: '字数转页数计算器 — 1000字是多少页？',
      da: 'Ord-per-side-beregner — Hvor mange sider er 1000 ord?',
    },

    metaDescriptions: {
      en: 'Free words-to-pages calculator. Instantly see how many pages your word count fills at 12pt single- or double-spaced — paste text or type a number.',
      es: 'Calculadora gratuita de palabras a páginas. Descubre al instante cuántas páginas ocupa tu texto a 12pt con interlineado sencillo o doble. Pega texto o escribe un número.',
      de: 'Kostenloser Wörter-zu-Seiten-Rechner. Sieh sofort, wie viele Seiten deine Wortzahl bei 12pt einfach oder doppelt füllt — Text einfügen oder Zahl eingeben.',
      fr: 'Calculateur mots-vers-pages gratuit. Voyez instantanément combien de pages votre nombre de mots remplit en 12pt simple ou double interligne. Collez du texte ou saisissez un nombre.',
      pt: 'Calculadora gratuita de palavras para páginas. Veja na hora quantas páginas o seu texto ocupa a 12pt com espaçamento simples ou duplo. Cole o texto ou digite um número.',
      it: 'Calcolatore gratuito da parole a pagine. Scopri subito quante pagine occupa il tuo testo a 12pt con interlinea singola o doppia. Incolla il testo o digita un numero.',
      nl: 'Gratis woorden-naar-pagina’s-calculator. Zie direct hoeveel pagina’s je tekst vult bij 12pt enkele of dubbele regelafstand. Plak tekst of typ een getal.',
      ja: '無料の単語数→ページ数計算ツール。12ptのシングル/ダブルで何ページになるかを即座に確認。テキストを貼り付けるか数値を入力するだけ。',
      zh: '免费的字数转页数计算器。立即查看在 12pt 单倍或双倍行距下你的字数占多少页。粘贴文本或输入数字即可。',
      da: 'Gratis ord-til-sider-beregner. Se straks, hvor mange sider dit ordtal fylder ved 12pt med enkelt eller dobbelt linjeafstand. Indsæt tekst eller skriv et tal.',
    },

    intro: {
      en: 'Wondering how many pages your essay or article will be? Enter a word count or paste your text below to estimate pages instantly for any font size and line spacing.',
      es: '¿Te preguntas cuántas páginas tendrá tu ensayo o artículo? Introduce un número de palabras o pega tu texto abajo para estimar las páginas al instante con cualquier tamaño de fuente e interlineado.',
      de: 'Du fragst dich, wie viele Seiten dein Aufsatz oder Artikel wird? Gib eine Wortzahl ein oder füge deinen Text unten ein, um die Seiten sofort für jede Schriftgröße und jeden Zeilenabstand zu schätzen.',
      fr: 'Vous vous demandez combien de pages fera votre dissertation ou votre article ? Saisissez un nombre de mots ou collez votre texte ci-dessous pour estimer les pages instantanément, quelle que soit la taille de police et l’interligne.',
      pt: 'Quer saber quantas páginas terá o seu ensaio ou artigo? Insira um número de palavras ou cole o seu texto abaixo para estimar as páginas na hora, com qualquer tamanho de fonte e espaçamento.',
      it: 'Ti chiedi quante pagine sarà il tuo saggio o articolo? Inserisci un numero di parole o incolla il tuo testo qui sotto per stimare le pagine all’istante, con qualsiasi dimensione del carattere e interlinea.',
      nl: 'Benieuwd hoeveel pagina’s je essay of artikel wordt? Voer een aantal woorden in of plak je tekst hieronder om het aantal pagina’s direct te schatten voor elke lettergrootte en regelafstand.',
      ja: 'エッセイや記事が何ページになるか気になりますか？単語数を入力するか、下にテキストを貼り付ければ、任意のフォントサイズと行間でページ数を即座に見積もれます。',
      zh: '想知道你的文章或论文有多少页？在下方输入字数或粘贴文本，即可针对任意字号和行距即时估算页数。',
      da: 'Vil du vide, hvor mange sider dit essay eller din artikel bliver? Indtast et ordtal eller indsæt din tekst nedenfor for straks at estimere sider for enhver skriftstørrelse og linjeafstand.',
    },

    content: {
      en: `<h2>How many pages is your word count?</h2>
<p>The number of pages a piece of writing fills depends on three things: the <strong>word count</strong>, the <strong>font size</strong>, and the <strong>line spacing</strong>. As a rule of thumb, a single-spaced page in a 12-point font holds about <strong>500 words</strong>, while a double-spaced page holds about <strong>250 words</strong>. So 1,000 words is roughly 2 pages single-spaced or 4 pages double-spaced.</p>
<h2>Words-to-pages quick reference</h2>
<p>Use these common counts as a starting point at 12-point: <strong>500 words</strong> ≈ 1 page single / 2 pages double; <strong>1,000 words</strong> ≈ 2 / 4; <strong>1,500 words</strong> ≈ 3 / 6; <strong>2,000 words</strong> ≈ 4 / 8; <strong>5,000 words</strong> ≈ 10 / 20. Larger fonts and wider spacing increase the page count, so the calculator above lets you match your exact assignment settings.</p>
<h2>Why page estimates vary</h2>
<p>Two documents with the same word count can run to a different number of pages. Margins, paragraph spacing, headings, block quotes, images, and the specific typeface all change how much text fits on a page. Microsoft Word, Google Docs, and Apple Pages each use slightly different defaults. This tool gives a reliable estimate based on the widely used 500-words-per-page convention — accurate enough for planning essays, blog posts, scripts, and reports.</p>
<h2>Who uses a words-per-page calculator?</h2>
<p>Students checking whether a 1,500-word essay meets a “three-page” requirement, authors planning chapter length, content marketers scoping blog posts, and speakers estimating script length all rely on words-to-pages conversions. Because PostTruncate runs entirely in your browser, your text is never uploaded — paste a full draft and the estimate updates instantly and privately.</p>`,
      es: `<h2>¿Cuántas páginas son tus palabras?</h2>
<p>El número de páginas que ocupa un texto depende de tres factores: el <strong>número de palabras</strong>, el <strong>tamaño de fuente</strong> y el <strong>interlineado</strong>. Como regla general, una página a espacio sencillo con fuente de 12 puntos contiene unas <strong>500 palabras</strong>, mientras que una a doble espacio contiene unas <strong>250 palabras</strong>. Así, 1000 palabras son aproximadamente 2 páginas a espacio sencillo o 4 a doble espacio.</p>
<h2>Referencia rápida de palabras a páginas</h2>
<p>Usa estos recuentos habituales como punto de partida con fuente de 12 puntos: <strong>500 palabras</strong> ≈ 1 página sencillo / 2 doble; <strong>1000 palabras</strong> ≈ 2 / 4; <strong>1500 palabras</strong> ≈ 3 / 6; <strong>2000 palabras</strong> ≈ 4 / 8; <strong>5000 palabras</strong> ≈ 10 / 20. Las fuentes más grandes y los interlineados más amplios aumentan el número de páginas, así que la calculadora de arriba te permite ajustar la configuración exacta de tu trabajo.</p>
<h2>Por qué varían las estimaciones</h2>
<p>Dos documentos con el mismo número de palabras pueden ocupar páginas distintas. Los márgenes, el espaciado entre párrafos, los títulos, las citas, las imágenes y la tipografía concreta cambian cuánto texto cabe en una página. Microsoft Word, Google Docs y Apple Pages usan valores predeterminados algo diferentes. Esta herramienta ofrece una estimación fiable basada en la convención de 500 palabras por página, suficientemente precisa para planificar ensayos, entradas de blog, guiones e informes.</p>
<h2>¿Quién usa una calculadora de palabras por página?</h2>
<p>Estudiantes que comprueban si un ensayo de 1500 palabras cumple un requisito de «tres páginas», autores que planifican la extensión de un capítulo, especialistas en contenidos que dimensionan entradas de blog y ponentes que estiman la duración de un guion recurren a la conversión de palabras a páginas. Como PostTruncate funciona por completo en tu navegador, tu texto nunca se sube: pega un borrador completo y la estimación se actualiza al instante y de forma privada.</p>`,
      de: `<h2>Wie viele Seiten sind deine Wörter?</h2>
<p>Wie viele Seiten ein Text füllt, hängt von drei Dingen ab: der <strong>Wortzahl</strong>, der <strong>Schriftgröße</strong> und dem <strong>Zeilenabstand</strong>. Als Faustregel gilt: Eine einfach zeilige Seite in 12-Punkt-Schrift enthält etwa <strong>500 Wörter</strong>, eine doppelt zeilige etwa <strong>250 Wörter</strong>. 1000 Wörter sind also rund 2 Seiten einfach oder 4 Seiten doppelt.</p>
<h2>Wörter-zu-Seiten-Schnellreferenz</h2>
<p>Nutze diese gängigen Werte bei 12-Punkt als Ausgangspunkt: <strong>500 Wörter</strong> ≈ 1 Seite einfach / 2 doppelt; <strong>1000 Wörter</strong> ≈ 2 / 4; <strong>1500 Wörter</strong> ≈ 3 / 6; <strong>2000 Wörter</strong> ≈ 4 / 8; <strong>5000 Wörter</strong> ≈ 10 / 20. Größere Schriften und weitere Abstände erhöhen die Seitenzahl, daher kannst du im Rechner oben deine genauen Einstellungen treffen.</p>
<h2>Warum Schätzungen schwanken</h2>
<p>Zwei Dokumente mit gleicher Wortzahl können unterschiedlich viele Seiten ergeben. Ränder, Absatzabstände, Überschriften, Blockzitate, Bilder und die konkrete Schriftart verändern, wie viel Text auf eine Seite passt. Microsoft Word, Google Docs und Apple Pages nutzen leicht unterschiedliche Voreinstellungen. Dieses Tool liefert eine verlässliche Schätzung auf Basis der verbreiteten 500-Wörter-pro-Seite-Konvention — genau genug für die Planung von Aufsätzen, Blogbeiträgen, Skripten und Berichten.</p>
<h2>Wer nutzt einen Wörter-pro-Seite-Rechner?</h2>
<p>Studierende, die prüfen, ob ein 1500-Wörter-Aufsatz eine „Drei-Seiten“-Vorgabe erfüllt, Autorinnen und Autoren, die Kapitellängen planen, Content-Marketer, die Blogbeiträge dimensionieren, und Vortragende, die die Skriptlänge schätzen, verlassen sich auf die Umrechnung von Wörtern in Seiten. Da PostTruncate vollständig in deinem Browser läuft, wird dein Text nie hochgeladen — füge einen ganzen Entwurf ein, und die Schätzung aktualisiert sich sofort und privat.</p>`,
      fr: `<h2>Combien de pages font vos mots ?</h2>
<p>Le nombre de pages qu’occupe un texte dépend de trois éléments : le <strong>nombre de mots</strong>, la <strong>taille de police</strong> et l’<strong>interligne</strong>. En règle générale, une page en interligne simple avec une police de 12 points contient environ <strong>500 mots</strong>, contre environ <strong>250 mots</strong> en interligne double. Ainsi, 1000 mots représentent environ 2 pages en simple ou 4 pages en double.</p>
<h2>Référence rapide mots-vers-pages</h2>
<p>Utilisez ces valeurs courantes en 12 points comme point de départ : <strong>500 mots</strong> ≈ 1 page simple / 2 double ; <strong>1000 mots</strong> ≈ 2 / 4 ; <strong>1500 mots</strong> ≈ 3 / 6 ; <strong>2000 mots</strong> ≈ 4 / 8 ; <strong>5000 mots</strong> ≈ 10 / 20. Les polices plus grandes et les interlignes plus larges augmentent le nombre de pages ; le calculateur ci-dessus vous permet donc de reproduire les réglages exacts de votre travail.</p>
<h2>Pourquoi les estimations varient</h2>
<p>Deux documents au même nombre de mots peuvent tenir sur un nombre de pages différent. Les marges, l’espacement des paragraphes, les titres, les citations, les images et la police précise modifient la quantité de texte par page. Microsoft Word, Google Docs et Apple Pages utilisent des réglages par défaut légèrement différents. Cet outil fournit une estimation fiable basée sur la convention répandue de 500 mots par page — assez précise pour planifier dissertations, articles de blog, scripts et rapports.</p>
<h2>Qui utilise un calculateur de mots par page ?</h2>
<p>Les étudiants qui vérifient si une dissertation de 1500 mots remplit une exigence de « trois pages », les auteurs qui planifient la longueur d’un chapitre, les responsables de contenu qui dimensionnent des articles et les orateurs qui estiment la durée d’un script s’appuient sur la conversion mots-pages. Comme PostTruncate fonctionne entièrement dans votre navigateur, votre texte n’est jamais envoyé : collez un brouillon complet et l’estimation se met à jour instantanément et en toute confidentialité.</p>`,
      pt: `<h2>Quantas páginas são as suas palavras?</h2>
<p>O número de páginas que um texto ocupa depende de três fatores: o <strong>número de palavras</strong>, o <strong>tamanho da fonte</strong> e o <strong>espaçamento entre linhas</strong>. Como regra geral, uma página com espaçamento simples e fonte de 12 pontos contém cerca de <strong>500 palavras</strong>, enquanto uma com espaçamento duplo contém cerca de <strong>250 palavras</strong>. Assim, 1000 palavras são aproximadamente 2 páginas em espaçamento simples ou 4 em duplo.</p>
<h2>Referência rápida de palavras para páginas</h2>
<p>Use estas contagens comuns a 12 pontos como ponto de partida: <strong>500 palavras</strong> ≈ 1 página simples / 2 duplo; <strong>1000 palavras</strong> ≈ 2 / 4; <strong>1500 palavras</strong> ≈ 3 / 6; <strong>2000 palavras</strong> ≈ 4 / 8; <strong>5000 palavras</strong> ≈ 10 / 20. Fontes maiores e espaçamentos mais largos aumentam o número de páginas, por isso a calculadora acima permite reproduzir as configurações exatas do seu trabalho.</p>
<h2>Porque as estimativas variam</h2>
<p>Dois documentos com o mesmo número de palavras podem ocupar um número diferente de páginas. As margens, o espaçamento entre parágrafos, os títulos, as citações, as imagens e a tipografia específica alteram a quantidade de texto que cabe numa página. O Microsoft Word, o Google Docs e o Apple Pages usam predefinições ligeiramente diferentes. Esta ferramenta dá uma estimativa fiável com base na convenção difundida de 500 palavras por página — suficientemente precisa para planear ensaios, artigos de blogue, guiões e relatórios.</p>
<h2>Quem usa uma calculadora de palavras por página?</h2>
<p>Estudantes que verificam se um ensaio de 1500 palavras cumpre um requisito de «três páginas», autores que planeiam a extensão de um capítulo, profissionais de conteúdo que dimensionam artigos e oradores que estimam a duração de um guião recorrem à conversão de palavras em páginas. Como o PostTruncate funciona totalmente no seu navegador, o seu texto nunca é enviado — cole um rascunho completo e a estimativa atualiza-se de imediato e de forma privada.</p>`,
      it: `<h2>Quante pagine sono le tue parole?</h2>
<p>Il numero di pagine che un testo occupa dipende da tre fattori: il <strong>numero di parole</strong>, la <strong>dimensione del carattere</strong> e l’<strong>interlinea</strong>. Come regola generale, una pagina a interlinea singola con carattere da 12 punti contiene circa <strong>500 parole</strong>, mentre una a interlinea doppia ne contiene circa <strong>250</strong>. Quindi 1000 parole corrispondono a circa 2 pagine a interlinea singola o 4 a doppia.</p>
<h2>Riferimento rapido parole-pagine</h2>
<p>Usa questi conteggi comuni a 12 punti come punto di partenza: <strong>500 parole</strong> ≈ 1 pagina singola / 2 doppia; <strong>1000 parole</strong> ≈ 2 / 4; <strong>1500 parole</strong> ≈ 3 / 6; <strong>2000 parole</strong> ≈ 4 / 8; <strong>5000 parole</strong> ≈ 10 / 20. Caratteri più grandi e interlinee più ampie aumentano il numero di pagine, quindi il calcolatore qui sopra ti permette di replicare le impostazioni esatte del tuo lavoro.</p>
<h2>Perché le stime variano</h2>
<p>Due documenti con lo stesso numero di parole possono occupare un numero diverso di pagine. Margini, spaziatura tra paragrafi, titoli, citazioni, immagini e il carattere specifico cambiano quanto testo entra in una pagina. Microsoft Word, Google Docs e Apple Pages usano impostazioni predefinite leggermente diverse. Questo strumento offre una stima affidabile basata sulla diffusa convenzione delle 500 parole per pagina — abbastanza precisa per pianificare saggi, articoli di blog, copioni e report.</p>
<h2>Chi usa un calcolatore di parole per pagina?</h2>
<p>Studenti che controllano se un saggio da 1500 parole soddisfa un requisito di «tre pagine», autori che pianificano la lunghezza di un capitolo, content marketer che dimensionano gli articoli e relatori che stimano la durata di un copione si affidano alla conversione parole-pagine. Poiché PostTruncate funziona interamente nel tuo browser, il tuo testo non viene mai caricato: incolla una bozza completa e la stima si aggiorna all’istante e in privato.</p>`,
      nl: `<h2>Hoeveel pagina’s zijn je woorden?</h2>
<p>Het aantal pagina’s dat een tekst vult, hangt af van drie dingen: het <strong>aantal woorden</strong>, de <strong>lettergrootte</strong> en de <strong>regelafstand</strong>. Als vuistregel bevat een pagina met enkele regelafstand in een 12-punts lettertype ongeveer <strong>500 woorden</strong>, en een pagina met dubbele regelafstand ongeveer <strong>250 woorden</strong>. 1000 woorden zijn dus ruwweg 2 pagina’s enkel of 4 pagina’s dubbel.</p>
<h2>Snelle referentie woorden naar pagina’s</h2>
<p>Gebruik deze veelvoorkomende aantallen bij 12 punten als uitgangspunt: <strong>500 woorden</strong> ≈ 1 pagina enkel / 2 dubbel; <strong>1000 woorden</strong> ≈ 2 / 4; <strong>1500 woorden</strong> ≈ 3 / 6; <strong>2000 woorden</strong> ≈ 4 / 8; <strong>5000 woorden</strong> ≈ 10 / 20. Grotere lettertypes en ruimere regelafstand verhogen het aantal pagina’s, dus met de calculator hierboven stel je je exacte opdrachtinstellingen in.</p>
<h2>Waarom schattingen verschillen</h2>
<p>Twee documenten met hetzelfde aantal woorden kunnen een verschillend aantal pagina’s beslaan. Marges, alinea-afstand, koppen, blokcitaten, afbeeldingen en het specifieke lettertype veranderen hoeveel tekst op een pagina past. Microsoft Word, Google Docs en Apple Pages gebruiken net iets andere standaardinstellingen. Dit hulpmiddel geeft een betrouwbare schatting op basis van de veelgebruikte conventie van 500 woorden per pagina — nauwkeurig genoeg om essays, blogposts, scripts en rapporten te plannen.</p>
<h2>Wie gebruikt een woorden-per-pagina-calculator?</h2>
<p>Studenten die controleren of een essay van 1500 woorden voldoet aan een eis van «drie pagina’s», auteurs die hoofdstuklengte plannen, contentmarketeers die blogposts inschatten en sprekers die scriptlengte ramen, vertrouwen op de omrekening van woorden naar pagina’s. Omdat PostTruncate volledig in je browser draait, wordt je tekst nooit geüpload — plak een volledig concept en de schatting wordt direct en privé bijgewerkt.</p>`,
      ja: `<h2>あなたの単語数は何ページ？</h2>
<p>文章が占めるページ数は、<strong>単語数</strong>、<strong>フォントサイズ</strong>、<strong>行間</strong>の3つで決まります。目安として、12ポイントのシングルスペースのページには約<strong>500語</strong>、ダブルスペースのページには約<strong>250語</strong>が入ります。つまり1000語はシングルで約2ページ、ダブルで約4ページです。</p>
<h2>単語数→ページ数 早見表</h2>
<p>12ポイントを基準に、よく使う数値を出発点にしてください：<strong>500語</strong> ≈ シングル1ページ／ダブル2ページ、<strong>1000語</strong> ≈ 2／4、<strong>1500語</strong> ≈ 3／6、<strong>2000語</strong> ≈ 4／8、<strong>5000語</strong> ≈ 10／20。フォントが大きく行間が広いほどページ数は増えるため、上の計算ツールで課題の正確な設定に合わせられます。</p>
<h2>見積もりが変わる理由</h2>
<p>同じ単語数でも、文書によってページ数は変わります。余白、段落間隔、見出し、引用、画像、使用する書体によって、1ページに入る文字量が変わるためです。Microsoft Word、Google ドキュメント、Apple Pages はそれぞれ既定値が少し異なります。本ツールは広く使われる「1ページ500語」の慣習に基づく信頼できる見積もりを示し、エッセイ、ブログ記事、台本、レポートの計画に十分な精度です。</p>
<h2>誰が単語数ページ計算ツールを使う？</h2>
<p>1500語のエッセイが「3ページ」の要件を満たすか確認する学生、章の長さを計画する著者、ブログ記事の分量を見積もるコンテンツ担当者、台本の長さを推定する話者などが、単語数からページ数への変換を利用します。PostTruncate は完全にブラウザー内で動作するため、テキストがアップロードされることはありません。下書き全体を貼り付ければ、見積もりが即座に、かつプライベートに更新されます。</p>`,
      zh: `<h2>你的字数是多少页？</h2>
<p>一段文字占多少页取决于三点：<strong>字数</strong>、<strong>字号</strong>和<strong>行距</strong>。一般而言，12 磅单倍行距的一页约容纳 <strong>500 字</strong>，双倍行距的一页约容纳 <strong>250 字</strong>。因此 1000 字大约是单倍行距 2 页或双倍行距 4 页。</p>
<h2>字数转页数速查</h2>
<p>以 12 磅为基准，可参考这些常见字数：<strong>500 字</strong> ≈ 单倍 1 页 / 双倍 2 页；<strong>1000 字</strong> ≈ 2 / 4；<strong>1500 字</strong> ≈ 3 / 6；<strong>2000 字</strong> ≈ 4 / 8；<strong>5000 字</strong> ≈ 10 / 20。字号越大、行距越宽，页数越多，因此上方的计算器可让你匹配作业的精确设置。</p>
<h2>为什么估算会有差异</h2>
<p>字数相同的两份文档，页数可能不同。页边距、段间距、标题、引用、图片以及具体字体都会改变一页能容纳的文字量。Microsoft Word、Google 文档和 Apple Pages 的默认设置略有不同。本工具基于广泛采用的“每页 500 字”惯例给出可靠估算，足以用于规划论文、博客文章、脚本和报告。</p>
<h2>谁会用到字数转页数计算器？</h2>
<p>核对 1500 字论文是否满足“三页”要求的学生、规划章节长度的作者、估算博客篇幅的内容运营，以及预估脚本时长的演讲者，都会用到字数转页数。由于 PostTruncate 完全在你的浏览器中运行，你的文本绝不会被上传——粘贴整篇草稿，估算会即时、私密地更新。</p>`,
      da: `<h2>Hvor mange sider er dine ord?</h2>
<p>Hvor mange sider en tekst fylder, afhænger af tre ting: <strong>ordtallet</strong>, <strong>skriftstørrelsen</strong> og <strong>linjeafstanden</strong>. Som tommelfingerregel rummer en side med enkelt linjeafstand i en 12-punkts skrift omkring <strong>500 ord</strong>, mens en side med dobbelt linjeafstand rummer omkring <strong>250 ord</strong>. 1000 ord er altså cirka 2 sider med enkelt eller 4 sider med dobbelt.</p>
<h2>Hurtig oversigt over ord til sider</h2>
<p>Brug disse almindelige tal ved 12 punkter som udgangspunkt: <strong>500 ord</strong> ≈ 1 side enkelt / 2 dobbelt; <strong>1000 ord</strong> ≈ 2 / 4; <strong>1500 ord</strong> ≈ 3 / 6; <strong>2000 ord</strong> ≈ 4 / 8; <strong>5000 ord</strong> ≈ 10 / 20. Større skrifter og bredere afstand øger sideantallet, så beregneren ovenfor lader dig ramme dine præcise indstillinger.</p>
<h2>Hvorfor estimater varierer</h2>
<p>To dokumenter med samme ordtal kan ende på forskellige sideantal. Margener, afstand mellem afsnit, overskrifter, blokcitater, billeder og den konkrete skrifttype ændrer, hvor meget tekst der er plads til på en side. Microsoft Word, Google Docs og Apple Pages bruger lidt forskellige standardindstillinger. Dette værktøj giver et pålideligt estimat baseret på den udbredte konvention om 500 ord pr. side — præcist nok til at planlægge essays, blogindlæg, manuskripter og rapporter.</p>
<h2>Hvem bruger en ord-per-side-beregner?</h2>
<p>Studerende, der tjekker, om et essay på 1500 ord opfylder et krav om »tre sider«, forfattere, der planlægger kapitellængde, indholdsfolk, der dimensionerer blogindlæg, og talere, der estimerer manuskriptlængde, bruger alle omregning fra ord til sider. Fordi PostTruncate kører helt i din browser, bliver din tekst aldrig uploadet — indsæt et helt udkast, og estimatet opdateres straks og privat.</p>`,
    },

    faq: {
      en: [
        {
          q: 'How many pages is 1,000 words?',
          a: 'About 2 pages single-spaced or 4 pages double-spaced in a standard 12-point font. Larger fonts or wider line spacing push it higher.',
        },
        {
          q: 'How many words are on a page?',
          a: 'A single-spaced page in a 12-point font holds roughly 500 words; a double-spaced page holds about 250. The calculator above adjusts this for your chosen font size and spacing.',
        },
        {
          q: 'Is the page count exact?',
          a: 'No estimator can be exact, because margins, paragraph spacing, headings, and the typeface all affect layout. This tool uses the common 500-words-per-page convention to give a dependable planning estimate.',
        },
        {
          q: 'Does it work for double spacing?',
          a: 'Yes. Switch the line-spacing control to 1.5 or double and both the headline estimate and the reference table update instantly.',
        },
      ],
      es: [
        {
          q: '¿Cuántas páginas son 1000 palabras?',
          a: 'Unas 2 páginas a espacio sencillo o 4 a doble espacio con una fuente estándar de 12 puntos. Fuentes más grandes o interlineados más amplios aumentan el total.',
        },
        {
          q: '¿Cuántas palabras hay en una página?',
          a: 'Una página a espacio sencillo con fuente de 12 puntos contiene unas 500 palabras; a doble espacio, unas 250. La calculadora de arriba lo ajusta según tu tamaño de fuente e interlineado.',
        },
        {
          q: '¿El recuento de páginas es exacto?',
          a: 'Ninguna estimación es exacta, porque los márgenes, el espaciado entre párrafos, los títulos y la tipografía afectan al diseño. Esta herramienta usa la convención de 500 palabras por página para dar una estimación fiable.',
        },
        {
          q: '¿Funciona con doble espacio?',
          a: 'Sí. Cambia el control de interlineado a 1,5 o doble y tanto la estimación principal como la tabla de referencia se actualizan al instante.',
        },
      ],
      de: [
        {
          q: 'Wie viele Seiten sind 1000 Wörter?',
          a: 'Etwa 2 Seiten einfach oder 4 Seiten doppelt in einer Standard-12-Punkt-Schrift. Größere Schriften oder weiterer Zeilenabstand erhöhen die Zahl.',
        },
        {
          q: 'Wie viele Wörter passen auf eine Seite?',
          a: 'Eine einfach zeilige Seite in 12-Punkt-Schrift enthält etwa 500 Wörter, eine doppelt zeilige etwa 250. Der Rechner oben passt das an deine Schriftgröße und deinen Abstand an.',
        },
        {
          q: 'Ist die Seitenzahl exakt?',
          a: 'Keine Schätzung ist exakt, da Ränder, Absatzabstände, Überschriften und die Schriftart das Layout beeinflussen. Dieses Tool nutzt die Konvention von 500 Wörtern pro Seite für eine verlässliche Planungsschätzung.',
        },
        {
          q: 'Funktioniert es mit doppeltem Zeilenabstand?',
          a: 'Ja. Stelle den Zeilenabstand auf 1,5 oder doppelt, und sowohl die Hauptschätzung als auch die Referenztabelle aktualisieren sich sofort.',
        },
      ],
      fr: [
        {
          q: 'Combien de pages font 1000 mots ?',
          a: 'Environ 2 pages en interligne simple ou 4 pages en double avec une police standard de 12 points. Des polices plus grandes ou un interligne plus large augmentent le total.',
        },
        {
          q: 'Combien de mots tiennent sur une page ?',
          a: 'Une page en interligne simple avec une police de 12 points contient environ 500 mots ; en double, environ 250. Le calculateur ci-dessus l’ajuste selon votre taille de police et votre interligne.',
        },
        {
          q: 'Le nombre de pages est-il exact ?',
          a: 'Aucune estimation n’est exacte, car les marges, l’espacement des paragraphes, les titres et la police influencent la mise en page. Cet outil utilise la convention de 500 mots par page pour une estimation fiable.',
        },
        {
          q: 'Cela fonctionne-t-il en double interligne ?',
          a: 'Oui. Réglez l’interligne sur 1,5 ou double et l’estimation principale comme le tableau de référence se mettent à jour instantanément.',
        },
      ],
      pt: [
        {
          q: 'Quantas páginas são 1000 palavras?',
          a: 'Cerca de 2 páginas em espaçamento simples ou 4 em duplo com uma fonte padrão de 12 pontos. Fontes maiores ou espaçamentos mais largos aumentam o total.',
        },
        {
          q: 'Quantas palavras cabem numa página?',
          a: 'Uma página em espaçamento simples com fonte de 12 pontos contém cerca de 500 palavras; em duplo, cerca de 250. A calculadora acima ajusta isso ao seu tamanho de fonte e espaçamento.',
        },
        {
          q: 'A contagem de páginas é exata?',
          a: 'Nenhuma estimativa é exata, pois margens, espaçamento entre parágrafos, títulos e a tipografia afetam o layout. Esta ferramenta usa a convenção de 500 palavras por página para dar uma estimativa fiável.',
        },
        {
          q: 'Funciona com espaçamento duplo?',
          a: 'Sim. Mude o controlo de espaçamento para 1,5 ou duplo e tanto a estimativa principal como a tabela de referência atualizam-se na hora.',
        },
      ],
      it: [
        {
          q: 'Quante pagine sono 1000 parole?',
          a: 'Circa 2 pagine a interlinea singola o 4 a doppia con un carattere standard da 12 punti. Caratteri più grandi o interlinee più ampie aumentano il totale.',
        },
        {
          q: 'Quante parole stanno in una pagina?',
          a: 'Una pagina a interlinea singola con carattere da 12 punti contiene circa 500 parole; a doppia, circa 250. Il calcolatore qui sopra lo adatta alla tua dimensione del carattere e interlinea.',
        },
        {
          q: 'Il numero di pagine è esatto?',
          a: 'Nessuna stima è esatta, perché margini, spaziatura tra paragrafi, titoli e carattere influenzano l’impaginazione. Questo strumento usa la convenzione delle 500 parole per pagina per una stima affidabile.',
        },
        {
          q: 'Funziona con l’interlinea doppia?',
          a: 'Sì. Imposta l’interlinea su 1,5 o doppia e sia la stima principale sia la tabella di riferimento si aggiornano all’istante.',
        },
      ],
      nl: [
        {
          q: 'Hoeveel pagina’s zijn 1000 woorden?',
          a: 'Ongeveer 2 pagina’s met enkele regelafstand of 4 met dubbele in een standaard 12-punts lettertype. Grotere lettertypes of ruimere regelafstand verhogen het totaal.',
        },
        {
          q: 'Hoeveel woorden staan er op een pagina?',
          a: 'Een pagina met enkele regelafstand in een 12-punts lettertype bevat ongeveer 500 woorden; met dubbele ongeveer 250. De calculator hierboven past dit aan op je lettergrootte en regelafstand.',
        },
        {
          q: 'Is het aantal pagina’s exact?',
          a: 'Geen enkele schatting is exact, want marges, alinea-afstand, koppen en het lettertype beïnvloeden de opmaak. Dit hulpmiddel gebruikt de conventie van 500 woorden per pagina voor een betrouwbare schatting.',
        },
        {
          q: 'Werkt het met dubbele regelafstand?',
          a: 'Ja. Zet de regelafstand op 1,5 of dubbel en zowel de hoofdschatting als de referentietabel worden direct bijgewerkt.',
        },
      ],
      ja: [
        {
          q: '1000語は何ページですか？',
          a: '標準的な12ポイントで、シングルなら約2ページ、ダブルなら約4ページです。フォントが大きかったり行間が広いと増えます。',
        },
        {
          q: '1ページに何語入りますか？',
          a: '12ポイントのシングルスペースのページには約500語、ダブルスペースには約250語入ります。上の計算ツールがフォントサイズと行間に合わせて調整します。',
        },
        {
          q: 'ページ数は正確ですか？',
          a: '余白・段落間隔・見出し・書体がレイアウトに影響するため、どの見積もりも厳密ではありません。本ツールは広く使われる「1ページ500語」の慣習で信頼できる目安を示します。',
        },
        {
          q: 'ダブルスペースでも使えますか？',
          a: 'はい。行間を1.5またはダブルに切り替えると、メインの見積もりと早見表が即座に更新されます。',
        },
      ],
      zh: [
        {
          q: '1000字是多少页？',
          a: '在标准 12 磅下，单倍行距约 2 页，双倍行距约 4 页。字号更大或行距更宽会增加页数。',
        },
        {
          q: '一页能放多少字？',
          a: '12 磅单倍行距的一页约 500 字，双倍行距约 250 字。上方的计算器会根据你选择的字号和行距进行调整。',
        },
        {
          q: '页数估算准确吗？',
          a: '任何估算都无法完全精确，因为页边距、段间距、标题和字体都会影响排版。本工具基于常用的“每页 500 字”惯例，给出可靠的规划估算。',
        },
        {
          q: '支持双倍行距吗？',
          a: '支持。将行距切换为 1.5 倍或双倍，主估算和速查表都会即时更新。',
        },
      ],
      da: [
        {
          q: 'Hvor mange sider er 1000 ord?',
          a: 'Omkring 2 sider med enkelt linjeafstand eller 4 sider med dobbelt i en standard 12-punkts skrift. Større skrifter eller bredere linjeafstand øger tallet.',
        },
        {
          q: 'Hvor mange ord er der på en side?',
          a: 'En side med enkelt linjeafstand i en 12-punkts skrift rummer omkring 500 ord; med dobbelt omkring 250. Beregneren ovenfor tilpasser dette til din skriftstørrelse og linjeafstand.',
        },
        {
          q: 'Er sideantallet præcist?',
          a: 'Intet estimat er præcist, da margener, afstand mellem afsnit, overskrifter og skrifttypen påvirker layoutet. Dette værktøj bruger konventionen om 500 ord pr. side for at give et pålideligt estimat.',
        },
        {
          q: 'Virker det med dobbelt linjeafstand?',
          a: 'Ja. Skift linjeafstanden til 1,5 eller dobbelt, og både hovedestimatet og oversigtstabellen opdateres med det samme.',
        },
      ],
    },
  },
  {
    id: 'reading-time',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'Silent reading ~238 wpm; reading aloud ~130 wpm',

    related: {
      id: 'words-per-page',
      blurb: {
        en: 'Planning a document rather than a talk? See how many printed pages your word count fills at any font, size, spacing, and margins with our words-to-pages calculator.',
        es: '¿Planificas un documento en lugar de una charla? Comprueba cuántas páginas impresas ocupa tu número de palabras con cualquier fuente, tamaño, interlineado y márgenes con nuestra calculadora de palabras por página.',
        de: 'Planst du ein Dokument statt eines Vortrags? Sieh mit unserem Wörter-pro-Seite-Rechner, wie viele gedruckte Seiten deine Wortzahl bei beliebiger Schrift, Größe, Abstand und Rändern füllt.',
        fr: 'Vous préparez un document plutôt qu’un discours ? Voyez combien de pages imprimées votre nombre de mots occupe selon la police, la taille, l’interligne et les marges avec notre calculateur de mots par page.',
        pt: 'Está a planear um documento em vez de uma palestra? Veja quantas páginas impressas o seu número de palavras ocupa com qualquer fonte, tamanho, espaçamento e margens com a nossa calculadora de palavras por página.',
        it: 'Stai pianificando un documento anziché un discorso? Scopri quante pagine stampate occupa il tuo numero di parole con qualsiasi carattere, dimensione, interlinea e margini con il nostro calcolatore di parole per pagina.',
        nl: 'Plan je een document in plaats van een toespraak? Bekijk hoeveel gedrukte pagina’s je aantal woorden vult bij elk lettertype, grootte, regelafstand en marges met onze woorden-per-pagina-calculator.',
        ja: 'スピーチではなく書類を準備していますか？単語数が任意のフォント・サイズ・行間・余白で何ページになるかを、単語数→ページ数の計算ツールで確認できます。',
        zh: '要做的是文档而不是演讲？用我们的字数转页数计算器，看看你的字数在任意字体、字号、行距和页边距下会占多少打印页。',
        da: 'Planlægger du et dokument frem for en tale? Se, hvor mange trykte sider dit ordtal fylder ved enhver skrifttype, størrelse, linjeafstand og margener med vores ord-per-side-beregner.',
      },
    },

    slugs: {
      en: 'reading-time-calculator',
      es: 'calculadora-tiempo-lectura',
      de: 'lesezeit-rechner',
      fr: 'calculateur-temps-lecture',
      pt: 'calculadora-tempo-leitura',
      it: 'calcolatore-tempo-lettura',
      nl: 'leestijd-calculator',
      ja: 'dokuryo-jikan-keisan',
      zh: 'yue-du-shi-jian-ji-suan',
      da: 'laesetid-beregner',
    },

    schemaName: {
      en: 'Reading Time Calculator',
      es: 'Calculadora de Tiempo de Lectura',
      de: 'Lesezeit-Rechner',
      fr: 'Calculateur de Temps de Lecture',
      pt: 'Calculadora de Tempo de Leitura',
      it: 'Calcolatore del Tempo di Lettura',
      nl: 'Leestijd-calculator',
      ja: '読了時間計算ツール',
      zh: '阅读时间计算器',
      da: 'Læsetid-beregner',
    },

    titles: {
      en: 'Reading Time Calculator — How Long to Read or Speak Your Text',
      es: 'Calculadora de Tiempo de Lectura — Cuánto se tarda en leer o decir tu texto',
      de: 'Lesezeit-Rechner — Wie lange dauert Lesen oder Sprechen deines Textes',
      fr: 'Calculateur de Temps de Lecture — Durée pour lire ou dire votre texte',
      pt: 'Calculadora de Tempo de Leitura — Quanto tempo para ler ou falar o seu texto',
      it: 'Calcolatore del Tempo di Lettura — Quanto tempo per leggere o pronunciare il testo',
      nl: 'Leestijd-calculator — Hoelang om je tekst te lezen of uit te spreken',
      ja: '読了時間計算ツール — テキストの読了・発話時間がわかる',
      zh: '阅读时间计算器 — 阅读或朗读文本需要多久',
      da: 'Læsetid-beregner — Hvor lang tid at læse eller tale din tekst',
    },

    metaDescriptions: {
      en: 'Free reading time calculator. Paste text or enter a word count to estimate silent reading time and out-loud speaking time at slow, average, or fast pace.',
      es: 'Calculadora de tiempo de lectura gratuita. Pega texto o indica el número de palabras para estimar el tiempo de lectura y de habla a ritmo lento, medio o rápido.',
      de: 'Kostenloser Lesezeit-Rechner. Text einfügen oder Wortzahl eingeben, um Lese- und Sprechzeit bei langsamem, mittlerem oder schnellem Tempo zu schätzen.',
      fr: 'Calculateur de temps de lecture gratuit. Collez du texte ou saisissez un nombre de mots pour estimer le temps de lecture et de parole (lent, moyen, rapide).',
      pt: 'Calculadora de tempo de leitura gratuita. Cole texto ou indique o número de palavras para estimar o tempo de leitura e de fala em ritmo lento, médio ou rápido.',
      it: 'Calcolatore del tempo di lettura gratuito. Incolla il testo o inserisci il numero di parole per stimare il tempo di lettura e di parlato (lento, medio, veloce).',
      nl: 'Gratis leestijd-calculator. Plak tekst of voer een aantal woorden in om de lees- en spreektijd te schatten bij langzaam, gemiddeld of snel tempo.',
      ja: '無料の読了時間計算ツール。テキストを貼り付けるか単語数を入力し、遅い・標準・速いペースでの読了時間と発話時間を見積もれます。',
      zh: '免费的阅读时间计算器。粘贴文本或输入字数，即可按慢速、中速或快速估算默读时间与朗读时间。',
      da: 'Gratis læsetid-beregner. Indsæt tekst eller indtast et ordtal for at estimere læse- og taletid ved langsomt, middel eller hurtigt tempo.',
    },

    intro: {
      en: 'How long will your article, speech, or script take? Paste your text or enter a word count below to estimate silent reading time and spoken delivery time at your chosen pace.',
      es: '¿Cuánto tardará tu artículo, discurso o guion? Pega tu texto o introduce un número de palabras abajo para estimar el tiempo de lectura silenciosa y el de exposición en voz alta al ritmo que elijas.',
      de: 'Wie lange dauert dein Artikel, deine Rede oder dein Skript? Füge deinen Text ein oder gib eine Wortzahl ein, um die stille Lesezeit und die Sprechzeit im gewählten Tempo zu schätzen.',
      fr: 'Combien de temps prendra votre article, discours ou script ? Collez votre texte ou saisissez un nombre de mots ci-dessous pour estimer le temps de lecture silencieuse et de diction à voix haute au rythme choisi.',
      pt: 'Quanto tempo levará o seu artigo, discurso ou guião? Cole o seu texto ou insira um número de palavras abaixo para estimar o tempo de leitura silenciosa e de fala em voz alta ao ritmo que escolher.',
      it: 'Quanto durerà il tuo articolo, discorso o copione? Incolla il testo o inserisci un numero di parole qui sotto per stimare il tempo di lettura silenziosa e di esposizione a voce alta al ritmo scelto.',
      nl: 'Hoelang duurt je artikel, toespraak of script? Plak je tekst of voer een aantal woorden in om de stille leestijd en de spreektijd hardop in je gekozen tempo te schatten.',
      ja: '記事・スピーチ・台本はどれくらいかかる？下にテキストを貼り付けるか単語数を入力すると、選んだペースでの黙読時間と音読時間を見積もれます。',
      zh: '你的文章、演讲或脚本需要多久？在下方粘贴文本或输入字数，即可按所选速度估算默读时间和朗读时间。',
      da: 'Hvor lang tid tager din artikel, tale eller manuskript? Indsæt din tekst eller indtast et ordtal nedenfor for at estimere stille læsetid og taletid højt i det valgte tempo.',
    },

    content: {
      en: `<h2>How long does it take to read your text?</h2>
<p>Reading time depends on two things: the <strong>number of words</strong> and the <strong>reading speed</strong>. Most adults read silently at about <strong>238 words per minute</strong>, so a 1,000-word article takes roughly four minutes to read. Reading aloud is slower — a comfortable speaking pace is around <strong>130 words per minute</strong>, so the same 1,000 words take closer to eight minutes to say out loud.</p>
<h2>Reading speed vs. speaking speed</h2>
<p>Silent reading is much faster than speech because your eyes can skim and skip, while your mouth has to pronounce every word. This calculator lets you pick <strong>slow, average, or fast</strong> for each: reading ranges from about 150 wpm (careful study) to 320 wpm (skimming), while speaking ranges from a deliberate 110 wpm to a brisk 160 wpm. Match the setting to your audience — a podcast or keynote runs slower than a quick voice note.</p>
<h2>How the estimate is calculated</h2>
<p>The tool counts the words in your text, divides by the chosen words-per-minute rate, and formats the result in minutes and seconds. Paste a full draft or just type a word count if you already know it. Everything runs in your browser, so your text is never uploaded — useful for unpublished scripts, manuscripts, or confidential material.</p>
<h2>Who uses a reading time calculator?</h2>
<p>Bloggers add a “5 min read” label to set expectations, speakers and presenters check whether a script fits a time slot, teachers estimate how long a passage will take a class, podcasters and video creators plan episode length, and students gauge study time. Adjust the speed presets to match the real audience and the estimate becomes a dependable planning number.</p>`,
      es: `<h2>¿Cuánto se tarda en leer tu texto?</h2>
<p>El tiempo de lectura depende de dos factores: el <strong>número de palabras</strong> y la <strong>velocidad de lectura</strong>. La mayoría de los adultos leen en silencio a unas <strong>238 palabras por minuto</strong>, así que un artículo de 1000 palabras se lee en unos cuatro minutos. Leer en voz alta es más lento: un ritmo cómodo ronda las <strong>130 palabras por minuto</strong>, por lo que esas mismas 1000 palabras tardan cerca de ocho minutos en decirse.</p>
<h2>Velocidad de lectura frente a velocidad de habla</h2>
<p>La lectura silenciosa es mucho más rápida que el habla porque los ojos pueden saltar y ojear, mientras que la boca debe pronunciar cada palabra. Esta calculadora te permite elegir <strong>lenta, media o rápida</strong> para cada una: la lectura va de unas 150 ppm (estudio atento) a 320 ppm (lectura rápida), y el habla de 110 ppm pausadas a 160 ppm ágiles. Ajusta el valor a tu público: un pódcast o una conferencia van más despacio que una nota de voz.</p>
<h2>Cómo se calcula la estimación</h2>
<p>La herramienta cuenta las palabras de tu texto, las divide entre la velocidad elegida en palabras por minuto y muestra el resultado en minutos y segundos. Pega un borrador completo o escribe solo el número de palabras si ya lo conoces. Todo funciona en tu navegador, así que tu texto nunca se sube: ideal para guiones inéditos, manuscritos o material confidencial.</p>
<h2>¿Quién usa una calculadora de tiempo de lectura?</h2>
<p>Los blogueros añaden una etiqueta de «5 min de lectura» para anticipar la duración, los ponentes comprueban si un guion cabe en su franja, los docentes estiman cuánto tardará la clase en un texto, los pódcasters y creadores de vídeo planifican la duración del episodio y los estudiantes calculan el tiempo de estudio. Ajusta los presets de velocidad a tu público real y la estimación se convierte en un número fiable para planificar.</p>`,
      de: `<h2>Wie lange dauert das Lesen deines Textes?</h2>
<p>Die Lesezeit hängt von zwei Dingen ab: der <strong>Wortzahl</strong> und der <strong>Lesegeschwindigkeit</strong>. Die meisten Erwachsenen lesen still etwa <strong>238 Wörter pro Minute</strong>, ein Artikel mit 1000 Wörtern dauert also rund vier Minuten. Lautes Lesen ist langsamer – ein angenehmes Sprechtempo liegt bei etwa <strong>130 Wörtern pro Minute</strong>, dieselben 1000 Wörter brauchen also fast acht Minuten zum Vorlesen.</p>
<h2>Lesegeschwindigkeit vs. Sprechgeschwindigkeit</h2>
<p>Stilles Lesen ist viel schneller als Sprechen, weil die Augen überfliegen und überspringen können, während der Mund jedes Wort aussprechen muss. Mit diesem Rechner wählst du für beides <strong>langsam, mittel oder schnell</strong>: Lesen reicht von etwa 150 WpM (gründliches Studium) bis 320 WpM (Überfliegen), Sprechen von bedächtigen 110 WpM bis flotten 160 WpM. Passe die Einstellung an dein Publikum an – ein Podcast oder Vortrag läuft langsamer als eine kurze Sprachnachricht.</p>
<h2>Wie die Schätzung berechnet wird</h2>
<p>Das Tool zählt die Wörter deines Textes, teilt sie durch die gewählte Wörter-pro-Minute-Rate und zeigt das Ergebnis in Minuten und Sekunden. Füge einen ganzen Entwurf ein oder gib einfach eine Wortzahl ein, wenn du sie kennst. Alles läuft in deinem Browser, dein Text wird nie hochgeladen – praktisch für unveröffentlichte Skripte, Manuskripte oder vertrauliches Material.</p>
<h2>Wer nutzt einen Lesezeit-Rechner?</h2>
<p>Blogger fügen ein „5 Min. Lesezeit“-Label hinzu, Vortragende prüfen, ob ein Skript in ein Zeitfenster passt, Lehrkräfte schätzen, wie lange eine Klasse für einen Text braucht, Podcaster und Videoproduzenten planen die Episodenlänge und Studierende kalkulieren ihre Lernzeit. Passe die Geschwindigkeits-Presets an das echte Publikum an, und die Schätzung wird zu einer verlässlichen Planungsgröße.</p>`,
      fr: `<h2>Combien de temps pour lire votre texte ?</h2>
<p>Le temps de lecture dépend de deux éléments : le <strong>nombre de mots</strong> et la <strong>vitesse de lecture</strong>. La plupart des adultes lisent en silence à environ <strong>238 mots par minute</strong> ; un article de 1000 mots se lit donc en quatre minutes environ. Lire à voix haute est plus lent : un débit confortable tourne autour de <strong>130 mots par minute</strong>, si bien que ces mêmes 1000 mots prennent près de huit minutes à prononcer.</p>
<h2>Vitesse de lecture et vitesse de parole</h2>
<p>La lecture silencieuse est bien plus rapide que la parole, car les yeux peuvent survoler et sauter des mots alors que la bouche doit tout prononcer. Ce calculateur vous laisse choisir <strong>lente, moyenne ou rapide</strong> pour chacune : la lecture va d’environ 150 mpm (étude attentive) à 320 mpm (survol), la parole de 110 mpm posées à 160 mpm enlevées. Adaptez le réglage à votre public : un podcast ou une conférence est plus lent qu’un court message vocal.</p>
<h2>Comment l’estimation est calculée</h2>
<p>L’outil compte les mots de votre texte, les divise par la cadence choisie en mots par minute et affiche le résultat en minutes et secondes. Collez un brouillon complet ou saisissez simplement un nombre de mots si vous le connaissez. Tout fonctionne dans votre navigateur : votre texte n’est jamais envoyé — pratique pour des scripts inédits, des manuscrits ou des documents confidentiels.</p>
<h2>Qui utilise un calculateur de temps de lecture ?</h2>
<p>Les blogueurs ajoutent une mention « 5 min de lecture », les orateurs vérifient qu’un script tient dans un créneau, les enseignants estiment le temps qu’une classe mettra sur un passage, les podcasteurs et vidéastes planifient la durée d’un épisode, et les étudiants évaluent leur temps de révision. Réglez les préréglages de vitesse selon le public réel et l’estimation devient un repère de planification fiable.</p>`,
      pt: `<h2>Quanto tempo se leva a ler o seu texto?</h2>
<p>O tempo de leitura depende de dois fatores: o <strong>número de palavras</strong> e a <strong>velocidade de leitura</strong>. A maioria dos adultos lê em silêncio a cerca de <strong>238 palavras por minuto</strong>, por isso um artigo de 1000 palavras lê-se em cerca de quatro minutos. Ler em voz alta é mais lento — um ritmo confortável ronda as <strong>130 palavras por minuto</strong>, pelo que as mesmas 1000 palavras demoram perto de oito minutos a dizer.</p>
<h2>Velocidade de leitura vs. velocidade de fala</h2>
<p>A leitura silenciosa é muito mais rápida do que a fala porque os olhos podem saltar e percorrer, enquanto a boca tem de pronunciar cada palavra. Esta calculadora permite escolher <strong>lenta, média ou rápida</strong> para cada uma: a leitura vai de cerca de 150 ppm (estudo atento) a 320 ppm (leitura rápida), e a fala de 110 ppm pausadas a 160 ppm ágeis. Ajuste a definição ao seu público — um podcast ou palestra é mais lento do que uma nota de voz.</p>
<h2>Como a estimativa é calculada</h2>
<p>A ferramenta conta as palavras do seu texto, divide pela cadência escolhida em palavras por minuto e apresenta o resultado em minutos e segundos. Cole um rascunho completo ou escreva apenas o número de palavras, se já o souber. Tudo corre no seu navegador, por isso o seu texto nunca é enviado — útil para guiões inéditos, manuscritos ou material confidencial.</p>
<h2>Quem usa uma calculadora de tempo de leitura?</h2>
<p>Os bloguistas acrescentam uma etiqueta de «5 min de leitura», os oradores verificam se um guião cabe no tempo, os professores estimam quanto tempo a turma levará num texto, os podcasters e criadores de vídeo planeiam a duração do episódio e os estudantes calculam o tempo de estudo. Ajuste as predefinições de velocidade ao público real e a estimativa torna-se um número fiável para planear.</p>`,
      it: `<h2>Quanto tempo serve per leggere il tuo testo?</h2>
<p>Il tempo di lettura dipende da due fattori: il <strong>numero di parole</strong> e la <strong>velocità di lettura</strong>. La maggior parte degli adulti legge in silenzio a circa <strong>238 parole al minuto</strong>, quindi un articolo di 1000 parole si legge in circa quattro minuti. Leggere ad alta voce è più lento: un ritmo comodo è intorno alle <strong>130 parole al minuto</strong>, perciò le stesse 1000 parole richiedono quasi otto minuti per essere pronunciate.</p>
<h2>Velocità di lettura e velocità di parlato</h2>
<p>La lettura silenziosa è molto più rapida del parlato perché gli occhi possono scorrere e saltare, mentre la bocca deve pronunciare ogni parola. Questo calcolatore ti permette di scegliere <strong>lenta, media o veloce</strong> per ciascuna: la lettura va da circa 150 ppm (studio attento) a 320 ppm (scorrimento), il parlato da 110 ppm pacate a 160 ppm spedite. Adatta l’impostazione al tuo pubblico: un podcast o una conferenza vanno più lenti di un breve messaggio vocale.</p>
<h2>Come viene calcolata la stima</h2>
<p>Lo strumento conta le parole del testo, le divide per la cadenza scelta in parole al minuto e mostra il risultato in minuti e secondi. Incolla una bozza completa o digita solo il numero di parole se lo conosci già. Tutto avviene nel tuo browser, quindi il testo non viene mai caricato: utile per copioni inediti, manoscritti o materiale riservato.</p>
<h2>Chi usa un calcolatore del tempo di lettura?</h2>
<p>I blogger aggiungono un’etichetta «5 min di lettura», i relatori verificano se un copione rientra in uno slot, gli insegnanti stimano quanto impiegherà la classe su un brano, podcaster e videomaker pianificano la durata dell’episodio e gli studenti calcolano il tempo di studio. Adatta i preset di velocità al pubblico reale e la stima diventa un riferimento affidabile per pianificare.</p>`,
      nl: `<h2>Hoelang duurt het om je tekst te lezen?</h2>
<p>De leestijd hangt af van twee dingen: het <strong>aantal woorden</strong> en de <strong>leessnelheid</strong>. De meeste volwassenen lezen stil ongeveer <strong>238 woorden per minuut</strong>, dus een artikel van 1000 woorden lees je in zo’n vier minuten. Hardop lezen is langzamer — een prettig spreektempo ligt rond <strong>130 woorden per minuut</strong>, dus diezelfde 1000 woorden duren bijna acht minuten om uit te spreken.</p>
<h2>Leessnelheid versus spreeksnelheid</h2>
<p>Stil lezen is veel sneller dan spreken, omdat je ogen kunnen scannen en overslaan, terwijl je mond elk woord moet uitspreken. Met deze calculator kies je voor beide <strong>langzaam, gemiddeld of snel</strong>: lezen loopt van ongeveer 150 wpm (aandachtig studeren) tot 320 wpm (scannen), spreken van bedaarde 110 wpm tot vlotte 160 wpm. Stem de instelling af op je publiek — een podcast of lezing gaat langzamer dan een korte spraaknotitie.</p>
<h2>Hoe de schatting wordt berekend</h2>
<p>De tool telt de woorden in je tekst, deelt door de gekozen woorden-per-minuut en toont het resultaat in minuten en seconden. Plak een volledig concept of typ alleen een aantal woorden als je dat al weet. Alles draait in je browser, dus je tekst wordt nooit geüpload — handig voor ongepubliceerde scripts, manuscripten of vertrouwelijk materiaal.</p>
<h2>Wie gebruikt een leestijd-calculator?</h2>
<p>Bloggers zetten er een “5 min leestijd”-label bij, sprekers controleren of een script in een tijdslot past, docenten schatten hoelang een klas over een tekst doet, podcasters en videomakers plannen de afleveringsduur en studenten bepalen hun studietijd. Stem de snelheidspresets af op het echte publiek en de schatting wordt een betrouwbaar planningsgetal.</p>`,
      ja: `<h2>テキストを読むのにどれくらいかかる？</h2>
<p>読了時間は2つで決まります。<strong>単語数</strong>と<strong>読む速さ</strong>です。多くの大人は黙読で約<strong>毎分238語</strong>読むため、1000語の記事は約4分で読めます。音読はもっと遅く、無理のない発話ペースは約<strong>毎分130語</strong>なので、同じ1000語を声に出すと8分近くかかります。</p>
<h2>読む速さと話す速さ</h2>
<p>黙読は話すよりずっと速いです。目は飛ばし読みできますが、口はすべての語を発音しなければならないからです。本ツールではそれぞれ<strong>遅い・標準・速い</strong>を選べます。読みは約150語/分（精読）から320語/分（流し読み）、話しは110語/分のゆっくりから160語/分のテンポよくまで。聴き手に合わせて設定してください。ポッドキャストや講演はボイスメモより遅くなります。</p>
<h2>見積もりの計算方法</h2>
<p>本ツールはテキストの単語数を数え、選んだ毎分の語数で割り、分と秒で結果を表示します。下書き全体を貼り付けても、すでに分かっていれば単語数だけ入力してもかまいません。すべてブラウザー内で動作するため、テキストがアップロードされることはなく、未公開の台本・原稿・機密資料にも安心です。</p>
<h2>誰が読了時間計算ツールを使う？</h2>
<p>ブロガーは「5分で読めます」と表示し、登壇者は台本が枠に収まるか確認し、教師は本文にクラスがどれだけかかるか見積もり、ポッドキャスターや動画制作者はエピソードの長さを計画し、学生は学習時間を把握します。速度プリセットを実際の聴き手に合わせれば、見積もりは信頼できる計画値になります。</p>`,
      zh: `<h2>读完你的文本需要多久？</h2>
<p>阅读时间取决于两点：<strong>字数</strong>和<strong>阅读速度</strong>。多数成年人默读约<strong>每分钟 238 词</strong>，因此 1000 词的文章约需四分钟读完。朗读更慢——舒适的朗读速度约为<strong>每分钟 130 词</strong>，同样的 1000 词读出来需要将近八分钟。</p>
<h2>阅读速度与朗读速度</h2>
<p>默读比朗读快得多，因为眼睛可以略读和跳读，而嘴必须念出每个词。本计算器允许你为两者分别选择<strong>慢、中、快</strong>：阅读约从 150 词/分（精读）到 320 词/分（略读），朗读约从 110 词/分（从容）到 160 词/分（轻快）。根据受众调整设置——播客或演讲会比一条语音消息更慢。</p>
<h2>估算如何计算</h2>
<p>本工具统计文本字数，除以所选的每分钟词数，并以分钟和秒显示结果。可以粘贴完整草稿，也可以在已知字数时直接输入数字。一切都在你的浏览器中运行，文本绝不会被上传——适合未发布的脚本、手稿或机密资料。</p>
<h2>谁会用到阅读时间计算器？</h2>
<p>博主会加上“阅读 5 分钟”的标签，演讲者会检查脚本是否符合时段，教师会估算课堂阅读一段文字需要多久，播客和视频创作者会规划单集时长，学生会估算学习时间。把速度预设调整为真实受众，估算就成为可靠的规划数字。</p>`,
      da: `<h2>Hvor lang tid tager det at læse din tekst?</h2>
<p>Læsetiden afhænger af to ting: <strong>antallet af ord</strong> og <strong>læsehastigheden</strong>. De fleste voksne læser stille omkring <strong>238 ord i minuttet</strong>, så en artikel på 1000 ord tager cirka fire minutter at læse. At læse højt er langsommere – et behageligt taletempo ligger omkring <strong>130 ord i minuttet</strong>, så de samme 1000 ord tager næsten otte minutter at sige.</p>
<h2>Læsehastighed kontra talehastighed</h2>
<p>Stille læsning er meget hurtigere end tale, fordi øjnene kan skimme og springe over, mens munden skal udtale hvert ord. Denne beregner lader dig vælge <strong>langsom, middel eller hurtig</strong> for hver: læsning går fra omkring 150 ord/min (grundig læsning) til 320 ord/min (skimning), og tale fra rolige 110 ord/min til raske 160 ord/min. Tilpas indstillingen til dit publikum – en podcast eller et foredrag er langsommere end en kort talebesked.</p>
<h2>Sådan beregnes estimatet</h2>
<p>Værktøjet tæller ordene i din tekst, dividerer med den valgte ord-per-minut-hastighed og viser resultatet i minutter og sekunder. Indsæt et helt udkast, eller skriv blot et ordtal, hvis du allerede kender det. Alt kører i din browser, så din tekst bliver aldrig uploadet – nyttigt til uudgivne manuskripter eller fortroligt materiale.</p>
<h2>Hvem bruger en læsetid-beregner?</h2>
<p>Bloggere tilføjer et “5 min læsning”-mærke, talere tjekker, om et manuskript passer ind i et tidsrum, lærere estimerer, hvor længe en klasse er om et tekststykke, podcastere og videoskabere planlægger episodelængde, og studerende vurderer studietid. Tilpas hastighedsindstillingerne til det reelle publikum, og estimatet bliver et pålideligt planlægningstal.</p>`,
    },

    faq: {
      en: [
        { q: 'How is reading time calculated?', a: 'Word count divided by reading speed. This tool defaults to 238 words per minute for silent reading and 130 for speaking aloud, and you can switch each to slow, average, or fast.' },
        { q: 'What is the average reading speed?', a: 'Around 238 words per minute for silent adult reading. Careful study is slower (~150 wpm) and skimming is faster (~320 wpm). Reading aloud is much slower, about 130 wpm.' },
        { q: 'How long does it take to read 1,000 words?', a: 'About 4 minutes silently at an average pace, or roughly 8 minutes read aloud at a normal speaking speed. Use the speed selectors above to match your situation.' },
        { q: 'Is my text uploaded anywhere?', a: 'No. The calculation runs entirely in your browser — nothing you paste is sent to a server, so it is safe for drafts, scripts, and private documents.' },
      ],
      es: [
        { q: '¿Cómo se calcula el tiempo de lectura?', a: 'Dividiendo el número de palabras entre la velocidad de lectura. Esta herramienta usa por defecto 238 palabras por minuto para la lectura silenciosa y 130 para hablar en voz alta, y puedes cambiar cada una a lenta, media o rápida.' },
        { q: '¿Cuál es la velocidad de lectura media?', a: 'Unas 238 palabras por minuto en lectura silenciosa adulta. El estudio atento es más lento (~150 ppm) y ojear es más rápido (~320 ppm). Leer en voz alta es mucho más lento, unas 130 ppm.' },
        { q: '¿Cuánto se tarda en leer 1000 palabras?', a: 'Unos 4 minutos en silencio a ritmo medio, o cerca de 8 minutos en voz alta a una velocidad de habla normal. Usa los selectores de velocidad de arriba para ajustarlo a tu caso.' },
        { q: '¿Se sube mi texto a algún sitio?', a: 'No. El cálculo se realiza por completo en tu navegador: nada de lo que pegues se envía a un servidor, por lo que es seguro para borradores, guiones y documentos privados.' },
      ],
      de: [
        { q: 'Wie wird die Lesezeit berechnet?', a: 'Wortzahl geteilt durch die Lesegeschwindigkeit. Standardmäßig nutzt das Tool 238 Wörter pro Minute für stilles Lesen und 130 fürs laute Sprechen; beides lässt sich auf langsam, mittel oder schnell stellen.' },
        { q: 'Was ist die durchschnittliche Lesegeschwindigkeit?', a: 'Etwa 238 Wörter pro Minute beim stillen Lesen Erwachsener. Gründliches Studium ist langsamer (~150 WpM), Überfliegen schneller (~320 WpM). Lautes Lesen ist mit etwa 130 WpM deutlich langsamer.' },
        { q: 'Wie lange dauert das Lesen von 1000 Wörtern?', a: 'Etwa 4 Minuten still bei mittlerem Tempo oder rund 8 Minuten laut vorgelesen bei normaler Sprechgeschwindigkeit. Nutze die Geschwindigkeitsauswahl oben für deinen Fall.' },
        { q: 'Wird mein Text irgendwo hochgeladen?', a: 'Nein. Die Berechnung läuft vollständig in deinem Browser – nichts, was du einfügst, wird an einen Server gesendet. Sicher für Entwürfe, Skripte und private Dokumente.' },
      ],
      fr: [
        { q: 'Comment le temps de lecture est-il calculé ?', a: 'Le nombre de mots divisé par la vitesse de lecture. Par défaut, l’outil utilise 238 mots par minute pour la lecture silencieuse et 130 pour la lecture à voix haute, et vous pouvez régler chacune sur lente, moyenne ou rapide.' },
        { q: 'Quelle est la vitesse de lecture moyenne ?', a: 'Environ 238 mots par minute en lecture silencieuse chez l’adulte. L’étude attentive est plus lente (~150 mpm) et le survol plus rapide (~320 mpm). Lire à voix haute est bien plus lent, environ 130 mpm.' },
        { q: 'Combien de temps pour lire 1000 mots ?', a: 'Environ 4 minutes en silence à un rythme moyen, ou près de 8 minutes à voix haute à une vitesse de parole normale. Utilisez les sélecteurs de vitesse ci-dessus selon votre situation.' },
        { q: 'Mon texte est-il envoyé quelque part ?', a: 'Non. Le calcul s’effectue entièrement dans votre navigateur : rien de ce que vous collez n’est envoyé à un serveur, ce qui le rend sûr pour les brouillons, scripts et documents privés.' },
      ],
      pt: [
        { q: 'Como é calculado o tempo de leitura?', a: 'Número de palavras a dividir pela velocidade de leitura. Por predefinição, a ferramenta usa 238 palavras por minuto para leitura silenciosa e 130 para falar em voz alta, e pode mudar cada uma para lenta, média ou rápida.' },
        { q: 'Qual é a velocidade de leitura média?', a: 'Cerca de 238 palavras por minuto na leitura silenciosa de adultos. O estudo atento é mais lento (~150 ppm) e percorrer é mais rápido (~320 ppm). Ler em voz alta é muito mais lento, cerca de 130 ppm.' },
        { q: 'Quanto tempo leva a ler 1000 palavras?', a: 'Cerca de 4 minutos em silêncio a ritmo médio, ou perto de 8 minutos em voz alta a uma velocidade de fala normal. Use os seletores de velocidade acima para o seu caso.' },
        { q: 'O meu texto é enviado para algum lado?', a: 'Não. O cálculo é feito inteiramente no seu navegador — nada do que colar é enviado para um servidor, por isso é seguro para rascunhos, guiões e documentos privados.' },
      ],
      it: [
        { q: 'Come si calcola il tempo di lettura?', a: 'Numero di parole diviso per la velocità di lettura. Per impostazione predefinita lo strumento usa 238 parole al minuto per la lettura silenziosa e 130 per la lettura ad alta voce, e puoi impostare ciascuna su lenta, media o veloce.' },
        { q: 'Qual è la velocità di lettura media?', a: 'Circa 238 parole al minuto nella lettura silenziosa di un adulto. Lo studio attento è più lento (~150 ppm) e lo scorrimento più veloce (~320 ppm). Leggere ad alta voce è molto più lento, circa 130 ppm.' },
        { q: 'Quanto tempo serve per leggere 1000 parole?', a: 'Circa 4 minuti in silenzio a ritmo medio, o quasi 8 minuti ad alta voce a una velocità di parlato normale. Usa i selettori di velocità qui sopra per il tuo caso.' },
        { q: 'Il mio testo viene caricato da qualche parte?', a: 'No. Il calcolo avviene interamente nel tuo browser: nulla di ciò che incolli viene inviato a un server, quindi è sicuro per bozze, copioni e documenti privati.' },
      ],
      nl: [
        { q: 'Hoe wordt de leestijd berekend?', a: 'Aantal woorden gedeeld door de leessnelheid. De tool gebruikt standaard 238 woorden per minuut voor stil lezen en 130 voor hardop spreken, en je kunt beide op langzaam, gemiddeld of snel zetten.' },
        { q: 'Wat is de gemiddelde leessnelheid?', a: 'Ongeveer 238 woorden per minuut bij stil lezen door volwassenen. Aandachtig studeren is langzamer (~150 wpm) en scannen sneller (~320 wpm). Hardop lezen is veel langzamer, ongeveer 130 wpm.' },
        { q: 'Hoelang duurt het om 1000 woorden te lezen?', a: 'Ongeveer 4 minuten stil op een gemiddeld tempo, of bijna 8 minuten hardop op een normale spreeksnelheid. Gebruik de snelheidskiezers hierboven voor jouw situatie.' },
        { q: 'Wordt mijn tekst ergens geüpload?', a: 'Nee. De berekening draait volledig in je browser — niets van wat je plakt wordt naar een server gestuurd, dus het is veilig voor concepten, scripts en privédocumenten.' },
      ],
      ja: [
        { q: '読了時間はどう計算しますか？', a: '単語数を読む速さで割ります。本ツールは既定で黙読を毎分238語、音読を130語としており、それぞれ遅い・標準・速いに切り替えられます。' },
        { q: '平均的な読む速さは？', a: '大人の黙読で毎分約238語です。精読はより遅く（約150語/分）、流し読みはより速い（約320語/分）です。音読は約130語/分とずっと遅くなります。' },
        { q: '1000語を読むのにどれくらい？', a: '標準ペースの黙読で約4分、通常の発話速度の音読で約8分です。上の速度セレクターで状況に合わせてください。' },
        { q: 'テキストはどこかにアップロードされますか？', a: 'いいえ。計算はすべてブラウザー内で行われ、貼り付けた内容はサーバーに送信されません。下書き・台本・非公開の文書でも安全です。' },
      ],
      zh: [
        { q: '阅读时间如何计算？', a: '用字数除以阅读速度。本工具默认默读每分钟 238 词、朗读每分钟 130 词，且每项都可切换为慢、中或快。' },
        { q: '平均阅读速度是多少？', a: '成人默读约每分钟 238 词。精读更慢（约 150 词/分），略读更快（约 320 词/分）。朗读慢得多，约每分钟 130 词。' },
        { q: '读 1000 词需要多久？', a: '中速默读约 4 分钟，正常朗读速度约 8 分钟。可用上方的速度选择器匹配你的情况。' },
        { q: '我的文本会被上传吗？', a: '不会。计算完全在你的浏览器中进行——你粘贴的任何内容都不会发送到服务器，因此适合草稿、脚本和私密文档。' },
      ],
      da: [
        { q: 'Hvordan beregnes læsetiden?', a: 'Antal ord divideret med læsehastigheden. Værktøjet bruger som standard 238 ord i minuttet til stille læsning og 130 til at læse højt, og du kan sætte hver til langsom, middel eller hurtig.' },
        { q: 'Hvad er den gennemsnitlige læsehastighed?', a: 'Omkring 238 ord i minuttet ved stille læsning hos voksne. Grundig læsning er langsommere (~150 ord/min) og skimning hurtigere (~320 ord/min). At læse højt er meget langsommere, omkring 130 ord/min.' },
        { q: 'Hvor lang tid tager det at læse 1000 ord?', a: 'Cirka 4 minutter stille ved middeltempo eller omkring 8 minutter højt ved normal talehastighed. Brug hastighedsvælgerne ovenfor til din situation.' },
        { q: 'Bliver min tekst uploadet nogen steder?', a: 'Nej. Beregningen kører helt i din browser – intet af det, du indsætter, sendes til en server, så det er sikkert til udkast, manuskripter og private dokumenter.' },
      ],
    },
  },
  {
    id: 'byte-counter',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'UTF-8 1–4 bytes/char; UTF-16 2–4 bytes; UTF-32 4 bytes',

    slugs: {
      en: 'byte-counter',
      es: 'contador-de-bytes',
      de: 'byte-zaehler',
      fr: 'compteur-octets',
      pt: 'contador-de-bytes',
      it: 'contatore-byte',
      nl: 'byte-teller',
      ja: 'baito-kaunta',
      zh: 'zi-jie-ji-shu-qi',
      da: 'byte-taeller',
    },

    schemaName: {
      en: 'Byte Counter',
      es: 'Contador de Bytes',
      de: 'Byte-Zähler',
      fr: 'Compteur d’Octets',
      pt: 'Contador de Bytes',
      it: 'Contatore di Byte',
      nl: 'Byte-teller',
      ja: 'バイト数カウンター',
      zh: '字节计数器',
      da: 'Byte-tæller',
    },

    titles: {
      en: 'Byte Counter — UTF-8, UTF-16 & UTF-32 Byte Calculator',
      es: 'Contador de Bytes — Calculadora de bytes UTF-8, UTF-16 y UTF-32',
      de: 'Byte-Zähler — UTF-8-, UTF-16- und UTF-32-Byte-Rechner',
      fr: 'Compteur d’Octets — Calculateur d’octets UTF-8, UTF-16 et UTF-32',
      pt: 'Contador de Bytes — Calculadora de bytes UTF-8, UTF-16 e UTF-32',
      it: 'Contatore di Byte — Calcolatore di byte UTF-8, UTF-16 e UTF-32',
      nl: 'Byte-teller — UTF-8-, UTF-16- en UTF-32-byte-calculator',
      ja: 'バイト数カウンター — UTF-8・UTF-16・UTF-32 バイト計算ツール',
      zh: '字节计数器 — UTF-8、UTF-16 与 UTF-32 字节计算器',
      da: 'Byte-tæller — UTF-8-, UTF-16- og UTF-32-byte-beregner',
    },

    metaDescriptions: {
      en: 'Free byte counter for developers. Paste text to see its exact size in UTF-8, UTF-16, and UTF-32 bytes, plus character and Unicode code-point counts.',
      es: 'Contador de bytes gratuito para desarrolladores. Pega texto y mira su tamaño exacto en bytes UTF-8, UTF-16 y UTF-32, además de caracteres y puntos de código Unicode.',
      de: 'Kostenloser Byte-Zähler für Entwickler. Text einfügen und die exakte Größe in UTF-8-, UTF-16- und UTF-32-Bytes sowie Zeichen- und Unicode-Codepoint-Anzahl sehen.',
      fr: 'Compteur d’octets gratuit pour les développeurs. Collez du texte pour voir sa taille exacte en octets UTF-8, UTF-16 et UTF-32, plus les caractères et points de code Unicode.',
      pt: 'Contador de bytes gratuito para programadores. Cole texto para ver o tamanho exato em bytes UTF-8, UTF-16 e UTF-32, além de caracteres e pontos de código Unicode.',
      it: 'Contatore di byte gratuito per sviluppatori. Incolla il testo per vederne la dimensione esatta in byte UTF-8, UTF-16 e UTF-32, oltre a caratteri e code point Unicode.',
      nl: 'Gratis byte-teller voor ontwikkelaars. Plak tekst om de exacte grootte in UTF-8-, UTF-16- en UTF-32-bytes te zien, plus tekens en Unicode-codepunten.',
      ja: '開発者向けの無料バイト数カウンター。テキストを貼り付けると、UTF-8・UTF-16・UTF-32 の正確なバイト数に加え、文字数と Unicode コードポイント数がわかります。',
      zh: '面向开发者的免费字节计数器。粘贴文本即可查看其在 UTF-8、UTF-16 和 UTF-32 下的精确字节大小，以及字符数和 Unicode 码点数。',
      da: 'Gratis byte-tæller til udviklere. Indsæt tekst for at se den nøjagtige størrelse i UTF-8-, UTF-16- og UTF-32-bytes plus tegn og Unicode-kodepunkter.',
    },

    intro: {
      en: 'Need the exact byte size of a string? Paste any text below to see its length in UTF-8, UTF-16, and UTF-32 bytes alongside character and code-point counts.',
      es: '¿Necesitas el tamaño exacto en bytes de una cadena? Pega cualquier texto abajo para ver su longitud en bytes UTF-8, UTF-16 y UTF-32 junto con los caracteres y puntos de código.',
      de: 'Du brauchst die exakte Byte-Größe eines Strings? Füge unten beliebigen Text ein, um seine Länge in UTF-8-, UTF-16- und UTF-32-Bytes samt Zeichen- und Codepoint-Anzahl zu sehen.',
      fr: 'Besoin de la taille exacte en octets d’une chaîne ? Collez n’importe quel texte ci-dessous pour voir sa longueur en octets UTF-8, UTF-16 et UTF-32 ainsi que les caractères et points de code.',
      pt: 'Precisa do tamanho exato em bytes de uma string? Cole qualquer texto abaixo para ver o comprimento em bytes UTF-8, UTF-16 e UTF-32 junto com caracteres e pontos de código.',
      it: 'Ti serve la dimensione esatta in byte di una stringa? Incolla qualsiasi testo qui sotto per vederne la lunghezza in byte UTF-8, UTF-16 e UTF-32 insieme a caratteri e code point.',
      nl: 'Heb je de exacte byte-grootte van een string nodig? Plak hieronder een tekst om de lengte in UTF-8-, UTF-16- en UTF-32-bytes te zien, samen met tekens en codepunten.',
      ja: '文字列の正確なバイトサイズが必要ですか？下に任意のテキストを貼り付けると、UTF-8・UTF-16・UTF-32 のバイト長と、文字数・コードポイント数を確認できます。',
      zh: '需要字符串的精确字节大小？在下方粘贴任意文本，即可查看其 UTF-8、UTF-16 和 UTF-32 字节长度，以及字符数和码点数。',
      da: 'Har du brug for den nøjagtige byte-størrelse af en streng? Indsæt en hvilken som helst tekst nedenfor for at se længden i UTF-8-, UTF-16- og UTF-32-bytes sammen med tegn og kodepunkter.',
    },

    content: {
      en: `<h2>How many bytes is your text?</h2>
<p>Characters and bytes are not the same thing. A string’s <strong>byte size</strong> depends on the encoding: <strong>UTF-8</strong> uses one byte for ASCII and up to four for emoji, <strong>UTF-16</strong> uses two or four, and <strong>UTF-32</strong> always uses four per code point. Paste your text above and this tool reports all three at once, so you know exactly how much space a string occupies.</p>
<h2>Why byte size matters</h2>
<p>Byte limits show up everywhere developers work: database column sizes (<strong>VARCHAR</strong> is often measured in bytes), HTTP headers and cookies, JSON payload budgets, SMS segments, QR codes, and API field caps. A 20-character string can be 20 bytes or 80 bytes depending on the script, so counting characters alone can silently blow a limit. UTF-8 is the default for the web, JSON, and most databases.</p>
<h2>Characters, code points, and bytes</h2>
<p>This tool separates three different counts. <strong>Characters</strong> are grapheme clusters — what a reader perceives as one symbol, including emoji built from several code points. <strong>Code points</strong> are individual Unicode scalar values. <strong>Bytes</strong> are the encoded storage size. An emoji like 👍 is one character, one code point, and four UTF-8 bytes; a flag emoji is one character but two code points and eight UTF-8 bytes.</p>
<h2>Private and instant</h2>
<p>Everything is computed in your browser using the standard TextEncoder, so the counts match exactly what your server or database will store. Nothing you paste is uploaded, which makes it safe for tokens, keys, and other sensitive strings. Edit the text and every figure updates live.</p>`,
      es: `<h2>¿Cuántos bytes ocupa tu texto?</h2>
<p>Caracteres y bytes no son lo mismo. El <strong>tamaño en bytes</strong> de una cadena depende de la codificación: <strong>UTF-8</strong> usa un byte para ASCII y hasta cuatro para emojis, <strong>UTF-16</strong> usa dos o cuatro, y <strong>UTF-32</strong> siempre usa cuatro por punto de código. Pega tu texto arriba y esta herramienta muestra las tres a la vez, para que sepas exactamente cuánto espacio ocupa una cadena.</p>
<h2>Por qué importa el tamaño en bytes</h2>
<p>Los límites de bytes aparecen por todas partes: tamaños de columnas de base de datos (<strong>VARCHAR</strong> suele medirse en bytes), cabeceras HTTP y cookies, presupuestos de JSON, segmentos SMS, códigos QR y límites de campos de API. Una cadena de 20 caracteres puede ocupar 20 u 80 bytes según el alfabeto, así que contar solo caracteres puede superar un límite sin avisar. UTF-8 es el valor por defecto en la web, JSON y la mayoría de bases de datos.</p>
<h2>Caracteres, puntos de código y bytes</h2>
<p>Esta herramienta separa tres recuentos distintos. Los <strong>caracteres</strong> son grupos de grafemas, lo que el lector percibe como un símbolo, incluidos los emojis formados por varios puntos de código. Los <strong>puntos de código</strong> son valores escalares Unicode individuales. Los <strong>bytes</strong> son el tamaño de almacenamiento codificado. Un emoji como 👍 es un carácter, un punto de código y cuatro bytes UTF-8; un emoji de bandera es un carácter pero dos puntos de código y ocho bytes UTF-8.</p>
<h2>Privado e instantáneo</h2>
<p>Todo se calcula en tu navegador con el TextEncoder estándar, así que los recuentos coinciden exactamente con lo que guardará tu servidor o base de datos. Nada de lo que pegues se sube, por lo que es seguro para tokens, claves y otras cadenas sensibles. Edita el texto y cada cifra se actualiza al instante.</p>`,
      de: `<h2>Wie viele Bytes hat dein Text?</h2>
<p>Zeichen und Bytes sind nicht dasselbe. Die <strong>Byte-Größe</strong> eines Strings hängt von der Kodierung ab: <strong>UTF-8</strong> nutzt ein Byte für ASCII und bis zu vier für Emojis, <strong>UTF-16</strong> zwei oder vier und <strong>UTF-32</strong> immer vier pro Codepoint. Füge deinen Text oben ein, und dieses Tool zeigt alle drei gleichzeitig, damit du genau weißt, wie viel Platz ein String belegt.</p>
<h2>Warum die Byte-Größe wichtig ist</h2>
<p>Byte-Limits begegnen Entwicklern überall: Datenbankspalten (<strong>VARCHAR</strong> wird oft in Bytes gemessen), HTTP-Header und Cookies, JSON-Budgets, SMS-Segmente, QR-Codes und API-Feldgrenzen. Ein 20-Zeichen-String kann je nach Schrift 20 oder 80 Bytes haben, daher kann das bloße Zählen von Zeichen ein Limit unbemerkt sprengen. UTF-8 ist der Standard im Web, in JSON und in den meisten Datenbanken.</p>
<h2>Zeichen, Codepoints und Bytes</h2>
<p>Dieses Tool trennt drei verschiedene Zählungen. <strong>Zeichen</strong> sind Graphem-Cluster – was der Leser als ein Symbol wahrnimmt, einschließlich Emojis aus mehreren Codepoints. <strong>Codepoints</strong> sind einzelne Unicode-Skalarwerte. <strong>Bytes</strong> sind die kodierte Speichergröße. Ein Emoji wie 👍 ist ein Zeichen, ein Codepoint und vier UTF-8-Bytes; ein Flaggen-Emoji ist ein Zeichen, aber zwei Codepoints und acht UTF-8-Bytes.</p>
<h2>Privat und sofort</h2>
<p>Alles wird mit dem Standard-TextEncoder in deinem Browser berechnet, sodass die Zählungen genau dem entsprechen, was dein Server oder deine Datenbank speichert. Nichts, was du einfügst, wird hochgeladen – sicher für Tokens, Schlüssel und andere sensible Strings. Bearbeite den Text, und jede Zahl aktualisiert sich live.</p>`,
      fr: `<h2>Combien d’octets fait votre texte ?</h2>
<p>Les caractères et les octets ne sont pas la même chose. La <strong>taille en octets</strong> d’une chaîne dépend de l’encodage : <strong>UTF-8</strong> utilise un octet pour l’ASCII et jusqu’à quatre pour les emojis, <strong>UTF-16</strong> deux ou quatre, et <strong>UTF-32</strong> toujours quatre par point de code. Collez votre texte ci-dessus et cet outil affiche les trois à la fois, pour savoir exactement l’espace qu’occupe une chaîne.</p>
<h2>Pourquoi la taille en octets compte</h2>
<p>Les limites d’octets sont partout : tailles de colonnes de base de données (<strong>VARCHAR</strong> se mesure souvent en octets), en-têtes HTTP et cookies, budgets JSON, segments SMS, codes QR et limites de champs d’API. Une chaîne de 20 caractères peut faire 20 ou 80 octets selon l’écriture ; compter seulement les caractères peut donc dépasser une limite sans prévenir. UTF-8 est la valeur par défaut du web, de JSON et de la plupart des bases de données.</p>
<h2>Caractères, points de code et octets</h2>
<p>Cet outil distingue trois comptes différents. Les <strong>caractères</strong> sont des grappes de graphèmes — ce que le lecteur perçoit comme un symbole, y compris les emojis composés de plusieurs points de code. Les <strong>points de code</strong> sont des valeurs scalaires Unicode individuelles. Les <strong>octets</strong> sont la taille de stockage encodée. Un emoji comme 👍 est un caractère, un point de code et quatre octets UTF-8 ; un emoji de drapeau est un caractère mais deux points de code et huit octets UTF-8.</p>
<h2>Privé et instantané</h2>
<p>Tout est calculé dans votre navigateur avec le TextEncoder standard, donc les comptes correspondent exactement à ce que votre serveur ou base de données stockera. Rien de ce que vous collez n’est envoyé, ce qui le rend sûr pour les jetons, les clés et autres chaînes sensibles. Modifiez le texte et chaque chiffre se met à jour en direct.</p>`,
      pt: `<h2>Quantos bytes tem o seu texto?</h2>
<p>Caracteres e bytes não são a mesma coisa. O <strong>tamanho em bytes</strong> de uma string depende da codificação: o <strong>UTF-8</strong> usa um byte para ASCII e até quatro para emojis, o <strong>UTF-16</strong> usa dois ou quatro, e o <strong>UTF-32</strong> usa sempre quatro por ponto de código. Cole o seu texto acima e esta ferramenta mostra os três ao mesmo tempo, para saber exatamente quanto espaço uma string ocupa.</p>
<h2>Por que o tamanho em bytes importa</h2>
<p>Os limites de bytes aparecem em todo o lado: tamanhos de colunas de base de dados (<strong>VARCHAR</strong> é muitas vezes medido em bytes), cabeçalhos HTTP e cookies, orçamentos de JSON, segmentos SMS, códigos QR e limites de campos de API. Uma string de 20 caracteres pode ter 20 ou 80 bytes consoante o alfabeto, por isso contar apenas caracteres pode ultrapassar um limite sem aviso. O UTF-8 é o padrão na web, no JSON e na maioria das bases de dados.</p>
<h2>Caracteres, pontos de código e bytes</h2>
<p>Esta ferramenta separa três contagens diferentes. Os <strong>caracteres</strong> são grupos de grafemas — o que o leitor perceciona como um símbolo, incluindo emojis compostos por vários pontos de código. Os <strong>pontos de código</strong> são valores escalares Unicode individuais. Os <strong>bytes</strong> são o tamanho de armazenamento codificado. Um emoji como 👍 é um caractere, um ponto de código e quatro bytes UTF-8; um emoji de bandeira é um caractere, mas dois pontos de código e oito bytes UTF-8.</p>
<h2>Privado e instantâneo</h2>
<p>Tudo é calculado no seu navegador com o TextEncoder padrão, por isso as contagens correspondem exatamente ao que o seu servidor ou base de dados vai guardar. Nada do que colar é enviado, o que o torna seguro para tokens, chaves e outras strings sensíveis. Edite o texto e cada número atualiza-se ao vivo.</p>`,
      it: `<h2>Quanti byte occupa il tuo testo?</h2>
<p>Caratteri e byte non sono la stessa cosa. La <strong>dimensione in byte</strong> di una stringa dipende dalla codifica: <strong>UTF-8</strong> usa un byte per l’ASCII e fino a quattro per le emoji, <strong>UTF-16</strong> due o quattro, e <strong>UTF-32</strong> sempre quattro per code point. Incolla il testo sopra e questo strumento mostra tutti e tre contemporaneamente, così sai esattamente quanto spazio occupa una stringa.</p>
<h2>Perché la dimensione in byte conta</h2>
<p>I limiti di byte sono ovunque: dimensioni delle colonne dei database (<strong>VARCHAR</strong> è spesso misurato in byte), header HTTP e cookie, budget JSON, segmenti SMS, codici QR e limiti dei campi API. Una stringa di 20 caratteri può occupare 20 o 80 byte a seconda dell’alfabeto, quindi contare solo i caratteri può sforare un limite senza preavviso. UTF-8 è il valore predefinito per il web, JSON e la maggior parte dei database.</p>
<h2>Caratteri, code point e byte</h2>
<p>Questo strumento distingue tre conteggi diversi. I <strong>caratteri</strong> sono cluster di grafemi — ciò che il lettore percepisce come un simbolo, comprese le emoji composte da più code point. I <strong>code point</strong> sono singoli valori scalari Unicode. I <strong>byte</strong> sono la dimensione di archiviazione codificata. Un’emoji come 👍 è un carattere, un code point e quattro byte UTF-8; un’emoji bandiera è un carattere ma due code point e otto byte UTF-8.</p>
<h2>Privato e istantaneo</h2>
<p>Tutto viene calcolato nel tuo browser con il TextEncoder standard, quindi i conteggi corrispondono esattamente a ciò che il server o il database memorizzerà. Nulla di ciò che incolli viene caricato, il che lo rende sicuro per token, chiavi e altre stringhe sensibili. Modifica il testo e ogni cifra si aggiorna in tempo reale.</p>`,
      nl: `<h2>Hoeveel bytes is je tekst?</h2>
<p>Tekens en bytes zijn niet hetzelfde. De <strong>byte-grootte</strong> van een string hangt af van de codering: <strong>UTF-8</strong> gebruikt één byte voor ASCII en tot vier voor emoji, <strong>UTF-16</strong> twee of vier, en <strong>UTF-32</strong> altijd vier per codepunt. Plak je tekst hierboven en deze tool toont alle drie tegelijk, zodat je precies weet hoeveel ruimte een string inneemt.</p>
<h2>Waarom byte-grootte uitmaakt</h2>
<p>Byte-limieten kom je overal tegen: databasekolommen (<strong>VARCHAR</strong> wordt vaak in bytes gemeten), HTTP-headers en cookies, JSON-budgetten, sms-segmenten, QR-codes en API-veldlimieten. Een string van 20 tekens kan 20 of 80 bytes zijn afhankelijk van het schrift, dus alleen tekens tellen kan ongemerkt een limiet overschrijden. UTF-8 is de standaard voor het web, JSON en de meeste databases.</p>
<h2>Tekens, codepunten en bytes</h2>
<p>Deze tool onderscheidt drie verschillende tellingen. <strong>Tekens</strong> zijn grafeemclusters — wat een lezer als één symbool ziet, inclusief emoji die uit meerdere codepunten bestaan. <strong>Codepunten</strong> zijn losse Unicode-scalairwaarden. <strong>Bytes</strong> zijn de gecodeerde opslaggrootte. Een emoji als 👍 is één teken, één codepunt en vier UTF-8-bytes; een vlagemoji is één teken maar twee codepunten en acht UTF-8-bytes.</p>
<h2>Privé en direct</h2>
<p>Alles wordt in je browser berekend met de standaard TextEncoder, dus de tellingen komen exact overeen met wat je server of database opslaat. Niets van wat je plakt wordt geüpload, wat het veilig maakt voor tokens, sleutels en andere gevoelige strings. Bewerk de tekst en elk getal werkt live bij.</p>`,
      ja: `<h2>あなたのテキストは何バイト？</h2>
<p>文字とバイトは同じではありません。文字列の<strong>バイトサイズ</strong>はエンコーディングで変わります。<strong>UTF-8</strong> は ASCII に1バイト、絵文字には最大4バイト、<strong>UTF-16</strong> は2または4バイト、<strong>UTF-32</strong> はコードポイントごとに常に4バイトです。上にテキストを貼り付けると、本ツールが3つすべてを同時に表示し、文字列が占める容量が正確にわかります。</p>
<h2>バイトサイズが重要な理由</h2>
<p>バイト制限は開発のあらゆる場面に現れます。データベースの列サイズ（<strong>VARCHAR</strong> はしばしばバイト単位）、HTTP ヘッダーや Cookie、JSON のサイズ、SMS セグメント、QR コード、API のフィールド上限などです。20文字の文字列でも文字種によって20バイトにも80バイトにもなり、文字だけ数えると気づかぬうちに上限を超えることがあります。UTF-8 は Web・JSON・多くのデータベースの既定です。</p>
<h2>文字・コードポイント・バイト</h2>
<p>本ツールは3つの異なるカウントを区別します。<strong>文字</strong>は書記素クラスター、つまり読者が1つの記号として認識するもので、複数のコードポイントから成る絵文字も含みます。<strong>コードポイント</strong>は個々の Unicode スカラー値です。<strong>バイト</strong>は符号化された保存サイズです。👍 のような絵文字は1文字・1コードポイント・4 UTF-8 バイト、旗の絵文字は1文字でも2コードポイント・8 UTF-8 バイトです。</p>
<h2>プライベートで即時</h2>
<p>すべて標準の TextEncoder を使ってブラウザー内で計算するため、カウントはサーバーやデータベースが保存する内容と完全に一致します。貼り付けた内容はアップロードされないので、トークンやキーなどの機密文字列にも安全です。テキストを編集すると、すべての数値がリアルタイムで更新されます。</p>`,
      zh: `<h2>你的文本有多少字节？</h2>
<p>字符和字节并不相同。字符串的<strong>字节大小</strong>取决于编码：<strong>UTF-8</strong> 对 ASCII 使用 1 字节，对表情符号最多 4 字节；<strong>UTF-16</strong> 使用 2 或 4 字节；<strong>UTF-32</strong> 每个码点始终 4 字节。在上方粘贴文本，本工具会同时显示这三者，让你确切知道字符串占用多少空间。</p>
<h2>为什么字节大小很重要</h2>
<p>字节限制无处不在：数据库列大小（<strong>VARCHAR</strong> 常以字节计）、HTTP 头与 Cookie、JSON 负载预算、短信分段、二维码以及 API 字段上限。一个 20 字符的字符串，依字符集不同可能是 20 字节或 80 字节，因此只数字符可能在不知不觉中超限。UTF-8 是 Web、JSON 和多数数据库的默认编码。</p>
<h2>字符、码点与字节</h2>
<p>本工具区分三种不同的计数。<strong>字符</strong>是字素簇——读者眼中的一个符号，包括由多个码点组成的表情符号。<strong>码点</strong>是单个 Unicode 标量值。<strong>字节</strong>是编码后的存储大小。像 👍 这样的表情是 1 个字符、1 个码点、4 个 UTF-8 字节；旗帜表情是 1 个字符，但有 2 个码点、8 个 UTF-8 字节。</p>
<h2>私密且即时</h2>
<p>一切都使用标准的 TextEncoder 在你的浏览器中计算，因此计数与服务器或数据库实际存储的完全一致。你粘贴的内容不会被上传，因此对令牌、密钥等敏感字符串也很安全。编辑文本，每个数字都会实时更新。</p>`,
      da: `<h2>Hvor mange bytes er din tekst?</h2>
<p>Tegn og bytes er ikke det samme. En strengs <strong>byte-størrelse</strong> afhænger af kodningen: <strong>UTF-8</strong> bruger én byte til ASCII og op til fire til emojis, <strong>UTF-16</strong> to eller fire, og <strong>UTF-32</strong> altid fire pr. kodepunkt. Indsæt din tekst ovenfor, og dette værktøj viser alle tre på én gang, så du ved præcis, hvor meget plads en streng fylder.</p>
<h2>Hvorfor byte-størrelse betyder noget</h2>
<p>Byte-grænser dukker op overalt: databasekolonner (<strong>VARCHAR</strong> måles ofte i bytes), HTTP-headere og cookies, JSON-budgetter, SMS-segmenter, QR-koder og API-feltgrænser. En streng på 20 tegn kan være 20 eller 80 bytes afhængigt af skriftsystemet, så det at tælle tegn alene kan overskride en grænse uden varsel. UTF-8 er standarden på nettet, i JSON og i de fleste databaser.</p>
<h2>Tegn, kodepunkter og bytes</h2>
<p>Dette værktøj adskiller tre forskellige tællinger. <strong>Tegn</strong> er grafemklynger — det, læseren opfatter som ét symbol, inklusive emojis sammensat af flere kodepunkter. <strong>Kodepunkter</strong> er enkelte Unicode-skalarværdier. <strong>Bytes</strong> er den kodede lagringsstørrelse. En emoji som 👍 er ét tegn, ét kodepunkt og fire UTF-8-bytes; en flag-emoji er ét tegn, men to kodepunkter og otte UTF-8-bytes.</p>
<h2>Privat og øjeblikkeligt</h2>
<p>Alt beregnes i din browser med den standardiserede TextEncoder, så tællingerne svarer nøjagtigt til det, din server eller database gemmer. Intet af det, du indsætter, uploades, hvilket gør det sikkert til tokens, nøgler og andre følsomme strenge. Rediger teksten, og hvert tal opdateres live.</p>`,
    },

    faq: {
      en: [
        { q: 'How many bytes is one character in UTF-8?', a: 'Between 1 and 4. ASCII letters and digits are 1 byte, accented Latin and Greek/Cyrillic are 2, most Chinese/Japanese/Korean characters are 3, and emoji and rarer symbols are 4.' },
        { q: 'What is the difference between characters, code points, and bytes?', a: 'A character (grapheme) is what you see as one symbol; a code point is one Unicode scalar value; bytes are the encoded size. A single emoji can be 1 character, 1 code point, and 4 UTF-8 bytes — and emoji built from several code points use even more.' },
        { q: 'Which encoding should I count for a database?', a: 'Usually UTF-8, the default for the web, JSON, and most modern databases. Check whether your column length is defined in bytes or characters — UTF-8 multibyte characters can exceed a byte-based limit.' },
        { q: 'Is my text sent to a server?', a: 'No. Byte counting runs entirely in your browser with the standard TextEncoder, so it is safe for API keys, tokens, and other sensitive strings.' },
      ],
      es: [
        { q: '¿Cuántos bytes ocupa un carácter en UTF-8?', a: 'Entre 1 y 4. Las letras y dígitos ASCII ocupan 1 byte, el latín acentuado y el griego/cirílico 2, la mayoría de los caracteres chinos/japoneses/coreanos 3, y los emojis y símbolos poco comunes 4.' },
        { q: '¿Cuál es la diferencia entre caracteres, puntos de código y bytes?', a: 'Un carácter (grafema) es lo que ves como un símbolo; un punto de código es un valor escalar Unicode; los bytes son el tamaño codificado. Un solo emoji puede ser 1 carácter, 1 punto de código y 4 bytes UTF-8, y los emojis formados por varios puntos de código usan aún más.' },
        { q: '¿Qué codificación debo contar para una base de datos?', a: 'Normalmente UTF-8, el valor por defecto de la web, JSON y la mayoría de bases de datos modernas. Comprueba si la longitud de tu columna se define en bytes o en caracteres: los caracteres multibyte de UTF-8 pueden superar un límite basado en bytes.' },
        { q: '¿Se envía mi texto a un servidor?', a: 'No. El conteo de bytes se realiza por completo en tu navegador con el TextEncoder estándar, por lo que es seguro para claves de API, tokens y otras cadenas sensibles.' },
      ],
      de: [
        { q: 'Wie viele Bytes hat ein Zeichen in UTF-8?', a: 'Zwischen 1 und 4. ASCII-Buchstaben und -Ziffern sind 1 Byte, akzentuiertes Latein sowie Griechisch/Kyrillisch 2, die meisten chinesischen/japanischen/koreanischen Zeichen 3 und Emojis sowie seltenere Symbole 4.' },
        { q: 'Was ist der Unterschied zwischen Zeichen, Codepoints und Bytes?', a: 'Ein Zeichen (Graphem) ist, was du als ein Symbol siehst; ein Codepoint ist ein Unicode-Skalarwert; Bytes sind die kodierte Größe. Ein einzelnes Emoji kann 1 Zeichen, 1 Codepoint und 4 UTF-8-Bytes sein – aus mehreren Codepoints zusammengesetzte Emojis brauchen noch mehr.' },
        { q: 'Welche Kodierung sollte ich für eine Datenbank zählen?', a: 'Meist UTF-8, der Standard für Web, JSON und die meisten modernen Datenbanken. Prüfe, ob deine Spaltenlänge in Bytes oder Zeichen definiert ist – UTF-8-Mehrbyte-Zeichen können ein byte-basiertes Limit überschreiten.' },
        { q: 'Wird mein Text an einen Server gesendet?', a: 'Nein. Die Byte-Zählung läuft vollständig in deinem Browser mit dem Standard-TextEncoder, daher ist sie sicher für API-Schlüssel, Tokens und andere sensible Strings.' },
      ],
      fr: [
        { q: 'Combien d’octets fait un caractère en UTF-8 ?', a: 'Entre 1 et 4. Les lettres et chiffres ASCII font 1 octet, le latin accentué et le grec/cyrillique 2, la plupart des caractères chinois/japonais/coréens 3, et les emojis et symboles rares 4.' },
        { q: 'Quelle est la différence entre caractères, points de code et octets ?', a: 'Un caractère (graphème) est ce que vous voyez comme un symbole ; un point de code est une valeur scalaire Unicode ; les octets sont la taille encodée. Un seul emoji peut être 1 caractère, 1 point de code et 4 octets UTF-8 — et les emojis composés de plusieurs points de code en utilisent davantage.' },
        { q: 'Quel encodage compter pour une base de données ?', a: 'Généralement UTF-8, la valeur par défaut du web, de JSON et de la plupart des bases de données modernes. Vérifiez si la longueur de votre colonne est définie en octets ou en caractères : les caractères multioctets UTF-8 peuvent dépasser une limite en octets.' },
        { q: 'Mon texte est-il envoyé à un serveur ?', a: 'Non. Le comptage d’octets s’effectue entièrement dans votre navigateur avec le TextEncoder standard, ce qui le rend sûr pour les clés d’API, les jetons et autres chaînes sensibles.' },
      ],
      pt: [
        { q: 'Quantos bytes tem um caractere em UTF-8?', a: 'Entre 1 e 4. Letras e dígitos ASCII têm 1 byte, latim acentuado e grego/cirílico 2, a maioria dos caracteres chineses/japoneses/coreanos 3, e os emojis e símbolos raros 4.' },
        { q: 'Qual é a diferença entre caracteres, pontos de código e bytes?', a: 'Um caractere (grafema) é o que vê como um símbolo; um ponto de código é um valor escalar Unicode; os bytes são o tamanho codificado. Um único emoji pode ser 1 caractere, 1 ponto de código e 4 bytes UTF-8 — e emojis compostos por vários pontos de código usam ainda mais.' },
        { q: 'Que codificação devo contar para uma base de dados?', a: 'Normalmente UTF-8, o padrão da web, do JSON e da maioria das bases de dados modernas. Verifique se o comprimento da coluna é definido em bytes ou caracteres — caracteres multibyte UTF-8 podem exceder um limite baseado em bytes.' },
        { q: 'O meu texto é enviado para um servidor?', a: 'Não. A contagem de bytes é feita inteiramente no seu navegador com o TextEncoder padrão, por isso é segura para chaves de API, tokens e outras strings sensíveis.' },
      ],
      it: [
        { q: 'Quanti byte occupa un carattere in UTF-8?', a: 'Tra 1 e 4. Lettere e cifre ASCII occupano 1 byte, il latino accentato e il greco/cirillico 2, la maggior parte dei caratteri cinesi/giapponesi/coreani 3, ed emoji e simboli rari 4.' },
        { q: 'Qual è la differenza tra caratteri, code point e byte?', a: 'Un carattere (grafema) è ciò che vedi come un simbolo; un code point è un valore scalare Unicode; i byte sono la dimensione codificata. Una singola emoji può essere 1 carattere, 1 code point e 4 byte UTF-8 — e le emoji composte da più code point ne usano ancora di più.' },
        { q: 'Quale codifica devo contare per un database?', a: 'Di solito UTF-8, il valore predefinito per il web, JSON e la maggior parte dei database moderni. Verifica se la lunghezza della colonna è definita in byte o in caratteri: i caratteri multibyte UTF-8 possono superare un limite basato sui byte.' },
        { q: 'Il mio testo viene inviato a un server?', a: 'No. Il conteggio dei byte avviene interamente nel tuo browser con il TextEncoder standard, quindi è sicuro per chiavi API, token e altre stringhe sensibili.' },
      ],
      nl: [
        { q: 'Hoeveel bytes is één teken in UTF-8?', a: 'Tussen 1 en 4. ASCII-letters en -cijfers zijn 1 byte, Latijn met accenten en Grieks/Cyrillisch 2, de meeste Chinese/Japanse/Koreaanse tekens 3, en emoji en zeldzamere symbolen 4.' },
        { q: 'Wat is het verschil tussen tekens, codepunten en bytes?', a: 'Een teken (grafeem) is wat je als één symbool ziet; een codepunt is één Unicode-scalairwaarde; bytes zijn de gecodeerde grootte. Eén emoji kan 1 teken, 1 codepunt en 4 UTF-8-bytes zijn — en emoji uit meerdere codepunten gebruiken er nog meer.' },
        { q: 'Welke codering moet ik tellen voor een database?', a: 'Meestal UTF-8, de standaard voor het web, JSON en de meeste moderne databases. Controleer of je kolomlengte in bytes of tekens is gedefinieerd — UTF-8-multibyte-tekens kunnen een byte-gebaseerde limiet overschrijden.' },
        { q: 'Wordt mijn tekst naar een server gestuurd?', a: 'Nee. Het tellen van bytes gebeurt volledig in je browser met de standaard TextEncoder, dus het is veilig voor API-sleutels, tokens en andere gevoelige strings.' },
      ],
      ja: [
        { q: 'UTF-8 で1文字は何バイト？', a: '1〜4バイトです。ASCII の英数字は1、アクセント付きラテンやギリシャ/キリルは2、多くの中国語・日本語・韓国語の文字は3、絵文字や珍しい記号は4バイトです。' },
        { q: '文字・コードポイント・バイトの違いは？', a: '文字（書記素）は1つの記号として見えるもの、コードポイントは1つの Unicode スカラー値、バイトは符号化サイズです。1つの絵文字が1文字・1コードポイント・4 UTF-8 バイトになることもあり、複数コードポイントの絵文字はさらに多くなります。' },
        { q: 'データベースにはどのエンコーディングを数えるべき？', a: '通常は UTF-8 で、Web・JSON・多くの最新データベースの既定です。列の長さがバイト単位か文字単位かを確認してください。UTF-8 のマルチバイト文字はバイト基準の上限を超えることがあります。' },
        { q: 'テキストはサーバーに送信されますか？', a: 'いいえ。バイト数の計算は標準の TextEncoder でブラウザー内のみで行われるため、API キーやトークンなどの機密文字列にも安全です。' },
      ],
      zh: [
        { q: 'UTF-8 中一个字符是多少字节？', a: '1 到 4 字节。ASCII 字母和数字为 1 字节，带重音的拉丁字符及希腊/西里尔字符为 2 字节，多数中日韩字符为 3 字节，表情符号和较少见的符号为 4 字节。' },
        { q: '字符、码点和字节有什么区别？', a: '字符（字素）是你看到的一个符号；码点是单个 Unicode 标量值；字节是编码后的大小。一个表情可能是 1 个字符、1 个码点、4 个 UTF-8 字节——由多个码点组成的表情会用得更多。' },
        { q: '数据库应当统计哪种编码？', a: '通常是 UTF-8，它是 Web、JSON 和多数现代数据库的默认编码。请检查你的列长度是按字节还是按字符定义——UTF-8 多字节字符可能超过按字节计的限制。' },
        { q: '我的文本会被发送到服务器吗？', a: '不会。字节统计完全在你的浏览器中使用标准 TextEncoder 进行，因此对 API 密钥、令牌等敏感字符串也很安全。' },
      ],
      da: [
        { q: 'Hvor mange bytes er ét tegn i UTF-8?', a: 'Mellem 1 og 4. ASCII-bogstaver og -tal er 1 byte, accentueret latin samt græsk/kyrillisk 2, de fleste kinesiske/japanske/koreanske tegn 3, og emojis og sjældnere symboler 4.' },
        { q: 'Hvad er forskellen på tegn, kodepunkter og bytes?', a: 'Et tegn (grafem) er det, du ser som ét symbol; et kodepunkt er én Unicode-skalarværdi; bytes er den kodede størrelse. En enkelt emoji kan være 1 tegn, 1 kodepunkt og 4 UTF-8-bytes — og emojis sammensat af flere kodepunkter bruger endnu mere.' },
        { q: 'Hvilken kodning skal jeg tælle til en database?', a: 'Som regel UTF-8, standarden for nettet, JSON og de fleste moderne databaser. Tjek, om din kolonnelængde er defineret i bytes eller tegn — UTF-8-multibyte-tegn kan overskride en byte-baseret grænse.' },
        { q: 'Bliver min tekst sendt til en server?', a: 'Nej. Byte-tællingen kører helt i din browser med den standardiserede TextEncoder, så den er sikker til API-nøgler, tokens og andre følsomme strenge.' },
      ],
    },
  },
  {
    id: 'emoji-counter',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'Emoji counted as grapheme clusters; hidden chars incl. U+200B/200C/200D/FEFF',

    slugs: {
      en: 'emoji-counter',
      es: 'contador-de-emojis',
      de: 'emoji-zaehler',
      fr: 'compteur-emojis',
      pt: 'contador-de-emojis',
      it: 'contatore-emoji',
      nl: 'emoji-teller',
      ja: 'emoji-kaunta',
      zh: 'biao-qing-ji-shu',
      da: 'emoji-taeller',
    },

    schemaName: {
      en: 'Emoji Counter & Invisible Character Detector',
      es: 'Contador de Emojis y Detector de Caracteres Invisibles',
      de: 'Emoji-Zähler & Detektor für unsichtbare Zeichen',
      fr: 'Compteur d’Emojis & Détecteur de Caractères Invisibles',
      pt: 'Contador de Emojis e Detetor de Caracteres Invisíveis',
      it: 'Contatore di Emoji e Rilevatore di Caratteri Invisibili',
      nl: 'Emoji-teller & Detector van Onzichtbare Tekens',
      ja: '絵文字カウンター＆不可視文字ディテクター',
      zh: '表情符号计数器和不可见字符检测器',
      da: 'Emoji-tæller & Detektor af Usynlige Tegn',
    },

    titles: {
      en: 'Emoji Counter & Invisible Character Detector — Free Online Tool',
      es: 'Contador de Emojis y Detector de Caracteres Invisibles — Gratis',
      de: 'Emoji-Zähler & Detektor für unsichtbare Zeichen — Kostenlos',
      fr: 'Compteur d’Emojis & Détecteur de Caractères Invisibles — Gratuit',
      pt: 'Contador de Emojis e Detetor de Caracteres Invisíveis — Grátis',
      it: 'Contatore di Emoji e Rilevatore di Caratteri Invisibili — Gratis',
      nl: 'Emoji-teller & Detector van Onzichtbare Tekens — Gratis',
      ja: '絵文字カウンター＆不可視文字ディテクター — 無料ツール',
      zh: '表情符号计数器和不可见字符检测器 — 免费在线工具',
      da: 'Emoji-tæller & Detektor af Usynlige Tegn — Gratis',
    },

    metaDescriptions: {
      en: 'Free emoji counter and invisible/zero-width character detector. Paste text to count emoji, spot hidden characters that break copy-paste, and strip them in one click.',
      es: 'Contador de emojis y detector de caracteres invisibles o de ancho cero gratuito. Pega texto para contar emojis, detectar caracteres ocultos y eliminarlos con un clic.',
      de: 'Kostenloser Emoji-Zähler und Detektor für unsichtbare/nullbreite Zeichen. Text einfügen, Emojis zählen, versteckte Zeichen erkennen und mit einem Klick entfernen.',
      fr: 'Compteur d’emojis et détecteur de caractères invisibles/de largeur nulle gratuit. Collez du texte pour compter les emojis, repérer les caractères cachés et les supprimer en un clic.',
      pt: 'Contador de emojis e detetor de caracteres invisíveis/de largura zero gratuito. Cole texto para contar emojis, detetar caracteres ocultos e removê-los num clique.',
      it: 'Contatore di emoji e rilevatore di caratteri invisibili/a larghezza zero gratuito. Incolla testo per contare le emoji, individuare i caratteri nascosti e rimuoverli con un clic.',
      nl: 'Gratis emoji-teller en detector van onzichtbare/nulbreedte-tekens. Plak tekst om emoji te tellen, verborgen tekens te vinden en ze met één klik te verwijderen.',
      ja: '無料の絵文字カウンター＆不可視/ゼロ幅文字ディテクター。テキストを貼り付けて絵文字を数え、コピペを壊す隠し文字を見つけ、ワンクリックで除去できます。',
      zh: '免费的表情符号计数器和不可见/零宽字符检测器。粘贴文本即可统计表情符号、发现破坏复制粘贴的隐藏字符，并一键移除。',
      da: 'Gratis emoji-tæller og detektor af usynlige/nul-bredde-tegn. Indsæt tekst for at tælle emojis, finde skjulte tegn, der ødelægger kopiér-indsæt, og fjerne dem med ét klik.',
    },

    intro: {
      en: 'Count the emoji in any text and reveal invisible or zero-width characters hiding inside it. Paste your text below — the tool flags hidden characters and removes them in one click.',
      es: 'Cuenta los emojis de cualquier texto y revela los caracteres invisibles o de ancho cero que se esconden en él. Pega tu texto abajo: la herramienta detecta los caracteres ocultos y los elimina con un clic.',
      de: 'Zähle die Emojis in einem beliebigen Text und decke unsichtbare oder nullbreite Zeichen darin auf. Füge deinen Text unten ein – das Tool markiert versteckte Zeichen und entfernt sie mit einem Klick.',
      fr: 'Comptez les emojis de n’importe quel texte et révélez les caractères invisibles ou de largeur nulle qui s’y cachent. Collez votre texte ci-dessous : l’outil signale les caractères cachés et les supprime en un clic.',
      pt: 'Conte os emojis de qualquer texto e revele os caracteres invisíveis ou de largura zero escondidos nele. Cole o seu texto abaixo: a ferramenta sinaliza os caracteres ocultos e remove-os num clique.',
      it: 'Conta le emoji in qualsiasi testo e rivela i caratteri invisibili o a larghezza zero nascosti al suo interno. Incolla il testo qui sotto: lo strumento segnala i caratteri nascosti e li rimuove con un clic.',
      nl: 'Tel de emoji in een tekst en onthul onzichtbare of nulbreedte-tekens die erin verstopt zitten. Plak je tekst hieronder — de tool markeert verborgen tekens en verwijdert ze met één klik.',
      ja: '任意のテキストの絵文字を数え、中に潜む不可視文字やゼロ幅文字を明らかにします。下にテキストを貼り付けると、隠し文字を検出してワンクリックで除去できます。',
      zh: '统计任意文本中的表情符号，并揭示其中隐藏的不可见或零宽字符。在下方粘贴文本——工具会标记隐藏字符并一键移除。',
      da: 'Tæl emojis i en hvilken som helst tekst, og afslør usynlige eller nul-bredde-tegn, der gemmer sig i den. Indsæt din tekst nedenfor — værktøjet markerer skjulte tegn og fjerner dem med ét klik.',
    },

    content: {
      en: `<h2>Counting emoji the right way</h2>
<p>Emoji are deceptively complex. A single emoji you see — like 👍 — can be one Unicode code point, but a <strong>family</strong> 👨‍👩‍👧 or a <strong>flag</strong> 🇺🇸 is built from several code points joined together. This tool counts emoji as <strong>grapheme clusters</strong>, so each emoji you actually see counts as one, no matter how many code points it hides.</p>
<h2>What are invisible and zero-width characters?</h2>
<p>Invisible characters take up no visible space but are still really there. The most common are the <strong>zero-width space</strong> (U+200B), <strong>zero-width joiner</strong> (U+200D), <strong>byte-order mark</strong> (U+FEFF), and bidirectional marks. They sneak in when you copy text from PDFs, websites, word processors, or messaging apps — and they quietly break things.</p>
<h2>Why hidden characters matter</h2>
<p>A zero-width character can stop a search from matching, corrupt a CSV import, inflate your character count, defeat a password field, or be read aloud awkwardly by a screen reader. They’re also used to <strong>fingerprint or watermark</strong> copied text. If a string “looks right” but won’t validate or compare equal, an invisible character is a likely culprit. This detector lists exactly which ones are present by their Unicode code point.</p>
<h2>Count, detect, and clean — privately</h2>
<p>Paste your text to see the emoji count, total characters, and any hidden characters at a glance. When invisible characters are found, one click strips them and leaves the visible text untouched. Everything runs in your browser, so nothing you paste is uploaded — safe for private messages, code, and documents.</p>`,
      es: `<h2>Contar emojis correctamente</h2>
<p>Los emojis son engañosamente complejos. Un emoji que ves —como 👍— puede ser un único punto de código, pero una <strong>familia</strong> 👨‍👩‍👧 o una <strong>bandera</strong> 🇺🇸 se construye uniendo varios puntos de código. Esta herramienta cuenta los emojis como <strong>grupos de grafemas</strong>, así que cada emoji que ves realmente cuenta como uno, sin importar cuántos puntos de código oculte.</p>
<h2>¿Qué son los caracteres invisibles y de ancho cero?</h2>
<p>Los caracteres invisibles no ocupan espacio visible pero siguen estando ahí. Los más comunes son el <strong>espacio de ancho cero</strong> (U+200B), el <strong>ensamblador de ancho cero</strong> (U+200D), la <strong>marca de orden de bytes</strong> (U+FEFF) y las marcas bidireccionales. Se cuelan al copiar texto de PDF, webs, procesadores de texto o apps de mensajería, y rompen cosas en silencio.</p>
<h2>Por qué importan los caracteres ocultos</h2>
<p>Un carácter de ancho cero puede impedir que una búsqueda coincida, corromper una importación CSV, inflar tu recuento de caracteres, anular un campo de contraseña o leerse de forma extraña en un lector de pantalla. También se usan para <strong>identificar o marcar</strong> texto copiado. Si una cadena «parece correcta» pero no valida ni se compara como igual, un carácter invisible es el sospechoso probable. Este detector enumera exactamente cuáles están presentes por su punto de código Unicode.</p>
<h2>Cuenta, detecta y limpia, de forma privada</h2>
<p>Pega tu texto para ver de un vistazo el número de emojis, el total de caracteres y cualquier carácter oculto. Cuando se detectan caracteres invisibles, un clic los elimina y deja intacto el texto visible. Todo funciona en tu navegador, así que nada de lo que pegues se sube: seguro para mensajes privados, código y documentos.</p>`,
      de: `<h2>Emojis richtig zählen</h2>
<p>Emojis sind täuschend komplex. Ein Emoji, das du siehst – wie 👍 – kann ein einziger Codepoint sein, aber eine <strong>Familie</strong> 👨‍👩‍👧 oder eine <strong>Flagge</strong> 🇺🇸 wird aus mehreren verbundenen Codepoints gebildet. Dieses Tool zählt Emojis als <strong>Graphem-Cluster</strong>, sodass jedes Emoji, das du tatsächlich siehst, als eines zählt – egal wie viele Codepoints es verbirgt.</p>
<h2>Was sind unsichtbare und nullbreite Zeichen?</h2>
<p>Unsichtbare Zeichen nehmen keinen sichtbaren Platz ein, sind aber dennoch vorhanden. Die häufigsten sind das <strong>nullbreite Leerzeichen</strong> (U+200B), der <strong>nullbreite Verbinder</strong> (U+200D), die <strong>Byte-Reihenfolge-Markierung</strong> (U+FEFF) und bidirektionale Marken. Sie schleichen sich beim Kopieren aus PDFs, Websites, Textverarbeitungen oder Messaging-Apps ein – und brechen still Dinge.</p>
<h2>Warum versteckte Zeichen wichtig sind</h2>
<p>Ein nullbreites Zeichen kann verhindern, dass eine Suche trifft, einen CSV-Import beschädigen, deine Zeichenzahl aufblähen, ein Passwortfeld aushebeln oder von einem Screenreader seltsam vorgelesen werden. Sie dienen auch dem <strong>Fingerprinting oder Wasserzeichen</strong> kopierter Texte. Wenn ein String „richtig aussieht“, sich aber nicht validieren oder vergleichen lässt, ist ein unsichtbares Zeichen der wahrscheinliche Übeltäter. Dieser Detektor listet anhand des Unicode-Codepoints genau auf, welche vorhanden sind.</p>
<h2>Zählen, erkennen und bereinigen – privat</h2>
<p>Füge deinen Text ein, um Emoji-Anzahl, Gesamtzeichen und versteckte Zeichen auf einen Blick zu sehen. Werden unsichtbare Zeichen gefunden, entfernt ein Klick sie und lässt den sichtbaren Text unberührt. Alles läuft in deinem Browser, also wird nichts hochgeladen – sicher für private Nachrichten, Code und Dokumente.</p>`,
      fr: `<h2>Compter les emojis correctement</h2>
<p>Les emojis sont d’une complexité trompeuse. Un emoji que vous voyez — comme 👍 — peut être un seul point de code, mais une <strong>famille</strong> 👨‍👩‍👧 ou un <strong>drapeau</strong> 🇺🇸 est composé de plusieurs points de code reliés. Cet outil compte les emojis comme des <strong>grappes de graphèmes</strong>, de sorte que chaque emoji que vous voyez réellement compte pour un, quel que soit le nombre de points de code qu’il cache.</p>
<h2>Que sont les caractères invisibles et de largeur nulle ?</h2>
<p>Les caractères invisibles n’occupent aucun espace visible mais sont bien présents. Les plus courants sont l’<strong>espace de largeur nulle</strong> (U+200B), le <strong>liant de largeur nulle</strong> (U+200D), la <strong>marque d’ordre des octets</strong> (U+FEFF) et les marques bidirectionnelles. Ils se glissent lors de copies depuis des PDF, des sites web, des traitements de texte ou des applis de messagerie — et cassent les choses en silence.</p>
<h2>Pourquoi les caractères cachés comptent</h2>
<p>Un caractère de largeur nulle peut empêcher une recherche de correspondre, corrompre un import CSV, gonfler votre nombre de caractères, déjouer un champ de mot de passe ou être lu bizarrement par un lecteur d’écran. Ils servent aussi à <strong>marquer ou tatouer</strong> un texte copié. Si une chaîne « a l’air correcte » mais ne se valide pas ou ne s’égale pas, un caractère invisible en est probablement la cause. Ce détecteur liste précisément lesquels sont présents par leur point de code Unicode.</p>
<h2>Compter, détecter et nettoyer — en privé</h2>
<p>Collez votre texte pour voir d’un coup d’œil le nombre d’emojis, le total de caractères et tout caractère caché. Lorsque des caractères invisibles sont trouvés, un clic les supprime en laissant le texte visible intact. Tout fonctionne dans votre navigateur : rien de ce que vous collez n’est envoyé — sûr pour les messages privés, le code et les documents.</p>`,
      pt: `<h2>Contar emojis da forma certa</h2>
<p>Os emojis são enganadoramente complexos. Um emoji que vê — como 👍 — pode ser um único ponto de código, mas uma <strong>família</strong> 👨‍👩‍👧 ou uma <strong>bandeira</strong> 🇺🇸 é construída a partir de vários pontos de código unidos. Esta ferramenta conta os emojis como <strong>grupos de grafemas</strong>, por isso cada emoji que realmente vê conta como um, independentemente de quantos pontos de código esconde.</p>
<h2>O que são caracteres invisíveis e de largura zero?</h2>
<p>Os caracteres invisíveis não ocupam espaço visível mas estão lá. Os mais comuns são o <strong>espaço de largura zero</strong> (U+200B), o <strong>união de largura zero</strong> (U+200D), a <strong>marca de ordem de bytes</strong> (U+FEFF) e as marcas bidirecionais. Infiltram-se ao copiar texto de PDF, sites, processadores de texto ou apps de mensagens — e quebram coisas em silêncio.</p>
<h2>Por que os caracteres ocultos importam</h2>
<p>Um caractere de largura zero pode impedir que uma pesquisa corresponda, corromper uma importação CSV, inflacionar a sua contagem de caracteres, anular um campo de palavra-passe ou ser lido de forma estranha por um leitor de ecrã. Também são usados para <strong>identificar ou marcar</strong> texto copiado. Se uma string «parece correta» mas não valida nem se compara como igual, um caractere invisível é o provável culpado. Este detetor lista exatamente quais estão presentes pelo seu ponto de código Unicode.</p>
<h2>Contar, detetar e limpar — de forma privada</h2>
<p>Cole o seu texto para ver de relance o número de emojis, o total de caracteres e quaisquer caracteres ocultos. Quando são detetados caracteres invisíveis, um clique remove-os e deixa o texto visível intacto. Tudo corre no seu navegador, por isso nada do que colar é enviado — seguro para mensagens privadas, código e documentos.</p>`,
      it: `<h2>Contare le emoji nel modo giusto</h2>
<p>Le emoji sono ingannevolmente complesse. Un’emoji che vedi — come 👍 — può essere un solo code point, ma una <strong>famiglia</strong> 👨‍👩‍👧 o una <strong>bandiera</strong> 🇺🇸 è composta da più code point uniti. Questo strumento conta le emoji come <strong>cluster di grafemi</strong>, così ogni emoji che vedi davvero conta come una, indipendentemente da quanti code point nasconde.</p>
<h2>Cosa sono i caratteri invisibili e a larghezza zero?</h2>
<p>I caratteri invisibili non occupano spazio visibile ma sono comunque presenti. I più comuni sono lo <strong>spazio a larghezza zero</strong> (U+200B), il <strong>congiuntore a larghezza zero</strong> (U+200D), il <strong>byte-order mark</strong> (U+FEFF) e i segni bidirezionali. Si infilano quando copi testo da PDF, siti web, elaboratori di testo o app di messaggistica — e rompono le cose in silenzio.</p>
<h2>Perché i caratteri nascosti contano</h2>
<p>Un carattere a larghezza zero può impedire a una ricerca di corrispondere, corrompere un’importazione CSV, gonfiare il conteggio dei caratteri, aggirare un campo password o essere letto in modo strano da uno screen reader. Sono usati anche per <strong>identificare o filigranare</strong> il testo copiato. Se una stringa «sembra giusta» ma non si convalida o non risulta uguale, un carattere invisibile è il probabile colpevole. Questo rilevatore elenca esattamente quali sono presenti tramite il loro code point Unicode.</p>
<h2>Conta, rileva e pulisci — in privato</h2>
<p>Incolla il testo per vedere a colpo d’occhio il numero di emoji, i caratteri totali ed eventuali caratteri nascosti. Quando vengono trovati caratteri invisibili, un clic li rimuove lasciando intatto il testo visibile. Tutto avviene nel tuo browser, quindi nulla di ciò che incolli viene caricato — sicuro per messaggi privati, codice e documenti.</p>`,
      nl: `<h2>Emoji op de juiste manier tellen</h2>
<p>Emoji zijn bedrieglijk complex. Eén emoji die je ziet — zoals 👍 — kan één code point zijn, maar een <strong>gezin</strong> 👨‍👩‍👧 of een <strong>vlag</strong> 🇺🇸 bestaat uit meerdere samengevoegde code points. Deze tool telt emoji als <strong>grafeemclusters</strong>, dus elke emoji die je echt ziet telt als één, ongeacht hoeveel code points hij verbergt.</p>
<h2>Wat zijn onzichtbare en nulbreedte-tekens?</h2>
<p>Onzichtbare tekens nemen geen zichtbare ruimte in maar zijn er wel degelijk. De meest voorkomende zijn de <strong>nulbreedte-spatie</strong> (U+200B), de <strong>nulbreedte-koppelaar</strong> (U+200D), de <strong>byte-order mark</strong> (U+FEFF) en bidirectionele tekens. Ze sluipen binnen bij het kopiëren uit pdf’s, websites, tekstverwerkers of berichtenapps — en breken stilletjes dingen.</p>
<h2>Waarom verborgen tekens uitmaken</h2>
<p>Een nulbreedte-teken kan voorkomen dat een zoekopdracht matcht, een CSV-import beschadigen, je tekental opblazen, een wachtwoordveld omzeilen of vreemd worden voorgelezen door een schermlezer. Ze worden ook gebruikt om gekopieerde tekst te <strong>fingerprinten of watermerken</strong>. Als een string er «goed uitziet» maar niet valideert of als gelijk wordt vergeleken, is een onzichtbaar teken de waarschijnlijke boosdoener. Deze detector somt precies op welke aanwezig zijn op basis van hun Unicode-code point.</p>
<h2>Tellen, detecteren en opschonen — privé</h2>
<p>Plak je tekst om in één oogopslag het aantal emoji, totaal aantal tekens en eventuele verborgen tekens te zien. Worden er onzichtbare tekens gevonden, dan verwijdert één klik ze en blijft de zichtbare tekst onaangeroerd. Alles draait in je browser, dus niets van wat je plakt wordt geüpload — veilig voor privéberichten, code en documenten.</p>`,
      ja: `<h2>絵文字を正しく数える</h2>
<p>絵文字は見た目より複雑です。👍 のように見える1つの絵文字は1コードポイントのこともありますが、<strong>家族</strong> 👨‍👩‍👧 や<strong>旗</strong> 🇺🇸 は複数のコードポイントをつなげて作られます。本ツールは絵文字を<strong>書記素クラスター</strong>として数えるため、実際に見える絵文字は、いくつのコードポイントを隠していても1つとして数えます。</p>
<h2>不可視文字・ゼロ幅文字とは？</h2>
<p>不可視文字は見える幅を持ちませんが、確かに存在します。代表的なものは<strong>ゼロ幅スペース</strong>（U+200B）、<strong>ゼロ幅接合子</strong>（U+200D）、<strong>バイト順マーク</strong>（U+FEFF）、双方向制御文字です。PDF・ウェブサイト・ワープロ・メッセージアプリからコピーすると紛れ込み、静かに不具合を起こします。</p>
<h2>隠し文字が重要な理由</h2>
<p>ゼロ幅文字は、検索が一致しなくなる、CSV インポートが壊れる、文字数が水増しされる、パスワード欄が通らない、スクリーンリーダーで不自然に読まれる、といった問題を起こします。コピーしたテキストの<strong>フィンガープリントや透かし</strong>にも使われます。文字列が「正しく見える」のに検証や一致比較に失敗するなら、不可視文字が原因の可能性大です。本ディテクターは、存在するものを Unicode コードポイントで正確に一覧表示します。</p>
<h2>数える・検出する・きれいにする — プライベートに</h2>
<p>テキストを貼り付けると、絵文字数・総文字数・隠し文字をひと目で確認できます。不可視文字が見つかった場合、ワンクリックで除去し、見える文字はそのまま残します。すべてブラウザー内で動作するため、貼り付けた内容はアップロードされません。プライベートなメッセージ・コード・文書にも安全です。</p>`,
      zh: `<h2>正确统计表情符号</h2>
<p>表情符号比看上去复杂。你看到的一个表情——比如 👍——可能是一个码点，但<strong>家庭</strong> 👨‍👩‍👧 或<strong>旗帜</strong> 🇺🇸 是由多个码点连接而成。本工具将表情按<strong>字素簇</strong>统计，因此你实际看到的每个表情都算作一个，无论它隐藏了多少码点。</p>
<h2>什么是不可见字符和零宽字符？</h2>
<p>不可见字符不占可见空间，却真实存在。最常见的有<strong>零宽空格</strong>（U+200B）、<strong>零宽连接符</strong>（U+200D）、<strong>字节顺序标记</strong>（U+FEFF）以及双向控制字符。它们会在从 PDF、网站、文字处理软件或聊天应用复制文本时混入，并悄悄引发问题。</p>
<h2>为什么隐藏字符很重要</h2>
<p>零宽字符可能导致搜索无法匹配、损坏 CSV 导入、虚增字符数、绕过密码字段，或被屏幕阅读器奇怪地读出。它们也被用来对复制文本进行<strong>指纹标记或加水印</strong>。如果一个字符串“看起来没问题”却无法通过校验或相等比较，不可见字符很可能就是元凶。本检测器会按 Unicode 码点准确列出存在的字符。</p>
<h2>统计、检测、清理——全程私密</h2>
<p>粘贴文本即可一眼看到表情数量、字符总数和任何隐藏字符。检测到不可见字符时，一键即可移除，并保持可见文本不变。一切都在你的浏览器中运行，因此你粘贴的内容不会被上传——适合私密消息、代码和文档。</p>`,
      da: `<h2>Tæl emojis på den rigtige måde</h2>
<p>Emojis er bedragerisk komplekse. En emoji, du ser — som 👍 — kan være ét kodepunkt, men en <strong>familie</strong> 👨‍👩‍👧 eller et <strong>flag</strong> 🇺🇸 er bygget af flere kodepunkter, der er sat sammen. Dette værktøj tæller emojis som <strong>grafemklynger</strong>, så hver emoji, du faktisk ser, tæller som én, uanset hvor mange kodepunkter den skjuler.</p>
<h2>Hvad er usynlige tegn og nul-bredde-tegn?</h2>
<p>Usynlige tegn fylder ingen synlig plads, men er der alligevel. De mest almindelige er <strong>nul-bredde-mellemrummet</strong> (U+200B), <strong>nul-bredde-sammenbinderen</strong> (U+200D), <strong>byte-rækkefølgemarkøren</strong> (U+FEFF) og bidirektionelle mærker. De sniger sig ind, når du kopierer tekst fra PDF’er, websteder, tekstbehandlere eller beskedapps — og ødelægger ting i stilhed.</p>
<h2>Hvorfor skjulte tegn betyder noget</h2>
<p>Et nul-bredde-tegn kan forhindre en søgning i at matche, ødelægge en CSV-import, oppuste dit tegntal, omgå et adgangskodefelt eller blive læst akavet op af en skærmlæser. De bruges også til at <strong>fingeraftrykke eller vandmærke</strong> kopieret tekst. Hvis en streng »ser rigtig ud«, men ikke validerer eller sammenlignes som lig, er et usynligt tegn den sandsynlige synder. Denne detektor viser præcis, hvilke der er til stede, ud fra deres Unicode-kodepunkt.</p>
<h2>Tæl, find og rens — privat</h2>
<p>Indsæt din tekst for at se emoji-antal, samlede tegn og eventuelle skjulte tegn med det samme. Når der findes usynlige tegn, fjerner ét klik dem og lader den synlige tekst være urørt. Alt kører i din browser, så intet af det, du indsætter, uploades — sikkert til private beskeder, kode og dokumenter.</p>`,
    },

    faq: {
      en: [
        { q: 'How do you count emoji like flags and families?', a: 'As one each. This tool counts emoji as grapheme clusters, so a flag (two code points) or a family emoji (several code points joined with zero-width joiners) still counts as a single emoji — the way you see it.' },
        { q: 'What is a zero-width or invisible character?', a: 'A character that occupies no visible width, such as the zero-width space (U+200B), zero-width joiner (U+200D), or byte-order mark (U+FEFF). It is present in the text but you cannot see it.' },
        { q: 'Why does my text have hidden characters?', a: 'They are usually pasted in from PDFs, websites, word processors, or chat apps, which insert them for formatting or as invisible markers. They can break search, validation, imports, and screen readers.' },
        { q: 'How do I remove invisible characters?', a: 'Paste your text and, if any are detected, click “Remove hidden characters.” The tool strips every zero-width and control character while leaving your visible text exactly as it was — all in your browser.' },
      ],
      es: [
        { q: '¿Cómo se cuentan los emojis como banderas y familias?', a: 'Como uno cada uno. Esta herramienta cuenta los emojis como grupos de grafemas, así que una bandera (dos puntos de código) o un emoji de familia (varios puntos de código unidos con ensambladores de ancho cero) cuenta como un solo emoji, tal como lo ves.' },
        { q: '¿Qué es un carácter de ancho cero o invisible?', a: 'Un carácter que no ocupa anchura visible, como el espacio de ancho cero (U+200B), el ensamblador de ancho cero (U+200D) o la marca de orden de bytes (U+FEFF). Está en el texto pero no puedes verlo.' },
        { q: '¿Por qué mi texto tiene caracteres ocultos?', a: 'Normalmente se pegan desde PDF, webs, procesadores de texto o apps de chat, que los insertan para formato o como marcadores invisibles. Pueden romper la búsqueda, la validación, las importaciones y los lectores de pantalla.' },
        { q: '¿Cómo elimino los caracteres invisibles?', a: 'Pega tu texto y, si se detecta alguno, haz clic en «Eliminar caracteres ocultos». La herramienta quita todos los caracteres de ancho cero y de control dejando tu texto visible exactamente igual, todo en tu navegador.' },
      ],
      de: [
        { q: 'Wie werden Emojis wie Flaggen und Familien gezählt?', a: 'Als jeweils eines. Dieses Tool zählt Emojis als Graphem-Cluster, sodass eine Flagge (zwei Codepoints) oder ein Familien-Emoji (mehrere mit nullbreiten Verbindern verbundene Codepoints) als ein einzelnes Emoji zählt – so, wie du es siehst.' },
        { q: 'Was ist ein nullbreites oder unsichtbares Zeichen?', a: 'Ein Zeichen ohne sichtbare Breite, etwa das nullbreite Leerzeichen (U+200B), der nullbreite Verbinder (U+200D) oder die Byte-Reihenfolge-Markierung (U+FEFF). Es ist im Text vorhanden, aber nicht sichtbar.' },
        { q: 'Warum enthält mein Text versteckte Zeichen?', a: 'Meist werden sie aus PDFs, Websites, Textverarbeitungen oder Chat-Apps eingefügt, die sie zur Formatierung oder als unsichtbare Marker einsetzen. Sie können Suche, Validierung, Importe und Screenreader stören.' },
        { q: 'Wie entferne ich unsichtbare Zeichen?', a: 'Füge deinen Text ein und klicke, falls welche erkannt werden, auf „Versteckte Zeichen entfernen“. Das Tool entfernt jedes nullbreite und Steuerzeichen und lässt deinen sichtbaren Text exakt wie er war – alles in deinem Browser.' },
      ],
      fr: [
        { q: 'Comment comptez-vous les emojis comme les drapeaux et les familles ?', a: 'Un chacun. Cet outil compte les emojis comme des grappes de graphèmes : un drapeau (deux points de code) ou un emoji de famille (plusieurs points de code reliés par des liants de largeur nulle) compte donc pour un seul emoji, tel que vous le voyez.' },
        { q: 'Qu’est-ce qu’un caractère de largeur nulle ou invisible ?', a: 'Un caractère sans largeur visible, comme l’espace de largeur nulle (U+200B), le liant de largeur nulle (U+200D) ou la marque d’ordre des octets (U+FEFF). Il est présent dans le texte mais vous ne pouvez pas le voir.' },
        { q: 'Pourquoi mon texte contient-il des caractères cachés ?', a: 'Ils sont généralement collés depuis des PDF, des sites web, des traitements de texte ou des applis de chat, qui les insèrent pour la mise en forme ou comme marqueurs invisibles. Ils peuvent casser la recherche, la validation, les imports et les lecteurs d’écran.' },
        { q: 'Comment supprimer les caractères invisibles ?', a: 'Collez votre texte et, si certains sont détectés, cliquez sur « Supprimer les caractères cachés ». L’outil retire tous les caractères de largeur nulle et de contrôle en laissant votre texte visible exactement tel quel — le tout dans votre navigateur.' },
      ],
      pt: [
        { q: 'Como conta emojis como bandeiras e famílias?', a: 'Como um cada. Esta ferramenta conta os emojis como grupos de grafemas, por isso uma bandeira (dois pontos de código) ou um emoji de família (vários pontos de código unidos por uniões de largura zero) conta como um único emoji — tal como o vê.' },
        { q: 'O que é um caractere de largura zero ou invisível?', a: 'Um caractere sem largura visível, como o espaço de largura zero (U+200B), a união de largura zero (U+200D) ou a marca de ordem de bytes (U+FEFF). Está presente no texto mas não consegue vê-lo.' },
        { q: 'Porque é que o meu texto tem caracteres ocultos?', a: 'Normalmente são colados a partir de PDF, sites, processadores de texto ou apps de chat, que os inserem para formatação ou como marcadores invisíveis. Podem quebrar a pesquisa, a validação, as importações e os leitores de ecrã.' },
        { q: 'Como removo os caracteres invisíveis?', a: 'Cole o seu texto e, se algum for detetado, clique em «Remover caracteres ocultos». A ferramenta remove todos os caracteres de largura zero e de controlo, deixando o texto visível exatamente como estava — tudo no seu navegador.' },
      ],
      it: [
        { q: 'Come contate le emoji come bandiere e famiglie?', a: 'Una ciascuna. Questo strumento conta le emoji come cluster di grafemi, quindi una bandiera (due code point) o un’emoji di famiglia (più code point uniti da congiuntori a larghezza zero) conta come una singola emoji — come la vedi.' },
        { q: 'Cos’è un carattere a larghezza zero o invisibile?', a: 'Un carattere senza larghezza visibile, come lo spazio a larghezza zero (U+200B), il congiuntore a larghezza zero (U+200D) o il byte-order mark (U+FEFF). È presente nel testo ma non puoi vederlo.' },
        { q: 'Perché il mio testo ha caratteri nascosti?', a: 'Di solito vengono incollati da PDF, siti web, elaboratori di testo o app di chat, che li inseriscono per la formattazione o come marcatori invisibili. Possono rompere ricerca, convalida, importazioni e screen reader.' },
        { q: 'Come rimuovo i caratteri invisibili?', a: 'Incolla il testo e, se ne vengono rilevati, clicca su «Rimuovi i caratteri nascosti». Lo strumento elimina ogni carattere a larghezza zero e di controllo lasciando il testo visibile esattamente com’era — tutto nel tuo browser.' },
      ],
      nl: [
        { q: 'Hoe tel je emoji zoals vlaggen en gezinnen?', a: 'Als één elk. Deze tool telt emoji als grafeemclusters, dus een vlag (twee code points) of een gezinsemoji (meerdere code points samengevoegd met nulbreedte-koppelaars) telt als één emoji — zoals je hem ziet.' },
        { q: 'Wat is een nulbreedte- of onzichtbaar teken?', a: 'Een teken zonder zichtbare breedte, zoals de nulbreedte-spatie (U+200B), de nulbreedte-koppelaar (U+200D) of de byte-order mark (U+FEFF). Het staat in de tekst maar je kunt het niet zien.' },
        { q: 'Waarom bevat mijn tekst verborgen tekens?', a: 'Ze worden meestal geplakt uit pdf’s, websites, tekstverwerkers of chat-apps, die ze invoegen voor opmaak of als onzichtbare markers. Ze kunnen zoeken, validatie, imports en schermlezers verstoren.' },
        { q: 'Hoe verwijder ik onzichtbare tekens?', a: 'Plak je tekst en klik, als er worden gedetecteerd, op “Verborgen tekens verwijderen”. De tool strips elk nulbreedte- en controleteken en laat je zichtbare tekst precies zoals hij was — allemaal in je browser.' },
      ],
      ja: [
        { q: '旗や家族の絵文字はどう数えますか？', a: 'それぞれ1つとして数えます。本ツールは絵文字を書記素クラスターとして数えるため、旗（2コードポイント）や家族絵文字（ゼロ幅接合子でつないだ複数のコードポイント）も、見たとおり1つの絵文字として数えます。' },
        { q: 'ゼロ幅・不可視文字とは何ですか？', a: '見える幅を持たない文字で、ゼロ幅スペース（U+200B）、ゼロ幅接合子（U+200D）、バイト順マーク（U+FEFF）などです。テキスト中に存在しますが目には見えません。' },
        { q: 'なぜテキストに隠し文字があるの？', a: '多くは PDF・ウェブサイト・ワープロ・チャットアプリから貼り付けたもので、書式や不可視のマーカーとして挿入されます。検索・検証・インポート・スクリーンリーダーを壊すことがあります。' },
        { q: '不可視文字はどう削除しますか？', a: 'テキストを貼り付け、検出されたら「隠し文字を削除」をクリックします。本ツールはすべてのゼロ幅文字と制御文字を取り除き、見える文字はそのまま残します。すべてブラウザー内で行われます。' },
      ],
      zh: [
        { q: '像旗帜和家庭这样的表情如何统计？', a: '各算一个。本工具将表情按字素簇统计，因此旗帜（两个码点）或家庭表情（用零宽连接符连接的多个码点）都算作一个表情——就像你看到的那样。' },
        { q: '什么是零宽或不可见字符？', a: '没有可见宽度的字符，例如零宽空格（U+200B）、零宽连接符（U+200D）或字节顺序标记（U+FEFF）。它存在于文本中，但你看不到。' },
        { q: '为什么我的文本会有隐藏字符？', a: '它们通常是从 PDF、网站、文字处理软件或聊天应用粘贴而来，这些来源出于格式或作为不可见标记而插入它们。它们可能破坏搜索、校验、导入和屏幕阅读器。' },
        { q: '如何移除不可见字符？', a: '粘贴文本，若检测到任何隐藏字符，点击“移除隐藏字符”。工具会清除所有零宽字符和控制字符，同时保持你的可见文本原样——全部在你的浏览器中完成。' },
      ],
      da: [
        { q: 'Hvordan tæller I emojis som flag og familier?', a: 'Som én hver. Dette værktøj tæller emojis som grafemklynger, så et flag (to kodepunkter) eller en familie-emoji (flere kodepunkter sat sammen med nul-bredde-sammenbindere) tæller som én enkelt emoji — sådan som du ser den.' },
        { q: 'Hvad er et nul-bredde- eller usynligt tegn?', a: 'Et tegn uden synlig bredde, såsom nul-bredde-mellemrummet (U+200B), nul-bredde-sammenbinderen (U+200D) eller byte-rækkefølgemarkøren (U+FEFF). Det er til stede i teksten, men du kan ikke se det.' },
        { q: 'Hvorfor har min tekst skjulte tegn?', a: 'De indsættes som regel fra PDF’er, websteder, tekstbehandlere eller chat-apps, der tilføjer dem til formatering eller som usynlige markører. De kan ødelægge søgning, validering, import og skærmlæsere.' },
        { q: 'Hvordan fjerner jeg usynlige tegn?', a: 'Indsæt din tekst, og hvis der findes nogen, klik på »Fjern skjulte tegn«. Værktøjet fjerner alle nul-bredde- og kontroltegn og lader din synlige tekst være præcis som før — alt sammen i din browser.' },
      ],
    },
  },
  {
    id: 'youtube',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'YouTube title 100 chars; description 5,000 chars; comments ~10,000',

    slugs: {
      en: 'youtube-character-counter',
      es: 'contador-caracteres-youtube',
      de: 'youtube-zeichenzaehler',
      fr: 'compteur-caracteres-youtube',
      pt: 'contador-caracteres-youtube',
      it: 'contatore-caratteri-youtube',
      nl: 'youtube-tekenteller',
      ja: 'youtube-moji-kaunta',
      zh: 'youtube-zi-fu-ji-shu',
      da: 'youtube-tegntaeller',
    },

    schemaName: {
      en: 'YouTube Character Counter',
      es: 'Contador de Caracteres de YouTube',
      de: 'YouTube Zeichenzähler',
      fr: 'Compteur de Caractères YouTube',
      pt: 'Contador de Caracteres do YouTube',
      it: 'Contatore di Caratteri YouTube',
      nl: 'YouTube Tekenteller',
      ja: 'YouTube 文字数カウンター',
      zh: 'YouTube 字符计数器',
      da: 'YouTube Tegntæller',
    },

    titles: {
      en: 'YouTube Character Counter — Title & Description Limit Checker',
      es: 'Contador de Caracteres de YouTube — Límites de título y descripción',
      de: 'YouTube Zeichenzähler — Titel- & Beschreibungslimit prüfen',
      fr: 'Compteur de Caractères YouTube — Limites de titre et description',
      pt: 'Contador de Caracteres do YouTube — Limites de título e descrição',
      it: 'Contatore di Caratteri YouTube — Limiti di titolo e descrizione',
      nl: 'YouTube Tekenteller — Titel- & beschrijvingslimiet checken',
      ja: 'YouTube 文字数カウンター — タイトル・説明の上限チェック',
      zh: 'YouTube 字符计数器 — 标题与说明字数检查',
      da: 'YouTube Tegntæller — Tjek titel- & beskrivelsesgrænse',
    },

    metaDescriptions: {
      en: 'Free YouTube character counter. Check your video title against the 100-character limit and description against 5,000 characters, live as you type.',
      es: 'Contador de caracteres de YouTube gratuito. Comprueba el título de tu vídeo frente al límite de 100 caracteres y la descripción frente a 5000, en vivo.',
      de: 'Kostenloser YouTube-Zeichenzähler. Prüfe deinen Videotitel gegen das 100-Zeichen-Limit und die Beschreibung gegen 5.000 Zeichen – live beim Tippen.',
      fr: 'Compteur de caractères YouTube gratuit. Vérifiez le titre de votre vidéo (limite de 100 caractères) et la description (5 000 caractères) en direct.',
      pt: 'Contador de caracteres do YouTube gratuito. Verifique o título do vídeo face ao limite de 100 caracteres e a descrição face a 5000, ao vivo.',
      it: 'Contatore di caratteri YouTube gratuito. Controlla il titolo del video sul limite di 100 caratteri e la descrizione su 5.000, in tempo reale.',
      nl: 'Gratis YouTube-tekenteller. Controleer je videotitel tegen de limiet van 100 tekens en de beschrijving tegen 5.000 tekens, live tijdens het typen.',
      ja: '無料の YouTube 文字数カウンター。動画タイトルを100文字、説明を5,000文字の上限に対してリアルタイムでチェックできます。',
      zh: '免费的 YouTube 字符计数器。在你输入时实时检查视频标题是否在 100 字符以内、说明是否在 5,000 字符以内。',
      da: 'Gratis YouTube-tegntæller. Tjek din videotitel mod grænsen på 100 tegn og beskrivelsen mod 5.000 tegn, live mens du skriver.',
    },

    intro: {
      en: 'Check your YouTube title and description against YouTube’s real character limits before you publish. Type below — the counters update live and flag anything over the limit.',
      es: 'Comprueba el título y la descripción de tu vídeo de YouTube frente a los límites reales antes de publicar. Escribe abajo: los contadores se actualizan en vivo y avisan si te pasas.',
      de: 'Prüfe Titel und Beschreibung deines YouTube-Videos vor der Veröffentlichung gegen die echten Limits. Tippe unten – die Zähler aktualisieren sich live und markieren Überschreitungen.',
      fr: 'Vérifiez le titre et la description de votre vidéo YouTube selon les vraies limites avant de publier. Saisissez ci-dessous : les compteurs se mettent à jour en direct et signalent tout dépassement.',
      pt: 'Verifique o título e a descrição do seu vídeo do YouTube face aos limites reais antes de publicar. Escreva abaixo: os contadores atualizam-se ao vivo e assinalam excessos.',
      it: 'Controlla titolo e descrizione del tuo video YouTube sui limiti reali prima di pubblicare. Scrivi qui sotto: i contatori si aggiornano in tempo reale e segnalano gli eccessi.',
      nl: 'Controleer je YouTube-titel en -beschrijving tegen de echte limieten voordat je publiceert. Typ hieronder — de tellers werken live bij en markeren alles boven de limiet.',
      ja: '公開前に、YouTube の実際の上限に対してタイトルと説明をチェックしましょう。下に入力すると、カウンターがリアルタイムで更新され、超過を知らせます。',
      zh: '发布前，用 YouTube 的真实上限检查你的标题和说明。在下方输入——计数器会实时更新并标记任何超限内容。',
      da: 'Tjek din YouTube-titel og -beskrivelse mod de reelle grænser, før du udgiver. Skriv nedenfor — tællerne opdateres live og markerer alt over grænsen.',
    },

    content: {
      en: `<h2>YouTube character limits</h2>
<p>YouTube caps a video <strong>title at 100 characters</strong> and a <strong>description at 5,000 characters</strong> (roughly 800 words). Only the first ~157 characters of the description show above the “…more” fold and in search snippets, so front-load your keywords and links. This tool counts both fields live so you never get truncated mid-sentence.</p>
<h2>Why the first lines matter most</h2>
<p>Although you get 5,000 characters, viewers see only two or three lines before tapping “Show more.” Put your hook, primary keyword, and most important link in the first 150 characters. The title is even tighter: keep it under 70 characters so it isn’t cut off in search results, suggested videos, and notifications, even though the hard limit is 100.</p>
<h2>Titles, descriptions, tags, and comments</h2>
<p>Each YouTube field has its own limit: titles 100 characters, descriptions 5,000, and tags add up to about 500 characters total. Comments and community posts allow up to roughly 10,000 characters. Emoji and non-Latin scripts still count as characters, so a title that looks short can run long — the live counter reflects exactly what YouTube will accept.</p>
<h2>Private, instant counting</h2>
<p>Paste a draft title and description to see the character count and how much room is left in each field. Everything runs in your browser, so nothing you type is uploaded. Trim until both fields sit comfortably within YouTube’s limits, then copy them straight into YouTube Studio.</p>`,
      es: `<h2>Límites de caracteres de YouTube</h2>
<p>YouTube limita el <strong>título de un vídeo a 100 caracteres</strong> y la <strong>descripción a 5000 caracteres</strong> (unas 800 palabras). Solo los primeros ~157 caracteres de la descripción se ven antes del «…más» y en los resultados de búsqueda, así que pon delante tus palabras clave y enlaces. Esta herramienta cuenta ambos campos en vivo para que nunca te corten a mitad de frase.</p>
<h2>Por qué las primeras líneas importan más</h2>
<p>Aunque dispones de 5000 caracteres, los espectadores solo ven dos o tres líneas antes de pulsar «Mostrar más». Coloca tu gancho, la palabra clave principal y el enlace más importante en los primeros 150 caracteres. El título es aún más ajustado: mantenlo por debajo de 70 caracteres para que no se corte en los resultados, los vídeos sugeridos y las notificaciones, aunque el límite real sea 100.</p>
<h2>Títulos, descripciones, etiquetas y comentarios</h2>
<p>Cada campo de YouTube tiene su propio límite: títulos 100 caracteres, descripciones 5000 y las etiquetas suman unos 500 caracteres en total. Los comentarios y las publicaciones de la comunidad permiten hasta unos 10 000 caracteres. Los emojis y los alfabetos no latinos también cuentan como caracteres, así que un título que parece corto puede alargarse: el contador en vivo refleja exactamente lo que YouTube aceptará.</p>
<h2>Conteo privado e instantáneo</h2>
<p>Pega un borrador de título y descripción para ver el número de caracteres y cuánto espacio queda en cada campo. Todo funciona en tu navegador, así que nada de lo que escribas se sube. Recorta hasta que ambos campos queden holgados dentro de los límites de YouTube y cópialos directamente en YouTube Studio.</p>`,
      de: `<h2>YouTube-Zeichenlimits</h2>
<p>YouTube begrenzt den <strong>Videotitel auf 100 Zeichen</strong> und die <strong>Beschreibung auf 5.000 Zeichen</strong> (etwa 800 Wörter). Nur die ersten ~157 Zeichen der Beschreibung erscheinen über dem „…mehr“ und in Suchausschnitten – platziere deine Keywords und Links also vorn. Dieses Tool zählt beide Felder live, damit du nie mitten im Satz abgeschnitten wirst.</p>
<h2>Warum die ersten Zeilen am wichtigsten sind</h2>
<p>Obwohl dir 5.000 Zeichen zur Verfügung stehen, sehen Zuschauer nur zwei bis drei Zeilen, bevor sie auf „Mehr ansehen“ tippen. Setze deinen Aufhänger, das Hauptkeyword und den wichtigsten Link in die ersten 150 Zeichen. Der Titel ist noch enger: Halte ihn unter 70 Zeichen, damit er in Suchergebnissen, vorgeschlagenen Videos und Benachrichtigungen nicht abgeschnitten wird, auch wenn das harte Limit 100 ist.</p>
<h2>Titel, Beschreibungen, Tags und Kommentare</h2>
<p>Jedes YouTube-Feld hat sein eigenes Limit: Titel 100 Zeichen, Beschreibungen 5.000 und Tags ergeben zusammen etwa 500 Zeichen. Kommentare und Community-Beiträge erlauben bis zu rund 10.000 Zeichen. Emojis und nicht-lateinische Schriften zählen ebenfalls als Zeichen, sodass ein kurz wirkender Titel lang werden kann – der Live-Zähler zeigt genau, was YouTube akzeptiert.</p>
<h2>Privates, sofortiges Zählen</h2>
<p>Füge einen Titel- und Beschreibungsentwurf ein, um die Zeichenzahl und den verbleibenden Platz in jedem Feld zu sehen. Alles läuft in deinem Browser, also wird nichts hochgeladen. Kürze, bis beide Felder bequem in YouTubes Limits passen, und kopiere sie direkt in YouTube Studio.</p>`,
      fr: `<h2>Limites de caractères YouTube</h2>
<p>YouTube limite le <strong>titre d’une vidéo à 100 caractères</strong> et la <strong>description à 5 000 caractères</strong> (environ 800 mots). Seuls les ~157 premiers caractères de la description s’affichent avant le « …plus » et dans les extraits de recherche : placez donc vos mots-clés et liens en tête. Cet outil compte les deux champs en direct pour ne jamais être coupé au milieu d’une phrase.</p>
<h2>Pourquoi les premières lignes comptent le plus</h2>
<p>Même avec 5 000 caractères, les spectateurs ne voient que deux ou trois lignes avant d’appuyer sur « Afficher plus ». Mettez votre accroche, votre mot-clé principal et votre lien le plus important dans les 150 premiers caractères. Le titre est encore plus serré : gardez-le sous 70 caractères pour qu’il ne soit pas coupé dans les résultats, les vidéos suggérées et les notifications, même si la limite réelle est de 100.</p>
<h2>Titres, descriptions, tags et commentaires</h2>
<p>Chaque champ YouTube a sa propre limite : titres 100 caractères, descriptions 5 000, et les tags totalisent environ 500 caractères. Les commentaires et les posts de communauté autorisent jusqu’à environ 10 000 caractères. Les emojis et les écritures non latines comptent aussi comme des caractères : un titre qui paraît court peut s’allonger — le compteur en direct reflète exactement ce que YouTube acceptera.</p>
<h2>Un comptage privé et instantané</h2>
<p>Collez un brouillon de titre et de description pour voir le nombre de caractères et l’espace restant dans chaque champ. Tout fonctionne dans votre navigateur : rien de ce que vous tapez n’est envoyé. Réduisez jusqu’à ce que les deux champs tiennent confortablement dans les limites de YouTube, puis copiez-les directement dans YouTube Studio.</p>`,
      pt: `<h2>Limites de caracteres do YouTube</h2>
<p>O YouTube limita o <strong>título de um vídeo a 100 caracteres</strong> e a <strong>descrição a 5000 caracteres</strong> (cerca de 800 palavras). Apenas os primeiros ~157 caracteres da descrição aparecem antes do «…mais» e nos resultados de pesquisa, por isso coloque à frente as suas palavras-chave e ligações. Esta ferramenta conta ambos os campos ao vivo para que nunca seja cortado a meio de uma frase.</p>
<h2>Porque as primeiras linhas importam mais</h2>
<p>Embora tenha 5000 caracteres, os espectadores veem apenas duas ou três linhas antes de tocar em «Mostrar mais». Coloque o gancho, a palavra-chave principal e a ligação mais importante nos primeiros 150 caracteres. O título é ainda mais apertado: mantenha-o abaixo de 70 caracteres para não ser cortado nos resultados, vídeos sugeridos e notificações, embora o limite real seja 100.</p>
<h2>Títulos, descrições, etiquetas e comentários</h2>
<p>Cada campo do YouTube tem o seu próprio limite: títulos 100 caracteres, descrições 5000 e as etiquetas somam cerca de 500 caracteres no total. Os comentários e as publicações da comunidade permitem até cerca de 10 000 caracteres. Emojis e alfabetos não latinos também contam como caracteres, por isso um título que parece curto pode ficar longo — o contador ao vivo reflete exatamente o que o YouTube aceitará.</p>
<h2>Contagem privada e instantânea</h2>
<p>Cole um rascunho de título e descrição para ver a contagem de caracteres e quanto espaço resta em cada campo. Tudo corre no seu navegador, por isso nada do que escrever é enviado. Corte até ambos os campos ficarem folgados dentro dos limites do YouTube e copie-os diretamente para o YouTube Studio.</p>`,
      it: `<h2>Limiti di caratteri di YouTube</h2>
<p>YouTube limita il <strong>titolo di un video a 100 caratteri</strong> e la <strong>descrizione a 5.000 caratteri</strong> (circa 800 parole). Solo i primi ~157 caratteri della descrizione compaiono prima del «…altro» e negli snippet di ricerca, quindi metti davanti parole chiave e link. Questo strumento conta entrambi i campi in tempo reale così non vieni mai tagliato a metà frase.</p>
<h2>Perché le prime righe contano di più</h2>
<p>Pur avendo 5.000 caratteri, gli spettatori vedono solo due o tre righe prima di toccare «Mostra altro». Metti il gancio, la parola chiave principale e il link più importante nei primi 150 caratteri. Il titolo è ancora più stretto: tienilo sotto i 70 caratteri perché non venga tagliato nei risultati, nei video suggeriti e nelle notifiche, anche se il limite reale è 100.</p>
<h2>Titoli, descrizioni, tag e commenti</h2>
<p>Ogni campo di YouTube ha il proprio limite: titoli 100 caratteri, descrizioni 5.000 e i tag sommano circa 500 caratteri in totale. Commenti e post della community consentono fino a circa 10.000 caratteri. Anche emoji e alfabeti non latini contano come caratteri, quindi un titolo che sembra corto può allungarsi: il contatore in tempo reale riflette esattamente ciò che YouTube accetterà.</p>
<h2>Conteggio privato e istantaneo</h2>
<p>Incolla una bozza di titolo e descrizione per vedere il conteggio dei caratteri e quanto spazio resta in ogni campo. Tutto avviene nel tuo browser, quindi nulla di ciò che scrivi viene caricato. Riduci finché entrambi i campi rientrano comodamente nei limiti di YouTube, poi copiali direttamente in YouTube Studio.</p>`,
      nl: `<h2>YouTube-tekenlimieten</h2>
<p>YouTube beperkt een <strong>videotitel tot 100 tekens</strong> en een <strong>beschrijving tot 5.000 tekens</strong> (ongeveer 800 woorden). Alleen de eerste ~157 tekens van de beschrijving zijn zichtbaar boven het “…meer” en in zoekfragmenten, dus zet je trefwoorden en links vooraan. Deze tool telt beide velden live, zodat je nooit middenin een zin wordt afgekapt.</p>
<h2>Waarom de eerste regels het belangrijkst zijn</h2>
<p>Hoewel je 5.000 tekens hebt, zien kijkers maar twee of drie regels voordat ze op “Meer weergeven” tikken. Zet je hook, het primaire trefwoord en de belangrijkste link in de eerste 150 tekens. De titel is nog krapper: houd hem onder 70 tekens zodat hij niet wordt afgekapt in resultaten, voorgestelde video’s en meldingen, ook al is de harde limiet 100.</p>
<h2>Titels, beschrijvingen, tags en reacties</h2>
<p>Elk YouTube-veld heeft zijn eigen limiet: titels 100 tekens, beschrijvingen 5.000 en tags samen ongeveer 500 tekens. Reacties en community-posts staan tot ongeveer 10.000 tekens toe. Emoji en niet-Latijnse schriften tellen ook als tekens, dus een titel die kort lijkt kan oplopen — de live teller laat precies zien wat YouTube accepteert.</p>
<h2>Privé en direct tellen</h2>
<p>Plak een concept-titel en -beschrijving om het aantal tekens te zien en hoeveel ruimte er per veld over is. Alles draait in je browser, dus niets van wat je typt wordt geüpload. Snoei tot beide velden ruim binnen YouTubes limieten passen en kopieer ze direct naar YouTube Studio.</p>`,
      ja: `<h2>YouTube の文字数制限</h2>
<p>YouTube は動画の<strong>タイトルを100文字</strong>、<strong>説明を5,000文字</strong>（約800語）に制限します。説明は最初の約157文字だけが「…もっと見る」の前と検索スニペットに表示されるため、キーワードとリンクは前に置きましょう。本ツールは両方の項目をリアルタイムで数え、文の途中で切れないようにします。</p>
<h2>最初の数行が最も重要な理由</h2>
<p>5,000文字使えても、視聴者は「もっと見る」を押す前に2〜3行しか見ません。フック・主要キーワード・最重要リンクは最初の150文字に入れましょう。タイトルはさらにシビアで、上限は100文字ですが、検索結果・関連動画・通知で切れないよう70文字未満に抑えるのがおすすめです。</p>
<h2>タイトル・説明・タグ・コメント</h2>
<p>YouTube の各項目には固有の上限があります。タイトル100文字、説明5,000文字、タグは合計で約500文字です。コメントとコミュニティ投稿は約10,000文字まで。絵文字や非ラテン文字も文字として数えられるため、短く見えるタイトルでも長くなることがあります。ライブカウンターは YouTube が受け付ける内容を正確に反映します。</p>
<h2>プライベートで即時のカウント</h2>
<p>タイトルと説明の下書きを貼り付けると、文字数と各項目の残り容量がわかります。すべてブラウザー内で動作するため、入力内容はアップロードされません。両方が YouTube の上限内に余裕で収まるまで調整し、そのまま YouTube Studio にコピーしましょう。</p>`,
      zh: `<h2>YouTube 字符限制</h2>
<p>YouTube 将视频<strong>标题限制为 100 个字符</strong>，<strong>说明限制为 5,000 个字符</strong>（约 800 词）。说明只有前约 157 个字符会显示在“…更多”之前以及搜索摘要中，因此请把关键词和链接放在最前面。本工具实时统计两个字段，让你绝不会在句子中途被截断。</p>
<h2>为什么开头几行最重要</h2>
<p>虽然你有 5,000 个字符，但观众在点击“显示更多”之前只看到两三行。把你的钩子、主要关键词和最重要的链接放在前 150 个字符内。标题更紧：尽管硬性上限是 100，仍建议保持在 70 字符以内，以免在搜索结果、推荐视频和通知中被截断。</p>
<h2>标题、说明、标签和评论</h2>
<p>YouTube 每个字段都有各自的上限：标题 100 个字符，说明 5,000 个，标签合计约 500 个字符。评论和社区帖子最多约 10,000 个字符。表情符号和非拉丁文字同样计为字符，因此看起来短的标题也可能变长——实时计数器准确反映 YouTube 接受的内容。</p>
<h2>私密、即时的统计</h2>
<p>粘贴标题和说明草稿，即可查看字符数以及每个字段还剩多少空间。一切都在你的浏览器中运行，因此你输入的内容不会被上传。修剪到两个字段都从容地在 YouTube 限制内，然后直接复制到 YouTube Studio。</p>`,
      da: `<h2>YouTube-tegngrænser</h2>
<p>YouTube begrænser en videos <strong>titel til 100 tegn</strong> og en <strong>beskrivelse til 5.000 tegn</strong> (cirka 800 ord). Kun de første ~157 tegn af beskrivelsen vises over “…mere” og i søgeuddrag, så placer dine nøgleord og links forrest. Dette værktøj tæller begge felter live, så du aldrig bliver afkortet midt i en sætning.</p>
<h2>Hvorfor de første linjer betyder mest</h2>
<p>Selvom du har 5.000 tegn, ser seerne kun to-tre linjer, før de trykker på “Vis mere”. Sæt din krog, dit primære nøgleord og dit vigtigste link i de første 150 tegn. Titlen er endnu strammere: hold den under 70 tegn, så den ikke afkortes i resultater, foreslåede videoer og notifikationer, selvom den hårde grænse er 100.</p>
<h2>Titler, beskrivelser, tags og kommentarer</h2>
<p>Hvert YouTube-felt har sin egen grænse: titler 100 tegn, beskrivelser 5.000 og tags i alt omkring 500 tegn. Kommentarer og community-opslag tillader op til cirka 10.000 tegn. Emojis og ikke-latinske skrifter tæller også som tegn, så en titel, der ser kort ud, kan blive lang — live-tælleren afspejler præcis, hvad YouTube accepterer.</p>
<h2>Privat, øjeblikkelig optælling</h2>
<p>Indsæt et udkast til titel og beskrivelse for at se tegnantallet, og hvor meget plads der er tilbage i hvert felt. Alt kører i din browser, så intet af det, du skriver, uploades. Skær til, indtil begge felter ligger komfortabelt inden for YouTubes grænser, og kopier dem direkte ind i YouTube Studio.</p>`,
    },

    faq: {
      en: [
        { q: 'What is the YouTube title character limit?', a: '100 characters. But keep titles under ~70 characters so they aren’t truncated in search results, suggested videos, and on mobile — the counter above flags when you go over.' },
        { q: 'What is the YouTube description limit?', a: '5,000 characters, about 800 words. Only the first ~157 characters show before “…more,” so put your key info, keywords, and links at the very top.' },
        { q: 'Do emoji and hashtags count toward the limit?', a: 'Yes. Emoji, hashtags, links, and non-Latin characters all count toward YouTube’s character limits. This counter counts them exactly as YouTube does.' },
        { q: 'Is my title or description uploaded anywhere?', a: 'No. Counting happens entirely in your browser — nothing you type is sent to a server, so unpublished video copy stays private.' },
      ],
      es: [
        { q: '¿Cuál es el límite de caracteres del título de YouTube?', a: '100 caracteres. Pero mantén los títulos por debajo de ~70 caracteres para que no se corten en los resultados de búsqueda, los vídeos sugeridos y el móvil; el contador de arriba avisa cuando te pasas.' },
        { q: '¿Cuál es el límite de la descripción de YouTube?', a: '5000 caracteres, unas 800 palabras. Solo los primeros ~157 caracteres se ven antes del «…más», así que pon la información clave, las palabras clave y los enlaces al principio.' },
        { q: '¿Los emojis y los hashtags cuentan para el límite?', a: 'Sí. Los emojis, los hashtags, los enlaces y los caracteres no latinos cuentan para los límites de YouTube. Este contador los cuenta exactamente como lo hace YouTube.' },
        { q: '¿Se sube mi título o descripción a algún sitio?', a: 'No. El conteo ocurre por completo en tu navegador: nada de lo que escribes se envía a un servidor, así que el texto del vídeo sin publicar es privado.' },
      ],
      de: [
        { q: 'Wie viele Zeichen darf ein YouTube-Titel haben?', a: '100 Zeichen. Halte Titel aber unter ~70 Zeichen, damit sie in Suchergebnissen, vorgeschlagenen Videos und auf dem Handy nicht abgeschnitten werden – der Zähler oben warnt bei Überschreitung.' },
        { q: 'Wie lang darf die YouTube-Beschreibung sein?', a: '5.000 Zeichen, etwa 800 Wörter. Nur die ersten ~157 Zeichen erscheinen vor „…mehr“, setze also Kerninfos, Keywords und Links ganz nach oben.' },
        { q: 'Zählen Emojis und Hashtags zum Limit?', a: 'Ja. Emojis, Hashtags, Links und nicht-lateinische Zeichen zählen alle zu den YouTube-Limits. Dieser Zähler zählt sie genau wie YouTube.' },
        { q: 'Wird mein Titel oder meine Beschreibung irgendwo hochgeladen?', a: 'Nein. Das Zählen erfolgt vollständig in deinem Browser – nichts, was du tippst, wird an einen Server gesendet, unveröffentlichte Videotexte bleiben privat.' },
      ],
      fr: [
        { q: 'Quelle est la limite de caractères du titre YouTube ?', a: '100 caractères. Mais gardez les titres sous ~70 caractères pour qu’ils ne soient pas coupés dans les résultats, les vidéos suggérées et sur mobile — le compteur ci-dessus signale les dépassements.' },
        { q: 'Quelle est la limite de la description YouTube ?', a: '5 000 caractères, environ 800 mots. Seuls les ~157 premiers caractères s’affichent avant « …plus », alors placez les infos clés, mots-clés et liens tout en haut.' },
        { q: 'Les emojis et les hashtags comptent-ils dans la limite ?', a: 'Oui. Les emojis, hashtags, liens et caractères non latins comptent tous dans les limites de YouTube. Ce compteur les compte exactement comme YouTube.' },
        { q: 'Mon titre ou ma description est-il envoyé quelque part ?', a: 'Non. Le comptage se fait entièrement dans votre navigateur — rien de ce que vous tapez n’est envoyé à un serveur, vos textes de vidéo non publiés restent privés.' },
      ],
      pt: [
        { q: 'Qual é o limite de caracteres do título do YouTube?', a: '100 caracteres. Mas mantenha os títulos abaixo de ~70 caracteres para não serem cortados nos resultados, vídeos sugeridos e no telemóvel — o contador acima assinala quando ultrapassa.' },
        { q: 'Qual é o limite da descrição do YouTube?', a: '5000 caracteres, cerca de 800 palavras. Apenas os primeiros ~157 caracteres aparecem antes do «…mais», por isso coloque a informação principal, palavras-chave e ligações logo no início.' },
        { q: 'Os emojis e hashtags contam para o limite?', a: 'Sim. Emojis, hashtags, ligações e caracteres não latinos contam para os limites do YouTube. Este contador conta-os exatamente como o YouTube.' },
        { q: 'O meu título ou descrição é enviado para algum lado?', a: 'Não. A contagem acontece inteiramente no seu navegador — nada do que escreve é enviado para um servidor, por isso o texto do vídeo não publicado permanece privado.' },
      ],
      it: [
        { q: 'Qual è il limite di caratteri del titolo YouTube?', a: '100 caratteri. Ma tieni i titoli sotto i ~70 caratteri perché non vengano tagliati nei risultati, nei video suggeriti e su mobile — il contatore sopra segnala quando superi.' },
        { q: 'Qual è il limite della descrizione YouTube?', a: '5.000 caratteri, circa 800 parole. Solo i primi ~157 caratteri compaiono prima di «…altro», quindi metti informazioni chiave, parole chiave e link in cima.' },
        { q: 'Emoji e hashtag contano nel limite?', a: 'Sì. Emoji, hashtag, link e caratteri non latini contano tutti nei limiti di YouTube. Questo contatore li conta esattamente come fa YouTube.' },
        { q: 'Il mio titolo o descrizione viene caricato da qualche parte?', a: 'No. Il conteggio avviene interamente nel tuo browser — nulla di ciò che scrivi viene inviato a un server, quindi i testi dei video non pubblicati restano privati.' },
      ],
      nl: [
        { q: 'Wat is de tekenlimiet voor een YouTube-titel?', a: '100 tekens. Houd titels echter onder ~70 tekens zodat ze niet worden afgekapt in resultaten, voorgestelde video’s en op mobiel — de teller hierboven waarschuwt als je eroverheen gaat.' },
        { q: 'Wat is de limiet van de YouTube-beschrijving?', a: '5.000 tekens, ongeveer 800 woorden. Alleen de eerste ~157 tekens zijn zichtbaar vóór “…meer”, dus zet kerninfo, trefwoorden en links helemaal bovenaan.' },
        { q: 'Tellen emoji en hashtags mee voor de limiet?', a: 'Ja. Emoji, hashtags, links en niet-Latijnse tekens tellen allemaal mee voor de YouTube-limieten. Deze teller telt ze precies zoals YouTube dat doet.' },
        { q: 'Wordt mijn titel of beschrijving ergens geüpload?', a: 'Nee. Het tellen gebeurt volledig in je browser — niets van wat je typt wordt naar een server gestuurd, dus ongepubliceerde videoteksten blijven privé.' },
      ],
      ja: [
        { q: 'YouTube のタイトルの文字数上限は？', a: '100文字です。ただし検索結果・関連動画・モバイルで切れないよう、約70文字未満に抑えましょう。上のカウンターが超過を知らせます。' },
        { q: 'YouTube の説明の上限は？', a: '5,000文字、約800語です。最初の約157文字だけが「…もっと見る」の前に表示されるため、重要な情報・キーワード・リンクは一番上に置きましょう。' },
        { q: '絵文字やハッシュタグは上限に数えられますか？', a: 'はい。絵文字・ハッシュタグ・リンク・非ラテン文字はすべて YouTube の上限に数えられます。本カウンターは YouTube と同じように数えます。' },
        { q: 'タイトルや説明はどこかにアップロードされますか？', a: 'いいえ。カウントはすべてブラウザー内で行われ、入力内容はサーバーに送信されません。未公開の動画テキストも非公開のままです。' },
      ],
      zh: [
        { q: 'YouTube 标题的字符上限是多少？', a: '100 个字符。但建议标题保持在约 70 个字符以内，以免在搜索结果、推荐视频和移动端被截断——上方的计数器会在超限时提示。' },
        { q: 'YouTube 说明的上限是多少？', a: '5,000 个字符，约 800 词。只有前约 157 个字符会显示在“…更多”之前，所以请把关键信息、关键词和链接放在最前面。' },
        { q: '表情符号和话题标签计入上限吗？', a: '计入。表情符号、话题标签、链接和非拉丁字符都计入 YouTube 的字符上限。本计数器与 YouTube 的计法完全一致。' },
        { q: '我的标题或说明会被上传吗？', a: '不会。统计完全在你的浏览器中进行——你输入的内容不会发送到服务器，因此未发布的视频文案保持私密。' },
      ],
      da: [
        { q: 'Hvad er tegngrænsen for en YouTube-titel?', a: '100 tegn. Men hold titler under ~70 tegn, så de ikke afkortes i resultater, foreslåede videoer og på mobil — tælleren ovenfor markerer, når du går over.' },
        { q: 'Hvad er grænsen for YouTube-beskrivelsen?', a: '5.000 tegn, cirka 800 ord. Kun de første ~157 tegn vises før “…mere”, så placer nøgleinfo, nøgleord og links helt øverst.' },
        { q: 'Tæller emojis og hashtags med i grænsen?', a: 'Ja. Emojis, hashtags, links og ikke-latinske tegn tæller alle med i YouTubes grænser. Denne tæller tæller dem præcis som YouTube.' },
        { q: 'Bliver min titel eller beskrivelse uploadet nogen steder?', a: 'Nej. Optællingen sker helt i din browser — intet af det, du skriver, sendes til en server, så uudgivet videotekst forbliver privat.' },
      ],
    },
  },
  {
    id: 'tiktok',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'TikTok caption 2,200 chars; bio 80 chars',

    slugs: {
      en: 'tiktok-character-counter',
      es: 'contador-caracteres-tiktok',
      de: 'tiktok-zeichenzaehler',
      fr: 'compteur-caracteres-tiktok',
      pt: 'contador-caracteres-tiktok',
      it: 'contatore-caratteri-tiktok',
      nl: 'tiktok-tekenteller',
      ja: 'tiktok-moji-kaunta',
      zh: 'tiktok-zi-fu-ji-shu',
      da: 'tiktok-tegntaeller',
    },

    schemaName: {
      en: 'TikTok Character Counter',
      es: 'Contador de Caracteres de TikTok',
      de: 'TikTok Zeichenzähler',
      fr: 'Compteur de Caractères TikTok',
      pt: 'Contador de Caracteres do TikTok',
      it: 'Contatore di Caratteri TikTok',
      nl: 'TikTok Tekenteller',
      ja: 'TikTok 文字数カウンター',
      zh: 'TikTok 字符计数器',
      da: 'TikTok Tegntæller',
    },

    titles: {
      en: 'TikTok Character Counter — Caption & Bio Limit Checker',
      es: 'Contador de Caracteres de TikTok — Límites de descripción y biografía',
      de: 'TikTok Zeichenzähler — Beschreibungs- & Bio-Limit prüfen',
      fr: 'Compteur de Caractères TikTok — Limites de légende et bio',
      pt: 'Contador de Caracteres do TikTok — Limites de legenda e biografia',
      it: 'Contatore di Caratteri TikTok — Limiti di didascalia e bio',
      nl: 'TikTok Tekenteller — Bijschrift- & biolimiet checken',
      ja: 'TikTok 文字数カウンター — キャプション・自己紹介の上限チェック',
      zh: 'TikTok 字符计数器 — 文案与简介字数检查',
      da: 'TikTok Tegntæller — Tjek beskrivelses- & biogrænse',
    },

    metaDescriptions: {
      en: 'Free TikTok character counter. Check your video caption against the 2,200-character limit and bio against 80 characters, live as you type.',
      es: 'Contador de caracteres de TikTok gratuito. Comprueba la descripción de tu vídeo frente al límite de 2200 caracteres y la biografía frente a 80, en vivo.',
      de: 'Kostenloser TikTok-Zeichenzähler. Prüfe deine Videobeschreibung gegen das 2.200-Zeichen-Limit und die Bio gegen 80 Zeichen – live beim Tippen.',
      fr: 'Compteur de caractères TikTok gratuit. Vérifiez la légende de votre vidéo (limite de 2 200 caractères) et la bio (80 caractères) en direct.',
      pt: 'Contador de caracteres do TikTok gratuito. Verifique a legenda do vídeo face ao limite de 2200 caracteres e a biografia face a 80, ao vivo.',
      it: 'Contatore di caratteri TikTok gratuito. Controlla la didascalia del video sul limite di 2.200 caratteri e la bio su 80, in tempo reale.',
      nl: 'Gratis TikTok-tekenteller. Controleer je videobijschrift tegen de limiet van 2.200 tekens en je bio tegen 80 tekens, live tijdens het typen.',
      ja: '無料の TikTok 文字数カウンター。動画キャプションを2,200文字、自己紹介を80文字の上限に対してリアルタイムでチェックできます。',
      zh: '免费的 TikTok 字符计数器。在你输入时实时检查视频文案是否在 2,200 字符以内、简介是否在 80 字符以内。',
      da: 'Gratis TikTok-tegntæller. Tjek din videobeskrivelse mod grænsen på 2.200 tegn og bioen mod 80 tegn, live mens du skriver.',
    },

    intro: {
      en: 'Check your TikTok caption and bio against TikTok’s real character limits before you post. Type below — the counters update live and flag anything over the limit.',
      es: 'Comprueba la descripción y la biografía de TikTok frente a los límites reales antes de publicar. Escribe abajo: los contadores se actualizan en vivo y avisan si te pasas.',
      de: 'Prüfe Beschreibung und Bio deines TikToks vor dem Posten gegen die echten Limits. Tippe unten – die Zähler aktualisieren sich live und markieren Überschreitungen.',
      fr: 'Vérifiez la légende et la bio de votre TikTok selon les vraies limites avant de publier. Saisissez ci-dessous : les compteurs se mettent à jour en direct et signalent tout dépassement.',
      pt: 'Verifique a legenda e a biografia do TikTok face aos limites reais antes de publicar. Escreva abaixo: os contadores atualizam-se ao vivo e assinalam excessos.',
      it: 'Controlla didascalia e bio del tuo TikTok sui limiti reali prima di pubblicare. Scrivi qui sotto: i contatori si aggiornano in tempo reale e segnalano gli eccessi.',
      nl: 'Controleer je TikTok-bijschrift en -bio tegen de echte limieten voordat je plaatst. Typ hieronder — de tellers werken live bij en markeren alles boven de limiet.',
      ja: '投稿前に、TikTok の実際の上限に対してキャプションと自己紹介をチェックしましょう。下に入力すると、カウンターがリアルタイムで更新され、超過を知らせます。',
      zh: '发布前，用 TikTok 的真实上限检查你的文案和简介。在下方输入——计数器会实时更新并标记任何超限内容。',
      da: 'Tjek din TikTok-beskrivelse og -bio mod de reelle grænser, før du poster. Skriv nedenfor — tællerne opdateres live og markerer alt over grænsen.',
    },

    content: {
      en: `<h2>TikTok character limits</h2>
<p>TikTok allows up to <strong>2,200 characters</strong> in a video caption and just <strong>80 characters</strong> in your profile bio. Hashtags, @mentions, and emoji all count toward the caption limit, and because hashtags are essential for reach, every character matters. This tool counts your caption and bio live so you can fit your hook, hashtags, and call to action without getting cut off.</p>
<h2>Writing a caption that performs</h2>
<p>Even with 2,200 characters, the feed shows only the first line or two before “…more.” Lead with a hook or question, then add context and hashtags below. Place your most important words and a few targeted hashtags early. Captions that invite a comment — a question or a bold claim — tend to earn the replies that boost a video in the algorithm.</p>
<h2>Making the most of an 80-character bio</h2>
<p>The bio is tiny, so every character has to work. Say what you do and who it’s for, add one clear call to action or link cue, and use line breaks or a single emoji to add structure. Because 80 characters fills up fast — especially with emoji, which count too — the live counter helps you trim to the essentials.</p>
<h2>Private and instant</h2>
<p>Type or paste your caption and bio to see exactly how many characters each uses and how much room is left. Everything runs in your browser, so nothing you type is uploaded. Adjust until both sit within TikTok’s limits, then copy them across.</p>`,
      es: `<h2>Límites de caracteres de TikTok</h2>
<p>TikTok permite hasta <strong>2200 caracteres</strong> en la descripción de un vídeo y solo <strong>80 caracteres</strong> en la biografía del perfil. Los hashtags, las @menciones y los emojis cuentan para el límite de la descripción y, como los hashtags son esenciales para el alcance, cada carácter importa. Esta herramienta cuenta tu descripción y tu biografía en vivo para que quepan tu gancho, tus hashtags y tu llamada a la acción sin cortes.</p>
<h2>Escribir una descripción que funcione</h2>
<p>Aunque dispones de 2200 caracteres, el feed solo muestra la primera línea o dos antes del «…más». Empieza con un gancho o una pregunta y añade contexto y hashtags debajo. Coloca tus palabras más importantes y algunos hashtags específicos al principio. Las descripciones que invitan a comentar —una pregunta o una afirmación atrevida— suelen ganar las respuestas que impulsan un vídeo en el algoritmo.</p>
<h2>Aprovechar al máximo 80 caracteres de biografía</h2>
<p>La biografía es diminuta, así que cada carácter tiene que trabajar. Di qué haces y para quién, añade una llamada a la acción clara o una pista de enlace, y usa saltos de línea o un solo emoji para dar estructura. Como 80 caracteres se llenan rápido —sobre todo con emojis, que también cuentan—, el contador en vivo te ayuda a reducir a lo esencial.</p>
<h2>Privado e instantáneo</h2>
<p>Escribe o pega tu descripción y tu biografía para ver exactamente cuántos caracteres usa cada una y cuánto espacio queda. Todo funciona en tu navegador, así que nada de lo que escribas se sube. Ajusta hasta que ambas queden dentro de los límites de TikTok y cópialas.</p>`,
      de: `<h2>TikTok-Zeichenlimits</h2>
<p>TikTok erlaubt bis zu <strong>2.200 Zeichen</strong> in einer Videobeschreibung und nur <strong>80 Zeichen</strong> in der Profil-Bio. Hashtags, @Erwähnungen und Emojis zählen alle zum Beschreibungslimit, und da Hashtags für die Reichweite entscheidend sind, zählt jedes Zeichen. Dieses Tool zählt Beschreibung und Bio live, damit Hook, Hashtags und Call-to-Action ohne Abschneiden passen.</p>
<h2>Eine Beschreibung schreiben, die performt</h2>
<p>Trotz 2.200 Zeichen zeigt der Feed nur die erste Zeile oder zwei vor „…mehr“. Beginne mit einem Hook oder einer Frage und ergänze Kontext und Hashtags darunter. Platziere deine wichtigsten Wörter und ein paar gezielte Hashtags früh. Beschreibungen, die zum Kommentieren einladen – eine Frage oder eine kühne Aussage – erhalten eher die Antworten, die ein Video im Algorithmus pushen.</p>
<h2>80 Zeichen Bio optimal nutzen</h2>
<p>Die Bio ist winzig, also muss jedes Zeichen arbeiten. Sag, was du tust und für wen, füge einen klaren Call-to-Action oder Link-Hinweis hinzu und nutze Zeilenumbrüche oder ein einzelnes Emoji für Struktur. Da 80 Zeichen schnell voll sind – besonders mit Emojis, die ebenfalls zählen –, hilft der Live-Zähler beim Kürzen aufs Wesentliche.</p>
<h2>Privat und sofort</h2>
<p>Tippe oder füge Beschreibung und Bio ein, um genau zu sehen, wie viele Zeichen jede nutzt und wie viel Platz bleibt. Alles läuft in deinem Browser, also wird nichts hochgeladen. Passe an, bis beide in TikToks Limits passen, und kopiere sie hinüber.</p>`,
      fr: `<h2>Limites de caractères TikTok</h2>
<p>TikTok autorise jusqu’à <strong>2 200 caractères</strong> dans la légende d’une vidéo et seulement <strong>80 caractères</strong> dans la bio du profil. Les hashtags, les @mentions et les emojis comptent tous dans la limite de légende, et comme les hashtags sont essentiels à la portée, chaque caractère compte. Cet outil compte votre légende et votre bio en direct pour faire tenir votre accroche, vos hashtags et votre appel à l’action sans coupure.</p>
<h2>Écrire une légende performante</h2>
<p>Même avec 2 200 caractères, le fil n’affiche que la première ligne ou deux avant « …plus ». Commencez par une accroche ou une question, puis ajoutez le contexte et les hashtags en dessous. Placez vos mots les plus importants et quelques hashtags ciblés tôt. Les légendes qui invitent à commenter — une question ou une affirmation audacieuse — obtiennent davantage les réponses qui propulsent une vidéo dans l’algorithme.</p>
<h2>Tirer parti d’une bio de 80 caractères</h2>
<p>La bio est minuscule, donc chaque caractère doit travailler. Dites ce que vous faites et pour qui, ajoutez un appel à l’action clair ou un indice de lien, et utilisez des sauts de ligne ou un seul emoji pour structurer. Comme 80 caractères se remplissent vite — surtout avec les emojis, qui comptent aussi —, le compteur en direct vous aide à réduire à l’essentiel.</p>
<h2>Privé et instantané</h2>
<p>Tapez ou collez votre légende et votre bio pour voir exactement combien de caractères chacune utilise et l’espace restant. Tout fonctionne dans votre navigateur : rien de ce que vous tapez n’est envoyé. Ajustez jusqu’à ce que les deux tiennent dans les limites de TikTok, puis copiez-les.</p>`,
      pt: `<h2>Limites de caracteres do TikTok</h2>
<p>O TikTok permite até <strong>2200 caracteres</strong> na legenda de um vídeo e apenas <strong>80 caracteres</strong> na biografia do perfil. Os hashtags, as @menções e os emojis contam todos para o limite da legenda e, como os hashtags são essenciais para o alcance, cada caractere importa. Esta ferramenta conta a sua legenda e a sua biografia ao vivo para que caibam o gancho, os hashtags e a chamada à ação sem cortes.</p>
<h2>Escrever uma legenda que funciona</h2>
<p>Mesmo com 2200 caracteres, o feed mostra apenas a primeira linha ou duas antes do «…mais». Comece com um gancho ou uma pergunta e acrescente contexto e hashtags abaixo. Coloque as suas palavras mais importantes e alguns hashtags específicos no início. As legendas que convidam a comentar — uma pergunta ou uma afirmação ousada — tendem a ganhar as respostas que impulsionam um vídeo no algoritmo.</p>
<h2>Aproveitar ao máximo 80 caracteres de biografia</h2>
<p>A biografia é minúscula, por isso cada caractere tem de trabalhar. Diga o que faz e para quem, acrescente uma chamada à ação clara ou uma indicação de ligação, e use quebras de linha ou um único emoji para dar estrutura. Como 80 caracteres se enchem depressa — sobretudo com emojis, que também contam —, o contador ao vivo ajuda-o a cortar para o essencial.</p>
<h2>Privado e instantâneo</h2>
<p>Escreva ou cole a sua legenda e biografia para ver exatamente quantos caracteres cada uma usa e quanto espaço resta. Tudo corre no seu navegador, por isso nada do que escrever é enviado. Ajuste até ambas ficarem dentro dos limites do TikTok e copie-as.</p>`,
      it: `<h2>Limiti di caratteri di TikTok</h2>
<p>TikTok consente fino a <strong>2.200 caratteri</strong> nella didascalia di un video e solo <strong>80 caratteri</strong> nella bio del profilo. Hashtag, @menzioni ed emoji contano tutti nel limite della didascalia e, poiché gli hashtag sono essenziali per la portata, ogni carattere conta. Questo strumento conta didascalia e bio in tempo reale così da far stare gancio, hashtag e call to action senza tagli.</p>
<h2>Scrivere una didascalia che funziona</h2>
<p>Anche con 2.200 caratteri, il feed mostra solo la prima riga o due prima di «…altro». Inizia con un gancio o una domanda, poi aggiungi contesto e hashtag sotto. Metti le parole più importanti e qualche hashtag mirato all’inizio. Le didascalie che invitano a commentare — una domanda o un’affermazione audace — tendono a ottenere le risposte che spingono un video nell’algoritmo.</p>
<h2>Sfruttare al meglio 80 caratteri di bio</h2>
<p>La bio è minuscola, quindi ogni carattere deve lavorare. Di’ cosa fai e per chi, aggiungi una call to action chiara o un indizio di link e usa interruzioni di riga o una sola emoji per dare struttura. Poiché 80 caratteri si riempiono in fretta — soprattutto con le emoji, che contano anch’esse — il contatore in tempo reale ti aiuta a ridurre all’essenziale.</p>
<h2>Privato e istantaneo</h2>
<p>Scrivi o incolla didascalia e bio per vedere esattamente quanti caratteri usa ciascuna e quanto spazio resta. Tutto avviene nel tuo browser, quindi nulla di ciò che scrivi viene caricato. Regola finché entrambe rientrano nei limiti di TikTok, poi copiale.</p>`,
      nl: `<h2>TikTok-tekenlimieten</h2>
<p>TikTok staat tot <strong>2.200 tekens</strong> toe in een videobijschrift en slechts <strong>80 tekens</strong> in je profielbio. Hashtags, @vermeldingen en emoji tellen allemaal mee voor de bijschriftlimiet, en omdat hashtags essentieel zijn voor bereik, telt elk teken. Deze tool telt je bijschrift en bio live, zodat je hook, hashtags en call to action passen zonder afgekapt te worden.</p>
<h2>Een bijschrift schrijven dat presteert</h2>
<p>Zelfs met 2.200 tekens toont de feed maar de eerste regel of twee vóór “…meer”. Begin met een hook of een vraag en voeg context en hashtags daaronder toe. Zet je belangrijkste woorden en een paar gerichte hashtags vooraan. Bijschriften die uitnodigen tot reageren — een vraag of een gedurfde stelling — krijgen vaker de reacties die een video in het algoritme stuwen.</p>
<h2>Haal alles uit 80 tekens bio</h2>
<p>De bio is piepklein, dus elk teken moet werken. Zeg wat je doet en voor wie, voeg één duidelijke call to action of linkhint toe en gebruik regeleinden of één emoji voor structuur. Omdat 80 tekens snel vol zitten — zeker met emoji, die ook meetellen — helpt de live teller je terug te brengen tot de essentie.</p>
<h2>Privé en direct</h2>
<p>Typ of plak je bijschrift en bio om precies te zien hoeveel tekens elk gebruikt en hoeveel ruimte er over is. Alles draait in je browser, dus niets van wat je typt wordt geüpload. Pas aan tot beide binnen TikToks limieten passen en kopieer ze.</p>`,
      ja: `<h2>TikTok の文字数制限</h2>
<p>TikTok は動画の<strong>キャプションに最大2,200文字</strong>、プロフィールの<strong>自己紹介に80文字</strong>まで使えます。ハッシュタグ・@メンション・絵文字はすべてキャプションの上限に数えられ、ハッシュタグはリーチに不可欠なので一文字一文字が重要です。本ツールはキャプションと自己紹介をリアルタイムで数え、フック・ハッシュタグ・行動喚起が切れずに収まるようにします。</p>
<h2>成果の出るキャプションの書き方</h2>
<p>2,200文字使えても、フィードでは「…もっと見る」の前に最初の1〜2行しか表示されません。フックや質問で始め、その下に文脈とハッシュタグを加えましょう。最も重要な言葉と狙ったハッシュタグを前に置きます。コメントを誘うキャプション（質問や大胆な主張）は、動画をアルゴリズムで押し上げる返信を得やすくなります。</p>
<h2>80文字の自己紹介を活かす</h2>
<p>自己紹介はごく短いので、一文字も無駄にできません。何をする人で誰のためかを述べ、明確な行動喚起やリンクの手がかりを加え、改行や絵文字1つで構造を作りましょう。絵文字も数えられるため80文字はすぐ埋まります。ライブカウンターが要点への絞り込みを助けます。</p>
<h2>プライベートで即時</h2>
<p>キャプションと自己紹介を入力または貼り付けると、それぞれの使用文字数と残り容量が正確にわかります。すべてブラウザー内で動作するため、入力内容はアップロードされません。両方が TikTok の上限内に収まるよう調整してコピーしましょう。</p>`,
      zh: `<h2>TikTok 字符限制</h2>
<p>TikTok 视频<strong>文案最多 2,200 个字符</strong>，个人资料<strong>简介仅 80 个字符</strong>。话题标签、@提及和表情符号都计入文案上限，而话题标签对触达至关重要，因此每个字符都很关键。本工具实时统计你的文案和简介，让钩子、标签和行动号召都能完整放下而不被截断。</p>
<h2>写出有效的文案</h2>
<p>即使有 2,200 个字符，信息流在“…更多”之前也只显示一两行。先用钩子或提问开头，再在下方补充背景和标签。把最重要的词和几个精准标签放在前面。邀请评论的文案——一个问题或大胆的论断——往往能获得把视频推上算法的回复。</p>
<h2>用好 80 字符的简介</h2>
<p>简介非常短，所以每个字符都要发挥作用。说明你做什么、面向谁，加入一个清晰的行动号召或链接提示，并用换行或一个表情来制造结构。由于 80 个字符很快用完——尤其加上同样计数的表情——实时计数器能帮你精简到要点。</p>
<h2>私密且即时</h2>
<p>输入或粘贴你的文案和简介，即可准确看到各自使用了多少字符、还剩多少空间。一切都在你的浏览器中运行，因此你输入的内容不会被上传。调整到两者都在 TikTok 限制内，然后复制过去。</p>`,
      da: `<h2>TikTok-tegngrænser</h2>
<p>TikTok tillader op til <strong>2.200 tegn</strong> i en videobeskrivelse og kun <strong>80 tegn</strong> i profilens bio. Hashtags, @omtaler og emojis tæller alle med i beskrivelsesgrænsen, og da hashtags er afgørende for rækkevidde, tæller hvert tegn. Dette værktøj tæller din beskrivelse og bio live, så krog, hashtags og call to action kan være der uden at blive afkortet.</p>
<h2>Skriv en beskrivelse, der virker</h2>
<p>Selv med 2.200 tegn viser feedet kun den første linje eller to før “…mere”. Start med en krog eller et spørgsmål, og tilføj kontekst og hashtags nedenunder. Placer dine vigtigste ord og et par målrettede hashtags tidligt. Beskrivelser, der inviterer til en kommentar — et spørgsmål eller en dristig påstand — får oftere de svar, der skubber en video op i algoritmen.</p>
<h2>Få mest muligt ud af 80 tegns bio</h2>
<p>Bioen er lillebitte, så hvert tegn skal arbejde. Sig, hvad du laver og for hvem, tilføj én klar call to action eller et link-hint, og brug linjeskift eller en enkelt emoji til struktur. Da 80 tegn fyldes hurtigt — især med emojis, der også tæller — hjælper live-tælleren dig med at skære ind til det væsentlige.</p>
<h2>Privat og øjeblikkeligt</h2>
<p>Skriv eller indsæt din beskrivelse og bio for at se præcis, hvor mange tegn hver bruger, og hvor meget plads der er tilbage. Alt kører i din browser, så intet af det, du skriver, uploades. Justér, indtil begge ligger inden for TikToks grænser, og kopier dem.</p>`,
    },

    faq: {
      en: [
        { q: 'What is the TikTok caption character limit?', a: '2,200 characters, including hashtags, @mentions, and emoji. Only the first line or two show before “…more,” so put your hook first.' },
        { q: 'What is the TikTok bio character limit?', a: '80 characters. It’s short, so lead with what you do and one call to action; emoji count toward the 80.' },
        { q: 'Do hashtags and emoji count in the caption?', a: 'Yes. Hashtags, @mentions, links, and emoji all count toward the 2,200-character caption limit. This counter counts them exactly as TikTok does.' },
        { q: 'Is my caption uploaded anywhere?', a: 'No. Counting runs entirely in your browser — nothing you type is sent to a server, so your drafts stay private.' },
      ],
      es: [
        { q: '¿Cuál es el límite de caracteres de la descripción de TikTok?', a: '2200 caracteres, incluidos hashtags, @menciones y emojis. Solo se ven la primera línea o dos antes del «…más», así que pon tu gancho primero.' },
        { q: '¿Cuál es el límite de caracteres de la biografía de TikTok?', a: '80 caracteres. Es corta, así que empieza con lo que haces y una llamada a la acción; los emojis cuentan para los 80.' },
        { q: '¿Los hashtags y emojis cuentan en la descripción?', a: 'Sí. Los hashtags, las @menciones, los enlaces y los emojis cuentan para el límite de 2200 caracteres. Este contador los cuenta exactamente como TikTok.' },
        { q: '¿Se sube mi descripción a algún sitio?', a: 'No. El conteo se realiza por completo en tu navegador: nada de lo que escribas se envía a un servidor, así que tus borradores son privados.' },
      ],
      de: [
        { q: 'Wie viele Zeichen darf eine TikTok-Beschreibung haben?', a: '2.200 Zeichen, inklusive Hashtags, @Erwähnungen und Emojis. Nur die erste Zeile oder zwei erscheinen vor „…mehr“, setze deinen Hook also nach vorn.' },
        { q: 'Wie viele Zeichen darf die TikTok-Bio haben?', a: '80 Zeichen. Sie ist kurz, beginne also mit dem, was du tust, und einem Call-to-Action; Emojis zählen zu den 80.' },
        { q: 'Zählen Hashtags und Emojis in der Beschreibung?', a: 'Ja. Hashtags, @Erwähnungen, Links und Emojis zählen alle zum 2.200-Zeichen-Limit. Dieser Zähler zählt sie genau wie TikTok.' },
        { q: 'Wird meine Beschreibung irgendwo hochgeladen?', a: 'Nein. Das Zählen läuft vollständig in deinem Browser – nichts, was du tippst, wird an einen Server gesendet, deine Entwürfe bleiben privat.' },
      ],
      fr: [
        { q: 'Quelle est la limite de caractères de la légende TikTok ?', a: '2 200 caractères, hashtags, @mentions et emojis compris. Seules la première ligne ou deux s’affichent avant « …plus », alors mettez votre accroche en premier.' },
        { q: 'Quelle est la limite de caractères de la bio TikTok ?', a: '80 caractères. Elle est courte : commencez par ce que vous faites et un appel à l’action ; les emojis comptent dans les 80.' },
        { q: 'Les hashtags et emojis comptent-ils dans la légende ?', a: 'Oui. Les hashtags, @mentions, liens et emojis comptent tous dans la limite de 2 200 caractères. Ce compteur les compte exactement comme TikTok.' },
        { q: 'Ma légende est-elle envoyée quelque part ?', a: 'Non. Le comptage se fait entièrement dans votre navigateur — rien de ce que vous tapez n’est envoyé à un serveur, vos brouillons restent privés.' },
      ],
      pt: [
        { q: 'Qual é o limite de caracteres da legenda do TikTok?', a: '2200 caracteres, incluindo hashtags, @menções e emojis. Apenas a primeira linha ou duas aparecem antes do «…mais», por isso ponha o gancho primeiro.' },
        { q: 'Qual é o limite de caracteres da biografia do TikTok?', a: '80 caracteres. É curta, por isso comece com o que faz e uma chamada à ação; os emojis contam para os 80.' },
        { q: 'Os hashtags e emojis contam na legenda?', a: 'Sim. Os hashtags, @menções, ligações e emojis contam todos para o limite de 2200 caracteres. Este contador conta-os exatamente como o TikTok.' },
        { q: 'A minha legenda é enviada para algum lado?', a: 'Não. A contagem é feita inteiramente no seu navegador — nada do que escrever é enviado para um servidor, por isso os seus rascunhos permanecem privados.' },
      ],
      it: [
        { q: 'Qual è il limite di caratteri della didascalia TikTok?', a: '2.200 caratteri, inclusi hashtag, @menzioni ed emoji. Solo la prima riga o due compaiono prima di «…altro», quindi metti il gancio per primo.' },
        { q: 'Qual è il limite di caratteri della bio TikTok?', a: '80 caratteri. È corta, quindi inizia con cosa fai e una call to action; le emoji contano nei 80.' },
        { q: 'Hashtag ed emoji contano nella didascalia?', a: 'Sì. Hashtag, @menzioni, link ed emoji contano tutti nel limite di 2.200 caratteri. Questo contatore li conta esattamente come TikTok.' },
        { q: 'La mia didascalia viene caricata da qualche parte?', a: 'No. Il conteggio avviene interamente nel tuo browser — nulla di ciò che scrivi viene inviato a un server, quindi le tue bozze restano private.' },
      ],
      nl: [
        { q: 'Wat is de tekenlimiet voor een TikTok-bijschrift?', a: '2.200 tekens, inclusief hashtags, @vermeldingen en emoji. Alleen de eerste regel of twee zijn zichtbaar vóór “…meer”, dus zet je hook vooraan.' },
        { q: 'Wat is de tekenlimiet voor de TikTok-bio?', a: '80 tekens. Hij is kort, dus begin met wat je doet en één call to action; emoji tellen mee voor de 80.' },
        { q: 'Tellen hashtags en emoji mee in het bijschrift?', a: 'Ja. Hashtags, @vermeldingen, links en emoji tellen allemaal mee voor de limiet van 2.200 tekens. Deze teller telt ze precies zoals TikTok dat doet.' },
        { q: 'Wordt mijn bijschrift ergens geüpload?', a: 'Nee. Het tellen gebeurt volledig in je browser — niets van wat je typt wordt naar een server gestuurd, dus je concepten blijven privé.' },
      ],
      ja: [
        { q: 'TikTok のキャプションの文字数上限は？', a: '2,200文字（ハッシュタグ・@メンション・絵文字を含む）。「…もっと見る」の前は最初の1〜2行だけ表示されるので、フックを先頭に。' },
        { q: 'TikTok の自己紹介の文字数上限は？', a: '80文字です。短いので、何をするかと行動喚起から始めましょう。絵文字も80に数えられます。' },
        { q: 'ハッシュタグや絵文字はキャプションに数えられますか？', a: 'はい。ハッシュタグ・@メンション・リンク・絵文字はすべて2,200文字の上限に数えられます。本カウンターは TikTok と同じように数えます。' },
        { q: 'キャプションはどこかにアップロードされますか？', a: 'いいえ。カウントはすべてブラウザー内で行われ、入力内容はサーバーに送信されません。下書きは非公開のままです。' },
      ],
      zh: [
        { q: 'TikTok 文案的字符上限是多少？', a: '2,200 个字符，包含话题标签、@提及和表情符号。“…更多”之前只显示一两行，所以把钩子放在最前面。' },
        { q: 'TikTok 简介的字符上限是多少？', a: '80 个字符。它很短，所以先写你做什么和一个行动号召；表情符号计入这 80 个。' },
        { q: '话题标签和表情计入文案吗？', a: '计入。话题标签、@提及、链接和表情都计入 2,200 字符的文案上限。本计数器与 TikTok 的计法完全一致。' },
        { q: '我的文案会被上传吗？', a: '不会。统计完全在你的浏览器中进行——你输入的内容不会发送到服务器，因此草稿保持私密。' },
      ],
      da: [
        { q: 'Hvad er tegngrænsen for en TikTok-beskrivelse?', a: '2.200 tegn, inklusive hashtags, @omtaler og emojis. Kun den første linje eller to vises før “…mere”, så sæt din krog først.' },
        { q: 'Hvad er tegngrænsen for TikTok-bioen?', a: '80 tegn. Den er kort, så start med, hvad du laver, og én call to action; emojis tæller med i de 80.' },
        { q: 'Tæller hashtags og emojis med i beskrivelsen?', a: 'Ja. Hashtags, @omtaler, links og emojis tæller alle med i grænsen på 2.200 tegn. Denne tæller tæller dem præcis som TikTok.' },
        { q: 'Bliver min beskrivelse uploadet nogen steder?', a: 'Nej. Optællingen kører helt i din browser — intet af det, du skriver, sendes til en server, så dine udkast forbliver private.' },
      ],
    },
  },
  {
    id: 'pinterest',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'Pinterest Pin title 100 chars; Pin description 500 chars',

    slugs: {
      en: 'pinterest-character-counter',
      es: 'contador-caracteres-pinterest',
      de: 'pinterest-zeichenzaehler',
      fr: 'compteur-caracteres-pinterest',
      pt: 'contador-caracteres-pinterest',
      it: 'contatore-caratteri-pinterest',
      nl: 'pinterest-tekenteller',
      ja: 'pinterest-moji-kaunta',
      zh: 'pinterest-zi-fu-ji-shu',
      da: 'pinterest-tegntaeller',
    },

    schemaName: {
      en: 'Pinterest Character Counter',
      es: 'Contador de Caracteres de Pinterest',
      de: 'Pinterest Zeichenzähler',
      fr: 'Compteur de Caractères Pinterest',
      pt: 'Contador de Caracteres do Pinterest',
      it: 'Contatore di Caratteri Pinterest',
      nl: 'Pinterest Tekenteller',
      ja: 'Pinterest 文字数カウンター',
      zh: 'Pinterest 字符计数器',
      da: 'Pinterest Tegntæller',
    },

    titles: {
      en: 'Pinterest Character Counter — Pin Title & Description Limits',
      es: 'Contador de Caracteres de Pinterest — Límites de título y descripción del Pin',
      de: 'Pinterest Zeichenzähler — Pin-Titel- & Beschreibungslimit',
      fr: 'Compteur de Caractères Pinterest — Limites de titre et description d’épingle',
      pt: 'Contador de Caracteres do Pinterest — Limites de título e descrição do Pin',
      it: 'Contatore di Caratteri Pinterest — Limiti di titolo e descrizione del Pin',
      nl: 'Pinterest Tekenteller — Pin-titel- & beschrijvingslimiet',
      ja: 'Pinterest 文字数カウンター — ピンのタイトル・説明の上限',
      zh: 'Pinterest 字符计数器 — Pin 标题与说明上限',
      da: 'Pinterest Tegntæller — Pin-titel- & beskrivelsesgrænse',
    },

    metaDescriptions: {
      en: 'Free Pinterest character counter. Check your Pin title against the 100-character limit and description against 500 characters, live as you type.',
      es: 'Contador de caracteres de Pinterest gratuito. Comprueba el título de tu Pin frente al límite de 100 caracteres y la descripción frente a 500, en vivo.',
      de: 'Kostenloser Pinterest-Zeichenzähler. Prüfe deinen Pin-Titel gegen das 100-Zeichen-Limit und die Beschreibung gegen 500 Zeichen – live beim Tippen.',
      fr: 'Compteur de caractères Pinterest gratuit. Vérifiez le titre de votre épingle (limite de 100 caractères) et la description (500 caractères) en direct.',
      pt: 'Contador de caracteres do Pinterest gratuito. Verifique o título do Pin face ao limite de 100 caracteres e a descrição face a 500, ao vivo.',
      it: 'Contatore di caratteri Pinterest gratuito. Controlla il titolo del Pin sul limite di 100 caratteri e la descrizione su 500, in tempo reale.',
      nl: 'Gratis Pinterest-tekenteller. Controleer je Pin-titel tegen de limiet van 100 tekens en de beschrijving tegen 500 tekens, live tijdens het typen.',
      ja: '無料の Pinterest 文字数カウンター。ピンのタイトルを100文字、説明を500文字の上限に対してリアルタイムでチェックできます。',
      zh: '免费的 Pinterest 字符计数器。在你输入时实时检查 Pin 标题是否在 100 字符以内、说明是否在 500 字符以内。',
      da: 'Gratis Pinterest-tegntæller. Tjek din Pin-titel mod grænsen på 100 tegn og beskrivelsen mod 500 tegn, live mens du skriver.',
    },

    intro: {
      en: 'Check your Pinterest Pin title and description against Pinterest’s real character limits before you publish. Type below — the counters update live and flag anything over the limit.',
      es: 'Comprueba el título y la descripción de tu Pin de Pinterest frente a los límites reales antes de publicar. Escribe abajo: los contadores se actualizan en vivo y avisan si te pasas.',
      de: 'Prüfe Titel und Beschreibung deines Pinterest-Pins vor der Veröffentlichung gegen die echten Limits. Tippe unten – die Zähler aktualisieren sich live und markieren Überschreitungen.',
      fr: 'Vérifiez le titre et la description de votre épingle Pinterest selon les vraies limites avant de publier. Saisissez ci-dessous : les compteurs se mettent à jour en direct et signalent tout dépassement.',
      pt: 'Verifique o título e a descrição do seu Pin do Pinterest face aos limites reais antes de publicar. Escreva abaixo: os contadores atualizam-se ao vivo e assinalam excessos.',
      it: 'Controlla titolo e descrizione del tuo Pin di Pinterest sui limiti reali prima di pubblicare. Scrivi qui sotto: i contatori si aggiornano in tempo reale e segnalano gli eccessi.',
      nl: 'Controleer je Pinterest Pin-titel en -beschrijving tegen de echte limieten voordat je publiceert. Typ hieronder — de tellers werken live bij en markeren alles boven de limiet.',
      ja: '公開前に、Pinterest の実際の上限に対してピンのタイトルと説明をチェックしましょう。下に入力すると、カウンターがリアルタイムで更新され、超過を知らせます。',
      zh: '发布前，用 Pinterest 的真实上限检查你的 Pin 标题和说明。在下方输入——计数器会实时更新并标记任何超限内容。',
      da: 'Tjek din Pinterest Pin-titel og -beskrivelse mod de reelle grænser, før du udgiver. Skriv nedenfor — tællerne opdateres live og markerer alt over grænsen.',
    },

    content: {
      en: `<h2>Pinterest character limits</h2>
<p>Pinterest gives a Pin a <strong>title of up to 100 characters</strong> and a <strong>description of up to 500 characters</strong>. Only the first ~40 characters of the title and the first line or two of the description show in the feed, so lead with your keywords. This tool counts both fields live so your Pins stay searchable and never get cut off mid-thought.</p>
<h2>Write for Pinterest search</h2>
<p>Pinterest is a visual search engine, so descriptions are about discovery, not just captions. Put your primary keyword in the first 40–60 characters of the title and weave natural keywords plus a few relevant hashtags into the description. Describe what the Pin shows and why someone should click — that context helps Pinterest match your Pin to the right searches.</p>
<h2>Titles, descriptions, and boards</h2>
<p>Each Pinterest field has its own limit: Pin titles 100 characters, Pin descriptions 500, board titles around 50, and board descriptions 500. Your profile “about” line is much shorter at roughly 160 characters. Emoji and non-Latin scripts count as characters, so the live counter shows exactly how much room is left in each field.</p>
<h2>Private and instant</h2>
<p>Type or paste a Pin title and description to see character counts and remaining space at a glance. Everything runs in your browser, so nothing you type is uploaded. Trim until both fields sit within Pinterest’s limits, then copy them into the Pin builder.</p>`,
      es: `<h2>Límites de caracteres de Pinterest</h2>
<p>Pinterest permite un <strong>título de Pin de hasta 100 caracteres</strong> y una <strong>descripción de hasta 500 caracteres</strong>. Solo se ven los primeros ~40 caracteres del título y la primera línea o dos de la descripción en el feed, así que empieza por tus palabras clave. Esta herramienta cuenta ambos campos en vivo para que tus Pines sigan siendo buscables y no se corten a media idea.</p>
<h2>Escribe para la búsqueda de Pinterest</h2>
<p>Pinterest es un buscador visual, así que las descripciones sirven para el descubrimiento, no solo como pies de foto. Pon tu palabra clave principal en los primeros 40-60 caracteres del título e integra palabras clave naturales y algunos hashtags relevantes en la descripción. Describe qué muestra el Pin y por qué alguien debería hacer clic: ese contexto ayuda a Pinterest a mostrar tu Pin en las búsquedas adecuadas.</p>
<h2>Títulos, descripciones y tableros</h2>
<p>Cada campo de Pinterest tiene su propio límite: títulos de Pin 100 caracteres, descripciones de Pin 500, títulos de tablero unos 50 y descripciones de tablero 500. La línea «acerca de» de tu perfil es mucho más corta, unos 160 caracteres. Los emojis y los alfabetos no latinos cuentan como caracteres, así que el contador en vivo muestra exactamente cuánto espacio queda en cada campo.</p>
<h2>Privado e instantáneo</h2>
<p>Escribe o pega un título y una descripción de Pin para ver el número de caracteres y el espacio restante de un vistazo. Todo funciona en tu navegador, así que nada de lo que escribas se sube. Recorta hasta que ambos campos queden dentro de los límites de Pinterest y cópialos en el creador de Pines.</p>`,
      de: `<h2>Pinterest-Zeichenlimits</h2>
<p>Pinterest erlaubt einem Pin einen <strong>Titel von bis zu 100 Zeichen</strong> und eine <strong>Beschreibung von bis zu 500 Zeichen</strong>. Im Feed erscheinen nur die ersten ~40 Zeichen des Titels und die erste Zeile oder zwei der Beschreibung, also beginne mit deinen Keywords. Dieses Tool zählt beide Felder live, damit deine Pins auffindbar bleiben und nie mitten im Gedanken abgeschnitten werden.</p>
<h2>Schreibe für die Pinterest-Suche</h2>
<p>Pinterest ist eine visuelle Suchmaschine, daher dienen Beschreibungen der Entdeckung, nicht nur als Bildunterschrift. Setze dein Hauptkeyword in die ersten 40–60 Zeichen des Titels und arbeite natürliche Keywords plus ein paar relevante Hashtags in die Beschreibung ein. Beschreibe, was der Pin zeigt und warum man klicken sollte – dieser Kontext hilft Pinterest, deinen Pin den richtigen Suchen zuzuordnen.</p>
<h2>Titel, Beschreibungen und Pinnwände</h2>
<p>Jedes Pinterest-Feld hat sein eigenes Limit: Pin-Titel 100 Zeichen, Pin-Beschreibungen 500, Pinnwand-Titel rund 50 und Pinnwand-Beschreibungen 500. Die „Über mich“-Zeile deines Profils ist mit etwa 160 Zeichen viel kürzer. Emojis und nicht-lateinische Schriften zählen als Zeichen, der Live-Zähler zeigt also genau, wie viel Platz in jedem Feld bleibt.</p>
<h2>Privat und sofort</h2>
<p>Tippe oder füge einen Pin-Titel und eine Beschreibung ein, um Zeichenzahl und verbleibenden Platz auf einen Blick zu sehen. Alles läuft in deinem Browser, also wird nichts hochgeladen. Kürze, bis beide Felder in Pinterests Limits passen, und kopiere sie in den Pin-Builder.</p>`,
      fr: `<h2>Limites de caractères Pinterest</h2>
<p>Pinterest accorde à une épingle un <strong>titre allant jusqu’à 100 caractères</strong> et une <strong>description allant jusqu’à 500 caractères</strong>. Seuls les ~40 premiers caractères du titre et la première ligne ou deux de la description s’affichent dans le fil, alors commencez par vos mots-clés. Cet outil compte les deux champs en direct pour que vos épingles restent trouvables et ne soient jamais coupées en pleine idée.</p>
<h2>Écrivez pour la recherche Pinterest</h2>
<p>Pinterest est un moteur de recherche visuel : les descriptions servent à la découverte, pas seulement de légendes. Placez votre mot-clé principal dans les 40–60 premiers caractères du titre et intégrez des mots-clés naturels et quelques hashtags pertinents dans la description. Décrivez ce que montre l’épingle et pourquoi cliquer — ce contexte aide Pinterest à associer votre épingle aux bonnes recherches.</p>
<h2>Titres, descriptions et tableaux</h2>
<p>Chaque champ Pinterest a sa propre limite : titres d’épingle 100 caractères, descriptions d’épingle 500, titres de tableau environ 50 et descriptions de tableau 500. La ligne « à propos » de votre profil est bien plus courte, environ 160 caractères. Les emojis et les écritures non latines comptent comme des caractères : le compteur en direct montre exactement l’espace restant dans chaque champ.</p>
<h2>Privé et instantané</h2>
<p>Tapez ou collez un titre et une description d’épingle pour voir le nombre de caractères et l’espace restant d’un coup d’œil. Tout fonctionne dans votre navigateur : rien de ce que vous tapez n’est envoyé. Réduisez jusqu’à ce que les deux champs tiennent dans les limites de Pinterest, puis copiez-les dans le créateur d’épingles.</p>`,
      pt: `<h2>Limites de caracteres do Pinterest</h2>
<p>O Pinterest dá a um Pin um <strong>título de até 100 caracteres</strong> e uma <strong>descrição de até 500 caracteres</strong>. Apenas os primeiros ~40 caracteres do título e a primeira linha ou duas da descrição aparecem no feed, por isso comece pelas suas palavras-chave. Esta ferramenta conta ambos os campos ao vivo para que os seus Pins continuem pesquisáveis e nunca sejam cortados a meio de uma ideia.</p>
<h2>Escreva para a pesquisa do Pinterest</h2>
<p>O Pinterest é um motor de pesquisa visual, por isso as descrições servem para a descoberta, não apenas como legendas. Coloque a sua palavra-chave principal nos primeiros 40-60 caracteres do título e integre palavras-chave naturais e alguns hashtags relevantes na descrição. Descreva o que o Pin mostra e por que alguém deveria clicar — esse contexto ajuda o Pinterest a associar o seu Pin às pesquisas certas.</p>
<h2>Títulos, descrições e pastas</h2>
<p>Cada campo do Pinterest tem o seu próprio limite: títulos de Pin 100 caracteres, descrições de Pin 500, títulos de pasta cerca de 50 e descrições de pasta 500. A linha «sobre» do seu perfil é muito mais curta, cerca de 160 caracteres. Emojis e alfabetos não latinos contam como caracteres, por isso o contador ao vivo mostra exatamente quanto espaço resta em cada campo.</p>
<h2>Privado e instantâneo</h2>
<p>Escreva ou cole um título e uma descrição de Pin para ver a contagem de caracteres e o espaço restante de relance. Tudo corre no seu navegador, por isso nada do que escrever é enviado. Corte até ambos os campos ficarem dentro dos limites do Pinterest e copie-os para o criador de Pins.</p>`,
      it: `<h2>Limiti di caratteri di Pinterest</h2>
<p>Pinterest concede a un Pin un <strong>titolo fino a 100 caratteri</strong> e una <strong>descrizione fino a 500 caratteri</strong>. Nel feed compaiono solo i primi ~40 caratteri del titolo e la prima riga o due della descrizione, quindi inizia con le tue parole chiave. Questo strumento conta entrambi i campi in tempo reale così i tuoi Pin restano ricercabili e non vengono mai tagliati a metà idea.</p>
<h2>Scrivi per la ricerca di Pinterest</h2>
<p>Pinterest è un motore di ricerca visivo, quindi le descrizioni servono alla scoperta, non solo da didascalie. Metti la parola chiave principale nei primi 40-60 caratteri del titolo e inserisci parole chiave naturali e qualche hashtag pertinente nella descrizione. Descrivi cosa mostra il Pin e perché cliccarci — questo contesto aiuta Pinterest ad abbinare il tuo Pin alle ricerche giuste.</p>
<h2>Titoli, descrizioni e bacheche</h2>
<p>Ogni campo di Pinterest ha il proprio limite: titoli dei Pin 100 caratteri, descrizioni dei Pin 500, titoli delle bacheche circa 50 e descrizioni delle bacheche 500. La riga «info» del tuo profilo è molto più corta, circa 160 caratteri. Emoji e alfabeti non latini contano come caratteri, quindi il contatore in tempo reale mostra esattamente quanto spazio resta in ogni campo.</p>
<h2>Privato e istantaneo</h2>
<p>Scrivi o incolla un titolo e una descrizione del Pin per vedere il conteggio dei caratteri e lo spazio rimasto a colpo d’occhio. Tutto avviene nel tuo browser, quindi nulla di ciò che scrivi viene caricato. Riduci finché entrambi i campi rientrano nei limiti di Pinterest, poi copiali nel creatore di Pin.</p>`,
      nl: `<h2>Pinterest-tekenlimieten</h2>
<p>Pinterest geeft een Pin een <strong>titel van maximaal 100 tekens</strong> en een <strong>beschrijving van maximaal 500 tekens</strong>. Alleen de eerste ~40 tekens van de titel en de eerste regel of twee van de beschrijving zijn zichtbaar in de feed, dus begin met je trefwoorden. Deze tool telt beide velden live, zodat je Pins vindbaar blijven en nooit middenin een gedachte worden afgekapt.</p>
<h2>Schrijf voor Pinterest-zoeken</h2>
<p>Pinterest is een visuele zoekmachine, dus beschrijvingen draaien om ontdekking, niet alleen om bijschriften. Zet je primaire trefwoord in de eerste 40–60 tekens van de titel en verweef natuurlijke trefwoorden plus een paar relevante hashtags in de beschrijving. Beschrijf wat de Pin toont en waarom iemand zou klikken — die context helpt Pinterest je Pin aan de juiste zoekopdrachten te koppelen.</p>
<h2>Titels, beschrijvingen en borden</h2>
<p>Elk Pinterest-veld heeft zijn eigen limiet: Pin-titels 100 tekens, Pin-beschrijvingen 500, bordtitels ongeveer 50 en bordbeschrijvingen 500. De “over”-regel van je profiel is veel korter, ongeveer 160 tekens. Emoji en niet-Latijnse schriften tellen als tekens, dus de live teller laat precies zien hoeveel ruimte er per veld over is.</p>
<h2>Privé en direct</h2>
<p>Typ of plak een Pin-titel en -beschrijving om het aantal tekens en de resterende ruimte in één oogopslag te zien. Alles draait in je browser, dus niets van wat je typt wordt geüpload. Snoei tot beide velden binnen Pinterests limieten passen en kopieer ze naar de Pin-builder.</p>`,
      ja: `<h2>Pinterest の文字数制限</h2>
<p>Pinterest ではピンに<strong>最大100文字のタイトル</strong>と<strong>最大500文字の説明</strong>を付けられます。フィードに表示されるのはタイトルの最初の約40文字と説明の最初の1〜2行だけなので、キーワードを前に置きましょう。本ツールは両方の項目をリアルタイムで数え、ピンが検索されやすく、思考の途中で切れないようにします。</p>
<h2>Pinterest 検索を意識して書く</h2>
<p>Pinterest はビジュアル検索エンジンなので、説明はキャプションというより発見のためのものです。タイトルの最初の40〜60文字に主要キーワードを置き、自然なキーワードと関連ハッシュタグを説明に織り込みましょう。ピンが何を示し、なぜクリックすべきかを説明すると、その文脈が Pinterest に適切な検索とのマッチを助けます。</p>
<h2>タイトル・説明・ボード</h2>
<p>Pinterest の各項目には固有の上限があります。ピンのタイトル100文字、ピンの説明500文字、ボードのタイトル約50文字、ボードの説明500文字。プロフィールの「自己紹介」は約160文字とずっと短めです。絵文字や非ラテン文字も文字として数えられるため、ライブカウンターが各項目の残り容量を正確に表示します。</p>
<h2>プライベートで即時</h2>
<p>ピンのタイトルと説明を入力または貼り付けると、文字数と残り容量がひと目でわかります。すべてブラウザー内で動作するため、入力内容はアップロードされません。両方が Pinterest の上限内に収まるよう調整し、ピン作成画面にコピーしましょう。</p>`,
      zh: `<h2>Pinterest 字符限制</h2>
<p>Pinterest 给每个 Pin <strong>最多 100 个字符的标题</strong>和<strong>最多 500 个字符的说明</strong>。信息流中只显示标题的前约 40 个字符以及说明的前一两行，因此请把关键词放在前面。本工具实时统计两个字段，让你的 Pin 保持可被搜索，且绝不会在表达中途被截断。</p>
<h2>面向 Pinterest 搜索来写</h2>
<p>Pinterest 是一个视觉搜索引擎，所以说明是为了被发现，而不仅仅是配文。把主要关键词放在标题的前 40–60 个字符内，并在说明中自然地融入关键词和几个相关话题标签。描述这个 Pin 展示了什么、以及为什么值得点击——这些上下文能帮助 Pinterest 把你的 Pin 匹配到正确的搜索。</p>
<h2>标题、说明与图板</h2>
<p>Pinterest 每个字段都有各自的上限：Pin 标题 100 个字符，Pin 说明 500 个，图板标题约 50 个，图板说明 500 个。个人资料的“简介”行短得多，约 160 个字符。表情符号和非拉丁文字都计为字符，因此实时计数器会准确显示每个字段还剩多少空间。</p>
<h2>私密且即时</h2>
<p>输入或粘贴 Pin 标题和说明，即可一眼看到字符数和剩余空间。一切都在你的浏览器中运行，因此你输入的内容不会被上传。修剪到两个字段都在 Pinterest 限制内，然后复制到 Pin 创建器。</p>`,
      da: `<h2>Pinterest-tegngrænser</h2>
<p>Pinterest giver en Pin en <strong>titel på op til 100 tegn</strong> og en <strong>beskrivelse på op til 500 tegn</strong>. Kun de første ~40 tegn af titlen og den første linje eller to af beskrivelsen vises i feedet, så start med dine nøgleord. Dette værktøj tæller begge felter live, så dine Pins forbliver søgbare og aldrig afkortes midt i en tanke.</p>
<h2>Skriv til Pinterest-søgning</h2>
<p>Pinterest er en visuel søgemaskine, så beskrivelser handler om at blive opdaget, ikke bare billedtekster. Placer dit primære nøgleord i de første 40-60 tegn af titlen, og væv naturlige nøgleord plus et par relevante hashtags ind i beskrivelsen. Beskriv, hvad Pinnen viser, og hvorfor man skal klikke — den kontekst hjælper Pinterest med at matche din Pin til de rigtige søgninger.</p>
<h2>Titler, beskrivelser og boards</h2>
<p>Hvert Pinterest-felt har sin egen grænse: Pin-titler 100 tegn, Pin-beskrivelser 500, board-titler omkring 50 og board-beskrivelser 500. Profilens »om«-linje er meget kortere, omkring 160 tegn. Emojis og ikke-latinske skrifter tæller som tegn, så live-tælleren viser præcis, hvor meget plads der er tilbage i hvert felt.</p>
<h2>Privat og øjeblikkeligt</h2>
<p>Skriv eller indsæt en Pin-titel og -beskrivelse for at se tegnantal og resterende plads med det samme. Alt kører i din browser, så intet af det, du skriver, uploades. Skær til, indtil begge felter ligger inden for Pinterests grænser, og kopier dem ind i Pin-byggeren.</p>`,
    },

    faq: {
      en: [
        { q: 'What is the Pinterest Pin title character limit?', a: '100 characters. Only about the first 40 show in the feed, so put your most important keywords first.' },
        { q: 'What is the Pinterest description character limit?', a: '500 characters for a Pin description. Use the space for keyword-rich context that helps Pinterest surface your Pin in search.' },
        { q: 'Do hashtags and emoji count toward the limit?', a: 'Yes. Hashtags, emoji, and non-Latin characters all count toward Pinterest’s limits. This counter counts them exactly as Pinterest does.' },
        { q: 'Is my Pin text uploaded anywhere?', a: 'No. Counting happens entirely in your browser — nothing you type is sent to a server, so your drafts stay private.' },
      ],
      es: [
        { q: '¿Cuál es el límite de caracteres del título de un Pin de Pinterest?', a: '100 caracteres. Solo se ven unos 40 en el feed, así que pon primero tus palabras clave más importantes.' },
        { q: '¿Cuál es el límite de caracteres de la descripción de Pinterest?', a: '500 caracteres para la descripción de un Pin. Usa el espacio para un contexto rico en palabras clave que ayude a Pinterest a mostrar tu Pin en las búsquedas.' },
        { q: '¿Los hashtags y emojis cuentan para el límite?', a: 'Sí. Los hashtags, los emojis y los caracteres no latinos cuentan para los límites de Pinterest. Este contador los cuenta exactamente como Pinterest.' },
        { q: '¿Se sube el texto de mi Pin a algún sitio?', a: 'No. El conteo ocurre por completo en tu navegador: nada de lo que escribas se envía a un servidor, así que tus borradores son privados.' },
      ],
      de: [
        { q: 'Wie viele Zeichen darf ein Pinterest-Pin-Titel haben?', a: '100 Zeichen. Im Feed erscheinen nur etwa die ersten 40, setze deine wichtigsten Keywords also nach vorn.' },
        { q: 'Wie lang darf die Pinterest-Beschreibung sein?', a: '500 Zeichen für eine Pin-Beschreibung. Nutze den Platz für keywordreichen Kontext, der Pinterest hilft, deinen Pin in der Suche zu zeigen.' },
        { q: 'Zählen Hashtags und Emojis zum Limit?', a: 'Ja. Hashtags, Emojis und nicht-lateinische Zeichen zählen alle zu Pinterests Limits. Dieser Zähler zählt sie genau wie Pinterest.' },
        { q: 'Wird mein Pin-Text irgendwo hochgeladen?', a: 'Nein. Das Zählen erfolgt vollständig in deinem Browser – nichts, was du tippst, wird an einen Server gesendet, deine Entwürfe bleiben privat.' },
      ],
      fr: [
        { q: 'Quelle est la limite de caractères du titre d’une épingle Pinterest ?', a: '100 caractères. Seuls les 40 premiers environ s’affichent dans le fil, alors placez vos mots-clés les plus importants en premier.' },
        { q: 'Quelle est la limite de caractères de la description Pinterest ?', a: '500 caractères pour une description d’épingle. Utilisez l’espace pour un contexte riche en mots-clés qui aide Pinterest à faire ressortir votre épingle dans la recherche.' },
        { q: 'Les hashtags et emojis comptent-ils dans la limite ?', a: 'Oui. Les hashtags, emojis et caractères non latins comptent tous dans les limites de Pinterest. Ce compteur les compte exactement comme Pinterest.' },
        { q: 'Le texte de mon épingle est-il envoyé quelque part ?', a: 'Non. Le comptage se fait entièrement dans votre navigateur — rien de ce que vous tapez n’est envoyé à un serveur, vos brouillons restent privés.' },
      ],
      pt: [
        { q: 'Qual é o limite de caracteres do título de um Pin do Pinterest?', a: '100 caracteres. Apenas cerca dos primeiros 40 aparecem no feed, por isso ponha as suas palavras-chave mais importantes primeiro.' },
        { q: 'Qual é o limite de caracteres da descrição do Pinterest?', a: '500 caracteres para a descrição de um Pin. Use o espaço para um contexto rico em palavras-chave que ajude o Pinterest a destacar o seu Pin na pesquisa.' },
        { q: 'Os hashtags e emojis contam para o limite?', a: 'Sim. Os hashtags, emojis e caracteres não latinos contam todos para os limites do Pinterest. Este contador conta-os exatamente como o Pinterest.' },
        { q: 'O texto do meu Pin é enviado para algum lado?', a: 'Não. A contagem acontece inteiramente no seu navegador — nada do que escrever é enviado para um servidor, por isso os seus rascunhos permanecem privados.' },
      ],
      it: [
        { q: 'Qual è il limite di caratteri del titolo di un Pin di Pinterest?', a: '100 caratteri. Nel feed compaiono solo i primi 40 circa, quindi metti le parole chiave più importanti per prime.' },
        { q: 'Qual è il limite di caratteri della descrizione di Pinterest?', a: '500 caratteri per la descrizione di un Pin. Usa lo spazio per un contesto ricco di parole chiave che aiuti Pinterest a far emergere il tuo Pin nella ricerca.' },
        { q: 'Hashtag ed emoji contano nel limite?', a: 'Sì. Hashtag, emoji e caratteri non latini contano tutti nei limiti di Pinterest. Questo contatore li conta esattamente come Pinterest.' },
        { q: 'Il testo del mio Pin viene caricato da qualche parte?', a: 'No. Il conteggio avviene interamente nel tuo browser — nulla di ciò che scrivi viene inviato a un server, quindi le tue bozze restano private.' },
      ],
      nl: [
        { q: 'Wat is de tekenlimiet voor een Pinterest Pin-titel?', a: '100 tekens. Slechts ongeveer de eerste 40 zijn zichtbaar in de feed, dus zet je belangrijkste trefwoorden vooraan.' },
        { q: 'Wat is de tekenlimiet voor de Pinterest-beschrijving?', a: '500 tekens voor een Pin-beschrijving. Gebruik de ruimte voor trefwoordrijke context die Pinterest helpt je Pin in zoekresultaten te tonen.' },
        { q: 'Tellen hashtags en emoji mee voor de limiet?', a: 'Ja. Hashtags, emoji en niet-Latijnse tekens tellen allemaal mee voor de Pinterest-limieten. Deze teller telt ze precies zoals Pinterest dat doet.' },
        { q: 'Wordt mijn Pin-tekst ergens geüpload?', a: 'Nee. Het tellen gebeurt volledig in je browser — niets van wat je typt wordt naar een server gestuurd, dus je concepten blijven privé.' },
      ],
      ja: [
        { q: 'Pinterest のピンのタイトルの文字数上限は？', a: '100文字です。フィードに表示されるのは最初の約40文字だけなので、最も重要なキーワードを先頭に置きましょう。' },
        { q: 'Pinterest の説明の文字数上限は？', a: 'ピンの説明は500文字です。キーワードを豊富に含む文脈に使い、Pinterest が検索であなたのピンを出しやすくしましょう。' },
        { q: 'ハッシュタグや絵文字は上限に数えられますか？', a: 'はい。ハッシュタグ・絵文字・非ラテン文字はすべて Pinterest の上限に数えられます。本カウンターは Pinterest と同じように数えます。' },
        { q: 'ピンのテキストはどこかにアップロードされますか？', a: 'いいえ。カウントはすべてブラウザー内で行われ、入力内容はサーバーに送信されません。下書きは非公開のままです。' },
      ],
      zh: [
        { q: 'Pinterest 的 Pin 标题字符上限是多少？', a: '100 个字符。信息流中只显示大约前 40 个，所以把最重要的关键词放在最前面。' },
        { q: 'Pinterest 的说明字符上限是多少？', a: 'Pin 说明为 500 个字符。用这段空间写富含关键词的上下文，帮助 Pinterest 在搜索中展示你的 Pin。' },
        { q: '话题标签和表情计入上限吗？', a: '计入。话题标签、表情和非拉丁字符都计入 Pinterest 的上限。本计数器与 Pinterest 的计法完全一致。' },
        { q: '我的 Pin 文本会被上传吗？', a: '不会。统计完全在你的浏览器中进行——你输入的内容不会发送到服务器，因此草稿保持私密。' },
      ],
      da: [
        { q: 'Hvad er tegngrænsen for en Pinterest Pin-titel?', a: '100 tegn. Kun cirka de første 40 vises i feedet, så placer dine vigtigste nøgleord først.' },
        { q: 'Hvad er tegngrænsen for Pinterest-beskrivelsen?', a: '500 tegn for en Pin-beskrivelse. Brug pladsen til nøgleordsrig kontekst, der hjælper Pinterest med at vise din Pin i søgning.' },
        { q: 'Tæller hashtags og emojis med i grænsen?', a: 'Ja. Hashtags, emojis og ikke-latinske tegn tæller alle med i Pinterests grænser. Denne tæller tæller dem præcis som Pinterest.' },
        { q: 'Bliver min Pin-tekst uploadet nogen steder?', a: 'Nej. Optællingen kører helt i din browser — intet af det, du skriver, sendes til en server, så dine udkast forbliver private.' },
      ],
    },
  },
  {
    id: 'reddit',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'Reddit title 300 chars; self-post body 40,000 chars; comments 10,000',

    slugs: {
      en: 'reddit-character-counter',
      es: 'contador-caracteres-reddit',
      de: 'reddit-zeichenzaehler',
      fr: 'compteur-caracteres-reddit',
      pt: 'contador-caracteres-reddit',
      it: 'contatore-caratteri-reddit',
      nl: 'reddit-tekenteller',
      ja: 'reddit-moji-kaunta',
      zh: 'reddit-zi-fu-ji-shu',
      da: 'reddit-tegntaeller',
    },

    schemaName: {
      en: 'Reddit Character Counter',
      es: 'Contador de Caracteres de Reddit',
      de: 'Reddit Zeichenzähler',
      fr: 'Compteur de Caractères Reddit',
      pt: 'Contador de Caracteres do Reddit',
      it: 'Contatore di Caratteri Reddit',
      nl: 'Reddit Tekenteller',
      ja: 'Reddit 文字数カウンター',
      zh: 'Reddit 字符计数器',
      da: 'Reddit Tegntæller',
    },

    titles: {
      en: 'Reddit Character Counter — Title & Post Limit Checker',
      es: 'Contador de Caracteres de Reddit — Límites de título y publicación',
      de: 'Reddit Zeichenzähler — Titel- & Beitragslimit prüfen',
      fr: 'Compteur de Caractères Reddit — Limites de titre et de publication',
      pt: 'Contador de Caracteres do Reddit — Limites de título e publicação',
      it: 'Contatore di Caratteri Reddit — Limiti di titolo e post',
      nl: 'Reddit Tekenteller — Titel- & postlimiet checken',
      ja: 'Reddit 文字数カウンター — タイトル・投稿の上限チェック',
      zh: 'Reddit 字符计数器 — 标题与帖子字数检查',
      da: 'Reddit Tegntæller — Tjek titel- & opslagsgrænse',
    },

    metaDescriptions: {
      en: 'Free Reddit character counter. Check your post title against the 300-character limit and the body against 40,000 characters, live as you type.',
      es: 'Contador de caracteres de Reddit gratuito. Comprueba el título de tu publicación frente al límite de 300 caracteres y el cuerpo frente a 40 000, en vivo.',
      de: 'Kostenloser Reddit-Zeichenzähler. Prüfe deinen Beitragstitel gegen das 300-Zeichen-Limit und den Text gegen 40.000 Zeichen – live beim Tippen.',
      fr: 'Compteur de caractères Reddit gratuit. Vérifiez le titre de votre publication (limite de 300 caractères) et le corps (40 000 caractères) en direct.',
      pt: 'Contador de caracteres do Reddit gratuito. Verifique o título da publicação face ao limite de 300 caracteres e o corpo face a 40 000, ao vivo.',
      it: 'Contatore di caratteri Reddit gratuito. Controlla il titolo del post sul limite di 300 caratteri e il corpo su 40.000, in tempo reale.',
      nl: 'Gratis Reddit-tekenteller. Controleer je posttitel tegen de limiet van 300 tekens en de tekst tegen 40.000 tekens, live tijdens het typen.',
      ja: '無料の Reddit 文字数カウンター。投稿タイトルを300文字、本文を40,000文字の上限に対してリアルタイムでチェックできます。',
      zh: '免费的 Reddit 字符计数器。在你输入时实时检查帖子标题是否在 300 字符以内、正文是否在 40,000 字符以内。',
      da: 'Gratis Reddit-tegntæller. Tjek din opslagstitel mod grænsen på 300 tegn og brødteksten mod 40.000 tegn, live mens du skriver.',
    },

    intro: {
      en: 'Check your Reddit post title and body against Reddit’s real character limits before you post. Type below — the counters update live and flag anything over the limit.',
      es: 'Comprueba el título y el cuerpo de tu publicación de Reddit frente a los límites reales antes de publicar. Escribe abajo: los contadores se actualizan en vivo y avisan si te pasas.',
      de: 'Prüfe Titel und Text deines Reddit-Beitrags vor dem Posten gegen die echten Limits. Tippe unten – die Zähler aktualisieren sich live und markieren Überschreitungen.',
      fr: 'Vérifiez le titre et le corps de votre publication Reddit selon les vraies limites avant de publier. Saisissez ci-dessous : les compteurs se mettent à jour en direct et signalent tout dépassement.',
      pt: 'Verifique o título e o corpo da sua publicação do Reddit face aos limites reais antes de publicar. Escreva abaixo: os contadores atualizam-se ao vivo e assinalam excessos.',
      it: 'Controlla titolo e corpo del tuo post di Reddit sui limiti reali prima di pubblicare. Scrivi qui sotto: i contatori si aggiornano in tempo reale e segnalano gli eccessi.',
      nl: 'Controleer je Reddit-titel en -tekst tegen de echte limieten voordat je plaatst. Typ hieronder — de tellers werken live bij en markeren alles boven de limiet.',
      ja: '投稿前に、Reddit の実際の上限に対してタイトルと本文をチェックしましょう。下に入力すると、カウンターがリアルタイムで更新され、超過を知らせます。',
      zh: '发布前，用 Reddit 的真实上限检查你的标题和正文。在下方输入——计数器会实时更新并标记任何超限内容。',
      da: 'Tjek din Reddit-titel og -brødtekst mod de reelle grænser, før du poster. Skriv nedenfor — tællerne opdateres live og markerer alt over grænsen.',
    },

    content: {
      en: `<h2>Reddit character limits</h2>
<p>Reddit caps a post <strong>title at 300 characters</strong> and a self-post <strong>body at 40,000 characters</strong>. Comments also allow up to 10,000 characters. The title is the part that has to earn the click in busy feeds, so the 300-character limit is the one most worth watching. This tool counts your title and body live so neither gets rejected when you hit submit.</p>
<h2>Titles do the heavy lifting</h2>
<p>On Reddit, the title carries the post — many subreddits are link-and-title only, and even text posts are judged on the title first. You have 300 characters, but the strongest titles are far shorter and specific. Lead with the concrete detail or question that makes someone curious, and check each subreddit’s rules, since many add their own title format or tag requirements.</p>
<h2>Bodies, comments, and flair</h2>
<p>Self-post bodies can run to 40,000 characters — plenty for detailed write-ups, guides, and AMAs, with Markdown for formatting. Comments cap at 10,000 characters, and user flair is far shorter at around 64. Links, Markdown syntax, and emoji all count toward these limits, so the live counter reflects exactly what Reddit will accept before you post.</p>
<h2>Private and instant</h2>
<p>Paste a draft title and body to see character counts and remaining space at a glance. Everything runs in your browser, so nothing you type is uploaded — handy for drafting longer posts or AMAs before they go live. Trim the title until it’s within 300 characters, then post with confidence.</p>`,
      es: `<h2>Límites de caracteres de Reddit</h2>
<p>Reddit limita el <strong>título de una publicación a 300 caracteres</strong> y el <strong>cuerpo de una publicación de texto a 40 000 caracteres</strong>. Los comentarios permiten hasta 10 000 caracteres. El título es la parte que tiene que ganarse el clic en feeds saturados, así que el límite de 300 caracteres es el que más conviene vigilar. Esta herramienta cuenta tu título y tu cuerpo en vivo para que ninguno sea rechazado al enviar.</p>
<h2>Los títulos hacen el trabajo pesado</h2>
<p>En Reddit, el título sostiene la publicación: muchos subreddits son solo de enlace y título, e incluso las publicaciones de texto se juzgan primero por el título. Dispones de 300 caracteres, pero los títulos más fuertes son mucho más cortos y específicos. Empieza con el detalle concreto o la pregunta que despierta curiosidad y revisa las reglas de cada subreddit, ya que muchos añaden su propio formato de título o requisitos de etiquetas.</p>
<h2>Cuerpos, comentarios y flair</h2>
<p>Los cuerpos de las publicaciones de texto pueden llegar a 40 000 caracteres, suficiente para artículos detallados, guías y AMA, con Markdown para el formato. Los comentarios se limitan a 10 000 caracteres y el flair de usuario es mucho más corto, unos 64. Los enlaces, la sintaxis de Markdown y los emojis cuentan para estos límites, así que el contador en vivo refleja exactamente lo que Reddit aceptará antes de publicar.</p>
<h2>Privado e instantáneo</h2>
<p>Pega un borrador de título y cuerpo para ver el número de caracteres y el espacio restante de un vistazo. Todo funciona en tu navegador, así que nada de lo que escribas se sube, ideal para redactar publicaciones largas o AMA antes de que salgan. Recorta el título hasta que esté dentro de los 300 caracteres y publica con confianza.</p>`,
      de: `<h2>Reddit-Zeichenlimits</h2>
<p>Reddit begrenzt den <strong>Titel eines Beitrags auf 300 Zeichen</strong> und den <strong>Text eines Text-Beitrags auf 40.000 Zeichen</strong>. Kommentare erlauben bis zu 10.000 Zeichen. Der Titel muss in vollen Feeds den Klick verdienen, daher lohnt sich das 300-Zeichen-Limit am meisten zu beachten. Dieses Tool zählt Titel und Text live, damit beim Absenden nichts abgelehnt wird.</p>
<h2>Titel leisten die Hauptarbeit</h2>
<p>Auf Reddit trägt der Titel den Beitrag – viele Subreddits sind reine Link-und-Titel-Communities, und selbst Textbeiträge werden zuerst am Titel gemessen. Du hast 300 Zeichen, aber die stärksten Titel sind viel kürzer und konkret. Beginne mit dem konkreten Detail oder der Frage, die neugierig macht, und prüfe die Regeln jedes Subreddits, da viele eigene Titelformate oder Tag-Vorgaben hinzufügen.</p>
<h2>Texte, Kommentare und Flair</h2>
<p>Text-Beiträge können bis zu 40.000 Zeichen lang sein – genug für ausführliche Beiträge, Guides und AMAs, mit Markdown zur Formatierung. Kommentare sind auf 10.000 Zeichen begrenzt, und Benutzer-Flair ist mit rund 64 viel kürzer. Links, Markdown-Syntax und Emojis zählen zu diesen Limits, der Live-Zähler zeigt also genau, was Reddit vor dem Posten akzeptiert.</p>
<h2>Privat und sofort</h2>
<p>Füge einen Titel- und Textentwurf ein, um Zeichenzahl und verbleibenden Platz auf einen Blick zu sehen. Alles läuft in deinem Browser, also wird nichts hochgeladen – praktisch zum Entwerfen längerer Beiträge oder AMAs vor der Veröffentlichung. Kürze den Titel auf unter 300 Zeichen und poste mit Zuversicht.</p>`,
      fr: `<h2>Limites de caractères Reddit</h2>
<p>Reddit limite le <strong>titre d’une publication à 300 caractères</strong> et le <strong>corps d’une publication texte à 40 000 caractères</strong>. Les commentaires autorisent jusqu’à 10 000 caractères. Le titre est la partie qui doit mériter le clic dans des fils chargés, donc la limite de 300 caractères est la plus importante à surveiller. Cet outil compte votre titre et votre corps en direct pour qu’aucun ne soit rejeté à l’envoi.</p>
<h2>Les titres font le gros du travail</h2>
<p>Sur Reddit, le titre porte la publication — de nombreux subreddits ne sont que lien et titre, et même les publications texte sont jugées d’abord sur le titre. Vous avez 300 caractères, mais les titres les plus forts sont bien plus courts et précis. Commencez par le détail concret ou la question qui éveille la curiosité, et vérifiez les règles de chaque subreddit, car beaucoup ajoutent leur propre format de titre ou des exigences de tags.</p>
<h2>Corps, commentaires et flair</h2>
<p>Les corps de publication texte peuvent atteindre 40 000 caractères — largement de quoi rédiger des comptes-rendus détaillés, des guides et des AMA, avec le Markdown pour la mise en forme. Les commentaires plafonnent à 10 000 caractères, et le flair utilisateur est bien plus court, environ 64. Les liens, la syntaxe Markdown et les emojis comptent dans ces limites : le compteur en direct reflète exactement ce que Reddit acceptera avant publication.</p>
<h2>Privé et instantané</h2>
<p>Collez un brouillon de titre et de corps pour voir le nombre de caractères et l’espace restant d’un coup d’œil. Tout fonctionne dans votre navigateur : rien de ce que vous tapez n’est envoyé — pratique pour préparer des publications longues ou des AMA avant leur mise en ligne. Réduisez le titre sous 300 caractères, puis publiez en confiance.</p>`,
      pt: `<h2>Limites de caracteres do Reddit</h2>
<p>O Reddit limita o <strong>título de uma publicação a 300 caracteres</strong> e o <strong>corpo de uma publicação de texto a 40 000 caracteres</strong>. Os comentários permitem até 10 000 caracteres. O título é a parte que tem de conquistar o clique em feeds movimentados, por isso o limite de 300 caracteres é o que mais vale a pena vigiar. Esta ferramenta conta o seu título e corpo ao vivo para que nenhum seja rejeitado ao enviar.</p>
<h2>Os títulos fazem o trabalho pesado</h2>
<p>No Reddit, o título sustenta a publicação — muitos subreddits são apenas de ligação e título, e até as publicações de texto são avaliadas primeiro pelo título. Tem 300 caracteres, mas os títulos mais fortes são muito mais curtos e específicos. Comece pelo detalhe concreto ou pela pergunta que desperta curiosidade e verifique as regras de cada subreddit, já que muitos acrescentam o seu próprio formato de título ou requisitos de etiquetas.</p>
<h2>Corpos, comentários e flair</h2>
<p>Os corpos de publicações de texto podem chegar a 40 000 caracteres — suficiente para textos detalhados, guias e AMAs, com Markdown para formatação. Os comentários limitam-se a 10 000 caracteres e o flair de utilizador é muito mais curto, cerca de 64. Ligações, sintaxe Markdown e emojis contam para estes limites, por isso o contador ao vivo reflete exatamente o que o Reddit aceitará antes de publicar.</p>
<h2>Privado e instantâneo</h2>
<p>Cole um rascunho de título e corpo para ver a contagem de caracteres e o espaço restante de relance. Tudo corre no seu navegador, por isso nada do que escrever é enviado — útil para redigir publicações longas ou AMAs antes de irem para o ar. Corte o título até ficar dentro dos 300 caracteres e publique com confiança.</p>`,
      it: `<h2>Limiti di caratteri di Reddit</h2>
<p>Reddit limita il <strong>titolo di un post a 300 caratteri</strong> e il <strong>corpo di un post di testo a 40.000 caratteri</strong>. I commenti consentono fino a 10.000 caratteri. Il titolo è la parte che deve guadagnarsi il clic in feed affollati, quindi il limite di 300 caratteri è quello da tenere più d’occhio. Questo strumento conta titolo e corpo in tempo reale così nessuno viene rifiutato all’invio.</p>
<h2>I titoli fanno il lavoro pesante</h2>
<p>Su Reddit il titolo regge il post — molti subreddit sono solo link e titolo, e anche i post di testo vengono giudicati prima dal titolo. Hai 300 caratteri, ma i titoli più efficaci sono molto più brevi e specifici. Inizia con il dettaglio concreto o la domanda che incuriosisce e controlla le regole di ogni subreddit, poiché molti aggiungono un proprio formato di titolo o requisiti di tag.</p>
<h2>Corpi, commenti e flair</h2>
<p>I corpi dei post di testo possono arrivare a 40.000 caratteri — più che sufficienti per resoconti dettagliati, guide e AMA, con Markdown per la formattazione. I commenti si fermano a 10.000 caratteri e il flair utente è molto più corto, circa 64. Link, sintassi Markdown ed emoji contano in questi limiti, quindi il contatore in tempo reale riflette esattamente ciò che Reddit accetterà prima di pubblicare.</p>
<h2>Privato e istantaneo</h2>
<p>Incolla una bozza di titolo e corpo per vedere il conteggio dei caratteri e lo spazio rimasto a colpo d’occhio. Tutto avviene nel tuo browser, quindi nulla di ciò che scrivi viene caricato — utile per scrivere post lunghi o AMA prima della pubblicazione. Riduci il titolo entro i 300 caratteri e pubblica con sicurezza.</p>`,
      nl: `<h2>Reddit-tekenlimieten</h2>
<p>Reddit beperkt de <strong>titel van een post tot 300 tekens</strong> en de <strong>tekst van een tekstpost tot 40.000 tekens</strong>. Reacties staan tot 10.000 tekens toe. De titel moet de klik verdienen in drukke feeds, dus de limiet van 300 tekens is het meest de moeite om in de gaten te houden. Deze tool telt je titel en tekst live, zodat geen van beide wordt geweigerd bij verzenden.</p>
<h2>Titels doen het zware werk</h2>
<p>Op Reddit draagt de titel de post — veel subreddits zijn alleen link-en-titel, en zelfs tekstposts worden eerst op de titel beoordeeld. Je hebt 300 tekens, maar de sterkste titels zijn veel korter en specifiek. Begin met het concrete detail of de vraag die nieuwsgierig maakt, en controleer de regels van elke subreddit, want veel voegen een eigen titelformaat of tag-eisen toe.</p>
<h2>Teksten, reacties en flair</h2>
<p>Tekstposts kunnen oplopen tot 40.000 tekens — ruim voldoende voor uitgebreide stukken, gidsen en AMA’s, met Markdown voor opmaak. Reacties zijn beperkt tot 10.000 tekens en gebruikers-flair is veel korter, ongeveer 64. Links, Markdown-syntaxis en emoji tellen mee voor deze limieten, dus de live teller laat precies zien wat Reddit accepteert voordat je plaatst.</p>
<h2>Privé en direct</h2>
<p>Plak een concept-titel en -tekst om het aantal tekens en de resterende ruimte in één oogopslag te zien. Alles draait in je browser, dus niets van wat je typt wordt geüpload — handig voor het opstellen van langere posts of AMA’s voordat ze live gaan. Snoei de titel tot binnen 300 tekens en plaats met vertrouwen.</p>`,
      ja: `<h2>Reddit の文字数制限</h2>
<p>Reddit は投稿の<strong>タイトルを300文字</strong>、テキスト投稿の<strong>本文を40,000文字</strong>に制限します。コメントは最大10,000文字です。混雑したフィードでクリックを得るのはタイトルなので、300文字の上限が最も注目すべき点です。本ツールはタイトルと本文をリアルタイムで数え、送信時に弾かれないようにします。</p>
<h2>タイトルが要</h2>
<p>Reddit ではタイトルが投稿を支えます。多くのサブレディットはリンクとタイトルのみで、テキスト投稿でもまずタイトルで判断されます。300文字使えますが、強いタイトルははるかに短く具体的です。好奇心を引く具体的な事実や質問で始め、各サブレディットのルールを確認しましょう。独自のタイトル形式やタグ要件を設けているところが多くあります。</p>
<h2>本文・コメント・フレア</h2>
<p>テキスト投稿の本文は最大40,000文字まで——詳しい解説・ガイド・AMA に十分で、Markdown で書式設定できます。コメントは10,000文字まで、ユーザーフレアは約64文字とずっと短めです。リンク・Markdown 記法・絵文字もこれらの上限に数えられるため、ライブカウンターは投稿前に Reddit が受け付ける内容を正確に反映します。</p>
<h2>プライベートで即時</h2>
<p>タイトルと本文の下書きを貼り付けると、文字数と残り容量がひと目でわかります。すべてブラウザー内で動作するため、入力内容はアップロードされません。長文投稿や AMA の下書きにも便利です。タイトルを300文字以内に調整して、自信を持って投稿しましょう。</p>`,
      zh: `<h2>Reddit 字符限制</h2>
<p>Reddit 将帖子<strong>标题限制为 300 个字符</strong>，文本帖<strong>正文限制为 40,000 个字符</strong>。评论最多 10,000 个字符。在繁忙的信息流中赢得点击的是标题，因此 300 字符的上限最值得关注。本工具实时统计你的标题和正文，让二者在提交时都不会被拒。</p>
<h2>标题挑大梁</h2>
<p>在 Reddit 上，标题撑起整个帖子——许多版块只有链接和标题，即使是文本帖也先看标题。你有 300 个字符，但最有力的标题往往短得多、也更具体。用能引起好奇的具体细节或问题开头，并查看每个版块的规则，因为许多版块会附加自己的标题格式或标签要求。</p>
<h2>正文、评论与 flair</h2>
<p>文本帖正文最多可达 40,000 个字符——足够写详尽的长文、指南和 AMA，并可用 Markdown 排版。评论上限为 10,000 个字符，用户 flair 短得多，约 64 个。链接、Markdown 语法和表情都计入这些上限，因此实时计数器在发布前准确反映 Reddit 接受的内容。</p>
<h2>私密且即时</h2>
<p>粘贴标题和正文草稿，即可一眼看到字符数和剩余空间。一切都在你的浏览器中运行，因此你输入的内容不会被上传——适合在长帖或 AMA 上线前起草。把标题修剪到 300 字符以内，然后放心发布。</p>`,
      da: `<h2>Reddit-tegngrænser</h2>
<p>Reddit begrænser et opslags <strong>titel til 300 tegn</strong> og et tekstopslags <strong>brødtekst til 40.000 tegn</strong>. Kommentarer tillader op til 10.000 tegn. Titlen er den del, der skal fortjene klikket i travle feeds, så grænsen på 300 tegn er den, der er mest værd at holde øje med. Dette værktøj tæller din titel og brødtekst live, så ingen af dem afvises, når du sender.</p>
<h2>Titler gør det tunge arbejde</h2>
<p>På Reddit bærer titlen opslaget — mange subreddits er kun link og titel, og selv tekstopslag bedømmes først på titlen. Du har 300 tegn, men de stærkeste titler er langt kortere og specifikke. Start med den konkrete detalje eller det spørgsmål, der vækker nysgerrighed, og tjek hver subreddits regler, da mange tilføjer deres eget titelformat eller tag-krav.</p>
<h2>Brødtekster, kommentarer og flair</h2>
<p>Brødtekster i tekstopslag kan nå op på 40.000 tegn — rigeligt til detaljerede indlæg, guides og AMA'er, med Markdown til formatering. Kommentarer topper ved 10.000 tegn, og bruger-flair er langt kortere, omkring 64. Links, Markdown-syntaks og emojis tæller alle med i disse grænser, så live-tælleren afspejler præcis, hvad Reddit accepterer, før du poster.</p>
<h2>Privat og øjeblikkeligt</h2>
<p>Indsæt et udkast til titel og brødtekst for at se tegnantal og resterende plads med det samme. Alt kører i din browser, så intet af det, du skriver, uploades — nyttigt til at skrive længere opslag eller AMA'er, før de går live. Skær titlen ned til under 300 tegn, og post med selvtillid.</p>`,
    },

    faq: {
      en: [
        { q: 'What is the Reddit title character limit?', a: '300 characters. Most strong titles are much shorter — lead with the specific detail or question that earns the click.' },
        { q: 'What is the Reddit post body limit?', a: '40,000 characters for a self-post (text post). Comments cap at 10,000 characters, both with Markdown formatting.' },
        { q: 'Do Markdown and links count toward the limit?', a: 'Yes. Markdown syntax, links, and emoji all count as characters. This counter counts them exactly as Reddit does.' },
        { q: 'Is my post uploaded anywhere?', a: 'No. Counting runs entirely in your browser — nothing you type is sent to a server, so unposted drafts stay private.' },
      ],
      es: [
        { q: '¿Cuál es el límite de caracteres del título de Reddit?', a: '300 caracteres. La mayoría de los títulos fuertes son mucho más cortos: empieza con el detalle concreto o la pregunta que gana el clic.' },
        { q: '¿Cuál es el límite del cuerpo de una publicación de Reddit?', a: '40 000 caracteres para una publicación de texto. Los comentarios se limitan a 10 000 caracteres, ambos con formato Markdown.' },
        { q: '¿El Markdown y los enlaces cuentan para el límite?', a: 'Sí. La sintaxis de Markdown, los enlaces y los emojis cuentan como caracteres. Este contador los cuenta exactamente como Reddit.' },
        { q: '¿Se sube mi publicación a algún sitio?', a: 'No. El conteo se realiza por completo en tu navegador: nada de lo que escribas se envía a un servidor, así que los borradores son privados.' },
      ],
      de: [
        { q: 'Wie viele Zeichen darf ein Reddit-Titel haben?', a: '300 Zeichen. Die meisten starken Titel sind viel kürzer – beginne mit dem konkreten Detail oder der Frage, die den Klick verdient.' },
        { q: 'Wie lang darf der Text eines Reddit-Beitrags sein?', a: '40.000 Zeichen für einen Textbeitrag. Kommentare sind auf 10.000 Zeichen begrenzt, beide mit Markdown-Formatierung.' },
        { q: 'Zählen Markdown und Links zum Limit?', a: 'Ja. Markdown-Syntax, Links und Emojis zählen als Zeichen. Dieser Zähler zählt sie genau wie Reddit.' },
        { q: 'Wird mein Beitrag irgendwo hochgeladen?', a: 'Nein. Das Zählen läuft vollständig in deinem Browser – nichts, was du tippst, wird an einen Server gesendet, unveröffentlichte Entwürfe bleiben privat.' },
      ],
      fr: [
        { q: 'Quelle est la limite de caractères du titre Reddit ?', a: '300 caractères. La plupart des titres efficaces sont bien plus courts — commencez par le détail concret ou la question qui mérite le clic.' },
        { q: 'Quelle est la limite du corps d’une publication Reddit ?', a: '40 000 caractères pour une publication texte. Les commentaires plafonnent à 10 000 caractères, les deux avec mise en forme Markdown.' },
        { q: 'Le Markdown et les liens comptent-ils dans la limite ?', a: 'Oui. La syntaxe Markdown, les liens et les emojis comptent comme des caractères. Ce compteur les compte exactement comme Reddit.' },
        { q: 'Ma publication est-elle envoyée quelque part ?', a: 'Non. Le comptage se fait entièrement dans votre navigateur — rien de ce que vous tapez n’est envoyé à un serveur, vos brouillons non publiés restent privés.' },
      ],
      pt: [
        { q: 'Qual é o limite de caracteres do título do Reddit?', a: '300 caracteres. A maioria dos títulos fortes é muito mais curta — comece pelo detalhe concreto ou pela pergunta que conquista o clique.' },
        { q: 'Qual é o limite do corpo de uma publicação do Reddit?', a: '40 000 caracteres para uma publicação de texto. Os comentários limitam-se a 10 000 caracteres, ambos com formatação Markdown.' },
        { q: 'O Markdown e as ligações contam para o limite?', a: 'Sim. A sintaxe Markdown, as ligações e os emojis contam como caracteres. Este contador conta-os exatamente como o Reddit.' },
        { q: 'A minha publicação é enviada para algum lado?', a: 'Não. A contagem é feita inteiramente no seu navegador — nada do que escrever é enviado para um servidor, por isso os rascunhos não publicados permanecem privados.' },
      ],
      it: [
        { q: 'Qual è il limite di caratteri del titolo di Reddit?', a: '300 caratteri. La maggior parte dei titoli efficaci è molto più breve — inizia con il dettaglio concreto o la domanda che guadagna il clic.' },
        { q: 'Qual è il limite del corpo di un post di Reddit?', a: '40.000 caratteri per un post di testo. I commenti si fermano a 10.000 caratteri, entrambi con formattazione Markdown.' },
        { q: 'Markdown e link contano nel limite?', a: 'Sì. La sintassi Markdown, i link e le emoji contano come caratteri. Questo contatore li conta esattamente come Reddit.' },
        { q: 'Il mio post viene caricato da qualche parte?', a: 'No. Il conteggio avviene interamente nel tuo browser — nulla di ciò che scrivi viene inviato a un server, quindi le bozze non pubblicate restano private.' },
      ],
      nl: [
        { q: 'Wat is de tekenlimiet voor een Reddit-titel?', a: '300 tekens. De meeste sterke titels zijn veel korter — begin met het concrete detail of de vraag die de klik verdient.' },
        { q: 'Wat is de limiet voor de tekst van een Reddit-post?', a: '40.000 tekens voor een tekstpost. Reacties zijn beperkt tot 10.000 tekens, beide met Markdown-opmaak.' },
        { q: 'Tellen Markdown en links mee voor de limiet?', a: 'Ja. Markdown-syntaxis, links en emoji tellen als tekens. Deze teller telt ze precies zoals Reddit dat doet.' },
        { q: 'Wordt mijn post ergens geüpload?', a: 'Nee. Het tellen gebeurt volledig in je browser — niets van wat je typt wordt naar een server gestuurd, dus ongeplaatste concepten blijven privé.' },
      ],
      ja: [
        { q: 'Reddit のタイトルの文字数上限は？', a: '300文字です。強いタイトルはもっと短いのが普通です。クリックを得る具体的な事実や質問で始めましょう。' },
        { q: 'Reddit の投稿本文の上限は？', a: 'テキスト投稿で40,000文字です。コメントは10,000文字まで。どちらも Markdown で書式設定できます。' },
        { q: 'Markdown やリンクは上限に数えられますか？', a: 'はい。Markdown 記法・リンク・絵文字はすべて文字として数えられます。本カウンターは Reddit と同じように数えます。' },
        { q: '投稿はどこかにアップロードされますか？', a: 'いいえ。カウントはすべてブラウザー内で行われ、入力内容はサーバーに送信されません。未投稿の下書きは非公開のままです。' },
      ],
      zh: [
        { q: 'Reddit 标题的字符上限是多少？', a: '300 个字符。大多数有力的标题都短得多——用能赢得点击的具体细节或问题开头。' },
        { q: 'Reddit 帖子正文的上限是多少？', a: '文本帖为 40,000 个字符。评论上限为 10,000 个字符，二者均支持 Markdown 排版。' },
        { q: 'Markdown 和链接计入上限吗？', a: '计入。Markdown 语法、链接和表情都计为字符。本计数器与 Reddit 的计法完全一致。' },
        { q: '我的帖子会被上传吗？', a: '不会。统计完全在你的浏览器中进行——你输入的内容不会发送到服务器，因此未发布的草稿保持私密。' },
      ],
      da: [
        { q: 'Hvad er tegngrænsen for en Reddit-titel?', a: '300 tegn. De fleste stærke titler er langt kortere — start med den konkrete detalje eller det spørgsmål, der fortjener klikket.' },
        { q: 'Hvad er grænsen for brødteksten i et Reddit-opslag?', a: '40.000 tegn for et tekstopslag. Kommentarer topper ved 10.000 tegn, begge med Markdown-formatering.' },
        { q: 'Tæller Markdown og links med i grænsen?', a: 'Ja. Markdown-syntaks, links og emojis tæller som tegn. Denne tæller tæller dem præcis som Reddit.' },
        { q: 'Bliver mit opslag uploadet nogen steder?', a: 'Nej. Optællingen kører helt i din browser — intet af det, du skriver, sendes til en server, så ikke-postede udkast forbliver private.' },
      ],
    },
  },
  {
    id: 'bluesky',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'Bluesky post 300 chars (grapheme-counted)',

    slugs: {
      en: 'bluesky-character-counter',
      es: 'contador-caracteres-bluesky',
      de: 'bluesky-zeichenzaehler',
      fr: 'compteur-caracteres-bluesky',
      pt: 'contador-caracteres-bluesky',
      it: 'contatore-caratteri-bluesky',
      nl: 'bluesky-tekenteller',
      ja: 'bluesky-moji-kaunta',
      zh: 'bluesky-zi-fu-ji-shu',
      da: 'bluesky-tegntaeller',
    },

    schemaName: {
      en: 'Bluesky Character Counter',
      es: 'Contador de Caracteres de Bluesky',
      de: 'Bluesky Zeichenzähler',
      fr: 'Compteur de Caractères Bluesky',
      pt: 'Contador de Caracteres do Bluesky',
      it: 'Contatore di Caratteri Bluesky',
      nl: 'Bluesky Tekenteller',
      ja: 'Bluesky 文字数カウンター',
      zh: 'Bluesky 字符计数器',
      da: 'Bluesky Tegntæller',
    },

    titles: {
      en: 'Bluesky Character Counter — 300-Character Post Limit',
      es: 'Contador de Caracteres de Bluesky — Límite de 300 caracteres por publicación',
      de: 'Bluesky Zeichenzähler — 300-Zeichen-Limit pro Beitrag',
      fr: 'Compteur de Caractères Bluesky — Limite de 300 caractères par publication',
      pt: 'Contador de Caracteres do Bluesky — Limite de 300 caracteres por publicação',
      it: 'Contatore di Caratteri Bluesky — Limite di 300 caratteri per post',
      nl: 'Bluesky Tekenteller — 300-tekenlimiet per post',
      ja: 'Bluesky 文字数カウンター — 1投稿300文字の上限',
      zh: 'Bluesky 字符计数器 — 每帖 300 字符上限',
      da: 'Bluesky Tegntæller — 300-tegns-grænse pr. opslag',
    },

    metaDescriptions: {
      en: 'Free Bluesky character counter. Check your post against the 300-character limit live, counted as graphemes just like Bluesky.',
      es: 'Contador de caracteres de Bluesky gratuito. Comprueba tu publicación frente al límite de 300 caracteres en vivo, contados como grafemas igual que en Bluesky.',
      de: 'Kostenloser Bluesky-Zeichenzähler. Prüfe deinen Beitrag live gegen das 300-Zeichen-Limit – als Grapheme gezählt, genau wie bei Bluesky.',
      fr: 'Compteur de caractères Bluesky gratuit. Vérifiez votre publication en direct face à la limite de 300 caractères, comptés en graphèmes comme sur Bluesky.',
      pt: 'Contador de caracteres do Bluesky gratuito. Verifique a sua publicação ao vivo face ao limite de 300 caracteres, contados como grafemas tal como no Bluesky.',
      it: 'Contatore di caratteri Bluesky gratuito. Controlla il tuo post in tempo reale sul limite di 300 caratteri, contati come grafemi come su Bluesky.',
      nl: 'Gratis Bluesky-tekenteller. Controleer je post live tegen de limiet van 300 tekens, geteld als grafemen net als op Bluesky.',
      ja: '無料の Bluesky 文字数カウンター。Bluesky と同じく書記素として数え、300文字の上限に対して投稿をリアルタイムでチェックできます。',
      zh: '免费的 Bluesky 字符计数器。实时检查你的帖子是否在 300 字符以内，并像 Bluesky 一样按字素计数。',
      da: 'Gratis Bluesky-tegntæller. Tjek dit opslag live mod grænsen på 300 tegn, talt som grafemer ligesom på Bluesky.',
    },

    intro: {
      en: 'Check your Bluesky post against the real 300-character limit before you post. Type below — the counter updates live and warns the moment you go over.',
      es: 'Comprueba tu publicación de Bluesky frente al límite real de 300 caracteres antes de publicar. Escribe abajo: el contador se actualiza en vivo y avisa en cuanto te pasas.',
      de: 'Prüfe deinen Bluesky-Beitrag vor dem Posten gegen das echte 300-Zeichen-Limit. Tippe unten – der Zähler aktualisiert sich live und warnt, sobald du darüber bist.',
      fr: 'Vérifiez votre publication Bluesky selon la vraie limite de 300 caractères avant de publier. Saisissez ci-dessous : le compteur se met à jour en direct et alerte dès que vous dépassez.',
      pt: 'Verifique a sua publicação do Bluesky face ao limite real de 300 caracteres antes de publicar. Escreva abaixo: o contador atualiza-se ao vivo e avisa assim que ultrapassa.',
      it: 'Controlla il tuo post di Bluesky sul limite reale di 300 caratteri prima di pubblicare. Scrivi qui sotto: il contatore si aggiorna in tempo reale e avvisa appena superi.',
      nl: 'Controleer je Bluesky-post tegen de echte limiet van 300 tekens voordat je plaatst. Typ hieronder — de teller werkt live bij en waarschuwt zodra je eroverheen gaat.',
      ja: '投稿前に、Bluesky の実際の300文字の上限に対して投稿をチェックしましょう。下に入力すると、カウンターがリアルタイムで更新され、超過したらすぐ知らせます。',
      zh: '发布前，用 Bluesky 的真实 300 字符上限检查你的帖子。在下方输入——计数器会实时更新，一旦超限立即提示。',
      da: 'Tjek dit Bluesky-opslag mod den reelle grænse på 300 tegn, før du poster. Skriv nedenfor — tælleren opdateres live og advarer, så snart du går over.',
    },

    content: {
      en: `<h2>Bluesky character limit</h2>
<p>Bluesky caps a post at <strong>300 characters</strong> — graphemes, not bytes, so an emoji or an accented letter counts as one character just like a plain letter. That’s slightly more room than X’s 280, but still tight, so this tool counts your post live and warns the moment you go over 300.</p>
<h2>Why Bluesky counts graphemes</h2>
<p>Unlike some networks that weight CJK characters or count code units, Bluesky measures user-perceived characters (grapheme clusters). A family emoji built from several code points counts as one, and Japanese or Chinese characters each count as one too. This counter uses the same grapheme counting, so the number you see matches what Bluesky shows.</p>
<h2>Make 300 characters work</h2>
<p>Open with your point rather than a wind-up, since the first words do the work in a fast feed. Links count toward the 300 characters (Bluesky doesn’t shorten them), so trim or use a link card. For longer thoughts, break them into a thread of connected posts rather than cramming everything into one.</p>
<h2>Private and instant</h2>
<p>Type or paste your post to see the character count and how many of the 300 remain. Everything runs in your browser, so nothing you type is uploaded. Trim until you’re comfortably under 300, then copy it across to Bluesky.</p>`,
      es: `<h2>Límite de caracteres de Bluesky</h2>
<p>Bluesky limita una publicación a <strong>300 caracteres</strong>, contados como grafemas y no como bytes, así que un emoji o una letra acentuada cuenta como un carácter igual que una letra normal. Es un poco más de espacio que los 280 de X, pero sigue siendo ajustado, por eso esta herramienta cuenta tu publicación en vivo y avisa en cuanto superas los 300.</p>
<h2>Por qué Bluesky cuenta grafemas</h2>
<p>A diferencia de algunas redes que ponderan los caracteres CJK o cuentan unidades de código, Bluesky mide los caracteres tal como los percibe el usuario (grupos de grafemas). Un emoji de familia formado por varios puntos de código cuenta como uno, y los caracteres japoneses o chinos cuentan como uno cada uno. Este contador usa el mismo conteo de grafemas, así que el número que ves coincide con el de Bluesky.</p>
<h2>Aprovecha los 300 caracteres</h2>
<p>Empieza con tu idea en vez de con un preámbulo, porque las primeras palabras hacen el trabajo en un feed rápido. Los enlaces cuentan para los 300 caracteres (Bluesky no los acorta), así que recorta o usa una tarjeta de enlace. Para ideas más largas, divídelas en un hilo de publicaciones conectadas en lugar de meterlo todo en una.</p>
<h2>Privado e instantáneo</h2>
<p>Escribe o pega tu publicación para ver el número de caracteres y cuántos de los 300 quedan. Todo funciona en tu navegador, así que nada de lo que escribas se sube. Recorta hasta quedar holgadamente por debajo de 300 y cópialo en Bluesky.</p>`,
      de: `<h2>Bluesky-Zeichenlimit</h2>
<p>Bluesky begrenzt einen Beitrag auf <strong>300 Zeichen</strong> – als Grapheme gezählt, nicht als Bytes, sodass ein Emoji oder ein Buchstabe mit Akzent genau wie ein normaler Buchstabe als ein Zeichen zählt. Das ist etwas mehr Platz als die 280 von X, aber immer noch knapp, daher zählt dieses Tool deinen Beitrag live und warnt, sobald du über 300 kommst.</p>
<h2>Warum Bluesky Grapheme zählt</h2>
<p>Anders als manche Netzwerke, die CJK-Zeichen gewichten oder Code-Einheiten zählen, misst Bluesky die vom Nutzer wahrgenommenen Zeichen (Graphem-Cluster). Ein aus mehreren Codepoints zusammengesetztes Familien-Emoji zählt als eines, und japanische oder chinesische Zeichen zählen ebenfalls je als eines. Dieser Zähler nutzt dieselbe Graphem-Zählung, sodass deine Zahl mit der von Bluesky übereinstimmt.</p>
<h2>300 Zeichen optimal nutzen</h2>
<p>Beginne mit deinem Punkt statt mit einem Vorlauf, denn die ersten Wörter leisten im schnellen Feed die Arbeit. Links zählen zu den 300 Zeichen (Bluesky kürzt sie nicht), also kürze oder nutze eine Link-Karte. Längere Gedanken teilst du besser in einen Thread verbundener Beiträge auf, statt alles in einen zu zwängen.</p>
<h2>Privat und sofort</h2>
<p>Tippe oder füge deinen Beitrag ein, um die Zeichenzahl und die verbleibenden der 300 zu sehen. Alles läuft in deinem Browser, also wird nichts hochgeladen. Kürze, bis du bequem unter 300 bist, und kopiere ihn nach Bluesky.</p>`,
      fr: `<h2>Limite de caractères Bluesky</h2>
<p>Bluesky limite une publication à <strong>300 caractères</strong> — comptés en graphèmes, pas en octets, donc un emoji ou une lettre accentuée compte pour un caractère, comme une lettre ordinaire. C’est un peu plus que les 280 de X, mais cela reste serré : cet outil compte votre publication en direct et alerte dès que vous dépassez 300.</p>
<h2>Pourquoi Bluesky compte les graphèmes</h2>
<p>Contrairement à certains réseaux qui pondèrent les caractères CJK ou comptent les unités de code, Bluesky mesure les caractères perçus par l’utilisateur (grappes de graphèmes). Un emoji de famille composé de plusieurs points de code compte pour un, et les caractères japonais ou chinois comptent chacun pour un. Ce compteur utilise le même comptage de graphèmes : le nombre affiché correspond à celui de Bluesky.</p>
<h2>Tirer parti des 300 caractères</h2>
<p>Ouvrez sur votre idée plutôt que sur une introduction, car les premiers mots font le travail dans un fil rapide. Les liens comptent dans les 300 caractères (Bluesky ne les raccourcit pas), alors réduisez ou utilisez une carte de lien. Pour des réflexions plus longues, divisez-les en un fil de publications reliées plutôt que de tout entasser dans une seule.</p>
<h2>Privé et instantané</h2>
<p>Tapez ou collez votre publication pour voir le nombre de caractères et combien des 300 restent. Tout fonctionne dans votre navigateur : rien de ce que vous tapez n’est envoyé. Réduisez jusqu’à être confortablement sous 300, puis copiez-la dans Bluesky.</p>`,
      pt: `<h2>Limite de caracteres do Bluesky</h2>
<p>O Bluesky limita uma publicação a <strong>300 caracteres</strong>, contados como grafemas e não como bytes, por isso um emoji ou uma letra acentuada conta como um caractere, tal como uma letra normal. É um pouco mais de espaço do que os 280 do X, mas continua apertado, por isso esta ferramenta conta a sua publicação ao vivo e avisa assim que ultrapassa os 300.</p>
<h2>Porque o Bluesky conta grafemas</h2>
<p>Ao contrário de algumas redes que ponderam os caracteres CJK ou contam unidades de código, o Bluesky mede os caracteres tal como o utilizador os perceciona (grupos de grafemas). Um emoji de família composto por vários pontos de código conta como um, e os caracteres japoneses ou chineses contam como um cada. Este contador usa a mesma contagem de grafemas, por isso o número que vê coincide com o do Bluesky.</p>
<h2>Aproveite os 300 caracteres</h2>
<p>Comece pela sua ideia em vez de uma introdução, porque as primeiras palavras fazem o trabalho num feed rápido. As ligações contam para os 300 caracteres (o Bluesky não as encurta), por isso corte ou use um cartão de ligação. Para ideias mais longas, divida-as numa thread de publicações ligadas em vez de espremer tudo numa só.</p>
<h2>Privado e instantâneo</h2>
<p>Escreva ou cole a sua publicação para ver a contagem de caracteres e quantos dos 300 restam. Tudo corre no seu navegador, por isso nada do que escrever é enviado. Corte até ficar folgadamente abaixo de 300 e copie-a para o Bluesky.</p>`,
      it: `<h2>Limite di caratteri di Bluesky</h2>
<p>Bluesky limita un post a <strong>300 caratteri</strong>, contati come grafemi e non come byte, quindi un’emoji o una lettera accentata conta come un carattere proprio come una lettera normale. È un po’ più spazio dei 280 di X, ma resta stretto, perciò questo strumento conta il tuo post in tempo reale e avvisa appena superi i 300.</p>
<h2>Perché Bluesky conta i grafemi</h2>
<p>A differenza di alcune reti che pesano i caratteri CJK o contano le unità di codice, Bluesky misura i caratteri percepiti dall’utente (cluster di grafemi). Un’emoji di famiglia composta da più code point conta come una, e i caratteri giapponesi o cinesi contano come uno ciascuno. Questo contatore usa lo stesso conteggio di grafemi, quindi il numero che vedi corrisponde a quello di Bluesky.</p>
<h2>Sfrutta i 300 caratteri</h2>
<p>Apri con il tuo punto invece che con un’introduzione, perché le prime parole fanno il lavoro in un feed veloce. I link contano nei 300 caratteri (Bluesky non li accorcia), quindi riduci o usa una scheda link. Per pensieri più lunghi, suddividili in un thread di post collegati invece di stipare tutto in uno.</p>
<h2>Privato e istantaneo</h2>
<p>Scrivi o incolla il tuo post per vedere il conteggio dei caratteri e quanti dei 300 restano. Tutto avviene nel tuo browser, quindi nulla di ciò che scrivi viene caricato. Riduci finché sei comodamente sotto i 300, poi copialo su Bluesky.</p>`,
      nl: `<h2>Bluesky-tekenlimiet</h2>
<p>Bluesky beperkt een post tot <strong>300 tekens</strong> — geteld als grafemen, niet als bytes, dus een emoji of een letter met accent telt als één teken, net als een gewone letter. Dat is iets meer ruimte dan de 280 van X, maar nog steeds krap, dus deze tool telt je post live en waarschuwt zodra je boven de 300 komt.</p>
<h2>Waarom Bluesky grafemen telt</h2>
<p>Anders dan sommige netwerken die CJK-tekens zwaarder wegen of code-eenheden tellen, meet Bluesky de door de gebruiker waargenomen tekens (grafeemclusters). Een gezinsemoji die uit meerdere code points bestaat telt als één, en Japanse of Chinese tekens tellen elk als één. Deze teller gebruikt dezelfde grafeemtelling, dus het getal dat je ziet komt overeen met dat van Bluesky.</p>
<h2>Haal alles uit 300 tekens</h2>
<p>Open met je punt in plaats van een aanloop, want de eerste woorden doen het werk in een snelle feed. Links tellen mee voor de 300 tekens (Bluesky kort ze niet in), dus snoei of gebruik een linkkaart. Splits langere gedachten in een thread van verbonden posts in plaats van alles in één te proppen.</p>
<h2>Privé en direct</h2>
<p>Typ of plak je post om het aantal tekens te zien en hoeveel van de 300 er over zijn. Alles draait in je browser, dus niets van wat je typt wordt geüpload. Snoei tot je ruim onder de 300 zit en kopieer hem naar Bluesky.</p>`,
      ja: `<h2>Bluesky の文字数制限</h2>
<p>Bluesky は投稿を<strong>300文字</strong>に制限します。バイトではなく書記素として数えるため、絵文字やアクセント付きの文字も通常の文字と同じく1文字として数えます。X の280文字より少し多めですが、それでもタイトなので、本ツールは投稿をリアルタイムで数え、300を超えた瞬間に知らせます。</p>
<h2>なぜ Bluesky は書記素で数えるのか</h2>
<p>CJK 文字を重み付けしたりコード単位で数えたりするネットワークと違い、Bluesky はユーザーが認識する文字（書記素クラスター）で測ります。複数のコードポイントから成る家族絵文字は1つ、日本語や中国語の文字もそれぞれ1つとして数えます。本カウンターは同じ書記素カウントを使うため、表示される数は Bluesky と一致します。</p>
<h2>300文字を活かす</h2>
<p>前置きより先に要点から始めましょう。速いフィードでは最初の数語が勝負だからです。リンクも300文字に数えられる（Bluesky は短縮しません）ので、削るかリンクカードを使いましょう。長い内容は1つに詰め込まず、つながった投稿のスレッドに分けるのがおすすめです。</p>
<h2>プライベートで即時</h2>
<p>投稿を入力または貼り付けると、文字数と300のうちの残りがわかります。すべてブラウザー内で動作するため、入力内容はアップロードされません。300を余裕で下回るまで調整して、Bluesky にコピーしましょう。</p>`,
      zh: `<h2>Bluesky 字符限制</h2>
<p>Bluesky 将每条帖子限制为 <strong>300 个字符</strong>——按字素而非字节计数，因此一个表情或带重音的字母都和普通字母一样算作一个字符。这比 X 的 280 略多，但仍然紧凑，所以本工具会实时统计你的帖子，并在超过 300 时立即提醒。</p>
<h2>为什么 Bluesky 按字素计数</h2>
<p>与一些对 CJK 字符加权或按码元计数的网络不同，Bluesky 衡量用户感知的字符（字素簇）。由多个码点组成的家庭表情算作一个，日文或中文字符也各算一个。本计数器使用相同的字素计数，因此你看到的数字与 Bluesky 一致。</p>
<h2>用好 300 个字符</h2>
<p>先抛出观点，而不是铺垫，因为在快速的信息流里前几个词最关键。链接也计入 300 个字符（Bluesky 不会缩短链接），所以请精简或使用链接卡片。较长的想法应拆成一串相连的帖子，而不是把所有内容塞进一条。</p>
<h2>私密且即时</h2>
<p>输入或粘贴你的帖子，即可看到字符数以及 300 中还剩多少。一切都在你的浏览器中运行，因此你输入的内容不会被上传。修剪到从容低于 300，然后复制到 Bluesky。</p>`,
      da: `<h2>Bluesky-tegngrænse</h2>
<p>Bluesky begrænser et opslag til <strong>300 tegn</strong> — talt som grafemer, ikke bytes, så en emoji eller et bogstav med accent tæller som ét tegn ligesom et almindeligt bogstav. Det er lidt mere plads end X's 280, men stadig stramt, så dette værktøj tæller dit opslag live og advarer i det øjeblik, du går over 300.</p>
<h2>Hvorfor Bluesky tæller grafemer</h2>
<p>I modsætning til nogle netværk, der vægter CJK-tegn eller tæller kodeenheder, måler Bluesky de tegn, brugeren opfatter (grafemklynger). En familie-emoji sammensat af flere kodepunkter tæller som én, og japanske eller kinesiske tegn tæller som ét hver. Denne tæller bruger samme grafemtælling, så tallet, du ser, matcher Blueskys.</p>
<h2>Få mest muligt ud af 300 tegn</h2>
<p>Åbn med din pointe i stedet for en optakt, for de første ord gør arbejdet i et hurtigt feed. Links tæller med i de 300 tegn (Bluesky forkorter dem ikke), så skær til eller brug et link-kort. Længere tanker bør du dele op i en tråd af forbundne opslag i stedet for at presse alt ind i ét.</p>
<h2>Privat og øjeblikkeligt</h2>
<p>Skriv eller indsæt dit opslag for at se tegnantallet, og hvor mange af de 300 der er tilbage. Alt kører i din browser, så intet af det, du skriver, uploades. Skær til, indtil du er komfortabelt under 300, og kopier det til Bluesky.</p>`,
    },

    faq: {
      en: [
        { q: 'What is the Bluesky character limit?', a: '300 characters per post, measured as grapheme clusters. That is a bit more than X’s 280.' },
        { q: 'Do emoji and links count toward the 300?', a: 'Yes. Emoji count as one grapheme each and links count in full, since Bluesky does not shorten URLs. This counter counts them the same way.' },
        { q: 'How are CJK characters counted on Bluesky?', a: 'Each counts as one character. Bluesky counts user-perceived characters, so Japanese, Chinese, and Korean characters are one each — no double weighting.' },
        { q: 'Is my post uploaded anywhere?', a: 'No. Counting happens entirely in your browser — nothing you type is sent to a server, so your drafts stay private.' },
      ],
      es: [
        { q: '¿Cuál es el límite de caracteres de Bluesky?', a: '300 caracteres por publicación, medidos como grupos de grafemas. Es un poco más que los 280 de X.' },
        { q: '¿Los emojis y enlaces cuentan para los 300?', a: 'Sí. Los emojis cuentan como un grafema cada uno y los enlaces cuentan completos, ya que Bluesky no acorta las URL. Este contador los cuenta igual.' },
        { q: '¿Cómo se cuentan los caracteres CJK en Bluesky?', a: 'Cada uno cuenta como un carácter. Bluesky cuenta los caracteres percibidos por el usuario, así que los caracteres japoneses, chinos y coreanos cuentan como uno cada uno, sin doble ponderación.' },
        { q: '¿Se sube mi publicación a algún sitio?', a: 'No. El conteo ocurre por completo en tu navegador: nada de lo que escribas se envía a un servidor, así que tus borradores son privados.' },
      ],
      de: [
        { q: 'Wie viele Zeichen darf ein Bluesky-Beitrag haben?', a: '300 Zeichen pro Beitrag, gemessen als Graphem-Cluster. Das ist etwas mehr als die 280 von X.' },
        { q: 'Zählen Emojis und Links zu den 300?', a: 'Ja. Emojis zählen je als ein Graphem und Links zählen voll, da Bluesky URLs nicht kürzt. Dieser Zähler zählt sie genauso.' },
        { q: 'Wie werden CJK-Zeichen bei Bluesky gezählt?', a: 'Jedes zählt als ein Zeichen. Bluesky zählt vom Nutzer wahrgenommene Zeichen, japanische, chinesische und koreanische Zeichen also je als eines – ohne doppelte Gewichtung.' },
        { q: 'Wird mein Beitrag irgendwo hochgeladen?', a: 'Nein. Das Zählen erfolgt vollständig in deinem Browser – nichts, was du tippst, wird an einen Server gesendet, deine Entwürfe bleiben privat.' },
      ],
      fr: [
        { q: 'Quelle est la limite de caractères de Bluesky ?', a: '300 caractères par publication, mesurés en grappes de graphèmes. C’est un peu plus que les 280 de X.' },
        { q: 'Les emojis et les liens comptent-ils dans les 300 ?', a: 'Oui. Les emojis comptent chacun pour un graphème et les liens comptent en entier, car Bluesky ne raccourcit pas les URL. Ce compteur les compte de la même façon.' },
        { q: 'Comment les caractères CJK sont-ils comptés sur Bluesky ?', a: 'Chacun compte pour un caractère. Bluesky compte les caractères perçus par l’utilisateur : les caractères japonais, chinois et coréens comptent chacun pour un, sans double pondération.' },
        { q: 'Ma publication est-elle envoyée quelque part ?', a: 'Non. Le comptage se fait entièrement dans votre navigateur — rien de ce que vous tapez n’est envoyé à un serveur, vos brouillons restent privés.' },
      ],
      pt: [
        { q: 'Qual é o limite de caracteres do Bluesky?', a: '300 caracteres por publicação, medidos como grupos de grafemas. É um pouco mais do que os 280 do X.' },
        { q: 'Os emojis e ligações contam para os 300?', a: 'Sim. Os emojis contam como um grafema cada e as ligações contam por inteiro, já que o Bluesky não encurta os URL. Este contador conta-os da mesma forma.' },
        { q: 'Como são contados os caracteres CJK no Bluesky?', a: 'Cada um conta como um caractere. O Bluesky conta os caracteres percecionados pelo utilizador, por isso os caracteres japoneses, chineses e coreanos contam como um cada, sem dupla ponderação.' },
        { q: 'A minha publicação é enviada para algum lado?', a: 'Não. A contagem acontece inteiramente no seu navegador — nada do que escrever é enviado para um servidor, por isso os seus rascunhos permanecem privados.' },
      ],
      it: [
        { q: 'Qual è il limite di caratteri di Bluesky?', a: '300 caratteri per post, misurati come cluster di grafemi. È un po’ più dei 280 di X.' },
        { q: 'Emoji e link contano nei 300?', a: 'Sì. Le emoji contano come un grafema ciascuna e i link contano per intero, poiché Bluesky non accorcia gli URL. Questo contatore li conta allo stesso modo.' },
        { q: 'Come vengono contati i caratteri CJK su Bluesky?', a: 'Ognuno conta come un carattere. Bluesky conta i caratteri percepiti dall’utente, quindi i caratteri giapponesi, cinesi e coreani contano come uno ciascuno, senza doppia pesatura.' },
        { q: 'Il mio post viene caricato da qualche parte?', a: 'No. Il conteggio avviene interamente nel tuo browser — nulla di ciò che scrivi viene inviato a un server, quindi le tue bozze restano private.' },
      ],
      nl: [
        { q: 'Wat is de tekenlimiet van Bluesky?', a: '300 tekens per post, gemeten als grafeemclusters. Dat is iets meer dan de 280 van X.' },
        { q: 'Tellen emoji en links mee voor de 300?', a: 'Ja. Emoji tellen elk als één grafeem en links tellen volledig mee, omdat Bluesky URL’s niet inkort. Deze teller telt ze op dezelfde manier.' },
        { q: 'Hoe worden CJK-tekens op Bluesky geteld?', a: 'Elk telt als één teken. Bluesky telt door de gebruiker waargenomen tekens, dus Japanse, Chinese en Koreaanse tekens tellen elk als één — zonder dubbele weging.' },
        { q: 'Wordt mijn post ergens geüpload?', a: 'Nee. Het tellen gebeurt volledig in je browser — niets van wat je typt wordt naar een server gestuurd, dus je concepten blijven privé.' },
      ],
      ja: [
        { q: 'Bluesky の文字数上限は？', a: '1投稿300文字で、書記素クラスターとして測ります。X の280文字より少し多めです。' },
        { q: '絵文字やリンクは300に数えられますか？', a: 'はい。絵文字はそれぞれ1書記素、リンクも全文字数が数えられます（Bluesky は URL を短縮しません）。本カウンターも同じように数えます。' },
        { q: 'Bluesky では CJK 文字はどう数えますか？', a: 'それぞれ1文字として数えます。Bluesky はユーザーが認識する文字を数えるため、日本語・中国語・韓国語の文字も二重の重み付けなく1つずつです。' },
        { q: '投稿はどこかにアップロードされますか？', a: 'いいえ。カウントはすべてブラウザー内で行われ、入力内容はサーバーに送信されません。下書きは非公開のままです。' },
      ],
      zh: [
        { q: 'Bluesky 的字符上限是多少？', a: '每条帖子 300 个字符，按字素簇衡量。比 X 的 280 略多。' },
        { q: '表情和链接计入这 300 吗？', a: '计入。表情每个算一个字素，链接按完整长度计数，因为 Bluesky 不缩短网址。本计数器以相同方式计数。' },
        { q: 'Bluesky 如何统计 CJK 字符？', a: '每个算作一个字符。Bluesky 统计用户感知的字符，因此日文、中文和韩文字符各算一个，没有双倍加权。' },
        { q: '我的帖子会被上传吗？', a: '不会。统计完全在你的浏览器中进行——你输入的内容不会发送到服务器，因此草稿保持私密。' },
      ],
      da: [
        { q: 'Hvad er Blueskys tegngrænse?', a: '300 tegn pr. opslag, målt som grafemklynger. Det er lidt mere end X\'s 280.' },
        { q: 'Tæller emojis og links med i de 300?', a: 'Ja. Emojis tæller som ét grafem hver, og links tæller fuldt ud, da Bluesky ikke forkorter URL\'er. Denne tæller tæller dem på samme måde.' },
        { q: 'Hvordan tælles CJK-tegn på Bluesky?', a: 'Hvert tæller som ét tegn. Bluesky tæller brugeropfattede tegn, så japanske, kinesiske og koreanske tegn tæller som ét hver — uden dobbelt vægtning.' },
        { q: 'Bliver mit opslag uploadet nogen steder?', a: 'Nej. Optællingen kører helt i din browser — intet af det, du skriver, sendes til en server, så dine udkast forbliver private.' },
      ],
    },
  },
  {
    id: 'discord',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'Discord message 2,000 chars (Nitro 4,000); embed description 4,096',

    slugs: {
      en: 'discord-character-counter',
      es: 'contador-caracteres-discord',
      de: 'discord-zeichenzaehler',
      fr: 'compteur-caracteres-discord',
      pt: 'contador-caracteres-discord',
      it: 'contatore-caratteri-discord',
      nl: 'discord-tekenteller',
      ja: 'discord-moji-kaunta',
      zh: 'discord-zi-fu-ji-shu',
      da: 'discord-tegntaeller',
    },

    schemaName: {
      en: 'Discord Character Counter',
      es: 'Contador de Caracteres de Discord',
      de: 'Discord Zeichenzähler',
      fr: 'Compteur de Caractères Discord',
      pt: 'Contador de Caracteres do Discord',
      it: 'Contatore di Caratteri Discord',
      nl: 'Discord Tekenteller',
      ja: 'Discord 文字数カウンター',
      zh: 'Discord 字符计数器',
      da: 'Discord Tegntæller',
    },

    titles: {
      en: 'Discord Character Counter — 2,000-Character Message Limit',
      es: 'Contador de Caracteres de Discord — Límite de 2000 caracteres por mensaje',
      de: 'Discord Zeichenzähler — 2.000-Zeichen-Limit pro Nachricht',
      fr: 'Compteur de Caractères Discord — Limite de 2 000 caractères par message',
      pt: 'Contador de Caracteres do Discord — Limite de 2000 caracteres por mensagem',
      it: 'Contatore di Caratteri Discord — Limite di 2.000 caratteri per messaggio',
      nl: 'Discord Tekenteller — 2.000-tekenlimiet per bericht',
      ja: 'Discord 文字数カウンター — 1メッセージ2,000文字の上限',
      zh: 'Discord 字符计数器 — 每条消息 2,000 字符上限',
      da: 'Discord Tegntæller — 2.000-tegns-grænse pr. besked',
    },

    metaDescriptions: {
      en: 'Free Discord character counter. Check your message against the 2,000-character limit (4,000 with Nitro) live as you type.',
      es: 'Contador de caracteres de Discord gratuito. Comprueba tu mensaje frente al límite de 2000 caracteres (4000 con Nitro) en vivo mientras escribes.',
      de: 'Kostenloser Discord-Zeichenzähler. Prüfe deine Nachricht live gegen das 2.000-Zeichen-Limit (4.000 mit Nitro) beim Tippen.',
      fr: 'Compteur de caractères Discord gratuit. Vérifiez votre message face à la limite de 2 000 caractères (4 000 avec Nitro) en direct.',
      pt: 'Contador de caracteres do Discord gratuito. Verifique a sua mensagem face ao limite de 2000 caracteres (4000 com Nitro) ao vivo enquanto escreve.',
      it: 'Contatore di caratteri Discord gratuito. Controlla il tuo messaggio sul limite di 2.000 caratteri (4.000 con Nitro) in tempo reale.',
      nl: 'Gratis Discord-tekenteller. Controleer je bericht tegen de limiet van 2.000 tekens (4.000 met Nitro) live tijdens het typen.',
      ja: '無料の Discord 文字数カウンター。メッセージを2,000文字（Nitro は4,000文字）の上限に対してリアルタイムでチェックできます。',
      zh: '免费的 Discord 字符计数器。在你输入时实时检查消息是否在 2,000 字符（Nitro 为 4,000）以内。',
      da: 'Gratis Discord-tegntæller. Tjek din besked mod grænsen på 2.000 tegn (4.000 med Nitro) live, mens du skriver.',
    },

    intro: {
      en: 'Check your Discord message against the real character limit before you send it. Type below — the counter updates live and warns the moment you go over 2,000.',
      es: 'Comprueba tu mensaje de Discord frente al límite real de caracteres antes de enviarlo. Escribe abajo: el contador se actualiza en vivo y avisa en cuanto te pasas de 2000.',
      de: 'Prüfe deine Discord-Nachricht vor dem Senden gegen das echte Zeichenlimit. Tippe unten – der Zähler aktualisiert sich live und warnt, sobald du über 2.000 kommst.',
      fr: 'Vérifiez votre message Discord selon la vraie limite de caractères avant de l’envoyer. Saisissez ci-dessous : le compteur se met à jour en direct et alerte dès que vous dépassez 2 000.',
      pt: 'Verifique a sua mensagem do Discord face ao limite real de caracteres antes de enviar. Escreva abaixo: o contador atualiza-se ao vivo e avisa assim que ultrapassa os 2000.',
      it: 'Controlla il tuo messaggio Discord sul limite reale di caratteri prima di inviarlo. Scrivi qui sotto: il contatore si aggiorna in tempo reale e avvisa appena superi i 2.000.',
      nl: 'Controleer je Discord-bericht tegen de echte tekenlimiet voordat je het verstuurt. Typ hieronder — de teller werkt live bij en waarschuwt zodra je boven de 2.000 komt.',
      ja: '送信前に、Discord の実際の文字数上限に対してメッセージをチェックしましょう。下に入力すると、カウンターがリアルタイムで更新され、2,000を超えたら知らせます。',
      zh: '发送前，用 Discord 的真实字符上限检查你的消息。在下方输入——计数器会实时更新，一旦超过 2,000 立即提示。',
      da: 'Tjek din Discord-besked mod den reelle tegngrænse, før du sender den. Skriv nedenfor — tælleren opdateres live og advarer, så snart du går over 2.000.',
    },

    content: {
      en: `<h2>Discord character limits</h2>
<p>Discord caps a standard message at <strong>2,000 characters</strong>, while <strong>Nitro</strong> subscribers can send up to 4,000. This tool counts against the 2,000-character default so your message sends in one piece — go over and Discord blocks it until you trim or split it.</p>
<h2>Messages, embeds, and bots</h2>
<p>The 2,000-character cap covers normal chat messages. Embeds (used by bots and webhooks) have their own separate limits: an embed description allows up to 4,096 characters, a title 256, and the combined embed content is capped at 6,000. If you write bot responses or announcements, keep these in mind — this counter helps with the message body that most people hit first.</p>
<h2>Working around the limit</h2>
<p>If your message runs over 2,000 characters, split it at a natural break into two messages, post it as a file or text snippet, or move long content into an embed if you’re using a bot. Markdown, custom emoji shortcodes (like :smile:), and links all count toward the limit, so a message that looks short can run long.</p>
<h2>Private and instant</h2>
<p>Type or paste your message to see the character count and how many of the 2,000 remain. Everything runs in your browser, so nothing you type is uploaded. Trim until it fits, then send it without hitting Discord’s limit.</p>`,
      es: `<h2>Límites de caracteres de Discord</h2>
<p>Discord limita un mensaje estándar a <strong>2000 caracteres</strong>, mientras que los suscriptores de <strong>Nitro</strong> pueden enviar hasta 4000. Esta herramienta cuenta frente al valor por defecto de 2000 caracteres para que tu mensaje se envíe de una sola vez: si te pasas, Discord lo bloquea hasta que lo recortes o lo dividas.</p>
<h2>Mensajes, embeds y bots</h2>
<p>El límite de 2000 caracteres cubre los mensajes de chat normales. Los embeds (que usan bots y webhooks) tienen sus propios límites: la descripción de un embed permite hasta 4096 caracteres, el título 256 y el contenido combinado del embed se limita a 6000. Si escribes respuestas de bot o anuncios, tenlo en cuenta; este contador ayuda con el cuerpo del mensaje, que es lo que la mayoría alcanza primero.</p>
<h2>Cómo sortear el límite</h2>
<p>Si tu mensaje supera los 2000 caracteres, divídelo en un punto natural en dos mensajes, publícalo como archivo o fragmento de texto, o pasa el contenido largo a un embed si usas un bot. El Markdown, los códigos de emoji personalizados (como :smile:) y los enlaces cuentan para el límite, así que un mensaje que parece corto puede alargarse.</p>
<h2>Privado e instantáneo</h2>
<p>Escribe o pega tu mensaje para ver el número de caracteres y cuántos de los 2000 quedan. Todo funciona en tu navegador, así que nada de lo que escribas se sube. Recorta hasta que quepa y envíalo sin chocar con el límite de Discord.</p>`,
      de: `<h2>Discord-Zeichenlimits</h2>
<p>Discord begrenzt eine Standardnachricht auf <strong>2.000 Zeichen</strong>, während <strong>Nitro</strong>-Abonnenten bis zu 4.000 senden können. Dieses Tool zählt gegen den Standard von 2.000 Zeichen, damit deine Nachricht in einem Stück gesendet wird – gehst du darüber, blockiert Discord sie, bis du kürzt oder teilst.</p>
<h2>Nachrichten, Embeds und Bots</h2>
<p>Das 2.000-Zeichen-Limit gilt für normale Chat-Nachrichten. Embeds (von Bots und Webhooks genutzt) haben eigene Limits: eine Embed-Beschreibung erlaubt bis zu 4.096 Zeichen, ein Titel 256, und der kombinierte Embed-Inhalt ist auf 6.000 begrenzt. Wenn du Bot-Antworten oder Ankündigungen schreibst, behalte das im Hinterkopf – dieser Zähler hilft beim Nachrichtentext, den die meisten zuerst erreichen.</p>
<h2>Das Limit umgehen</h2>
<p>Läuft deine Nachricht über 2.000 Zeichen, teile sie an einer natürlichen Stelle in zwei Nachrichten, poste sie als Datei oder Text-Snippet oder verschiebe lange Inhalte in ein Embed, wenn du einen Bot nutzt. Markdown, eigene Emoji-Shortcodes (wie :smile:) und Links zählen zum Limit, sodass eine kurz wirkende Nachricht lang werden kann.</p>
<h2>Privat und sofort</h2>
<p>Tippe oder füge deine Nachricht ein, um die Zeichenzahl und die verbleibenden der 2.000 zu sehen. Alles läuft in deinem Browser, also wird nichts hochgeladen. Kürze, bis es passt, und sende, ohne an Discords Limit zu stoßen.</p>`,
      fr: `<h2>Limites de caractères Discord</h2>
<p>Discord limite un message standard à <strong>2 000 caractères</strong>, tandis que les abonnés <strong>Nitro</strong> peuvent en envoyer jusqu’à 4 000. Cet outil compte par rapport à la valeur par défaut de 2 000 caractères pour que votre message parte d’un seul tenant — au-delà, Discord le bloque jusqu’à ce que vous le réduisiez ou le divisiez.</p>
<h2>Messages, embeds et bots</h2>
<p>La limite de 2 000 caractères concerne les messages de chat normaux. Les embeds (utilisés par les bots et webhooks) ont leurs propres limites : une description d’embed autorise jusqu’à 4 096 caractères, un titre 256, et le contenu combiné d’un embed plafonne à 6 000. Si vous rédigez des réponses de bot ou des annonces, gardez-les à l’esprit — ce compteur aide pour le corps du message, que la plupart atteignent en premier.</p>
<h2>Contourner la limite</h2>
<p>Si votre message dépasse 2 000 caractères, coupez-le à un endroit naturel en deux messages, publiez-le sous forme de fichier ou d’extrait de texte, ou déplacez le contenu long dans un embed si vous utilisez un bot. Le Markdown, les codes d’emoji personnalisés (comme :smile:) et les liens comptent dans la limite : un message qui paraît court peut s’allonger.</p>
<h2>Privé et instantané</h2>
<p>Tapez ou collez votre message pour voir le nombre de caractères et combien des 2 000 restent. Tout fonctionne dans votre navigateur : rien de ce que vous tapez n’est envoyé. Réduisez jusqu’à ce que ça tienne, puis envoyez sans atteindre la limite de Discord.</p>`,
      pt: `<h2>Limites de caracteres do Discord</h2>
<p>O Discord limita uma mensagem padrão a <strong>2000 caracteres</strong>, enquanto os subscritores do <strong>Nitro</strong> podem enviar até 4000. Esta ferramenta conta face ao valor padrão de 2000 caracteres para que a sua mensagem seja enviada de uma só vez — se ultrapassar, o Discord bloqueia-a até a cortar ou dividir.</p>
<h2>Mensagens, embeds e bots</h2>
<p>O limite de 2000 caracteres cobre as mensagens de chat normais. Os embeds (usados por bots e webhooks) têm os seus próprios limites: a descrição de um embed permite até 4096 caracteres, o título 256 e o conteúdo combinado do embed limita-se a 6000. Se escrever respostas de bot ou anúncios, tenha-o em mente — este contador ajuda com o corpo da mensagem, que é o que a maioria atinge primeiro.</p>
<h2>Contornar o limite</h2>
<p>Se a sua mensagem ultrapassar os 2000 caracteres, divida-a num ponto natural em duas mensagens, publique-a como ficheiro ou excerto de texto, ou mova o conteúdo longo para um embed se usar um bot. O Markdown, os códigos de emoji personalizados (como :smile:) e as ligações contam para o limite, por isso uma mensagem que parece curta pode ficar longa.</p>
<h2>Privado e instantâneo</h2>
<p>Escreva ou cole a sua mensagem para ver a contagem de caracteres e quantos dos 2000 restam. Tudo corre no seu navegador, por isso nada do que escrever é enviado. Corte até caber e envie sem atingir o limite do Discord.</p>`,
      it: `<h2>Limiti di caratteri di Discord</h2>
<p>Discord limita un messaggio standard a <strong>2.000 caratteri</strong>, mentre gli abbonati <strong>Nitro</strong> possono inviarne fino a 4.000. Questo strumento conta rispetto al valore predefinito di 2.000 caratteri così il messaggio parte in un pezzo solo — se superi, Discord lo blocca finché non lo riduci o lo dividi.</p>
<h2>Messaggi, embed e bot</h2>
<p>Il limite di 2.000 caratteri riguarda i normali messaggi di chat. Gli embed (usati da bot e webhook) hanno limiti propri: la descrizione di un embed consente fino a 4.096 caratteri, il titolo 256 e il contenuto combinato dell’embed si ferma a 6.000. Se scrivi risposte di bot o annunci, tienilo presente — questo contatore aiuta con il corpo del messaggio, quello che la maggior parte raggiunge per prima.</p>
<h2>Aggirare il limite</h2>
<p>Se il messaggio supera i 2.000 caratteri, dividilo in un punto naturale in due messaggi, pubblicalo come file o snippet di testo, oppure sposta il contenuto lungo in un embed se usi un bot. Markdown, codici di emoji personalizzate (come :smile:) e link contano nel limite, quindi un messaggio che sembra corto può allungarsi.</p>
<h2>Privato e istantaneo</h2>
<p>Scrivi o incolla il tuo messaggio per vedere il conteggio dei caratteri e quanti dei 2.000 restano. Tutto avviene nel tuo browser, quindi nulla di ciò che scrivi viene caricato. Riduci finché non ci sta, poi invia senza toccare il limite di Discord.</p>`,
      nl: `<h2>Discord-tekenlimieten</h2>
<p>Discord beperkt een standaardbericht tot <strong>2.000 tekens</strong>, terwijl <strong>Nitro</strong>-abonnees tot 4.000 kunnen sturen. Deze tool telt tegen de standaard van 2.000 tekens zodat je bericht in één keer verstuurt — ga je eroverheen, dan blokkeert Discord het tot je inkort of splitst.</p>
<h2>Berichten, embeds en bots</h2>
<p>De limiet van 2.000 tekens geldt voor gewone chatberichten. Embeds (gebruikt door bots en webhooks) hebben hun eigen limieten: een embed-beschrijving staat tot 4.096 tekens toe, een titel 256, en de gecombineerde embed-inhoud is beperkt tot 6.000. Schrijf je botantwoorden of aankondigingen, houd dit dan in gedachten — deze teller helpt met de berichttekst, die de meesten als eerste raken.</p>
<h2>Om de limiet heen werken</h2>
<p>Loopt je bericht over 2.000 tekens, splits het dan op een natuurlijk punt in twee berichten, plaats het als bestand of tekstfragment, of verplaats lange inhoud naar een embed als je een bot gebruikt. Markdown, aangepaste emoji-shortcodes (zoals :smile:) en links tellen mee voor de limiet, dus een bericht dat kort lijkt kan oplopen.</p>
<h2>Privé en direct</h2>
<p>Typ of plak je bericht om het aantal tekens te zien en hoeveel van de 2.000 er over zijn. Alles draait in je browser, dus niets van wat je typt wordt geüpload. Snoei tot het past en verstuur zonder tegen Discords limiet aan te lopen.</p>`,
      ja: `<h2>Discord の文字数制限</h2>
<p>Discord は通常のメッセージを<strong>2,000文字</strong>、<strong>Nitro</strong> 加入者は最大4,000文字まで送れます。本ツールは既定の2,000文字に対して数えるので、メッセージを一度で送れます。超えると、削るか分割するまで Discord が送信をブロックします。</p>
<h2>メッセージ・埋め込み・ボット</h2>
<p>2,000文字の上限は通常のチャットメッセージに適用されます。埋め込み（ボットや Webhook が使用）には別の上限があります。埋め込みの説明は最大4,096文字、タイトルは256文字、埋め込み全体では6,000文字まで。ボットの応答やお知らせを書くなら覚えておきましょう。本カウンターは、多くの人が最初に達するメッセージ本文に役立ちます。</p>
<h2>上限の回避方法</h2>
<p>メッセージが2,000文字を超える場合は、自然な区切りで2つに分ける、ファイルやテキストスニペットとして投稿する、ボットを使うなら長い内容を埋め込みに移す、などの方法があります。Markdown・カスタム絵文字コード（:smile: など）・リンクも上限に数えられるため、短く見えても長くなることがあります。</p>
<h2>プライベートで即時</h2>
<p>メッセージを入力または貼り付けると、文字数と2,000のうちの残りがわかります。すべてブラウザー内で動作するため、入力内容はアップロードされません。収まるまで調整し、Discord の上限に達せずに送信しましょう。</p>`,
      zh: `<h2>Discord 字符限制</h2>
<p>Discord 将普通消息限制为 <strong>2,000 个字符</strong>，而 <strong>Nitro</strong> 订阅者最多可发送 4,000 个。本工具按 2,000 字符的默认上限计数，让你的消息一次发出——超出后，Discord 会阻止发送，直到你精简或拆分。</p>
<h2>消息、嵌入与机器人</h2>
<p>2,000 字符的上限适用于普通聊天消息。嵌入（embed，由机器人和 Webhook 使用）有各自的上限：嵌入说明最多 4,096 个字符，标题 256 个，单个嵌入合计上限为 6,000 个。如果你撰写机器人回复或公告，请记住这些；本计数器主要帮助大多数人最先遇到的消息正文。</p>
<h2>绕过上限</h2>
<p>如果消息超过 2,000 个字符，可在自然断点处拆成两条、以文件或文本片段发布，或在使用机器人时把长内容放进嵌入。Markdown、自定义表情代码（如 :smile:）和链接都计入上限，因此看起来短的消息也可能变长。</p>
<h2>私密且即时</h2>
<p>输入或粘贴你的消息，即可看到字符数以及 2,000 中还剩多少。一切都在你的浏览器中运行，因此你输入的内容不会被上传。修剪到可容纳，然后发送，不会触及 Discord 的上限。</p>`,
      da: `<h2>Discord-tegngrænser</h2>
<p>Discord begrænser en standardbesked til <strong>2.000 tegn</strong>, mens <strong>Nitro</strong>-abonnenter kan sende op til 4.000. Dette værktøj tæller mod standarden på 2.000 tegn, så din besked sendes i ét stykke — går du over, blokerer Discord den, indtil du skærer til eller deler den.</p>
<h2>Beskeder, embeds og bots</h2>
<p>Grænsen på 2.000 tegn dækker almindelige chatbeskeder. Embeds (brugt af bots og webhooks) har deres egne grænser: en embed-beskrivelse tillader op til 4.096 tegn, en titel 256, og det samlede embed-indhold er begrænset til 6.000. Hvis du skriver bot-svar eller meddelelser, så husk dem — denne tæller hjælper med beskedteksten, som de fleste rammer først.</p>
<h2>Sådan kommer du uden om grænsen</h2>
<p>Hvis din besked løber over 2.000 tegn, så del den ved et naturligt brud i to beskeder, post den som en fil eller et tekstuddrag, eller flyt langt indhold over i en embed, hvis du bruger en bot. Markdown, brugerdefinerede emoji-koder (som :smile:) og links tæller alle med i grænsen, så en besked, der ser kort ud, kan blive lang.</p>
<h2>Privat og øjeblikkeligt</h2>
<p>Skriv eller indsæt din besked for at se tegnantallet, og hvor mange af de 2.000 der er tilbage. Alt kører i din browser, så intet af det, du skriver, uploades. Skær til, indtil den passer, og send uden at ramme Discords grænse.</p>`,
    },

    faq: {
      en: [
        { q: 'What is the Discord message character limit?', a: '2,000 characters for standard accounts and 4,000 for Discord Nitro subscribers. This counter tracks the 2,000-character default.' },
        { q: 'What is the Discord embed character limit?', a: 'Embeds have separate limits: description up to 4,096 characters, title 256, and 6,000 total across an embed — used mainly by bots and webhooks.' },
        { q: 'Do custom emoji and Markdown count toward the limit?', a: 'Yes. Markdown, links, and custom emoji shortcodes like :smile: all count as characters. This counter counts them exactly as Discord does.' },
        { q: 'Is my message uploaded anywhere?', a: 'No. Counting happens entirely in your browser — nothing you type is sent to a server, so your drafts stay private.' },
      ],
      es: [
        { q: '¿Cuál es el límite de caracteres de un mensaje de Discord?', a: '2000 caracteres para cuentas estándar y 4000 para los suscriptores de Discord Nitro. Este contador sigue el valor por defecto de 2000.' },
        { q: '¿Cuál es el límite de caracteres de un embed de Discord?', a: 'Los embeds tienen límites propios: la descripción hasta 4096 caracteres, el título 256 y 6000 en total por embed; los usan sobre todo bots y webhooks.' },
        { q: '¿El Markdown y los emojis personalizados cuentan para el límite?', a: 'Sí. El Markdown, los enlaces y los códigos de emoji personalizados como :smile: cuentan como caracteres. Este contador los cuenta exactamente como Discord.' },
        { q: '¿Se sube mi mensaje a algún sitio?', a: 'No. El conteo ocurre por completo en tu navegador: nada de lo que escribas se envía a un servidor, así que tus borradores son privados.' },
      ],
      de: [
        { q: 'Wie viele Zeichen darf eine Discord-Nachricht haben?', a: '2.000 Zeichen für Standardkonten und 4.000 für Discord-Nitro-Abonnenten. Dieser Zähler verfolgt den Standard von 2.000.' },
        { q: 'Wie hoch ist das Discord-Embed-Limit?', a: 'Embeds haben eigene Limits: Beschreibung bis zu 4.096 Zeichen, Titel 256 und insgesamt 6.000 pro Embed – vor allem von Bots und Webhooks genutzt.' },
        { q: 'Zählen eigene Emojis und Markdown zum Limit?', a: 'Ja. Markdown, Links und eigene Emoji-Shortcodes wie :smile: zählen als Zeichen. Dieser Zähler zählt sie genau wie Discord.' },
        { q: 'Wird meine Nachricht irgendwo hochgeladen?', a: 'Nein. Das Zählen erfolgt vollständig in deinem Browser – nichts, was du tippst, wird an einen Server gesendet, deine Entwürfe bleiben privat.' },
      ],
      fr: [
        { q: 'Quelle est la limite de caractères d’un message Discord ?', a: '2 000 caractères pour les comptes standards et 4 000 pour les abonnés Discord Nitro. Ce compteur suit la valeur par défaut de 2 000.' },
        { q: 'Quelle est la limite de caractères d’un embed Discord ?', a: 'Les embeds ont des limites distinctes : description jusqu’à 4 096 caractères, titre 256 et 6 000 au total par embed — utilisés surtout par les bots et webhooks.' },
        { q: 'Les emojis personnalisés et le Markdown comptent-ils dans la limite ?', a: 'Oui. Le Markdown, les liens et les codes d’emoji personnalisés comme :smile: comptent comme des caractères. Ce compteur les compte exactement comme Discord.' },
        { q: 'Mon message est-il envoyé quelque part ?', a: 'Non. Le comptage se fait entièrement dans votre navigateur — rien de ce que vous tapez n’est envoyé à un serveur, vos brouillons restent privés.' },
      ],
      pt: [
        { q: 'Qual é o limite de caracteres de uma mensagem do Discord?', a: '2000 caracteres para contas padrão e 4000 para subscritores do Discord Nitro. Este contador segue o valor padrão de 2000.' },
        { q: 'Qual é o limite de caracteres de um embed do Discord?', a: 'Os embeds têm limites próprios: descrição até 4096 caracteres, título 256 e 6000 no total por embed — usados sobretudo por bots e webhooks.' },
        { q: 'Os emojis personalizados e o Markdown contam para o limite?', a: 'Sim. O Markdown, as ligações e os códigos de emoji personalizados como :smile: contam como caracteres. Este contador conta-os exatamente como o Discord.' },
        { q: 'A minha mensagem é enviada para algum lado?', a: 'Não. A contagem acontece inteiramente no seu navegador — nada do que escrever é enviado para um servidor, por isso os seus rascunhos permanecem privados.' },
      ],
      it: [
        { q: 'Qual è il limite di caratteri di un messaggio Discord?', a: '2.000 caratteri per gli account standard e 4.000 per gli abbonati Discord Nitro. Questo contatore segue il valore predefinito di 2.000.' },
        { q: 'Qual è il limite di caratteri di un embed Discord?', a: 'Gli embed hanno limiti propri: descrizione fino a 4.096 caratteri, titolo 256 e 6.000 totali per embed — usati soprattutto da bot e webhook.' },
        { q: 'Le emoji personalizzate e il Markdown contano nel limite?', a: 'Sì. Markdown, link e codici di emoji personalizzate come :smile: contano come caratteri. Questo contatore li conta esattamente come Discord.' },
        { q: 'Il mio messaggio viene caricato da qualche parte?', a: 'No. Il conteggio avviene interamente nel tuo browser — nulla di ciò che scrivi viene inviato a un server, quindi le tue bozze restano private.' },
      ],
      nl: [
        { q: 'Wat is de tekenlimiet voor een Discord-bericht?', a: '2.000 tekens voor standaardaccounts en 4.000 voor Discord Nitro-abonnees. Deze teller volgt de standaard van 2.000.' },
        { q: 'Wat is de tekenlimiet voor een Discord-embed?', a: 'Embeds hebben eigen limieten: beschrijving tot 4.096 tekens, titel 256 en 6.000 totaal per embed — vooral gebruikt door bots en webhooks.' },
        { q: 'Tellen aangepaste emoji en Markdown mee voor de limiet?', a: 'Ja. Markdown, links en aangepaste emoji-shortcodes zoals :smile: tellen als tekens. Deze teller telt ze precies zoals Discord dat doet.' },
        { q: 'Wordt mijn bericht ergens geüpload?', a: 'Nee. Het tellen gebeurt volledig in je browser — niets van wat je typt wordt naar een server gestuurd, dus je concepten blijven privé.' },
      ],
      ja: [
        { q: 'Discord のメッセージの文字数上限は？', a: '標準アカウントで2,000文字、Discord Nitro 加入者で4,000文字です。本カウンターは既定の2,000を追跡します。' },
        { q: 'Discord の埋め込みの文字数上限は？', a: '埋め込みには別の上限があります。説明は最大4,096文字、タイトル256文字、埋め込み全体で6,000文字。主にボットや Webhook で使われます。' },
        { q: 'カスタム絵文字や Markdown は上限に数えられますか？', a: 'はい。Markdown・リンク・:smile: のようなカスタム絵文字コードはすべて文字として数えられます。本カウンターは Discord と同じように数えます。' },
        { q: 'メッセージはどこかにアップロードされますか？', a: 'いいえ。カウントはすべてブラウザー内で行われ、入力内容はサーバーに送信されません。下書きは非公開のままです。' },
      ],
      zh: [
        { q: 'Discord 消息的字符上限是多少？', a: '标准账户为 2,000 个字符，Discord Nitro 订阅者为 4,000 个。本计数器跟踪 2,000 的默认值。' },
        { q: 'Discord 嵌入的字符上限是多少？', a: '嵌入有各自的上限：说明最多 4,096 个字符，标题 256 个，单个嵌入合计 6,000 个——主要由机器人和 Webhook 使用。' },
        { q: '自定义表情和 Markdown 计入上限吗？', a: '计入。Markdown、链接和像 :smile: 这样的自定义表情代码都计为字符。本计数器与 Discord 的计法完全一致。' },
        { q: '我的消息会被上传吗？', a: '不会。统计完全在你的浏览器中进行——你输入的内容不会发送到服务器，因此草稿保持私密。' },
      ],
      da: [
        { q: 'Hvad er tegngrænsen for en Discord-besked?', a: '2.000 tegn for standardkonti og 4.000 for Discord Nitro-abonnenter. Denne tæller følger standarden på 2.000.' },
        { q: 'Hvad er tegngrænsen for en Discord-embed?', a: 'Embeds har egne grænser: beskrivelse op til 4.096 tegn, titel 256 og 6.000 i alt pr. embed — bruges mest af bots og webhooks.' },
        { q: 'Tæller brugerdefinerede emojis og Markdown med i grænsen?', a: 'Ja. Markdown, links og brugerdefinerede emoji-koder som :smile: tæller som tegn. Denne tæller tæller dem præcis som Discord.' },
        { q: 'Bliver min besked uploadet nogen steder?', a: 'Nej. Optællingen kører helt i din browser — intet af det, du skriver, sendes til en server, så dine udkast forbliver private.' },
      ],
    },
  },
  {
    id: 'whatsapp',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'WhatsApp text status 700 chars; profile About 139 chars',

    slugs: {
      en: 'whatsapp-character-counter',
      es: 'contador-caracteres-whatsapp',
      de: 'whatsapp-zeichenzaehler',
      fr: 'compteur-caracteres-whatsapp',
      pt: 'contador-caracteres-whatsapp',
      it: 'contatore-caratteri-whatsapp',
      nl: 'whatsapp-tekenteller',
      ja: 'whatsapp-moji-kaunta',
      zh: 'whatsapp-zi-fu-ji-shu',
      da: 'whatsapp-tegntaeller',
    },

    schemaName: {
      en: 'WhatsApp Character Counter',
      es: 'Contador de Caracteres de WhatsApp',
      de: 'WhatsApp Zeichenzähler',
      fr: 'Compteur de Caractères WhatsApp',
      pt: 'Contador de Caracteres do WhatsApp',
      it: 'Contatore di Caratteri WhatsApp',
      nl: 'WhatsApp Tekenteller',
      ja: 'WhatsApp 文字数カウンター',
      zh: 'WhatsApp 字符计数器',
      da: 'WhatsApp Tegntæller',
    },

    titles: {
      en: 'WhatsApp Character Counter — Status & About Limit Checker',
      es: 'Contador de Caracteres de WhatsApp — Límites de estado e información',
      de: 'WhatsApp Zeichenzähler — Status- & Info-Limit prüfen',
      fr: 'Compteur de Caractères WhatsApp — Limites de statut et d’infos',
      pt: 'Contador de Caracteres do WhatsApp — Limites de estado e informação',
      it: 'Contatore di Caratteri WhatsApp — Limiti di stato e informazioni',
      nl: 'WhatsApp Tekenteller — Status- & info-limiet checken',
      ja: 'WhatsApp 文字数カウンター — ステータス・自己紹介の上限チェック',
      zh: 'WhatsApp 字符计数器 — 状态与简介上限检查',
      da: 'WhatsApp Tegntæller — Tjek status- & om-grænse',
    },

    metaDescriptions: {
      en: 'Free WhatsApp character counter. Check your text status against the 700-character limit and profile About against 139 characters, live as you type.',
      es: 'Contador de caracteres de WhatsApp gratuito. Comprueba tu estado de texto frente al límite de 700 caracteres y la información del perfil frente a 139, en vivo.',
      de: 'Kostenloser WhatsApp-Zeichenzähler. Prüfe deinen Text-Status gegen das 700-Zeichen-Limit und die Profil-Info gegen 139 Zeichen – live beim Tippen.',
      fr: 'Compteur de caractères WhatsApp gratuit. Vérifiez votre statut texte (limite de 700 caractères) et vos infos de profil (139 caractères) en direct.',
      pt: 'Contador de caracteres do WhatsApp gratuito. Verifique o seu estado de texto face ao limite de 700 caracteres e a informação do perfil face a 139, ao vivo.',
      it: 'Contatore di caratteri WhatsApp gratuito. Controlla il tuo stato di testo sul limite di 700 caratteri e le informazioni del profilo su 139, in tempo reale.',
      nl: 'Gratis WhatsApp-tekenteller. Controleer je tekststatus tegen de limiet van 700 tekens en je profielinfo tegen 139 tekens, live tijdens het typen.',
      ja: '無料の WhatsApp 文字数カウンター。テキストのステータスを700文字、プロフィールの自己紹介を139文字の上限に対してリアルタイムでチェックできます。',
      zh: '免费的 WhatsApp 字符计数器。在你输入时实时检查文字状态是否在 700 字符以内、个人简介是否在 139 字符以内。',
      da: 'Gratis WhatsApp-tegntæller. Tjek din tekststatus mod grænsen på 700 tegn og profil-info mod 139 tegn, live mens du skriver.',
    },

    intro: {
      en: 'Check your WhatsApp text status and profile About against WhatsApp’s real character limits before you publish. Type below — the counters update live and flag anything over the limit.',
      es: 'Comprueba tu estado de texto y la información de tu perfil de WhatsApp frente a los límites reales antes de publicar. Escribe abajo: los contadores se actualizan en vivo y avisan si te pasas.',
      de: 'Prüfe deinen Text-Status und deine Profil-Info bei WhatsApp vor dem Veröffentlichen gegen die echten Limits. Tippe unten – die Zähler aktualisieren sich live und markieren Überschreitungen.',
      fr: 'Vérifiez votre statut texte et vos infos de profil WhatsApp selon les vraies limites avant de publier. Saisissez ci-dessous : les compteurs se mettent à jour en direct et signalent tout dépassement.',
      pt: 'Verifique o seu estado de texto e a informação do perfil do WhatsApp face aos limites reais antes de publicar. Escreva abaixo: os contadores atualizam-se ao vivo e assinalam excessos.',
      it: 'Controlla il tuo stato di testo e le informazioni del profilo WhatsApp sui limiti reali prima di pubblicare. Scrivi qui sotto: i contatori si aggiornano in tempo reale e segnalano gli eccessi.',
      nl: 'Controleer je tekststatus en profielinfo van WhatsApp tegen de echte limieten voordat je plaatst. Typ hieronder — de tellers werken live bij en markeren alles boven de limiet.',
      ja: '公開前に、WhatsApp の実際の上限に対してテキストのステータスとプロフィールの自己紹介をチェックしましょう。下に入力すると、カウンターがリアルタイムで更新され、超過を知らせます。',
      zh: '发布前，用 WhatsApp 的真实上限检查你的文字状态和个人简介。在下方输入——计数器会实时更新并标记任何超限内容。',
      da: 'Tjek din tekststatus og profil-info på WhatsApp mod de reelle grænser, før du udgiver. Skriv nedenfor — tællerne opdateres live og markerer alt over grænsen.',
    },

    content: {
      en: `<h2>WhatsApp character limits</h2>
<p>WhatsApp keeps two short fields tight: a text <strong>Status</strong> allows up to <strong>700 characters</strong>, and your profile <strong>About</strong> line allows just <strong>139 characters</strong>. (Regular chat messages can run to about 65,000 characters, so they’re rarely the constraint.) This tool counts your Status and About live so they fit without being cut off.</p>
<h2>Writing a text status</h2>
<p>A WhatsApp text Status disappears after 24 hours and shows on a colored background, so keep it punchy. With 700 characters you have room for a short update or announcement, but the most-read statuses are a line or two. Lead with the point, and remember emoji count as characters too.</p>
<h2>The 139-character About line</h2>
<p>The About (profile) line is tiny — just 139 characters — so it works best as a short tagline, availability note, or a single emoji plus a few words. Because it’s so short, every character counts, and emoji eat into the limit quickly. The live counter shows exactly how much room is left.</p>
<h2>Private and instant</h2>
<p>Type or paste your Status and About text to see character counts and remaining space at a glance. Everything runs in your browser, so nothing you type is uploaded. Trim until both fit WhatsApp’s limits, then copy them across.</p>`,
      es: `<h2>Límites de caracteres de WhatsApp</h2>
<p>WhatsApp mantiene cortos dos campos: un <strong>estado</strong> de texto permite hasta <strong>700 caracteres</strong> y la línea de <strong>información</strong> de tu perfil permite solo <strong>139 caracteres</strong>. (Los mensajes de chat normales pueden llegar a unos 65 000 caracteres, así que rara vez son la limitación.) Esta herramienta cuenta tu estado y tu información en vivo para que quepan sin cortarse.</p>
<h2>Escribir un estado de texto</h2>
<p>Un estado de texto de WhatsApp desaparece tras 24 horas y se muestra sobre un fondo de color, así que mantenlo directo. Con 700 caracteres tienes espacio para una actualización o un aviso breve, pero los estados más leídos son de una o dos líneas. Empieza por la idea y recuerda que los emojis también cuentan como caracteres.</p>
<h2>La línea de información de 139 caracteres</h2>
<p>La línea de información (perfil) es diminuta —solo 139 caracteres—, así que funciona mejor como un lema corto, una nota de disponibilidad o un emoji con unas pocas palabras. Como es tan corta, cada carácter cuenta, y los emojis consumen el límite rápido. El contador en vivo muestra exactamente cuánto espacio queda.</p>
<h2>Privado e instantáneo</h2>
<p>Escribe o pega tu estado y tu información para ver el número de caracteres y el espacio restante de un vistazo. Todo funciona en tu navegador, así que nada de lo que escribas se sube. Recorta hasta que ambos quepan en los límites de WhatsApp y cópialos.</p>`,
      de: `<h2>WhatsApp-Zeichenlimits</h2>
<p>WhatsApp hält zwei kurze Felder knapp: ein Text-<strong>Status</strong> erlaubt bis zu <strong>700 Zeichen</strong>, und die <strong>Info</strong>-Zeile deines Profils erlaubt nur <strong>139 Zeichen</strong>. (Normale Chat-Nachrichten können bis zu rund 65.000 Zeichen lang sein, daher sind sie selten die Einschränkung.) Dieses Tool zählt deinen Status und deine Info live, damit sie passen, ohne abgeschnitten zu werden.</p>
<h2>Einen Text-Status schreiben</h2>
<p>Ein WhatsApp-Text-Status verschwindet nach 24 Stunden und erscheint auf farbigem Hintergrund, also halte ihn prägnant. Mit 700 Zeichen hast du Platz für ein kurzes Update oder eine Ankündigung, aber die meistgelesenen Status sind ein bis zwei Zeilen. Beginne mit dem Punkt und denke daran, dass Emojis ebenfalls als Zeichen zählen.</p>
<h2>Die 139-Zeichen-Info-Zeile</h2>
<p>Die Info-Zeile (Profil) ist winzig – nur 139 Zeichen – und funktioniert daher am besten als kurzer Slogan, Verfügbarkeitshinweis oder ein Emoji plus ein paar Wörter. Weil sie so kurz ist, zählt jedes Zeichen, und Emojis fressen das Limit schnell auf. Der Live-Zähler zeigt genau, wie viel Platz bleibt.</p>
<h2>Privat und sofort</h2>
<p>Tippe oder füge deinen Status und deine Info ein, um Zeichenzahl und verbleibenden Platz auf einen Blick zu sehen. Alles läuft in deinem Browser, also wird nichts hochgeladen. Kürze, bis beide in WhatsApps Limits passen, und kopiere sie.</p>`,
      fr: `<h2>Limites de caractères WhatsApp</h2>
<p>WhatsApp garde deux champs courts : un <strong>statut</strong> texte autorise jusqu’à <strong>700 caractères</strong>, et la ligne <strong>infos</strong> de votre profil n’autorise que <strong>139 caractères</strong>. (Les messages de chat ordinaires peuvent atteindre environ 65 000 caractères, ils sont donc rarement la contrainte.) Cet outil compte votre statut et vos infos en direct pour qu’ils tiennent sans être coupés.</p>
<h2>Rédiger un statut texte</h2>
<p>Un statut texte WhatsApp disparaît après 24 heures et s’affiche sur un fond coloré : restez percutant. Avec 700 caractères, vous avez de la place pour une courte mise à jour ou une annonce, mais les statuts les plus lus font une ou deux lignes. Commencez par l’essentiel, et rappelez-vous que les emojis comptent aussi comme des caractères.</p>
<h2>La ligne d’infos de 139 caractères</h2>
<p>La ligne d’infos (profil) est minuscule — seulement 139 caractères — et fonctionne donc mieux comme un slogan court, une note de disponibilité ou un emoji plus quelques mots. Comme elle est si courte, chaque caractère compte, et les emojis grignotent vite la limite. Le compteur en direct montre exactement l’espace restant.</p>
<h2>Privé et instantané</h2>
<p>Tapez ou collez votre statut et vos infos pour voir le nombre de caractères et l’espace restant d’un coup d’œil. Tout fonctionne dans votre navigateur : rien de ce que vous tapez n’est envoyé. Réduisez jusqu’à ce que les deux tiennent dans les limites de WhatsApp, puis copiez-les.</p>`,
      pt: `<h2>Limites de caracteres do WhatsApp</h2>
<p>O WhatsApp mantém dois campos curtos: um <strong>estado</strong> de texto permite até <strong>700 caracteres</strong> e a linha <strong>informação</strong> do seu perfil permite apenas <strong>139 caracteres</strong>. (As mensagens de chat normais podem chegar a cerca de 65 000 caracteres, por isso raramente são a limitação.) Esta ferramenta conta o seu estado e a sua informação ao vivo para que caibam sem serem cortados.</p>
<h2>Escrever um estado de texto</h2>
<p>Um estado de texto do WhatsApp desaparece após 24 horas e aparece sobre um fundo colorido, por isso mantenha-o direto. Com 700 caracteres tem espaço para uma atualização curta ou um anúncio, mas os estados mais lidos têm uma ou duas linhas. Comece pela ideia e lembre-se de que os emojis também contam como caracteres.</p>
<h2>A linha de informação de 139 caracteres</h2>
<p>A linha de informação (perfil) é minúscula — apenas 139 caracteres — por isso funciona melhor como um slogan curto, uma nota de disponibilidade ou um emoji com algumas palavras. Como é tão curta, cada caractere conta, e os emojis consomem o limite depressa. O contador ao vivo mostra exatamente quanto espaço resta.</p>
<h2>Privado e instantâneo</h2>
<p>Escreva ou cole o seu estado e a sua informação para ver a contagem de caracteres e o espaço restante de relance. Tudo corre no seu navegador, por isso nada do que escrever é enviado. Corte até ambos caberem nos limites do WhatsApp e copie-os.</p>`,
      it: `<h2>Limiti di caratteri di WhatsApp</h2>
<p>WhatsApp tiene stretti due campi: uno <strong>stato</strong> di testo consente fino a <strong>700 caratteri</strong> e la riga <strong>informazioni</strong> del tuo profilo ne consente solo <strong>139</strong>. (I normali messaggi di chat possono arrivare a circa 65.000 caratteri, quindi raramente sono il vincolo.) Questo strumento conta stato e informazioni in tempo reale così da farli stare senza tagli.</p>
<h2>Scrivere uno stato di testo</h2>
<p>Uno stato di testo di WhatsApp scompare dopo 24 ore e appare su uno sfondo colorato, quindi tienilo incisivo. Con 700 caratteri hai spazio per un breve aggiornamento o un annuncio, ma gli stati più letti sono di una o due righe. Inizia dal punto e ricorda che anche le emoji contano come caratteri.</p>
<h2>La riga informazioni da 139 caratteri</h2>
<p>La riga informazioni (profilo) è minuscola — solo 139 caratteri — quindi funziona meglio come un breve slogan, una nota di disponibilità o un’emoji più qualche parola. Poiché è così corta, ogni carattere conta e le emoji consumano in fretta il limite. Il contatore in tempo reale mostra esattamente quanto spazio resta.</p>
<h2>Privato e istantaneo</h2>
<p>Scrivi o incolla il tuo stato e le informazioni per vedere il conteggio dei caratteri e lo spazio rimasto a colpo d’occhio. Tutto avviene nel tuo browser, quindi nulla di ciò che scrivi viene caricato. Riduci finché entrambi rientrano nei limiti di WhatsApp, poi copiali.</p>`,
      nl: `<h2>WhatsApp-tekenlimieten</h2>
<p>WhatsApp houdt twee velden kort: een tekst<strong>status</strong> staat tot <strong>700 tekens</strong> toe en de <strong>info</strong>-regel van je profiel slechts <strong>139 tekens</strong>. (Gewone chatberichten kunnen oplopen tot ongeveer 65.000 tekens, dus die zijn zelden de beperking.) Deze tool telt je status en info live zodat ze passen zonder afgekapt te worden.</p>
<h2>Een tekststatus schrijven</h2>
<p>Een WhatsApp-tekststatus verdwijnt na 24 uur en verschijnt op een gekleurde achtergrond, dus houd het pittig. Met 700 tekens heb je ruimte voor een korte update of aankondiging, maar de meest gelezen statussen zijn een regel of twee. Begin met het punt, en onthoud dat emoji ook als tekens tellen.</p>
<h2>De info-regel van 139 tekens</h2>
<p>De info-regel (profiel) is piepklein — slechts 139 tekens — dus werkt het best als een korte slogan, beschikbaarheidsnotitie of één emoji plus een paar woorden. Omdat hij zo kort is, telt elk teken, en emoji vreten de limiet snel op. De live teller laat precies zien hoeveel ruimte er over is.</p>
<h2>Privé en direct</h2>
<p>Typ of plak je status en info om het aantal tekens en de resterende ruimte in één oogopslag te zien. Alles draait in je browser, dus niets van wat je typt wordt geüpload. Snoei tot beide binnen WhatsApps limieten passen en kopieer ze.</p>`,
      ja: `<h2>WhatsApp の文字数制限</h2>
<p>WhatsApp は2つの短い項目をタイトに保ちます。テキストの<strong>ステータス</strong>は最大<strong>700文字</strong>、プロフィールの<strong>自己紹介</strong>はわずか<strong>139文字</strong>です。（通常のチャットメッセージは約65,000文字まで使えるので、制約になることはほとんどありません。）本ツールはステータスと自己紹介をリアルタイムで数え、切れずに収まるようにします。</p>
<h2>テキストステータスの書き方</h2>
<p>WhatsApp のテキストステータスは24時間で消え、色付きの背景に表示されるので、簡潔にしましょう。700文字あれば短い近況やお知らせを書けますが、最もよく読まれるのは1〜2行です。要点から始め、絵文字も文字として数えられることを忘れずに。</p>
<h2>139文字の自己紹介</h2>
<p>自己紹介（プロフィール）はごく短く、わずか139文字なので、短いキャッチフレーズ・在席メモ・絵文字1つと数語が向いています。とても短いため一文字一文字が重要で、絵文字はすぐ上限を消費します。ライブカウンターが残り容量を正確に表示します。</p>
<h2>プライベートで即時</h2>
<p>ステータスと自己紹介を入力または貼り付けると、文字数と残り容量がひと目でわかります。すべてブラウザー内で動作するため、入力内容はアップロードされません。両方が WhatsApp の上限内に収まるよう調整してコピーしましょう。</p>`,
      zh: `<h2>WhatsApp 字符限制</h2>
<p>WhatsApp 让两个字段保持简短：文字<strong>状态</strong>最多 <strong>700 个字符</strong>，个人资料的<strong>简介</strong>行仅 <strong>139 个字符</strong>。（普通聊天消息最多可达约 65,000 个字符，所以很少成为限制。）本工具实时统计你的状态和简介，让它们不被截断地放下。</p>
<h2>撰写文字状态</h2>
<p>WhatsApp 的文字状态会在 24 小时后消失，并显示在彩色背景上，所以要简洁有力。700 个字符足以写一条简短的更新或公告，但最常被阅读的状态只有一两行。先抛出要点，并记住表情也计为字符。</p>
<h2>139 字符的简介行</h2>
<p>简介（个人资料）行非常短——只有 139 个字符——所以最适合做简短标语、在线状态说明，或一个表情加几个词。由于太短，每个字符都很重要，而表情会很快用掉上限。实时计数器会准确显示还剩多少空间。</p>
<h2>私密且即时</h2>
<p>输入或粘贴你的状态和简介，即可一眼看到字符数和剩余空间。一切都在你的浏览器中运行，因此你输入的内容不会被上传。修剪到两者都在 WhatsApp 限制内，然后复制过去。</p>`,
      da: `<h2>WhatsApp-tegngrænser</h2>
<p>WhatsApp holder to felter korte: en tekst<strong>status</strong> tillader op til <strong>700 tegn</strong>, og <strong>om</strong>-linjen på din profil tillader kun <strong>139 tegn</strong>. (Almindelige chatbeskeder kan nå op på omkring 65.000 tegn, så de er sjældent begrænsningen.) Dette værktøj tæller din status og din om-tekst live, så de passer uden at blive afkortet.</p>
<h2>Skriv en tekststatus</h2>
<p>En WhatsApp-tekststatus forsvinder efter 24 timer og vises på en farvet baggrund, så hold den skarp. Med 700 tegn har du plads til en kort opdatering eller meddelelse, men de mest læste statusser er en linje eller to. Start med pointen, og husk, at emojis også tæller som tegn.</p>
<h2>Om-linjen på 139 tegn</h2>
<p>Om-linjen (profil) er lillebitte — kun 139 tegn — så den fungerer bedst som en kort slogan, en tilgængelighedsnote eller en enkelt emoji plus et par ord. Fordi den er så kort, tæller hvert tegn, og emojis spiser hurtigt grænsen op. Live-tælleren viser præcis, hvor meget plads der er tilbage.</p>
<h2>Privat og øjeblikkeligt</h2>
<p>Skriv eller indsæt din status og om-tekst for at se tegnantal og resterende plads med det samme. Alt kører i din browser, så intet af det, du skriver, uploades. Skær til, indtil begge passer inden for WhatsApps grænser, og kopier dem.</p>`,
    },

    faq: {
      en: [
        { q: 'What is the WhatsApp status character limit?', a: 'A text status allows up to 700 characters. Regular chat messages allow far more (around 65,000), so the status field is the one to watch.' },
        { q: 'What is the WhatsApp About character limit?', a: '139 characters for the profile About line. It’s short, so use a concise tagline; emoji count toward the 139.' },
        { q: 'Do emoji count toward WhatsApp limits?', a: 'Yes. Emoji and non-Latin characters all count toward the status and About limits. This counter counts them exactly as WhatsApp does.' },
        { q: 'Is my text uploaded anywhere?', a: 'No. Counting happens entirely in your browser — nothing you type is sent to a server, so your drafts stay private.' },
      ],
      es: [
        { q: '¿Cuál es el límite de caracteres del estado de WhatsApp?', a: 'Un estado de texto permite hasta 700 caracteres. Los mensajes de chat normales permiten mucho más (unos 65 000), así que el campo a vigilar es el estado.' },
        { q: '¿Cuál es el límite de caracteres de la información de WhatsApp?', a: '139 caracteres para la línea de información del perfil. Es corta, así que usa un lema conciso; los emojis cuentan para los 139.' },
        { q: '¿Los emojis cuentan para los límites de WhatsApp?', a: 'Sí. Los emojis y los caracteres no latinos cuentan para los límites de estado e información. Este contador los cuenta exactamente como WhatsApp.' },
        { q: '¿Se sube mi texto a algún sitio?', a: 'No. El conteo ocurre por completo en tu navegador: nada de lo que escribas se envía a un servidor, así que tus borradores son privados.' },
      ],
      de: [
        { q: 'Wie viele Zeichen darf ein WhatsApp-Status haben?', a: 'Ein Text-Status erlaubt bis zu 700 Zeichen. Normale Chat-Nachrichten erlauben weit mehr (rund 65.000), das Status-Feld ist also das zu beachtende.' },
        { q: 'Wie lang darf die WhatsApp-Info sein?', a: '139 Zeichen für die Profil-Info-Zeile. Sie ist kurz, nutze also einen prägnanten Slogan; Emojis zählen zu den 139.' },
        { q: 'Zählen Emojis zu den WhatsApp-Limits?', a: 'Ja. Emojis und nicht-lateinische Zeichen zählen zu den Status- und Info-Limits. Dieser Zähler zählt sie genau wie WhatsApp.' },
        { q: 'Wird mein Text irgendwo hochgeladen?', a: 'Nein. Das Zählen erfolgt vollständig in deinem Browser – nichts, was du tippst, wird an einen Server gesendet, deine Entwürfe bleiben privat.' },
      ],
      fr: [
        { q: 'Quelle est la limite de caractères du statut WhatsApp ?', a: 'Un statut texte autorise jusqu’à 700 caractères. Les messages de chat ordinaires en autorisent bien plus (environ 65 000), c’est donc le statut qu’il faut surveiller.' },
        { q: 'Quelle est la limite de caractères des infos WhatsApp ?', a: '139 caractères pour la ligne d’infos du profil. Elle est courte : utilisez un slogan concis ; les emojis comptent dans les 139.' },
        { q: 'Les emojis comptent-ils dans les limites WhatsApp ?', a: 'Oui. Les emojis et les caractères non latins comptent dans les limites de statut et d’infos. Ce compteur les compte exactement comme WhatsApp.' },
        { q: 'Mon texte est-il envoyé quelque part ?', a: 'Non. Le comptage se fait entièrement dans votre navigateur — rien de ce que vous tapez n’est envoyé à un serveur, vos brouillons restent privés.' },
      ],
      pt: [
        { q: 'Qual é o limite de caracteres do estado do WhatsApp?', a: 'Um estado de texto permite até 700 caracteres. As mensagens de chat normais permitem muito mais (cerca de 65 000), por isso o campo a vigiar é o estado.' },
        { q: 'Qual é o limite de caracteres da informação do WhatsApp?', a: '139 caracteres para a linha de informação do perfil. É curta, por isso use um slogan conciso; os emojis contam para os 139.' },
        { q: 'Os emojis contam para os limites do WhatsApp?', a: 'Sim. Os emojis e os caracteres não latinos contam para os limites de estado e informação. Este contador conta-os exatamente como o WhatsApp.' },
        { q: 'O meu texto é enviado para algum lado?', a: 'Não. A contagem acontece inteiramente no seu navegador — nada do que escrever é enviado para um servidor, por isso os seus rascunhos permanecem privados.' },
      ],
      it: [
        { q: 'Qual è il limite di caratteri dello stato di WhatsApp?', a: 'Uno stato di testo consente fino a 700 caratteri. I normali messaggi di chat ne consentono molti di più (circa 65.000), quindi il campo da tenere d’occhio è lo stato.' },
        { q: 'Qual è il limite di caratteri delle informazioni di WhatsApp?', a: '139 caratteri per la riga informazioni del profilo. È corta, quindi usa uno slogan conciso; le emoji contano nei 139.' },
        { q: 'Le emoji contano nei limiti di WhatsApp?', a: 'Sì. Le emoji e i caratteri non latini contano nei limiti di stato e informazioni. Questo contatore li conta esattamente come WhatsApp.' },
        { q: 'Il mio testo viene caricato da qualche parte?', a: 'No. Il conteggio avviene interamente nel tuo browser — nulla di ciò che scrivi viene inviato a un server, quindi le tue bozze restano private.' },
      ],
      nl: [
        { q: 'Wat is de tekenlimiet voor de WhatsApp-status?', a: 'Een tekststatus staat tot 700 tekens toe. Gewone chatberichten staan veel meer toe (ongeveer 65.000), dus de status is het veld om in de gaten te houden.' },
        { q: 'Wat is de tekenlimiet voor de WhatsApp-info?', a: '139 tekens voor de info-regel van het profiel. Hij is kort, dus gebruik een bondige slogan; emoji tellen mee voor de 139.' },
        { q: 'Tellen emoji mee voor de WhatsApp-limieten?', a: 'Ja. Emoji en niet-Latijnse tekens tellen mee voor de status- en info-limieten. Deze teller telt ze precies zoals WhatsApp dat doet.' },
        { q: 'Wordt mijn tekst ergens geüpload?', a: 'Nee. Het tellen gebeurt volledig in je browser — niets van wat je typt wordt naar een server gestuurd, dus je concepten blijven privé.' },
      ],
      ja: [
        { q: 'WhatsApp のステータスの文字数上限は？', a: 'テキストステータスは最大700文字です。通常のチャットメッセージはもっと多く（約65,000文字）使えるので、注意すべきはステータスです。' },
        { q: 'WhatsApp の自己紹介の文字数上限は？', a: 'プロフィールの自己紹介は139文字です。短いので簡潔なキャッチフレーズを。絵文字も139に数えられます。' },
        { q: '絵文字は WhatsApp の上限に数えられますか？', a: 'はい。絵文字や非ラテン文字はステータスと自己紹介の上限に数えられます。本カウンターは WhatsApp と同じように数えます。' },
        { q: 'テキストはどこかにアップロードされますか？', a: 'いいえ。カウントはすべてブラウザー内で行われ、入力内容はサーバーに送信されません。下書きは非公開のままです。' },
      ],
      zh: [
        { q: 'WhatsApp 状态的字符上限是多少？', a: '文字状态最多 700 个字符。普通聊天消息允许多得多（约 65,000），所以要关注的是状态字段。' },
        { q: 'WhatsApp 简介的字符上限是多少？', a: '个人资料简介行为 139 个字符。它很短，所以用简洁的标语；表情计入这 139 个。' },
        { q: '表情计入 WhatsApp 的上限吗？', a: '计入。表情和非拉丁字符都计入状态和简介的上限。本计数器与 WhatsApp 的计法完全一致。' },
        { q: '我的文本会被上传吗？', a: '不会。统计完全在你的浏览器中进行——你输入的内容不会发送到服务器，因此草稿保持私密。' },
      ],
      da: [
        { q: 'Hvad er tegngrænsen for WhatsApp-status?', a: 'En tekststatus tillader op til 700 tegn. Almindelige chatbeskeder tillader langt mere (omkring 65.000), så status-feltet er det, man skal holde øje med.' },
        { q: 'Hvad er tegngrænsen for WhatsApp-om?', a: '139 tegn til profilens om-linje. Den er kort, så brug en kortfattet slogan; emojis tæller med i de 139.' },
        { q: 'Tæller emojis med i WhatsApps grænser?', a: 'Ja. Emojis og ikke-latinske tegn tæller med i status- og om-grænserne. Denne tæller tæller dem præcis som WhatsApp.' },
        { q: 'Bliver min tekst uploadet nogen steder?', a: 'Nej. Optællingen kører helt i din browser — intet af det, du skriver, sendes til en server, så dine udkast forbliver private.' },
      ],
    },
  },
  {
    id: 'sentence-counter',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-14',
    platformLimits: 'Sentences end at . ! ? … and 。！？; paragraphs split on blank lines',

    slugs: {
      en: 'sentence-counter',
      es: 'contador-de-frases',
      de: 'satzzaehler',
      fr: 'compteur-de-phrases',
      pt: 'contador-de-frases',
      it: 'contatore-di-frasi',
      nl: 'zinnenteller',
      ja: 'bun-kazu-kaunta',
      zh: 'ju-zi-ji-shu',
      da: 'saetningstaeller',
    },

    schemaName: {
      en: 'Sentence & Paragraph Counter',
      es: 'Contador de Frases y Párrafos',
      de: 'Satz- & Absatzzähler',
      fr: 'Compteur de Phrases et de Paragraphes',
      pt: 'Contador de Frases e Parágrafos',
      it: 'Contatore di Frasi e Paragrafi',
      nl: 'Zinnen- en Alineateller',
      ja: '文・段落カウンター',
      zh: '句子和段落计数器',
      da: 'Sætnings- & Afsnitstæller',
    },

    titles: {
      en: 'Sentence Counter — Count Sentences & Paragraphs Online',
      es: 'Contador de Frases — Cuenta frases y párrafos en línea',
      de: 'Satzzähler — Sätze & Absätze online zählen',
      fr: 'Compteur de Phrases — Comptez phrases et paragraphes en ligne',
      pt: 'Contador de Frases — Conte frases e parágrafos online',
      it: 'Contatore di Frasi — Conta frasi e paragrafi online',
      nl: 'Zinnenteller — Tel zinnen en alinea’s online',
      ja: '文カウンター — 文と段落をオンラインで数える',
      zh: '句子计数器 — 在线统计句子和段落',
      da: 'Sætningstæller — Tæl sætninger og afsnit online',
    },

    metaDescriptions: {
      en: 'Free sentence and paragraph counter. Paste text to count sentences, paragraphs, words, and characters live as you type.',
      es: 'Contador de frases y párrafos gratuito. Pega texto para contar frases, párrafos, palabras y caracteres en vivo mientras escribes.',
      de: 'Kostenloser Satz- und Absatzzähler. Text einfügen, um Sätze, Absätze, Wörter und Zeichen live beim Tippen zu zählen.',
      fr: 'Compteur de phrases et de paragraphes gratuit. Collez du texte pour compter phrases, paragraphes, mots et caractères en direct.',
      pt: 'Contador de frases e parágrafos gratuito. Cole texto para contar frases, parágrafos, palavras e caracteres ao vivo enquanto escreve.',
      it: 'Contatore di frasi e paragrafi gratuito. Incolla testo per contare frasi, paragrafi, parole e caratteri in tempo reale.',
      nl: 'Gratis zinnen- en alineateller. Plak tekst om zinnen, alinea’s, woorden en tekens live te tellen tijdens het typen.',
      ja: '無料の文・段落カウンター。テキストを貼り付けると、文・段落・単語・文字数をリアルタイムで数えます。',
      zh: '免费的句子和段落计数器。粘贴文本即可在输入时实时统计句子、段落、字数和字符数。',
      da: 'Gratis sætnings- og afsnitstæller. Indsæt tekst for at tælle sætninger, afsnit, ord og tegn live, mens du skriver.',
    },

    intro: {
      en: 'Count the sentences and paragraphs in any text — plus words and characters — instantly. Paste your text below and the counts update live as you type.',
      es: 'Cuenta al instante las frases y los párrafos de cualquier texto, además de palabras y caracteres. Pega tu texto abajo y los recuentos se actualizan en vivo mientras escribes.',
      de: 'Zähle Sätze und Absätze in einem beliebigen Text – plus Wörter und Zeichen – sofort. Füge deinen Text unten ein, und die Zähler aktualisieren sich live beim Tippen.',
      fr: 'Comptez instantanément les phrases et les paragraphes de n’importe quel texte, ainsi que les mots et les caractères. Collez votre texte ci-dessous : les compteurs se mettent à jour en direct.',
      pt: 'Conte instantaneamente as frases e os parágrafos de qualquer texto, além de palavras e caracteres. Cole o seu texto abaixo e os contadores atualizam-se ao vivo enquanto escreve.',
      it: 'Conta all’istante frasi e paragrafi di qualsiasi testo, oltre a parole e caratteri. Incolla il testo qui sotto e i contatori si aggiornano in tempo reale mentre scrivi.',
      nl: 'Tel direct de zinnen en alinea’s in een tekst — plus woorden en tekens. Plak je tekst hieronder en de tellers werken live bij tijdens het typen.',
      ja: '任意のテキストの文と段落を、単語数・文字数とあわせて即座に数えます。下にテキストを貼り付けると、入力中にカウントがリアルタイムで更新されます。',
      zh: '即时统计任意文本的句子和段落，以及字数和字符数。在下方粘贴文本，计数会在你输入时实时更新。',
      da: 'Tæl øjeblikkeligt sætninger og afsnit i en hvilken som helst tekst — plus ord og tegn. Indsæt din tekst nedenfor, og tællerne opdateres live, mens du skriver.',
    },

    content: {
      en: `<h2>How sentences and paragraphs are counted</h2>
<p>A <strong>sentence</strong> ends with terminating punctuation — a period, question mark, or exclamation mark (and the equivalents in other scripts). A <strong>paragraph</strong> is a block of text separated from the next by a blank line. This tool counts both as you type, alongside word and character totals, so you can see the structure of your writing at a glance.</p>
<h2>Why count sentences and paragraphs?</h2>
<p>Sentence and paragraph counts are a quick proxy for readability. Long, run-on sentences and giant paragraphs are harder to read, while a healthy mix of shorter sentences and well-spaced paragraphs keeps readers moving. Writers use these counts to meet assignment structures, trim overlong paragraphs for the web, and check that an essay or article flows in digestible chunks.</p>
<h2>What counts as a sentence</h2>
<p>The counter treats <strong>. ! ?</strong> and ellipses as sentence endings, and recognizes the CJK terminators 。！？ for Chinese, Japanese, and Korean text. To avoid false splits, a period followed by a digit (like 3.14) isn’t treated as a sentence end. Abbreviations such as “U.S.A.” can still nudge the count, so treat the sentence total as a close estimate rather than an exact parse.</p>
<h2>Private and instant</h2>
<p>Paste an essay, article, or any block of text to see its sentences, paragraphs, words, and characters update live. Everything runs in your browser, so nothing you type is uploaded — safe for drafts and unpublished work. Use the counts to tighten structure before you publish.</p>`,
      es: `<h2>Cómo se cuentan las frases y los párrafos</h2>
<p>Una <strong>frase</strong> termina con puntuación de cierre: un punto, un signo de interrogación o de exclamación (y sus equivalentes en otros sistemas de escritura). Un <strong>párrafo</strong> es un bloque de texto separado del siguiente por una línea en blanco. Esta herramienta cuenta ambos mientras escribes, junto con el total de palabras y caracteres, para que veas la estructura de tu texto de un vistazo.</p>
<h2>¿Por qué contar frases y párrafos?</h2>
<p>El recuento de frases y párrafos es un indicador rápido de legibilidad. Las frases largas e interminables y los párrafos enormes cuestan más de leer, mientras que una buena mezcla de frases cortas y párrafos bien espaciados mantiene al lector avanzando. Quien escribe usa estos recuentos para cumplir estructuras de trabajos, recortar párrafos demasiado largos para la web y comprobar que un ensayo o artículo fluye en bloques digeribles.</p>
<h2>Qué cuenta como una frase</h2>
<p>El contador trata <strong>. ! ?</strong> y los puntos suspensivos como finales de frase, y reconoce los terminadores CJK 。！？ para textos en chino, japonés y coreano. Para evitar divisiones falsas, un punto seguido de un dígito (como 3,14) no se considera fin de frase. Las abreviaturas como «EE. UU.» pueden alterar ligeramente el recuento, así que trata el total de frases como una estimación cercana, no como un análisis exacto.</p>
<h2>Privado e instantáneo</h2>
<p>Pega un ensayo, un artículo o cualquier bloque de texto para ver sus frases, párrafos, palabras y caracteres actualizándose en vivo. Todo funciona en tu navegador, así que nada de lo que escribas se sube: seguro para borradores y trabajos sin publicar. Usa los recuentos para afinar la estructura antes de publicar.</p>`,
      de: `<h2>Wie Sätze und Absätze gezählt werden</h2>
<p>Ein <strong>Satz</strong> endet mit Schlusszeichen – Punkt, Frage- oder Ausrufezeichen (und den Entsprechungen in anderen Schriften). Ein <strong>Absatz</strong> ist ein Textblock, der durch eine Leerzeile vom nächsten getrennt ist. Dieses Tool zählt beide beim Tippen, zusammen mit Wort- und Zeichenzahl, sodass du die Struktur deines Textes auf einen Blick siehst.</p>
<h2>Warum Sätze und Absätze zählen?</h2>
<p>Satz- und Absatzzahlen sind ein schneller Indikator für Lesbarkeit. Lange Schachtelsätze und riesige Absätze sind schwerer zu lesen, während eine gesunde Mischung aus kürzeren Sätzen und gut gegliederten Absätzen die Leser im Fluss hält. Schreibende nutzen diese Zahlen, um Vorgaben zu erfüllen, zu lange Absätze fürs Web zu kürzen und zu prüfen, ob ein Aufsatz oder Artikel in verdaulichen Häppchen fließt.</p>
<h2>Was als Satz zählt</h2>
<p>Der Zähler behandelt <strong>. ! ?</strong> und Auslassungspunkte als Satzenden und erkennt die CJK-Schlusszeichen 。！？ für chinesische, japanische und koreanische Texte. Um falsche Trennungen zu vermeiden, gilt ein Punkt vor einer Ziffer (wie 3,14) nicht als Satzende. Abkürzungen wie „z. B.“ können die Zahl dennoch verschieben, betrachte das Satzergebnis also als nahe Schätzung statt als exakte Analyse.</p>
<h2>Privat und sofort</h2>
<p>Füge einen Aufsatz, Artikel oder beliebigen Textblock ein, um Sätze, Absätze, Wörter und Zeichen live zu sehen. Alles läuft in deinem Browser, also wird nichts hochgeladen – sicher für Entwürfe und unveröffentlichte Arbeiten. Nutze die Zahlen, um die Struktur vor dem Veröffentlichen zu straffen.</p>`,
      fr: `<h2>Comment les phrases et les paragraphes sont comptés</h2>
<p>Une <strong>phrase</strong> se termine par une ponctuation finale — point, point d’interrogation ou d’exclamation (et leurs équivalents dans d’autres écritures). Un <strong>paragraphe</strong> est un bloc de texte séparé du suivant par une ligne vide. Cet outil compte les deux pendant que vous tapez, avec les totaux de mots et de caractères, pour voir la structure de votre texte d’un coup d’œil.</p>
<h2>Pourquoi compter phrases et paragraphes ?</h2>
<p>Le nombre de phrases et de paragraphes est un indicateur rapide de lisibilité. Les phrases longues et interminables et les paragraphes gigantesques sont plus difficiles à lire, tandis qu’un bon mélange de phrases courtes et de paragraphes bien aérés garde le lecteur en mouvement. Les rédacteurs s’en servent pour respecter une structure imposée, raccourcir des paragraphes trop longs pour le web et vérifier qu’un texte s’enchaîne en blocs digestes.</p>
<h2>Ce qui compte comme une phrase</h2>
<p>Le compteur considère <strong>. ! ?</strong> et les points de suspension comme des fins de phrase, et reconnaît les terminateurs CJK 。！？ pour les textes chinois, japonais et coréens. Pour éviter les fausses coupures, un point suivi d’un chiffre (comme 3,14) n’est pas traité comme une fin de phrase. Des abréviations comme « M. » peuvent tout de même décaler le total : considérez le nombre de phrases comme une estimation proche plutôt qu’une analyse exacte.</p>
<h2>Privé et instantané</h2>
<p>Collez une dissertation, un article ou n’importe quel bloc de texte pour voir ses phrases, paragraphes, mots et caractères se mettre à jour en direct. Tout fonctionne dans votre navigateur : rien de ce que vous tapez n’est envoyé — sûr pour les brouillons et les travaux non publiés. Servez-vous des compteurs pour resserrer la structure avant de publier.</p>`,
      pt: `<h2>Como as frases e os parágrafos são contados</h2>
<p>Uma <strong>frase</strong> termina com pontuação de fecho — ponto, ponto de interrogação ou de exclamação (e os equivalentes noutros sistemas de escrita). Um <strong>parágrafo</strong> é um bloco de texto separado do seguinte por uma linha em branco. Esta ferramenta conta ambos enquanto escreve, juntamente com o total de palavras e caracteres, para que veja a estrutura do seu texto num relance.</p>
<h2>Porquê contar frases e parágrafos?</h2>
<p>A contagem de frases e parágrafos é um indicador rápido de legibilidade. Frases longas e intermináveis e parágrafos enormes são mais difíceis de ler, enquanto uma boa mistura de frases curtas e parágrafos bem espaçados mantém o leitor a avançar. Quem escreve usa estas contagens para cumprir estruturas de trabalhos, encurtar parágrafos demasiado longos para a web e verificar se um ensaio ou artigo flui em blocos digeríveis.</p>
<h2>O que conta como uma frase</h2>
<p>O contador trata <strong>. ! ?</strong> e as reticências como fins de frase e reconhece os terminadores CJK 。！？ para textos em chinês, japonês e coreano. Para evitar divisões falsas, um ponto seguido de um dígito (como 3,14) não é tratado como fim de frase. Abreviaturas como «EUA» podem ainda assim alterar a contagem, por isso trate o total de frases como uma estimativa aproximada e não como uma análise exata.</p>
<h2>Privado e instantâneo</h2>
<p>Cole um ensaio, um artigo ou qualquer bloco de texto para ver as suas frases, parágrafos, palavras e caracteres a atualizar ao vivo. Tudo corre no seu navegador, por isso nada do que escrever é enviado — seguro para rascunhos e trabalhos não publicados. Use as contagens para apertar a estrutura antes de publicar.</p>`,
      it: `<h2>Come si contano frasi e paragrafi</h2>
<p>Una <strong>frase</strong> termina con punteggiatura di chiusura — punto, punto interrogativo o esclamativo (e gli equivalenti in altre scritture). Un <strong>paragrafo</strong> è un blocco di testo separato dal successivo da una riga vuota. Questo strumento conta entrambi mentre scrivi, insieme ai totali di parole e caratteri, così vedi la struttura del tuo testo a colpo d’occhio.</p>
<h2>Perché contare frasi e paragrafi?</h2>
<p>Il conteggio di frasi e paragrafi è un rapido indicatore di leggibilità. Frasi lunghe e interminabili e paragrafi enormi sono più difficili da leggere, mentre un buon mix di frasi brevi e paragrafi ben distanziati tiene il lettore in movimento. Chi scrive usa questi conteggi per rispettare strutture assegnate, accorciare paragrafi troppo lunghi per il web e verificare che un saggio o un articolo scorra in blocchi digeribili.</p>
<h2>Cosa conta come frase</h2>
<p>Il contatore considera <strong>. ! ?</strong> e i puntini di sospensione come fine frase e riconosce i terminatori CJK 。！？ per i testi in cinese, giapponese e coreano. Per evitare divisioni errate, un punto seguito da una cifra (come 3,14) non è trattato come fine frase. Abbreviazioni come «ecc.» possono comunque alterare il totale, quindi considera il conteggio delle frasi come una stima vicina e non un’analisi esatta.</p>
<h2>Privato e istantaneo</h2>
<p>Incolla un saggio, un articolo o qualsiasi blocco di testo per vedere frasi, paragrafi, parole e caratteri aggiornarsi in tempo reale. Tutto avviene nel tuo browser, quindi nulla di ciò che scrivi viene caricato — sicuro per bozze e lavori non pubblicati. Usa i conteggi per stringere la struttura prima di pubblicare.</p>`,
      nl: `<h2>Hoe zinnen en alinea’s worden geteld</h2>
<p>Een <strong>zin</strong> eindigt met afsluitende interpunctie — een punt, vraagteken of uitroepteken (en de equivalenten in andere schriften). Een <strong>alinea</strong> is een tekstblok dat door een lege regel van het volgende is gescheiden. Deze tool telt beide terwijl je typt, samen met de woord- en tekentotalen, zodat je de structuur van je tekst in één oogopslag ziet.</p>
<h2>Waarom zinnen en alinea’s tellen?</h2>
<p>Het aantal zinnen en alinea’s is een snelle indicator voor leesbaarheid. Lange, aaneengeregen zinnen en gigantische alinea’s zijn moeilijker te lezen, terwijl een goede mix van kortere zinnen en goed verdeelde alinea’s de lezer in beweging houdt. Schrijvers gebruiken deze tellingen om aan een opdrachtstructuur te voldoen, te lange alinea’s voor het web in te korten en te controleren of een essay of artikel in verteerbare stukken loopt.</p>
<h2>Wat telt als een zin</h2>
<p>De teller behandelt <strong>. ! ?</strong> en weglatingstekens als zinseindes en herkent de CJK-terminators 。！？ voor Chinese, Japanse en Koreaanse tekst. Om valse splitsingen te voorkomen, wordt een punt gevolgd door een cijfer (zoals 3,14) niet als zinseinde gezien. Afkortingen zoals “bijv.” kunnen het totaal toch verschuiven, dus beschouw het aantal zinnen als een nauwkeurige schatting in plaats van een exacte ontleding.</p>
<h2>Privé en direct</h2>
<p>Plak een essay, artikel of willekeurig tekstblok om de zinnen, alinea’s, woorden en tekens live te zien bijwerken. Alles draait in je browser, dus niets van wat je typt wordt geüpload — veilig voor concepten en ongepubliceerd werk. Gebruik de tellingen om de structuur aan te scherpen voordat je publiceert.</p>`,
      ja: `<h2>文と段落の数え方</h2>
<p><strong>文</strong>は終止符（ピリオド・疑問符・感嘆符、他の文字体系の相当記号を含む）で終わります。<strong>段落</strong>は空行で次と区切られたテキストのまとまりです。本ツールは入力中に両方を、単語数・文字数とあわせて数えるので、文章の構造をひと目で把握できます。</p>
<h2>なぜ文と段落を数えるのか</h2>
<p>文と段落の数は読みやすさの手早い目安です。長くだらだら続く文や巨大な段落は読みにくく、短めの文とほどよく区切られた段落の組み合わせは読者を前に進めます。書き手はこれらの数を使って、課題の構成を満たし、ウェブ向けに長すぎる段落を削り、エッセイや記事が読みやすいまとまりで流れているかを確認します。</p>
<h2>何を文として数えるか</h2>
<p>本カウンターは <strong>. ! ?</strong> と三点リーダーを文末として扱い、中国語・日本語・韓国語の終止符 。！？ も認識します。誤分割を避けるため、数字の前のピリオド（3.14 など）は文末とみなしません。「U.S.A.」のような略語は数を少し動かすことがあるため、文の合計は厳密な解析ではなく近い目安と考えてください。</p>
<h2>プライベートで即時</h2>
<p>エッセイ・記事・任意のテキストを貼り付けると、文・段落・単語・文字数がリアルタイムで更新されます。すべてブラウザー内で動作するため、入力内容はアップロードされません。下書きや未公開の作業にも安全です。公開前に構造を引き締めるのに役立ててください。</p>`,
      zh: `<h2>句子和段落如何统计</h2>
<p><strong>句子</strong>以结束标点收尾——句号、问号或感叹号（以及其他文字体系中的对应符号）。<strong>段落</strong>是以空行与下一段隔开的一块文本。本工具在你输入时同时统计两者，并附带字数和字符数，让你一眼看清文章结构。</p>
<h2>为什么要统计句子和段落？</h2>
<p>句子和段落数是衡量可读性的快捷指标。又长又绕的句子和巨大的段落更难阅读，而短句与分布得当的段落相结合，能让读者不断往下读。写作者用这些数字来满足作业结构、为网页精简过长的段落，并检查文章是否以易消化的小块流畅展开。</p>
<h2>什么算作一个句子</h2>
<p>计数器把 <strong>. ! ?</strong> 和省略号视为句子结束，并识别中日韩的结束符 。！？。为避免错误切分，数字前的句点（如 3.14）不算作句子结束。像 “U.S.A.” 这样的缩写仍可能略微改变计数，因此请把句子总数当作接近的估算，而非精确解析。</p>
<h2>私密且即时</h2>
<p>粘贴论文、文章或任意一段文本，即可看到其句子、段落、字数和字符数实时更新。一切都在你的浏览器中运行，因此你输入的内容不会被上传——适合草稿和未发布的作品。在发布前用这些计数来收紧结构。</p>`,
      da: `<h2>Sådan tælles sætninger og afsnit</h2>
<p>En <strong>sætning</strong> slutter med afsluttende tegnsætning — punktum, spørgsmålstegn eller udråbstegn (og tilsvarende i andre skriftsystemer). Et <strong>afsnit</strong> er en tekstblok, der er adskilt fra den næste med en tom linje. Dette værktøj tæller begge, mens du skriver, sammen med ord- og tegntotaler, så du kan se strukturen i din tekst med det samme.</p>
<h2>Hvorfor tælle sætninger og afsnit?</h2>
<p>Antal sætninger og afsnit er en hurtig indikator for læsbarhed. Lange, snørklede sætninger og kæmpe afsnit er sværere at læse, mens en sund blanding af kortere sætninger og veldelte afsnit holder læseren i bevægelse. Skribenter bruger disse tal til at opfylde en opgavestruktur, skære for lange afsnit ned til webben og tjekke, at et essay eller en artikel flyder i fordøjelige bidder.</p>
<h2>Hvad tæller som en sætning</h2>
<p>Tælleren behandler <strong>. ! ?</strong> og ellipser som sætningsafslutninger og genkender CJK-afslutningstegnene 。！？ for kinesisk, japansk og koreansk tekst. For at undgå falske opdelinger behandles et punktum efterfulgt af et ciffer (som 3,14) ikke som en sætningsafslutning. Forkortelser som »osv.« kan stadig rykke tallet, så betragt sætningstotalen som et tæt skøn snarere end en præcis analyse.</p>
<h2>Privat og øjeblikkeligt</h2>
<p>Indsæt et essay, en artikel eller en hvilken som helst tekstblok for at se dens sætninger, afsnit, ord og tegn opdatere live. Alt kører i din browser, så intet af det, du skriver, uploades — sikkert til udkast og upubliceret arbejde. Brug tællingerne til at stramme strukturen, før du udgiver.</p>`,
    },

    faq: {
      en: [
        { q: 'How does the tool count sentences?', a: 'It counts text that ends in sentence punctuation — . ! ? and ellipses, plus the CJK terminators 。！？. A period before a digit (like 3.14) isn’t counted, so decimals don’t inflate the total.' },
        { q: 'How are paragraphs counted?', a: 'A paragraph is a block of text separated from the next by a blank line (one or more empty lines). Single line breaks within a block don’t start a new paragraph.' },
        { q: 'Why might the sentence count look slightly off?', a: 'Abbreviations like “U.S.A.” or “Dr.” end in a period and can be read as sentence ends, so the count is a close estimate. Plain prose counts very accurately.' },
        { q: 'Is my text uploaded anywhere?', a: 'No. Counting runs entirely in your browser — nothing you type is sent to a server, so your drafts stay private.' },
      ],
      es: [
        { q: '¿Cómo cuenta las frases la herramienta?', a: 'Cuenta el texto que termina en puntuación de frase: . ! ? y puntos suspensivos, además de los terminadores CJK 。！？. Un punto antes de un dígito (como 3,14) no se cuenta, así que los decimales no inflan el total.' },
        { q: '¿Cómo se cuentan los párrafos?', a: 'Un párrafo es un bloque de texto separado del siguiente por una línea en blanco (una o más líneas vacías). Los saltos de línea simples dentro de un bloque no inician un párrafo nuevo.' },
        { q: '¿Por qué el recuento de frases puede verse algo desajustado?', a: 'Las abreviaturas como «EE. UU.» o «Dr.» terminan en punto y pueden leerse como fin de frase, así que el recuento es una estimación cercana. La prosa normal se cuenta con mucha precisión.' },
        { q: '¿Se sube mi texto a algún sitio?', a: 'No. El conteo se realiza por completo en tu navegador: nada de lo que escribas se envía a un servidor, así que tus borradores son privados.' },
      ],
      de: [
        { q: 'Wie zählt das Tool Sätze?', a: 'Es zählt Text, der mit Satzzeichen endet – . ! ? und Auslassungspunkte sowie die CJK-Schlusszeichen 。！？. Ein Punkt vor einer Ziffer (wie 3,14) zählt nicht, sodass Dezimalzahlen das Ergebnis nicht aufblähen.' },
        { q: 'Wie werden Absätze gezählt?', a: 'Ein Absatz ist ein Textblock, der durch eine Leerzeile (eine oder mehrere leere Zeilen) vom nächsten getrennt ist. Einzelne Zeilenumbrüche innerhalb eines Blocks beginnen keinen neuen Absatz.' },
        { q: 'Warum kann die Satzanzahl leicht abweichen?', a: 'Abkürzungen wie „z. B.“ oder „Dr.“ enden auf einen Punkt und können als Satzende gelesen werden, daher ist die Zahl eine nahe Schätzung. Normale Prosa wird sehr genau gezählt.' },
        { q: 'Wird mein Text irgendwo hochgeladen?', a: 'Nein. Das Zählen läuft vollständig in deinem Browser – nichts, was du tippst, wird an einen Server gesendet, deine Entwürfe bleiben privat.' },
      ],
      fr: [
        { q: 'Comment l’outil compte-t-il les phrases ?', a: 'Il compte le texte qui se termine par une ponctuation de phrase — . ! ? et points de suspension, plus les terminateurs CJK 。！？. Un point devant un chiffre (comme 3,14) n’est pas compté, donc les décimales ne gonflent pas le total.' },
        { q: 'Comment les paragraphes sont-ils comptés ?', a: 'Un paragraphe est un bloc de texte séparé du suivant par une ligne vide (une ou plusieurs lignes vides). Les simples sauts de ligne au sein d’un bloc ne commencent pas un nouveau paragraphe.' },
        { q: 'Pourquoi le nombre de phrases peut-il sembler légèrement faux ?', a: 'Les abréviations comme « M. » ou « etc. » se terminent par un point et peuvent être lues comme des fins de phrase, donc le nombre est une estimation proche. La prose ordinaire est comptée très précisément.' },
        { q: 'Mon texte est-il envoyé quelque part ?', a: 'Non. Le comptage se fait entièrement dans votre navigateur — rien de ce que vous tapez n’est envoyé à un serveur, vos brouillons restent privés.' },
      ],
      pt: [
        { q: 'Como é que a ferramenta conta as frases?', a: 'Conta o texto que termina em pontuação de frase — . ! ? e reticências, além dos terminadores CJK 。！？. Um ponto antes de um dígito (como 3,14) não é contado, por isso os decimais não inflacionam o total.' },
        { q: 'Como são contados os parágrafos?', a: 'Um parágrafo é um bloco de texto separado do seguinte por uma linha em branco (uma ou mais linhas vazias). Quebras de linha simples dentro de um bloco não iniciam um novo parágrafo.' },
        { q: 'Porque é que a contagem de frases pode parecer ligeiramente errada?', a: 'Abreviaturas como «EUA» ou «Dr.» terminam em ponto e podem ser lidas como fim de frase, por isso a contagem é uma estimativa aproximada. A prosa simples é contada com muita precisão.' },
        { q: 'O meu texto é enviado para algum lado?', a: 'Não. A contagem é feita inteiramente no seu navegador — nada do que escrever é enviado para um servidor, por isso os seus rascunhos permanecem privados.' },
      ],
      it: [
        { q: 'Come conta le frasi lo strumento?', a: 'Conta il testo che termina con punteggiatura di frase — . ! ? e puntini di sospensione, oltre ai terminatori CJK 。！？. Un punto prima di una cifra (come 3,14) non viene contato, quindi i decimali non gonfiano il totale.' },
        { q: 'Come vengono contati i paragrafi?', a: 'Un paragrafo è un blocco di testo separato dal successivo da una riga vuota (una o più righe vuote). I singoli a capo all’interno di un blocco non iniziano un nuovo paragrafo.' },
        { q: 'Perché il conteggio delle frasi può sembrare leggermente impreciso?', a: 'Abbreviazioni come «ecc.» o «Dott.» finiscono con un punto e possono essere lette come fine frase, quindi il conteggio è una stima vicina. La prosa normale viene contata con grande precisione.' },
        { q: 'Il mio testo viene caricato da qualche parte?', a: 'No. Il conteggio avviene interamente nel tuo browser — nulla di ciò che scrivi viene inviato a un server, quindi le tue bozze restano private.' },
      ],
      nl: [
        { q: 'Hoe telt de tool zinnen?', a: 'Het telt tekst die eindigt op zinsinterpunctie — . ! ? en weglatingstekens, plus de CJK-terminators 。！？. Een punt voor een cijfer (zoals 3,14) telt niet, dus decimalen blazen het totaal niet op.' },
        { q: 'Hoe worden alinea’s geteld?', a: 'Een alinea is een tekstblok dat door een lege regel (een of meer lege regels) van het volgende is gescheiden. Enkele regeleinden binnen een blok beginnen geen nieuwe alinea.' },
        { q: 'Waarom kan het aantal zinnen iets afwijken?', a: 'Afkortingen zoals “bijv.” of “dhr.” eindigen op een punt en kunnen als zinseinde worden gelezen, dus de telling is een nauwkeurige schatting. Gewone tekst wordt zeer precies geteld.' },
        { q: 'Wordt mijn tekst ergens geüpload?', a: 'Nee. Het tellen gebeurt volledig in je browser — niets van wat je typt wordt naar een server gestuurd, dus je concepten blijven privé.' },
      ],
      ja: [
        { q: 'このツールはどうやって文を数えますか？', a: '文末の記号で終わるテキストを数えます。. ! ? と三点リーダー、さらに CJK の終止符 。！？ です。数字の前のピリオド（3.14 など）は数えないため、小数で総数が膨らみません。' },
        { q: '段落はどう数えますか？', a: '段落は空行（1行以上の空行）で次と区切られたテキストのまとまりです。まとまり内の単なる改行は新しい段落になりません。' },
        { q: '文の数が少しずれるのはなぜ？', a: '「U.S.A.」や「Dr.」などの略語はピリオドで終わり、文末と読まれることがあるため、数は近い目安です。普通の文章は非常に正確に数えられます。' },
        { q: 'テキストはどこかにアップロードされますか？', a: 'いいえ。カウントはすべてブラウザー内で行われ、入力内容はサーバーに送信されません。下書きは非公開のままです。' },
      ],
      zh: [
        { q: '工具如何统计句子？', a: '它统计以句子标点结尾的文本——. ! ? 和省略号，以及中日韩结束符 。！？。数字前的句点（如 3.14）不计入，因此小数不会让总数虚高。' },
        { q: '段落如何统计？', a: '段落是以空行（一行或多行空行）与下一段隔开的一块文本。一块文本内部的单个换行不会开始新段落。' },
        { q: '为什么句子数看起来略有偏差？', a: '像 “U.S.A.” 或 “Dr.” 这样的缩写以句点结尾，可能被读作句子结束，因此计数是接近的估算。普通文章的统计非常准确。' },
        { q: '我的文本会被上传吗？', a: '不会。统计完全在你的浏览器中进行——你输入的内容不会发送到服务器，因此草稿保持私密。' },
      ],
      da: [
        { q: 'Hvordan tæller værktøjet sætninger?', a: 'Det tæller tekst, der slutter med sætningstegn — . ! ? og ellipser, plus CJK-afslutningstegnene 。！？. Et punktum før et ciffer (som 3,14) tælles ikke, så decimaltal puster ikke totalen op.' },
        { q: 'Hvordan tælles afsnit?', a: 'Et afsnit er en tekstblok, der er adskilt fra den næste med en tom linje (en eller flere tomme linjer). Enkelte linjeskift inde i en blok starter ikke et nyt afsnit.' },
        { q: 'Hvorfor kan sætningstallet se en smule forkert ud?', a: 'Forkortelser som »osv.« eller »hr.« slutter med et punktum og kan læses som sætningsafslutninger, så tallet er et tæt skøn. Almindelig prosa tælles meget præcist.' },
        { q: 'Bliver min tekst uploadet nogen steder?', a: 'Nej. Optællingen kører helt i din browser — intet af det, du skriver, sendes til en server, så dine udkast forbliver private.' },
      ],
    },
  },
];
