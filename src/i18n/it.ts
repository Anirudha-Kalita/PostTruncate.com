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
      'Strumento gratuito di anteprima per i social media. Vedi la soglia “…altro” di LinkedIn, suddividi automaticamente i testi lunghi in thread X/Twitter puliti e individua il sovraccarico di hashtag o i font che mandano in tilt gli screen reader prima di pubblicare.',
    skipLink: 'Vai all’editor',
  },

  nav: {
    brandAria: 'Home di PostTruncate',
    homeAria: 'Home di PostTruncate',
    links: { editor: 'Editor', guides: 'Guide alle piattaforme', faq: 'FAQ', about: 'Chi siamo', contact: 'Contatti' },
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

  seoCopy: {
    ariaLabel: 'Informazioni su PostTruncate',
    sections: [
      {
        heading: 'Contatore di caratteri online e verifica della lunghezza del testo',
        paragraphs: [
          '<strong>PostTruncate</strong> è un contatore di caratteri gratuito che funziona direttamente nel browser, senza bisogno di caricare file o creare un account. Incolla o digita qualsiasi testo e vedrai immediatamente il conteggio di caratteri, parole, tempo di lettura e distribuzione delle lettere — tutto aggiornato mentre scrivi.',
          'È pensato per chiunque lavori con testi soggetti a un limite: copywriter che accorciano un titolo, sviluppatori che verificano una stringa, o studenti che controllano la lunghezza di un elaborato. Poiché tutto viene elaborato localmente, le tue bozze non lasciano mai il tuo dispositivo.',
        ],
      },
      {
        heading: 'Contatore avanzato di caratteri SMS e calcolatore di segmenti',
        paragraphs: [
          'Gli SMS funzionano con due modalità di codifica, e la maggior parte degli strumenti ignora questa differenza. PostTruncate rileva automaticamente se il messaggio usa <strong>GSM-7</strong> standard (160 caratteri per messaggio) o <strong>Unicode</strong> (70 caratteri) — e il passaggio può avvenire al primo emoji o carattere speciale.',
          'Segnala anche i caratteri della tabella GSM estesa — come il simbolo dell’euro (€), le parentesi quadre o la barra verticale — che rimangono in modalità GSM-7 ma occupano due slot anziché uno. Questo costo nascosto è spesso la causa di una segmentazione inaspettata.',
          'Quando il testo si estende su più segmenti, il <strong>calcolatore di segmenti</strong> integrato mostra esattamente quanti SMS verranno inviati, tenendo conto dell’overhead dell’UDH che riduce il limite utile a 153 caratteri (GSM) o 67 (Unicode) per segmento.',
        ],
      },
      {
        heading: 'Contatore di caratteri per 𝕏 (Twitter) e divisore automatico di thread',
        paragraphs: [
          'X (Twitter) applica due regole che spesso sorprendono: il limite di 280 caratteri e il fatto che qualsiasi link — indipendentemente dalla lunghezza reale — conti esattamente come 23 caratteri. PostTruncate integra entrambe le regole, quindi il contatore visualizzato corrisponde a quello che X mostrerà dopo aver applicato il wrapper t.co.',
          'Se la bozza è troppo lunga, il <strong>divisore di thread</strong> integrato la suddivide in tweet numerati ai confini naturali delle frasi — mai a metà parola. Ogni scheda mostra il conteggio dei caratteri e la posizione, così puoi rivedere l’intero thread prima di pubblicare.',
        ],
      },
      {
        heading: 'Contatore di caratteri per Instagram & Facebook spazi inclusi',
        paragraphs: [
          'Instagram consente fino a 2 200 caratteri in una didascalia, ma ne mostra solo i primi 125 circa prima di nascondere il resto dietro un link «altro». PostTruncate indica esattamente dove cade quel taglio, in modo che la prima riga visibile nel feed sia sempre quella che conta.',
          'Il pannello monitora anche il <strong>numero di hashtag</strong> in tempo reale. Instagram non pubblica silenziosamente i post che superano i 5 hashtag, quindi viene mostrato un avviso prima di raggiungere quel limite. Gli spazi vengono sempre conteggiati, in linea con il comportamento della piattaforma.',
        ],
      },
      {
        heading: 'Conteggio avanzato di parole, simboli e analisi dei testi per le piattaforme',
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
        a: 'Questo accade a causa di un cambiamento nello stile di codifica del tuo testo. I messaggi di testo standard utilizzano la codifica GSM a 7 bit, che consente esattamente 160 caratteri per pacchetto SMS. Tuttavia, non appena inserisci un solo carattere non GSM, come un\'emoji, un simbolo speciale o un carattere di scrittura regionale (come l\'assamese o l\'hindi), l\'intero messaggio forza istantaneamente il passaggio alla codifica Unicode. Quando un messaggio passa a Unicode, la capacità massima per singolo pacchetto SMS scende drasticamente da 160 caratteri a soli 70 caratteri. Inoltre, se il tuo testo supera tale soglia di 70 caratteri, il sistema deve utilizzare dati di concatenazione multiparte (User Data Headers), riducendo la dimensione del pacchetto a 67 caratteri per segmento SMS concatenato. Per evitare sorprese inaspettate sulla bolletta telefonica, utilizza sempre un contatore di caratteri SMS online per monitorare il badge di codifica attivo prima di lanciare una campagna di massa!',
      },
      {
        q: 'I caratteri speciali e le emoji contano come un singolo carattere in un SMS?',
        a: 'No, non è così. Mentre una lettera o un numero standard conta come un singolo carattere, i simboli speciali e le emoji vengono trattati in modo molto diverso dalle reti di telecomunicazione globali. I simboli speciali appartenenti alla tabella di estensione di base GSM standard, come il simbolo dell\'Euro (€), le parentesi quadre [ ], le parentesi graffe { } e il simbolo del tubo |, contano in realtà come 2 caratteri ciascuno, sebbene mantengano il messaggio nell\'efficiente modalità GSM a 7 bit. D\'altra parte, le emoji sono pacchetti di dati altamente complessi che non possono essere inseriti in un testo standard a 7 bit. L\'aggiunta di un\'emoji forza il tuo messaggio in Unicode a 16 bit, comprimendo la tua capacità totale di messaggio per segmento da 160 caratteri a 70 caratteri.',
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
          'SMS',
          'Threads',
          'Anteprima SERP Google',
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
      title: 'Informazioni su PostTruncate',
      description:
        'PostTruncate è uno strumento gratuito e attento alla privacy che mostra ai creator esattamente dove ogni piattaforma social taglia il loro testo — prima di premere pubblica.',
      intro:
        'PostTruncate esiste per un motivo: la prima riga del tuo post è l’unica riga che la maggior parte delle persone legge, e ogni piattaforma la taglia in un punto diverso. Noi rendiamo visibili quei limiti invisibili.',
      sections: [
        {
          heading: 'Cosa fa',
          paragraphs: [
            'Scrivi o incolla una bozza una sola volta, e PostTruncate la mostra nel modo in cui <strong>LinkedIn, X, Threads, Instagram e Facebook</strong> la renderanno davvero — la soglia “…altro”, la suddivisione del thread a 280 caratteri, il peso dei link a 23 caratteri, il tetto dei 5 hashtag. Vedi esattamente cosa sopravvive sopra la soglia prima di decidere di pubblicare.',
            'Individua inoltre i problemi silenziosi che riducono la tua portata: i caratteri invisibili a larghezza zero che mandano in tilt conteggi e screen reader, e i “font fantasiosi” pseudo-Unicode che sembrano stilizzati ma sono illeggibili per le tecnologie assistive.',
          ],
        },
        {
          heading: 'Perché l’abbiamo creato',
          paragraphs: [
            'La maggior parte dei contatori di caratteri ti dà un solo numero. I creator hanno bisogno di più di questo: hanno bisogno di sapere <strong>dove</strong> il testo viene tagliato su ogni rete, perché è lì che il gancio vive o muore. Volevamo un unico spazio di lavoro che simulasse ogni piattaforma in una volta sola, funzionasse all’istante e rispettasse completamente la tua privacy.',
          ],
        },
        {
          heading: 'Costruito con la privacy al primo posto',
          paragraphs: [
            'Tutto gira nel tuo browser. Il tuo testo non viene mai caricato, non ci sono account e lo strumento è gratuito da usare. È sostenuto da annunci discreti in spazi riservati che non spostano mai il layout. Leggi tutti i dettagli nella nostra <a href="../privacy/"><strong>Informativa sulla privacy</strong></a>.',
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
        "",
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

  serpPage: {
    crossPromo: {
      heading: 'Verifica anche i tuoi limiti sui social media',
      editorLink: 'O apri l\'editor completo di PostTruncate →',
      platforms: {
        twitter:   { name: 'X / Twitter',  desc: '280 car. per tweet · i link contano come 23' },
        instagram: { name: 'Instagram',    desc: '2.200 car. didascalia · limite di 30 hashtag' },
        linkedin:  { name: 'LinkedIn',     desc: '3.000 car. · fold desktop a 210 car.' },
        facebook:  { name: 'Facebook',     desc: '63.206 car. · fold feed a 480 car.' },
        threads:   { name: 'Threads',      desc: '500 car. per post su Threads' },
        sms:       { name: 'SMS',          desc: '160 GSM · 70 Unicode car. per SMS' },
      },
    },
  },

  banner: {
    text: "L'anteprima di {platform} è qui sotto",
    close: 'Chiudi',
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
    },
    common: {
      profileName: 'Il tuo nome',
      handle: '@tu',
      charsSuffix: '{n} caratteri',
    },
    sms: {
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
      profileMeta: 'Founder · 1° · Adesso',
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
  },
};
