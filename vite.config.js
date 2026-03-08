import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chivas-goal-archive/', // O '/Chivas-Goal-Archive/' si dejaste las mayúsculas
})