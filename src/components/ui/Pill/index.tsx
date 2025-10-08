import React from 'react'
import { cn } from '@/utils/cn'

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'destructive'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

const variantClasses: Record<NonNullable<PillProps['variant']>, string> = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  primary: 'bg-primary-100 text-primary-800 border-primary-200',
  secondary: 'bg-secondary-100 text-secondary-800 border-secondary-200',
  success: 'bg-success-100 text-success-800 border-success-200',
  destructive: 'bg-destructive-100 text-destructive-800 border-destructive-200',
}

const sizeClasses: Record<NonNullable<PillProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
)

Pill.displayName = 'Pill'
