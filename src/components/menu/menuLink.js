import { Link } from 'react-router-dom'

const MenuLink = ({ title, to, handleClick }) =>
  <li><Link to={to} onClick={handleClick}>{title}</Link></li>


export default MenuLink