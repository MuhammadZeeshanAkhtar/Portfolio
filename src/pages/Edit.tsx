import { AlertTriangle, Download, ExternalLink, Info, RotateCcw } from 'lucide-react';
import { useEffect, useId, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Highlight } from '../components/Highlight';
import { buttonClass } from '../components/LinkButton';
import { ProjectCard } from '../components/ProjectCard';
import { projectCategories } from '../data/projects';
import { useContent, type EditableProfile, type EditableProject } from '../lib/content';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type { ProjectCategory, ProjectStatus } from '../types';

const inputCls =
  'w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-base outline-none transition-colors duration-200 focus:border-fg sm:text-sm';

function Field({ label, hint, children, id }: { label: string; hint?: string; children: ReactNode; id: string }) {
  return (
    <div className="grid grid-cols-1 gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

function TextInput({ label, value, onChange, hint, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; hint?: string; type?: string }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} id={id}>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} aria-describedby={hint ? `${id}-hint` : undefined} className={inputCls} />
    </Field>
  );
}

function TextArea({ label, value, onChange, hint, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; hint?: string; rows?: number }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} id={id}>
      <textarea id={id} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} aria-describedby={hint ? `${id}-hint` : undefined} className={`${inputCls} resize-y leading-relaxed`} />
    </Field>
  );
}

/**
 * Edits a string[] as text. Keeps its own text so typing separators (new lines / commas) feels natural;
 * remount with a new `key` when the underlying item changes.
 */
function ListInput({
  label,
  value,
  onChange,
  mode,
  hint,
  rows = 5,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  mode: 'lines' | 'paragraphs' | 'commas';
  hint?: string;
  rows?: number;
}) {
  const join = mode === 'commas' ? ', ' : mode === 'paragraphs' ? '\n\n' : '\n';
  const [text, setText] = useState(() => value.join(join));
  const parse = (t: string) => {
    if (mode === 'commas') return t.split(',').map((s) => s.trim()).filter(Boolean);
    if (mode === 'paragraphs') return t.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    return t.split('\n').map((s) => s.trim()).filter(Boolean);
  };
  return (
    <TextArea
      label={label}
      hint={hint}
      rows={mode === 'commas' ? 2 : rows}
      value={text}
      onChange={(t) => {
        setText(t);
        onChange(parse(t));
      }}
    />
  );
}

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  labels,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
  labels?: Record<string, string>;
}) {
  const id = useId();
  return (
    <Field label={label} id={id}>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className={`${inputCls} cursor-pointer`}>
        {options.map((o) => (
          <option key={o} value={o}>
            {labels?.[o] ?? o}
          </option>
        ))}
      </select>
    </Field>
  );
}

const statuses: readonly ProjectStatus[] = ['Completed', 'In progress', 'Live'];

