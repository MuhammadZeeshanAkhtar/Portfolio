# Muhammad Zeeshan Akhtar: Portfolio

Personal portfolio of **Muhammad Zeeshan Akhtar**, Software Engineer (AI & Machine Learning).

**Live:** https://muhammadzeeshanakhtar.github.io/Portfolio/

A fast, frontend-only site: **Vite + React + TypeScript + Tailwind CSS**, Framer Motion for subtle animation
(respects *reduce motion*), React Router (hash routing for GitHub Pages) and Lucide icons. There's no backend, no
database and no paid APIs. All content lives in `src/data/*.ts`.

---

## Run it locally

Requires **Node.js 20+** (22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:5173 with hot reload
npm run build      # type-check + production build into dist/
npm run preview    # serve the built dist/ at http://localhost:4173
```

## Edit the content

Everything on the site comes from these files. Change them, save, and the whole site updates.

| File | What it controls |
|---|---|
| `src/data/profile.ts` | Name, headline, value statement, About text, location, photo, CV link, socials (email, LinkedIn, GitHub, WhatsApp), quick facts |
| `src/data/projects.ts` | All 8 projects and their case-study pages (problem, solution, features, architecture steps, tech, role, results, links, status). Order in the file = order on the site (full-stack web & apps, then machine learning, then AI agents); `featured: true` puts a project in the big card at the top. |
| `src/data/experience.ts` | Experience timeline |
| `src/data/skills.ts` | Skill groups and chips |
| `src/data/certifications.ts` | Certifications (`highlight: true` = large card) |
| `src/data/achievements.ts` | Achievements / awards |
| `src/data/education.ts` | Education |

**Conventions**

- Wrap words in `*asterisks*` in the value statement, About text or section titles to get the lime "banner" highlight, e.g. `'Building smart *AI products* that *solve real problems*.'`
- Any text that starts with **`TODO:`** is a placeholder. On the live site TODO links show as "· coming soon" and TODO text is hidden. During `npm run dev` they're shown with a red dashed border so you can find and fill them. The current list is in [`TODO.md`](./TODO.md).
- **Results** must be real and verifiable. Leave the array empty if there are none yet.
- Images: put files in `public/assets/` and reference them with `asset('assets/your-file.webp')`. To show screenshots on a project, add them to its `images` array (`{ src, alt }`); the first image replaces the generated cover.

### Local content editor (`/#/edit`)

Open `http://localhost:5173/#/edit` (or `…/Portfolio/#/edit` on the live site). It isn't linked in the navigation and is marked `noindex`.

- Edit profile text and project details in a form; the preview and the whole site update instantly.
- **Edits are saved only in this browser** (localStorage). Visitors never see them.
- **Export JSON** downloads your edits. Paste the values back into `src/data/*.ts`, then commit and push to publish.
- **Reset** clears all local edits.

## Deploy (GitHub Pages)

Deployment is automatic through **GitHub Actions** (`.github/workflows/deploy.yml`):

1. One-time setup: on GitHub open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
2. Push to `main`. The workflow runs `npm ci && npm run build` and publishes `dist/`.
3. The site is live at `https://muhammadzeeshanakhtar.github.io/Portfolio/` about a minute later. Progress is in the repo's **Actions** tab.

If you move the site (custom domain, Vercel, Netlify…), update `VITE_SITE_URL` in `.env`. It's used for the canonical
URL, Open Graph/Twitter image URLs, `sitemap.xml` and `robots.txt`. The build uses a relative base path, so the same
`dist/` works on any host or sub-path.

**Vercel / Netlify:** build command `npm run build`, output directory `dist`. No other settings needed.

## What's inside

```
src/
  data/          ← all content (edit these)
  sections/      ← home-page sections (Hero, About, Featured, Projects, Experience, Skills, Certificates, Education, Contact)
  pages/         ← Home, ProjectDetail (/projects/:id), Edit (/edit), NotFound
  components/    ← Navbar, Footer, ProjectCard, ArchitectureFlow (HTML diagram), LinkButton, …
  lib/           ← content store (data + local edits), theme, safe localStorage helpers
public/
  assets/        ← photo, Open Graph image (LinkedIn banner), CV PDF
```

- **SEO:** title/description per page, canonical URL, Open Graph + Twitter cards (banner image), favicon, `sitemap.xml`, `robots.txt`.
- **Accessibility:** semantic landmarks, skip link, visible focus, keyboard-operable menu/filters, alt text, 44px touch targets, AA colour contrast in light and dark mode, reduced-motion support.
- **Performance:** self-hosted Poppins (Fontsource) with preloads, responsive WebP photo with a matching preload, lazy-loaded case studies, editor and animation engine.
- **Storage:** theme choice and editor drafts use `localStorage`, wrapped in `try/catch`, so the site still works when storage is blocked.

## LinkedIn review

See [`LINKEDIN_REVIEW.md`](./LINKEDIN_REVIEW.md) for a section-by-section review of the LinkedIn profile, with
copy-paste improvements, headline options, a rewritten About, missing skills, broken links and 10 post ideas.
