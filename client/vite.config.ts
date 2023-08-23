import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "auth/spotify": {
        target: "https://wrapify-server-bff9ee0094f2.herokuapp.com",
      },
      "/api": {
        target: "https://wrapify-server-bff9ee0094f2.herokuapp.com",
      }
    }
  }
})
