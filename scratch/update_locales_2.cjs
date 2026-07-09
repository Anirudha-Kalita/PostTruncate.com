const fs = require('fs');
const files = ['en', 'es', 'de', 'fr', 'pt', 'it', 'nl', 'ja', 'zh', 'da'].map(l => 'src/i18n/' + l + '.ts');
const newBlock = `embed: {
    charCount: 'Characters',
    wordCount: 'Words',
    remaining: '{n} remaining',
    overLimit: '{n} over',
    platforms: {
      twitter: 'X / Twitter',
      linkedin: 'LinkedIn',
      threads: 'Threads',
      instagram: 'Instagram',
      facebook: 'Facebook',
      tiktok: 'TikTok',
      sms: 'SMS',
    },
    placeholders: {
      twitter: 'Draft your tweet — see where it cuts off...',
      linkedin: 'Write your LinkedIn post...',
      threads: 'Draft your thread...',
      instagram: 'Write your caption...',
      facebook: 'Draft your Facebook post...',
      tiktok: 'Write your TikTok caption...',
      sms: 'Draft your text message...',
    },
  },`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/embed:\s*\{[\s\S]*?\},(?=\s*\/\*\*|\s*\n\s*hook:)/, newBlock);
  fs.writeFileSync(file, content);
}
console.log('Updated all locale files');
