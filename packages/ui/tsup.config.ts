import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    tokens: 'src/tokens/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  target: 'es2020',
  clean: true,
  external: ['react', 'react-dom', 'react-native', 'react-native-web'],
  esbuildOptions(options) {
    // Required for Tamagui to tree-shake correctly
    options.platform = 'neutral'
  },
})
