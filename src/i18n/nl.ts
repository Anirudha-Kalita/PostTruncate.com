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
      'Gratis previewtool voor social media. Bekijk de “…meer weergeven”-vouw van LinkedIn, splits lange teksten automatisch op in nette X/Twitter-threads en spoor hashtagoverdaad of schermlezeronvriendelijke lettertypes op voordat je plaatst.',
    skipLink: 'Ga direct naar de editor',
  },

  nav: {
    brandAria: 'PostTruncate home',
    homeAria: 'PostTruncate home',
    links: { editor: 'Editor', guides: 'Platformgidsen', faq: 'FAQ', about: 'Over', contact: 'Contact' },
    cta: 'Open de editor',
    themeToDark: 'Schakel naar donker thema',
    themeToLight: 'Schakel naar licht thema',
    language: 'Taal',
    languageAria: 'Selecteer taal',
    menuAria: 'Navigatiemenu in-/uitschakelen',
  },

  hero: {
    eyebrow: 'Social-preview- en afkapsimulator',
    title: 'Zie precies waar elk platform je tekst afkapt.',
    lede: 'Schrijf één keer en zie je bericht weergegeven in de native previews van LinkedIn, X, Instagram en Facebook — vouwregels, threadsplitsingen, hashtaglimieten en toegankelijkheidswaarschuwingen, allemaal live terwijl je typt.',
    primary: 'Begin met schrijven',
    secondary: 'Bekijk de platformlimieten',
  },

  workspace: {
    title: 'Je live werkruimte',
    sub: 'Alles hieronder wordt direct bijgewerkt en blijft op je apparaat.',
  },

  seoCopy: {
    ariaLabel: 'Over PostTruncate',
    sections: [
      {
        heading: 'Complete online tekenteller & tekstlengtecontrole',
        paragraphs: [
          '<strong>PostTruncate</strong> is een gratis tekenteller die volledig in je browser werkt — geen uploads, geen account vereist. Plak of typ een tekst en je ziet direct het aantal tekens, woorden, leestijd en letterverdeling, alles live bijgewerkt.',
          'Het is handig voor iedereen die met tekstlimieten werkt: schrijvers die een kop inkorten, ontwikkelaars die een string controleren, of studenten die de lengte van een essay nagaan. Omdat alles lokaal verwerkt wordt, verlaat je tekst je apparaat op geen enkel moment.',
        ],
      },
      {
        heading: 'Geavanceerde SMS-tekenteller en segmentcalculator',
        paragraphs: [
          'SMS gebruikt twee coderingen en de meeste tools negeren dat onderscheid. PostTruncate herkent automatisch of je bericht <strong>GSM-7</strong> (160 tekens per sms) of <strong>Unicode</strong> (70 tekens) gebruikt — en de overstap kan plaatsvinden zodra je één emoji of speciaal teken typt.',
          'De tool markeert ook tekens uit de uitgebreide GSM-tabel — zoals het euroteken (€), vierkante haken of het pipe-symbool — die in GSM-7-modus blijven maar elk twee tekenplaatsen innemen in plaats van één. Dat verborgen verbruik zorgt regelmatig voor onverwachte segmentering.',
          'Als je tekst meerdere segmenten beslaat, laat de ingebouwde <strong>segmentcalculator</strong> precies zien hoeveel sms\'jes verstuurd worden, inclusief de UDH-overhead die de bruikbare ruimte per segment terugbrengt naar 153 tekens (GSM) of 67 (Unicode).',
        ],
      },
      {
        heading: '𝕏 (Twitter) tekenteller & automatische threadsplitser',
        paragraphs: [
          'X (Twitter) hanteert twee regels die mensen vaak verrassen: de limiet van 280 tekens, en het feit dat elk link — ongeacht de werkelijke lengte — voor precies 23 tekens meetelt. PostTruncate past beide regels toe, zodat de getoonde teller overeenkomt met wat X toont na het t.co-wrapper.',
          'Wanneer je concept te lang is, verdeelt de ingebouwde <strong>threadsplitser</strong> het automatisch in genummerde tweets op natuurlijke zinsgrenzen — nooit midden in een woord. Elke kaart toont het tekenantal en de positie, zodat je de volledige thread kunt nakijken voor je publiceert.',
        ],
      },
      {
        heading: 'Instagram & Facebook tekenteller inclusief spaties',
        paragraphs: [
          'Instagram staat tot 2.200 tekens toe in een bijschrift, maar toont slechts de eerste 125 of zo voordat de rest achter een link verdwijnt. PostTruncate geeft precies aan waar die grens valt, zodat de eerste zichtbare regel in de feed altijd de regel is die je wilt overbrengen.',
          'Het dashboard houdt ook het <strong>aantal hashtags</strong> realtime bij. Instagram plaatst berichten met meer dan 5 hashtags stilletjes niet, daarom verschijnt er een waarschuwing voor je die grens bereikt. Spaties worden altijd meegeteld, net als het platform zelf doet.',
        ],
      },
      {
        heading: 'Geavanceerd woorden tellen, symbolen en platformtekstanalyse',
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
        body: 'Instagram-bijschriften kunnen tot 2.200 tekens lang zijn, maar tonen slechts ongeveer de eerste 125 vóór een "meer"-link. De hardere regel zijn hashtags: meer dan 5 in één bijschrift of reactie en het bericht wordt stilletjes niet gepubliceerd. Tientallen tags met lage intentie op elkaar stapelen leest bovendien als spam. Houd je tags strak en relevant en let op de live meter zodat je nooit tegen de muur van 5 tags aanloopt.',
        facts: [
          ['Bijschriftlimiet', '2.200 tekens'],
          ['Harde hashtaglimiet', '5 tags'],
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
    },
  },

  hookband: {
    eyebrow: 'De hook schrijven',
    title: 'De eerste regel is de enige regel die de meeste mensen lezen.',
    body: 'In elke feed doet de tekst boven de vouw al het werk. Open met een resultaat, een spanning of een vraag — geen aanloopje. Verplaats links en hashtags onder de vouw, houd je opening onder het afkappunt van het platform en laat de preview bevestigen dat de hook het overleeft voordat je publiceert.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Vragen, beantwoord.',
    items: [
      {
        q: 'Hoe nauwkeurig zijn de tekenlimieten?',
        a: 'PostTruncate gebruikt de gepubliceerde en algemeen waargenomen limieten van elk platform — 280 voor X, 210/140 voor de LinkedIn-vouw, 5 hashtags voor Instagram en een vaste weging van 23 tekens voor links. Platforms passen deze af en toe aan en de weergave verschilt licht per apparaat, dus beschouw de previews als een nauwkeurige schatting in plaats van een pixelperfecte garantie.',
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
        a: 'Dit gebeurt vanwege een wijziging in de coderingstijl van je tekst. Standaard tekstberichten gebruiken GSM 7-bit codering, wat ruimte biedt voor precies 160 tekens per SMS-pakket. Zodra je echter één enkel niet-GSM-teken invoegt — zoals een emoji, een speciaal symbool of een regionaal schriftteken (zoals Assamees of Hindi) — forceert het volledige bericht onmiddellijk een overschakeling naar Unicode-codering. Wanneer een bericht overschakelt naar Unicode, daalt de maximale capaciteit per individueel SMS-pakket drastisch van 160 tekens naar slechts 70 tekens. Bovendien moet het systeem, als je tekst die drempel van 70 tekens overschrijdt, meerdelige samenvoegingsgegevens (User Data Headers) gebruiken, waardoor je pakketgrootte daalt naar 67 tekens per samengevoegd SMS-segment. Gebruik altijd een online SMS-tekenteller om je actieve coderingsmarkering te controleren voordat je een bulkcampagne uitvoert, om onverwachte verassingen op je telecomrekening te voorkomen!',
      },
      {
        q: 'Tellen speciale tekens en emoji als één teken in een SMS?',
        a: 'Nee. Terwijl een standaardletter of -cijfer als één teken telt, worden speciale symbolen en emoji heel anders behandeld door wereldwijde telecommunicatienetwerken. Speciale symbolen die behoren tot de standaard GSM-basis-uitbreidingstabel — zoals het euroteken (€), haakjes [ ], accolades { } en het pipe-symbool | — tellen in feite als 2 tekens elk, ook al houden ze je bericht in de efficiënte GSM 7-bit modus. Aan de andere kant zijn emoji zeer complexe datapakketten die niet passen in standaard 7-bit tekst. Het toevoegen van een emoji dwingt je bericht naar 16-bit Unicode, waardoor je totale berichtruimte per segment wordt gecomprimeerd van 160 tekens naar 70 tekens.',
      },
    ],
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
          'SMS',
          'Threads',
          'Google SERP-voorbeeld',
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
        'PostTruncate is een gratis, privacy-first tool die creators precies laat zien waar elk social platform hun tekst afkapt — voordat ze op plaatsen drukken.',
      intro:
        'PostTruncate bestaat om één reden: de eerste regel van je bericht is de enige regel die de meeste mensen lezen, en elk platform kapt die op een andere plek af. Wij maken die onzichtbare limieten zichtbaar.',
      sections: [
        {
          heading: 'Wat het doet',
          paragraphs: [
            'Schrijf of plak één keer een concept en PostTruncate geeft het weer zoals <strong>LinkedIn, X, Threads, Instagram en Facebook</strong> dat echt zullen doen — de “…meer weergeven”-vouw, de threadsplitsing bij 280 tekens, de linkweging van 23 tekens, het plafond van 5 hashtags. Je ziet precies wat boven de vouw overleeft voordat je besluit te publiceren.',
            'Het spoort ook de stille problemen op die je bereik verkleinen: onzichtbare nulbreedte-tekens die tellingen en schermlezers verstoren, en pseudo-Unicode-“fancy fonts” die er opgemaakt uitzien maar onleesbaar zijn voor hulptechnologie.',
          ],
        },
        {
          heading: 'Waarom we het hebben gebouwd',
          paragraphs: [
            'De meeste tekentellers geven je één getal. Creators hebben meer nodig — ze moeten weten <strong>waar</strong> de tekst op elk netwerk wordt afgekapt, want dat is waar de hook leeft of sterft. We wilden één werkruimte die elk platform tegelijk simuleert, direct werkt en je privacy volledig respecteert.',
          ],
        },
        {
          heading: 'Privacy-first gebouwd',
          paragraphs: [
            'Alles draait in je browser. Je tekst wordt nooit geüpload, er zijn geen accounts en de tool is gratis te gebruiken. Hij wordt ondersteund door onopvallende advertenties op gereserveerde plekken die de lay-out nooit verschuiven. Lees alle details in ons <strong>Privacybeleid</strong>.',
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

  island: {
    dashboard: {
      loadSample: 'Laad een voorbeeldbericht →',
      sample:
        'Vorige week hebben we een piepkleine functie uitgebracht die ons percentage proef-naar-betaald stilletjes verdubbelde.\n\n' +
        'Geen nieuwe prijzen. Geen groeitruc. Gewoon één wijziging in de onboardingflow die één enkele beslissing van het eerste scherm haalde.\n\n' +
        'Hier is precies wat we hebben veranderd en de drie dingen die we hebben gemeten voordat we het voor iedereen uitrolden → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
    },
    workspace: {
      eyebrow: 'Werkruimte',
      title: 'Schrijf je bericht',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} verborgen teken', other: '{n} verborgen tekens' },
      placeholder:
        'Begin je bericht te typen. Plak een concept, voeg een paar links en hashtags toe en zie de preview van elk platform rechts bijwerken…',
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
      hiddenWarning:
        'Onzichtbare tekens gevonden die tellingen en schermlezers verstoren: {codes}. Schoon op om ze te verwijderen.',
    },
    common: {
      profileName: 'Jouw naam',
      handle: '@jij',
      charsSuffix: '{n} tekens',
    },
    sms: {
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
      profileMeta: 'Oprichter · 1e · Zojuist',
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
        'Je nadert het plafond van 5 tags. Beperk je tot je tags met de hoogste intentie.',
      within: 'Ruim binnen de limiet van 5 hashtags van Instagram.',
      none: 'Nog geen hashtags gedetecteerd.',
      a11yLabel: 'Toegankelijkheid · fancy fonts',
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
  },
};
