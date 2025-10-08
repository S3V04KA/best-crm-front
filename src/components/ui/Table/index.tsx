import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
  verticalDividers?: boolean
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  sortable?: boolean
  sortDirection?: 'asc' | 'desc' | null
  onSort?: () => void
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

const TableContext = React.createContext<{ verticalDividers: boolean }>({ verticalDividers: false })

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, verticalDividers = false, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <TableContext.Provider value={{ verticalDividers }}>
        <table
          ref={ref}
          className={cn('w-full caption-bottom text-sm border-collapse', className)}
          {...props}
        >
          {children}
        </table>
      </TableContext.Provider>
    </div>
  )
)

Table.displayName = 'Table'

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b dark:[&_tr]:border-gray-800', className)} {...props}>
      {children}
    </thead>
  )
)

TableHeader.displayName = 'TableHeader'

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props}>
      {children}
    </tbody>
  )
)

TableBody.displayName = 'TableBody'

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>((
  { className, children, ...props }, ref) => {
  const { verticalDividers } = React.useContext(TableContext)
  return (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-800',
        verticalDividers && 'divide-x divide-gray-200 dark:divide-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
})

TableRow.displayName = 'TableRow'

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortable = false, sortDirection, onSort, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-gray-900 bg-gray-50 [&:has([role=checkbox])]:pr-0 dark:bg-gray-900 dark:text-gray-100',
        sortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none',
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortable && (
          <div className="flex flex-col">
            <ChevronUp 
              className={cn(
                'h-3 w-3 transition-colors',
                sortDirection === 'asc' ? 'text-primary-600' : 'text-gray-400'
              )} 
            />
            <ChevronDown 
              className={cn(
                'h-3 w-3 -mt-1 transition-colors',
                sortDirection === 'desc' ? 'text-primary-600' : 'text-gray-400'
              )} 
            />
          </div>
        )}
      </div>
    </th>
  )
)

TableHead.displayName = 'TableHead'

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    >
      {children}
    </td>
  )
)

TableCell.displayName = 'TableCell'
