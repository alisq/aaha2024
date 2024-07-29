import { CSS_ID } from '../constants/styleConstants'
import { ReactComponent as FistHome } from '../svg/fist-home.svg'
import { useWindowScroll } from '@uidotdev/usehooks'
import { toTop } from '../utils/commonUtils'


const HomeFist = () => {
  const [{ y }] = useWindowScroll()
  return (
    <FistHome
      id={CSS_ID.MENU_FIST}
      style={{ opacity: y > 100 ? '1' : '0' }}
      onClick={toTop} />
  )
}

export default HomeFist