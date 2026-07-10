import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

// A single pulsing placeholder row, used while the category list is loading.
const FilterOptionSkeleton = () => {
  return (
    <ErrorBoundary>
      <div className={`h-7 w-full animate-pulse rounded-md ${COLORS.skeletonBackground}`} />
    </ErrorBoundary>
  )
}

export default FilterOptionSkeleton
