import Anchor from '../common/anchor'

const MenuLink = ({ title, to, handleClick }) =>
  <li>
    <Anchor to={to} onClick={handleClick}>{title}</Anchor>
  </li>



export default MenuLink