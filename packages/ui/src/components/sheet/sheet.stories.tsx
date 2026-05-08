import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../text/text'
import { Sheet } from './sheet'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  args: {
    open: true,
    title: 'Settings',
    variant: 'default',
    children: <Text variant="body">Sheet content</Text>,
  },
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {}

export const Dark: Story = {
  args: {
    variant: 'dark',
  },
}
