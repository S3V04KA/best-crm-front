import React from 'react'
import { cn } from '@/utils/cn'

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'spinner' | 'bar'
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap: Record<NonNullable<LoaderProps['size']>, number> = { sm: 16, md: 24, lg: 32 }

export const Loader: React.FC<LoaderProps> = ({ type = 'spinner', size = 'md', className, ...props }) => {
  if (type === 'bar') {
    return (
      <div className={cn('h-1 w-full overflow-hidden rounded bg-gray-100', className)} {...props}>
        <div className="h-full w-1/3 animate-[loader_1s_ease_infinite] rounded bg-primary-500" />
        <style>{`@keyframes loader { 0%{transform:translateX(-100%)} 50%{transform:translateX(100%)} 100%{transform:translateX(300%)} }`}</style>
      </div>
    )
  }

  const px = sizeMap[size]
  return (
    <div className={cn('inline-block', className)} {...props}>
      <svg className="animate-spin text-primary-500" width={px} height={px} viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </div>
  )
}
