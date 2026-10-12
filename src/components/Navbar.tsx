import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sections, useSectionNav } from '../lib/useSectionNav';
import { ThemeToggle } from './ThemeToggle';

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg aria-hidden="true" viewBox="0 0 64 64" className="h-9 w-9 shrink-0">
        <rect width="64" height="64" rx="16" fill="#111111" />
        <rect x="9" y="9" width="46" height="46" rx="11" fill="#D3FC60" />
        <path d="M20 22h24l-17 20h17" fill="none" stroke="#111111" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-base font-bold tracking-tight">
        Zeeshan<span className="text-accent-text">.</span>
      </span>
    </span>
  );
}

export function Navbar() {
  const goTo = useSectionNav();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handle = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    if (!open) {
      goTo(id);
      return;
    }
    // The open menu is part of the sticky header's height; close it first so the scroll target doesn't shift.
    setOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => goTo(id)));
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 ${
        scrolled || open ? 'border-line bg-bg/85' : 'border-transparent bg-bg/60'
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Muhammad Zeeshan Akhtar, home" className="rounded-lg" onClick={() => window.scrollTo({ top: 0 })}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href="#/"
                onClick={handle(s.id)}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-bg-soft hover:text-fg"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#/"
            onClick={handle('contact')}
            className="hidden min-h-11 items-center rounded-full bg-fg px-5 text-sm font-semibold text-bg transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            Let&apos;s talk
          </a>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line lg:hidden">
        <ul className="container-page grid grid-cols-1 gap-1 py-3">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href="#/"
                onClick={handle(s.id)}
                className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium hover:bg-bg-soft"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
