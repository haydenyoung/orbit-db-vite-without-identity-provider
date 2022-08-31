import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      os: 'os-browserify',
      stream: 'stream-browserify',
      path: 'path-browserify',
      assert: 'assert-browserify'      
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      supported: {
        bigint: true
      },
      define: {
        global: 'globalThis'
      },
      plugins: [
      NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true
      })
      ]      
    }
  }
})
