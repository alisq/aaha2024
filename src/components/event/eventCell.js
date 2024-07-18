import useLang from '../../hooks/useLang'
import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'
import { useState } from 'react'

const EventCell = ({ data }) => {
  const { lang } = useLang()
  const { title, date, demands, body, link, locale, img } = data
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <TableHead>
        <td style={{ width: '25%' }}><strong>{title}</strong></td>
        <td style={{ width: '15%' }}>{date}</td>
        <td colSpan='2' style={{ width: '25%' }}>
          {demands.map((demand, i) =>
            <>
              {!!i && <br />}
              <Anchor className={CLS.TEAM_TITLE} key={i}>{demand}</Anchor>
            </>
          )}
        </td>
        <td style={{ width: '5%' }}><button onClick={() => setIsExpanded(prev => !prev)}>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</button></td>
      </TableHead>
      {
        isExpanded &&
        (img || body || link || locale) &&
        <TableHead>
          <td style={{ width: '25%' }} />
          <td colSpan='3' style={{ width: '55%' }}>
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