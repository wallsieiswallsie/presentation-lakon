import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = resolve(root, 'dist');
const sources = ['index.html', 'app.js', 'styles.css', 'entrance.css'];

// Validate required inputs before replacing the previous build.
for (const name of [...sources, 'public']) {
  const info = await stat(resolve(root, name)).catch(() => null);
  if (!info || !(name === 'public' ? info.isDirectory() : info.isFile())) {
    throw new Error(`Build failed: required ${name === 'public' ? 'directory' : 'source file'} "${name}" is missing or invalid.`);
  }
}
const publicEntries = await readdir(resolve(root, 'public'));
for (const name of publicEntries) {
  if (sources.includes(name)) throw new Error(`Build failed: public/${name} conflicts with a source file.`);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const name of sources) {
  await cp(resolve(root, name), resolve(dist, name));
}
for (const name of publicEntries) {
  await cp(resolve(root, 'public', name), resolve(dist, name), { recursive: true });
}
console.log('Static presentation built in dist/');
