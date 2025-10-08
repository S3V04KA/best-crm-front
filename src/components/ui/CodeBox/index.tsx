import React from 'react'
import { cn } from '@/utils/cn'

export interface CodeTextboxProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  variant?: 'default' | 'ghost'
}

export const CodeTextbox = React.forwardRef<HTMLTextAreaElement, CodeTextboxProps>(
  ({ className, label, error, variant = 'default', ...props }, ref) => {
    const textareaClasses = cn(
      'flex w-full rounded-md px-3 py-2 text-sm font-mono transition-colors',
      'min-h-[100px] resize-y bg-gray-50 dark:bg-gray-900',
      'placeholder:text-gray-500 dark:placeholder:text-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
      {
        'border border-gray-300 dark:border-gray-700 dark:text-gray-100': variant === 'default',
        'border-0 bg-transparent dark:text-gray-100': variant === 'ghost',
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
        <textarea
          className={textareaClasses}
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

CodeTextbox.displayName = 'CodeTextbox'