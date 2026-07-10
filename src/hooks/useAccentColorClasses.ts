import { useAppSelector } from '@/redux/store'
import { ACCENT_COLOR_CLASSES } from '@/utils/accentColorConstants'

// Returns the current accent color's Tailwind class set, so components stay in sync with the picker.
export const useAccentColorClasses = () => {
  const accentColor = useAppSelector((state) => state.ui.accentColor)
  return ACCENT_COLOR_CLASSES[accentColor]
}
