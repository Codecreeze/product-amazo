import { Link } from 'react-router'
import { APP_NAME } from '@/utils/constants'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

// App name/logo in the header; links back to the home page.
const AppLogo = () => {
  return (
    <ErrorBoundary>
      <Link to="/" className={`shrink-0 text-xl font-bold tracking-tight ${COLORS.headerIconText}`}>
        {APP_NAME}
      </Link>
    </ErrorBoundary>
  )
}

export default AppLogo
