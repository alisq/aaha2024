import { forwardRef, useEffect, useLayoutEffect, useMemo } from 'react'
import { CLS } from '../../constants/styleConstants'
import contributorData from '../../contributors.json'
import { DEMAND_BODY } from '../../data/translations'
import useLang from '../../hooks/useLang'
import parserServices from '../../services/parserServices'
import DemandCarousel from './demandCarousel'
import DemandData from './demandData'
import DemandMember from './demandMember'
import TableLabelHead from '../common/tableLabelHead'
import Section from '../common/section'
import { useLocation } from 'react-router-dom'
import useLocationChange from '../../hooks/useLangChanged'
import useMergedRef from '../../hooks/useMergedRef'

const DemandBody = forwardRef(function DemandBody({ data }, ref) {
  const { translations } = useLang(DEMAND_BODY)
  const {
    id,
    body,
    title,
    region,
    longSummary,
    activist,
    architect,
    advocate,
    bannerSrc,
    bannerCaption,
    gallery,
    actions,
  } = useMemo(() => parserServices.parseDemand(data), [data])

  const teamMembers = contributorData.filter(member => member.team_id === id)

  const location = useLocation()
  const mergedRef = useMergedRef(ref)
  const locationChangeRef = useLocationChange()

  useLayoutEffect(() => {
    if (!locationChangeRef.current.lang)
      mergedRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [data, location])

  useEffect(() => {
    document.title = `AAHA | ${title}`
    return () => document.title = 'AAHA'
  }, [title])

  return (
    data &&
    <Section
      id={id}
      className={CLS.DEMAND}
      ref={mergedRef}
      title={`${translations.header} ${title}`}
      left={
        <>
          <p>{longSummary}</p>
          <DemandData label={translations.region} value={region} />
          <DemandData label={translations.activist} value={activist} />
          <DemandData label={translations.architect} value={architect} />
          <DemandData label={translations.advocate} value={advocate} />
        </>
      }
      center={
        <>
          <img src={bannerSrc} alt='' />
          <p className={CLS.CAPTION}>{bannerCaption}</p>
          <div>{body}</div>
          <div><DemandCarousel data={gallery} /></div>
        </>
      }
      right={
        <>
          <h3>{translations.takeAction}</h3>
          <ul className={CLS.ACTIONS}>{actions}</ul>
        </>
      }>
      <br /><br />
      <h3 className={CLS.TEXT_CENTER}>{translations.member}</h3>
      <br />
      <table className={CLS.MEMBERS}>
        <TableLabelHead labels={['name', 'org', 'role']} />
        <tbody>
          {teamMembers.map((member, i) => <DemandMember key={i} member={member} />)}
        </tbody>
      </table>
    </Section>
  )
})

export default DemandBody