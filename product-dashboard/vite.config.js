import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://course-api.com", // The actual API URL
        changeOrigin: true, // Ensures the request appears to come from the proxy
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' from the request path
      },
    },
  },
});
