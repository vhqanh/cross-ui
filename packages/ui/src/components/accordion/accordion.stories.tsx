import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { Accordion } from './accordion'

const defaultItems = [
  { value: 'a', title: 'What is Cross UI?', content: 'A cross-platform component kit.' },
  { value: 'b', title: 'Built with?', content: 'Tamagui + React Native Web.' },
  { value: 'c', title: 'Disabled item', content: 'This cannot be opened.', disabled: true },
]

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    type: 'single',
    collapsible: true,
    variant: 'default',
    size: 'md',
    items: defaultItems,
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {}

export const Filled: Story = {
  args: { variant: 'filled' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Outlined: Story = {
  args: { variant: 'outlined' },
}

export const Multiple: Story = {
  args: { type: 'multiple' },
}

export const NotCollapsible: Story = {
  args: { collapsible: false },
}

export const Sizes: Story = {
  render: (args) => (
    <YStack gap="$4">
      <Accordion {...args} size="sm" items={defaultItems.slice(0, 2)} />
      <Accordion {...args} size="md" items={defaultItems.slice(0, 2)} />
      <Accordion {...args} size="lg" items={defaultItems.slice(0, 2)} />
    </YStack>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <YStack gap="$4">
      <Accordion {...args} variant="default" items={defaultItems.slice(0, 2)} />
      <Accordion {...args} variant="filled" items={defaultItems.slice(0, 2)} />
      <Accordion {...args} variant="ghost" items={defaultItems.slice(0, 2)} />
      <Accordion {...args} variant="outlined" items={defaultItems.slice(0, 2)} />
    </YStack>
  ),
}

export const WithDefaultOpen: Story = {
  args: { defaultValue: 'a' },
}
