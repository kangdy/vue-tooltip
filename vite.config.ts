import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin({ topExecutionPriority: false })],
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  build: {
    outDir: 'lib',
    target: 'modules',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-tooltip',
      fileName: 'tooltip',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@vue/composition-api', '@popperjs/core'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  // resolve: {
  //   alias: {
  //     '@': resolve('packages/'),
  //   },
  // },
});
