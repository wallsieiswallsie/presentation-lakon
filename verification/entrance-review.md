# Entrance review — 4 October 2026

## Audit findings

- This is a static HTML/CSS/SVG presentation: a 3200 × 2400 world, transformed by `setCamera` in `app.js`, with seven story waypoints and four additional scenario views. No React, WebGL or game engine is involved.
- The previous entrance camera targeted an off-centre road and small numbered marker. Large dark copy dominated the town. The five supplied building assets had nearly identical silhouettes.
- Healthcare and transport world objects used `health`/`transit`, while the navigation records expected `healthcare`/`transport`; their click handlers could not resolve a scenario.
- Navigation uses next/previous, number keys, world destinations, map/Q&A dialogs and URL parameters. Only presentation progress exists; there is no avatar controller, collision, proximity or learner unlock/completion logic.
- Expensive candidates were the full-screen grain, shadows/filters, camera transforms and large scenario PNGs. No stateful frame loop exists.

## Changes

Retained the world canvas, transform camera, story destinations, scenario artwork and controls. Composed an arrival gate, main pedestrian walk and plaza with branching paths. Refined the five original building SVGs with shared materials and different service silhouettes/cues. Added static landscape SVG definitions reused by `use`: tree, planter, bench, lamp, bicycle and bollard. Added physical gate and map-board elements and shared native-button styling for destinations.

The entrance uses warm daylight colors and a compact introduction; later story scenes retain dark text treatment. Responsive camera fitting reserves room for the introduction. Fixed destination identifiers, scenario reload/return consistency, keyboard button activation, dialog focus, and an existing final-stop return button obscured by the footer. The original human-question framing remains in presenter notes.

## Verification performed

- `node --check app.js`: passed.
- `npm run build`, then subsequent `node build.mjs` after refinements: passed; preview serves rebuilt `dist` at port 4173.
- Browser inspection at 1440 × 900, 1366 × 768 and 1920 × 1080; all entrance landmarks and primary CTA remain in view. Mobile 390 × 844 retains the town above the introduction.
- All five scenario buttons: reached their matching content. Coffee activated with Space from keyboard focus.
- Next-story transitions, numbered waypoint shortcuts, counter role switch, Browser Lab, Validation Gate and return to entrance: passed. At 1366 × 768 the final return button is above the footer and receives pointer input.
- Plaza/map opening, destination list, Q&A privacy topic, Shift+Tab wrap and Escape: passed.
- Safe mode and reduced-motion toggles: passed, including a story transition with both enabled.
- Direct emergency scenario reload preserves the scenario view without opening the Q&A chooser.
- No broken image elements or application console warnings/errors were observed during these checks.

## Scope and limits

No collision or learner progression tests apply because those systems do not exist here. Existing presentation progression and controls remain. Fullscreen is retained but was not toggled during verification. No FPS benchmark or cross-browser certification was performed. Added decoration is static, uses reused SVG groups, and introduces no continuous frame loop, dynamic lighting or runtime dependency. No custom external artwork is required; more detailed or 3D architecture would need a separate art pass.
