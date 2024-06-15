import { Link } from 'react-router-dom'
import useLang from '../hooks/useLang'

const MenuLink = ({ page, to, handleClick }) => {
  const lang = useLang()
  return <li><Link to={to} onClick={handleClick}>{page[lang].title}</Link></li>
}

export default MenuLink