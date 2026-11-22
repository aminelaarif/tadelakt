// Tiny static server to preview the production build the way a real host serves it:
//   /faq -> faq.html, unknown URLs -> 404.html with a real 404 status.
// Run `npm run build` first, then `npm run preview`.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist/client');
const port = Number(process.env.PORT) || 4173;
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain',
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const candidates = url === '/' ? ['index.html'] : [url.slice(1), `${url.slice(1)}.html`];
    for (const c of candidates) {
      const file = path.join(dir, c);
      if (file.startsWith(dir) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
        return fs.createReadStream(file).pipe(res);
      }
    }
    res.writeHead(404, { 'Content-Type': types['.html'] });
    fs.createReadStream(path.join(dir, '404.html')).pipe(res);
  })
  .listen(port, () => console.log(`Preview: http://localhost:${port}`));
