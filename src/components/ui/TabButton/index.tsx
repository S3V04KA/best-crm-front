import React from 'react'
import { cn } from '@/utils/cn'

export interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export const TabButton = React.forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ className, active = false, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        active ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)

TabButton.displayName = 'TabButton'
