import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import { Button } from '@/components/ui'
import { HelpCircle, Info } from 'lucide-react'

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <span>Contact Status</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Status indicates whether the contact is currently active</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

export const CRMFormTooltips: Story = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-4 w-80">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Lead Score</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Score from 0-100 based on engagement and fit</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <input 
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter lead score"
        />
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Company Size</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of employees in the company</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <input 
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="e.g., 50-100"
        />
      </div>
    </TooltipProvider>
  ),
}
