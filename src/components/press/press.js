import { useContext, useMemo } from 'react'
import { CLS } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import useLang from '../../hooks/useLang'
import { EVENT } from '../../data/translations'
import TableLabelHead from '../common/tableLabelHead'
import parserServices from '../../services/parserServices'
import PressCell from './pressCell'



const Press = () => {
  const { press } = useContext(GlobalContext) ?? {}


  //  TODO examine other memo deps
  const parsedPress = useMemo(() => parserServices.parsePress(press), [press])
  console.log(parsedPress)

  return (
    press &&
    <>
      <br /><br />
      <h3 className={CLS.TEXT_CENTER}>
        PRESS
      </h3 >
      <table className={CLS.MEMBERS}>
        <TableLabelHead labels={['title', 'date', 'outlet']} />
        <tbody>
          {parsedPress.map((press, i) => <PressCell key={i} data={press} />)}
        </tbody>
      </table>
    </>
  )
}

export default Press