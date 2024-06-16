import { Link } from 'react-router-dom'
import { CLS } from '../../constants/styleConstants'

const SponsorLogo = ({ to, id, Svg }) =>
  <Link to={to} target='_blank'>
    <Svg className={CLS.FOOTER_LOGO} id={id} />
  </Link>

export default SponsorLogo