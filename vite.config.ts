import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { analyzer } from 'vite-bundle-analyzer';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    analyzer(),
    VitePWA({ registerType: 'autoUpdate' }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});