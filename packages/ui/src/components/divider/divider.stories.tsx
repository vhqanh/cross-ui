import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { Divider } from './divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
}

export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {}

export const WithLabel: Story = {
  render: () => (
    <YStack gap="$3">
      <Divider />
      <Divider label="OR" />
      <Divider />
    </YStack>
  ),
}
