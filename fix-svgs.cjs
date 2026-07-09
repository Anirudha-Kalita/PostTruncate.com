const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Hero.astro')).map(f => path.join(dir, f));
let totalModified = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  content = content.replace(/<svg\s([^>]*?)>/g, (match, attrs) => {
    if (!attrs.includes('width=')) {
      return `<svg width="100%" height="100%" ${attrs}>`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Fixed:', file);
    totalModified++;
  }
}
console.log('Total files modified:', totalModified);
