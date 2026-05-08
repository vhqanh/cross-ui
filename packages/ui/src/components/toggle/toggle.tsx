import { ToggleGroup as TamaguiToggleGroup, styled } from 'tamagui'
import { Text } from '../text/text'

const StyledToggleGroup = styled(TamaguiToggleGroup, {
  name: 'ToggleGroup',
  flexDirection: 'row',
  borderWidth: 1,
  borderRadius: '$2',
  overflow: 'hidden',

  variants: {
    variant: {
      default: { borderColor: '$gray300', backgroundColor: '$white' },
      primary: { borderColor: '$primary300', backgroundColor: '$primary50' },
      ghost: { borderWidth: 0, backgroundColor: '$gray100' },
    },
    size: {
      sm: { gap: '$1' },
      md: { gap: '$2' },
      lg: { gap: '$3' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const StyledItem = styled(TamaguiToggleGroup.Item, {
  name: 'ToggleGroupItem',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 0,
  cursor: 'pointer',

  variants: {
    variant: {
      default: {
        backgroundColor: '$white',
        pressStyle: { backgroundColor: '$gray100' },
      },
      primary: {
        backgroundColor: 'transparent',
        pressStyle: { backgroundColor: '$primary100' },
      },
      ghost: {
        backgroundColor: 'transparent',
        pressStyle: { backgroundColor: '$gray200' },
      },
    },
    size: {
      sm: { paddingHorizontal: '$2', paddingVertical: '$1' },
      md: { paddingHorizontal: '$3', paddingVertical: '$2' },
      lg: { paddingHorizontal: '$4', paddingVertical: '$3' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type ToggleVariant = 'default' | 'primary' | 'ghost'
export type ToggleSize = 'sm' | 'md' | 'lg'
export type ToggleType = 'single' | 'multiple'

export interface ToggleOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ToggleProps {
  options: ToggleOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  type?: ToggleType
  disabled?: boolean
  variant?: ToggleVariant
  size?: ToggleSize
}

export function Toggle({
  options,
  value,
  defaultValue,
  onValueChange,
  type = 'single',
  disabled,
  variant = 'default',
  size = 'md',
}: ToggleProps) {
  return (
    <StyledToggleGroup
      type={type}
      value={value as never}
      defaultValue={defaultValue as never}
      onValueChange={onValueChange as never}
      disableDeactivation={type === 'single'}
      disabled={disabled}
      variant={variant}
      size={size}
    >
      {options.map((option) => (
        <StyledItem
          key={option.value}
          value={option.value}
          disabled={option.disabled || disabled}
          variant={variant}
          size={size}
          opacity={option.disabled || disabled ? 0.5 : 1}
        >
          <Text variant="label" color="$gray800">
            {option.label}
          </Text>
        </StyledItem>
      ))}
    </StyledToggleGroup>
  )
}
