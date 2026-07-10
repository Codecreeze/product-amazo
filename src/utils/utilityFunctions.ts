import type { Product } from '@/redux/apis/types'

// Active filter values used to narrow down the product list.
export interface ProductFilters {
  categories: string[]
  minPrice: number | null
  maxPrice: number | null
  brands: string[]
}

// Extracts the distinct, sorted list of brands present in a product list.
export const getUniqueBrands = (products: Product[]): string[] => {
  const brands = products.map((product) => product.brand).filter(Boolean)
  return Array.from(new Set(brands)).sort()
}

// Applies category/price/brand filters together (all must match).
export const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
  const { categories, minPrice, maxPrice, brands } = filters

  return products.filter((product) => {
    const meetsCategory = categories.length === 0 || categories.includes(product.category)
    const meetsMinPrice = minPrice === null || product.price >= minPrice
    const meetsMaxPrice = maxPrice === null || product.price <= maxPrice
    const meetsBrand = brands.length === 0 || brands.includes(product.brand)

    return meetsCategory && meetsMinPrice && meetsMaxPrice && meetsBrand
  })
}

// Slices a product list down to just the current page.
export const paginateProducts = (products: Product[], page: number, pageSize: number): Product[] => {
  const start = (page - 1) * pageSize
  return products.slice(start, start + pageSize)
}

// Computes total page count for a given item count and page size (minimum of 1).
export const getTotalPages = (totalItems: number, pageSize: number): number => {
  return Math.max(1, Math.ceil(totalItems / pageSize))
}

// Formats a price as a USD string, e.g. 9.99 -> "$9.99".
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`
}

// Case-insensitive substring filter over any list, given a way to read each item's label.
export const filterBySearchTerm = <T>(items: T[], searchTerm: string, getLabel: (item: T) => string): T[] => {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  if (!normalizedSearchTerm) return items
  return items.filter((item) => getLabel(item).toLowerCase().includes(normalizedSearchTerm))
}

// Builds initials from a full name, e.g. "John Doe" -> "JD".
export const getInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .map((namePart) => namePart[0])
    .join('')
    .toUpperCase()
}

// Uppercases just the first letter of a string.
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Rounds a rating to the nearest 0.5 so displayed ratings are always whole or half numbers.
export const roundToNearestHalf = (value: number): number => {
  return Math.round(value * 2) / 2
}

export type PaginationRangeItem = number | 'ellipsis'

// Builds the list of page numbers/ellipses to render, keeping the current page centered
// and always showing the first and last page for very long page ranges.
export const getPaginationRange = (currentPage: number, totalPages: number): PaginationRangeItem[] => {
  const siblingCount = 1
  const totalPageNumbers = siblingCount * 2 + 5

  // Few enough pages that no ellipsis is needed at all.
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const shouldShowLeftEllipsis = leftSiblingIndex > 2
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1

  // Near the start: show a run of leading pages, then jump to the last page.
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + siblingCount * 2
    const leftRange = Array.from({ length: leftItemCount }, (_, index) => index + 1)
    return [...leftRange, 'ellipsis', totalPages]
  }

  // Near the end: show the first page, then jump straight to a run of trailing pages.
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + siblingCount * 2
    const rightRange = Array.from({ length: rightItemCount }, (_, index) => totalPages - rightItemCount + index + 1)
    return [1, 'ellipsis', ...rightRange]
  }

  // In the middle: first page, ellipsis, a small window around the current page, ellipsis, last page.
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, index) => leftSiblingIndex + index,
  )
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages]
}
