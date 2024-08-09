import { useContext } from 'react'
import { CLS } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import { joinClasses } from '../../utils/styleUtils'
import Anchor from '../common/anchor'
import TableToggleRow from '../common/tableToggleRow'
import { DEMAND_FIELDS } from '../../constants/apiConstants'
import { updateUrl } from '../../utils/urlUtils'
import { useLocation } from 'react-router-dom'

const EventRow = ({ data }) => {
  const { title, date, demands: demandTitles, body, link, locale, img } = data
  const { demands: allDemands } = useContext(GlobalContext) ?? {}

  const location = useLocation()
  const demands = allDemands ? demandTitles.map(demand =>
    allDemands.find(dm =>
      dm.title.toLocaleLowerCase() === demand.toLocaleLowerCase())) : undefined

  const dateLabelClass = joinClasses(CLS.LABEL_RED_STATIC, CLS.SMALL)
  return <TableToggleRow
    summary={
      <>
        <td><h3>{title}</h3></td>
        <td>
          <div><label className={dateLabelClass}>start</label> {date}</div>
          <div><label className={dateLabelClass}>end</label> {date}</div>
        </td>
        <td><div>{locale}</div></td>
      </>
    }
    content={
      <>
        <td colSpan='2' className={CLS.SPACED_CONTENT}>
          {img && <img src={img} />}
          {link && <div><Anchor to={link}>Event Link</Anchor></div>}
          {body && <div>{body}</div>}
          <div className={CLS.EVENT_TAGS}>
            {demands.map(({ title, ...rest }, i) =>
              <label className={joinClasses(CLS.LABEL_RED, CLS.SMALL)} key={i}>
                <Anchor className={CLS.TEAM_TITLE} to={updateUrl(location, { category: 'demand', content: rest[DEMAND_FIELDS.ID] })}>{title}</Anchor>
              </label>
            )}
          </div>
        </td>
        <td />
        <td />
      </>
    } />
}

export default EventRow