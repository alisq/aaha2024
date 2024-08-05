import { useContext, useMemo } from 'react'
import { CLS, CLSES } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import useLang from '../../hooks/useLang'
import { EVENT } from '../../data/translations'
import TableLabelHead from '../common/tableLabelHead'
import parserServices from '../../services/parserServices'
import EventRow from './eventRow'
import { joinClasses } from '../../utils/styleUtils'



const Event = () => {
  const { translations } = useLang(EVENT)
  const { events } = useContext(GlobalContext) ?? {}

  //  TODO examine other memo deps
  const parsedEvents = useMemo(() => parserServices.parseEvents(events), [events])
  return (
    events &&
    <>
      <h3 className={CLSES.SMALL_HEADER}>{translations.header}</h3 >
      <table className='event-table'>
        <TableLabelHead labels={['eventTitle', 'dateTime', 'locale']} />
        <tbody>
          {parsedEvents.map((event, i) => <EventRow key={i} data={event} />)}
        </tbody>
      </table>
    </>
  )
}

export default Event