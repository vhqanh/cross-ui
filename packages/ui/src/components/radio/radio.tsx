import { styled, RadioGroup as TamaguiRadioGroup, XStack } from 'tamagui'
import { Text } from '../text/text'

const StyledRadioGroup = styled(TamaguiRadioGroup, {
  name: 'RadioGroup',

  variants: {
    orientation: {
      horizontal: { flexDirection: 'row', flexWrap: 'wrap' },
      vertical: { flexDirection: 'column' },
    },
    size: {
      sm: { gap: '$2' },
      md: { gap: '$3' },
      lg: { gap: '$4' },
    },
  } as const,

  defaultVariants: {
    orientation: 'vertical',
    size: 'md',
  },
})

const StyledItem = styled(TamaguiRadioGroup.Item, {
  name: 'RadioItem',
  borderWidth: 1.5,
  cursor: 'pointer',

  variants: {
    variant: {
      default: {
        borderColor: '$gray300',
        backgroundColor: '$white',
        focusStyle: { borderColor: '$primary500' },
      },
      primary: {
        borderColor: '$primary400',
        backgroundColor: '$primary50',
        focusStyle: { borderColor: '$primary600' },
      },
    },
    size: {
      sm: { size: '$1.5' },
      md: { size: '$2' },
      lg: { size: '$2.5' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const StyledIndicator = styled(TamaguiRadioGroup.Indicator, {
  name: 'RadioIndicator',

  variants: {
    variant: {
      default: { backgroundColor: '$primary500' },
      primary: { backgroundColor: '$primary600' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

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
  return (
    <StyledRadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      orientation={orientation}
      size={size}
    >
      {options.map((option) => {
        const isDisabled = option.disabled || disabled

        return (
          <XStack
            key={option.value}
            alignItems="center"
            gap="$2"
            opacity={isDisabled ? 0.5 : 1}
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
          >
            <StyledItem
              value={option.value}
              disabled={isDisabled}
              variant={variant}
              size={size}
              id={option.value}
            >
              <StyledIndicator variant={variant} />
            </StyledItem>
            <Text
              variant={size === 'sm' ? 'bodySm' : 'body'}
              color={isDisabled ? '$gray400' : '$gray800'}
              htmlFor={option.value}
            >
              {option.label}
            </Text>
          </XStack>
        )
      })}
    </StyledRadioGroup>
  )
}
