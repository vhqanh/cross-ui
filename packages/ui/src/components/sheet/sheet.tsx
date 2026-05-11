import { Sheet as TamaguiSheet, View, styled } from 'tamagui'
import { Text } from '../text/text'

const StyledOverlay = styled(TamaguiSheet.Overlay, {
  name: 'SheetOverlay',

  variants: {
    variant: {
      default: { backgroundColor: 'rgba(9,9,11,0.35)' },
      light: { backgroundColor: 'rgba(9,9,11,0.2)' },
      dark: { backgroundColor: 'rgba(9,9,11,0.6)' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

const StyledFrame = styled(TamaguiSheet.Frame, {
  name: 'SheetFrame',
  backgroundColor: '$background',
  borderColor: '$borderColor',
  borderWidth: 1,
  gap: '$3',

  variants: {
    variant: {
      default: {
        backgroundColor: '$background',
        borderColor: '$borderColor',
      },
      primary: {
        backgroundColor: '$primary50',
        borderColor: '$primary200',
      },
      dark: {
        backgroundColor: '$gray900',
        borderColor: '$gray700',
      },
    },
    size: {
      sm: { padding: '$3' },
      md: { padding: '$4' },
      lg: { padding: '$5' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const StyledTitleWrapper = styled(View, {
  name: 'SheetTitleWrapper',
  borderBottomWidth: 1,

  variants: {
    variant: {
      default: { borderBottomColor: '$borderColor' },
      primary: { borderBottomColor: '$primary100' },
      dark: { borderBottomColor: '$gray700' },
    },
    size: {
      sm: { paddingBottom: '$1' },
      md: { paddingBottom: '$2' },
      lg: { paddingBottom: '$3' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type SheetVariant = 'default' | 'primary' | 'dark'
export type SheetSize = 'sm' | 'md' | 'lg'

export interface SheetProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  side?: 'left' | 'right' | 'bottom'
  children?: React.ReactNode
  variant?: SheetVariant
  size?: SheetSize
}

export function Sheet({
  open,
  onOpenChange,
  title,
  side = 'right',
  children,
  variant = 'default',
  size = 'md',
}: SheetProps) {
  return (
    <TamaguiSheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={side === 'bottom' ? [60] : [85]}
      position={0}
      dismissOnOverlayPress
    >
      <StyledOverlay variant={variant === 'dark' ? 'dark' : 'default'} />
      <StyledFrame variant={variant} size={size}>
        {title ? (
          <StyledTitleWrapper variant={variant} size={size}>
            <Text variant="h4" color={variant === 'dark' ? '$gray100' : '$color12'}>
              {title}
            </Text>
          </StyledTitleWrapper>
        ) : null}
        {children}
      </StyledFrame>
    </TamaguiSheet>
  )
}
