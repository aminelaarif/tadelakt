// SEO: builds every <head> tag for a given URL path.
// Used in two places:
//   1. at build time (scripts/prerender.js) -> written into the static HTML file,
//      so crawlers and social media previews see the tags without running JS;
//   2. in the browser (<Seo /> component) -> updates the tags when the user
//      navigates between pages without a full reload.
import { SITE } from '../site.config.js';
import { PAGES, NOT_FOUND } from './pages.js';
import { buildJsonLd } from './schema.js';

export function buildHead(pathname) {
  const page = PAGES[pathname];
  const meta = page ?? NOT_FOUND;
  const isHome = pathname === '/';

  // Brand suffix on inner pages only (home title already contains the brand),
  // and only if the result stays within ~60 characters, so Google doesn't cut it off.
  const branded = `${meta.title} | ${SITE.name}`;
  const title = isHome || !page || branded.length > 60 ? meta.title : branded;
  const canonical = page ? SITE.url + (isHome ? '/' : pathname) : null;
  const image = SITE.url + SITE.defaultImage;

  const metas = [
    { name: 'description', content: meta.description },
    // SEO: robots meta. Real pages: index + allow large image previews in results.
    // The 404 page: noindex so it never appears in Google.
    {
      name: 'robots',
      content: meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    },
  ];

  const links = [];

  if (page) {
    // SEO: canonical = "this is the one official URL for this content".
    // Prevents duplicates like ?utm_source=..., /page/ vs /page, http vs https.
    links.push({ rel: 'canonical', href: canonical });

    // SEO: Open Graph (Facebook, LinkedIn, WhatsApp, Slack...) and Twitter/X cards.
    // Not a ranking factor, but good previews earn more clicks and shares.
    metas.push(
      { property: 'og:type', content: page.type === 'article' ? 'article' : 'website' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: SITE.locale },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Tadelakt Guide: polished Moroccan lime plaster' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
      { name: 'twitter:image', content: image },
    );
    if (page.type === 'article') {
      metas.push(
        { property: 'article:published_time', content: page.published },
        { property: 'article:modified_time', content: page.updated },
      );
    }
  }

  return { title, metas, links, jsonLd: page ? buildJsonLd(pathname) : [] };
}

// ---------- server side: turn the head object into an HTML string ----------
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function headToHtml(head) {
  const parts = [`<title>${esc(head.title)}</title>`];
  for (const m of head.metas) {
    const key = m.name ? `name="${esc(m.name)}"` : `property="${esc(m.property)}"`;
    parts.push(`<meta data-seo ${key} content="${esc(m.content)}" />`);
  }
  for (const l of head.links) {
    parts.push(`<link data-seo rel="${esc(l.rel)}" href="${esc(l.href)}" />`);
  }
  for (const obj of head.jsonLd) {
    // Escape "<" so a string inside the JSON can never close the <script> tag.
    const json = JSON.stringify(obj).replace(/</g, '\\u003c');
    parts.push(`<script data-seo type="application/ld+json">${json}</script>`);
  }
  return parts.join('\n    ');
}

// ---------- client side: apply the head object to the live document ----------
export function applyHead(head) {
  document.title = head.title;
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  const frag = document.createDocumentFragment();
  for (const m of head.metas) {
    const el = document.createElement('meta');
    el.setAttribute('data-seo', '');
    if (m.name) el.setAttribute('name', m.name);
    else el.setAttribute('property', m.property);
    el.setAttribute('content', m.content);
    frag.appendChild(el);
  }
  for (const l of head.links) {
    const el = document.createElement('link');
    el.setAttribute('data-seo', '');
    el.rel = l.rel;
    el.href = l.href;
    frag.appendChild(el);
  }
  for (const obj of head.jsonLd) {
    const el = document.createElement('script');
    el.setAttribute('data-seo', '');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(obj);
    frag.appendChild(el);
  }
  document.head.appendChild(frag);
}
