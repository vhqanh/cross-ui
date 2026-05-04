import type { TamaguiProviderProps } from 'tamagui'
import { TamaguiProvider as CoreProvider } from 'tamagui'
import tamaguiConfig from '../tokens/tamagui.config'

export interface UIProviderProps extends Omit<TamaguiProviderProps, 'config'> {
  config?: TamaguiProviderProps['config']
}

/**
 * Wrap your app (or screen) with UIProvider.
 * Consumer apps can pass their own extended config, or use the default.
 *
 * @example
 * // _app.tsx (Next.js)
 * export default function App({ Component, pageProps }) {
 *   return <UIProvider><Component {...pageProps} /></UIProvider>
 * }
 *
 * @example
 * // App.tsx (React Native / Expo)
 * export default function App() {
 *   return <UIProvider><RootNavigator /></UIProvider>
 * }
 */
export function UIProvider({ config, children, ...rest }: UIProviderProps) {
  return (
    <CoreProvider config={config ?? tamaguiConfig} {...rest}>
      {children}
    </CoreProvider>
  )
}
