import { useState } from 'react'
import { clearBrands, clearCategories, clearPriceRange } from '@/redux/slices/filtersSlice'
import { useAppDispatch } from '@/redux/store'
import { COLORS } from '@/utils/colorConstants'
import Dialog from '@/components/Dialog'
import ClearFiltersActions from './ClearFiltersActions'
import FilterClearCheckbox from './FilterClearCheckbox'

interface ClearFiltersDialogProps {
  isOpen: boolean
  onClose: () => void
}

// Confirms clearing filters, with a checkbox per filter type so the user can opt out of some.
const ClearFiltersDialog = (props: ClearFiltersDialogProps) => {
  const { isOpen, onClose } = props
  const dispatch = useAppDispatch()

  // All three default to checked since "Clear" is the primary action.
  const [clearCategory, setClearCategory] = useState(true)
  const [clearPrice, setClearPrice] = useState(true)
  const [clearBrand, setClearBrand] = useState(true)

  const handleClear = () => {
    if (clearCategory) dispatch(clearCategories())
    if (clearPrice) dispatch(clearPriceRange())
    if (clearBrand) dispatch(clearBrands())
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Clear Filters">
      <p className={`text-sm ${COLORS.mutedText}`}>Are you sure you want to clear all filters?</p>

      <div className="mt-4 flex flex-col gap-2">
        <FilterClearCheckbox
          label="Clear Category Filters"
          checked={clearCategory}
          onChange={() => setClearCategory((previous) => !previous)}
        />
        <FilterClearCheckbox
          label="Clear Price Filters"
          checked={clearPrice}
          onChange={() => setClearPrice((previous) => !previous)}
        />
        <FilterClearCheckbox
          label="Clear Brand Filters"
          checked={clearBrand}
          onChange={() => setClearBrand((previous) => !previous)}
        />
      </div>

      <ClearFiltersActions onCancel={onClose} onClear={handleClear} />
    </Dialog>
  )
}

export default ClearFiltersDialog
