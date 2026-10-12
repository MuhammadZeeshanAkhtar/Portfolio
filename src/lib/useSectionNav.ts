import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
] as const;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  // Move focus for keyboard and screen-reader users without jumping the page again.
  const heading = el.querySelector<HTMLElement>('h2, h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
}

/**
 * Hash routing owns the URL fragment, so in-page links cannot use "#id".
 * This scrolls on the home page, or navigates home and scrolls once it has rendered.
 */
export function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return useCallback(
    (id: string) => {
      if (location.pathname === '/') scrollToSection(id);
      else navigate('/', { state: { scrollTo: id } });
    },
    [location.pathname, navigate],
  );
}
