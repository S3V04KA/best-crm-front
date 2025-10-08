import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from '@/components/ui'
import { X, Hash } from 'lucide-react'

const meta: Meta<typeof Tag> = {
  title: 'UI/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: { control: { type: 'select' }, options: ['gray', 'blue', 'green', 'red', 'yellow'] },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Tag', color: 'gray' } }

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag color="gray">Gray</Tag>
      <Tag color="blue">Blue</Tag>
      <Tag color="green">Green</Tag>
      <Tag color="red">Red</Tag>
      <Tag color="yellow">Yellow</Tag>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag color="blue" leftIcon={<Hash className="h-4 w-4" />}>Label</Tag>
      <Tag color="red" rightIcon={<X className="h-4 w-4" />}>Removable</Tag>
    </div>
  ),
}
