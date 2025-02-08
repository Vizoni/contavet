import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all', { prefix: '' })],
  resolve: {
    alias: {
      ui: path.resolve(__dirname, 'src/ui'),
      routes: path.resolve(__dirname, 'src/routes'),
      contexts: path.resolve(__dirname, 'src/contexts'),
      utils: path.resolve(__dirname, 'src/utils'),
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
