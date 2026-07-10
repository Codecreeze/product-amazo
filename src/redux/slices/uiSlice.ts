import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ACCENT_COLOR_STORAGE_KEY, SIDEBAR_OPEN_STORAGE_KEY } from '@/utils/constants'
import type { AccentColor } from '@/utils/accentColorConstants'

export type Theme = 'light' | 'dark'

// Global UI state: sidebar visibility, light/dark theme, and the chosen accent color.
export interface UiState {
  isSidebarOpen: boolean
  theme: Theme
  accentColor: AccentColor
}

// Defaults to the OS/browser's preferred color scheme on first load.
const getInitialTheme = (): Theme => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

// Restores whether the sidebar was left open, from localStorage.
const getInitialSidebarState = (): boolean => {
  try {
    return localStorage.getItem(SIDEBAR_OPEN_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

// Restores the previously chosen accent color, defaulting to green.
const getInitialAccentColor = (): AccentColor => {
  try {
    const stored = localStorage.getItem(ACCENT_COLOR_STORAGE_KEY)
    return (stored as AccentColor) ?? 'green'
  } catch {
    return 'green'
  }
}

const initialState: UiState = {
  isSidebarOpen: getInitialSidebarState(),
  theme: getInitialTheme(),
  accentColor: getInitialAccentColor(),
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setAccentColor: (state, action: PayloadAction<AccentColor>) => {
      state.accentColor = action.payload
    },
  },
})

export const { toggleSidebar, closeSidebar, toggleTheme, setAccentColor } = uiSlice.actions
export default uiSlice.reducer
