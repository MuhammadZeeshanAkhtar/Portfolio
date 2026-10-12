import { isTodo } from '../lib/asset';

/**
 * Renders a text value. "TODO:" placeholders are hidden on the live site and shown as a red marker
 * during development so they are easy to spot and fill in.
 */
export function TodoText({ value, as: Tag = 'span', className = '' }: { value: string; as?: 'span' | 'p' | 'li'; className?: string }) {
  if (!isTodo(value)) return <Tag className={className}>{value}</Tag>;
  if (!import.meta.env.DEV) return null;
  return (
    <Tag className={`${className} rounded border border-dashed border-red-500 px-1.5 text-red-700 dark:text-red-300`}>
      {value}
    </Tag>
  );
}

/** Removes placeholder and empty entries from a list for display. */
export function visible(list: string[]): string[] {
  return list.filter((item) => item.trim() !== '' && (import.meta.env.DEV || !isTodo(item)));
}
