import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative paths also support hosting under a GitHub Pages repository path.
export default defineConfig({ plugins: [react()], base: './' });
