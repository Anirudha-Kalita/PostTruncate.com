const fs = require('fs');
const path = require('path');

const i18nDir = 'src/i18n';

// 1. Update types.ts
let typesPath = path.join(i18nDir, 'types.ts');
let typesStr = fs.readFileSync(typesPath, 'utf8');

if (!typesStr.includes('adPreviewsCallout')) {
  // Add adPreviewsCallout right after embedCallout
  typesStr = typesStr.replace(
    '  embedCallout: {',
    '  adPreviewsCallout: {\\n    eyebrow: string;\\n    title: string;\\n    body: string;\\n  };\\n  embedCallout: {'
  );
  fs.writeFileSync(typesPath, typesStr, 'utf8');
}

// 2. Update en.ts
let enPath = path.join(i18nDir, 'en.ts');
let enStr = fs.readFileSync(enPath, 'utf8');

if (!enStr.includes('adPreviewsCallout')) {
  enStr = enStr.replace(
    '  embedCallout: {',
    '  adPreviewsCallout: {\\n    eyebrow: \\'Paid Campaigns\\',\\n    title: \\'Ad Preview Simulators\\',\\n    body: \\'Sponsored content has completely different truncation rules. Preview your exact ad copy cutoff for Facebook, LinkedIn, Google, Instagram, and TikTok.\\',\\n  },\\n\\n  embedCallout: {'
  );
  fs.writeFileSync(enPath, enStr, 'utf8');
}

const translations = {
  es: {
    adPreviewsCallout: {
      eyebrow: "Campañas de pago",
      title: "Simuladores de vistas previas de anuncios",
      body: "El contenido patrocinado tiene reglas de truncamiento completamente distintas. Previsualiza el corte exacto de tu anuncio para Facebook, LinkedIn, Google, Instagram y TikTok.",
    },
    embedCallout: {
      eyebrow: "Widget gratuito",
      title: "Inserta un contador de caracteres en vivo en tu sitio",
      body: "Para blogueros, educadores y desarrolladores: añade nuestro contador de caracteres en tiempo real a cualquier página web con una sola línea de HTML. Permite a tus usuarios controlar los límites de X, LinkedIn, Threads, Instagram y SMS sin salir de tu sitio. Gratis, sin necesidad de cuenta ni clave API.",
      cta: "Obtener el código de inserción gratuito",
    }
  },
  fr: {
    adPreviewsCallout: {
      eyebrow: "Campagnes payantes",
      title: "Simulateurs d'aperçus de publicités",
      body: "Le contenu sponsorisé a des règles de troncature complètement différentes. Prévisualisez la coupure exacte de votre publicité pour Facebook, LinkedIn, Google, Instagram et TikTok.",
    },
    embedCallout: {
      eyebrow: "Widget gratuit",
      title: "Intégrez un compteur de caractères en direct sur votre site",
      body: "Blogueurs, éducateurs et développeurs : ajoutez notre compteur de caractères en temps réel à n'importe quelle page web avec une seule ligne de code HTML. Laissez vos utilisateurs suivre les limites de X, LinkedIn, Threads, Instagram et SMS sans quitter votre site. Gratuit, aucun compte ou clé API requis.",
      cta: "Obtenir le code d'intégration gratuit",
    }
  },
  de: {
    adPreviewsCallout: {
      eyebrow: "Bezahlte Kampagnen",
      title: "Anzeigenvorschau-Simulatoren",
      body: "Gesponserte Inhalte haben völlig andere Abschneideregeln. Sehen Sie sich die genaue Vorschau Ihres Anzeigentextes für Facebook, LinkedIn, Google, Instagram und TikTok an.",
    },
    embedCallout: {
      eyebrow: "Kostenloses Widget",
      title: "Betten Sie einen Live-Zeichenzähler auf Ihrer Website ein",
      body: "Blogger, Pädagogen und Entwickler: Fügen Sie unseren Echtzeit-Zeichenzähler mit einer einzigen Zeile HTML zu jeder Webseite hinzu. Lassen Sie Ihre Benutzer Plattform-Limits für X, LinkedIn, Threads, Instagram und SMS verfolgen, ohne Ihre Website zu verlassen. Kostenlos, kein Konto oder API-Schlüssel erforderlich.",
      cta: "Kostenlosen Einbettungscode abrufen",
    }
  },
  it: {
    adPreviewsCallout: {
      eyebrow: "Campagne a pagamento",
      title: "Simulatori di anteprime degli annunci",
      body: "I contenuti sponsorizzati hanno regole di troncamento completamente diverse. Visualizza in anteprima il taglio esatto del testo del tuo annuncio per Facebook, LinkedIn, Google, Instagram e TikTok.",
    },
    embedCallout: {
      eyebrow: "Widget gratuito",
      title: "Incorpora un contatore di caratteri live sul tuo sito",
      body: "Blogger, educatori e sviluppatori: aggiungete il nostro contatore di caratteri in tempo reale a qualsiasi pagina web con una singola riga di HTML. Permettete ai vostri utenti di tracciare i limiti delle piattaforme per X, LinkedIn, Threads, Instagram e SMS senza lasciare il vostro sito. Gratuito, nessun account o chiave API richiesti.",
      cta: "Ottieni il codice di incorporamento gratuito",
    }
  },
  pt: {
    adPreviewsCallout: {
      eyebrow: "Campanhas pagas",
      title: "Simuladores de pré-visualização de anúncios",
      body: "Conteúdos patrocinados têm regras de truncamento completamente diferentes. Pré-visualize o corte exato do seu anúncio para o Facebook, LinkedIn, Google, Instagram e TikTok.",
    },
    embedCallout: {
      eyebrow: "Widget gratuito",
      title: "Incorpore um contador de caracteres ao vivo no seu site",
      body: "Bloggers, educadores e desenvolvedores: adicionem o nosso contador de caracteres em tempo real a qualquer página web com uma única linha de HTML. Permitam que os seus utilizadores acompanhem os limites de plataforma para X, LinkedIn, Threads, Instagram e SMS sem sair do seu site. Gratuito, não é necessária conta nem chave API.",
      cta: "Obter o código de incorporação gratuito",
    }
  },
  nl: {
    adPreviewsCallout: {
      eyebrow: "Betaalde campagnes",
      title: "Simulators voor advertentievoorbeelden",
      body: "Gesponsorde inhoud heeft volledig andere afkappingsregels. Bekijk het exacte voorbeeld van je advertentietekst voor Facebook, LinkedIn, Google, Instagram en TikTok.",
    },
    embedCallout: {
      eyebrow: "Gratis widget",
      title: "Sluit een live tekenteller in op je site",
      body: "Bloggers, docenten en ontwikkelaars: voeg onze realtime tekenteller toe aan elke webpagina met één regel HTML. Laat je gebruikers platformlimieten bijhouden voor X, LinkedIn, Threads, Instagram en SMS zonder je site te verlaten. Gratis, geen account of API-sleutel vereist.",
      cta: "Ontvang de gratis insluitcode",
    }
  },
  da: {
    adPreviewsCallout: {
      eyebrow: "Betalte kampagner",
      title: "Simulatorer til forhåndsvisning af annoncer",
      body: "Sponsoreret indhold har helt andre afkortningsregler. Se det nøjagtige afsnit for din annoncetekst til Facebook, LinkedIn, Google, Instagram og TikTok.",
    },
    embedCallout: {
      eyebrow: "Gratis widget",
      title: "Indlejr en live tegntæller på dit websted",
      body: "Bloggere, undervisere og udviklere: tilføj vores tegntæller i realtid til enhver webside med en enkelt linje HTML. Lad dine brugere spore platformgrænser for X, LinkedIn, Threads, Instagram og SMS uden at forlade dit websted. Gratis, ingen konto eller API-nøgle påkrævet.",
      cta: "Få den gratis indlejringskode",
    }
  },
  ja: {
    adPreviewsCallout: {
      eyebrow: "有料キャンペーン",
      title: "広告プレビューシミュレーター",
      body: "スポンサー付きコンテンツには全く異なる省略ルールがあります。Facebook、LinkedIn、Google、Instagram、TikTokの広告コピーの正確なカットオフをプレビューします。",
    },
    embedCallout: {
      eyebrow: "無料ウィジェット",
      title: "サイトにライブ文字数カウンターを埋め込む",
      body: "ブロガー、教育者、開発者の皆様へ：1行のHTMLで、任意のウェブページにリアルタイム文字数カウンターを追加できます。ユーザーがサイトから離れることなく、X、LinkedIn、Threads、Instagram、SMSのプラットフォーム制限を追跡できるようになります。無料で、アカウントやAPIキーは必要ありません。",
      cta: "無料の埋め込みコードを取得",
    }
  },
  zh: {
    adPreviewsCallout: {
      eyebrow: "付费活动",
      title: "广告预览模拟器",
      body: "赞助内容有完全不同的截断规则。预览 Facebook、LinkedIn、Google、Instagram 和 TikTok 广告文案的确切截断位置。",
    },
    embedCallout: {
      eyebrow: "免费小工具",
      title: "在您的网站上嵌入实时字符计数器",
      body: "博主、教育工作者和开发者：只需一行 HTML 即可在任何网页添加我们的实时字符计数器。让您的用户无需离开网站即可跟踪 X、LinkedIn、Threads、Instagram 和 SMS 的平台限制。免费，无需帐户或 API 密钥。",
      cta: "获取免费嵌入代码",
    }
  }
};

