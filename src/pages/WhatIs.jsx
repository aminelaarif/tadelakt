import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import RelatedLinks from '../components/RelatedLinks.jsx';
import { PAGES } from '../seo/pages.js';

const page = PAGES['/what-is-tadelakt'];

export default function WhatIs() {
  return (
    <article className="prose">
      <Breadcrumbs />
      <h1>What is tadelakt?</h1>
      {/* SEO: a visible "last updated" date signals freshness to users and engines */}
      <p className="meta">
        Updated <time dateTime={page.updated}>{formatDate(page.updated)}</time>
      </p>

      {/* SEO: answer the question in the first paragraph. This is what Google
          often lifts into featured snippets and AI overviews. */}
      <p className="lead">
        <strong>Tadelakt is a traditional Moroccan lime plaster</strong> that is compressed with a
        stone and treated with black olive soap, giving it a smooth, softly shiny and
        water-resistant finish. It comes from the region around Marrakech and was originally used
        in hammams, palaces and water cisterns.
      </p>

      <h2>Where the name comes from</h2>
      <p>
        The word is usually traced back to an Arabic root meaning &ldquo;to rub&rdquo; or
        &ldquo;to knead&rdquo;, which describes the technique perfectly: the finish gets its
        character from long, patient rubbing with a polishing stone, not from the trowel alone.
      </p>

      <h2>How tadelakt becomes water-resistant</h2>
      <p>Three things work together:</p>
      <ol>
        <li>
          <strong>The lime.</strong> Tadelakt uses a fine, slightly hydraulic lime. Once applied, it
          slowly reacts with carbon dioxide in the air and turns back into a stone-like material
          (calcium carbonate).
        </li>
        <li>
          <strong>Compression.</strong> Polishing with a hard stone closes the pores and packs the
          particles tightly, so there are far fewer paths for water to enter.
        </li>
        <li>
          <strong>The soap.</strong> Black olive soap reacts with the lime to form a thin
          water-repellent layer of lime soap on the surface. That is why water beads up on
          well-made tadelakt.
        </li>
      </ol>

      <figure>
        {/* SEO: descriptive alt text, explicit width/height (prevents layout shift,
            a Core Web Vitals metric) and native lazy loading for below-the-fold images */}
        <img
          src="/images/tadelakt-layers.svg"
          alt="Cross-section diagram of a tadelakt wall: substrate, first coat, second coat and soap layer"
          width="720"
          height="360"
          loading="lazy"
          decoding="async"
        />
        <figcaption>The build-up of a typical tadelakt finish.</figcaption>
      </figure>

      <h2>Where you can use it</h2>
      <ul>
        <li>Walk-in showers and shower walls</li>
        <li>Bathroom walls, splashbacks and vanity tops</li>
        <li>Sculpted sinks, basins and bathtubs</li>
        <li>Decorative walls, niches and fireplaces</li>
      </ul>

      <h2>Pros and cons</h2>
      <div className="table-wrap">
        <table>
          <caption>Tadelakt compared with tiles in a bathroom</caption>
          <thead>
            <tr><th scope="col">Advantages</th><th scope="col">Limitations</th></tr>
          </thead>
          <tbody>
            <tr><td>No grout lines, easy to clean</td><td>Labour-intensive to apply</td></tr>
            <tr><td>Can cover curves and built-in shapes</td><td>Not suitable for floors with foot traffic</td></tr>
            <tr><td>Breathable and naturally mould-resistant</td><td>Sensitive to acids and abrasive cleaners</td></tr>
            <tr><td>Small damage can be repaired locally</td><td>Needs regular soap maintenance</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Is tadelakt right for your project?</h2>
      <p>
        If you want a calm, handcrafted look and are happy to look after a natural material, it is
        hard to beat. When you are ready, follow the{' '}
        <Link to="/how-to-apply-tadelakt">step-by-step tadelakt application guide</Link> or{' '}
        <Link to="/tadelakt-cost-calculator">estimate your material cost</Link>.
      </p>

      <RelatedLinks current="/what-is-tadelakt" />
    </article>
  );
}

function formatDate(iso) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}
