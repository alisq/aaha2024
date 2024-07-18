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
        <td style={{ width: '25%' }}><strong>{title}</strong></td>
        <td style={{ width: '15%' }}>{date}</td>
        <td style={{ width: '25%' }}>{outlet}</td>
        <td style={{ width: '5%' }}><button onClick={() => setIsExpanded(prev => !prev)}>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</button></td>
      </TableHead>
      {
        isExpanded &&
        (img || body || link) &&
        <TableHead>
          <td style={{ width: '25%' }} />
          <td colSpan='2' style={{ width: '55%' }}>
            {img && <img style={{ maxWidth: '80%' }} src={img} />}
            {body && <div>{body}</div>}
            {link && <div><Anchor to={link}>{link}</Anchor></div>}
          </td>
          <td />
        </TableHead>}
    </>
  )
}

export default PressCell