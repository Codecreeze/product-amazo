import { setAccentColor } from '@/redux/slices/uiSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { ACCENT_COLOR_KEYS } from '@/utils/constants'
import { COLORS } from '@/utils/colorConstants'
import type { AccentColor } from '@/utils/accentColorConstants'
import AccentColorSwatch from './AccentColorSwatch'

// Row of 5 color swatches in the profile menu for choosing the app's accent color.
const AccentColorPicker = () => {
  const dispatch = useAppDispatch()
  const accentColor = useAppSelector((state) => state.ui.accentColor)

  const handleSelect = (color: AccentColor) => dispatch(setAccentColor(color))

  return (
    <div className="mt-4">
      <p className={`mb-2 text-xs font-semibold uppercase tracking-wide ${COLORS.subtleText}`}>Theme Color</p>
      <div className="flex items-center gap-2">
        {ACCENT_COLOR_KEYS.map((color) => (
          <AccentColorSwatch key={color} color={color} isActive={color === accentColor} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  )
}

export default AccentColorPicker
