import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonClass } from '../components/LinkButton';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <section aria-labelledby="nf-title" className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">404</p>
      <h1 id="nf-title" className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        This page <span className="hl">doesn&apos;t exist</span>
      </h1>
      <p className="mt-4 max-w-md text-muted">The link may be outdated. Head back to the portfolio to see projects, experience and contact details.</p>
      <Link to="/" className={`${buttonClass('primary')} mt-8`}>
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to home
      </Link>
    </section>
  );
}
