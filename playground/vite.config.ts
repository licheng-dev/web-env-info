import { defineConfig } from 'vite'
import vitePluginEnvInfo from '../src/index'

export default defineConfig({
  plugins: [
    vitePluginEnvInfo({
      env: 'development',
    }),
  ],
})
