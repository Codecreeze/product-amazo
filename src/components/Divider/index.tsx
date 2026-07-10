import { COLORS } from '@/utils/colorConstants'

// A plain horizontal rule used to separate sections within a panel.
const Divider = () => {
  return <hr className={`my-4 border-t ${COLORS.borderSubtle}`} />
}

export default Divider
