import { TABLE } from '../../data/translations'
import useLang from '../../hooks/useLang'
import TableHead from './tableHead'
import TableLabel from './tableLabel'

/**
 *
 * @component
 * @param {Object} props
 * @param {("name" | "role" | "bio" | "org" | "team")[]} props.labels
 * @returns {JSX.Element}
 *
 */

const TableLabelHead = ({ labels }) => {
  const { translations } = useLang(TABLE)
  return (
    <thead>
      <TableHead>
        {labels.map((label, i) => <TableLabel key={i} name={translations[label]} />)}
      </TableHead>
    </thead>
  )
}


export default TableLabelHead