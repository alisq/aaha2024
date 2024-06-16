import { CLS } from '../../constants/styleConstants'

const TableLabel = ({ name }) =>
  <td><label className={CLS.RED}>{name}</label></td>

export default TableLabel