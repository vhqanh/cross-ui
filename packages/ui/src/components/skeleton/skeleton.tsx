import { View, styled } from 'tamagui'

const StyledSkeleton = styled(View, {
  name: 'Skeleton',
  backgroundColor: '$gray200',
  opacity: 0.7,

  variants: {
    variant: {
      default: { backgroundColor: '$gray200' },
      primary: { backgroundColor: '$primary100' },
      dark: { backgroundColor: '$gray600' },
    },
    shape: {
      line: { borderRadius: '$2' },
      rounded: { borderRadius: '$4' },
      circle: { borderRadius: 9999 },
    },
    size: {
      sm: { height: 12 },
      md: { height: 16 },
      lg: { height: 24 },
      xl: { height: 40 },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    shape: 'rounded',
    size: 'md',
  },
})

export type SkeletonVariant = 'default' | 'primary' | 'dark'
export type SkeletonShape = 'line' | 'rounded' | 'circle'
export type SkeletonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface SkeletonProps {
  width?: number | string
  height?: number
  variant?: SkeletonVariant
  shape?: SkeletonShape
  size?: SkeletonSize
}

export function Skeleton({
  width = '100%',
  height,
  variant = 'default',
  shape = 'rounded',
  size = 'md',
}: SkeletonProps) {
  return (
    <StyledSkeleton width={width} height={height} variant={variant} shape={shape} size={size} />
  )
}
