import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './table'

type UserRow = {
  name: string
  role: string
  status: string
}

const meta: Meta<typeof Table<UserRow>> = {
  title: 'Components/Table',
  component: Table<UserRow>,
}

export default meta
type Story = StoryObj<typeof Table<UserRow>>

const data: UserRow[] = [
  { name: 'Alice', role: 'Admin', status: 'Active' },
  { name: 'Bob', role: 'Editor', status: 'Pending' },
  { name: 'Charlie', role: 'Viewer', status: 'Inactive' },
]

export const Default: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'role', header: 'Role' },
      { key: 'status', header: 'Status' },
    ],
    data,
  },
}
