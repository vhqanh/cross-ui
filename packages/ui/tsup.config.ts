import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'tokens/index': 'src/tokens/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  target: 'es2020',
  clean: true,
  external: [
    'react',
    'react-dom',
    'react-native',
    'react-native-web',
    'tamagui',
    '@tamagui/animations-react-native',
    '@tamagui/config',
    '@tamagui/core',
    '@tamagui/font-inter',
    '@tamagui/themes',
  ],
  // Suppport for config of vite and webpack
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
  },
  esbuildOptions(options) {
    // Required for Tamagui to tree-shake correctly
    options.platform = 'neutral'
  },
})
