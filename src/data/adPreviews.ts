// ──────────────────────────────────────────────────────────────────────────
// Ad Previews & Simulators registry — the "Ad Previews" silo.
//
// Parallel to src/data/tools.ts and src/data/calculators.ts, but for
// platform-accurate ad preview simulators. Each entry drives one page per
// locale at /[lang]/ad-previews/<slug>/, rendered by
// src/components/AdPreviewPageContent.astro with a live Preact simulator island
// chosen by `id` in the route's component map.
//
// Reuses the ToolDefinition shape so it composes with the same content helpers
// (prepareToolContent / buildCanonicalSlugs), StructuredData component, and the
// astro.config.mjs sitemap/hreflang machinery (added to its toolGroups loop
// with prefix 'ad-previews/').
//
// English-first: only the `en` key is authored today. Every record falls back
// to `en` at render time (see tStr in the route/content components), so the
// silo is structurally ready for all 10 locales while shipping English copy.
// ──────────────────────────────────────────────────────────────────────────

import type { ToolDefinition } from './tools.ts';

export const adPreviews: ToolDefinition[] = [
  {
    id: 'facebook-ads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-18',
    platformLimits:
      'Facebook Feed primary text truncates at ~125 characters behind "… See More"; headline best kept to 27–40 characters; link description ~30 characters.',

    slugs: {
      en: 'facebook-ads',
      es: 'anuncios-de-facebook',
      de: 'facebook-anzeigen',
      fr: 'annonces-facebook',
      pt: 'anuncios-do-facebook',
      it: 'annunci-facebook',
      nl: 'facebook-advertenties',
      ja: 'facebook-kokoku',
      zh: 'facebook-guang-gao',
      da: 'facebook-annoncer',
    },

    schemaName: {
      en: 'Facebook Ad Preview & Character Limit Simulator',
      es: 'Vista previa de anuncios de Facebook y simulador de límites de caracteres',
      de: 'Facebook-Anzeigenvorschau & Zeichenlimit-Simulator',
      fr: 'Aperçu d’annonces Facebook et simulateur de limites de caractères',
      pt: 'Pré-visualização de anúncios do Facebook e simulador de limites de caracteres',
      it: 'Anteprima degli annunci Facebook e simulatore dei limiti di caratteri',
      nl: 'Facebook-advertentievoorbeeld & tekenlimietsimulator',
      ja: 'Facebook広告プレビューと文字数制限シミュレーター',
      zh: 'Facebook 广告预览与字符限制模拟器',
      da: 'Facebook-annonceforhåndsvisning og tegngrænse-simulator',
    },

    titles: {
      en: 'Facebook Ad Preview — Live Feed Mockup & Character Limits',
      es: 'Vista previa de anuncios de Facebook — Maqueta de feed en vivo y límites de caracteres',
      de: 'Facebook-Anzeigenvorschau — Live-Feed-Mockup & Zeichenlimits',
      fr: 'Aperçu d’annonces Facebook — Maquette de fil en direct et limites de caractères',
      pt: 'Pré-visualização de anúncios do Facebook — Maquete do feed ao vivo e limites de caracteres',
      it: 'Anteprima annunci Facebook — Mockup del feed in tempo reale e limiti di caratteri',
      nl: 'Facebook-advertentievoorbeeld — Live feed-mockup & tekenlimieten',
      ja: 'Facebook広告プレビュー — ライブフィードのモックアップと文字数制限',
      zh: 'Facebook 广告预览 — 实时信息流模拟与字符限制',
      da: 'Facebook-annonceforhåndsvisning — Live feed-mockup og tegngrænser',
    },

    metaDescriptions: {
      en: 'Free Facebook Feed ad preview. See exactly where your primary text hits the "… See More" cutoff at 125 characters, check headline and description limits, and switch between mobile and desktop — live as you type.',
      es: 'Vista previa gratuita de anuncios del feed de Facebook. Ve exactamente dónde tu texto principal alcanza el corte de "… Ver más" a los 125 caracteres, comprueba los límites de título y descripción y alterna entre móvil y escritorio, en vivo mientras escribes.',
      de: 'Kostenlose Vorschau für Facebook-Feed-Anzeigen. Sieh genau, wo dein Primärtext bei 125 Zeichen auf den „… Mehr anzeigen"-Schnitt trifft, prüfe Titel- und Beschreibungslimits und wechsle live beim Tippen zwischen Mobil und Desktop.',
      fr: 'Aperçu gratuit d’annonces du fil Facebook. Voyez exactement où votre texte principal atteint la coupure « … Voir plus » à 125 caractères, vérifiez les limites de titre et de description et basculez entre mobile et ordinateur, en direct pendant que vous tapez.',
      pt: 'Pré-visualização gratuita de anúncios do feed do Facebook. Veja exatamente onde o seu texto principal atinge o corte "… Ver mais" aos 125 caracteres, verifique os limites de título e descrição e alterne entre telemóvel e computador, ao vivo enquanto escreve.',
      it: 'Anteprima gratuita degli annunci del feed di Facebook. Vedi esattamente dove il testo principale raggiunge il taglio "… Altro" a 125 caratteri, controlla i limiti di titolo e descrizione e passa da mobile a desktop, in tempo reale mentre scrivi.',
      nl: 'Gratis voorbeeld van Facebook-feedadvertenties. Zie precies waar je primaire tekst de "… Meer weergeven"-afkapping bij 125 tekens raakt, controleer de limieten voor kop en beschrijving en wissel tussen mobiel en desktop — live terwijl je typt.',
      ja: '無料のFacebookフィード広告プレビュー。主要テキストが125文字で「… 続きを見る」の切れ目に達する位置を正確に確認し、見出しと説明の制限をチェックし、入力しながらモバイルとデスクトップをリアルタイムで切り替えられます。',
      zh: '免费的 Facebook 信息流广告预览。准确查看主文案在 125 字符处触及"… 查看更多"截断的位置，检查标题和描述限制，并在输入时实时切换移动端与桌面端。',
      da: 'Gratis forhåndsvisning af Facebook-feedannoncer. Se præcis, hvor din primære tekst rammer "… Se mere"-afskæringen ved 125 tegn, tjek grænser for overskrift og beskrivelse, og skift mellem mobil og desktop — live mens du skriver.',
    },

    intro: {
      en: 'Paste your primary text, headline, and description below to see a pixel-accurate Facebook Feed ad mockup. The preview applies Facebook\'s real 125-character "See More" truncation and shows how your headline behaves on mobile versus desktop.',
      es: 'Pega tu texto principal, título y descripción abajo para ver una maqueta de anuncio del feed de Facebook con precisión de píxeles. La vista previa aplica el truncamiento real de "Ver más" a los 125 caracteres de Facebook y muestra cómo se comporta tu título en móvil frente a escritorio.',
      de: 'Füge unten deinen Primärtext, Titel und deine Beschreibung ein, um ein pixelgenaues Mockup einer Facebook-Feed-Anzeige zu sehen. Die Vorschau wendet Facebooks echte „Mehr anzeigen"-Kürzung bei 125 Zeichen an und zeigt, wie sich dein Titel auf Mobil und Desktop verhält.',
      fr: 'Collez votre texte principal, votre titre et votre description ci-dessous pour voir une maquette d’annonce du fil Facebook au pixel près. L’aperçu applique la vraie troncature « Voir plus » de Facebook à 125 caractères et montre comment votre titre se comporte sur mobile et ordinateur.',
      pt: 'Cole o seu texto principal, título e descrição abaixo para ver uma maquete de anúncio do feed do Facebook com precisão de pixels. A pré-visualização aplica o truncamento real de "Ver mais" do Facebook aos 125 caracteres e mostra como o seu título se comporta no telemóvel face ao computador.',
      it: 'Incolla qui sotto il testo principale, il titolo e la descrizione per vedere un mockup dell’annuncio del feed di Facebook accurato al pixel. L’anteprima applica il vero troncamento "Altro" di Facebook a 125 caratteri e mostra come si comporta il titolo su mobile rispetto al desktop.',
      nl: 'Plak hieronder je primaire tekst, kop en beschrijving om een pixelnauwkeurige mockup van een Facebook-feedadvertentie te zien. Het voorbeeld past Facebooks echte "Meer weergeven"-afkapping bij 125 tekens toe en laat zien hoe je kop zich gedraagt op mobiel versus desktop.',
      ja: '下に主要テキスト、見出し、説明を貼り付けると、ピクセル精度のFacebookフィード広告モックアップが表示されます。プレビューはFacebookの実際の125文字での「続きを見る」切り捨てを適用し、見出しがモバイルとデスクトップでどのように表示されるかを示します。',
      zh: '在下方粘贴你的主文案、标题和描述，即可看到像素级精确的 Facebook 信息流广告模拟。预览会应用 Facebook 真实的 125 字符"查看更多"截断，并显示你的标题在移动端与桌面端的表现。',
      da: 'Indsæt din primære tekst, overskrift og beskrivelse nedenfor for at se et pixelnøjagtigt mockup af en Facebook-feedannonce. Forhåndsvisningen anvender Facebooks rigtige "Se mere"-afskæring ved 125 tegn og viser, hvordan din overskrift opfører sig på mobil kontra desktop.',
    },

    content: {
      en: `<h2>Facebook ad character limits that actually matter</h2>
<p>Facebook does not publish a single hard "ad limit" — what trips up advertisers is <strong>truncation</strong>. On the Facebook Feed, your <strong>primary text is cut off at roughly 125 characters</strong>, after which the platform appends an unclickable "… See More". Everything past that point is hidden unless the viewer taps to expand, and most never do. The simulator above shows that cutoff live, so you can guarantee your hook and value proposition land above the fold.</p>
<h2>Headline and description rules</h2>
<p>The <strong>headline</strong> is the bold line beneath your creative. Facebook recommends keeping it short, and on mobile a headline longer than about <strong>40 characters</strong> gets squeezed or wraps awkwardly; under <strong>27 characters</strong> is the safest zone for full visibility across placements. The <strong>link description</strong> caps around <strong>30 characters</strong> and is frequently dropped entirely when the headline is long or the placement is narrow — never put critical information there.</p>
<h2>Mobile versus desktop</h2>
<p>The overwhelming majority of Facebook ad impressions are mobile, and mobile is far less forgiving: less horizontal room, earlier truncation, and a higher chance the description disappears. Toggle the preview between <strong>Mobile</strong> and <strong>Desktop</strong> to confirm your ad reads cleanly on the placement that matters most — the small screen.</p>
<h2>Why preview before you publish</h2>
<p>Rewriting an ad after it has entered review wastes time and can reset its learning phase. Checking truncation in advance means your strongest copy is never buried behind "See More," your headline never clips, and your call to action stays visible. Because PostTruncate runs entirely in your browser, nothing you paste is uploaded or stored — type your draft, watch the cutoff in real time, and copy the final version straight into Ads Manager.</p>`,
      es: `<h2>Los límites de caracteres de los anuncios de Facebook que de verdad importan</h2>
<p>Facebook no publica un único "límite de anuncio" rígido — lo que hace tropezar a los anunciantes es el <strong>truncamiento</strong>. En el feed de Facebook, tu <strong>texto principal se corta a unos 125 caracteres</strong>, tras lo cual la plataforma añade un "… Ver más" que no se puede clicar. Todo lo que queda después se oculta a menos que el usuario toque para expandir, y casi nadie lo hace. El simulador de arriba muestra ese corte en vivo, para que garantices que tu gancho y tu propuesta de valor queden por encima del pliegue.</p>
<h2>Reglas de título y descripción</h2>
<p>El <strong>título</strong> es la línea en negrita debajo de tu creatividad. Facebook recomienda mantenerlo corto, y en móvil un título de más de unos <strong>40 caracteres</strong> se comprime o se parte de forma incómoda; por debajo de <strong>27 caracteres</strong> es la zona más segura para una visibilidad total en todas las ubicaciones. La <strong>descripción del enlace</strong> ronda los <strong>30 caracteres</strong> y a menudo se elimina por completo cuando el título es largo o la ubicación es estrecha — nunca pongas información crítica ahí.</p>
<h2>Móvil frente a escritorio</h2>
<p>La inmensa mayoría de las impresiones de anuncios de Facebook son móviles, y el móvil es mucho menos indulgente: menos espacio horizontal, truncamiento más temprano y mayor probabilidad de que la descripción desaparezca. Alterna la vista previa entre <strong>Móvil</strong> y <strong>Escritorio</strong> para confirmar que tu anuncio se lee bien en la ubicación que más importa: la pantalla pequeña.</p>
<h2>Por qué hacer la vista previa antes de publicar</h2>
<p>Reescribir un anuncio después de que ha entrado en revisión hace perder tiempo y puede reiniciar su fase de aprendizaje. Comprobar el truncamiento por adelantado significa que tu mejor texto nunca queda enterrado tras "Ver más", tu título nunca se corta y tu llamada a la acción permanece visible. Como PostTruncate funciona por completo en tu navegador, nada de lo que pegas se sube ni se almacena — escribe tu borrador, observa el corte en tiempo real y copia la versión final directamente en el Administrador de anuncios.</p>`,
      de: `<h2>Facebook-Anzeigen-Zeichenlimits, die wirklich zählen</h2>
<p>Facebook veröffentlicht kein einziges hartes „Anzeigenlimit" — was Werbetreibende stolpern lässt, ist die <strong>Kürzung</strong>. Im Facebook-Feed wird dein <strong>Primärtext bei etwa 125 Zeichen abgeschnitten</strong>, danach hängt die Plattform ein nicht anklickbares „… Mehr anzeigen" an. Alles danach ist verborgen, sofern der Betrachter nicht zum Aufklappen tippt — und die meisten tun das nie. Der Simulator oben zeigt diesen Schnitt live, sodass du sicherstellen kannst, dass dein Aufhänger und dein Nutzenversprechen über der Falz landen.</p>
<h2>Regeln für Titel und Beschreibung</h2>
<p>Der <strong>Titel</strong> ist die fette Zeile unter deinem Creative. Facebook empfiehlt, ihn kurz zu halten, und auf dem Handy wird ein Titel von mehr als etwa <strong>40 Zeichen</strong> gestaucht oder bricht unschön um; unter <strong>27 Zeichen</strong> ist die sicherste Zone für volle Sichtbarkeit über alle Platzierungen. Die <strong>Link-Beschreibung</strong> liegt bei rund <strong>30 Zeichen</strong> und wird häufig komplett weggelassen, wenn der Titel lang oder die Platzierung schmal ist — platziere dort niemals wichtige Informationen.</p>
<h2>Mobil versus Desktop</h2>
<p>Die überwältigende Mehrheit der Facebook-Anzeigenimpressionen ist mobil, und Mobil verzeiht weit weniger: weniger horizontaler Platz, frühere Kürzung und eine höhere Chance, dass die Beschreibung verschwindet. Schalte die Vorschau zwischen <strong>Mobil</strong> und <strong>Desktop</strong> um, um zu bestätigen, dass deine Anzeige auf der wichtigsten Platzierung sauber liest — dem kleinen Bildschirm.</p>
<h2>Warum vor dem Veröffentlichen eine Vorschau</h2>
<p>Eine Anzeige umzuschreiben, nachdem sie in die Prüfung gegangen ist, kostet Zeit und kann ihre Lernphase zurücksetzen. Die Kürzung vorab zu prüfen bedeutet, dass dein stärkster Text nie hinter „Mehr anzeigen" verschwindet, dein Titel nie abschneidet und dein Call-to-Action sichtbar bleibt. Da PostTruncate vollständig in deinem Browser läuft, wird nichts, was du einfügst, hochgeladen oder gespeichert — tippe deinen Entwurf, beobachte den Schnitt in Echtzeit und kopiere die finale Version direkt in den Anzeigenmanager.</p>`,
      fr: `<h2>Les limites de caractères des annonces Facebook qui comptent vraiment</h2>
<p>Facebook ne publie pas une seule « limite d’annonce » stricte — ce qui fait trébucher les annonceurs, c’est la <strong>troncature</strong>. Dans le fil Facebook, votre <strong>texte principal est coupé à environ 125 caractères</strong>, après quoi la plateforme ajoute un « … Voir plus » non cliquable. Tout ce qui suit est masqué à moins que la personne ne touche pour développer, et la plupart ne le font jamais. Le simulateur ci-dessus montre cette coupure en direct, pour que vous garantissiez que votre accroche et votre proposition de valeur restent au-dessus de la ligne de flottaison.</p>
<h2>Règles de titre et de description</h2>
<p>Le <strong>titre</strong> est la ligne en gras sous votre visuel. Facebook recommande de le garder court, et sur mobile un titre de plus d’environ <strong>40 caractères</strong> est comprimé ou se coupe maladroitement ; en dessous de <strong>27 caractères</strong>, c’est la zone la plus sûre pour une visibilité totale sur tous les emplacements. La <strong>description du lien</strong> plafonne autour de <strong>30 caractères</strong> et est souvent entièrement supprimée quand le titre est long ou l’emplacement étroit — n’y mettez jamais d’information critique.</p>
<h2>Mobile contre ordinateur</h2>
<p>L’écrasante majorité des impressions d’annonces Facebook sont mobiles, et le mobile pardonne bien moins : moins d’espace horizontal, troncature plus précoce et plus de risque que la description disparaisse. Basculez l’aperçu entre <strong>Mobile</strong> et <strong>Ordinateur</strong> pour confirmer que votre annonce se lit proprement sur l’emplacement qui compte le plus — le petit écran.</p>
<h2>Pourquoi prévisualiser avant de publier</h2>
<p>Réécrire une annonce après qu’elle est entrée en examen fait perdre du temps et peut réinitialiser sa phase d’apprentissage. Vérifier la troncature à l’avance signifie que votre meilleur texte n’est jamais enterré derrière « Voir plus », que votre titre n’est jamais coupé et que votre appel à l’action reste visible. Comme PostTruncate fonctionne entièrement dans votre navigateur, rien de ce que vous collez n’est téléversé ni stocké — tapez votre brouillon, observez la coupure en temps réel et copiez la version finale directement dans le gestionnaire de publicités.</p>`,
      pt: `<h2>Os limites de caracteres dos anúncios do Facebook que realmente importam</h2>
<p>O Facebook não publica um único "limite de anúncio" rígido — o que faz os anunciantes tropeçarem é o <strong>truncamento</strong>. No feed do Facebook, o seu <strong>texto principal é cortado por volta dos 125 caracteres</strong>, após o que a plataforma acrescenta um "… Ver mais" que não é clicável. Tudo o que vem depois fica oculto a menos que o utilizador toque para expandir, e a maioria nunca o faz. O simulador acima mostra esse corte ao vivo, para que garanta que o seu gancho e a sua proposta de valor ficam acima da dobra.</p>
<h2>Regras de título e descrição</h2>
<p>O <strong>título</strong> é a linha a negrito por baixo do seu criativo. O Facebook recomenda mantê-lo curto, e no telemóvel um título com mais de cerca de <strong>40 caracteres</strong> fica comprimido ou quebra de forma estranha; abaixo de <strong>27 caracteres</strong> é a zona mais segura para visibilidade total em todos os posicionamentos. A <strong>descrição do link</strong> ronda os <strong>30 caracteres</strong> e é frequentemente eliminada por completo quando o título é longo ou o posicionamento é estreito — nunca coloque informação crítica aí.</p>
<h2>Telemóvel face a computador</h2>
<p>A esmagadora maioria das impressões de anúncios do Facebook é em telemóvel, e o telemóvel é muito menos tolerante: menos espaço horizontal, truncamento mais cedo e maior probabilidade de a descrição desaparecer. Alterne a pré-visualização entre <strong>Telemóvel</strong> e <strong>Computador</strong> para confirmar que o seu anúncio se lê de forma limpa no posicionamento que mais importa — o ecrã pequeno.</p>
<h2>Porquê pré-visualizar antes de publicar</h2>
<p>Reescrever um anúncio depois de entrar em revisão desperdiça tempo e pode reiniciar a sua fase de aprendizagem. Verificar o truncamento com antecedência significa que o seu melhor texto nunca fica enterrado atrás de "Ver mais", o seu título nunca corta e a sua chamada para ação permanece visível. Como o PostTruncate funciona totalmente no seu navegador, nada do que cola é carregado ou armazenado — escreva o seu rascunho, observe o corte em tempo real e copie a versão final diretamente para o Gestor de anúncios.</p>`,
      it: `<h2>I limiti di caratteri degli annunci Facebook che contano davvero</h2>
<p>Facebook non pubblica un unico "limite dell’annuncio" rigido — ciò che fa inciampare gli inserzionisti è il <strong>troncamento</strong>. Nel feed di Facebook, il tuo <strong>testo principale viene tagliato a circa 125 caratteri</strong>, dopodiché la piattaforma aggiunge un "… Altro" non cliccabile. Tutto ciò che viene dopo è nascosto a meno che l’utente non tocchi per espandere, e quasi nessuno lo fa. Il simulatore qui sopra mostra quel taglio in tempo reale, così puoi garantire che il tuo gancio e la tua proposta di valore restino sopra la piega.</p>
<h2>Regole di titolo e descrizione</h2>
<p>Il <strong>titolo</strong> è la riga in grassetto sotto la tua creatività. Facebook consiglia di tenerlo corto, e su mobile un titolo più lungo di circa <strong>40 caratteri</strong> viene compresso o va a capo in modo goffo; sotto i <strong>27 caratteri</strong> è la zona più sicura per la piena visibilità su tutti i posizionamenti. La <strong>descrizione del link</strong> si ferma intorno ai <strong>30 caratteri</strong> e viene spesso eliminata del tutto quando il titolo è lungo o il posizionamento è stretto — non mettere mai informazioni critiche lì.</p>
<h2>Mobile contro desktop</h2>
<p>La stragrande maggioranza delle impression degli annunci Facebook è su mobile, e il mobile è molto meno indulgente: meno spazio orizzontale, troncamento più precoce e maggiore probabilità che la descrizione scompaia. Alterna l’anteprima tra <strong>Mobile</strong> e <strong>Desktop</strong> per confermare che il tuo annuncio si legga in modo pulito sul posizionamento che conta di più — lo schermo piccolo.</p>
<h2>Perché fare l’anteprima prima di pubblicare</h2>
<p>Riscrivere un annuncio dopo che è entrato in revisione fa perdere tempo e può azzerare la sua fase di apprendimento. Controllare il troncamento in anticipo significa che il tuo testo migliore non finisce mai sepolto dietro "Altro", il tuo titolo non viene mai tagliato e la tua call to action resta visibile. Poiché PostTruncate funziona interamente nel tuo browser, nulla di ciò che incolli viene caricato o memorizzato — scrivi la tua bozza, osserva il taglio in tempo reale e copia la versione finale direttamente in Gestione inserzioni.</p>`,
      nl: `<h2>Facebook-advertentie-tekenlimieten die er echt toe doen</h2>
<p>Facebook publiceert geen enkele harde "advertentielimiet" — wat adverteerders doet struikelen is <strong>afkapping</strong>. In de Facebook-feed wordt je <strong>primaire tekst bij ongeveer 125 tekens afgekapt</strong>, waarna het platform een niet-klikbaar "… Meer weergeven" toevoegt. Alles daarna is verborgen tenzij de kijker tikt om uit te klappen, en de meesten doen dat nooit. De simulator hierboven toont die afkapping live, zodat je kunt garanderen dat je hook en waardepropositie boven de vouw landen.</p>
<h2>Regels voor kop en beschrijving</h2>
<p>De <strong>kop</strong> is de vetgedrukte regel onder je creatie. Facebook raadt aan hem kort te houden, en op mobiel wordt een kop van meer dan ongeveer <strong>40 tekens</strong> samengeperst of breekt hij lelijk af; onder <strong>27 tekens</strong> is de veiligste zone voor volledige zichtbaarheid op alle plaatsingen. De <strong>linkbeschrijving</strong> houdt op rond <strong>30 tekens</strong> en wordt vaak volledig weggelaten wanneer de kop lang is of de plaatsing smal — zet daar nooit cruciale informatie.</p>
<h2>Mobiel versus desktop</h2>
<p>De overgrote meerderheid van de Facebook-advertentievertoningen is mobiel, en mobiel is veel minder vergevingsgezind: minder horizontale ruimte, eerdere afkapping en een grotere kans dat de beschrijving verdwijnt. Wissel het voorbeeld tussen <strong>Mobiel</strong> en <strong>Desktop</strong> om te bevestigen dat je advertentie netjes leest op de plaatsing die het meest telt — het kleine scherm.</p>
<h2>Waarom een voorbeeld bekijken vóór publicatie</h2>
<p>Een advertentie herschrijven nadat hij in beoordeling is gegaan, kost tijd en kan zijn leerfase resetten. Afkapping vooraf controleren betekent dat je sterkste tekst nooit achter "Meer weergeven" verdwijnt, je kop nooit wordt afgekapt en je call-to-action zichtbaar blijft. Omdat PostTruncate volledig in je browser draait, wordt niets van wat je plakt geüpload of opgeslagen — typ je concept, bekijk de afkapping in realtime en kopieer de definitieve versie rechtstreeks naar Advertentiebeheer.</p>`,
      ja: `<h2>本当に重要なFacebook広告の文字数制限</h2>
<p>Facebookは単一の厳格な「広告の上限」を公表していません。広告主がつまずくのは<strong>切り捨て</strong>です。Facebookフィードでは、<strong>主要テキストはおよそ125文字で切れ</strong>、その後にクリックできない「… 続きを見る」が付きます。それ以降はユーザーがタップして展開しない限り隠れたままで、ほとんどの人は展開しません。上のシミュレーターはその切れ目をリアルタイムで表示するので、フックと価値提案を確実に折り返しの上に収められます。</p>
<h2>見出しと説明のルール</h2>
<p><strong>見出し</strong>はクリエイティブの下の太字の行です。Facebookは短く保つことを推奨しており、モバイルではおよそ<strong>40文字</strong>を超える見出しは圧縮されたり不格好に折り返したりします。<strong>27文字</strong>未満が、すべての配置で完全に表示される最も安全な範囲です。<strong>リンクの説明</strong>はおよそ<strong>30文字</strong>が上限で、見出しが長い場合や配置が狭い場合には丸ごと省略されることが多いため、そこに重要な情報を決して置かないでください。</p>
<h2>モバイル対デスクトップ</h2>
<p>Facebook広告のインプレッションの圧倒的多数はモバイルであり、モバイルははるかに容赦がありません。横方向のスペースが少なく、切り捨てが早く、説明が消える可能性も高くなります。プレビューを<strong>モバイル</strong>と<strong>デスクトップ</strong>で切り替えて、最も重要な配置である小さな画面で広告がきれいに読めることを確認してください。</p>
<h2>公開前にプレビューする理由</h2>
<p>広告が審査に入った後に書き直すと時間を浪費し、学習フェーズがリセットされることがあります。事前に切り捨てを確認しておけば、最も強いコピーが「続きを見る」の裏に埋もれることはなく、見出しが切れることもなく、行動喚起が表示されたままになります。PostTruncateは完全にブラウザー内で動作するため、貼り付けた内容はアップロードも保存もされません。下書きを入力し、切れ目をリアルタイムで確認し、最終版を広告マネージャに直接コピーしてください。</p>`,
      zh: `<h2>真正重要的 Facebook 广告字符限制</h2>
<p>Facebook 并未公布单一的硬性"广告上限"——让广告主栽跟头的是<strong>截断</strong>。在 Facebook 信息流中，你的<strong>主文案大约在 125 字符处被截断</strong>，之后平台会附上一个不可点击的"… 查看更多"。除非用户点按展开，否则其后内容都会隐藏，而大多数人从不展开。上方的模拟器会实时显示该截断点，让你确保钩子和价值主张落在折叠线以上。</p>
<h2>标题与描述规则</h2>
<p><strong>标题</strong>是素材下方的加粗行。Facebook 建议保持简短，在移动端，超过约 <strong>40 字符</strong>的标题会被压缩或难看地换行；低于 <strong>27 字符</strong>是在所有版位中完整显示的最安全区间。<strong>链接描述</strong>上限约为 <strong>30 字符</strong>，当标题较长或版位较窄时常被整段丢弃——切勿在此放置关键信息。</p>
<h2>移动端对比桌面端</h2>
<p>Facebook 广告展示的绝大多数来自移动端，而移动端宽容度低得多：横向空间更少、截断更早、描述消失的概率更高。在<strong>移动端</strong>与<strong>桌面端</strong>之间切换预览，确认你的广告在最重要的版位——小屏幕上——读起来清爽。</p>
<h2>为什么要在发布前预览</h2>
<p>广告进入审核后再改写既浪费时间，又可能重置其学习期。提前检查截断意味着你最有力的文案绝不会埋在"查看更多"之后，标题不会被切，行动号召保持可见。由于 PostTruncate 完全在你的浏览器中运行，你粘贴的任何内容都不会被上传或存储——输入草稿，实时观察截断，再把最终版本直接复制到广告管理工具。</p>`,
      da: `<h2>Facebook-annoncens tegngrænser, der faktisk betyder noget</h2>
<p>Facebook offentliggør ikke én enkelt hård "annoncegrænse" — det, der får annoncører til at snuble, er <strong>afskæring</strong>. I Facebook-feedet bliver din <strong>primære tekst skåret af ved omkring 125 tegn</strong>, hvorefter platformen tilføjer et ikke-klikbart "… Se mere". Alt derefter er skjult, medmindre seeren trykker for at udvide, og de fleste gør det aldrig. Simulatoren ovenfor viser den afskæring live, så du kan garantere, at din krog og dit værditilbud lander over folden.</p>
<h2>Regler for overskrift og beskrivelse</h2>
<p><strong>Overskriften</strong> er den fede linje under dit kreative. Facebook anbefaler at holde den kort, og på mobil bliver en overskrift på mere end omkring <strong>40 tegn</strong> klemt sammen eller brydes grimt; under <strong>27 tegn</strong> er den sikreste zone for fuld synlighed på tværs af placeringer. <strong>Linkbeskrivelsen</strong> topper omkring <strong>30 tegn</strong> og bliver ofte droppet helt, når overskriften er lang eller placeringen smal — placér aldrig kritisk information der.</p>
<h2>Mobil kontra desktop</h2>
<p>Langt størstedelen af Facebook-annoncevisninger er mobile, og mobil er langt mindre tilgivende: mindre vandret plads, tidligere afskæring og større chance for, at beskrivelsen forsvinder. Skift forhåndsvisningen mellem <strong>Mobil</strong> og <strong>Desktop</strong> for at bekræfte, at din annonce læses rent på den placering, der betyder mest — den lille skærm.</p>
<h2>Hvorfor forhåndsvise før du udgiver</h2>
<p>At omskrive en annonce, efter den er gået i gennemgang, spilder tid og kan nulstille dens læringsfase. At tjekke afskæring på forhånd betyder, at din stærkeste tekst aldrig begraves bag "Se mere", din overskrift aldrig klippes, og din handlingsopfordring forbliver synlig. Fordi PostTruncate kører helt i din browser, bliver intet af det, du indsætter, uploadet eller gemt — skriv dit udkast, se afskæringen i realtid, og kopiér den endelige version direkte ind i Annonceadministrator.</p>`,
    },

    faq: {
      en: [
        {
          q: 'What is the Facebook ad primary text character limit?',
          a: 'There is no hard cap, but the Feed truncates primary text at about 125 characters with a "… See More" link. Keep your hook and core message before that point so it shows without a tap.',
        },
        {
          q: 'How long can a Facebook ad headline be?',
          a: 'Technically up to 40 characters display cleanly on most placements, but under 27 characters is safest on mobile, where longer headlines get squeezed or wrapped.',
        },
        {
          q: 'Does the link description always show?',
          a: 'No. The ~30-character link description is often dropped on mobile or when the headline is long. Treat it as optional and never place essential information there.',
        },
        {
          q: 'Is my ad copy uploaded anywhere?',
          a: 'No. The preview runs entirely in your browser. Nothing you type or any image you attach is sent to a server or stored.',
        },
      ],
      es: [
        {
          q: '¿Cuál es el límite de caracteres del texto principal de un anuncio de Facebook?',
          a: 'No hay un tope rígido, pero el feed trunca el texto principal a unos 125 caracteres con un enlace "… Ver más". Mantén tu gancho y tu mensaje central antes de ese punto para que se muestren sin un toque.',
        },
        {
          q: '¿Cuánto puede medir el título de un anuncio de Facebook?',
          a: 'Técnicamente, hasta 40 caracteres se muestran bien en la mayoría de las ubicaciones, pero por debajo de 27 caracteres es lo más seguro en móvil, donde los títulos más largos se comprimen o se parten.',
        },
        {
          q: '¿La descripción del enlace siempre se muestra?',
          a: 'No. La descripción del enlace de unos 30 caracteres a menudo se elimina en móvil o cuando el título es largo. Trátala como opcional y nunca pongas información esencial ahí.',
        },
        {
          q: '¿Se sube a algún sitio el texto de mi anuncio?',
          a: 'No. La vista previa funciona por completo en tu navegador. Nada de lo que escribes ni ninguna imagen que adjuntas se envía a un servidor ni se almacena.',
        },
      ],
      de: [
        {
          q: 'Wie hoch ist das Zeichenlimit des Primärtexts einer Facebook-Anzeige?',
          a: 'Es gibt keine harte Grenze, aber der Feed kürzt den Primärtext bei etwa 125 Zeichen mit einem „… Mehr anzeigen"-Link. Halte deinen Aufhänger und deine Kernbotschaft vor diesem Punkt, damit sie ohne Tippen erscheinen.',
        },
        {
          q: 'Wie lang darf ein Facebook-Anzeigentitel sein?',
          a: 'Technisch werden bis zu 40 Zeichen auf den meisten Platzierungen sauber angezeigt, aber unter 27 Zeichen ist auf dem Handy am sichersten, wo längere Titel gestaucht oder umgebrochen werden.',
        },
        {
          q: 'Wird die Link-Beschreibung immer angezeigt?',
          a: 'Nein. Die rund 30 Zeichen lange Link-Beschreibung wird auf dem Handy oder bei langem Titel oft weggelassen. Behandle sie als optional und platziere dort niemals wesentliche Informationen.',
        },
        {
          q: 'Wird mein Anzeigentext irgendwo hochgeladen?',
          a: 'Nein. Die Vorschau läuft vollständig in deinem Browser. Nichts, was du tippst, und kein Bild, das du anhängst, wird an einen Server gesendet oder gespeichert.',
        },
      ],
      fr: [
        {
          q: 'Quelle est la limite de caractères du texte principal d’une annonce Facebook ?',
          a: 'Il n’y a pas de plafond strict, mais le fil tronque le texte principal à environ 125 caractères avec un lien « … Voir plus ». Gardez votre accroche et votre message clé avant ce point pour qu’ils s’affichent sans toucher.',
        },
        {
          q: 'Quelle longueur peut faire un titre d’annonce Facebook ?',
          a: 'Techniquement, jusqu’à 40 caractères s’affichent proprement sur la plupart des emplacements, mais en dessous de 27 caractères, c’est le plus sûr sur mobile, où les titres plus longs sont comprimés ou coupés.',
        },
        {
          q: 'La description du lien s’affiche-t-elle toujours ?',
          a: 'Non. La description du lien d’environ 30 caractères est souvent supprimée sur mobile ou quand le titre est long. Considérez-la comme facultative et n’y placez jamais d’information essentielle.',
        },
        {
          q: 'Le texte de mon annonce est-il téléversé quelque part ?',
          a: 'Non. L’aperçu fonctionne entièrement dans votre navigateur. Rien de ce que vous tapez ni aucune image que vous joignez n’est envoyé à un serveur ni stocké.',
        },
      ],
      pt: [
        {
          q: 'Qual é o limite de caracteres do texto principal de um anúncio do Facebook?',
          a: 'Não há um limite rígido, mas o feed trunca o texto principal por volta dos 125 caracteres com um link "… Ver mais". Mantenha o seu gancho e a mensagem central antes desse ponto para que apareçam sem um toque.',
        },
        {
          q: 'Que comprimento pode ter um título de anúncio do Facebook?',
          a: 'Tecnicamente, até 40 caracteres aparecem de forma limpa na maioria dos posicionamentos, mas abaixo de 27 caracteres é o mais seguro no telemóvel, onde títulos mais longos ficam comprimidos ou quebram.',
        },
        {
          q: 'A descrição do link mostra-se sempre?',
          a: 'Não. A descrição do link de cerca de 30 caracteres é frequentemente eliminada no telemóvel ou quando o título é longo. Trate-a como opcional e nunca coloque informação essencial aí.',
        },
        {
          q: 'O texto do meu anúncio é carregado para algum lado?',
          a: 'Não. A pré-visualização funciona totalmente no seu navegador. Nada do que escreve nem qualquer imagem que anexa é enviado para um servidor ou armazenado.',
        },
      ],
      it: [
        {
          q: 'Qual è il limite di caratteri del testo principale di un annuncio Facebook?',
          a: 'Non c’è un limite rigido, ma il feed tronca il testo principale a circa 125 caratteri con un link "… Altro". Tieni il gancio e il messaggio centrale prima di quel punto perché si vedano senza un tocco.',
        },
        {
          q: 'Quanto può essere lungo il titolo di un annuncio Facebook?',
          a: 'Tecnicamente fino a 40 caratteri si vedono bene sulla maggior parte dei posizionamenti, ma sotto i 27 caratteri è più sicuro su mobile, dove i titoli più lunghi vengono compressi o spezzati.',
        },
        {
          q: 'La descrizione del link viene sempre mostrata?',
          a: 'No. La descrizione del link di circa 30 caratteri viene spesso eliminata su mobile o quando il titolo è lungo. Trattala come facoltativa e non mettere mai informazioni essenziali lì.',
        },
        {
          q: 'Il testo del mio annuncio viene caricato da qualche parte?',
          a: 'No. L’anteprima funziona interamente nel tuo browser. Nulla di ciò che scrivi né alcuna immagine che alleghi viene inviato a un server o memorizzato.',
        },
      ],
      nl: [
        {
          q: 'Wat is de tekenlimiet van de primaire tekst van een Facebook-advertentie?',
          a: 'Er is geen harde limiet, maar de feed kapt de primaire tekst af bij ongeveer 125 tekens met een "… Meer weergeven"-link. Houd je hook en kernboodschap vóór dat punt zodat ze zonder tik verschijnen.',
        },
        {
          q: 'Hoe lang mag een Facebook-advertentiekop zijn?',
          a: 'Technisch worden tot 40 tekens netjes weergegeven op de meeste plaatsingen, maar onder 27 tekens is het veiligst op mobiel, waar langere koppen worden samengeperst of afgebroken.',
        },
        {
          q: 'Wordt de linkbeschrijving altijd getoond?',
          a: 'Nee. De linkbeschrijving van ongeveer 30 tekens wordt vaak weggelaten op mobiel of wanneer de kop lang is. Behandel hem als optioneel en plaats er nooit essentiële informatie.',
        },
        {
          q: 'Wordt mijn advertentietekst ergens geüpload?',
          a: 'Nee. Het voorbeeld draait volledig in je browser. Niets van wat je typt of welke afbeelding je toevoegt, wordt naar een server gestuurd of opgeslagen.',
        },
      ],
      ja: [
        {
          q: 'Facebook広告の主要テキストの文字数制限はどれくらいですか？',
          a: '厳格な上限はありませんが、フィードは主要テキストをおよそ125文字で切り捨て、「… 続きを見る」リンクを付けます。タップなしで表示されるよう、フックと中心メッセージはその前に収めてください。',
        },
        {
          q: 'Facebook広告の見出しはどれくらいの長さにできますか？',
          a: '技術的にはほとんどの配置で40文字まできれいに表示されますが、長い見出しが圧縮・折り返されるモバイルでは27文字未満が最も安全です。',
        },
        {
          q: 'リンクの説明は常に表示されますか？',
          a: 'いいえ。約30文字のリンクの説明は、モバイルや見出しが長い場合にしばしば省略されます。任意のものとして扱い、重要な情報は決してそこに置かないでください。',
        },
        {
          q: '私の広告コピーはどこかにアップロードされますか？',
          a: 'いいえ。プレビューは完全にブラウザー内で動作します。入力した内容も添付した画像も、サーバーに送信されたり保存されたりすることはありません。',
        },
      ],
      zh: [
        {
          q: 'Facebook 广告主文案的字符限制是多少？',
          a: '没有硬性上限，但信息流会在大约 125 字符处截断主文案并显示"… 查看更多"链接。把钩子和核心信息放在该点之前，这样无需点按即可显示。',
        },
        {
          q: 'Facebook 广告标题可以多长？',
          a: '从技术上讲，在大多数版位中最多 40 字符能干净显示，但在移动端低于 27 字符最安全，较长的标题会被压缩或换行。',
        },
        {
          q: '链接描述总会显示吗？',
          a: '不会。约 30 字符的链接描述在移动端或标题较长时常被丢弃。把它视为可选项，切勿在此放置必要信息。',
        },
        {
          q: '我的广告文案会被上传到任何地方吗？',
          a: '不会。预览完全在你的浏览器中运行。你输入的任何内容或附加的任何图片都不会发送到服务器或被存储。',
        },
      ],
      da: [
        {
          q: 'Hvad er tegngrænsen for den primære tekst i en Facebook-annonce?',
          a: 'Der er ingen hård grænse, men feedet skærer den primære tekst af ved omkring 125 tegn med et "… Se mere"-link. Hold din krog og kernebudskab før det punkt, så de vises uden et tryk.',
        },
        {
          q: 'Hvor lang må en Facebook-annonceoverskrift være?',
          a: 'Teknisk vises op til 40 tegn rent på de fleste placeringer, men under 27 tegn er sikrest på mobil, hvor længere overskrifter bliver klemt eller brudt.',
        },
        {
          q: 'Vises linkbeskrivelsen altid?',
          a: 'Nej. Linkbeskrivelsen på omkring 30 tegn droppes ofte på mobil, eller når overskriften er lang. Behandl den som valgfri, og placér aldrig vigtig information der.',
        },
        {
          q: 'Bliver min annoncetekst uploadet nogen steder?',
          a: 'Nej. Forhåndsvisningen kører helt i din browser. Intet af det, du skriver, eller noget billede, du vedhæfter, sendes til en server eller gemmes.',
        },
      ],
    },
  },

  {
    id: 'linkedin-ads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-28',
    platformLimits:
      'LinkedIn single-image Sponsored Content: intro text truncates behind an inline "…more" around 150 characters on desktop (a little earlier on mobile; hard cap 3,000); headline best kept under 70 characters (hard cap 200); description under 100 characters (hard cap 300), shown mainly on desktop and the LinkedIn Audience Network.',

    slugs: {
      en: 'linkedin-ads',
      es: 'anuncios-de-linkedin',
      de: 'linkedin-anzeigen',
      fr: 'annonces-linkedin',
      pt: 'anuncios-do-linkedin',
      it: 'annunci-linkedin',
      nl: 'linkedin-advertenties',
      ja: 'linkedin-kokoku',
      zh: 'linkedin-guang-gao',
      da: 'linkedin-annoncer',
    },

    schemaName: {
      en: 'LinkedIn Ad Preview & Character Limit Simulator',
      es: 'Vista previa de anuncios de LinkedIn y simulador de límites de caracteres',
      de: 'LinkedIn-Anzeigenvorschau & Zeichenlimit-Simulator',
      fr: 'Aperçu d’annonces LinkedIn et simulateur de limites de caractères',
      pt: 'Pré-visualização de anúncios do LinkedIn e simulador de limites de caracteres',
      it: 'Anteprima degli annunci LinkedIn e simulatore dei limiti di caratteri',
      nl: 'LinkedIn-advertentievoorbeeld & tekenlimietsimulator',
      ja: 'LinkedIn広告プレビューと文字数制限シミュレーター',
      zh: 'LinkedIn 广告预览与字符限制模拟器',
      da: 'LinkedIn-annonceforhåndsvisning og tegngrænse-simulator',
    },

    titles: {
      en: 'LinkedIn Ad Preview — Live Sponsored Content Mockup & Character Limits',
      es: 'Vista previa de anuncios de LinkedIn — Maqueta de contenido patrocinado en vivo y límites de caracteres',
      de: 'LinkedIn-Anzeigenvorschau — Live-Mockup für Sponsored Content & Zeichenlimits',
      fr: 'Aperçu d’annonces LinkedIn — Maquette de contenu sponsorisé en direct et limites de caractères',
      pt: 'Pré-visualização de anúncios do LinkedIn — Maquete de conteúdo patrocinado ao vivo e limites de caracteres',
      it: 'Anteprima annunci LinkedIn — Mockup di contenuti sponsorizzati in tempo reale e limiti di caratteri',
      nl: 'LinkedIn-advertentievoorbeeld — Live mockup voor gesponsorde content & tekenlimieten',
      ja: 'LinkedIn広告プレビュー — スポンサードコンテンツのライブモックアップと文字数制限',
      zh: 'LinkedIn 广告预览 — 实时赞助内容模拟与字符限制',
      da: 'LinkedIn-annonceforhåndsvisning — Live mockup af sponsoreret indhold og tegngrænser',
    },

    metaDescriptions: {
      en: 'Free LinkedIn single-image ad preview. See exactly where your intro text hits the "…more" fold around 150 characters, check the 70-character headline and description limits, and switch between mobile and desktop — live as you type.',
      es: 'Vista previa gratuita de anuncios de imagen única de LinkedIn. Ve exactamente dónde tu texto de introducción alcanza el pliegue "…más" sobre los 150 caracteres, comprueba los límites de título de 70 caracteres y de descripción, y alterna entre móvil y escritorio, en vivo mientras escribes.',
      de: 'Kostenlose Vorschau für LinkedIn-Einzelbildanzeigen. Sieh genau, wo dein Einleitungstext bei etwa 150 Zeichen auf die „…mehr"-Falz trifft, prüfe das 70-Zeichen-Titellimit und das Beschreibungslimit und wechsle live beim Tippen zwischen Mobil und Desktop.',
      fr: 'Aperçu gratuit d’annonces LinkedIn à image unique. Voyez exactement où votre texte d’introduction atteint le pli « …plus » vers 150 caractères, vérifiez les limites de titre de 70 caractères et de description, et basculez entre mobile et ordinateur, en direct pendant que vous tapez.',
      pt: 'Pré-visualização gratuita de anúncios de imagem única do LinkedIn. Veja exatamente onde o seu texto de introdução atinge a dobra "…mais" por volta dos 150 caracteres, verifique os limites de título de 70 caracteres e de descrição e alterne entre telemóvel e computador, ao vivo enquanto escreve.',
      it: 'Anteprima gratuita degli annunci LinkedIn con immagine singola. Vedi esattamente dove il testo introduttivo raggiunge la piega "…altro" intorno ai 150 caratteri, controlla i limiti di titolo di 70 caratteri e di descrizione e passa da mobile a desktop, in tempo reale mentre scrivi.',
      nl: 'Gratis voorbeeld van LinkedIn-advertenties met één afbeelding. Zie precies waar je introtekst de "…meer"-vouw rond 150 tekens raakt, controleer de limieten voor de kop van 70 tekens en de beschrijving en wissel tussen mobiel en desktop — live terwijl je typt.',
      ja: '無料のLinkedIn単一画像広告プレビュー。導入テキストが約150文字で「…もっと見る」の折り返しに達する位置を正確に確認し、70文字の見出しと説明の制限をチェックし、入力しながらモバイルとデスクトップをリアルタイムで切り替えられます。',
      zh: '免费的 LinkedIn 单图广告预览。准确查看你的引导文案在约 150 字符处触及"…更多"折叠的位置，检查 70 字符的标题和描述限制，并在输入时实时切换移动端与桌面端。',
      da: 'Gratis forhåndsvisning af LinkedIn-annoncer med ét billede. Se præcis, hvor din introtekst rammer "…mere"-folden omkring 150 tegn, tjek grænserne for overskrift på 70 tegn og beskrivelse, og skift mellem mobil og desktop — live mens du skriver.',
    },

    intro: {
      en: 'Paste your intro text, headline, and description below to see a pixel-accurate LinkedIn Sponsored Content mockup. The preview applies LinkedIn\'s real "…more" fold around 150 characters and shows how your headline and description behave on mobile versus desktop.',
      es: 'Pega tu texto de introducción, título y descripción abajo para ver una maqueta de contenido patrocinado de LinkedIn con precisión de píxeles. La vista previa aplica el pliegue real "…más" de LinkedIn sobre los 150 caracteres y muestra cómo se comportan tu título y descripción en móvil frente a escritorio.',
      de: 'Füge unten deinen Einleitungstext, Titel und deine Beschreibung ein, um ein pixelgenaues Mockup von LinkedIn Sponsored Content zu sehen. Die Vorschau wendet LinkedIns echte „…mehr"-Falz bei etwa 150 Zeichen an und zeigt, wie sich Titel und Beschreibung auf Mobil und Desktop verhalten.',
      fr: 'Collez votre texte d’introduction, votre titre et votre description ci-dessous pour voir une maquette de contenu sponsorisé LinkedIn au pixel près. L’aperçu applique le vrai pli « …plus » de LinkedIn vers 150 caractères et montre comment votre titre et votre description se comportent sur mobile et ordinateur.',
      pt: 'Cole o seu texto de introdução, título e descrição abaixo para ver uma maquete de conteúdo patrocinado do LinkedIn com precisão de pixels. A pré-visualização aplica a dobra real "…mais" do LinkedIn por volta dos 150 caracteres e mostra como o seu título e descrição se comportam no telemóvel face ao computador.',
      it: 'Incolla qui sotto il testo introduttivo, il titolo e la descrizione per vedere un mockup dei contenuti sponsorizzati di LinkedIn accurato al pixel. L’anteprima applica la vera piega "…altro" di LinkedIn intorno ai 150 caratteri e mostra come si comportano titolo e descrizione su mobile rispetto al desktop.',
      nl: 'Plak hieronder je introtekst, kop en beschrijving om een pixelnauwkeurige mockup van LinkedIn Sponsored Content te zien. Het voorbeeld past LinkedIns echte "…meer"-vouw rond 150 tekens toe en laat zien hoe je kop en beschrijving zich gedragen op mobiel versus desktop.',
      ja: '下に導入テキスト、見出し、説明を貼り付けると、ピクセル精度のLinkedInスポンサードコンテンツのモックアップが表示されます。プレビューはLinkedInの実際の約150文字での「…もっと見る」の折り返しを適用し、見出しと説明がモバイルとデスクトップでどのように表示されるかを示します。',
      zh: '在下方粘贴你的引导文案、标题和描述，即可看到像素级精确的 LinkedIn 赞助内容模拟。预览会应用 LinkedIn 真实的约 150 字符"…更多"折叠，并显示你的标题和描述在移动端与桌面端的表现。',
      da: 'Indsæt din introtekst, overskrift og beskrivelse nedenfor for at se et pixelnøjagtigt mockup af LinkedIn Sponsored Content. Forhåndsvisningen anvender LinkedIns rigtige "…mere"-fold omkring 150 tegn og viser, hvordan din overskrift og beskrivelse opfører sig på mobil kontra desktop.',
    },

    content: {
      en: `<h2>LinkedIn ad character limits that actually matter</h2>
<p>LinkedIn lets you type a great deal — the intro text accepts up to <strong>3,000 characters</strong> — but what trips advertisers up is <strong>the fold</strong>. In the feed, your <strong>intro text is collapsed behind an inline "…more" at roughly 150 characters</strong>, and everything after it stays hidden unless the viewer expands it. Most never do. The simulator above shows that fold live, so you can guarantee your hook and value proposition land before "…more".</p>
<h2>Headline and description rules</h2>
<p>The <strong>headline</strong> is the bold line on the link card beneath your image. LinkedIn accepts up to <strong>200 characters</strong>, but keep it <strong>under 70</strong> so it never truncates on the card. The <strong>description</strong> accepts up to <strong>300 characters</strong> and reads best <strong>under 100</strong>; it surfaces mainly on desktop and across the LinkedIn Audience Network, so treat it as supporting copy rather than a place for anything critical.</p>
<h2>Mobile versus desktop</h2>
<p>Most LinkedIn members scroll the feed on their phones, and mobile is less forgiving: the narrower column folds the intro text a little earlier, and the link-card description is dropped. Toggle the preview between <strong>Mobile</strong> and <strong>Desktop</strong> to confirm your ad reads cleanly on the small screen, where the majority of impressions happen.</p>
<h2>Why preview before you publish</h2>
<p>Rewriting an ad after it has entered review wastes time and can reset its learning. Checking the fold in advance means your strongest copy is never buried behind "…more," your headline never clips, and your call to action stays visible. Because PostTruncate runs entirely in your browser, nothing you paste is uploaded or stored — type your draft, watch the fold in real time, and copy the final version straight into Campaign Manager.</p>`,
      es: `<h2>Los límites de caracteres de los anuncios de LinkedIn que de verdad importan</h2>
<p>LinkedIn te deja escribir muchísimo —el texto de introducción admite hasta <strong>3000 caracteres</strong>— pero lo que hace tropezar a los anunciantes es <strong>el pliegue</strong>. En el feed, tu <strong>texto de introducción se colapsa tras un "…más" en línea sobre los 150 caracteres</strong>, y todo lo que queda después permanece oculto a menos que el usuario lo expanda. Casi nadie lo hace. El simulador de arriba muestra ese pliegue en vivo, para que garantices que tu gancho y tu propuesta de valor queden antes de "…más".</p>
<h2>Reglas de título y descripción</h2>
<p>El <strong>título</strong> es la línea en negrita de la tarjeta de enlace debajo de tu imagen. LinkedIn admite hasta <strong>200 caracteres</strong>, pero mantenlo <strong>por debajo de 70</strong> para que nunca se trunque en la tarjeta. La <strong>descripción</strong> admite hasta <strong>300 caracteres</strong> y se lee mejor <strong>por debajo de 100</strong>; aparece sobre todo en escritorio y en la Red de Audiencia de LinkedIn, así que trátala como texto de apoyo y no como un lugar para algo crítico.</p>
<h2>Móvil frente a escritorio</h2>
<p>La mayoría de los miembros de LinkedIn recorren el feed en el móvil, y el móvil es menos indulgente: la columna más estrecha pliega el texto de introducción un poco antes y la descripción de la tarjeta de enlace se elimina. Alterna la vista previa entre <strong>Móvil</strong> y <strong>Escritorio</strong> para confirmar que tu anuncio se lee bien en la pantalla pequeña, donde ocurre la mayoría de las impresiones.</p>
<h2>Por qué hacer la vista previa antes de publicar</h2>
<p>Reescribir un anuncio después de que ha entrado en revisión hace perder tiempo y puede reiniciar su aprendizaje. Comprobar el pliegue por adelantado significa que tu mejor texto nunca queda enterrado tras "…más", tu título nunca se corta y tu llamada a la acción permanece visible. Como PostTruncate funciona por completo en tu navegador, nada de lo que pegas se sube ni se almacena: escribe tu borrador, observa el pliegue en tiempo real y copia la versión final directamente en el Administrador de campañas.</p>`,
      de: `<h2>LinkedIn-Anzeigen-Zeichenlimits, die wirklich zählen</h2>
<p>LinkedIn lässt dich sehr viel tippen — der Einleitungstext erlaubt bis zu <strong>3.000 Zeichen</strong> — doch was Werbetreibende stolpern lässt, ist <strong>die Falz</strong>. Im Feed wird dein <strong>Einleitungstext bei etwa 150 Zeichen hinter einem „…mehr" eingeklappt</strong>, und alles danach bleibt verborgen, sofern der Betrachter es nicht ausklappt. Die meisten tun das nie. Der Simulator oben zeigt diese Falz live, sodass du sicherstellen kannst, dass dein Aufhänger und dein Nutzenversprechen vor „…mehr" landen.</p>
<h2>Regeln für Titel und Beschreibung</h2>
<p>Der <strong>Titel</strong> ist die fette Zeile auf der Link-Karte unter deinem Bild. LinkedIn erlaubt bis zu <strong>200 Zeichen</strong>, halte ihn aber <strong>unter 70</strong>, damit er auf der Karte nie abschneidet. Die <strong>Beschreibung</strong> erlaubt bis zu <strong>300 Zeichen</strong> und liest sich am besten <strong>unter 100</strong>; sie erscheint vor allem auf dem Desktop und im LinkedIn Audience Network, behandle sie also als unterstützenden Text und nicht als Ort für Wichtiges.</p>
<h2>Mobil versus Desktop</h2>
<p>Die meisten LinkedIn-Mitglieder scrollen den Feed auf dem Handy, und Mobil verzeiht weniger: Die schmalere Spalte klappt den Einleitungstext etwas früher ein, und die Beschreibung der Link-Karte fällt weg. Schalte die Vorschau zwischen <strong>Mobil</strong> und <strong>Desktop</strong> um, um zu bestätigen, dass deine Anzeige auf dem kleinen Bildschirm sauber liest, wo die meisten Impressionen geschehen.</p>
<h2>Warum vor dem Veröffentlichen eine Vorschau</h2>
<p>Eine Anzeige umzuschreiben, nachdem sie in die Prüfung gegangen ist, kostet Zeit und kann ihr Lernen zurücksetzen. Die Falz vorab zu prüfen bedeutet, dass dein stärkster Text nie hinter „…mehr" verschwindet, dein Titel nie abschneidet und dein Call-to-Action sichtbar bleibt. Da PostTruncate vollständig in deinem Browser läuft, wird nichts, was du einfügst, hochgeladen oder gespeichert — tippe deinen Entwurf, beobachte die Falz in Echtzeit und kopiere die finale Version direkt in den Kampagnen-Manager.</p>`,
      fr: `<h2>Les limites de caractères des annonces LinkedIn qui comptent vraiment</h2>
<p>LinkedIn vous laisse écrire énormément — le texte d’introduction accepte jusqu’à <strong>3 000 caractères</strong> — mais ce qui fait trébucher les annonceurs, c’est <strong>le pli</strong>. Dans le fil, votre <strong>texte d’introduction est replié derrière un « …plus » vers 150 caractères</strong>, et tout ce qui suit reste masqué à moins que la personne ne le développe. La plupart ne le font jamais. Le simulateur ci-dessus montre ce pli en direct, pour que vous garantissiez que votre accroche et votre proposition de valeur restent avant « …plus ».</p>
<h2>Règles de titre et de description</h2>
<p>Le <strong>titre</strong> est la ligne en gras de la carte de lien sous votre image. LinkedIn accepte jusqu’à <strong>200 caractères</strong>, mais gardez-le <strong>sous 70</strong> pour qu’il ne se coupe jamais sur la carte. La <strong>description</strong> accepte jusqu’à <strong>300 caractères</strong> et se lit mieux <strong>sous 100</strong> ; elle apparaît surtout sur ordinateur et sur le LinkedIn Audience Network, alors traitez-la comme un texte d’appoint, pas comme un endroit pour l’essentiel.</p>
<h2>Mobile contre ordinateur</h2>
<p>La plupart des membres LinkedIn parcourent le fil sur leur téléphone, et le mobile pardonne moins : la colonne plus étroite replie le texte d’introduction un peu plus tôt, et la description de la carte de lien disparaît. Basculez l’aperçu entre <strong>Mobile</strong> et <strong>Ordinateur</strong> pour confirmer que votre annonce se lit proprement sur le petit écran, où se produit la majorité des impressions.</p>
<h2>Pourquoi prévisualiser avant de publier</h2>
<p>Réécrire une annonce après qu’elle est entrée en examen fait perdre du temps et peut réinitialiser son apprentissage. Vérifier le pli à l’avance signifie que votre meilleur texte n’est jamais enterré derrière « …plus », que votre titre n’est jamais coupé et que votre appel à l’action reste visible. Comme PostTruncate fonctionne entièrement dans votre navigateur, rien de ce que vous collez n’est téléversé ni stocké — tapez votre brouillon, observez le pli en temps réel et copiez la version finale directement dans le Gestionnaire de campagnes.</p>`,
      pt: `<h2>Os limites de caracteres dos anúncios do LinkedIn que realmente importam</h2>
<p>O LinkedIn deixa-o escrever imenso — o texto de introdução aceita até <strong>3000 caracteres</strong> — mas o que faz os anunciantes tropeçarem é <strong>a dobra</strong>. No feed, o seu <strong>texto de introdução é recolhido atrás de um "…mais" por volta dos 150 caracteres</strong>, e tudo o que vem depois fica oculto a menos que o utilizador o expanda. A maioria nunca o faz. O simulador acima mostra essa dobra ao vivo, para que garanta que o seu gancho e a sua proposta de valor ficam antes de "…mais".</p>
<h2>Regras de título e descrição</h2>
<p>O <strong>título</strong> é a linha a negrito no cartão de link por baixo da sua imagem. O LinkedIn aceita até <strong>200 caracteres</strong>, mas mantenha-o <strong>abaixo de 70</strong> para que nunca seja truncado no cartão. A <strong>descrição</strong> aceita até <strong>300 caracteres</strong> e lê-se melhor <strong>abaixo de 100</strong>; aparece sobretudo no computador e na Rede de Público do LinkedIn, por isso trate-a como texto de apoio e não como lugar para algo crítico.</p>
<h2>Telemóvel face a computador</h2>
<p>A maioria dos membros do LinkedIn percorre o feed no telemóvel, e o telemóvel é menos tolerante: a coluna mais estreita dobra o texto de introdução um pouco mais cedo e a descrição do cartão de link é eliminada. Alterne a pré-visualização entre <strong>Telemóvel</strong> e <strong>Computador</strong> para confirmar que o seu anúncio se lê de forma limpa no ecrã pequeno, onde acontece a maioria das impressões.</p>
<h2>Porquê pré-visualizar antes de publicar</h2>
<p>Reescrever um anúncio depois de entrar em revisão desperdiça tempo e pode reiniciar a sua aprendizagem. Verificar a dobra com antecedência significa que o seu melhor texto nunca fica enterrado atrás de "…mais", o seu título nunca corta e a sua chamada para ação permanece visível. Como o PostTruncate funciona totalmente no seu navegador, nada do que cola é carregado ou armazenado — escreva o seu rascunho, observe a dobra em tempo real e copie a versão final diretamente para o Gestor de campanhas.</p>`,
      it: `<h2>I limiti di caratteri degli annunci LinkedIn che contano davvero</h2>
<p>LinkedIn ti lascia scrivere moltissimo — il testo introduttivo accetta fino a <strong>3.000 caratteri</strong> — ma ciò che fa inciampare gli inserzionisti è <strong>la piega</strong>. Nel feed, il tuo <strong>testo introduttivo viene ripiegato dietro un "…altro" intorno ai 150 caratteri</strong>, e tutto ciò che viene dopo resta nascosto a meno che l’utente non lo espanda. Quasi nessuno lo fa. Il simulatore qui sopra mostra quella piega in tempo reale, così puoi garantire che il tuo gancio e la tua proposta di valore restino prima di "…altro".</p>
<h2>Regole di titolo e descrizione</h2>
<p>Il <strong>titolo</strong> è la riga in grassetto sulla scheda del link sotto la tua immagine. LinkedIn accetta fino a <strong>200 caratteri</strong>, ma tienilo <strong>sotto i 70</strong> così non viene mai troncato sulla scheda. La <strong>descrizione</strong> accetta fino a <strong>300 caratteri</strong> e si legge meglio <strong>sotto i 100</strong>; compare soprattutto su desktop e sul LinkedIn Audience Network, quindi trattala come testo di supporto e non come un posto per qualcosa di critico.</p>
<h2>Mobile contro desktop</h2>
<p>La maggior parte degli iscritti a LinkedIn scorre il feed dal telefono, e il mobile è meno indulgente: la colonna più stretta ripiega il testo introduttivo un po’ prima e la descrizione della scheda del link viene eliminata. Alterna l’anteprima tra <strong>Mobile</strong> e <strong>Desktop</strong> per confermare che il tuo annuncio si legga in modo pulito sullo schermo piccolo, dove avviene la maggior parte delle impression.</p>
<h2>Perché fare l’anteprima prima di pubblicare</h2>
<p>Riscrivere un annuncio dopo che è entrato in revisione fa perdere tempo e può azzerare il suo apprendimento. Controllare la piega in anticipo significa che il tuo testo migliore non finisce mai sepolto dietro "…altro", il tuo titolo non viene mai tagliato e la tua call to action resta visibile. Poiché PostTruncate funziona interamente nel tuo browser, nulla di ciò che incolli viene caricato o memorizzato — scrivi la tua bozza, osserva la piega in tempo reale e copia la versione finale direttamente in Gestione campagne.</p>`,
      nl: `<h2>LinkedIn-advertentie-tekenlimieten die er echt toe doen</h2>
<p>LinkedIn laat je heel veel typen — de introtekst accepteert tot <strong>3.000 tekens</strong> — maar wat adverteerders doet struikelen is <strong>de vouw</strong>. In de feed wordt je <strong>introtekst rond 150 tekens achter een "…meer" ingeklapt</strong>, en alles daarna blijft verborgen tenzij de kijker het uitklapt. De meesten doen dat nooit. De simulator hierboven toont die vouw live, zodat je kunt garanderen dat je hook en waardepropositie vóór "…meer" landen.</p>
<h2>Regels voor kop en beschrijving</h2>
<p>De <strong>kop</strong> is de vetgedrukte regel op de linkkaart onder je afbeelding. LinkedIn accepteert tot <strong>200 tekens</strong>, maar houd hem <strong>onder de 70</strong> zodat hij nooit wordt afgekapt op de kaart. De <strong>beschrijving</strong> accepteert tot <strong>300 tekens</strong> en leest het best <strong>onder de 100</strong>; ze verschijnt vooral op desktop en op het LinkedIn Audience Network, dus behandel haar als ondersteunende tekst en niet als plek voor iets cruciaals.</p>
<h2>Mobiel versus desktop</h2>
<p>De meeste LinkedIn-leden scrollen de feed op hun telefoon, en mobiel is minder vergevingsgezind: de smallere kolom vouwt de introtekst iets eerder in en de beschrijving van de linkkaart vervalt. Wissel het voorbeeld tussen <strong>Mobiel</strong> en <strong>Desktop</strong> om te bevestigen dat je advertentie netjes leest op het kleine scherm, waar de meeste vertoningen plaatsvinden.</p>
<h2>Waarom een voorbeeld bekijken vóór publicatie</h2>
<p>Een advertentie herschrijven nadat hij in beoordeling is gegaan, kost tijd en kan zijn leerfase resetten. De vouw vooraf controleren betekent dat je sterkste tekst nooit achter "…meer" verdwijnt, je kop nooit wordt afgekapt en je call-to-action zichtbaar blijft. Omdat PostTruncate volledig in je browser draait, wordt niets van wat je plakt geüpload of opgeslagen — typ je concept, bekijk de vouw in realtime en kopieer de definitieve versie rechtstreeks naar Campagnebeheer.</p>`,
      ja: `<h2>本当に重要なLinkedIn広告の文字数制限</h2>
<p>LinkedInは非常に多くの文字を入力できます。導入テキストは最大<strong>3,000文字</strong>まで受け付けます。しかし広告主がつまずくのは<strong>折り返し</strong>です。フィードでは、<strong>導入テキストはおよそ150文字でインラインの「…もっと見る」の裏に折りたたまれ</strong>、それ以降はユーザーが展開しない限り隠れたままです。ほとんどの人は展開しません。上のシミュレーターはその折り返しをリアルタイムで表示するので、フックと価値提案を確実に「…もっと見る」より前に収められます。</p>
<h2>見出しと説明のルール</h2>
<p><strong>見出し</strong>は画像の下のリンクカードにある太字の行です。LinkedInは最大<strong>200文字</strong>まで受け付けますが、カードで切れないよう<strong>70文字未満</strong>に保ってください。<strong>説明</strong>は最大<strong>300文字</strong>まで受け付け、<strong>100文字未満</strong>が最も読みやすくなります。これは主にデスクトップとLinkedInオーディエンスネットワークで表示されるため、重要な情報を置く場所ではなく補足テキストとして扱ってください。</p>
<h2>モバイル対デスクトップ</h2>
<p>ほとんどのLinkedInメンバーはスマートフォンでフィードをスクロールしており、モバイルはより容赦がありません。狭い列は導入テキストを少し早く折りたたみ、リンクカードの説明は省略されます。プレビューを<strong>モバイル</strong>と<strong>デスクトップ</strong>で切り替えて、インプレッションの大半が発生する小さな画面で広告がきれいに読めることを確認してください。</p>
<h2>公開前にプレビューする理由</h2>
<p>広告が審査に入った後に書き直すと時間を浪費し、学習がリセットされることがあります。事前に折り返しを確認しておけば、最も強いコピーが「…もっと見る」の裏に埋もれることはなく、見出しが切れることもなく、行動喚起が表示されたままになります。PostTruncateは完全にブラウザー内で動作するため、貼り付けた内容はアップロードも保存もされません。下書きを入力し、折り返しをリアルタイムで確認し、最終版をキャンペーンマネージャーに直接コピーしてください。</p>`,
      zh: `<h2>真正重要的 LinkedIn 广告字符限制</h2>
<p>LinkedIn 允许你输入很多内容——引导文案最多可达 <strong>3000 字符</strong>——但让广告主栽跟头的是<strong>折叠</strong>。在信息流中，你的<strong>引导文案大约在 150 字符处被折叠到行内的"…更多"之后</strong>，除非用户展开，否则其后内容都会隐藏。大多数人从不展开。上方的模拟器会实时显示该折叠点，让你确保钩子和价值主张落在"…更多"之前。</p>
<h2>标题与描述规则</h2>
<p><strong>标题</strong>是图片下方链接卡片上的加粗行。LinkedIn 最多接受 <strong>200 字符</strong>，但请保持在 <strong>70 字符以内</strong>，这样它在卡片上就永远不会被截断。<strong>描述</strong>最多接受 <strong>300 字符</strong>，在 <strong>100 字符以内</strong>阅读体验最佳；它主要显示在桌面端和 LinkedIn 受众网络上，因此应将其视为辅助文案，而不是放置关键信息的地方。</p>
<h2>移动端对比桌面端</h2>
<p>大多数 LinkedIn 会员都在手机上浏览信息流，而移动端宽容度更低：更窄的栏目会更早地折叠引导文案，链接卡片的描述也会被丢弃。在<strong>移动端</strong>与<strong>桌面端</strong>之间切换预览，确认你的广告在小屏幕上读起来清爽——大多数展示都发生在那里。</p>
<h2>为什么要在发布前预览</h2>
<p>广告进入审核后再改写既浪费时间，又可能重置其学习期。提前检查折叠意味着你最有力的文案绝不会埋在"…更多"之后，标题不会被切，行动号召保持可见。由于 PostTruncate 完全在你的浏览器中运行，你粘贴的任何内容都不会被上传或存储——输入草稿，实时观察折叠，再把最终版本直接复制到广告系列管理工具。</p>`,
      da: `<h2>LinkedIn-annoncens tegngrænser, der faktisk betyder noget</h2>
<p>LinkedIn lader dig skrive rigtig meget — introteksten accepterer op til <strong>3.000 tegn</strong> — men det, der får annoncører til at snuble, er <strong>folden</strong>. I feedet bliver din <strong>introtekst foldet sammen bag et "…mere" omkring 150 tegn</strong>, og alt derefter forbliver skjult, medmindre seeren udvider det. De fleste gør det aldrig. Simulatoren ovenfor viser den fold live, så du kan garantere, at din krog og dit værditilbud lander før "…mere".</p>
<h2>Regler for overskrift og beskrivelse</h2>
<p><strong>Overskriften</strong> er den fede linje på linkkortet under dit billede. LinkedIn accepterer op til <strong>200 tegn</strong>, men hold den <strong>under 70</strong>, så den aldrig skæres af på kortet. <strong>Beskrivelsen</strong> accepterer op til <strong>300 tegn</strong> og læses bedst <strong>under 100</strong>; den vises primært på desktop og på tværs af LinkedIn Audience Network, så behandl den som støttetekst og ikke som et sted til noget kritisk.</p>
<h2>Mobil kontra desktop</h2>
<p>De fleste LinkedIn-medlemmer scroller feedet på telefonen, og mobil er mindre tilgivende: den smallere spalte folder introteksten lidt tidligere, og linkkortets beskrivelse droppes. Skift forhåndsvisningen mellem <strong>Mobil</strong> og <strong>Desktop</strong> for at bekræfte, at din annonce læses rent på den lille skærm, hvor størstedelen af visningerne sker.</p>
<h2>Hvorfor forhåndsvise før du udgiver</h2>
<p>At omskrive en annonce, efter den er gået i gennemgang, spilder tid og kan nulstille dens læring. At tjekke folden på forhånd betyder, at din stærkeste tekst aldrig begraves bag "…mere", din overskrift aldrig klippes, og din handlingsopfordring forbliver synlig. Fordi PostTruncate kører helt i din browser, bliver intet af det, du indsætter, uploadet eller gemt — skriv dit udkast, se folden i realtid, og kopiér den endelige version direkte ind i Kampagneadministrator.</p>`,
    },

    faq: {
      en: [
        {
          q: 'What is the LinkedIn ad intro text character limit?',
          a: 'You can enter up to 3,000 characters, but the feed folds the intro behind "…more" at roughly 150 characters (a little earlier on mobile). Keep your hook and core message before that point so it shows without a click.',
        },
        {
          q: 'How long can a LinkedIn ad headline be?',
          a: 'The hard cap is 200 characters, but keep it under 70 so the headline never truncates on the link card across placements.',
        },
        {
          q: 'Does the description always show?',
          a: 'No. The description (up to 300 characters, best under 100) surfaces mainly on desktop and the LinkedIn Audience Network, and is often dropped on the mobile feed card. Treat it as supporting copy.',
        },
        {
          q: 'Is my ad copy uploaded anywhere?',
          a: 'No. The preview runs entirely in your browser. Nothing you type or any image you attach is sent to a server or stored.',
        },
      ],
      es: [
        {
          q: '¿Cuál es el límite de caracteres del texto de introducción de un anuncio de LinkedIn?',
          a: 'Puedes introducir hasta 3000 caracteres, pero el feed pliega la introducción tras "…más" sobre los 150 caracteres (un poco antes en móvil). Mantén tu gancho y tu mensaje central antes de ese punto para que se muestren sin un clic.',
        },
        {
          q: '¿Cuánto puede medir el título de un anuncio de LinkedIn?',
          a: 'El tope rígido es de 200 caracteres, pero mantenlo por debajo de 70 para que el título nunca se trunque en la tarjeta de enlace en todas las ubicaciones.',
        },
        {
          q: '¿La descripción siempre se muestra?',
          a: 'No. La descripción (hasta 300 caracteres, mejor por debajo de 100) aparece sobre todo en escritorio y en la Red de Audiencia de LinkedIn, y a menudo se elimina en la tarjeta del feed móvil. Trátala como texto de apoyo.',
        },
        {
          q: '¿Se sube a algún sitio el texto de mi anuncio?',
          a: 'No. La vista previa funciona por completo en tu navegador. Nada de lo que escribes ni ninguna imagen que adjuntas se envía a un servidor ni se almacena.',
        },
      ],
      de: [
        {
          q: 'Wie hoch ist das Zeichenlimit des Einleitungstexts einer LinkedIn-Anzeige?',
          a: 'Du kannst bis zu 3.000 Zeichen eingeben, aber der Feed klappt die Einleitung bei etwa 150 Zeichen hinter „…mehr" ein (auf dem Handy etwas früher). Halte deinen Aufhänger und deine Kernbotschaft vor diesem Punkt, damit sie ohne Klick erscheinen.',
        },
        {
          q: 'Wie lang darf ein LinkedIn-Anzeigentitel sein?',
          a: 'Die harte Grenze liegt bei 200 Zeichen, aber halte ihn unter 70, damit der Titel auf der Link-Karte über alle Platzierungen nie abschneidet.',
        },
        {
          q: 'Wird die Beschreibung immer angezeigt?',
          a: 'Nein. Die Beschreibung (bis zu 300 Zeichen, am besten unter 100) erscheint vor allem auf dem Desktop und im LinkedIn Audience Network und wird auf der mobilen Feed-Karte oft weggelassen. Behandle sie als unterstützenden Text.',
        },
        {
          q: 'Wird mein Anzeigentext irgendwo hochgeladen?',
          a: 'Nein. Die Vorschau läuft vollständig in deinem Browser. Nichts, was du tippst, und kein Bild, das du anhängst, wird an einen Server gesendet oder gespeichert.',
        },
      ],
      fr: [
        {
          q: 'Quelle est la limite de caractères du texte d’introduction d’une annonce LinkedIn ?',
          a: 'Vous pouvez saisir jusqu’à 3 000 caractères, mais le fil replie l’introduction derrière « …plus » vers 150 caractères (un peu plus tôt sur mobile). Gardez votre accroche et votre message clé avant ce point pour qu’ils s’affichent sans clic.',
        },
        {
          q: 'Quelle longueur peut faire un titre d’annonce LinkedIn ?',
          a: 'Le plafond strict est de 200 caractères, mais gardez-le sous 70 pour que le titre ne se coupe jamais sur la carte de lien, quel que soit l’emplacement.',
        },
        {
          q: 'La description s’affiche-t-elle toujours ?',
          a: 'Non. La description (jusqu’à 300 caractères, idéalement sous 100) apparaît surtout sur ordinateur et sur le LinkedIn Audience Network, et est souvent supprimée sur la carte du fil mobile. Considérez-la comme un texte d’appoint.',
        },
        {
          q: 'Le texte de mon annonce est-il téléversé quelque part ?',
          a: 'Non. L’aperçu fonctionne entièrement dans votre navigateur. Rien de ce que vous tapez ni aucune image que vous joignez n’est envoyé à un serveur ni stocké.',
        },
      ],
      pt: [
        {
          q: 'Qual é o limite de caracteres do texto de introdução de um anúncio do LinkedIn?',
          a: 'Pode introduzir até 3000 caracteres, mas o feed dobra a introdução atrás de "…mais" por volta dos 150 caracteres (um pouco mais cedo no telemóvel). Mantenha o seu gancho e a mensagem central antes desse ponto para que apareçam sem um clique.',
        },
        {
          q: 'Que comprimento pode ter um título de anúncio do LinkedIn?',
          a: 'O limite rígido é de 200 caracteres, mas mantenha-o abaixo de 70 para que o título nunca seja truncado no cartão de link em todos os posicionamentos.',
        },
        {
          q: 'A descrição mostra-se sempre?',
          a: 'Não. A descrição (até 300 caracteres, idealmente abaixo de 100) aparece sobretudo no computador e na Rede de Público do LinkedIn, e é frequentemente eliminada no cartão do feed móvel. Trate-a como texto de apoio.',
        },
        {
          q: 'O texto do meu anúncio é carregado para algum lado?',
          a: 'Não. A pré-visualização funciona totalmente no seu navegador. Nada do que escreve nem qualquer imagem que anexa é enviado para um servidor ou armazenado.',
        },
      ],
      it: [
        {
          q: 'Qual è il limite di caratteri del testo introduttivo di un annuncio LinkedIn?',
          a: 'Puoi inserire fino a 3.000 caratteri, ma il feed ripiega l’introduzione dietro "…altro" intorno ai 150 caratteri (un po’ prima su mobile). Tieni il gancio e il messaggio centrale prima di quel punto perché si vedano senza un clic.',
        },
        {
          q: 'Quanto può essere lungo il titolo di un annuncio LinkedIn?',
          a: 'Il limite rigido è di 200 caratteri, ma tienilo sotto i 70 così il titolo non viene mai troncato sulla scheda del link su tutti i posizionamenti.',
        },
        {
          q: 'La descrizione viene sempre mostrata?',
          a: 'No. La descrizione (fino a 300 caratteri, meglio sotto i 100) compare soprattutto su desktop e sul LinkedIn Audience Network, e viene spesso eliminata sulla scheda del feed mobile. Trattala come testo di supporto.',
        },
        {
          q: 'Il testo del mio annuncio viene caricato da qualche parte?',
          a: 'No. L’anteprima funziona interamente nel tuo browser. Nulla di ciò che scrivi né alcuna immagine che alleghi viene inviato a un server o memorizzato.',
        },
      ],
      nl: [
        {
          q: 'Wat is de tekenlimiet van de introtekst van een LinkedIn-advertentie?',
          a: 'Je kunt tot 3.000 tekens invoeren, maar de feed vouwt de intro achter "…meer" rond 150 tekens in (iets eerder op mobiel). Houd je hook en kernboodschap vóór dat punt zodat ze zonder klik verschijnen.',
        },
        {
          q: 'Hoe lang mag een LinkedIn-advertentiekop zijn?',
          a: 'De harde limiet is 200 tekens, maar houd hem onder de 70 zodat de kop nooit wordt afgekapt op de linkkaart, op alle plaatsingen.',
        },
        {
          q: 'Wordt de beschrijving altijd getoond?',
          a: 'Nee. De beschrijving (tot 300 tekens, het best onder de 100) verschijnt vooral op desktop en op het LinkedIn Audience Network, en wordt op de mobiele feedkaart vaak weggelaten. Behandel haar als ondersteunende tekst.',
        },
        {
          q: 'Wordt mijn advertentietekst ergens geüpload?',
          a: 'Nee. Het voorbeeld draait volledig in je browser. Niets van wat je typt of welke afbeelding je toevoegt, wordt naar een server gestuurd of opgeslagen.',
        },
      ],
      ja: [
        {
          q: 'LinkedIn広告の導入テキストの文字数制限はどれくらいですか？',
          a: '最大3,000文字まで入力できますが、フィードは導入テキストをおよそ150文字で「…もっと見る」の裏に折りたたみます（モバイルでは少し早めです）。クリックなしで表示されるよう、フックと中心メッセージはその前に収めてください。',
        },
        {
          q: 'LinkedIn広告の見出しはどれくらいの長さにできますか？',
          a: 'ハードな上限は200文字ですが、すべての配置でリンクカード上の見出しが切れないよう、70文字未満に保ってください。',
        },
        {
          q: '説明は常に表示されますか？',
          a: 'いいえ。説明（最大300文字、100文字未満が最適）は主にデスクトップとLinkedInオーディエンスネットワークで表示され、モバイルのフィードカードではしばしば省略されます。補足テキストとして扱ってください。',
        },
        {
          q: '私の広告コピーはどこかにアップロードされますか？',
          a: 'いいえ。プレビューは完全にブラウザー内で動作します。入力した内容も添付した画像も、サーバーに送信されたり保存されたりすることはありません。',
        },
      ],
      zh: [
        {
          q: 'LinkedIn 广告引导文案的字符限制是多少？',
          a: '你最多可输入 3000 字符，但信息流会在大约 150 字符处把引导文案折叠到"…更多"之后（移动端略早）。把钩子和核心信息放在该点之前，这样无需点击即可显示。',
        },
        {
          q: 'LinkedIn 广告标题可以多长？',
          a: '硬性上限为 200 字符，但请保持在 70 字符以内，这样标题在所有版位的链接卡片上都不会被截断。',
        },
        {
          q: '描述总会显示吗？',
          a: '不会。描述（最多 300 字符，最好在 100 字符以内）主要显示在桌面端和 LinkedIn 受众网络上，在移动端信息流卡片上常被丢弃。把它视为辅助文案。',
        },
        {
          q: '我的广告文案会被上传到任何地方吗？',
          a: '不会。预览完全在你的浏览器中运行。你输入的任何内容或附加的任何图片都不会发送到服务器或被存储。',
        },
      ],
      da: [
        {
          q: 'Hvad er tegngrænsen for introteksten i en LinkedIn-annonce?',
          a: 'Du kan indtaste op til 3.000 tegn, men feedet folder introen bag "…mere" omkring 150 tegn (lidt tidligere på mobil). Hold din krog og dit kernebudskab før det punkt, så de vises uden et klik.',
        },
        {
          q: 'Hvor lang må en LinkedIn-annonceoverskrift være?',
          a: 'Den hårde grænse er 200 tegn, men hold den under 70, så overskriften aldrig skæres af på linkkortet på tværs af placeringer.',
        },
        {
          q: 'Vises beskrivelsen altid?',
          a: 'Nej. Beskrivelsen (op til 300 tegn, bedst under 100) vises primært på desktop og på LinkedIn Audience Network og droppes ofte på det mobile feedkort. Behandl den som støttetekst.',
        },
        {
          q: 'Bliver min annoncetekst uploadet nogen steder?',
          a: 'Nej. Forhåndsvisningen kører helt i din browser. Intet af det, du skriver, eller noget billede, du vedhæfter, sendes til en server eller gemmes.',
        },
      ],
    },
  },

  {
    id: 'google-ads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-18',
    platformLimits:
      'Google Responsive Search Ads: headlines max 30 characters each, descriptions max 90 characters; the desktop SERP clips combined headlines around a 600px container width.',

    slugs: {
      en: 'google-ads',
      es: 'anuncios-de-google',
      de: 'google-anzeigen',
      fr: 'annonces-google',
      pt: 'anuncios-do-google',
      it: 'annunci-google',
      nl: 'google-advertenties',
      ja: 'google-kokoku',
      zh: 'google-guang-gao',
      da: 'google-annoncer',
    },

    schemaName: {
      en: 'Google Responsive Search Ads Preview (Pixel-Accurate)',
      es: 'Vista previa de anuncios de búsqueda adaptables de Google (precisión de píxeles)',
      de: 'Vorschau für responsive Google-Suchanzeigen (pixelgenau)',
      fr: 'Aperçu des annonces de recherche responsives Google (précision au pixel)',
      pt: 'Pré-visualização de anúncios de pesquisa adaptáveis do Google (precisão de pixels)',
      it: 'Anteprima degli annunci adattabili della rete di ricerca Google (precisione al pixel)',
      nl: 'Voorbeeld van responsieve Google-zoekadvertenties (pixelnauwkeurig)',
      ja: 'Googleレスポンシブ検索広告プレビュー（ピクセル精度）',
      zh: 'Google 自适应搜索广告预览（像素级精确）',
      da: 'Forhåndsvisning af responsive Google-søgeannoncer (pixelnøjagtig)',
    },

    titles: {
      en: 'Google Ads Preview — Pixel-Accurate Responsive Search Ad Simulator',
      es: 'Vista previa de anuncios de Google — Simulador de anuncios de búsqueda adaptables con precisión de píxeles',
      de: 'Google-Anzeigenvorschau — Pixelgenauer Simulator für responsive Suchanzeigen',
      fr: 'Aperçu d’annonces Google — Simulateur d’annonces de recherche responsives au pixel près',
      pt: 'Pré-visualização de anúncios do Google — Simulador de anúncios de pesquisa adaptáveis com precisão de pixels',
      it: 'Anteprima annunci Google — Simulatore di annunci adattabili con precisione al pixel',
      nl: 'Google Ads-voorbeeld — Pixelnauwkeurige simulator voor responsieve zoekadvertenties',
      ja: 'Google広告プレビュー — ピクセル精度のレスポンシブ検索広告シミュレーター',
      zh: 'Google 广告预览 — 像素级精确的自适应搜索广告模拟器',
      da: 'Google Ads-forhåndsvisning — Pixelnøjagtig simulator til responsive søgeannoncer',
    },

    metaDescriptions: {
      en: 'Free Google Responsive Search Ads preview. Measures your headlines by true pixel width with a canvas engine, enforces the 30-character headline and 90-character description caps, and shows when a headline drops on the desktop SERP.',
      es: 'Vista previa gratuita de anuncios de búsqueda adaptables de Google. Mide tus títulos por su ancho real en píxeles con un motor de canvas, aplica los topes de 30 caracteres por título y 90 por descripción y muestra cuándo se elimina un título en la SERP de escritorio.',
      de: 'Kostenlose Vorschau für responsive Google-Suchanzeigen. Misst deine Titel anhand der echten Pixelbreite mit einer Canvas-Engine, erzwingt die Limits von 30 Zeichen pro Titel und 90 pro Beschreibung und zeigt, wann ein Titel in der Desktop-SERP wegfällt.',
      fr: 'Aperçu gratuit des annonces de recherche responsives Google. Mesure vos titres selon leur vraie largeur en pixels avec un moteur canvas, applique les plafonds de 30 caractères par titre et 90 par description, et montre quand un titre disparaît dans la SERP sur ordinateur.',
      pt: 'Pré-visualização gratuita de anúncios de pesquisa adaptáveis do Google. Mede os seus títulos pela largura real em pixels com um motor de canvas, aplica os limites de 30 caracteres por título e 90 por descrição e mostra quando um título é removido na SERP de computador.',
      it: 'Anteprima gratuita degli annunci adattabili della rete di ricerca Google. Misura i tuoi titoli in base alla larghezza reale in pixel con un motore canvas, applica i limiti di 30 caratteri per titolo e 90 per descrizione e mostra quando un titolo viene rimosso nella SERP desktop.',
      nl: 'Gratis voorbeeld van responsieve Google-zoekadvertenties. Meet je koppen op echte pixelbreedte met een canvas-engine, dwingt de limieten van 30 tekens per kop en 90 per beschrijving af en toont wanneer een kop wegvalt in de desktop-SERP.',
      ja: '無料のGoogleレスポンシブ検索広告プレビュー。canvasエンジンで見出しを実際のピクセル幅で測定し、見出し30文字・説明90文字の上限を適用し、デスクトップのSERPで見出しが落ちるタイミングを表示します。',
      zh: '免费的 Google 自适应搜索广告预览。使用 canvas 引擎按真实像素宽度测量标题，强制执行标题 30 字符、描述 90 字符的上限，并显示标题在桌面端 SERP 上何时被舍弃。',
      da: 'Gratis forhåndsvisning af responsive Google-søgeannoncer. Måler dine overskrifter efter ægte pixelbredde med en canvas-motor, håndhæver grænserne på 30 tegn pr. overskrift og 90 pr. beskrivelse og viser, hvornår en overskrift falder fra på desktop-SERP.',
    },

    intro: {
      en: 'Enter your Responsive Search Ad headlines and descriptions to see a pixel-accurate Google SERP mockup. The simulator measures real rendered width — not an average — so you can see exactly when a third headline would be dropped on desktop.',
      es: 'Introduce los títulos y descripciones de tu anuncio de búsqueda adaptable para ver una maqueta de la SERP de Google con precisión de píxeles. El simulador mide el ancho real renderizado —no un promedio— para que veas exactamente cuándo se eliminaría un tercer título en escritorio.',
      de: 'Gib die Titel und Beschreibungen deiner responsiven Suchanzeige ein, um ein pixelgenaues Mockup der Google-SERP zu sehen. Der Simulator misst die echte gerenderte Breite — keinen Durchschnitt — sodass du genau siehst, wann ein dritter Titel auf dem Desktop wegfiele.',
      fr: 'Saisissez les titres et descriptions de votre annonce de recherche responsive pour voir une maquette de la SERP Google au pixel près. Le simulateur mesure la vraie largeur rendue — pas une moyenne — pour que vous voyiez exactement quand un troisième titre serait supprimé sur ordinateur.',
      pt: 'Introduza os títulos e descrições do seu anúncio de pesquisa adaptável para ver uma maquete da SERP do Google com precisão de pixels. O simulador mede a largura real renderizada — não uma média — para que veja exatamente quando um terceiro título seria removido no computador.',
      it: 'Inserisci i titoli e le descrizioni del tuo annuncio adattabile della rete di ricerca per vedere un mockup della SERP di Google accurato al pixel. Il simulatore misura la larghezza reale renderizzata — non una media — così vedi esattamente quando un terzo titolo verrebbe rimosso su desktop.',
      nl: 'Voer de koppen en beschrijvingen van je responsieve zoekadvertentie in om een pixelnauwkeurige mockup van de Google-SERP te zien. De simulator meet de echte weergavebreedte — geen gemiddelde — zodat je precies ziet wanneer een derde kop op desktop zou wegvallen.',
      ja: 'レスポンシブ検索広告の見出しと説明を入力すると、ピクセル精度のGoogle SERPモックアップが表示されます。シミュレーターは平均ではなく実際のレンダリング幅を測定するので、デスクトップで3つ目の見出しが落ちるタイミングを正確に確認できます。',
      zh: '输入你的自适应搜索广告标题和描述，即可看到像素级精确的 Google SERP 模拟。模拟器测量真实渲染宽度——而非平均值——让你准确看到第三个标题在桌面端何时会被舍弃。',
      da: 'Indtast dine responsive søgeannonces overskrifter og beskrivelser for at se et pixelnøjagtigt mockup af Google-SERP. Simulatoren måler den ægte gengivede bredde — ikke et gennemsnit — så du ser præcis, hvornår en tredje overskrift ville falde fra på desktop.',
    },

    content: {
      en: `<h2>Google Responsive Search Ads character limits</h2>
<p><strong>Responsive Search Ads (RSA)</strong> have firm character caps: each <strong>headline is limited to 30 characters</strong> and each <strong>description to 90 characters</strong>. Google mixes and matches your headlines and descriptions automatically, showing up to three headlines and two descriptions at once. The counters in the simulator above enforce these caps as you type, so a clamped field is impossible to miss.</p>
<h2>Why pixel width matters more than character count</h2>
<p>The 30-character cap is only half the story. Google renders headlines in a row separated by vertical bars, and the desktop ad slot is roughly a <strong>600px-wide container</strong>. Three headlines that each pass the 30-character check can still overflow that width — in which case Google <strong>drops the trailing headline</strong> rather than wrapping it. This tool measures each headline by its <strong>true rendered pixel width</strong> using an HTML5 canvas, exactly the way a browser paints Arial, instead of guessing with an average-character estimate. That means the preview drops Headline 3 at the same point Google would.</p>
<h2>Writing headlines that survive</h2>
<p>Front-load the headlines that must always appear, and pin them to positions 1 and 2 in Google Ads if they are non-negotiable. Keep wide characters (capital letters, "W" and "M") in mind — a 28-character all-caps headline can be physically wider than a 30-character lowercase one. The live pixel meter shows the difference instantly.</p>
<h2>Preview privately, then publish</h2>
<p>Every measurement happens in your browser; nothing is uploaded. Draft your RSA assets here, confirm that your most important headlines clear the pixel container on desktop, and paste the finished copy into Google Ads with confidence that nothing important silently disappears.</p>`,
      es: `<h2>Límites de caracteres de los anuncios de búsqueda adaptables de Google</h2>
<p>Los <strong>anuncios de búsqueda adaptables (RSA)</strong> tienen topes de caracteres firmes: cada <strong>título se limita a 30 caracteres</strong> y cada <strong>descripción a 90 caracteres</strong>. Google combina automáticamente tus títulos y descripciones, mostrando hasta tres títulos y dos descripciones a la vez. Los contadores del simulador de arriba aplican estos topes mientras escribes, así que es imposible no ver un campo recortado.</p>
<h2>Por qué el ancho en píxeles importa más que el recuento de caracteres</h2>
<p>El tope de 30 caracteres es solo la mitad de la historia. Google muestra los títulos en una fila separada por barras verticales, y la ranura del anuncio en escritorio es un <strong>contenedor de unos 600 px de ancho</strong>. Tres títulos que pasen cada uno la prueba de 30 caracteres aún pueden desbordar ese ancho, en cuyo caso Google <strong>elimina el título final</strong> en lugar de partirlo. Esta herramienta mide cada título por su <strong>ancho real renderizado en píxeles</strong> usando un canvas HTML5, exactamente como un navegador dibuja Arial, en vez de adivinar con una estimación de caracteres promedio. Eso significa que la vista previa elimina el Título 3 en el mismo punto que lo haría Google.</p>
<h2>Escribir títulos que sobreviven</h2>
<p>Coloca primero los títulos que siempre deben aparecer y fíjalos en las posiciones 1 y 2 en Google Ads si son innegociables. Ten en cuenta los caracteres anchos (mayúsculas, "W" y "M"): un título de 28 caracteres en mayúsculas puede ser físicamente más ancho que uno de 30 en minúsculas. El medidor de píxeles en vivo muestra la diferencia al instante.</p>
<h2>Previsualiza en privado y luego publica</h2>
<p>Cada medición ocurre en tu navegador; no se sube nada. Redacta aquí tus recursos RSA, confirma que tus títulos más importantes caben en el contenedor de píxeles en escritorio y pega el texto terminado en Google Ads con la confianza de que nada importante desaparece en silencio.</p>`,
      de: `<h2>Zeichenlimits für responsive Google-Suchanzeigen</h2>
<p><strong>Responsive Suchanzeigen (RSA)</strong> haben feste Zeichenobergrenzen: jeder <strong>Titel ist auf 30 Zeichen begrenzt</strong> und jede <strong>Beschreibung auf 90 Zeichen</strong>. Google kombiniert deine Titel und Beschreibungen automatisch und zeigt bis zu drei Titel und zwei Beschreibungen gleichzeitig. Die Zähler im Simulator oben erzwingen diese Grenzen beim Tippen, sodass ein gekapptes Feld unmöglich zu übersehen ist.</p>
<h2>Warum die Pixelbreite mehr zählt als die Zeichenzahl</h2>
<p>Die 30-Zeichen-Grenze ist nur die halbe Wahrheit. Google rendert Titel in einer Reihe, getrennt durch senkrechte Striche, und der Desktop-Anzeigenplatz ist ein <strong>rund 600 px breiter Container</strong>. Drei Titel, die jeweils die 30-Zeichen-Prüfung bestehen, können diese Breite trotzdem überschreiten — in dem Fall <strong>verwirft Google den letzten Titel</strong>, statt ihn umzubrechen. Dieses Tool misst jeden Titel anhand seiner <strong>echten gerenderten Pixelbreite</strong> mit einem HTML5-Canvas, genau so, wie ein Browser Arial zeichnet, statt mit einer Durchschnittszeichen-Schätzung zu raten. Das heißt, die Vorschau verwirft Titel 3 genau an demselben Punkt wie Google.</p>
<h2>Titel schreiben, die überleben</h2>
<p>Stelle die Titel, die immer erscheinen müssen, nach vorne und fixiere sie in Google Ads auf Position 1 und 2, wenn sie nicht verhandelbar sind. Behalte breite Zeichen im Blick (Großbuchstaben, „W" und „M") — ein 28-Zeichen-Titel in Großbuchstaben kann physisch breiter sein als ein 30-Zeichen-Titel in Kleinbuchstaben. Der Live-Pixelmesser zeigt den Unterschied sofort.</p>
<h2>Privat in der Vorschau ansehen, dann veröffentlichen</h2>
<p>Jede Messung geschieht in deinem Browser; nichts wird hochgeladen. Entwirf hier deine RSA-Assets, bestätige, dass deine wichtigsten Titel den Pixelcontainer auf dem Desktop einhalten, und füge den fertigen Text in Google Ads ein — in der Gewissheit, dass nichts Wichtiges stillschweigend verschwindet.</p>`,
      fr: `<h2>Limites de caractères des annonces de recherche responsives Google</h2>
<p>Les <strong>annonces de recherche responsives (RSA)</strong> ont des plafonds de caractères stricts : chaque <strong>titre est limité à 30 caractères</strong> et chaque <strong>description à 90 caractères</strong>. Google combine automatiquement vos titres et descriptions, en affichant jusqu’à trois titres et deux descriptions à la fois. Les compteurs du simulateur ci-dessus appliquent ces plafonds pendant que vous tapez, si bien qu’un champ tronqué est impossible à manquer.</p>
<h2>Pourquoi la largeur en pixels compte plus que le nombre de caractères</h2>
<p>Le plafond de 30 caractères n’est que la moitié de l’histoire. Google affiche les titres sur une ligne séparée par des barres verticales, et l’emplacement publicitaire sur ordinateur est un <strong>conteneur d’environ 600 px de large</strong>. Trois titres qui passent chacun le test des 30 caractères peuvent quand même dépasser cette largeur — auquel cas Google <strong>supprime le dernier titre</strong> plutôt que de le couper. Cet outil mesure chaque titre par sa <strong>vraie largeur rendue en pixels</strong> à l’aide d’un canvas HTML5, exactement comme un navigateur dessine Arial, au lieu de deviner avec une estimation de caractères moyens. L’aperçu supprime donc le Titre 3 au même point que Google.</p>
<h2>Écrire des titres qui survivent</h2>
<p>Placez en premier les titres qui doivent toujours apparaître et épinglez-les aux positions 1 et 2 dans Google Ads s’ils sont non négociables. Gardez à l’esprit les caractères larges (majuscules, « W » et « M ») : un titre de 28 caractères tout en majuscules peut être physiquement plus large qu’un titre de 30 caractères en minuscules. Le compteur de pixels en direct montre la différence instantanément.</p>
<h2>Prévisualisez en privé, puis publiez</h2>
<p>Chaque mesure se fait dans votre navigateur ; rien n’est téléversé. Rédigez ici vos éléments RSA, confirmez que vos titres les plus importants tiennent dans le conteneur de pixels sur ordinateur, et collez le texte finalisé dans Google Ads en étant certain que rien d’important ne disparaît en silence.</p>`,
      pt: `<h2>Limites de caracteres dos anúncios de pesquisa adaptáveis do Google</h2>
<p>Os <strong>anúncios de pesquisa adaptáveis (RSA)</strong> têm limites de caracteres firmes: cada <strong>título está limitado a 30 caracteres</strong> e cada <strong>descrição a 90 caracteres</strong>. O Google combina automaticamente os seus títulos e descrições, mostrando até três títulos e duas descrições de cada vez. Os contadores do simulador acima aplicam estes limites enquanto escreve, por isso é impossível não notar um campo cortado.</p>
<h2>Porque a largura em pixels importa mais do que a contagem de caracteres</h2>
<p>O limite de 30 caracteres é só metade da história. O Google mostra os títulos numa linha separada por barras verticais, e o espaço do anúncio no computador é um <strong>contentor com cerca de 600 px de largura</strong>. Três títulos que passem cada um no teste dos 30 caracteres podem ainda assim exceder essa largura — caso em que o Google <strong>remove o último título</strong> em vez de o quebrar. Esta ferramenta mede cada título pela sua <strong>largura real renderizada em pixels</strong> usando um canvas HTML5, exatamente como um navegador desenha Arial, em vez de adivinhar com uma estimativa de caracteres médios. Isso significa que a pré-visualização remove o Título 3 no mesmo ponto que o Google faria.</p>
<h2>Escrever títulos que sobrevivem</h2>
<p>Coloque primeiro os títulos que têm de aparecer sempre e fixe-os nas posições 1 e 2 no Google Ads se forem inegociáveis. Tenha em conta os caracteres largos (maiúsculas, "W" e "M"): um título de 28 caracteres todo em maiúsculas pode ser fisicamente mais largo do que um de 30 em minúsculas. O medidor de pixels ao vivo mostra a diferença num instante.</p>
<h2>Pré-visualize em privado e depois publique</h2>
<p>Cada medição acontece no seu navegador; nada é carregado. Redija aqui os seus recursos RSA, confirme que os seus títulos mais importantes cabem no contentor de pixels no computador e cole o texto final no Google Ads com a confiança de que nada importante desaparece em silêncio.</p>`,
      it: `<h2>Limiti di caratteri degli annunci adattabili della rete di ricerca Google</h2>
<p>Gli <strong>annunci adattabili della rete di ricerca (RSA)</strong> hanno limiti di caratteri fissi: ogni <strong>titolo è limitato a 30 caratteri</strong> e ogni <strong>descrizione a 90 caratteri</strong>. Google combina automaticamente i tuoi titoli e descrizioni, mostrando fino a tre titoli e due descrizioni alla volta. I contatori del simulatore qui sopra applicano questi limiti mentre scrivi, così un campo troncato è impossibile da non notare.</p>
<h2>Perché la larghezza in pixel conta più del numero di caratteri</h2>
<p>Il limite di 30 caratteri è solo metà della storia. Google mostra i titoli su una riga separati da barre verticali, e lo spazio dell’annuncio su desktop è un <strong>contenitore largo circa 600 px</strong>. Tre titoli che superano ciascuno il controllo dei 30 caratteri possono comunque superare quella larghezza — nel qual caso Google <strong>elimina l’ultimo titolo</strong> invece di mandarlo a capo. Questo strumento misura ogni titolo in base alla sua <strong>vera larghezza renderizzata in pixel</strong> usando un canvas HTML5, esattamente come un browser disegna Arial, invece di indovinare con una stima di caratteri medi. Ciò significa che l’anteprima elimina il Titolo 3 nello stesso punto in cui lo farebbe Google.</p>
<h2>Scrivere titoli che sopravvivono</h2>
<p>Metti per primi i titoli che devono sempre comparire e fissali alle posizioni 1 e 2 in Google Ads se sono irrinunciabili. Tieni a mente i caratteri larghi (maiuscole, "W" e "M"): un titolo di 28 caratteri tutto maiuscolo può essere fisicamente più largo di uno di 30 in minuscolo. Il misuratore di pixel in tempo reale mostra la differenza all’istante.</p>
<h2>Visualizza l’anteprima in privato, poi pubblica</h2>
<p>Ogni misurazione avviene nel tuo browser; nulla viene caricato. Redigi qui i tuoi asset RSA, conferma che i tuoi titoli più importanti rientrano nel contenitore di pixel su desktop e incolla il testo finito in Google Ads con la certezza che nulla di importante scompaia in silenzio.</p>`,
      nl: `<h2>Tekenlimieten van responsieve Google-zoekadvertenties</h2>
<p><strong>Responsieve zoekadvertenties (RSA)</strong> hebben harde tekenlimieten: elke <strong>kop is beperkt tot 30 tekens</strong> en elke <strong>beschrijving tot 90 tekens</strong>. Google combineert je koppen en beschrijvingen automatisch en toont maximaal drie koppen en twee beschrijvingen tegelijk. De tellers in de simulator hierboven dwingen deze limieten af terwijl je typt, zodat een afgekapt veld onmogelijk te missen is.</p>
<h2>Waarom pixelbreedte meer telt dan het aantal tekens</h2>
<p>De limiet van 30 tekens is maar het halve verhaal. Google geeft koppen weer op één regel, gescheiden door verticale strepen, en de advertentieplek op desktop is een <strong>container van ongeveer 600 px breed</strong>. Drie koppen die elk de 30-tekentest doorstaan, kunnen die breedte toch overschrijden — in dat geval <strong>laat Google de laatste kop vallen</strong> in plaats van hem af te breken. Dit hulpmiddel meet elke kop op zijn <strong>echte weergegeven pixelbreedte</strong> met een HTML5-canvas, precies zoals een browser Arial tekent, in plaats van te gokken met een gemiddelde-tekenschatting. Daardoor laat het voorbeeld Kop 3 vallen op exact hetzelfde punt als Google.</p>
<h2>Koppen schrijven die overleven</h2>
<p>Zet de koppen die altijd moeten verschijnen vooraan en pin ze vast op posities 1 en 2 in Google Ads als ze niet onderhandelbaar zijn. Houd rekening met brede tekens (hoofdletters, "W" en "M"): een kop van 28 tekens in hoofdletters kan fysiek breder zijn dan een van 30 in kleine letters. De live pixelmeter toont het verschil meteen.</p>
<h2>Bekijk privé een voorbeeld en publiceer dan</h2>
<p>Elke meting gebeurt in je browser; er wordt niets geüpload. Stel hier je RSA-assets op, bevestig dat je belangrijkste koppen binnen de pixelcontainer op desktop passen en plak de afgewerkte tekst in Google Ads met de zekerheid dat niets belangrijks stilletjes verdwijnt.</p>`,
      ja: `<h2>Googleレスポンシブ検索広告の文字数制限</h2>
<p><strong>レスポンシブ検索広告（RSA）</strong>には厳格な文字数上限があります。各<strong>見出しは30文字まで</strong>、各<strong>説明は90文字まで</strong>です。Googleは見出しと説明を自動的に組み合わせ、最大で見出し3つと説明2つを同時に表示します。上のシミュレーターのカウンターは入力中にこれらの上限を適用するので、上限に達したフィールドを見逃すことはありません。</p>
<h2>なぜピクセル幅が文字数より重要なのか</h2>
<p>30文字の上限は話の半分にすぎません。Googleは見出しを縦棒で区切って一列に表示し、デスクトップの広告枠はおよそ<strong>幅600pxのコンテナ</strong>です。それぞれ30文字チェックを通過した3つの見出しでも、その幅を超えることがあり、その場合Googleは折り返さずに<strong>末尾の見出しを落とします</strong>。このツールはHTML5 canvasを使い、ブラウザーがArialを描画するのとまったく同じ方法で、各見出しを<strong>実際にレンダリングされたピクセル幅</strong>で測定します。平均文字数で推測しません。つまりプレビューはGoogleと同じ地点で見出し3を落とします。</p>
<h2>生き残る見出しの書き方</h2>
<p>常に表示されるべき見出しは前に置き、譲れないならGoogle Adsで位置1と2に固定します。幅の広い文字（大文字、「W」や「M」）に注意してください。全部大文字の28文字の見出しは、小文字30文字の見出しより物理的に広くなることがあります。ライブのピクセルメーターがその差を即座に示します。</p>
<h2>非公開でプレビューしてから公開</h2>
<p>すべての測定はブラウザー内で行われ、何もアップロードされません。ここでRSAアセットを作成し、最も重要な見出しがデスクトップのピクセルコンテナに収まることを確認し、重要なものが静かに消えない自信を持って、完成したコピーをGoogle Adsに貼り付けてください。</p>`,
      zh: `<h2>Google 自适应搜索广告的字符限制</h2>
<p><strong>自适应搜索广告（RSA）</strong>有固定的字符上限：每条<strong>标题限 30 字符</strong>，每条<strong>描述限 90 字符</strong>。Google 会自动组合你的标题和描述，一次最多展示三条标题和两条描述。上方模拟器中的计数器在你输入时强制执行这些上限，因此被截断的字段绝不会被忽略。</p>
<h2>为什么像素宽度比字符数更重要</h2>
<p>30 字符上限只说了一半。Google 将标题排成一行，以竖线分隔，而桌面端广告位是一个<strong>约 600px 宽的容器</strong>。三条各自通过 30 字符检查的标题仍可能超出该宽度——这时 Google 会<strong>舍弃末尾的标题</strong>，而不是换行。本工具使用 HTML5 canvas，按浏览器绘制 Arial 的完全相同方式，以<strong>真实渲染像素宽度</strong>测量每条标题，而非用平均字符估算。这意味着预览会在与 Google 相同的位置舍弃标题 3。</p>
<h2>撰写能"存活"的标题</h2>
<p>把必须始终出现的标题前置，若不可妥协，就在 Google Ads 中将其固定到位置 1 和 2。留意宽字符（大写字母、"W"和"M"）：一条 28 字符的全大写标题在物理上可能比 30 字符的小写标题更宽。实时像素计量条会即刻显示这种差异。</p>
<h2>先私密预览，再发布</h2>
<p>每次测量都在你的浏览器中进行，不会上传任何内容。在此起草你的 RSA 素材，确认最重要的标题在桌面端容器中放得下，然后放心地把成稿复制到 Google Ads，确信不会有重要内容悄悄消失。</p>`,
      da: `<h2>Tegngrænser for responsive Google-søgeannoncer</h2>
<p><strong>Responsive søgeannoncer (RSA)</strong> har faste tegngrænser: hver <strong>overskrift er begrænset til 30 tegn</strong> og hver <strong>beskrivelse til 90 tegn</strong>. Google kombinerer automatisk dine overskrifter og beskrivelser og viser op til tre overskrifter og to beskrivelser ad gangen. Tællerne i simulatoren ovenfor håndhæver disse grænser, mens du skriver, så et afskåret felt er umuligt at overse.</p>
<h2>Hvorfor pixelbredde betyder mere end tegnantal</h2>
<p>Grænsen på 30 tegn er kun den halve historie. Google gengiver overskrifter på en række adskilt af lodrette streger, og annoncepladsen på desktop er en <strong>container på cirka 600 px bred</strong>. Tre overskrifter, der hver består 30-tegns-tjekket, kan stadig overskride den bredde — i så fald <strong>dropper Google den sidste overskrift</strong> i stedet for at bryde den. Dette værktøj måler hver overskrift efter dens <strong>ægte gengivne pixelbredde</strong> ved hjælp af et HTML5-canvas, præcis som en browser tegner Arial, i stedet for at gætte med et gennemsnitligt tegnestimat. Det betyder, at forhåndsvisningen dropper Overskrift 3 på samme punkt som Google ville.</p>
<h2>Skriv overskrifter, der overlever</h2>
<p>Sæt de overskrifter, der altid skal vises, forrest, og fastgør dem til position 1 og 2 i Google Ads, hvis de ikke er til forhandling. Hold øje med brede tegn (store bogstaver, "W" og "M"): en overskrift på 28 tegn med store bogstaver kan være fysisk bredere end en på 30 med små. Den levende pixelmåler viser forskellen med det samme.</p>
<h2>Forhåndsvis privat, og udgiv så</h2>
<p>Hver måling sker i din browser; intet uploades. Udform dine RSA-aktiver her, bekræft at dine vigtigste overskrifter holder sig inden for pixelcontaineren på desktop, og indsæt den færdige tekst i Google Ads med vished om, at intet vigtigt forsvinder i stilhed.</p>`,
    },

    faq: {
      en: [
        {
          q: 'What are the Google RSA character limits?',
          a: 'Each headline is capped at 30 characters and each description at 90 characters. You can supply up to 15 headlines and 4 descriptions; Google rotates combinations automatically.',
        },
        {
          q: 'Why does my headline get dropped even though it is under 30 characters?',
          a: 'Google shows headlines in a fixed-width container (~600px on desktop). If the combined rendered width of your headlines exceeds it, the trailing headline is dropped. Wide characters take more pixels than the character count suggests.',
        },
        {
          q: 'How is this preview pixel-accurate?',
          a: 'It measures text with an HTML5 canvas measureText engine in Arial, the same way a browser paints the SERP, instead of using an averaged character width. So truncation matches what Google actually renders.',
        },
        {
          q: 'Is my ad data sent anywhere?',
          a: 'No. All measurement and preview rendering happens locally in your browser. Nothing is uploaded or stored.',
        },
      ],
      es: [
        {
          q: '¿Cuáles son los límites de caracteres de los RSA de Google?',
          a: 'Cada título tiene un tope de 30 caracteres y cada descripción de 90. Puedes aportar hasta 15 títulos y 4 descripciones; Google rota las combinaciones automáticamente.',
        },
        {
          q: '¿Por qué se elimina mi título aunque tenga menos de 30 caracteres?',
          a: 'Google muestra los títulos en un contenedor de ancho fijo (~600 px en escritorio). Si el ancho combinado renderizado de tus títulos lo supera, se elimina el título final. Los caracteres anchos ocupan más píxeles de lo que sugiere el recuento de caracteres.',
        },
        {
          q: '¿Cómo logra esta vista previa precisión de píxeles?',
          a: 'Mide el texto con un motor measureText de canvas HTML5 en Arial, igual que un navegador dibuja la SERP, en lugar de usar un ancho de caracteres promedio. Así el truncamiento coincide con lo que Google realmente renderiza.',
        },
        {
          q: '¿Se envían a algún sitio los datos de mi anuncio?',
          a: 'No. Toda la medición y el renderizado de la vista previa ocurren localmente en tu navegador. No se sube ni se almacena nada.',
        },
      ],
      de: [
        {
          q: 'Wie hoch sind die Zeichenlimits bei Google-RSA?',
          a: 'Jeder Titel ist auf 30 Zeichen begrenzt und jede Beschreibung auf 90. Du kannst bis zu 15 Titel und 4 Beschreibungen liefern; Google rotiert die Kombinationen automatisch.',
        },
        {
          q: 'Warum fällt mein Titel weg, obwohl er unter 30 Zeichen hat?',
          a: 'Google zeigt Titel in einem Container mit fester Breite (~600 px auf dem Desktop). Übersteigt die kombinierte gerenderte Breite deiner Titel diese, wird der letzte Titel verworfen. Breite Zeichen brauchen mehr Pixel, als die Zeichenzahl vermuten lässt.',
        },
        {
          q: 'Wie ist diese Vorschau pixelgenau?',
          a: 'Sie misst Text mit einer HTML5-Canvas-measureText-Engine in Arial, genau so, wie ein Browser die SERP zeichnet, statt eine durchschnittliche Zeichenbreite zu verwenden. So entspricht die Kürzung dem, was Google tatsächlich rendert.',
        },
        {
          q: 'Werden meine Anzeigendaten irgendwohin gesendet?',
          a: 'Nein. Sämtliche Messung und Vorschau-Darstellung erfolgt lokal in deinem Browser. Nichts wird hochgeladen oder gespeichert.',
        },
      ],
      fr: [
        {
          q: 'Quelles sont les limites de caractères des RSA Google ?',
          a: 'Chaque titre est plafonné à 30 caractères et chaque description à 90. Vous pouvez fournir jusqu’à 15 titres et 4 descriptions ; Google fait tourner les combinaisons automatiquement.',
        },
        {
          q: 'Pourquoi mon titre est-il supprimé alors qu’il fait moins de 30 caractères ?',
          a: 'Google affiche les titres dans un conteneur de largeur fixe (~600 px sur ordinateur). Si la largeur rendue combinée de vos titres le dépasse, le dernier titre est supprimé. Les caractères larges prennent plus de pixels que le nombre de caractères ne le laisse penser.',
        },
        {
          q: 'En quoi cet aperçu est-il au pixel près ?',
          a: 'Il mesure le texte avec un moteur measureText de canvas HTML5 en Arial, comme un navigateur dessine la SERP, au lieu d’utiliser une largeur de caractère moyenne. La troncature correspond donc à ce que Google rend réellement.',
        },
        {
          q: 'Les données de mon annonce sont-elles envoyées quelque part ?',
          a: 'Non. Toute la mesure et le rendu de l’aperçu se font localement dans votre navigateur. Rien n’est téléversé ni stocké.',
        },
      ],
      pt: [
        {
          q: 'Quais são os limites de caracteres dos RSA do Google?',
          a: 'Cada título tem um limite de 30 caracteres e cada descrição de 90. Pode fornecer até 15 títulos e 4 descrições; o Google roda as combinações automaticamente.',
        },
        {
          q: 'Porque é que o meu título é removido mesmo tendo menos de 30 caracteres?',
          a: 'O Google mostra os títulos num contentor de largura fixa (~600 px no computador). Se a largura renderizada combinada dos seus títulos a exceder, o último título é removido. Os caracteres largos ocupam mais pixels do que a contagem de caracteres sugere.',
        },
        {
          q: 'Como é que esta pré-visualização é precisa ao pixel?',
          a: 'Mede o texto com um motor measureText de canvas HTML5 em Arial, tal como um navegador desenha a SERP, em vez de usar uma largura de caracteres média. Assim o truncamento corresponde ao que o Google realmente renderiza.',
        },
        {
          q: 'Os dados do meu anúncio são enviados para algum lado?',
          a: 'Não. Toda a medição e renderização da pré-visualização acontecem localmente no seu navegador. Nada é carregado ou armazenado.',
        },
      ],
      it: [
        {
          q: 'Quali sono i limiti di caratteri degli RSA di Google?',
          a: 'Ogni titolo ha un limite di 30 caratteri e ogni descrizione di 90. Puoi fornire fino a 15 titoli e 4 descrizioni; Google ruota le combinazioni automaticamente.',
        },
        {
          q: 'Perché il mio titolo viene eliminato anche se è sotto i 30 caratteri?',
          a: 'Google mostra i titoli in un contenitore a larghezza fissa (~600 px su desktop). Se la larghezza renderizzata combinata dei tuoi titoli la supera, l’ultimo titolo viene eliminato. I caratteri larghi occupano più pixel di quanto suggerisca il numero di caratteri.',
        },
        {
          q: 'Come fa questa anteprima a essere precisa al pixel?',
          a: 'Misura il testo con un motore measureText di canvas HTML5 in Arial, proprio come un browser disegna la SERP, invece di usare una larghezza di caratteri media. Così il troncamento corrisponde a ciò che Google rende davvero.',
        },
        {
          q: 'I dati del mio annuncio vengono inviati da qualche parte?',
          a: 'No. Tutta la misurazione e il rendering dell’anteprima avvengono localmente nel tuo browser. Nulla viene caricato o memorizzato.',
        },
      ],
      nl: [
        {
          q: 'Wat zijn de tekenlimieten van Google-RSA?',
          a: 'Elke kop heeft een limiet van 30 tekens en elke beschrijving van 90. Je kunt tot 15 koppen en 4 beschrijvingen aanleveren; Google rouleert de combinaties automatisch.',
        },
        {
          q: 'Waarom valt mijn kop weg terwijl hij onder de 30 tekens is?',
          a: 'Google toont koppen in een container met vaste breedte (~600 px op desktop). Als de gecombineerde weergegeven breedte van je koppen die overschrijdt, valt de laatste kop weg. Brede tekens nemen meer pixels in dan het aantal tekens doet vermoeden.',
        },
        {
          q: 'Hoe is dit voorbeeld pixelnauwkeurig?',
          a: 'Het meet tekst met een HTML5-canvas-measureText-engine in Arial, net zoals een browser de SERP tekent, in plaats van een gemiddelde tekenbreedte te gebruiken. Zo komt de afkapping overeen met wat Google daadwerkelijk weergeeft.',
        },
        {
          q: 'Worden mijn advertentiegegevens ergens heen gestuurd?',
          a: 'Nee. Alle meting en voorbeeldweergave gebeurt lokaal in je browser. Er wordt niets geüpload of opgeslagen.',
        },
      ],
      ja: [
        {
          q: 'GoogleのRSAの文字数制限はどれくらいですか？',
          a: '各見出しは30文字、各説明は90文字が上限です。見出しは最大15個、説明は4個まで指定でき、Googleが組み合わせを自動でローテーションします。',
        },
        {
          q: '30文字未満なのに見出しが落とされるのはなぜですか？',
          a: 'Googleは見出しを固定幅のコンテナ（デスクトップで約600px）に表示します。見出しの合計レンダリング幅がそれを超えると、末尾の見出しが落とされます。幅の広い文字は、文字数から想像されるより多くのピクセルを使います。',
        },
        {
          q: 'このプレビューはどのようにピクセル精度を実現していますか？',
          a: '平均的な文字幅を使うのではなく、ブラウザーがSERPを描画するのと同じようにArialでHTML5 canvasのmeasureTextエンジンを使ってテキストを測定します。そのため切り捨てがGoogleの実際の表示と一致します。',
        },
        {
          q: '私の広告データはどこかに送信されますか？',
          a: 'いいえ。すべての測定とプレビューの描画はブラウザー内でローカルに行われます。何もアップロードも保存もされません。',
        },
      ],
      zh: [
        {
          q: 'Google RSA 的字符限制是多少？',
          a: '每条标题上限 30 字符，每条描述上限 90 字符。你最多可提供 15 条标题和 4 条描述；Google 会自动轮换组合。',
        },
        {
          q: '我的标题不到 30 字符为什么还会被舍弃？',
          a: 'Google 在固定宽度的容器中展示标题（桌面端约 600px）。如果你的标题渲染后的合计宽度超过该容器，末尾的标题就会被舍弃。宽字符占用的像素比字符数所暗示的要多。',
        },
        {
          q: '这个预览如何做到像素级精确？',
          a: '它不使用平均字符宽度，而是用 HTML5 canvas 的 measureText 引擎以 Arial 测量文本，与浏览器绘制 SERP 的方式完全一致。因此截断与 Google 实际渲染结果一致。',
        },
        {
          q: '我的广告数据会被发送到任何地方吗？',
          a: '不会。所有测量和预览渲染都在你的浏览器本地进行。不会上传或存储任何内容。',
        },
      ],
      da: [
        {
          q: 'Hvad er tegngrænserne for Google-RSA?',
          a: 'Hver overskrift har en grænse på 30 tegn og hver beskrivelse på 90. Du kan angive op til 15 overskrifter og 4 beskrivelser; Google roterer kombinationerne automatisk.',
        },
        {
          q: 'Hvorfor bliver min overskrift droppet, selvom den er under 30 tegn?',
          a: 'Google viser overskrifter i en container med fast bredde (~600 px på desktop). Hvis den samlede gengivne bredde af dine overskrifter overstiger den, droppes den sidste overskrift. Brede tegn bruger flere pixels, end tegnantallet antyder.',
        },
        {
          q: 'Hvordan er denne forhåndsvisning pixelnøjagtig?',
          a: 'Den måler tekst med en HTML5-canvas-measureText-motor i Arial, på samme måde som en browser tegner SERP, i stedet for at bruge en gennemsnitlig tegnbredde. Så afskæringen matcher det, Google faktisk gengiver.',
        },
        {
          q: 'Bliver mine annoncedata sendt nogen steder hen?',
          a: 'Nej. Al måling og forhåndsvisning sker lokalt i din browser. Intet uploades eller gemmes.',
        },
      ],
    },
  },

  {
    id: 'instagram-ads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-18',
    platformLimits:
      'Instagram Feed caption truncates at ~125 characters behind "… more"; Reels captions are best kept to 40–72 characters; safe zones block the bottom ~20% and right ~15% of the creative.',

    slugs: {
      en: 'instagram-ads',
      es: 'anuncios-de-instagram',
      de: 'instagram-anzeigen',
      fr: 'annonces-instagram',
      pt: 'anuncios-do-instagram',
      it: 'annunci-instagram',
      nl: 'instagram-advertenties',
      ja: 'instagram-kokoku',
      zh: 'instagram-guang-gao',
      da: 'instagram-annoncer',
    },

    schemaName: {
      en: 'Instagram Feed & Reels Ad Preview with Safe Zones',
      es: 'Vista previa de anuncios de feed y Reels de Instagram con zonas seguras',
      de: 'Instagram-Feed- & Reels-Anzeigenvorschau mit Sicherheitszonen',
      fr: 'Aperçu d’annonces Instagram Feed et Reels avec zones de sécurité',
      pt: 'Pré-visualização de anúncios de feed e Reels do Instagram com zonas seguras',
      it: 'Anteprima degli annunci Feed e Reels di Instagram con zone sicure',
      nl: 'Voorbeeld van Instagram-feed- & Reels-advertenties met veilige zones',
      ja: 'Instagramフィード&リール広告プレビュー（セーフゾーン付き）',
      zh: 'Instagram 信息流与 Reels 广告预览（含安全区）',
      da: 'Forhåndsvisning af Instagram-feed- & Reels-annoncer med sikre zoner',
    },

    titles: {
      en: 'Instagram Ad Preview — Feed, Reels & Safe Zone Simulator',
      es: 'Vista previa de anuncios de Instagram — Simulador de feed, Reels y zonas seguras',
      de: 'Instagram-Anzeigenvorschau — Feed-, Reels- & Sicherheitszonen-Simulator',
      fr: 'Aperçu d’annonces Instagram — Simulateur Feed, Reels et zones de sécurité',
      pt: 'Pré-visualização de anúncios do Instagram — Simulador de feed, Reels e zonas seguras',
      it: 'Anteprima annunci Instagram — Simulatore di Feed, Reels e zone sicure',
      nl: 'Instagram-advertentievoorbeeld — Feed-, Reels- & veilige-zone-simulator',
      ja: 'Instagram広告プレビュー — フィード・リール・セーフゾーンシミュレーター',
      zh: 'Instagram 广告预览 — 信息流、Reels 与安全区模拟器',
      da: 'Instagram-annonceforhåndsvisning — Feed-, Reels- & sikker-zone-simulator',
    },

    metaDescriptions: {
      en: 'Free Instagram ad preview for Feed and Reels. See the 125-character caption cutoff, the tighter 40–72 character Reels window, and toggle a safe-zone overlay that shows where the UI covers your creative.',
      es: 'Vista previa gratuita de anuncios de Instagram para feed y Reels. Ve el corte de pie de foto a los 125 caracteres, la ventana más estrecha de 40–72 caracteres de Reels y activa una superposición de zona segura que muestra dónde la interfaz cubre tu creatividad.',
      de: 'Kostenlose Instagram-Anzeigenvorschau für Feed und Reels. Sieh den Schnitt der Bildunterschrift bei 125 Zeichen, das engere 40–72-Zeichen-Fenster für Reels und schalte ein Sicherheitszonen-Overlay ein, das zeigt, wo die Oberfläche dein Creative verdeckt.',
      fr: 'Aperçu gratuit d’annonces Instagram pour le Feed et les Reels. Voyez la coupure de légende à 125 caractères, la fenêtre plus étroite de 40 à 72 caractères des Reels et activez une superposition de zone de sécurité qui montre où l’interface recouvre votre visuel.',
      pt: 'Pré-visualização gratuita de anúncios do Instagram para feed e Reels. Veja o corte da legenda aos 125 caracteres, a janela mais apertada de 40–72 caracteres dos Reels e ative uma sobreposição de zona segura que mostra onde a interface cobre o seu criativo.',
      it: 'Anteprima gratuita degli annunci Instagram per Feed e Reels. Vedi il taglio della didascalia a 125 caratteri, la finestra più stretta di 40–72 caratteri dei Reels e attiva un overlay di zona sicura che mostra dove l’interfaccia copre la tua creatività.',
      nl: 'Gratis Instagram-advertentievoorbeeld voor Feed en Reels. Zie de bijschriftafkapping bij 125 tekens, het krappere venster van 40–72 tekens voor Reels en schakel een veilige-zone-overlay in die toont waar de interface je creatie bedekt.',
      ja: 'フィードとリール向けの無料Instagram広告プレビュー。125文字のキャプション切れ目、より厳しいリールの40〜72文字の範囲を確認し、UIがクリエイティブを覆う位置を示すセーフゾーンのオーバーレイを切り替えられます。',
      zh: '面向信息流和 Reels 的免费 Instagram 广告预览。查看 125 字符的文案截断点、更紧的 Reels 40–72 字符区间，并切换显示界面在何处遮挡你素材的安全区叠层。',
      da: 'Gratis Instagram-annonceforhåndsvisning til Feed og Reels. Se billedtekstens afskæring ved 125 tegn, det strammere 40-72-tegns-vindue for Reels, og slå et sikker-zone-overlay til, der viser, hvor brugerfladen dækker dit kreative.',
    },

    intro: {
      en: 'Preview your Instagram ad in both Feed and Reels modes. See where your caption hits the "… more" fold, check the tighter Reels caption window, and toggle the safe-zone overlay to spot text that collides with Instagram\'s interface.',
      es: 'Previsualiza tu anuncio de Instagram en los modos feed y Reels. Ve dónde tu pie de foto alcanza el pliegue de "… más", comprueba la ventana de pie de foto más estrecha de Reels y activa la superposición de zona segura para detectar texto que choca con la interfaz de Instagram.',
      de: 'Sieh dir deine Instagram-Anzeige in beiden Modi an, Feed und Reels. Sieh, wo deine Bildunterschrift die „… mehr"-Falz trifft, prüfe das engere Bildunterschriften-Fenster bei Reels und schalte das Sicherheitszonen-Overlay ein, um Text zu erkennen, der mit Instagrams Oberfläche kollidiert.',
      fr: 'Prévisualisez votre annonce Instagram en modes Feed et Reels. Voyez où votre légende atteint le pli « … plus », vérifiez la fenêtre de légende plus étroite des Reels et activez la superposition de zone de sécurité pour repérer le texte qui entre en collision avec l’interface d’Instagram.',
      pt: 'Pré-visualize o seu anúncio do Instagram nos modos feed e Reels. Veja onde a sua legenda atinge a dobra "… mais", verifique a janela de legenda mais apertada dos Reels e ative a sobreposição de zona segura para detetar texto que colide com a interface do Instagram.',
      it: 'Visualizza l’anteprima del tuo annuncio Instagram nelle modalità Feed e Reels. Vedi dove la tua didascalia raggiunge la piega "… altro", controlla la finestra di didascalia più stretta dei Reels e attiva l’overlay di zona sicura per individuare il testo che si scontra con l’interfaccia di Instagram.',
      nl: 'Bekijk een voorbeeld van je Instagram-advertentie in zowel Feed- als Reels-modus. Zie waar je bijschrift de "… meer"-vouw raakt, controleer het krappere Reels-bijschriftvenster en schakel de veilige-zone-overlay in om tekst te spotten die botst met de interface van Instagram.',
      ja: 'Instagram広告をフィードとリールの両モードでプレビューできます。キャプションが「… 続きを読む」の折り返しに達する位置を確認し、より厳しいリールのキャプション範囲をチェックし、セーフゾーンのオーバーレイを切り替えてInstagramのインターフェースと衝突するテキストを見つけられます。',
      zh: '在信息流和 Reels 两种模式下预览你的 Instagram 广告。查看文案触及"… 更多"折叠的位置，检查更紧的 Reels 文案区间，并切换安全区叠层以发现与 Instagram 界面相撞的文字。',
      da: 'Forhåndsvis din Instagram-annonce i både Feed- og Reels-tilstand. Se, hvor din billedtekst rammer "… mere"-folden, tjek det strammere Reels-billedtekstvindue, og slå sikker-zone-overlayet til for at finde tekst, der kolliderer med Instagrams brugerflade.',
    },

    content: {
      en: `<h2>Instagram caption limits: Feed versus Reels</h2>
<p>Instagram allows captions up to 2,200 characters, but visibility is what counts. In the <strong>Feed</strong>, an ad caption is truncated at roughly <strong>125 characters</strong> behind a "… more" link — the same practical fold as Facebook. In <strong>Reels</strong>, the usable space is far tighter: the caption sits over the video with the interface on top of it, so the comfortable window is about <strong>40 to 72 characters</strong> before your words start colliding with on-screen controls. The simulator switches between both modes so you can see each cutoff.</p>
<h2>Why safe zones make or break a Reel</h2>
<p>Reels and Stories overlay your creative with interface elements: the profile and caption block runs along the <strong>bottom ~20%</strong>, and the action stack — like, comment, share, audio — occupies the <strong>right ~15%</strong>. Any text or critical subject you bake into those regions gets covered. Toggle the <strong>Safe Zone overlay</strong> to see these danger areas as translucent bands over your media, so you can reposition important elements before export.</p>
<h2>Designing for the interface, not against it</h2>
<p>Keep logos, captions, and calls to action inside the clear central column. Treat the bottom fifth and right edge as off-limits for anything that must be read. For Feed ads, front-load the hook in the first 125 characters; for Reels, keep on-creative text short and high-contrast so it survives compression and small screens.</p>
<h2>A private, instant preview</h2>
<p>PostTruncate runs entirely in your browser — paste a caption and attach a creative and nothing is uploaded or saved. Check the Feed fold, the Reels window, and the safe-zone collisions in real time, then publish knowing your message stays visible.</p>`,
      es: `<h2>Límites de pie de foto en Instagram: feed frente a Reels</h2>
<p>Instagram permite pies de foto de hasta 2200 caracteres, pero lo que cuenta es la visibilidad. En el <strong>feed</strong>, el pie de foto de un anuncio se trunca a unos <strong>125 caracteres</strong> tras un enlace "… más", el mismo pliegue práctico que en Facebook. En <strong>Reels</strong>, el espacio útil es mucho más estrecho: el pie de foto se sitúa sobre el vídeo con la interfaz encima, así que la ventana cómoda ronda los <strong>40 a 72 caracteres</strong> antes de que tus palabras empiecen a chocar con los controles en pantalla. El simulador alterna entre ambos modos para que veas cada corte.</p>
<h2>Por qué las zonas seguras hacen o deshacen un Reel</h2>
<p>Reels e Historias superponen elementos de interfaz sobre tu creatividad: el bloque de perfil y pie de foto recorre el <strong>20 % inferior</strong>, y la pila de acciones —me gusta, comentar, compartir, audio— ocupa el <strong>15 % derecho</strong>. Cualquier texto o elemento crítico que incrustes en esas regiones queda cubierto. Activa la <strong>superposición de zona segura</strong> para ver estas áreas de peligro como bandas translúcidas sobre tu contenido, de modo que puedas reubicar los elementos importantes antes de exportar.</p>
<h2>Diseñar a favor de la interfaz, no en contra</h2>
<p>Mantén los logotipos, los pies de foto y las llamadas a la acción dentro de la columna central despejada. Trata el quinto inferior y el borde derecho como zonas prohibidas para todo lo que deba leerse. Para los anuncios del feed, coloca el gancho en los primeros 125 caracteres; para Reels, mantén el texto sobre la creatividad corto y de alto contraste para que sobreviva a la compresión y a las pantallas pequeñas.</p>
<h2>Una vista previa privada e instantánea</h2>
<p>PostTruncate funciona por completo en tu navegador: pega un pie de foto y adjunta una creatividad y no se sube ni se guarda nada. Comprueba el pliegue del feed, la ventana de Reels y las colisiones de zona segura en tiempo real, y luego publica sabiendo que tu mensaje permanece visible.</p>`,
      de: `<h2>Instagram-Bildunterschriftlimits: Feed versus Reels</h2>
<p>Instagram erlaubt Bildunterschriften bis zu 2.200 Zeichen, aber es zählt die Sichtbarkeit. Im <strong>Feed</strong> wird eine Anzeigen-Bildunterschrift bei etwa <strong>125 Zeichen</strong> hinter einem „… mehr"-Link gekürzt — dieselbe praktische Falz wie bei Facebook. In <strong>Reels</strong> ist der nutzbare Platz weit enger: Die Bildunterschrift liegt über dem Video mit der Oberfläche darüber, sodass das komfortable Fenster bei etwa <strong>40 bis 72 Zeichen</strong> liegt, bevor deine Wörter mit den Bildschirmsteuerungen kollidieren. Der Simulator wechselt zwischen beiden Modi, sodass du jeden Schnitt siehst.</p>
<h2>Warum Sicherheitszonen über ein Reel entscheiden</h2>
<p>Reels und Stories überlagern dein Creative mit Oberflächenelementen: Der Profil- und Bildunterschriftblock verläuft über die <strong>unteren ~20 %</strong>, und der Aktionsstapel — Gefällt mir, Kommentar, Teilen, Audio — belegt die <strong>rechten ~15 %</strong>. Jeder Text oder jedes wichtige Motiv, das du in diese Bereiche legst, wird verdeckt. Schalte das <strong>Sicherheitszonen-Overlay</strong> ein, um diese Gefahrenbereiche als durchscheinende Bänder über deinen Medien zu sehen, damit du wichtige Elemente vor dem Export neu platzieren kannst.</p>
<h2>Für die Oberfläche gestalten, nicht gegen sie</h2>
<p>Halte Logos, Bildunterschriften und Calls-to-Action in der freien mittleren Spalte. Behandle das untere Fünftel und den rechten Rand als tabu für alles, was gelesen werden muss. Bei Feed-Anzeigen stelle den Aufhänger in die ersten 125 Zeichen; bei Reels halte Text auf dem Creative kurz und kontrastreich, damit er Komprimierung und kleine Bildschirme übersteht.</p>
<h2>Eine private, sofortige Vorschau</h2>
<p>PostTruncate läuft vollständig in deinem Browser — füge eine Bildunterschrift ein und hänge ein Creative an, und nichts wird hochgeladen oder gespeichert. Prüfe die Feed-Falz, das Reels-Fenster und die Sicherheitszonen-Kollisionen in Echtzeit, und veröffentliche dann in dem Wissen, dass deine Botschaft sichtbar bleibt.</p>`,
      fr: `<h2>Limites de légende Instagram : Feed contre Reels</h2>
<p>Instagram autorise des légendes jusqu’à 2 200 caractères, mais c’est la visibilité qui compte. Dans le <strong>Feed</strong>, une légende d’annonce est tronquée à environ <strong>125 caractères</strong> derrière un lien « … plus » — le même pli pratique que Facebook. Dans les <strong>Reels</strong>, l’espace utile est bien plus serré : la légende se place sur la vidéo avec l’interface par-dessus, si bien que la fenêtre confortable est d’environ <strong>40 à 72 caractères</strong> avant que vos mots ne se heurtent aux commandes à l’écran. Le simulateur bascule entre les deux modes pour que vous voyiez chaque coupure.</p>
<h2>Pourquoi les zones de sécurité font ou défont un Reel</h2>
<p>Les Reels et les Stories superposent à votre visuel des éléments d’interface : le bloc profil et légende court le long des <strong>~20 % du bas</strong>, et la pile d’actions — j’aime, commenter, partager, audio — occupe les <strong>~15 % de droite</strong>. Tout texte ou sujet critique que vous incrustez dans ces zones est recouvert. Activez la <strong>superposition de zone de sécurité</strong> pour voir ces zones à risque comme des bandes translucides sur vos médias, afin de repositionner les éléments importants avant l’export.</p>
<h2>Concevoir avec l’interface, pas contre elle</h2>
<p>Gardez les logos, les légendes et les appels à l’action dans la colonne centrale dégagée. Considérez le cinquième inférieur et le bord droit comme interdits à tout ce qui doit être lu. Pour les annonces du Feed, placez l’accroche dans les 125 premiers caractères ; pour les Reels, gardez le texte sur le visuel court et très contrasté pour qu’il survive à la compression et aux petits écrans.</p>
<h2>Un aperçu privé et instantané</h2>
<p>PostTruncate fonctionne entièrement dans votre navigateur — collez une légende et joignez un visuel, rien n’est téléversé ni enregistré. Vérifiez le pli du Feed, la fenêtre des Reels et les collisions de zone de sécurité en temps réel, puis publiez en sachant que votre message reste visible.</p>`,
      pt: `<h2>Limites de legenda no Instagram: feed face a Reels</h2>
<p>O Instagram permite legendas até 2200 caracteres, mas o que conta é a visibilidade. No <strong>feed</strong>, a legenda de um anúncio é truncada por volta dos <strong>125 caracteres</strong> atrás de um link "… mais" — a mesma dobra prática do Facebook. Nos <strong>Reels</strong>, o espaço útil é muito mais apertado: a legenda fica sobre o vídeo com a interface por cima, por isso a janela confortável ronda os <strong>40 a 72 caracteres</strong> antes de as suas palavras começarem a colidir com os controlos no ecrã. O simulador alterna entre os dois modos para que veja cada corte.</p>
<h2>Porque as zonas seguras fazem ou desfazem um Reel</h2>
<p>Os Reels e as Stories sobrepõem elementos de interface ao seu criativo: o bloco de perfil e legenda percorre os <strong>~20 % inferiores</strong>, e a pilha de ações — gosto, comentar, partilhar, áudio — ocupa os <strong>~15 % à direita</strong>. Qualquer texto ou elemento crítico que incorpore nessas regiões fica coberto. Ative a <strong>sobreposição de zona segura</strong> para ver estas áreas de perigo como bandas translúcidas sobre o seu conteúdo, de modo a reposicionar os elementos importantes antes de exportar.</p>
<h2>Desenhar a favor da interface, não contra ela</h2>
<p>Mantenha logótipos, legendas e chamadas para ação dentro da coluna central desimpedida. Trate o quinto inferior e a margem direita como zonas proibidas para tudo o que tenha de ser lido. Para anúncios do feed, coloque o gancho nos primeiros 125 caracteres; para Reels, mantenha o texto sobre o criativo curto e de alto contraste para que sobreviva à compressão e aos ecrãs pequenos.</p>
<h2>Uma pré-visualização privada e instantânea</h2>
<p>O PostTruncate funciona totalmente no seu navegador — cole uma legenda e anexe um criativo e nada é carregado ou guardado. Verifique a dobra do feed, a janela dos Reels e as colisões da zona segura em tempo real, e depois publique sabendo que a sua mensagem permanece visível.</p>`,
      it: `<h2>Limiti delle didascalie di Instagram: Feed contro Reels</h2>
<p>Instagram consente didascalie fino a 2.200 caratteri, ma ciò che conta è la visibilità. Nel <strong>Feed</strong>, la didascalia di un annuncio viene troncata a circa <strong>125 caratteri</strong> dietro un link "… altro" — la stessa piega pratica di Facebook. Nei <strong>Reels</strong>, lo spazio utile è molto più stretto: la didascalia sta sopra il video con l’interfaccia sopra di essa, quindi la finestra comoda è di circa <strong>40-72 caratteri</strong> prima che le tue parole inizino a scontrarsi con i controlli sullo schermo. Il simulatore passa da una modalità all’altra così vedi ogni taglio.</p>
<h2>Perché le zone sicure fanno la fortuna o la rovina di un Reel</h2>
<p>I Reels e le Storie sovrappongono al tuo creativo elementi dell’interfaccia: il blocco profilo e didascalia corre lungo il <strong>~20 % inferiore</strong>, e la pila di azioni — mi piace, commento, condividi, audio — occupa il <strong>~15 % a destra</strong>. Qualsiasi testo o soggetto critico che inserisci in quelle zone viene coperto. Attiva l’<strong>overlay di zona sicura</strong> per vedere queste aree a rischio come bande traslucide sopra i tuoi contenuti, così da riposizionare gli elementi importanti prima dell’esportazione.</p>
<h2>Progettare con l’interfaccia, non contro</h2>
<p>Tieni loghi, didascalie e call to action dentro la colonna centrale libera. Considera il quinto inferiore e il bordo destro come off-limits per tutto ciò che deve essere letto. Per gli annunci del Feed, metti il gancio nei primi 125 caratteri; per i Reels, tieni il testo sul creativo corto e ad alto contrasto così che sopravviva a compressione e schermi piccoli.</p>
<h2>Un’anteprima privata e immediata</h2>
<p>PostTruncate funziona interamente nel tuo browser — incolla una didascalia e allega un creativo e nulla viene caricato o salvato. Controlla la piega del Feed, la finestra dei Reels e le collisioni della zona sicura in tempo reale, poi pubblica sapendo che il tuo messaggio resta visibile.</p>`,
      nl: `<h2>Instagram-bijschriftlimieten: Feed versus Reels</h2>
<p>Instagram staat bijschriften tot 2.200 tekens toe, maar het draait om zichtbaarheid. In de <strong>Feed</strong> wordt een advertentiebijschrift bij ongeveer <strong>125 tekens</strong> afgekapt achter een "… meer"-link — dezelfde praktische vouw als Facebook. In <strong>Reels</strong> is de bruikbare ruimte veel krapper: het bijschrift ligt over de video met de interface erbovenop, dus het comfortabele venster is ongeveer <strong>40 tot 72 tekens</strong> voordat je woorden met de bedieningselementen op het scherm botsen. De simulator wisselt tussen beide modi zodat je elke afkapping ziet.</p>
<h2>Waarom veilige zones een Reel maken of breken</h2>
<p>Reels en Stories leggen interface-elementen over je creatie: het profiel- en bijschriftblok loopt langs de <strong>onderste ~20%</strong>, en de actiestapel — vind-ik-leuk, reageren, delen, audio — beslaat de <strong>rechter ~15%</strong>. Elke tekst of cruciaal onderwerp dat je in die gebieden inbakt, wordt bedekt. Schakel de <strong>veilige-zone-overlay</strong> in om deze gevarengebieden als doorschijnende banden over je media te zien, zodat je belangrijke elementen kunt herpositioneren vóór het exporteren.</p>
<h2>Ontwerpen mét de interface, niet ertegen</h2>
<p>Houd logo’s, bijschriften en call-to-actions binnen de vrije middenkolom. Behandel het onderste vijfde deel en de rechterrand als verboden terrein voor alles wat gelezen moet worden. Voor Feed-advertenties zet je de hook in de eerste 125 tekens; voor Reels houd je tekst op de creatie kort en contrastrijk zodat hij compressie en kleine schermen overleeft.</p>
<h2>Een privé, direct voorbeeld</h2>
<p>PostTruncate draait volledig in je browser — plak een bijschrift en voeg een creatie toe en er wordt niets geüpload of opgeslagen. Controleer de Feed-vouw, het Reels-venster en de veilige-zone-botsingen in realtime en publiceer dan in de wetenschap dat je boodschap zichtbaar blijft.</p>`,
      ja: `<h2>Instagramのキャプション制限：フィード対リール</h2>
<p>Instagramは最大2,200文字のキャプションを許可していますが、重要なのは表示性です。<strong>フィード</strong>では、広告のキャプションはおよそ<strong>125文字</strong>で「… 続きを読む」リンクの裏に切り捨てられます。Facebookと同じ実質的な折り返しです。<strong>リール</strong>では使えるスペースははるかに狭く、キャプションは動画の上に重なり、その上にインターフェースが載るため、画面上のコントロールと衝突し始める前の快適な範囲はおよそ<strong>40〜72文字</strong>です。シミュレーターは両モードを切り替えるので、それぞれの切れ目を確認できます。</p>
<h2>なぜセーフゾーンがリールの成否を分けるのか</h2>
<p>リールとストーリーズはインターフェース要素をクリエイティブに重ねます。プロフィールとキャプションのブロックは<strong>下部の約20%</strong>に沿って走り、アクションの列（いいね、コメント、シェア、音源）は<strong>右側の約15%</strong>を占めます。それらの領域に焼き込んだテキストや重要な被写体は覆われます。<strong>セーフゾーンのオーバーレイ</strong>を切り替えると、これらの危険領域がメディア上の半透明の帯として表示され、書き出し前に重要な要素を配置し直せます。</p>
<h2>インターフェースに逆らわず、合わせて設計する</h2>
<p>ロゴ、キャプション、行動喚起は、すっきりした中央の列の中に収めてください。下から5分の1と右端は、読ませたいものには立ち入り禁止と考えましょう。フィード広告ではフックを最初の125文字に置き、リールではクリエイティブ上のテキストを短くコントラストを高くして、圧縮や小さな画面でも残るようにします。</p>
<h2>非公開で瞬時のプレビュー</h2>
<p>PostTruncateは完全にブラウザー内で動作します。キャプションを貼り付けてクリエイティブを添付しても、何もアップロードも保存もされません。フィードの折り返し、リールの範囲、セーフゾーンの衝突をリアルタイムで確認し、メッセージが表示されたままであると確信して公開してください。</p>`,
      zh: `<h2>Instagram 文案限制：信息流对比 Reels</h2>
<p>Instagram 允许最多 2200 字符的文案，但真正重要的是可见性。在<strong>信息流</strong>中，广告文案大约在 <strong>125 字符</strong>处被截断并显示"… 更多"链接——与 Facebook 相同的实际折叠点。在 <strong>Reels</strong> 中可用空间要紧得多：文案叠在视频之上，而界面又压在其上，因此在你的文字开始与屏幕控件相撞之前，舒适区间约为 <strong>40 至 72 字符</strong>。模拟器在两种模式间切换，让你看到各自的截断点。</p>
<h2>为什么安全区决定一条 Reel 的成败</h2>
<p>Reels 和快拍会用界面元素覆盖你的素材：个人资料与文案区块沿<strong>底部约 20%</strong>展开，而操作图标栏——点赞、评论、分享、音频——占据<strong>右侧约 15%</strong>。你烧录进这些区域的任何文字或关键主体都会被遮挡。切换<strong>安全区叠层</strong>，即可看到这些危险区域以半透明色带覆盖在素材上，便于你在导出前重新摆放重要元素。</p>
<h2>顺应界面来设计，而非对抗</h2>
<p>把徽标、文案和行动号召放在中央的空旷栏内。把底部五分之一和右侧边缘视为任何需阅读内容的禁区。信息流广告把钩子放在前 125 字符；Reels 则让素材上的文字简短、高对比，以便在压缩和小屏幕下仍然清晰。</p>
<h2>私密、即时的预览</h2>
<p>PostTruncate 完全在你的浏览器中运行——粘贴文案并附加素材，不会上传或保存任何内容。实时查看信息流折叠、Reels 区间和安全区碰撞，然后放心发布，确信你的信息保持可见。</p>`,
      da: `<h2>Instagram-billedtekstgrænser: Feed kontra Reels</h2>
<p>Instagram tillader billedtekster på op til 2.200 tegn, men det er synligheden, der tæller. I <strong>Feedet</strong> bliver en annonce-billedtekst skåret af ved omkring <strong>125 tegn</strong> bag et "… mere"-link — samme praktiske fold som Facebook. I <strong>Reels</strong> er den brugbare plads langt strammere: billedteksten ligger over videoen med brugerfladen ovenpå, så det behagelige vindue er omkring <strong>40 til 72 tegn</strong>, før dine ord begynder at kollidere med kontrollerne på skærmen. Simulatoren skifter mellem begge tilstande, så du kan se hver afskæring.</p>
<h2>Hvorfor sikre zoner gør eller ødelægger en Reel</h2>
<p>Reels og Stories lægger brugerfladeelementer oven på dit kreative: profil- og billedtekstblokken løber langs de <strong>nederste ~20 %</strong>, og handlingsstakken — synes godt om, kommentér, del, lyd — optager de <strong>højre ~15 %</strong>. Enhver tekst eller vigtigt motiv, du brænder ind i de områder, bliver dækket. Slå <strong>sikker-zone-overlayet</strong> til for at se disse farezoner som gennemsigtige bånd over dine medier, så du kan flytte vigtige elementer før eksport.</p>
<h2>Design med brugerfladen, ikke imod den</h2>
<p>Hold logoer, billedtekster og handlingsopfordringer inden for den frie midterkolonne. Behandl den nederste femtedel og højre kant som forbudt område for alt, der skal læses. Til Feed-annoncer placér krogen i de første 125 tegn; til Reels hold tekst på det kreative kort og kontrastrig, så den overlever komprimering og små skærme.</p>
<h2>En privat, øjeblikkelig forhåndsvisning</h2>
<p>PostTruncate kører helt i din browser — indsæt en billedtekst og vedhæft et kreativt, og intet uploades eller gemmes. Tjek Feed-folden, Reels-vinduet og sikker-zone-kollisionerne i realtid, og udgiv så med vished om, at dit budskab forbliver synligt.</p>`,
    },

    faq: {
      en: [
        {
          q: 'Where does an Instagram Feed caption get cut off?',
          a: 'At roughly 125 characters, after which Instagram shows a "… more" link. Put your hook and key message before that point.',
        },
        {
          q: 'How long should a Reels caption be?',
          a: 'Keep it tight — about 40 to 72 characters. Reels captions sit over the video and compete with the interface, so long captions get covered or pushed behind a "more" tap.',
        },
        {
          q: 'What are Instagram safe zones?',
          a: 'Regions of the screen covered by the interface: the bottom ~20% (profile and caption) and the right ~15% (the action icon stack). Keep important text and subjects out of these areas.',
        },
        {
          q: 'Is my caption or image uploaded?',
          a: 'No. Everything runs locally in your browser. Your caption and any attached creative never leave your device.',
        },
      ],
      es: [
        {
          q: '¿Dónde se corta un pie de foto del feed de Instagram?',
          a: 'A unos 125 caracteres, tras lo cual Instagram muestra un enlace "… más". Pon tu gancho y mensaje clave antes de ese punto.',
        },
        {
          q: '¿Cuánto debe medir un pie de foto de Reels?',
          a: 'Mantenlo breve: unos 40 a 72 caracteres. Los pies de foto de Reels se sitúan sobre el vídeo y compiten con la interfaz, así que los largos quedan cubiertos o se ocultan tras un toque en "más".',
        },
        {
          q: '¿Qué son las zonas seguras de Instagram?',
          a: 'Regiones de la pantalla cubiertas por la interfaz: el 20 % inferior (perfil y pie de foto) y el 15 % derecho (la pila de iconos de acción). Mantén el texto y los elementos importantes fuera de esas áreas.',
        },
        {
          q: '¿Se sube mi pie de foto o mi imagen?',
          a: 'No. Todo funciona localmente en tu navegador. Tu pie de foto y cualquier creatividad adjunta nunca salen de tu dispositivo.',
        },
      ],
      de: [
        {
          q: 'Wo wird eine Instagram-Feed-Bildunterschrift abgeschnitten?',
          a: 'Bei etwa 125 Zeichen, danach zeigt Instagram einen „… mehr"-Link. Platziere deinen Aufhänger und deine Kernbotschaft vor diesem Punkt.',
        },
        {
          q: 'Wie lang sollte eine Reels-Bildunterschrift sein?',
          a: 'Halte sie knapp — etwa 40 bis 72 Zeichen. Reels-Bildunterschriften liegen über dem Video und konkurrieren mit der Oberfläche, daher werden lange Bildunterschriften verdeckt oder hinter ein Tippen auf „mehr" geschoben.',
        },
        {
          q: 'Was sind Instagram-Sicherheitszonen?',
          a: 'Bildschirmbereiche, die von der Oberfläche verdeckt werden: die unteren ~20 % (Profil und Bildunterschrift) und die rechten ~15 % (der Aktions-Icon-Stapel). Halte wichtigen Text und Motive aus diesen Bereichen heraus.',
        },
        {
          q: 'Wird meine Bildunterschrift oder mein Bild hochgeladen?',
          a: 'Nein. Alles läuft lokal in deinem Browser. Deine Bildunterschrift und jedes angehängte Creative verlassen dein Gerät nie.',
        },
      ],
      fr: [
        {
          q: 'Où une légende du Feed Instagram est-elle coupée ?',
          a: 'À environ 125 caractères, après quoi Instagram affiche un lien « … plus ». Placez votre accroche et votre message clé avant ce point.',
        },
        {
          q: 'Quelle longueur doit faire une légende de Reels ?',
          a: 'Gardez-la courte — environ 40 à 72 caractères. Les légendes de Reels se placent sur la vidéo et concurrencent l’interface, si bien que les longues légendes sont recouvertes ou repoussées derrière un appui sur « plus ».',
        },
        {
          q: 'Qu’est-ce que les zones de sécurité Instagram ?',
          a: 'Des régions de l’écran recouvertes par l’interface : les ~20 % du bas (profil et légende) et les ~15 % de droite (la pile d’icônes d’action). Gardez le texte et les sujets importants hors de ces zones.',
        },
        {
          q: 'Ma légende ou mon image est-elle téléversée ?',
          a: 'Non. Tout fonctionne localement dans votre navigateur. Votre légende et tout visuel joint ne quittent jamais votre appareil.',
        },
      ],
      pt: [
        {
          q: 'Onde é que uma legenda do feed do Instagram é cortada?',
          a: 'Por volta dos 125 caracteres, após o que o Instagram mostra um link "… mais". Coloque o seu gancho e mensagem-chave antes desse ponto.',
        },
        {
          q: 'Que comprimento deve ter uma legenda de Reels?',
          a: 'Mantenha-a curta — cerca de 40 a 72 caracteres. As legendas dos Reels ficam sobre o vídeo e competem com a interface, por isso as longas ficam cobertas ou são empurradas para trás de um toque em "mais".',
        },
        {
          q: 'O que são as zonas seguras do Instagram?',
          a: 'Regiões do ecrã cobertas pela interface: os ~20 % inferiores (perfil e legenda) e os ~15 % à direita (a pilha de ícones de ação). Mantenha o texto e os elementos importantes fora dessas áreas.',
        },
        {
          q: 'A minha legenda ou imagem é carregada?',
          a: 'Não. Tudo funciona localmente no seu navegador. A sua legenda e qualquer criativo anexado nunca saem do seu dispositivo.',
        },
      ],
      it: [
        {
          q: 'Dove viene tagliata una didascalia del Feed di Instagram?',
          a: 'A circa 125 caratteri, dopodiché Instagram mostra un link "… altro". Metti il tuo gancio e il messaggio chiave prima di quel punto.',
        },
        {
          q: 'Quanto dovrebbe essere lunga una didascalia dei Reels?',
          a: 'Tienila breve — circa 40-72 caratteri. Le didascalie dei Reels stanno sopra il video e competono con l’interfaccia, quindi quelle lunghe vengono coperte o spinte dietro un tocco su "altro".',
        },
        {
          q: 'Cosa sono le zone sicure di Instagram?',
          a: 'Regioni dello schermo coperte dall’interfaccia: il ~20 % inferiore (profilo e didascalia) e il ~15 % a destra (la pila di icone di azione). Tieni testo e soggetti importanti fuori da queste aree.',
        },
        {
          q: 'La mia didascalia o immagine viene caricata?',
          a: 'No. Tutto funziona localmente nel tuo browser. La tua didascalia e qualsiasi creatività allegata non lasciano mai il tuo dispositivo.',
        },
      ],
      nl: [
        {
          q: 'Waar wordt een Instagram-feedbijschrift afgekapt?',
          a: 'Bij ongeveer 125 tekens, waarna Instagram een "… meer"-link toont. Zet je hook en kernboodschap vóór dat punt.',
        },
        {
          q: 'Hoe lang moet een Reels-bijschrift zijn?',
          a: 'Houd het kort — ongeveer 40 tot 72 tekens. Reels-bijschriften liggen over de video en concurreren met de interface, dus lange bijschriften worden bedekt of achter een tik op "meer" geduwd.',
        },
        {
          q: 'Wat zijn Instagram veilige zones?',
          a: 'Schermgebieden die door de interface worden bedekt: de onderste ~20% (profiel en bijschrift) en de rechter ~15% (de actie-icoonstapel). Houd belangrijke tekst en onderwerpen buiten deze gebieden.',
        },
        {
          q: 'Wordt mijn bijschrift of afbeelding geüpload?',
          a: 'Nee. Alles draait lokaal in je browser. Je bijschrift en elke toegevoegde creatie verlaten je apparaat nooit.',
        },
      ],
      ja: [
        {
          q: 'Instagramフィードのキャプションはどこで切れますか？',
          a: 'およそ125文字で、その後Instagramは「… 続きを読む」リンクを表示します。フックと要点はその前に置いてください。',
        },
        {
          q: 'リールのキャプションはどれくらいの長さにすべきですか？',
          a: '短く保ちましょう。およそ40〜72文字です。リールのキャプションは動画の上に重なりインターフェースと競合するため、長いキャプションは覆われたり「続きを読む」のタップの裏に追いやられたりします。',
        },
        {
          q: 'Instagramのセーフゾーンとは何ですか？',
          a: 'インターフェースに覆われる画面の領域です。下部の約20%（プロフィールとキャプション）と右側の約15%（アクションアイコンの列）。重要なテキストや被写体はこれらの領域から外してください。',
        },
        {
          q: '私のキャプションや画像はアップロードされますか？',
          a: 'いいえ。すべてブラウザー内でローカルに動作します。キャプションや添付したクリエイティブが端末から出ることはありません。',
        },
      ],
      zh: [
        {
          q: 'Instagram 信息流文案在哪里被截断？',
          a: '大约在 125 字符处，之后 Instagram 会显示"… 更多"链接。把你的钩子和关键信息放在该点之前。',
        },
        {
          q: 'Reels 文案应该多长？',
          a: '保持简短——约 40 至 72 字符。Reels 文案叠在视频之上并与界面争夺空间，因此过长的文案会被遮挡或被推到"更多"点按之后。',
        },
        {
          q: 'Instagram 安全区是什么？',
          a: '被界面覆盖的屏幕区域：底部约 20%（个人资料与文案）和右侧约 15%（操作图标栏）。把重要文字和主体放在这些区域之外。',
        },
        {
          q: '我的文案或图片会被上传吗？',
          a: '不会。一切都在你的浏览器本地运行。你的文案和任何附加素材都不会离开你的设备。',
        },
      ],
      da: [
        {
          q: 'Hvor bliver en Instagram-feed-billedtekst skåret af?',
          a: 'Ved omkring 125 tegn, hvorefter Instagram viser et "… mere"-link. Placér din krog og dit nøglebudskab før det punkt.',
        },
        {
          q: 'Hvor lang bør en Reels-billedtekst være?',
          a: 'Hold den stram — omkring 40 til 72 tegn. Reels-billedtekster ligger over videoen og konkurrerer med brugerfladen, så lange billedtekster bliver dækket eller skubbet bag et tryk på "mere".',
        },
        {
          q: 'Hvad er Instagrams sikre zoner?',
          a: 'Skærmområder dækket af brugerfladen: de nederste ~20 % (profil og billedtekst) og de højre ~15 % (handlingsikonstakken). Hold vigtig tekst og motiver uden for disse områder.',
        },
        {
          q: 'Bliver min billedtekst eller mit billede uploadet?',
          a: 'Nej. Alt kører lokalt i din browser. Din billedtekst og ethvert vedhæftet kreativt forlader aldrig din enhed.',
        },
      ],
    },
  },

  {
    id: 'tiktok-ads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-18',
    platformLimits:
      'TikTok description truncates around 100 characters behind "... See more" and is clamped to ~4 lines; safe zones block the top ~10%, bottom ~20%, and right ~15% of the 9:16 video.',

    slugs: {
      en: 'tiktok-ads',
      es: 'anuncios-de-tiktok',
      de: 'tiktok-anzeigen',
      fr: 'annonces-tiktok',
      pt: 'anuncios-do-tiktok',
      it: 'annunci-tiktok',
      nl: 'tiktok-advertenties',
      ja: 'tiktok-kokoku',
      zh: 'tiktok-guang-gao',
      da: 'tiktok-annoncer',
    },

    schemaName: {
      en: 'TikTok Ad Preview — Safe Zones & Character Limits',
      es: 'Vista previa de anuncios de TikTok — Zonas seguras y límites de caracteres',
      de: 'TikTok-Anzeigenvorschau — Sicherheitszonen & Zeichenlimits',
      fr: 'Aperçu d’annonces TikTok — Zones de sécurité et limites de caractères',
      pt: 'Pré-visualização de anúncios do TikTok — Zonas seguras e limites de caracteres',
      it: 'Anteprima degli annunci TikTok — Zone sicure e limiti di caratteri',
      nl: 'TikTok-advertentievoorbeeld — Veilige zones & tekenlimieten',
      ja: 'TikTok広告プレビュー — セーフゾーンと文字数制限',
      zh: 'TikTok 广告预览 — 安全区与字符限制',
      da: 'TikTok-annonceforhåndsvisning — Sikre zoner & tegngrænser',
    },

    titles: {
      en: 'TikTok Ad Preview — 9:16 Safe Zone & Character Limit Simulator',
      es: 'Vista previa de anuncios de TikTok — Simulador de zona segura 9:16 y límites de caracteres',
      de: 'TikTok-Anzeigenvorschau — 9:16-Sicherheitszonen- & Zeichenlimit-Simulator',
      fr: 'Aperçu d’annonces TikTok — Simulateur de zone de sécurité 9:16 et de limites de caractères',
      pt: 'Pré-visualização de anúncios do TikTok — Simulador de zona segura 9:16 e limites de caracteres',
      it: 'Anteprima annunci TikTok — Simulatore di zona sicura 9:16 e limiti di caratteri',
      nl: 'TikTok-advertentievoorbeeld — 9:16 veilige-zone- & tekenlimietsimulator',
      ja: 'TikTok広告プレビュー — 9:16セーフゾーンと文字数制限シミュレーター',
      zh: 'TikTok 广告预览 — 9:16 安全区与字符限制模拟器',
      da: 'TikTok-annonceforhåndsvisning — 9:16 sikker-zone- & tegngrænse-simulator',
    },

    metaDescriptions: {
      en: 'Free TikTok ad preview. See the safe zones that prevent text cutoff, where the description hits the "... See more" cutoff at ~100 characters, and exactly where TikTok\'s UI covers your vertical 9:16 video.',
      es: 'Vista previa gratuita de anuncios de TikTok. Ve las zonas seguras que evitan que el texto se corte, dónde la descripción alcanza el corte de "... Ver más" a unos 100 caracteres y exactamente dónde la interfaz de TikTok cubre tu vídeo vertical 9:16.',
      de: 'Kostenlose TikTok-Anzeigenvorschau. Sieh die Sicherheitszonen, die ein Abschneiden von Text verhindern, wo die Beschreibung bei etwa 100 Zeichen auf den „... Mehr ansehen"-Schnitt trifft, und genau, wo TikToks Oberfläche dein vertikales 9:16-Video verdeckt.',
      fr: 'Aperçu gratuit d’annonces TikTok. Voyez les zones de sécurité qui empêchent la coupure du texte, où la description atteint la coupure « ... Voir plus » à environ 100 caractères, et exactement où l’interface de TikTok recouvre votre vidéo verticale 9:16.',
      pt: 'Pré-visualização gratuita de anúncios do TikTok. Veja as zonas seguras que evitam o corte de texto, onde a descrição atinge o corte "... Ver mais" por volta dos 100 caracteres e exatamente onde a interface do TikTok cobre o seu vídeo vertical 9:16.',
      it: 'Anteprima gratuita degli annunci TikTok. Vedi le zone sicure che evitano il taglio del testo, dove la descrizione raggiunge il taglio "... Altro" a circa 100 caratteri ed esattamente dove l’interfaccia di TikTok copre il tuo video verticale 9:16.',
      nl: 'Gratis TikTok-advertentievoorbeeld. Zie de veilige zones die tekstafkapping voorkomen, waar de beschrijving de "... Meer weergeven"-afkapping bij ~100 tekens raakt en precies waar de interface van TikTok je verticale 9:16-video bedekt.',
      ja: '無料のTikTok広告プレビュー。テキストの切れを防ぐセーフゾーン、説明がおよそ100文字で「... もっと見る」の切れ目に達する位置、そしてTikTokのUIが縦型9:16動画を覆う正確な位置を確認できます。',
      zh: '免费的 TikTok 广告预览。查看防止文字被截断的安全区、描述在约 100 字符处触及"... 查看更多"截断的位置，以及 TikTok 界面遮挡你 9:16 竖版视频的确切区域。',
      da: 'Gratis TikTok-annonceforhåndsvisning. Se de sikre zoner, der forhindrer tekstafskæring, hvor beskrivelsen rammer "... Se mere"-afskæringen ved ~100 tegn, og præcis hvor TikToks brugerflade dækker din lodrette 9:16-video.',
    },

    intro: {
      en: 'Preview your TikTok ad on a true 9:16 vertical canvas. See where your description hits the "... See more" cutoff, and toggle the safe-zone overlay to find the blind spots where TikTok\'s interface would cover hardcoded text in your video.',
      es: 'Previsualiza tu anuncio de TikTok en un lienzo vertical 9:16 real. Ve dónde tu descripción alcanza el corte de "... Ver más" y activa la superposición de zona segura para encontrar los puntos ciegos donde la interfaz de TikTok cubriría el texto incrustado en tu vídeo.',
      de: 'Sieh dir deine TikTok-Anzeige auf einer echten vertikalen 9:16-Leinwand an. Sieh, wo deine Beschreibung den „... Mehr ansehen"-Schnitt trifft, und schalte das Sicherheitszonen-Overlay ein, um die toten Winkel zu finden, in denen TikToks Oberfläche fest eingebetteten Text in deinem Video verdecken würde.',
      fr: 'Prévisualisez votre annonce TikTok sur un vrai canevas vertical 9:16. Voyez où votre description atteint la coupure « ... Voir plus », et activez la superposition de zone de sécurité pour repérer les angles morts où l’interface de TikTok recouvrirait le texte incrusté dans votre vidéo.',
      pt: 'Pré-visualize o seu anúncio do TikTok numa tela vertical 9:16 real. Veja onde a sua descrição atinge o corte "... Ver mais" e ative a sobreposição de zona segura para encontrar os pontos cegos onde a interface do TikTok cobriria o texto incorporado no seu vídeo.',
      it: 'Visualizza l’anteprima del tuo annuncio TikTok su una vera tela verticale 9:16. Vedi dove la tua descrizione raggiunge il taglio "... Altro" e attiva l’overlay di zona sicura per trovare i punti ciechi in cui l’interfaccia di TikTok coprirebbe il testo incorporato nel tuo video.',
      nl: 'Bekijk een voorbeeld van je TikTok-advertentie op een echt verticaal 9:16-canvas. Zie waar je beschrijving de "... Meer weergeven"-afkapping raakt en schakel de veilige-zone-overlay in om de dode hoeken te vinden waar de interface van TikTok ingebakken tekst in je video zou bedekken.',
      ja: 'TikTok広告を本物の縦型9:16キャンバスでプレビューできます。説明が「... もっと見る」の切れ目に達する位置を確認し、セーフゾーンのオーバーレイを切り替えて、TikTokのインターフェースが動画に焼き込まれたテキストを覆う死角を見つけられます。',
      zh: '在真正的 9:16 竖版画布上预览你的 TikTok 广告。查看描述触及"... 查看更多"截断的位置，并切换安全区叠层，找出 TikTok 界面会遮挡视频中烧录文字的盲区。',
      da: 'Forhåndsvis din TikTok-annonce på et ægte lodret 9:16-lærred. Se, hvor din beskrivelse rammer "... Se mere"-afskæringen, og slå sikker-zone-overlayet til for at finde de blinde vinkler, hvor TikToks brugerflade ville dække fastbrændt tekst i din video.',
    },

    content: {
      en: `<h2>TikTok ad character limits and the "See more" cutoff</h2>
<p>A TikTok ad <strong>description truncates around 100 characters</strong>, after which the platform appends an unclickable "... See more" and clamps the visible text to roughly <strong>four lines</strong>. Anything past that is hidden unless a viewer taps. Because TikTok is sound-on, fast-scrolling, and full-screen, your first line has to earn the watch — the simulator above shows the exact cutoff so your hook is never buried.</p>
<h2>TikTok safe zones: where not to put text</h2>
<p>This is the single biggest mistake in TikTok creative: <strong>baking text or logos into the parts of the video that TikTok's interface covers</strong>. On a vertical 9:16 video, the UI blocks three regions — the <strong>top ~10%</strong> (the For You / Following tabs and status bar), the <strong>bottom ~20%</strong> (username, caption, call to action, and the music ticker), and the <strong>right ~15%</strong> (the profile photo plus the like, comment, bookmark, and share icons). Toggle the <strong>Safe Zone overlay</strong> to see these blind spots as translucent red bands, so you know precisely where hardcoded text would be hidden.</p>
<h2>How to prevent text cutoff on TikTok</h2>
<p>Keep captions, prices, disclaimers, and logos inside the clear central area — never in the top bar, bottom fifth, or right rail. If you must place text low, raise it well above the caption block. Design for the interface from the first frame rather than discovering the collision after the ad is live.</p>
<h2>Preview your vertical video privately</h2>
<p>Upload a vertical thumbnail to the 9:16 canvas, type your description, and toggle the overlay — all in your browser, with nothing uploaded or stored. You will see your TikTok ad the way users do, with the safe zones mapped, before you ever push it to TikTok Ads Manager.</p>`,
      es: `<h2>Límites de caracteres de los anuncios de TikTok y el corte de "Ver más"</h2>
<p>La <strong>descripción de un anuncio de TikTok se trunca en torno a los 100 caracteres</strong>, tras lo cual la plataforma añade un "... Ver más" que no se puede clicar y limita el texto visible a unas <strong>cuatro líneas</strong>. Todo lo que queda después se oculta a menos que el usuario toque. Como TikTok es con sonido, de desplazamiento rápido y a pantalla completa, tu primera línea tiene que ganarse la visualización — el simulador de arriba muestra el corte exacto para que tu gancho nunca quede enterrado.</p>
<h2>Zonas seguras de TikTok: dónde no poner texto</h2>
<p>Este es el mayor error en la creatividad de TikTok: <strong>incrustar texto o logotipos en las partes del vídeo que cubre la interfaz de TikTok</strong>. En un vídeo vertical 9:16, la interfaz bloquea tres regiones: el <strong>10 % superior</strong> (las pestañas Para ti / Siguiendo y la barra de estado), el <strong>20 % inferior</strong> (nombre de usuario, pie de foto, llamada a la acción y el indicador de música) y el <strong>15 % derecho</strong> (la foto de perfil más los iconos de me gusta, comentar, guardar y compartir). Activa la <strong>superposición de zona segura</strong> para ver estos puntos ciegos como bandas rojas translúcidas, de modo que sepas exactamente dónde quedaría oculto el texto incrustado.</p>
<h2>Cómo evitar que el texto se corte en TikTok</h2>
<p>Mantén los pies de foto, los precios, los avisos legales y los logotipos dentro del área central despejada — nunca en la barra superior, el quinto inferior ni el carril derecho. Si tienes que colocar texto abajo, súbelo bastante por encima del bloque del pie de foto. Diseña para la interfaz desde el primer fotograma en lugar de descubrir la colisión cuando el anuncio ya está activo.</p>
<h2>Previsualiza tu vídeo vertical en privado</h2>
<p>Sube una miniatura vertical al lienzo 9:16, escribe tu descripción y activa la superposición — todo en tu navegador, sin subir ni almacenar nada. Verás tu anuncio de TikTok como lo ven los usuarios, con las zonas seguras mapeadas, antes de enviarlo siquiera al Administrador de anuncios de TikTok.</p>`,
      de: `<h2>TikTok-Anzeigen-Zeichenlimits und der „Mehr ansehen"-Schnitt</h2>
<p>Eine TikTok-Anzeigen-<strong>Beschreibung wird bei etwa 100 Zeichen abgeschnitten</strong>, danach hängt die Plattform ein nicht anklickbares „... Mehr ansehen" an und begrenzt den sichtbaren Text auf rund <strong>vier Zeilen</strong>. Alles darüber hinaus ist verborgen, sofern ein Betrachter nicht tippt. Da TikTok mit Ton, schnellem Scrollen und im Vollbild läuft, muss deine erste Zeile das Zusehen verdienen — der Simulator oben zeigt den genauen Schnitt, sodass dein Aufhänger nie verschüttet wird.</p>
<h2>TikTok-Sicherheitszonen: wo man keinen Text platziert</h2>
<p>Das ist der größte Fehler bei TikTok-Creatives: <strong>Text oder Logos in die Teile des Videos einzubrennen, die TikToks Oberfläche verdeckt</strong>. Bei einem vertikalen 9:16-Video blockiert die Oberfläche drei Bereiche — die <strong>oberen ~10 %</strong> (die Tabs „Für dich" / „Folge ich" und die Statusleiste), die <strong>unteren ~20 %</strong> (Nutzername, Bildunterschrift, Call-to-Action und die Musik-Laufschrift) und die <strong>rechten ~15 %</strong> (das Profilfoto plus die Symbole für Gefällt mir, Kommentar, Speichern und Teilen). Schalte das <strong>Sicherheitszonen-Overlay</strong> ein, um diese toten Winkel als durchscheinende rote Bänder zu sehen, sodass du genau weißt, wo eingebetteter Text verborgen würde.</p>
<h2>So verhinderst du abgeschnittenen Text auf TikTok</h2>
<p>Halte Bildunterschriften, Preise, Hinweise und Logos im freien zentralen Bereich — niemals in der oberen Leiste, dem unteren Fünftel oder der rechten Schiene. Musst du Text tief platzieren, hebe ihn deutlich über den Bildunterschriftblock. Gestalte ab dem ersten Frame für die Oberfläche, statt die Kollision erst zu entdecken, wenn die Anzeige live ist.</p>
<h2>Sieh dir dein vertikales Video privat in der Vorschau an</h2>
<p>Lade ein vertikales Thumbnail auf die 9:16-Leinwand, tippe deine Beschreibung und schalte das Overlay um — alles in deinem Browser, ohne dass etwas hochgeladen oder gespeichert wird. Du siehst deine TikTok-Anzeige so, wie Nutzer sie sehen, mit kartierten Sicherheitszonen, bevor du sie überhaupt in den TikTok-Anzeigenmanager überträgst.</p>`,
      fr: `<h2>Limites de caractères des annonces TikTok et la coupure « Voir plus »</h2>
<p>La <strong>description d’une annonce TikTok est tronquée autour de 100 caractères</strong>, après quoi la plateforme ajoute un « ... Voir plus » non cliquable et limite le texte visible à environ <strong>quatre lignes</strong>. Tout ce qui suit est masqué à moins qu’un spectateur ne touche. Comme TikTok est avec le son, à défilement rapide et en plein écran, votre première ligne doit mériter le visionnage — le simulateur ci-dessus montre la coupure exacte pour que votre accroche ne soit jamais enterrée.</p>
<h2>Zones de sécurité TikTok : où ne pas mettre de texte</h2>
<p>C’est la plus grosse erreur dans les créations TikTok : <strong>incruster du texte ou des logos dans les parties de la vidéo que l’interface de TikTok recouvre</strong>. Sur une vidéo verticale 9:16, l’interface bloque trois régions — les <strong>~10 % du haut</strong> (les onglets Pour toi / Abonnements et la barre d’état), les <strong>~20 % du bas</strong> (nom d’utilisateur, légende, appel à l’action et le bandeau musical) et les <strong>~15 % de droite</strong> (la photo de profil plus les icônes j’aime, commenter, enregistrer et partager). Activez la <strong>superposition de zone de sécurité</strong> pour voir ces angles morts comme des bandes rouges translucides, afin de savoir précisément où le texte incrusté serait masqué.</p>
<h2>Comment éviter la coupure de texte sur TikTok</h2>
<p>Gardez les légendes, les prix, les mentions légales et les logos dans la zone centrale dégagée — jamais dans la barre du haut, le cinquième du bas ou la colonne de droite. Si vous devez placer du texte en bas, remontez-le bien au-dessus du bloc de légende. Concevez pour l’interface dès la première image plutôt que de découvrir la collision une fois l’annonce en ligne.</p>
<h2>Prévisualisez votre vidéo verticale en privé</h2>
<p>Téléversez une miniature verticale sur le canevas 9:16, tapez votre description et activez la superposition — le tout dans votre navigateur, sans rien téléverser ni stocker. Vous verrez votre annonce TikTok comme la voient les utilisateurs, avec les zones de sécurité cartographiées, avant même de l’envoyer dans le gestionnaire de publicités TikTok.</p>`,
      pt: `<h2>Limites de caracteres dos anúncios do TikTok e o corte de "Ver mais"</h2>
<p>A <strong>descrição de um anúncio do TikTok é truncada por volta dos 100 caracteres</strong>, após o que a plataforma acrescenta um "... Ver mais" que não é clicável e limita o texto visível a cerca de <strong>quatro linhas</strong>. Tudo o que vem depois fica oculto a menos que um espectador toque. Como o TikTok é com som, de deslocamento rápido e em ecrã inteiro, a sua primeira linha tem de merecer a visualização — o simulador acima mostra o corte exato para que o seu gancho nunca fique enterrado.</p>
<h2>Zonas seguras do TikTok: onde não pôr texto</h2>
<p>Este é o maior erro nos criativos do TikTok: <strong>incorporar texto ou logótipos nas partes do vídeo que a interface do TikTok cobre</strong>. Num vídeo vertical 9:16, a interface bloqueia três regiões — os <strong>~10 % superiores</strong> (os separadores Para ti / A seguir e a barra de estado), os <strong>~20 % inferiores</strong> (nome de utilizador, legenda, chamada para ação e o letreiro da música) e os <strong>~15 % à direita</strong> (a foto de perfil mais os ícones de gosto, comentar, guardar e partilhar). Ative a <strong>sobreposição de zona segura</strong> para ver estes pontos cegos como bandas vermelhas translúcidas, de modo a saber exatamente onde o texto incorporado ficaria oculto.</p>
<h2>Como evitar o corte de texto no TikTok</h2>
<p>Mantenha legendas, preços, avisos legais e logótipos dentro da área central desimpedida — nunca na barra superior, no quinto inferior ou na coluna direita. Se tiver de colocar texto em baixo, suba-o bem acima do bloco da legenda. Desenhe para a interface desde o primeiro fotograma em vez de descobrir a colisão depois de o anúncio estar ativo.</p>
<h2>Pré-visualize o seu vídeo vertical em privado</h2>
<p>Carregue uma miniatura vertical na tela 9:16, escreva a sua descrição e ative a sobreposição — tudo no seu navegador, sem carregar nem armazenar nada. Verá o seu anúncio do TikTok como os utilizadores o veem, com as zonas seguras mapeadas, antes de sequer o enviar para o Gestor de anúncios do TikTok.</p>`,
      it: `<h2>Limiti di caratteri degli annunci TikTok e il taglio "Altro"</h2>
<p>La <strong>descrizione di un annuncio TikTok viene troncata intorno ai 100 caratteri</strong>, dopodiché la piattaforma aggiunge un "... Altro" non cliccabile e limita il testo visibile a circa <strong>quattro righe</strong>. Tutto ciò che viene dopo è nascosto a meno che uno spettatore non tocchi. Poiché TikTok è con audio, a scorrimento rapido e a schermo intero, la tua prima riga deve guadagnarsi la visione — il simulatore qui sopra mostra il taglio esatto così il tuo gancio non viene mai sepolto.</p>
<h2>Zone sicure di TikTok: dove non mettere il testo</h2>
<p>Questo è l’errore più grande nei creativi TikTok: <strong>incorporare testo o loghi nelle parti del video che l’interfaccia di TikTok copre</strong>. In un video verticale 9:16, l’interfaccia blocca tre regioni — il <strong>~10 % superiore</strong> (le schede Per te / Seguiti e la barra di stato), il <strong>~20 % inferiore</strong> (nome utente, didascalia, call to action e la barra della musica) e il <strong>~15 % a destra</strong> (la foto del profilo più le icone mi piace, commenta, salva e condividi). Attiva l’<strong>overlay di zona sicura</strong> per vedere questi punti ciechi come bande rosse traslucide, così sai esattamente dove il testo incorporato verrebbe nascosto.</p>
<h2>Come evitare il taglio del testo su TikTok</h2>
<p>Tieni didascalie, prezzi, avvertenze e loghi nell’area centrale libera — mai nella barra superiore, nel quinto inferiore o nella colonna destra. Se devi mettere testo in basso, alzalo ben sopra il blocco della didascalia. Progetta per l’interfaccia dal primo fotogramma invece di scoprire la collisione quando l’annuncio è già attivo.</p>
<h2>Visualizza l’anteprima del tuo video verticale in privato</h2>
<p>Carica una miniatura verticale sulla tela 9:16, scrivi la tua descrizione e attiva l’overlay — tutto nel tuo browser, senza caricare o memorizzare nulla. Vedrai il tuo annuncio TikTok come lo vedono gli utenti, con le zone sicure mappate, prima ancora di inviarlo a Gestione annunci di TikTok.</p>`,
      nl: `<h2>TikTok-advertentie-tekenlimieten en de "Meer weergeven"-afkapping</h2>
<p>De <strong>beschrijving van een TikTok-advertentie wordt rond de 100 tekens afgekapt</strong>, waarna het platform een niet-klikbaar "... Meer weergeven" toevoegt en de zichtbare tekst tot ongeveer <strong>vier regels</strong> beperkt. Alles daarna is verborgen tenzij een kijker tikt. Omdat TikTok met geluid, snel scrollend en schermvullend is, moet je eerste regel het kijken verdienen — de simulator hierboven toont de exacte afkapping zodat je hook nooit bedolven raakt.</p>
<h2>TikTok veilige zones: waar je geen tekst plaatst</h2>
<p>Dit is de grootste fout in TikTok-creaties: <strong>tekst of logo’s inbakken in de delen van de video die de interface van TikTok bedekt</strong>. Bij een verticale 9:16-video blokkeert de interface drie gebieden — de <strong>bovenste ~10%</strong> (de tabbladen Voor jou / Volgend en de statusbalk), de <strong>onderste ~20%</strong> (gebruikersnaam, bijschrift, call-to-action en de muziekticker) en de <strong>rechter ~15%</strong> (de profielfoto plus de pictogrammen voor vind-ik-leuk, reageren, opslaan en delen). Schakel de <strong>veilige-zone-overlay</strong> in om deze dode hoeken als doorschijnende rode banden te zien, zodat je precies weet waar ingebakken tekst verborgen zou worden.</p>
<h2>Hoe je tekstafkapping op TikTok voorkomt</h2>
<p>Houd bijschriften, prijzen, disclaimers en logo’s binnen het vrije centrale gebied — nooit in de bovenbalk, het onderste vijfde deel of de rechterrail. Moet je tekst laag plaatsen, til hem dan ruim boven het bijschriftblok. Ontwerp vanaf het eerste frame voor de interface in plaats van de botsing te ontdekken nadat de advertentie live is.</p>
<h2>Bekijk je verticale video privé in een voorbeeld</h2>
<p>Upload een verticale thumbnail naar het 9:16-canvas, typ je beschrijving en schakel de overlay in — allemaal in je browser, zonder dat er iets wordt geüpload of opgeslagen. Je ziet je TikTok-advertentie zoals gebruikers hem zien, met de veilige zones in kaart gebracht, voordat je hem ooit naar TikTok Ads Manager stuurt.</p>`,
      ja: `<h2>TikTok広告の文字数制限と「もっと見る」の切れ目</h2>
<p>TikTok広告の<strong>説明はおよそ100文字で切り捨てられ</strong>、その後にプラットフォームがクリックできない「... もっと見る」を付け、表示テキストをおよそ<strong>4行</strong>に制限します。それ以降は視聴者がタップしない限り隠れます。TikTokは音声オン・高速スクロール・全画面なので、最初の1行で視聴を勝ち取る必要があります。上のシミュレーターは正確な切れ目を示すので、フックが埋もれることはありません。</p>
<h2>TikTokのセーフゾーン：テキストを置いてはいけない場所</h2>
<p>これがTikTokクリエイティブで最大の間違いです。<strong>TikTokのインターフェースが覆う動画の部分にテキストやロゴを焼き込むこと</strong>です。縦型9:16動画では、UIが3つの領域を遮ります。<strong>上部の約10%</strong>（おすすめ／フォロー中タブとステータスバー）、<strong>下部の約20%</strong>（ユーザー名、キャプション、行動喚起、楽曲ティッカー）、<strong>右側の約15%</strong>（プロフィール写真と、いいね・コメント・保存・シェアのアイコン）です。<strong>セーフゾーンのオーバーレイ</strong>を切り替えると、これらの死角が半透明の赤い帯として表示され、焼き込んだテキストが隠れる場所を正確に把握できます。</p>
<h2>TikTokでテキストの切れを防ぐ方法</h2>
<p>キャプション、価格、注意書き、ロゴは、すっきりした中央エリア内に収め、上部バー・下から5分の1・右レールには決して置かないでください。下の方にテキストを置く必要がある場合は、キャプションのブロックよりかなり上に上げます。広告が公開された後に衝突を発見するのではなく、最初のフレームからインターフェースに合わせて設計してください。</p>
<h2>縦型動画を非公開でプレビュー</h2>
<p>縦型サムネイルを9:16キャンバスにアップロードし、説明を入力し、オーバーレイを切り替えます。すべてブラウザー内で行われ、何もアップロードも保存もされません。TikTok広告マネージャに送る前に、セーフゾーンをマッピングした状態で、ユーザーが見るのと同じようにTikTok広告を確認できます。</p>`,
      zh: `<h2>TikTok 广告字符限制与"查看更多"截断</h2>
<p>TikTok 广告<strong>描述大约在 100 字符处被截断</strong>，之后平台会附上不可点击的"... 查看更多"，并把可见文本限制到大约<strong>四行</strong>。除非观看者点按，否则其后内容都会隐藏。由于 TikTok 是开声、快速滑动、全屏的，你的第一行必须赢得观看——上方的模拟器会显示精确截断点，让你的钩子绝不被埋没。</p>
<h2>TikTok 安全区：不要放文字的地方</h2>
<p>这是 TikTok 素材中最大的错误：<strong>把文字或徽标烧录进 TikTok 界面所覆盖的视频区域</strong>。在 9:16 竖版视频中，界面会遮挡三个区域——<strong>顶部约 10%</strong>（"为你推荐"/"关注"标签和状态栏）、<strong>底部约 20%</strong>（用户名、文案、行动号召和音乐滚动条）以及<strong>右侧约 15%</strong>（头像以及点赞、评论、收藏、分享图标）。切换<strong>安全区叠层</strong>，即可看到这些盲区以半透明红色色带显示，让你准确知道烧录文字会在何处被遮挡。</p>
<h2>如何防止 TikTok 上的文字被截断</h2>
<p>把文案、价格、免责声明和徽标放在中央空旷区域内——绝不要放在顶栏、底部五分之一或右侧栏。如果必须把文字放低，就把它抬到远高于文案区块的位置。从第一帧就为界面设计，而不是等广告上线后才发现碰撞。</p>
<h2>私密预览你的竖版视频</h2>
<p>把竖版缩略图上传到 9:16 画布，输入描述，再切换叠层——全部在你的浏览器中完成，不上传或存储任何内容。在你把它推送到 TikTok 广告管理工具之前，你就能像用户那样看到你的 TikTok 广告，并标出安全区。</p>`,
      da: `<h2>TikTok-annoncens tegngrænser og "Se mere"-afskæringen</h2>
<p>En TikTok-annonces <strong>beskrivelse skæres af omkring 100 tegn</strong>, hvorefter platformen tilføjer et ikke-klikbart "... Se mere" og begrænser den synlige tekst til cirka <strong>fire linjer</strong>. Alt derefter er skjult, medmindre en seer trykker. Fordi TikTok er med lyd, hurtigt scrollende og fuldskærm, skal din første linje fortjene visningen — simulatoren ovenfor viser den præcise afskæring, så din krog aldrig begraves.</p>
<h2>TikTok-sikre zoner: hvor man ikke placerer tekst</h2>
<p>Dette er den allerstørste fejl i TikTok-kreativer: <strong>at brænde tekst eller logoer ind i de dele af videoen, som TikToks brugerflade dækker</strong>. På en lodret 9:16-video blokerer brugerfladen tre områder — de <strong>øverste ~10 %</strong> (fanerne Til dig / Følger og statuslinjen), de <strong>nederste ~20 %</strong> (brugernavn, billedtekst, handlingsopfordring og musikbjælken) og de <strong>højre ~15 %</strong> (profilbilledet plus ikonerne for synes godt om, kommentér, gem og del). Slå <strong>sikker-zone-overlayet</strong> til for at se disse blinde vinkler som gennemsigtige røde bånd, så du ved præcis, hvor fastbrændt tekst ville blive skjult.</p>
<h2>Sådan forhindrer du afskåret tekst på TikTok</h2>
<p>Hold billedtekster, priser, forbehold og logoer inden for det frie centrale område — aldrig i den øverste bjælke, den nederste femtedel eller den højre skinne. Hvis du må placere tekst lavt, så løft den et godt stykke over billedtekstblokken. Design til brugerfladen fra første billede frem for at opdage kollisionen, efter annoncen er live.</p>
<h2>Forhåndsvis din lodrette video privat</h2>
<p>Upload et lodret miniaturebillede til 9:16-lærredet, skriv din beskrivelse, og slå overlayet til — alt sammen i din browser, uden at noget uploades eller gemmes. Du ser din TikTok-annonce, som brugerne gør, med de sikre zoner kortlagt, før du overhovedet sender den til TikTok Annonceadministrator.</p>`,
    },

    faq: {
      en: [
        {
          q: 'What is the TikTok ad description character limit?',
          a: 'The visible description truncates around 100 characters with a "... See more" link, and is clamped to about four lines. Keep your hook and key message before that cutoff.',
        },
        {
          q: 'What are the TikTok safe zones?',
          a: 'The areas the interface covers on a 9:16 video: the top ~10% (tabs and status bar), the bottom ~20% (username, caption, CTA, music ticker), and the right ~15% (the profile and engagement icon stack).',
        },
        {
          q: 'How do I prevent text from being cut off on TikTok?',
          a: 'Keep all important text and logos inside the clear central column, away from the top bar, bottom fifth, and right rail. Use the safe-zone overlay in this tool to check placement before exporting.',
        },
        {
          q: 'Is my video or text uploaded?',
          a: 'No. The preview runs entirely in your browser. Your thumbnail and description are never uploaded or stored.',
        },
      ],
      es: [
        {
          q: '¿Cuál es el límite de caracteres de la descripción de un anuncio de TikTok?',
          a: 'La descripción visible se trunca en torno a los 100 caracteres con un enlace "... Ver más" y se limita a unas cuatro líneas. Mantén tu gancho y mensaje clave antes de ese corte.',
        },
        {
          q: '¿Cuáles son las zonas seguras de TikTok?',
          a: 'Las áreas que cubre la interfaz en un vídeo 9:16: el 10 % superior (pestañas y barra de estado), el 20 % inferior (nombre de usuario, pie de foto, CTA, indicador de música) y el 15 % derecho (la pila de iconos de perfil e interacción).',
        },
        {
          q: '¿Cómo evito que el texto se corte en TikTok?',
          a: 'Mantén todo el texto y los logotipos importantes dentro de la columna central despejada, lejos de la barra superior, el quinto inferior y el carril derecho. Usa la superposición de zona segura de esta herramienta para comprobar la ubicación antes de exportar.',
        },
        {
          q: '¿Se sube mi vídeo o mi texto?',
          a: 'No. La vista previa funciona por completo en tu navegador. Tu miniatura y tu descripción nunca se suben ni se almacenan.',
        },
      ],
      de: [
        {
          q: 'Wie hoch ist das Zeichenlimit der TikTok-Anzeigenbeschreibung?',
          a: 'Die sichtbare Beschreibung wird bei etwa 100 Zeichen mit einem „... Mehr ansehen"-Link abgeschnitten und auf rund vier Zeilen begrenzt. Halte deinen Aufhänger und deine Kernbotschaft vor diesem Schnitt.',
        },
        {
          q: 'Was sind die TikTok-Sicherheitszonen?',
          a: 'Die Bereiche, die die Oberfläche bei einem 9:16-Video verdeckt: die oberen ~10 % (Tabs und Statusleiste), die unteren ~20 % (Nutzername, Bildunterschrift, CTA, Musik-Laufschrift) und die rechten ~15 % (der Stapel aus Profil- und Interaktionssymbolen).',
        },
        {
          q: 'Wie verhindere ich, dass Text auf TikTok abgeschnitten wird?',
          a: 'Halte allen wichtigen Text und alle Logos in der freien zentralen Spalte, fern von der oberen Leiste, dem unteren Fünftel und der rechten Schiene. Nutze das Sicherheitszonen-Overlay in diesem Tool, um die Platzierung vor dem Export zu prüfen.',
        },
        {
          q: 'Wird mein Video oder Text hochgeladen?',
          a: 'Nein. Die Vorschau läuft vollständig in deinem Browser. Dein Thumbnail und deine Beschreibung werden nie hochgeladen oder gespeichert.',
        },
      ],
      fr: [
        {
          q: 'Quelle est la limite de caractères de la description d’une annonce TikTok ?',
          a: 'La description visible est tronquée autour de 100 caractères avec un lien « ... Voir plus » et limitée à environ quatre lignes. Gardez votre accroche et votre message clé avant cette coupure.',
        },
        {
          q: 'Quelles sont les zones de sécurité TikTok ?',
          a: 'Les zones que l’interface recouvre sur une vidéo 9:16 : les ~10 % du haut (onglets et barre d’état), les ~20 % du bas (nom d’utilisateur, légende, CTA, bandeau musical) et les ~15 % de droite (la pile d’icônes de profil et d’engagement).',
        },
        {
          q: 'Comment empêcher le texte d’être coupé sur TikTok ?',
          a: 'Gardez tout le texte et les logos importants dans la colonne centrale dégagée, à l’écart de la barre du haut, du cinquième du bas et de la colonne de droite. Utilisez la superposition de zone de sécurité de cet outil pour vérifier le placement avant d’exporter.',
        },
        {
          q: 'Ma vidéo ou mon texte est-il téléversé ?',
          a: 'Non. L’aperçu fonctionne entièrement dans votre navigateur. Votre miniature et votre description ne sont jamais téléversées ni stockées.',
        },
      ],
      pt: [
        {
          q: 'Qual é o limite de caracteres da descrição de um anúncio do TikTok?',
          a: 'A descrição visível é truncada por volta dos 100 caracteres com um link "... Ver mais" e limitada a cerca de quatro linhas. Mantenha o seu gancho e mensagem-chave antes desse corte.',
        },
        {
          q: 'Quais são as zonas seguras do TikTok?',
          a: 'As áreas que a interface cobre num vídeo 9:16: os ~10 % superiores (separadores e barra de estado), os ~20 % inferiores (nome de utilizador, legenda, CTA, letreiro da música) e os ~15 % à direita (a pilha de ícones de perfil e interação).',
        },
        {
          q: 'Como evito que o texto seja cortado no TikTok?',
          a: 'Mantenha todo o texto e logótipos importantes dentro da coluna central desimpedida, longe da barra superior, do quinto inferior e da coluna direita. Use a sobreposição de zona segura desta ferramenta para verificar o posicionamento antes de exportar.',
        },
        {
          q: 'O meu vídeo ou texto é carregado?',
          a: 'Não. A pré-visualização funciona totalmente no seu navegador. A sua miniatura e descrição nunca são carregadas ou armazenadas.',
        },
      ],
      it: [
        {
          q: 'Qual è il limite di caratteri della descrizione di un annuncio TikTok?',
          a: 'La descrizione visibile viene troncata intorno ai 100 caratteri con un link "... Altro" ed è limitata a circa quattro righe. Tieni il tuo gancio e il messaggio chiave prima di quel taglio.',
        },
        {
          q: 'Quali sono le zone sicure di TikTok?',
          a: 'Le aree che l’interfaccia copre in un video 9:16: il ~10 % superiore (schede e barra di stato), il ~20 % inferiore (nome utente, didascalia, CTA, barra della musica) e il ~15 % a destra (la pila di icone di profilo e interazione).',
        },
        {
          q: 'Come evito che il testo venga tagliato su TikTok?',
          a: 'Tieni tutto il testo e i loghi importanti dentro la colonna centrale libera, lontano dalla barra superiore, dal quinto inferiore e dalla colonna destra. Usa l’overlay di zona sicura di questo strumento per controllare il posizionamento prima di esportare.',
        },
        {
          q: 'Il mio video o testo viene caricato?',
          a: 'No. L’anteprima funziona interamente nel tuo browser. La tua miniatura e la tua descrizione non vengono mai caricate o memorizzate.',
        },
      ],
      nl: [
        {
          q: 'Wat is de tekenlimiet van de TikTok-advertentiebeschrijving?',
          a: 'De zichtbare beschrijving wordt rond de 100 tekens afgekapt met een "... Meer weergeven"-link en beperkt tot ongeveer vier regels. Houd je hook en kernboodschap vóór die afkapping.',
        },
        {
          q: 'Wat zijn de TikTok veilige zones?',
          a: 'De gebieden die de interface bedekt op een 9:16-video: de bovenste ~10% (tabbladen en statusbalk), de onderste ~20% (gebruikersnaam, bijschrift, CTA, muziekticker) en de rechter ~15% (de stapel profiel- en interactiepictogrammen).',
        },
        {
          q: 'Hoe voorkom ik dat tekst op TikTok wordt afgekapt?',
          a: 'Houd alle belangrijke tekst en logo’s binnen de vrije middenkolom, weg van de bovenbalk, het onderste vijfde deel en de rechterrail. Gebruik de veilige-zone-overlay in dit hulpmiddel om de plaatsing te controleren vóór het exporteren.',
        },
        {
          q: 'Wordt mijn video of tekst geüpload?',
          a: 'Nee. Het voorbeeld draait volledig in je browser. Je thumbnail en beschrijving worden nooit geüpload of opgeslagen.',
        },
      ],
      ja: [
        {
          q: 'TikTok広告の説明の文字数制限はどれくらいですか？',
          a: '表示される説明はおよそ100文字で「... もっと見る」リンクとともに切り捨てられ、約4行に制限されます。フックと要点はその切れ目の前に置いてください。',
        },
        {
          q: 'TikTokのセーフゾーンとは何ですか？',
          a: '9:16動画でインターフェースが覆う領域です。上部の約10%（タブとステータスバー）、下部の約20%（ユーザー名、キャプション、CTA、楽曲ティッカー）、右側の約15%（プロフィールとエンゲージメントのアイコン列）。',
        },
        {
          q: 'TikTokでテキストが切れるのを防ぐには？',
          a: '重要なテキストとロゴはすべて、すっきりした中央の列に収め、上部バー・下から5分の1・右レールから離してください。書き出し前に、このツールのセーフゾーンのオーバーレイで配置を確認しましょう。',
        },
        {
          q: '私の動画やテキストはアップロードされますか？',
          a: 'いいえ。プレビューは完全にブラウザー内で動作します。サムネイルや説明がアップロードされたり保存されたりすることはありません。',
        },
      ],
      zh: [
        {
          q: 'TikTok 广告描述的字符限制是多少？',
          a: '可见描述大约在 100 字符处被截断并显示"... 查看更多"链接，且限制为约四行。把你的钩子和关键信息放在该截断点之前。',
        },
        {
          q: 'TikTok 安全区有哪些？',
          a: '界面在 9:16 视频上覆盖的区域：顶部约 10%（标签和状态栏）、底部约 20%（用户名、文案、行动号召、音乐滚动条）以及右侧约 15%（头像和互动图标栏）。',
        },
        {
          q: '如何防止文字在 TikTok 上被截断？',
          a: '把所有重要文字和徽标放在中央空旷栏内，远离顶栏、底部五分之一和右侧栏。导出前用本工具的安全区叠层检查摆放位置。',
        },
        {
          q: '我的视频或文字会被上传吗？',
          a: '不会。预览完全在你的浏览器中运行。你的缩略图和描述绝不会被上传或存储。',
        },
      ],
      da: [
        {
          q: 'Hvad er tegngrænsen for TikTok-annoncens beskrivelse?',
          a: 'Den synlige beskrivelse skæres af omkring 100 tegn med et "... Se mere"-link og begrænses til cirka fire linjer. Hold din krog og dit nøglebudskab før den afskæring.',
        },
        {
          q: 'Hvad er TikToks sikre zoner?',
          a: 'De områder, brugerfladen dækker på en 9:16-video: de øverste ~10 % (faner og statuslinje), de nederste ~20 % (brugernavn, billedtekst, CTA, musikbjælke) og de højre ~15 % (stakken af profil- og engagementsikoner).',
        },
        {
          q: 'Hvordan forhindrer jeg, at tekst bliver skåret af på TikTok?',
          a: 'Hold al vigtig tekst og alle logoer inden for den frie midterkolonne, væk fra den øverste bjælke, den nederste femtedel og den højre skinne. Brug sikker-zone-overlayet i dette værktøj til at tjekke placeringen før eksport.',
        },
        {
          q: 'Bliver min video eller tekst uploadet?',
          a: 'Nej. Forhåndsvisningen kører helt i din browser. Dit miniaturebillede og din beskrivelse uploades eller gemmes aldrig.',
        },
      ],
    },
  },
];

// ── Lookup helpers (mirror the other registries) ────────────────────────────

/** adPreviews keyed by stable id. */
export const AD_PREVIEWS_BY_ID: Record<string, ToolDefinition> = Object.fromEntries(
  adPreviews.map((tool) => [tool.id, tool]),
);

/** Find an ad-preview tool by any locale's URL slug. */
export function adPreviewBySlug(slug: string): ToolDefinition | undefined {
  return adPreviews.find((tool) => Object.values(tool.slugs).includes(slug));
}
