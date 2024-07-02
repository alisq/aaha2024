import { CLS } from '../../constants/styleConstants'
import { validateString } from '../../utils/commonUtils'

const DemandHeader = ({ title, handleClick, number, exMark }) => {
  const splitTitle = title.split(' ')

  return (
    <h2 onClick={handleClick}>
      <span className={CLS.NO_BREAK}>
        <span className={CLS.NUM}>
          {number}
        </span>
        {splitTitle[0]}
      </span> {splitTitle.slice(1, -1).join(' ')} <span className={CLS.NO_BREAK}>
        {splitTitle[splitTitle.length - 1]}
        <span className={exMark}>
          {validateString(exMark === '', '!')}
        </span> </span>
    </h2>
  )
}

export default DemandHeader