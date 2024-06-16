import TableHead from './tableHead'
import TableLabel from './tableLabel'

const TableLabelHead = ({ names }) =>
  <TableHead>
    {names.map((name, i) => <TableLabel key={i} name={name} />)}
  </TableHead>

export default TableLabelHead