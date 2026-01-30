import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// Sitemap temporarily disabled due to build error; re-enable when @astrojs/sitemap is fixed
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    // sitemap(),
  ],
  output: 'static',
  site: 'https://shris-ai.github.io',
  base: '/',
});
