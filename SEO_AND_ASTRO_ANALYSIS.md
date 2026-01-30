# SEO & Astro Codebase Analysis

## 1. Is the site Astro-based?

**Yes.** The site is built with Astro.

- **Config:** `astro.config.mjs` uses `defineConfig`, `@astrojs/react`, `output: 'static'`, `site: 'https://shris-ai.github.io'`.
- **Pages:** All main routes are Astro pages under `src/pages/` (e.g. `index.astro`, `paper-dive-ins.astro`, `blog/index.astro`, `paper-breakdown/[slug].astro`, `blog/[slug].astro`, `tags/[tag].astro`, `newsletter.astro`, `labs/index.astro`).
- **Layout:** `src/layouts/Layout.astro` provides the HTML shell and SEO meta tags.
- **Build:** `npm run build` runs `astro build` and outputs static HTML to `dist/`.

There are legacy React files (`src/App.jsx`, `src/routes/PaperDiveIns/`, `src/routes/Home/`, etc.) but they are **not** used as the main app. The live site is fully driven by Astro pages.

---

## 2. Where do papers (and blog) data come from? SEO impact?

**Papers** come from **`src/data/papers.ts`** (a TypeScript file).  
**Blog posts** come from **`src/data/blog.ts`**.

- Both are **imported in the Astro frontmatter** (e.g. `import papers from '../data/papers.ts'`), so they run at **build time** on the server.
- The generated HTML includes the full list of papers/blog posts and the full article content (paper breakdown and blog post bodies are read from HTML files and inlined at build time).
- **No client-side fetch** is used to load the list or the article body. Crawlers receive static HTML with all content.

**Conclusion:** Using TS/JS for data does **not** hurt SEO. Content is server-rendered at build time and is fully visible to search engines.

---

**Sitemap re-enable attempt:** The sitemap integration was re-enabled; the build then failed with `Cannot read properties of undefined (reading 'reduce')` in `@astrojs/sitemap`. It remains disabled. Options: add a manual `public/sitemap.xml` (or an Astro page that outputs sitemap XML), or upgrade `@astrojs/sitemap` / Astro and try again later.

---

## 3. SEO component analysis

### 3.1 Layout.astro (central SEO)

- **Meta:** `description`, `viewport`, `generator`, `author`.
- **Open Graph:** `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:alt`, `og:image:width`, `og:image:height`, `og:site_name`.
- **Twitter:** `twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`.
- **Article:** When `type === 'article'` and `publishedTime` is set: `article:published_time`, `article:author`, `article:tag` (per tag).
- **Canonical:** `rel="canonical"` from `currentURL` (from `canonicalURL` prop or `Astro.url` + `Astro.site`).
- **Favicon:** `rel="icon"` to `/assets/logo.png`.

No pages currently pass `canonicalURL`; they rely on Astro’s URL, which is correct for this static site.

### 3.2 Structured data (JSON-LD)

- **Home:** Person schema (name, jobTitle, description, url, image, sameAs, email, alumniOf, knowsAbout).
- **Paper Dive-Ins:** CollectionPage with ItemList of Article items (name, description, url per paper).
- **Paper breakdown:** Article schema (headline, description, image, author, publisher, datePublished, dateModified, timeRequired, mainEntityOfPage, keywords, articleSection).
- **Blog post:** Article schema (same shape).
- **Tags / Blog index:** No CollectionPage or ItemList schema (optional improvement).

### 3.3 Other SEO-related files

- **robots.txt:** In `public/robots.txt`. Allows all, points to `Sitemap: https://shris-ai.github.io/sitemap.xml`.

---

## 4. Issues that can hurt SEO and visits

### Critical

1. **Sitemap disabled but referenced in robots.txt**  
   - `astro.config.mjs` has the sitemap integration commented out (“Sitemap temporarily disabled due to build error”).  
   - `robots.txt` declares `Sitemap: https://shris-ai.github.io/sitemap.xml`.  
   - **Impact:** Crawlers expect a sitemap that is not generated; discovery of all URLs is less reliable.  
   - **Fix:** Re-enable `@astrojs/sitemap` and ensure the build succeeds (see fixes below).

2. **Wrong article dates for papers and blog posts**  
   - **Paper breakdown:** `datePublished` in JSON-LD and `publishedTime` passed to Layout use `new Date().toISOString()` (build time) instead of the paper’s `publishedDate` (e.g. "2024", "Jan 2025").  
   - **Blog post:** `datePublished` in JSON-LD uses `new Date().toISOString()`, and **`publishedTime` is not passed to Layout**, so `article:published_time` is missing on blog articles.  
   - **Impact:** Search engines see incorrect or missing publication dates; freshness and article signals are wrong.  
   - **Fix:** Derive ISO dates from `paper.publishedDate` / `post.publishedDate` (e.g. using existing `parseDateForFilter`), use them in Article schema and pass `publishedTime` into Layout for both paper and blog article pages.

### Medium (optional)

3. **Tags and Blog index lack CollectionPage/ItemList schema**  
   - **Impact:** Minor; listing pages are still indexable, but structured data could help discovery and rich results.  
   - **Fix:** Add CollectionPage + ItemList (and optionally BreadcrumbList) for `/tags/[tag]` and `/blog`.

4. **Person schema image on home**  
   - Uses `bio_image_1.jpg`. File exists in `public/assets/`. No bug, but the site also uses `bio-image.jpg` elsewhere; consider aligning for consistency.

### Low

5. **External CSS (stackedit, katex) in Layout**  
   - **Impact:** Slight latency; no direct SEO penalty.  
   - **Fix:** Optional self-hosting for performance.

6. **client:load on icons only**  
   - Used only for nav icons and theme toggle. All main content (papers list, blog list, article body) is server-rendered. **No SEO impact.**

---

## 5. Summary

| Topic              | Status / Finding                                                                 |
|-------------------|-----------------------------------------------------------------------------------|
| Framework         | Astro-based; static output.                                                       |
| Data source       | Papers/blog from TS files; used at build time only. No SEO downside.            |
| Meta & OG/Twitter | Implemented in Layout; article meta used when `publishedTime` is passed.         |
| Canonical         | Set from Astro URL; no known issue.                                              |
| Structured data   | Person, CollectionPage (paper-dive-ins), Article (paper + blog). Tags/blog: none.|
| Sitemap           | Disabled in config; robots.txt points to it → **fix by re-enabling sitemap**.    |
| Article dates     | Papers and blog use “now” and blog omits `publishedTime` → **fix with real dates**.|

Fixing the two critical items (sitemap + article dates) will improve crawlability and how search engines interpret your content, which can help visits and rankings.
