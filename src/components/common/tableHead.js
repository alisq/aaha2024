import { CLS } from '../../constants/styleConstants'

const TableHead = ({ children }) =>
  <tr>
    <td className={CLS.SIDEBEARING}></td>
    {children}
    <td className={CLS.SIDEBEARING}></td>
  </tr>

export default TableHead