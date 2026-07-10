import { FiClock, FiX } from 'react-icons/fi'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import Tooltip from '@/components/Tooltip'

interface SearchHistoryItemProps {
  term: string
  onSelect: (term: string) => void
  onRemove: (term: string) => void
}

// A single past-search row: click to reuse it, or click the X to remove it from history.
const SearchHistoryItem = (props: SearchHistoryItemProps) => {
  const { term, onSelect, onRemove } = props

  const handleSelect = () => onSelect(term)
  const handleRemove = () => onRemove(term)

  return (
    <ErrorBoundary>
      <div
        className={`flex items-center justify-between rounded-lg text-sm transition-colors ${COLORS.bodyText} ${COLORS.hoverSurfaceAlt}`}
      >
        <button
          type="button"
          onClick={handleSelect}
          className="flex min-w-0 flex-1 items-center gap-2 truncate px-3 py-2 text-left"
        >
          <FiClock className={`shrink-0 ${COLORS.iconTextSubtle}`} size={14} />
          <span className="truncate">{term}</span>
        </button>
        <Tooltip text="Remove from history" align="right">
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${term} from search history`}
            className={`mr-2 shrink-0 rounded-full p-1 transition-colors ${COLORS.iconTextSubtle} ${COLORS.hoverIconSurface}`}
          >
            <FiX size={14} />
          </button>
        </Tooltip>
      </div>
    </ErrorBoundary>
  )
}

export default SearchHistoryItem
