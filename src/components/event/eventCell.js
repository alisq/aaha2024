import useLang from '../../hooks/useLang'
import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'
import { useState } from 'react'

const EventCell = ({ event }) => {
  const { lang } = useLang()
  const { title, date, demands, body, link, locale, img } = event
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <TableHead>
        <td><strong>{title}</strong></td>
        <td>{date}</td>
        <td colSpan='2'>
          {demands.map((demand, i) =>
            <>
              {!!i && <br />}
              <Anchor className={CLS.TEAM_TITLE} key={i}>{demand}</Anchor>
            </>
          )}
        </td>
        <td><button onClick={() => setIsExpanded(prev => !prev)}>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</button></td>
      </TableHead>
      {
        isExpanded &&
        (img || body || link || locale) &&
        <TableHead>
          <td></td>
          <td colSpan='3'>
            {img && <img style={{ maxWidth: '50%' }} src={img} />}
            {body && <div>{body}</div>}
            {locale && <div>{locale}</div>}
            {link && <div><Anchor to={link}>{link}</Anchor></div>}
          </td>
          <td></td>
        </TableHead>}
    </>
  )
}

export default EventCell