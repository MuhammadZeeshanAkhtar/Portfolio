import type { LucideIcon } from 'lucide-react';
import type { MouseEventHandler, ReactNode } from 'react';
import { isTodo } from '../lib/asset';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-[background-color,color,border-color,transform,box-shadow] duration-200 cursor-pointer select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg hover:-translate-y-0.5 hover:shadow-lift',
  accent: 'bg-accent text-on-accent hover:-translate-y-0.5 hover:shadow-lift',
  outline: 'border border-line bg-surface text-fg hover:border-fg/40 hover:-translate-y-0.5',
  ghost: 'text-fg hover:bg-bg-soft',
};

export function buttonClass(variant: Variant = 'outline', extra = '') {
  return `${base} ${variants[variant]} ${extra}`;
}

interface Props {
  href: string;
  children: ReactNode;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  variant?: Variant;
  external?: boolean;
  download?: boolean | string;
  className?: string;
  /** Shown instead of a broken link when href is a "TODO:" placeholder. */
  pendingLabel?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Link styled as a button. If the URL is still a "TODO:" placeholder it renders a non-interactive
 * pill instead (and, during `npm run dev`, a dashed red TODO marker so missing content is obvious).
 */
export function LinkButton({
  href,
  children,
  icon: Icon,
  iconRight: IconRight,
  variant = 'outline',
  external,
  download,
  className = '',
  pendingLabel,
  ariaLabel,
  onClick,
}: Props) {
  if (isTodo(href)) {
    if (import.meta.env.DEV) {
      return (
        <span
          title={href}
          className={`${base} border border-dashed border-red-500 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 ${className}`}
        >
          {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
          {href}
        </span>
      );
    }
    return (
      <span
        aria-disabled="true"
        className={`${base} cursor-default border border-dashed border-line text-muted ${className}`}
      >
        {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
        {pendingLabel ?? `${typeof children === 'string' ? children : 'Link'} · coming soon`}
      </span>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={buttonClass(variant, className)}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...(download && { download: typeof download === 'string' ? download : true })}
    >
      {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
      {children}
      {IconRight && <IconRight aria-hidden="true" className="h-4 w-4" />}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
