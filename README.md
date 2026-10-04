# LAKON — A Journey Through Communication

A standalone static presentation website. It uses a bounded illustrated city as a continuous camera canvas; it has no runtime framework, external API, analytics, or internet font dependency.

## Run

From this directory in PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

Use Node.js 22.x (verified locally with 22.14.0) and npm 10.9.2. `npm run dev` builds the current source and serves `dist/`; restart it after source edits. There is no file watcher. In shells without PowerShell execution-policy restrictions, `npm` can be used instead of `npm.cmd`.

To run a production build locally:

```powershell
npm.cmd run build
npm.cmd start
```

Development, preview (`npm run preview`) and production start use the same static server. Open `http://localhost:5173` locally when `PORT` is unset. The server listens on `0.0.0.0` and prioritizes `PORT`; 5173 is only the local fallback. Preview/start require an existing build.

Build validates required inputs, replaces old `dist/`, copies the four presentation source files unchanged, and copies the contents of `public/` into the build root:

```text
dist/
  index.html
  app.js
  styles.css
  entrance.css
  assets/lakon/
    coffee/       (1 PNG)
    common/       (10 SVG)
    emergency/    (1 PNG)
    healthcare/   (1 PNG)
    interview/    (1 PNG)
    transport/    (1 PNG)
```

For example, `public/assets/lakon/coffee/panggung-barista-lambai.png` becomes `dist/assets/lakon/coffee/panggung-barista-lambai.png`, served at `/assets/lakon/coffee/panggung-barista-lambai.png`. Missing assets return HTTP 404, not HTML. Only extensionless application routes outside `/assets/` use the index fallback; scene query strings work on refresh.

## Railway / Railpack

- Select Railpack and use the repository root containing `package.json` as the service root.
- Install uses npm and the committed `package-lock.json`; build is `npm run build` and start is `npm start` (`node server.mjs dist`). Leave custom Build/Start Command overrides unset so scripts are detected.
- No manually configured environment variable is required. Railway supplies `PORT`; the server binds to `0.0.0.0` on that port. `NODE_ENV=production` is optional for this dependency-free static server.
- Do not set `RAILPACK_SPA_OUTPUT_DIR`; Node serves the build. Remove stale port, build/start, or Node-version overrides if they conflict with this configuration.
- Enable Public Networking / Generate Domain to expose the service. No domain is embedded in the source. An optional healthcheck can use `/`.
- Commit source, `package.json` and `package-lock.json`. Keep `dist/`, `node_modules/` and environment files ignored. No `dist/` files were tracked at audit time. If tracked in another checkout, use `git rm -r --cached -- dist` to stop tracking while retaining local files.

See [Railpack Node.js detection](https://railpack.com/languages/node), [Railway start/build commands](https://docs.railway.com/builds/build-and-start-commands), and [Railway networking requirements](https://docs.railway.com/networking/troubleshooting/application-failed-to-respond). Local checks establish repository compatibility; they do not prove a Railway deployment has succeeded.

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
