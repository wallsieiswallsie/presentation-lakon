import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.argv[2] || '.');
const port = Number(process.argv[3] || 5173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp' };
createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const localPath = urlPath.startsWith('/assets/') ? `/public${urlPath}` : urlPath;
    let file = resolve(root, `.${localPath}`);
    if (!file.startsWith(root + sep) && file !== root) throw new Error('bad path');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control':'no-store' });
    res.end(body);
  } catch {
    try { res.writeHead(200, { 'content-type':'text/html; charset=utf-8' }); res.end(await readFile(resolve(root,'index.html'))); }
    catch { res.writeHead(404); res.end('Not found'); }
  }
}).listen(port, '127.0.0.1', () => console.log(`LAKON presentation at http://127.0.0.1:${port}`));
