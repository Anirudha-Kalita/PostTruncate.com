import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// Dansk — maskinoversættelse. Skal gennemgås af et menneske før lancering.
// (Machine-generated translation; needs human review before launch.)
// Mirrors en.ts exactly in structure (enforced by the Translations type).
// ──────────────────────────────────────────────────────────────────────────

export const da: Translations = {
  seo: {
    title:
      'Tegnoptæller — Gratis Online Tegn- og Ordoptælningsværktøj | PostTruncate',
    description:
      'Gratis forhåndsvisning til sociale medier. Se LinkedIns fold, opdel X/Twitter-tråde, find hashtag-grænser og tilgængelighedsfælder — i din browser.',
    skipLink: 'Spring til editoren',
  },

  nav: {
    brandAria: 'PostTruncate hjem',
    homeAria: 'PostTruncate hjem',
    links: {
      editor: 'Editor',
      guides: 'Platformguider',
      limits: 'Alle platformgrænser',
      tools: 'Værktøjer',
      counters: 'Tegntællere',
      adPreviews: 'Annonceforhåndsvisninger',
      faq: 'FAQ',
      about: 'Om',
      contact: 'Kontakt',
    },
    cta: 'Åbn editoren',
    themeToDark: 'Skift til mørkt tema',
    themeToLight: 'Skift til lyst tema',
    language: 'Sprog',
    languageAria: 'Vælg sprog',
    menuAria: 'Slå navigationsmenu til/fra',
    backToTop: 'Tilbage til toppen',
    bookmarkToast: {
      heading: 'Var det nyttigt?',
      desktopBody: 'Tryk på {shortcut} for at gemme denne side, så du hurtigt finder den igen.',
      mobileBody: 'Gem dette værktøj, så det er ét tryk væk næste gang.',
      mobileButton: 'Gem eller del denne side',
      copied: 'Link kopieret!',
      close: 'Luk',
    },
  },

  hero: {
    eyebrow: 'Preview- og afkortningssimulator til sociale medier',
    title: 'Se præcis hvor hver platform klipper din tekst over.',
    lede: 'Skriv én gang, og se dit opslag blive vist i ægte LinkedIn-, X-, Threads-, Instagram- og Facebook-previews — med foldlinjer, trådopdelinger, hashtag-grænser og tilgængelighedsadvarsler live mens du skriver, plus ét-klik AI til at forbedre dit opslag på stedet.',
    primary: 'Begynd at skrive',
    secondary: 'Se platformsgrænser',
    badge: 'Realtidsvisning. Slut med at gætte.',
    trust: '100 % gratis — ingen tilmelding · Din tekst forlader aldrig browseren · Over 10 platformsgrænser dækket',
  },

  howItWorks: {
    heading: 'Sådan fungerer det',
    steps: [
      {
        name: 'Indsæt eller skriv din tekst',
        text: 'Sæt dit udkast ind i editoren, og karaktertælleren opdateres øjeblikkeligt, mens du skriver.',
      },
      {
        name: 'Alle platforme vises på én gang',
        text: 'Forhåndsvisningskortene til LinkedIn, X, Threads, Instagram, Facebook og SMS opdateres alle på samme tid — ingen valg er nødvendigt.',
      },
      {
        name: 'Se præcis, hvor teksten afskæres',
        text: 'Forhåndsvisningen fremhæver afskæringsstedet, så du ved præcis, hvad læserne vil se.',
      },
    ],
  },

  toolPage: {
    onThisPage: 'På denne side',
    lastUpdated: 'Sidst opdateret: {date}',
    crossPromo: {
      heading: 'Skal du tjekke andre platforme?',
      text: 'PostTruncate er ikke kun til {platform}. Den fulde editor på forsiden forhåndsviser dit opslag på LinkedIn, X, Instagram, Facebook, Threads og TikTok på én gang — så du fanger hver platforms fold, grænse og kodningsfælder i ét gennemløb. Skriv det én gang, tjek det overalt.',
      cta: 'Åbn den fulde editor',
    },
    cta: {
      heading: 'Klar til at se, hvordan dit opslag faktisk ser ud?',
      blurb: 'Indsæt dit udkast i PostTruncate-editoren og se øjeblikkeligt live-forhåndsvisninger for LinkedIn, X, Instagram, Facebook, Threads og TikTok — med foldlinjer, tråd-opdeling og grænseadvarsler, der opdateres mens du skriver. Gratis, øjeblikkeligt og intet forlader din browser.',
      button: 'Begynd at skrive — det er gratis',
    },
  },

  images: {
    logoAlt: 'PostTruncate-logo',
    platformLogo: '{platform}-logo',
    authorAlt: 'Anirudha, udvikler af PostTruncate',
  },

  breadcrumbs: {
    home: 'Hjem',
  },

  workspace: {
    title: 'Dit live-arbejdsområde',
    sub: 'Alt nedenfor opdateres øjeblikkeligt og bliver på din enhed.',
  },

  seoCopy: {
    ariaLabel: 'Om PostTruncate',
    sections: [
      {
        heading: 'En tegntæller til sociale medier',
        paragraphs: [
          '<strong>PostTruncate</strong> er en gratis tegntæller, der kører direkte i din browser — ingen uploads, ingen konto nødvendig. Indsæt eller skriv en tekst, og du ser straks antal tegn, ord, læsetid og bogstavfordeling, alt opdateret i realtid.',
          'Den er nyttig for alle, der arbejder med tekstgrænser: skribenter, der forkorter en overskrift, udviklere, der tjekker en streng, eller studerende, der kontrollerer længden på en opgave. Da alt behandles lokalt, forlader din tekst aldrig din enhed.',
        ],
      },
      {
        heading: 'SMS-kodning og segmentberegning',
        paragraphs: [
          'SMS bruger to kodningsformer, og de fleste værktøjer ignorerer forskellen. PostTruncate registrerer automatisk, om din besked anvender standard <strong>GSM-7</strong> (160 tegn pr. sms) eller <strong>Unicode</strong> (70 tegn) — og skiftet kan ske ved blot ét emoji eller specialtegn.',
          'Værktøjet markerer også tegn fra den udvidede GSM-tabel — som eurosymbolet (€), kantede parenteser eller pipe-symbolet — der forbliver i GSM-7-tilstand, men bruger to tegnpladser i stedet for én. Den skjulte omkostning er ofte årsagen til uventet segmentering.',
          'Når teksten strækker sig over flere segmenter, viser den indbyggede <strong>segmentberegner</strong> præcis, hvor mange sms\'er der sendes, med UDH-overhead medregnet, som reducerer brugbar plads pr. segment til 153 tegn (GSM) eller 67 (Unicode).',
        ],
      },
      {
        heading: 'X (Twitter): grænser og automatisk trådopdeling',
        paragraphs: [
          'X (Twitter) har to regler, der ofte overrasker: grænsen på 280 tegn og det faktum, at ethvert link — uanset dets faktiske længde — tæller som præcis 23 tegn. PostTruncate anvender begge regler, så den viste tæller svarer til, hvad X viser efter t.co-wrapper er anvendt.',
          'Når dit udkast er for langt, deler den indbyggede <strong>trådopdeler</strong> det i nummererede tweets ved naturlige sætningsgrænser — aldrig midt i et ord. Hvert kort viser tegnantallets og positionen, så du kan gennemgå hele tråden, før du poster.',
        ],
      },
      {
        heading: 'Tegngrænser på Instagram og Facebook',
        paragraphs: [
          'Instagram tillader op til 2.200 tegn i en billedtekst, men viser kun de første ca. 125, inden resten gemmes bag et "mere"-link. PostTruncate viser præcis, hvor dette klip falder, så den første synlige linje i feedet altid er den, du vil frem med.',
          'Dashboardet overvåger også <strong>antal hashtags</strong> i realtid. Instagram tillader op til 30 hashtags, før et opslag fejler, men ~5 er det anbefalede ideal — flere ligner spam —, så måleren advarer over 5 og markerer den hårde grænse på 30. Mellemrum tæller altid med, præcis som platformen selv gør.',
        ],
      },
      {
        heading: 'Ordtælling, læsbarhed og platformsanalyse',
        paragraphs: [
          'Ud over platformsgrænser tæller PostTruncate også ord, sætninger, afsnit og symboler — alt opdateres live, mens du skriver. Det er nyttigt til SEO-metabeskrivelser, gennemgang af dokumentation eller enhver skriveopgave, der kræver mere end et simpelt tegnantal.',
          'Dashboardet håndterer flersproget tekst korrekt, herunder CJK-skriftsystemer, hvor tegnantallets semantiske vægt er anderledes. Uanset om du skriver på dansk, engelsk, japansk eller kinesisk, afspejler tællingerne, hvad målplatformen faktisk ser.',
        ],
      },
    ],
  },

  guides: {
    eyebrow: 'Platformsguides',
    title: 'Kend hver grænse, før du poster.',
    lede: 'En hurtig oversigt over de afkortningspunkter, hårde grænser og formateringsfælder, der i det stille begrænser din rækkevidde på hvert netværk.',
    items: {
      linkedin: {
        name: 'LinkedIn',
        tag: '“…se mere”-folden',
        body: 'LinkedIn folder opslag sammen efter cirka 210 tegn på desktop og 140 på mobil og skjuler resten bag et "…se mere"-link. Det, der står over folden, er hele din pitch i feedet — hvis din hook ikke lander der, udfolder de fleste den aldrig. Læg spændingen, resultatet eller spørgsmålet forrest, og skub hashtags og links ned under folden.',
        facts: [
          ['Desktop-fold', '~210 tegn'],
          ['Mobil-fold', '~140 tegn'],
          ['Hård grænse for opslag', '3.000 tegn'],
        ],
      },
      twitter: {
        name: 'X / Twitter',
        tag: 'Tråde & link-vægtning',
        body: 'X tæller et enkelt opslag op mod 280 tegn, men hvert link pakkes ind af t.co og koster faste 23 tegn, uanset hvor langt det rigtige URL er. Går du over 280, skal du bruge en tråd. Gode tråde brydes ved sætningsgrænser, aldrig midt i et ord, og nummererer hvert tweet, så læserne kan følge rækkefølgen. PostTruncate opdeler dit udkast automatisk og mærker hvert kort med dets placering.',
        facts: [
          ['Grænse pr. tweet', '280 tegn'],
          ['Hvert link tæller som', '23 tegn'],
          ['Tweets i en tråd', 'Ubegrænset'],
        ],
      },
      threads: {
        name: 'Threads',
        tag: 'Sammenkædning af opslag',
        body: 'Threads, Metas tekstapp, giver hvert opslag 500 tegn — næsten det dobbelte af X — og tæller links fuldt ud i stedet for at forkorte dem. Går du forbi 500, må resten kædes på som nummererede svar. Det første opslag bærer stadig feedet, så læg din hook forrest, præcis som alle andre steder. PostTruncate måler efter fuldt tegnantal og kæder lange tekster sammen i en ren, nummereret sekvens.',
        facts: [
          ['Grænse pr. opslag', '500 tegn'],
          ['Links tælles', 'Fuldt ud'],
          ['Overløb', 'Kædes som svar'],
        ],
      },
      instagram: {
        name: 'Instagram',
        tag: 'Hashtag-loft',
        body: 'Instagram-billedtekster kan være op til 2.200 tegn, men viser kun cirka de første 125 før et "mere"-link. For hashtags er den hårde grænse 30 (billedtekst plus første kommentar); derover kan opslaget ikke publiceres. Men ~5 er det anbefalede ideal; at stable dusinvis af hashtags med lav hensigt læses som spam. Hold dine hashtags stramme og relevante, og hold øje med live-måleren, der advarer over 5 og markerer den hårde grænse på 30.',
        facts: [
          ['Grænse for billedtekst', '2.200 tegn'],
          ['Hashtags', '~5 anbefalet / 30 hård'],
          ['Preview af billedtekst', '~125 tegn'],
        ],
      },
      facebook: {
        name: 'Facebook',
        tag: 'Feed-afkortning',
        body: 'Facebook afkorter feed-opslag ved cirka 480 tegn med et "Se mere"-link, og engagementet falder kraftigt på lange, ubrudte blokke. Kortere opslag med en klar første linje klarer sig konsekvent bedre. Den samme tilgængelighedsregel gælder overalt: pseudo-Unicode-"fancy skrifttyper" ser fede eller kursive ud, men læses bogstav for bogstav — eller springes helt over — af skærmlæsere, så de skrumper i det stille din rækkevidde.',
        facts: [
          ['Feed-fold', '~480 tegn'],
          ['Bedst præsterende længde', 'Under 80 tegn'],
          ['Fancy skrifttyper', 'Bryder skærmlæsere'],
        ],
      },
      tiktok: {
        name: 'TikTok',
        tag: 'Billedtekst-fold',
        body: 'TikTok-billedtekster kan ved native opslag rumme op til 4.000 tegn, hvor emoji og hashtags tæller med i grænsen — men TikToks API og planlæggere (Buffer, Hootsuite, Later) sætter grænsen for billedteksten ved 2.200, så det er den sikre grænse, hvis du ikke poster manuelt. Men feedet sætter videoen først: det viser kun begyndelsen af din billedtekst og folder resten bag “…mere” ved det første linjeskift eller omkring 100 tegn, alt efter hvad der kommer først. Start med din krog på én linje, så den overlever. PostTruncate tæller hvert tegn live og markerer præcis, hvor billedteksten foldes over en 9:16-reel.',
        facts: [
          ['Billedtekst-grænse', '4.000 native / 2.200 API'],
          ['“…mere”-fold', '~100 tegn / 1. linje'],
          ['Videoformat', '9:16 (1080×1920)'],
        ],
      },
    },
  },

  hookband: {
    eyebrow: 'At skrive hooken',
    title: 'Den første linje er den eneste linje, de fleste læser.',
    body: 'I hvert feed gør teksten over folden alt arbejdet. Åbn med et resultat, en spænding eller et spørgsmål — ikke en opvarmning. Flyt links og hashtags ned under folden, hold din indledning under platformens afklipningspunkt, og lad previewet bekræfte, at hooken overlever, før du publicerer.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Ofte stillede spørgsmål',
    viewAll: 'Se alle FAQ',
    items: [
      {
        q: 'Hvad er trunkering af opslag?',
        a: 'Trunkering er, når en platform skærer dit opslag af — enten ved at gemme alt efter den synlige fold bag et “…se mere”-link eller ved at afvise tegn ud over en hård grænse. PostTruncate viser dig præcis, hvor hver platform sætter snittet, live mens du skriver, så den vigtige del aldrig forsvinder under folden.',
      },
      {
        q: 'Hvorfor trunkerer sociale medier opslag?',
        a: 'Feeds er bygget til at blive skimmet, så platformene folder lange opslag sammen for at holde scrollet hurtigt og vise flere opslag på skærmen. Hver platform trækker grænsen forskelligt: LinkedIn folder ved cirka 140–210 tegn, Facebook ved cirka 110–480 afhængigt af enheden, Instagram omkring 125, og X håndhæver simpelthen en hård grænse på 280 tegn. Alt under folden ses kun af læsere, der aktivt trykker på “mere” — og det gør de fleste aldrig.',
      },
      {
        q: 'Hvilke platforme understøtter PostTruncate?',
        a: 'PostTruncate viser forhåndsvisninger for LinkedIn, X (Twitter), Threads, Instagram, Facebook og SMS — med live tegnoptælling, foldmarkeringer, trådopdeling og SMS-segmentberegning for hver. Der er også en Google SERP-forhåndsvisning til sidetitler og metabeskrivelser samt en gratis tæller-widget, du kan indlejre på dit eget websted.',
      },
      {
        q: 'Hvor nøjagtige er tegngrænserne?',
        a: 'PostTruncate bruger hver platforms offentliggjorte og bredt observerede grænser — 280 for X, 210/140 for LinkedIn-folden, ~5 anbefalede hashtags (hård grænse 30) for Instagram og en fast vægt på 23 tegn for links. Platforme justerer dem af og til, og gengivelsen varierer en smule fra enhed til enhed, så betragt previewene som et tæt estimat snarere end en pixelperfekt garanti.',
      },
      {
        q: 'Tæller mellemrum og tegnsætning med som tegn?',
        a: 'Ja. Hvert mellemrum, linjeskift og tegnsætningstegn tæller som ét tegn, og både PostTruncates tæller og platformsgrænserne medregner dem. Den eneste almindelige undtagelse er links på X/Twitter, som falder sammen til faste 23 tegn, uanset hvor mange bogstaver, symboler eller skråstreger det rigtige URL indeholder.',
      },
      {
        q: 'Hvordan påvirker emojis tegnantallet?',
        a: 'PostTruncate tæller efter Unicode-kodepunkter, så en simpel emoji som 🙂 tæller som ét enkelt tegn. Mange emojis er dog bygget af flere sammensatte kodepunkter — hudtonevariationer, flag og kombinerede tegn som 👨‍👩‍👧 — og de registreres som to eller flere. De fleste platforme, især X, vægter også emojis tungere end almindelige bogstaver, så et emoji-tungt udkast bruger lidt mere af din grænse, end det synlige antal tegn antyder.',
      },
      {
        q: 'Hvad er forskellen mellem tegnantal og ordantal?',
        a: 'Tegnantallet er summen af hvert enkelt tegn — bogstaver, mellemrum, tegnsætning og emojis er alle med — og det er det, platformsgrænserne faktisk måles op mod. Ordantallet er antallet af mellemrumsadskilte ord, uanset hvor langt hvert enkelt er. Et fuldt tweet på 280 tegn kan være kun 40 ord, så hold øje med tegnantallet for at holde dig under en grænse, og brug ordantallet som et læsbarhedsmål.',
      },
      {
        q: 'Hvorfor tæller mit link som 23 tegn på X?',
        a: 'X pakker automatisk hvert URL ind med sin t.co-forkorter, der altid optager 23 tegn, uanset hvor langt eller kort det oprindelige link er. Så et link på 5 tegn og et link på 200 tegn koster dig begge præcis 23 ud af de 280. PostTruncate afspejler dette i den vægtede tæller.',
      },
      {
        q: 'Hvad er “fancy skrifttyper”, og hvorfor markeres de?',
        a: 'De fede, kursiverede eller skriftagtige bogstaver, du indsætter fra skrifttypegeneratorer, er ikke ægte formatering — de er pseudo-Unicode-tegn fra blokken Mathematical Alphanumeric Symbols. De ser stiliserede ud, men skærmlæsere staver dem enten bogstav for bogstav eller springer dem over, hvilket skader både tilgængeligheden og din organiske rækkevidde. Monitoren markerer dem, så du kan skifte tilbage til almindelig tekst.',
      },
      {
        q: 'Hvad fjerner “Rens tekst”?',
        a: 'Den fjerner usynlige tegn og tegn uden bredde — nulbredde-mellemrum, byte-order marks, tovejs-styretegn, bløde bindestreger og forvildede styrekoder. De sniger sig ofte ind, når du kopierer fra andre apps, og de bryder i det stille tegnantal og tilgængelighed på ældre mobilklienter, uden nogensinde at være synlige.',
      },
      {
        q: 'Hvad er søgeordstæthed, og hvordan beskytter overforbrugsmonitoren mit indhold?',
        a: 'Søgeordstæthed er den procentdel, et bestemt ord udgør af det samlede antal ord. Gentager du det samme ord for ofte, kan teksten ligne keyword stuffing for både søgemaskiner og læsere. Monitoren følger frekvensen i realtid og markerer ord, der passerer den sikre grænse på 3,0%, så du kan omskrive, før du publicerer.',
      },
      {
        q: 'Hvordan beregner læse- og taletimerne varigheden af mit opslag?',
        a: 'Læsetimeren dividerer dit ordantal med en gennemsnitlig hastighed på 275 ord i minuttet. Taletimeren bruger et samtaletempo på 150 ord i minuttet. På den måde kan du tidsvurdere artikler, manuskripter, nyhedsbreve eller korte videoer direkte i editoren.',
      },
      {
        q: 'Hvad gør Social Sanitizer, og hvorfor skal jeg fjerne emojis eller udtrække hashtags?',
        a: 'Rensehandlingerne rydder op i rå udkast med ét klik. Emoji-fjerneren sletter ikoner og særlige symboler, når du har brug for ren tekst, og hashtag-udtrækkeren flytter tags ud af brødteksten og samler dem nederst, så billedteksten bliver mere læsbar.',
      },
      {
        q: 'Bliver min tekst sendt nogen steder hen?',
        a: 'Nej. Hele editoren og hvert preview kører lokalt i din browser. Dit udkast forlader aldrig din enhed — der er ingen konto, ingen upload og ingen serverbehandling af dit indhold.',
      },
      {
        q: 'Betyder automatisk sessionslagring, at mine data gemmes på en server?',
        a: 'Nej. Dine udkast uploades aldrig og gemmes aldrig på ekstern infrastruktur. Automatisk sessionslagring bruger sessionStorage i din egen browser, kun i den pågældende fane. Hvis du opdaterer siden i samme fane, gendannes teksten; når fanesessionen slutter, rydder browseren den midlertidige cache.',
      },
      {
        q: 'Er PostTruncate gratis?',
        a: 'Ja, det er helt gratis at bruge uden tilmelding. Værktøjet finansieres af diskrete annoncer placeret i reserverede felter, der aldrig forskyder layoutet, mens du arbejder.',
      },
      {
        q: 'Hvorfor tællede min SMS på 160 tegn pludselig som to beskeder?',
        a: 'Det sker på grund af en ændring i tekstens kodning. Standard-sms bruger GSM-7-kodning, som rummer op til 160 tegn i en enkelt besked. Straks teksten indeholder et ikke-GSM-tegn — en emoji, et regionalt skriftsystem eller visse symboler — skifter hele beskeden til Unicode, der kun rummer 70 tegn pr. segment. Overstiger en Unicode-besked 70 tegn, tilføjes en flerdelssheader og den brugbare plads pr. segment falder til 67 tegn. PostTruncate viser live den aktive kodning og antallet af segmenter, så du altid ved, hvor bruddet sker.',
      },
      {
        q: 'Tæller specialtegn og emojis som ét tegn i en SMS?',
        a: 'Ikke altid. Standardbogstaver og -tal tæller hvert som ét tegn. Symboler fra den udvidede GSM-tabel — herunder eurotegnet (€), firkantede parenteser, krøllede parenteser og lodret streg | — tæller hvert som to tegn, selv om beskeden forbliver i GSM-7-tilstand. Emojis er anderledes: ét emoji tvinger hele beskeden til Unicode og reducerer grænsen pr. segment fra 160 til 70 tegn.',
      },
    ],
  },

  faqPage: {
    title: 'FAQ — PostTruncate tegntæller & forhåndsvisninger',
    description:
      'Alle spørgsmål om PostTruncate, besvaret: platformenes tegngrænser, optælling af emojis og links, SMS-segmentering, privatliv og hvordan live-forhåndsvisningerne virker.',
    eyebrow: 'FAQ',
    heading: 'Ofte stillede spørgsmål',
    lede: 'Alt om hvordan PostTruncate tæller, forhåndsviser og beskytter dine opslag — grupperet efter emne. Klik på et spørgsmål for at folde svaret ud.',
    categories: {
      about: 'Om værktøjet',
      counting: 'Optælling & grænser',
      cleanup: 'Oprydning & tilgængelighed',
      insights: 'Indsigt & analyse',
      privacy: 'Privatliv & data',
      sms: 'SMS',
    },
  },

  limitsPage: {
    title: 'Tegngrænser på sociale medier 2026 — Komplet tabel',
    description:
      'Den komplette tabel over tegngrænser for LinkedIn, X (Twitter), Threads, Instagram, Facebook og SMS — hårde lofter, trunkeringsfolder og reglerne bag dem.',
    eyebrow: 'Reference',
    heading: 'Alle platformgrænser i én tabel',
    lede: 'Hårde lofter, folder for synlig tekst og overløbsadfærd for hver platform, PostTruncate forhåndsviser. Tallene herunder er de samme konstanter, som live-editoren tjekker imod.',
    table: {
      caption: 'Tegngrænser og trunkeringspunkter pr. platform',
      platform: 'Platform',
      limit: 'Hård grænse',
      foldMobile: 'Fold (mobil)',
      foldDesktop: 'Fold (desktop)',
      notes: 'Noter',
    },
    noFold: 'Ingen fold',
    notes: {
      linkedin: 'Tekst efter folden gemmes bag “…se mere”.',
      twitter: 'Ingen fold — over {limit} tegn opdeles i en tråd; hvert link tæller som {url} tegn.',
      threads: 'Links tæller fuldt ud; tekst over {limit} tegn fortsætter som nummererede svar.',
      instagram: 'Billedteksten folder bag “mere”; sigt efter ~{hashtags} hashtags (hård grænse {hashtagMax}).',
      facebook: 'Feedopslag klapper sammen bag “Se mere” længe før det tekniske loft.',
      tiktok: 'Billedteksten foldes bag “…mere” ved det første linjeskift eller ~100 tegn; emoji og hashtags tæller med.',
      smsGsm: '{single} tegn i en enkelt besked; {multi} pr. segment, når den opdeles.',
      smsUnicode: 'Én emoji eller ét ikke-GSM-tegn skifter hele beskeden til Unicode.',
    },
    rulesHeading: 'Trunkeringsregler, platform for platform',
    rules: {
      linkedin: 'LinkedIn tillader {limit} tegn pr. opslag, men folder feedvisningen efter cirka {mobile} tegn på mobil og {desktop} på desktop — resten gemmes bag “…se mere”. Linjeskift tæller med, og den første sætning bærer næsten alle klik: sæt krogen forrest og links under folden.',
      twitter: 'X håndhæver et hårdt loft på {limit} tegn pr. opslag og viser slet ingen fold. Hver URL pakkes ind af t.co-forkorteren og koster altid {url} tegn uanset den reelle længde, og mange emojis vejer som to tegn. Længere udkast skal opdeles i en tråd — PostTruncate gør det automatisk ved ordgrænser.',
      threads: 'Threads tillader {limit} tegn pr. opslag og tæller — i modsætning til X — links i deres fulde længde. På mobil folder feedet lange opslag ved cirka {mobile} tegn. Alt over loftet skal fortsætte som nummererede svar kædet under det første opslag.',
      instagram: 'Instagram-billedtekster kan være op til {limit} tegn, men feedet viser kun cirka de første {mobile} før “mere”-linket. For hashtags er ~{hashtags} det anbefalede ideal — flere postes stadig, men ligner spam. Den hårde grænse er {hashtagMax} (billedtekst plus første kommentar); derover kan opslaget ikke publiceres.',
      facebook: 'Facebooks tekniske loft er {limit} tegn, men feedopslag klapper sammen bag “Se mere” ved cirka {mobile} tegn på mobil og {desktop} på desktop. Engagementet styrtdykker ved lange ubrudte blokke — den praktiske grænse er folden, ikke loftet.',
      sms: 'En enkelt SMS rummer {gsmSingle} tegn i GSM 7-bit-kodning og falder til {gsmMulti} pr. segment, når beskeden opdeles. Enhver emoji eller ethvert ikke-GSM-tegn skifter hele beskeden til Unicode — {uniSingle} tegn pr. enkelt besked, {uniMulti} pr. segment — og nogle GSM-symboler (€, kantede parenteser, lodret streg) tæller som to.',
      tiktok: 'TikTok tillader {limit} tegn pr. billedtekst ved native opslag, men API og planlæggere sætter grænsen ved {safe}; emoji og hashtags tæller fuldt med. Fordi videoen fylder skærmen, folder feedet billedteksten bag “…mere” ved det første linjeskift eller omkring {fold} tegn — alt efter hvad der kommer først — så den første linje er alt, de fleste seere læser. Videoformatet er fuldskærm lodret 9:16 (1080×1920).',
    },
  },

  footer: {
    homeAria: 'PostTruncate hjem',
    tag: 'Se præcis hvor hver platform klipper din tekst over — før du poster.',
    columns: {
      tool: {
        title: 'Værktøj',
        links: [
          'Teksteditor',
          'Live-previews',
          'Trådopdeler',
          'Unicode-renser',
          'Indlejrings-widget',
        ],
      },
      platforms: {
        title: 'Platforme',
        links: ['LinkedIn', 'X / Twitter', 'Threads', 'Instagram', 'Facebook'],
      },
      learn: {
        title: 'Lær',
        links: [
          'Tegngrænser',
          'FAQ',
          'Skrivning af hooks',
          'Tilgængelighed',
        ],
      },
      legal: {
        title: 'Juridisk',
        links: ['Privatliv', 'Vilkår', 'Om', 'Kontakt'],
      },
      guides: {
        title: 'Platformguider',
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
    copyright: '© {year} PostTruncate. Bygget til kreative overalt.',
    disclaimer:
      'Ikke tilknyttet LinkedIn, X, Meta eller Instagram. Grænser er estimater og kan ændre sig.',
  },

  pages: {
    common: {
      lastUpdated: 'Sidst opdateret: {date}',
      lastUpdatedDate: '1. juni 2026',
      backHome: '← Tilbage til editoren',
    },

    privacy: {
      title: 'Privatlivspolitik',
      description:
        'Sådan håndterer PostTruncate dine data: din tekst forlader aldrig din browser, der er ingen konti, og intet du skriver bliver uploadet eller gemt.',
      intro:
        'PostTruncate er bygget med privatliv først. Alt du skriver, kører lokalt i din browser — dit udkast bliver aldrig uploadet, gemt eller set af os. Denne politik forklarer præcis, hvad det betyder, og de få begrænsede tilfælde, hvor tredjeparter er involveret.',
      sections: [
        {
          heading: 'Din tekst bliver på din enhed',
          paragraphs: [
            'Editoren, hvert platforms-preview, trådopdeleren og Unicode-renseren kører alle udelukkende i <strong>din browser</strong>. Teksten, du skriver eller indsætter, behandles på din egen enhed og bliver <strong>aldrig sendt til vores servere</strong> — faktisk har PostTruncate ingen indholdsserver at sende den til. Når du lukker fanen, er dit udkast væk, medmindre din browser vælger at gemme det lokalt.',
            'Fordi intet uploades, kan vi ikke læse, gemme, sælge eller dele det, du skriver. Der er <strong>ingen konto, ingen tilmelding og intet login</strong>, så vi beder aldrig om dit navn, din e-mail eller nogen personlige oplysninger for at bruge værktøjet.',
          ],
        },
        {
          heading: 'Hvad vi gemmer lokalt',
          paragraphs: [
            'Et lille antal indstillinger gemmes i din browsers <strong>localStorage</strong>, så siden husker, hvordan du foretrækker den — nærmere bestemt dit valgte tema (lyst eller mørkt) og dit foretrukne sprog. Disse værdier lever kun på din enhed, kan kun læses af PostTruncate og når aldrig frem til os. Du kan rydde dem når som helst via din browsers indstillinger.',
          ],
        },
        {
          heading: 'Annoncering',
          paragraphs: [
            'PostTruncate finansieres af diskrete annoncer vist i faste, reserverede felter, der aldrig forskyder layoutet, mens du arbejder. Hvis der bruges tredjeparts-annoncepartnere, kan de sætte deres egne cookies eller bruge enheds-id’er til at vise relevante annoncer, underlagt deres egne privatlivspolitikker. Disse partnere modtager aldrig indholdet af dit udkast, fordi det indhold aldrig forlader din browser.',
          ],
        },
        {
          heading: 'Kontaktformularen',
          paragraphs: [
            'Den eneste funktion, der sender data væk fra din enhed, er <strong>kontaktformularen</strong>. Når du vælger at sende os en besked, leveres det navn, den e-mail og den besked, du indtaster, til os gennem en tredjeparts-formulartjeneste, så vi kan læse og svare. Vi bruger udelukkende disse oplysninger til at svare dig og bruger dem ikke til markedsføring. Hvis du hellere vil undgå en tredjepart, kan du i stedet sende os en e-mail direkte.',
          ],
        },
        {
          heading: 'Ændringer & kontakt',
          paragraphs: [
            'Vi kan opdatere denne politik, efterhånden som produktet udvikler sig; “sidst opdateret”-datoen ovenfor afspejler altid den aktuelle version. Hvis du har spørgsmål om privatliv, så skriv til os på <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    terms: {
      title: 'Vilkår & betingelser',
      description:
        'Brugsvilkårene for PostTruncate: et gratis værktøj leveret som det er, hvis platformsgrænser er estimater, leveret uden garanti og ikke tilknyttet noget socialt netværk.',
      intro:
        'Ved at bruge PostTruncate accepterer du disse vilkår. De er bevidst korte og enkle — værktøjet er gratis, kører i din browser og leveres som det er.',
      sections: [
        {
          heading: 'Brug af tjenesten',
          paragraphs: [
            'PostTruncate er et gratis værktøj til at forhåndsvise og optimere opslag på sociale medier. Du må bruge det til ethvert lovligt formål. Du accepterer <strong>ikke at misbruge tjenesten</strong> — for eksempel ved at forsøge at forstyrre den, omgå dens beskyttelser eller bruge den til at bryde loven eller krænke andres rettigheder.',
          ],
        },
        {
          heading: 'Estimater, ikke garantier',
          paragraphs: [
            'De tegngrænser, foldpunkter og formateringsregler, der vises her, er baseret på hver platforms offentliggjorte og bredt observerede adfærd. Platforme <strong>ændrer disse grænser uden varsel</strong>, og gengivelsen varierer fra enhed til enhed og fra appversion til appversion. Betragt hvert preview og hver optælling som et tæt estimat, ikke en pixelperfekt garanti. Du er selv ansvarlig for at gennemgå dine egne opslag, før du publicerer dem.',
          ],
        },
        {
          heading: 'Ingen tilknytning',
          paragraphs: [
            'PostTruncate er et uafhængigt værktøj og er <strong>ikke tilknyttet, godkendt af eller sponsoreret af</strong> LinkedIn, X (Twitter), Meta, Instagram, Facebook eller Threads. Alle produktnavne, logoer og varemærker tilhører deres respektive ejere og bruges her kun til at beskrive hver platforms adfærd.',
          ],
        },
        {
          heading: 'Leveret “som det er”',
          paragraphs: [
            'Tjenesten leveres <strong>“som den er” og “som tilgængelig”, uden nogen form for garanti</strong>, hverken udtrykkelig eller underforstået. I videst muligt omfang tilladt af loven er vi ikke ansvarlige for tab eller skade, der opstår som følge af din brug af — eller manglende evne til at bruge — værktøjet, herunder beslutninger, du træffer på baggrund af dets previews eller optællinger.',
          ],
        },
        {
          heading: 'Ændringer af disse vilkår',
          paragraphs: [
            'Vi kan revidere disse vilkår fra tid til anden; “sidst opdateret”-datoen ovenfor afspejler den aktuelle version, og fortsat brug af værktøjet betyder, at du accepterer de seneste vilkår. Spørgsmål? Skriv til <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    about: {
      title: 'Om PostTruncate',
      description:
        'PostTruncate er et gratis, privatlivsorienteret værktøj, der viser skabere præcis, hvor enhver social platform afskærer deres tekst — inden de trykker på del.',
      intro:
        'PostTruncate eksisterer af én grund: den første linje i dit opslag er den eneste linje, de fleste læser, og enhver platform afskærer den et andet sted. Vi gør de usynlige grænser synlige.',
      sections: [
        {
          heading: 'Hvad det gør',
          paragraphs: [
            'Skriv eller indsæt et udkast én gang, og PostTruncate gengiver det, som <strong>LinkedIn, X, Threads, Instagram og Facebook</strong> rent faktisk vil — \u201e\u2026se mere\u201c-folden, trådopdelingen ved 280 tegn, link-vægtningen på 23 tegn, det anbefalede niveau på ~5 hashtags og den hårde grænse på 30. Du ser præcis, hvad der overlever over folden, før du forpligter dig til at publicere.',
            'Det fanger også de stille problemer, der skrumper din rækkevidde: usynlige nul-bredde-tegn, der bryder tæller og skærmlæsere, og pseudo-Unicode-\u201esmarte skrifttyper\u201c, der ser stilede ud, men er ulæselige for hjælpeteknologi.',
          ],
        },
        {
          heading: 'Hvorfor jeg byggede det',
          paragraphs: [
            'Jeg er Anirudha, en solo-udvikler fra Indien med en MCA fra Dibrugarh University, Assam. Som de fleste, der poster regelmæssigt, blev jeg træt af at opdage efter publicering, at halvdelen af mit LinkedIn-opslag var skjult bag \u201ese mere\u201c, eller at et tweet, jeg troede passede, lydløst var splittet til en tråd.',
            'De fleste tegnoptællere giver dig ét tal. Skabere har brug for mere — de skal vide præcis, hvor teksten skæres i hvert netværk, for det er der, krogen lever eller dør. Så jeg byggede ét arbejdsrum, der simulerer hver platform på én gang, kører øjeblikkeligt og respekterer dit privatliv fuldt ud.',
          ],
        },
        {
          heading: 'Sådan forbliver det præcist',
          paragraphs: [
            'Platformgrænser ændrer sig uden meget varsel. Jeg tjekker dem mod, hvordan hver platform faktisk gengiver opslag, og opdaterer guiderne her, når noget ændrer sig. Fandt noget forældet? <a href="../contact/"><strong>Kontaktsiden</strong></a> går direkte til mig.',
          ],
        },
        {
          heading: 'Bygget med privatlivets fred i fokus',
          paragraphs: [
            'Alt kører i din browser. Din tekst uploades aldrig, der er ingen konti, og værktøjet er gratis at bruge. Det er understøttet af diskrete annoncer i reserverede pladser, der aldrig forskyver layoutet. Læs de fulde detaljer i vores <a href="../privacy/"><strong>Privatlivspolitik</strong></a>.',
          ],
        },
      ],
    },

    contact: {
      title: 'Kontakt os',
      description:
        'Kom i kontakt med PostTruncate-teamet — send os en besked eller skriv direkte til os med feedback, fejlrapporter eller spørgsmål.',
      intro:
        'Har du fundet en fejl, opdaget en platformsgrænse, der har flyttet sig, eller har du en idé til at gøre PostTruncate bedre? Vi vil meget gerne høre fra dig.',
      form: {
        name: 'Dit navn',
        email: 'Din e-mail',
        subject: 'Emne',
        message: 'Besked',
        submit: 'Send besked',
        sending: 'Sender…',
        success: 'Tak — din besked er på vej. Vi vender tilbage til dig snart.',
        error:
          'Noget gik galt under afsendelsen af din besked. Prøv igen, eller skriv direkte til os.',
      },
      altHeading: 'Foretrækker du e-mail?',
      altBody:
        'Du kan altid nå os på {email}. Vi læser hver besked og svarer så hurtigt, vi kan.',
    },
  },

  embedWidget: {
    title: 'Gratis tegntæller-widget til indlejring — PostTruncate',
    description:
      'Tilføj en gratis live-tegntæller til enhver blog eller hjemmeside med én linje HTML. Sporer grænser for X, LinkedIn, Threads, Instagram og SMS.',
    eyebrow: 'Gratis indlejring',
    heading: 'Indlejr en live-tegntæller på dit websted',
    lede:
      'Indsæt én linje HTML for at tilføje en tegntæller i realtid til enhver side. Den tæller tegn og ord og sporer grænser for X, LinkedIn, Threads, Instagram og SMS — uden at forlade dit websted.',
    previewLabel: 'Live-forhåndsvisning',
    copyButton: 'Kopiér indlejringskode',
    copiedButton: 'Kopieret!',
    codeLabel: 'Indlejringskode',
    audienceHeading: 'Hvem er det til?',
    forBloggers:
      'Bloggere og indholdsskabere kan tilføje en live-tegntæller direkte på deres skriveside, så læserne kan tjekke platformsgrænser uden at skifte fane.',
    forEducators:
      'Undervisere og kursusforfattere kan indlejre tælleren i en lektion, så eleverne kan øve sig i at skrive inden for længdebegrænsninger.',
    forDevelopers:
      "Udviklere kan indsætte widget'en i et hvilket som helst CMS, dokumentationsside eller internt værktøj med en enkelt <iframe> — ingen API-nøgle, konto eller build-trin kræves.",
    homepageLinkLabel: 'Indlejr på dit websted →',
  },

  errors: {
    notFound: {
      code: '404',
      title: 'Siden blev ikke fundet',
      description:
        'Siden, du leder efter, findes ikke. Vend tilbage til PostTruncate-editoren.',
      heading: 'Denne side blev afkortet',
      body: 'Siden, du leder efter, findes ikke, er flyttet eller har aldrig eksisteret. Editoren er stadig præcis, hvor du forlod den.',
      cta: 'Tilbage til editoren',
    },
    serverError: {
      code: '500',
      title: 'Noget gik galt',
      description:
        'Der opstod en uventet fejl. Vend tilbage til PostTruncate-editoren, og prøv igen.',
      heading: 'Noget gik galt i vores ende',
      body: 'Det er en serverfejl, ikke din. Prøv igen om et øjeblik — editoren kører helt i din browser, så din tekst er sikker under alle omstændigheder.',
      cta: 'Tilbage til editoren',
    },
  },


  banner: {
    text: 'Din {platform}-forhåndsvisning er nedenfor',
    close: 'Luk',
  },

  whyPostTruncate: {
    eyebrow: 'HVORFOR POSTTRUNCATE?',
    title: 'Skriv med selvtillid.<br/>Udgiv uden bekymringer.',
    p1: 'Hver platform har forskellige tegngrænser og afkortningsregler. PostTruncate viser dig præcis, hvordan dit indhold vil se ud, før du trykker på udgiv.',
    p2: 'Spar tid, øg engagementet og få hvert tegn til at tælle med forhåndsvisninger i realtid, smart indsigt og ét-klik AI-tonomskrivning.',
    features: {
      realTime: {
        title: 'Forhåndsvisninger i realtid',
        desc: 'Se øjeblikkeligt præcis, hvordan dit opslag vil se ud på tværs af mere end 6 platforme.',
      },
      insights: {
        title: 'Smart indsigt',
        desc: 'Få læsbarhedsscore, søgeordsanalyse og tips til indholdsoptimering.',
      },
      privacy: {
        title: 'Privatliv først',
        desc: 'Dit indhold bliver aldrig gemt eller delt. Alt forbliver privat.',
      },
      aiTone: {
        title: 'AI-tonomskriver',
        desc: 'Omskriv øjeblikkeligt dit opslag i en professionel, afslappet, venlig eller kortfattet tone med ét klik — drevet af AI.',
      },
    },
  },

  howTruncationWorks: {
    eyebrow: 'HVORDAN AFKORTNING VIRKER',
    description: 'Hver platform har unikke tegngrænser og visningsregler. Når dit indhold overstiger disse grænser, afkortes det med "..." eller "Se mere". PostTruncate simulerer præcis, hvordan dit opslag vil se ud.',
    platforms: {
      linkedin: { name: 'LinkedIn', desc: 'Viser ~220 tegn før "...se mere"' },
      twitter: { name: 'X (Twitter)', desc: 'Viser ~125 tegn før afkortning (varierer efter enhed)' },
      instagram: { name: 'Instagram', desc: 'Viser ~125 tegn, tryk på "mere" for at udvide' },
      facebook: { name: 'Facebook', desc: 'Viser ~160 tegn før "...se mere"' },
      threads: { name: 'Threads', desc: 'Svarer til Instagram med ~125 tegn før afkortning' },
      tiktok: { name: 'TikTok', desc: 'Foldes ved ~100 tegn eller det første linjeskift' },
      sms: { name: 'SMS (GSM)', desc: '160 tegn pr. SMS til GSM, 70 til Unicode' },
    },
  },

  platformCharacterLimits: {
    eyebrow: "TEGNGRÆNSER PÅ PLATFORME",
    headers: {
      platform: "Platform",
      characterLimit: "Tegngrænse",
      shownInFeed: "Vises i feed",
      bestPractice: "Bedste praksis",
      notes: "Noter"
    },
    viewAll: "Se alle platformes grænser",
    platforms: {
      linkedin: {
        name: "LinkedIn",
        limit: "3,000",
        shown: "~220 tegn",
        bestPractice: "Hold hovedbudskabet tidligt",
        notes: "Artikler understøtter op til 125.000 tegn"
      },
      twitter: {
        name: "X (Twitter)",
        limit: "280",
        shown: "~125 tegn",
        bestPractice: "Placer vigtig info først",
        notes: "Links reducerer de tilgængelige tegn"
      },
      instagram: {
        name: "Instagram-billedtekst",
        limit: "2,200",
        shown: "~125 tegn",
        bestPractice: "Fang opmærksomheden tidligt, tilføj CTA",
        notes: "Hashtags tæller med i grænsen"
      },
      facebook: {
        name: "Facebook-opslag",
        limit: "63,206",
        shown: "~160 tegn",
        bestPractice: "Hold det kort",
        notes: "Billeder og links påvirker visningen"
      },
      threads: {
        name: "Threads",
        limit: "500",
        shown: "~125 tegn",
        bestPractice: "Kort & engagerende",
        notes: "Metas tekstbaserede platform"
      },
      tiktok: {
        name: "TikTok",
        limit: "4,000",
        shown: "~100 tegn",
        bestPractice: "Krog på den første linje",
        notes: "Emoji og hashtags tæller med; foldes ved det første linjeskift"
      },
      sms: {
        name: "SMS (GSM)",
        limit: "160",
        shown: "160 pr. SMS",
        bestPractice: "Hold under 160",
        notes: "Længere tekster opdeles i flere SMS'er"
      }
    }
  },

  whoIsItFor: {
      eyebrow: "HVEM ER DET TIL?",
      title: "Perfekt til enhver indholdsskaber",
      roles: {
          marketers: {
              title: "Markedsførere",
              desc: "Optimer kampagner, annoncetekster og sociale opslag for maksimal rækkevidde og engagement."
          },
          creators: {
              title: "Skabere",
              desc: "Skriv bedre billedtekster og tråde, der får flere likes, delinger og gemmer."
          },
          agencies: {
              title: "Bureauer",
              desc: "Administrer flere kunder og sørg for, at hvert opslag er perfekt optimeret."
          },
          founders: {
              title: "Stiftere",
              desc: "Del opdateringer og opbyg dit brand med klart, virkningsfuldt indhold."
          }
      }
  },

  ctaBanner: {
    title: 'Klar til at optimere dit indhold?',
    body: 'Bliv en del af tusindvis af skabere og marketingfolk, der skriver bedre, poster smartere og får mere engagement.',
    cta: 'Begynd at skrive gratis',
    noCard: 'Intet kreditkort påkrævet',
    free: 'Gratis for altid',
  },

  island: {
    adPreviews: {
      editorLabel: 'Opret din annonce',
      fields: {
        headline: 'Overskrift',
        primary: 'Primær tekst',
        description: 'Beskrivelse',
        headlineN: 'Overskrift {n}',
      },
      placeholders: {
        headline: 'Din overskrift',
        primary: 'Skriv din primære tekst…',
        description: 'Tilføj en kort beskrivelse',
      },
      counter: '{n} / {limit}',
      over: '{n} for meget',
      previewLabel: 'Live forhåndsvisning',
      deviceAria: 'Vælg forhåndsvisningsenhed',
      mobile: 'Mobil',
      desktop: 'Desktop',
      modeAria: 'Vælg placering',
      feed: 'Feed',
      reels: 'Reels',
      safeZoneLabel: 'Sikre zoner',
      safeZoneHint: 'Skraverede bånd viser, hvor brugerfladen dækker dit kreative. Hold vigtig tekst uden for dem.',
      safeZoneTag: 'Sikker zone',
      reelsTooShort: 'Sigt efter {min}–{max} tegn, så billedteksten læses rent over videoen.',
      media: {
        add: 'Tilføj medie',
        replace: 'Erstat medie',
        remove: 'Fjern medie',
        hint: 'Forhåndsvises kun i din browser — uploades eller gemmes aldrig.',
      },
      badgeFits: 'Passer',
      badgeTruncated: 'Afskåret',
      sponsored: 'Sponsoreret',
      googleAdLabel: 'Sponsoreret',
      finalUrl: 'Endelig URL',
      pathN: 'Sti {n}',
      displayLink: 'Vist link / Destinations-URL',
      callToAction: 'Handlingsopfordring',
      adLabel: 'Annonce',
      fbHeadlineSqueezed: 'Overskrift på over {limit} tegn på mobil — linkbeskrivelsen skjules.',
      googleHeadlinesDropped: {
        one: '{n} overskrift fjernet — den samlede bredde overstiger annoncepladsen på {px} px på computer.',
        other: '{n} overskrifter fjernet — den samlede bredde overstiger annoncepladsen på {px} px på computer.',
      },
      cta: {
        'Shop Now': 'Køb nu',
        'Learn More': 'Få mere at vide',
        'Sign Up': 'Tilmeld dig',
        'Download': 'Download',
        'Book Now': 'Book nu',
        'Contact Us': 'Kontakt os',
        'Subscribe': 'Abonner',
        'Get Offer': 'Få tilbud',
        'Apply Now': 'Ansøg nu',
        'Send Message': 'Send besked',
        'Order Now': 'Bestil nu',
        'Watch Now': 'Se nu',
      },
    },
    dashboard: {
      loadSample: 'Indlæs et eksempelopslag',
      sample:
        'Vi lancerede en lillebitte funktion i sidste uge, der i det stille fordoblede vores trial-til-betalende-rate.\n\n' +
        'Ingen ny prissætning. Intet vækst-hack. Bare én ændring i onboarding-flowet, der fjernede en enkelt beslutning fra den første skærm.\n\n' +
        'Her er præcis hvad vi ændrede, og de tre ting vi målte, før vi rullede det ud til alle → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
      samples: {
        linkedin:
          'Vi lancerede en lillebitte funktion i sidste uge, der i det stille fordoblede vores trial-til-betalende-rate.\n\n' +
          'Ingen ny prissætning. Intet vækst-hack. Bare én ændring i onboarding-flowet, der fjernede en enkelt beslutning fra den første skærm.\n\n' +
          'Her er præcis hvad vi ændrede, og de tre ting vi målte, før vi rullede det ud til alle → https://posttruncate.com/blog/onboarding\n\n' +
          '#saas #productled #growth #startups',
        twitter:
          'Vi lavede én lille onboarding-ændring i sidste uge, og vores trial-til-betalende-rate blev fordoblet.\n\n' +
          'Ingen ny prissætning. Intet vækst-hack. Bare én beslutning mindre på den første skærm.\n\n' +
          'Hele gennemgangen → https://posttruncate.com/blog/onboarding\n\n' +
          '#buildinpublic #saas',
        instagram:
          'Én lille ændring. Dobbelt så gode resultater. 🚀\n\n' +
          'I sidste uge fjernede vi en enkelt beslutning fra vores onboarding-flow — og så vores trial-til-betalende-rate blive fordoblet. Ingen ny prissætning, ingen tricks. ✨\n\n' +
          'Hele gennemgangen af hvad vi ændrede (og de 3 ting vi målte) finder du i vores bio. 👀\n\n' +
          '.\n.\n.\n' +
          '#saas #startup #produktdesign #onboarding #vækst #buildinpublic #iværksætter #techstartup',
        facebook:
          'En hurtig historie fra sidste uge 👇\n\n' +
          'Vi lavede en lille ændring i vores onboarding — fjernede bare en enkelt beslutning fra den allerførste skærm — og vores trial-til-betalende-rate blev fordoblet. Ingen ny prissætning, intet avanceret vækst-hack.\n\n' +
          'Vi skrev præcis hvad vi ændrede, og de tre ting vi målte, før vi rullede det ud. Læs med, og fortæl os hvad du synes → https://posttruncate.com/blog/onboarding',
        threads:
          'ok det her er ret vildt — i sidste uge fjernede vi ÉN beslutning fra den første skærm i vores onboarding, og trial-til-betalende blev bogstaveligt talt fordoblet.\n\n' +
          'ingen ny prissætning. intet vækst-hack. bare mindre friktion.\n\n' +
          'er der andre, der har set så store resultater af så lille en ændring?',
        sms:
          'Hej! Kort og godt — den onboarding-justering vi lancerede i sidste uge fordoblede vores trial-til-betalende-rate. Vi skrev hvad der ændrede sig + de 3 ting vi målte: https://posttruncate.com/blog/onboarding',
        tiktok:
          'en lille onboarding-ændring fordoblede vores trial-til-betalt-rate 🤯\n\ningen nye priser, intet growth hack — vi fjernede bare én beslutning fra den allerførste skærm. hele gennemgangen af, hvad vi ændrede, og de 3 ting, vi målte, er i vores bio 👀\n\n#saas #startup #buildinpublic #growthtips #producttok',
      },
    },
    workspace: {
      eyebrow: 'Arbejdsområde',
      title: 'Skriv dit opslag',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} skjult tegn', other: '{n} skjulte tegn' },
      placeholder: 'Begynd at skrive dit opslag. Indsæt et udkast, smid et par links og hashtags ind, og se hver platforms preview opdatere til højre…',
      placeholders: {
        linkedin: "Begynd at skrive dit indlæg. Indsæt en kladde, tilføj et par links og hashtags, og se din live forhåndsvisning opdatere i LinkedIn til højre...",
        facebook: "Begynd at skrive dit indlæg. Indsæt en kladde, tilføj et par links og hashtags, og se din live forhåndsvisning opdatere i Facebook til højre...",
        instagram: "Begynd at skrive dit indlæg. Indsæt en kladde, tilføj et par links og hashtags, og se din live forhåndsvisning opdatere i Instagram til højre...",
        twitter: "Begynd at skrive dit indlæg. Indsæt en kladde, tilføj et par links og hashtags, og se din live forhåndsvisning opdatere i X (Twitter) til højre...",
        threads: "Begynd at skrive dit indlæg. Indsæt en kladde, tilføj et par links og hashtags, og se din live forhåndsvisning opdatere i Threads til højre...",
        sms: "Begynd at skrive dit indlæg. Indsæt en kladde, tilføj et par links og hashtags, og se din live forhåndsvisning opdatere i SMS til højre...",
        tiktok: 'Begynd at skrive din billedtekst. Start med din krog, tilføj et par hashtags, og se din TikTok-forhåndsvisning opdatere over en 9:16-reel til højre…',
      },
      counters: {
        characters: 'Tegn',
        words: 'Ord',
        lines: 'Linjer',
        paragraphs: 'Afsnit',
      },
      timers: {
        reading: 'Læsning',
        speaking: 'Tale',
        lessThan30Sec: '< 30 sek.',
        minute: { one: 'min.', other: 'min.' },
        second: { one: 'sek.', other: 'sek.' },
      },
      formatterLabel: 'Formatværktøjer',
      uppercase: 'STORE BOGSTAVER',
      lowercase: 'små bogstaver',
      titleCase: 'Titelcase',
      sentenceCase: 'Sætningscase',
      emojiStripper: 'Fjern emojis',
      hashtagExtractor: 'Udtræk hashtags',
      engineLabel: 'Optimeringsmotor',
      clean: 'Fjern overflødige mellemrum',
      sanitize: 'Rens tekst',
      clear: 'Ryd editor',
      hiddenWarning:
        'Fandt usynlige tegn, der bryder tællinger og skærmlæsere: {codes}. Rens for at fjerne dem.',
      statusLine: 'Realtidsanalyse er slået til',
    },
    imageUpload: {
      add: 'Tilføj medie',
      replace: 'Erstat medie',
      remove: 'Fjern medie',
      hint: 'Kun forhåndsvisning — uploades eller gemmes aldrig. Ryddes ved genindlæsning.',
    },
    linkDisplay: {
      plainText: 'Links i teksten kan ikke klikkes her – de vises som almindelig tekst.',
      previewCard: 'Dette link genererer et forhåndsvisningskort.',
      previewCardFirstUrl: 'Det første link bliver til forhåndsvisningskortet.',
      clickableInline: 'Dette link forbliver klikbart i teksten.',
      countedShortened: 'Hvert link tæller som {weight} tegn.',
      bioLinkAllowance: 'Der tillades op til {n} klikbare links i din bio.',
      adNoClickableLink:
        'Annoncetekster i feedet indeholder ikke et klikbart link – CTA-knappen står for klikket.',
    },
    linkCard: {
      editorHeading: 'Link-forhåndsvisningskort',
      titleLabel: 'Korttitel',
      descriptionLabel: 'Kortbeskrivelse',
      titlePlaceholder: 'Tilføj en titel til dit link',
      descriptionPlaceholder: 'Tilføj en beskrivelse til dit link',
      cardAria: 'Linkforhåndsvisning: {title} — {domain}',
      imageAlt: 'Link-forhåndsvisningsbillede',
      firstUrlNote: 'Det første link i dit opslag bliver til forhåndsvisningskortet.',
      imageAdd: 'Tilføj demobillede',
      imageReplace: 'Erstat demobillede',
      imageRemove: 'Fjern demobillede',
    },
    share: {
      button: 'Del',
      success: 'Link kopieret til udklipsholder',
      error: 'Kunne ikke kopiere automatisk – kopiér linket nedenfor',
      tooLarge: 'Dette indhold er for langt til at dele som et link',
      manualLabel: 'Kopiér dette link',
      mediaNote: 'Kun din tekst deles – medier er ikke inkluderet.',
    },
    aiImprove: {
      button: 'AI-forbedring',
      pickTone: 'Forbedr med AI',
      pickToneSub: 'Vælg en tone — AI omskriver dit opslag.',
      tones: {
        professional: 'Professionel',
        casual: 'Afslappet',
        marketing: 'Marketing',
        friendly: 'Venlig',
        concise: 'Kortfattet',
      },
      cancel: 'Annuller',
      improving: 'Forbedrer dit opslag…',
      undo: 'Fortryd',
      reverted: 'Din oprindelige tekst er gendannet.',
      remaining: {
        one: '{n} af {max} AI-forbedring tilbage',
        other: '{n} af {max} AI-forbedringer tilbage',
      },
      limitReached: 'Du har brugt alle dine AI-forbedringer. Prøv igen om {time}.',
      errorGeneric: 'Teksten kunne ikke forbedres. Prøv igen.',
      errorEmpty: 'Skriv noget først.',
      errorTooLong: 'Teksten er for lang til AI-forbedring (maks. {max} tegn).',
      errorUnavailable: 'AI-forbedring er midlertidigt utilgængelig.',
    },
    previewPanel: {
      title: 'Live platform-forhåndsvisning',
      tabAria: '{platform}-forhåndsvisning',
      compareAll: 'Sammenlign alle',
      showHidden: 'Vis skjult tekst',
    },
    insights: {
      title: 'Avanceret indsigt',
      sub: 'Skriveanalyse, læsbarhed, nøgleord og mere',
      subScoped: 'Læsbarhed, Søgeordstæthed',
    },
    hookStrip: {
      heading: 'Se hvordan dit opslag klarer sig overalt',
      viewAll: 'Se alle platformgrænser',
      limitLabel: '{n} grænse',
      perSms: '{n} pr. sms',
      survives: 'Hooket overlever',
      cut: 'Hooket skæres af',
      risk: 'Hooket i fare',
      smsNeeded: '{n} sms’er kræves',
      chars: '{n} tegn',
    },
    common: {
      displayName: 'Dit navn',
      handle: 'dig',
      timestamp: '11 t.',
      charsSuffix: '{n} tegn',
      actions: {
        like: 'Synes godt om',
        comment: 'Kommentér',
        share: 'Del',
        repost: 'Del',
        send: 'Send',
      },
    },
    sms: {
      placeholder: 'Skriv eller indsæt din SMS-besked her – du ser dens kodning (GSM-7 eller Unicode), tegnantallet i realtid, og hvor mange segmenter den sender.',
      eyebrow: 'SMS',
      title: 'Global tegntæller',
      characterCount: 'Antal tegn',
      charactersLeft: 'Tegn tilbage',
      parts: 'Beskeder',
      encoding: 'Kodning',
      encodingGsm: 'GSM 7-bit',
      encodingUnicode: 'Unicode',
      partsValue: '{n} beskeder',
      gsmNote:
        'GSM 7-bit: 160 tegn for én SMS, derefter 153 pr. sammenkædet SMS. Tegn fra udvidelsestabellen som €, [, ], {, }, \\ og | tæller som 2.',
      unicodeNote:
        'Unicode UTF-16: 70 tegn for én SMS, derefter 67 pr. sammenkædet SMS. Det gælder, når der findes en emoji eller et ikke-GSM-skrifttegn.',
    },
    linkedin: {
      title: 'Preview af hook-zonen',
      viewAriaLabel: 'LinkedIn fold-visning',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobil',
      badgeTruncated: 'Afkortet feed-tekst',
      badgeOverLimit: 'Over opslagets grænse',
      badgeSafe: 'Sikker hook-linje',
      beforeFold: '{total} / {limit} før folden',
      postLimit: '{total} / {limit} opslagets grænse',
      seeMore: '…se mere',
      headline: 'Stifter & CEO',
      connectionDegree: '3.',
      placeholder: 'Dit opslags indledende linjer vises her…',
      overLimitNote:
        'LinkedIn-opslag er begrænset til {limit} tegn. Forkort med {excess} før udgivelse.',
      truncatedNote:
        'Læserne ser kun de første {limit} tegn i feedet. Læg din hook forrest, før folden.',
      safeNote:
        'Hele dit opslag passer over LinkedIns {view}-fold — ingen "…se mere"-afkortning.',
    },
    twitter: {
      title: 'Trådopdeler',
      badgeIdle: 'Inaktiv',
      badgeThread: 'Tråd med {n} tweets',
      badgeSingle: 'Enkelt tweet',
      links: {
        one: '{n} link · tæller som {weight} hver',
        other: '{n} links · tæller som {weight} hver',
      },
      weightedLength: 'Vægtet længde',
      placeholder:
        'Dit tweet-preview vises her. Gå forbi {limit} tegn, og det opdeles automatisk i en tråd.',
    },
    threads: {
      title: 'Preview af opslag & kæde',
      badgeIdle: 'Inaktiv',
      badgeThread: 'Kæde med {n} opslag',
      badgeSingle: 'Enkelt opslag',
      links: {
        one: '{n} link · tæller fuldt ud',
        other: '{n} links · tæller fuldt ud',
      },
      charLength: 'Tegnlængde',
      placeholder:
        'Dit Threads-preview vises her. Gå forbi {limit} tegn, og det kædes sammen i en nummereret opslagssekvens.',
    },
    tiktok: {
      title: 'TikTok-forhåndsvisning',
      badgeIdle: 'Begynd at skrive',
      badgeSingle: 'Kan være i én billedtekst',
      badgeOverSafe: 'Over den sikre grænse',
      badgeOver: 'Over 4.000-grænsen',
      apiCapHint: 'Postes native, men TikToks API og planlæggere (Buffer, Hootsuite, Later) sætter grænsen for billedteksten ved {safe} tegn.',
      links: { one: '{n} link', other: '{n} links' },
      charLength: 'Billedtekst-længde',
      seeMore: '…mere',
      mediaHint: 'Tilføj en 9:16-video eller -billede',
      sound: 'original lyd · @{handle}',
      safeZones: 'Sikkerhedszoner',
      lineBreakHint: 'Et linjeskift udløser “…mere” tidligere',
      placeholder: 'Din forhåndsvisning af billedteksten vises her (op til {limit} tegn).',
    },
    meta: {
      title: 'Formateringsmonitor',
      badgeNeedsFix: 'Skal rettes',
      badgeClean: 'Ser rent ud',
      badgeCaptionOver: 'Billedtekst for lang',
      captionLimit: '{total} / {limit} billedtekstgrænse',
      captionOver:
        'Instagram-billedtekster er begrænset til {limit} tegn. Forkort med {excess} før udgivelse.',
      hashtagLabel: 'Hashtag-koncentration',
      over: 'Over Instagrams hårde grænse på {limit} hashtags — billedteksten kan ikke postes. Fjern {excess}.',
      approaching:
        '{n} hashtags — over de anbefalede {recommended}. Postes stadig (hård grænse {max}), men skær ned for mere rækkevidde.',
      within: 'Inden for de anbefalede {recommended} hashtags.',
      none: 'Ingen hashtags registreret endnu.',
      a11yLabel: 'Tilgængelighed · fancy skrifttyper',
      audiencePublic: 'Offentlig',
      likedBy: 'Synes godt om af {handle} og andre',
      viewAllComments: 'Se alle {n} kommentarer',
      commentsCount: '{n} kommentarer',
      sharesCount: '{n} delinger',
      repostsCount: '{n} reposts',
      repliesCount: '{n} svar',
      likesCount: '{n} Synes godt om',
      reelAudio: 'Original lyd',
      follow: 'Følg',
      reelAudioUses: '{n} brugere',
      subscribe: 'Abonner',
      fullscreen: 'Fuld skærm',
      flagged: '{n} markeret',
      flaggedNone: 'Ingen',
      fancyDetected: {
        one: 'Registrerede {n} pseudo-Unicode-“skrifttype”-tegn (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). De ser stiliserede ud, men skærmlæsere springer dem over eller staver dem — de skader rækkevidde og tilgængelighed.',
        other:
          'Registrerede {n} pseudo-Unicode-“skrifttype”-tegn (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). De ser stiliserede ud, men skærmlæsere springer dem over eller staver dem — de skader rækkevidde og tilgængelighed.',
      },
      fancyClean:
        'Ingen pseudo-skrifttype-tegn registreret. Din tekst læses rent på hjælpeteknologi.',
      footnote:
        '{n} tegn · Facebook-fold ≈ 480 · Instagram-billedtekstgrænse 2.200',
    },
    keywords: {
      eyebrow: 'Nøgleord',
      title: 'Overforbrugsmonitor',
      badgeIdle: 'Inaktiv',
      badgeStuffing: 'Nøgleordsspam',
      badgeBalanced: 'Balanceret',
      colKeyword: 'Nøgleord',
      colUses: 'Brug',
      colDensity: 'Tæthed',
      overused: 'Overforbrugt',
      empty: 'Begynd at skrive for at se dine mest brugte nøgleord og deres tæthed.',
      stuffingNote:
        'Fremhævede nøgleord overstiger {threshold}% tæthed — søgemaskiner kan læse det som nøgleordsspam. Varier dine ord.',
      footnote:
        '{total} ord · nøgleord over {threshold}% tæthed markeres',
    },
    seoPreview: {
      eyebrow: 'SEO-forhåndsvisning',
      title: 'Google SERP-simulator',
      badgeIdle: 'Inaktiv',
      badgeSafe: 'God',
      badgeWarn: 'Over grænsen',
      titleLabel: 'Sidetitel',
      titleCounter: '{n} / {limit}',
      pixelNote: '~{px}px · Google klipper ved ~{max}px',
      titleOverChar:
        'Titel overskrider {limit} tegn — Google kan afkorte i søgeresultater.',
      titleOverPixel:
        'Titel kan blive afkortet i søgeresultater (~{max}px renderingsgrænse).',
      descLabel: 'Metabeskrivelse',
      descCounter: '{n} / {limit}',
      descOverChar: 'Beskrivelse overskrider {limit} tegn.',
      previewLabel: 'Google-søgeforhåndsvisning',
      titlePlaceholder: 'Din sidetitel…',
      descPlaceholder: 'En kort beskrivelse af din side til søgeresultater…',
    },
    readability: {
      eyebrow: 'Læsbarhed',
      title: 'Flesch-læsbarhedsindeks',
      scoreLabel: 'Læsbarhed',
      gradeLabel: 'Klassetrin',
      descriptors: {
        veryEasy: 'Meget let',
        easy: 'Let',
        fairlyEasy: 'Temmelig let',
        standard: 'Standard',
        fairlyDifficult: 'Temmelig svær',
        difficult: 'Svær',
        veryDifficult: 'Meget svær',
      },
      tooltip:
        'Flesch-indekset vurderer tekst på en skala fra 0 til 100. Jo højere score, jo lettere er teksten at læse. Mellem 60 og 70 er standard prosa.',
      notApplicable:
        'Flesch-formlen er designet til tekster med latinsk skrift og gælder ikke for dette sprog. Brug ordtælling som dit primære mål for læsbarhed.',
    },
    toolLinks: {
      linkedin: 'Lær om LinkedIns tegngrænser →',
      twitter: 'Lær om X / Twitters tegngrænser →',
      instagram: 'Lær om Instagrams tegngrænser →',
      facebook: 'Lær om Facebooks tegngrænser →',
      threads: `Lær om Threads\' tegngrænser →`,
      tiktok: 'Læs om TikToks billedtekst-grænser →',
    },
    embed: {
      placeholder: 'Begynd at skrive for at tælle tegn…',
      charCount: 'Tegn',
      wordCount: 'Ord',
      remaining: '{n} tilbage',
      overLimit: '{n} for mange',
      platforms: {
        twitter: 'X / Twitter',
        linkedin: 'LinkedIn',
        threads: 'Threads',
        instagram: 'Instagram',
        sms: 'SMS',
      },
    },
    hook: {
      eyebrow: 'Hook-synlighed',
      title: 'Tjek over folden',
      statusPass: 'Hook bevares',
      statusWarn: 'CTA under folden',
      statusFail: 'Hook beskåret',
      statusIdle: 'Ingen tekst endnu',
      reasonEmpty: 'Tilføj tekst for at se, hvad der overlever folden.',
      reasonFits: 'Hele dit opslag er over folden — intet bliver skjult.',
      reasonHookCut: 'Din indledende hook bliver skåret af “…mere”-folden.',
      reasonCtaBelow: 'Din CTA havner under “…mere”-folden.',
      reasonHookOnly: 'Din hook er over folden; ingen CTA fundet.',
      reasonHookAndCta: 'Din hook og din CTA er begge over folden.',
      xReasonFits: 'Hele dit indlæg passer i et enkelt tweet.',
      xReasonHookCut: 'Din åbningskrog spildes over i et andet tweet.',
      xReasonCtaBelow: 'Din CTA vises i et trådet tweet.',
      xReasonHookOnly: 'Din krog passer i det første tweet; ingen CTA fundet.',
      xReasonHookAndCta: 'Både din krog og CTA passer i det første tweet.',
      foldLabel: 'fold',
      foldAria: 'Foldelinje — teksten nedenfor er skjult bag “…mere”.',
      summary: '{pass} af {total} platforme holder din hook synlig',
    },
    calculators: {
      wordsPerPage: {
        eyebrow: 'Ord til sider',
        title: 'Sidetal-beregner',
        badgeIdle: 'Indtast tekst',
        badgeResult: 'Anslået',
        modeAria: 'Vælg, hvordan du indtaster din tekst',
        modeText: 'Indsæt tekst',
        modeCount: 'Antal ord',
        placeholder: 'Indsæt eller skriv din tekst her for at tælle ordene…',
        wordsLabel: 'Antal ord',
        wordsPlaceholder: 'f.eks. 1500',
        fontSizeLabel: 'Skriftstørrelse',
        spacingLabel: 'Linjeafstand',
        spacingSingle: 'Enkelt',
        spacingOneAndHalf: '1,5 linjer',
        spacingDouble: 'Dobbelt',
        pagesLabel: 'Sider',
        wordsStatLabel: 'Ord',
        perPageNote: '{n} ord pr. side ved denne indstilling',
        referenceHeading: 'Almindelige ordtal',
        refWordsCol: 'Ord',
        refPagesCol: 'Sider',
        fontLabel: 'Skrifttype',
        pageFormatLabel: 'Sidestørrelse',
        marginsLabel: 'Margener',
        marginTop: 'Top',
        marginRight: 'Højre',
        marginBottom: 'Bund',
        marginLeft: 'Venstre',
        unitsLabel: 'Enheder',
        unitInch: 'tommer',
        unitCm: 'cm',
        printButton: 'Udskriv',
      },
      readingTime: {
        eyebrow: 'Læse- og taletid',
        title: 'Læsetid-beregner',
        badgeIdle: 'Indtast tekst',
        badgeResult: 'Anslået',
        modeAria: 'Vælg, hvordan du indtaster din tekst',
        modeText: 'Indsæt tekst',
        modeCount: 'Antal ord',
        placeholder: 'Indsæt eller skriv din tekst her for at estimere læse- og taletid…',
        wordsLabel: 'Antal ord',
        wordsPlaceholder: 'f.eks. 1500',
        readingSpeedLabel: 'Læsehastighed',
        speakingSpeedLabel: 'Talehastighed',
        speedSlow: 'Langsom',
        speedAverage: 'Middel',
        speedFast: 'Hurtig',
        wpmShort: 'ord/min',
        wordsStatLabel: 'Ord',
        referenceHeading: 'Almindelige længder',
        refWordsCol: 'Ord',
        refReadingCol: 'Læsning',
        refSpeakingCol: 'Tale',
      },
      byteCounter: {
        eyebrow: 'Byte-tæller',
        title: 'UTF-8-byte-beregner',
        badgeIdle: 'Indtast tekst',
        badgeResult: 'Talt',
        placeholder: 'Indsæt eller skriv tekst for at tælle størrelsen i bytes…',
        utf8Label: 'UTF-8-bytes',
        utf16Label: 'UTF-16-bytes',
        utf32Label: 'UTF-32-bytes',
        charactersLabel: 'Tegn',
        codePointsLabel: 'Kodepunkter',
        note: 'UTF-8 bruger 1–4 bytes pr. tegn: ASCII 1 byte, accentueret latin 2, de fleste CJK 3 og emojis 4.',
      },
      emojiDetector: {
        eyebrow: 'Emojis & skjulte tegn',
        title: 'Emoji-tæller & detektor af usynlige tegn',
        badgeIdle: 'Indtast tekst',
        badgeClean: 'Ren',
        badgeWarn: 'Skjulte fundet',
        placeholder: 'Indsæt eller skriv tekst for at tælle emojis og finde usynlige tegn…',
        emojiLabel: 'Emojis',
        charactersLabel: 'Tegn',
        hiddenLabel: 'Skjulte tegn',
        cleanNote: 'Ingen usynlige eller nul-bredde-tegn fundet.',
        removeButton: 'Fjern skjulte tegn',
        removedNote: 'Fjernede {n} skjulte tegn.',
        note: 'Usynlige tegn som nul-bredde-mellemrum kan ødelægge kopiér-indsæt, søgning og skærmlæsere. Brug Fjern for at strippe dem.',
      },
      platformCounter: {
        title: 'Tegntæller',
        badgeIdle: 'Indtast tekst',
        badgeSafe: 'Inden for grænsen',
        badgeOver: 'Over grænsen',
        placeholder: 'Skriv eller indsæt din tekst…',
        counter: '{n} / {limit}',
        remaining: '{n} tilbage',
        over: '{n} over',
        fields: {
          title: 'Titel',
          description: 'Beskrivelse',
          caption: 'Billedtekst',
          bio: 'Bio',
          post: 'Opslag',
          message: 'Besked',
          status: 'Status',
          about: 'Om',
        },
      },
      sentenceCounter: {
        eyebrow: 'Sætninger & afsnit',
        title: 'Sætnings- & afsnitstæller',
        badgeIdle: 'Indtast tekst',
        badgeResult: 'Talt',
        placeholder: 'Indsæt eller skriv tekst for at tælle sætninger og afsnit…',
        sentencesLabel: 'Sætninger',
        note: 'Antallet af sætninger er et skøn — forkortelser og decimaltal kan rykke totalen en smule.',
      },
      clear: 'Ryd',
    },
  },
};
