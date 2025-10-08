import React from 'react'
import { cn } from '@/utils/cn'

export interface IconButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const IconButtonGroup: React.FC<IconButtonGroupProps> = ({ className, children, ...props }) => (
  <div className={cn('inline-flex items-center gap-2', className)} {...props}>
    {children}
  </div>
)
