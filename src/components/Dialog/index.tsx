import { useEffect, useRef, type ReactNode } from 'react'
import { FiX } from 'react-icons/fi'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import Tooltip from '@/components/Tooltip'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

// Reusable modal: backdrop, centered panel, title bar with close button, and Escape-to-close.
const Dialog = (props: DialogProps) => {
  const { isOpen, onClose, title, children } = props
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null)

  // Move focus into the dialog on open, and back to whatever triggered it once it closes.
  useEffect(() => {
    if (!isOpen) return

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    return () => {
      previouslyFocusedElementRef.current?.focus()
    }
  }, [isOpen])

  // Close on Escape, and keep Tab focus cycling within the dialog while it's open.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <ErrorBoundary>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      >
        {/* Stop propagation so clicks inside the panel don't trigger the backdrop's onClose. */}
        <div
          ref={panelRef}
          tabIndex={-1}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={`w-full max-w-md rounded-xl border p-6 shadow-xl outline-none ${COLORS.borderSubtle} ${COLORS.surfaceBackground}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className={`text-lg font-bold ${COLORS.headingText}`}>{title}</h2>
            <Tooltip text="Close">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className={`rounded-full p-1 transition-colors ${COLORS.iconText} ${COLORS.hoverSurfaceAlt}`}
              >
                <FiX size={18} />
              </button>
            </Tooltip>
          </div>
          {children}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default Dialog
