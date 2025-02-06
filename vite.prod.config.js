import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { terser } from 'rollup-plugin-terser'

export default () => ({
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    minify: true,
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'docxload',
      fileName: 'docxload',
    },
    rollupOptions: {
      output: {
        globals: {
          docxload: 'docxload',
        },
      },
    },
  },
  plugins: [
    dts({ tsconfigPath: './tsconfig.prod.json' }),
    terser({
      format: {
        comments: false
      },
      compress: {
        drop_console: true,
      },
    }),
  ],
})
