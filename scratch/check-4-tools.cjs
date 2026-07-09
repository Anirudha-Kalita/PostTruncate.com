const fs = require('fs');
const content = fs.readFileSync('src/data/tools.ts', 'utf8');

const blocks = content.split('id:');
const targets = ['instagram', 'facebook', 'threads', 'tiktok-guide'];

targets.forEach(target => {
  const block = blocks.find(b => b.trim().startsWith(`'${target}'`));
  if (!block) return;
  
  const schemaMatch = block.match(/schemaName:\s*{\s*en:\s*['"](.*?)['"]/);
  const titleMatch = block.match(/titles:\s*{\s*en:\s*['"](.*?)['"]/);
  
  console.log(`\n--- ${target.toUpperCase()} ---`);
  console.log(`Current schemaName: ${schemaMatch ? schemaMatch[1] : 'N/A'}`);
  console.log(`Current title:      ${titleMatch ? titleMatch[1] : 'N/A'}`);
});
