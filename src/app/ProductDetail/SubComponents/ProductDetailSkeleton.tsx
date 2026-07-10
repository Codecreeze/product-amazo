import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

// Pulsing placeholder matching the detail page's image + text layout, shown while it loads.
const ProductDetailSkeleton = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className={`h-72 w-full shrink-0 animate-pulse rounded-lg md:w-72 ${COLORS.skeletonBackground}`} />
        <div className="flex flex-1 flex-col gap-3">
          <div className={`h-7 w-3/4 animate-pulse rounded ${COLORS.skeletonBackground}`} />
          <div className={`h-6 w-24 animate-pulse rounded ${COLORS.skeletonBackground}`} />
          <div className={`h-5 w-32 animate-pulse rounded ${COLORS.skeletonBackground}`} />
          <div className={`h-4 w-full animate-pulse rounded ${COLORS.skeletonBackground}`} />
          <div className={`h-4 w-full animate-pulse rounded ${COLORS.skeletonBackground}`} />
          <div className={`h-4 w-2/3 animate-pulse rounded ${COLORS.skeletonBackground}`} />
          <div className={`h-4 w-1/3 animate-pulse rounded ${COLORS.skeletonBackground}`} />
          <div className={`h-4 w-1/3 animate-pulse rounded ${COLORS.skeletonBackground}`} />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default ProductDetailSkeleton
