// import { resolve } from 'path';
// import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
// // import dts from 'vite-plugin-dts';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     cssInjectedByJsPlugin({ topExecutionPriority: false }),
//     // dts({
//     //   outputDir: 'lib'
//     // }),
//   ],
//   optimizeDeps: {
//     exclude: ['vue-demi'],
//   },
//   build: {
//     outDir: 'lib',
//     target: 'modules',
//     lib: {
//       entry: resolve(__dirname, 'src/index.ts'),
//       name: 'vue-tooltip',
//       fileName: 'tooltip',
//       formats: ['es', 'cjs'],
//     },
//     rollupOptions: {
//       external: ['vue', '@popperjs/core'],
//       output: {
//         globals: {
//           vue: 'Vue',
//         },
//       },
//     },
//   },
// });
import { defineConfig } from 'vite';
// import { createVuePlugin } from 'vite-plugin-vue2';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// import dts from 'vite-plugin-dts'
// import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'modules',
    //压缩
    minify: false,
    //css分离
    //cssCodeSplit: true,

    // rollup配置
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue', '@vue/composition-api', '@popperjs/core'],
      input: ['src/index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          // preserveModules: true,
          //配置打包根目录
          dir: 'es',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          // preserveModules: true,
          //配置打包根目录
          dir: 'lib',
        },
      ],
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin({ topExecutionPriority: false }),
    // dts(),
    // dts({
    //   outputDir: 'es',
    //   tsConfigFilePath: './/tsconfig.json',
    // }),
  ],
});
