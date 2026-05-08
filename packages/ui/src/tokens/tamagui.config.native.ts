import { animations } from '@tamagui/config/v5-reanimated'
import { createAppTamaguiConfig } from './tamagui.config.base'

const config = createAppTamaguiConfig({ animations })

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
