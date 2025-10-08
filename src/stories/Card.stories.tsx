import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui'
import { Button } from '@/components/ui'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <h3 className="text-lg font-semibold text-primary-600">Card Title</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          This is the card content. It can contain any text or components.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const CRMContactCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <h3 className="text-lg font-semibold text-primary-600">John Doe</h3>
        <p className="text-sm text-gray-500">Senior Developer</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">john.doe@company.com</p>
          <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
          <p className="text-sm text-gray-600">San Francisco, CA</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="primary" size="sm">Edit</Button>
        <Button variant="secondary" size="sm">View</Button>
      </CardFooter>
    </Card>
  ),
}

export const CRMDashboardCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-primary-600">Total Contacts</h3>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-gray-900">1,234</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-primary-600">Active Deals</h3>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-gray-900">89</p>
          <p className="text-sm text-blue-600">$2.4M pipeline</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-primary-600">Conversion Rate</h3>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-gray-900">24.5%</p>
          <p className="text-sm text-gray-600">Last 30 days</p>
        </CardContent>
      </Card>
    </div>
  ),
}
