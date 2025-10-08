import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonGroup, FloatingButton, FloatingButtonGroup, TabButton, ColorPickerButton } from '@/components/ui'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

const meta: Meta = {
  title: 'UI/Buttons & Groups',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj

export const GroupedButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
}

export const FloatingButtons: Story = {
  render: () => (
    <FloatingButtonGroup position="br">
      <FloatingButton><Plus className="h-5 w-5" /></FloatingButton>
      <FloatingButton><Edit className="h-5 w-5" /></FloatingButton>
      <FloatingButton><Trash2 className="h-5 w-5" /></FloatingButton>
    </FloatingButtonGroup>
  ),
}

export const Tabs: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <TabButton active>Overview</TabButton>
      <TabButton>Activity</TabButton>
      <TabButton>Team</TabButton>
    </div>
  ),
}

export const ColorPicker: Story = {
  render: () => {
    const [selected, setSelected] = useState('#3B82F6')
    const palette = ['#3B82F6', '#2563EB', '#22C55E', '#EF4444', '#64748B']
    return (
      <div className="flex items-center gap-2">
        {palette.map((c) => (
          <ColorPickerButton key={c} color={c} selected={selected === c} onClick={() => setSelected(c)} />
        ))}
      </div>
    )
  },
}
