import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Active',
    variant: 'primary',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Primary: Story = {}

export const SuccessWithDot: Story = {
  args: {
    variant: 'success',
    dot: true,
    children: 'Healthy',
  },
}
