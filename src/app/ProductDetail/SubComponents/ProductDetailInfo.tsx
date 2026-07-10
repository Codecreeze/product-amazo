import type { Product } from '@/redux/apis/types'
import { formatPrice } from '@/utils/utilityFunctions'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import RatingStars from '@/components/RatingStars'

interface ProductDetailInfoProps {
  product: Product
}

// Text column next to the product image: title, price, rating, description, brand, category.
const ProductDetailInfo = (props: ProductDetailInfoProps) => {
  const { product } = props

  return (
    <ErrorBoundary>
      <div className="flex flex-1 flex-col gap-3">
        <h1 className={`text-2xl font-semibold ${COLORS.headingText}`}>{product.title}</h1>
        <p className={`text-xl font-bold ${COLORS.headingTextStrong}`}>{formatPrice(product.price)}</p>
        <RatingStars rating={product.rating} />
        <p className={`text-sm ${COLORS.mutedText}`}>{product.description}</p>
        <p className={`text-sm ${COLORS.bodyText}`}>
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>
        <p className={`text-sm capitalize ${COLORS.bodyText}`}>
          <span className="font-semibold">Category:</span> {product.category}
        </p>
      </div>
    </ErrorBoundary>
  )
}

export default ProductDetailInfo
