import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Утилита для объединения классов Tailwind CSS
 * Использует clsx для условных классов и tailwind-merge для правильного слияния Tailwind классов
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
