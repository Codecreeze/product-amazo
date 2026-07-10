import type { ACCENT_COLOR_KEYS } from '@/utils/constants'

export type AccentColor = (typeof ACCENT_COLOR_KEYS)[number]

// One color's full set of Tailwind classes, used wherever the app's "primary" color appears.
export interface AccentColorClasses {
  primaryBg: string
  primaryText: string
  primaryTextHover: string
  primarySpinnerAccent: string
  swatchBg: string
}

// Full literal Tailwind classes for every accent color, so Tailwind's compiler can find them
// even though the actual color used is picked dynamically at runtime.
export const ACCENT_COLOR_CLASSES: Record<AccentColor, AccentColorClasses> = {
  green: {
    primaryBg: 'bg-green-600 hover:bg-green-700',
    primaryText: 'text-green-600 dark:text-green-400',
    primaryTextHover: 'hover:text-green-600 dark:hover:text-green-400',
    primarySpinnerAccent: 'border-t-green-600 dark:border-t-green-500',
    swatchBg: 'bg-green-500',
  },
  teal: {
    primaryBg: 'bg-teal-600 hover:bg-teal-700',
    primaryText: 'text-teal-600 dark:text-teal-400',
    primaryTextHover: 'hover:text-teal-600 dark:hover:text-teal-400',
    primarySpinnerAccent: 'border-t-teal-600 dark:border-t-teal-500',
    swatchBg: 'bg-teal-500',
  },
  orange: {
    primaryBg: 'bg-orange-600 hover:bg-orange-700',
    primaryText: 'text-orange-600 dark:text-orange-400',
    primaryTextHover: 'hover:text-orange-600 dark:hover:text-orange-400',
    primarySpinnerAccent: 'border-t-orange-600 dark:border-t-orange-500',
    swatchBg: 'bg-orange-500',
  },
  purple: {
    primaryBg: 'bg-purple-600 hover:bg-purple-700',
    primaryText: 'text-purple-600 dark:text-purple-400',
    primaryTextHover: 'hover:text-purple-600 dark:hover:text-purple-400',
    primarySpinnerAccent: 'border-t-purple-600 dark:border-t-purple-500',
    swatchBg: 'bg-purple-500',
  },
  blue: {
    primaryBg: 'bg-blue-600 hover:bg-blue-700',
    primaryText: 'text-blue-600 dark:text-blue-400',
    primaryTextHover: 'hover:text-blue-600 dark:hover:text-blue-400',
    primarySpinnerAccent: 'border-t-blue-600 dark:border-t-blue-500',
    swatchBg: 'bg-blue-500',
  },
}
