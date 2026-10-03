# LAKON — A Journey Through Communication

A standalone static presentation website. It uses a bounded illustrated city as a continuous camera canvas; it has no runtime framework, external API, analytics, or internet font dependency.

## Run

From this directory in PowerShell:

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
```

Development runs at `http://127.0.0.1:5173`. Build writes the offline-ready site to `dist/`; preview serves that build at `http://127.0.0.1:4173`.

## Controls

- `Space` / `→` next; `←` previous; `1`–`7` jump to a story waypoint
- `M` map overview; `Q` Q&A; `D` demo handoff to Coffee Shop
- `F` fullscreen; `S` Safe Mode; `R` Reduced Motion; `Esc` close overlays
- Presenter notes are available from the bottom bar

Deep links support `?scene=entrance|crossroad|theatre|coffee|counter|lab|validation`, `?mode=qa`, `?safeMode=true`, and `?reducedMotion=true`.

## Asset selection

The presentation imports only files copied into `public/assets/lakon/`. The source library in Downloads remains unchanged.

Used groups: the common LAKON logo, map-building SVGs and pedestrian SVGs; the Coffee Shop stage artwork for the hero and Across the Counter; and one stage illustration for each of the other scenario districts (healthcare, transport, interview and emergency). Map buildings are clickable and the scenario districts are also listed in the map overview.

Not imported: the 20 MB source PowerPoint, duplicate PNG versions of map-building SVGs, and most individual characters, props, backgrounds and alternate poses. The continuous city is assembled from HTML/CSS and inline SVG; the Coffee Shop stage is the only illustration used in the central story route.

## Entrance district

The entrance remains part of the existing 3200 × 2400 HTML/SVG camera canvas. `index.html` contains the semantic scenario buttons, physical entrance gate and plaza map board. `app.js` fits the entrance composition beside its introduction on desktop and above it on mobile; other stops continue to use the existing camera waypoints. `entrance.css` contains the town styling and entrance-specific UI, layered after the original presentation stylesheet.

The five supplied isometric building SVGs retain their original geometry with service-specific additions and a shared warm palette. `world-landscape.svg` provides paving, paths, planting and reusable SVG groups for trees, benches, lamps, planters, bicycles and bollards. The static SVG is one image in the page; repeated props use SVG `use` references. No rendering loop, new runtime dependency, external asset, dynamic light or particle system was added.

Buildings are native buttons with labels, hover/focus feedback and keyboard activation. The plaza board opens the existing map. The healthcare and transport button IDs now match the existing scenario records. Scene exits restore both copy and camera, scenario links reload without an unwanted Q&A overlay, and dialog focus stays within its controls.

This repository is a presentation, not the full learning application. It has no free-walking avatar, collision, proximity detection, learner completion state or scenario locks. The seven-stop presentation progress bar remains intact; no learning progression was invented. No new art is required to run the entrance. A future human-scale 3D implementation would require purpose-built assets and is outside this change.

## Claim boundaries

The current technical story is browser-based MediaPipe landmark extraction and DTW comparison. No recognition accuracy or trained-classifier result is claimed. Camera images and video are described as staying on device. Content is explicitly described as exploratory and requiring appropriate linguistic review before production use. Evidence counts are presented with their scope: software behaviour tests and audits do not establish learning effectiveness or universal usability.
