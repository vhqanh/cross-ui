import { styled, Separator, View, Text } from 'tamagui'

const DividerLine = styled(Separator, {
  name: 'Divider',
  borderColor: '$gray200',
  flex: 1,

  variants: {
    orientation: {
      horizontal: { width: '100%' },
      vertical: { height: '100%' },
    },
  } as const,
  defaultVariants: { orientation: 'horizontal' },
})

export interface DividerProps {
  label?: string
  orientation?: 'horizontal' | 'vertical'
}

export function Divider({ label, orientation = 'horizontal' }: DividerProps) {
  if (!label) return <DividerLine orientation={orientation} />

  return (
    <View flexDirection="row" alignItems="center" gap="$3">
      <DividerLine orientation={orientation} />
      <Text fontSize={12} color="$gray400" fontWeight="500">
        {label}
      </Text>
      <DividerLine orientation={orientation} />
    </View>
  )
}
