import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { Skeleton } from './skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    width: 280,
  },
}

export const Shapes: Story = {
  render: () => (
    <YStack gap="$3">
      <Skeleton width={320} shape="line" />
      <Skeleton width={220} shape="rounded" />
      <Skeleton width={40} shape="circle" size="xl" />
    </YStack>
  ),
}
