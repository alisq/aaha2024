import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'
import { titleCase } from 'title-case'

const TeamMember = ({ member }) => {
  const { name, orgs, team, role } = member
  return (
    <TableHead>
      <td><strong>{name}</strong></td>
      <>
        <td>
          <ul className={CLS.ORG_LINKS}>
            {orgs.map((org, i) =>
              <li key={i}>
                <Anchor to={org.link}>
                  {org.text}
                </Anchor>
              </li>)}
          </ul>
        </td>
        <td className={CLS.SMALL_HALF}>
          <Anchor className={CLS.TEAM_TITLE} to={undefined}>
            {titleCase(team ?? '')}
          </Anchor>
        </td>
        <td className={CLS.SMALL_HALF}><label>{role}</label></td>
      </>

    </TableHead>
  )
}

export default TeamMember