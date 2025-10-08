import React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/utils/cn'

export interface AvatarProps extends AvatarPrimitive.AvatarProps {
  children: React.ReactNode
}

export interface AvatarImageProps extends AvatarPrimitive.AvatarImageProps {}

export interface AvatarFallbackProps extends AvatarPrimitive.AvatarFallbackProps {
  children: React.ReactNode
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-gray-200',
      className
    )}
    {...props}
  />
))

Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))

AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-800 text-sm font-medium',
      className
    )}
    {...props}
  />
))

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
