import React from 'react'
import { cn } from '@/utils/cn'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ className, children, ...props }) => (
  <div className={cn('inline-flex rounded-md shadow-sm', className)} role="group" {...props}>
    {React.Children.map(children, (child, idx) => (
      <div className={cn('first:rounded-l-md last:rounded-r-md -ml-px first:ml-0')}>{child}</div>
    ))}
  </div>
)
