import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

function readProjectFile(path) {
  return readFileSync(new URL(path, root), 'utf8');
}

test('README documents local viewing, serving, and verification', () => {
  const readme = readProjectFile('README.md');

  assert.match(readme, /Official documentation and developer guide for TwexAPI/);
  assert.match(readme, /Open `index\.html` in a browser/i);
  assert.match(readme, /npm run serve/);
  assert.match(readme, /npm test/);
  assert.match(readme, /No dependencies are required/i);
});
