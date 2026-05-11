import { ToggleGroup as TamaguiToggleGroup, XGroup, YGroup } from 'tamagui'
import { Text } from '../text/text'

export type ToggleVariant = 'default' | 'primary' | 'ghost'
export type ToggleSize = 'sm' | 'md' | 'lg'
export type ToggleType = 'single' | 'multiple'
export type ToggleOrientation = 'horizontal' | 'vertical'

export interface ToggleOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ToggleProps {
  options: ToggleOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  type?: ToggleType
  orientation?: ToggleOrientation
  disabled?: boolean
  variant?: ToggleVariant
  size?: ToggleSize
  bordered?: boolean
}

const paddingMap: Record<ToggleSize, object> = {
  sm: { paddingHorizontal: '$2.5', paddingVertical: '$1.5', minWidth: 36 },
  md: { paddingHorizontal: '$3.5', paddingVertical: '$2', minWidth: 44 },
  lg: { paddingHorizontal: '$4', paddingVertical: '$2.5', minWidth: 56 },
}

const activeStyleMap: Record<ToggleVariant, object> = {
  default: { backgroundColor: '$color5' },
  primary: { backgroundColor: '$primary100' },
  ghost: { backgroundColor: '$color4' },
}

const groupStyleMap: Record<ToggleVariant, object> = {
  default: { borderRadius: '$3', overflow: 'hidden' },
  primary: { borderRadius: '$3', overflow: 'hidden' },
  ghost: { backgroundColor: '$color3', borderRadius: '$3', overflow: 'hidden' },
}

export function Toggle({
  options,
  value,
  defaultValue,
  onValueChange,
  type = 'single',
  orientation = 'horizontal',
  disabled,
  variant = 'default',
  size = 'md',
  bordered = false,
}: ToggleProps) {
  const Group = orientation === 'horizontal' ? XGroup : YGroup
  const padding = paddingMap[size]
  const activeStyle = activeStyleMap[variant]
  const groupStyle = {
    ...groupStyleMap[variant],
    ...(bordered && {
      borderWidth: 1,
      borderColor: variant === 'primary' ? '$primary300' : '$borderColor',
    }),
  }

  return (
    <TamaguiToggleGroup
      type={type as never}
      value={value as never}
      defaultValue={defaultValue as never}
      onValueChange={onValueChange as never}
      disableDeactivation={type === 'single' ? true : undefined}
      disabled={disabled}
      orientation={orientation}
    >
      <Group {...groupStyle}>
        {options.map((option) => (
          <Group.Item key={option.value}>
            <TamaguiToggleGroup.Item
              value={option.value}
              disabled={option.disabled || disabled}
              opacity={option.disabled || disabled ? 0.4 : 1}
              activeStyle={activeStyle}
              justifyContent="center"
              alignItems="center"
              {...padding}
            >
              <Text variant="label" color="$color12">
                {option.label}
              </Text>
            </TamaguiToggleGroup.Item>
          </Group.Item>
        ))}
      </Group>
    </TamaguiToggleGroup>
  )
}
