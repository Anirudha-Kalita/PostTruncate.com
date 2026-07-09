const https = require('https');

function fetchSchema(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const regex = /<script\s+type="application\/ld\+json"\s*(?:set:html=".*?")?>([\s\S]*?)<\/script>/gi;
        let match;
        const schemas = [];
        while ((match = regex.exec(data)) !== null) {
          try {
            const jsonStr = match[1].replace(/\\u003c/g, '<');
            const json = JSON.parse(jsonStr);
            if (json['@type'] === 'SoftwareApplication') {
              schemas.push({ raw: jsonStr, json: json });
            }
          } catch (e) {
            // ignore
          }
        }
        resolve(schemas);
      });
    }).on('error', reject);
  });
}

const tools = [
  { platform: 'Twitter', slug: 'twitter-character-counter', expected: 'X Thread Splitter & Character Counter' },
  { platform: 'LinkedIn', slug: 'linkedin-character-counter', expected: 'LinkedIn "See More" Previewer & Counter' },
  { platform: 'Instagram', slug: 'instagram-character-counter', expected: 'Instagram Caption Cutoff Previewer & Counter' },
  { platform: 'Facebook', slug: 'facebook-character-counter', expected: 'Facebook Post Cutoff Previewer & Counter' },
  { platform: 'Threads', slug: 'threads-character-counter', expected: 'Threads Link & Character Counter' },
  { platform: 'TikTok', slug: 'tiktok-caption-checker', expected: 'TikTok Caption Cutoff Previewer & Checker' }
];

async function checkDeploy() {
  console.log('Checking live production...');
  let allGood = false;
  let attempts = 0;
  
  while (!allGood && attempts < 10) {
    attempts++;
    console.log(`\nAttempt ${attempts}...`);
    allGood = true;
    
    for (const tool of tools) {
      const url = `https://posttruncate.com/en/${tool.slug}/`;
      const schemas = await fetchSchema(url);
      if (schemas.length === 0) {
        console.log(`${tool.platform}: No SoftwareApplication found!`);
        allGood = false;
        continue;
      }
      const sa = schemas[0];
      if (sa.json.name !== tool.expected) {
        console.log(`${tool.platform} is STALE: ${sa.json.name} (expected ${tool.expected})`);
        allGood = false;
      } else {
        console.log(`${tool.platform} is LIVE!`);
      }
    }
    
    if (!allGood) {
      console.log('Waiting 10s for deploy...');
      await new Promise(r => setTimeout(r, 10000));
    }
  }

  if (allGood) {
    console.log('\nAll 6 pages are live with new schemas! Here are the exact outputs:\n');
    for (const tool of tools) {
      const url = `https://posttruncate.com/en/${tool.slug}/`;
      const schemas = await fetchSchema(url);
      console.log(`=== ${tool.platform} (${url}) ===`);
      console.log(`Raw "name" string in JSON-LD output:`);
      // extract just the "name" line from the raw text to prove quotes are escaped
      const nameLine = schemas[0].raw.split('\n').find(l => l.includes('"name":'));
      console.log(nameLine);
      console.log(`Parsed Name: ${schemas[0].json.name}\n`);
    }
  }
}

checkDeploy();
