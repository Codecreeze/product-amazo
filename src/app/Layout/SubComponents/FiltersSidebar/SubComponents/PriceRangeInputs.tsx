import { useState } from 'react'
import { COLORS } from '@/utils/colorConstants'
import { useAccentColorClasses } from '@/hooks/useAccentColorClasses'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface PriceRangeInputsProps {
  minPrice: number | null
  maxPrice: number | null
  onApply: (minPrice: number | null, maxPrice: number | null) => void
}

// Min/Max text inputs with local draft state; only applied to Redux when "Apply" is clicked.
const PriceRangeInputs = (props: PriceRangeInputsProps) => {
  const { minPrice, maxPrice, onApply } = props
  const accent = useAccentColorClasses()

  const [minInput, setMinInput] = useState(minPrice?.toString() ?? '')
  const [maxInput, setMaxInput] = useState(maxPrice?.toString() ?? '')

  const handleApply = () => {
    onApply(minInput === '' ? null : Number(minInput), maxInput === '' ? null : Number(maxInput))
  }

  const inputClassName = `w-full rounded-md border px-2 py-1 text-sm ${COLORS.borderInput} ${COLORS.bodyTextAlt} ${COLORS.inputBackground}`

  return (
    <ErrorBoundary>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          placeholder="Min"
          aria-label="Minimum price"
          value={minInput}
          onChange={(event) => setMinInput(event.target.value)}
          className={inputClassName}
        />
        <span aria-hidden="true" className={COLORS.iconTextSubtle}>
          -
        </span>
        <input
          type="number"
          min={0}
          placeholder="Max"
          aria-label="Maximum price"
          value={maxInput}
          onChange={(event) => setMaxInput(event.target.value)}
          className={inputClassName}
        />
      </div>
      <button
        type="button"
        onClick={handleApply}
        className={`mt-2 w-full rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${accent.primaryBg} ${COLORS.onPrimaryText}`}
      >
        Apply
      </button>
    </ErrorBoundary>
  )
}

export default PriceRangeInputs
