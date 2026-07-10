import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { SEARCH_HISTORY_LIMIT, SEARCH_HISTORY_STORAGE_KEY } from '@/utils/constants'

// Persisted list of past search terms shown in the search dropdown.
export interface SearchState {
  history: string[]
}

// Reads previously saved search history from localStorage on app start.
const getStoredHistory = (): string[] => {
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as string[]) : []
  } catch {
    return []
  }
}

const initialState: SearchState = {
  history: getStoredHistory(),
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Adds a term to the front of history, de-duping case-insensitively and capping the length.
    addToHistory: (state, action: PayloadAction<string>) => {
      const term = action.payload.trim()
      if (!term) return

      const remainingHistory = state.history.filter((existingTerm) => existingTerm.toLowerCase() !== term.toLowerCase())
      state.history = [term, ...remainingHistory].slice(0, SEARCH_HISTORY_LIMIT)
    },
    // Removes a single term, used by the history row's cross/delete button.
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter((existingTerm) => existingTerm !== action.payload)
    },
  },
})

export const { addToHistory, removeFromHistory } = searchSlice.actions
export default searchSlice.reducer
