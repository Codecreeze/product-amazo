import { createBrowserRouter } from 'react-router'
import Layout from '@/app/Layout'
import { ProductDetail, ProductListing } from './elements'
import ScrollToTop from './ScrollToTop'

// Wraps the persistent Layout so every navigation also scrolls the window back to the top.
const AppLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Layout />
    </>
  )
}

// adding pathnames with components
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <ProductListing /> },
      { path: 'product/:id', element: <ProductDetail /> },
    ],
  },
])
