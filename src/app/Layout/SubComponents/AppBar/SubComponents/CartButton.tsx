import { FiShoppingCart } from 'react-icons/fi'
import { COLORS } from '@/utils/colorConstants'
import { useAccentColorClasses } from '@/hooks/useAccentColorClasses'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import Tooltip from '@/components/Tooltip'

// Cart icon with an item-count badge; purely visual placeholder, no cart logic yet.
const CartButton = () => {
  const accent = useAccentColorClasses()

  return (
    <ErrorBoundary>
      <Tooltip text="Cart">
        <button
          type="button"
          aria-label="Cart"
          className={`relative rounded-full p-2 transition-colors ${COLORS.headerIconText} ${COLORS.headerIconHover}`}
        >
          <FiShoppingCart size={20} />
          <span
            className={`absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold ${accent.primaryBg} ${COLORS.onPrimaryText}`}
          >
            0
          </span>
        </button>
      </Tooltip>
    </ErrorBoundary>
  )
}

export default CartButton
