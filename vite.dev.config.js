import { resolve } from 'path'

export default () => ({
  root: './demo',
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9999,
    host: '0.0.0.0',
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        compact: true,
      },
    },
  },
})
