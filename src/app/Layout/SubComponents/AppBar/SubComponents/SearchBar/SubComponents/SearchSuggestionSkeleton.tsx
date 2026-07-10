import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

// Pulsing placeholder row shown while autocomplete suggestions are loading.
const SearchSuggestionSkeleton = () => {
  return (
    <ErrorBoundary>
      <div className="flex items-center gap-3 rounded-lg px-3 py-2">
        <div className={`h-10 w-10 shrink-0 animate-pulse rounded-md ${COLORS.skeletonBackground}`} />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className={`h-3.5 w-3/4 animate-pulse rounded ${COLORS.skeletonBackground}`} />
          <div className={`h-3 w-1/3 animate-pulse rounded ${COLORS.skeletonBackground}`} />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default SearchSuggestionSkeleton
