import { TABLE } from '../../data/translations'
import useLang from '../../hooks/useLang'
import TableLabel from './tableLabel'

const TableLabelHead = ({ labels, hasButton }) => {
  const { translations } = useLang(TABLE)
  return (
    <thead>
      <tr>
        {labels.map((label, i) => <TableLabel key={i} name={translations[label]} />)}
        {hasButton && <td />}
      </tr>
    </thead>
  )
}


export default TableLabelHead