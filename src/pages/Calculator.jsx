import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import RelatedLinks from '../components/RelatedLinks.jsx';

// Planning assumptions, shown on the page so users can judge the estimate.
const KG_PER_M2_PER_MM = 1.5; // dry lime powder per square metre per mm of thickness
const SOAP_L_PER_M2 = 0.1; // black soap concentrate per square metre (2 passes)

const CURRENCIES = ['USD', 'EUR', 'GBP', 'MAD'];

// SEO: interactive tools attract links and repeat visits, but a tool alone is
// "thin content". The explanation underneath gives Google text to rank.
export default function Calculator() {
  const [area, setArea] = useState(6);
  const [thickness, setThickness] = useState(3);
  const [waste, setWaste] = useState(10);
  const [limePrice, setLimePrice] = useState(4);
  const [soapPrice, setSoapPrice] = useState(12);
  const [currency, setCurrency] = useState('USD');
  const id = useId();

  const n = (v) => (Number.isFinite(+v) && +v > 0 ? +v : 0);
  const factor = 1 + n(waste) / 100;
  const limeKg = n(area) * n(thickness) * KG_PER_M2_PER_MM * factor;
  const soapL = n(area) * SOAP_L_PER_M2 * factor;
  const total = limeKg * n(limePrice) + soapL * n(soapPrice);
  const money = (x) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(x);

  return (
    <article className="prose">
      <Breadcrumbs />
      <h1>Tadelakt cost and material calculator</h1>
      <p className="lead">
        Enter the surface you want to cover to estimate how much tadelakt lime and black soap to
        buy, and roughly what the materials will cost. Labour is not included.
      </p>

      <form className="calc" onSubmit={(e) => e.preventDefault()} aria-describedby={`${id}-note`}>
        <Field id={`${id}-area`} label="Area to cover (m²)" value={area} set={setArea} step="0.5" />
        <Field id={`${id}-th`} label="Total thickness (mm)" value={thickness} set={setThickness} step="0.5" hint="2 to 4 mm is typical for two coats" />
        <Field id={`${id}-waste`} label="Extra for waste (%)" value={waste} set={setWaste} step="1" />
        <Field id={`${id}-lp`} label="Lime price per kg" value={limePrice} set={setLimePrice} step="0.1" />
        <Field id={`${id}-sp`} label="Black soap price per litre" value={soapPrice} set={setSoapPrice} step="0.5" />
        <div className="field">
          <label htmlFor={`${id}-cur`}>Currency</label>
          <select id={`${id}-cur`} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="results" aria-live="polite">
          <div><span>Tadelakt lime</span><output>{limeKg.toFixed(1)} kg</output></div>
          <div><span>Black soap</span><output>{soapL.toFixed(2)} L</output></div>
          <div className="total"><span>Estimated materials</span><output>{money(total)}</output></div>
        </div>
        <p id={`${id}-note`} className="small">
          Prices are placeholders. Replace them with your supplier&rsquo;s prices for a real estimate.
        </p>
      </form>

      <h2>How this calculator works</h2>
      <p>
        Lime plasters are usually planned by weight per square metre per millimetre of thickness.
        This calculator uses <strong>{KG_PER_M2_PER_MM} kg of dry powder per m² per mm</strong>, a
        common planning figure, and about <strong>{SOAP_L_PER_M2} L of black soap per m²</strong>{' '}
        for two soap-and-stone passes. It then adds your waste allowance.
      </p>
      <p>
        Check your product&rsquo;s data sheet: the actual consumption depends on the lime, the
        flatness of the wall and how thinly you work. Curved surfaces like basins use more.
      </p>

      <h2>Example: a 2 × 1.2 m shower wall</h2>
      <p>
        A shower wall of 2.4 m² at 3 mm, with 10% extra, needs about{' '}
        {(2.4 * 3 * KG_PER_M2_PER_MM * 1.1).toFixed(1)} kg of lime and{' '}
        {(2.4 * SOAP_L_PER_M2 * 1.1).toFixed(2)} L of black soap. Buying a little more than you need
        is wise, because colour can vary slightly between batches.
      </p>
      <p>
        Ready to start? Follow the <Link to="/how-to-apply-tadelakt">tadelakt application steps</Link>.
      </p>

      <RelatedLinks current="/tadelakt-cost-calculator" />
    </article>
  );
}

function Field({ id, label, value, set, step, hint }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step={step}
        value={value}
        onChange={(e) => set(e.target.value)}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      {hint && <small id={`${id}-hint`}>{hint}</small>}
    </div>
  );
}
