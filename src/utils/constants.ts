// Displayed in the header logo and footer branding; change here to rebrand the whole app.
export const APP_NAME = 'Amagoz'

// Products shown per page in the listing grid.
export const PAGE_SIZE = 12

// Number of stars rendered by RatingStars.
export const MAX_RATING_STARS = 5

// Dummy signed-in user shown in the profile menu (no real auth in this app).
export const DUMMY_USER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
}

// Delay before the search bar's autocomplete query fires after the user stops typing.
export const SEARCH_DEBOUNCE_MS = 300

// Minimum gap kept between a tooltip and the viewport edge.
export const TOOLTIP_VIEWPORT_MARGIN_PX = 8

// Delay before category/brand checkbox selections are applied to the product grid.
export const FILTERS_DEBOUNCE_MS = 400

// Max number of past search terms kept in history.
export const SEARCH_HISTORY_LIMIT = 8

// Max number of autocomplete suggestions fetched per search.
export const SEARCH_SUGGESTIONS_LIMIT = 6

// localStorage keys used to persist state across sessions.
export const SEARCH_HISTORY_STORAGE_KEY = 'search-history'
export const SIDEBAR_OPEN_STORAGE_KEY = 'sidebar-open'
export const ACCENT_COLOR_STORAGE_KEY = 'accent-color'

// Number of same-category products shown in "Related Products".
export const RELATED_PRODUCTS_LIMIT = 8

// Number of placeholder rows shown while categories are loading.
export const CATEGORY_FILTER_SKELETON_ROWS = 6

// Valid accent color choices for the theme color picker.
export const ACCENT_COLOR_KEYS = ['green', 'teal', 'orange', 'purple', 'blue'] as const

// Dummy footer link columns (About/Careers/etc.) — content only, no real destinations.
export const FOOTER_LINK_SECTIONS = [
  {
    heading: 'Get to Know Us',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press Releases', href: '#' },
      { label: 'Product Amazo Cares', href: '#' },
    ],
  },
  {
    heading: 'Make Money with Us',
    links: [
      { label: 'Sell on Product Amazo', href: '#' },
      { label: 'Become an Affiliate', href: '#' },
      { label: 'Advertise Your Products', href: '#' },
      { label: 'Self-Publish with Us', href: '#' },
    ],
  },
  {
    heading: 'Payment Products',
    links: [
      { label: 'Business Card', href: '#' },
      { label: 'Shop with Points', href: '#' },
      { label: 'Reload Your Balance', href: '#' },
      { label: 'Currency Converter', href: '#' },
    ],
  },
  {
    heading: 'Let Us Help You',
    links: [
      { label: 'Your Account', href: '#' },
      { label: 'Returns Centre', href: '#' },
      { label: 'Shipping Rates & Policies', href: '#' },
      { label: 'Help', href: '#' },
    ],
  },
]

// Social platform links shown in the footer, each rendered with its own brand color.
export const FOOTER_SOCIAL_LINKS = [
  { key: 'facebook', label: 'Facebook', href: '#' },
  { key: 'x', label: 'X', href: '#' },
  { key: 'instagram', label: 'Instagram', href: '#' },
  { key: 'youtube', label: 'YouTube', href: '#' },
  { key: 'linkedin', label: 'LinkedIn', href: '#' },
]

// Legal links shown in the footer's bottom bar.
export const FOOTER_LEGAL_LINKS = [
  { label: 'Conditions of Use', href: '#' },
  { label: 'Privacy Notice', href: '#' },
  { label: 'Interest-Based Ads', href: '#' },
]
