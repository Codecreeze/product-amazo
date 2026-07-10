import { lazy, Suspense, type ComponentType } from 'react'
import Loader from '@/components/Loader'

// Wraps a lazy-loaded page in Suspense so its own chunk shows the spinner while it downloads.
const Loadable = (Component: ComponentType) => {
  const LoadableComponent = () => (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  )
  return LoadableComponent
}

// Code-split page components, one per route.
export const ProductListing = Loadable(lazy(() => import('@/app/ProductListing')))
export const ProductDetail = Loadable(lazy(() => import('@/app/ProductDetail')))
