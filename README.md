# Aumet Ideas and Testing

Interactive prototypes for reviewing Aumet product ideas — mobile and website — before they go to engineering.

Read this file before editing. Screen markup lives in **HTML**, not JavaScript template strings.

**Live demo:** https://mohamedabusamra.github.io/aumet-ideas-and-testing/

## Layout

```
features/
  shell/                      demo chrome (sidebar, phone, website frame)
  mobile/                     phone surface
    onboarding/               epic
      landing/                screen: html + css + js
      create-account/
      ...
    login/                    linked login screen (not in the onboarding step list)
  website/                    desktop surface
    pos/                      Dosage labels epic
      print-config/
      dosage-library/
      pos-index/
js/                           app shell: state, route, mount, bind
css/tokens.css                color and scale tokens
css/app.css                   generated — do not edit
js/bundle.js                  generated — do not edit
js/generated/templates.js     generated — do not edit
```

## Surfaces and epics

- **Mobile → Onboarding** — pharmacy registration and complete profile
- **Website → Dosage labels** — print setup, saved phrases, POS print

URLs:

- `#/mobile/onboarding/landing`
- `#/website/pos/pos-index`

## Quick start

Open `index.html` in a browser (double-click uses `js/bundle.js`).

Or:

```bash
python3 -m http.server
# open http://localhost:8000
```

## After editing a screen

Change the feature's `.html` / `.css` / `.js`, then rebuild:

```bash
npm run build
```
