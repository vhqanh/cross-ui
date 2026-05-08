import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/button'
import { Tooltip } from './tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    open: true,
    content: 'Copy to clipboard',
    variant: 'default',
    children: <Button size="sm">Hover target</Button>,
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {}

export const Light: Story = {
  args: {
    variant: 'light',
  },
}
