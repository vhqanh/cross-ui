import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: {
    placeholder: 'Choose a network',
    variant: 'default',
    options: [
      { label: 'AIOZ', value: 'aioz' },
      { label: 'Ethereum', value: 'eth' },
      { label: 'Solana', value: 'sol' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
