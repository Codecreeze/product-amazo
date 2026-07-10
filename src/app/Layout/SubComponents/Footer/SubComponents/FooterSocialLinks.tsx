import type { IconType } from 'react-icons'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FOOTER_SOCIAL_LINKS } from '@/utils/constants'
import {
  FACEBOOK_ICON_COLOR,
  INSTAGRAM_ICON_COLOR,
  LINKEDIN_ICON_COLOR,
  X_ICON_COLOR,
  YOUTUBE_ICON_COLOR,
} from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import Tooltip from '@/components/Tooltip'

// Maps each social platform key to its react-icons component.
const SOCIAL_ICONS: Record<string, IconType> = {
  facebook: FaFacebook,
  x: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
}

// Maps each social platform key to its real brand color.
const SOCIAL_ICON_COLORS: Record<string, string> = {
  facebook: FACEBOOK_ICON_COLOR,
  x: X_ICON_COLOR,
  instagram: INSTAGRAM_ICON_COLOR,
  youtube: YOUTUBE_ICON_COLOR,
  linkedin: LINKEDIN_ICON_COLOR,
}

// Row of social platform icons, each in its own brand color.
const FooterSocialLinks = () => {
  return (
    <ErrorBoundary>
      <div className="flex items-center gap-4">
        {FOOTER_SOCIAL_LINKS.map((socialLink) => {
          const Icon = SOCIAL_ICONS[socialLink.key]
          return (
            <Tooltip key={socialLink.key} text={socialLink.label}>
              <a href={socialLink.href} aria-label={socialLink.label} className="transition-opacity hover:opacity-80">
                <Icon size={20} color={SOCIAL_ICON_COLORS[socialLink.key]} />
              </a>
            </Tooltip>
          )
        })}
      </div>
    </ErrorBoundary>
  )
}

export default FooterSocialLinks
