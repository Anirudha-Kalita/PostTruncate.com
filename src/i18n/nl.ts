import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// Nederlands (nl) — machinaal gegenereerde vertaling. Deze tekst is nog niet
// door een mens nagekeken en heeft een redactionele controle nodig vóór de
// lancering. Mirrors en.ts exactly in structure (enforced by Translations).
// ──────────────────────────────────────────────────────────────────────────

export const nl: Translations = {
  seo: {
    title:
      'Tekenteller — Gratis Online Teken- en Woordteller | PostTruncate',
    description:
      'Gratis social-media-previewtool. Zie de LinkedIn-fold, splits X/Twitter-threads, check hashtag-limieten en toegankelijkheidsvallen — live in je browser.',
    skipLink: 'Ga direct naar de editor',
  },

  nav: {
    brandAria: 'PostTruncate home',
    homeAria: 'PostTruncate home',
    links: {
      editor: 'Editor',
      guides: 'Platformgidsen',
      limits: 'Alle platformlimieten',
      tools: 'Tools',
      counters: 'Tekentellers',
      adPreviews: 'Advertentievoorbeelden',
      faq: 'FAQ',
      about: 'Over',
      contact: 'Contact',
    },
    cta: 'Open de editor',
    themeToDark: 'Schakel naar donker thema',
    themeToLight: 'Schakel naar licht thema',
    language: 'Taal',
    languageAria: 'Selecteer taal',
    menuAria: 'Navigatiemenu in-/uitschakelen',
    backToTop: 'Terug naar boven',
    bookmarkToast: {
      heading: 'Was dit nuttig?',
      desktopBody: 'Druk op {shortcut} om deze pagina op te slaan en hem zo terug te vinden.',
      mobileBody: 'Bewaar deze tool zodat hij de volgende keer met één tik klaarstaat.',
      mobileButton: 'Deze pagina opslaan of delen',
      copied: 'Link gekopieerd!',
      close: 'Sluiten',
    },
  },

  hero: {
    eyebrow: 'Social-preview- en afkapsimulator',
    title: 'Zie precies waar elk platform je tekst afkapt.',
    lede: 'Schrijf één keer en zie je bericht weergegeven in de native previews van LinkedIn, X, Threads, Instagram en Facebook — met vouwregels, threadsplitsingen, hashtaglimieten en toegankelijkheidswaarschuwingen live terwijl je typt, plus één-tik AI om je bericht meteen te verbeteren.',
    primary: 'Begin met schrijven',
    secondary: 'Bekijk de platformlimieten',
    badge: 'Real-time voorbeelden. Geen giswerk meer.',
    trust: '100% gratis — geen aanmelding · Je tekst verlaat nooit je browser · Meer dan 10 platformlimieten gedekt',
  },

  howItWorks: {
    heading: 'Hoe het werkt',
    steps: [
      {
        name: 'Plak of typ uw tekst',
        text: 'Zet uw concept in de editor en de tekenteller wordt direct bijgewerkt terwijl u typt.',
      },
      {
        name: 'Alle platforms worden tegelijk weergegeven',
        text: 'De voorbeeldkaarten van LinkedIn, X, Threads, Instagram, Facebook en sms worden allemaal tegelijk bijgewerkt — zonder dat u iets hoeft te selecteren.',
      },
      {
        name: 'Zie precies waar de tekst wordt afgekapt',
        text: 'De voorbeeldweergave markeert het afkappunt zodat u precies weet wat de lezers zullen zien.',
      },
    ],
  },

  toolPage: {
    onThisPage: 'Op deze pagina',
    lastUpdated: 'Laatst bijgewerkt: {date}',
    crossPromo: {
      heading: 'Andere platforms controleren?',
      text: 'PostTruncate is niet alleen voor {platform}. De volledige editor op de homepage toont je bericht tegelijk voor LinkedIn, X, Instagram, Facebook, Threads en TikTok — zodat je de vouw, limiet en coderingsvalkuilen van elk platform in één keer opmerkt. Schrijf het één keer, controleer het overal.',
      cta: 'Open de volledige editor',
    },
    cta: {
      heading: 'Klaar om te zien hoe je bericht er écht uitziet?',
      blurb: 'Plak je concept in de PostTruncate-editor en bekijk direct live-previews voor LinkedIn, X, Instagram, Facebook, Threads en TikTok — met vouwlijnen, thread-splits en limietwaarschuwingen die bijwerken terwijl je typt. Gratis, direct en niets verlaat je browser.',
      button: 'Begin met schrijven — het is gratis',
    },
  },

  images: {
    logoAlt: 'PostTruncate-logo',
    platformLogo: '{platform}-logo',
    authorAlt: 'Anirudha, ontwikkelaar van PostTruncate',
  },

  breadcrumbs: {
    home: 'Home',
  },

  workspace: {
    title: 'Je live werkruimte',
    sub: 'Alles hieronder wordt direct bijgewerkt en blijft op je apparaat.',
  },

  seoCopy: {
    ariaLabel: 'Over PostTruncate',
    sections: [
      {
        heading: 'Een tekenteller voor sociale media',
        paragraphs: [
          '<strong>PostTruncate</strong> is een gratis tekenteller die volledig in je browser werkt — geen uploads, geen account vereist. Plak of typ een tekst en je ziet direct het aantal tekens, woorden, leestijd en letterverdeling, alles live bijgewerkt.',
          'Het is handig voor iedereen die met tekstlimieten werkt: schrijvers die een kop inkorten, ontwikkelaars die een string controleren, of studenten die de lengte van een essay nagaan. Omdat alles lokaal verwerkt wordt, verlaat je tekst je apparaat op geen enkel moment.',
        ],
      },
      {
        heading: 'SMS-codering en segmentberekening',
        paragraphs: [
          'SMS gebruikt twee coderingen en de meeste tools negeren dat onderscheid. PostTruncate herkent automatisch of je bericht <strong>GSM-7</strong> (160 tekens per sms) of <strong>Unicode</strong> (70 tekens) gebruikt — en de overstap kan plaatsvinden zodra je één emoji of speciaal teken typt.',
          'De tool markeert ook tekens uit de uitgebreide GSM-tabel — zoals het euroteken (€), vierkante haken of het pipe-symbool — die in GSM-7-modus blijven maar elk twee tekenplaatsen innemen in plaats van één. Dat verborgen verbruik zorgt regelmatig voor onverwachte segmentering.',
          'Als je tekst meerdere segmenten beslaat, laat de ingebouwde <strong>segmentcalculator</strong> precies zien hoeveel sms\'jes verstuurd worden, inclusief de UDH-overhead die de bruikbare ruimte per segment terugbrengt naar 153 tekens (GSM) of 67 (Unicode).',
        ],
      },
      {
        heading: 'X (Twitter): limieten en automatische threadsplitsing',
        paragraphs: [
          'X (Twitter) hanteert twee regels die mensen vaak verrassen: de limiet van 280 tekens, en het feit dat elk link — ongeacht de werkelijke lengte — voor precies 23 tekens meetelt. PostTruncate past beide regels toe, zodat de getoonde teller overeenkomt met wat X toont na het t.co-wrapper.',
          'Wanneer je concept te lang is, verdeelt de ingebouwde <strong>threadsplitser</strong> het automatisch in genummerde tweets op natuurlijke zinsgrenzen — nooit midden in een woord. Elke kaart toont het tekenantal en de positie, zodat je de volledige thread kunt nakijken voor je publiceert.',
        ],
      },
      {
        heading: 'Tekenlimits op Instagram en Facebook',
        paragraphs: [
          'Instagram staat tot 2.200 tekens toe in een bijschrift, maar toont slechts de eerste 125 of zo voordat de rest achter een link verdwijnt. PostTruncate geeft precies aan waar die grens valt, zodat de eerste zichtbare regel in de feed altijd de regel is die je wilt overbrengen.',
          'Het dashboard houdt ook het <strong>aantal hashtags</strong> realtime bij. Instagram staat tot 30 hashtags toe voordat een bericht mislukt, maar ~5 is het aanbevolen ideaal — meer leest als spam —, dus de meter waarschuwt boven 5 en markeert de harde limiet van 30. Spaties worden altijd meegeteld, net als het platform zelf doet.',
        ],
      },
      {
        heading: 'Woordtelling, leesbaarheid en platformanalyse',
        paragraphs: [
          'Naast platformlimieten telt PostTruncate ook woorden, zinnen, alinea\'s en symbolen — alles live terwijl je typt. Handig voor SEO-metabeschrijvingen, documentatiereviews of elk schrijfproces waarbij je meer nodig hebt dan alleen een tekenaantal.',
          'Het dashboard verwerkt meertalige tekst correct, inclusief CJK-schriftsystemen waarbij tekenaantal een ander semantisch gewicht heeft. Of je nu in het Nederlands, Engels, Japans of Chinees schrijft, de tellers weerspiegelen wat het doelplatform werkelijk te zien krijgt.',
        ],
      },
    ],
  },

  guides: {
    eyebrow: 'Platformgidsen',
    title: 'Ken elke limiet voordat je plaatst.',
    lede: 'Een snelle naslag voor de afkappunten, harde limieten en opmaakvalkuilen die je bereik op elk netwerk stilletjes afremmen.',
    items: {
      linkedin: {
        name: 'LinkedIn',
        tag: 'De “…meer weergeven”-vouw',
        body: 'LinkedIn klapt berichten in na ongeveer 210 tekens op desktop en 140 op mobiel, en verbergt al het andere achter een "…meer weergeven"-link. Wat boven die vouw staat, is je hele pitch in de feed — als je hook daar niet landt, klapt bijna niemand het bericht open. Zet de spanning, het resultaat of de vraag vooraan en duw hashtags en links onder de vouw.',
        facts: [
          ['Desktopvouw', '~210 tekens'],
          ['Mobiele vouw', '~140 tekens'],
          ['Harde berichtlimiet', '3.000 tekens'],
        ],
      },
      twitter: {
        name: 'X / Twitter',
        tag: 'Threads & linkweging',
        body: 'X telt één bericht af tegen 280 tekens, maar elke link wordt door t.co ingekort en vast op 23 tekens gerekend, hoe lang de echte URL ook is. Ga je over 280, dan heb je een thread nodig. Goede threads breken op zinsgrenzen, nooit middenin een woord, en nummeren elke tweet zodat lezers de volgorde kunnen volgen. PostTruncate splitst je concept automatisch op en geeft elke kaart zijn positie.',
        facts: [
          ['Limiet per tweet', '280 tekens'],
          ['Elke link telt als', '23 tekens'],
          ['Threadtweets', 'Onbeperkt'],
        ],
      },
      threads: {
        name: 'Threads',
        tag: 'Berichten aaneenschakelen',
        body: 'Threads, de tekstapp van Meta, geeft elk bericht 500 tekens — bijna het dubbele van X — en telt links volledig mee in plaats van ze in te korten. Ga je over 500, dan moet de rest als genummerde reacties worden aangehaakt. Het eerste bericht draagt nog steeds de feed, dus zet de hook vooraan, net als overal. PostTruncate meet op het volledige tekenaantal en schakelt lange teksten aaneen in een nette genummerde reeks.',
        facts: [
          ['Limiet per bericht', '500 tekens'],
          ['Links geteld', 'Volledig'],
          ['Overloop', 'Aaneengeschakeld als reacties'],
        ],
      },
      instagram: {
        name: 'Instagram',
        tag: 'Hashtagplafond',
        body: 'Instagram-bijschriften kunnen tot 2.200 tekens lang zijn, maar tonen slechts ongeveer de eerste 125 vóór een "meer"-link. Voor hashtags is de harde limiet 30 (bijschrift plus eerste reactie); daarboven wordt het bericht niet geplaatst. Maar ~5 is het aanbevolen ideaal; tientallen tags met lage intentie stapelen leest als spam. Houd je tags strak en relevant en let op de live meter, die boven 5 waarschuwt en de harde limiet van 30 markeert.',
        facts: [
          ['Bijschriftlimiet', '2.200 tekens'],
          ['Hashtags', '~5 aanbevolen / 30 hard'],
          ['Bijschriftpreview', '~125 tekens'],
        ],
      },
      facebook: {
        name: 'Facebook',
        tag: 'Feed-afkapping',
        body: 'Facebook kapt feedberichten af bij ongeveer 480 tekens met een "Meer weergeven"-link, en de betrokkenheid daalt sterk bij lange, ononderbroken tekstblokken. Kortere berichten met een duidelijke eerste regel presteren consequent beter. Dezelfde toegankelijkheidsregel geldt overal: pseudo-Unicode "fancy fonts" zien er vet of cursief uit, maar worden teken voor teken voorgelezen — of helemaal overgeslagen — door schermlezers, en daardoor krimpt je bereik stilletjes.',
        facts: [
          ['Feedvouw', '~480 tekens'],
          ['Best presterende lengte', 'Onder de 80 tekens'],
          ['Fancy fonts', 'Breken schermlezers'],
        ],
      },
      tiktok: {
        name: 'TikTok',
        tag: 'Bijschrift-vouw',
        body: 'TikTok-bijschriften lopen bij native plaatsen tot 4.000 tekens, waarbij emoji en hashtags meetellen voor de limiet — maar de TikTok-API en planners (Buffer, Hootsuite, Later) limiteren het bijschrift op 2.200, dus dat is de veilige grens als je niet handmatig plaatst. Maar de feed zet de video voorop: hij toont alleen het begin van je bijschrift en vouwt de rest achter “…meer” in bij het eerste regeleinde of ongeveer 100 tekens, wat het eerst komt. Begin met je hook op één regel zodat die overleeft. PostTruncate telt elk teken live en markeert precies waar het bijschrift invouwt over een 9:16-reel.',
        facts: [
          ['Bijschriftlimiet', '4.000 native / 2.200 API'],
          ['“…meer”-vouw', '~100 t. / 1e regel'],
          ['Videoframe', '9:16 (1080×1920)'],
        ],
      },
    },
  },

  hookband: {
    eyebrow: 'De hook schrijven',
    title: 'De eerste regel is de enige regel die de meeste mensen lezen.',
    body: 'In elke feed doet de tekst boven de vouw al het werk. Open met een resultaat, een spanning of een vraag — geen aanloopje. Verplaats links en hashtags onder de vouw, houd je opening onder het afkappunt van het platform en laat de preview bevestigen dat de hook het overleeft voordat je publiceert.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Veelgestelde vragen',
    viewAll: 'Bekijk alle FAQ’s',
    items: [
      {
        q: 'Wat is post-truncatie?',
        a: 'Truncatie is wat er gebeurt wanneer een platform je bericht afkapt — alles voorbij de zichtbare vouw verdwijnt achter een “…meer”-link, of tekens boven een harde limiet worden simpelweg geweigerd. PostTruncate laat live tijdens het typen zien waar elk platform die knip zet, zodat het belangrijkste deel nooit onder de vouw verdwijnt.',
      },
      {
        q: 'Waarom kappen sociale platforms berichten af?',
        a: 'Feeds zijn gemaakt om te scannen, dus platforms klappen lange berichten in om het scrollen snel te houden en meer berichten op het scherm te passen. Elk platform legt de grens ergens anders: LinkedIn vouwt rond 140–210 tekens, Facebook rond 110–480 afhankelijk van het apparaat, Instagram rond 125, en X hanteert simpelweg een harde limiet van 280 tekens. Alles onder de vouw wordt alleen gezien door lezers die actief op “meer” tikken — en dat doen de meesten nooit.',
      },
      {
        q: 'Welke platforms ondersteunt PostTruncate?',
        a: 'PostTruncate toont previews voor LinkedIn, X (Twitter), Threads, Instagram, Facebook en sms — met live tekentelling, vouwmarkeringen, thread-splitsing en sms-segmentberekening voor elk. Er is ook een Google SERP-preview voor paginatitels en metabeschrijvingen, plus een gratis insluitbare teller-widget voor je eigen site.',
      },
      {
        q: 'Hoe nauwkeurig zijn de tekenlimieten?',
        a: 'PostTruncate gebruikt de gepubliceerde en algemeen waargenomen limieten van elk platform — 280 voor X, 210/140 voor de LinkedIn-vouw, ~5 aanbevolen hashtags (harde limiet 30) voor Instagram en een vaste weging van 23 tekens voor links. Platforms passen deze af en toe aan en de weergave verschilt licht per apparaat, dus beschouw de previews als een nauwkeurige schatting in plaats van een pixelperfecte garantie.',
      },
      {
        q: 'Tellen spaties en leestekens mee als tekens?',
        a: 'Ja. Elke spatie, regeleinde en leesteken telt als één teken, en zowel de teller van PostTruncate als de platformlimieten nemen ze mee. De enige veelvoorkomende uitzondering zijn links op X/Twitter, die worden teruggebracht tot een vaste 23 tekens, ongeacht hoeveel letters, symbolen of schuine strepen de echte URL bevat.',
      },
      {
        q: 'Hoe beïnvloeden emoji het tekenaantal?',
        a: 'PostTruncate telt op basis van Unicode-codepunten, dus een eenvoudige emoji zoals 🙂 telt als één teken. Veel emoji zijn echter opgebouwd uit meerdere samengevoegde codepunten — huidskleurvariaties, vlaggen en gecombineerde tekens zoals 👨‍👩‍👧 — en die tellen als twee of meer. De meeste platforms, X in het bijzonder, wegen emoji ook zwaarder dan gewone letters, dus een concept vol emoji gebruikt iets meer van je limiet dan het zichtbare aantal tekens doet vermoeden.',
      },
      {
        q: 'Wat is het verschil tussen tekenaantal en woordaantal?',
        a: 'Het tekenaantal is het totaal van elk afzonderlijk teken — letters, spaties, leestekens en emoji inbegrepen — en dat is waaraan platformlimieten daadwerkelijk worden gemeten. Het woordaantal is het aantal door spaties gescheiden woorden, hoe lang elk ervan ook is. Een volledige tweet van 280 tekens kan slechts 40 woorden tellen, dus let op het tekenaantal om onder een limiet te blijven en gebruik het woordaantal als leesbaarheidsmaat.',
      },
      {
        q: 'Waarom telt mijn link als 23 tekens op X?',
        a: 'X wikkelt automatisch elke URL in zijn t.co-verkorter, die altijd 23 tekens inneemt, ongeacht hoe lang of kort de oorspronkelijke link is. Een link van 5 tekens en een link van 200 tekens kosten je dus allebei precies 23 van de limiet van 280. PostTruncate weerspiegelt dit in de gewogen teller.',
      },
      {
        q: 'Wat zijn “fancy fonts” en waarom worden ze gemarkeerd?',
        a: 'Die vette, cursieve of script-achtige letters die je uit lettertypegeneratoren plakt, zijn geen echte opmaak — het zijn pseudo-Unicode-tekens uit het blok Mathematical Alphanumeric Symbols. Ze zien er opgemaakt uit, maar schermlezers spellen ze letter voor letter of slaan ze over, wat zowel de toegankelijkheid als je organische bereik schaadt. De monitor markeert ze zodat je weer naar gewone tekst kunt overschakelen.',
      },
      {
        q: 'Wat verwijdert “Tekst opschonen”?',
        a: 'Het verwijdert onzichtbare en nulbreedte-tekens — nulbreedtespaties, byte-order marks, bidirectionele besturingstekens, zachte afbreekstreepjes en losse besturingscodes. Die sluipen er vaak in wanneer je vanuit andere apps kopieert, en ze verstoren stilletjes tekenaantallen en toegankelijkheid op oudere mobiele clients zonder ooit zichtbaar te zijn.',
      },
      {
        q: 'Wat is trefwoorddichtheid en hoe beschermt de overuse-monitor mijn content?',
        a: 'Trefwoorddichtheid is het percentage waarmee een woord voorkomt ten opzichte van het totale aantal woorden. Herhaal je hetzelfde woord te vaak, dan kan dat voor zoekmachines en lezers als keyword stuffing overkomen. De monitor volgt woordfrequentie live en markeert termen die boven de veilige grens van 3,0% komen, zodat je vóór publicatie kunt herschrijven.',
      },
      {
        q: 'Hoe berekenen de lees- en spreektijdtimers de duur van mijn bericht?',
        a: 'De leestijdtimer deelt je woordenaantal door een gemiddelde snelheid van 275 woorden per minuut. De spreektijdtimer gebruikt een gesprekstempo van 150 woorden per minuut. Zo kun je artikelen, scripts, nieuwsbrieven of korte video’s timen zonder de editor te verlaten.',
      },
      {
        q: 'Wat doet de Social Sanitizer en waarom zou ik emoji verwijderen of hashtags extraheren?',
        a: 'De opschoonacties maken ruwe concepten met één klik netter. De emoji-verwijderaar haalt iconen en speciale symbolen weg wanneer je platte tekst nodig hebt, en de hashtag-extractor haalt tags uit de lopende tekst en groepeert ze onderaan voor een leesbaardere caption.',
      },
      {
        q: 'Wordt mijn tekst ergens naartoe verstuurd?',
        a: 'Nee. De volledige editor en elke preview draaien lokaal in je browser. Je concept verlaat nooit je apparaat — er is geen account, geen upload en geen serververwerking van je inhoud.',
      },
      {
        q: 'Betekent sessie-autosave dat mijn gegevens op een server worden opgeslagen?',
        a: 'Nee. Je concepten worden nooit geüpload of opgeslagen op externe infrastructuur. Sessie-autosave gebruikt sessionStorage in je eigen browser, alleen binnen dat tabblad. Vernieuw je de pagina in hetzelfde tabblad, dan wordt je tekst hersteld; wanneer de tabsessie eindigt, wist de browser die tijdelijke cache.',
      },
      {
        q: 'Is PostTruncate gratis?',
        a: 'Ja, het is volledig gratis te gebruiken en er is geen aanmelding vereist. De tool wordt ondersteund door onopvallende advertenties op gereserveerde plekken die de lay-out nooit verschuiven terwijl je werkt.',
      },
      {
        q: 'Waarom telde mijn SMS van 160 tekens plotseling als twee berichten?',
        a: 'Dit komt door een wijziging in de codering van de tekst. Standaard-sms gebruikt GSM-7-codering, die maximaal 160 tekens in één bericht past. Zodra de tekst een niet-GSM-teken bevat — een emoji, een regionaal schrift of bepaalde symbolen — schakelt het volledige bericht over naar Unicode, dat maar 70 tekens per segment bevat. Als een Unicode-bericht meer dan 70 tekens heeft, wordt een meerdelig header toegevoegd en daalt de bruikbare ruimte per segment tot 67 tekens. PostTruncate toont live de actieve codering en het aantal segmenten, zodat je altijd weet waar de grens valt.',
      },
      {
        q: 'Tellen speciale tekens en emoji als één teken in een SMS?',
        a: 'Niet altijd. Standaardletters en -cijfers tellen elk als één teken. Symbolen uit de uitgebreide GSM-tabel — waaronder het euroteken (€), vierkante haken, accolades en het pipe-symbool | — tellen elk als twee tekens, ook al blijft het bericht in GSM-7-modus. Emoji zijn anders: één emoji toevoegen dwingt het hele bericht naar Unicode, waardoor de limiet per segment van 160 naar 70 tekens daalt.',
      },
    ],
  },

  faqPage: {
    title: 'FAQ — PostTruncate tekenteller & berichtpreviews',
    description:
      'Alle vragen over PostTruncate beantwoord: tekenlimieten per platform, het tellen van emoji’s en links, sms-segmentatie, privacy en hoe de live previews werken.',
    eyebrow: 'FAQ',
    heading: 'Veelgestelde vragen',
    lede: 'Alles over hoe PostTruncate je berichten telt, previewt en beschermt — gegroepeerd per onderwerp. Klik op een vraag om het antwoord uit te klappen.',
    categories: {
      about: 'Over de tool',
      counting: 'Tellen & limieten',
      cleanup: 'Opschonen & toegankelijkheid',
      insights: 'Inzichten & analyse',
      privacy: 'Privacy & gegevens',
      sms: 'Sms',
    },
  },

  limitsPage: {
    title: 'Tekenlimieten van sociale media 2026 — Volledige tabel',
    description:
      'De complete tekenlimiettabel voor LinkedIn, X (Twitter), Threads, Instagram, Facebook en sms — harde limieten, truncatievouwen en de regels erachter.',
    eyebrow: 'Naslag',
    heading: 'Elke platformlimiet, in één tabel',
    lede: 'Harde limieten, vouwen voor zichtbare tekst en overloopgedrag voor elk platform dat PostTruncate previewt. De getallen hieronder zijn dezelfde constanten waar de live editor tegen controleert.',
    table: {
      caption: 'Tekenlimieten en truncatiepunten per platform',
      platform: 'Platform',
      limit: 'Harde limiet',
      foldMobile: 'Vouw (mobiel)',
      foldDesktop: 'Vouw (desktop)',
      notes: 'Opmerkingen',
    },
    noFold: 'Geen vouw',
    notes: {
      linkedin: 'Tekst voorbij de vouw verdwijnt achter “…meer”.',
      twitter: 'Geen vouw — boven {limit} tekens wordt gesplitst in een thread; elke link telt als {url} tekens.',
      threads: 'Links tellen volledig mee; tekst boven {limit} tekens gaat verder als genummerde reacties.',
      instagram: 'Het bijschrift vouwt achter “meer”; mik op ~{hashtags} hashtags (harde limiet {hashtagMax}).',
      facebook: 'Feedberichten klappen in achter “Meer weergeven”, ver vóór het technische plafond.',
      tiktok: 'Het bijschrift vouwt achter “…meer” in bij het eerste regeleinde of ~100 tekens; emoji en hashtags tellen mee.',
      smsGsm: '{single} tekens in één bericht; {multi} per segment zodra het splitst.',
      smsUnicode: 'Eén emoji of niet-GSM-teken schakelt het hele bericht naar Unicode.',
    },
    rulesHeading: 'Truncatieregels, platform voor platform',
    rules: {
      linkedin: 'LinkedIn staat {limit} tekens per bericht toe, maar vouwt de feedweergave na ongeveer {mobile} tekens op mobiel en {desktop} op desktop — de rest verdwijnt achter “…meer”. Regeleinden tellen mee, en de eerste zin draagt vrijwel alle doorkliks: zet de hook vooraan en links onder de vouw.',
      twitter: 'X hanteert een harde limiet van {limit} tekens per bericht en toont helemaal geen vouw. Elke URL wordt door de t.co-verkorter omhuld en kost altijd {url} tekens, ongeacht de echte lengte, en veel emoji wegen als twee tekens. Langere concepten moeten in een thread worden gesplitst — PostTruncate doet dat automatisch op woordgrenzen.',
      threads: 'Threads staat {limit} tekens per bericht toe en telt links — anders dan X — in hun volledige lengte. Op mobiel vouwt de feed lange berichten rond {mobile} tekens. Alles boven het plafond moet verdergaan als genummerde reactieberichten onder het eerste.',
      instagram: 'Instagram-bijschriften mogen {limit} tekens lang zijn, maar de feed toont slechts ongeveer de eerste {mobile} vóór de “meer”-link. Voor hashtags is ~{hashtags} het aanbevolen ideaal — meer wordt nog steeds geplaatst maar leest als spam. De harde limiet is {hashtagMax} (bijschrift plus eerste reactie); daarboven wordt het bericht niet geplaatst.',
      facebook: 'Het technische plafond van Facebook is {limit} tekens, maar feedberichten klappen in achter “Meer weergeven” rond {mobile} tekens op mobiel en {desktop} op desktop. Engagement keldert bij lange ononderbroken blokken — de praktische limiet is de vouw, niet het plafond.',
      sms: 'Eén sms bevat {gsmSingle} tekens in GSM 7-bit-codering, dalend naar {gsmMulti} per segment zodra het bericht splitst. Elke emoji of elk niet-GSM-teken schakelt het hele bericht naar Unicode — {uniSingle} tekens per enkel bericht, {uniMulti} per segment — en sommige GSM-symbolen (€, blokhaken, het pipe-teken) tellen als twee.',
      tiktok: 'TikTok staat {limit} tekens per bijschrift toe bij native plaatsen, maar de API en planners limiteren op {safe}; emoji en hashtags tellen volledig mee. Omdat de video het scherm vult, vouwt de feed het bijschrift achter “…meer” in bij het eerste regeleinde of ongeveer {fold} tekens — wat het eerst komt — dus de eerste regel is alles wat de meeste kijkers lezen. Het videoframe is fullscreen verticaal 9:16 (1080×1920).',
    },
  },

  footer: {
    homeAria: 'PostTruncate home',
    tag: 'Zie precies waar elk platform je tekst afkapt — voordat je plaatst.',
    columns: {
      tool: {
        title: 'Tool',
        links: [
          'Teksteditor',
          'Live previews',
          'Threadsplitter',
          'Unicode-opschoner',
          'Insluit-widget',
        ],
      },
      platforms: {
        title: 'Platforms',
        links: ['LinkedIn', 'X / Twitter', 'Threads', 'Instagram', 'Facebook'],
      },
      learn: {
        title: 'Leren',
        links: [
          'Tekenlimieten',
          'FAQ',
          'Hooks schrijven',
          'Toegankelijkheid',
        ],
      },
      legal: {
        title: 'Juridisch',
        links: ['Privacy', 'Voorwaarden', 'Over', 'Contact'],
      },
      guides: {
        title: 'Platformgidsen',
        links: [
          'X / Twitter',
          'Instagram',
          'LinkedIn',
          'Facebook',
          'Threads',
          'TikTok',
        ],
      },
    },
    copyright: '© {year} PostTruncate. Gebouwd voor creators overal.',
    disclaimer:
      'Niet gelieerd aan LinkedIn, X, Meta of Instagram. Limieten zijn schattingen en kunnen veranderen.',
  },

  pages: {
    common: {
      lastUpdated: 'Laatst bijgewerkt: {date}',
      lastUpdatedDate: '1 juni 2026',
      backHome: '← Terug naar de editor',
    },

    privacy: {
      title: 'Privacybeleid',
      description:
        'Hoe PostTruncate omgaat met je gegevens: je tekst verlaat nooit je browser, er zijn geen accounts en niets van wat je schrijft wordt geüpload of opgeslagen.',
      intro:
        'PostTruncate is privacy-first gebouwd. Alles wat je typt draait lokaal in je browser — je concept wordt nooit geüpload, opgeslagen of door ons gezien. Dit beleid legt precies uit wat dat betekent en de paar beperkte gevallen waarin derden betrokken zijn.',
      sections: [
        {
          heading: 'Je tekst blijft op je apparaat',
          paragraphs: [
            'De editor, elke platformpreview, de threadsplitter en de Unicode-opschoner draaien allemaal volledig in <strong>je browser</strong>. De tekst die je schrijft of plakt, wordt op je eigen apparaat verwerkt en wordt <strong>nooit naar onze servers verzonden</strong> — sterker nog, PostTruncate heeft geen inhoudsserver om het naartoe te sturen. Wanneer je het tabblad sluit, is je concept weg, tenzij je browser ervoor kiest het lokaal te bewaren.',
            'Omdat er niets wordt geüpload, kunnen we niet lezen, opslaan, verkopen of delen wat je schrijft. Er is <strong>geen account, geen aanmelding en geen login</strong>, dus we vragen nooit om je naam, e-mailadres of enig persoonlijk gegeven om de tool te gebruiken.',
          ],
        },
        {
          heading: 'Wat we lokaal opslaan',
          paragraphs: [
            'Een klein aantal voorkeuren wordt opgeslagen in de <strong>localStorage</strong> van je browser, zodat de site onthoudt hoe jij hem het liefst hebt — specifiek je gekozen thema (licht of donker) en je voorkeurstaal. Deze waarden leven alleen op je apparaat, zijn alleen leesbaar door PostTruncate en bereiken ons nooit. Je kunt ze op elk moment wissen via de instellingen van je browser.',
          ],
        },
        {
          heading: 'Advertenties',
          paragraphs: [
            'PostTruncate wordt ondersteund door onopvallende advertenties op vaste, gereserveerde plekken die de lay-out nooit verschuiven terwijl je werkt. Als er externe advertentiepartners worden gebruikt, kunnen zij hun eigen cookies plaatsen of apparaat-identificatoren gebruiken om relevante advertenties te tonen, onderworpen aan hun eigen privacybeleid. Deze partners ontvangen nooit de inhoud van je concept, omdat die inhoud nooit je browser verlaat.',
          ],
        },
        {
          heading: 'Het contactformulier',
          paragraphs: [
            'De enige functie die gegevens van je apparaat verstuurt, is het <strong>contactformulier</strong>. Wanneer je ervoor kiest ons een bericht te sturen, worden de naam, het e-mailadres en het bericht die je invult via een externe formulierverwerkingsdienst aan ons bezorgd, zodat we ze kunnen lezen en beantwoorden. We gebruiken die informatie uitsluitend om je te antwoorden en niet voor marketing. Wil je liever geen derde partij gebruiken, dan kun je ons ook rechtstreeks mailen.',
          ],
        },
        {
          heading: 'Wijzigingen & contact',
          paragraphs: [
            'We kunnen dit beleid bijwerken naarmate het product evolueert; de datum “laatst bijgewerkt” hierboven geeft altijd de huidige versie weer. Heb je vragen over privacy, mail ons dan op <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    terms: {
      title: 'Algemene voorwaarden',
      description:
        'De gebruiksvoorwaarden voor PostTruncate: een gratis tool die wordt geleverd zoals hij is, waarvan de platformlimieten schattingen zijn, zonder garantie en niet gelieerd aan welk sociaal netwerk dan ook.',
      intro:
        'Door PostTruncate te gebruiken ga je akkoord met deze voorwaarden. Ze zijn bewust kort en helder — de tool is gratis, draait in je browser en wordt geleverd zoals hij is.',
      sections: [
        {
          heading: 'Gebruik van de dienst',
          paragraphs: [
            'PostTruncate is een gratis tool om socialemediaberichten te previewen en te optimaliseren. Je mag het voor elk wettig doel gebruiken. Je gaat ermee akkoord <strong>de dienst niet te misbruiken</strong> — bijvoorbeeld door te proberen hem te verstoren, zijn beveiligingen te omzeilen of hem te gebruiken om de wet te overtreden of de rechten van iemand anders te schenden.',
          ],
        },
        {
          heading: 'Schattingen, geen garanties',
          paragraphs: [
            'De tekenlimieten, vouwpunten en opmaakregels die hier worden getoond, zijn gebaseerd op het gepubliceerde en algemeen waargenomen gedrag van elk platform. Platforms <strong>wijzigen deze limieten zonder kennisgeving</strong>, en de weergave verschilt per apparaat en app-versie. Beschouw elke preview en telling als een nauwkeurige schatting, niet als een pixelperfecte garantie. Je bent zelf verantwoordelijk voor het controleren van je eigen berichten voordat je ze publiceert.',
          ],
        },
        {
          heading: 'Geen affiliatie',
          paragraphs: [
            'PostTruncate is een onafhankelijke tool en is <strong>niet gelieerd aan, onderschreven door of gesponsord door</strong> LinkedIn, X (Twitter), Meta, Instagram, Facebook of Threads. Alle productnamen, logo’s en merken zijn eigendom van hun respectieve eigenaren en worden hier alleen gebruikt om het gedrag van elk platform te beschrijven.',
          ],
        },
        {
          heading: 'Geleverd “zoals het is”',
          paragraphs: [
            'De dienst wordt geleverd <strong>“zoals het is” en “zoals beschikbaar”, zonder enige vorm van garantie</strong>, expliciet of impliciet. Voor zover wettelijk toegestaan zijn wij niet aansprakelijk voor enig verlies of schade die voortvloeit uit je gebruik van — of het niet kunnen gebruiken van — de tool, inclusief beslissingen die je neemt op basis van de previews of tellingen.',
          ],
        },
        {
          heading: 'Wijzigingen in deze voorwaarden',
          paragraphs: [
            'We kunnen deze voorwaarden van tijd tot tijd herzien; de datum “laatst bijgewerkt” hierboven geeft de huidige versie weer, en voortgezet gebruik van de tool betekent dat je de meest recente voorwaarden accepteert. Vragen? Mail <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    about: {
      title: 'Over PostTruncate',
      description:
        'PostTruncate is een gratis, privacygerichte tool die makers precies laat zien waar elk sociaal platform hun tekst afkapt — voordat ze publiceren.',
      intro:
        'PostTruncate bestaat om één reden: de eerste regel van je bericht is de enige die de meeste mensen lezen, en elk platform kapt hem op een andere plek af. Wij maken die onzichtbare limieten zichtbaar.',
      sections: [
        {
          heading: 'Wat het doet',
          paragraphs: [
            'Schrijf of plak een concept één keer, en PostTruncate geeft het weer zoals <strong>LinkedIn, X, Threads, Instagram en Facebook</strong> dat daadwerkelijk doen — de \u201e\u2026meer weergeven\u201d-vouw, de threadsplitsing bij 280 tekens, de weging van 23 tekens per link, het aanbevolen niveau van ~5 hashtags en de harde limiet van 30. Je ziet precies wat boven de vouw overleeft voordat je je vastlegt op publiceren.',
            'Het signaleert ook de stille problemen die je bereik verkleinen: onzichtbare tekens met nulbreedte die tellingen en schermlezers verstoren, en pseudo-Unicode \u201esierlettertypen\u201d die opgemaakt lijken maar onleesbaar zijn voor hulptechnologie.',
          ],
        },
        {
          heading: 'Waarom ik het heb gebouwd',
          paragraphs: [
            'Ik ben Anirudha, een soloontwikkelaar uit India met een MCA van de Dibrugarh University in Assam. Net als de meeste mensen die regelmatig posten, was ik het zat om pas na het publiceren te ontdekken dat de helft van mijn LinkedIn-bericht verborgen zat achter \u201emeer weergeven\u201d, of dat een tweet waarvan ik dacht dat hij paste stilletjes was opgesplitst in een thread.',
            'De meeste tekentellers geven je één getal. Makers hebben meer nodig — ze moeten precies weten waar de tekst op elk netwerk wordt afgekapt, want daar leeft of sterft de hook. Dus bouwde ik één werkruimte die elk platform tegelijk simuleert, direct werkt en je privacy volledig respecteert.',
          ],
        },
        {
          heading: 'Hoe het accuraat blijft',
          paragraphs: [
            'Platformlimieten veranderen zonder veel aankondiging. Ik controleer ze aan de hand van hoe elk platform berichten daadwerkelijk weergeeft en werk de gidsen hier bij wanneer er iets verandert. Iets verouderds gevonden? De <a href="../contact/"><strong>contactpagina</strong></a> komt rechtstreeks bij mij terecht.',
          ],
        },
        {
          heading: 'Gebouwd met privacy voorop',
          paragraphs: [
            'Alles draait in je browser. Je tekst wordt nooit geüpload, er zijn geen accounts en de tool is gratis te gebruiken. Het wordt ondersteund door onopvallende advertenties in gereserveerde ruimtes die de lay-out nooit verschuiven. Lees alle details in ons <a href="../privacy/"><strong>Privacybeleid</strong></a>.',
          ],
        },
      ],
    },

    contact: {
      title: 'Neem contact op',
      description:
        'Neem contact op met het PostTruncate-team — stuur ons een bericht of mail ons rechtstreeks met feedback, bugmeldingen of vragen.',
      intro:
        'Een bug gevonden, een platformlimiet gespot die is verschoven of een idee om PostTruncate beter te maken? We horen graag van je.',
      form: {
        name: 'Je naam',
        email: 'Je e-mailadres',
        subject: 'Onderwerp',
        message: 'Bericht',
        submit: 'Bericht versturen',
        sending: 'Versturen…',
        success: 'Bedankt — je bericht is onderweg. We nemen snel contact met je op.',
        error:
          'Er is iets misgegaan bij het versturen van je bericht. Probeer het opnieuw of mail ons rechtstreeks.',
      },
      altHeading: 'Liever e-mail?',
      altBody:
        'Je kunt ons altijd bereiken op {email}. We lezen elk bericht en antwoorden zo snel als we kunnen.',
    },
  },

  embedWidget: {
    title: 'Gratis tekenteller-widget om in te sluiten — PostTruncate',
    description:
      'Voeg een gratis live tekenteller toe aan elke blog of website met één regel HTML. Houdt limieten bij voor X, LinkedIn, Threads, Instagram en SMS.',
    eyebrow: 'Gratis insluiting',
    heading: 'Sluit een live tekenteller in op je site',
    lede:
      'Plak één regel HTML om een realtime tekenteller toe te voegen aan elke pagina. Telt tekens en woorden, en houdt limieten bij voor X, LinkedIn, Threads, Instagram en SMS — zonder je site te verlaten.',
    previewLabel: 'Live preview',
    copyButton: 'Insluitcode kopiëren',
    copiedButton: 'Gekopieerd!',
    codeLabel: 'Insluitcode',
    audienceHeading: 'Voor wie is dit?',
    forBloggers:
      'Bloggers en contentmakers kunnen een live tekenteller direct op hun schrijfpagina plaatsen, zodat lezers platformlimieten kunnen controleren zonder van tabblad te wisselen.',
    forEducators:
      'Docenten en cursusauteurs kunnen de teller in een les insluiten, zodat studenten kunnen oefenen met schrijven binnen lengtebeperkingen.',
    forDevelopers:
      'Ontwikkelaars kunnen de widget met één <iframe> toevoegen aan elk CMS, elke documentatiepagina of intern tool — zonder API-sleutel, account of buildstap.',
    homepageLinkLabel: 'Insluiten op je site →',
  },

  errors: {
    notFound: {
      code: '404',
      title: 'Pagina niet gevonden',
      description:
        'De pagina die je zoekt bestaat niet. Ga terug naar de PostTruncate-editor.',
      heading: 'Deze pagina is afgekapt',
      body: 'De pagina die je zoekt bestaat niet, is verplaatst of heeft nooit bestaan. De editor staat nog precies waar je hem achterliet.',
      cta: 'Terug naar de editor',
    },
    serverError: {
      code: '500',
      title: 'Er ging iets mis',
      description:
        'Er is een onverwachte fout opgetreden. Ga terug naar de PostTruncate-editor en probeer het opnieuw.',
      heading: 'Er ging iets mis aan onze kant',
      body: 'Dat is een serverfout, niet die van jou. Probeer het zo opnieuw — de editor draait volledig in je browser, dus je tekst is hoe dan ook veilig.',
      cta: 'Terug naar de editor',
    },
  },


  banner: {
    text: 'Jouw {platform}-voorbeeld staat hieronder',
    close: 'Sluiten',
  },

  whyPostTruncate: {
    eyebrow: 'WAAROM POSTTRUNCATE?',
    title: 'Schrijf met vertrouwen.<br/>Plaats zonder zorgen.',
    p1: 'Elk platform heeft andere tekenlimieten en afkapregels. PostTruncate laat precies zien hoe je content eruitziet voordat je op publiceren klikt.',
    p2: 'Bespaar tijd, verhoog de betrokkenheid en laat elk teken tellen met realtime voorbeelden, slimme inzichten en AI-toonherschrijving met één klik.',
    features: {
      realTime: {
        title: 'Realtime voorbeelden',
        desc: 'Zie direct hoe je bericht er op meer dan 6 platforms uit zal zien.',
      },
      insights: {
        title: 'Slimme inzichten',
        desc: 'Krijg leesbaarheidsscores, trefwoordanalyses en tips voor contentoptimalisatie.',
      },
      privacy: {
        title: 'Privacy voorop',
        desc: 'Je content wordt nooit opgeslagen of gedeeld. Alles blijft privé.',
      },
      aiTone: {
        title: 'AI-toonherschrijver',
        desc: 'Herschrijf je bericht direct in een professionele, informele, vriendelijke of bondige toon met één klik — aangedreven door AI.',
      },
    },
  },

  howTruncationWorks: {
    eyebrow: 'HOE AFKAPPEN WERKT',
    description: 'Elk platform heeft unieke tekenlimieten en weergave regels. Wanneer uw inhoud deze limieten overschrijdt, wordt deze afgekapt met "..." of "Meer weergeven". PostTruncate simuleert precies hoe uw post zal verschijnen.',
    platforms: {
      linkedin: { name: 'LinkedIn', desc: 'Toont ~220 tekens vóór "...meer weergeven"' },
      twitter: { name: 'X (Twitter)', desc: 'Toont ~125 tekens vóór afkappen (varieert per apparaat)' },
      instagram: { name: 'Instagram', desc: 'Toont ~125 tekens, tik op "meer" om uit te vouwen' },
      facebook: { name: 'Facebook', desc: 'Toont ~160 tekens vóór "...meer weergeven"' },
      threads: { name: 'Threads', desc: 'Vergelijkbaar met Instagram met ~125 tekens vóór afkappen' },
      tiktok: { name: 'TikTok', desc: 'Vouwt in bij ~100 tekens of het eerste regeleinde' },
      sms: { name: 'SMS (GSM)', desc: '160 tekens per SMS voor GSM, 70 voor Unicode' },
    },
  },

  platformCharacterLimits: {
    eyebrow: "TEKENLIMIETEN PER PLATFORM",
    headers: {
      platform: "Platform",
      characterLimit: "Tekenlimiet",
      shownInFeed: "Getoond in feed",
      bestPractice: "Beste praktijken",
      notes: "Opmerkingen"
    },
    viewAll: "Bekijk alle platformlimieten",
    platforms: {
      linkedin: {
        name: "LinkedIn",
        limit: "3,000",
        shown: "~220 tekens",
        bestPractice: "Houd de kernboodschap vooraan",
        notes: "Artikelen ondersteunen tot 125.000 tekens"
      },
      twitter: {
        name: "X (Twitter)",
        limit: "280",
        shown: "~125 tekens",
        bestPractice: "Zet belangrijke info vooraan",
        notes: "Links verminderen het aantal beschikbare tekens"
      },
      instagram: {
        name: "Instagram-bijschrift",
        limit: "2,200",
        shown: "~125 tekens",
        bestPractice: "Trek vroeg de aandacht, voeg CTA toe",
        notes: "Hashtags tellen mee voor de limiet"
      },
      facebook: {
        name: "Facebook-bericht",
        limit: "63,206",
        shown: "~160 tekens",
        bestPractice: "Houd het beknopt",
        notes: "Afbeeldingen en links beïnvloeden de weergave"
      },
      threads: {
        name: "Threads",
        limit: "500",
        shown: "~125 tekens",
        bestPractice: "Kort en boeiend",
        notes: "Meta's op tekst gebaseerde platform"
      },
      tiktok: {
        name: "TikTok",
        limit: "4,000",
        shown: "~100 tekens",
        bestPractice: "Hook op de eerste regel",
        notes: "Emoji en hashtags tellen mee; vouwt in bij het eerste regeleinde"
      },
      sms: {
        name: "SMS (GSM)",
        limit: "160",
        shown: "160 per SMS",
        bestPractice: "Onder 160 houden",
        notes: "Langere teksten worden opgesplitst in meerdere sms'jes"
      }
    }
  },

  whoIsItFor: {
      eyebrow: "VOOR WIE IS HET?",
      title: "Perfect voor elke content creator",
      roles: {
          marketers: {
              title: "Marketeers",
              desc: "Optimaliseer campagnes, advertentieteksten en sociale posts voor maximaal bereik en betrokkenheid."
          },
          creators: {
              title: "Creators",
              desc: "Schrijf betere bijschriften en threads die meer likes, shares en saves krijgen."
          },
          agencies: {
              title: "Bureaus",
              desc: "Beheer meerdere klanten en zorg ervoor dat elke post perfect is geoptimaliseerd."
          },
          founders: {
              title: "Oprichters",
              desc: "Deel updates en bouw je merk op met duidelijke, impactvolle content."
          }
      }
  },

  ctaBanner: {
    title: 'Klaar om je content te optimaliseren?',
    body: 'Sluit je aan bij duizenden makers en marketeers die beter schrijven, slimmer posten en meer betrokkenheid krijgen.',
    cta: 'Gratis beginnen met schrijven',
    noCard: 'Geen creditcard nodig',
    free: 'Voor altijd gratis',
  },

  island: {
    adPreviews: {
      editorLabel: 'Stel je advertentie samen',
      fields: {
        headline: 'Kop',
        primary: 'Primaire tekst',
        description: 'Beschrijving',
        headlineN: 'Kop {n}',
      },
      placeholders: {
        headline: 'Je kop',
        primary: 'Schrijf je primaire tekst…',
        description: 'Voeg een korte beschrijving toe',
        cardHeadline: 'Je kaartkop',
        cardDescription: 'Voeg een korte beschrijving toe',
      },
      counter: '{n} / {limit}',
      over: '{n} te veel',
      previewLabel: 'Live voorbeeld',
      deviceAria: 'Kies voorbeeldapparaat',
      mobile: 'Mobiel',
      desktop: 'Desktop',
      modeAria: 'Kies plaatsing',
      feed: 'Feed',
      reels: 'Reels',
      formatAria: 'Kies advertentieformaat',
      formatFeed: 'Feed',
      formatReels: 'Reels',
      formatCarousel: 'Carrousel',
      carouselAddCard: 'Kaart toevoegen',
      carouselRemoveCard: 'Kaart verwijderen',
      carouselMaxReached: 'Maximum van {max} kaarten bereikt',
      carouselMinReached: 'Minimaal {min} kaarten vereist',
      carouselPrev: 'Vorige kaart',
      carouselNext: 'Volgende kaart',
      carouselPosition: '{current} / {total}',
      cardN: 'Kaart {n}',
      cardHeadline: 'Kaartkop',
      cardDescription: 'Kaartbeschrijving',
      safeZoneLabel: 'Veilige zones',
      safeZoneHint: 'Gearceerde banden tonen waar de interface je creatie bedekt. Houd belangrijke tekst er buiten.',
      safeZoneTag: 'Veilige zone',
      reelsTooShort: 'Streef naar {min}–{max} tekens zodat het bijschrift goed leesbaar is over de video.',
      media: {
        add: 'Media toevoegen',
        replace: 'Media vervangen',
        remove: 'Media verwijderen',
        hint: 'Alleen in je browser bekeken — nooit geüpload of opgeslagen.',
      },
      badgeFits: 'Past',
      badgeTruncated: 'Afgekapt',
      sponsored: 'Gesponsord',
      promoted: 'Gepromoot',
      googleAdLabel: 'Advertentie',
      finalUrl: 'Uiteindelijke URL',
      pathN: 'Pad {n}',
      displayLink: 'Weergavelink / Bestemmings-URL',
      callToAction: 'Call-to-action',
      adLabel: 'Advertentie',
      fbHeadlineSqueezed: 'Titel langer dan {limit} tekens op mobiel — de linkbeschrijving wordt verborgen.',
      googleHeadlinesDropped: {
        one: '{n} titel verwijderd — de gecombineerde breedte overschrijdt de advertentieruimte van {px} px op desktop.',
        other: '{n} titels verwijderd — de gecombineerde breedte overschrijdt de advertentieruimte van {px} px op desktop.',
      },
      cta: {
        'Shop Now': 'Nu shoppen',
        'Learn More': 'Meer informatie',
        'Sign Up': 'Aanmelden',
        'Download': 'Downloaden',
        'Book Now': 'Nu boeken',
        'Contact Us': 'Neem contact op',
        'Subscribe': 'Abonneren',
        'Get Offer': 'Aanbieding bekijken',
        'Apply Now': 'Nu solliciteren',
        'Send Message': 'Bericht sturen',
        'Order Now': 'Nu bestellen',
        'Watch Now': 'Nu kijken',
        'Apply': 'Solliciteren',
        'Register': 'Registreren',
        'Join': 'Deelnemen',
        'Attend': 'Bijwonen',
        'Request Demo': 'Demo aanvragen',
        'View Quote': 'Offerte bekijken',
      },
    },
    dashboard: {
      loadSample: 'Laad een voorbeeldbericht',
      tryExample: 'Probeer een voorbeeld:',
      sample:
        'Vorige week hebben we een piepkleine functie uitgebracht die ons percentage proef-naar-betaald stilletjes verdubbelde.\n\n' +
        'Geen nieuwe prijzen. Geen groeitruc. Gewoon één wijziging in de onboardingflow die één enkele beslissing van het eerste scherm haalde.\n\n' +
        'Hier is precies wat we hebben veranderd en de drie dingen die we hebben gemeten voordat we het voor iedereen uitrolden → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
      samples: {
        linkedin:
          'Vorige week hebben we een piepkleine functie uitgebracht die ons percentage proef-naar-betaald stilletjes verdubbelde.\n\n' +
          'Geen nieuwe prijzen. Geen groeitruc. Gewoon één wijziging in de onboardingflow die één enkele beslissing van het eerste scherm haalde.\n\n' +
          'Hier is precies wat we hebben veranderd en de drie dingen die we hebben gemeten voordat we het voor iedereen uitrolden → https://posttruncate.com/blog/onboarding\n\n' +
          '#saas #productled #growth #startups',
        twitter:
          'Vorige week hebben we één kleine onboardingwijziging uitgebracht en ons percentage proef-naar-betaald verdubbelde.\n\n' +
          'Geen nieuwe prijzen. Geen groeitruc. Gewoon één beslissing minder op het eerste scherm.\n\n' +
          'Het volledige verhaal → https://posttruncate.com/blog/onboarding\n\n' +
          '#buildinpublic #saas',
        instagram:
          'Eén kleine wijziging. Dubbel zoveel resultaat. 🚀\n\n' +
          'Vorige week haalden we één enkele beslissing uit onze onboardingflow — en zagen we ons percentage proef-naar-betaald verdubbelen. Geen nieuwe prijzen, geen trucjes. ✨\n\n' +
          'De volledige uitleg van wat we veranderden (en de 3 dingen die we maten) staat in onze bio. 👀\n\n' +
          '.\n.\n.\n' +
          '#saas #startup #productontwerp #onboarding #groei #buildinpublic #ondernemer #techstartup',
        facebook:
          'Een kort verhaal van vorige week 👇\n\n' +
          'We brachten een kleine wijziging uit aan onze onboarding — gewoon één enkele beslissing van het allereerste scherm gehaald — en ons percentage proef-naar-betaald verdubbelde. Geen nieuwe prijzen, geen ingewikkelde groeitruc.\n\n' +
          'We schreven precies op wat we veranderden en de drie dingen die we maten voor de uitrol. Lees het en laat ons weten wat je ervan vindt → https://posttruncate.com/blog/onboarding',
        threads:
          'oké dit is best wild — vorige week haalden we ÉÉN beslissing van het eerste scherm van onze onboarding en proef-naar-betaald verdubbelde letterlijk.\n\n' +
          'geen nieuwe prijzen. geen groeitruc. gewoon minder wrijving.\n\n' +
          'heeft iemand anders zulke grote resultaten gezien van zo’n kleine wijziging?',
        sms:
          'Hé! Even kort — die onboardingaanpassing van vorige week verdubbelde ons percentage proef-naar-betaald. We schreven op wat er veranderde + de 3 dingen die we maten: https://posttruncate.com/blog/onboarding',
        tiktok:
          'één kleine onboarding-aanpassing verdubbelde onze trial-naar-betaald-ratio 🤯\n\ngeen nieuwe prijzen, geen growth hack — we haalden gewoon één beslissing van het allereerste scherm. de volledige uitleg van wat we veranderden en de 3 dingen die we maten staan in onze bio 👀\n\n#saas #startup #buildinpublic #growthtips #producttok',
      },
    },
    workspace: {
      eyebrow: 'Werkruimte',
      title: 'Schrijf je bericht',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} verborgen teken', other: '{n} verborgen tekens' },
      placeholder: 'Begin je bericht te typen. Plak een concept, voeg een paar links en hashtags toe en zie de preview van elk platform rechts bijwerken…',
      placeholders: {
        linkedin: "Begin met het typen van je bericht. Plak een concept, voeg wat links en hashtags toe en zie hoe de live preview wordt bijgewerkt in LinkedIn aan de rechterkant...",
        facebook: "Begin met het typen van je bericht. Plak een concept, voeg wat links en hashtags toe en zie hoe de live preview wordt bijgewerkt in Facebook aan de rechterkant...",
        instagram: "Begin met het typen van je bericht. Plak een concept, voeg wat links en hashtags toe en zie hoe de live preview wordt bijgewerkt in Instagram aan de rechterkant...",
        twitter: "Begin met het typen van je bericht. Plak een concept, voeg wat links en hashtags toe en zie hoe de live preview wordt bijgewerkt in X (Twitter) aan de rechterkant...",
        threads: "Begin met het typen van je bericht. Plak een concept, voeg wat links en hashtags toe en zie hoe de live preview wordt bijgewerkt in Threads aan de rechterkant...",
        sms: "Begin met het typen van je bericht. Plak een concept, voeg wat links en hashtags toe en zie hoe de live preview wordt bijgewerkt in SMS aan de rechterkant...",
        tiktok: 'Begin je bijschrift te typen. Start met je hook, voeg een paar hashtags toe en zie je TikTok-voorbeeld rechts bijwerken over een 9:16-reel…',
      },
      counters: {
        characters: 'Tekens',
        words: 'Woorden',
        lines: 'Regels',
        paragraphs: 'Alinea’s',
      },
      timers: {
        reading: 'Lezen',
        speaking: 'Spreken',
        lessThan30Sec: '< 30 sec',
        minute: { one: 'min', other: 'min' },
        second: { one: 'sec', other: 'sec' },
      },
      formatterLabel: 'Opmaaktools',
      uppercase: 'HOOFDLETTERS',
      lowercase: 'kleine letters',
      titleCase: 'Titelstijl',
      sentenceCase: 'Zinsstijl',
      emojiStripper: 'Emoji’s wissen',
      hashtagExtractor: 'Hashtags halen',
      engineLabel: 'Optimalisatiemotor',
      clean: 'Overtollige spaties opschonen',
      sanitize: 'Tekst opschonen',
      clear: 'Editor wissen',
      paste: 'Tekst plakken',
      hiddenWarning:
        'Onzichtbare tekens gevonden die tellingen en schermlezers verstoren: {codes}. Schoon op om ze te verwijderen.',
      statusLine: 'Realtime analyse is actief',
    },
    imageUpload: {
      add: 'Media toevoegen',
      replace: 'Media vervangen',
      remove: 'Media verwijderen',
      hint: 'Alleen voorbeeld — wordt nooit geüpload of opgeslagen. Verdwijnt bij herladen.',
    },
    linkDisplay: {
      plainText: 'Links in de tekst zijn hier niet klikbaar — ze worden als platte tekst weergegeven.',
      previewCard: 'Deze link genereert een voorbeeldkaart.',
      previewCardFirstUrl: 'De eerste link wordt de voorbeeldkaart.',
      clickableInline: 'Deze link blijft klikbaar in de tekst.',
      countedShortened: 'Elke link telt als {weight} tekens.',
      bioLinkAllowance: 'Maximaal {n} klikbare links toegestaan in je bio.',
      adNoClickableLink:
        'In-feed advertentieteksten bevatten geen klikbare link — de CTA-knop verzorgt de klik.',
    },
    linkCard: {
      editorHeading: 'Linkvoorbeeldkaart',
      titleLabel: 'Kaarttitel',
      descriptionLabel: 'Kaartbeschrijving',
      titlePlaceholder: 'Voeg een titel toe voor je link',
      descriptionPlaceholder: 'Voeg een beschrijving toe voor je link',
      cardAria: 'Linkvoorbeeld: {title} — {domain}',
      imageAlt: 'Linkvoorbeeldafbeelding',
      firstUrlNote: 'De eerste link in je bericht wordt de voorbeeldkaart.',
      imageAdd: 'Demoafbeelding toevoegen',
      imageReplace: 'Demoafbeelding vervangen',
      imageRemove: 'Demoafbeelding verwijderen',
    },
    share: {
      button: 'Delen',
      success: 'Link gekopieerd naar klembord',
      error: 'Automatisch kopiëren mislukt — kopieer de onderstaande link',
      tooLarge: 'Deze inhoud is te lang om als link te delen',
      manualLabel: 'Kopieer deze link',
      mediaNote: 'Alleen je tekst wordt gedeeld — media worden niet meegenomen.',
    },
    aiImprove: {
      button: 'AI-verbetering',
      pickTone: 'Verbeteren met AI',
      pickToneSub: 'Kies een toon — AI herschrijft je bericht.',
      tones: {
        professional: 'Professioneel',
        casual: 'Informeel',
        marketing: 'Marketing',
        friendly: 'Vriendelijk',
        concise: 'Beknopt',
      },
      cancel: 'Annuleren',
      improving: 'Je bericht wordt verbeterd…',
      undo: 'Ongedaan maken',
      reverted: 'Oorspronkelijke tekst hersteld.',
      remaining: {
        one: '{n} van {max} AI-verbetering over',
        other: '{n} van {max} AI-verbeteringen over',
      },
      limitReached: 'Je hebt al je AI-verbeteringen gebruikt. Probeer het over {time} opnieuw.',
      errorGeneric: 'Kon de tekst niet verbeteren. Probeer het opnieuw.',
      errorEmpty: 'Schrijf eerst iets.',
      errorTooLong: 'Tekst is te lang voor AI-verbetering (max. {max} tekens).',
      errorUnavailable: 'AI-verbetering is tijdelijk niet beschikbaar.',
    },
    previewPanel: {
      title: 'Live platformvoorbeeld',
      tabAria: '{platform}-voorbeeld',
      compareAll: 'Alles vergelijken',
      showHidden: 'Verborgen tekst tonen',
    },
    insights: {
      title: 'Geavanceerde inzichten',
      sub: 'Schrijfanalyse, leesbaarheid, zoekwoorden en meer',
      subScoped: 'Leesbaarheid, Trefwoorddichtheid',
    },
    hookStrip: {
      heading: 'Zie hoe je post overal presteert',
      viewAll: 'Bekijk alle platformlimieten',
      limitLabel: '{n} limiet',
      perSms: '{n} per sms',
      survives: 'Hook blijft zichtbaar',
      cut: 'Hook afgekapt',
      risk: 'Hook in gevaar',
      smsNeeded: '{n} sms nodig',
      chars: '{n} tekens',
    },
    common: {
      displayName: 'Jouw naam',
      handle: 'jij',
      timestamp: '11 u',
      charsSuffix: '{n} tekens',
      actions: {
        like: 'Vind ik leuk',
        comment: 'Reageren',
        share: 'Delen',
        repost: 'Opnieuw plaatsen',
        send: 'Versturen',
      },
    },
    sms: {
      placeholder: 'Typ of plak hier je sms-bericht — je ziet de codering (GSM-7 of Unicode), het live tekenaantal en uit hoeveel segmenten het bestaat.',
      eyebrow: 'SMS',
      title: 'Wereldwijde tekenteller',
      characterCount: 'Aantal tekens',
      charactersLeft: 'Resterende tekens',
      parts: 'Berichten',
      encoding: 'Codering',
      encodingGsm: 'GSM 7-bit',
      encodingUnicode: 'Unicode',
      partsValue: '{n} berichten',
      gsmNote:
        'GSM 7-bit: 160 tekens voor één SMS, daarna 153 per samengevoegde SMS. Tekens uit de uitbreidingstabel zoals €, [, ], {, }, \\ and | tellen als 2.',
      unicodeNote:
        'Unicode UTF-16: 70 tekens voor één SMS, daarna 67 per samengevoegde SMS. Dit geldt zodra er een emoji of niet-GSM-schrift aanwezig is.',
    },
    linkedin: {
      title: 'Preview van de hookzone',
      viewAriaLabel: 'LinkedIn-vouwweergave',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobiel',
      badgeTruncated: 'Afgekapte feedtekst',
      badgeOverLimit: 'Boven berichtlimiet',
      badgeSafe: 'Veilige hookregel',
      beforeFold: '{total} / {limit} vóór de vouw',
      postLimit: '{total} / {limit} berichtlimiet',
      seeMore: '…meer weergeven',
      headline: 'Oprichter & CEO',
      connectionDegree: '3e',
      placeholder: 'De openingsregels van je bericht verschijnen hier…',
      overLimitNote:
        'LinkedIn-berichten zijn beperkt tot {limit} tekens. Kort met {excess} in voordat je publiceert.',
      truncatedNote:
        'Lezers zien in de feed alleen de eerste {limit} tekens. Zet je hook vooraan, vóór de vouw.',
      safeNote:
        'Je hele bericht past boven de {view}-vouw van LinkedIn — geen "…meer weergeven"-afkapping.',
    },
    twitter: {
      title: 'Threadsplitter',
      badgeIdle: 'Inactief',
      badgeThread: 'Thread van {n} tweets',
      badgeSingle: 'Enkele tweet',
      links: {
        one: '{n} link · geteld als {weight} per stuk',
        other: '{n} links · geteld als {weight} per stuk',
      },
      modeFree: 'Gratis · {limit}',
      modePremium: 'Premium · {limit}',
      badgePremium: 'Lange post',
      showMore: 'Meer weergeven',
      premiumHint: 'Premium staat tot {limit} tekens toe, maar de tijdlijn toont alleen de eerste 280 vóór een “Meer weergeven”-link.',
      weightedLength: 'Gewogen lengte',
      placeholder:
        'Je tweetpreview verschijnt hier. Ga voorbij {limit} tekens en hij splitst automatisch op in een thread.',
    },
    threads: {
      title: 'Preview van bericht & keten',
      badgeIdle: 'Inactief',
      badgeThread: 'Keten van {n} berichten',
      badgeSingle: 'Enkel bericht',
      links: {
        one: '{n} link · volledig geteld',
        other: '{n} links · volledig geteld',
      },
      charLength: 'Tekenlengte',
      placeholder:
        'Je Threads-preview verschijnt hier. Ga voorbij {limit} tekens en hij wordt aaneengeschakeld tot een genummerde berichtenreeks.',
    },
    tiktok: {
      title: 'TikTok-voorbeeld',
      badgeIdle: 'Begin met typen',
      badgeSingle: 'Past in één bijschrift',
      badgeOverSafe: 'Boven de veilige limiet',
      badgeOver: 'Boven de 4.000-limiet',
      apiCapHint: 'Wordt native geplaatst, maar de TikTok-API en planners (Buffer, Hootsuite, Later) limiteren het bijschrift op {safe} tekens.',
      links: { one: '{n} link', other: '{n} links' },
      charLength: 'Bijschriftlengte',
      seeMore: '…meer',
      mediaHint: 'Voeg een 9:16-video of -afbeelding toe',
      sound: 'origineel geluid · @{handle}',
      safeZones: 'Veilige zones',
      lineBreakHint: 'Een regeleinde activeert “…meer” eerder',
      placeholder: 'Je bijschriftvoorbeeld verschijnt hier (tot {limit} tekens).',
    },
    meta: {
      title: 'Opmaakmonitor',
      badgeNeedsFix: 'Heeft een fix nodig',
      badgeClean: 'Ziet er schoon uit',
      badgeCaptionOver: 'Bijschrift te lang',
      captionLimit: '{total} / {limit} bijschriftlimiet',
      captionOver:
        'Instagram-bijschriften zijn beperkt tot {limit} tekens. Kort met {excess} in voordat je publiceert.',
      hashtagLabel: 'Hashtagconcentratie',
      over: 'Over de harde limiet van Instagram van {limit} hashtags — het bijschrift kan niet worden geplaatst. Verwijder {excess}.',
      approaching:
        '{n} hashtags — boven de aanbevolen {recommended}. Wordt nog steeds geplaatst (harde limiet {max}), maar beperk voor meer bereik.',
      within: 'Binnen de aanbevolen {recommended} hashtags.',
      none: 'Nog geen hashtags gedetecteerd.',
      a11yLabel: 'Toegankelijkheid · fancy fonts',
      audiencePublic: 'Openbaar',
      likedBy: 'Leuk gevonden door {handle} en anderen',
      viewAllComments: 'Alle {n} reacties bekijken',
      commentsCount: '{n} reacties',
      sharesCount: '{n} keer gedeeld',
      repostsCount: '{n} reposts',
      repliesCount: '{n} reacties',
      likesCount: '{n} vind-ik-leuks',
      reelAudio: 'Originele audio',
      follow: 'Volgen',
      reelAudioUses: '{n} gebruikers',
      subscribe: 'Abonneren',
      fullscreen: 'Volledig scherm',
      flagged: '{n} gemarkeerd',
      flaggedNone: 'Geen',
      fancyDetected: {
        one: '{n} pseudo-Unicode-“font”-teken gedetecteerd (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Deze zien er opgemaakt uit, maar schermlezers slaan ze over of spellen ze — ze schaden bereik en toegankelijkheid.',
        other:
          '{n} pseudo-Unicode-“font”-tekens gedetecteerd (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Deze zien er opgemaakt uit, maar schermlezers slaan ze over of spellen ze — ze schaden bereik en toegankelijkheid.',
      },
      fancyClean:
        'Geen pseudo-font-tekens gedetecteerd. Je tekst leest schoon op hulptechnologie.',
      footnote:
        '{n} tekens · Facebook-vouw ≈ 480 · Instagram-bijschriftlimiet 2.200',
    },
    keywords: {
      eyebrow: 'Trefwoorden',
      title: 'Overgebruikmonitor',
      badgeIdle: 'Inactief',
      badgeStuffing: 'Keyword stuffing',
      badgeBalanced: 'In balans',
      colKeyword: 'Trefwoord',
      colUses: 'Gebruik',
      colDensity: 'Dichtheid',
      overused: 'Te vaak gebruikt',
      empty: 'Begin met typen om je meestgebruikte trefwoorden en hun dichtheid te zien.',
      stuffingNote:
        'Gemarkeerde trefwoorden overschrijden {threshold}% dichtheid — zoekmachines kunnen dit lezen als keyword stuffing. Varieer je woordkeuze.',
      footnote:
        '{total} woorden · trefwoorden boven {threshold}% dichtheid worden gemarkeerd',
    },
    seoPreview: {
      eyebrow: 'SEO-voorbeeld',
      title: 'Google SERP-simulator',
      badgeIdle: 'Inactief',
      badgeSafe: 'Goed',
      badgeWarn: 'Limiet overschreden',
      titleLabel: 'Paginatitel',
      titleCounter: '{n} / {limit}',
      pixelNote: '~{px}px · Google knipt af bij ~{max}px',
      titleOverChar:
        'Titel overschrijdt {limit} tekens — Google kan afkappen in zoekresultaten.',
      titleOverPixel:
        'Titel kan worden afgesneden in zoekresultaten (~{max}px renderinglimiet).',
      descLabel: 'Metabeschrijving',
      descCounter: '{n} / {limit}',
      descOverChar: 'Beschrijving overschrijdt {limit} tekens.',
      previewLabel: 'Google zoekvoorbeeld',
      titlePlaceholder: 'De titel van je pagina…',
      descPlaceholder: 'Een korte beschrijving van je pagina voor de zoekresultaten…',
    },
    readability: {
      eyebrow: 'Leesbaarheid',
      title: 'Flesch-leesbaarheidsindex',
      scoreLabel: 'Leesbaarheid',
      gradeLabel: 'Leesniveau',
      descriptors: {
        veryEasy: 'Zeer eenvoudig',
        easy: 'Eenvoudig',
        fairlyEasy: 'Vrij eenvoudig',
        standard: 'Standaard',
        fairlyDifficult: 'Vrij moeilijk',
        difficult: 'Moeilijk',
        veryDifficult: 'Zeer moeilijk',
      },
      tooltip:
        'De Flesch-leesbaarheidsindex beoordeelt tekst op een schaal van 0–100. Hoe hoger de score, hoe makkelijker te lezen. Tussen 60 en 70 is standaard proza.',
      notApplicable:
        'De Flesch-formule is ontworpen voor teksten in het Latijnse schrift en is niet van toepassing op deze taal. Gebruik de woordtelling als primaire maatstaf voor leesbaarheid.',
    },
    toolLinks: {
      linkedin: 'Meer over LinkedIn-tekenlimieten →',
      twitter: 'Meer over X / Twitter-tekenlimieten →',
      instagram: 'Meer over Instagram-tekenlimieten →',
      facebook: 'Meer over Facebook-tekenlimieten →',
      threads: 'Meer over Threads-tekenlimieten →',
      tiktok: 'Lees over TikTok-bijschriftlimieten →',
    },
    embed: {
      placeholder: 'Begin te typen om tekens te tellen…',
      charCount: 'Tekens',
      wordCount: 'Woorden',
      remaining: '{n} resterend',
      overLimit: '{n} te veel',
      platforms: {
        twitter: 'X / Twitter',
        linkedin: 'LinkedIn',
        threads: 'Threads',
        instagram: 'Instagram',
        sms: 'SMS',
      },
    },
    hook: {
      eyebrow: 'Zichtbaarheid van de hook',
      title: 'Controle boven de vouw',
      statusPass: 'Hook blijft zichtbaar',
      statusWarn: 'CTA onder de vouw',
      statusFail: 'Hook afgekapt',
      statusIdle: 'Nog geen tekst',
      reasonEmpty: 'Voeg tekst toe om te zien wat de vouw overleeft.',
      reasonFits: 'Je hele bericht past boven de vouw — er wordt niets verborgen.',
      reasonHookCut: 'Je openingshook wordt afgekapt door de “…meer”-vouw.',
      reasonCtaBelow: 'Je CTA valt onder de “…meer”-vouw.',
      reasonHookOnly: 'Je hook komt boven de vouw uit; geen CTA gevonden.',
      reasonHookAndCta: 'Je hook en CTA komen allebei boven de vouw uit.',
      xReasonFits: 'Je hele bericht past in één tweet.',
      xReasonHookCut: 'Je openingszin loopt over in een tweede tweet.',
      xReasonCtaBelow: 'Je CTA verschijnt in een draad-tweet.',
      xReasonHookOnly: 'Je hook past in de eerste tweet; geen CTA gedetecteerd.',
      xReasonHookAndCta: 'Je hook en CTA passen beide in de eerste tweet.',
      foldLabel: 'vouw',
      foldAria: 'Vouwlijn — tekst eronder is verborgen achter “…meer”.',
      summary: '{pass} van {total} platforms houden je hook zichtbaar',
    },
    calculators: {
      wordsPerPage: {
        eyebrow: 'Woorden naar pagina’s',
        title: 'Paginaschatter',
        badgeIdle: 'Tekst invoeren',
        badgeResult: 'Geschat',
        modeAria: 'Kies hoe je je tekst invoert',
        modeText: 'Tekst plakken',
        modeCount: 'Aantal woorden',
        placeholder: 'Plak of typ je tekst hier om de woorden te tellen…',
        wordsLabel: 'Aantal woorden',
        wordsPlaceholder: 'bijv. 1500',
        fontSizeLabel: 'Lettergrootte',
        spacingLabel: 'Regelafstand',
        spacingSingle: 'Enkel',
        spacingOneAndHalf: '1,5 regel',
        spacingDouble: 'Dubbel',
        pagesLabel: 'Pagina’s',
        wordsStatLabel: 'Woorden',
        perPageNote: '{n} woorden per pagina bij deze instelling',
        referenceHeading: 'Veelvoorkomende woordaantallen',
        refWordsCol: 'Woorden',
        refPagesCol: 'Pagina’s',
        fontLabel: 'Lettertype',
        pageFormatLabel: 'Paginaformaat',
        marginsLabel: 'Marges',
        marginTop: 'Boven',
        marginRight: 'Rechts',
        marginBottom: 'Onder',
        marginLeft: 'Links',
        unitsLabel: 'Eenheden',
        unitInch: 'inches',
        unitCm: 'cm',
        printButton: 'Afdrukken',
      },
      readingTime: {
        eyebrow: 'Lees- en spreektijd',
        title: 'Leestijd-calculator',
        badgeIdle: 'Tekst invoeren',
        badgeResult: 'Geschat',
        modeAria: 'Kies hoe je je tekst invoert',
        modeText: 'Tekst plakken',
        modeCount: 'Aantal woorden',
        placeholder: 'Plak of typ je tekst hier om de lees- en spreektijd te schatten…',
        wordsLabel: 'Aantal woorden',
        wordsPlaceholder: 'bijv. 1500',
        readingSpeedLabel: 'Leessnelheid',
        speakingSpeedLabel: 'Spreeksnelheid',
        speedSlow: 'Langzaam',
        speedAverage: 'Gemiddeld',
        speedFast: 'Snel',
        wpmShort: 'wpm',
        wordsStatLabel: 'Woorden',
        referenceHeading: 'Veelvoorkomende lengtes',
        refWordsCol: 'Woorden',
        refReadingCol: 'Lezen',
        refSpeakingCol: 'Spreken',
      },
      byteCounter: {
        eyebrow: 'Byte-teller',
        title: 'UTF-8-byte-calculator',
        badgeIdle: 'Tekst invoeren',
        badgeResult: 'Geteld',
        placeholder: 'Plak of typ tekst om de grootte in bytes te tellen…',
        utf8Label: 'UTF-8-bytes',
        utf16Label: 'UTF-16-bytes',
        utf32Label: 'UTF-32-bytes',
        charactersLabel: 'Tekens',
        codePointsLabel: 'Codepunten',
        note: 'UTF-8 gebruikt 1–4 bytes per teken: ASCII 1 byte, Latijn met accenten 2, de meeste CJK 3 en emoji 4.',
      },
      emojiDetector: {
        eyebrow: 'Emoji & verborgen tekens',
        title: 'Emoji-teller & detector van onzichtbare tekens',
        badgeIdle: 'Tekst invoeren',
        badgeClean: 'Schoon',
        badgeWarn: 'Verborgen gevonden',
        placeholder: 'Plak of typ tekst om emoji te tellen en onzichtbare tekens te detecteren…',
        emojiLabel: 'Emoji',
        charactersLabel: 'Tekens',
        hiddenLabel: 'Verborgen tekens',
        cleanNote: 'Geen onzichtbare of nulbreedte-tekens gevonden.',
        removeButton: 'Verborgen tekens verwijderen',
        removedNote: '{n} verborgen tekens verwijderd.',
        note: 'Onzichtbare tekens zoals nulbreedte-spaties kunnen kopiëren/plakken, zoeken en schermlezers verstoren. Gebruik Verwijderen om ze te strippen.',
      },
      platformCounter: {
        title: 'Tekenteller',
        badgeIdle: 'Tekst invoeren',
        badgeSafe: 'Binnen limiet',
        badgeOver: 'Boven limiet',
        placeholder: 'Typ of plak je tekst…',
        counter: '{n} / {limit}',
        remaining: 'nog {n}',
        over: '{n} te veel',
        fields: {
          title: 'Titel',
          description: 'Beschrijving',
          caption: 'Bijschrift',
          bio: 'Bio',
          post: 'Post',
          message: 'Bericht',
          status: 'Status',
          about: 'Over',
        },
      },
      sentenceCounter: {
        eyebrow: 'Zinnen & alinea’s',
        title: 'Zinnen- en alineateller',
        badgeIdle: 'Tekst invoeren',
        badgeResult: 'Geteld',
        placeholder: 'Plak of typ tekst om zinnen en alinea’s te tellen…',
        sentencesLabel: 'Zinnen',
        note: 'Het aantal zinnen is een schatting — afkortingen en decimalen kunnen het totaal licht verschuiven.',
      },
      clear: 'Wissen',
    },
  },
};
