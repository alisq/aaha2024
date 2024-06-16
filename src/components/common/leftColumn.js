import { CLS } from '../../constants/styleConstants'
import { validateString } from '../../utils/commonUtils'
import { joinClasses } from '../../utils/styleUtils'

const LeftColumn = ({ title, children, noSticky }) =>
  <div className={joinClasses(CLS.THREE, CLS.COLUMNS, validateString(!noSticky, CLS.STICKY))}>
    {title && <h2>{title}</h2>}
    {children}
  </div>

export default LeftColumn