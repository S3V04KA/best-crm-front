import React from 'react'

export interface CircularProgessBarProps extends React.SVGAttributes<SVGElement> {
  size?: number
  strokeWidth?: number
  progress: number // 0..100
}

export const CircularProgessBar: React.FC<CircularProgessBarProps> = ({
  size = 48,
  strokeWidth = 6,
  progress,
  ...props
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} {...props}>
      <circle
        stroke="#E5E7EB"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="#3B82F6"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  )
}
