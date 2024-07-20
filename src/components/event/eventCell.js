import useLang from '../../hooks/useLang'
import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'
import { useState } from 'react'

const EventCell = ({ data }) => {
  console.log(data)
  const { lang } = useLang()
  const { title, date, demands, body, link, locale, img } = data
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <tbody>
        <td className="borderTop sidebearing"></td>
        <td className="borderTop" width="40%"><h3>{title}</h3></td>
        <td className="borderTop" width="25%">
          <label className="label--red small">start:</label> {date}<br />
          <label className="label--red small">end:</label> {date}
        </td>
        <td className="borderTop" width="30%">
          {locale && <div>{locale}</div>}
        </td>
        <td className="borderTop" style={{ width: '5%' }}><button onClick={() => setIsExpanded(prev => !prev)}>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</button></td>
        <td className="borderTop sidebearing"></td>
        {
          isExpanded &&
          (img || body || link || locale) &&
          <TableHead>
            
            <td className="noborder" colSpan="2">
              {img && <img style={{ maxWidth: '50%' }} src={img} />}
  
              {link && <div><Anchor to={link}>{link}</Anchor></div>}
              <br />
              
              {body && <div>{body}</div>}
              {demands.map((demand, i) =>
                <>
                  <label className="label--red small">
                    
                    <Anchor className={CLS.TEAM_TITLE} key={i}>{demand}</Anchor>
                  </label> &nbsp;
                </>
              )}
            
            </td>
            
          </TableHead>}
        
      </tbody>
    </>
  )
}

export default EventCell