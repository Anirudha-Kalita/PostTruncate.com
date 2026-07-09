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

async function verify() {
  console.log('Fetching live widget page...');
  const widgetHtml = await fetch('https://posttruncate.com/en/embed-widget/');
  fs.writeFileSync('scratch/live_widget.html', widgetHtml);

  console.log('Fetching live embed...');
  const embedHtml = await fetch('https://posttruncate.com/en/embed/');
  fs.writeFileSync('scratch/live_embed.html', embedHtml);
  console.log('Done!');
}

verify().catch(console.error);
