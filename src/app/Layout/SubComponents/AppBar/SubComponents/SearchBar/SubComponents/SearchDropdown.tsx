import type { Product } from '@/redux/apis/types'
import { COLORS } from '@/utils/colorConstants'
import { SEARCH_SUGGESTIONS_LIMIT } from '@/utils/constants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import SearchHistoryItem from './SearchHistoryItem'
import SearchSuggestionItem from './SearchSuggestionItem'
import SearchSuggestionSkeleton from './SearchSuggestionSkeleton'

interface SearchDropdownProps {
  history: string[]
  suggestions: Product[]
  isLoadingSuggestions: boolean
  onSelectHistory: (term: string) => void
  onRemoveHistory: (term: string) => void
  onSelectSuggestion: (productId: number) => void
}

// Floating panel below the search input: recent history, live suggestions, or a loading/empty state.
const SearchDropdown = (props: SearchDropdownProps) => {
  const { history, suggestions, isLoadingSuggestions, onSelectHistory, onRemoveHistory, onSelectSuggestion } = props

  const hasNoResults = !isLoadingSuggestions && history.length === 0 && suggestions.length === 0

  return (
    <ErrorBoundary>
      <div
        className={`absolute left-0 right-0 top-12 z-10 max-h-[28rem] overflow-y-auto overflow-x-hidden rounded-xl border p-2 shadow-xl ${COLORS.borderSubtle} ${COLORS.surfaceBackground}`}
      >
        {history.map((term) => (
          <SearchHistoryItem key={term} term={term} onSelect={onSelectHistory} onRemove={onRemoveHistory} />
        ))}
        {suggestions.map((product) => (
          <SearchSuggestionItem key={product.id} product={product} onSelect={onSelectSuggestion} />
        ))}
        {isLoadingSuggestions &&
          Array.from({ length: SEARCH_SUGGESTIONS_LIMIT }).map((_, index) => <SearchSuggestionSkeleton key={index} />)}
        {hasNoResults && <p className={`px-3 py-2 text-sm ${COLORS.subtleText}`}>No results found.</p>}
      </div>
    </ErrorBoundary>
  )
}

export default SearchDropdown
