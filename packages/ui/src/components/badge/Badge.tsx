import type { TamaguiComponent } from 'tamagui'
import { styled, Text, View } from 'tamagui'

const BadgeFrame: TamaguiComponent = styled(View, {
  name: 'Badge',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: '$full',
  borderWidth: 1,

  variants: {
    variant: {
      default: { backgroundColor: '$gray100', borderColor: '$gray200' },
      primary: { backgroundColor: '$primary100', borderColor: '$primary200' },
      success: { backgroundColor: '$success100', borderColor: '$success200' },
      warning: { backgroundColor: '$warning100', borderColor: '$warning200' },
      danger: { backgroundColor: '$danger100', borderColor: '$danger200' },
    },
    badgeSize: {
      sm: { paddingHorizontal: '$2', paddingVertical: '$0.5', gap: '$1' },
      md: { paddingHorizontal: '$2.5', paddingVertical: '$1', gap: '$1.5' },
    },
  } as const,

  defaultVariants: { variant: 'default', badgeSize: 'md' },
})

const BadgeText = styled(Text, {
  name: 'BadgeText',
  fontWeight: '500',

  variants: {
    variant: {
      default: { color: '$gray700' },
      primary: { color: '$primary700' },
      success: { color: '$success600' },
      warning: { color: '$warning600' },
      danger: { color: '$danger600' },
    },
    badgeSize: {
      sm: { fontSize: 11, lineHeight: 16 },
      md: { fontSize: 12, lineHeight: 18 },
    },
  } as const,

  defaultVariants: { variant: 'default', badgeSize: 'md' },
})

export interface BadgeProps extends Omit<React.ComponentProps<typeof BadgeFrame>, 'badgeSize'> {
  children: string
  dot?: boolean
  size?: 'sm' | 'md'
}

export function Badge({ children, variant, size = 'md', dot, ...rest }: BadgeProps) {
  return (
    <BadgeFrame variant={variant} badgeSize={size} {...rest}>
      {dot && (
        <View
          width={6}
          height={6}
          borderRadius="$full"
          backgroundColor={
            variant === 'primary'
              ? '$primary600'
              : variant === 'success'
                ? '$success600'
                : variant === 'warning'
                  ? '$warning600'
                  : variant === 'danger'
                    ? '$danger500'
                    : '$gray400'
          }
        />
      )}
      <BadgeText variant={variant} badgeSize={size}>
        {children}
      </BadgeText>
    </BadgeFrame>
  )
}