const langs = ['es', 'fr', 'de', 'it', 'pt', 'nl', 'da', 'ja', 'zh'];

for (const lang of langs) {
  let p = path.join(i18nDir, lang + '.ts');
  let content = fs.readFileSync(p, 'utf8');
  
  // Note: match the start of embedCallout to the closing cta field
  const regex = /embedCallout:\\s*\\{[\\s\\S]*?cta:\\s*'.*?',\\s*\\},/;
  
  const escapeSingle = (str) => str.replace(/'/g, "\\\\'");

  const replacer = [
    "  adPreviewsCallout: {",
    "    eyebrow: '" + escapeSingle(translations[lang].adPreviewsCallout.eyebrow) + "',",
    "    title: '" + escapeSingle(translations[lang].adPreviewsCallout.title) + "',",
    "    body: '" + escapeSingle(translations[lang].adPreviewsCallout.body) + "',",
    "  },",
    "",
    "  embedCallout: {",
    "    eyebrow: '" + escapeSingle(translations[lang].embedCallout.eyebrow) + "',",
    "    title: '" + escapeSingle(translations[lang].embedCallout.title) + "',",
    "    body: '" + escapeSingle(translations[lang].embedCallout.body) + "',",
    "    cta: '" + escapeSingle(translations[lang].embedCallout.cta) + "',",
    "  },"
  ].join('\\n');
  
  if (content.match(regex)) {
    content = content.replace(regex, replacer);
  } else {
    console.warn('Regex did not match for ' + lang);
  }
  
  fs.writeFileSync(p, content, 'utf8');
}
console.log('Translations updated.');
