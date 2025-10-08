import React from 'react'
import { cn } from '@/utils/cn'

export interface ColorPickerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string
  selected?: boolean
}

export const ColorPickerButton = React.forwardRef<HTMLButtonElement, ColorPickerButtonProps>(
  ({ className, color, selected, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'h-8 w-8 rounded-full border-2 transition-shadow',
        selected ? 'ring-2 ring-primary-500 ring-offset-2' : 'border-gray-200',
        className
      )}
      style={{ backgroundColor: color }}
      {...props}
    />
  )
)

ColorPickerButton.displayName = 'ColorPickerButton'
