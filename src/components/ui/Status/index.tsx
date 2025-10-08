import React from 'react'
import { cn } from '@/utils/cn'

export interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'gray' | 'primary' | 'success' | 'destructive' | 'warning'
  label?: string
}

const dotColor: Record<NonNullable<StatusProps['color']>, string> = {
  gray: 'bg-gray-400',
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  destructive: 'bg-destructive-500',
  warning: 'bg-yellow-500',
}

export const Status: React.FC<StatusProps> = ({ className, color = 'gray', label, children, ...props }) => (
  <div className={cn('inline-flex items-center gap-2 text-sm text-gray-700', className)} {...props}>
    <span className={cn('h-2.5 w-2.5 rounded-full', dotColor[color])} />
    {label ?? children}
  </div>
)
