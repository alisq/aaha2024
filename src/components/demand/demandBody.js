import { forwardRef, useContext, useEffect, useLayoutEffect, useMemo } from 'react'
import { CLS } from '../../constants/styleConstants'
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


  console.log(bannerCaption)

  const teamMembers = members.teamMembers.filter(member =>
    member[MEMBER_FIELDS.DEMAND] === data.nid)
  const demandActions = parserServices.parseActions(actions[parseInt(data.nid) - 1])
  console.log(demandActions)

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
          <ul className={CLS.ACTIONS}>{
            demandActions.map((action, i) => (
              <li className="action" key={i}>
                <Anchor to={action.link}>
                  <label className={CLS.LABEL_RED}>{action.button}</label>
                </Anchor><br />
                {action.label}<br />
                [<em><a className="small" href="{action.link}">{action.link.replace('https://','').replace('http://','').replace('www.','')}</a></em>]
                
              </li>
            ))
          }</ul>
        </>
      }>
      <br /><br />
      <h3 className={CLS.TEXT_CENTER}>{translations.member}</h3>
      <br />
      <table className={CLS.MEMBERS}>
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