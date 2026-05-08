import { Switch as TamaguiSwitch, Text, View, styled } from 'tamagui'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  size?: 'sm' | 'md'
  variant?: 'default' | 'primary'
}

const SwitchFrame = styled(TamaguiSwitch, {
  name: 'Switch',
  borderWidth: 1,
  variants: {
    variant: {
      default: { backgroundColor: '$gray200', borderColor: '$gray300' },
      primary: { backgroundColor: '$primary100', borderColor: '$primary400' },
    },
    switchSize: {
      sm: { size: '$2' },
      md: { size: '$3' },
    },
  } as const,
  defaultVariants: { variant: 'default', switchSize: 'sm' },
})

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  label,
  size = 'sm',
  variant = 'default',
}: SwitchProps) {
  return (
    <View flexDirection="row" alignItems="center" gap="$2">
      <SwitchFrame
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        switchSize={size}
        variant={variant}
        focusStyle={{ borderColor: '$primary500' }}
      >
        <TamaguiSwitch.Thumb backgroundColor="$white" />
      </SwitchFrame>
      {label ? (
        <Text color={disabled ? '$gray400' : '$gray800'} fontSize={14}>
          {label}
        </Text>
      ) : null}
    </View>
  )
}
