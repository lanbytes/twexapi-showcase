# TwexAPI Docs Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished static TwexAPI developer documentation and showcase MVP that can be opened directly or served locally.

**Architecture:** The site is a zero-dependency static frontend made of `index.html`, `styles.css`, and `script.js`. Node's built-in test runner verifies document structure, required content, styling hooks, interactions, README guidance, and absence of committed secrets.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in `node:test`.

---

## File Structure

- Create: `package.json` - project metadata and `npm test` / `npm run serve` scripts.
- Create: `index.html` - single-page TwexAPI docs/showcase with anchored sections.
- Create: `styles.css` - responsive visual system, layout, code blocks, navigation, and mobile states.
- Create: `script.js` - copy buttons, mobile navigation toggle, and active section highlighting.
- Create: `tests/site-structure.test.mjs` - verifies static assets, metadata, and section anchors.
- Create: `tests/content.test.mjs` - verifies product promise, endpoint examples, authentication examples, error docs, and safe credentials.
- Create: `tests/style.test.mjs` - verifies key CSS patterns and responsive safeguards.
- Create: `tests/script.test.mjs` - verifies interaction code exists for copy, fallback copy, navigation toggle, and section observation.
- Create: `tests/readme.test.mjs` - verifies local usage and testing instructions.
- Modify: `README.md` - explain what the showcase is and how to view, serve, and test it.

### Task 1: Static Site Scaffold And Structure Tests

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `tests/site-structure.test.mjs`

- [ ] **Step 1: Write the failing structure test**

Create `tests/site-structure.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the structure test to verify it fails**

Run:

```bash
node --test tests/site-structure.test.mjs
```

Expected: FAIL with an `ENOENT` error for `index.html` or `package.json`.

- [ ] **Step 3: Add the minimal static scaffold**

Create `package.json`:

```json
{
  "name": "twexapi-showcase",
  "version": "0.1.0",
  "private": true,
  "description": "Official documentation and developer guide for TwexAPI.",
  "type": "module",
  "scripts": {
    "test": "node --test",
    "serve": "python3 -m http.server 4173"
  }
}
```

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Official TwexAPI documentation and developer guide for building with X/Twitter-style public data.">
    <title>TwexAPI Developer Docs</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="#overview">TwexAPI</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
        <a href="#overview">Overview</a>
        <a href="#quickstart">Quickstart</a>
        <a href="#authentication">Authentication</a>
        <a href="#endpoints">Endpoints</a>
        <a href="#examples">Examples</a>
        <a href="#errors">Errors</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
      <section class="section" id="overview"><h1>TwexAPI Developer Docs</h1></section>
      <section class="section" id="quickstart"><h2>Quickstart</h2></section>
      <section class="section" id="authentication"><h2>Authentication</h2></section>
      <section class="section" id="endpoints"><h2>Endpoints</h2></section>
      <section class="section" id="examples"><h2>Examples</h2></section>
      <section class="section" id="errors"><h2>Errors</h2></section>
      <section class="section" id="faq"><h2>FAQ</h2></section>
      <section class="section" id="contact"><h2>Contact</h2></section>
    </main>
  </body>
</html>
```

Create `styles.css`:

```css
:root {
  color: #101418;
  background: #f7f8f5;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.site-nav {
  display: flex;
  gap: 12px;
}

.section {
  padding: 48px 16px;
}
```

Create `script.js`:

```js
document.documentElement.classList.add('js-enabled');
```

- [ ] **Step 4: Run the structure test to verify it passes**

Run:

```bash
node --test tests/site-structure.test.mjs
```

Expected: PASS with 2 passing tests.

- [ ] **Step 5: Commit the scaffold**

Run:

```bash
git add package.json index.html styles.css script.js tests/site-structure.test.mjs
git commit -m "feat: scaffold static TwexAPI docs site"
```

Expected: commit succeeds.

### Task 2: Documentation Content And Content Tests

**Files:**
- Create: `tests/content.test.mjs`
- Modify: `index.html`

- [ ] **Step 1: Write the failing content test**

Create `tests/content.test.mjs`:

```js
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
  assert.doesNotMatch(html, new RegExp('sk_' + 'live_[a-z0-9]+', 'i'));
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
```

- [ ] **Step 2: Run the content test to verify it fails**

Run:

```bash
node --test tests/content.test.mjs
```

Expected: FAIL because the scaffold page does not yet include the detailed TwexAPI content.

- [ ] **Step 3: Replace the scaffold HTML with complete MVP content**

