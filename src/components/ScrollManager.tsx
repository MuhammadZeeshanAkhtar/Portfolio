import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scrollToSection } from '../lib/useSectionNav';

const positions = new Map<string, number>();

/**
 * Scroll behaviour for the hash router:
 * - new page → top
 * - back/forward → restore where you were
 * - navigate('/', { state: { scrollTo: 'projects' } }) → scroll to that home-page section
 */
export function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  // Hand-typed hash URLs all get the key "default", so include the path to keep entries apart.
  const entry = `${location.key}:${location.pathname}`;
  // The entry whose position scroll events belong to. Switched only after we've scrolled the new page,
  // so late scroll events from the previous page can't overwrite the new page's saved position.
  const currentKey = useRef(entry);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const save = () => positions.set(currentKey.current, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, []);

  useLayoutEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    const saved = positions.get(entry);
    window.scrollTo(0, !target && navigationType === 'POP' && saved !== undefined ? saved : 0);
    currentKey.current = entry;
    if (!target) return undefined;
    const raf = requestAnimationFrame(() => scrollToSection(target));
    return () => cancelAnimationFrame(raf);
  }, [entry, location.state, navigationType]);

  return null;
}
