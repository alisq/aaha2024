import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'
import { titleCase } from 'title-case'
import { updateUrl } from '../../utils/urlUtils'
import { useLocation } from 'react-router-dom'
import parserServices from '../../services/parserServices'
import { useContext, useMemo } from 'react'
import { GlobalContext } from '../../contexts/contexts'

const StudentActivist = ({ memberData, hideTeam }) => {
  const { demands } = useContext(GlobalContext) ?? {}

  const member = useMemo(() =>
    parserServices.parseMember(memberData, demands), [memberData, demands])
  const { name, orgs, team, teamId, role } = member

  const location = useLocation()
  return (
    <TableHead>
      <td><strong>{name}</strong></td>
      <td>
        <ul className={CLS.ORG_LINKS}>
          {orgs.map((org, i) =>
            <li key={i}>
              <Anchor to={org.link}>
                {org.name}
              </Anchor>
            </li>)}
        </ul>
      </td>
      {!hideTeam &&
        <td className={CLS.SMALL_HALF}>
          <Anchor className={CLS.TEAM_TITLE} to={updateUrl(location, { category: 'demand', content: teamId })}>
            {titleCase(team ?? '')}
          </Anchor>
        </td>
      }
      <td className={CLS.SMALL_HALF}><label>{role}</label></td>
    </TableHead>
  )
}

export default StudentActivist