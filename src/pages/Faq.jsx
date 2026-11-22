import Breadcrumbs from '../components/Breadcrumbs.jsx';
import RelatedLinks from '../components/RelatedLinks.jsx';
import { FAQS } from '../content/faqs.js';

// SEO: questions written the way people actually type them into Google,
// each as its own <h2> with a direct answer right underneath.
// <details> keeps answers in the HTML (crawlable) even when collapsed.
export default function Faq() {
  return (
    <article className="prose">
      <Breadcrumbs />
      <h1>Tadelakt FAQ</h1>
      <p className="lead">Short, honest answers to the questions people ask most before choosing tadelakt.</p>
      <div className="faq">
        {FAQS.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary><h2>{f.q}</h2></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <RelatedLinks current="/faq" />
    </article>
  );
}
