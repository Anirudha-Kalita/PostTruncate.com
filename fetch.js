setTimeout(async () => {
  try {
    const r = await fetch('http://localhost:4321/en/character-counter/');
    const text = await r.text();
    const start = text.indexOf('<section id="ad-previews"');
    if (start === -1) {
      console.log('Section not found');
      process.exit(1);
    }
    const end = text.indexOf('</section>', start) + 10;
    console.log(text.substring(start, end));
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}, 2000);
