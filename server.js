// Simple static server that serves files from the current directory, including node_modules
// No external dependencies required.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5173;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.map': 'application/json; charset=utf-8'
};

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  if (body && (typeof body === 'string' || Buffer.isBuffer(body))) res.end(body);
  else res.end();
}

function safeJoin(base, target) {
  const targetPath = '.' + target; // ensure relative
  const resolved = path.resolve(base, targetPath);
  if (!resolved.startsWith(base)) return null; // path traversal guard
  return resolved;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === '/') pathname = '/index.html';

  const filePath = safeJoin(ROOT, pathname);
  if (!filePath) return send(res, 403, { 'Content-Type': 'text/plain' }, 'Forbidden');

  fs.stat(filePath, (err, stat) => {
    if (err) {
      // try directory index.html
      const maybeDir = filePath;
      fs.stat(maybeDir, (err2, stat2) => {
        if (!err2 && stat2.isDirectory()) {
          const indexPath = path.join(maybeDir, 'index.html');
          fs.readFile(indexPath, (err3, data3) => {
            if (err3) return send(res, 404, { 'Content-Type': 'text/plain' }, 'Not Found');
            const ext3 = path.extname(indexPath).toLowerCase();
            send(res, 200, {
              'Content-Type': MIME[ext3] || 'application/octet-stream',
              'Cache-Control': 'no-store'
            }, data3);
          });
          return;
        }
        return send(res, 404, { 'Content-Type': 'text/plain' }, 'Not Found');
      });
      return;
    }

    if (stat.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.readFile(indexPath, (err2, data2) => {
        if (err2) return send(res, 403, { 'Content-Type': 'text/plain' }, 'Forbidden');
        const ext2 = path.extname(indexPath).toLowerCase();
        send(res, 200, {
          'Content-Type': MIME[ext2] || 'application/octet-stream',
          'Cache-Control': 'no-store'
        }, data2);
      });
      return;
    }

    fs.readFile(filePath, (err2, data) => {
      if (err2) return send(res, 404, { 'Content-Type': 'text/plain' }, 'Not Found');
      const ext = path.extname(filePath).toLowerCase();
      send(res, 200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store',
        // Allow cross-origin module scripts when necessary
        'Access-Control-Allow-Origin': '*'
      }, data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Local dev server running at http://localhost:${PORT}`);
});

