# Connected roads and fitted journey cards

## Root causes

The map is an SVG image below the existing HTML building buttons. Its pedestrian branches stopped at label coordinates, approximately 60–140 world units short of their building frontages. The office branch started off the main walk, and the entrance/outer street ended within open landscape. Rendering complete border/surface pairs one after another also left borders crossing junctions.

All story stops use `#storyPanel`; the counter view uses `#sceneCopy`. The former's 840 × 700 absolutely positioned scrim extended beyond the content bounds. At 1366 × 768, the crossroad panel measured 540 × 386 client pixels but 710 × 570 scroll pixels. `overflow-y:auto` also made the horizontal axis compute to `auto`. Narrow text measure, forced breaks in the two longest headlines and large vertical gaps added avoidable height.

## Changes

- Three reusable SVG centerlines define the outer street, arrival walk and scenario branches. Border and surface use the same geometry.
- Arrival continues past the southern SVG boundary; the outer street enters/exits beyond the left/right boundaries.
- Paths reach the café, clinic, transport shelter, office and emergency frontages. The office route curves around the clinic's west side. Emergency branches from the health route; all return to the plaza/main walk.
- Borders render before surfaces, with rounded caps/joins. Existing primary/secondary widths remain 140/56 world units; the outer street has a cream surface. Buildings, labels and props remain above roads.
- Shared `.journey-card` styling applies to narrative, scenario, evidence and counter cards. It uses a real warm-brown translucent surface, flex column layout, responsive width/height-aware typography, compact spacing, wrapping chips and a wrapping action footer.
- Removed the oversized narrative pseudo-element and scroll-container behavior. No content clipping or scrollbar-hiding rules were introduced. All copy remains; only forced line breaks in the crossroad and validation headlines became spaces.
- The entrance's existing light introduction remains unchanged because it did not have the dark-card overflow problem.

## Verification

`journey-layout-checks.json` records all seven story stops at **1920 × 1080, 1440 × 900, 1366 × 768 and 1280 × 720**: 28 checks, each with zero horizontal/vertical overflow, no child outside the panel, CTA inside the panel and clearance from global navigation. Non-entrance narrative cards retain the dark translucent background; entrance retains its light layout.

Four additional scenario cards and three Q&A evidence cards also measured zero overflow at 1280 × 720. The longest story card additionally fit at 390 × 844 (top 192.5, bottom 651.5), including chips and CTA. Counter role switching, destination/return buttons, numbered shortcuts, ArrowRight progression and Escape were exercised successfully. No application console warnings/errors were observed.

Visually inspected the complete entrance map and each of the five routes, including frontage ends, office clearance around the clinic and junction layering. Saved the final map and longest card screenshots. Build (`node build.mjs`) and JavaScript syntax check (`node --check app.js`) passed.

## Scope

Changed source files: `public/assets/lakon/common/world-landscape.svg`, `entrance.css`, `index.html`, `app.js` (two headline breaks only). Rebuilt `dist`. Added this report, measurement JSON and two screenshots under `verification/`.

No building positions, assets, camera behavior, scene routing, progress logic, keyboard mappings, Q&A/map chooser layout or learning content were replaced. No runtime dependency, animation loop or blur effect was added.
