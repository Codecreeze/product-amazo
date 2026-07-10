import { setPriceRange } from '@/redux/slices/filtersSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import PriceRangeInputs from './PriceRangeInputs'

// Reads/writes the price range in Redux; the actual inputs live in PriceRangeInputs.
const PriceRangeFilter = () => {
  const dispatch = useAppDispatch()
  const { minPrice, maxPrice } = useAppSelector((state) => state.filters)

  const handleApply = (nextMinPrice: number | null, nextMaxPrice: number | null) => {
    dispatch(setPriceRange({ minPrice: nextMinPrice, maxPrice: nextMaxPrice }))
  }

  return (
    <ErrorBoundary>
      <div>
        <h3 className={`mb-2 text-sm font-semibold ${COLORS.headingText}`}>Price Range</h3>
        {/* Keying by the current values remounts the inputs (resetting their local state)
            whenever the price range is cleared externally, without needing an effect. */}
        <PriceRangeInputs
          key={`${minPrice}-${maxPrice}`}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApply={handleApply}
        />
      </div>
    </ErrorBoundary>
  )
}

export default PriceRangeFilter
