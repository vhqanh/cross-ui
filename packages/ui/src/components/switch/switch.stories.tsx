import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    label: 'Enable notifications',
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const Primary: Story = {
  args: {
    defaultChecked: true,
    variant: 'primary',
  },
}

export const Success: Story = {
  args: {
    defaultChecked: true,
    variant: 'success',
    label: 'Feature enabled',
  },
}

export const Danger: Story = {
  args: {
    defaultChecked: true,
    variant: 'danger',
    label: 'Danger mode',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled switch',
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: 'Disabled checked',
  },
}

export const Sizes: Story = {
  render: () => (
    <YStack gap="$3">
      <Switch label="Small" size="sm" />
      <Switch label="Medium" size="md" />
      <Switch label="Large" size="lg" />
    </YStack>
  ),
}

export const Variants: Story = {
  render: () => (
    <YStack gap="$3">
      <Switch label="Default" variant="default" defaultChecked />
      <Switch label="Primary" variant="primary" defaultChecked />
      <Switch label="Success" variant="success" defaultChecked />
      <Switch label="Danger" variant="danger" defaultChecked />
    </YStack>
  ),
}

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    defaultChecked: true,
  },
}
