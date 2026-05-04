import { styled, Card as TamaguiCard, TamaguiComponent } from 'tamagui'

export const Card: TamaguiComponent = styled(TamaguiCard, {
  name: 'Card',
  backgroundColor: '$white',
  borderRadius: '$5',
  borderWidth: 1,
  borderColor: '$gray100',

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
        borderColor: '$gray200',
      },
      ghost: {
        backgroundColor: '$gray50',
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
          borderColor: '$gray200',
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
  borderBottomColor: '$gray100',
  marginBottom: '$4',
})

export const CardFooter: TamaguiComponent = styled(TamaguiCard.Footer, {
  name: 'CardFooter',
  paddingTop: '$4',
  borderTopWidth: 1,
  borderTopColor: '$gray100',
  marginTop: '$4',
})

export type CardProps = React.ComponentProps<typeof Card>
