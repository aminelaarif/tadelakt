import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import RelatedLinks from '../components/RelatedLinks.jsx';
import { STEPS, TOOLS } from '../content/steps.js';

export default function HowTo() {
  return (
    <article className="prose">
      <Breadcrumbs />
      <h1>How to apply tadelakt, step by step</h1>
      <p className="lead">
        Applying tadelakt takes two thin coats of lime, a polishing stone and black olive soap. Plan
        for one full day of work per few square metres, plus two to three weeks of curing before
        heavy water use.
      </p>

      {/* SEO: a table of contents with #anchors. Google sometimes shows these as
          "jump to" links under your result. */}
      <nav className="toc" aria-label="Steps on this page">
        <h2>Steps on this page</h2>
        <ol>
          {STEPS.map((s) => (
            <li key={s.id}><a href={`#${s.id}`}>{s.name}</a></li>
          ))}
        </ol>
      </nav>

      <h2>Tools and materials</h2>
      <ul>
        {TOOLS.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <p>
        Not sure how much lime to buy? Use the{' '}
        <Link to="/tadelakt-cost-calculator">tadelakt material calculator</Link>.
      </p>

      <h2>The 8 steps</h2>
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s.id} id={s.id}>
            <h3>
              <span className="step-num">Step {i + 1}</span> {s.name}
            </h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>

      <h2>Common mistakes to avoid</h2>
      <ul>
        <li><strong>Coats that are too thick.</strong> Thick layers shrink and crack. Two thin coats beat one heavy one.</li>
        <li><strong>Polishing too early.</strong> If the stone drags wet material, wait. If it no longer leaves a sheen, you are late.</li>
        <li><strong>Drying too fast.</strong> Heaters, sun or drafts on fresh tadelakt cause crazing.</li>
        <li><strong>Skipping waterproofing behind showers.</strong> Tadelakt is the finish, not the waterproofing layer.</li>
      </ul>
      <p>
        Still have questions? See the <Link to="/faq">tadelakt FAQ</Link>.
      </p>

      <RelatedLinks current="/how-to-apply-tadelakt" />
    </article>
  );
}
