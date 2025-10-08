import type { Meta, StoryObj } from '@storybook/react'
import { Status } from '@/components/ui'

const meta: Meta<typeof Status> = {
  title: 'UI/Status',
  component: Status,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: { type: 'select' }, options: ['gray', 'primary', 'success', 'destructive', 'warning'] },
    label: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { color: 'gray', label: 'Unknown' },
}

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Status color="primary" label="Active" />
      <Status color="success" label="Completed" />
      <Status color="warning" label="Pending" />
      <Status color="destructive" label="Failed" />
      <Status color="gray" label="Archived" />
    </div>
  ),
}

export const CRMExample: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Deal:</span>
        <Status color="primary" label="In Progress" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Contact:</span>
        <Status color="success" label="Active" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Sync:</span>
        <Status color="warning" label="Scheduled" />
      </div>
    </div>
  ),
}
