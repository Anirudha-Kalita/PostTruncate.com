import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// Nederlands (nl) — machinaal gegenereerde vertaling. Deze tekst is nog niet
// door een mens nagekeken en heeft een redactionele controle nodig vóór de
// lancering. Mirrors en.ts exactly in structure (enforced by Translations).
// ──────────────────────────────────────────────────────────────────────────

export const nl: Translations = {
  seo: {
    title:
      'PostTruncate — Zie precies waar socialemediaplatforms je tekst afkappen',
    description:
      'Gratis previewtool voor social media. Bekijk de “…meer weergeven”-vouw van LinkedIn, splits lange teksten automatisch op in nette X/Twitter-threads en spoor hashtagoverdaad of schermlezeronvriendelijke lettertypes op voordat je plaatst.',
    skipLink: 'Ga direct naar de editor',
  },

  nav: {
    brandAria: 'PostTruncate home',
    homeAria: 'PostTruncate home',
    links: { editor: 'Editor', guides: 'Platformgidsen', faq: 'FAQ' },
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
        body: 'Instagram-bijschriften kunnen tot 2.200 tekens lang zijn, maar tonen slechts ongeveer de eerste 125 vóór een "meer"-link. De hardere regel zijn hashtags: meer dan 30 in één bijschrift of reactie en het bericht wordt stilletjes niet gepubliceerd. Tientallen tags met lage intentie op elkaar stapelen leest bovendien als spam. Houd je tags strak en relevant en let op de live meter zodat je nooit tegen de muur van 30 tags aanloopt.',
        facts: [
          ['Bijschriftlimiet', '2.200 tekens'],
          ['Harde hashtaglimiet', '30 tags'],
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
        a: 'PostTruncate gebruikt de gepubliceerde en algemeen waargenomen limieten van elk platform — 280 voor X, 210/140 voor de LinkedIn-vouw, 30 hashtags voor Instagram en een vaste weging van 23 tekens voor links. Platforms passen deze af en toe aan en de weergave verschilt licht per apparaat, dus beschouw de previews als een nauwkeurige schatting in plaats van een pixelperfecte garantie.',
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
        q: 'Wordt mijn tekst ergens naartoe verstuurd?',
        a: 'Nee. De volledige editor en elke preview draaien lokaal in je browser. Je concept verlaat nooit je apparaat — er is geen account, geen upload en geen serververwerking van je inhoud.',
      },
      {
        q: 'Is PostTruncate gratis?',
        a: 'Ja, het is volledig gratis te gebruiken en er is geen aanmelding vereist. De tool wordt ondersteund door onopvallende advertenties op gereserveerde plekken die de lay-out nooit verschuiven terwijl je werkt.',
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
        links: ['Privacy', 'Voorwaarden', 'Contact'],
      },
    },
    copyright: '© {year} PostTruncate. Gebouwd voor creators overal.',
    disclaimer:
      'Niet gelieerd aan LinkedIn, X, Meta of Instagram. Limieten zijn schattingen en kunnen veranderen.',
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
    linkedin: {
      title: 'Preview van de hookzone',
      viewAriaLabel: 'LinkedIn-vouwweergave',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobiel',
      badgeTruncated: 'Afgekapte feedtekst',
      badgeSafe: 'Veilige hookregel',
      beforeFold: '{total} / {limit} vóór de vouw',
      seeMore: '…meer weergeven',
      profileMeta: 'Oprichter · 1e · Zojuist',
      placeholder: 'De openingsregels van je bericht verschijnen hier…',
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
      hashtagLabel: 'Hashtagconcentratie',
      over: 'Over de harde limiet van Instagram van {limit} hashtags — het bijschrift kan niet worden geplaatst. Verwijder {excess}.',
      approaching:
        'Je nadert het plafond van 30 tags. Beperk je tot je tags met de hoogste intentie.',
      within: 'Ruim binnen de limiet van 30 hashtags van Instagram.',
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
  },
};
