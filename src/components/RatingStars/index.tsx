import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { MAX_RATING_STARS } from '@/utils/constants'
import { COLORS } from '@/utils/colorConstants'
import { roundToNearestHalf } from '@/utils/utilityFunctions'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface RatingStarsProps {
  rating: number
}

// Star icons plus the numeric rating, rounded to the nearest half so stars and text always agree.
const RatingStars = (props: RatingStarsProps) => {
  const { rating } = props

  const roundedRating = roundToNearestHalf(rating)
  const fullStars = Math.floor(roundedRating)
  const hasHalfStar = roundedRating - fullStars >= 0.5
  const emptyStars = MAX_RATING_STARS - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <ErrorBoundary>
      <div
        role="img"
        aria-label={`Rated ${roundedRating} out of ${MAX_RATING_STARS}`}
        className={`flex items-center gap-1 ${COLORS.ratingText}`}
      >
        <span aria-hidden="true" className="flex items-center gap-1">
          {Array.from({ length: fullStars }).map((_, index) => (
            <FaStar key={`full-${index}`} />
          ))}
          {hasHalfStar && <FaStarHalfAlt key="half" />}
          {Array.from({ length: emptyStars }).map((_, index) => (
            <FaRegStar key={`empty-${index}`} />
          ))}
        </span>
        <span aria-hidden="true" className={`ml-1 text-sm ${COLORS.mutedText}`}>
          {roundedRating}
        </span>
      </div>
    </ErrorBoundary>
  )
}

export default RatingStars
