# Cleanup Guide: What’s Used vs Unused

The site is **Astro-based**. All live pages come from `src/pages/*.astro`. The list below separates what the Astro site actually uses from legacy/unused files so you can clean safely.

---

## ✅ NEEDED (used by the current site)

### Pages & routing
- `src/pages/index.astro` – Home
- `src/pages/paper-dive-ins.astro` – Paper list
- `src/pages/paper-breakdown/[slug].astro` – Paper article
- `src/pages/blog/index.astro` – Blog list
- `src/pages/blog/[slug].astro` – Blog article
- `src/pages/labs/index.astro` – Labs list
- `src/pages/labs/[slug].astro` – Lab article
- `src/pages/tags/[tag].astro` – Tag filter
- `src/pages/newsletter.astro` – Newsletter

### Layout & components
- `src/layouts/Layout.astro`
- `src/components/TopBar.astro`
- `src/components/Breadcrumb.astro`
- `src/components/AuthorBio.astro`
- `src/components/Icon.tsx` (used by TopBar)

### Data & content
- `src/data/papers.ts`
- `src/data/blog.ts`
- `src/data/labs.ts`
- `src/content/labs/scholar-scout.md`
- `src/content/labs/tutor-ai.md`
- **Paper HTML content (required by `papers.ts` and `blog.ts`):**
  - `src/routes/PaperDiveIns/papers/CoRAG_Chain of Retrieval Augmented Generation.html`
  - `src/routes/PaperDiveIns/papers/Titans_Learning to Memorize at Test Time.html`
  - `src/routes/PaperDiveIns/papers/COCONUT_Training Large Language Models to Reason in a Continuous Latent Space.html`
  - `src/routes/PaperDiveIns/papers/DSPY_Compiling Declarative Language Model Calls into Self-Improving Pipelines.html`
  - `src/routes/PaperDiveIns/papers/Program of Thoughts Prompting_Disentangling Computation from Reasoning for Numerical Reasoning Tasks.html`
  - `src/routes/PaperDiveIns/papers/ReasoningModels.html` (used by blog)

### Utils & styles
- `src/utils/papers.ts`
- `src/utils/tagColors.ts`
- `src/utils/substack.ts`
- `src/styles/global.css`
- `src/styles/shared.css`
- `src/styles/TopBar.css` (imported by TopBar.astro)
- `src/styles/AuthorBio.css`
- `src/styles/Breadcrumb.css`
- `src/styles/page-home.css`
- `src/styles/page-paper-breakdown.css`
- `src/styles/page-paper-dive-ins.css`
- `src/styles/page-blog.css`
- `src/styles/page-labs.css`
- `src/styles/page-newsletter.css`
- `src/styles/page-tags.css`

### Public (served as-is)
- `public/assets/` – bio images, icons, logo (used by Layout and pages)
- `public/fonts/Anaktoria/` – font used in `global.css`
- `public/papers/assets/` – paper and blog images (cards + in-article)
- `public/labs/assets/` – lab card and in-content images
- `public/robots.txt`
- `public/sitemap.xml`

### Config
- `astro.config.mjs`
- `package.json`, `tsconfig.json`, `env.d.ts`

---

## ❌ SAFE TO REMOVE (not used by Astro)

### Old React app entry (replaced by Astro)
| File | Why unused |
|------|------------|
| `index.html` (project root) | React/Vite entry; Astro builds from `src/pages/` and generates its own HTML. |
| `src/main.jsx` | React app bootstrap. |
| `src/App.jsx` | React root component. |
| `src/App.css` | Styles for App.jsx. |
| `src/index.css` | React app styles; site uses `src/styles/global.css` etc. |

### Old React routes (replaced by Astro pages/components)
| File | Why unused |
|------|------------|
| `src/routes/Home/Home.jsx` | Replaced by `src/pages/index.astro`. |
| `src/routes/Home/Home.css` | Styles for Home.jsx. |
| `src/routes/TopBar/TopBar.jsx` | Replaced by `src/components/TopBar.astro`. |
| `src/routes/TopBar/TopBar.css` | Replaced by `src/styles/TopBar.css`. |
| `src/routes/Labs/ScholarScout.md` | Old lab content; labs use `src/content/labs/` and `src/data/labs.ts`. |
| `src/routes/PaperDiveIns/PaperDiveIns.jsx` | Replaced by `src/pages/paper-dive-ins.astro`. |
| `src/routes/PaperDiveIns/PaperDiveIns.css` | Styles for PaperDiveIns.jsx. |
| `src/routes/PaperDiveIns/PaperBreakdown.jsx` | Replaced by `src/pages/paper-breakdown/[slug].astro`. |
| `src/routes/PaperDiveIns/papers.js` | Old paper list; site uses `src/data/papers.ts`. |

### PaperDiveIns/papers – only these HTML files are needed
These are **not** referenced by `papers.ts` or `blog.ts`; safe to delete:
- `src/routes/PaperDiveIns/papers/random.html`
- `src/routes/PaperDiveIns/papers/test.html`
- `src/routes/PaperDiveIns/papers/understanding_transformers.md`

### PaperDiveIns/papers/assets (redundant)
- **`src/routes/PaperDiveIns/papers/assets/`** – Build reads HTML from `src/` and rewrites image paths to `/papers/assets/`. The browser loads from **`public/papers/assets/`**. The same images exist in `public/papers/assets/`, so the copy under `src/routes/...` is redundant and can be removed.

### Duplicates of public assets
- **`src/assets/`** – Icons and bio image are only used via URLs like `/assets/...`, which are served from **`public/assets/`**. Same names exist in `public/assets/`, so `src/assets/` is redundant.
- **`src/fonts/`** – `global.css` uses `url('/fonts/Anaktoria/...')`, i.e. **`public/fonts/`**. Same font is in `public/fonts/Anaktoria/`, so `src/fonts/` is redundant.

### Old static lab pages (replaced by Astro lab pages)
- `public/labs/ScholarScout.html`
- `public/labs/tutorAI.html`  
Labs are now at `/labs/scholar-scout` and `/labs/tutor-ai`; these HTML files are no longer linked.

---

## ⚠️ REVIEW (optional)

| Item | Note |
|------|------|
| `vite.config.js` | Written for the old React/Vite app (e.g. `input: "index.html"`, React plugin). Astro uses Vite and may merge this; if the Astro build is working, you can leave it or simplify (e.g. remove `rollupOptions.input` and React-specific bits) to avoid confusion. |
| `public/assets/react.svg` | Likely leftover from React template; remove if you don’t reference it. |
| `public/vite.svg` | Same as above; remove if unused. |

---

## Summary

- **Keep:** All of the “NEEDED” section and the six paper HTML files under `src/routes/PaperDiveIns/papers/` listed there. Keep `public/` as-is except for the items listed under “Safe to remove”.
- **Safe to remove:** Everything under “SAFE TO REMOVE” (old React app, old routes, redundant assets/fonts, unused paper files, redundant `PaperDiveIns/papers/assets/`, old lab HTML in `public/labs/`).
- **Optional:** Apply “REVIEW” changes if you want a cleaner config and public folder.

If you want, the next step can be a concrete list of delete commands (e.g. which exact paths to remove) so you can run them in one go.
