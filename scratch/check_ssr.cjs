const fs = require('fs');
const html = fs.readFileSync('scratch/live_embed_final.html', 'utf8');

// Check the bundle URL (to confirm the new build is deployed)
const bundleMatch = html.match(/component-url="([^"]+EmbedWidget[^"]+)"/);
console.log('Bundle URL:', bundleMatch ? bundleMatch[1] : 'not found');

// The SSR snapshot defaults to twitter — the "Hard limit · no fold" label
// should appear in the SSR HTML since platform='twitter' is the initial state.
const statsIdx = html.indexOf('0 / 280');
const statsSnippet = html.slice(statsIdx - 50, statsIdx + 400);
console.log('\nStats area in SSR:\n', statsSnippet);

// Check maxHeight in the textarea style (SSR renders inline styles)
const taIdx = html.indexOf('textarea');
const taSnippet = html.slice(taIdx, taIdx + 500);
console.log('\nTextarea snippet:\n', taSnippet);
