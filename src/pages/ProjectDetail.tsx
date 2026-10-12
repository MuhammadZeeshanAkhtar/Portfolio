import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CircleCheck,
  Github,
  Globe,
  Info,
  Lightbulb,
  Play,
  Target,
  Trophy,
  User,
  Users,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArchitectureFlow } from '../components/ArchitectureFlow';
import { LinkButton } from '../components/LinkButton';
import { StatusPill } from '../components/ProjectCard';
import { ProjectCover } from '../components/ProjectCover';
import { Reveal } from '../components/Reveal';
import { TechTag } from '../components/TechTag';
import { TodoText, visible } from '../components/Todo';
import { isTodo } from '../lib/asset';
import { useContent } from '../lib/content';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import NotFound from './NotFound';

function Block({ title, icon: Icon, children }: { title: string; icon: typeof Target; children: ReactNode }) {
  return (
    <Reveal>
      <section className="card p-6 sm:p-8">
        <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight">
          <span aria-hidden="true" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-on-accent">
            <Icon className="h-5 w-5" />
          </span>
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </section>
    </Reveal>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useContent();
  const index = projects.findIndex((p) => p.id === id);
  const project = index >= 0 ? projects[index] : undefined;
  useDocumentTitle(project?.title, project?.tagline);

  if (!project) return <NotFound />;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const features = visible(project.features);
  const results = visible(project.results);

  return (
    <article aria-labelledby="project-title">
      <header className="border-b border-line bg-bg-soft">
        <div className="container-page pb-12 pt-8 sm:pb-16 sm:pt-12">
          <Link to="/" state={{ scrollTo: 'projects' }} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted hover:text-fg">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All projects
          </Link>
          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">{project.category}</span>
                <StatusPill project={project} />
                {!isTodo(project.period) && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                    <Calendar aria-hidden="true" className="h-3.5 w-3.5" /> {project.period}
                  </span>
                )}
              </div>
              <h1 id="project-title" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-muted sm:text-xl">{project.tagline}</p>
              <TodoText as="p" value={project.context} className="mt-3 text-sm font-medium" />
              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton href={project.githubUrl} icon={Github} variant="primary" external pendingLabel="Code · coming soon">
                  View code
                </LinkButton>
                <LinkButton href={project.liveUrl} icon={Globe} variant="accent" external pendingLabel="Live demo · coming soon">
                  Live demo
                </LinkButton>
                <LinkButton href={project.demoVideoUrl} icon={Play} external pendingLabel="Demo video · coming soon">
                  Demo video
                </LinkButton>
              </div>
            </div>
            <div className="card overflow-hidden">
              <ProjectCover project={project} size="lg" />
            </div>
          </div>
        </div>
      </header>

      <div className="container-page grid grid-cols-1 gap-6 py-12 sm:py-16 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div className="grid grid-cols-1 gap-6">
          <Block title="The problem" icon={Target}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">{project.problem}</p>
          </Block>

          <Block title="The solution" icon={Lightbulb}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">{project.solution}</p>
          </Block>

          {features.length > 0 && (
            <Block title="Key features" icon={CircleCheck}>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm sm:text-base">
                    <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-text" />
                    <TodoText value={f} />
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Reveal>
            <section aria-labelledby="architecture-title">
              <h2 id="architecture-title" className="mb-4 text-xl font-bold tracking-tight">
                Architecture <span className="hl">flow</span>
              </h2>
              <ArchitectureFlow steps={project.architecture} label={`${project.title} architecture flow`} />
            </section>
          </Reveal>

          {results.length > 0 && (
            <Block title="Results" icon={Trophy}>
              <ul className="space-y-2">
                {results.map((r) => (
                  <li key={r} className="flex gap-3 font-semibold">
                    <Trophy aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-text" />
                    <TodoText value={r} />
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.note && (
            <p className="flex gap-3 rounded-2xl border border-line bg-bg-soft p-5 text-sm text-muted">
              <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
              {project.note}
            </p>
          )}
        </div>

        <aside className="grid grid-cols-1 gap-6 lg:sticky lg:top-24" aria-label="Project details">
          <section className="card p-6">
            <h2 className="text-base font-bold">Tech stack</h2>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.filter(Boolean).map((t) => (
                <li key={t}>
                  <TechTag label={t} />
                </li>
              ))}
            </ul>
          </section>
          <section className="card p-6">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <User aria-hidden="true" className="h-4 w-4" /> My role
            </h2>
            <TodoText as="p" value={project.role} className="mt-3 text-sm text-muted" />
            {project.team.length > 0 && (
              <>
                <h3 className="mt-5 flex items-center gap-2 text-sm font-bold">
                  <Users aria-hidden="true" className="h-4 w-4" /> Team
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {project.team.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
          {project.targetRoles.length > 0 && (
            <section className="card p-6">
              <h2 className="text-base font-bold">Relevant roles</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {project.targetRoles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      <nav aria-label="More projects" className="border-t border-line">
        <div className="container-page grid grid-cols-1 gap-4 py-10 sm:grid-cols-2">
          <Link to={`/projects/${prev.id}`} className="card group flex min-h-20 items-center gap-4 p-5 hover:shadow-lift">
            <ArrowLeft aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">Previous project</span>
              <span className="block truncate font-semibold">{prev.title}</span>
            </span>
          </Link>
          <Link to={`/projects/${next.id}`} className="card group flex min-h-20 items-center justify-end gap-4 p-5 text-right hover:shadow-lift">
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">Next project</span>
              <span className="block truncate font-semibold">{next.title}</span>
            </span>
            <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>
    </article>
  );
}
