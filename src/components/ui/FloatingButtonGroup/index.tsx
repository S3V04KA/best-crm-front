import React from 'react'
import { cn } from '@/utils/cn'

export interface FloatingButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'br' | 'tr' | 'bl' | 'tl'
  children: React.ReactNode
}

const posCls = {
  br: 'bottom-6 right-6',
  tr: 'top-6 right-6',
  bl: 'bottom-6 left-6',
  tl: 'top-6 left-6',
}

export const FloatingButtonGroup: React.FC<FloatingButtonGroupProps> = ({ className, position = 'br', children, ...props }) => (
  <div className={cn('fixed z-40 flex flex-col gap-3', posCls[position], className)} {...props}>
    {children}
  </div>
)
