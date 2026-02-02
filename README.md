# Shristi Gautam's Personal Blog

A personal blog built with Astro for better SEO and performance.

**Live site:** [https://shris-ai.github.io](https://shris-ai.github.io) — Blog: [https://shris-ai.github.io/notes/](https://shris-ai.github.io/notes/)  
*(This repo page is the source code; the link above is the deployed site. Blog lives at `/notes/` so GitHub Pages/Jekyll doesn’t override it.)*

## Features

- Built with Astro for optimal SEO and performance
- Static site generation
- Research paper deep dives
- Responsive design
- GitHub Pages deployment ready

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

1. **Build and push the site to the `gh-pages` branch:**

   ```bash
   npm run build
   npm run deploy
   ```
   Deploy runs `scripts/deploy.cjs`, which uses `dotfiles: true` and `nojekyll: true` so GitHub Pages serves the built site as-is (no Jekyll). Without this, `/blog/` and other pages can show only a minimal “blog” heading.

2. **Set GitHub Pages to use `gh-pages` (required for the blog and all pages to work):**
   - On GitHub: open the repo → **Settings** → **Pages**.
   - Under **Build and deployment**, set **Source** to **Deploy from a branch**.
   - Set **Branch** to **gh-pages** and **Folder** to **/ (root)**.
   - Save. The site (including [shris-ai.github.io/notes/](https://shris-ai.github.io/notes/)) is served from the root of `gh-pages`.

   If **Branch** is set to **main**, the blog and other built pages will not appear, because the repo root on `main` is source code, not the built site.

3. **If the blog still doesn’t show (Pages is already on gh-pages):**
   - **Re-deploy** (this uses the script that adds `.nojekyll` and includes dotfiles):
     ```bash
     npm run build
     npm run deploy
     ```
     Then wait 1–2 minutes and open https://shris-ai.github.io/notes/ in an **incognito/private** window.
   - **Check gh-pages:** On GitHub → switch branch to **gh-pages** → confirm the root has a **blog** folder (with **index.html** inside) and that **.nojekyll** exists at the root (you may need to enable “Show hidden files” or check via the GitHub API). If `.nojekyll` is missing, Jekyll will run and override the path `/blog/` with a minimal page. The blog section lives at **/notes/** so it works even if Jekyll runs; `/blog/` redirects to `/notes/`.

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/ # Astro components
│   ├── layouts/    # Page layouts
│   ├── pages/      # File-based routing
│   ├── data/       # Data files
│   └── assets/     # Images and fonts
└── astro.config.mjs
```
