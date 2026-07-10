import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router'
import { FiSearch } from 'react-icons/fi'
import { useSearchProductsQuery } from '@/redux/apis/productsApi'
import { addToHistory, removeFromHistory } from '@/redux/slices/searchSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { SEARCH_DEBOUNCE_MS } from '@/utils/constants'
import { COLORS } from '@/utils/colorConstants'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import SearchDropdown from './SubComponents/SearchDropdown'

// Product search input with autocomplete suggestions and recent-search history.
const SearchBar = () => {
  const [inputValue, setInputValue] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const history = useAppSelector((state) => state.search.history)

  // Only fire the suggestions query after typing pauses.
  const debouncedSearchTerm = useDebounce(inputValue, SEARCH_DEBOUNCE_MS)
  const trimmedSearchTerm = debouncedSearchTerm.trim()

  const { data, isFetching } = useSearchProductsQuery(trimmedSearchTerm, { skip: trimmedSearchTerm.length === 0 })
  const suggestions = data?.products ?? []

  // Close the dropdown when clicking anywhere outside the search bar.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)
  const handleFocus = () => setIsDropdownOpen(true)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim().length > 0) {
      dispatch(addToHistory(inputValue))
    }
    if (event.key === 'Escape') {
      setIsDropdownOpen(false)
    }
  }

  const handleSelectHistory = (term: string) => setInputValue(term)
  const handleRemoveHistory = (term: string) => dispatch(removeFromHistory(term))

  const handleSelectSuggestion = (productId: number) => {
    dispatch(addToHistory(inputValue))
    setInputValue('')
    setIsDropdownOpen(false)
    navigate(`/product/${productId}`)
  }

  // Show history when the box is empty, live suggestions once the user starts typing.
  const showHistory = isDropdownOpen && inputValue.trim().length === 0 && history.length > 0
  const showSuggestions = isDropdownOpen && trimmedSearchTerm.length > 0

  return (
    <ErrorBoundary>
      <div ref={containerRef} role="search" className="relative mx-auto w-full max-w-2xl">
        <div className={`flex items-center gap-2 rounded-md px-4 py-2 ${COLORS.searchBarBackground}`}>
          <FiSearch aria-hidden="true" className={`shrink-0 ${COLORS.searchBarIcon}`} />
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder="Search Products"
            aria-label="Search products"
            aria-expanded={showHistory || showSuggestions}
            className={`w-full bg-transparent text-sm outline-none placeholder:text-gray-400 ${COLORS.searchBarText}`}
          />
        </div>

        {(showHistory || showSuggestions) && (
          <SearchDropdown
            history={showHistory ? history : []}
            suggestions={showSuggestions ? suggestions : []}
            isLoadingSuggestions={showSuggestions && isFetching}
            onSelectHistory={handleSelectHistory}
            onRemoveHistory={handleRemoveHistory}
            onSelectSuggestion={handleSelectSuggestion}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default SearchBar
