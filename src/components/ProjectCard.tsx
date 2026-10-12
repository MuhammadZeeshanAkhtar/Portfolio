import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { ProjectCover } from './ProjectCover';
import { TechTag } from './TechTag';

export function StatusPill({ project }: { project: Project }) {
  const dot = project.status === 'In progress' ? 'bg-amber-500' : 'bg-emerald-600 dark:bg-emerald-400';
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {project.status}
    </span>
  );
}

export function ProjectCard({
  project,
  onTagClick,
  activeTag,
}: {
  project: Project;
  onTagClick?: (tag: string) => void;
  activeTag?: string;
}) {
  const shown = project.tech.filter(Boolean).slice(0, 5);
  const extra = project.tech.filter(Boolean).length - shown.length;
  const titleId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift"
    >
      <Link to={`/projects/${project.id}`} tabIndex={-1} aria-hidden="true" className="block">
        <ProjectCover project={project} />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">{project.category}</span>
          <StatusPill project={project} />
          {project.source === 'New' && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-on-accent">New</span>
          )}
        </div>
        <h3 id={titleId} className="text-lg font-bold leading-snug tracking-tight">
          <Link to={`/projects/${project.id}`} className="hover:underline hover:decoration-accent hover:decoration-4 hover:underline-offset-4">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{project.tagline}</p>
        <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-1.5">
          {shown.map((t) => (
            <li key={t}>
              <TechTag label={t} onClick={onTagClick} active={activeTag?.toLowerCase() === t.toLowerCase()} />
            </li>
          ))}
          {extra > 0 && <li className="self-center text-xs text-muted">+{extra} more</li>}
        </ul>
        <div className="mt-auto pt-5">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-fg"
            aria-label={`Read the ${project.title} case study`}
          >
            Read case study
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
