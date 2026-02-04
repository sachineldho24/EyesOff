import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/EyesOff/',  // GitHub Pages base path
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    open: true,
  },
});
