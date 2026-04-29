import { createTokens } from 'tamagui'

// ─── Brand Palette ────────────────────────────────────────────────────────────
const palette = {
  // Neutrals
  white: '#ffffff',
  black: '#09090b',
  gray50: '#fafafa',
  gray100: '#f4f4f5',
  gray200: '#e4e4e7',
  gray300: '#d4d4d8',
  gray400: '#a1a1aa',
  gray500: '#71717a',
  gray600: '#52525b',
  gray700: '#3f3f46',
  gray800: '#27272a',
  gray900: '#18181b',

  // Brand — primary
  primary50: '#eff6ff',
  primary100: '#dbeafe',
  primary200: '#bfdbfe',
  primary300: '#93c5fd',
  primary400: '#60a5fa',
  primary500: '#3b82f6',
  primary600: '#2563eb',
  primary700: '#1d4ed8',
  primary800: '#1e40af',
  primary900: '#1e3a8a',

  // Success
  success100: '#dcfce7',
  success200: '#bbf7d0',
  success500: '#22c55e',
  success600: '#16a34a',

  // Warning
  warning100: '#fef9c3',
  warning200: '#fef08a',
  warning500: '#f59e0b',
  warning600: '#d97706',

  // Danger
  danger100: '#fee2e2',
  danger200: '#fecaca',
  danger500: '#ef4444',
  danger600: '#dc2626',
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
export const tokens = createTokens({
  color: palette,

  space: {
    $0: 0,
    '$0.5': 2,
    $1: 4,
    '$1.5': 6,
    $2: 8,
    '$2.5': 10,
    $3: 12,
    '$3.5': 14,
    $4: 16,
    $5: 20,
    $6: 24,
    $7: 28,
    $8: 32,
    $9: 36,
    $10: 40,
    $12: 48,
    $14: 56,
    $16: 64,
    $20: 80,
    true: 16,
  },

  size: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $8: 32,
    $10: 40,
    $12: 48,
    $16: 64,
    $20: 80,
    $24: 96,
    $32: 128,
    true: 16,
  },

  radius: {
    $0: 0,
    $1: 4,
    $2: 6,
    $3: 8,
    $4: 10,
    $5: 12,
    $6: 16,
    $full: 9999,
    true: 8,
  },

  zIndex: {
    $1: 100,
    $2: 200,
    $3: 300,
    $4: 400,
    $5: 500,
  },
})

export type AppTokens = typeof tokens
