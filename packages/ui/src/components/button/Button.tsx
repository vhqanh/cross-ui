import { forwardRef, type ElementRef } from 'react'
import type { GetProps, TamaguiComponent } from 'tamagui'
import { styled, Button as TamaguiButton, Text } from 'tamagui'
import { LiquidGlass, LiquidOptions } from '../liquid-glass'
import { getDefaultLiquidOptions, mergeLiquidOptions } from '../liquid-glass/liquid/options'

const ButtonFrame: TamaguiComponent = styled(TamaguiButton, {
  name: 'Button',
  borderRadius: '$3',
  minHeight: 40,
  borderWidth: 1,
  borderColor: 'transparent',
  paddingHorizontal: '$4',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary600',
        borderColor: '$primary600',
        hoverStyle: { backgroundColor: '$primary700' },
        pressStyle: { backgroundColor: '$primary700', borderColor: '$primary700', opacity: 0.9 },
      },
      secondary: {
        backgroundColor: '$gray100',
        borderColor: '$gray200',
        hoverStyle: { backgroundColor: '$gray200' },
        pressStyle: { backgroundColor: '$gray200', opacity: 0.9 },
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '$primary600',
        hoverStyle: { backgroundColor: '$primary50' },
        pressStyle: { backgroundColor: '$primary100', opacity: 0.9 },
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        hoverStyle: { backgroundColor: '$gray100' },
        pressStyle: { backgroundColor: '$gray200', opacity: 0.9 },
      },
      danger: {
        backgroundColor: '$danger500',
        borderColor: '$danger500',
        hoverStyle: { backgroundColor: '$danger600' },
        pressStyle: { backgroundColor: '$danger600', opacity: 0.9 },
      },
      liquid: {
        display: 'inline-flex',
        width: '100%',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        hoverStyle: { backgroundColor: 'transparent', borderColor: 'transparent' },
        pressStyle: { backgroundColor: 'transparent', borderColor: 'transparent' },
      },
    },
    size: {
      sm: { minHeight: 32, paddingHorizontal: '$3' },
      md: { minHeight: 40, paddingHorizontal: '$4' },
      lg: { minHeight: 48, paddingHorizontal: '$6' },
    },
    fullWidth: {
      true: { width: '100%' },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

const ButtonText = styled(Text, {
  name: 'ButtonText',
  userSelect: 'none',
  fontWeight: '600',
  fontFamily: '$body',

  variants: {
    variant: {
      primary: { color: '$white' },
      secondary: { color: '$gray800' },
      outline: { color: '$primary600' },
      ghost: { color: '$gray700' },
      danger: { color: '$white' },
      liquid: { color: '$white' },
    },
    buttonSize: {
      sm: { fontSize: 13, lineHeight: 18 },
      md: { fontSize: 15, lineHeight: 20 },
      lg: { fontSize: 17, lineHeight: 24 },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    buttonSize: 'md',
  },
})

type ButtonFrameProps = GetProps<typeof ButtonFrame>
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'liquid'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<ButtonFrameProps, 'variant' | 'buttonSize'> {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  liquidOptions?: LiquidOptions
}

export const Button = forwardRef<ElementRef<typeof ButtonFrame>, ButtonProps>(
  (
    { children, leftIcon, rightIcon, disabled, loading, liquidOptions, ...props }: ButtonProps,
    ref
  ) => {
    const frame = (
      <ButtonFrame ref={ref} disabled={disabled || loading} {...props}>
        {leftIcon}
        {typeof children === 'string' ? (
          <ButtonText {...props}>{loading ? 'Loading...' : children}</ButtonText>
        ) : (
          children
        )}
        {rightIcon}
      </ButtonFrame>
    )
    if (props.variant !== 'liquid') return frame

    const resolvedLiquidOptions = mergeLiquidOptions(
      getDefaultLiquidOptions('button'),
      { cornerRadius: 16, contentClassName: 'w-full h-full' },
      liquidOptions
    )

    return <LiquidGlass liquidOptions={resolvedLiquidOptions}>{frame}</LiquidGlass>
  }
)

Button.displayName = 'Button'
