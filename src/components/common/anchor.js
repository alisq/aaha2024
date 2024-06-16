import { Link } from 'react-router-dom'
import { validateString } from '../../utils/commonUtils'
import { linkIsExternal } from '../../utils/urlUtils'

const Anchor = ({ to, ...props }) =>
  <Link to={to} target={validateString(linkIsExternal(to), '_blank')} {...props} />

export default Anchor