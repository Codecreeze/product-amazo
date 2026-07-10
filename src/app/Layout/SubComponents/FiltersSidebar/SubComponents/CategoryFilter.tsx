import { useGetCategoriesQuery } from '@/redux/apis/productsApi'
import { toggleCategory } from '@/redux/slices/filtersSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { COLORS } from '@/utils/colorConstants'
import { CATEGORY_FILTER_SKELETON_ROWS } from '@/utils/constants'
import { filterBySearchTerm } from '@/utils/utilityFunctions'
import FilterOptionSkeleton from '@/components/FilterOptionSkeleton'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import ClearFiltersButton from './ClearFiltersButton'

interface CategoryFilterProps {
  searchTerm: string
}

// Multi-select category checkboxes, fetched from the API and filtered by the shared search term.
const CategoryFilter = (props: CategoryFilterProps) => {
  const { searchTerm } = props
  const dispatch = useAppDispatch()
  const selectedCategories = useAppSelector((state) => state.filters.categories)
  const { data: categories, isLoading, isError } = useGetCategoriesQuery()

  const handleToggle = (categorySlug: string) => dispatch(toggleCategory(categorySlug))

  const visibleCategories = categories ? filterBySearchTerm(categories, searchTerm, (category) => category.name) : []

  return (
    <ErrorBoundary>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className={`text-sm font-semibold ${COLORS.headingText}`}>Category</h3>
          <ClearFiltersButton />
        </div>
        {isLoading && (
          <div className="flex flex-col gap-1">
            {Array.from({ length: CATEGORY_FILTER_SKELETON_ROWS }).map((_, index) => (
              <FilterOptionSkeleton key={index} />
            ))}
          </div>
        )}
        {isError && <p className={`text-sm ${COLORS.errorText}`}>Failed to load categories</p>}
        {categories && (
          <ul className="custom-scrollbar flex max-h-52 flex-col gap-1 overflow-y-auto">
            {visibleCategories.map((category) => (
              <li key={category.slug}>
                <label className={`flex cursor-pointer items-center gap-2 text-sm capitalize ${COLORS.mutedText}`}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.slug)}
                    onChange={() => handleToggle(category.slug)}
                    className={`cursor-pointer rounded ${COLORS.borderInput}`}
                  />
                  {category.name}
                </label>
              </li>
            ))}
            {visibleCategories.length === 0 && <li className={`text-sm ${COLORS.subtleText}`}>No categories found.</li>}
          </ul>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default CategoryFilter
