import useLang from '../../hooks/useLang'
import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'
import { useState } from 'react'

const PressCell = ({ data }) => {
  const { lang } = useLang()
  const { title, date, outlet, body, link, isHighlighted, img } = data
  const [isExpanded, setIsExpanded] = useState(isHighlighted)

  return (
    <>
      <TableHead>
        <td><strong>{title}</strong></td>
        <td>{date}</td>
        <td>{outlet}</td>
        <td><button onClick={() => setIsExpanded(prev => !prev)}>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</button></td>
      </TableHead>
      {
        isExpanded &&
        (img || body || link) &&
        <TableHead>
          <td></td>
          <td colSpan='3'>
            {img && <img style={{ maxWidth: '80%' }} src={img} />}
            {body && <div>{body}</div>}
            {link && <div><Anchor to={link}>{link}</Anchor></div>}
          </td>
          <td></td>
        </TableHead>}
    </>
  )
}

export default PressCell