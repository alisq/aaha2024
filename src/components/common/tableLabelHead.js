import { TABLE } from '../../data/translations'
import useLang from '../../hooks/useLang'
import TableLabel from './tableLabel'

const TableLabelHead = ({ labels, className }) => {
  const { translations } = useLang(TABLE)
  return (
    <thead>
      <tr className={className}>
        {labels.map((label, i) => <TableLabel key={i} name={translations[label]} />)}
      </tr>
    </thead>
  )
}


export default TableLabelHead