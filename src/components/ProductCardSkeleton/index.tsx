import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

// Pulsing placeholder matching ProductCard's layout, shown while products are loading.
const ProductCardSkeleton = () => {
  return (
    <ErrorBoundary>
      <div className={`flex flex-col rounded-lg border p-4 ${COLORS.borderDefault} ${COLORS.surfaceBackground}`}>
        <div className={`mb-3 h-40 w-full animate-pulse rounded-md ${COLORS.skeletonBackground}`} />
        <div className={`mb-2 h-4 w-3/4 animate-pulse rounded ${COLORS.skeletonBackground}`} />
        <div className={`mb-2 h-5 w-1/3 animate-pulse rounded ${COLORS.skeletonBackground}`} />
        <div className={`h-4 w-1/2 animate-pulse rounded ${COLORS.skeletonBackground}`} />
      </div>
    </ErrorBoundary>
  )
}

export default ProductCardSkeleton
