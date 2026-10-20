import { ArrowUpRight, Award, BadgeCheck, Trophy } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { achievements } from '../data/achievements';
import { certifications } from '../data/certifications';
import type { Certification } from '../types';

function VerifyLink({ cert }: { cert: Certification }) {
  if (!cert.url) return null;
  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Verify ${cert.title} credential (opens in a new tab)`}
      className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4 hover:decoration-fg"
    >
      Verify <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

export function Certificates() {
  const featured = certifications.filter((c) => c.highlight);
  const rest = certifications.filter((c) => !c.highlight);

  return (
    <section id="certificates" aria-labelledby="certificates-title" className="bg-bg-soft py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="certificates-title"
          eyebrow="Certificates"
          title="Recognition and *learning*"
          description={`${certifications.length} certifications from NAVTTC, DeepLearning.AI, Stanford, IBM, Google and more, with links to verify them.`}
        />

        <h3 className="sr-only">Achievements</h3>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {achievements.map((a, i) => (
            <li key={a.id}>
              <Reveal delay={i * 0.05} className="h-full">
                <article className={`card h-full p-6 sm:p-7 ${i === 0 ? 'bg-ink text-white dark:bg-surface' : ''}`}>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-on-accent"
                  >
                    {i === 0 ? <Trophy className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                  </span>
                  <h4 className="mt-4 text-lg font-bold leading-snug">{a.title}</h4>
                  <p className={`mt-1 text-sm font-semibold ${i === 0 ? 'text-lime' : 'text-accent-text'}`}>
                    {a.event} · {a.date}
                  </p>
                  <p className={`mt-3 text-sm ${i === 0 ? 'text-white/80 dark:text-muted' : 'text-muted'}`}>{a.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <h3 className="mb-5 mt-14 text-xl font-bold tracking-tight">Certifications</h3>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {featured.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={i * 0.05} className="h-full">
                <article className="card flex h-full flex-col p-6">
                  <BadgeCheck aria-hidden="true" className="h-6 w-6 text-accent-text" />
                  <h4 className="mt-3 font-bold leading-snug">{c.title}</h4>
                  <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                  {c.note && <p className="mt-2 text-xs text-muted">{c.note}</p>}
                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <span className="text-xs font-semibold text-muted">Issued {c.issued}</span>
                    <VerifyLink cert={c} />
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <ul className="card mt-5 divide-y divide-line">
            {rest.map((c) => (
              <li key={c.id} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <p className="font-semibold leading-snug">{c.title}</p>
                  <p className="text-sm text-muted">
                    {c.issuer} · {c.issued}
                  </p>
                </div>
                <VerifyLink cert={c} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
