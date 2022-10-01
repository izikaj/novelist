import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    svgr(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-router-dom', 'react-dom'],
          vendor: ['rxjs', 'date-fns', 'underscore'],
          firebase1: ['firebase/database'],
          firebase2: ['firebase/auth', 'firebase/storage'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    open: false,
  },
});
