import React from 'react'
import { cn } from '@/utils/cn'

export interface HxTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}

const levelClasses: Record<number, string> = {
  1: 'text-3xl font-bold',
  2: 'text-2xl font-semibold',
  3: 'text-xl font-semibold',
  4: 'text-lg font-medium',
  5: 'text-base font-medium',
  6: 'text-sm font-medium',
}

export const HxTitle: React.FC<HxTitleProps> = ({ level = 2, className, children, ...props }) => {
  const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements
  return (
    <Tag className={cn('text-gray-900', levelClasses[level], className)} {...props}>
      {children}
    </Tag>
  )
}
