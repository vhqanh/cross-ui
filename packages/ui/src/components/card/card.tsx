import type { TamaguiComponent } from 'tamagui'
import { styled, Card as TamaguiCard } from 'tamagui'

export const Card: TamaguiComponent = styled(TamaguiCard, {
  name: 'Card',
  backgroundColor: '$background',
  borderRadius: '$5',
  borderWidth: 1,
  borderColor: '$borderColor',

  // Shadow
  shadowColor: '$black',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,

  variants: {
    variant: {
      default: {},
      elevated: {
        shadowOpacity: 0.12,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
      },
      flat: {
        shadowOpacity: 0,
        borderColor: '$borderColor',
      },
      ghost: {
        backgroundColor: '$color2',
        borderColor: 'transparent',
        shadowOpacity: 0,
      },
    },
    padded: {
      sm: { padding: '$3' },
      md: { padding: '$5' },
      lg: { padding: '$8' },
    },
    hoverable: {
      true: {
        cursor: 'pointer',
        hoverStyle: {
          shadowOpacity: 0.12,
          shadowRadius: 16,
          borderColor: '$borderColor',
          translateY: -2,
        },
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    padded: 'md',
  },
})

export const CardHeader: TamaguiComponent = styled(TamaguiCard.Header, {
  name: 'CardHeader',
  paddingBottom: '$4',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  marginBottom: '$4',
})

export const CardFooter: TamaguiComponent = styled(TamaguiCard.Footer, {
  name: 'CardFooter',
  paddingTop: '$4',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
  marginTop: '$4',
})

export type CardProps = React.ComponentProps<typeof Card>
