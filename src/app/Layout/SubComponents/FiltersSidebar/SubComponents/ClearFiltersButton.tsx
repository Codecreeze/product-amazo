import { useState } from 'react'
import { MdFilterAltOff } from 'react-icons/md'
import { useAppSelector } from '@/redux/store'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import Tooltip from '@/components/Tooltip'
import ClearFiltersDialog from './ClearFiltersDialog'

// Only visible when a filter is active; opens the confirmation dialog to clear them.
const ClearFiltersButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { categories, brands, minPrice, maxPrice } = useAppSelector((state) => state.filters)

  const hasActiveFilters = categories.length > 0 || brands.length > 0 || minPrice !== null || maxPrice !== null

  const handleOpen = () => setIsDialogOpen(true)
  const handleClose = () => setIsDialogOpen(false)

  if (!hasActiveFilters) {
    return null
  }

  return (
    <ErrorBoundary>
      <Tooltip text="Remove all applied filters" align="right">
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Clear all filters"
          className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${COLORS.iconText} ${COLORS.hoverSurfaceAlt}`}
        >
          <MdFilterAltOff size={16} />
          Clear
        </button>
      </Tooltip>
      <ClearFiltersDialog isOpen={isDialogOpen} onClose={handleClose} />
    </ErrorBoundary>
  )
}

export default ClearFiltersButton
