# Tadelakt Guide: a React SEO learning project

A small React site about **tadelakt** (Moroccan waterproof lime plaster), a niche topic
with little competition, so you can actually see your pages get indexed and ranked.

Every SEO-related line in the code is marked with an `SEO:` comment. Search for it:

```bash
grep -rn "SEO:" src scripts index.html
```

Full explanation: **[SEO-GUIDE.md](./SEO-GUIDE.md)**

## Run it

```bash
npm install
npm run dev        # development (normal client-side React, NOT SEO-friendly)
npm run build      # production build + prerender every page + sitemap + robots
npm run preview    # serve the production build at http://localhost:4173
```

## Before deploying

1. Change `url` in `src/site.config.js` to your real domain.
2. Deploy `dist/client` to Netlify, Vercel or Cloudflare Pages (configs included).
3. Add the site to Google Search Console and submit `/sitemap.xml`.

## Project map

```
index.html                 HTML template with <!--app-head--> / <!--app-html--> slots
src/site.config.js         domain, site name, default share image
src/seo/pages.js           title + description + dates for every page (single source of truth)
src/seo/head.js            builds meta / canonical / Open Graph / JSON-LD tags
src/seo/schema.js          JSON-LD structured data
src/seo/Seo.jsx            updates <head> on client-side navigation
src/entry-server.jsx       renders a route to HTML in Node (build time)
src/entry-client.jsx       hydrates the prerendered HTML in the browser
scripts/prerender.js       writes one .html per page + sitemap.xml + robots.txt
scripts/serve.js           local preview server that behaves like a static host
src/pages/*                the pages
src/content/*              steps and FAQs as data (shared by page + structured data)
```
