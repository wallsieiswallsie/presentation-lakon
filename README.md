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

Build validates required inputs, replaces old `dist/`, copies the five presentation source files (`index.html`, `app.js`, `styles.css`, `entrance.css`, `stage.css`) unchanged, and copies the contents of `public/` into the build root. Missing assets return HTTP 404, not HTML. Only extensionless application routes outside `/assets/` use the index fallback; scene query strings work on refresh.

## Railway / Railpack

- Select Railpack and use the repository root containing `package.json` as the service root.
- Install uses npm and the committed `package-lock.json`; build is `npm run build` and start is `npm start` (`node server.mjs dist`). Leave custom Build/Start Command overrides unset so scripts are detected.
- No manually configured environment variable is required. Railway supplies `PORT`; the server binds to `0.0.0.0` on that port. `NODE_ENV=production` is optional for this dependency-free static server.
- Do not set `RAILPACK_SPA_OUTPUT_DIR`; Node serves the build. Remove stale port, build/start, or Node-version overrides if they conflict with this configuration.
- Enable Public Networking / Generate Domain to expose the service. No domain is embedded in the source. An optional healthcheck can use `/`.
- Commit source, `package.json` and `package-lock.json`. Keep `dist/`, `node_modules/` and environment files ignored. No `dist/` files were tracked at audit time. If tracked in another checkout, use `git rm -r --cached -- dist` to stop tracking while retaining local files.

