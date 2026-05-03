import type { StorybookConfig } from '@storybook/react-vite'
import inject from '@rollup/plugin-inject'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [
        {
          ...inject({
            process: path.resolve(dirname, 'process-shim.ts'),
          }),
          enforce: 'pre',
        },
      ],      define: {
        global: 'globalThis',
      },
      optimizeDeps: {
        esbuildOptions: {
          define: {
            global: 'globalThis',
          },
        },
      },
    })
  },
}

export default config