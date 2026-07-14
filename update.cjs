const fs = require('fs');
const path = require('path');

const i18nDir = 'src/i18n';
const translations = JSON.parse(fs.readFileSync('translations.json', 'utf8'));

// 1. Update types.ts
let typesPath = path.join(i18nDir, 'types.ts');
let typesStr = fs.readFileSync(typesPath, 'utf8');

if (!typesStr.includes('adPreviewsCallout')) {
  typesStr = typesStr.replace(
    '  embedCallout: {',
    '  adPreviewsCallout: {\n    eyebrow: string;\n    title: string;\n    body: string;\n  };\n  embedCallout: {'
  );
  fs.writeFileSync(typesPath, typesStr, 'utf8');
}

// 2. Update en.ts
let enPath = path.join(i18nDir, 'en.ts');
let enStr = fs.readFileSync(enPath, 'utf8');

if (!enStr.includes('adPreviewsCallout')) {
  enStr = enStr.replace(
    '  embedCallout: {',
    "  adPreviewsCallout: {\n    eyebrow: 'Paid Campaigns',\n    title: 'Ad Preview Simulators',\n    body: 'Sponsored content has completely different truncation rules. Preview your exact ad copy cutoff for Facebook, LinkedIn, Google, Instagram, and TikTok.',\n  },\n\n  embedCallout: {"
  );
  fs.writeFileSync(enPath, enStr, 'utf8');
}

const langs = ['es', 'fr', 'de', 'it', 'pt', 'nl', 'da', 'ja', 'zh'];

for (const lang of langs) {
  let p = path.join(i18nDir, lang + '.ts');
  let content = fs.readFileSync(p, 'utf8');
  
  const regex = /embedCallout:\s*\{[\s\S]*?cta:\s*'.*?',\s*\},/;
  
  const escapeSingle = (str) => str.replace(/'/g, "\\'");

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
  ].join('\n');
  
  if (content.match(regex)) {
    content = content.replace(regex, replacer);
  } else {
    console.warn('Regex did not match for ' + lang);
  }
  
  fs.writeFileSync(p, content, 'utf8');
}
console.log('Translations updated.');
