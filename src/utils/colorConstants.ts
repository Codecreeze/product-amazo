// Exact brand hex colors for social icons; kept as raw values since they're passed to react-icons' `color` prop.
export const FACEBOOK_ICON_COLOR = '#1877F2'
// White (X's dark-background wordmark color) since this renders on the footer's dark navy background.
export const X_ICON_COLOR = '#FFFFFF'
export const INSTAGRAM_ICON_COLOR = '#E4405F'
export const YOUTUBE_ICON_COLOR = '#FF0000'
export const LINKEDIN_ICON_COLOR = '#0A66C2'

// Shared Tailwind class strings for every non-accent color used across the app (light/dark aware).
export const COLORS = {
  pageBackground: 'bg-gray-50 dark:bg-gray-900',
  surfaceBackground: 'bg-white dark:bg-gray-800',
  imageBackground: 'bg-white dark:bg-gray-800',
  headerBackground: 'bg-[#131921]',
  headerIconText: 'text-gray-100',
  headerIconHover: 'hover:bg-white/10',
  footerLinksBackground: 'bg-[#232f3e]',
  inputBackground: 'dark:bg-gray-700',
  searchBarBackground: 'bg-white',
  searchBarText: 'text-gray-800',
  searchBarIcon: 'text-gray-500',
  skeletonBackground: 'bg-gray-200 dark:bg-gray-700',
  onPrimaryText: 'text-white',
  tooltipBackground: 'bg-gray-900 dark:bg-gray-700',

  borderDefault: 'border-gray-200 dark:border-gray-800',
  borderSubtle: 'border-gray-200 dark:border-gray-700',
  borderInput: 'border-gray-300 dark:border-gray-700',

  headingText: 'text-gray-900 dark:text-gray-100',
  headingTextStrong: 'text-gray-900 dark:text-white',
  bodyText: 'text-gray-700 dark:text-gray-300',
  bodyTextAlt: 'text-gray-800 dark:text-gray-100',
  mutedText: 'text-gray-600 dark:text-gray-400',
  subtleText: 'text-gray-500 dark:text-gray-400',
  iconText: 'text-gray-600 dark:text-gray-300',
  iconTextSubtle: 'text-gray-500 dark:text-gray-400',

  hoverSurface: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  hoverSurfaceAlt: 'hover:bg-gray-100 dark:hover:bg-gray-700',
  hoverSurfaceLight: 'hover:bg-gray-50 dark:hover:bg-gray-700',
  hoverIconSurface: 'hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-200',

  errorText: 'text-red-600 dark:text-red-400',
  ratingText: 'text-amber-600 dark:text-amber-400',

  footerHeading: 'text-white',
  footerText: 'text-gray-300',
  footerLinkHover: 'hover:text-white hover:underline',
}
