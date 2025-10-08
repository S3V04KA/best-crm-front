import React from 'react'
import { cn } from '@/utils/cn'

export interface ColorSampleProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  label?: string
  size?: number
}

export const ColorSample: React.FC<ColorSampleProps> = ({ color, label, size = 16, className, ...props }) => (
  <div className={cn('inline-flex items-center gap-2', className)} {...props}>
    <span
      className="inline-block rounded border border-gray-200"
      style={{ width: size, height: size, backgroundColor: color }}
    />
    {label && <span className="text-sm text-gray-700">{label}</span>}
  </div>
)
