import { Highlight } from '../components/Highlight';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { useContent } from '../lib/content';

export function About() {
  const { profile } = useContent();
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="about-title" eyebrow="About" title="From *models* to *products* people use" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Reveal className="space-y-5 text-base leading-relaxed sm:text-lg">
            {profile.about
              .filter((p) => p.trim())
              .map((paragraph, i) => (
                <p key={i} className={i === 0 ? 'text-fg' : 'text-muted'}>
                  <Highlight text={paragraph} />
                </p>
              ))}
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="card divide-y divide-line">
              {profile.quickFacts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-1 gap-1 p-5 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-muted">{fact.label}</dt>
                  <dd className="text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
