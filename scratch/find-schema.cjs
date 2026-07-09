const fs = require('fs');
const content = fs.readFileSync('src/data/tools.ts', 'utf8');

// simple regex to find id and schemaName
const blocks = content.split('id:');
for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const idMatch = block.match(/^\s*['"]([^'"]+)['"]/);
  if (!idMatch) continue;
  const id = idMatch[1];
  
  const schemaMatch = block.match(/schemaName:\s*{\s*en:\s*['"]([^'"]+)['"]/);
  const schema = schemaMatch ? schemaMatch[1] : 'NOT FOUND';
  console.log(`Tool ID: ${id} => schemaName.en: ${schema}`);
}
