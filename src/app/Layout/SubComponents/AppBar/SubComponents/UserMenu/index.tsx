import { useEffect, useRef, useState } from 'react'
import { DUMMY_USER } from '@/utils/constants'
import { getInitials } from '@/utils/utilityFunctions'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import Tooltip from '@/components/Tooltip'
import UserAvatar from './SubComponents/UserAvatar'
import UserMenuPanel from './SubComponents/UserMenuPanel'

// Account avatar button that toggles the profile dropdown panel.
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the panel when clicking anywhere outside it.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close the panel on Escape, regardless of which element inside it has focus.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleToggle = () => setIsOpen((previousIsOpen) => !previousIsOpen)
  const handleSignOut = () => setIsOpen(false)

  const initials = getInitials(DUMMY_USER.name)

  return (
    <ErrorBoundary>
      <div ref={menuRef} className="relative z-50">
        <Tooltip text="Your account" align="right">
          <button
            type="button"
            onClick={handleToggle}
            aria-label="User menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <UserAvatar initials={initials} sizeClassName="h-9 w-9 text-sm" />
          </button>
        </Tooltip>

        {isOpen && <UserMenuPanel initials={initials} onSignOut={handleSignOut} />}
      </div>
    </ErrorBoundary>
  )
}

export default UserMenu
