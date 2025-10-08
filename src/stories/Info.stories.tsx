import type { Meta, StoryObj } from '@storybook/react'
import { Info } from '@/components/ui'

const meta: Meta<typeof Info> = {
  title: 'UI/Info',
  component: Info,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: { type: 'select' }, options: ['neutral', 'primary', 'warning', 'destructive'] },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { tone: 'neutral', children: 'This is an informational message.' },
}

export const Tones: Story = {
  render: () => (
    <div className="space-y-2 w-[420px]">
      <Info tone="neutral">This is a neutral info box</Info>
      <Info tone="primary">Primary accent information</Info>
      <Info tone="warning">Warning: please validate your input</Info>
      <Info tone="destructive">Error: Something went wrong</Info>
    </div>
  ),
}

export const CRMExample: Story = {
  render: () => (
    <div className="space-y-3 w-[520px]">
      <Info tone="primary">New features are available in your CRM workspace</Info>
      <Info tone="warning">Lead score missing for several contacts</Info>
      <Info tone="destructive">Failed to sync with external provider</Info>
    </div>
  ),
}
