import { useContext, useMemo } from 'react'
import { CLS, CLSES } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import { EVENT } from '../../data/translations'
import useLang from '../../hooks/useLang'
import parserServices from '../../services/parserServices'
import TableLabelHead from '../common/tableLabelHead'
import EventRow from './eventRow'



const Event = () => {
  const { translations } = useLang(EVENT)
  const { events, demands } = useContext(GlobalContext) ?? {}

  const parsedEvents = useMemo(() => parserServices.parseEvents(events, demands), [events, demands])
  return (
    events &&
    <>
      <h3 className={CLSES.SMALL_HEADER}>{translations.header}</h3 >
      <table className={CLS.EVENT_TABLE}>
        <TableLabelHead labels={['eventTitle', 'dateTime', 'locale']} hasButton />
        <tbody>
          {parsedEvents.map((event, i) => <EventRow key={i} data={event} />)}
        </tbody>
      </table>
    </>
  )
}

export default Event