import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:4321/en/character-counter/');
  try {
    const results = await new AxeBuilder({ page }).analyze();
    console.log(JSON.stringify(results.violations, null, 2));
  } catch (e) {
    console.error(e);
  }
  await browser.close();
})();
