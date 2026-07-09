const fs = require('fs');
let content = fs.readFileSync('src/data/tools.ts', 'utf8');
content = content.replace(/schemaName:\s*{\s*en:\s*['"]Facebook Character Counter['"],/g, "schemaName: {\n      en: 'Facebook Post Cutoff Previewer & Counter',");
fs.writeFileSync('src/data/tools.ts', content);
