import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface ErrorMessageProps {
  message: string
}

// Centered error text, shown when an API request fails or a filtered list is empty.
const ErrorMessage = (props: ErrorMessageProps) => {
  const { message } = props

  return (
    <ErrorBoundary>
      <div className="flex items-center justify-center py-16">
        <p className={`text-sm font-medium ${COLORS.errorText}`}>{message}</p>
      </div>
    </ErrorBoundary>
  )
}

export default ErrorMessage
