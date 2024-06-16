import { CLS } from '../../constants/styleConstants'
import { joinClasses } from '../../utils/styleUtils'

const RightColumn = ({ children }) =>
  <div className={joinClasses(
    CLS.ACTION_BAR,
    CLS.THREE,
    CLS.COLUMNS,
    CLS.STICKY_BOTTOM,
    CLS.WHITE_BG)}>
    {children}
  </div>

export default RightColumn