import React from 'react'
import { cn } from '@/utils/cn'

export interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position?: 'br' | 'tr' | 'bl' | 'tl'
}

const posCls = {
  br: 'bottom-6 right-6',
  tr: 'top-6 right-6',
  bl: 'bottom-6 left-6',
  tl: 'top-6 left-6',
}

export const FloatingButton = React.forwardRef<HTMLButtonElement, FloatingButtonProps>(
  ({ className, position = 'br', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'fixed z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-colors hover:bg-primary-600',
        posCls[position],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)

FloatingButton.displayName = 'FloatingButton'
