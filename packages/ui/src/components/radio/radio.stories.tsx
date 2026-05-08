import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './radio'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    variant: 'default',
    size: 'md',
    defaultValue: 'all',
    options: [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'archived', label: 'Archived' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
}
