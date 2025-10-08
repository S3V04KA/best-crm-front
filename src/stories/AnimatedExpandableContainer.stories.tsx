import type { Meta, StoryObj } from '@storybook/react'
import { AnimatedExpandableContainer, Button } from '@/components/ui'
import { useState } from 'react'

const meta: Meta<typeof AnimatedExpandableContainer> = {
  title: 'UI/AnimatedExpandableContainer',
  component: AnimatedExpandableContainer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Toggle: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="w-[420px] space-y-3">
        <Button variant="secondary" onClick={() => setOpen((v) => !v)}>
          Toggle
        </Button>
        <AnimatedExpandableContainer expanded={open}>
          <div className="rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700">
            Collapsible content goes here. It animates height.
          </div>
        </AnimatedExpandableContainer>
      </div>
    )
  },
}
