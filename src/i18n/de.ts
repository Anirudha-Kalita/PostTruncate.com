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
      'Zeichenzähler — Kostenloser Online-Zeichen- und Wortzähler | PostTruncate',
    description:
      'Kostenloses Social-Media-Vorschau-Tool. LinkedIn-Fold, X/Twitter-Threads, Hashtag-Limits und Barrierefreiheitsprobleme erkennen — direkt im Browser.',
    skipLink: 'Zum Editor springen',
  },

  nav: {
    brandAria: 'PostTruncate Startseite',
    homeAria: 'PostTruncate Startseite',
    links: { editor: 'Editor', guides: 'Plattform-Leitfäden', faq: 'FAQ', about: 'Über uns', contact: 'Kontakt' },
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

  howItWorks: {
    heading: 'So funktioniert es',
    steps: [
      {
        name: 'Text einfügen oder eingeben',
        text: 'Füge deinen Entwurf in den Editor ein und die Zeichenanzahl aktualisiert sich sofort beim Tippen.',
      },
      {
        name: 'Alle Plattformen werden gleichzeitig angezeigt',
        text: 'LinkedIn, X, Threads, Instagram, Facebook und SMS – alle Vorschaukarten aktualisieren sich gleichzeitig, ohne dass eine Auswahl nötig ist.',
      },
      {
        name: 'Sieh genau, wo der Text abgeschnitten wird',
        text: 'Die Vorschau markiert den Kürzungspunkt, damit du genau weißt, was die Leser sehen werden.',
      },
    ],
  },

  toolPage: {
    onThisPage: 'Auf dieser Seite',
    lastUpdated: 'Zuletzt aktualisiert: {date}',
    crossPromo: {
      heading: 'Andere Plattformen prüfen?',
      text: 'PostTruncate ist nicht nur für {platform}. Der vollständige Editor auf der Startseite zeigt deinen Beitrag gleichzeitig für LinkedIn, X, Instagram, Facebook, Threads und SMS in der Vorschau — so erkennst du Fold, Limit und Codierungsfallen jeder Plattform in einem Durchgang. Einmal schreiben, überall prüfen.',
      cta: 'Vollständigen Editor öffnen',
    },
  },

  images: {
    logoAlt: 'PostTruncate-Logo',
    platformLogo: '{platform}-Logo',
  },

  breadcrumbs: {
    home: 'Startseite',
  },

  workspace: {
    title: 'Dein Live-Arbeitsbereich',
    sub: 'Alles unten aktualisiert sich sofort und bleibt auf deinem Gerät.',
  },

  seoCopy: {
    ariaLabel: 'Über PostTruncate',
    sections: [
      {
        heading: 'Ein Zeichenzähler für soziale Medien',
        paragraphs: [
          '<strong>PostTruncate</strong> ist ein kostenloser, browserbasierter Zeichenzähler, der vollständig auf deinem Gerät läuft — ohne Datei-Upload, ohne Konto. Schreib oder füge beliebigen Text ein, und du siehst sofort Zeichenanzahl, Wortzahl, Lesezeit und Buchstabenverteilung — alles in Echtzeit.',
          'Das Tool richtet sich an alle, die mit Textlängen-Limits arbeiten: Texter, die eine Überschrift kürzen, Entwickler, die einen String prüfen, oder Studierende, die den Umfang einer Hausarbeit kontrollieren. Da alles lokal im Browser verarbeitet wird, verlässt dein Text zu keinem Zeitpunkt dein Gerät.',
        ],
      },
      {
        heading: 'SMS-Kodierung und Segmentberechnung',
        paragraphs: [
          'SMS kennt zwei Kodierungsmodi, und die meisten Tools ignorieren den Unterschied. PostTruncate erkennt automatisch, ob deine Nachricht <strong>GSM-7</strong> (160 Zeichen pro SMS) oder <strong>Unicode</strong> (70 Zeichen) verwendet — ein einziges Emoji reicht, um den Modus zu wechseln.',
          'Dazu werden Sonderzeichen der erweiterten GSM-Tabelle — etwa das Euro-Zeichen (€), eckige Klammern oder das Pipe-Symbol — markiert, die zwar im GSM-7-Modus bleiben, aber je zwei Zeichenplätze belegen. Genau dieser versteckte Verbrauch sorgt dafür, dass Nachrichten unerwartet aufgeteilt werden.',
          'Überschreitet dein Text mehrere Segmente, zeigt der integrierte <strong>Segment-Rechner</strong> exakt an, wie viele SMS versendet werden — unter Berücksichtigung des UDH-Overheads, der das Limit pro Segment auf 153 Zeichen (GSM) bzw. 67 Zeichen (Unicode) reduziert.',
        ],
      },
      {
        heading: 'X (Twitter): Zeichenlimits und Thread-Splitter',
        paragraphs: [
          'Bei X (Twitter) gibt es zwei Regeln, die oft überraschen: das 280-Zeichen-Limit und die Tatsache, dass jeder Link — unabhängig von seiner echten Länge — genau 23 Zeichen zählt. PostTruncate berücksichtigt beides, sodass der angezeigte Zähler exakt dem entspricht, was X nach der t.co-Verkürzung anzeigt.',
          'Ist der Entwurf zu lang, teilt der integrierte <strong>Thread-Splitter</strong> den Text an natürlichen Satzgrenzen in nummerierte Tweets auf — niemals mitten in einem Wort. Jede Karte zeigt Zeichenanzahl und Position, damit du den vollständigen Thread vor dem Veröffentlichen prüfen kannst.',
        ],
      },
      {
        heading: 'Zeichenlimits bei Instagram und Facebook',
        paragraphs: [
          'Instagram erlaubt bis zu 2.200 Zeichen in einer Bildunterschrift, zeigt aber nur die ersten rund 125 an, bevor der Rest hinter einem „Mehr"-Link verschwindet. PostTruncate zeigt genau, wo dieser Schnitt liegt — damit die erste sichtbare Zeile im Feed immer die ist, die du vermitteln willst.',
          'Das Dashboard überwacht außerdem die <strong>Hashtag-Anzahl</strong> in Echtzeit. Instagram veröffentlicht Beiträge mit mehr als 5 Hashtags stillschweigend nicht, daher erscheint rechtzeitig eine Warnung, bevor du dieses Limit erreichst. Leerzeichen werden immer mitgezählt — genau wie auf der Plattform selbst.',
        ],
      },
      {
        heading: 'Wörter, Lesbarkeit und plattformübergreifende Analyse',
        paragraphs: [
          'Über Plattform-Limits hinaus zählt PostTruncate auch Wörter, Sätze, Absätze und Symbole — alles live beim Tippen. Das ist nützlich für SEO-Meta-Beschreibungen, Dokumentations-Reviews oder jeden Schreibworkflow, bei dem mehr als eine reine Zeichenzahl gefragt ist.',
          'Das Dashboard verarbeitet mehrsprachige Texte korrekt, einschließlich CJK-Schriftsystemen, bei denen die Zeichenanzahl eine andere semantische Bedeutung hat. Egal ob du auf Deutsch, Englisch, Japanisch oder Chinesisch schreibst — die Zählwerte spiegeln das wider, was die Zielplattform tatsächlich sieht.',
        ],
      },
    ],
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
        body: 'Instagram-Bildunterschriften umfassen bis zu 2.200 Zeichen, zeigen aber nur etwa die ersten 125 vor einem „mehr“-Link. Die härtere Regel sind Hashtags: mehr als 5 in einer einzelnen Bildunterschrift oder einem Kommentar und der Beitrag lässt sich klammheimlich nicht veröffentlichen. Dutzende absichtsschwache Tags zu stapeln wirkt zudem wie Spam. Halte deine Tags knapp und relevant und behalte den Live-Zähler im Blick, damit du nie an die 5-Tag-Wand stößt.',
        facts: [
          ['Limit Bildunterschrift', '2.200 Zeichen'],
          ['Hartes Hashtag-Limit', '5 Tags'],
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
        a: 'PostTruncate verwendet die veröffentlichten und weithin beobachteten Limits jeder Plattform — 280 für X, 210/140 für die LinkedIn-Falz, 5 Hashtags für Instagram und ein pauschales Gewicht von 23 Zeichen für Links. Plattformen passen diese gelegentlich an, und die Darstellung variiert je nach Gerät leicht, also behandle die Vorschauen als nahe Schätzung statt als pixelgenaue Garantie.',
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
        q: 'Was ist Keyword-Dichte, und wie schützt der Übernutzungsmonitor meine Inhalte?',
        a: 'Keyword-Dichte ist der Anteil, mit dem ein bestimmtes Wort im Verhältnis zur gesamten Wortzahl vorkommt. Wird dasselbe Wort zu oft wiederholt, wirkt der Text für Suchmaschinen und Menschen schnell wie Keyword-Stuffing. Der Monitor verfolgt die Häufigkeit in Echtzeit und markiert Begriffe, die den sicheren Schwellenwert von 3,0% überschreiten, damit du vor dem Veröffentlichen umformulieren kannst.',
      },
      {
        q: 'Wie berechnen die Lese- und Sprechzeit-Timer die Dauer meines Beitrags?',
        a: 'Der Lesezeit-Timer teilt deine Wortzahl durch eine durchschnittliche Lesegeschwindigkeit von 275 Wörtern pro Minute. Der Sprechzeit-Timer nutzt ein Gesprächstempo von 150 Wörtern pro Minute. So kannst du Artikel, Skripte, Newsletter oder Kurzvideos direkt im Editor zeitlich einschätzen.',
      },
      {
        q: 'Was macht der Social Sanitizer, und warum sollte ich Emojis entfernen oder Hashtags extrahieren?',
        a: 'Die Bereinigungsaktionen räumen Rohentwürfe mit einem Klick auf. Der Emoji-Entferner löscht Symbole und Sonderzeichen, wenn du reinen Text brauchst, und der Hashtag-Extractor holt Tags aus dem Fließtext heraus und sammelt sie unten, damit die Caption lesbarer bleibt.',
      },
      {
        q: 'Wird mein Text irgendwohin gesendet?',
        a: 'Nein. Der gesamte Editor und jede Vorschau laufen lokal in deinem Browser. Dein Entwurf verlässt nie dein Gerät — es gibt kein Konto, keinen Upload und keine serverseitige Verarbeitung deiner Inhalte.',
      },
      {
        q: 'Bedeutet die Sitzungs-Autospeicherung, dass meine Daten auf einem Server gespeichert werden?',
        a: 'Nein. Deine Entwürfe werden nie hochgeladen oder auf externer Infrastruktur gespeichert. Die Sitzungs-Autospeicherung nutzt sessionStorage in deinem eigenen Browser und nur in diesem Tab. Wenn du die Seite im selben Tab aktualisierst, wird dein Text wiederhergestellt; endet die Tab-Sitzung, löscht der Browser diesen temporären Cache.',
      },
      {
        q: 'Ist PostTruncate kostenlos?',
        a: 'Ja, die Nutzung ist völlig kostenlos und ohne Anmeldung. Das Tool wird durch unaufdringliche Werbung in reservierten Bereichen finanziert, die das Layout nie verschiebt, während du arbeitest.',
      },
      {
        q: 'Warum zählte meine 160-Zeichen-SMS plötzlich als zwei Nachrichten?',
        a: 'Das passiert durch einen Wechsel der Textkodierung. Standard-SMS nutzt GSM-7-Kodierung und fasst bis zu 160 Zeichen in einer einzigen Nachricht. Sobald dein Text ein Nicht-GSM-Zeichen enthält — ein Emoji, ein regionales Schriftsystem oder bestimmte Sonderzeichen — wechselt die gesamte Nachricht zu Unicode, das nur 70 Zeichen pro Segment fasst. Überschreitet eine Unicode-Nachricht 70 Zeichen, wird ein Mehrteil-Header eingefügt und der nutzbare Platz pro Segment sinkt auf 67 Zeichen. PostTruncate zeigt dir Kodierung und Segmentanzahl live an, sodass du immer siehst, wo der Bruch liegt.',
      },
      {
        q: 'Zählen Sonderzeichen und Emojis als ein Zeichen in einer SMS?',
        a: 'Nicht immer. Standardbuchstaben und -zahlen zählen je als ein Zeichen. Zeichen aus der erweiterten GSM-Tabelle — darunter das Euro-Zeichen (€), eckige Klammern, geschweifte Klammern und das Pipe-Symbol | — zählen je als zwei Zeichen, obwohl die Nachricht im GSM-7-Modus bleibt. Emojis sind ein Sonderfall: Eines davon zwingt die gesamte Nachricht in Unicode und reduziert das Limit pro Segment von 160 auf 70 Zeichen.',
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
          'Einbett-Widget',
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
        links: ['Datenschutz', 'AGB', 'Über uns', 'Kontakt'],
      },
      guides: {
        title: 'Plattform-Anleitungen',
        links: [
          'X / Twitter',
          'Instagram',
          'LinkedIn',
          'Facebook',
          'SMS',
          'Threads',
          'Google SERP-Vorschau',
        ],
      },
    },
    copyright: '© {year} PostTruncate. Gebaut für Creator überall.',
    disclaimer:
      'Nicht verbunden mit LinkedIn, X, Meta oder Instagram. Limits sind Schätzungen und können sich ändern.',
  },

  pages: {
    common: {
      lastUpdated: 'Zuletzt aktualisiert: {date}',
      lastUpdatedDate: '1. Juni 2026',
      backHome: '← Zurück zum Editor',
    },

    privacy: {
      title: 'Datenschutzerklärung',
      description:
        'Wie PostTruncate mit deinen Daten umgeht: Dein Text verlässt nie deinen Browser, es gibt keine Konten, und nichts, was du schreibst, wird hochgeladen oder gespeichert.',
      intro:
        'PostTruncate ist von Grund auf datenschutzorientiert gebaut. Alles, was du tippst, läuft lokal in deinem Browser — dein Entwurf wird nie hochgeladen, gespeichert oder von uns gesehen. Diese Erklärung beschreibt genau, was das bedeutet, und die wenigen begrenzten Fälle, in denen Dritte beteiligt sind.',
      sections: [
        {
          heading: 'Dein Text bleibt auf deinem Gerät',
          paragraphs: [
            'Der Editor, jede Plattform-Vorschau, der Thread-Splitter und die Unicode-Bereinigung laufen alle vollständig in <strong>deinem Browser</strong>. Der Text, den du schreibst oder einfügst, wird auf deinem eigenen Gerät verarbeitet und <strong>nie an unsere Server übertragen</strong> — tatsächlich hat PostTruncate gar keinen Inhalts-Server, an den er gesendet werden könnte. Wenn du den Tab schließt, ist dein Entwurf weg, sofern dein Browser ihn nicht lokal aufbewahrt.',
            'Da nichts hochgeladen wird, können wir nicht lesen, speichern, verkaufen oder teilen, was du schreibst. Es gibt <strong>kein Konto, keine Anmeldung und kein Login</strong>, also fragen wir nie nach deinem Namen, deiner E-Mail oder irgendeinem persönlichen Detail, um das Tool zu nutzen.',
          ],
        },
        {
          heading: 'Was wir lokal speichern',
          paragraphs: [
            'Eine kleine Anzahl von Einstellungen wird im <strong>localStorage</strong> deines Browsers gespeichert, damit die Seite sich merkt, wie du sie magst — konkret dein gewähltes Design (hell oder dunkel) und deine bevorzugte Sprache. Diese Werte leben nur auf deinem Gerät, sind nur von PostTruncate lesbar und erreichen uns nie. Du kannst sie jederzeit über die Einstellungen deines Browsers löschen.',
          ],
        },
        {
          heading: 'Werbung',
          paragraphs: [
            'PostTruncate wird durch unaufdringliche Werbung finanziert, die in festen, reservierten Bereichen angezeigt wird, die das Layout nie verschieben, während du arbeitest. Wenn Werbepartner von Dritten eingesetzt werden, können sie ihre eigenen Cookies setzen oder Geräte-Identifikatoren verwenden, um relevante Werbung anzuzeigen, vorbehaltlich ihrer eigenen Datenschutzrichtlinien. Diese Partner erhalten nie den Inhalt deines Entwurfs, weil dieser Inhalt nie deinen Browser verlässt.',
          ],
        },
        {
          heading: 'Das Kontaktformular',
          paragraphs: [
            'Die einzige Funktion, die Daten von deinem Gerät sendet, ist das <strong>Kontaktformular</strong>. Wenn du dich entscheidest, uns eine Nachricht zu senden, werden der Name, die E-Mail und die Nachricht, die du eingibst, über einen Drittanbieter-Formulardienst an uns übermittelt, damit wir sie lesen und antworten können. Wir nutzen diese Informationen ausschließlich, um dir zu antworten, und verwenden sie nicht für Marketing. Wenn du lieber keinen Dritten nutzen möchtest, kannst du uns stattdessen direkt eine E-Mail schreiben.',
          ],
        },
        {
          heading: 'Änderungen & Kontakt',
          paragraphs: [
            'Wir können diese Erklärung anpassen, während sich das Produkt weiterentwickelt; das oben angegebene „Zuletzt aktualisiert“-Datum spiegelt immer die aktuelle Version wider. Wenn du Fragen zum Datenschutz hast, schreib uns an <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    terms: {
      title: 'Allgemeine Geschäftsbedingungen',
      description:
        'Die Nutzungsbedingungen für PostTruncate: ein kostenloses Tool, das wie besehen bereitgestellt wird, dessen Plattform-Limits Schätzungen sind, ohne Gewährleistung angeboten und mit keinem sozialen Netzwerk verbunden.',
      intro:
        'Mit der Nutzung von PostTruncate stimmst du diesen Bedingungen zu. Sie sind absichtlich kurz und schlicht — das Tool ist kostenlos, läuft in deinem Browser und wird wie besehen bereitgestellt.',
      sections: [
        {
          heading: 'Nutzung des Dienstes',
          paragraphs: [
            'PostTruncate ist ein kostenloses Tool zum Vorschauen und Optimieren von Social-Media-Beiträgen. Du darfst es für jeden rechtmäßigen Zweck nutzen. Du verpflichtest dich, <strong>den Dienst nicht zu missbrauchen</strong> — zum Beispiel indem du versuchst, ihn zu stören, seine Schutzmechanismen rückgängig zu machen oder ihn zu nutzen, um das Gesetz zu brechen oder die Rechte anderer zu verletzen.',
          ],
        },
        {
          heading: 'Schätzungen, keine Garantien',
          paragraphs: [
            'Die hier gezeigten Zeichenlimits, Falzpunkte und Formatierungsregeln basieren auf dem veröffentlichten und weithin beobachteten Verhalten jeder Plattform. Plattformen <strong>ändern diese Limits ohne Vorankündigung</strong>, und die Darstellung variiert je nach Gerät und App-Version. Behandle jede Vorschau und Zählung als nahe Schätzung, nicht als pixelgenaue Garantie. Du bist dafür verantwortlich, deine eigenen Beiträge zu überprüfen, bevor du sie veröffentlichst.',
          ],
        },
        {
          heading: 'Keine Verbindung',
          paragraphs: [
            'PostTruncate ist ein unabhängiges Tool und ist <strong>nicht verbunden mit, unterstützt von oder gesponsert von</strong> LinkedIn, X (Twitter), Meta, Instagram, Facebook oder Threads. Alle Produktnamen, Logos und Marken sind Eigentum ihrer jeweiligen Inhaber und werden hier nur verwendet, um das Verhalten jeder Plattform zu beschreiben.',
          ],
        },
        {
          heading: 'Bereitgestellt „wie besehen“',
          paragraphs: [
            'Der Dienst wird <strong>„wie besehen“ und „wie verfügbar“ ohne jegliche Gewährleistung</strong> bereitgestellt, ausdrücklich oder stillschweigend. Im größtmöglichen gesetzlich zulässigen Umfang haften wir nicht für Verluste oder Schäden, die aus deiner Nutzung — oder der Unfähigkeit zur Nutzung — des Tools entstehen, einschließlich aller Entscheidungen, die du auf Grundlage seiner Vorschauen oder Zählungen triffst.',
          ],
        },
        {
          heading: 'Änderungen dieser Bedingungen',
          paragraphs: [
            'Wir können diese Bedingungen von Zeit zu Zeit überarbeiten; das oben angegebene „Zuletzt aktualisiert“-Datum spiegelt die aktuelle Version wider, und die fortgesetzte Nutzung des Tools bedeutet, dass du die neuesten Bedingungen akzeptierst. Fragen? Schreib an <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    about: {
      title: 'Über PostTruncate',
      description:
        'PostTruncate ist ein kostenloses, datenschutzorientiertes Tool, das Creatorn genau zeigt, wo jede soziale Plattform ihren Text abschneidet — bevor sie auf Posten drücken.',
      intro:
        'PostTruncate existiert aus einem Grund: Die erste Zeile deines Beitrags ist für die meisten Leute die einzige Zeile, und jede Plattform schneidet sie an einer anderen Stelle ab. Wir machen diese unsichtbaren Limits sichtbar.',
      sections: [
        {
          heading: 'Was es tut',
          paragraphs: [
            'Schreib oder füge einen Entwurf einmal ein, und PostTruncate stellt ihn so dar, wie <strong>LinkedIn, X, Threads, Instagram und Facebook</strong> es tatsächlich tun werden — die „…mehr anzeigen“-Falz, die 280-Zeichen-Thread-Aufteilung, die 23-Zeichen-Link-Gewichtung, die 5-Hashtag-Obergrenze. Du siehst genau, was über der Falz überlebt, bevor du dich zur Veröffentlichung entscheidest.',
            'Es erkennt auch die stillen Probleme, die deine Reichweite schrumpfen lassen: unsichtbare nullbreite Zeichen, die Zählungen und Screenreader stören, und pseudo-Unicode-„Fancy-Schriften“, die gestaltet aussehen, aber für assistive Technik unlesbar sind.',
          ],
        },
        {
          heading: 'Warum wir es gebaut haben',
          paragraphs: [
            'Die meisten Zeichenzähler nennen dir eine einzige Zahl. Creator brauchen mehr als das — sie müssen wissen, <strong>wo</strong> der Text in jedem Netzwerk abgeschnitten wird, denn dort lebt oder stirbt der Aufhänger. Wir wollten einen Arbeitsbereich, der jede Plattform auf einmal simuliert, sofort läuft und deine Privatsphäre vollständig respektiert.',
          ],
        },
        {
          heading: 'Von Grund auf datenschutzorientiert',
          paragraphs: [
            'Alles läuft in deinem Browser. Dein Text wird nie hochgeladen, es gibt keine Konten, und das Tool ist kostenlos nutzbar. Es wird durch unaufdringliche Werbung in reservierten Bereichen finanziert, die das Layout nie verschieben. Lies die vollständigen Details in unserer <a href="../privacy/"><strong>Datenschutzerklärung</strong></a>.',
          ],
        },
      ],
    },

    contact: {
      title: 'Kontakt',
      description:
        'Nimm Kontakt mit dem PostTruncate-Team auf — sende uns eine Nachricht oder schreib uns direkt eine E-Mail mit Feedback, Fehlerberichten oder Fragen.',
      intro:
        'Einen Fehler gefunden, ein abgedriftetes Plattform-Limit entdeckt oder eine Idee, um PostTruncate besser zu machen? Wir würden uns freuen, von dir zu hören.',
      form: {
        name: 'Dein Name',
        email: 'Deine E-Mail',
        subject: 'Betreff',
        message: 'Nachricht',
        submit: 'Nachricht senden',
        sending: 'Wird gesendet…',
        success: 'Danke — deine Nachricht ist unterwegs. Wir melden uns bald bei dir.',
        error:
          'Beim Senden deiner Nachricht ist etwas schiefgelaufen. Bitte versuche es erneut oder schreib uns direkt eine E-Mail.',
      },
      altHeading: 'Lieber per E-Mail?',
      altBody:
        'Du erreichst uns jederzeit unter {email}. Wir lesen jede Nachricht und antworten so schnell wir können.',
    },
  },

  embedWidget: {
    title: 'Kostenloses Zeichenzähler-Widget zum Einbetten — PostTruncate',
    description:
      'Füge einen kostenlosen Live-Zeichenzähler mit einer Zeile HTML zu jedem Blog oder jeder Website hinzu. Verfolgt Limits für X, LinkedIn, Threads, Instagram und SMS.',
    eyebrow: 'Kostenloses Widget',
    heading: 'Binde einen Live-Zeichenzähler auf deiner Website ein',
    lede:
      'Füge eine HTML-Zeile ein, um einen Echtzeit-Zeichenzähler zu jeder Seite hinzuzufügen. Er zählt Zeichen und Wörter, verfolgt Limits für X, LinkedIn, Threads, Instagram und SMS — alles ohne deine Website zu verlassen.',
    previewLabel: 'Live-Vorschau',
    copyButton: 'Einbettcode kopieren',
    copiedButton: 'Kopiert!',
    codeLabel: 'Einbettcode',
    audienceHeading: 'Für wen ist das?',
    forBloggers:
      'Blogger und Content-Creator können einen Live-Zeichenzähler direkt auf ihrer Schreibseite einbinden, damit Leser Plattformlimits prüfen können, ohne den Tab zu wechseln.',
    forEducators:
      'Lehrende und Kursautor·innen können den Zähler in eine Lektion einbetten, damit Studierende das Schreiben mit Längenbeschränkungen direkt im Kurs üben können.',
    forDevelopers:
      'Entwickler können das Widget mit einem einzigen <iframe> in jedes CMS, jede Dokumentationsseite oder jedes interne Tool einbinden — ohne API-Schlüssel, Konto oder Build-Schritt.',
    homepageLinkLabel: 'Auf deiner Website einbetten →',
  },

  errors: {
    notFound: {
      code: '404',
      title: 'Seite nicht gefunden',
      description:
        'Die gesuchte Seite existiert nicht. Zurück zum PostTruncate-Editor.',
      heading: 'Diese Seite wurde abgeschnitten',
      body: 'Die gesuchte Seite existiert nicht, wurde verschoben oder gab es nie. Der Editor ist noch genau dort, wo du ihn verlassen hast.',
      cta: 'Zurück zum Editor',
    },
    serverError: {
      code: '500',
      title: 'Etwas ist schiefgelaufen',
      description:
        'Ein unerwarteter Fehler ist aufgetreten. Zurück zum PostTruncate-Editor und erneut versuchen.',
      heading: 'Auf unserer Seite ist etwas schiefgelaufen',
      body: 'Das ist ein Serverfehler, nicht deiner. Versuch es gleich noch einmal — der Editor läuft komplett in deinem Browser, dein Text ist also so oder so sicher.',
      cta: 'Zurück zum Editor',
    },
  },

  serpPage: {
    crossPromo: {
      heading: 'Prüfe auch deine Social-Media-Limits',
      editorLink: 'Oder öffne den vollständigen PostTruncate-Editor →',
      platforms: {
        twitter:   { name: 'X / Twitter',  desc: '280 Zeichen pro Tweet · Links zählen als 23' },
        instagram: { name: 'Instagram',    desc: '2.200 Zeichen Bildunterschrift · 30-Hashtag-Limit' },
        linkedin:  { name: 'LinkedIn',     desc: '3.000 Zeichen · Desktop-Fold bei 210 Zeichen' },
        facebook:  { name: 'Facebook',     desc: '63.206 Zeichen · Feed-Fold bei 480 Zeichen' },
        threads:   { name: 'Threads',      desc: '500 Zeichen pro Threads-Beitrag' },
        sms:       { name: 'SMS',          desc: '160 GSM · 70 Unicode-Zeichen pro SMS' },
      },
    },
  },

  banner: {
    text: 'Deine {platform}-Vorschau ist weiter unten',
    close: 'Schließen',
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
      timers: {
        reading: 'Lesen',
        speaking: 'Sprechen',
        lessThan30Sec: '< 30 Sek.',
        minute: { one: 'Min.', other: 'Min.' },
        second: { one: 'Sek.', other: 'Sek.' },
      },
      formatterLabel: 'Format-Werkzeuge',
      uppercase: 'GROSSBUCHSTABEN',
      lowercase: 'kleinbuchstaben',
      titleCase: 'Titelschreibweise',
      sentenceCase: 'Satzschreibweise',
      emojiStripper: 'Emojis entfernen',
      hashtagExtractor: 'Hashtags extrahieren',
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
    sms: {
      eyebrow: 'SMS',
      title: 'Globaler Zeichenzähler',
      characterCount: 'Zeichenanzahl',
      charactersLeft: 'Verbleibende Zeichen',
      parts: 'Nachrichten',
      encoding: 'Codierung',
      encodingGsm: 'GSM 7-bit',
      encodingUnicode: 'Unicode',
      partsValue: '{n} Nachrichten',
      gsmNote:
        'GSM 7-bit: 160 Zeichen für eine SMS, danach 153 pro verketteter SMS. Zeichen aus der Erweiterungstabelle wie €, [, ], {, }, \\ und | zählen als 2.',
      unicodeNote:
        'Unicode UTF-16: 70 Zeichen für eine SMS, danach 67 pro verketteter SMS. Das gilt, sobald ein Emoji oder eine Nicht-GSM-Schrift enthalten ist.',
    },
    linkedin: {
      title: 'Vorschau der Aufhänger-Zone',
      viewAriaLabel: 'LinkedIn-Falz-Ansicht',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobil',
      badgeTruncated: 'Abgeschnittener Feed-Text',
      badgeOverLimit: 'Über dem Beitragslimit',
      badgeSafe: 'Sichere Aufhänger-Zeile',
      beforeFold: '{total} / {limit} vor der Falz',
      postLimit: '{total} / {limit} Beitragslimit',
      seeMore: '…mehr anzeigen',
      profileMeta: 'Gründer · 1. Grades · Gerade eben',
      placeholder: 'Die einleitenden Zeilen deines Beitrags erscheinen hier…',
      overLimitNote:
        'LinkedIn-Beiträge sind auf {limit} Zeichen begrenzt. Kürze vor dem Veröffentlichen um {excess}.',
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
      badgeCaptionOver: 'Bildunterschrift zu lang',
      captionLimit: '{total} / {limit} Limit der Bildunterschrift',
      captionOver:
        'Instagram-Bildunterschriften sind auf {limit} Zeichen begrenzt. Kürze vor dem Veröffentlichen um {excess}.',
      hashtagLabel: 'Hashtag-Konzentration',
      over: 'Über dem harten Limit von Instagram von {limit} Hashtags — die Bildunterschrift lässt sich nicht posten. Entferne {excess}.',
      approaching:
        'Du näherst dich der 5-Tag-Obergrenze. Reduziere auf deine absichtsstärksten Tags.',
      within: 'Bequem innerhalb des 5-Hashtag-Limits von Instagram.',
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
    keywords: {
      eyebrow: 'Keywords',
      title: 'Übernutzungs-Monitor',
      badgeIdle: 'Inaktiv',
      badgeStuffing: 'Keyword-Stuffing',
      badgeBalanced: 'Ausgewogen',
      colKeyword: 'Keyword',
      colUses: 'Nutzungen',
      colDensity: 'Dichte',
      overused: 'Übernutzt',
      empty: 'Tippe los, um deine meistgenutzten Keywords und ihre Dichte zu sehen.',
      stuffingNote:
        'Markierte Keywords überschreiten {threshold}% Dichte — Suchmaschinen könnten das als Keyword-Stuffing werten. Variiere deine Wortwahl.',
      footnote:
        '{total} Wörter · Keywords über {threshold}% Dichte werden markiert',
    },
    seoPreview: {
      eyebrow: 'SEO-Vorschau',
      title: 'Google-SERP-Simulator',
      badgeIdle: 'Inaktiv',
      badgeSafe: 'Gut',
      badgeWarn: 'Limit überschritten',
      titleLabel: 'Seitentitel',
      titleCounter: '{n} / {limit}',
      pixelNote: '~{px}px · Google kürzt bei ~{max}px',
      titleOverChar:
        'Titel überschreitet {limit} Zeichen — Google könnte ihn in den Suchergebnissen kürzen.',
      titleOverPixel:
        'Titel kann in Suchergebnissen abgeschnitten werden (~{max}px Darstellungslimit).',
      descLabel: 'Meta-Beschreibung',
      descCounter: '{n} / {limit}',
      descOverChar: 'Beschreibung überschreitet {limit} Zeichen.',
      previewLabel: 'Google-Suchvorschau',
      titlePlaceholder: 'Ihr Seitentitel…',
      descPlaceholder: 'Eine kurze Beschreibung Ihrer Seite für die Suchergebnisse…',
    },
    readability: {
      eyebrow: 'Lesbarkeit',
      title: 'Flesch-Lesbarkeitsindex',
      scoreLabel: 'Lesbarkeit',
      gradeLabel: 'Klassenstufe',
      descriptors: {
        veryEasy: 'Sehr leicht',
        easy: 'Leicht',
        fairlyEasy: 'Ziemlich leicht',
        standard: 'Standard',
        fairlyDifficult: 'Ziemlich schwer',
        difficult: 'Schwer',
        veryDifficult: 'Sehr schwer',
      },
      tooltip:
        'Der Flesch-Lesbarkeitsindex bewertet Text auf einer Skala von 0–100. Ein höherer Wert bedeutet leichter lesbar. 60–70 entspricht normalem Fließtext.',
      notApplicable:
        'Die Flesch-Formel ist für lateinschriftliche Texte konzipiert und gilt nicht für diese Sprache. Verwende die Wortanzahl als primäres Lesbarkeitsmaß.',
    },
    toolLinks: {
      linkedin: 'Mehr über LinkedIn-Zeichenlimits erfahren →',
      twitter: 'Mehr über X / Twitter-Zeichenlimits erfahren →',
      instagram: 'Mehr über Instagram-Zeichenlimits erfahren →',
      facebook: 'Mehr über Facebook-Zeichenlimits erfahren →',
      threads: 'Mehr über Threads-Zeichenlimits erfahren →',
    },
    embed: {
      placeholder: 'Tippe, um Zeichen zu zählen…',
      charCount: 'Zeichen',
      wordCount: 'Wörter',
      remaining: '{n} verbleibend',
      overLimit: '{n} zu viel',
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
