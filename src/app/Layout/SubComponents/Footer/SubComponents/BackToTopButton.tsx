import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

// Scrolls the page back to the top; sits at the very top of the footer.
const BackToTopButton = () => {
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <ErrorBoundary>
      <button
        type="button"
        onClick={handleClick}
        className={`w-full py-4 text-center text-sm transition-colors ${COLORS.footerLinksBackground} ${COLORS.footerText} ${COLORS.footerLinkHover}`}
      >
        Back to top
      </button>
    </ErrorBoundary>
  )
}

export default BackToTopButton
