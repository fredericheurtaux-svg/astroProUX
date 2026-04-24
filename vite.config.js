import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    assetsInlineLimit: 4096,
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug'],
      },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core + Emotion + MUI (all depend on React)
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('@emotion/') ||
              id.includes('@mui/')) {
            return 'react-vendor';
          }
          
          // Router (depends on React)
          if (id.includes('react-router')) {
            return 'router-vendor';
          }
          
          // Charts (lourd, depends on React)
          if (id.includes('recharts')) {
            return 'charts-vendor';
          }
          
          // All other node_modules en un seul chunk
          if (id.includes('node_modules')) {
            return 'vendors';
          }
        }
      }
    }
  }
})