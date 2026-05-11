import { Separator, Switch as TamaguiSwitch, XStack } from 'tamagui'
import { Text } from '../text/text'

export type SwitchVariant = 'default' | 'primary' | 'success' | 'danger'
export type SwitchSize = 'sm' | 'md' | 'lg'

const activeStyleMap: Record<SwitchVariant, { backgroundColor: string }> = {
  default: { backgroundColor: '$color10' },
  primary: { backgroundColor: '$primary500' },
  success: { backgroundColor: '$green600' },
  danger: { backgroundColor: '$red500' },
}

const sizeTokenMap: Record<SwitchSize, '$3' | '$4' | '$5'> = {
  sm: '$3',
  md: '$4',
  lg: '$5',
}

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  variant?: SwitchVariant
  size?: SwitchSize
  id?: string
}

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  label,
  variant = 'primary',
  size = 'md',
  id,
}: SwitchProps) {
  const switchId = id ?? `switch-${size}-${variant}`

  return (
    <XStack width="100%" alignItems="center" gap="$4" opacity={disabled ? 0.5 : 1}>
      {label ? (
        <>
          <Text variant="bodySm" color={disabled ? '$color8' : '$color12'} flex={1}>
            {label}
          </Text>
          <Separator minHeight={20} vertical />
        </>
      ) : null}

      <TamaguiSwitch
        id={switchId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        size={sizeTokenMap[size]}
        transition="300ms"
        activeStyle={activeStyleMap[variant]}
        cursor="pointer"
      >
        <TamaguiSwitch.Thumb transition="quickest" />
      </TamaguiSwitch>
    </XStack>
  )
}
