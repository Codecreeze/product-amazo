import { COLORS } from '@/utils/colorConstants'
import { RELATED_PRODUCTS_LIMIT } from '@/utils/constants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'

// Pulsing placeholder grid shown while the "Related Products" query is loading.
const RelatedProductsSkeleton = () => {
  return (
    <ErrorBoundary>
      <div className="mb-20 mt-10">
        <div className={`mb-4 h-6 w-40 animate-pulse rounded ${COLORS.skeletonBackground}`} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: RELATED_PRODUCTS_LIMIT }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default RelatedProductsSkeleton
