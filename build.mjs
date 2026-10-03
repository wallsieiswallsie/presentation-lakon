import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const name of ['index.html', 'styles.css', 'entrance.css', 'app.js', 'public']) {
  await cp(name, `dist/${name}`, { recursive: true });
}
console.log('Static presentation built in dist/');
