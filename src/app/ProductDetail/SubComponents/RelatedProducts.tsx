import type { Product } from '@/redux/apis/types'
import { COLORS } from '@/utils/colorConstants'
import ProductCard from '@/components/ProductCard'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface RelatedProductsProps {
  products: Product[]
}

// Grid of same-category product cards below the main product; hidden if there are none.
const RelatedProducts = (props: RelatedProductsProps) => {
  const { products } = props

  if (products.length === 0) {
    return null
  }

  return (
    <ErrorBoundary>
      <div className="mb-20 mt-10">
        <h2 className={`mb-4 text-lg font-semibold ${COLORS.headingText}`}>Related Products</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <ErrorBoundary>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default RelatedProducts
