import { forwardRef, useLayoutEffect } from 'react'
import { CLS } from '../../constants/styleConstants'
import useMergedRef from '../../hooks/useMergedRef'
import { joinClasses } from '../../utils/styleUtils'
import CenterColumn from './centerColumn'
import LeftColumn from './leftColumn'
import RightColumn from './rightColumn'

const Section = forwardRef(function Section({
  id,
  className,
  children,
  title,
  left,
  center,
  right
}, ref) {

  const mergedRef = useMergedRef(ref)
  useLayoutEffect(() => {
    mergedRef.current.scrollIntoView({ behavior: 'smooth' })
  }, []) // TODO might need refreshh on data load

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