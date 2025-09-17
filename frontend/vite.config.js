import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            // '@utils': path.resolve(__dirname, 'src/utils'),
            '@components': path.resolve(__dirname, 'src/components')
        },
    },
})
