import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// Sitemap disabled: @astrojs/sitemap throws "Cannot read properties of undefined (reading 'reduce')" at build
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    // sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  output: 'static',
  site: 'https://shris-ai.github.io',
  base: '/',
});
