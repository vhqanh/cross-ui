import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'Accept terms',
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Option bị disabled',
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: 'Option bị disabled (checked)',
  },
}

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    defaultChecked: true,
  },
}

export const Variants: Story = {
  render: () => (
    <YStack gap="$3">
      <Checkbox label="Default" variant="default" />
      <Checkbox label="Default checked" variant="default" defaultChecked />
      <Checkbox label="Primary" variant="primary" />
      <Checkbox label="Primary checked" variant="primary" defaultChecked />
    </YStack>
  ),
}

export const Sizes: Story = {
  render: () => (
    <YStack gap="$3">
      <Checkbox label="Small" size="sm" defaultChecked />
      <Checkbox label="Medium" size="md" defaultChecked />
    </YStack>
  ),
}

export const AllStates: Story = {
  render: () => (
    <YStack gap="$3">
      <Checkbox label="Unchecked" variant="primary" />
      <Checkbox label="Checked" variant="primary" defaultChecked />
      <Checkbox label="Disabled" variant="primary" disabled />
      <Checkbox label="Disabled checked" variant="primary" disabled defaultChecked />
    </YStack>
  ),
}
