import { APP_NAME, FOOTER_LEGAL_LINKS, FOOTER_LINK_SECTIONS } from '@/utils/constants'
import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'
import BackToTopButton from './SubComponents/BackToTopButton'
import FooterLinksColumn from './SubComponents/FooterLinksColumn'
import FooterSocialLinks from './SubComponents/FooterSocialLinks'

// Site footer: back-to-top bar, link columns, social icons, and legal links.
const Footer = () => {
  return (
    <ErrorBoundary>
      <footer>
        <BackToTopButton />

        <div className={COLORS.footerLinksBackground}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 lg:grid-cols-4">
            {FOOTER_LINK_SECTIONS.map((section) => (
              <FooterLinksColumn key={section.heading} heading={section.heading} links={section.links} />
            ))}
          </div>

          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 border-t border-white/10 px-6 py-6 sm:flex-row sm:justify-between">
            <span className={`text-lg font-bold ${COLORS.footerHeading}`}>{APP_NAME}</span>
            <FooterSocialLinks />
          </div>

          <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 border-t border-white/10 px-6 py-4 sm:flex-row sm:justify-center sm:gap-6">
            {FOOTER_LEGAL_LINKS.map((legalLink) => (
              <a
                key={legalLink.label}
                href={legalLink.href}
                className={`text-xs transition-colors ${COLORS.footerText} ${COLORS.footerLinkHover}`}
              >
                {legalLink.label}
              </a>
            ))}
          </div>
          <p className={`px-6 pb-6 text-center text-xs ${COLORS.footerText}`}>
            &copy; {new Date().getFullYear()} {APP_NAME}, Inc. This is a demo project, not a real store.
          </p>
        </div>
      </footer>
    </ErrorBoundary>
  )
}

export default Footer
