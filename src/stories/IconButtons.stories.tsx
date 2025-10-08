import type { Meta, StoryObj } from '@storybook/react'
import { AnimatedLightIconButton, IconButton, IconButtonGroup } from '@/components/ui'
import { Settings, Plus, Trash2 } from 'lucide-react'

const meta: Meta = {
  title: 'UI/Icon Buttons',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj

export const AnimatedLight: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <AnimatedLightIconButton>
        <Settings className="h-4 w-4" />
      </AnimatedLightIconButton>
      <AnimatedLightIconButton>
        <Plus className="h-4 w-4" />
      </AnimatedLightIconButton>
    </div>
  ),
}

export const IconVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton tone="ghost"><Settings className="h-4 w-4" /></IconButton>
      <IconButton tone="primary"><Settings className="h-4 w-4" /></IconButton>
      <IconButton tone="secondary"><Settings className="h-4 w-4" /></IconButton>
      <IconButton tone="destructive"><Trash2 className="h-4 w-4" /></IconButton>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <IconButtonGroup>
      <IconButton tone="secondary"><Settings className="h-4 w-4" /></IconButton>
      <IconButton tone="secondary"><Plus className="h-4 w-4" /></IconButton>
      <IconButton tone="secondary"><Trash2 className="h-4 w-4" /></IconButton>
    </IconButtonGroup>
  ),
}
