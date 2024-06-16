import { Link } from 'react-router-dom'

const SponsorLogo = ({ to, id, Svg }) =>
  <Link to={to} target='_blank'>
    <Svg className='footerLogo' id={id} />
  </Link>

export default SponsorLogo