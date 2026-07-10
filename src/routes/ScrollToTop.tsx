import { useEffect } from 'react'
import { useLocation } from 'react-router'

// Scrolls to the top of the page whenever the route changes (browser doesn't do this by default).
const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return null
}

export default ScrollToTop
