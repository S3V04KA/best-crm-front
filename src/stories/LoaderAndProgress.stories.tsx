import type { Meta, StoryObj } from '@storybook/react'
import { Loader, CircularProgessBar, ProgressBar } from '@/components/ui'
import { useState } from 'react'

const meta: Meta = {
  title: 'UI/Loader & Progress',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj

export const LoaderVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Loader type="spinner" size="sm" />
        <Loader type="spinner" size="md" />
        <Loader type="spinner" size="lg" />
      </div>
      <div className="w-64">
        <Loader type="bar" />
      </div>
    </div>
  ),
}

export const CircularProgressExample: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CircularProgessBar progress={25} />
      <CircularProgessBar progress={50} />
      <CircularProgessBar progress={75} />
      <CircularProgessBar progress={100} />
    </div>
  ),
}

export const ProgressBarExample: Story = {
  render: () => {
    const [value] = useState(64)
    return (
      <div className="w-80 space-y-2">
        <ProgressBar value={value} showLabel />
        <ProgressBar value={40} color="success" />
        <ProgressBar value={20} color="destructive" />
        <ProgressBar value={80} color="gray" />
      </div>
    )
  },
}
