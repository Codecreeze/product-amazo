import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface ClearFiltersActionsProps {
  onCancel: () => void
  onClear: () => void
}

// Cancel/Clear footer buttons for the Clear Filters dialog.
const ClearFiltersActions = (props: ClearFiltersActionsProps) => {
  const { onCancel, onClear } = props

  return (
    <ErrorBoundary>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${COLORS.borderSubtle} ${COLORS.bodyText} ${COLORS.hoverSurfaceLight}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClear}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Clear
        </button>
      </div>
    </ErrorBoundary>
  )
}

export default ClearFiltersActions
