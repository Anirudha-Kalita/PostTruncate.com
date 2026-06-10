const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'i18n');
const translations = {
  da: "Læsbarhed, Søgeordstæthed",
  de: "Lesbarkeit, Keyword-Dichte",
  es: "Legibilidad, Densidad de palabras clave",
  fr: "Lisibilité, Densité des mots-clés",
  it: "Leggibilità, Densità delle parole chiave",
  ja: "読みやすさ、キーワード密度",
  nl: "Leesbaarheid, Trefwoorddichtheid",
  pt: "Legibilidade, Densidade de palavras-chave",
  zh: "可读性，关键词密度"
};

for (const [lang, text] of Object.entries(translations)) {
  const file = path.join(dir, `${lang}.ts`);
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  // Find insights object and append subScoped
  const regex = /(insights:\s*\{[\s\S]*?sub:\s*['"`].*?['"`],?)\s*\}/;
  content = content.replace(regex, `$1\n      subScoped: '${text}',\n    }`);
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${lang}.ts`);
}
