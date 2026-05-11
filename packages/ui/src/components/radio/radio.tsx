import { Label, RadioGroup as TamaguiRadioGroup, XStack } from 'tamagui'

export type RadioVariant = 'default' | 'primary'
export type RadioSize = 'sm' | 'md' | 'lg'
export type RadioOrientation = 'horizontal' | 'vertical'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  variant?: RadioVariant
  size?: RadioSize
  orientation?: RadioOrientation
}

const sizeMap: Record<RadioSize, { item: number; font: '$4' | '$5' | '$6' }> = {
  sm: { item: 18, font: '$4' },
  md: { item: 22, font: '$5' },
  lg: { item: 26, font: '$6' },
}

const variantStyleMap: Record<RadioVariant, object> = {
  default: {
    borderColor: '$borderColor',
    backgroundColor: '$background',
    checkedStyle: { borderColor: '$primary500' },
  },
  primary: {
    borderColor: '$primary400',
    backgroundColor: '$background',
    checkedStyle: { borderColor: '$primary600' },
  },
}

const indicatorStyleMap: Record<RadioVariant, object> = {
  default: { backgroundColor: '$primary500' },
  primary: { backgroundColor: '$primary600' },
}

export function RadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
  variant = 'default',
  size = 'md',
  orientation = 'vertical',
}: RadioGroupProps) {
  const { item: itemSize, font: fontToken } = sizeMap[size]
  const variantStyle = variantStyleMap[variant]
  const indicatorStyle = indicatorStyleMap[variant]

  return (
    <TamaguiRadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      flexDirection={orientation === 'horizontal' ? 'row' : 'column'}
      flexWrap={orientation === 'horizontal' ? 'wrap' : undefined}
      gap={size === 'sm' ? '$2' : size === 'md' ? '$3' : '$4'}
    >
      {options.map((option) => {
        const isDisabled = option.disabled || disabled
        const id = `radio-${option.value}`

        return (
          <XStack
            key={option.value}
            alignItems="center"
            gap="$3"
            opacity={isDisabled ? 0.4 : 1}
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
          >
            <TamaguiRadioGroup.Item
              value={option.value}
              id={id}
              disabled={isDisabled}
              width={itemSize}
              height={itemSize}
              minWidth={itemSize}
              borderWidth={1.5}
              borderRadius={itemSize}
              {...variantStyle}
            >
              <TamaguiRadioGroup.Indicator {...indicatorStyle} />
            </TamaguiRadioGroup.Item>

            <Label
              size={fontToken}
              htmlFor={id}
              color="$color12"
              cursor={isDisabled ? 'not-allowed' : 'pointer'}
              fontWeight="400"
            >
              {option.label}
            </Label>
          </XStack>
        )
      })}
    </TamaguiRadioGroup>
  )
}
