import React from 'react'
import { cn } from '@/utils/cn'

export interface AnimatedLightIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md'
}

export const AnimatedLightIconButton = React.forwardRef<HTMLButtonElement, AnimatedLightIconButtonProps>(
  ({ className, size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-primary-200',
        size === 'sm' ? 'h-8 w-8' : 'h-9 w-9',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)

AnimatedLightIconButton.displayName = 'AnimatedLightIconButton'
