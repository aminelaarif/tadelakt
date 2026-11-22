import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildHead, applyHead } from './head.js';

// SEO: keeps <head> in sync during client-side navigation.
// On the first load the correct tags are already in the prerendered HTML;
// this only matters when the user clicks a <Link> and React swaps the page.
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    applyHead(buildHead(pathname));
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
