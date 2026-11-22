# How SEO was applied to this React project

This guide walks through every SEO technique in the project, **why** it matters, and
**where** to find it in the code. Read it with the code open beside it.

---

## 0. See the problem first (5-minute experiment)

```bash
npm install
npm run dev
```

Open http://localhost:5173/faq, right-click and choose **View Page Source** (not "Inspect").
You'll see:

```html
<div id="root"><!--app-html--></div>
```

**Empty.** That's what a normal React app (Create React App, plain Vite) sends to Google:
no text, no title, no description. All of it gets built later by JavaScript in the browser.

Now stop the dev server and run:

```bash
npm run build
npm run preview
```

Open http://localhost:4173/faq and **View Page Source** again. The full page is there:
title, description, canonical, structured data, every heading and paragraph.

**That difference is the most important React SEO lesson.** Everything else builds on it.

---

## 1. Prerendering (Static Site Generation)

**Problem:** Google *can* run JavaScript, but it does so later, in a second queue, which
slows indexing down. Bing, social networks (WhatsApp, Facebook, LinkedIn previews) and
most AI crawlers mostly read the raw HTML and nothing else.

**Solution:** run React **at build time** and save each page as a finished `.html` file.

| File | Role |
|---|---|
| `src/entry-server.jsx` | Renders a URL to an HTML string with `renderToString` + `StaticRouter` |
| `scripts/prerender.js` | Loops over all pages, puts the HTML into `index.html`'s slots, writes `faq.html`, `how-to-apply-tadelakt.html`... |
| `src/entry-client.jsx` | In the browser, **hydrates** the HTML (React attaches click handlers without redrawing) |

The build runs 3 steps (`package.json`):
1. `vite build` → the browser bundle
2. `vite build --ssr` → a Node version of the app
3. `node scripts/prerender.js` → the HTML files, sitemap and robots

> **In real projects** you'd often use a framework that does this for you:
> **Next.js**, **React Router framework mode** (formerly Remix) or **Astro**. This project does
> it by hand so you can see exactly what those frameworks do behind the scenes.

---

## 2. A unique title and meta description per page

`src/seo/pages.js` is the **single source of truth**: every page has its own title,
description and dates. Rules used:

- **Title ≈ 50–60 characters**, main keyword first: *"How to Apply Tadelakt: Step-by-Step Guide"*.
  `head.js` adds `| Tadelakt Guide` only if the result still fits in 60 characters.
- **Description ≈ 140–160 characters**, written like an ad, since it's the text people read in
  Google before clicking. It's not a ranking factor, but it affects click-through rate.
- **One page = one search intent.** "What is tadelakt" (learn), "how to apply" (do),
  "cost calculator" (plan), "FAQ" (specific doubts). Each page targets a different query, so
  your own pages don't compete with each other.

---

## 3. Clean URLs and canonical tags

- URLs are readable and contain the keyword: `/how-to-apply-tadelakt`, not `/page?id=2`
  and not `/#/how-to` (with a HashRouter, everything after `#` is invisible to Google).
- Each page has `<link rel="canonical" href="https://.../faq">`, which tells Google
  *"this is the official URL"*. That way `/faq?utm_source=facebook` and similar variants
  don't count as duplicate pages.
- The prerender writes **flat files** (`faq.html`) so hosts serve `/faq` directly with
  no `/faq` vs `/faq/` duplicate. `vercel.json` sets `cleanUrls` for Vercel.

Code: `buildHead()` in `src/seo/head.js`.

---

## 4. Robots meta, noindex and a real 404

- Real pages: `<meta name="robots" content="index, follow, max-image-preview:large">`
  (`max-image-preview:large` allows big image previews in Google and Discover).
- The 404 page: `noindex, follow`, so it never shows up in search results.
- `prerender.js` saves it as `404.html`. Netlify, Vercel, Cloudflare Pages and GitHub
  Pages automatically serve it with a **real HTTP 404 status**. This matters: an SPA that
  answers *every* URL with status 200 creates "soft 404" errors in Search Console.

---

## 5. sitemap.xml and robots.txt

Both are **generated** by `scripts/prerender.js` from the same page list, so they can never
go out of date:

- `sitemap.xml` lists every page you want indexed, with `lastmod` set to the date the
  content really changed (`updated` in `pages.js`). Don't fake it with the build date;
  Google learns to ignore sitemaps that lie.
- `robots.txt` allows everything and points to the sitemap.

---

## 6. Structured data (JSON-LD)

`src/seo/schema.js` adds machine-readable descriptions of each page:

| Page | Types | Rich result in Google today? |
|---|---|---|
| Home | `WebSite` | Helps the site name shown in results |
| All inner pages | `BreadcrumbList` | ✅ Yes: "Tadelakt Guide › FAQ" instead of a raw URL |
| What is / How to | `Article` | ✅ Used for article understanding and dates |
| How to | `HowTo` | ❌ Rich result retired by Google in 2023 |
| FAQ | `FAQPage` | ❌ Rich result retired by Google in May 2026 |
| Calculator | `WebApplication` | Understanding only |

So why keep `HowTo` and `FAQPage`? They're still valid schema.org, they don't hurt, and
other search engines and AI answer engines still read them to understand the page.
**Lesson: structured data ≠ guaranteed rich results.** Google adds and removes those features
over time, so check its current docs before you expect a visual effect.

