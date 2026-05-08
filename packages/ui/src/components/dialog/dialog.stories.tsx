import type { Meta, StoryObj } from '@storybook/react'
import { Button, Text } from 'tamagui'
import { Dialog } from './dialog'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    open: true,
    title: 'Delete item',
    description: 'This action cannot be undone.',
    variant: 'default',
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  args: {
    children: <Text>Are you sure you want to continue?</Text>,
    footer: <Button>Confirm</Button>,
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
}
