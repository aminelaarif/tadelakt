import { Link } from 'react-router-dom';
import RelatedLinks from '../components/RelatedLinks.jsx';

// SEO: exactly ONE <h1> per page, containing the main keyword.
// Headings below follow a logical order (h2 -> h3), never skipping levels for styling.
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Moroccan lime plaster, explained</p>
          <h1>Tadelakt: the waterproof plaster of Moroccan hammams</h1>
          <p className="lead">
            Tadelakt is a seamless, softly polished lime finish from Marrakech that sheds water
            without tiles or grout. This guide shows you what it is, how to apply it, what it
            costs and how to keep it beautiful.
          </p>
          <div className="cta-row">
            <Link className="btn" to="/how-to-apply-tadelakt">Start the step-by-step guide</Link>
            <Link className="btn btn-ghost" to="/tadelakt-cost-calculator">Estimate your cost</Link>
          </div>
        </div>
        <svg className="hero-art" viewBox="0 0 320 320" role="img" aria-labelledby="hero-art-title">
          <title id="hero-art-title">Illustration of a Moroccan arch with a polished tadelakt surface</title>
          <defs>
            <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d9895f" />
              <stop offset=".55" stopColor="#b85a36" />
              <stop offset="1" stopColor="#8c3b22" />
            </linearGradient>
          </defs>
          <rect width="320" height="320" rx="24" fill="#f3e6d6" />
          <path d="M60 300V150a100 100 0 0 1 200 0v150z" fill="url(#sheen)" />
          <path d="M95 300V160a65 65 0 0 1 130 0v140z" fill="#f3e6d6" opacity=".18" />
          <ellipse cx="128" cy="130" rx="22" ry="48" fill="#fff" opacity=".18" transform="rotate(-18 128 130)" />
        </svg>
      </section>

      <section className="prose">
        <h2>Why people are rediscovering tadelakt</h2>
        <p>
          For centuries, tadelakt lined the steam rooms of Moroccan hammams and the bathrooms of
          riads and palaces. Today designers use it for walk-in showers, sinks, bathtubs and
          feature walls because it creates one continuous surface with no grout lines to clean.
        </p>
        <ul className="feature-list">
          <li><strong>Seamless:</strong> one surface that can wrap around curves, niches and basins.</li>
          <li><strong>Water-resistant:</strong> compressed lime plus olive soap makes water bead off.</li>
          <li><strong>Natural:</strong> made from lime and soap, breathable and naturally resistant to mould.</li>
          <li><strong>Repairable:</strong> small marks can be re-polished instead of replaced.</li>
        </ul>
        <p>
          New to the material? Begin with <Link to="/what-is-tadelakt">what tadelakt is and how it
          works</Link>, then follow the <Link to="/how-to-apply-tadelakt">application guide</Link>.
        </p>
      </section>

      <RelatedLinks current="/" />
    </>
  );
}
