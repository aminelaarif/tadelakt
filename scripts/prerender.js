// SEO: Static Site Generation (SSG), the most important step for a React site.
//
// A normal React app ships an EMPTY <div id="root"></div> and builds the page
// with JavaScript in the browser. Google can run JS, but it does it later
// in a second "rendering" queue; many other crawlers (Bing at times, social
// media previews, AI crawlers) mostly don't. This script runs React at build time and
// saves each route as a finished HTML file with its own <head> tags.
//
// It also generates sitemap.xml and robots.txt from the same page list.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'dist/client');
const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
const { render, SITE, PAGES, INDEXABLE_PATHS } = await import(
  path.join(root, 'dist/server/entry-server.js')
);

// Pages are written as flat files: /faq -> faq.html, / -> index.html.
// Netlify, Cloudflare Pages and GitHub Pages serve /faq from faq.html out of the box
// (Vercel too, with cleanUrls in vercel.json). Result: one clean URL per page, no
// /faq vs /faq/ duplicates, matching the canonical tags exactly.
const fileFor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`);

function writePage(url, file) {
  const { appHtml, headHtml } = render(url);
  const html = template.replace('<!--app-head-->', headHtml).replace('<!--app-html-->', appHtml);
  fs.writeFileSync(path.join(outDir, file), html);
  console.log(`  prerendered ${url.padEnd(28)} -> ${file}`);
}

console.log('Prerendering pages...');
for (const url of INDEXABLE_PATHS) writePage(url, fileFor(url));
writePage('/__not-found__', '404.html'); // hosts serve this with a real 404 status code

// SEO: sitemap.xml lists every page you WANT indexed (never the 404 or noindex pages),
// with lastmod = the date the content really changed. Submit it in Google Search Console.
const urls = INDEXABLE_PATHS.map((p) => {
  const loc = SITE.url + (p === '/' ? '/' : p);
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${PAGES[p].updated}</lastmod>\n  </url>`;
}).join('\n');
fs.writeFileSync(
  path.join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log('  wrote sitemap.xml');

// SEO: robots.txt says what crawlers may visit and where the sitemap is.
fs.writeFileSync(
  path.join(outDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`,
);
console.log('  wrote robots.txt');
