import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    label: 'Description',
    placeholder: 'Write your description...',
    helperText: 'Minimum 20 characters',
    variant: 'default',
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const Error: Story = {
  args: {
    errorText: 'Description is required',
  },
}
