import { Dialog as TamaguiDialog, styled } from 'tamagui'
import { Text } from '../text/text'

const StyledOverlay = styled(TamaguiDialog.Overlay, {
  name: 'DialogOverlay',
  backgroundColor: 'rgba(9,9,11,0.4)',

  variants: {
    variant: {
      default: { backgroundColor: 'rgba(9,9,11,0.4)' },
      light: { backgroundColor: 'rgba(9,9,11,0.2)' },
      dark: { backgroundColor: 'rgba(9,9,11,0.7)' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

const StyledContent = styled(TamaguiDialog.Content, {
  name: 'DialogContent',
  backgroundColor: '$white',
  borderWidth: 1,
  borderColor: '$gray200',
  borderRadius: '$4',
  gap: '$3',
  elevate: true,

  variants: {
    variant: {
      default: {
        backgroundColor: '$white',
        borderColor: '$gray200',
      },
      danger: {
        backgroundColor: '$white',
        borderColor: '$red200',
      },
      info: {
        backgroundColor: '$white',
        borderColor: '$primary200',
      },
    },
    size: {
      sm: { width: '80%', maxWidth: 380, padding: '$4' },
      md: { width: '90%', maxWidth: 520, padding: '$5' },
      lg: { width: '95%', maxWidth: 720, padding: '$6' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type DialogVariant = 'default' | 'danger' | 'info'
export type DialogSize = 'sm' | 'md' | 'lg'

export interface DialogProps {
  open: boolean
  title?: string
  description?: string
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  footer?: React.ReactNode
  variant?: DialogVariant
  size?: DialogSize
}

export function Dialog({
  open,
  title,
  description,
  onOpenChange,
  children,
  footer,
  variant = 'default',
  size = 'md',
}: DialogProps) {
  return (
    <TamaguiDialog modal open={open} onOpenChange={onOpenChange}>
      <TamaguiDialog.Portal>
        <StyledOverlay key="overlay" variant={variant === 'default' ? 'default' : 'dark'} />
        <StyledContent key="content" variant={variant} size={size}>
          {title ? (
            <TamaguiDialog.Title unstyled>
              <Text variant="h4" color="$gray900">
                {title}
              </Text>
            </TamaguiDialog.Title>
          ) : null}
          {description ? (
            <TamaguiDialog.Description unstyled>
              <Text variant="bodySm" muted>
                {description}
              </Text>
            </TamaguiDialog.Description>
          ) : null}
          {children}
          {footer}
        </StyledContent>
      </TamaguiDialog.Portal>
    </TamaguiDialog>
  )
}
