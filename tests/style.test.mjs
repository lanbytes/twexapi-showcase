import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

function readProjectFile(path) {
  return readFileSync(new URL(path, root), 'utf8');
}

test('stylesheet defines the core design system and readable code blocks', () => {
  const css = readProjectFile('styles.css');

  assert.match(css, /--color-bg:\s*#f7f8f5/);
  assert.match(css, /--color-accent:\s*#0f7b68/);
  assert.match(css, /\.code-block\s*{/);
  assert.match(css, /overflow-x:\s*auto/);
  assert.match(css, /font-family:\s*"SFMono-Regular"/);
});

test('stylesheet includes responsive navigation and layout safeguards', () => {
  const css = readProjectFile('styles.css');

  assert.match(css, /\.site-header\s*{[\s\S]*position:\s*sticky/);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /\.nav-open\s+\.site-nav/);
  assert.match(css, /grid-template-columns:\s*repeat\(auto-fit, minmax\(220px, 1fr\)\)/);
  assert.doesNotMatch(css, /letter-spacing:\s*-/);
});
