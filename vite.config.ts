import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist/types',
      rollupTypes: true,
    }),
  ],

  build: {
    target: 'modules',
    minify: false,
    rollupOptions: {
      external: ['vue', '@popperjs/core'],
      input: {
        es: resolve(__dirname, 'src/index.ts'),
        cjs: resolve(__dirname, 'src/index.ts'),
      },
      output: [
        {
          format: 'es',
          entryFileNames: 'index.js',
          dir: 'dist/es',
          preserveModules: false,
          exports: 'named',
        },
        {
          format: 'cjs',
          entryFileNames: 'index.js',
          dir: 'dist/lib',
          preserveModules: false,
          exports: 'named',
        },
      ],
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueTooltip',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  optimizeDeps: {
    exclude: ['vue-demi'],
  },
})
