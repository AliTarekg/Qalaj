import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/Qalag/', // Set base for GitHub Pages deployment
  plugins: [react()],
})