See [Railpack Node.js detection](https://railpack.com/languages/node), [Railway start/build commands](https://docs.railway.com/builds/build-and-start-commands), and [Railway networking requirements](https://docs.railway.com/networking/troubleshooting/application-failed-to-respond). Local checks establish repository compatibility; they do not prove a Railway deployment has succeeded.

## Controls

- `Space` / `→` / `PageDown` (presentation clicker) next; `←` / `PageUp` previous. Each scene has beats: a press first reveals the next illustration, and the last beat moves the camera to the next scene. The dots next to `03 / 13` show the remaining beats.
- `1`–`9` jump to a scene; `M` map overview (all 13 scenes); `Q` Q&A; `D` jump to the live demo
- Changing scene: the panels close, the camera flies across the town, then the text card and illustration board open at the destination. Pressing next during the flight lands immediately.
- `H` or the ▤ button shows/hides both panels; the × on each panel closes just that one (next beat reopens the board).
- `C` or the **▶ Canva** button opens the Canva deck full-screen over everything (loaded only on first open, needs internet); close with the Close button (Esc/C work while focus is outside the slide).
- `F` fullscreen; `S` Safe Mode; `R` Reduced Motion; `Esc` close overlays
- Presenter notes (bottom bar) contain the full script line for each scene.

Deep links support `?scene=opening|gap|insight|users|loop|innovation|scope|demo|privacy|evidence|maturity|impact|closing`, scenario districts `?scene=healthcare|transport|interview|emergency&mode=qa`, plus `?safeMode=true` and `?reducedMotion=true`.

## Scenes and illustrations

The 13 scenes in `app.js` (`destinations`) follow `skrip.txt`. Each scene has a camera waypoint in the town and a `stage`: a list of pieces (members as characters, Panggung props, photos, SDG icons) that drop onto the cream board on the right. `x`/`y`/`w` are percentages of the board; `b` is the beat at which a piece appears.

- `public/assets/lakon/tokoh/wajah-1..4/`: member-face characters from `Panggung-Lakon` (webp). `CAST` at the top of `app.js` sets which face plays which role.
- `public/assets/lakon/props/`: props and cards from `Panggung-Lakon/aset/png`.
- `public/assets/lakon/foto/`, `sdg/`: images downloaded from the internet (credits below; each credit also appears in the photo caption on screen).

## Image credits

- Coffee shop: "Tamper Kopi", Pratechno, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Tamper_Kopi.jpg
- Community health centre: "Puskesmas Sruweng Kebumen", SATELIT BM9, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Puskesmas_Sruweng_Kebumen.jpg
- Train station: "Stasiun Tanah Abang 1", Gunawan Kartapranata, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Stasiun_Tanah_Abang_1.JPG
- Emergency: "Ambulans PSC 119 YES", Scarzmouche, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:AmbulansPSC119YES.jpg
- Job interview: U.S. Army photo by Pfc. Deziree Keay, public domain, https://commons.wikimedia.org/wiki/File:Job_fair_gives_community_members_more_job_opportunities_(7578464).jpg
- Deaf linguistic review: "Juru Bahasa Isyarat", Badak Ironman, CC BY 4.0, https://commons.wikimedia.org/wiki/File:Juru_Bahasa_Isyarat.jpg
- Deaf co-learners: U.S. Embassy Jakarta (Indonesian Deaf Basketball), public domain, https://commons.wikimedia.org/wiki/File:-DubesKamala_menyambut_tim_Indonesian_Deaf_Basketball_di_Kedubes_AS_(54194725721).jpg
- SDG 4.5 card: "Mau belajar bahasa isyarat? Ada aplikasinya lho.", USAID Indonesia, public domain, https://commons.wikimedia.org/wiki/File:Mau_belajar_bahasa_isyarat%3F_Ada_aplikasinya_lho._(15604552915).jpg
- SDG 10.2 card: U.S. Embassy Jakarta (Indonesian Deaf Basketball), public domain, https://commons.wikimedia.org/wiki/File:-DubesKamala_menyambut_tim_Indonesian_Deaf_Basketball_di_Kedubes_AS_(54194983649).jpg
- SDG 3.8 card: "Kegiatan Posyandu Desa Koto Cerenti", Refki Assadiky, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Kegiatan_Posyandu_Desa_Koto_Cerenti.jpg
- SDG 8.5 card: "Barista Tunanetra", Arie Basuki, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Barista_Tunanetra.jpg
- SDG 11.2 card: "Akses dari Halte Juanda menuju stasiun", Irvan Cahyo N, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Akses_dari_Halte_Juanda_menuju_stasiun.jpg
- Hand landmarks diagram: Google MediaPipe documentation, Apache 2.0, https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker
- Lighthouse logo: GoogleChrome/lighthouse, Apache 2.0
- SDG icons 3, 4, 8, 10, 11: United Nations, https://www.un.org/sustainabledevelopment/news/communications-material/ (non-commercial informational use per UN SDG guidelines)

## Entrance district

The entrance remains part of the existing 3200 × 2400 HTML/SVG camera canvas. `index.html` contains the semantic scenario buttons, physical entrance gate and plaza map board. `app.js` fits the entrance composition beside its introduction on desktop and above it on mobile; other stops continue to use the existing camera waypoints. `entrance.css` contains the town styling and entrance-specific UI, layered after the original presentation stylesheet.

The five supplied isometric building SVGs retain their original geometry with service-specific additions and a shared warm palette. `world-landscape.svg` provides paving, paths, planting and reusable SVG groups for trees, benches, lamps, planters, bicycles and bollards. The static SVG is one image in the page; repeated props use SVG `use` references. No rendering loop, new runtime dependency, external asset, dynamic light or particle system was added.

Buildings are native buttons with labels, hover/focus feedback and keyboard activation. The plaza board opens the existing map. The healthcare and transport button IDs now match the existing scenario records. Scene exits restore both copy and camera, scenario links reload without an unwanted Q&A overlay, and dialog focus stays within its controls.

This repository is a presentation, not the full learning application. It has no free-walking avatar, collision, proximity detection, learner completion state or scenario locks. The 13-scene progress bar is presentation progress only; no learning progression was invented. A future human-scale 3D implementation would require purpose-built assets and is outside this change.

## Claim boundaries

The current technical story is browser-based MediaPipe landmark extraction and DTW comparison. No recognition accuracy or trained-classifier result is claimed. Camera images and video are described as staying on device. Content is explicitly described as exploratory and requiring appropriate linguistic review before production use. Evidence counts are presented with their scope: software behaviour tests and audits do not establish learning effectiveness or universal usability.
