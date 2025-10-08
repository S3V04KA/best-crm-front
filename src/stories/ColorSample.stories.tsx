import type { Meta, StoryObj } from '@storybook/react'
import { ColorSample } from '@/components/ui'

const meta: Meta<typeof ColorSample> = {
  title: 'UI/ColorSample',
  component: ColorSample,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: { color: '#3B82F6', label: 'Primary' } }

export const Palette: Story = {
  render: () => (
    <div className="space-y-2">
      <ColorSample color="#3B82F6" label="Primary 500" />
      <ColorSample color="#2563EB" label="Primary 600" />
      <ColorSample color="#1E40AF" label="Primary 800" />
      <ColorSample color="#64748B" label="Secondary 500" />
      <ColorSample color="#22C55E" label="Success 500" />
      <ColorSample color="#EF4444" label="Destructive 500" />
    </div>
  ),
}
