import { Progress as TamaguiProgress, Text, View, styled } from 'tamagui'

export interface ProgressProps {
  value: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md'
  variant?: 'default' | 'success' | 'warning'
}

const ProgressFrame = styled(TamaguiProgress, {
  name: 'Progress',
  borderRadius: '$full',
  borderWidth: 1,
  borderColor: '$gray200',
  backgroundColor: '$gray200',
  variants: {
    progressSize: {
      sm: { size: '$1' },
      md: { size: '$1.5' },
    },
  } as const,
  defaultVariants: { progressSize: 'sm' },
})

const ProgressIndicator = styled(TamaguiProgress.Indicator, {
  name: 'ProgressIndicator',
  variants: {
    variant: {
      default: { backgroundColor: '$primary600' },
      success: { backgroundColor: '$success500' },
      warning: { backgroundColor: '$warning500' },
    },
  } as const,
  defaultVariants: { variant: 'default' },
})

export function Progress({
  value,
  max = 100,
  showLabel = true,
  size = 'sm',
  variant = 'default',
}: ProgressProps) {
  const clamped = Math.max(0, Math.min(value, max))
  const percent = Math.round((clamped / max) * 100)

  return (
    <View gap="$2" width="100%">
      <ProgressFrame
        value={percent}
        progressSize={size}
      >
        <ProgressIndicator variant={variant} />
      </ProgressFrame>
      {showLabel ? (
        <Text fontSize={12} color="$gray500">
          {percent}%
        </Text>
      ) : null}
    </View>
  )
}
