import type { Meta, StoryObj } from '@storybook/react'
import { YStack } from 'tamagui'
import { Toast, ToastProvider } from './toast'

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
}

export default meta
type Story = StoryObj<typeof ToastProvider>

export const ViewportOnly: Story = {
  render: () => (
    <YStack>
      <ToastProvider />
      <Toast />
    </YStack>
  ),
}
