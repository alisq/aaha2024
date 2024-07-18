import { useContext, useMemo } from 'react'
import { CLS } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import useLang from '../../hooks/useLang'
import { EVENT } from '../../data/translations'
import TableLabelHead from '../common/tableLabelHead'
import parserServices from '../../services/parserServices'
import EventCell from './eventCell'



const Event = () => {
  const { translations } = useLang(EVENT)
  const { events } = useContext(GlobalContext) ?? {}


  //  TODO examine other memo deps
  const parsedEvents = useMemo(() => parserServices.parseEvents(events), [events])

  return (
    events &&
    <>
      <br /><br />
      <h3 className={CLS.TEXT_CENTER}>
        {translations.headers}
      </h3 >
      <table className={CLS.MEMBERS}>
        <TableLabelHead labels={['title', 'date', 'demands']} />
        <tbody>
          {parsedEvents.map((event, i) => <EventCell key={i} event={event} />)}
        </tbody>
      </table>
    </>
  )
}

export default Event