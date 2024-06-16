import Anchor from '../common/anchor'

const MenuLink = ({ title, to, handleClick }) =>
  <li>
    {
      to ? <Anchor to={to} onClick={handleClick}>{title}</Anchor> :
        <span onClick={handleClick}>{title}</span>
    }
  </li>



export default MenuLink