function download(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Edit() {
  useDocumentTitle('Content editor');
  const { profile, projects, edits, hasEdits, storageAvailable, updateProfile, updateProject, resetEdits } = useContent();
  const [tab, setTab] = useState<'profile' | 'projects'>('profile');
  const [projectId, setProjectId] = useState(projects[0]?.id ?? '');
  // Bumped on reset so list editors (which keep their own text) reload from the data files.
  const [version, setVersion] = useState(0);
  const project = projects.find((p) => p.id === projectId) ?? projects[0];

  // Keep the editor out of search results.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const setP = (patch: Partial<EditableProfile>) => updateProfile(patch);
  const setJ = (patch: Partial<EditableProject>) => project && updateProject(project.id, patch);

  const onExport = () => {
    const date = new Date().toISOString().slice(0, 10);
    download(`portfolio-content-${date}.json`, {
      exportedAt: new Date().toISOString(),
      howToUse:
        'Copy the values into src/data/profile.ts and src/data/projects.ts, then rebuild. "changedFields" lists only what you edited; "profile" and "projects" are the full current values.',
      changedFields: edits,
      profile: {
        name: profile.name,
        headline: profile.headline,
        valueStatement: profile.valueStatement,
        about: profile.about,
        location: profile.location,
        badge: profile.badge,
        phoneDisplay: profile.phoneDisplay,
        socials: profile.socials,
      },
      projects: projects.map((p) => ({
        id: p.id,
        title: p.title,
        tagline: p.tagline,
        category: p.category,
        featured: p.featured,
        status: p.status,
        period: p.period,
        problem: p.problem,
        solution: p.solution,
        features: p.features,
        tech: p.tech,
        role: p.role,
        results: p.results,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        demoVideoUrl: p.demoVideoUrl,
      })),
    });
  };

  const onReset = () => {
    if (window.confirm('Clear all local edits and go back to the content in src/data? This cannot be undone.')) {
      resetEdits();
      setVersion((v) => v + 1);
    }
  };

  const tabBtn = (key: 'profile' | 'projects', label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={tab === key}
      aria-controls={`panel-${key}`}
      id={`tab-${key}`}
      onClick={() => setTab(key)}
      className={`min-h-11 cursor-pointer rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${tab === key ? 'bg-fg text-bg' : 'hover:bg-bg-soft'}`}
    >
      {label}
    </button>
  );

  return (
    <section aria-labelledby="edit-title" className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Private tool</p>
          <h1 id="edit-title" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Content <span className="hl">editor</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onExport} className={buttonClass('accent')}>
            <Download aria-hidden="true" className="h-4 w-4" /> Export JSON
          </button>
          <button type="button" onClick={onReset} disabled={!hasEdits} className={`${buttonClass('outline')} disabled:cursor-not-allowed disabled:opacity-50`}>
            <RotateCcw aria-hidden="true" className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>

      <div role="note" className="mt-6 flex gap-3 rounded-2xl border border-line bg-accent/40 p-4 text-sm dark:bg-accent/10">
        <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
        <p>
          <strong>Edits are saved only in this browser.</strong> Visitors still see the content from <code>src/data/</code>. When you are happy,
          use <strong>Export JSON</strong> and paste the values back into the data files, then rebuild and deploy.
        </p>
      </div>
      {!storageAvailable && (
        <div role="alert" className="mt-3 flex gap-3 rounded-2xl border border-amber-500/50 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <p>This browser is blocking local storage, so edits will be lost when you leave the page. Export JSON before closing.</p>
        </div>
      )}

      <div role="tablist" aria-label="What to edit" className="mt-8 inline-flex gap-1 rounded-full border border-line bg-surface p-1">
        {tabBtn('profile', 'Profile')}
        {tabBtn('projects', 'Projects')}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {tab === 'profile' ? (
          <form id="panel-profile" role="tabpanel" aria-labelledby="tab-profile" className="card grid grid-cols-1 gap-5 p-5 sm:p-7" onSubmit={(e) => e.preventDefault()}>
            <TextInput label="Name" value={profile.name} onChange={(v) => setP({ name: v })} />
            <TextInput label="Headline" value={profile.headline} onChange={(v) => setP({ headline: v })} />
            <TextInput label="Value statement" value={profile.valueStatement} onChange={(v) => setP({ valueStatement: v })} hint="Wrap words in *asterisks* to highlight them in lime." />
            <ListInput key={`${version}-about`} label="About" mode="paragraphs" rows={10} value={profile.about} onChange={(v) => setP({ about: v })} hint="Separate paragraphs with a blank line. *Asterisks* highlight words." />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <TextInput label="Location" value={profile.location} onChange={(v) => setP({ location: v })} />
              <TextInput label="Hero badge" value={profile.badge} onChange={(v) => setP({ badge: v })} />
              <TextInput label="Email" type="email" value={profile.socials.email} onChange={(v) => setP({ email: v })} />
              <TextInput label="Phone (shown text)" value={profile.phoneDisplay} onChange={(v) => setP({ phoneDisplay: v })} />
              <TextInput label="WhatsApp number" value={profile.socials.whatsapp} onChange={(v) => setP({ whatsapp: v.replace(/[^\d]/g, '') })} hint="Digits only with country code, e.g. 923001234567. Empty hides WhatsApp." />
              <TextInput label="LinkedIn URL" type="url" value={profile.socials.linkedin} onChange={(v) => setP({ linkedin: v })} />
              <TextInput label="GitHub URL" type="url" value={profile.socials.github} onChange={(v) => setP({ github: v })} />
            </div>
          </form>
        ) : (
          project && (
            <form id="panel-projects" role="tabpanel" aria-labelledby="tab-projects" className="card grid grid-cols-1 gap-5 p-5 sm:p-7" onSubmit={(e) => e.preventDefault()}>
              <Select
                label="Project to edit"
                value={project.id}
                options={projects.map((p) => p.id)}
                labels={Object.fromEntries(projects.map((p) => [p.id, p.title]))}
                onChange={setProjectId}
              />
              <TextInput label="Title" value={project.title} onChange={(v) => setJ({ title: v })} />
              <TextArea label="Tagline" rows={2} value={project.tagline} onChange={(v) => setJ({ tagline: v })} />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <Select<ProjectCategory> label="Category" value={project.category} options={projectCategories} onChange={(v) => setJ({ category: v })} />
                <Select<ProjectStatus> label="Status" value={project.status} options={statuses} onChange={(v) => setJ({ status: v })} />
                <TextInput label="Period" value={project.period} onChange={(v) => setJ({ period: v })} />
              </div>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-semibold">
                <input type="checkbox" checked={project.featured} onChange={(e) => setJ({ featured: e.target.checked })} className="h-5 w-5 cursor-pointer accent-[#111111]" />
                Featured project (shown first and in the large card)
              </label>
              <TextArea label="Problem" value={project.problem} onChange={(v) => setJ({ problem: v })} />
              <TextArea label="Solution" value={project.solution} onChange={(v) => setJ({ solution: v })} />
              <ListInput key={`${version}-${project.id}-features`} label="Key features" mode="lines" value={project.features} onChange={(v) => setJ({ features: v })} hint="One feature per line." />
              <ListInput key={`${version}-${project.id}-tech`} label="Tech stack" mode="commas" value={project.tech} onChange={(v) => setJ({ tech: v })} hint="Comma-separated." />
              <TextArea label="My role" rows={2} value={project.role} onChange={(v) => setJ({ role: v })} />
              <ListInput key={`${version}-${project.id}-results`} label="Results (real ones only)" mode="lines" rows={3} value={project.results} onChange={(v) => setJ({ results: v })} hint="One per line. Leave empty if there are no measurable results yet." />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <TextInput label="GitHub URL" value={project.githubUrl} onChange={(v) => setJ({ githubUrl: v })} />
                <TextInput label="Live URL" value={project.liveUrl} onChange={(v) => setJ({ liveUrl: v })} />
                <TextInput label="Demo video URL" value={project.demoVideoUrl} onChange={(v) => setJ({ demoVideoUrl: v })} />
              </div>
            </form>
          )
        )}

        <aside aria-label="Live preview" className="lg:sticky lg:top-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted">Live preview</p>
          {tab === 'profile' ? (
            <div className="card p-6">
              <p className="text-sm font-semibold text-muted">{profile.headline}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">{profile.name}</p>
              <p className="mt-4 text-xl font-semibold leading-snug">
                <Highlight text={profile.valueStatement} />
              </p>
              {profile.about[0] && (
                <p className="mt-4 text-sm text-muted">
                  <Highlight text={profile.about[0]} />
                </p>
              )}
              <p className="mt-4 text-xs text-muted">
                {profile.location} · {profile.socials.email}
              </p>
              <Link to="/" className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4">
                Open the full site <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            project && (
              <div className="grid grid-cols-1 gap-4">
                <ProjectCard project={project} />
                <Link to={`/projects/${project.id}`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4">
                  Open the full case study <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            )
          )}
        </aside>
      </div>
    </section>
  );
}
