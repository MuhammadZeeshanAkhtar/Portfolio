import { useEffect } from 'react';

const SITE = 'Muhammad Zeeshan Akhtar';
const DEFAULT_DESCRIPTION =
  document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

/** Sets the page title and meta description for the current route. */
export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Software Engineer, AI & Machine Learning`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description ?? DEFAULT_DESCRIPTION);
  }, [title, description]);
}
