// Shape of a single product as returned by the DummyJSON API.
export interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  brand: string
  category: string
  thumbnail: string
}

// Paginated response wrapper returned by the products list/search/category endpoints.
export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// A single product category, as returned by the categories endpoint.
export interface Category {
  slug: string
  name: string
  url: string
}
