import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface FilterClearCheckboxProps {
  label: string
  checked: boolean
  onChange: () => void
}

// A single labeled checkbox row, reused for each filter type in the Clear Filters dialog.
const FilterClearCheckbox = (props: FilterClearCheckboxProps) => {
  const { label, checked, onChange } = props

  return (
    <ErrorBoundary>
      <label className={`flex cursor-pointer items-center gap-2 text-sm ${COLORS.bodyText}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={`cursor-pointer rounded ${COLORS.borderInput}`}
        />
        {label}
      </label>
    </ErrorBoundary>
  )
}

export default FilterClearCheckbox
