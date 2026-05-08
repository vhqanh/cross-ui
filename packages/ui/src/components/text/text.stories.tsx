import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { Text } from './text'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body',
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {}

export const Headings: Story = {
  render: () => (
    <YStack gap="$2">
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
    </YStack>
  ),
}
