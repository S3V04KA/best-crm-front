import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface CheckmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'gray' | 'primary' | 'success'
  size?: number
}

export const Checkmark: React.FC<CheckmarkProps> = ({ color = 'success', size = 16, className, ...props }) => (
  <span className={cn('inline-flex items-center justify-center', className)} {...props}>
    <Check
      width={size}
      height={size}
      className={cn({
        'text-gray-500': color === 'gray',
        'text-primary-600': color === 'primary',
        'text-success-600': color === 'success',
      })}
    />
  </span>
)
