// SEO: JSON-LD structured data (schema.org).
// This is machine-readable information that tells search engines exactly WHAT
// a page is (an article, a FAQ, a tool, a breadcrumb trail...).
// Some types unlock "rich results" in Google (BreadcrumbList, Article...).
// Others no longer do: Google retired HowTo rich results in 2023 and FAQ rich
// results in May 2026. Those types are still valid schema.org and still help
// search and AI engines understand the page, so they are kept here.
import { SITE } from '../site.config.js';
import { PAGES } from './pages.js';
import { STEPS, TOOLS } from '../content/steps.js';
import { FAQS } from '../content/faqs.js';

const abs = (path) => SITE.url + (path === '/' ? '/' : path);

const publisher = {
  '@type': 'Organization',
  name: SITE.name,
  url: abs('/'),
  logo: { '@type': 'ImageObject', url: abs('/favicon-512.png') },
};

function breadcrumb(path) {
  // Home > Current page. Matches the visible <Breadcrumbs> component.
  const items = [{ name: PAGES['/'].breadcrumb, path: '/' }];
  if (path !== '/') items.push({ name: PAGES[path].breadcrumb, path });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

function article(path) {
  const p = PAGES[path];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    image: abs(SITE.defaultImage),
    datePublished: p.published,
    dateModified: p.updated,
    author: { '@type': 'Organization', name: SITE.name, url: abs('/') },
    publisher,
    mainEntityOfPage: abs(path),
    inLanguage: SITE.lang,
  };
}

export function buildJsonLd(path) {
  const p = PAGES[path];
  if (!p) return [];

  if (path === '/') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE.name,
        url: abs('/'),
        description: p.description,
        inLanguage: SITE.lang,
        publisher,
      },
    ];
  }

  const out = [breadcrumb(path)];

  if (path === '/what-is-tadelakt') out.push(article(path));

  if (path === '/how-to-apply-tadelakt') {
    out.push(article(path));
    out.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to apply tadelakt',
      description: p.description,
      tool: TOOLS.map((t) => ({ '@type': 'HowToTool', name: t })),
      step: STEPS.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
        url: `${abs(path)}#${s.id}`,
      })),
    });
  }

  if (path === '/tadelakt-cost-calculator') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Tadelakt Cost & Material Calculator',
      url: abs(path),
      description: p.description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    });
  }

  if (path === '/faq') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return out;
}