Two important habits used here:
- **Schema must match visible content.** The FAQ page and the `FAQPage` schema are both
  generated from `src/content/faqs.js`, and the steps from `src/content/steps.js`. They can't
  drift apart.
- **Escape `<`** inside JSON-LD (`headToHtml` does it) so content can never break out of the
  `<script>` tag.

Test any page at https://search.google.com/test/rich-results and https://validator.schema.org

---

## 7. Open Graph and Twitter cards

`og:title`, `og:description`, `og:image` (1200×630, `public/og-image.png`) etc. control the
preview card when someone shares your link on WhatsApp, Facebook, LinkedIn, X or Slack.
They're not a ranking factor, but good previews get more clicks and shares, and **social
crawlers never run JavaScript**, which is one more reason prerendering is essential.

---

## 8. Semantic HTML and headings

- Exactly **one `<h1>`** per page, containing the main keyword.
- Headings go in order (`h2` → `h3`) and describe the content. They're never used for styling.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`.
- Real `<a href>` links everywhere (React Router's `<Link>` renders one). Crawlers don't
  click buttons with `onClick` handlers.
- Tables have `<caption>` and `<th scope>`, the date uses `<time dateTime>`.
- FAQ answers use `<details>`: collapsed for users, but the text is in the HTML for crawlers.

---

## 9. Internal linking

Google discovers and values pages through links. Every page:
- is in the header **and** footer navigation,
- has **breadcrumbs** (`Breadcrumbs.jsx`),
- links to related pages **inside the text** with descriptive anchor text
  ("step-by-step tadelakt application guide", never "click here"),
- ends with a "Keep reading" block (`RelatedLinks.jsx`).

No page is an orphan.

---

## 10. Content written for search intent

Technical SEO only gets you in the door. **Content quality is what ranks.** Techniques used:

- **Answer first:** the first paragraph of "What is tadelakt?" directly answers the question.
  This is the text Google tends to lift into featured snippets and AI Overviews.
- **Keyword in the right places:** URL, title, H1, first paragraph, a few subheadings,
  used naturally. No keyword stuffing.
- **Table of contents with `#anchors`** on the how-to page, which can show as "jump to" links.
- **A tool + text:** the calculator attracts links and visits, but a tool alone is "thin
  content", so it comes with an explanation and a worked example Google can read.
- **Visible "Updated" date** for freshness and trust.
- **Honesty:** e.g. the FAQ says tadelakt is *water-resistant*, not magically waterproof.
  Trustworthy content is what Google's quality guidelines (E-E-A-T) reward.

---

## 11. Performance (Core Web Vitals)

Google measures real users on three metrics: **LCP** ≤ 2.5 s (loading), **INP** ≤ 200 ms
(responsiveness) and **CLS** ≤ 0.1 (visual stability). What this project does:

| Technique | Helps | Where |
|---|---|---|
| Prerendered HTML: content shows before JS loads | LCP | `prerender.js` |
| System fonts, no web-font download | LCP, CLS | `styles.css` |
| Hero illustration is inline SVG (no extra request) | LCP | `Home.jsx` |
| `width`/`height` on images so space is reserved | CLS | `WhatIs.jsx` |
| `loading="lazy"` + `decoding="async"` on below-the-fold images | LCP | `WhatIs.jsx` |
| Small CSS, no UI library | all | `styles.css` |
| Light state updates in the calculator | INP | `Calculator.jsx` |

Measure it: Chrome DevTools → **Lighthouse** tab → run on the `npm run preview` build,
and later on the live site with https://pagespeed.web.dev

---

## 12. Mobile and accessibility

Google indexes the **mobile** version of your site. The project has the viewport meta,
a responsive layout, readable font sizes, big tap targets, a skip link, visible focus
outlines, `alt` text on every image, labelled form inputs and `lang="en"`.
Accessibility and SEO overlap a lot: both are about machines and people understanding the page.

---

## 13. Deploying and measuring the results

1. Buy or pick a domain, then set it in `src/site.config.js`.
2. Push to GitHub and import into **Netlify**, **Vercel** or **Cloudflare Pages**.
   Build command `npm run build`, output folder `dist/client` (already configured).
3. **Google Search Console** (https://search.google.com/search-console): add the domain,
   verify it, submit `sitemap.xml`, then use **URL Inspection → Request indexing** on the home page.
4. **Bing Webmaster Tools**: you can import the site straight from Search Console.
5. Wait. New sites usually get indexed within days, but rankings settle over weeks.
   Track **Performance** in Search Console (impressions, clicks, average position) for
   queries like *tadelakt*, *how to apply tadelakt*, *tadelakt cost*.

**Want to see the difference clearly?** Deploy a second copy of the site as a plain SPA
(skip `npm run prerender` and set your host to serve `index.html` for every URL) on another
domain or subdomain, and compare indexing speed, the "Crawled - currently not indexed" report and
social previews between the two.

---

## Checklist: adding a new page

- [ ] Create the component in `src/pages/` with one `<h1>` and good headings
- [ ] Add the route in `src/App.jsx` (clean, hyphenated, keyword URL)
- [ ] Add title, description, breadcrumb and dates in `src/seo/pages.js`
- [ ] Add JSON-LD for it in `src/seo/schema.js` if a type fits
- [ ] Link to it from the nav, related links and at least one paragraph
- [ ] `npm run build`, then check View Page Source and run Lighthouse
- [ ] Use Search Console → URL Inspection → Request indexing after deploying
