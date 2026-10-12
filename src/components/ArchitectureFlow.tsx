import { ArrowDown, ArrowRight } from 'lucide-react';
import { Fragment } from 'react';
import type { ArchitectureStep } from '../types';

/**
 * Architecture / data-flow diagram built from HTML (no images).
 * Vertical on small screens, a left-to-right pipeline on large screens.
 */
export function ArchitectureFlow({ steps, label }: { steps: ArchitectureStep[]; label: string }) {
  return (
    <figure className="card bg-bg-soft p-4 sm:p-6">
      <ol aria-label={label} className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch">
        {steps.map((step, i) => (
          <Fragment key={step.title}>
            <li className="flex min-w-0 flex-1 gap-3 rounded-2xl border border-line bg-surface p-4 lg:flex-col lg:gap-2">
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-on-accent"
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="sr-only">Step {i + 1}: </span>
                <span className="block text-sm font-semibold leading-snug">{step.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">{step.detail}</span>
              </span>
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden="true" className="flex shrink-0 items-center justify-center text-muted">
                <ArrowDown className="h-5 w-5 lg:hidden" />
                <ArrowRight className="hidden h-5 w-5 lg:block" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
      <figcaption className="mt-4 text-xs text-muted">{label}. Each box is one stage of the pipeline, in order.</figcaption>
    </figure>
  );
}
