import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui'
import { Badge } from '@/components/ui'
import { useState } from 'react'

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    verticalDividers: { control: { type: 'boolean' } },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', company: 'Acme Corp' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', company: 'Tech Inc' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', company: 'Startup Co' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Pending', company: 'Big Corp' },
]

export const Default: Story = {
  args: { verticalDividers: false },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Company</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'destructive' : 'secondary'}>
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.company}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Sortable: Story = {
  render: () => {
    const [sortField, setSortField] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null)

    const handleSort = (field: string) => {
      if (sortField === field) {
        if (sortDirection === 'asc') {
          setSortDirection('desc')
        } else if (sortDirection === 'desc') {
          setSortDirection(null)
          setSortField(null)
        } else {
          setSortDirection('asc')
        }
      } else {
        setSortField(field)
        setSortDirection('asc')
      }
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              sortable 
              sortDirection={sortField === 'name' ? sortDirection : null}
              onSort={() => handleSort('name')}
            >
              Name
            </TableHead>
            <TableHead 
              sortable 
              sortDirection={sortField === 'email' ? sortDirection : null}
              onSort={() => handleSort('email')}
            >
              Email
            </TableHead>
            <TableHead 
              sortable 
              sortDirection={sortField === 'status' ? sortDirection : null}
              onSort={() => handleSort('status')}
            >
              Status
            </TableHead>
            <TableHead 
              sortable 
              sortDirection={sortField === 'company' ? sortDirection : null}
              onSort={() => handleSort('company')}
            >
              Company
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'destructive' : 'secondary'}>
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>{row.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}

export const WithVerticalDividers: Story = {
  render: () => (
    <Table verticalDividers>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Company</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'destructive' : 'secondary'}>
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.company}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const CRMContactsTable: Story = {
  render: () => (
    <div className="w-full">
      <Table verticalDividers>
        <TableHeader>
          <TableRow>
            <TableHead sortable>Contact</TableHead>
            <TableHead sortable>Company</TableHead>
            <TableHead sortable>Status</TableHead>
            <TableHead sortable>Last Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{row.name}</div>
                  <div className="text-sm text-gray-500">{row.email}</div>
                </div>
              </TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>
                <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'destructive' : 'secondary'}>
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>2 days ago</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button className="text-primary-600 hover:text-primary-800 text-sm">Edit</button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm">View</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}
