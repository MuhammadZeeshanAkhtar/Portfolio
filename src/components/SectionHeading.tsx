import type { ReactNode } from 'react';
import { Highlight } from './Highlight';

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="w-full max-w-2xl md:flex-1">
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent ring-4 ring-accent/30" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
          <Highlight text={title} />
        </h2>
        {description && <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>}
      </div>
      {action}
    </div>
  );
}
