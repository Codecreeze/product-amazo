import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Payload for setting both ends of the price range at once.
export interface PriceRange {
  minPrice: number | null
  maxPrice: number | null
}

// All active product-listing filters, plus the current pagination page.
export interface FiltersState {
  categories: string[]
  minPrice: number | null
  maxPrice: number | null
  brands: string[]
  page: number
}

// No filters applied and page 1 by default.
const initialState: FiltersState = {
  categories: [],
  minPrice: null,
  maxPrice: null,
  brands: [],
  page: 1,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Add/remove a single category from the multi-select filter; resets pagination.
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload
      state.categories = state.categories.includes(category)
        ? state.categories.filter((existingCategory) => existingCategory !== category)
        : [...state.categories, category]
      state.page = 1
    },
    // Applied via the Price Range "Apply" button; resets pagination.
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.minPrice = action.payload.minPrice
      state.maxPrice = action.payload.maxPrice
      state.page = 1
    },
    // Add/remove a single brand from the multi-select filter; resets pagination.
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload
      state.brands = state.brands.includes(brand)
        ? state.brands.filter((existingBrand) => existingBrand !== brand)
        : [...state.brands, brand]
      state.page = 1
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    // Individual "clear" actions used by the Clear Filters dialog's checkboxes.
    clearCategories: (state) => {
      state.categories = []
      state.page = 1
    },
    clearPriceRange: (state) => {
      state.minPrice = null
      state.maxPrice = null
      state.page = 1
    },
    clearBrands: (state) => {
      state.brands = []
      state.page = 1
    },
    resetFilters: () => initialState,
  },
})

export const {
  toggleCategory,
  setPriceRange,
  toggleBrand,
  setPage,
  clearCategories,
  clearPriceRange,
  clearBrands,
  resetFilters,
} = filtersSlice.actions
export default filtersSlice.reducer
