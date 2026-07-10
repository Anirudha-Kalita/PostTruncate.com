const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Hero.astro')).map(f => path.join(dir, f));
let totalModified = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // 1. Replace width="100%" height="100%" with the dimensions from viewBox
  content = content.replace(/<svg\s+width="100%"\s+height="100%"\s+viewBox="0\s+0\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)"([^>]*?)>/g, '<svg width="$1" height="$2" viewBox="0 0 $1 $2"$3>');

  // Also catch any SVGs that still lack width/height
  content = content.replace(/<svg\s+(?!.*width=)(.*?)viewBox="0\s+0\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)"([^>]*?)>/g, '<svg width="$2" height="$3" $1viewBox="0 0 $2 $3"$4>');
  content = content.replace(/<svg\s+viewBox="0\s+0\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)"(?!.*width=)([^>]*?)>/g, '<svg width="$1" height="$2" viewBox="0 0 $1 $2"$3>');


  // 2. Fix align-items for the main grid container (it's the first 'align-items: center;' in the file)
  // We can do this safely by matching `.somethinghero { ... align-items: center;`
  // A simple way is to replace the very first 'align-items: center;' with 'align-items: start;'
  // since the main hero class is always defined first in the <style> block.
  let firstAlignItemsIndex = content.indexOf('align-items: center;');
  if (firstAlignItemsIndex !== -1 && firstAlignItemsIndex < content.indexOf('</style>')) {
      content = content.substring(0, firstAlignItemsIndex) + 'align-items: start;' + content.substring(firstAlignItemsIndex + 20);
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Fixed:', file);
    totalModified++;
  }
}
console.log('Total files modified:', totalModified);