Replace `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Official TwexAPI documentation and developer guide for building with X/Twitter-style public data.">
    <title>TwexAPI Developer Docs</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="#overview" aria-label="TwexAPI overview">
        <span class="brand-mark">T</span>
        <span>TwexAPI</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span class="nav-toggle-line"></span>
        <span class="nav-toggle-line"></span>
        <span class="nav-toggle-line"></span>
        <span class="sr-only">Toggle navigation</span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
        <a href="#overview">Overview</a>
        <a href="#quickstart">Quickstart</a>
        <a href="#authentication">Authentication</a>
        <a href="#endpoints">Endpoints</a>
        <a href="#examples">Examples</a>
        <a href="#errors">Errors</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main>
      <section class="hero section" id="overview">
        <div class="hero-copy">
          <p class="eyebrow">Official developer guide</p>
          <h1>TwexAPI</h1>
          <p class="hero-text">
            Access X/Twitter-style public data through predictable API calls for profiles,
            timelines, trends, and search workflows.
          </p>
          <div class="hero-actions" aria-label="Primary actions">
            <a class="button primary" href="#quickstart">Start quickstart</a>
            <a class="button secondary" href="#endpoints">View endpoints</a>
          </div>
          <dl class="hero-stats" aria-label="TwexAPI highlights">
            <div>
              <dt>First request</dt>
              <dd>3 min</dd>
            </div>
            <div>
              <dt>Auth model</dt>
              <dd>Bearer token</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>JSON</dd>
            </div>
          </dl>
        </div>

        <div class="code-card" aria-label="Example API request">
          <div class="code-card-header">
            <span>GET /twitter/{username}/about</span>
            <button class="copy-button" type="button" data-copy-target="hero-curl">Copy</button>
          </div>
          <pre class="code-block"><code id="hero-curl">curl "https://api.twexapi.com/twitter/elonmusk/about" \
  -H "Authorization: Bearer $TWEXAPI_KEY"</code></pre>
          <div class="response-preview">
            <span class="status-dot"></span>
            <span>200 OK</span>
          </div>
          <pre class="code-block response"><code>{
  "username": "elonmusk",
  "name": "Elon Musk",
  "verified": true,
  "followers_count": 184000000,
  "profile_url": "https://x.com/elonmusk"
}</code></pre>
        </div>
      </section>

      <section class="section two-column" id="quickstart">
        <div>
          <p class="eyebrow">Quickstart</p>
          <h2>Three minutes to your first request</h2>
          <p>
            Set an API key, send a signed request, and receive normalized JSON that is ready
            for enrichment, monitoring, dashboards, or internal tools.
          </p>
        </div>
        <div class="steps">
          <article class="step">
            <span class="step-number">1</span>
            <h3>Store your key</h3>
            <p>Use an environment variable so credentials stay out of source control.</p>
            <div class="code-card compact">
              <div class="code-card-header">
                <span>.env</span>
                <button class="copy-button" type="button" data-copy-target="env-example">Copy</button>
              </div>
              <pre class="code-block"><code id="env-example">TWEXAPI_KEY=twexapi_demo_key</code></pre>
            </div>
          </article>
          <article class="step">
            <span class="step-number">2</span>
            <h3>Call an endpoint</h3>
            <p>Pass your bearer token in the `Authorization` header.</p>
            <div class="code-card compact">
              <div class="code-card-header">
                <span>Node fetch</span>
                <button class="copy-button" type="button" data-copy-target="quickstart-js">Copy</button>
              </div>
              <pre class="code-block"><code id="quickstart-js">const response = await fetch(
  "https://api.twexapi.com/twitter/elonmusk/about",
  {
    headers: {
      Authorization: `Bearer ${process.env.TWEXAPI_KEY}`
    }
  }
);

const profile = await response.json();
console.log(profile.username);</code></pre>
            </div>
          </article>
          <article class="step">
            <span class="step-number">3</span>
            <h3>Handle the response</h3>
            <p>Check status codes first, then read the JSON payload for normalized fields.</p>
          </article>
        </div>
      </section>

      <section class="section split-panel" id="authentication">
        <div>
          <p class="eyebrow">Authentication</p>
          <h2>Bearer tokens in every request</h2>
          <p>
            TwexAPI requests use a single bearer token. Keep it on the server side,
            rotate it when needed, and never ship it in browser client code.
          </p>
        </div>
        <div class="code-card">
          <div class="code-card-header">
            <span>Authorization header</span>
            <button class="copy-button" type="button" data-copy-target="auth-header">Copy</button>
          </div>
          <pre class="code-block"><code id="auth-header">Authorization: Bearer $TWEXAPI_KEY</code></pre>
          <ul class="check-list">
            <li>Use HTTPS for every request.</li>
            <li>Keep keys in environment variables or secret managers.</li>
            <li>Use `twexapi_demo_key` only in examples and tests.</li>
          </ul>
        </div>
      </section>

      <section class="section" id="endpoints">
        <div class="section-heading">
          <p class="eyebrow">Endpoints</p>
          <h2>Core API surface</h2>
          <p>Start with a small set of high-value endpoints, then expand as your workflow grows.</p>
        </div>
        <div class="endpoint-grid">
          <article class="endpoint-card">
            <span class="method">GET</span>
            <h3>/twitter/{username}/about</h3>
            <p><code>GET /twitter/{username}/about</code></p>
            <p>Fetch normalized profile metadata, verification state, follower counts, and profile links.</p>
          </article>
          <article class="endpoint-card">
            <span class="method">GET</span>
            <h3>/twitter/{username}/tweets</h3>
            <p><code>GET /twitter/{username}/tweets</code></p>
            <p>Retrieve recent public timeline posts for monitoring, research, and content workflows.</p>
          </article>
          <article class="endpoint-card">
            <span class="method">GET</span>
            <h3>/twitter/trends</h3>
            <p><code>GET /twitter/trends</code></p>
            <p>Read trending topics for market scans, editorial planning, and discovery tools.</p>
          </article>
          <article class="endpoint-card">
            <span class="method">GET</span>
            <h3>/twitter/search/users</h3>
            <p><code>GET /twitter/search/users</code></p>
            <p>Search public accounts by keyword to build lead lists, creator maps, or research sets.</p>
          </article>
        </div>
      </section>

      <section class="section two-column" id="examples">
        <div>
          <p class="eyebrow">Examples</p>
          <h2>Build common workflows quickly</h2>
          <p>
            The examples are intentionally plain JavaScript so they can move into workers,
            backend routes, scripts, or data pipelines without framework lock-in.
          </p>
        </div>
        <div class="code-card">
          <div class="code-card-header">
            <span>Profile enrichment workflow</span>
            <button class="copy-button" type="button" data-copy-target="example-workflow">Copy</button>
          </div>
          <pre class="code-block"><code id="example-workflow">async function loadCreatorProfile(username) {
  const endpoint = `https://api.twexapi.com/twitter/${username}/about`;
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.TWEXAPI_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`TwexAPI request failed: ${response.status}`);
  }

  const profile = await response.json();
  return {
    handle: profile.username,
    name: profile.name,
    verified: profile.verified,
    followers: profile.followers_count,
    url: profile.profile_url
  };
}</code></pre>
        </div>
      </section>

      <section class="section" id="errors">
        <div class="section-heading">
          <p class="eyebrow">Errors</p>
          <h2>Predictable status codes</h2>
          <p>Check HTTP status first, then inspect the JSON body for a stable error code and message.</p>
        </div>
        <div class="error-grid">
          <article class="error-card" data-status="400">
            <strong>400</strong>
            <span>Invalid request</span>
            <p>Check the parameter name, type, and allowed range before retrying.</p>
          </article>
          <article class="error-card" data-status="401">
            <strong>401</strong>
            <span>Unauthorized</span>
            <p>Confirm the bearer token exists, is active, and is sent on the server side.</p>
          </article>
          <article class="error-card" data-status="404">
            <strong>404</strong>
            <span>Not found</span>
            <p>Verify the username, resource path, and whether the public resource exists.</p>
          </article>
          <article class="error-card" data-status="429">
            <strong>429</strong>
            <span>Rate limited</span>
            <p>Retry after the window resets and add backoff to scheduled jobs.</p>
          </article>
          <article class="error-card" data-status="500">
            <strong>500</strong>
            <span>Service error</span>
            <p>Retry with backoff and log the request id for support follow-up.</p>
          </article>
        </div>
        <div class="code-card">
          <div class="code-card-header">
            <span>Error response</span>
            <button class="copy-button" type="button" data-copy-target="error-response">Copy</button>
          </div>
          <pre class="code-block response"><code id="error-response">{
  "error": {
    "code": "rate_limited",
    "message": "Retry after the current window resets.",
    "request_id": "req_demo_123"
  }
}</code></pre>
        </div>
      </section>

      <section class="section" id="faq">
        <div class="section-heading">
          <p class="eyebrow">FAQ</p>
          <h2>Common implementation questions</h2>
        </div>
        <div class="faq-list">
          <article>
            <h3>Can I call TwexAPI from browser code?</h3>
            <p>Use a server-side route or worker so your bearer token never ships to end users.</p>
          </article>
          <article>
            <h3>What does the API return?</h3>
            <p>Responses are JSON objects with normalized fields designed for application code and data pipelines.</p>
          </article>
          <article>
            <h3>Is there a live playground?</h3>
            <p>The first showcase version focuses on readable docs and copyable examples.</p>
          </article>
        </div>
      </section>

      <section class="section contact-band" id="contact">
        <div>
          <p class="eyebrow">Contact</p>
          <h2>Ready to build with TwexAPI?</h2>
          <p>Request access, ask about endpoint coverage, or share the workflow you want to support.</p>
        </div>
        <a class="button primary" href="mailto:support@twexapi.com">Request access</a>
      </section>
    </main>

    <footer class="site-footer">
      <span>TwexAPI</span>
      <span>Official documentation and developer guide.</span>
    </footer>
  </body>
