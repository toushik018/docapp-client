import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'node:url';
import path from "node:path";

// Get dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/ws': {
        target: 'ws://localhost:5000',
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    },
    allowedHosts: [
      '22dd-103-135-132-149.ngrok-free.app',
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app' // This will allow any ngrok subdomain
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});
