import { FiLogOut } from 'react-icons/fi'
import { DUMMY_USER } from '@/utils/constants'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import AccentColorPicker from './AccentColorPicker'
import UserAvatar from './UserAvatar'

interface UserMenuPanelProps {
  initials: string
  onSignOut: () => void
}

// Profile dropdown content: user info, accent color picker, and sign out.
const UserMenuPanel = (props: UserMenuPanelProps) => {
  const { initials, onSignOut } = props

  return (
    <ErrorBoundary>
      <div
        className={`absolute right-0 top-12 w-64 rounded-xl border p-4 shadow-xl ${COLORS.borderSubtle} ${COLORS.surfaceBackground}`}
      >
        <div className="flex items-center gap-3">
          <UserAvatar initials={initials} sizeClassName="h-12 w-12 text-base" />
          <div className="min-w-0">
            <p className={`truncate text-sm font-semibold ${COLORS.headingText}`}>{DUMMY_USER.name}</p>
            <p className={`truncate text-xs ${COLORS.subtleText}`}>{DUMMY_USER.email}</p>
          </div>
        </div>

        <AccentColorPicker />

        <button
          type="button"
          onClick={onSignOut}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition-colors ${COLORS.borderSubtle} ${COLORS.bodyText} ${COLORS.hoverSurfaceLight}`}
        >
          <FiLogOut size={16} />
          Sign Out
        </button>
      </div>
    </ErrorBoundary>
  )
}

export default UserMenuPanel
