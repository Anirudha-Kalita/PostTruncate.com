// One-off diagnostic for task 3.4 fix-checking.
//
// The fixed build still reports page CLS > 0.1 on latin-script locales while the
// hero box is byte-identical across the Geist swap (hero shift = 0). This dumps
// the captured layout-shift entries sorted by value, with their source `details`
// selectors and hero `roles`, so the reflowing NON-hero nodes can be identified.
//
// It also compares late-font (delayed 2500ms → swap after FCP, the bug input) vs
// early-font (delay 0 → emulates the preloaded/font-ready state) page CLS. If the
// early-font CLS is also high, the residual shift is NOT font-swap driven and
// re-calibrating the metric-matched fallback (task 3.1) cannot fix it.
import { startStaticServer } from './static-server.mjs';
import { measureHeroCls } from './measure-cls.mjs';

const LOCALES = ['en', 'de'];
const server = await startStaticServer();
console.log(`serving build at ${server.origin}\n`);

for (const locale of LOCALES) {
  const late = await measureHeroCls({ origin: server.origin, locale, fontDelayMs: 2500 });
  const early = await measureHeroCls({ origin: server.origin, locale, fontDelayMs: 0 });

  console.log('='.repeat(72));
  console.log(`locale=${locale}`);
  console.log(`  late(delayed font, bug input)  page CLS = ${late.cls}`);
  console.log(`  early(font-ready, preloaded)   page CLS = ${early.cls}`);
  console.log(`  hero-attributed shift = ${late.heroShift}  titleReflowed=${late.titleReflowed}`);
  console.log('  shiftEntries (late) sorted by value desc:');

  const entries = [...late.entries]
    .filter((e) => !e.hadRecentInput)
    .sort((a, b) => b.value - a.value);

  for (const e of entries) {
    console.log(
      `    value=${e.value.toFixed(4)}  roles=[${e.roles.join(', ')}]  ` +
        `details=[${e.details.join(' | ')}]`,
    );
  }
  console.log('');
}

await server.close();
