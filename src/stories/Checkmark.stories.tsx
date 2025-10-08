import type { Meta, StoryObj } from '@storybook/react'
import { Checkmark } from '@/components/ui'

const meta: Meta<typeof Checkmark> = {
  title: 'UI/Checkmark',
  component: Checkmark,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: { type: 'select' }, options: ['gray', 'primary', 'success'] },
    size: { control: { type: 'number' } },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { color: 'success', size: 20 },
}

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkmark color="gray" />
      <Checkmark color="primary" />
      <Checkmark color="success" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkmark size={14} />
      <Checkmark size={20} />
      <Checkmark size={28} />
    </div>
  ),
}
