/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vitest'],
      dts: true
    }),
    react(),
    tsconfigPaths(),
    eslint()
  ],
  server: {
    watch: {
      usePolling: true
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      all: true,
      src: ['src'],
      exclude: ['**/*{.,-}test.{ts,tsx}', '**/*.d.ts', 'src/**/index.ts'],
      include: ['src/*/**'],
      extension: ['.ts', '.tsx']
    }
  }
})
