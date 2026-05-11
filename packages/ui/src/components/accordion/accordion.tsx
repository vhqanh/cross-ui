import { Square, styled, Accordion as TamaguiAccordion } from 'tamagui'
import { Text } from '../text/text'

const StyledAccordion = styled(TamaguiAccordion, {
  name: 'Accordion',
  overflow: 'hidden',

  variants: {
    variant: {
      default: { borderWidth: 1, borderColor: '$borderColor', borderRadius: '$4' },
      ghost: { borderWidth: 0, borderColor: 'transparent', backgroundColor: 'transparent' },
      filled: { borderWidth: 0, backgroundColor: '$color3', borderRadius: '$4' },
      outlined: { borderWidth: 2, borderColor: '$primary500', borderRadius: '$4' },
    },
    size: {
      sm: { borderRadius: '$2' },
      md: { borderRadius: '$4' },
      lg: { borderRadius: '$6' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const paddingMap = {
  sm: { paddingHorizontal: '$3', paddingVertical: '$2' },
  md: { paddingHorizontal: '$4', paddingVertical: '$3' },
  lg: { paddingHorizontal: '$5', paddingVertical: '$4' },
}

const borderColorMap: Record<string, string> = {
  default: '$borderColor',
  ghost: '$borderColor',
  filled: '$borderColor',
  outlined: '$primary500',
}

export interface AccordionItem {
  value: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

export type AccordionVariant = 'default' | 'ghost' | 'filled' | 'outlined'
export type AccordionSize = 'sm' | 'md' | 'lg'

export interface AccordionProps {
  items: AccordionItem[]
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (next: string | string[]) => void
  type?: 'single' | 'multiple'
  variant?: AccordionVariant
  size?: AccordionSize
  collapsible?: boolean
}

export function Accordion({
  items,
  value,
  defaultValue,
  onValueChange,
  type = 'single',
  variant = 'default',
  size = 'md',
  collapsible = true,
}: AccordionProps) {
  const padding = paddingMap[size]
  const borderColor = borderColorMap[variant]
  const accordionProps =
    type === 'single' ? { type: 'single' as const, collapsible } : { type: 'multiple' as const }

  return (
    <StyledAccordion
      {...accordionProps}
      value={value as never}
      defaultValue={defaultValue as never}
      onValueChange={onValueChange as never}
      variant={variant}
      size={size}
    >
      {items.map((item, index) => (
        <TamaguiAccordion.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          marginBottom={index === items.length - 1 ? 0 : -1}
        >
          <TamaguiAccordion.Trigger
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            borderWidth={1}
            borderColor={borderColor}
            opacity={item.disabled ? 0.5 : 1}
            {...padding}
          >
            {({ open }: { open: boolean }) => (
              <>
                <Text variant="label" color={item.disabled ? '$color8' : '$color12'}>
                  {item.title}
                </Text>
                <Square transparent transition="quick" rotate={open ? '180deg' : '0deg'}>
                  +
                </Square>
              </>
            )}
          </TamaguiAccordion.Trigger>

          <TamaguiAccordion.HeightAnimator transition="300ms">
            <TamaguiAccordion.Content
              transition="300ms"
              exitStyle={{ opacity: 0 }}
              borderWidth={1}
              borderTopWidth={0}
              borderColor={borderColor}
              {...padding}
            >
              {typeof item.content === 'string' ? (
                <Text variant="bodySm" color="$color11">
                  {item.content}
                </Text>
              ) : (
                item.content
              )}
            </TamaguiAccordion.Content>
          </TamaguiAccordion.HeightAnimator>
        </TamaguiAccordion.Item>
      ))}
    </StyledAccordion>
  )
}
