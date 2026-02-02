# Shristi Gautam's Personal Blog

A personal blog built with Astro for better SEO and performance.

**Live site:** [https://shris-ai.github.io](https://shris-ai.github.io) — Blog: [https://shris-ai.github.io/blog/](https://shris-ai.github.io/blog/)  
*(This repo page is the source code; the link above is the deployed site.)*

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
   The deploy script uses `--dotfiles` and `--nojekyll` so GitHub Pages serves the built site as-is (no Jekyll processing). Without this, `/blog/` and other pages can show only a minimal “blog” heading.

2. **Set GitHub Pages to use `gh-pages` (required for the blog and all pages to work):**
   - On GitHub: open the repo → **Settings** → **Pages**.
   - Under **Build and deployment**, set **Source** to **Deploy from a branch**.
   - Set **Branch** to **gh-pages** and **Folder** to **/ (root)**.
   - Save. The site (including [shris-ai.github.io/blog/](https://shris-ai.github.io/blog/)) is served from the root of `gh-pages`.

   If **Branch** is set to **main**, the blog and other built pages will not appear, because the repo root on `main` is source code, not the built site.

3. **If the blog still doesn’t show (Pages is already on gh-pages):**
   - **Re-deploy:** From your project root (on `main`), run:
     ```bash
     npm run build
     npx gh-pages -d dist --force
     ```
     Then wait 1–2 minutes and open https://shris-ai.github.io/blog/ in an **incognito/private** window (to avoid cache).
   - **Check gh-pages contents:** On GitHub, open the repo → switch the branch dropdown to **gh-pages** → confirm you see a **blog** folder and inside it **index.html**. If **blog** is missing, the deploy didn’t push the built site; run the commands above again.

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
