import type { Product } from '@/redux/apis/types'
import { formatPrice } from '@/utils/utilityFunctions'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface SearchSuggestionItemProps {
  product: Product
  onSelect: (productId: number) => void
}

// A single matching product row in the search dropdown; click navigates to its detail page.
const SearchSuggestionItem = (props: SearchSuggestionItemProps) => {
  const { product, onSelect } = props

  const handleSelect = () => onSelect(product.id)

  return (
    <ErrorBoundary>
      <button
        type="button"
        onClick={handleSelect}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${COLORS.hoverSurfaceAlt}`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
          className={`h-10 w-10 shrink-0 rounded-md object-contain ${COLORS.imageBackground}`}
        />
        <div className="min-w-0 flex-1">
          <p className={`truncate text-sm font-medium ${COLORS.bodyTextAlt}`}>{product.title}</p>
          <p className={`text-xs ${COLORS.subtleText}`}>{formatPrice(product.price)}</p>
        </div>
      </button>
    </ErrorBoundary>
  )
}

export default SearchSuggestionItem
