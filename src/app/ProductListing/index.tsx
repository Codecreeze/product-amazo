import { useMemo } from 'react'
import { useAppSelector } from '@/redux/store'
import { FILTERS_DEBOUNCE_MS, PAGE_SIZE } from '@/utils/constants'
import { filterProducts, getTotalPages, paginateProducts } from '@/utils/utilityFunctions'
import { useProductsQuery } from '@/hooks/useProductsQuery'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import ProductGrid from './SubComponents/ProductGrid'

// Product grid page: fetches all products, then filters/paginates them client-side.
const ProductListing = () => {
  const { categories, minPrice, maxPrice, brands, page } = useAppSelector((state) => state.filters)

  // Checkbox filters are debounced so rapid clicking doesn't re-filter on every click.
  const debouncedCategories = useDebounce(categories, FILTERS_DEBOUNCE_MS)
  const debouncedBrands = useDebounce(brands, FILTERS_DEBOUNCE_MS)

  const activeQuery = useProductsQuery()
  const products = useMemo(() => activeQuery.data?.products ?? [], [activeQuery.data])

  // Recompute the filtered list only when products or the (debounced) filters actually change.
  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      categories: debouncedCategories,
      minPrice,
      maxPrice,
      brands: debouncedBrands,
    })

    return filtered ?? []
  }, [products, debouncedCategories, minPrice, maxPrice, debouncedBrands])

  const totalPages = getTotalPages(filteredProducts.length, PAGE_SIZE)
  const paginatedProducts = paginateProducts(filteredProducts, page, PAGE_SIZE)

  return (
    <ErrorBoundary>
      <div className="min-h-[100vh] px-4 py-6 sm:px-6">
        <ProductGrid
          products={paginatedProducts}
          isLoading={activeQuery.isLoading}
          isError={activeQuery.isError}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </ErrorBoundary>
  )
}

export default ProductListing
