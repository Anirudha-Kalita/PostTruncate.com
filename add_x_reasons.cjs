const fs = require('fs');
const path = require('path');

const langs = ['da', 'de', 'en', 'es', 'fr', 'it', 'ja', 'nl', 'pt', 'zh'];

const translations = {
  en: {
    xReasonFits: 'Your whole post fits in a single tweet.',
    xReasonHookCut: 'Your opening hook spills into a second tweet.',
    xReasonCtaBelow: 'Your CTA appears in a threaded tweet.',
    xReasonHookOnly: 'Your hook fits in the first tweet; no CTA detected.',
    xReasonHookAndCta: 'Your hook and CTA both fit in the first tweet.'
  },
  da: {
    xReasonFits: 'Hele dit indlæg passer i et enkelt tweet.',
    xReasonHookCut: 'Din åbningskrog spildes over i et andet tweet.',
    xReasonCtaBelow: 'Din CTA vises i et trådet tweet.',
    xReasonHookOnly: 'Din krog passer i det første tweet; ingen CTA fundet.',
    xReasonHookAndCta: 'Både din krog og CTA passer i det første tweet.'
  },
  de: {
    xReasonFits: 'Dein ganzer Beitrag passt in einen einzigen Tweet.',
    xReasonHookCut: 'Dein Eröffnungshaken fließt in einen zweiten Tweet über.',
    xReasonCtaBelow: 'Dein CTA erscheint in einem Thread-Tweet.',
    xReasonHookOnly: 'Dein Hook passt in den ersten Tweet; kein CTA gefunden.',
    xReasonHookAndCta: 'Dein Hook und dein CTA passen beide in den ersten Tweet.'
  },
  es: {
    xReasonFits: 'Toda tu publicación cabe en un solo tweet.',
    xReasonHookCut: 'Tu gancho inicial se extiende a un segundo tweet.',
    xReasonCtaBelow: 'Tu CTA aparece en un tweet de hilo.',
    xReasonHookOnly: 'Tu gancho cabe en el primer tweet; no se detectó CTA.',
    xReasonHookAndCta: 'Tu gancho y tu CTA caben en el primer tweet.'
  },
  fr: {
    xReasonFits: 'Tout votre post tient dans un seul tweet.',
    xReasonHookCut: 'Votre accroche déborde sur un deuxième tweet.',
    xReasonCtaBelow: 'Votre CTA apparaît dans un tweet en fil de discussion.',
    xReasonHookOnly: 'Votre accroche tient dans le premier tweet ; aucun CTA détecté.',
    xReasonHookAndCta: 'Votre accroche et votre CTA tiennent tous deux dans le premier tweet.'
  },
  it: {
    xReasonFits: 'Tutto il tuo post entra in un singolo tweet.',
    xReasonHookCut: 'Il tuo gancio iniziale si riversa in un secondo tweet.',
    xReasonCtaBelow: 'La tua CTA appare in un tweet concatenato.',
    xReasonHookOnly: 'Il tuo gancio entra nel primo tweet; nessuna CTA rilevata.',
    xReasonHookAndCta: 'Sia il tuo gancio che la CTA entrano nel primo tweet.'
  },
  ja: {
    xReasonFits: '投稿全体が1つのツイートに収まります。',
    xReasonHookCut: '最初のフックが2つ目のツイートにはみ出します。',
    xReasonCtaBelow: 'CTAがスレッドのツイートに表示されます。',
    xReasonHookOnly: 'フックは最初のツイートに収まりますが、CTAは検出されませんでした。',
    xReasonHookAndCta: 'フックとCTAの両方が最初のツイートに収まります。'
  },
  nl: {
    xReasonFits: 'Je hele bericht past in één tweet.',
    xReasonHookCut: 'Je openingszin loopt over in een tweede tweet.',
    xReasonCtaBelow: 'Je CTA verschijnt in een draad-tweet.',
    xReasonHookOnly: 'Je hook past in de eerste tweet; geen CTA gedetecteerd.',
    xReasonHookAndCta: 'Je hook en CTA passen beide in de eerste tweet.'
  },
  pt: {
    xReasonFits: 'Toda a sua publicação cabe num único tweet.',
    xReasonHookCut: 'O seu gancho inicial passa para um segundo tweet.',
    xReasonCtaBelow: 'O seu CTA aparece num tweet encadeado.',
    xReasonHookOnly: 'O seu gancho cabe no primeiro tweet; nenhum CTA detetado.',
    xReasonHookAndCta: 'O seu gancho e CTA cabem no primeiro tweet.'
  },
  zh: {
    xReasonFits: '您的整条帖子可以放入一条推文中。',
    xReasonHookCut: '您的开篇引语溢出到第二条推文。',
    xReasonCtaBelow: '您的行动号召出现在推文话题中。',
    xReasonHookOnly: '您的引语包含在第一条推文中；未检测到行动号召。',
    xReasonHookAndCta: '您的引语和行动号召都包含在第一条推文中。'
  }
};

for (const lang of langs) {
  const filePath = path.join(__dirname, 'src', 'i18n', `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the hook summary to inject before it or after reasonHookAndCta
  // Regex to match the reasonHookAndCta line
  const regex = /(reasonHookAndCta:\s*['"][^'"]+['"],)/;
  
  if (regex.test(content) && !content.includes('xReasonFits:')) {
    const t = translations[lang];
    const injectStr = `\n      xReasonFits: '${t.xReasonFits}',\n      xReasonHookCut: '${t.xReasonHookCut}',\n      xReasonCtaBelow: '${t.xReasonCtaBelow}',\n      xReasonHookOnly: '${t.xReasonHookOnly}',\n      xReasonHookAndCta: '${t.xReasonHookAndCta}',`;
    
    content = content.replace(regex, `$1${injectStr}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${lang}.ts with X-specific reason strings`);
  }
}
