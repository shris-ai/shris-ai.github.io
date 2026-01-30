# Medium Priority SEO Items – Implemented

All four medium-priority SEO items from the strategy are in place.

---

## 1. Categories / tags pages

**Route:** `/tags/[tag]`

- **`src/pages/tags/[tag].astro`** – Dynamic page for each tag.
- **`getStaticPaths()`** – Builds one page per tag (AI, Machine Learning, NLP).
- **Content:** Lists all papers for that tag with thumbnails, descriptions, and links.
- **Breadcrumbs:** Home › Paper Dive-Ins › [Tag name].
- **Back link:** “← Back to all papers”.

**URLs:**
- `/tags/ai`
- `/tags/machine-learning`
- `/tags/nlp`

**Paper Dive-Ins:** “Browse by tag” section with pill links to each tag.

---

## 2. Reading time

**Location:** Paper breakdown pages (`/paper-breakdown/[slug]`).

- **Logic:** `estimateReadingTime()` in `src/utils/papers.ts` – strips HTML and uses ~200 words per minute.
- **UI:** “X min read” next to the title.
- **Schema:** Article schema includes `timeRequired: "PT{X}M"` (ISO 8601 duration).

---

## 3. Table of contents

**Location:** Paper breakdown pages.

- **Logic:** `extractHeadingsAndAddIds()` in `src/utils/papers.ts` – finds `<h1>`, `<h2>`, `<h3>` in the HTML, adds stable `id`s, and returns a TOC list.
- **UI:** “On this page” box before the article with links to each heading.
- **IDs:** New headings get `id="heading-1"`, etc.; existing `id`s (e.g. in COCONUT HTML) are kept and used in the TOC.
- **Styling:** Indentation by level (h2, h3) so hierarchy is clear.

---

## 4. Author bio section

**Location:** Bottom of each paper breakdown page.

- **Component:** `src/components/AuthorBio.astro`.
- **Content:** Photo, name, title (“AI Solution Architect & Researcher”), short bio, links to LinkedIn, GitHub, and “About” (home).
- **Layout:** Responsive; compact option available via `compact` prop (not used on paper pages).

---

## Shared utilities

**`src/utils/papers.ts`**

- `getAllTags()` – Unique tags from all papers.
- `getPapersByTag(tagOrSlug)` – Papers for a tag (handles both display name and URL slug).
- `getTagDisplayName(tagSlug)` – Slug → display name (e.g. `machine-learning` → “Machine Learning”).
- `getPaperSlug(paper)` – Slug from paper title.
- `getRelatedPapers(paper, limit)` – Related papers by shared tags (default 3).
- `estimateReadingTime(html)` – Minutes to read (200 wpm).
- `extractHeadingsAndAddIds(html)` – Adds/keeps heading IDs and returns `{ content, toc }`.

---

## Paper breakdown page updates

Each paper page now has:

1. **Breadcrumbs** – Home › Paper Dive-Ins › [Paper title].
2. **Meta row** – “X min read” + tag links to `/tags/[tag]`.
3. **Table of contents** – When the article has h1–h3 headings.
4. **Author bio** – After the main content.
5. **Related papers** – Up to 3 papers with matching tags and links to their breakdown pages.

---

## Build note

- **Sitemap:** `@astrojs/sitemap` is temporarily disabled in `astro.config.mjs` due to a build error (`Cannot read properties of undefined (reading 'reduce')`). All other builds complete successfully. You can re-enable it after upgrading the integration or when the bug is fixed.

---

## How to verify

1. **Tags:** Visit `/paper-dive-ins`, use “Browse by tag”, then open `/tags/ai`, `/tags/machine-learning`, `/tags/nlp`.
2. **Reading time:** Open any paper; check “X min read” and Article schema (e.g. in DevTools or Rich Results Test).
3. **TOC:** Open a paper with headings (e.g. COCONUT); confirm “On this page” and that links scroll to the right sections.
4. **Author bio:** Scroll to the bottom of any paper; confirm photo, bio, and links.
5. **Related papers:** On a paper page, confirm “Related papers” and that links go to other papers with shared tags.

Build: `npm run build` (completes successfully with sitemap disabled).
