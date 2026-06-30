import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

function readProjectFile(path) {
  return readFileSync(new URL(path, root), 'utf8');
}

test('site has required static assets and metadata', () => {
  const html = readProjectFile('index.html');
  const pkg = JSON.parse(readProjectFile('package.json'));

  assert.equal(pkg.name, 'twexapi-showcase');
  assert.equal(pkg.private, true);
  assert.equal(pkg.scripts.test, 'node --test');
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<title>TwexAPI Developer Docs<\/title>/);
  assert.match(html, /<meta name="description" content="Official TwexAPI documentation and developer guide/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
  assert.match(html, /<link rel="stylesheet" href="styles.css">/);
  assert.match(html, /<script src="script.js" defer><\/script>/);
});

test('site exposes all major documentation sections', () => {
  const html = readProjectFile('index.html');
  const requiredSections = [
    'overview',
    'quickstart',
    'authentication',
    'endpoints',
    'examples',
    'errors',
    'faq',
    'contact',
  ];

  for (const id of requiredSections) {
    assert.match(html, new RegExp(`<section[^>]+id="${id}"`), `missing #${id}`);
    assert.match(html, new RegExp(`href="#${id}"`), `missing nav link for #${id}`);
  }
});
