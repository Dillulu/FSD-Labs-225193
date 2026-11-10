import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Builds the whole site (JS, CSS, fonts, images) into ONE html file
// that opens by double-clicking — no server or npm needed.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'standalone',
    assetsInlineLimit: 100000000,
  },
})
