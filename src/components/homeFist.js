import { ReactComponent as FistHome } from '../svg/fist-home.svg'
import { useWindowScroll } from '@uidotdev/usehooks'


const HomeFist = () => {
  const [{ y }] = useWindowScroll()
  const handleClick = () => window.scrollTo(({ top: 0, behavior: 'smooth' }))
  return (
    <FistHome
      id='menu-fist'
      style={{ opacity: y > 100 ? '1' : '0' }}
      onClick={handleClick} />
  )
}

export default HomeFist