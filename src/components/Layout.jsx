import { NavLink, Link, Outlet } from 'react-router-dom';

const NAV = [
  { to: '/what-is-tadelakt', label: 'What is it?' },
  { to: '/how-to-apply-tadelakt', label: 'How to apply' },
  { to: '/tadelakt-cost-calculator', label: 'Cost calculator' },
  { to: '/faq', label: 'FAQ' },
];

// SEO: semantic landmarks (<header>, <nav>, <main>, <footer>) help crawlers
// tell navigation apart from content. Every link is a real <a href>, which
// is what <Link> renders, so crawlers can follow it.
export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link to="/" className="logo" aria-label="Tadelakt Guide home">
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M4 30V14a12 12 0 0 1 24 0v16z" fill="currentColor" />
            </svg>
            <span>Tadelakt Guide</span>
          </Link>
          <nav aria-label="Main">
            <ul className="nav">
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to}>{n.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" className="wrap">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p>
            <strong>Tadelakt Guide</strong>: an independent, practical resource on the traditional
            Moroccan lime plaster.
          </p>
          <nav aria-label="Footer">
            <ul className="footer-nav">
              <li><Link to="/">Home</Link></li>
              {NAV.map((n) => (
                <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
