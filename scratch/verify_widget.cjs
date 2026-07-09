const https = require('https');

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
  if (widgetHtml.includes('height="320"')) {
    console.log('✅ iframe height is 320');
  } else {
    console.log('❌ iframe height is NOT 320');
  }

  console.log('Fetching live embed...');
  const embedHtml = await fetch('https://posttruncate.com/en/embed/');
  if (embedHtml.includes('linear-gradient')) {
    console.log('✅ linear-gradient found in embed');
  } else {
    console.log('❌ linear-gradient NOT found in embed');
  }

  if (embedHtml.includes('Facebook') && embedHtml.includes('TikTok')) {
    console.log('✅ Facebook and TikTok platforms found');
  } else {
    console.log('❌ Facebook and TikTok platforms NOT found');
  }
}

verify().catch(console.error);
