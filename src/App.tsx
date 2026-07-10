import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import { router } from '@/routes'
import { store } from '@/redux/store'

// Composition root: error boundary wraps the Redux provider, which wraps the router.
const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  )
}

export default App
