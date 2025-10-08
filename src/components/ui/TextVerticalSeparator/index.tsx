import React from 'react'
import { cn } from '@/utils/cn'

export interface TextVerticalSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TextVerticalSeparator: React.FC<TextVerticalSeparatorProps> = ({ className, ...props }) => (
  <div className={cn('mx-2 h-5 w-px bg-gray-200', className)} {...props} />
)
