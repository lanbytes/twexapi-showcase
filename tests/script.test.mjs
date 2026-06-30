import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

function readProjectFile(path) {
  return readFileSync(new URL(path, root), 'utf8');
}

test('script wires copy buttons with clipboard and fallback behavior', () => {
  const js = readProjectFile('script.js');

  assert.match(js, /querySelectorAll\('\[data-copy-target\]'\)/);
  assert.match(js, /navigator\.clipboard\.writeText/);
  assert.match(js, /document\.execCommand\('copy'\)/);
  assert.match(js, /Copied/);
});

test('script wires mobile navigation and active section highlighting', () => {
  const js = readProjectFile('script.js');

  assert.match(js, /querySelector\('\.nav-toggle'\)/);
  assert.match(js, /classList\.toggle\('nav-open'/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /aria-expanded/);
});
