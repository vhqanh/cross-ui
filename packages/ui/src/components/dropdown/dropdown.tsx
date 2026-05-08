import { Popover, View, styled } from 'tamagui'
import { Text } from '../text/text'

const StyledTrigger = styled(View, {
  name: 'DropdownTrigger',
  borderWidth: 1,
  borderRadius: '$3',
  backgroundColor: '$white',
  cursor: 'pointer',

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
        backgroundColor: 'transparent',
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

const StyledContent = styled(Popover.Content, {
  name: 'DropdownContent',
  borderWidth: 1,
  borderRadius: '$3',
  backgroundColor: '$white',
  padding: '$1',
  elevate: true,

  variants: {
    variant: {
      default: {
        borderColor: '$gray200',
        backgroundColor: '$white',
      },
      primary: {
        borderColor: '$primary200',
        backgroundColor: '$white',
      },
      ghost: {
        borderColor: '$gray200',
        backgroundColor: '$white',
      },
    },
    size: {
      sm: { minWidth: 140 },
      md: { minWidth: 180 },
      lg: { minWidth: 240 },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const StyledItem = styled(View, {
  name: 'DropdownItem',
  borderRadius: '$2',
  hoverStyle: { backgroundColor: '$gray100' },

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

export type DropdownVariant = 'default' | 'primary' | 'ghost'
export type DropdownSize = 'sm' | 'md' | 'lg'

export interface DropdownItem {
  label: string
  onSelect?: () => void
  disabled?: boolean
}

export interface DropdownProps {
  triggerLabel: string
  items: DropdownItem[]
  variant?: DropdownVariant
  size?: DropdownSize
}

export function Dropdown({ triggerLabel, items, variant = 'default', size = 'md' }: DropdownProps) {
  return (
    <Popover size="$5" placement="bottom-end" allowFlip>
      <Popover.Trigger asChild>
        <StyledTrigger variant={variant} size={size}>
          <Text variant="label" color="$gray800">
            {triggerLabel}
          </Text>
        </StyledTrigger>
      </Popover.Trigger>

      <StyledContent variant={variant} size={size}>
        {items.map((item) => (
          <Popover.Close
            key={item.label}
            onPress={() => {
              if (item.disabled) return
              item.onSelect?.()
            }}
          >
            <StyledItem variant={variant} size={size} opacity={item.disabled ? 0.5 : 1}>
              <Text variant="bodySm" color="$gray800">
                {item.label}
              </Text>
            </StyledItem>
          </Popover.Close>
        ))}
      </StyledContent>
    </Popover>
  )
}
