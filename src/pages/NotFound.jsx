import { Link } from 'react-router-dom';

// SEO: a helpful 404 that links back into the site. The prerender script saves it
// as 404.html (hosts serve it with a real 404 status) and head.js gives it noindex.
export default function NotFound() {
  return (
    <section className="prose not-found">
      <h1>Page not found</h1>
      <p>That page does not exist, but these will help:</p>
      <ul>
        <li><Link to="/what-is-tadelakt">What is tadelakt?</Link></li>
        <li><Link to="/how-to-apply-tadelakt">How to apply tadelakt</Link></li>
        <li><Link to="/tadelakt-cost-calculator">Tadelakt cost calculator</Link></li>
        <li><Link to="/faq">Tadelakt FAQ</Link></li>
      </ul>
    </section>
  );
}
