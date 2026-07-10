import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_ENDPOINTS } from '@/utils/appConfig'
import { SEARCH_SUGGESTIONS_LIMIT } from '@/utils/constants'
import type { Category, Product, ProductsResponse } from './types'

// RTK Query API slice for all DummyJSON product endpoints; auto-generates the hooks below.
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    // Full product list; limit=0 returns everything so filtering can happen client-side.
    getProducts: builder.query<ProductsResponse, void>({
      query: () => `${API_ENDPOINTS.products}?limit=0`,
    }),
    // Products for a single category, used for the listing page and "related products".
    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (category) => `${API_ENDPOINTS.productsByCategory(category)}?limit=0`,
    }),
    // Category list for the sidebar's category filter.
    getCategories: builder.query<Category[], void>({
      query: () => API_ENDPOINTS.categories,
    }),
    // Single product lookup for the detail page.
    getProductById: builder.query<Product, number>({
      query: (id) => API_ENDPOINTS.productById(id),
    }),
    // Autocomplete suggestions for the header search bar.
    searchProducts: builder.query<ProductsResponse, string>({
      query: (searchTerm) => `${API_ENDPOINTS.searchProducts(searchTerm)}&limit=${SEARCH_SUGGESTIONS_LIMIT}`,
    }),
  }),
})

// Auto-generated React hooks, one per endpoint above.
export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
} = productsApi
