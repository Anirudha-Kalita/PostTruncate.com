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
];
