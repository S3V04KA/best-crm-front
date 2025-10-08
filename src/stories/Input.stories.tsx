import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    placeholder: 'Search...',
  },
}

export const CRMForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Company Name"
        placeholder="Acme Corp"
      />
      <Input
        label="Contact Email"
        type="email"
        placeholder="contact@acme.com"
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
      />
      <Input
        label="Website"
        placeholder="https://acme.com"
        error="Please enter a valid URL"
      />
    </div>
  ),
}
