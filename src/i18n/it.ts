import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// Italiano (it) — TRADUZIONE GENERATA AUTOMATICAMENTE.
// Richiede una revisione umana prima del lancio. La struttura rispecchia
// esattamente en.ts; solo i valori stringa sono stati tradotti.
// ──────────────────────────────────────────────────────────────────────────

export const it: Translations = {
  seo: {
    title:
      'Contatore di Caratteri — Strumento Gratuito per Contare Caratteri e Parole | PostTruncate',
    description:
      'Anteprima gratuita per i social. Soglia LinkedIn, thread X/Twitter, hashtag eccessivi e problemi di accessibilità — tutto nel browser.',
    skipLink: 'Vai all’editor',
  },

  nav: {
    brandAria: 'Home di PostTruncate',
    homeAria: 'Home di PostTruncate',
    links: {
      editor: 'Editor',
      guides: 'Guide alle piattaforme',
      limits: 'Tutti i limiti delle piattaforme',
      tools: 'Strumenti',
      counters: 'Contatori di caratteri',
      adPreviews: 'Anteprime annunci',
      faq: 'FAQ',
      about: 'Chi siamo',
      contact: 'Contatti',
    },
    cta: 'Apri l’editor',
    themeToDark: 'Passa al tema scuro',
    themeToLight: 'Passa al tema chiaro',
    language: 'Lingua',
    languageAria: 'Seleziona la lingua',
    menuAria: 'Apri/chiudi il menu di navigazione',
    backToTop: 'Torna su',
  },

  hero: {
    eyebrow: 'Anteprima social e simulatore di troncamento',
    title: 'Scopri esattamente dove ogni piattaforma taglia il tuo testo.',
    lede: 'Scrivi una sola volta e guarda il tuo post nelle anteprime native di LinkedIn, X, Threads, Instagram e Facebook: con righe della soglia, suddivisioni dei thread, limiti degli hashtag e avvisi di accessibilità in tempo reale mentre scrivi, più IA in un tocco per migliorare il tuo post sul momento.',
    primary: 'Inizia a scrivere',
    secondary: 'Vedi i limiti delle piattaforme',
    badge: 'Anteprime in tempo reale. Niente più supposizioni.',
    trust: '100% gratis — senza registrazione · Il tuo testo non lascia mai il browser · Oltre 10 limiti di piattaforma coperti',
  },

  howItWorks: {
    heading: 'Come funziona',
    steps: [
      {
        name: 'Incolla o digita il tuo testo',
        text: 'Inserisci la tua bozza nell\'editor e il contatore di caratteri si aggiorna istantaneamente mentre scrivi.',
      },
      {
        name: 'Tutte le piattaforme vengono visualizzate contemporaneamente',
        text: 'Le anteprime di LinkedIn, X, Threads, Instagram, Facebook e SMS si aggiornano simultaneamente — nessuna selezione necessaria.',
      },
      {
        name: 'Vedi esattamente dove viene tagliato il testo',
        text: 'L\'anteprima evidenzia il punto di troncamento in modo da sapere esattamente cosa vedranno i lettori.',
      },
    ],
  },

  toolPage: {
    onThisPage: 'In questa pagina',
    lastUpdated: 'Ultimo aggiornamento: {date}',
    crossPromo: {
      heading: 'Devi controllare altre piattaforme?',
      text: 'PostTruncate non è solo per {platform}. L\'editor completo nella home page mostra l\'anteprima del tuo post su LinkedIn, X, Instagram, Facebook, Threads e TikTok contemporaneamente — così individui la soglia, il limite e le insidie di codifica di ogni piattaforma in un\'unica volta. Scrivilo una volta, controllalo ovunque.',
      cta: 'Apri l\'editor completo',
    },
    cta: {
      heading: 'Pronto a vedere com\'è davvero il tuo post?',
      blurb: 'Incolla la tua bozza nell\'editor di PostTruncate e visualizza istantaneamente anteprime live per LinkedIn, X, Instagram, Facebook, Threads e TikTok — con linee di piega, divisioni dei thread e avvisi di limite che si aggiornano mentre scrivi. Gratuito, istantaneo e nulla lascia il tuo browser.',
      button: 'Inizia a scrivere — è gratis',
    },
  },

  images: {
    logoAlt: 'Logo PostTruncate',
    platformLogo: 'Logo {platform}',
    authorAlt: 'Anirudha, sviluppatore di PostTruncate',
  },

  breadcrumbs: {
    home: 'Home',
  },

  workspace: {
    title: 'Il tuo spazio di lavoro in tempo reale',
    sub: 'Tutto ciò che vedi qui sotto si aggiorna all’istante e resta sul tuo dispositivo.',
  },

  seoCopy: {
    ariaLabel: 'Informazioni su PostTruncate',
    sections: [
      {
        heading: 'Un contatore di caratteri per i social media',
        paragraphs: [
          '<strong>PostTruncate</strong> è un contatore di caratteri gratuito che funziona direttamente nel browser, senza bisogno di caricare file o creare un account. Incolla o digita qualsiasi testo e vedrai immediatamente il conteggio di caratteri, parole, tempo di lettura e distribuzione delle lettere — tutto aggiornato mentre scrivi.',
          'È pensato per chiunque lavori con testi soggetti a un limite: copywriter che accorciano un titolo, sviluppatori che verificano una stringa, o studenti che controllano la lunghezza di un elaborato. Poiché tutto viene elaborato localmente, le tue bozze non lasciano mai il tuo dispositivo.',
        ],
      },
      {
        heading: 'Codifica SMS e calcolo dei segmenti',
        paragraphs: [
          'Gli SMS funzionano con due modalità di codifica, e la maggior parte degli strumenti ignora questa differenza. PostTruncate rileva automaticamente se il messaggio usa <strong>GSM-7</strong> standard (160 caratteri per messaggio) o <strong>Unicode</strong> (70 caratteri) — e il passaggio può avvenire al primo emoji o carattere speciale.',
          'Segnala anche i caratteri della tabella GSM estesa — come il simbolo dell’euro (€), le parentesi quadre o la barra verticale — che rimangono in modalità GSM-7 ma occupano due slot anziché uno. Questo costo nascosto è spesso la causa di una segmentazione inaspettata.',
          'Quando il testo si estende su più segmenti, il <strong>calcolatore di segmenti</strong> integrato mostra esattamente quanti SMS verranno inviati, tenendo conto dell’overhead dell’UDH che riduce il limite utile a 153 caratteri (GSM) o 67 (Unicode) per segmento.',
        ],
      },
      {
        heading: 'X (Twitter): limiti e divisione automatica dei thread',
        paragraphs: [
          'X (Twitter) applica due regole che spesso sorprendono: il limite di 280 caratteri e il fatto che qualsiasi link — indipendentemente dalla lunghezza reale — conti esattamente come 23 caratteri. PostTruncate integra entrambe le regole, quindi il contatore visualizzato corrisponde a quello che X mostrerà dopo aver applicato il wrapper t.co.',
          'Se la bozza è troppo lunga, il <strong>divisore di thread</strong> integrato la suddivide in tweet numerati ai confini naturali delle frasi — mai a metà parola. Ogni scheda mostra il conteggio dei caratteri e la posizione, così puoi rivedere l’intero thread prima di pubblicare.',
        ],
      },
      {
        heading: 'Limiti di caratteri su Instagram e Facebook',
        paragraphs: [
          'Instagram consente fino a 2 200 caratteri in una didascalia, ma ne mostra solo i primi 125 circa prima di nascondere il resto dietro un link «altro». PostTruncate indica esattamente dove cade quel taglio, in modo che la prima riga visibile nel feed sia sempre quella che conta.',
          'Il pannello monitora anche il <strong>numero di hashtag</strong> in tempo reale. Instagram non pubblica silenziosamente i post che superano i 5 hashtag, quindi viene mostrato un avviso prima di raggiungere quel limite. Gli spazi vengono sempre conteggiati, in linea con il comportamento della piattaforma.',
        ],
      },
      {
        heading: 'Conteggio parole, leggibilità e analisi per piattaforma',
        paragraphs: [
          'Oltre ai limiti delle piattaforme, PostTruncate conta anche parole, frasi, paragrafi e simboli — tutto in tempo reale mentre scrivi. Utile per le meta-description SEO, la revisione di documentazione o qualsiasi flusso di lavoro in cui serve più di un semplice conteggio di caratteri.',
          'Il pannello gestisce correttamente il testo multilingue, inclusi i sistemi di scrittura CJK dove il numero di caratteri ha un peso semantico diverso. Che tu scriva in italiano, inglese, giapponese o cinese, i conteggi riflettono ciò che la piattaforma di destinazione vedrà effettivamente.',
        ],
      },
    ]
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
        body: 'Le didascalie di Instagram arrivano fino a 2.200 caratteri ma ne mostrano solo i primi 125 circa prima di un link "altro". La regola più rigida riguarda gli hashtag: più di 5 in una singola didascalia o commento e il post fallisce silenziosamente la pubblicazione. Anche accumulare decine di tag a bassa intenzione viene letto come spam. Tieni i tag essenziali e pertinenti, e tieni d’occhio il contatore in tempo reale per non sbattere mai contro il muro dei 5 tag.',
        facts: [
          ['Limite didascalia', '2.200 caratteri'],
          ['Limite rigido hashtag', '5 tag'],
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
      tiktok: {
        name: 'TikTok',
        tag: 'Piega della didascalia',
        body: 'Le didascalie di TikTok arrivano fino a 2.200 caratteri, con emoji e hashtag che contano nel totale. Ma il feed mette il video al primo posto: mostra solo l’inizio della didascalia e piega il resto dietro “…altro” al primo a capo o intorno ai 100 caratteri, a seconda di cosa viene prima. Inizia con il tuo gancio su una sola riga perché sopravviva. PostTruncate conta ogni carattere in tempo reale e segna esattamente dove la didascalia si piega su un reel 9:16.',
        facts: [
          ['Limite didascalia', '2.200 caratteri'],
          ['Piega “…altro”', '~100 car. / 1ª riga'],
          ['Formato video', '9:16 (1080×1920)'],
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
    title: 'Domande frequenti',
    viewAll: 'Vedi tutte le FAQ',
    items: [
      {
        q: 'Che cos’è il troncamento dei post?',
        a: 'Il troncamento avviene quando una piattaforma taglia il tuo post: nasconde tutto ciò che supera la piega visiva dietro un link «…altro» oppure rifiuta i caratteri oltre un limite rigido. PostTruncate ti mostra esattamente dove ogni piattaforma effettua quel taglio, in tempo reale mentre scrivi, così la parte importante non sparisce mai sotto la piega.',
      },
      {
        q: 'Perché i social network troncano i post?',
        a: 'I feed sono fatti per essere scorsi, quindi le piattaforme comprimono i post lunghi per mantenere lo scorrimento veloce e mostrare più contenuti sullo schermo. Ogni piattaforma traccia la linea in un punto diverso: LinkedIn piega intorno ai 140–210 caratteri, Facebook tra 110 e 480 a seconda del dispositivo, Instagram attorno ai 125, e X impone semplicemente un tetto rigido di 280 caratteri. Ciò che resta sotto la piega lo vede solo chi tocca «altro» — e la maggior parte dei lettori non lo fa mai.',
      },
      {
        q: 'Quali piattaforme supporta PostTruncate?',
        a: 'PostTruncate offre anteprime per LinkedIn, X (Twitter), Threads, Instagram, Facebook e SMS — con conteggio caratteri in tempo reale, indicatori di piega, divisione in thread e calcolo dei segmenti SMS per ciascuna. Include anche un’anteprima della SERP di Google per titoli e meta description, e un widget contatore gratuito da incorporare nel tuo sito.',
      },
      {
        q: 'Quanto sono accurati i limiti di caratteri?',
        a: 'PostTruncate usa i limiti pubblicati e ampiamente osservati di ogni piattaforma — 280 per X, 210/140 per la soglia di LinkedIn, 5 hashtag per Instagram e un peso fisso di 23 caratteri per i link. Le piattaforme li modificano di tanto in tanto e la resa varia leggermente da dispositivo a dispositivo, quindi considera le anteprime una stima approssimata piuttosto che una garanzia perfetta al pixel.',
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
        q: 'Che cos’è la densità delle parole chiave e in che modo il monitor di eccesso protegge i miei contenuti?',
        a: 'La densità delle parole chiave è la percentuale con cui una parola compare rispetto al totale delle parole. Ripetere troppo lo stesso termine può sembrare keyword stuffing per motori di ricerca e lettori. Il monitor segue la frequenza in tempo reale e segnala ogni termine che supera la soglia sicura del 3,0%, così puoi riformulare prima di pubblicare.',
      },
      {
        q: 'Come calcolano i timer di lettura e parlato la durata del mio post?',
        a: 'Il timer di lettura divide il conteggio parole per una velocità media di 275 parole al minuto. Il timer del parlato usa un ritmo conversazionale di 150 parole al minuto. Così puoi stimare articoli, script, newsletter o video brevi direttamente nell’editor.',
      },
      {
        q: 'Che cosa fa il Social Sanitizer e perché dovrei rimuovere emoji o estrarre hashtag?',
        a: 'Le azioni di pulizia sistemano le bozze con un clic. Il rimuovi emoji elimina icone e simboli speciali quando serve testo semplice, mentre l’estrattore di hashtag toglie le etichette dal corpo del testo e le raggruppa in fondo per rendere la didascalia più leggibile.',
      },
      {
        q: 'Il mio testo viene inviato da qualche parte?',
        a: 'No. L’intero editor e ogni anteprima girano localmente nel tuo browser. La tua bozza non lascia mai il tuo dispositivo — niente account, niente caricamento e nessuna elaborazione dei tuoi contenuti sul server.',
      },
      {
        q: 'Il salvataggio automatico di sessione significa che i miei dati vengono salvati su un server?',
        a: 'No. Le bozze non vengono mai caricate né salvate su infrastrutture esterne. Il salvataggio automatico di sessione usa sessionStorage nel tuo browser, solo in quella scheda. Se aggiorni la pagina nella stessa scheda, il testo viene ripristinato; quando termina la sessione della scheda, il browser cancella quella cache temporanea.',
      },
      {
        q: 'PostTruncate è gratuito?',
        a: 'Sì, è completamente gratuito da usare e non richiede alcuna registrazione. Lo strumento è sostenuto da annunci discreti collocati in spazi riservati che non spostano mai il layout mentre lavori.',
      },
      {
        q: 'Perché il mio SMS di 160 caratteri è stato improvvisamente contato come due messaggi?',
        a: `Questo accade a causa di un cambio di codifica del testo. Gli SMS standard usano la codifica GSM-7, che contiene fino a 160 caratteri in un unico messaggio. Non appena il testo include un carattere non-GSM — un emoji, un sistema di scrittura regionale o certi simboli — l'intero messaggio passa a Unicode, che contiene solo 70 caratteri per segmento. Se un messaggio Unicode supera i 70 caratteri, viene aggiunta un'intestazione multipart e lo spazio utilizzabile per segmento scende a 67 caratteri. PostTruncate mostra in tempo reale la codifica attiva e il numero di segmenti, così sai sempre dove avviene la divisione.`,
      },
      {
        q: 'I caratteri speciali e le emoji contano come un singolo carattere in un SMS?',
        a: `Non sempre. Lettere e numeri standard contano ciascuno come un carattere. I simboli della tabella GSM estesa — tra cui il simbolo dell'euro (€), le parentesi quadre, le parentesi graffe e la barra verticale | — contano ciascuno come due caratteri, anche se il messaggio rimane in modalità GSM-7. Le emoji sono diverse: aggiungerne una forza l'intero messaggio in Unicode, riducendo il limite per segmento da 160 a 70 caratteri.`,
      },
    ],
  },

  faqPage: {
    title: 'FAQ — Contatore di caratteri e anteprime PostTruncate',
    description:
      'Tutte le domande su PostTruncate, con risposta: limiti di caratteri per piattaforma, conteggio di emoji e link, segmentazione SMS, privacy e funzionamento delle anteprime in tempo reale.',
    eyebrow: 'FAQ',
    heading: 'Domande frequenti',
    lede: 'Tutto su come PostTruncate conta, mostra in anteprima e protegge i tuoi post — raggruppato per argomento. Fai clic su una domanda per espandere la risposta.',
    categories: {
      about: 'Sullo strumento',
      counting: 'Conteggio e limiti',
      cleanup: 'Pulizia e accessibilità',
      insights: 'Metriche e analisi',
      privacy: 'Privacy e dati',
      sms: 'SMS',
    },
  },

  limitsPage: {
    title: 'Limiti di caratteri dei social 2026 — Tabella completa',
    description:
      'La tabella completa dei limiti di caratteri per LinkedIn, X (Twitter), Threads, Instagram, Facebook e SMS — tetti rigidi, pieghe di troncamento e le regole che li governano.',
    eyebrow: 'Riferimento',
    heading: 'Tutti i limiti delle piattaforme, in una sola tabella',
    lede: 'Tetti rigidi, pieghe del testo visibile e comportamento in caso di superamento per ogni piattaforma che PostTruncate mostra in anteprima. I numeri qui sotto sono le stesse costanti che l’editor verifica in tempo reale.',
    table: {
      caption: 'Limiti di caratteri e punti di troncamento per piattaforma',
      platform: 'Piattaforma',
      limit: 'Limite rigido',
      foldMobile: 'Piega (mobile)',
      foldDesktop: 'Piega (desktop)',
      notes: 'Note',
    },
    noFold: 'Nessuna piega',
    notes: {
      linkedin: 'Il testo oltre la piega si nasconde dietro «…altro».',
      twitter: 'Nessuna piega — oltre {limit} caratteri il post si divide in un thread; ogni link conta come {url} caratteri.',
      threads: 'I link contano per intero; il testo oltre {limit} caratteri prosegue come risposte numerate.',
      instagram: 'La didascalia si piega dietro «altro»; tetto rigido di {hashtags} hashtag per post.',
      facebook: 'I post del feed si comprimono dietro «Altro» molto prima del tetto tecnico.',
      tiktok: 'La didascalia si piega dietro “…altro” al primo a capo o ~100 caratteri; emoji e hashtag contano.',
      smsGsm: '{single} caratteri in un singolo messaggio; {multi} per segmento quando si divide.',
      smsUnicode: 'Un’emoji o un carattere non GSM trasforma l’intero messaggio in Unicode.',
    },
    rulesHeading: 'Regole di troncamento, piattaforma per piattaforma',
    rules: {
      linkedin: 'LinkedIn consente {limit} caratteri per post ma piega la vista del feed dopo circa {mobile} caratteri su mobile e {desktop} su desktop — il resto si nasconde dietro «…altro». Le interruzioni di riga contano, e la prima frase raccoglie quasi tutti i clic: metti il gancio all’inizio e i link sotto la piega.',
      twitter: 'X impone un tetto rigido di {limit} caratteri per post e non mostra alcuna piega. Ogni URL viene avvolto dall’abbreviatore t.co e costa sempre {url} caratteri indipendentemente dalla lunghezza reale, e molte emoji pesano come due caratteri. Le bozze più lunghe vanno divise in thread — PostTruncate lo fa automaticamente ai confini di parola.',
      threads: 'Threads consente {limit} caratteri per post e, a differenza di X, conta i link nella loro lunghezza completa. Su mobile il feed piega i post lunghi intorno ai {mobile} caratteri. Tutto ciò che supera il tetto deve proseguire come risposte numerate concatenate sotto il primo post.',
      instagram: 'Le didascalie di Instagram possono arrivare a {limit} caratteri, ma il feed mostra solo i primi {mobile} circa prima del link «altro». La regola più dura riguarda gli hashtag: più di {hashtags} in una didascalia o nel primo commento e il post può fallire silenziosamente la pubblicazione.',
      facebook: 'Il tetto tecnico di Facebook è di {limit} caratteri, ma i post del feed si comprimono dietro «Altro» intorno ai {mobile} caratteri su mobile e {desktop} su desktop. L’engagement crolla sui blocchi lunghi senza pause: il limite pratico è la piega, non il tetto.',
      sms: 'Un singolo SMS contiene {gsmSingle} caratteri nella codifica GSM a 7 bit, che scendono a {gsmMulti} per segmento quando il messaggio si divide. Qualsiasi emoji o carattere non GSM converte l’intero messaggio in Unicode — {uniSingle} caratteri per messaggio singolo, {uniMulti} per segmento — e alcuni simboli GSM (€, parentesi quadre, la barra verticale) contano doppio.',
      tiktok: 'TikTok consente {limit} caratteri per didascalia, con emoji e hashtag che contano per intero. Poiché il video riempie lo schermo, il feed piega la didascalia dietro “…altro” al primo a capo o intorno ai {fold} caratteri — a seconda di cosa viene prima — quindi la prima riga è tutto ciò che la maggior parte legge. Il formato video è verticale a schermo intero 9:16 (1080×1920).',
    },
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
          'Widget incorporabile',
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
        links: ['Privacy', 'Termini', 'Chi siamo', 'Contatti'],
      },
      guides: {
        title: 'Guide di piattaforma',
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
    copyright: '© {year} PostTruncate. Creato per i creator di tutto il mondo.',
    disclaimer:
      'Non affiliato a LinkedIn, X, Meta o Instagram. I limiti sono stime e possono cambiare.',
  },

  pages: {
    common: {
      lastUpdated: 'Ultimo aggiornamento: {date}',
      lastUpdatedDate: '1 giugno 2026',
      backHome: '← Torna all’editor',
    },

    privacy: {
      title: 'Informativa sulla privacy',
      description:
        'Come PostTruncate gestisce i tuoi dati: il tuo testo non lascia mai il browser, non ci sono account e niente di ciò che scrivi viene caricato o conservato.',
      intro:
        'PostTruncate è costruito secondo il principio della privacy al primo posto. Tutto ciò che digiti gira localmente nel tuo browser: la tua bozza non viene mai caricata, conservata o vista da noi. Questa informativa spiega esattamente cosa significa e i pochi casi limitati in cui sono coinvolti soggetti terzi.',
      sections: [
        {
          heading: 'Il tuo testo resta sul tuo dispositivo',
          paragraphs: [
            'L’editor, ogni anteprima delle piattaforme, il suddivisore di thread e il sanificatore Unicode girano interamente nel <strong>tuo browser</strong>. Il testo che scrivi o incolli viene elaborato sul tuo stesso dispositivo e non viene <strong>mai trasmesso ai nostri server</strong>: di fatto, PostTruncate non ha alcun server di contenuti a cui inviarlo. Quando chiudi la scheda, la tua bozza scompare a meno che il tuo browser non scelga di conservarla localmente.',
            'Poiché nulla viene caricato, non possiamo leggere, conservare, vendere o condividere ciò che scrivi. Non c’è <strong>alcun account, alcuna registrazione e alcun accesso</strong>, quindi non ti chiediamo mai il nome, l’email o qualsiasi altro dato personale per usare lo strumento.',
          ],
        },
        {
          heading: 'Cosa conserviamo localmente',
          paragraphs: [
            'Un piccolo numero di preferenze viene salvato nel <strong>localStorage</strong> del tuo browser così che il sito ricordi come ti piace: nello specifico il tema che hai scelto (chiaro o scuro) e la tua lingua preferita. Questi valori vivono solo sul tuo dispositivo, sono leggibili solo da PostTruncate e non ci raggiungono mai. Puoi cancellarli in qualsiasi momento dalle impostazioni del tuo browser.',
          ],
        },
        {
          heading: 'Pubblicità',
          paragraphs: [
            'PostTruncate è sostenuto da annunci discreti mostrati in spazi fissi e riservati che non spostano mai il layout mentre lavori. Se vengono utilizzati partner pubblicitari terzi, questi possono impostare i propri cookie o usare identificatori del dispositivo per mostrare annunci pertinenti, in base alle loro stesse informative sulla privacy. Questi partner non ricevono mai il contenuto della tua bozza, perché tale contenuto non lascia mai il tuo browser.',
          ],
        },
        {
          heading: 'Il modulo di contatto',
          paragraphs: [
            'L’unica funzione che invia dati fuori dal tuo dispositivo è il <strong>modulo di contatto</strong>. Quando scegli di inviarci un messaggio, il nome, l’email e il messaggio che inserisci ci vengono recapitati tramite un servizio terzo di gestione dei moduli così che possiamo leggerli e risponderti. Usiamo quelle informazioni unicamente per risponderti e non le utilizziamo per scopi di marketing. Se preferisci non usare un servizio terzo, puoi inviarci una email direttamente.',
          ],
        },
        {
          heading: 'Modifiche e contatti',
          paragraphs: [
            'Potremmo aggiornare questa informativa man mano che il prodotto evolve; la data di “ultimo aggiornamento” qui sopra riflette sempre la versione attuale. Se hai domande sulla privacy, scrivici all’indirizzo <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    terms: {
      title: 'Termini e condizioni',
      description:
        'Le condizioni d’uso di PostTruncate: uno strumento gratuito, fornito così com’è, i cui limiti delle piattaforme sono stime, offerto senza garanzie e non affiliato ad alcun social network.',
      intro:
        'Usando PostTruncate accetti questi termini. Sono volutamente brevi e semplici: lo strumento è gratuito, gira nel tuo browser ed è fornito così com’è.',
      sections: [
        {
          heading: 'Uso del servizio',
          paragraphs: [
            'PostTruncate è uno strumento gratuito per visualizzare in anteprima e ottimizzare i post sui social media. Puoi usarlo per qualsiasi scopo lecito. Accetti di <strong>non abusare del servizio</strong> — ad esempio tentando di interromperlo, di aggirare le sue protezioni o di usarlo per violare la legge o ledere i diritti di qualcun altro.',
          ],
        },
        {
          heading: 'Stime, non garanzie',
          paragraphs: [
            'I limiti di caratteri, i punti di soglia e le regole di formattazione mostrati qui si basano sul comportamento pubblicato e ampiamente osservato di ogni piattaforma. Le piattaforme <strong>modificano questi limiti senza preavviso</strong> e la resa varia a seconda del dispositivo e della versione dell’app. Considera ogni anteprima e conteggio una stima approssimata, non una garanzia perfetta al pixel. Sei responsabile della revisione dei tuoi post prima di pubblicarli.',
          ],
        },
        {
          heading: 'Nessuna affiliazione',
          paragraphs: [
            'PostTruncate è uno strumento indipendente e <strong>non è affiliato, approvato o sponsorizzato da</strong> LinkedIn, X (Twitter), Meta, Instagram, Facebook o Threads. Tutti i nomi di prodotti, i loghi e i marchi sono di proprietà dei rispettivi titolari e sono usati qui solo per descrivere il comportamento di ciascuna piattaforma.',
          ],
        },
        {
          heading: 'Fornito “così com’è”',
          paragraphs: [
            'Il servizio è fornito <strong>“così com’è” e “come disponibile”, senza garanzie di alcun tipo</strong>, esplicite o implicite. Nella misura massima consentita dalla legge, non siamo responsabili di alcuna perdita o danno derivante dal tuo utilizzo — o dall’impossibilità di utilizzo — dello strumento, incluse eventuali decisioni che prendi basandoti sulle sue anteprime o sui suoi conteggi.',
          ],
        },
        {
          heading: 'Modifiche a questi termini',
          paragraphs: [
            'Potremmo rivedere questi termini di tanto in tanto; la data di “ultimo aggiornamento” qui sopra riflette la versione attuale e l’uso continuato dello strumento significa che accetti i termini più recenti. Domande? Scrivi a <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    about: {
      title: 'Chi siamo — PostTruncate',
      description:
        'PostTruncate è uno strumento gratuito e orientato alla privacy che mostra ai creator esattamente dove ogni piattaforma social tronca il loro testo, prima di pubblicare.',
      intro:
        'PostTruncate esiste per un solo motivo: la prima riga del tuo post è l\u2019unica che la maggior parte delle persone legge, e ogni piattaforma la taglia in un posto diverso. Rendiamo visibili questi limiti invisibili.',
      sections: [
        {
          heading: 'Cosa fa',
          paragraphs: [
            'Scrivi o incolla una bozza una sola volta e PostTruncate la renderizza esattamente come faranno <strong>LinkedIn, X, Threads, Instagram e Facebook</strong> \u2014 il taglio \u00ab\u2026vedi altro\u00bb, la divisione in thread a 280 caratteri, la ponderazione dei link a 23 caratteri, il limite di 5 hashtag. Vedi esattamente cosa sopravvive sopra il taglio prima di impegnarti a pubblicare.',
            'Rileva anche i problemi silenziosi che riducono la tua portata: caratteri invisibili a larghezza zero che rompono i contatori e gli screen reader, e \u00abcaratteri decorativi\u00bb pseudo-Unicode che sembrano stilizzati ma sono illeggibili per le tecnologie assistive.',
          ],
        },
        {
          heading: 'Perché l\u2019ho creato',
          paragraphs: [
            'Sono Anirudha, uno sviluppatore indipendente con base in India, con un MCA dell\u2019Università di Dibrugarh, in Assam. Come la maggior parte delle persone che pubblicano regolarmente, mi sono stancato di scoprire dopo la pubblicazione che metà del mio post LinkedIn era nascosta dietro \u00abvedi altro\u00bb, o che un tweet che credevo adatto si era silenziosamente diviso in un thread.',
            'La maggior parte dei contatori di caratteri ti dà un solo numero. I creator hanno bisogno di più: devono sapere esattamente dove il testo viene tagliato su ogni rete, perché è lì che l\u2019hook vive o muore. Così ho creato uno spazio di lavoro unico che simula ogni piattaforma in una volta sola, funziona istantaneamente e rispetta completamente la tua privacy.',
          ],
        },
        {
          heading: 'Come rimane aggiornato',
          paragraphs: [
            'I limiti delle piattaforme cambiano senza molto preavviso. Li verifico confrontandoli con il modo in cui ogni piattaforma renderizza realmente i post e aggiorno le guide qui quando qualcosa cambia. Hai trovato qualcosa di obsoleto? La <a href="../contact/"><strong>pagina contatti</strong></a> arriva direttamente a me.',
          ],
        },
        {
          heading: 'Progettato con la privacy al primo posto',
          paragraphs: [
            'Tutto funziona nel tuo browser. Il tuo testo non viene mai caricato, non ci sono account e lo strumento è gratuito. È supportato da annunci discreti in spazi riservati che non spostano mai il layout. Leggi tutti i dettagli nella nostra <a href="../privacy/"><strong>Informativa sulla privacy</strong></a>.',
          ],
        },
      ],
    },

    contact: {
      title: 'Contattaci',
      description:
        'Mettiti in contatto con il team di PostTruncate — inviaci un messaggio o scrivici direttamente con feedback, segnalazioni di bug o domande.',
      intro:
        'Hai trovato un bug, notato un limite di una piattaforma che è cambiato o hai un’idea per migliorare PostTruncate? Ci farebbe piacere sentirti.',
      form: {
        name: 'Il tuo nome',
        email: 'La tua email',
        subject: 'Oggetto',
        message: 'Messaggio',
        submit: 'Invia messaggio',
        sending: 'Invio in corso…',
        success: 'Grazie — il tuo messaggio è in viaggio. Ti risponderemo presto.',
        error:
          'Qualcosa è andato storto nell’invio del tuo messaggio. Riprova oppure scrivici direttamente via email.',
      },
      altHeading: 'Preferisci l’email?',
      altBody:
        'Puoi contattarci in qualsiasi momento a {email}. Leggiamo ogni messaggio e rispondiamo il più rapidamente possibile.',
    },
  },

  embedWidget: {
    title: "Widget gratuito di contatore di caratteri da incorporare — PostTruncate",
    description:
      "Aggiungi un contatore di caratteri in tempo reale a qualsiasi blog o sito web con una riga di HTML. Monitora i limiti per X, LinkedIn, Threads, Instagram e SMS.",
    eyebrow: "Incorporazione gratuita",
    heading: "Incorpora un contatore di caratteri in tempo reale nel tuo sito",
    lede:
      "Incolla una riga di HTML per aggiungere un contatore di caratteri in tempo reale a qualsiasi pagina. Conta caratteri e parole, e monitora i limiti di X, LinkedIn, Threads, Instagram e SMS — senza lasciare il tuo sito.",
    previewLabel: "Anteprima in tempo reale",
    copyButton: "Copia codice di incorporazione",
    copiedButton: "Copiato!",
    codeLabel: "Codice di incorporazione",
    audienceHeading: "Per chi è?",
    forBloggers:
      "I blogger e i creator di contenuti possono aggiungere un contatore di caratteri in tempo reale direttamente nella loro pagina di scrittura, così i lettori possono verificare i limiti delle piattaforme senza cambiare scheda.",
    forEducators:
      "Gli insegnanti e gli autori di corsi possono incorporare il contatore in una lezione, permettendo agli studenti di esercitarsi a scrivere con vincoli di lunghezza.",
    forDevelopers:
      "Gli sviluppatori possono inserire il widget in qualsiasi CMS, pagina di documentazione o strumento interno con un solo <iframe> — senza chiave API, account o passaggio di build.",
    homepageLinkLabel: "Incorpora nel tuo sito →",
  },

  errors: {
    notFound: {
      code: '404',
      title: 'Pagina non trovata',
      description:
        'La pagina che cerchi non esiste. Torna all’editor di PostTruncate.',
      heading: 'Questa pagina è stata troncata',
      body: 'La pagina che cerchi non esiste, è stata spostata o non è mai esistita. L’editor è ancora esattamente dove l’hai lasciato.',
      cta: 'Torna all’editor',
    },
    serverError: {
      code: '500',
      title: 'Qualcosa è andato storto',
      description:
        'Si è verificato un errore imprevisto. Torna all’editor di PostTruncate e riprova.',
      heading: 'Qualcosa è andato storto dalla nostra parte',
      body: 'È un errore del server, non tuo. Riprova tra un momento — l’editor funziona interamente nel tuo browser, quindi il tuo testo è al sicuro in ogni caso.',
      cta: 'Torna all’editor',
    },
  },


  banner: {
    text: "L'anteprima di {platform} è qui sotto",
    close: 'Chiudi',
  },

  whyPostTruncate: {
    eyebrow: 'PERCHÉ POSTTRUNCATE?',
    title: 'Scrivi con sicurezza.<br/>Pubblica senza preoccupazioni.',
    p1: 'Ogni piattaforma ha limiti di caratteri e regole di troncamento diversi. PostTruncate ti mostra esattamente come apparirà il tuo contenuto prima di pubblicarlo.',
    p2: 'Risparmia tempo, aumenta il coinvolgimento e dai valore a ogni carattere con anteprime in tempo reale, analisi intelligenti e riscrittura del tono con IA in un clic.',
    features: {
      realTime: {
        title: 'Anteprime in tempo reale',
        desc: 'Vedi immediatamente come apparirà il tuo post su oltre 6 piattaforme.',
      },
      insights: {
        title: 'Analisi intelligenti',
        desc: 'Ottieni punteggi di leggibilità, analisi delle parole chiave e suggerimenti per l’ottimizzazione del contenuto.',
      },
      privacy: {
        title: 'La privacy prima di tutto',
        desc: 'Il tuo contenuto non viene mai archiviato o condiviso. Tutto rimane privato.',
      },
      aiTone: {
        title: 'Riscrittura del tono con IA',
        desc: 'Riscrivi istantaneamente il tuo post in un tono professionale, informale, amichevole o conciso con un clic u2014 potenziato dallu2019IA.',
      },
    },
  },

  howTruncationWorks: {
    eyebrow: 'COME FUNZIONA IL TRONCAMENTO',
    description: 'Ogni piattaforma ha limiti di caratteri e regole di visualizzazione unici. Quando il tuo contenuto supera questi limiti, viene troncato con "..." o "Altro". PostTruncate simula esattamente come apparirà il tuo post.',
    platforms: {
      linkedin: { name: 'LinkedIn', desc: 'Mostra ~220 caratteri prima di "...altro"' },
      twitter: { name: 'X (Twitter)', desc: 'Mostra ~125 caratteri prima del troncamento (varia in base al dispositivo)' },
      instagram: { name: 'Instagram', desc: 'Mostra ~125 caratteri, tocca "altro" per espandere' },
      facebook: { name: 'Facebook', desc: 'Mostra ~160 caratteri prima di "...altro"' },
      threads: { name: 'Threads', desc: 'Simile a Instagram con ~125 caratteri prima del troncamento' },
      tiktok: { name: 'TikTok', desc: 'Si piega a ~100 caratteri o al primo a capo' },
      sms: { name: 'SMS (GSM)', desc: '160 caratteri per SMS per GSM, 70 per Unicode' },
    },
  },

  platformCharacterLimits: {
    eyebrow: "LIMITI DI CARATTERI PER PIATTAFORMA",
    headers: {
      platform: "Piattaforma",
      characterLimit: "Limite di caratteri",
      shownInFeed: "Mostrato nel feed",
      bestPractice: "Migliori pratiche",
      notes: "Note"
    },
    viewAll: "Vedi tutti i limiti delle piattaforme",
    platforms: {
      linkedin: {
        name: "LinkedIn",
        limit: "3,000",
        shown: "~220 caratteri",
        bestPractice: "Tieni il messaggio chiave all'inizio",
        notes: "Gli articoli supportano fino a 125.000 caratteri"
      },
      twitter: {
        name: "X (Twitter)",
        limit: "280",
        shown: "~125 caratteri",
        bestPractice: "Metti le info importanti all'inizio",
        notes: "I link riducono i caratteri disponibili"
      },
      instagram: {
        name: "Didascalia Instagram",
        limit: "2,200",
        shown: "~125 caratteri",
        bestPractice: "Cattura l'attenzione subito, aggiungi CTA",
        notes: "Gli hashtag contano nel limite"
      },
      facebook: {
        name: "Post di Facebook",
        limit: "63,206",
        shown: "~160 caratteri",
        bestPractice: "Sii conciso",
        notes: "Immagini e link influenzano la visualizzazione"
      },
      threads: {
        name: "Threads",
        limit: "500",
        shown: "~125 caratteri",
        bestPractice: "Breve e coinvolgente",
        notes: "La piattaforma basata su testo di Meta"
      },
      tiktok: {
        name: "TikTok",
        limit: "2,200",
        shown: "~100 caratteri",
        bestPractice: "Gancio sulla prima riga",
        notes: "Emoji e hashtag contano; si piega al primo a capo"
      },
      sms: {
        name: "SMS (GSM)",
        limit: "160",
        shown: "160 per SMS",
        bestPractice: "Mantieni sotto i 160",
        notes: "I testi più lunghi vengono divisi in più SMS"
      }
    }
  },

  whoIsItFor: {
      eyebrow: "PER CHI È?",
      title: "Perfetto per ogni creatore di contenuti",
      roles: {
          marketers: {
              title: "Marketer",
              desc: "Ottimizza campagne, testi pubblicitari e post social per massimizzare la portata e il coinvolgimento."
          },
          creators: {
              title: "Creator",
              desc: "Scrivi didascalie e thread migliori che ottengano più mi piace, condivisioni e salvataggi."
          },
          agencies: {
              title: "Agenzie",
              desc: "Gestisci più clienti e assicurati che ogni post sia perfettamente ottimizzato."
          },
          founders: {
              title: "Fondatori",
              desc: "Condividi aggiornamenti e costruisci il tuo marchio con contenuti chiari e di impatto."
          }
      }
  },

  ctaBanner: {
    title: 'Pronto a ottimizzare i tuoi contenuti?',
    body: 'Unisciti a migliaia di creator e marketer che scrivono meglio, pubblicano in modo più intelligente e ottengono più engagement.',
    cta: 'Inizia a scrivere gratis',
    noCard: 'Nessuna carta di credito richiesta',
    free: 'Gratis per sempre',
  },

  island: {
    adPreviews: {
      fields: {
        headline: 'Titolo',
        primary: 'Testo principale',
        description: 'Descrizione',
        headlineN: 'Titolo {n}',
      },
      placeholders: {
        headline: 'Il tuo titolo',
        primary: 'Scrivi il tuo testo principale…',
        description: 'Aggiungi una breve descrizione',
      },
      counter: '{n} / {limit}',
      over: '{n} in più',
      previewLabel: 'Anteprima dal vivo',
      deviceAria: 'Scegli il dispositivo di anteprima',
      mobile: 'Mobile',
      desktop: 'Desktop',
      modeAria: 'Scegli il posizionamento',
      feed: 'Feed',
      reels: 'Reels',
      safeZoneLabel: 'Zone sicure',
      safeZoneHint: 'Le bande ombreggiate mostrano dove l’interfaccia copre la tua creatività. Tieni il testo importante fuori da esse.',
      safeZoneTag: 'Zona sicura',
      reelsTooShort: 'Punta a {min}–{max} caratteri così la didascalia si legge bene sopra il video.',
      media: {
        add: 'Aggiungi contenuto',
        replace: 'Sostituisci contenuto',
        remove: 'Rimuovi contenuto',
        hint: 'Visualizzato in anteprima solo nel tuo browser — mai caricato o memorizzato.',
      },
      badgeFits: 'Ci sta',
      badgeTruncated: 'Troncato',
      sponsored: 'Sponsorizzato',
    },
    dashboard: {
      loadSample: 'Carica un post di esempio →',
      sample:
        'La settimana scorsa abbiamo rilasciato una piccola funzione che ha silenziosamente raddoppiato il nostro tasso di conversione da prova a pagamento.\n\n' +
        'Nessun nuovo prezzo. Nessun trucco di crescita. Solo una modifica al flusso di onboarding che ha tolto una singola decisione dalla prima schermata.\n\n' +
        'Ecco esattamente cosa abbiamo cambiato e le tre cose che abbiamo misurato prima di estenderlo a tutti → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
      samples: {
        linkedin:
          'La settimana scorsa abbiamo rilasciato una piccola funzione che ha silenziosamente raddoppiato il nostro tasso di conversione da prova a pagamento.\n\n' +
          'Nessun nuovo prezzo. Nessun trucco di crescita. Solo una modifica al flusso di onboarding che ha tolto una singola decisione dalla prima schermata.\n\n' +
          'Ecco esattamente cosa abbiamo cambiato e le tre cose che abbiamo misurato prima di estenderlo a tutti → https://posttruncate.com/blog/onboarding\n\n' +
          '#saas #productled #growth #startups',
        twitter:
          'La settimana scorsa abbiamo fatto una piccola modifica all’onboarding e il nostro tasso da prova a pagamento è raddoppiato.\n\n' +
          'Nessun nuovo prezzo. Nessun trucco di crescita. Solo una decisione in meno sulla prima schermata.\n\n' +
          'L’analisi completa → https://posttruncate.com/blog/onboarding\n\n' +
          '#buildinpublic #saas',
        instagram:
          'Una piccola modifica. Il doppio dei risultati. 🚀\n\n' +
          'La settimana scorsa abbiamo tolto una singola decisione dal nostro flusso di onboarding — e visto il nostro tasso da prova a pagamento raddoppiare. Nessun nuovo prezzo, nessun trucco. ✨\n\n' +
          'L’analisi completa di cosa abbiamo cambiato (e le 3 cose che abbiamo misurato) è nella nostra bio. 👀\n\n' +
          '.\n.\n.\n' +
          '#saas #startup #designdiprodotto #onboarding #crescita #buildinpublic #imprenditore #techstartup',
        facebook:
          'Una storia veloce della settimana scorsa 👇\n\n' +
          'Abbiamo rilasciato una piccola modifica al nostro onboarding — abbiamo solo tolto una singola decisione dalla primissima schermata — e il nostro tasso da prova a pagamento è raddoppiato. Nessun nuovo prezzo, nessun trucco di crescita elaborato.\n\n' +
          'Abbiamo scritto esattamente cosa abbiamo cambiato e le tre cose che abbiamo misurato prima del rilascio. Leggetelo e diteci cosa ne pensate → https://posttruncate.com/blog/onboarding',
        threads:
          'ok questo è piuttosto pazzesco — la settimana scorsa abbiamo tolto UNA decisione dalla prima schermata del nostro onboarding e il tasso da prova a pagamento è letteralmente raddoppiato.\n\n' +
          'nessun nuovo prezzo. nessun trucco di crescita. solo meno attrito.\n\n' +
          'qualcun altro ha visto risultati così grandi da una modifica così piccola?',
        sms:
          'Ciao! In breve — quella modifica all’onboarding rilasciata la settimana scorsa ha raddoppiato il nostro tasso da prova a pagamento. Abbiamo scritto cosa è cambiato + le 3 cose che abbiamo misurato: https://posttruncate.com/blog/onboarding',
        tiktok:
          'una piccola modifica all’onboarding ha raddoppiato il nostro tasso da prova a pagamento 🤯\n\nnessun nuovo prezzo, nessun growth hack — abbiamo solo tolto una decisione dalla primissima schermata. l’analisi completa di cosa abbiamo cambiato e le 3 cose che abbiamo misurato sono nella nostra bio 👀\n\n#saas #startup #buildinpublic #growthtips #producttok',
      },
    },
    workspace: {
      eyebrow: 'Spazio di lavoro',
      title: 'Scrivi il tuo post',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} carattere nascosto', other: '{n} caratteri nascosti' },
      placeholder: 'Inizia a scrivere il tuo post. Incolla una bozza, aggiungi qualche link e hashtag e guarda l’anteprima di ogni piattaforma aggiornarsi a destra…',
      placeholders: {
        linkedin: "Inizia a digitare il tuo post. Incolla una bozza, aggiungi alcuni link e hashtag e guarda l'anteprima in tempo reale aggiornarsi in LinkedIn sulla destra...",
        facebook: "Inizia a digitare il tuo post. Incolla una bozza, aggiungi alcuni link e hashtag e guarda l'anteprima in tempo reale aggiornarsi in Facebook sulla destra...",
        instagram: "Inizia a digitare il tuo post. Incolla una bozza, aggiungi alcuni link e hashtag e guarda l'anteprima in tempo reale aggiornarsi in Instagram sulla destra...",
        twitter: "Inizia a digitare il tuo post. Incolla una bozza, aggiungi alcuni link e hashtag e guarda l'anteprima in tempo reale aggiornarsi in X (Twitter) sulla destra...",
        threads: "Inizia a digitare il tuo post. Incolla una bozza, aggiungi alcuni link e hashtag e guarda l'anteprima in tempo reale aggiornarsi in Threads sulla destra...",
        sms: "Inizia a digitare il tuo post. Incolla una bozza, aggiungi alcuni link e hashtag e guarda l'anteprima in tempo reale aggiornarsi in SMS sulla destra...",
        tiktok: 'Inizia a scrivere la didascalia. Parti dal tuo gancio, aggiungi qualche hashtag e guarda la tua anteprima TikTok aggiornarsi su un reel 9:16 a destra…',
      },
      counters: {
        characters: 'Caratteri',
        words: 'Parole',
        lines: 'Righe',
        paragraphs: 'Paragrafi',
      },
      timers: {
        reading: 'Lettura',
        speaking: 'Parlato',
        lessThan30Sec: '< 30 s',
        minute: { one: 'min', other: 'min' },
        second: { one: 's', other: 's' },
      },
      formatterLabel: 'Strumenti formato',
      uppercase: 'MAIUSCOLE',
      lowercase: 'minuscole',
      titleCase: 'Stile titolo',
      sentenceCase: 'Stile frase',
      emojiStripper: 'Rimuovi emoji',
      hashtagExtractor: 'Estrai hashtag',
      engineLabel: 'Motore di ottimizzazione',
      clean: 'Pulisci spazi in eccesso',
      sanitize: 'Sanifica testo',
      clear: 'Svuota l’editor',
      hiddenWarning:
        'Trovati caratteri invisibili che mandano in tilt conteggi e screen reader: {codes}. Sanifica per eliminarli.',
      statusLine: 'L’analisi in tempo reale è attiva',
    },
    imageUpload: {
      add: 'Aggiungi media',
      replace: 'Sostituisci media',
      remove: 'Rimuovi media',
      hint: 'Solo anteprima — mai caricata né salvata. Si cancella al ricaricamento.',
    },
    aiImprove: {
      button: 'Migliora con IA',
      pickTone: 'Migliora con IA',
      pickToneSub: 'Scegli un tono — l’IA riscrive il tuo post.',
      tones: {
        professional: 'Professionale',
        casual: 'Informale',
        marketing: 'Marketing',
        friendly: 'Amichevole',
        concise: 'Conciso',
      },
      cancel: 'Annulla',
      improving: 'Miglioramento del tuo post…',
      undo: 'Ripristina',
      reverted: 'Testo originale ripristinato.',
      remaining: {
        one: '{n} di {max} miglioramento IA rimasto',
        other: '{n} di {max} miglioramenti IA rimasti',
      },
      limitReached: 'Hai usato tutti i tuoi miglioramenti IA. Riprova tra {time}.',
      errorGeneric: 'Impossibile migliorare il testo. Riprova.',
      errorEmpty: 'Scrivi prima qualcosa.',
      errorTooLong: 'Il testo è troppo lungo per Migliora con IA (max {max} caratteri).',
      errorUnavailable: 'Migliora con IA non è momentaneamente disponibile.',
    },
    previewPanel: {
      title: 'Anteprima live per piattaforma',
      tabAria: 'Anteprima {platform}',
      compareAll: 'Confronta tutte',
      showHidden: 'Mostra testo nascosto',
    },
    insights: {
      title: 'Approfondimenti avanzati',
      sub: 'Analisi di scrittura, leggibilità, parole chiave e altro',
      subScoped: 'Leggibilità, Densità delle parole chiave',
    },
    hookStrip: {
      heading: 'Guarda come rende il tuo post ovunque',
      viewAll: 'Vedi tutti i limiti per piattaforma',
      limitLabel: 'Limite: {n}',
      perSms: '{n} per SMS',
      survives: 'Hook visibile',
      cut: 'Hook tagliato',
      risk: 'Hook a rischio',
      smsNeeded: '{n} SMS necessari',
      chars: '{n} caratteri',
    },
    common: {
      displayName: 'Il tuo nome',
      handle: 'tu',
      timestamp: '11 h',
      charsSuffix: '{n} caratteri',
      actions: {
        like: 'Mi piace',
        comment: 'Commenta',
        share: 'Condividi',
      },
    },
    sms: {
      placeholder: 'Scrivi o incolla qui il tuo SMS: vedrai la codifica (GSM-7 o Unicode), il conteggio dei caratteri in tempo reale e in quanti segmenti verrà inviato.',
      eyebrow: 'SMS',
      title: 'Contatore globale di caratteri',
      characterCount: 'Conteggio caratteri',
      charactersLeft: 'Caratteri rimanenti',
      parts: 'Messaggi',
      encoding: 'Codifica',
      encodingGsm: 'GSM 7 bit',
      encodingUnicode: 'Unicode',
      partsValue: '{n} messaggi',
      gsmNote:
        'GSM 7-bit: 160 caratteri per un SMS, poi 153 per SMS concatenato. I caratteri della tabella estesa come €, [, ], {, }, \\ e | valgono 2.',
      unicodeNote:
        'Unicode UTF-16: 70 caratteri per un SMS, poi 67 per SMS concatenato. Si applica quando è presente un emoji o una scrittura non GSM.',
    },
    linkedin: {
      title: 'Anteprima della zona gancio',
      viewAriaLabel: 'Vista della soglia LinkedIn',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobile',
      badgeTruncated: 'Testo del feed troncato',
      badgeOverLimit: 'Oltre il limite del post',
      badgeSafe: 'Riga del gancio al sicuro',
      beforeFold: '{total} / {limit} prima della soglia',
      postLimit: '{total} / {limit} limite del post',
      seeMore: '…altro',
      headline: 'Fondatore e CEO',
      connectionDegree: '3°',
      placeholder: 'Le righe di apertura del tuo post appaiono qui…',
      overLimitNote:
        'I post LinkedIn sono limitati a {limit} caratteri. Accorcia di {excess} prima di pubblicare.',
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
    tiktok: {
      title: 'Anteprima TikTok',
      badgeIdle: 'Inizia a scrivere',
      badgeSingle: 'Sta in una didascalia',
      badgeOver: 'Oltre il limite della didascalia',
      links: { one: '{n} link', other: '{n} link' },
      charLength: 'Lunghezza didascalia',
      seeMore: '…altro',
      mediaHint: 'Aggiungi un video o un’immagine 9:16',
      safeZones: 'Zone di sicurezza',
      lineBreakHint: 'Un a capo attiva “…altro” prima',
      placeholder: 'L’anteprima della didascalia appare qui (fino a {limit} caratteri).',
    },
    meta: {
      title: 'Monitor di formattazione',
      badgeNeedsFix: 'Da correggere',
      badgeClean: 'Sembra pulito',
      badgeCaptionOver: 'Didascalia troppo lunga',
      captionLimit: '{total} / {limit} limite didascalia',
      captionOver:
        'Le didascalie Instagram sono limitate a {limit} caratteri. Accorcia di {excess} prima di pubblicare.',
      hashtagLabel: 'Concentrazione di hashtag',
      over: 'Oltre il limite rigido di {limit} hashtag di Instagram — la didascalia non riuscirà a pubblicarsi. Rimuovine {excess}.',
      approaching:
        'Ti stai avvicinando al tetto dei 5 tag. Riduci ai tag con la massima intenzione.',
      within: 'Comodamente entro il limite di 5 hashtag di Instagram.',
      none: 'Nessun hashtag rilevato finora.',
      a11yLabel: 'Accessibilità · font fantasiosi',
      audiencePublic: 'Pubblico',
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
    keywords: {
      eyebrow: 'Parole chiave',
      title: 'Monitor di sovrautilizzo',
      badgeIdle: 'Inattivo',
      badgeStuffing: 'Keyword stuffing',
      badgeBalanced: 'Bilanciato',
      colKeyword: 'Parola chiave',
      colUses: 'Usi',
      colDensity: 'Densità',
      overused: 'Sovrautilizzata',
      empty: 'Inizia a scrivere per vedere le parole chiave più usate e la loro densità.',
      stuffingNote:
        'Le parole chiave evidenziate superano il {threshold}% di densità — i motori di ricerca potrebbero interpretarlo come keyword stuffing. Varia il linguaggio.',
      footnote:
        '{total} parole · le parole chiave oltre il {threshold}% di densità vengono segnalate',
    },
    seoPreview: {
      eyebrow: 'Anteprima SEO',
      title: 'Simulatore SERP di Google',
      badgeIdle: 'Inattivo',
      badgeSafe: 'Ok',
      badgeWarn: 'Limite superato',
      titleLabel: 'Titolo della pagina',
      titleCounter: '{n} / {limit}',
      pixelNote: '~{px}px · Google taglia a ~{max}px',
      titleOverChar:
        'Il titolo supera i {limit} caratteri — Google potrebbe troncare nei risultati.',
      titleOverPixel:
        'Il titolo potrebbe essere tagliato nei risultati di ricerca (~{max}px di limite di rendering).',
      descLabel: 'Meta descrizione',
      descCounter: '{n} / {limit}',
      descOverChar: 'La descrizione supera i {limit} caratteri.',
      previewLabel: 'Anteprima ricerca Google',
      titlePlaceholder: 'Il titolo della tua pagina…',
      descPlaceholder: 'Una breve descrizione della tua pagina per i risultati di ricerca…',
    },
    readability: {
      eyebrow: 'Leggibilità',
      title: 'Indice Flesch di leggibilità',
      scoreLabel: 'Facilità di lettura',
      gradeLabel: 'Livello scolastico',
      descriptors: {
        veryEasy: 'Molto facile',
        easy: 'Facile',
        fairlyEasy: 'Abbastanza facile',
        standard: 'Standard',
        fairlyDifficult: 'Abbastanza difficile',
        difficult: 'Difficile',
        veryDifficult: 'Molto difficile',
      },
      tooltip:
        "L'indice Flesch valuta il testo su una scala da 0 a 100. Un punteggio più alto indica una lettura più facile. Tra 60 e 70 è prosa standard.",
      notApplicable:
        "La formula Flesch è progettata per testi in scrittura latina e non si applica a questa lingua. Usa il conteggio delle parole come misura principale di leggibilità.",
    },
    toolLinks: {
      linkedin: 'Scopri i limiti di caratteri di LinkedIn →',
      twitter: 'Scopri i limiti di caratteri di X / Twitter →',
      instagram: 'Scopri i limiti di caratteri di Instagram →',
      facebook: 'Scopri i limiti di caratteri di Facebook →',
      threads: 'Scopri i limiti di caratteri di Threads →',
      tiktok: 'Scopri i limiti delle didascalie TikTok →',
    },
    embed: {
      placeholder: 'Inizia a digitare per contare i caratteri…',
      charCount: 'Caratteri',
      wordCount: 'Parole',
      remaining: '{n} rimanenti',
      overLimit: '{n} in eccesso',
      platforms: {
        twitter: 'X / Twitter',
        linkedin: 'LinkedIn',
        threads: 'Threads',
        instagram: 'Instagram',
        sms: 'SMS',
      },
    },
    hook: {
      eyebrow: 'Visibilità del gancio',
      title: 'Controllo sopra la piega',
      statusPass: 'Il gancio resta visibile',
      statusWarn: 'CTA sotto la piega',
      statusFail: 'Gancio troncato',
      statusIdle: 'Ancora nessun testo',
      reasonEmpty: 'Aggiungi del testo per vedere cosa resta sopra la piega.',
      reasonFits: 'Tutto il tuo post sta sopra la piega: non viene nascosto nulla.',
      reasonHookCut: 'Il tuo gancio iniziale viene tagliato dalla piega “…altro”.',
      reasonCtaBelow: 'La tua CTA finisce sotto la piega “…altro”.',
      reasonHookOnly: 'Il tuo gancio supera la piega; nessuna CTA rilevata.',
      reasonHookAndCta: 'Il tuo gancio e la tua CTA superano entrambi la piega.',
      xReasonFits: 'Tutto il tuo post entra in un singolo tweet.',
      xReasonHookCut: 'Il tuo gancio iniziale si riversa in un secondo tweet.',
      xReasonCtaBelow: 'La tua CTA appare in un tweet concatenato.',
      xReasonHookOnly: 'Il tuo gancio entra nel primo tweet; nessuna CTA rilevata.',
      xReasonHookAndCta: 'Sia il tuo gancio che la CTA entrano nel primo tweet.',
      foldLabel: 'piega',
      foldAria: 'Linea di piega — il testo sotto è nascosto dietro “…altro”.',
      summary: '{pass} piattaforme su {total} mantengono visibile il gancio',
    },
    calculators: {
      wordsPerPage: {
        eyebrow: 'Parole in pagine',
        title: 'Calcolatore di pagine',
        badgeIdle: 'Inserisci il testo',
        badgeResult: 'Stimato',
        modeAria: 'Scegli come inserire il testo',
        modeText: 'Incolla il testo',
        modeCount: 'N. parole',
        placeholder: 'Incolla o digita qui il tuo testo per contare le parole…',
        wordsLabel: 'Numero di parole',
        wordsPlaceholder: 'es. 1500',
        fontSizeLabel: 'Dimensione del carattere',
        spacingLabel: 'Interlinea',
        spacingSingle: 'Singola',
        spacingOneAndHalf: '1,5 righe',
        spacingDouble: 'Doppia',
        pagesLabel: 'Pagine',
        wordsStatLabel: 'Parole',
        perPageNote: '{n} parole per pagina con questa impostazione',
        referenceHeading: 'Conteggi di parole comuni',
        refWordsCol: 'Parole',
        refPagesCol: 'Pagine',
        fontLabel: 'Carattere',
        pageFormatLabel: 'Dimensione pagina',
        marginsLabel: 'Margini',
        marginTop: 'Superiore',
        marginRight: 'Destro',
        marginBottom: 'Inferiore',
        marginLeft: 'Sinistro',
        unitsLabel: 'Unità',
        unitInch: 'pollici',
        unitCm: 'cm',
        printButton: 'Stampa',
      },
      readingTime: {
        eyebrow: 'Tempo di lettura e di parlato',
        title: 'Calcolatore del tempo di lettura',
        badgeIdle: 'Inserisci il testo',
        badgeResult: 'Stimato',
        modeAria: 'Scegli come inserire il testo',
        modeText: 'Incolla il testo',
        modeCount: 'N. parole',
        placeholder: 'Incolla o digita qui il tuo testo per stimare il tempo di lettura e di parlato…',
        wordsLabel: 'Numero di parole',
        wordsPlaceholder: 'es. 1500',
        readingSpeedLabel: 'Velocità di lettura',
        speakingSpeedLabel: 'Velocità di parlato',
        speedSlow: 'Lenta',
        speedAverage: 'Media',
        speedFast: 'Veloce',
        wpmShort: 'ppm',
        wordsStatLabel: 'Parole',
        referenceHeading: 'Lunghezze comuni',
        refWordsCol: 'Parole',
        refReadingCol: 'Lettura',
        refSpeakingCol: 'Parlato',
      },
      byteCounter: {
        eyebrow: 'Contatore di byte',
        title: 'Calcolatore di byte UTF-8',
        badgeIdle: 'Inserisci il testo',
        badgeResult: 'Contato',
        placeholder: 'Incolla o digita del testo per contarne la dimensione in byte…',
        utf8Label: 'Byte UTF-8',
        utf16Label: 'Byte UTF-16',
        utf32Label: 'Byte UTF-32',
        charactersLabel: 'Caratteri',
        codePointsLabel: 'Code point',
        note: 'UTF-8 usa da 1 a 4 byte per carattere: ASCII 1 byte, latino accentato 2, la maggior parte del CJK 3 e le emoji 4.',
      },
      emojiDetector: {
        eyebrow: 'Emoji e caratteri nascosti',
        title: 'Contatore di emoji e rilevatore di caratteri invisibili',
        badgeIdle: 'Inserisci il testo',
        badgeClean: 'Pulito',
        badgeWarn: 'Nascosti rilevati',
        placeholder: 'Incolla o digita del testo per contare le emoji e rilevare i caratteri invisibili…',
        emojiLabel: 'Emoji',
        charactersLabel: 'Caratteri',
        hiddenLabel: 'Caratteri nascosti',
        cleanNote: 'Nessun carattere invisibile o a larghezza zero rilevato.',
        removeButton: 'Rimuovi i caratteri nascosti',
        removedNote: 'Rimossi {n} caratteri nascosti.',
        note: 'I caratteri invisibili come gli spazi a larghezza zero possono rompere copia-incolla, ricerca e screen reader. Usa Rimuovi per eliminarli.',
      },
      platformCounter: {
        title: 'Contatore di caratteri',
        badgeIdle: 'Inserisci il testo',
        badgeSafe: 'Entro il limite',
        badgeOver: 'Oltre il limite',
        placeholder: 'Scrivi o incolla il testo…',
        counter: '{n} / {limit}',
        remaining: '{n} rimasti',
        over: '{n} in più',
        fields: {
          title: 'Titolo',
          description: 'Descrizione',
          caption: 'Didascalia',
          bio: 'Bio',
          post: 'Post',
          message: 'Messaggio',
          status: 'Stato',
          about: 'Informazioni',
        },
      },
      sentenceCounter: {
        eyebrow: 'Frasi e paragrafi',
        title: 'Contatore di frasi e paragrafi',
        badgeIdle: 'Inserisci il testo',
        badgeResult: 'Contato',
        placeholder: 'Incolla o digita del testo per contare frasi e paragrafi…',
        sentencesLabel: 'Frasi',
        note: 'Il conteggio delle frasi è una stima: abbreviazioni e numeri decimali possono modificarlo leggermente.',
      },
      clear: 'Cancella',
    },
  },
};
