const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'i18n');
const langs = ['da', 'de', 'en', 'es', 'fr', 'it', 'ja', 'nl', 'pt', 'zh'];

const templates = {
  en: "Start typing your post. Paste a draft, drop in a few links and hashtags, and watch your post's live preview update in {platform} on the right…",
  da: "Begynd at skrive dit indlæg. Indsæt en kladde, tilføj et par links og hashtags, og se din live forhåndsvisning opdatere i {platform} til højre...",
  de: "Beginnen Sie mit der Eingabe Ihres Beitrags. Fügen Sie einen Entwurf ein, fügen Sie ein paar Links und Hashtags hinzu und sehen Sie zu, wie sich die Live-Vorschau in {platform} auf der rechten Seite aktualisiert...",
  es: "Comienza a escribir tu publicación. Pega un borrador, añade algunos enlaces y hashtags, y mira cómo se actualiza la vista previa en vivo en {platform} a la derecha...",
  fr: "Commencez à taper votre publication. Collez un brouillon, ajoutez quelques liens et hashtags, et regardez l'aperçu en direct se mettre à jour dans {platform} sur la droite...",
  it: "Inizia a digitare il tuo post. Incolla una bozza, aggiungi alcuni link e hashtag e guarda l'anteprima in tempo reale aggiornarsi in {platform} sulla destra...",
  ja: "投稿の入力を開始してください。下書きを貼り付け、リンクやハッシュタグをいくつか追加して、右側の{platform}でライブプレビューが更新されるのを確認してください...",
  nl: "Begin met het typen van je bericht. Plak een concept, voeg wat links en hashtags toe en zie hoe de live preview wordt bijgewerkt in {platform} aan de rechterkant...",
  pt: "Comece a digitar seu post. Cole um rascunho, adicione alguns links e hashtags, e veja a visualização ao vivo ser atualizada no {platform} à direita...",
  zh: "开始输入您的帖子。粘贴草稿，添加一些链接和标签，然后在右侧查看 {platform} 中的实时预览更新..."
};

const platforms = ['linkedin', 'facebook', 'instagram', 'twitter', 'threads', 'sms'];
const names = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'X (Twitter)',
  threads: 'Threads',
  sms: 'SMS'
};

for (const lang of langs) {
  const filePath = path.join(dir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');

  const placeholdersObj = [];
  for (const plat of platforms) {
    const template = templates[lang];
    const finalStr = template.replace('{platform}', names[plat]);
    placeholdersObj.push(`        ${plat}: "${finalStr}",`);
  }
  
  // Replace the existing placeholders block
  const regex = /placeholders:\s*\{[\s\S]*?\},/;
  const newBlock = `placeholders: {\n${placeholdersObj.join('\n')}\n      },`;
  
  if (regex.test(content)) {
    content = content.replace(regex, newBlock);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated placeholders in ${lang}.ts`);
  } else {
    console.log(`Failed to find placeholders block in ${lang}.ts`);
  }
}
