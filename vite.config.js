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
          vendor: [
            'react', 'react-router-dom', 'react-dom', 'rxjs',
            'date-fns', 'underscore',
          ],
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
