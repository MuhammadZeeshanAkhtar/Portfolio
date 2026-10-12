import { ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCover } from '../components/ProjectCover';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { TechTag } from '../components/TechTag';
import { buttonClass } from '../components/LinkButton';
import { useContent } from '../lib/content';

export function FeaturedProject() {
  const { projects } = useContent();
  const project = projects.find((p) => p.featured);
  if (!project) return null;

  return (
    <section aria-labelledby="featured-title" className="pb-8">
      <div className="container-page">
        <SectionHeading id="featured-title" eyebrow="Featured project" title="AI agents that *automate* real business work" />
        <Reveal>
          <article className="card grid grid-cols-1 overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
            <Link to={`/projects/${project.id}`} tabIndex={-1} aria-hidden="true" className="grid grid-cols-1">
              <ProjectCover project={project} size="lg" />
            </Link>
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <p className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">
                <Star aria-hidden="true" className="h-3.5 w-3.5 fill-current" /> Featured · {project.category}
              </p>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h3>
              <p className="mt-3 text-base text-muted sm:text-lg">{project.tagline}</p>
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {project.features.filter(Boolean).slice(0, 6).map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-1.5">
                {project.tech.filter(Boolean).map((t) => (
                  <li key={t}>
                    <TechTag label={t} />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                <span className="font-semibold text-fg">Target roles:</span> {project.targetRoles.join(' · ')}
              </p>
              <div className="mt-8">
                <Link to={`/projects/${project.id}`} className={buttonClass('primary')}>
                  Read the case study <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
