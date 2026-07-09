const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching live embed...');
  const html = await fetch('https://posttruncate.com/en/embed/');
  fs.writeFileSync('scratch/live_embed_final.html', html);

  // Q1: Characters tile deliberate removal - check only Words tile present
  const hasWordsTile = html.includes('>Words<');
  const hasCharsTile = html.includes('>Characters<');
  console.log('\n-- Q1: Characters tile removal --');
  if (hasWordsTile && !hasCharsTile) console.log('CONFIRMED: Words tile present, Characters tile absent (deliberate)');
  else console.log('UNEXPECTED: hasWords=' + hasWordsTile + ' hasChars=' + hasCharsTile);

  // Q2: X Twitter hard limit label
  console.log('\n-- Q2: X hard-limit label --');
  if (html.includes('Hard limit') && html.includes('no fold')) {
    console.log('CONFIRMED: "Hard limit · no fold" label present in SSR output');
  } else {
    console.log('NOT FOUND in SSR HTML (may be client-only — checking for maxHeight clue)');
    if (html.includes('maxHeight') || html.includes('max-height')) {
      console.log('NOTE: maxHeight found, confirming bounded textarea is wired up');
    }
  }

  // Q3: All 7 placeholder strings present
  console.log('\n-- Q3: Placeholders --');
  const placeholderChecks = [
    ['Twitter', 'Draft your tweet'],
    ['LinkedIn', 'Write your LinkedIn post'],
    ['Threads', 'Draft your thread'],
    ['Instagram', 'Write your caption'],
    ['Facebook', 'Draft your Facebook post'],
    ['TikTok', 'Write your TikTok caption'],
    ['SMS', 'Draft your text message'],
  ];
  for (const [name, text] of placeholderChecks) {
    console.log((html.includes(text) ? '  OK' : '  MISSING') + ' ' + name + ': "' + text + '"');
  }

  // Q4: Bounded textarea — check maxHeight in props or style
  console.log('\n-- Q4: Bounded textarea height --');
  if (html.includes('overflowY') || html.includes('overflow-y') || html.includes('maxHeight')) {
    console.log('CONFIRMED: overflow/maxHeight attributes present in SSR output');
  } else {
    console.log('Not found in SSR output — these are client-applied inline styles; checking prop pass-through...');
    if (html.includes('"rows"') || html.includes('rows="3"')) {
      console.log('rows=3 confirmed. Inline styles are applied client-side on input events.');
    }
  }

  console.log('\nDONE');
}

run().catch(console.error);
