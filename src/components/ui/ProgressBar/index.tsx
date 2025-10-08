import React from 'react'
import { cn } from '@/utils/cn'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0..100
  color?: 'primary' | 'success' | 'destructive' | 'gray'
  showLabel?: boolean
}

const colorClass: Record<NonNullable<ProgressBarProps['color']>, string> = {
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  destructive: 'bg-destructive-500',
  gray: 'bg-gray-400',
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = 'primary', showLabel, className, ...props }) => (
  <div className={cn('w-full rounded bg-gray-100', className)} {...props}>
    <div className={cn('h-2 rounded', colorClass[color])} style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    {showLabel && (
      <div className="mt-1 text-right text-xs text-gray-500">{Math.round(value)}%</div>
    )}
  </div>
)
