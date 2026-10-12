import { Bot, Brain, Layers, type LucideIcon } from 'lucide-react';
import type { Project, ProjectCategory } from '../types';

const categoryStyle: Record<ProjectCategory, { icon: LucideIcon; bg: string; chip: string; iconWrap: string }> = {
  'AI Agents': {
    icon: Bot,
    bg: 'bg-lime text-ink',
    chip: 'bg-white/80 text-ink border-ink/10',
    iconWrap: 'bg-ink text-lime',
  },
  'Machine Learning': {
    icon: Brain,
    bg: 'bg-ink text-white',
    chip: 'bg-white/10 text-white border-white/15',
    iconWrap: 'bg-lime text-ink',
  },
  'Full-Stack': {
    icon: Layers,
    bg: 'bg-[#E4F2BC] text-ink dark:bg-[#26301A] dark:text-white',
    chip: 'bg-white/80 text-ink border-ink/10 dark:bg-white/10 dark:text-white dark:border-white/15',
    iconWrap: 'bg-ink text-lime',
  },
};

export function categoryIcon(category: ProjectCategory): LucideIcon {
  return categoryStyle[category].icon;
}

/**
 * Visual cover for a project. Uses the first project image when one exists; otherwise draws the
 * first steps of the real architecture flow (no stock or fake screenshots).
 */
export function ProjectCover({ project, size = 'md' }: { project: Project; size?: 'md' | 'lg' }) {
  const image = project.images[0];
  const style = categoryStyle[project.category];
  const Icon = style.icon;
  const height = size === 'lg' ? 'min-h-56 sm:min-h-72' : 'min-h-44';

  if (image) {
    return (
      <div className={`relative overflow-hidden ${height}`}>
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }

  const header = (
    <div className="relative flex items-center justify-between">
      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${style.iconWrap}`}>
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">{project.category}</span>
    </div>
  );

  if (size === 'lg') {
    // Large cover: the whole pipeline as a vertical mini-diagram.
    const all = project.architecture.slice(0, 6);
    return (
      <div aria-hidden="true" className={`relative flex flex-col gap-6 overflow-hidden p-6 sm:p-8 ${height} ${style.bg}`}>
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-60" />
        {header}
        <ol className="relative my-auto grid gap-2">
          {all.map((step, i) => (
            <li key={step.title} className="flex items-center gap-3">
              <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${style.iconWrap}`}>{i + 1}</span>
              <span className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold backdrop-blur ${style.chip}`}>{step.title}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const steps = project.architecture.slice(0, 3);
  return (
    <div aria-hidden="true" className={`relative flex flex-col justify-between overflow-hidden p-5 ${height} ${style.bg}`}>
      <div className="grid-dots pointer-events-none absolute inset-0 opacity-60" />
      {header}
      <ol className="relative mt-6 flex flex-wrap items-center gap-1.5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex items-center gap-1.5">
            <span className={`rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur ${style.chip}`}>{step.title}</span>
            {i < steps.length - 1 && <span className="text-xs opacity-60">→</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}
