import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useAppSelector } from '@/redux/store'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import AppBar from './SubComponents/AppBar'
import FiltersSidebar from './SubComponents/FiltersSidebar'
import Footer from './SubComponents/Footer'

// Persistent app shell: header, sidebar, routed page content, and footer.
const Layout = () => {
  const theme = useAppSelector((state) => state.ui.theme)
  const location = useLocation()
  // The filters sidebar/menu button only make sense on the listing page.
  const isProductDetailPage = location.pathname.startsWith('/product/')

  // Toggle Tailwind's dark-mode class on <html> whenever the theme changes.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <ErrorBoundary>
      <div className={`flex min-h-screen flex-col ${COLORS.pageBackground}`}>
        <AppBar showMenuButton={!isProductDetailPage} />
        <div className="flex flex-1 pt-[7.5rem] md:pt-16">
          {!isProductDetailPage && <FiltersSidebar />}
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default Layout
