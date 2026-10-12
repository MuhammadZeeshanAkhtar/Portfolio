import { Search, X } from 'lucide-react';
import { useId, useMemo, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { projectCategories } from '../data/projects';
import { useContent } from '../lib/content';
import type { ProjectCategory } from '../types';

type Filter = 'All' | ProjectCategory;

export function Projects() {
  const { projects } = useContent();
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const searchId = useId();

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    for (const p of projects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [projects]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (filter !== 'All' && p.category !== filter) return false;
      if (!q) return true;
      return [p.title, p.tagline, p.category, ...p.tech, ...p.features].join(' ').toLowerCase().includes(q);
    });
  }, [projects, filter, query]);

  const onTag = (tag: string) => setQuery((current) => (current.toLowerCase() === tag.toLowerCase() ? '' : tag));

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Things I've *built*"
          description="AI agents, machine learning systems and full-stack AI products. Filter by category, search, or tap a tech tag."
        />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {(['All', ...projectCategories] as Filter[]).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors duration-200 ${
                  filter === c ? 'border-fg bg-fg text-bg' : 'border-line bg-surface hover:border-fg/40'
                }`}
              >
                {c}
                <span className={`rounded-full px-1.5 text-xs ${filter === c ? 'bg-accent text-on-accent' : 'bg-bg-soft text-muted'}`}>
                  {counts[c] ?? 0}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <label htmlFor={searchId} className="sr-only">
              Search projects by name or technology
            </label>
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: e.g. FastAPI, OCR, React"
              className="min-h-11 w-full rounded-full border border-line bg-surface pl-10 pr-11 text-base outline-none transition-colors duration-200 placeholder:text-muted focus:border-fg sm:text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-1 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full hover:bg-bg-soft"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p aria-live="polite" className="mb-5 text-sm text-muted">
          Showing {results.length} of {projects.length} projects
          {query && (
            <>
              {' '}
              matching “<span className="font-semibold text-fg">{query}</span>”
            </>
          )}
        </p>

        {results.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <li key={p.id}>
                <Reveal className="h-full" delay={Math.min(i, 5) * 0.04}>
                  <ProjectCard project={p} onTagClick={onTag} activeTag={query} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card flex flex-col items-center gap-3 p-10 text-center">
            <p className="font-semibold">No projects match that search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setFilter('All');
              }}
              className="min-h-11 cursor-pointer rounded-full border border-line px-5 text-sm font-semibold hover:border-fg/40"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
