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
