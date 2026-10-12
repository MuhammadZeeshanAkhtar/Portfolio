import { Fragment } from 'react';

/** Renders text where *wrapped words* get the banner-style lime highlight. */
export function Highlight({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
          <span key={i} className="hl">
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain-text version (for alt text, titles, exports). */
export function stripHighlight(text: string): string {
  return text.replace(/\*([^*]+)\*/g, '$1');
}
