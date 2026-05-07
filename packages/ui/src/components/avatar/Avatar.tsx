import { Avatar as TamaguiAvatar, Text } from 'tamagui'

const sizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
}

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string // initials or emoji
  size?: keyof typeof sizes
  shape?: 'circle' | 'square'
}

function getInitials(name?: string) {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ src, alt, fallback, size = 'md', shape = 'circle' }: AvatarProps) {
  const px = sizes[size]
  const radius = shape === 'circle' ? px / 2 : px * 0.2

  return (
    <TamaguiAvatar circular={shape === 'circle'} size={px}>
      {src && <TamaguiAvatar.Image accessibilityLabel={alt} src={src} borderRadius={radius} />}
      <TamaguiAvatar.Fallback
        backgroundColor="$primary100"
        borderRadius={radius}
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={px * 0.36} fontWeight="600" color="$primary700">
          {getInitials(fallback)}
        </Text>
      </TamaguiAvatar.Fallback>
    </TamaguiAvatar>
  )
}
