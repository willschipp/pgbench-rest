import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mockServer from 'vite-plugin-mock-server'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),mockServer()],
})
