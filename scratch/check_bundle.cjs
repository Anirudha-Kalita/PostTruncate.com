const https = require('https');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  // Fetch the current JS bundle and check if the new changes are in it
  const bundleUrl = 'https://posttruncate.com/_astro/EmbedWidget.BJ2TSobB.js';
  console.log('Fetching bundle:', bundleUrl);
  const bundle = await fetchText(bundleUrl);
  
  console.log('Bundle size (chars):', bundle.length);
  console.log('Contains "Hard limit":', bundle.includes('Hard limit'));
  console.log('Contains "no fold":', bundle.includes('no fold'));
  console.log('Contains "maxHeight":', bundle.includes('maxHeight'));
  console.log('Contains "Math.min":', bundle.includes('Math.min'));
  
  // Show a snippet around "Hard" if found
  const idx = bundle.indexOf('Hard');
  if (idx > -1) {
    console.log('\nSnippet around "Hard":', bundle.slice(idx - 20, idx + 80));
  }
}

run().catch(console.error);
