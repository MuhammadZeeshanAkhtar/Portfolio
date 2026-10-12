import { Bot, Brain, Database, Monitor, Server, Wrench, type LucideIcon } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { skills } from '../data/skills';

const icons: Record<string, LucideIcon> = {
  'ai-ml': Brain,
  agents: Bot,
  backend: Server,
  frontend: Monitor,
  data: Database,
  tools: Wrench,
};

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="skills-title" eyebrow="Skills" title="My *toolkit*" description="Grouped by where I use them. Every item comes from real projects, work or certifications." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const Icon = icons[group.id] ?? Wrench;
            return (
              <Reveal key={group.id} delay={(i % 3) * 0.05} className="h-full">
                <div className="card h-full p-6">
                  <h3 className="flex items-center gap-3 text-base font-bold">
                    <span aria-hidden="true" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-on-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    {group.title}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <li key={s} className="rounded-full border border-line bg-bg-soft px-3 py-1.5 text-sm font-medium">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
