# Agent guide

This repo is a **static HTML prototype**, not the Aumet Help n-tier app. Do not add Fastify, Sequelize, or Next.js here.

Read the nearest `AGENTS.md` before editing a folder. Root layout is in `README.md`.

## Source of truth

| Kind | Edit | Do not edit |
| --- | --- | --- |
| Screen markup | `features/<surface>/<epic>/<screen>/<screen>.html` | JS template strings |
| Screen styles | colocated `.css` or epic `shared/` | `css/app.css` |
| Screen behavior | colocated `.js` | `js/bundle.js` |
| Demo chrome | `features/shell/` | — |
| Tokens | `css/tokens.css` | — |

After HTML/CSS/JS changes run `npm run build`. That regenerates `css/app.css`, `js/generated/templates.js`, and `js/bundle.js` for `file://` and GitHub Pages.

## Feature folders

Group by **surface → epic → screen**. Each screen folder owns its HTML, and CSS/JS when that screen has unique design or behavior.

```
features/mobile/onboarding/landing/landing.html
features/mobile/onboarding/landing/landing.css
features/mobile/onboarding/landing/landing.js
```

Shared chrome for an epic stays in that epic's `shared/` (example: complete-profile CSS/JS). Shared mobile chrome is `features/mobile/shared/`.

Cross-feature imports go through the epic barrel (`features/mobile/onboarding/index.js`, `features/website/pos/index.js`). Same-folder files use `./`.

## Adding a screen

1. Add `features/<surface>/<epic>/<id>/<id>.html` (and `.css` / `.js` if needed).
2. Append the screen to that epic's `screens.js`.
3. If it has behavior, export `bind…()` and call it from the epic `index.js`.
4. Run `npm run build`.

## Adding an epic

1. Add `features/<surface>/<epicId>/` with `screens.js` and `index.js`.
2. Register it in `features/<surface>/epics.js`.
3. Map screens in `js/registry.js` `EPIC_SCREENS`.
4. Run `npm run build`.

## Conventions

- camelCase in JS identifiers.
- Keep `data-goto`, `data-screen`, and `data-feature-canvas` attributes stable — navigation depends on them.
- Do not put pixel layouts in JavaScript. HTML + CSS only.
