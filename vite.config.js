import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Add versioning or query string to favicon
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'favicon.ico') {
            return 'favicon.ico?v=1'; // Example of query string for cache-busting
          }
          return '[name].[hash].[ext]';  // For other assets
        },
      },
    },
  },
});
