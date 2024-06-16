import { CLS } from '../../constants/styleConstants'
import Anchor from '../common/anchor'

const SponsorLogo = ({ to, id, Svg }) =>
  <Anchor to={to}>
    <Svg className={CLS.FOOTER_LOGO} id={id} />
  </Anchor>

export default SponsorLogo