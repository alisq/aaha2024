import { forwardRef, useEffect, useMemo } from 'react'
import CarouselDemand from './carouselDemand'

import contributorData from '../contributors.json'
import MemberDemand from './memberDemand'
import useIsEn from '../hooks/useIsEn'
import parserServices from '../services/parserServices'

const DemandBody = forwardRef(({ data }, ref) => {
  const isEn = useIsEn()

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

  useEffect(() => {
    document.title = `AAHA | ${title}`
    return () => document.title = 'AAHA'
  }, [title])

  return (
    data &&
    <section id={id} className='demand' ref={ref}>
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
            <div><CarouselDemand carouselData={gallery} /></div>
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
            <td><label className='red'>{isEn ? 'name' : 'nom'}</label></td>
            <td><label className='red'>{isEn ? 'organizations' : 'organisme'}</label></td>
            <td><label className='red'>{isEn ? 'role' : 'rôle'}</label></td>
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