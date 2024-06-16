import { forwardRef, useEffect, useMemo } from 'react'
import DemandCarousel from './demandCarousel'
import contributorData from '../../contributors.json'
import { DEMAND_BODY } from '../../data/translations'
import useLang from '../../hooks/useLang'
import parserServices from '../../services/parserServices'
import TableHeader from '../common/tableHead'
import DemandMember from './demandMember'
import DemandData from './demandData'

const DemandBody = forwardRef(({ data }, ref) => {
  const { lang, translations } = useLang(DEMAND_BODY)
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
            <h2>{translations.header} {title}</h2>
            <p>{longSummary}</p>
            <DemandData label={translations.region} value={region} />
            <DemandData label={translations.activist} value={activist} />
            <DemandData label={translations.architect} value={architect} />
            <DemandData label={translations.advocate} value={advocate} />
          </div>
          <div className='six columns'>
            <img src={bannerSrc} alt='' />
            <p className='caption'>{bannerCaption}</p>
            <div>{body}</div>
            <div><DemandCarousel data={gallery} /></div>
          </div>
          <div className='action-bar three columns sticky-bottom white-bg'>
            <h3>{translations.takeAction}</h3>
            <ul className='actions'>{actions}</ul>
          </div>
        </div>
      </div>
      <br /><br />
      <h3 className='textCenter'>{translations.member}</h3>
      <br />
      <table className='members'>
        <thead>
          <tr>
            <td className='sidebearing'></td>
            <TableHeader name={translations.memberName} />
            <TableHeader name={translations.memberOrg} />
            <TableHeader name={translations.memberRole} />
            <td className='sidebearing'></td>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, i) => <DemandMember key={i} member={member[lang]} />)}
        </tbody>
      </table>
    </section>
  )
})

export default DemandBody