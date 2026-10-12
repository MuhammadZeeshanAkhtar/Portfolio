import { GraduationCap } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { education } from '../data/education';

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="education-title" eyebrow="Education" title="Where I *studied*" />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <li key={e.id}>
              <Reveal delay={i * 0.05} className="h-full">
                <article className="card flex h-full gap-4 p-6 sm:p-7">
                  <span aria-hidden="true" className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-on-accent">
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-snug">{e.degree}</h3>
                    <p className="mt-1 font-medium">{e.institution}</p>
                    <p className="mt-1 text-sm text-muted">
                      {e.period} · {e.location}
                    </p>
                    {e.grade && (
                      <p className="mt-3 inline-flex rounded-full bg-bg-soft px-3 py-1 text-xs font-semibold">{e.grade}</p>
                    )}
                    {e.details.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-sm text-muted">
                        {e.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
