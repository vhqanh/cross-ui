import { Tabs as TamaguiTabs, styled } from 'tamagui'
import { Text } from '../text/text'

const StyledList = styled(TamaguiTabs.List, {
  name: 'TabsList',
  padding: '$1',

  variants: {
    variant: {
      default: {
        backgroundColor: '$color3',
        borderWidth: 1,
        borderColor: '$borderColor',
        borderRadius: '$3',
      },
      underline: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '$borderColor',
        borderRadius: 0,
      },
      pill: {
        backgroundColor: '$primary50',
        borderWidth: 1,
        borderColor: '$primary200',
        borderRadius: '$6',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

const StyledTab = styled(TamaguiTabs.Tab, {
  name: 'TabsTab',
  borderWidth: 0,

  variants: {
    variant: {
      default: {
        borderRadius: '$2',
        backgroundColor: '$color3',
        hoverStyle: { backgroundColor: '$color4' },
        focusStyle: { backgroundColor: '$background' },
      },
      underline: {
        borderRadius: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        hoverStyle: { backgroundColor: '$color3' },
        focusStyle: { borderBottomColor: '$primary500' },
      },
      pill: {
        borderRadius: '$6',
        backgroundColor: 'transparent',
        hoverStyle: { backgroundColor: '$primary100' },
        focusStyle: { backgroundColor: '$primary200' },
      },
    },
    size: {
      sm: { paddingVertical: '$1', paddingHorizontal: '$2' },
      md: { paddingVertical: '$2', paddingHorizontal: '$2.5' },
      lg: { paddingVertical: '$2.5', paddingHorizontal: '$4' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type TabsVariant = 'default' | 'underline' | 'pill'
export type TabsSize = 'sm' | 'md' | 'lg'

export interface TabItem {
  value: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  variant?: TabsVariant
  size?: TabsSize
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = 'default',
  size = 'md',
}: TabsProps) {
  return (
    <TamaguiTabs
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={onValueChange}
      orientation="horizontal"
      flexDirection="column"
      gap="$3"
    >
      <StyledList variant={variant}>
        {items.map((item) => (
          <StyledTab
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            variant={variant}
            size={size}
            opacity={item.disabled ? 0.5 : 1}
          >
            <Text variant="label" color="$color12">
              {item.label}
            </Text>
          </StyledTab>
        ))}
      </StyledList>

      {items.map((item) => (
        <TamaguiTabs.Content key={item.value} value={item.value}>
          {item.content}
        </TamaguiTabs.Content>
      ))}
    </TamaguiTabs>
  )
}
