import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estimateDocumentPages } from './textTools';

// Default = 12pt Arial, single-spaced, A4, 1in margins. Calibrated to land
// near the ~500-words-per-page convention.

test('default settings put 1,000 words at roughly 2 pages', () => {
  const r = estimateDocumentPages(1000);
  assert.ok(r.wordsPerPage >= 450 && r.wordsPerPage <= 560, `wpp=${r.wordsPerPage}`);
  assert.ok(r.pages > 1.7 && r.pages < 2.3, `pages=${r.pages}`);
});

test('double spacing roughly halves words per page', () => {
  const single = estimateDocumentPages(1000, { spacing: 'single' }).wordsPerPage;
  const dbl = estimateDocumentPages(1000, { spacing: 'double' }).wordsPerPage;
  assert.ok(dbl < single);
  assert.ok(Math.abs(dbl - single / 2) / single < 0.1, `single=${single} double=${dbl}`);
});

test('wider margins reduce the usable area and words per page', () => {
  const normal = estimateDocumentPages(1000, { margins: { top: 1, right: 1, bottom: 1, left: 1 } });
  const wide = estimateDocumentPages(1000, { margins: { top: 2, right: 2, bottom: 2, left: 2 } });
  assert.ok(wide.wordsPerPage < normal.wordsPerPage);
});

test('legal paper holds more than letter, which differs from A4', () => {
  const letter = estimateDocumentPages(1000, { format: 'letter' }).wordsPerPage;
  const legal = estimateDocumentPages(1000, { format: 'legal' }).wordsPerPage;
  assert.ok(legal > letter, `letter=${letter} legal=${legal}`);
});

test('a narrow font (Times) fits more words per page than a wide one (Verdana)', () => {
  const times = estimateDocumentPages(1000, { font: 'times' }).wordsPerPage;
  const verdana = estimateDocumentPages(1000, { font: 'verdana' }).wordsPerPage;
  assert.ok(times > verdana, `times=${times} verdana=${verdana}`);
});

test('cm units are converted — 2.54cm margins ≈ 1in margins', () => {
  const inch = estimateDocumentPages(1000, { unit: 'inch', margins: { top: 1, right: 1, bottom: 1, left: 1 } });
  const cm = estimateDocumentPages(1000, { unit: 'cm', margins: { top: 2.54, right: 2.54, bottom: 2.54, left: 2.54 } });
  assert.equal(cm.wordsPerPage, inch.wordsPerPage);
});

test('larger font size yields fewer words per page', () => {
  const small = estimateDocumentPages(1000, { fontSize: 10 }).wordsPerPage;
  const large = estimateDocumentPages(1000, { fontSize: 16 }).wordsPerPage;
  assert.ok(large < small);
});

test('zero / negative / non-finite word counts produce 0 pages, not NaN', () => {
  assert.equal(estimateDocumentPages(0).pages, 0);
  assert.equal(estimateDocumentPages(-5).pages, 0);
  assert.equal(estimateDocumentPages(NaN).pages, 0);
  assert.equal(estimateDocumentPages(Infinity).pages, 0);
});

test('wordsPerPage never drops below 1 even with huge margins', () => {
  const r = estimateDocumentPages(1000, { margins: { top: 20, right: 20, bottom: 20, left: 20 } });
  assert.ok(r.wordsPerPage >= 1);
});
