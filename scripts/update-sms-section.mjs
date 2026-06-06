/**
 * Migration script: for every non-English locale file, remove the
 * 3rd paragraph from seoCopy.sections[0] (the old SMS blurb) and insert a
 * new SMS section at index 1 with the canonical English copy.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = resolve(__dirname, '..', 'src', 'i18n');

const LOCALES = ['da', 'de', 'es', 'fr', 'it', 'ja', 'nl', 'pt', 'zh'];

const NEW_SMS_SECTION = `      {
        heading: 'Advanced SMS Character Counter & Segment Calculator',
        paragraphs: [
          'The professional <strong>SMS character counter</strong> goes far beyond basic text length checks by analyzing the underlying telecommunication data structures of your message in real time. Built specifically for complex messaging workflows, the tool accurately differentiates between standard <strong>GSM 7-bit encoding</strong> (which allows up to 160 characters per single text) and <strong>Unicode encoding</strong> (which slashes your limit down to 70 characters).',
          'Furthermore, it accounts for the hidden technical nuances that cause unexpected carrier billings. For example, it tracks <strong>GSM Extended Table characters</strong>—such as the Euro symbol (€), brackets [ ], braces { }, and the pipe symbol (|)—which safely remain in GSM-7 mode but instantly consume 2 character slots each.',
          'If your marketing copy exceeds a single threshold, our built-in <strong>SMS segment calculator</strong> estimates exact multipart message splits, factoring in the invisible User Data Headers (UDH) that reduce multi-part message boundaries to 153 characters for GSM or 67 characters for Unicode.',
        ],
      },`;

for (const locale of LOCALES) {
  const filePath = resolve(i18nDir, `${locale}.ts`);
  let content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Find the seoCopy start
  let seoCopyLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('seoCopy:') || lines[i].trim().startsWith('seoCopy :')) {
      seoCopyLine = i;
      break;
    }
  }
  if (seoCopyLine < 0) {
    console.log(`[${locale}] Could not find seoCopy block, skipping.`);
    continue;
  }

  // Find the SMS paragraph — it's in the first section's paragraphs array
  // and is the line that contains both "SMS" and "GSM 7-bit" (in localized form)
  // It always starts with a leading whitespace + single quote
  let smsParagraphLine = -1;
  // Search within a reasonable range after seoCopy
  for (let i = seoCopyLine; i < Math.min(seoCopyLine + 30, lines.length); i++) {
    const line = lines[i];
    // The SMS paragraph contains "GSM 7-bit" in all locales
    if (line.includes('GSM 7-bit') && line.trim().startsWith("'")) {
      smsParagraphLine = i;
      break;
    }
  }

  if (smsParagraphLine < 0) {
    console.log(`[${locale}] Could not find SMS paragraph, skipping.`);
    continue;
  }

  console.log(`[${locale}] Found SMS paragraph at line ${smsParagraphLine + 1}`);

  // Remove the SMS paragraph line
  lines.splice(smsParagraphLine, 1);

  // Now find where the first section ends (after the paragraph removal)
  // Look for the pattern: "        ]," followed by "      }," 
  // starting from the seoCopy section
  let insertAfter = -1;
  for (let i = seoCopyLine; i < Math.min(seoCopyLine + 30, lines.length); i++) {
    const trimmed = lines[i].trim();
    const nextTrimmed = i + 1 < lines.length ? lines[i + 1].trim() : '';
    if (trimmed === '],' && nextTrimmed === '},') {
      insertAfter = i + 1; // after the "},"
      break;
    }
  }

  if (insertAfter < 0) {
    console.log(`[${locale}] Could not find insertion point, skipping.`);
    continue;
  }

  console.log(`[${locale}] Inserting new SMS section after line ${insertAfter + 1}`);

  // Insert the new SMS section
  lines.splice(insertAfter + 1, 0, NEW_SMS_SECTION);

  writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`[${locale}] Done.`);
}

console.log('\nAll locale files updated.');
