import React, { useMemo } from 'react'
import { cn } from '@/utils/cn'

export interface AnimatedExpandableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded: boolean
  durationMs?: number
}

export const AnimatedExpandableContainer: React.FC<AnimatedExpandableContainerProps> = ({
  expanded,
  durationMs = 200,
  className,
  style,
  children,
  ...props
}) => {
  const transitionStyle = useMemo(() => ({ transition: `grid-template-rows ${durationMs}ms ease` }), [durationMs])

  return (
    <div
      className={cn('grid overflow-hidden', className)}
      style={{ gridTemplateRows: expanded ? '1fr' : '0fr', ...transitionStyle, ...style }}
      {...props}
    >
      <div className="min-h-0">{children}</div>
    </div>
  )
}
