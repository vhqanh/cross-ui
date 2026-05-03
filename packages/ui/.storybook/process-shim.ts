/// <reference types="vite/client" />

/** ESM default export for `@rollup/plugin-inject`; `process/browser` is CJS-only. */
export default {
  env: {
    NODE_ENV: import.meta.env.MODE === 'production' ? 'production' : 'development',
  },
}
