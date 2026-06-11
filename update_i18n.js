const fs = require('fs');
const path = require('path');

const i18nDir = 'd:\\AICodingProjects\\PostTruncate.com\\src\\i18n';

const translations = {
  en: { eyebrow: "PLATFORM CHARACTER LIMITS", headers: { platform: "Platform", characterLimit: "Character Limit", shownInFeed: "Shown In Feed", bestPractice: "Best Practice", notes: "Notes" }, viewAll: "View all platform limits", platforms: { linkedin: { name: "LinkedIn", limit: "3,000", shown: "~220 characters", bestPractice: "Keep key message early", notes: "Articles support up to 125,000 characters" }, twitter: { name: "X (Twitter)", limit: "280", shown: "~125 characters", bestPractice: "Front-load important info", notes: "Links reduce available characters" }, instagram: { name: "Instagram Caption", limit: "2,200", shown: "~125 characters", bestPractice: "Hook early, add CTA", notes: "Hashtags count toward limit" }, facebook: { name: "Facebook Post", limit: "63,206", shown: "~160 characters", bestPractice: "Keep it concise", notes: "Images and links affect display" }, threads: { name: "Threads", limit: "500", shown: "~125 characters", bestPractice: "Short & engaging", notes: "Meta's text-based platform" }, sms: { name: "SMS (GSM)", limit: "160", shown: "160 per SMS", bestPractice: "Keep under 160", notes: "Longer texts split into multiple SMS" } } },
  da: { eyebrow: "PLATFORMTEGNGRÆNSER", headers: { platform: "Platform", characterLimit: "Tegngrænse", shownInFeed: "Vises i feed", bestPractice: "Bedste praksis", notes: "Bemærkninger" }, viewAll: "Se alle platformgrænser", platforms: { linkedin: { name: "LinkedIn", limit: "3.000", shown: "~220 tegn", bestPractice: "Hold hovedbudskabet tidligt", notes: "Artikler understøtter op til 125.000 tegn" }, twitter: { name: "X (Twitter)", limit: "280", shown: "~125 tegn", bestPractice: "Vigtig info først", notes: "Links reducerer tilgængelige tegn" }, instagram: { name: "Instagram-billedtekst", limit: "2.200", shown: "~125 tegn", bestPractice: "Fang tidligt, tilføj CTA", notes: "Hashtags tæller med i grænsen" }, facebook: { name: "Facebook-opslag", limit: "63.206", shown: "~160 tegn", bestPractice: "Hold det kort", notes: "Billeder og links påvirker visningen" }, threads: { name: "Threads", limit: "500", shown: "~125 tegn", bestPractice: "Kort og engagerende", notes: "Metas tekstbaserede platform" }, sms: { name: "SMS (GSM)", limit: "160", shown: "160 pr. SMS", bestPractice: "Hold under 160", notes: "Længere tekster deles op i flere SMS'er" } } },
  de: { eyebrow: "PLATTFORM-ZEICHENLIMITS", headers: { platform: "Plattform", characterLimit: "Zeichenlimit", shownInFeed: "Sichtbar im Feed", bestPractice: "Best Practice", notes: "Hinweise" }, viewAll: "Alle Plattform-Limits anzeigen", platforms: { linkedin: { name: "LinkedIn", limit: "3.000", shown: "~220 Zeichen", bestPractice: "Kernaussage an den Anfang", notes: "Artikel unterstützen bis zu 125.000 Zeichen" }, twitter: { name: "X (Twitter)", limit: "280", shown: "~125 Zeichen", bestPractice: "Wichtige Infos nach vorne", notes: "Links reduzieren verfügbare Zeichen" }, instagram: { name: "Instagram-Bildunterschrift", limit: "2.200", shown: "~125 Zeichen", bestPractice: "Hook früh, CTA hinzufügen", notes: "Hashtags zählen zum Limit" }, facebook: { name: "Facebook-Post", limit: "63.206", shown: "~160 Zeichen", bestPractice: "Kurz und prägnant halten", notes: "Bilder und Links beeinflussen die Anzeige" }, threads: { name: "Threads", limit: "500", shown: "~125 Zeichen", bestPractice: "Kurz & spannend", notes: "Metas textbasierte Plattform" }, sms: { name: "SMS (GSM)", limit: "160", shown: "160 pro SMS", bestPractice: "Unter 160 halten", notes: "Längere Texte werden in mehrere SMS geteilt" } } },
  es: { eyebrow: "LÍMITES DE CARACTERES POR PLATAFORMA", headers: { platform: "Plataforma", characterLimit: "Límite de Caracteres", shownInFeed: "Visible en Feed", bestPractice: "Mejores Prácticas", notes: "Notas" }, viewAll: "Ver todos los límites de la plataforma", platforms: { linkedin: { name: "LinkedIn", limit: "3,000", shown: "~220 caracteres", bestPractice: "Mensaje clave al principio", notes: "Los artículos admiten hasta 125,000 caracteres" }, twitter: { name: "X (Twitter)", limit: "280", shown: "~125 caracteres", bestPractice: "Información importante primero", notes: "Los enlaces reducen caracteres disponibles" }, instagram: { name: "Caption de Instagram", limit: "2,200", shown: "~125 caracteres", bestPractice: "Engancha pronto, añade CTA", notes: "Los hashtags cuentan para el límite" }, facebook: { name: "Publicación de Facebook", limit: "63,206", shown: "~160 caracteres", bestPractice: "Mantenlo conciso", notes: "Imágenes y enlaces afectan visualización" }, threads: { name: "Threads", limit: "500", shown: "~125 caracteres", bestPractice: "Corto y atractivo", notes: "Plataforma basada en texto de Meta" }, sms: { name: "SMS (GSM)", limit: "160", shown: "160 por SMS", bestPractice: "Mantener por debajo de 160", notes: "Textos largos se dividen en múltiples SMS" } } },
  fr: { eyebrow: "LIMITES DE CARACTÈRES PAR PLATEFORME", headers: { platform: "Plateforme", characterLimit: "Limite de Caractères", shownInFeed: "Visible dans le flux", bestPractice: "Meilleure Pratique", notes: "Notes" }, viewAll: "Voir toutes les limites des plateformes", platforms: { linkedin: { name: "LinkedIn", limit: "3 000", shown: "~220 caractères", bestPractice: "Message clé au début", notes: "Les articles prennent en charge jusqu'à 125 000 caractères" }, twitter: { name: "X (Twitter)", limit: "280", shown: "~125 caractères", bestPractice: "Infos importantes d'abord", notes: "Les liens réduisent les caractères disponibles" }, instagram: { name: "Légende Instagram", limit: "2 200", shown: "~125 caractères", bestPractice: "Accroche tôt, ajouter un CTA", notes: "Les hashtags comptent dans la limite" }, facebook: { name: "Publication Facebook", limit: "63 206", shown: "~160 caractères", bestPractice: "Gardez-le concis", notes: "Les images et liens affectent l'affichage" }, threads: { name: "Threads", limit: "500", shown: "~125 caractères", bestPractice: "Court et engageant", notes: "Plateforme textuelle de Meta" }, sms: { name: "SMS (GSM)", limit: "160", shown: "160 par SMS", bestPractice: "Garder sous 160", notes: "Textes plus longs divisés en plusieurs SMS" } } },
  it: { eyebrow: "LIMITI DI CARATTERI PER PIATTAFORMA", headers: { platform: "Piattaforma", characterLimit: "Limite Caratteri", shownInFeed: "Visibile nel Feed", bestPractice: "Miglior Pratica", notes: "Note" }, viewAll: "Visualizza tutti i limiti della piattaforma", platforms: { linkedin: { name: "LinkedIn", limit: "3.000", shown: "~220 caratteri", bestPractice: "Messaggio chiave all'inizio", notes: "Gli articoli supportano fino a 125.000 caratteri" }, twitter: { name: "X (Twitter)", limit: "280", shown: "~125 caratteri", bestPractice: "Info importanti prima", notes: "I link riducono i caratteri disponibili" }, instagram: { name: "Didascalia Instagram", limit: "2.200", shown: "~125 caratteri", bestPractice: "Cattura l'attenzione, aggiungi CTA", notes: "Gli hashtag contano per il limite" }, facebook: { name: "Post Facebook", limit: "63.206", shown: "~160 caratteri", bestPractice: "Sii conciso", notes: "Immagini e link influenzano la visualizzazione" }, threads: { name: "Threads", limit: "500", shown: "~125 caratteri", bestPractice: "Breve e coinvolgente", notes: "Piattaforma basata su testo di Meta" }, sms: { name: "SMS (GSM)", limit: "160", shown: "160 per SMS", bestPractice: "Mantieni sotto 160", notes: "Testi più lunghi divisi in più SMS" } } },
  ja: { eyebrow: "プラットフォームの文字数制限", headers: { platform: "プラットフォーム", characterLimit: "文字数制限", shownInFeed: "フィード表示文字数", bestPractice: "ベストプラクティス", notes: "備考" }, viewAll: "すべてのプラットフォームの制限を見る", platforms: { linkedin: { name: "LinkedIn", limit: "3,000", shown: "約220文字", bestPractice: "重要なメッセージは最初に", notes: "記事は最大125,000文字まで対応" }, twitter: { name: "X (Twitter)", limit: "280", shown: "約125文字", bestPractice: "重要な情報を前置き", notes: "リンクは使用可能文字数を減らします" }, instagram: { name: "Instagramのキャプション", limit: "2,200", shown: "約125文字", bestPractice: "早めに惹きつけ、CTAを追加", notes: "ハッシュタグも制限に含まれます" }, facebook: { name: "Facebookの投稿", limit: "63,206", shown: "約160文字", bestPractice: "簡潔に保つ", notes: "画像とリンクが表示に影響します" }, threads: { name: "Threads", limit: "500", shown: "約125文字", bestPractice: "短く魅力的に", notes: "Metaのテキストベースプラットフォーム" }, sms: { name: "SMS (GSM)", limit: "160", shown: "SMSごとに160文字", bestPractice: "160文字未満に保つ", notes: "長いテキストは複数のSMSに分割されます" } } },
  nl: { eyebrow: "PLATFORM TEKENLIMIETEN", headers: { platform: "Platform", characterLimit: "Tekenlimiet", shownInFeed: "Zichtbaar in feed", bestPractice: "Beste praktijk", notes: "Opmerkingen" }, viewAll: "Bekijk alle platformlimieten", platforms: { linkedin: { name: "LinkedIn", limit: "3.000", shown: "~220 tekens", bestPractice: "Kernboodschap vooraan", notes: "Artikelen ondersteunen tot 125.000 tekens" }, twitter: { name: "X (Twitter)", limit: "280", shown: "~125 tekens", bestPractice: "Belangrijke info vooraan", notes: "Links verminderen beschikbare tekens" }, instagram: { name: "Instagram Bijschrift", limit: "2.200", shown: "~125 tekens", bestPractice: "Grijp snel de aandacht, voeg CTA toe", notes: "Hashtags tellen mee voor de limiet" }, facebook: { name: "Facebook Bericht", limit: "63.206", shown: "~160 tekens", bestPractice: "Houd het beknopt", notes: "Afbeeldingen en links beïnvloeden weergave" }, threads: { name: "Threads", limit: "500", shown: "~125 tekens", bestPractice: "Kort & boeiend", notes: "Meta's tekstgebaseerde platform" }, sms: { name: "SMS (GSM)", limit: "160", shown: "160 per SMS", bestPractice: "Houd onder 160", notes: "Langere teksten opgesplitst in meerdere SMS" } } },
  pt: { eyebrow: "LIMITES DE CARACTERES POR PLATAFORMA", headers: { platform: "Plataforma", characterLimit: "Limite de Caracteres", shownInFeed: "Visível no Feed", bestPractice: "Melhor Prática", notes: "Notas" }, viewAll: "Ver todos os limites da plataforma", platforms: { linkedin: { name: "LinkedIn", limit: "3.000", shown: "~220 caracteres", bestPractice: "Mensagem chave no início", notes: "Artigos suportam até 125.000 caracteres" }, twitter: { name: "X (Twitter)", limit: "280", shown: "~125 caracteres", bestPractice: "Informações importantes primeiro", notes: "Links reduzem caracteres disponíveis" }, instagram: { name: "Legenda do Instagram", limit: "2.200", shown: "~125 caracteres", bestPractice: "Prenda a atenção cedo, adicione CTA", notes: "Hashtags contam para o limite" }, facebook: { name: "Post do Facebook", limit: "63.206", shown: "~160 caracteres", bestPractice: "Seja conciso", notes: "Imagens e links afetam a exibição" }, threads: { name: "Threads", limit: "500", shown: "~125 caracteres", bestPractice: "Curto e envolvente", notes: "Plataforma baseada em texto da Meta" }, sms: { name: "SMS (GSM)", limit: "160", shown: "160 por SMS", bestPractice: "Mantenha abaixo de 160", notes: "Textos mais longos divididos em vários SMS" } } },
  zh: { eyebrow: "各平台字符限制", headers: { platform: "平台", characterLimit: "字符限制", shownInFeed: "信息流显示", bestPractice: "最佳实践", notes: "备注" }, viewAll: "查看所有平台限制", platforms: { linkedin: { name: "LinkedIn", limit: "3,000", shown: "约220字符", bestPractice: "关键信息靠前", notes: "文章支持高达125,000字符" }, twitter: { name: "X (Twitter)", limit: "280", shown: "约125字符", bestPractice: "重要信息前置", notes: "链接会减少可用字符" }, instagram: { name: "Instagram 字幕", limit: "2,200", shown: "约125字符", bestPractice: "及早吸引，添加CTA", notes: "标签计入限制" }, facebook: { name: "Facebook 帖子", limit: "63,206", shown: "约160字符", bestPractice: "保持简洁", notes: "图像和链接影响显示" }, threads: { name: "Threads", limit: "500", shown: "约125字符", bestPractice: "简短且吸引人", notes: "Meta的纯文本平台" }, sms: { name: "SMS (GSM)", limit: "160", shown: "每条短信160字符", bestPractice: "保持在160以内", notes: "较长文本将分为多条短信" } } }
};

