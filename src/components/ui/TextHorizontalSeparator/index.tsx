import React from 'react'
import { cn } from '@/utils/cn'

export interface TextHorizontalSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
}

export const TextHorizontalSeparator: React.FC<TextHorizontalSeparatorProps> = ({ text, className, ...props }) => (
  <div className={cn('relative my-4', className)} {...props}>
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-200" />
    </div>
    {text && (
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-sm text-gray-500">{text}</span>
      </div>
    )}
  </div>
)
