import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'success', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
    </div>
  ),
}

export const CRMStatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Status</h3>
        <div className="flex gap-2">
          <Badge variant="success">Active</Badge>
          <Badge variant="destructive">Inactive</Badge>
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="default">New</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Deal Status</h3>
        <div className="flex gap-2">
          <Badge variant="success">Closed Won</Badge>
          <Badge variant="destructive">Closed Lost</Badge>
          <Badge variant="default">In Progress</Badge>
          <Badge variant="secondary">Qualified</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Priority Levels</h3>
        <div className="flex gap-2">
          <Badge variant="destructive">High</Badge>
          <Badge variant="default">Medium</Badge>
          <Badge variant="secondary">Low</Badge>
        </div>
      </div>
    </div>
  ),
}
