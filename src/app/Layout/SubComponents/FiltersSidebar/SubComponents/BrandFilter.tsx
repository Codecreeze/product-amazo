import { useMemo } from 'react'
import type { Product } from '@/redux/apis/types'
import { toggleBrand } from '@/redux/slices/filtersSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getUniqueBrands, filterBySearchTerm } from '@/utils/utilityFunctions'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface BrandFilterProps {
  products: Product[]
  searchTerm: string
}

// Multi-select brand checkboxes, derived from the currently loaded product list.
const BrandFilter = (props: BrandFilterProps) => {
  const { products, searchTerm } = props
  const dispatch = useAppDispatch()
  const selectedBrands = useAppSelector((state) => state.filters.brands)
  const brands = useMemo(() => getUniqueBrands(products), [products])
  const visibleBrands = filterBySearchTerm(brands, searchTerm, (brand) => brand)

  const handleToggle = (brand: string) => dispatch(toggleBrand(brand))

  return (
    <ErrorBoundary>
      <div>
        <h3 className={`mb-2 text-sm font-semibold ${COLORS.headingText}`}>Brand</h3>
        <ul className="flex max-h-52 flex-col gap-1 overflow-y-auto">
          {visibleBrands.map((brand) => (
            <li key={brand}>
              <label className={`flex cursor-pointer items-center gap-2 text-sm ${COLORS.mutedText}`}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleToggle(brand)}
                  className={`cursor-pointer rounded ${COLORS.borderInput}`}
                />
                {brand}
              </label>
            </li>
          ))}
          {visibleBrands.length === 0 && <li className={`text-sm ${COLORS.subtleText}`}>No brands found.</li>}
        </ul>
      </div>
    </ErrorBoundary>
  )
}

export default BrandFilter
