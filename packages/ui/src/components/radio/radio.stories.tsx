import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { RadioGroup } from './radio'

const defaultOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived', disabled: true },
]

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    variant: 'default',
    size: 'md',
    defaultValue: 'all',
    options: defaultOptions,
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {}

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Sizes: Story = {
  render: (args) => (
    <YStack gap="$5">
      <RadioGroup {...args} size="sm" defaultValue="all" />
      <RadioGroup {...args} size="md" defaultValue="all" />
      <RadioGroup {...args} size="lg" defaultValue="all" />
    </YStack>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <YStack gap="$5">
      <RadioGroup {...args} variant="default" defaultValue="all" />
      <RadioGroup {...args} variant="primary" defaultValue="all" />
    </YStack>
  ),
}

export const WithDisabledOption: Story = {
  args: {
    options: defaultOptions,
    defaultValue: 'all',
  },
}

export const HorizontalPrimary: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'primary',
  },
}
