import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { closeSidebar } from '@/redux/slices/uiSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { COLORS } from '@/utils/colorConstants'
import { useProductsQuery } from '@/hooks/useProductsQuery'
import Divider from '@/components/Divider'
import Tooltip from '@/components/Tooltip'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import BrandFilter from './SubComponents/BrandFilter'
import CategoryFilter from './SubComponents/CategoryFilter'
import PriceRangeFilter from './SubComponents/PriceRangeFilter'

// Category/price/brand filters. Overlay drawer below 1200px, static inline panel above it.
const FiltersSidebar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen)
  const dispatch = useAppDispatch()
  const { data } = useProductsQuery()
  const products = data?.products ?? []

  const handleClose = () => dispatch(closeSidebar())

  // Auto-close the mobile drawer if the window is widened past the desktop breakpoint while
  // it's open. Only checks width (not height) so the on-screen keyboard opening on mobile —
  // which fires a resize event too — doesn't also close it.
  useEffect(() => {
    const handleResize = () => {
      if (isSidebarOpen && window.innerWidth >= 1200) {
        dispatch(closeSidebar())
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarOpen, dispatch])

  // Close the mobile drawer on Escape.
  useEffect(() => {
    if (!isSidebarOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closeSidebar())
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSidebarOpen, dispatch])

  if (!isSidebarOpen) {
    return null
  }

  return (
    <ErrorBoundary>
      <div onClick={handleClose} aria-hidden="true" className="fixed inset-0 z-30 bg-black/40 min-[1200px]:hidden" />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 shrink-0 border-r shadow-xl min-[1200px]:static min-[1200px]:inset-auto min-[1200px]:z-10 min-[1200px]:min-h-[100vh] min-[1200px]:shadow-none ${COLORS.borderDefault} ${COLORS.surfaceBackground}`}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden p-4 min-[1200px]:sticky min-[1200px]:top-16 min-[1200px]:h-auto min-[1200px]:max-h-[calc(100vh-4rem)]">
          {/* Title + close button only needed in the mobile overlay drawer, not the desktop panel. */}
          <div className="mb-4 flex items-center justify-between min-[1200px]:hidden">
            <h2 className={`text-lg font-bold ${COLORS.headingText}`}>Filters</h2>
            <Tooltip text="Close filters" align="right">
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close filters"
                className={`rounded-full p-1 transition-colors ${COLORS.iconText} ${COLORS.hoverSurfaceAlt}`}
              >
                <FiX size={18} />
              </button>
            </Tooltip>
          </div>

          {/* One search box filters both the category and brand lists below. */}
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search categories & brands"
            aria-label="Search categories and brands"
            className={`w-full rounded-md border px-2 py-1 text-sm ${COLORS.borderInput} ${COLORS.bodyTextAlt}`}
          />
          <Divider />

          <CategoryFilter searchTerm={searchTerm} />
          <Divider />
          <PriceRangeFilter />
          <Divider />
          <BrandFilter products={products} searchTerm={searchTerm} />
        </div>
      </aside>
    </ErrorBoundary>
  )
}

export default FiltersSidebar
