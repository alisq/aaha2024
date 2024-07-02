import useLang from '../../hooks/useLang'
import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'

const TeamMember = ({ member }) => {

  // const { title, team, organization, organization_links, role, bio } = member[lang]
  const { name, orgName, orgLink, team, role } = member
  console.log(orgName, orgLink)
  return (
    <TableHead>
      <td><strong>{member.name}</strong></td>
      <>
        {/* <td><label>{name}</label></td> */}
        <td>
          <ul className={CLS.ORG_LINKS}>
            {/* {organization.map((org, i) =>
              <li key={i}>
                <Anchor to={organization_links[i]}>
                  {org}
                </Anchor>
              </li>)} */}
            <li>
              <Anchor to={orgLink}>
                {orgName}
              </Anchor>
            </li>
          </ul>
        </td>
        <td className={CLS.SMALL_HALF}>
          <Anchor className={CLS.TEAM_TITLE} to={undefined}>
            {team}
          </Anchor>
        </td>
        <td className={CLS.SMALL_HALF}><label>{role}</label></td>
      </>

    </TableHead>
  )
}

export default TeamMember