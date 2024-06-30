import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import topLevelAwait from "vite-plugin-top-level-await";
import GlobalPolyFill from "@esbuild-plugins/node-globals-polyfill";
import inject from "@rollup/plugin-inject";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    topLevelAwait(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        GlobalPolyFill({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
		},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      events: 'events',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      http: 'stream-http',
      https: 'https-browserify',
     // ws: 'xrpl/dist/npm/client/WSWrapper',
    },
  },
});

