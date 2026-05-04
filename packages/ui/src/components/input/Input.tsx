import { styled, Input as TamaguiInput, View, Text, GetProps } from 'tamagui'
import { forwardRef, type ElementRef } from 'react'

const InputFrame = styled(TamaguiInput, {
  name: 'Input',
  fontFamily: '$body',
  fontSize: 15,
  color: '$gray900',
  backgroundColor: '$white',
  borderWidth: 1.5,
  borderColor: '$gray200',
  borderRadius: '$3',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  outlineWidth: 0,

  focusStyle: {
    borderColor: '$primary500',
    shadowColor: '$primary200',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.8,
  },

  variants: {
    size: {
      sm: { fontSize: 13, paddingHorizontal: '$2.5', paddingVertical: '$1.5', borderRadius: '$2' },
      md: { fontSize: 15, paddingHorizontal: '$3', paddingVertical: '$2' },
      lg: { fontSize: 17, paddingHorizontal: '$4', paddingVertical: '$3', borderRadius: '$4' },
    },
    hasError: {
      true: {
        borderColor: '$danger500',
        focusStyle: { borderColor: '$danger500' },
      },
    },
    disabled: {
      true: { opacity: 0.5, cursor: 'not-allowed' },
    },
  } as const,

  defaultVariants: { size: 'md' },
})

type InputFrameProps = GetProps<typeof InputFrame>

export interface InputProps extends InputFrameProps {
  label?: string
  helperText?: string
  errorText?: string
}

export const Input = forwardRef<ElementRef<typeof InputFrame>, InputProps>(
  ({ label, helperText, errorText, hasError, ...rest }, ref) => {
    const showError = !!errorText

    return (
      <View gap="$1.5" width="100%">
        {label && (
          <Text fontSize={13} fontWeight="500" color="$gray700">
            {label}
          </Text>
        )}
        <InputFrame ref={ref} hasError={showError || hasError} {...rest} />
        {showError ? (
          <Text fontSize={12} color="$danger500">
            {errorText}
          </Text>
        ) : helperText ? (
          <Text fontSize={12} color="$gray500">
            {helperText}
          </Text>
        ) : null}
      </View>
    )
  }
)

Input.displayName = 'Input'
