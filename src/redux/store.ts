import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { productsApi } from '@/redux/apis/productsApi'
import filtersReducer from '@/redux/slices/filtersSlice'
import searchReducer from '@/redux/slices/searchSlice'
import uiReducer from '@/redux/slices/uiSlice'
import { ACCENT_COLOR_STORAGE_KEY, SEARCH_HISTORY_STORAGE_KEY, SIDEBAR_OPEN_STORAGE_KEY } from '@/utils/constants'

// Central Redux store combining all feature slices and the RTK Query API cache.
export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    search: searchReducer,
    ui: uiReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
})

// Persist search history, sidebar state, and accent color to localStorage whenever they change.
let previousSearchHistory = store.getState().search.history
let previousIsSidebarOpen = store.getState().ui.isSidebarOpen
let previousAccentColor = store.getState().ui.accentColor
store.subscribe(() => {
  const currentSearchHistory = store.getState().search.history
  if (currentSearchHistory !== previousSearchHistory) {
    previousSearchHistory = currentSearchHistory
    localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(currentSearchHistory))
  }

  const currentIsSidebarOpen = store.getState().ui.isSidebarOpen
  if (currentIsSidebarOpen !== previousIsSidebarOpen) {
    previousIsSidebarOpen = currentIsSidebarOpen
    localStorage.setItem(SIDEBAR_OPEN_STORAGE_KEY, String(currentIsSidebarOpen))
  }

  const currentAccentColor = store.getState().ui.accentColor
  if (currentAccentColor !== previousAccentColor) {
    previousAccentColor = currentAccentColor
    localStorage.setItem(ACCENT_COLOR_STORAGE_KEY, currentAccentColor)
  }
})

// Store-derived types used to type Redux hooks throughout the app.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Pre-typed hooks so components never need to annotate `state`/dispatch manually.
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
