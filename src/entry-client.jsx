import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// SEO: in production the HTML is already there (prerendered), so React
// "hydrates" it, attaching event handlers without re-drawing anything.
// In `npm run dev` there is no prerendered HTML, so we render normally.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
