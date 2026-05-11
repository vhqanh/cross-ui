import { forwardRef, type ElementRef } from 'react'
import {
  TextArea as TamaguiTextArea,
  View,
  styled,
  type GetProps,
  type TamaguiComponent,
} from 'tamagui'
import { Text } from '../text/text'

const TextareaFrame: TamaguiComponent = styled(TamaguiTextArea, {
  name: 'Textarea',
  fontFamily: '$body',
  color: '$color12',
  backgroundColor: '$background',
  borderWidth: 1.5,
  borderColor: '$borderColor',
  borderRadius: '$3',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  minHeight: 110,
  textAlignVertical: 'top',

  focusStyle: {
    borderColor: '$primary500',
  },

  variants: {
    variant: {
      default: {
        borderColor: '$borderColor',
        backgroundColor: '$background',
      },
      subtle: {
        borderColor: '$borderColor',
        backgroundColor: '$color2',
      },
      error: {
        borderColor: '$red400',
        backgroundColor: '$background',
      },
    },
    size: {
      sm: { minHeight: 90, paddingVertical: '$1.5' },
      md: { minHeight: 110, paddingVertical: '$2' },
      lg: { minHeight: 140, paddingVertical: '$2.5' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

type TextareaFrameProps = GetProps<typeof TextareaFrame>

export interface TextareaProps extends TextareaFrameProps {
  label?: string
  helperText?: string
  errorText?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'subtle' | 'error'
}

export const Textarea = forwardRef<ElementRef<typeof TextareaFrame>, TextareaProps>(
  ({ label, helperText, errorText, size = 'md', variant = 'default', ...props }, ref) => {
    const resolvedVariant = errorText ? 'error' : variant

    return (
      <View gap="$1.5" width="100%">
        {label ? (
          <Text variant="label" color="$color11">
            {label}
          </Text>
        ) : null}
        <TextareaFrame ref={ref} size={size} variant={resolvedVariant} {...props} />
        {errorText ? (
          <Text variant="caption" color="$red500">
            {errorText}
          </Text>
        ) : null}
        {helperText && !errorText ? (
          <Text variant="caption" color="$color10">
            {helperText}
          </Text>
        ) : null}
      </View>
    )
  }
)

Textarea.displayName = 'Textarea'
