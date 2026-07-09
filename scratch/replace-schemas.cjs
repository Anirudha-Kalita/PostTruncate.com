const fs = require('fs');
let content = fs.readFileSync('src/data/tools.ts', 'utf8');

content = content.replace(/schemaName:\s*{\s*en:\s*'Instagram Caption Character Counter',/g, "schemaName: {\n      en: 'Instagram Caption Cutoff Previewer & Counter',");
content = content.replace(/schemaName:\s*{\s*en:\s*'Facebook Character Counter',/g, "schemaName: {\n      en: 'Facebook Post Cutoff Previewer & Counter',");
content = content.replace(/schemaName:\s*{\s*en:\s*'Threads Character Counter',/g, "schemaName: {\n      en: 'Threads Link & Character Counter',");
content = content.replace(/schemaName:\s*{\s*en:\s*'TikTok Caption Checker',/g, "schemaName: {\n      en: 'TikTok Caption Cutoff Previewer & Checker',");

fs.writeFileSync('src/data/tools.ts', content);
