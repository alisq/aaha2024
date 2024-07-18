import { CLS } from '../../constants/styleConstants'

const TableHead = ({ children, ...props }) =>
  <tr {...props}>
    <td className={CLS.SIDEBEARING}></td>
    {children}
    <td className={CLS.SIDEBEARING}></td>
  </tr>

export default TableHead