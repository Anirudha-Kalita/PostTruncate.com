const fs = require('fs');
const embed = fs.readFileSync('scratch/live_embed.html', 'utf8');
const widget = fs.readFileSync('scratch/live_widget.html', 'utf8');

const checks = [
  ['Fold indicator (linear-gradient)', embed.includes('linear-gradient(to right')],
  ['Facebook tab', embed.includes('>Facebook<')],
  ['TikTok tab', embed.includes('>TikTok<')],
  ['Consolidated stats (0 / 280)', embed.includes('0 / 280')],
  ['Dynamic placeholder (Twitter)', embed.includes('Draft your tweet')],
  ['rows=3 shorter textarea', embed.includes('rows="3"')],
  ['Words-only stat tile', embed.includes('>Words<')],
  ['Characters tile removed', !embed.includes('>Characters<')],
  ['Backlink present', embed.includes('PostTruncate')],
  ['Widget page iframe 320px', widget.includes('height="320"')],
];

let allPassed = true;
checks.forEach(([label, result]) => {
  if (result) console.log('\u2705 ' + label);
  else { console.log('\u274c ' + label + ' --- FAILED'); allPassed = false; }
});
if (allPassed) console.log('\nALL CHECKS PASSED!');
else console.log('\nSOME CHECKS FAILED');
