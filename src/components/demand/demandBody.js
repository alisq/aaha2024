import { forwardRef, useContext, useEffect, useLayoutEffect, useMemo } from 'react'
import { CLS, CLSES } from '../../constants/styleConstants'
import { DEMAND_BODY } from '../../data/translations'
import useLang from '../../hooks/useLang'
import parserServices from '../../services/parserServices'
import DemandCarousel from './demandCarousel'
import DemandData from './demandData'
import TableLabelHead from '../common/tableLabelHead'
import Section from '../common/section'
import { useLocation } from 'react-router-dom'
import useLocationChange from '../../hooks/useLangChanged'
import useMergedRef from '../../hooks/useMergedRef'
import { GlobalContext } from '../../contexts/contexts'
import { MEMBER_FIELDS } from '../../constants/apiConstants'
import TeamMember from '../collective/teamMember'
import Anchor from '../common/anchor'
import { joinClasses } from '../../utils/styleUtils'

const DemandBody = forwardRef(function DemandBody({ data }, ref) {
  const { translations } = useLang(DEMAND_BODY)
  const { members, actions } = useContext(GlobalContext) ?? {}

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
  } = useMemo(() => parserServices.parseDemand(data), [data])

  const teamMembers = members.teamMembers.filter(member =>
    member[MEMBER_FIELDS.DEMAND] === data.nid)
  const demandActions = parserServices.parseActions(actions[parseInt(data.nid) - 1])

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
      // TODO: sALT
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
          <ul className={CLS.ACTIONS}>{
            demandActions.map((action, i) => (
              <li key={i}>
                <Anchor to={action.link}>
                  <label className={CLS.LABEL_RED}>{action.button}</label>
                </Anchor>
                <p>{action.label}</p>
                <em><Anchor className={CLS.SMALL} to={action.link}>{action.link}</Anchor></em>
              </li>
            ))
          }</ul>
        </>
      }>
      <h3 className={CLSES.SMALL_HEADER}>{translations.members}</h3>
      <table className={joinClasses(CLS.MEMBERS, 'team-member-table', 'hide-team')}>
        <TableLabelHead labels={['name', 'org', 'role']} />
        <tbody>
          {teamMembers.map((memberData, i) =>
            <TeamMember key={i} memberData={memberData} hideTeam />)}
        </tbody>
      </table>
    </Section>
  )
})

export default DemandBody