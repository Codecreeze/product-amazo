import { COLORS } from '@/utils/colorConstants'
import { useAccentColorClasses } from '@/hooks/useAccentColorClasses'
import ErrorBoundary from '@/hoc/ErrorBoundary'

// Full-area circular spinner, used only for hard refresh / route-chunk loading (see routes/elements.tsx).
const Loader = () => {
  const accent = useAccentColorClasses()

  return (
    <ErrorBoundary>
      <div className="flex min-h-[60vh] items-center justify-center py-16">
        <div
          className={`h-10 w-10 animate-spin rounded-full border-4 ${COLORS.borderSubtle} ${accent.primarySpinnerAccent}`}
        />
      </div>
    </ErrorBoundary>
  )
}

export default Loader
