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
          // React core
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          
          // UI Framework (Material UI - très lourd)
          if (id.includes('@mui/material')) {
            return 'mui-vendor';
          }
          
          // Emotion (styling)
          if (id.includes('@emotion/')) {
            return 'emotion-vendor';
          }
          
          // Charts (lourd)
          if (id.includes('recharts')) {
            return 'charts-vendor';
          }
          
          // Router
          if (id.includes('react-router')) {
            return 'router-vendor';
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