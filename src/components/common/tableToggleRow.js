import { useState } from 'react'
import { CLS } from '../../constants/styleConstants'
import { validateString } from '../../utils/commonUtils'

const TableToggleRow = ({ isHighlighted, summary, content }) => {
  const [isExpanded, setIsExpanded] = useState(isHighlighted)

  return (
    <>
      <tr className={validateString(isExpanded, CLS.ROW_EXPANDED)}>
        {summary}
        <td className={CLS.BUTTON_CELL}>
          <div>
            <button onClick={() => setIsExpanded(prev => !prev)}>
              {isExpanded ? 'COLLAPSE' : 'EXPAND'}
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && <tr>{content}</tr>}
    </>
  )
}

export default TableToggleRow