import { defineConfig } from 'vite'
import devConfig from './vite.dev.config'
import prodConfig from './vite.prod.config'

export default defineConfig(({ mode }) => {
  const usingConf = mode === 'production' ? prodConfig : devConfig

  return usingConf()
})
