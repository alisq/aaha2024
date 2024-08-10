import { useContext, useMemo } from 'react'
import { CLS, CLSES } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import useLang from '../../hooks/useLang'
import { PRESS } from '../../data/translations'
import TableLabelHead from '../common/tableLabelHead'
import parserServices from '../../services/parserServices'
import PressRow from './pressRow'
import { joinClasses } from '../../utils/styleUtils'


const Press = () => {
  const { translations } = useLang(PRESS)
  const { press } = useContext(GlobalContext) ?? {}
  const parsedPress = useMemo(() => parserServices.parsePress(press), [press])
  return (
    press &&
    <>
      <h3 className={CLSES.SMALL_HEADER}>
        {translations.header}
      </h3>
      <table className={joinClasses(CLS.MEMBERS, CLS.PRESS_TABLE)}>
        <TableLabelHead labels={['title', 'date', 'outlet']} hasButton />
        <tbody>
          {parsedPress.map((press, i) => <PressRow key={i} data={press} />)}
        </tbody>
      </table>
    </>
  )
}

export default Press