import { styled, Text as TamaguiText } from 'tamagui'

export const Text = styled(TamaguiText, {
  name: 'Text',
  fontFamily: '$body',
  color: '$gray900',

  variants: {
    variant: {
      h1: { fontSize: 36, fontWeight: '700', lineHeight: 44, letterSpacing: -0.5 },
      h2: { fontSize: 28, fontWeight: '700', lineHeight: 36, letterSpacing: -0.3 },
      h3: { fontSize: 22, fontWeight: '600', lineHeight: 30 },
      h4: { fontSize: 18, fontWeight: '600', lineHeight: 26 },
      body: { fontSize: 15, fontWeight: '400', lineHeight: 24 },
      bodyLg: { fontSize: 17, fontWeight: '400', lineHeight: 28 },
      bodySm: { fontSize: 13, fontWeight: '400', lineHeight: 20 },
      label: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
      caption: { fontSize: 11, fontWeight: '400', lineHeight: 16, color: '$gray500' },
      code: {
        fontFamily: '$body',
        fontSize: 13,
        backgroundColor: '$gray100',
        paddingHorizontal: '$1',
        borderRadius: '$1',
      },
    },
    muted: {
      true: { color: '$gray500' },
    },
    bold: {
      true: { fontWeight: '700' },
    },
    center: {
      true: { textAlign: 'center' },
    },
  } as const,
})

export type TextProps = React.ComponentProps<typeof Text>
