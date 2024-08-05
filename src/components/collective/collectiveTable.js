import _ from 'lodash'
import { forwardRef, useState } from 'react'
import { CLS, CLSES } from '../../constants/styleConstants'
import { joinClasses } from '../../utils/styleUtils'
import Filter from '../common/filter'
import TableLabelHead from '../common/tableLabelHead'

const CollectiveTable = forwardRef(function CollectiveTable({
  className,
  header,
  labels,
  filters,
  rows,
}, ref) {
  const [filterStates, setFilterStates] = useState(!filters ? undefined :
    _.fromPairs(filters.map(filter => [filter.name, ''])))

  const handleFilter = newFilter =>
    setFilterStates({ ...filterStates, ...newFilter })

  return (
    <>
      <h3 ref={ref} className={CLSES.SMALL_HEADER}>{header}</h3>
      {filters &&
        <div className={CLS.TEXT_CENTER}>
          {filters.map(({ name, placeholder, list }, i) =>
            <Filter
              key={i}
              name={name}
              placeholder={placeholder}
              list={list}
              handleFilter={({ target }) => handleFilter({ [name]: target.value })} />)}
        </div>
      }
      <table className={joinClasses(CLS.MEMBERS, className)}>
        {labels && <TableLabelHead labels={labels} />}
        <tbody>{typeof rows === 'function' ? rows(filterStates) : rows}</tbody>
      </table>
    </>
  )
})

export default CollectiveTable