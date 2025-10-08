import React from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  variant?: 'default' | 'ghost'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, variant = 'default', ...props }, ref) => {
    const inputClasses = cn(
      'flex h-10 w-full rounded-md px-3 py-2 text-sm transition-colors',
      'placeholder:text-gray-500',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
      {
        'border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400': variant === 'default',
        'border-0 bg-transparent dark:text-gray-100 dark:placeholder:text-gray-400': variant === 'ghost',
        'border-destructive-500 focus:ring-destructive-500': error,
      },
      className
    )

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
          </label>
        )}
        <input
          type={type}
          className={inputClasses}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-destructive-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
