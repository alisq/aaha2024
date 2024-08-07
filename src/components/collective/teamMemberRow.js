import { useContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { titleCase } from 'title-case'
import { CLS } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import parserServices from '../../services/parserServices'
import { updateUrl } from '../../utils/urlUtils'
import Anchor from '../common/anchor'

const TeamMemberRow = ({ memberData, hideTeam }) => {
  const { demands } = useContext(GlobalContext) ?? {}
  const location = useLocation()

  const member = useMemo(() =>
    parserServices.parseMember(memberData, demands), [memberData, demands])
  const { name, orgs, team, teamId, role } = member

  return (
    <tr>
      <td><p><strong>{name}</strong></p></td>
      <td>
        <ul className={CLS.ORG_LINKS}>
          {orgs.map((org, i) =>
            <li key={i}><Anchor to={org.link}>{org.name}</Anchor></li>)}
        </ul>
      </td>
      {!hideTeam &&
        <td>
          <Anchor className={CLS.TEAM_TITLE} to={updateUrl(location, { category: 'demand', content: teamId })}>
            {titleCase(team ?? '')}
          </Anchor>
        </td>
      }
      <td><label>{role}</label></td>
    </tr>
  )
}

export default TeamMemberRow