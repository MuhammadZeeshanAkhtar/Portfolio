export function TechTag({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick?: (label: string) => void;
  active?: boolean;
}) {
  const cls = `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-200 ${
    active ? 'border-fg bg-fg text-bg' : 'border-line bg-bg-soft text-fg'
  }`;
  if (!onClick) return <span className={cls}>{label}</span>;
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      aria-pressed={active}
      aria-label={`Filter projects by ${label}`}
      className={`${cls} relative min-h-7 cursor-pointer hover:border-fg/40 after:absolute after:-inset-1.5 after:content-['']`}
    >
      {label}
    </button>
  );
}
