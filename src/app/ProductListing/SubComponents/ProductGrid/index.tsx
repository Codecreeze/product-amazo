import type { Product } from '@/redux/apis/types'
import { setPage } from '@/redux/slices/filtersSlice'
import { useAppDispatch } from '@/redux/store'
import { PAGE_SIZE } from '@/utils/constants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import ErrorMessage from '@/components/ErrorMessage'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  isError: boolean
  currentPage: number
  totalPages: number
}

// Renders the product cards + pagination, or a skeleton/error/empty state instead.
const ProductGrid = (props: ProductGridProps) => {
  const { products, isLoading, isError, currentPage, totalPages } = props
  const dispatch = useAppDispatch()

  const handlePageChange = (page: number) => {
    dispatch(setPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <ErrorBoundary>
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </ErrorBoundary>
    )
  }

  if (isError) {
    return (
      <ErrorBoundary>
        <ErrorMessage message="Failed to load products. Please try again." />
      </ErrorBoundary>
    )
  }

  if (products.length === 0) {
    return (
      <ErrorBoundary>
        <ErrorMessage message="No products match the selected filters." />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </ErrorBoundary>
  )
}

export default ProductGrid
