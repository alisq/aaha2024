import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'
import { Fragment, useContext, useState } from 'react'
import useLang from '../../hooks/useLang'
import { GlobalContext } from '../../contexts/contexts'

const EventCell = ({ data }) => {
  // console.log(data)
  const { lang } = useLang()
  const { title, date, demands: demandTitles, body, link, locale, img } = data
  const [isExpanded, setIsExpanded] = useState(false)
  const { demands: allDemands } = useContext(GlobalContext) ?? {}

  const demands = allDemands ? demandTitles.map(demand =>
    allDemands.find(dm =>
      dm.title.toLocaleLowerCase() === demand.toLocaleLowerCase())) : undefined
  console.log('demands', demands)
  return (
    <>
      <tbody>
        <td className='borderTop sidebearing'></td>
        <td className='borderTop' width='40%'><h3>{title}</h3></td>
        <td className='borderTop' width='25%'>
          <label className='label--red small'>start:</label> {date}<br />
          <label className='label--red small'>end:</label> {date}
        </td>
        <td className='borderTop' width='30%'>
          {locale && <div>{locale}</div>}
        </td>
        <td className='borderTop' style={{ width: '5%' }}><button onClick={() => setIsExpanded(prev => !prev)}>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</button></td>
        <td className='borderTop sidebearing'></td>
        {
          isExpanded &&
          (img || body || link || locale) &&
          <TableHead>

            <td className='noborder' colSpan='2'>
              {img && <img style={{ maxWidth: '50%' }} src={img} />}

              {link && <div><Anchor to={link}>{link}</Anchor></div>}
              <br />

              {body && <div>{body}</div>}
              {demands.map(({ title, field_demand_id }, i) =>
                <Fragment key={i}>
                  <label className='label--red small'>
                    <Anchor className={CLS.TEAM_TITLE} to={`/${lang}/demand/${field_demand_id}`}>{title}</Anchor>
                  </label> &nbsp;
                </Fragment>
              )}

            </td>

          </TableHead>}

      </tbody>
    </>
  )
}

export default EventCell