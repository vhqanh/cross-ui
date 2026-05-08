import { Toast as TamaguiToast, ToastViewport, styled, useToastState } from 'tamagui'
import { Text } from '../text/text'

const StyledToast = styled(TamaguiToast, {
  name: 'Toast',
  borderRadius: '$3',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: '$3',
  paddingVertical: '$2.5',

  variants: {
    variant: {
      default: { backgroundColor: '$gray900' },
      success: { backgroundColor: '$green800' },
      error: { backgroundColor: '$red700' },
      warning: { backgroundColor: '$yellow700' },
      info: { backgroundColor: '$primary700' },
    },
    size: {
      sm: { paddingHorizontal: '$2', paddingVertical: '$2' },
      md: { paddingHorizontal: '$3', paddingVertical: '$2.5' },
      lg: { paddingHorizontal: '$4', paddingVertical: '$3' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'
export type ToastSize = 'sm' | 'md' | 'lg'

export function ToastProvider() {
  const toast = useToastState()

  if (!toast || toast.isHandledNatively) return null

  const variant = (toast.customData?.variant ?? 'default') as ToastVariant
  const size = (toast.customData?.size ?? 'md') as ToastSize

  return (
    <StyledToast
      key={toast.id}
      duration={toast.duration}
      viewportName={toast.viewportName}
      variant={variant}
      size={size}
    >
      <TamaguiToast.Title unstyled>
        <Text variant="bodySm" color="$white">
          {toast.title}
        </Text>
      </TamaguiToast.Title>
      {toast.message ? (
        <TamaguiToast.Description unstyled>
          <Text variant="caption" color="$white" muted>
            {toast.message}
          </Text>
        </TamaguiToast.Description>
      ) : null}
    </StyledToast>
  )
}

// Viewport — đặt ở root layout cùng với ToastProvider
export function Toast() {
  return <ToastViewport position="absolute" bottom="$4" left="$4" right="$4" zIndex={80} />
}
