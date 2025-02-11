import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './', // Use relative path instead of /shris-ai.github.io/
    server: {
        host: true,
        open: true,
        watch: {
          usePolling: true,
        },
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        emptyOutDir: true, // Clears the output directory before building
        rollupOptions: {
          input: "index.html", 
        },
    },
});
