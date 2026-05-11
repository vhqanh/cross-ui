import { Label, Checkbox as TamaguiCheckbox, XStack } from 'tamagui'
import { Text } from '../text/text'

export type CheckboxVariant = 'default' | 'primary'
export type CheckboxSize = 'sm' | 'md'

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: CheckboxSize
  variant?: CheckboxVariant
  id?: string
}

const variantStyleMap: Record<CheckboxVariant, object> = {
  default: {
    borderColor: '$borderColor',
    backgroundColor: '$background',
    checkedStyle: {
      backgroundColor: '$color12',
      borderColor: '$color12',
    },
  },
  primary: {
    borderColor: '$primary400',
    backgroundColor: '$background',
    checkedStyle: {
      backgroundColor: '$primary500',
      borderColor: '$primary500',
    },
  },
}

export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  disabled,
  size = 'sm',
  variant = 'default',
  id,
}: CheckboxProps) {
  const checkboxId = id ?? `checkbox-${size}-${variant}`
  const variantStyle = variantStyleMap[variant]

  const checkboxSize = size === 'sm' ? 18 : 22
  const fontSize = size === 'sm' ? 12 : 14

  return (
    <XStack
      alignItems="center"
      gap="$2.5"
      opacity={disabled ? 0.4 : 1}
      cursor={disabled ? 'not-allowed' : 'pointer'}
    >
      <TamaguiCheckbox
        id={checkboxId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(next) => onCheckedChange?.(!!next)}
        disabled={disabled}
        width={checkboxSize}
        height={checkboxSize}
        minWidth={checkboxSize}
        borderWidth={1.5}
        borderRadius="$2"
        hoverStyle={{ borderColor: '$primary400' }}
        {...variantStyle}
      >
        <TamaguiCheckbox.Indicator>
          <Text
            variant="caption"
            color={variant === 'primary' ? '$white' : '$background'}
            fontSize={fontSize}
          >
            ✓
          </Text>
        </TamaguiCheckbox.Indicator>
      </TamaguiCheckbox>

      {label ? (
        <Label
          htmlFor={checkboxId}
          color="$color12"
          cursor={disabled ? 'not-allowed' : 'pointer'}
          fontWeight="400"
          fontSize={fontSize}
        >
          {label}
        </Label>
      ) : null}
    </XStack>
  )
}
