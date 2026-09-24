import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative paths also support hosting under a GitHub Pages repository path.
// Each case study is its own HTML page so it has a shareable URL and its own link preview.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { rollupOptions: { input: { main: 'index.html', 'credible-atlas': 'credible-atlas.html', 'neurofit-ai': 'neurofit-ai.html', 'course-recommender': 'course-recommender.html' } } }
});
