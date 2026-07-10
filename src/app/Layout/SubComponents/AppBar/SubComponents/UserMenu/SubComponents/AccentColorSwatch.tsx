import { CgColorPicker } from 'react-icons/cg'
import type { AccentColor } from '@/utils/accentColorConstants'
import { ACCENT_COLOR_CLASSES } from '@/utils/accentColorConstants'
import { capitalize } from '@/utils/utilityFunctions'
import Tooltip from '@/components/Tooltip'

interface AccentColorSwatchProps {
  color: AccentColor
  isActive: boolean
  onSelect: (color: AccentColor) => void
}

// One circular color option; shows a checkmark-style icon when it's the active accent color.
const AccentColorSwatch = (props: AccentColorSwatchProps) => {
  const { color, isActive, onSelect } = props

  const handleSelect = () => onSelect(color)

  return (
    <Tooltip text={capitalize(color)}>
      <button
        type="button"
        onClick={handleSelect}
        aria-label={`Use ${color} theme color`}
        aria-pressed={isActive}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 ${ACCENT_COLOR_CLASSES[color].swatchBg}`}
      >
        {isActive && <CgColorPicker className="text-white" size={16} />}
      </button>
    </Tooltip>
  )
}

export default AccentColorSwatch