</html>
```

- [ ] **Step 4: Run the content and structure tests**

Run:

```bash
node --test tests/site-structure.test.mjs tests/content.test.mjs
```

Expected: PASS with 6 passing tests.

- [ ] **Step 5: Commit the documentation content**

Run:

```bash
git add index.html tests/content.test.mjs
git commit -m "feat: add TwexAPI documentation content"
```

Expected: commit succeeds.

### Task 3: Responsive Styling And Style Tests

**Files:**
- Create: `tests/style.test.mjs`
- Modify: `styles.css`

- [ ] **Step 1: Write the failing style test**

Create `tests/style.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the style test to verify it fails**

Run:

```bash
node --test tests/style.test.mjs
```

Expected: FAIL because the scaffold stylesheet does not yet contain the final design system.

- [ ] **Step 3: Replace `styles.css` with the full responsive stylesheet**

Replace `styles.css` with:

```css
:root {
  --color-bg: #f7f8f5;
  --color-panel: #ffffff;
  --color-ink: #101418;
  --color-muted: #5c6670;
  --color-line: #d9ded6;
  --color-accent: #0f7b68;
  --color-accent-strong: #0b5b4f;
  --color-code: #151a1e;
  --color-code-line: #30383f;
  --color-warning: #b25c00;
  --shadow-soft: 0 18px 60px rgba(20, 26, 30, 0.12);
  color: var(--color-ink);
  background: var(--color-bg);
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: var(--color-ink);
  background:
    linear-gradient(180deg, rgba(15, 123, 104, 0.08), rgba(247, 248, 245, 0) 360px),
    var(--color-bg);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
}

a {
  color: inherit;
}

code {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 72px;
  padding: 14px clamp(18px, 4vw, 56px);
  border-bottom: 1px solid rgba(217, 222, 214, 0.82);
  background: rgba(247, 248, 245, 0.9);
  backdrop-filter: blur(18px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--color-ink);
  font-weight: 800;
  text-decoration: none;
}

.brand-mark {
  display: inline-grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 8px;
  color: #ffffff;
  background: var(--color-accent);
  font-weight: 800;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.site-nav a {
  border-radius: 8px;
  padding: 8px 10px;
  color: var(--color-muted);
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
}

.site-nav a:hover,
.site-nav a.active {
  color: var(--color-ink);
  background: rgba(15, 123, 104, 0.1);
}

.nav-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: var(--color-panel);
}

.nav-toggle-line {
  display: block;
  width: 18px;
  height: 2px;
  margin: 4px auto;
  background: var(--color-ink);
}

.section {
  width: min(1120px, calc(100% - 36px));
  margin: 0 auto;
  padding: clamp(56px, 9vw, 96px) 0;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
  gap: clamp(32px, 6vw, 72px);
  align-items: center;
  min-height: calc(100vh - 72px);
  padding-top: clamp(48px, 8vw, 80px);
}

.hero-copy {
  max-width: 620px;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--color-accent-strong);
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 18px;
  font-size: clamp(48px, 8vw, 88px);
  line-height: 0.95;
}

h2 {
  margin-bottom: 16px;
  font-size: clamp(30px, 4.2vw, 52px);
  line-height: 1;
}

h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.hero-text,
.section-heading p,
.two-column > div > p,
.split-panel > div > p,
.contact-band p {
  color: var(--color-muted);
  font-size: clamp(17px, 2vw, 20px);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 28px 0;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  padding: 0 16px;
  font-weight: 800;
  text-decoration: none;
}

.button.primary {
  color: #ffffff;
  border-color: var(--color-accent);
  background: var(--color-accent);
}

.button.secondary {
  color: var(--color-ink);
  background: var(--color-panel);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
}

.hero-stats div {
  min-width: 0;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.66);
}

.hero-stats dt {
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 700;
}

.hero-stats dd {
  margin: 4px 0 0;
  font-weight: 850;
}

.code-card {
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: var(--color-panel);
  box-shadow: var(--shadow-soft);
}

.code-card.compact {
  margin-top: 14px;
  box-shadow: none;
}

.code-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 48px;
  padding: 0 14px;
  border-bottom: 1px solid var(--color-line);
  color: var(--color-muted);
  font-size: 13px;
  font-weight: 800;
}

.copy-button {
  min-width: 64px;
  min-height: 32px;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  color: var(--color-ink);
  background: #ffffff;
  font-weight: 800;
  cursor: pointer;
}

.copy-button:hover {
  border-color: var(--color-accent);
}

.code-block {
  margin: 0;
  padding: 18px;
  overflow-x: auto;
  color: #ecf3ef;
  background: var(--color-code);
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 13px;
  line-height: 1.65;
}

.code-block code {
  white-space: pre;
}

.code-block.response {
  border-top: 1px solid var(--color-code-line);
}

.response-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  color: var(--color-muted);
  font-size: 13px;
  font-weight: 800;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--color-accent);
}

.two-column,
.split-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(360px, 1.2fr);
  gap: clamp(28px, 5vw, 64px);
  align-items: start;
}

.steps {
  display: grid;
  gap: 18px;
}

.step,
.endpoint-card,
.error-card,
.faq-list article {
  border: 1px solid var(--color-line);
  border-radius: 8px;
  padding: 20px;
  background: var(--color-panel);
}

.step-number {
  display: inline-grid;
  width: 32px;
  height: 32px;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 8px;
  color: #ffffff;
  background: var(--color-accent);
  font-weight: 850;
}

.check-list {
  margin: 0;
  padding: 18px 20px 20px 36px;
  color: var(--color-muted);
}

.section-heading {
  max-width: 720px;
  margin-bottom: 28px;
}

.endpoint-grid,
.error-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.endpoint-card code {
  color: var(--color-accent-strong);
  font-size: 13px;
  font-weight: 800;
}

.method {
  display: inline-flex;
  align-items: center;
  height: 28px;
  margin-bottom: 14px;
  border-radius: 8px;
  padding: 0 10px;
  color: #ffffff;
  background: var(--color-accent);
  font-size: 12px;
  font-weight: 900;
}

.error-card strong {
  display: block;
  color: var(--color-warning);
  font-size: 30px;
}

.error-card span {
  display: block;
  margin-bottom: 8px;
  font-weight: 850;
}

.faq-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.contact-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  padding: clamp(28px, 5vw, 48px);
  background: #eef6f2;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: min(1120px, calc(100% - 36px));
  margin: 0 auto;
  padding: 28px 0 42px;
  color: var(--color-muted);
  font-size: 14px;
}

@media (max-width: 900px) {
  .hero,
  .two-column,
  .split-panel {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
  }
}

@media (max-width: 720px) {
  .site-header {
    min-height: 64px;
    padding: 12px 18px;
  }

  .nav-toggle {
    display: inline-block;
  }

  .site-nav {
    position: absolute;
    top: 63px;
    right: 18px;
    left: 18px;
    display: none;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid var(--color-line);
    border-radius: 8px;
    padding: 8px;
    background: var(--color-panel);
    box-shadow: var(--shadow-soft);
  }

  .nav-open .site-nav {
    display: flex;
  }

  .site-nav a {
    padding: 12px;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .contact-band,
  .site-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .button {
    width: 100%;
  }
}
```

