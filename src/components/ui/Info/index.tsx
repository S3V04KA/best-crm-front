import React from 'react'
import { Info as InfoIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface InfoProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'neutral' | 'primary' | 'warning' | 'destructive'
  children: React.ReactNode
}

const toneStyles: Record<NonNullable<InfoProps['tone']>, string> = {
  neutral: 'bg-gray-50 text-gray-700 border-gray-200',
  primary: 'bg-primary-50 text-primary-800 border-primary-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  destructive: 'bg-destructive-50 text-destructive-800 border-destructive-200',
}

export const Info: React.FC<InfoProps> = ({ className, tone = 'neutral', children, ...props }) => (
  <div
    className={cn('flex items-start gap-2 rounded-md border px-3 py-2 text-sm', toneStyles[tone], className)}
    {...props}
  >
    <InfoIcon className="mt-0.5 h-4 w-4 opacity-70" />
    <div>{children}</div>
  </div>
)
