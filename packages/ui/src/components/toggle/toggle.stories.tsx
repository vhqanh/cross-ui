import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  args: {
    type: 'single',
    variant: 'default',
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ],
    defaultValue: 'week',
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
