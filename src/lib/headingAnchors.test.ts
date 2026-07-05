import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitToolSections } from './headingAnchors';

test('splits a flat h2-delimited body into one section per heading', () => {
  const html =
    '<h2 id="a">First</h2>\n<p>Para one.</p>\n' +
    '<h2 id="b">Second</h2>\n<ul><li>Item</li></ul>';
  const sections = splitToolSections(html);
  assert.equal(sections.length, 2);
  assert.equal(sections[0].id, 'a');
  assert.equal(sections[0].headingHtml, 'First');
  assert.equal(sections[0].bodyHtml, '<p>Para one.</p>');
  assert.equal(sections[1].id, 'b');
  assert.equal(sections[1].headingHtml, 'Second');
  assert.equal(sections[1].bodyHtml, '<ul><li>Item</li></ul>');
});

test('keeps inline markup inside the heading', () => {
  const sections = splitToolSections('<h2>Why <strong>links</strong> cost 23</h2><p>x</p>');
  assert.equal(sections.length, 1);
  assert.equal(sections[0].headingHtml, 'Why <strong>links</strong> cost 23');
});

test('heading without an id yields an empty id', () => {
  const sections = splitToolSections('<h2>No id</h2><p>body</p>');
  assert.equal(sections[0].id, '');
});

test('empty input yields no sections', () => {
  assert.deepEqual(splitToolSections(''), []);
});
