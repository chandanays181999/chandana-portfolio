import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE_PATH env var for GitHub Pages deployment
// e.g. VITE_BASE_PATH=/chandana-portfolio/ npm run build
// For custom domain or root deployment, leave unset (defaults to '/')
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    base: '/chandana-portfolio/',
  },
})
