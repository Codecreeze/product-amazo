// Base URL for the DummyJSON product API.
export const API_BASE_URL = 'https://dummyjson.com'

// Centralized endpoint paths so the API URL structure lives in one place.
export const API_ENDPOINTS = {
  products: '/products',
  categories: '/products/categories',
  productsByCategory: (category: string) => `/products/category/${category}`,
  productById: (id: number) => `/products/${id}`,
  searchProducts: (searchTerm: string) => `/products/search?q=${encodeURIComponent(searchTerm)}`,
}
