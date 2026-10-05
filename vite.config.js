import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'

const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // github pages
  // base: '/pushkar.dev',
  // for netlify
  base: '/',
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  // expose Vite to wi-fi network
  server: {
    host: true,
  },
});
