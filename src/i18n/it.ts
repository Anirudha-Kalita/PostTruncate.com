import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// Italiano (it) — TRADUZIONE GENERATA AUTOMATICAMENTE.
// Richiede una revisione umana prima del lancio. La struttura rispecchia
// esattamente en.ts; solo i valori stringa sono stati tradotti.
// ──────────────────────────────────────────────────────────────────────────

export const it: Translations = {
  seo: {
    title:
      'PostTruncate — Scopri esattamente dove le piattaforme social tagliano il tuo testo',
    description:
      'Strumento gratuito di anteprima per i social media. Vedi la soglia “…altro” di LinkedIn, suddividi automaticamente i testi lunghi in thread X/Twitter puliti e individua il sovraccarico di hashtag o i font che mandano in tilt gli screen reader prima di pubblicare.',
    skipLink: 'Vai all’editor',
  },

  nav: {
    brandAria: 'Home di PostTruncate',
    homeAria: 'Home di PostTruncate',
    links: { editor: 'Editor', guides: 'Guide alle piattaforme', faq: 'FAQ' },
    cta: 'Apri l’editor',
    themeToDark: 'Passa al tema scuro',
    themeToLight: 'Passa al tema chiaro',
    language: 'Lingua',
    languageAria: 'Seleziona la lingua',
    menuAria: 'Apri/chiudi il menu di navigazione',
  },

  hero: {
    eyebrow: 'Anteprima social e simulatore di troncamento',
    title: 'Scopri esattamente dove ogni piattaforma taglia il tuo testo.',
    lede: 'Scrivi una sola volta e guarda il tuo post nelle anteprime native di LinkedIn, X, Instagram e Facebook: righe della soglia, suddivisioni dei thread, limiti degli hashtag e avvisi di accessibilità, tutto in tempo reale mentre scrivi.',
    primary: 'Inizia a scrivere',
    secondary: 'Vedi i limiti delle piattaforme',
  },

  workspace: {
    title: 'Il tuo spazio di lavoro in tempo reale',
    sub: 'Tutto ciò che vedi qui sotto si aggiorna all’istante e resta sul tuo dispositivo.',
  },

  guides: {
    eyebrow: 'Guide alle piattaforme',
    title: 'Conosci ogni limite prima di pubblicare.',
    lede: 'Un riferimento rapido per i punti di troncamento, i limiti rigidi e le insidie di formattazione che riducono silenziosamente la tua portata su ogni rete.',
    items: {
      linkedin: {
        name: 'LinkedIn',
        tag: 'La soglia “…altro”',
        body: 'LinkedIn comprime i post dopo circa 210 caratteri su desktop e 140 su mobile, nascondendo tutto il resto dietro un link "…altro". Tutto ciò che sta sopra quella soglia è l’intera tua presentazione nel feed: se il tuo gancio non arriva lì, la maggior parte delle persone non lo espande mai. Anticipa la tensione, il risultato o la domanda, e sposta hashtag e link sotto la soglia.',
        facts: [
          ['Soglia desktop', '~210 caratteri'],
          ['Soglia mobile', '~140 caratteri'],
          ['Limite rigido del post', '3.000 caratteri'],
        ],
      },
      twitter: {
        name: 'X / Twitter',
        tag: 'Thread e peso dei link',
        body: 'X conteggia un singolo post sui 280 caratteri, ma ogni link viene racchiuso da t.co e pesa 23 caratteri fissi, per quanto lungo sia l’URL reale. Superi i 280 e ti serve un thread. I thread fatti bene si interrompono sui confini delle frasi, mai a metà parola, e numerano ogni tweet così che chi legge possa seguire l’ordine. PostTruncate suddivide automaticamente la tua bozza ed etichetta ogni scheda con la sua posizione.',
        facts: [
          ['Limite per tweet', '280 caratteri'],
          ['Ogni link conta come', '23 caratteri'],
          ['Tweet nel thread', 'Illimitati'],
        ],
      },
      threads: {
        name: 'Threads',
        tag: 'Concatenamento dei post',
        body: 'Threads, l’app di testo di Meta, concede a ogni post 500 caratteri — quasi il doppio di X — e conteggia i link per intero invece di accorciarli. Superi i 500 e il resto deve concatenarsi come risposte numerate. Il primo post regge comunque il feed, quindi anticipa il gancio proprio come ovunque. PostTruncate misura in base al conteggio completo dei caratteri e concatena i testi lunghi in una sequenza numerata e ordinata.',
        facts: [
          ['Limite per post', '500 caratteri'],
          ['Link conteggiati', 'Per intero'],
          ['Sovraccarico', 'Si concatena come risposte'],
        ],
      },
      instagram: {
        name: 'Instagram',
        tag: 'Tetto degli hashtag',
        body: 'Le didascalie di Instagram arrivano fino a 2.200 caratteri ma ne mostrano solo i primi 125 circa prima di un link "altro". La regola più rigida riguarda gli hashtag: più di 30 in una singola didascalia o commento e il post fallisce silenziosamente la pubblicazione. Anche accumulare decine di tag a bassa intenzione viene letto come spam. Tieni i tag essenziali e pertinenti, e tieni d’occhio il contatore in tempo reale per non sbattere mai contro il muro dei 30 tag.',
        facts: [
          ['Limite didascalia', '2.200 caratteri'],
          ['Limite rigido hashtag', '30 tag'],
          ['Anteprima didascalia', '~125 caratteri'],
        ],
      },
      facebook: {
        name: 'Facebook',
        tag: 'Troncamento del feed',
        body: 'Facebook tronca i post nel feed a circa 480 caratteri con un link "Altro", e l’interazione cala bruscamente sui blocchi lunghi e ininterrotti. I post più brevi con una prima riga chiara rendono costantemente di più. La stessa regola di accessibilità vale ovunque: i "font fantasiosi" in pseudo-Unicode sembrano in grassetto o corsivo ma vengono letti carattere per carattere — o saltati del tutto — dagli screen reader, quindi riducono silenziosamente la tua portata.',
        facts: [
          ['Soglia del feed', '~480 caratteri'],
          ['Lunghezza più performante', 'Meno di 80 caratteri'],
          ['Font fantasiosi', 'Bloccano gli screen reader'],
        ],
      },
    },
  },

  hookband: {
    eyebrow: 'Scrivere il gancio',
    title: 'La prima riga è l’unica riga che la maggior parte delle persone legge.',
    body: 'In ogni feed, il testo sopra la soglia fa tutto il lavoro. Apri con un risultato, una tensione o una domanda — non con un riscaldamento. Sposta link e hashtag sotto la soglia, mantieni l’apertura entro il limite di taglio della piattaforma e lascia che l’anteprima confermi che il gancio sopravvive prima di pubblicare.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Domande, con risposta.',
    items: [
      {
        q: 'Quanto sono accurati i limiti di caratteri?',
        a: 'PostTruncate usa i limiti pubblicati e ampiamente osservati di ogni piattaforma — 280 per X, 210/140 per la soglia di LinkedIn, 30 hashtag per Instagram e un peso fisso di 23 caratteri per i link. Le piattaforme li modificano di tanto in tanto e la resa varia leggermente da dispositivo a dispositivo, quindi considera le anteprime una stima approssimata piuttosto che una garanzia perfetta al pixel.',
      },
      {
        q: 'Spazi e punteggiatura contano come caratteri?',
        a: 'Sì. Ogni spazio, interruzione di riga e segno di punteggiatura conta come un carattere, e sia il contatore di PostTruncate sia i limiti delle piattaforme li includono. L’unica eccezione comune sono i link su X/Twitter, che si riducono a 23 caratteri fissi indipendentemente da quante lettere, simboli o barre contenga l’URL reale.',
      },
      {
        q: 'Come incidono le emoji sul conteggio dei caratteri?',
        a: 'PostTruncate conta per code point Unicode, quindi un’emoji semplice come 🙂 conta come un solo carattere. Molte emoji, però, sono composte da più code point uniti — variazioni del tono della pelle, bandiere e glifi combinati come 👨‍👩‍👧 — e questi si registrano come due o più. La maggior parte delle piattaforme, X in particolare, dà inoltre alle emoji un peso maggiore rispetto alle lettere semplici, quindi una bozza ricca di emoji consuma un po’ più del tuo limite di quanto suggerisca il numero di glifi visibili.',
      },
      {
        q: 'Qual è la differenza tra conteggio dei caratteri e conteggio delle parole?',
        a: 'Il conteggio dei caratteri è il totale di ogni singolo carattere — lettere, spazi, punteggiatura ed emoji tutti inclusi — ed è ciò su cui i limiti delle piattaforme vengono effettivamente misurati. Il conteggio delle parole è il numero di parole separate da spazi, per quanto lunga sia ciascuna. Un tweet pieno da 280 caratteri potrebbe essere di sole 40 parole, quindi tieni d’occhio il conteggio dei caratteri per restare entro un limite e usa il conteggio delle parole come indicatore di leggibilità.',
      },
      {
        q: 'Perché il mio link conta come 23 caratteri su X?',
        a: 'X racchiude automaticamente ogni URL con il suo accorciatore t.co, che occupa sempre 23 caratteri indipendentemente da quanto sia lungo o corto il link originale. Quindi un link di 5 caratteri e uno di 200 caratteri ti costano entrambi esattamente 23 sul limite di 280. PostTruncate rispecchia questo nel contatore ponderato.',
      },
      {
        q: 'Cosa sono i “font fantasiosi” e perché vengono segnalati?',
        a: 'Quelle lettere in grassetto, corsivo o stile script che incolli dai generatori di font non sono vera formattazione — sono caratteri pseudo-Unicode del blocco Mathematical Alphanumeric Symbols. Sembrano stilizzati, ma gli screen reader o li compitano lettera per lettera o li saltano, il che danneggia sia l’accessibilità sia la tua portata organica. Il monitor li segnala così puoi tornare al testo semplice.',
      },
      {
        q: 'Cosa rimuove “Sanifica testo”?',
        a: 'Elimina i caratteri invisibili e a larghezza zero — spazi a larghezza zero, byte-order mark, segni di controllo bidirezionale, trattini morbidi e codici di controllo vaganti. Spesso si infiltrano quando copi da altre app e mandano silenziosamente in tilt i conteggi dei caratteri e l’accessibilità sui client mobili più vecchi senza mai essere visibili.',
      },
      {
        q: 'Il mio testo viene inviato da qualche parte?',
        a: 'No. L’intero editor e ogni anteprima girano localmente nel tuo browser. La tua bozza non lascia mai il tuo dispositivo — niente account, niente caricamento e nessuna elaborazione dei tuoi contenuti sul server.',
      },
      {
        q: 'PostTruncate è gratuito?',
        a: 'Sì, è completamente gratuito da usare e non richiede alcuna registrazione. Lo strumento è sostenuto da annunci discreti collocati in spazi riservati che non spostano mai il layout mentre lavori.',
      },
    ],
  },

  footer: {
    homeAria: 'Home di PostTruncate',
    tag: 'Scopri esattamente dove ogni piattaforma taglia il tuo testo — prima di pubblicare.',
    columns: {
      tool: {
        title: 'Strumento',
        links: [
          'Editor di testo',
          'Anteprime in tempo reale',
          'Suddivisore di thread',
          'Sanificatore Unicode',
        ],
      },
      platforms: {
        title: 'Piattaforme',
        links: ['LinkedIn', 'X / Twitter', 'Threads', 'Instagram', 'Facebook'],
      },
      learn: {
        title: 'Impara',
        links: [
          'Limiti di caratteri',
          'FAQ',
          'Scrittura del gancio',
          'Accessibilità',
        ],
      },
      legal: {
        title: 'Note legali',
        links: ['Privacy', 'Termini', 'Contatti'],
      },
    },
    copyright: '© {year} PostTruncate. Creato per i creator di tutto il mondo.',
    disclaimer:
      'Non affiliato a LinkedIn, X, Meta o Instagram. I limiti sono stime e possono cambiare.',
  },

  island: {
    dashboard: {
      loadSample: 'Carica un post di esempio →',
      sample:
        'La settimana scorsa abbiamo rilasciato una piccola funzione che ha silenziosamente raddoppiato il nostro tasso di conversione da prova a pagamento.\n\n' +
        'Nessun nuovo prezzo. Nessun trucco di crescita. Solo una modifica al flusso di onboarding che ha tolto una singola decisione dalla prima schermata.\n\n' +
        'Ecco esattamente cosa abbiamo cambiato e le tre cose che abbiamo misurato prima di estenderlo a tutti → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
    },
    workspace: {
      eyebrow: 'Spazio di lavoro',
      title: 'Scrivi il tuo post',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} carattere nascosto', other: '{n} caratteri nascosti' },
      placeholder:
        'Inizia a scrivere il tuo post. Incolla una bozza, aggiungi qualche link e hashtag e guarda l’anteprima di ogni piattaforma aggiornarsi a destra…',
      counters: {
        characters: 'Caratteri',
        words: 'Parole',
        lines: 'Righe',
        paragraphs: 'Paragrafi',
      },
      engineLabel: 'Motore di ottimizzazione',
      clean: 'Pulisci spazi in eccesso',
      sanitize: 'Sanifica testo',
      clear: 'Svuota l’editor',
      hiddenWarning:
        'Trovati caratteri invisibili che mandano in tilt conteggi e screen reader: {codes}. Sanifica per eliminarli.',
    },
    common: {
      profileName: 'Il tuo nome',
      handle: '@tu',
      charsSuffix: '{n} caratteri',
    },
    linkedin: {
      title: 'Anteprima della zona gancio',
      viewAriaLabel: 'Vista della soglia LinkedIn',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobile',
      badgeTruncated: 'Testo del feed troncato',
      badgeSafe: 'Riga del gancio al sicuro',
      beforeFold: '{total} / {limit} prima della soglia',
      seeMore: '…altro',
      profileMeta: 'Founder · 1° · Adesso',
      placeholder: 'Le righe di apertura del tuo post appaiono qui…',
      truncatedNote:
        'Chi legge vede solo i primi {limit} caratteri nel feed. Anticipa il tuo gancio prima della soglia.',
      safeNote:
        'Tutto il tuo post sta sopra la soglia {view} di LinkedIn — nessun troncamento "…altro".',
    },
    twitter: {
      title: 'Suddivisore di thread',
      badgeIdle: 'Inattivo',
      badgeThread: 'Thread da {n} tweet',
      badgeSingle: 'Tweet singolo',
      links: {
        one: '{n} link · conteggiato come {weight} ciascuno',
        other: '{n} link · conteggiati come {weight} ciascuno',
      },
      weightedLength: 'Lunghezza ponderata',
      placeholder:
        'L’anteprima del tuo tweet appare qui. Supera i {limit} caratteri e si suddivide automaticamente in un thread.',
    },
    threads: {
      title: 'Anteprima post e catena',
      badgeIdle: 'Inattivo',
      badgeThread: 'Catena da {n} post',
      badgeSingle: 'Post singolo',
      links: {
        one: '{n} link · conteggiato per intero',
        other: '{n} link · conteggiati per intero',
      },
      charLength: 'Lunghezza in caratteri',
      placeholder:
        'L’anteprima di Threads appare qui. Supera i {limit} caratteri e si concatena in una sequenza di post numerati.',
    },
    meta: {
      title: 'Monitor di formattazione',
      badgeNeedsFix: 'Da correggere',
      badgeClean: 'Sembra pulito',
      hashtagLabel: 'Concentrazione di hashtag',
      over: 'Oltre il limite rigido di {limit} hashtag di Instagram — la didascalia non riuscirà a pubblicarsi. Rimuovine {excess}.',
      approaching:
        'Ti stai avvicinando al tetto dei 30 tag. Riduci ai tag con la massima intenzione.',
      within: 'Comodamente entro il limite di 30 hashtag di Instagram.',
      none: 'Nessun hashtag rilevato finora.',
      a11yLabel: 'Accessibilità · font fantasiosi',
      flagged: '{n} segnalati',
      flaggedNone: 'Nessuno',
      fancyDetected: {
        one: 'Rilevato {n} carattere “font” pseudo-Unicode (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Sembrano stilizzati ma gli screen reader li saltano o li compitano — danneggiano portata e accessibilità.',
        other:
          'Rilevati {n} caratteri “font” pseudo-Unicode (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). Sembrano stilizzati ma gli screen reader li saltano o li compitano — danneggiano portata e accessibilità.',
      },
      fancyClean:
        'Nessun carattere pseudo-font rilevato. Il tuo testo si legge in modo pulito sulle tecnologie assistive.',
      footnote:
        '{n} caratteri · soglia Facebook ≈ 480 · limite didascalia Instagram 2.200',
    },
  },
};
