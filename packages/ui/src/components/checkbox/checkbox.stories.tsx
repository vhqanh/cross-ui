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

export const Variants: Story = {
  render: () => (
    <YStack gap="$2">
      <Checkbox label="Default" variant="default" />
      <Checkbox label="Primary" variant="primary" defaultChecked />
    </YStack>
  ),
}
