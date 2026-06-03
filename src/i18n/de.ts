import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// German (de) — MACHINE-GENERATED TRANSLATION. Needs human review before
// launch. Mirrors the structure of en.ts exactly (enforced by the Translations
// type). Tokens like {n}, {limit}, {total}, {view}, {codes}, {weight},
// {excess}, {year} are preserved verbatim; brand names are left untranslated.
// ──────────────────────────────────────────────────────────────────────────

export const de: Translations = {
  seo: {
    title:
      'PostTruncate — Sieh genau, wo soziale Plattformen deinen Text abschneiden',
    description:
      'Kostenloses Vorschau-Tool für Social Media. Sieh die „…mehr anzeigen“-Falz von LinkedIn, teile lange Texte automatisch in saubere X/Twitter-Threads auf und erkenne Hashtag-Überladung oder Screenreader-feindliche Schriften, bevor du postest.',
    skipLink: 'Zum Editor springen',
  },

  nav: {
    brandAria: 'PostTruncate Startseite',
    homeAria: 'PostTruncate Startseite',
    links: { editor: 'Editor', guides: 'Plattform-Leitfäden', faq: 'FAQ' },
    cta: 'Editor öffnen',
    themeToDark: 'Zu dunklem Design wechseln',
    themeToLight: 'Zu hellem Design wechseln',
    language: 'Sprache',
    languageAria: 'Sprache auswählen',
    menuAria: 'Navigationsmenü umschalten',
  },

  hero: {
    eyebrow: 'Social-Vorschau & Abschneide-Simulator',
    title: 'Sieh genau, wo jede Plattform deinen Text abschneidet.',
    lede: 'Schreib einmal und beobachte, wie dein Beitrag in nativen Vorschauen von LinkedIn, X, Instagram und Facebook erscheint — Falz-Linien, Thread-Aufteilungen, Hashtag-Limits und Barrierefreiheits-Warnungen, alles live beim Tippen.',
    primary: 'Loslegen',
    secondary: 'Plattform-Limits ansehen',
  },

  workspace: {
    title: 'Dein Live-Arbeitsbereich',
    sub: 'Alles unten aktualisiert sich sofort und bleibt auf deinem Gerät.',
  },

  guides: {
    eyebrow: 'Plattform-Leitfäden',
    title: 'Kenne jedes Limit, bevor du postest.',
    lede: 'Eine schnelle Referenz für die Abschneidepunkte, harten Limits und Formatierungsfallen, die deine Reichweite in jedem Netzwerk klammheimlich deckeln.',
    items: {
      linkedin: {
        name: 'LinkedIn',
        tag: 'Die „…mehr anzeigen“-Falz',
        body: 'LinkedIn klappt Beiträge nach etwa 210 Zeichen am Desktop und 140 am Smartphone ein und versteckt alles Weitere hinter einem „…mehr anzeigen“-Link. Was über dieser Falz steht, ist dein gesamter Pitch im Feed — wenn dein Aufhänger dort nicht zündet, klappen die meisten Leute ihn nie auf. Stell die Spannung, das Ergebnis oder die Frage nach vorne und schieb Hashtags und Links unter die Falz.',
        facts: [
          ['Desktop-Falz', '~210 Zeichen'],
          ['Mobile-Falz', '~140 Zeichen'],
          ['Hartes Beitragslimit', '3.000 Zeichen'],
        ],
      },
      twitter: {
        name: 'X / Twitter',
        tag: 'Threads & Link-Gewichtung',
        body: 'X zählt einen einzelnen Beitrag gegen 280 Zeichen, doch jeder Link wird von t.co umschlossen und pauschal mit 23 Zeichen berechnet, egal wie lang die echte URL ist. Gehst du über 280, brauchst du einen Thread. Gute Threads trennen an Satzgrenzen, nie mitten im Wort, und nummerieren jeden Tweet, damit Lesende der Reihenfolge folgen können. PostTruncate teilt deinen Entwurf automatisch auf und versieht jede Karte mit ihrer Position.',
        facts: [
          ['Limit pro Tweet', '280 Zeichen'],
          ['Jeder Link zählt als', '23 Zeichen'],
          ['Thread-Tweets', 'Unbegrenzt'],
        ],
      },
      threads: {
        name: 'Threads',
        tag: 'Beitragsverkettung',
        body: 'Threads, die Text-App von Meta, gibt jedem Beitrag 500 Zeichen — fast doppelt so viel wie X — und zählt Links in voller Länge, statt sie zu kürzen. Gehst du über 500, muss der Rest als nummerierte Antworten angehängt werden. Der erste Beitrag trägt weiterhin den Feed, also stell den Aufhänger wie überall sonst nach vorne. PostTruncate misst nach voller Zeichenzahl und verkettet lange Texte zu einer sauberen, nummerierten Abfolge.',
        facts: [
          ['Limit pro Beitrag', '500 Zeichen'],
          ['Links gezählt', 'In voller Länge'],
          ['Überlauf', 'Verkettet als Antworten'],
        ],
      },
      instagram: {
        name: 'Instagram',
        tag: 'Hashtag-Obergrenze',
        body: 'Instagram-Bildunterschriften umfassen bis zu 2.200 Zeichen, zeigen aber nur etwa die ersten 125 vor einem „mehr“-Link. Die härtere Regel sind Hashtags: mehr als 30 in einer einzelnen Bildunterschrift oder einem Kommentar und der Beitrag lässt sich klammheimlich nicht veröffentlichen. Dutzende absichtsschwache Tags zu stapeln wirkt zudem wie Spam. Halte deine Tags knapp und relevant und behalte den Live-Zähler im Blick, damit du nie an die 30-Tag-Wand stößt.',
        facts: [
          ['Limit Bildunterschrift', '2.200 Zeichen'],
          ['Hartes Hashtag-Limit', '30 Tags'],
          ['Vorschau Bildunterschrift', '~125 Zeichen'],
        ],
      },
      facebook: {
        name: 'Facebook',
        tag: 'Feed-Abschneidung',
        body: 'Facebook schneidet Feed-Beiträge bei etwa 480 Zeichen mit einem „Mehr ansehen“-Link ab, und das Engagement fällt bei langen, ununterbrochenen Blöcken stark ab. Kürzere Beiträge mit einer klaren ersten Zeile schneiden durchweg besser ab. Dieselbe Barrierefreiheits-Regel gilt überall: pseudo-Unicode-„Fancy-Schriften“ sehen fett oder kursiv aus, werden von Screenreadern aber Zeichen für Zeichen vorgelesen — oder ganz übersprungen — und schrumpfen so still deine Reichweite.',
        facts: [
          ['Feed-Falz', '~480 Zeichen'],
          ['Beste Länge', 'Unter 80 Zeichen'],
          ['Fancy-Schriften', 'Stören Screenreader'],
        ],
      },
    },
  },

  hookband: {
    eyebrow: 'Den Aufhänger schreiben',
    title: 'Die erste Zeile ist für die meisten Leute die einzige Zeile.',
    body: 'In jedem Feed leistet der Text über der Falz die ganze Arbeit. Beginne mit einem Ergebnis, einer Spannung oder einer Frage — nicht mit einem Aufwärmen. Verschieb Links und Hashtags unter die Falz, halte deinen Einstieg unter dem Abschneidepunkt der Plattform und lass die Vorschau bestätigen, dass der Aufhänger überlebt, bevor du veröffentlichst.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Fragen, beantwortet.',
    items: [
      {
        q: 'Wie genau sind die Zeichenlimits?',
        a: 'PostTruncate verwendet die veröffentlichten und weithin beobachteten Limits jeder Plattform — 280 für X, 210/140 für die LinkedIn-Falz, 30 Hashtags für Instagram und ein pauschales Gewicht von 23 Zeichen für Links. Plattformen passen diese gelegentlich an, und die Darstellung variiert je nach Gerät leicht, also behandle die Vorschauen als nahe Schätzung statt als pixelgenaue Garantie.',
      },
      {
        q: 'Zählen Leerzeichen und Satzzeichen als Zeichen?',
        a: 'Ja. Jedes Leerzeichen, jeder Zeilenumbruch und jedes Satzzeichen zählt als ein Zeichen, und sowohl der Zähler von PostTruncate als auch die Plattform-Limits beziehen sie ein. Die einzige übliche Ausnahme sind Links auf X/Twitter, die auf pauschale 23 Zeichen zusammenfallen, egal wie viele Buchstaben, Symbole oder Schrägstriche die echte URL enthält.',
      },
      {
        q: 'Wie wirken sich Emojis auf die Zeichenzahl aus?',
        a: 'PostTruncate zählt nach Unicode-Codepoints, sodass ein einfaches Emoji wie 🙂 als ein einziges Zeichen zählt. Viele Emojis bestehen jedoch aus mehreren verbundenen Codepoints — Hautton-Varianten, Flaggen und kombinierte Glyphen wie 👨‍👩‍👧 — und diese registrieren sich als zwei oder mehr. Die meisten Plattformen, besonders X, gewichten Emojis zudem stärker als reine Buchstaben, sodass ein emoji-lastiger Entwurf etwas mehr von deinem Limit verbraucht, als die sichtbare Glyphenzahl vermuten lässt.',
      },
      {
        q: 'Was ist der Unterschied zwischen Zeichenzahl und Wortzahl?',
        a: 'Die Zeichenzahl ist die Summe aller einzelnen Zeichen — Buchstaben, Leerzeichen, Satzzeichen und Emojis inbegriffen — und sie ist es, woran die Plattform-Limits tatsächlich gemessen werden. Die Wortzahl ist die Anzahl der durch Leerraum getrennten Wörter, egal wie lang jedes einzelne ist. Ein voller 280-Zeichen-Tweet besteht vielleicht nur aus 40 Wörtern, also behalte die Zeichenzahl im Blick, um unter einem Limit zu bleiben, und nutze die Wortzahl als Maß für die Lesbarkeit.',
      },
      {
        q: 'Warum zählt mein Link auf X als 23 Zeichen?',
        a: 'X umschließt automatisch jede URL mit seinem t.co-Kürzungsdienst, der immer 23 Zeichen belegt, unabhängig davon, wie lang oder kurz der ursprüngliche Link ist. Ein 5-Zeichen-Link und ein 200-Zeichen-Link kosten dich also beide genau 23 von den 280 erlaubten. PostTruncate bildet das im gewichteten Zähler ab.',
      },
      {
        q: 'Was sind „Fancy-Schriften“ und warum werden sie markiert?',
        a: 'Diese fetten, kursiven oder schreibschriftartigen Buchstaben, die du aus Schriftgeneratoren einfügst, sind keine echte Formatierung — sie sind pseudo-Unicode-Zeichen aus dem Block „Mathematical Alphanumeric Symbols“. Sie sehen gestaltet aus, doch Screenreader buchstabieren sie entweder Buchstabe für Buchstabe oder überspringen sie, was sowohl der Barrierefreiheit als auch deiner organischen Reichweite schadet. Der Monitor markiert sie, damit du zu reinem Text zurückwechseln kannst.',
      },
      {
        q: 'Was entfernt „Text bereinigen“?',
        a: 'Es entfernt unsichtbare und nullbreite Zeichen — nullbreite Leerzeichen, Byte-Order-Marks, bidirektionale Steuerzeichen, weiche Trennstriche und verirrte Steuercodes. Diese schleichen sich oft ein, wenn du aus anderen Apps kopierst, und sie stören Zeichenzählungen und die Barrierefreiheit auf älteren mobilen Clients klammheimlich, ohne je sichtbar zu sein.',
      },
      {
        q: 'Wird mein Text irgendwohin gesendet?',
        a: 'Nein. Der gesamte Editor und jede Vorschau laufen lokal in deinem Browser. Dein Entwurf verlässt nie dein Gerät — es gibt kein Konto, keinen Upload und keine serverseitige Verarbeitung deiner Inhalte.',
      },
      {
        q: 'Ist PostTruncate kostenlos?',
        a: 'Ja, die Nutzung ist völlig kostenlos und ohne Anmeldung. Das Tool wird durch unaufdringliche Werbung in reservierten Bereichen finanziert, die das Layout nie verschiebt, während du arbeitest.',
      },
    ],
  },

  footer: {
    homeAria: 'PostTruncate Startseite',
    tag: 'Sieh genau, wo jede Plattform deinen Text abschneidet — bevor du postest.',
    columns: {
      tool: {
        title: 'Tool',
        links: [
          'Texteditor',
          'Live-Vorschauen',
          'Thread-Splitter',
          'Unicode-Bereinigung',
        ],
      },
      platforms: {
        title: 'Plattformen',
        links: ['LinkedIn', 'X / Twitter', 'Threads', 'Instagram', 'Facebook'],
      },
      learn: {
        title: 'Lernen',
        links: [
          'Zeichenlimits',
          'FAQ',
          'Aufhänger schreiben',
          'Barrierefreiheit',
        ],
      },
      legal: {
        title: 'Rechtliches',
        links: ['Datenschutz', 'AGB', 'Kontakt'],
      },
    },
    copyright: '© {year} PostTruncate. Gebaut für Creator überall.',
    disclaimer:
      'Nicht verbunden mit LinkedIn, X, Meta oder Instagram. Limits sind Schätzungen und können sich ändern.',
  },

  island: {
    dashboard: {
      loadSample: 'Beispielbeitrag laden →',
      sample:
        'Letzte Woche haben wir eine winzige Funktion veröffentlicht, die unsere Testversion-zu-Zahlung-Rate still und leise verdoppelt hat.\n\n' +
        'Keine neuen Preise. Kein Wachstums-Hack. Nur eine Änderung am Onboarding-Ablauf, die eine einzige Entscheidung vom ersten Bildschirm entfernt hat.\n\n' +
        'Hier ist genau, was wir geändert haben, und die drei Dinge, die wir gemessen haben, bevor wir es für alle ausgerollt haben → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
    },
    workspace: {
      eyebrow: 'Arbeitsbereich',
      title: 'Schreib deinen Beitrag',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} verstecktes Zeichen', other: '{n} versteckte Zeichen' },
      placeholder:
        'Fang an, deinen Beitrag zu tippen. Füge einen Entwurf ein, wirf ein paar Links und Hashtags hinein und beobachte, wie sich die Vorschau jeder Plattform rechts aktualisiert…',
      counters: {
        characters: 'Zeichen',
        words: 'Wörter',
        lines: 'Zeilen',
        paragraphs: 'Absätze',
      },
      engineLabel: 'Optimierungs-Engine',
      clean: 'Überflüssige Leerräume entfernen',
      sanitize: 'Text bereinigen',
      clear: 'Editor leeren',
      hiddenWarning:
        'Unsichtbare Zeichen gefunden, die Zählungen und Screenreader stören: {codes}. Bereinige, um sie zu entfernen.',
    },
    common: {
      profileName: 'Dein Name',
      handle: '@du',
      charsSuffix: '{n} Zeichen',
    },
    linkedin: {
      title: 'Vorschau der Aufhänger-Zone',
      viewAriaLabel: 'LinkedIn-Falz-Ansicht',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobil',
      badgeTruncated: 'Abgeschnittener Feed-Text',
      badgeSafe: 'Sichere Aufhänger-Zeile',
      beforeFold: '{total} / {limit} vor der Falz',
      seeMore: '…mehr anzeigen',
      profileMeta: 'Gründer · 1. Grades · Gerade eben',
      placeholder: 'Die einleitenden Zeilen deines Beitrags erscheinen hier…',
      truncatedNote:
        'Lesende sehen im Feed nur die ersten {limit} Zeichen. Stell deinen Aufhänger vor die Falz.',
      safeNote:
        'Dein ganzer Beitrag passt über die {view}-Falz von LinkedIn — keine „…mehr anzeigen“-Abschneidung.',
    },
    twitter: {
      title: 'Thread-Splitter',
      badgeIdle: 'Inaktiv',
      badgeThread: 'Thread mit {n} Tweets',
      badgeSingle: 'Einzelner Tweet',
      links: {
        one: '{n} Link · gezählt als je {weight}',
        other: '{n} Links · gezählt als je {weight}',
      },
      weightedLength: 'Gewichtete Länge',
      placeholder:
        'Deine Tweet-Vorschau erscheint hier. Geh über {limit} Zeichen und sie teilt sich automatisch in einen Thread auf.',
    },
    threads: {
      title: 'Vorschau für Beitrag & Kette',
      badgeIdle: 'Inaktiv',
      badgeThread: 'Kette mit {n} Beiträgen',
      badgeSingle: 'Einzelner Beitrag',
      links: {
        one: '{n} Link · in voller Länge gezählt',
        other: '{n} Links · in voller Länge gezählt',
      },
      charLength: 'Zeichenlänge',
      placeholder:
        'Deine Threads-Vorschau erscheint hier. Geh über {limit} Zeichen und sie verkettet sich zu einer nummerierten Beitragsfolge.',
    },
    meta: {
      title: 'Formatierungs-Monitor',
      badgeNeedsFix: 'Braucht eine Korrektur',
      badgeClean: 'Sieht sauber aus',
      hashtagLabel: 'Hashtag-Konzentration',
      over: 'Über dem harten Limit von Instagram von {limit} Hashtags — die Bildunterschrift lässt sich nicht posten. Entferne {excess}.',
      approaching:
        'Du näherst dich der 30-Tag-Obergrenze. Reduziere auf deine absichtsstärksten Tags.',
      within: 'Bequem innerhalb des 30-Hashtag-Limits von Instagram.',
      none: 'Noch keine Hashtags erkannt.',
      a11yLabel: 'Barrierefreiheit · Fancy-Schriften',
      flagged: '{n} markiert',
      flaggedNone: 'Keine',
      fancyDetected: {
        one: '{n} pseudo-Unicode-„Schrift“-Zeichen erkannt (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Diese sehen gestaltet aus, doch Screenreader überspringen oder buchstabieren sie — sie schaden Reichweite und Barrierefreiheit.',
        other:
          '{n} pseudo-Unicode-„Schrift“-Zeichen erkannt (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Diese sehen gestaltet aus, doch Screenreader überspringen oder buchstabieren sie — sie schaden Reichweite und Barrierefreiheit.',
      },
      fancyClean:
        'Keine Pseudo-Schrift-Zeichen erkannt. Dein Text liest sich sauber auf assistiver Technik.',
      footnote:
        '{n} Zeichen · Facebook-Falz ≈ 480 · Instagram-Bildunterschrift-Limit 2.200',
    },
  },
};
