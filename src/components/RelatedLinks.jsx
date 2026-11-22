import { Link } from 'react-router-dom';

const ALL = [
  { to: '/what-is-tadelakt', title: 'What is tadelakt?', text: 'Origins, the lime-and-soap chemistry, pros and cons.' },
  { to: '/how-to-apply-tadelakt', title: 'How to apply tadelakt', text: 'Eight steps from bare wall to polished finish.' },
  { to: '/tadelakt-cost-calculator', title: 'Tadelakt cost calculator', text: 'Work out materials and budget for your project.' },
  { to: '/faq', title: 'Tadelakt FAQ', text: 'Showers, floors, cracks, cleaning and more.' },
];

// SEO: internal linking. Each page links to its siblings with descriptive
// anchor text (not "click here"), spreading authority and helping crawlers
// discover every page.
export default function RelatedLinks({ current }) {
  const items = ALL.filter((i) => i.to !== current);
  return (
    <aside className="related" aria-labelledby="related-heading">
      <h2 id="related-heading">Keep reading</h2>
      <ul className="card-grid">
        {items.map((i) => (
          <li key={i.to} className="card">
            <Link to={i.to}>
              <h3>{i.title}</h3>
              <p>{i.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
