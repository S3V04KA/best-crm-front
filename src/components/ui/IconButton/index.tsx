import React from 'react'
import { cn } from '@/utils/cn'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: 'ghost' | 'primary' | 'secondary' | 'destructive'
  size?: 'sm' | 'md'
}

const toneCls: Record<NonNullable<IconButtonProps['tone']>, string> = {
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  primary: 'bg-primary-50 hover:bg-primary-100 text-primary-700',
  secondary: 'bg-gray-50 hover:bg-gray-100 text-gray-700',
  destructive: 'bg-destructive-50 hover:bg-destructive-100 text-destructive-700',
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, tone = 'ghost', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-transparent transition-colors',
        size === 'sm' ? 'h-8 w-8' : 'h-9 w-9',
        toneCls[tone],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)

IconButton.displayName = 'IconButton'
