import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { COLORS } from '@/utils/colorConstants'
import { useAccentColorClasses } from '@/hooks/useAccentColorClasses'
import { getPaginationRange } from '@/utils/utilityFunctions'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

// Previous/Next buttons plus numbered page buttons (with ellipsis for long ranges).
const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props
  const accent = useAccentColorClasses()

  const handlePrevious = () => onPageChange(Math.max(1, currentPage - 1))
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1))

  // Which page numbers/ellipses to render around the current page.
  const pageItems = getPaginationRange(currentPage, totalPages)

  return (
    <ErrorBoundary>
      <div className="flex flex-wrap items-center justify-center gap-2 py-6">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${COLORS.borderInput} ${COLORS.bodyText} ${COLORS.hoverSurfaceLight}`}
        >
          <FiArrowLeft size={14} />
          Previous
        </button>

        {pageItems.map((pageItem, index) =>
          pageItem === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={`px-1 text-sm ${COLORS.subtleText}`}>
              ...
            </span>
          ) : (
            <button
              key={pageItem}
              type="button"
              onClick={() => onPageChange(pageItem)}
              aria-current={pageItem === currentPage ? 'page' : undefined}
              className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                pageItem === currentPage
                  ? `border-transparent ${accent.primaryBg} ${COLORS.onPrimaryText}`
                  : `${COLORS.borderInput} ${COLORS.bodyText} ${COLORS.hoverSurfaceLight}`
              }`}
            >
              {pageItem}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${COLORS.borderInput} ${COLORS.bodyText} ${COLORS.hoverSurfaceLight}`}
        >
          Next
          <FiArrowRight size={14} />
        </button>
      </div>
    </ErrorBoundary>
  )
}

export default Pagination
