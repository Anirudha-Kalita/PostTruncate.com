const fs = require('fs');
for (const [lang, slug] of [['en', 'character-counter'], ['de', 'zeichenzaehler']]) {
  console.log(`\nChecking /${lang}/${slug}/...`);
  try {
    const text = fs.readFileSync('dist/' + lang + '/' + slug + '/index.html', 'utf8');
    const start = text.indexOf('<section id="ad-previews"');
    if (start === -1) {
      console.log('Section not found');
      continue;
    }
    const end = text.indexOf('</section>', start) + 10;
    console.log(text.substring(start, end));
  } catch (e) {
    console.error(e.message);
  }
}
