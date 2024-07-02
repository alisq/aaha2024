import { CSS_ID } from '../constants/styleConstants'
import { ReactComponent as FistHome } from '../svg/fist-home.svg'
import { useWindowScroll } from '@uidotdev/usehooks'


const HomeFist = () => {
  const [{ y }] = useWindowScroll()
  const handleClick = () => window.scrollTo(({ top: 0, behavior: 'smooth' }))
  return (
    <FistHome
      id={CSS_ID.MENU_FIST}
      style={{ opacity: y > 100 ? '1' : '0' }}
      onClick={handleClick} />
  )
}

export default HomeFist