import React from 'react'
import { cn } from '@/utils/cn'

export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const colorMap: Record<NonNullable<TagProps['color']>, string> = {
  gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  blue: 'bg-primary-100 text-primary-800 hover:bg-primary-200',
  green: 'bg-success-100 text-success-800 hover:bg-success-200',
  red: 'bg-destructive-100 text-destructive-800 hover:bg-destructive-200',
  yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
}

export const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
  ({ className, color = 'gray', leftIcon, rightIcon, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-colors',
        colorMap[color],
        className
      )}
      {...props}
    >
      {leftIcon && <span className="mr-1">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-1">{rightIcon}</span>}
    </button>
  )
)

Tag.displayName = 'Tag'