for (const lang of Object.keys(translations)) {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('platformCharacterLimits:')) {
    console.log(`Already in ${lang}.ts`);
    continue;
  }
  
  // Find the end of \`howTruncationWorks\` to insert right after
  const insertRegex = /howTruncationWorks: \{[\s\S]*?\},?\n/;
  const match = insertRegex.exec(content);
  if (match) {
    const insertIndex = match.index + match[0].length;
    let toInsert = `  platformCharacterLimits: ${JSON.stringify(translations[lang], null, 4).replace(/"([^"]+)":/g, '$1:').replace(/\n/g, '\n  ')},\n\n`;
    content = content.slice(0, insertIndex) + toInsert + content.slice(insertIndex);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${lang}.ts`);
  } else {
    console.log(`Could not find where to insert in ${lang}.ts`);
  }
}

const typesPath = path.join(i18nDir, 'types.ts');
let typesContent = fs.readFileSync(typesPath, 'utf8');
if (!typesContent.includes('platformCharacterLimits:')) {
  const typesInsert = `  platformCharacterLimits: {
    eyebrow: string;
    headers: {
      platform: string;
      characterLimit: string;
      shownInFeed: string;
      bestPractice: string;
      notes: string;
    };
    platforms: {
      linkedin: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      twitter: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      instagram: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      facebook: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      threads: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      sms: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
    };
    viewAll: string;
};
`;
  const insertRegexTypes = /howTruncationWorks: \{[\s\S]*?\},?\n/;
  const matchTypes = insertRegexTypes.exec(typesContent);
  if (matchTypes) {
    const insertIndexTypes = matchTypes.index + matchTypes[0].length;
    typesContent = typesContent.slice(0, insertIndexTypes) + typesInsert + typesContent.slice(insertIndexTypes);
    fs.writeFileSync(typesPath, typesContent, 'utf8');
    console.log('Updated types.ts');
  }
}
