import { CLS } from '../../constants/styleConstants'
import { validateString } from '../../utils/commonUtils'

const DemandHeader = ({ data, handleClick, field_demand_no, field_exmark, demand_id }) => {
  const splitTitle = data.title.split(' ')

  return (
    <h2 onClick={() => handleClick(demand_id)}>
      <span className={CLS.NO_BREAK}>
        <span className={CLS.NUM}>
          {field_demand_no}
        </span>
        {splitTitle[0]}
      </span> {splitTitle.slice(1, -1).join(' ')} <span className={CLS.NO_BREAK}>
        {splitTitle[splitTitle.length - 1]}
        <span className={field_exmark}>
          {validateString(field_exmark === '', '!')}
        </span> </span>
    </h2>
  )
}

export default DemandHeader