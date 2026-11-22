// SEO: the metadata for every indexable page lives here, in one place.
// The <Seo> component (browser), the prerender script (build) and the sitemap
// generator all read from this object, so they can never disagree.
//
// Rules of thumb used below:
//  - title: ~50-60 characters, main keyword near the start, unique per page
//  - description: ~140-160 characters, written for humans (it's your ad text in Google)
//  - one page = one search intent (what is / how to / cost / questions)

export const PAGES = {
  '/': {
    title: 'Tadelakt Guide: Moroccan Waterproof Lime Plaster Explained',
    description:
      'Learn what tadelakt is, how to apply this Moroccan waterproof lime plaster step by step, what it costs, and how to care for it. Free calculator included.',
    breadcrumb: 'Home',
    type: 'website',
    priority: 1.0,
    changefreq: 'monthly',
    published: '2026-11-21',
    updated: '2026-11-21',
  },
  '/what-is-tadelakt': {
    title: 'What Is Tadelakt? History, Science & Uses',
    description:
      'Tadelakt is a polished Moroccan lime plaster made water-resistant with olive oil soap. Discover its origins in Marrakech, how it works, and its pros and cons.',
    breadcrumb: 'What Is Tadelakt?',
    type: 'article',
    priority: 0.9,
    changefreq: 'yearly',
    published: '2026-11-21',
    updated: '2026-11-21',
  },
  '/how-to-apply-tadelakt': {
    title: 'How to Apply Tadelakt: Step-by-Step Guide',
    description:
      'A practical tadelakt application guide: substrate prep, mixing, two coats, stone polishing and black soap sealing, plus the mistakes that cause cracks.',
    breadcrumb: 'How to Apply Tadelakt',
    type: 'article',
    priority: 0.9,
    changefreq: 'yearly',
    published: '2026-11-21',
    updated: '2026-11-21',
  },
  '/tadelakt-cost-calculator': {
    title: 'Tadelakt Cost & Material Calculator (Free)',
    description:
      'Estimate how much tadelakt lime and black soap you need, and what it will cost, for a wall, shower or basin. Enter the area and thickness for instant results.',
    breadcrumb: 'Cost Calculator',
    type: 'app',
    priority: 0.8,
    changefreq: 'yearly',
    published: '2026-11-21',
    updated: '2026-11-21',
  },
  '/faq': {
    title: 'Tadelakt FAQ: Showers, Floors & Cracks',
    description:
      'Answers to the most common tadelakt questions: is it really waterproof, can it go on floors or over tiles, how long it takes to cure and how to repair cracks.',
    breadcrumb: 'FAQ',
    type: 'faq',
    priority: 0.7,
    changefreq: 'yearly',
    published: '2026-11-21',
    updated: '2026-11-21',
  },
};

// SEO: the 404 page must NOT be indexed.
export const NOT_FOUND = {
  title: 'Page Not Found',
  description: 'This page does not exist. Browse the Tadelakt Guide for application steps, costs and FAQs.',
  noindex: true,
};

export const INDEXABLE_PATHS = Object.keys(PAGES);
