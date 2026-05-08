import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    triggerLabel: 'Actions',
    variant: 'default',
    items: [{ label: 'Edit' }, { label: 'Duplicate' }, { label: 'Archive' }],
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
