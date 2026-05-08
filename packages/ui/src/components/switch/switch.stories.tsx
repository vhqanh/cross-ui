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

export const Sizes: Story = {
  render: () => (
    <YStack gap="$3">
      <Switch label="Small" size="sm" />
      <Switch label="Medium" size="md" />
    </YStack>
  ),
}
