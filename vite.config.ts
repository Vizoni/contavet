import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ui: path.resolve(__dirname, 'src/ui'),
      routes: path.resolve(__dirname, 'src/routes'),
    },
  },
  build: {
    // Relative to the root
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
  server: {
    open: true, // Abre o navegador automaticamente
    port: 3001, // Porta do servidor de desenvolvimento
  },
});
