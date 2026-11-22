// SEO: this file runs in Node.js at BUILD time, not in the browser.
// It renders a route to an HTML string so every page ships with real content.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { buildHead, headToHtml } from './seo/head.js';

export { SITE } from './site.config.js';
export { PAGES, INDEXABLE_PATHS } from './seo/pages.js';

export function render(url) {
  const appHtml = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  const headHtml = headToHtml(buildHead(url));
  return { appHtml, headHtml };
}
