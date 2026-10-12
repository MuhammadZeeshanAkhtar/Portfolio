import { LazyMotion, MotionConfig } from 'framer-motion';
import { lazy, Suspense, type ComponentType, type MouseEvent } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollManager } from './components/ScrollManager';
import { ContentProvider } from './lib/content';
import { ThemeProvider } from './lib/theme';
import { readStorage, removeStorage, writeStorage } from './lib/storage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';

/**
 * After a new deploy, an already-open tab may ask for a chunk that no longer exists.
 * Reload once to pick up the new build instead of showing an error.
 */
function reloadOnce<T>(load: () => Promise<T>, onGiveUp?: () => void): Promise<T> {
  return load()
    .then((mod) => {
      removeStorage('mza-chunk-reload');
      return mod;
    })
    .catch((error: unknown) => {
      // Only reload if we could record the attempt; otherwise blocked storage would cause a reload loop.
      if (!readStorage('mza-chunk-reload') && writeStorage('mza-chunk-reload', '1')) {
        window.location.reload();
        return new Promise<T>(() => {});
      }
      onGiveUp?.();
      throw error;
    });
}

function lazyWithReload<T extends ComponentType>(load: () => Promise<{ default: T }>) {
  return lazy(() => reloadOnce(load));
}

// The private editor loads on demand to keep the first page fast.
const Edit = lazyWithReload(() => import('./pages/Edit'));
// The animation engine loads once the browser is idle, so it doesn't compete with the first render.
// If it can't load at all, content is shown without animation rather than left hidden.
const whenIdle = () =>
  new Promise<void>((resolve) => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => resolve(), { timeout: 1200 });
    else setTimeout(resolve, 200);
  });
const loadMotionFeatures = () =>
  whenIdle().then(() =>
    reloadOnce(
      () => import('./lib/motionFeatures').then((m) => m.default),
      () => document.documentElement.classList.add('no-motion'),
    ),
  );

function skipToContent(e: MouseEvent) {
  // Hash routing owns the URL fragment, so move focus manually instead of using href="#main".
  e.preventDefault();
  const main = document.getElementById('main');
  main?.focus();
  main?.scrollIntoView();
}

function Layout() {
  return (
    <>
      <a
        href="#/"
        onClick={skipToContent}
        className="sr-only z-50 rounded-full bg-fg px-5 py-3 font-semibold text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* Full-height fallback keeps the footer below the fold while a lazy page loads (no layout shift). */}
        <Suspense fallback={<div className="container-page min-h-[100svh] py-20 text-muted">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollManager />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <MotionConfig reducedMotion="user">
          <LazyMotion features={loadMotionFeatures} strict>
            <HashRouter>
              <Layout />
            </HashRouter>
          </LazyMotion>
        </MotionConfig>
      </ContentProvider>
    </ThemeProvider>
  );
}