- [ ] **Step 4: Run the style test and existing tests**

Run:

```bash
node --test tests/site-structure.test.mjs tests/content.test.mjs tests/style.test.mjs
```

Expected: PASS with 8 passing tests.

- [ ] **Step 5: Commit the responsive styling**

Run:

```bash
git add styles.css tests/style.test.mjs
git commit -m "feat: style TwexAPI docs showcase"
```

Expected: commit succeeds.

### Task 4: Lightweight Interactions And Script Tests

**Files:**
- Create: `tests/script.test.mjs`
- Modify: `script.js`

- [ ] **Step 1: Write the failing script test**

Create `tests/script.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the script test to verify it fails**

Run:

```bash
node --test tests/script.test.mjs
```

Expected: FAIL because `script.js` only contains the scaffold marker.

- [ ] **Step 3: Replace `script.js` with copy, nav, and active-section behavior**

Replace `script.js` with:

```js
document.documentElement.classList.add('js-enabled');

const copyButtons = document.querySelectorAll('[data-copy-target]');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.top = '-999px';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  fallbackCopy(text);
}

copyButtons.forEach((button) => {
  const originalLabel = button.textContent;
  const targetId = button.getAttribute('data-copy-target');
  const target = targetId ? document.getElementById(targetId) : null;

  if (!target) {
    button.disabled = true;
    return;
  }

  button.addEventListener('click', async () => {
    await copyText(target.textContent.trim());
    button.textContent = 'Copied';
    button.setAttribute('aria-live', 'polite');

    window.setTimeout(() => {
      button.textContent = originalLabel;
      button.removeAttribute('aria-live');
    }, 1600);
  });
});

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = Array.from(document.querySelectorAll('main section[id]'));
const linkById = new Map(
  Array.from(navLinks).map((link) => [link.getAttribute('href').slice(1), link])
);

