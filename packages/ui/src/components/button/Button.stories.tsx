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

export const LiquidOnDark: Story = {
  args: {
    variant: 'liquid',
    children: 'Liquid action',
    liquidOptions: {
      style: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        overflow: 'hidden',
      },
    },
  },
  render: (args) => (
    <div
      style={{
        background: '#111',
        padding: '24px',
        minHeight: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '360px',
          height: '220px',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.14), transparent 35%), radial-gradient(circle at 80% 75%, rgba(59,130,246,0.22), transparent 45%), #000',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        <Button {...args} />
      </div>
    </div>
  ),
}
