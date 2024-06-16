import parse from 'html-react-parser'
import { forwardRef } from 'react'
import { CLS } from '../constants/styleConstants'
import Collective from './collective/collective'
import LeftColumn from './common/leftColumn'
import MidColumn from './common/midColumn'
import RightColumn from './common/rightColumn'
import Exhibition from './exhibition/exhibition'


const PageBody = forwardRef(function PageBody({ page_id, body, title }, ref) {
  return (
    <section id={page_id} className={CLS.PAGE} ref={ref}>
      <div className={CLS.CONTAINER}>
        <div className={CLS.ROW}>
          <LeftColumn title={title} />
          <MidColumn><div>{parse(body)}</div></MidColumn>
          <RightColumn />
        </div>
      </div>
      {page_id === 'exhibition' ? <Exhibition /> :
        page_id === 'collective' ? <Collective /> : null}
    </section>
  )
})

export default PageBody