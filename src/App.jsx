import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Seo from './seo/Seo.jsx';
import Home from './pages/Home.jsx';
import WhatIs from './pages/WhatIs.jsx';
import HowTo from './pages/HowTo.jsx';
import Calculator from './pages/Calculator.jsx';
import Faq from './pages/Faq.jsx';
import NotFound from './pages/NotFound.jsx';

// SEO: clean, readable, keyword-rich URLs. Lowercase, hyphens, no IDs or "#/".
// (A HashRouter, which gives URLs like /#/faq, would be invisible to Google:
// everything after # is never sent to the server.)
export default function App() {
  return (
    <>
      <Seo />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/what-is-tadelakt" element={<WhatIs />} />
          <Route path="/how-to-apply-tadelakt" element={<HowTo />} />
          <Route path="/tadelakt-cost-calculator" element={<Calculator />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
