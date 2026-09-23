import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // github pages
  // base: '/pushkar.dev',
  // for netlify
  base: '/',
  // expose Vite to wi-fi network
  server: {
    host: true,
  },
});
