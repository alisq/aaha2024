import parse from 'html-react-parser'
import { forwardRef, useContext, useEffect, useMemo } from 'react'
import Action from './action'
import CarouselDemand from './carouselDemand'

import contributorData from '../contributors.json'
import MemberDemand from './memberDemand'
import useIsEn from '../hooks/useIsEn'
import useLang from '../hooks/useLang'
import { GlobalContext } from '../contexts/contexts'
import parserServices from '../services/parserServices'

const DemandBody = forwardRef(({ nid, demand_id, gallery }, ref) => {
  const isEn = useIsEn()
  const lang = useLang()

  const demandData = useContext(GlobalContext)?.demands[lang].find(demand => nid + 1 === parseInt(demand.nid))
  const {
    body,
    title,
    region,
    longSummary,
    activist,
    architect,
    advocate,
    bannerSrc,
    bannerCaption,
    actions,
  } = useMemo(() => parserServices.parseDemand(demandData), [demandData])

  const teamMembers = contributorData.filter(member => member.team_id === demand_id)

  useEffect(() => {
    document.title = `AAHA | ${title}`
    return () => document.title = 'AAHA'
  }, [title])

  return (
    demandData &&
    <section id={demand_id} className='demand' ref={ref}>
      <div className='container'>
        <div className='row'>
          <div className='three columns sticky'>
            <h2>{isEn ? 'We Demand' : 'Nous demandons'} {title}</h2>
            <p>{longSummary}</p>
            <p><label>{isEn ? 'REGION:' : 'Région : '}</label> {region}</p>
            {activist &&
              <p><label>{isEn ? 'Activist:' : 'Activiste : '}</label> {activist}</p>}
            {architect &&
              <p><label>{isEn ? 'Architect:' : 'Architecte : '}</label> {architect}</p>}
            {advocate &&
              <p><label>{isEn ? 'Advocate:' : 'Défenseur : '}</label> {advocate}</p>}
          </div>
          <div className='six columns'>
            <img src={bannerSrc} alt='' />
            <p className='caption'>{bannerCaption}</p>
            <div>{body}</div>
            <div><CarouselDemand carouselImages={gallery} /></div>
          </div>
          <div className='action-bar three columns sticky-bottom white-bg'>
            <h3>{isEn ? 'TAKE ACTION:' : "PASSONS À L'ACTION : "}</h3>
            <ul className='actions'>{actions}</ul>
          </div>
        </div>
      </div>
      <br /><br />
      <h3 className='textCenter'>{isEn ? 'TEAM MEMBERS' : 'MEMBRES DE L’ÉQUIPE'}</h3>
      <br />
      <table className='members'>
        <thead>
          <tr>
            <td className='sidebearing'></td>
            <td><label className='red'>{isEn ? 'name' : 'Nom'}</label></td>
            <td><label className='red'>{isEn ? 'organizations' : 'Organisme'}</label></td>
            <td><label className='red'>{isEn ? 'role' : 'Rôle'}</label></td>
            <td className='sidebearing'></td>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, i) => <MemberDemand key={i} member={member} />)}
        </tbody>
      </table>
    </section>
  )
})

export default DemandBody