import { forwardRef, useEffect, useMemo } from 'react'
import { CLS } from '../../constants/styleConstants'
import contributorData from '../../contributors.json'
import { DEMAND_BODY } from '../../data/translations'
import useLang from '../../hooks/useLang'
import parserServices from '../../services/parserServices'
import LeftColumn from '../common/leftColumn'
import MidColumn from '../common/midColumn'
import RightColumn from '../common/rightColumn'
import DemandCarousel from './demandCarousel'
import DemandData from './demandData'
import DemandMember from './demandMember'
import TableLabelHead from '../common/tableLabelHead'

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

  useEffect(() => {
    document.title = `AAHA | ${title}`
    return () => document.title = 'AAHA'
  }, [title])

  return (
    data &&
    <section id={id} className={CLS.DEMAND} ref={ref}>
      <div className={CLS.CONTAINER}>
        <div className={CLS.ROW}>
          <LeftColumn title={`${translations.header} ${title}`}>
            <p>{longSummary}</p>
            <DemandData label={translations.region} value={region} />
            <DemandData label={translations.activist} value={activist} />
            <DemandData label={translations.architect} value={architect} />
            <DemandData label={translations.advocate} value={advocate} />
          </LeftColumn>
          <MidColumn>
            <img src={bannerSrc} alt='' />
            <p className={CLS.CAPTION}>{bannerCaption}</p>
            <div>{body}</div>
            <div><DemandCarousel data={gallery} /></div>
          </MidColumn>
          <RightColumn >
            <h3>{translations.takeAction}</h3>
            <ul className={CLS.ACTIONS}>{actions}</ul>
          </RightColumn>
        </div>
      </div>
      <br /><br />
      <h3 className={CLS.TEXT_CENTER}>{translations.member}</h3>
      <br />
      <table className={CLS.MEMBERS}>
        <TableLabelHead labels={['name', 'org', 'role']} />
        <tbody>
          {teamMembers.map((member, i) => <DemandMember key={i} member={member} />)}
        </tbody>
      </table>
    </section>
  )
})

export default DemandBody