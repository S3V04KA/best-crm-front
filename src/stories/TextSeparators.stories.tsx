import type { Meta, StoryObj } from '@storybook/react'
import { TextHorizontalSeparator, TextVerticalSeparator } from '@/components/ui'

const meta: Meta = {
  title: 'UI/TextSeparators',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

export const Horizontal: Story = {
  render: () => (
    <div className="w-[400px]">
      <TextHorizontalSeparator text="OR" />
      <div className="text-sm text-gray-600">
        Content below the separator
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center text-sm text-gray-700">
      <span>Item A</span>
      <TextVerticalSeparator />
      <span>Item B</span>
      <TextVerticalSeparator />
      <span>Item C</span>
    </div>
  ),
}
