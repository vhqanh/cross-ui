import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    value: 60,
    max: 100,
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <YStack gap="$3" width={360}>
      <Progress value={35} variant="default" />
      <Progress value={65} variant="success" />
      <Progress value={80} variant="warning" />
    </YStack>
  ),
}
