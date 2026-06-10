const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'i18n');
const translations = {
  da: "Realtidsvisning. Slut med at gætte.",
  de: "Echtzeit-Vorschau. Kein Rätselraten mehr.",
  es: "Vistas previas en tiempo real. Se acabaron las conjeturas.",
  fr: "Aperçus en temps réel. Plus de devinettes.",
  it: "Anteprime in tempo reale. Niente più supposizioni.",
  ja: "リアルタイムプレビュー。もう推測は不要です。",
  nl: "Real-time voorbeelden. Geen giswerk meer.",
  pt: "Pré-visualizações em tempo real. Chega de adivinhação.",
  zh: "实时预览。不再需要猜测。"
};

for (const [lang, text] of Object.entries(translations)) {
  const file = path.join(dir, `${lang}.ts`);
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  // Find hero object and append badge
  const regex = /(hero:\s*\{[\s\S]*?secondary:\s*['"`].*?['"`],?)\s*\}/;
  content = content.replace(regex, `$1\n    badge: '${text}',\n  }`);
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${lang}.ts`);
}
