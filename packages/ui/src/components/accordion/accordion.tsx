import { Accordion as TamaguiAccordion, styled } from 'tamagui'
import { Text } from '../text/text'

const StyledAccordion = styled(TamaguiAccordion, {
  name: 'Accordion',
  borderWidth: 1,
  borderColor: '$gray200',
  borderRadius: '$4',
  overflow: 'hidden',

  variants: {
    variant: {
      default: {
        borderColor: '$gray200',
        borderWidth: 1,
      },
      ghost: {
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
      },
      filled: {
        borderWidth: 0,
        backgroundColor: '$gray100',
        borderRadius: '$4',
      },
      outlined: {
        borderWidth: 2,
        borderColor: '$primary',
        borderRadius: '$4',
      },
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

const StyledTrigger = styled(TamaguiAccordion.Trigger, {
  name: 'AccordionTrigger',
  unstyled: true,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '$gray200',

  variants: {
    size: {
      sm: { paddingHorizontal: '$3', paddingVertical: '$2' },
      md: { paddingHorizontal: '$4', paddingVertical: '$3' },
      lg: { paddingHorizontal: '$5', paddingVertical: '$4' },
    },
    variant: {
      default: { borderBottomColor: '$gray200' },
      ghost: { borderBottomColor: '$gray100' },
      filled: { borderBottomColor: '$gray200', backgroundColor: '$gray50' },
      outlined: { borderBottomColor: '$primary' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

const StyledContent = styled(TamaguiAccordion.Content, {
  name: 'AccordionContent',

  variants: {
    size: {
      sm: { paddingHorizontal: '$3', paddingVertical: '$2' },
      md: { paddingHorizontal: '$4', paddingVertical: '$3' },
      lg: { paddingHorizontal: '$5', paddingVertical: '$4' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

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
}

export function Accordion({
  items,
  value,
  defaultValue,
  onValueChange,
  type = 'single',
  variant = 'default',
  size = 'md',
}: AccordionProps) {
  return (
    <StyledAccordion
      type={type}
      value={value as never}
      defaultValue={defaultValue as never}
      onValueChange={onValueChange as never}
      variant={variant}
      size={size}
    >
      {items.map((item) => (
        <TamaguiAccordion.Item key={item.value} value={item.value} disabled={item.disabled}>
          <StyledTrigger variant={variant} size={size}>
            <Text variant="label" fontWeight="600" color={item.disabled ? '$gray400' : '$gray800'}>
              {item.title}
            </Text>
            <Text color="$gray500">+</Text>
          </StyledTrigger>
          <StyledContent size={size}>
            {typeof item.content === 'string' ? (
              <Text variant="bodySm" color="$gray600">
                {item.content}
              </Text>
            ) : (
              item.content
            )}
          </StyledContent>
        </TamaguiAccordion.Item>
      ))}
    </StyledAccordion>
  )
}
