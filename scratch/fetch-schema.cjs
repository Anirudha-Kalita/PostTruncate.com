const https = require('https');

function fetchSchema(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const regex = /<script\s+type="application\/ld\+json"\s*(?:set:html=".*?")?>([\s\S]*?)<\/script>/gi;
        let match;
        const schemas = [];
        while ((match = regex.exec(data)) !== null) {
          try {
            // Replace escaped less-thans if any, and parse
            const json = JSON.parse(match[1].replace(/\\u003c/g, '<'));
            schemas.push(json);
          } catch (e) {
            schemas.push("Error parsing JSON: " + match[1]);
          }
        }
        resolve(schemas);
      });
    }).on('error', reject);
  });
}

async function run() {
  const url1 = 'https://posttruncate.com/de/instagram-zeichenzaehler/';
  console.log(`\n--- JSON-LD for ${url1} ---`);
  const schemas1 = await fetchSchema(url1);
  console.log(JSON.stringify(schemas1, null, 2));

  const url2 = 'https://posttruncate.com/en/blog/best-x-thread-tools-how-to-automatically-split-and-format-long-tweets/';
  console.log(`\n--- JSON-LD for ${url2} ---`);
  const schemas2 = await fetchSchema(url2);
  console.log(JSON.stringify(schemas2, null, 2));
}

run();
