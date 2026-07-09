const fs = require('fs');
const files = ['es', 'de', 'fr', 'pt', 'it', 'nl', 'ja', 'zh', 'da'].map(l => 'src/i18n/' + l + '.ts');
const block = `
  embedCallout: {
    eyebrow: 'Free Widget',
    title: 'Embed a live character counter on your site',
    body: 'Bloggers, educators, and developers: add our real-time character counter to any web page with a single line of HTML. Let your users track platform limits for X, LinkedIn, Threads, Instagram, and SMS without leaving your site. Free, no account or API key required.',
    cta: 'Get the free embed code',
  },
`;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/(\s*)(errors:\s*\{)/, '\n' + block + '$1$2');
  fs.writeFileSync(file, content);
}
console.log('Updated all locale files');
