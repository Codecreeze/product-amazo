import { Link } from 'react-router'
import type { Product } from '@/redux/apis/types'
import { formatPrice } from '@/utils/utilityFunctions'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import RatingStars from '@/components/RatingStars'

interface ProductCardProps {
  product: Product
}

// Clickable product summary card; links to that product's detail page.
const ProductCard = (props: ProductCardProps) => {
  const { product } = props

  return (
    <ErrorBoundary>
      <Link
        to={`/product/${product.id}`}
        className={`flex flex-col rounded-lg border p-4 transition-shadow hover:shadow-lg ${COLORS.borderDefault} ${COLORS.surfaceBackground}`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={160}
          loading="lazy"
          decoding="async"
          className={`mb-3 h-40 w-full rounded-md object-contain ${COLORS.imageBackground}`}
        />
        <h3 className={`mb-1 line-clamp-2 text-sm font-medium ${COLORS.bodyTextAlt}`}>{product.title}</h3>
        <p className={`mb-1 text-lg font-semibold ${COLORS.headingTextStrong}`}>{formatPrice(product.price)}</p>
        <RatingStars rating={product.rating} />
      </Link>
    </ErrorBoundary>
  )
}

export default ProductCard
