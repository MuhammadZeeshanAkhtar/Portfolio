/** Resolves a file in /public against the deploy base (works on GitHub Pages sub-paths). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

/** Strings starting with "TODO:" are placeholders for content that has not been provided yet. */
export function isTodo(value: string | undefined | null): boolean {
  return !value || value.trim().toUpperCase().startsWith('TODO');
}

export function hasValue(value: string | undefined | null): value is string {
  return !isTodo(value);
}