if ('IntersectionObserver' in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      navLinks.forEach((link) => link.classList.remove('active'));
      const activeLink = linkById.get(visible.target.id);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    },
    {
      rootMargin: '-20% 0px -65% 0px',
      threshold: [0.1, 0.25, 0.5],
    }
  );

  sections.forEach((section) => observer.observe(section));
}
```

- [ ] **Step 4: Run all current tests**

Run:

```bash
node --test tests/site-structure.test.mjs tests/content.test.mjs tests/style.test.mjs tests/script.test.mjs
```

Expected: PASS with 10 passing tests.

- [ ] **Step 5: Commit the interactions**

Run:

```bash
git add script.js tests/script.test.mjs
git commit -m "feat: add docs showcase interactions"
```

Expected: commit succeeds.

### Task 5: README, Final Verification, And Commit

**Files:**
- Create: `tests/readme.test.mjs`
- Modify: `README.md`

- [ ] **Step 1: Write the failing README test**

Create `tests/readme.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the README test to verify it fails**

Run:

```bash
node --test tests/readme.test.mjs
```

Expected: FAIL because the current README only has the repository title and one-line description.

- [ ] **Step 3: Replace `README.md` with complete local usage instructions**

Replace `README.md` with:

````md
# twexapi-showcase

Official documentation and developer guide for TwexAPI.

