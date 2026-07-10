import { useGetProductsQuery } from '@/redux/apis/productsApi'

// Shared "active product list" query used by both the listing page and the sidebar's brand filter.
export const useProductsQuery = () => {
  return useGetProductsQuery()
}
