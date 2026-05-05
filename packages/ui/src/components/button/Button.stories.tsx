import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Continue',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline action',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Outline action',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving...',
  },
}
