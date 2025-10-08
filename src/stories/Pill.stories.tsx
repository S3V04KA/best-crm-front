import type { Meta, StoryObj } from '@storybook/react'
import { Pill } from '@/components/ui'

const meta: Meta<typeof Pill> = {
  title: 'UI/Pill',
  component: Pill,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'primary', 'secondary', 'success', 'destructive'] },
    size: { control: { type: 'select' }, options: ['sm', 'md'] },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Pill', variant: 'default' } }

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Pill variant="default">Default</Pill>
      <Pill variant="primary">Primary</Pill>
      <Pill variant="secondary">Secondary</Pill>
      <Pill variant="success">Success</Pill>
      <Pill variant="destructive">Destructive</Pill>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Pill size="sm">Small</Pill>
      <Pill size="md">Medium</Pill>
    </div>
  ),
}
