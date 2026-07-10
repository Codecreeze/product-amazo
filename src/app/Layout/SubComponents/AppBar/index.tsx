import { FiMenu } from 'react-icons/fi'
import { toggleSidebar } from '@/redux/slices/uiSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import Tooltip from '@/components/Tooltip'
import AppLogo from './SubComponents/AppLogo'
import CartButton from './SubComponents/CartButton'
import SearchBar from './SubComponents/SearchBar'
import ThemeToggleButton from './SubComponents/ThemeToggleButton'
import UserMenu from './SubComponents/UserMenu'

interface AppBarProps {
  showMenuButton: boolean
}

// Top navigation bar: menu toggle, logo, search (inline on desktop, its own row below on mobile), and account icons.
const AppBar = (props: AppBarProps) => {
  const { showMenuButton } = props
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen)

  const handleToggleSidebar = () => dispatch(toggleSidebar())

  return (
    <ErrorBoundary>
      <header className="fixed inset-x-0 top-0 z-20">
        <div className={`flex h-16 items-center justify-between gap-4 px-4 ${COLORS.headerBackground}`}>
          <div className="flex min-w-0 items-center gap-3">
            {showMenuButton && (
              <Tooltip text="Toggle sidebar" align="left">
                <button
                  type="button"
                  onClick={handleToggleSidebar}
                  aria-label="Toggle sidebar"
                  aria-expanded={isSidebarOpen}
                  className={`shrink-0 rounded-full p-2 transition-colors ${COLORS.headerIconText} ${COLORS.headerIconHover}`}
                >
                  <FiMenu size={20} />
                </button>
              </Tooltip>
            )}
            <AppLogo />
          </div>

          <div className="hidden min-w-0 flex-1 md:block">
            <SearchBar />
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <CartButton />
            <ThemeToggleButton />
            <UserMenu />
          </div>
        </div>

        {/* Below md breakpoint the search bar drops to its own full-width row. */}
        <div className={`border-t px-4 py-2 md:hidden ${COLORS.pageBackground} ${COLORS.borderDefault}`}>
          <SearchBar />
        </div>
      </header>
    </ErrorBoundary>
  )
}

export default AppBar
