import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Emits sitemap.xml and robots.txt using the deployed site URL (VITE_SITE_URL in .env).
function seoFiles(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      });
    },
  };
}

// Preloads the Poppins files used above the fold (regular, semibold, bold, bold italic) so text renders in the right font sooner.
function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return [];
        return Object.keys(ctx.bundle)
          .filter((file) => /poppins-latin-(400-normal|600-normal|700-normal|700-italic)-.*\.woff2$/.test(file))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `./${file}`, crossorigin: '' },
            injectTo: 'head' as const,
          }));
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    // Relative base works on any static host and any sub-path (GitHub Pages project sites included),
    // because the app uses hash routing and is always served from index.html.
    base: './',
    plugins: [react(), tailwindcss(), preloadFonts(), seoFiles(env.VITE_SITE_URL || 'https://example.com')],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
    },
  };
});
