import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    type: 'single',
    variant: 'default',
    size: 'md',
    items: [
      { value: 'a', title: 'What is Cross UI?', content: 'A cross-platform component kit.' },
      { value: 'b', title: 'Built with?', content: 'Tamagui + React Native Web.' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
}
