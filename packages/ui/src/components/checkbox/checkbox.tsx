import { Checkbox as TamaguiCheckbox, View, styled } from 'tamagui'
import { Text } from '../text/text'

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md'
  variant?: 'default' | 'primary'
}

const CheckboxFrame = styled(TamaguiCheckbox, {
  name: 'Checkbox',
  borderRadius: '$1',
  borderWidth: 1.5,

  variants: {
    variant: {
      default: {
        borderColor: '$gray300',
        backgroundColor: '$white',
      },
      primary: {
        borderColor: '$primary400',
        backgroundColor: '$primary50',
      },
    },
    controlSize: {
      sm: { size: '$1.5' },
      md: { size: '$2' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    controlSize: 'sm',
  },
})

export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  disabled,
  size = 'sm',
  variant = 'default',
}: CheckboxProps) {
  return (
    <View flexDirection="row" alignItems="center" gap="$2">
      <CheckboxFrame
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(next) => onCheckedChange?.(!!next)}
        disabled={disabled}
        controlSize={size}
        variant={variant}
        hoverStyle={{ borderColor: '$primary500' }}
        focusStyle={{ borderColor: '$primary600' }}
      >
        <TamaguiCheckbox.Indicator>
          <Text variant="label" bold color="$primary700">
            ✓
          </Text>
        </TamaguiCheckbox.Indicator>
      </CheckboxFrame>
      {label ? (
        <Text variant={size === 'sm' ? 'label' : 'body'} color={disabled ? '$gray400' : '$gray800'}>
          {label}
        </Text>
      ) : null}
    </View>
  )
}
