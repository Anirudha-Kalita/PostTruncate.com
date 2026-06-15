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
];
