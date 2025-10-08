import React from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'outline'
  size?: 'sm' | 'default'
  children: React.ReactNode
}

const badgeVariants = {
  default: 'bg-primary-100 text-primary-800 border-primary-200 dark:bg-primary-900/40 dark:text-primary-300 dark:border-primary-900/40',
  secondary: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
  destructive: 'bg-destructive-100 text-destructive-800 border-destructive-200 dark:bg-destructive-900/40 dark:text-destructive-300 dark:border-destructive-900/40',
  success: 'bg-success-100 text-success-800 border-success-200 dark:bg-success-900/40 dark:text-success-300 dark:border-success-900/40',
  outline: 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-700'
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  default: 'px-2.5 py-1 text-xs'
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          badgeVariants[variant],
          badgeSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'
