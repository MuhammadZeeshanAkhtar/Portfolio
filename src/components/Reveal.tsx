import { m } from 'framer-motion';
import type { ReactNode } from 'react';

/** Subtle fade/slide-in on scroll. MotionConfig (reducedMotion="user") turns the movement off when requested. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      className={`reveal ${className ?? ''}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.38, ease: 'easeOut', delay }}
    >
      {children}
    </m.div>
  );
}
