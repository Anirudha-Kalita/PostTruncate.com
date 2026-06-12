const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('dist/client/en/character-counter/index.html', 'utf8');
const $ = cheerio.load(html);
console.log('Footer parent:', $('footer.footer').parent().get(0).tagName);
console.log('Body immediate children:', $('body').children().map((i, el) => el.tagName).get());
