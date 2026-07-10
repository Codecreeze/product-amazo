import { useParams } from 'react-router'
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from '@/redux/apis/productsApi'
import BackButton from '@/components/BackButton'
import ErrorMessage from '@/components/ErrorMessage'
import { RELATED_PRODUCTS_LIMIT } from '@/utils/constants'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import ProductDetailInfo from './SubComponents/ProductDetailInfo'
import ProductDetailSkeleton from './SubComponents/ProductDetailSkeleton'
import RelatedProducts from './SubComponents/RelatedProducts'
import RelatedProductsSkeleton from './SubComponents/RelatedProductsSkeleton'

// Single product view: main details plus a "Related Products" strip from the same category.
const ProductDetail = () => {
  const params = useParams()
  const productId = Number(params.id)
  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId)
  // Only fetch related products once the main product (and its category) is known.
  const { data: categoryData, isLoading: isRelatedLoading } = useGetProductsByCategoryQuery(product?.category ?? '', {
    skip: !product,
  })

  // Exclude the current product itself from its own "related" list.
  const relatedProducts = (categoryData?.products ?? [])
    .filter((relatedProduct) => relatedProduct.id !== productId)
    .slice(0, RELATED_PRODUCTS_LIMIT)

  return (
    <ErrorBoundary>
      <div className="mx-auto min-h-[100vh] max-w-7xl p-6">
        <BackButton />
        {isLoading && <ProductDetailSkeleton />}
        {isError && <ErrorMessage message="Failed to load product. Please try again." />}
        {product && (
          <>
            <div className="flex flex-col gap-6 md:flex-row">
              <img
                src={product.thumbnail}
                alt={product.title}
                width={288}
                height={288}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className={`h-72 w-full rounded-lg object-contain md:w-72 ${COLORS.imageBackground}`}
              />
              <ProductDetailInfo product={product} />
            </div>
            {isRelatedLoading ? <RelatedProductsSkeleton /> : <RelatedProducts products={relatedProducts} />}
          </>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default ProductDetail
