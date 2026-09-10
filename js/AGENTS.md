# App runtime

Thin orchestrator. Product screens do not belong here.

| File | Role |
| --- | --- |
| `state.js` | shared demo state and DOM refs |
| `registry.js` | surfaces, epics, screen lists |
| `nav.js` | hash route, play/pause, `goTo` / `goToId` |
| `mount.js` | inject feature HTML into phone/web frames |
| `bind.js` | `data-goto` plus epic `bind…()` |
| `app.js` | boot |
| `generated/` | inlined HTML from the build |

Keep functions small. Feature behavior stays in `features/`.
