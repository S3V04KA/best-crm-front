import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const CRMContactAvatars: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">John Doe</div>
          <div className="text-sm text-gray-500">Senior Developer</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">Jane Smith</div>
          <div className="text-sm text-gray-500">Product Manager</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Bob Johnson" />
          <AvatarFallback>BJ</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">Bob Johnson</div>
          <div className="text-sm text-gray-500">Sales Director</div>
        </div>
      </div>
    </div>
  ),
}

export const CRMAvatarList: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Team Members</h3>
      <div className="flex -space-x-2">
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="Bob Johnson" />
          <AvatarFallback>BJ</AvatarFallback>
        </Avatar>
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarFallback>+5</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ),
}
