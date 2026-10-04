# Local and Railway compatibility review

Verified on 2026-10-04 with Node.js 22.14.0, npm 10.9.2 and headless Microsoft Edge on Windows.

## Changes

- `package.json`: retain build/preview/start, constrain Node to the tested major (22.x), record the detected npm version, and make dev build then serve the same dist tree. No dependency was added.
- `package-lock.json`: generated with npm install; lockfile version 3, consistent with package.json.
- `build.mjs`: validate mandatory source files and public directory before cleaning; copy public contents directly into dist; reject collisions with source filenames. Resolve paths relative to the build script.
- `server.mjs`: serve dist directly, read PORT before local defaults, bind to 0.0.0.0, distinguish missing assets from extensionless application routes, validate paths including realpath containment, provide MIME types, and close on SIGTERM/SIGINT.
- `.gitignore`: ignore node_modules, dist and the requested environment files.
- `index.html`: declare an empty data favicon so the browser does not request the nonexistent favicon.ico after correct 404 handling. No presentation markup, content, layout or behavior was changed.
- `README.md`: document the actual scripts, local development/rebuild workflow, build structure and Railway setup.
- This report records verification evidence and limitations.

The existing edits to package.json, server.mjs and .gitignore were retained and completed. app.js, styles.css, entrance.css and all source images remain unchanged.

## Path audit

- All 18 unique static references across HTML, JavaScript, CSS and the SVG assets were checked. Existing /assets URLs were already correct; no per-scene asset URL rewrite was needed.
- The old output location dist/public/assets/lakon/... was corrected to dist/assets/lakon/... for all 15 images: 5 PNG and 10 SVG.
- The server's special /assets -> /public/assets mapping was removed.
- The URL parser no longer needs a hardcoded localhost base.
- Missing /favicon.ico had previously received index.html; declaring an empty favicon removes that implicit browser request without adding artwork.
- There are no JPG/JPEG/WEBP, font or video files used by this presentation. The server supports their common MIME types, but direct successful asset tests use the actual PNG/SVG files. Missing JPG/JPEG/WEBP/font/video requests were verified as 404.

## Results

- npm install: exit 0; audited 1 package; 0 vulnerabilities.
- npm run build: exit 0; 19 output files, consisting of index.html, app.js, styles.css, entrance.css, 5 PNG and 10 SVG. No dist/public directory remains.
- Every built file was compared byte-for-byte against its source and fetched over HTTP with the expected body and MIME type.
- npm start: launches node server.mjs dist. With PORT=0 for the local test, Node allocated port 58897 and logged a listener on 0.0.0.0:58897. This demonstrates that the environment controls the port; no production port is pinned.
- 23 HTTP checks passed, including /, /?scene=entrance, a nested extensionless application route, missing files, malformed percent encoding, and raw/encoded path traversal. HEAD and unsupported-method checks also passed.
- All 18 unique asset/style/script URLs returned successful non-HTML responses.
- Browser checks opened and refreshed entrance, crossroad, theatre, coffee, counter, lab, validation, healthcare, transport, interview and emergency. A nested application route was refreshed too. No broken images, console/page errors, failed requests or HTML asset responses occurred.
- Isolated build fixtures confirmed a clear failure when entrance.css is missing, preservation of the previous build on input-validation failure, stale-output cleanup on success, public-root copying of an extra robots.txt fixture, and independence from the caller's working directory. Source files in the repository were not removed during these checks.
- SIGTERM and SIGINT handlers were simulated with process.emit in separate Node processes; both shut down with exit 0. Actual POSIX signal delivery inside a Linux container was not exercised on this Windows host.
- git diff --check passed. dist was not tracked by Git. Ignore rules cover the required generated and environment paths.

## Railway configuration

Use Railpack, the repository root, npm installation, npm run build, and the detected npm start script. No custom Start Command, additional backend, framework, or RAILPACK_SPA_OUTPUT_DIR is required. Railway supplies PORT; no application environment variable must be entered manually. Enable a public domain to expose the service; an optional healthcheck can use /.

References: [Railpack Node.js](https://railpack.com/languages/node), [build and start detection](https://docs.railway.com/builds/build-and-start-commands), [Railway PORT and binding](https://docs.railway.com/networking/troubleshooting/application-failed-to-respond).

This is repository and local-runtime verification. No Railway build or deployment was executed, and no successful Railway deployment is claimed.
