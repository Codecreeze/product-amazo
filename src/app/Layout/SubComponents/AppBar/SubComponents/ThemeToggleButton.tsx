import { FiMoon, FiSun } from 'react-icons/fi'
import { toggleTheme } from '@/redux/slices/uiSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import Tooltip from '@/components/Tooltip'

// Sun/moon icon button that flips between light and dark theme.
const ThemeToggleButton = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.ui.theme)

  const handleToggle = () => dispatch(toggleTheme())

  return (
    <ErrorBoundary>
      <Tooltip text={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
        <button
          type="button"
          onClick={handleToggle}
          aria-label="Toggle theme"
          className={`rounded-full p-2 transition-colors ${COLORS.headerIconText} ${COLORS.headerIconHover}`}
        >
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
      </Tooltip>
    </ErrorBoundary>
  )
}

export default ThemeToggleButton
