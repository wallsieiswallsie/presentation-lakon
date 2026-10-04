import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.argv[2] || 'dist');

const port = Number(
  process.env.PORT ||
  process.argv[3] ||
  5173
);

const host = '0.0.0.0';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',

  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',

  '.woff': 'font/woff',
  '.woff2': 'font/woff2',

  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

function getPathname(requestUrl = '/') {
  const url = new URL(
    requestUrl,
    'http://internal'
  );

  return decodeURIComponent(url.pathname);
}

function resolveFile(pathname) {
  const file = resolve(
    root,
    `.${pathname}`
  );

  // Prevent ../ path traversal
  if (
    file !== root &&
    !file.startsWith(root + sep)
  ) {
    throw new Error('Invalid path');
  }

  return file;
}

async function sendFile(file, req, res) {
  let target = file;

  const fileStat = await stat(target);

  if (fileStat.isDirectory()) {
    target = resolve(
      target,
      'index.html'
    );
  }

  const body = await readFile(target);

  const extension =
    extname(target).toLowerCase();

  res.writeHead(200, {
    'Content-Type':
      mimeTypes[extension] ||
      'application/octet-stream',

    'Cache-Control': 'no-store',

    'X-Content-Type-Options': 'nosniff'
  });

  /*
   * HEAD requests must return headers only.
   */
  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  res.end(body);
}

async function sendIndex(req, res) {
  const indexFile =
    resolve(root, 'index.html');

  const body =
    await readFile(indexFile);

  res.writeHead(200, {
    'Content-Type':
      'text/html; charset=utf-8',

    'Cache-Control': 'no-store',

    'X-Content-Type-Options': 'nosniff'
  });

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  res.end(body);
}

const server = createServer(
  async (req, res) => {
    const pathname =
      getPathname(req.url);

    try {
      const file =
        resolveFile(pathname);

      await sendFile(
        file,
        req,
        res
      );
    } catch {
      /*
       * Requests containing a file extension are
       * real static-file requests.
       *
       * They must NEVER fall back to index.html.
       */
      if (extname(pathname)) {
        res.writeHead(404, {
          'Content-Type':
            'text/plain; charset=utf-8',

          'Cache-Control':
            'no-store'
        });

        if (req.method === 'HEAD') {
          res.end();
          return;
        }

        res.end(
          `File not found: ${pathname}`
        );

        return;
      }

      /*
       * Extensionless URLs can be application routes.
       * Example:
       *
       * /
       * /presentation
       *
       * Query parameters such as ?scene=entrance
       * do not affect pathname.
       */
      try {
        await sendIndex(
          req,
          res
        );
      } catch {
        res.writeHead(404, {
          'Content-Type':
            'text/plain; charset=utf-8'
        });

        res.end('Not found');
      }
    }
  }
);

server.listen(
  port,
  host,
  () => {
    console.log(
      `LAKON presentation listening on ${host}:${port}`
    );

    console.log(
      `Serving: ${root}`
    );
  }
);

function shutdown(signal) {
  console.log(
    `${signal} received, shutting down...`
  );

  server.close(() => {
    process.exit(0);
  });
}

process.on(
  'SIGTERM',
  () => shutdown('SIGTERM')
);

process.on(
  'SIGINT',
  () => shutdown('SIGINT')
);