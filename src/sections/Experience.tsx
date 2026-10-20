import { ArrowRight, ArrowUpRight, Briefcase, Github, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { TechTag } from '../components/TechTag';
import { TodoText, visible } from '../components/Todo';
import { experience } from '../data/experience';

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-bg-soft py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="experience-title" eyebrow="Experience" title="Where I've *worked*" />
        <ol className="relative space-y-6 border-l-2 border-line pl-6 sm:pl-10">
          {experience.map((job, i) => (
            <li key={job.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[33px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 sm:-left-[49px] ${
                  job.current ? 'border-fg bg-accent' : 'border-line bg-surface'
                }`}
              />
              <Reveal delay={i * 0.05}>
                <article className="card p-5 sm:p-7">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight sm:text-xl">{job.role}</h3>
                      <p className="mt-0.5 font-semibold text-accent-text">
                        {job.company}
                        <span className="font-normal text-muted"> · {job.type}</span>
                      </p>
                      {job.companyNote && <p className="mt-1 text-sm text-muted">{job.companyNote}</p>}
                    </div>
                    <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-soft px-3 py-1 text-xs font-semibold">
                        <Briefcase aria-hidden="true" className="h-3.5 w-3.5" />
                        {job.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  {job.summary && <p className="mt-4 text-sm text-muted sm:text-base">{job.summary}</p>}
                  {job.projects && job.projects.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold">Projects</h4>
                      <ul className="mt-2 grid grid-cols-1 gap-2">
                        {job.projects.map((p) => (
                          <li key={p.projectId} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl border border-line bg-bg-soft px-4 py-2">
                            <Link
                              to={`/projects/${p.projectId}`}
                              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4 hover:decoration-fg"
                            >
                              {p.label}
                              <ArrowRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                            {p.repoUrl && (
                              <a
                                href={p.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${p.label} code on GitHub (opens in a new tab)`}
                                className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-fg"
                              >
                                <Github aria-hidden="true" className="h-4 w-4" /> GitHub
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {visible(job.highlights).length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {visible(job.highlights).map((h) => (
                        <li key={h} className="flex gap-2.5 text-sm">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-text" />
                          <TodoText value={h} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.skills.length > 0 && (
                    <ul aria-label="Skills used" className="mt-5 flex flex-wrap gap-1.5">
                      {job.skills.map((s) => (
                        <li key={s}>
                          <TechTag label={s} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.links && job.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
                      {job.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4 hover:decoration-fg"
                        >
                          {l.label}
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
