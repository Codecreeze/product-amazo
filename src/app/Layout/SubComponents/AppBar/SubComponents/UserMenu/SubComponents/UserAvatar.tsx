import { COLORS } from '@/utils/colorConstants'
import { useAccentColorClasses } from '@/hooks/useAccentColorClasses'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface UserAvatarProps {
  initials: string
  sizeClassName: string
}

// Circular initials avatar, reused for both the header toggle button and the panel header.
const UserAvatar = (props: UserAvatarProps) => {
  const { initials, sizeClassName } = props
  const accent = useAccentColorClasses()

  return (
    <ErrorBoundary>
      <div
        className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClassName} ${accent.primaryBg} ${COLORS.onPrimaryText}`}
      >
        {initials}
      </div>
    </ErrorBoundary>
  )
}

export default UserAvatar
