import { Adapt, Sheet, styled, Select as TamaguiSelect } from 'tamagui'

const StyledTrigger = styled(TamaguiSelect.Trigger, {
  name: 'SelectTrigger',
  width: '100%',
  borderWidth: 1,
  borderRadius: '$3',

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
      ghost: {
        borderWidth: 0,
        backgroundColor: '$gray100',
      },
    },
    size: {
      sm: { height: '$8', paddingHorizontal: '$2' },
      md: { height: '$10', paddingHorizontal: '$3' },
      lg: { height: '$12', paddingHorizontal: '$4' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const StyledViewport = styled(TamaguiSelect.Viewport, {
  name: 'SelectViewport',
  backgroundColor: '$white',
  borderWidth: 1,
  borderRadius: '$3',

  variants: {
    variant: {
      default: { borderColor: '$gray200' },
      primary: { borderColor: '$primary200' },
      ghost: { borderColor: '$gray200' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

const StyledItem = styled(TamaguiSelect.Item, {
  name: 'SelectItem',

  variants: {
    variant: {
      default: { hoverStyle: { backgroundColor: '$gray100' } },
      primary: { hoverStyle: { backgroundColor: '$primary50' } },
      ghost: { hoverStyle: { backgroundColor: '$gray100' } },
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

export type SelectVariant = 'default' | 'primary' | 'ghost'
export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  onValueChange?: (value: string) => void
  variant?: SelectVariant
  size?: SelectSize
}

export function Select({
  options,
  value,
  defaultValue,
  placeholder = 'Select an option',
  disabled,
  onValueChange,
  variant = 'default',
  size = 'md',
}: SelectProps) {
  return (
    <TamaguiSelect value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <StyledTrigger
        variant={variant}
        size={size}
        disabled={disabled}
        iconAfter={<TamaguiSelect.Icon />}
      >
        <TamaguiSelect.Value placeholder={placeholder} />
      </StyledTrigger>

      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <TamaguiSelect.Content>
        <StyledViewport variant={variant}>
          <TamaguiSelect.Group>
            {options.map((option, index) => (
              <StyledItem
                key={option.value}
                index={index}
                value={option.value}
                disabled={option.disabled}
                variant={variant}
                size={size}
              >
                <TamaguiSelect.ItemText>{option.label}</TamaguiSelect.ItemText>
              </StyledItem>
            ))}
          </TamaguiSelect.Group>
        </StyledViewport>
      </TamaguiSelect.Content>
    </TamaguiSelect>
  )
}
