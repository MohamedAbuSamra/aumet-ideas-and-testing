# Aumet Ideas and Testing

Interactive prototypes for reviewing Aumet product ideas — mobile and website — before they go to engineering.

**Live demo:** https://mohamedabusamra.github.io/aumet-ideas-and-testing/

## Surfaces

- **Mobile** — pharmacy registration and complete profile
- **Website** — Pulse POS dosage labels (print setup, saved phrases, cart print)

Switch surfaces and epics from the toolbar, or jump with the URL:

- `#/mobile/onboarding/landing`
- `#/website/pos/pos-index`

## Quick start

Open `index.html` in a browser (double-click works — uses the bundled `js/bundle.js`).

Or run a local server:

```bash
python3 -m http.server
# open http://localhost:8000
```

## After editing JavaScript

Rebuild the bundle so `index.html` picks up changes when opened without a server:

```bash
node scripts/build-bundle.cjs
```
