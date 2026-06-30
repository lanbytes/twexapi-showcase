import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

function readProjectFile(path) {
  return readFileSync(new URL(path, root), 'utf8');
}

test('homepage explains the developer promise and core use cases', () => {
  const html = readProjectFile('index.html');

  assert.match(html, /Access X\/Twitter-style public data/i);
  assert.match(html, /profiles,\s+timelines, trends, and search workflows/i);
  assert.match(html, /Three minutes to your first request/i);
});

test('homepage documents the initial endpoint catalog', () => {
  const html = readProjectFile('index.html');
  const endpoints = [
    'GET /twitter/{username}/about',
    'GET /twitter/{username}/tweets',
    'GET /twitter/trends',
    'GET /twitter/search/users',
  ];

  for (const endpoint of endpoints) {
    assert.ok(html.includes(endpoint), `missing endpoint: ${endpoint}`);
  }
});

test('authentication examples use safe fake credentials only', () => {
  const html = readProjectFile('index.html');

  assert.ok(html.includes('Authorization: Bearer $TWEXAPI_KEY'));
  assert.ok(html.includes('twexapi_demo_key'));
  assert.doesNotMatch(html, /twitterx_[a-f0-9]{20,}/i);
  assert.doesNotMatch(html, /sk_live_[a-z0-9]+/i);
  assert.doesNotMatch(html, /sk-[A-Za-z0-9]{20,}/);
});

test('errors section covers expected status codes and recovery hints', () => {
  const html = readProjectFile('index.html');
  const statuses = ['400', '401', '404', '429', '500'];

  for (const status of statuses) {
    assert.match(html, new RegExp(`data-status="${status}"`), `missing status ${status}`);
  }

  assert.match(html, /Check the parameter name, type, and allowed range/i);
  assert.match(html, /Retry after the window resets/i);
});
