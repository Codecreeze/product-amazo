import { useNavigate } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa'
import { COLORS } from '@/utils/colorConstants'
import { useAccentColorClasses } from '@/hooks/useAccentColorClasses'
import ErrorBoundary from '@/hoc/ErrorBoundary'

// Navigates back one entry in browser history; used on the product detail page.
const BackButton = () => {
  const navigate = useNavigate()
  const accent = useAccentColorClasses()

  const handleBack = () => navigate(-1)

  return (
    <ErrorBoundary>
      <button
        type="button"
        onClick={handleBack}
        className={`mb-4 flex items-center gap-2 text-sm font-medium transition-colors ${COLORS.bodyText} ${accent.primaryTextHover}`}
      >
        <FaArrowLeft />
        Back
      </button>
    </ErrorBoundary>
  )
}

export default BackButton
