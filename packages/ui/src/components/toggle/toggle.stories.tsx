import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { Toggle } from './toggle'

const defaultOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  args: {
    type: 'single',
    variant: 'default',
    options: defaultOptions,
    defaultValue: 'week',
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {}

export const Bordered: Story = {
  args: { bordered: true },
}

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const PrimaryBordered: Story = {
  args: { variant: 'primary', bordered: true },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['day', 'week'] },
}

export const Vertical: Story = {
  args: { orientation: 'vertical', bordered: true },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'week' },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month', disabled: true },
    ],
    bordered: true,
  },
}

export const Sizes: Story = {
  render: (args) => (
    <YStack gap="$4">
      <Toggle {...args} size="sm" bordered />
      <Toggle {...args} size="md" bordered />
      <Toggle {...args} size="lg" bordered />
    </YStack>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <YStack gap="$4">
      <Toggle {...args} variant="default" bordered />
      <Toggle {...args} variant="primary" bordered />
      <Toggle {...args} variant="ghost" />
    </YStack>
  ),
}