This repository contains a static TwexAPI docs and showcase MVP. It is built with plain HTML, CSS, and JavaScript so it can be opened directly, hosted as static files, or evolved into a larger docs system as the API surface grows.

## View locally

Open `index.html` in a browser.

For a local HTTP server, run:

```bash
npm run serve
```

Then visit `http://localhost:4173`.

## Verify

No dependencies are required. The test suite uses Node's built-in test runner:

```bash
npm test
```

The tests check the page structure, required TwexAPI content, responsive CSS hooks, JavaScript interactions, README guidance, and that examples do not include real credentials.

## Project files

- `index.html` - single-page developer docs and showcase.
- `styles.css` - responsive layout and visual design.
- `script.js` - copy buttons, mobile navigation, and active section highlighting.
- `tests/` - static verification tests.
````

- [ ] **Step 4: Run the full automated test suite**

Run:

```bash
npm test
```

Expected: PASS with 11 passing tests across 5 test files.

- [ ] **Step 5: Verify no real secrets are present**

Run:

```bash
rg -n "twitterx_[a-f0-9]{20,}|sk[_]live_|sk-[A-Za-z0-9]{20,}" .
```

Expected: no matches.

- [ ] **Step 6: Verify static files are present**

Run:

```bash
ls index.html styles.css script.js package.json README.md
```

Expected output includes:

```text
README.md
index.html
package.json
script.js
styles.css
```

- [ ] **Step 7: Commit the README and final tests**

Run:

```bash
git add README.md tests/readme.test.mjs
git commit -m "docs: add local usage instructions"
```

Expected: commit succeeds.

- [ ] **Step 8: Check the final repository state**

Run:

```bash
git status --short
```

Expected: no output.
