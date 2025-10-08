import type { Meta, StoryObj } from '@storybook/react'
import { HxTitle } from '@/components/ui'

const meta: Meta<typeof HxTitle> = {
  title: 'UI/HxTitle',
  component: HxTitle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { level: { control: { type: 'select' }, options: [1,2,3,4,5,6] } },
}

export default meta

type Story = StoryObj<typeof meta>

export const Levels: Story = {
  render: () => (
    <div className="space-y-2">
      <HxTitle level={1}>Heading 1</HxTitle>
      <HxTitle level={2}>Heading 2</HxTitle>
      <HxTitle level={3}>Heading 3</HxTitle>
      <HxTitle level={4}>Heading 4</HxTitle>
      <HxTitle level={5}>Heading 5</HxTitle>
      <HxTitle level={6}>Heading 6</HxTitle>
    </div>
  ),
}
