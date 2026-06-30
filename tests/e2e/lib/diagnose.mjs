import { startStaticServer } from './static-server.mjs';
import { measureHeroCls } from './measure-cls.mjs';

const server = await startStaticServer();
// Compare: late font (bug condition, delay 2500ms) vs early font (delay 0,
// simulating the post-fix preloaded state). If early-font CLS is well under
// 0.1, the cold-load CLS assertion is fix-validatable; the residual is noise.
for (const locale of ['en', 'da', 'ja']) {
  const late = await measureHeroCls({ origin: server.origin, locale, fontDelayMs: 2500 });
  const early = await measureHeroCls({ origin: server.origin, locale, fontDelayMs: 0 });
  console.log(`${locale}: late(delayed font) CLS=${late.cls}  early(font-ready) CLS=${early.cls}`);
}
await server.close();
