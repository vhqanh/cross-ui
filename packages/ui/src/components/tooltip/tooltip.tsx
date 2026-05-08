import { Tooltip as TamaguiTooltip, styled } from 'tamagui'
import { Text } from '../text/text'

const StyledContent = styled(TamaguiTooltip.Content, {
  name: 'TooltipContent',
  borderWidth: 0,
  borderRadius: '$2',
  paddingHorizontal: '$2.5',
  paddingVertical: '$1.5',

  variants: {
    variant: {
      default: { backgroundColor: '$gray900' },
      light: { backgroundColor: '$white', borderWidth: 1, borderColor: '$gray200' },
      primary: { backgroundColor: '$primary700' },
      error: { backgroundColor: '$red700' },
    },
    size: {
      sm: { paddingHorizontal: '$2', paddingVertical: '$1' },
      md: { paddingHorizontal: '$2.5', paddingVertical: '$1.5' },
      lg: { paddingHorizontal: '$3', paddingVertical: '$2' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const StyledArrow = styled(TamaguiTooltip.Arrow, {
  name: 'TooltipArrow',

  variants: {
    variant: {
      default: { backgroundColor: '$gray900' },
      light: { backgroundColor: '$white' },
      primary: { backgroundColor: '$primary700' },
      error: { backgroundColor: '$red700' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

export type TooltipVariant = 'default' | 'light' | 'primary' | 'error'
export type TooltipSize = 'sm' | 'md' | 'lg'
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  open?: boolean
  content: React.ReactNode
  children: React.ReactNode
  variant?: TooltipVariant
  size?: TooltipSize
  placement?: TooltipPlacement
}

export function Tooltip({
  open,
  content,
  children,
  variant = 'default',
  size = 'md',
  placement = 'top',
}: TooltipProps) {
  const textColor = variant === 'light' ? '$gray900' : '$white'

  return (
    <TamaguiTooltip open={open} placement={placement}>
      <TamaguiTooltip.Trigger asChild>{children}</TamaguiTooltip.Trigger>
      <StyledContent variant={variant} size={size}>
        <StyledArrow variant={variant} />
        {typeof content === 'string' ? (
          <Text variant="caption" color={textColor}>
            {content}
          </Text>
        ) : (
          content
        )}
      </StyledContent>
    </TamaguiTooltip>
  )
}
