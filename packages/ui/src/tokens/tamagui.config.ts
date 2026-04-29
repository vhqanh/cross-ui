import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { themes } from '@tamagui/themes'
import { tokens } from './tokens'

const headingFont = createInterFont({
  size: { 6: 15 },
  transform: { 6: 'uppercase', 7: 'none' },
  weight: { 6: '400', 7: '700' },
  color: { 6: '$colorFocus', 7: '$color' },
  letterSpacing: { 5: 2, 6: 1, 7: 0, 8: -1, 9: -2, 10: -3, 12: -4 },
  face: {
    700: { normal: 'InterBold' },
    800: { normal: 'InterBold' },
    900: { normal: 'InterBold' },
  },
})

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
    },
  },
  { sizeSize: (size) => Math.round(size * 1.1), sizeLineHeight: (size) => size + 5 }
)

const shorthands = {
  bg: 'backgroundColor',
  br: 'borderRadius',
  p: 'padding',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  m: 'margin',
  mx: 'marginHorizontal',
  my: 'marginVertical',
} as const

const config = createTamagui({
  defaultFont: 'body',
  themes,
  tokens,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  shorthands,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1650 },
    xxl: { minWidth: 1651 },
    gtXs: { minWidth: 661 },
    gtSm: { minWidth: 801 },
    gtMd: { minWidth: 1021 },
    gtLg: { minWidth: 1281 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
