// Structural parity check: every locale dictionary must have the EXACT same set
// of key paths as `en` (the canonical shape). esbuild strips types without
// checking them, so this is what actually guarantees no locale silently lost,
// renamed, or mis-nested a key. Run with Node's native type stripping.
import { en } from '../src/i18n/en.ts';
import { es } from '../src/i18n/es.ts';
import { de } from '../src/i18n/de.ts';
import { fr } from '../src/i18n/fr.ts';
import { pt } from '../src/i18n/pt.ts';
import { it } from '../src/i18n/it.ts';
import { nl } from '../src/i18n/nl.ts';
import { ja } from '../src/i18n/ja.ts';
import { zh } from '../src/i18n/zh.ts';
import { da } from '../src/i18n/da.ts';

const locales = { es, de, fr, pt, it, nl, ja, zh, da };

// Collect every leaf path. Arrays include their length so a short/long array
// (e.g. a guide with 2 facts instead of 3) shows up as a mismatch.
function paths(obj, prefix = '') {
  const out = [];
  if (Array.isArray(obj)) {
    out.push(`${prefix}#len=${obj.length}`);
    obj.forEach((v, i) => out.push(...paths(v, `${prefix}[${i}]`)));
  } else if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj).sort())
      out.push(...paths(obj[k], prefix ? `${prefix}.${k}` : k));
  } else {
    // leaf: record path + whether the string is empty (empty = likely a miss)
    out.push(`${prefix}${obj === '' ? ' (EMPTY!)' : ''}`);
  }
  return out;
}

const ref = paths(en);
const refSet = new Set(ref.map((p) => p.replace(' (EMPTY!)', '')));
let bad = 0;

for (const [code, dict] of Object.entries(locales)) {
  const p = paths(dict);
  const set = new Set(p.map((x) => x.replace(' (EMPTY!)', '')));
  const missing = [...refSet].filter((x) => !set.has(x));
  const extra = [...set].filter((x) => !refSet.has(x));
  const empty = p.filter((x) => x.includes('(EMPTY!)'));

  if (missing.length || extra.length || empty.length) {
    bad++;
    console.log(`\n✗ ${code}:`);
    if (missing.length) console.log(`   MISSING (${missing.length}): ${missing.slice(0, 8).join(' | ')}`);
    if (extra.length) console.log(`   EXTRA   (${extra.length}): ${extra.slice(0, 8).join(' | ')}`);
    if (empty.length) console.log(`   EMPTY   (${empty.length}): ${empty.slice(0, 8).join(' | ')}`);
  } else {
    console.log(`✓ ${code}: ${set.size} paths — exact match`);
  }
}

console.log(
  bad === 0
    ? `\nALL 9 LOCALES STRUCTURALLY IDENTICAL TO en (${refSet.size} key paths each).`
    : `\n${bad} locale(s) have structural drift — see above.`
);
process.exit(bad === 0 ? 0 : 1);
