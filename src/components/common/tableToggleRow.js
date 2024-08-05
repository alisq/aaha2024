import { useState } from 'react'
import { validateString } from '../../utils/commonUtils'
import { CLS } from '../../constants/styleConstants'

const TableToggleRow = ({ isHighlighted, summary, content }) => {
  const [isExpanded, setIsExpanded] = useState(isHighlighted)

  return (
    <>
      <tr className={validateString(isExpanded, CLS.ROW_EXPANDED)}>
        {summary}
        <td>
          <button onClick={() => setIsExpanded(prev => !prev)}>
            {isExpanded ? 'COLLAPSE' : 'EXPAND'}
          </button>
        </td>
      </tr>
      {isExpanded && <tr>{content}</tr>}
    </>
  )
}

export default TableToggleRow