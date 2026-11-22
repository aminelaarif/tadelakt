import { Link, useLocation } from 'react-router-dom';
import { PAGES } from '../seo/pages.js';

// SEO: visible breadcrumbs = extra internal links + context for users.
// The BreadcrumbList JSON-LD in schema.js describes the same trail for Google,
// which can then show "Tadelakt Guide > FAQ" instead of a raw URL in results.
export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const page = PAGES[pathname];
  if (!page || pathname === '/') return null;
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        <li><Link to="/">{PAGES['/'].breadcrumb}</Link></li>
        <li aria-current="page">{page.breadcrumb}</li>
      </ol>
    </nav>
  );
}
