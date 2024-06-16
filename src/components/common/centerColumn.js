import { CLS } from '../../constants/styleConstants'
import { joinClasses } from '../../utils/styleUtils'

const CenterColumn = ({ children }) =>
  <div className={joinClasses(CLS.SIX, CLS.COLUMNS)}>
    {children}
  </div>


export default CenterColumn