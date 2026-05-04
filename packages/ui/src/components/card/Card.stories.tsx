import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Button } from '../button/Button'
import { Text } from '../text/Text'
import { Card, CardFooter, CardHeader } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    variant: 'default',
    padded: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  render: (args: ComponentProps<typeof Card>) => (
    <Card {...args} width={360}>
      <CardHeader>
        <Text variant="h4">Node Status</Text>
      </CardHeader>
      <Text variant="body">AIOZ node is syncing and healthy.</Text>
      <CardFooter>
        <Button size="sm">View details</Button>
      </CardFooter>
    </Card>
  ),
}
