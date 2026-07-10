import { COLORS } from '@/utils/colorConstants'
import ErrorBoundary from '@/hoc/ErrorBoundary'

interface FooterLink {
  label: string
  href: string
}

interface FooterLinksColumnProps {
  heading: string
  links: FooterLink[]
}

// One footer column: a heading and its list of dummy links.
const FooterLinksColumn = (props: FooterLinksColumnProps) => {
  const { heading, links } = props

  return (
    <ErrorBoundary>
      <div>
        <h3 className={`mb-3 text-sm font-semibold ${COLORS.footerHeading}`}>{heading}</h3>
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-sm transition-colors ${COLORS.footerText} ${COLORS.footerLinkHover}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ErrorBoundary>
  )
}

export default FooterLinksColumn
