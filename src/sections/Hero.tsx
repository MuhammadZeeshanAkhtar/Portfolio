import { ArrowRight, Download, Github, Linkedin, MapPin, Trophy } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Highlight } from '../components/Highlight';
import { LinkButton, buttonClass } from '../components/LinkButton';
import { useContent } from '../lib/content';
import { scrollToSection } from '../lib/useSectionNav';

export function Hero() {
  const { profile } = useContent();

  const viewProjects = (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection('projects');
  };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/50 blur-3xl dark:bg-accent/15" />

      <div className="container-page relative grid grid-cols-1 items-center gap-12 pb-20 pt-10 sm:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div>
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 text-sm font-medium shadow-soft">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
              <Trophy aria-hidden="true" className="h-4 w-4" />
            </span>
            <span className="truncate">{profile.badge}</span>
          </p>

          <p className="mt-6 text-base font-semibold text-muted sm:text-lg">{profile.headline}</p>
          <h1 id="hero-title" className="mt-2 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            <Highlight text={profile.valueStatement} />
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#/" onClick={viewProjects} className={buttonClass('primary')}>
              View Projects <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <LinkButton href={profile.cvUrl} variant="accent" icon={Download} download="Muhammad_Zeeshan_Akhtar_CV.pdf">
              Download CV
            </LinkButton>
            <LinkButton href={profile.socials.linkedin} icon={Linkedin} external ariaLabel="LinkedIn profile">
              LinkedIn
            </LinkButton>
            <LinkButton href={profile.socials.github} icon={Github} external ariaLabel="GitHub profile">
              GitHub
            </LinkButton>
          </div>

          <ul aria-label="Focus areas" className="mt-8 flex flex-wrap gap-2">
            {profile.focusAreas.map((area) => (
              <li key={area} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-sm">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-text" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-3 rotate-3 rounded-[2.25rem] bg-accent" />
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-surface bg-surface shadow-lift">
            <img
              src={profile.photo.src}
              srcSet={profile.photo.srcSet}
              sizes="(min-width: 1024px) 400px, 352px"
              width={profile.photo.width}
              height={profile.photo.height}
              alt={profile.photo.alt}
              // React 18 only passes this through in lowercase (React 19 accepts fetchPriority).
              {...{ fetchpriority: 'high' }}
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <p className="absolute -bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium shadow-soft">
            <MapPin aria-hidden="true" className="h-4 w-4 text-accent-text" />
            {profile.location}
          </p>
        </div>
      </div>
    </section>
  );
}
