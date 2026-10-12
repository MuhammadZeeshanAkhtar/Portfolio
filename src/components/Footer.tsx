import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useContent } from '../lib/content';
import { sections, useSectionNav } from '../lib/useSectionNav';
import { Logo } from './Navbar';

export function Footer() {
  const { profile } = useContent();
  const goTo = useSectionNav();
  const year = new Date().getFullYear();

  const handle = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    goTo(id);
  };

  const socials = [
    { href: profile.socials.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: profile.socials.github, label: 'GitHub', icon: Github },
    { href: `mailto:${profile.socials.email}`, label: 'Email', icon: Mail },
  ];

  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="container-page grid grid-cols-1 gap-10 py-12 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm text-muted">
            {profile.name}. {profile.headline}. Building AI agents, automation and machine-learning products from{' '}
            {profile.location}.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href="#/" onClick={handle(s.id)} className="inline-flex min-h-10 items-center text-muted hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(!href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface transition-colors duration-200 hover:border-fg/40"
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. Built with React, TypeScript &amp; Tailwind CSS.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 self-start rounded-full px-3 font-medium text-fg hover:bg-surface sm:self-auto"
          >
            Back to top <ArrowUp aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
