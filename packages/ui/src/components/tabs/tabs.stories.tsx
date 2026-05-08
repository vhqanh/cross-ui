import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../text/text'
import { Tabs } from './tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    variant: 'default',
    items: [
      { value: 'overview', label: 'Overview', content: <Text>Overview content</Text> },
      { value: 'analytics', label: 'Analytics', content: <Text>Analytics content</Text> },
      { value: 'settings', label: 'Settings', content: <Text>Settings content</Text> },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {}

export const Underline: Story = {
  args: {
    variant: 'underline',
  },
}
