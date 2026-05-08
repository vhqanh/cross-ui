import type { Meta, StoryObj } from '@storybook/react'
import { XStack } from 'tamagui'
import { Avatar } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    fallback: 'Aioz Network',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <XStack gap="$3" alignItems="center">
      <Avatar fallback="AN" size="xs" />
      <Avatar fallback="AN" size="sm" />
      <Avatar fallback="AN" size="md" />
      <Avatar fallback="AN" size="lg" />
      <Avatar fallback="AN" size="xl" />
    </XStack>
  ),
}
