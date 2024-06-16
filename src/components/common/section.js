import { forwardRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CLS } from '../../constants/styleConstants'
import useLocationChange from '../../hooks/useLangChanged'
import useMergedRef from '../../hooks/useMergedRef'
import { joinClasses } from '../../utils/styleUtils'
import CenterColumn from './centerColumn'
import LeftColumn from './leftColumn'
import RightColumn from './rightColumn'

const Section = forwardRef(function PageBody({
  id, className, children, title, left, center, right
}, ref) {
  const location = useLocation()
  const mergedRef = useMergedRef(ref)
  const locationChangeRef = useLocationChange()

  useLayoutEffect(() => {
    if (!locationChangeRef.current.lang)
      mergedRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [location])
  return (
    <section id={id} className={joinClasses(CLS.PAGE, className)} ref={mergedRef}>
      <div className={CLS.CONTAINER}>
        <div className={CLS.ROW}>
          <LeftColumn title={title}>{left}</LeftColumn>
          <CenterColumn>{center}</CenterColumn>
          <RightColumn>{right}</RightColumn>
        </div>
      </div>
      {children}
    </section>
  )
})

export default Section