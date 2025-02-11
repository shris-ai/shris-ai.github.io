import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/shris-ai.github.io/',  // Ensure correct base path for GitHub Pages
    server: {
        host: true,
        open: true,
        watch: {
          usePolling: true,
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
        extensions: ['.js', '.jsx'],  // Ensure JSX files are resolved
    },
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,  // Ensure JSX files are processed
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        emptyOutDir: true,
        rollupOptions: {
          input: "index.html", 
        },
    },
});
