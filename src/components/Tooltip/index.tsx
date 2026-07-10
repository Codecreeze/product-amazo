import type { ReactNode } from 'react'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

type TooltipAlign = 'left' | 'center' | 'right'

interface TooltipProps {
  text: string
  children: ReactNode
  align?: TooltipAlign
}

// Horizontal anchor for each alignment; callers near a screen edge pass 'left'/'right' explicitly.
const ALIGNMENT_CLASSES: Record<TooltipAlign, string> = {
  left: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  right: 'right-0',
}

// Pure CSS hover tooltip (no JS positioning) shown below any wrapped trigger element.
const Tooltip = (props: TooltipProps) => {
  const { text, children, align = 'center' } = props

  return (
    <ErrorBoundary>
      <span className="group relative inline-flex">
        {children}
        <span
          role="tooltip"
          className={`pointer-events-none absolute top-full z-[999] mt-2 max-w-[calc(100vw-1rem)] whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 ${ALIGNMENT_CLASSES[align]} ${COLORS.tooltipBackground} ${COLORS.onPrimaryText}`}
        >
          {text}
        </span>
      </span>
    </ErrorBoundary>
  )
}

export default Tooltip
