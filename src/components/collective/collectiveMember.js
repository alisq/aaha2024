import useLang from '../../hooks/useLang'
import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'

const CollectiveMember = ({ member }) => {
  const { lang } = useLang()
  const { title, team, organization, organization_links, role, bio } = member[lang]
  return (
    <TableHead>
      <td><strong>{member.name}</strong></td>
      {member.category === 'collaborator' ?
        <>
          <td><label>{title}</label></td>
          <td>{bio}</td>
        </> :
        <>
          {title && (<td><label>{title}</label></td>)}
          <td>
            <ul className={CLS.ORG_LINKS}>
              {organization.map((org, i) =>
                <li key={i}>
                  <Anchor to={organization_links[i]}>
                    {org}
                  </Anchor>
                </li>)}
            </ul>
          </td>
          {member.team_id &&
            <td className={CLS.SMALL_HALF}>
              <Anchor className={CLS.TEAM_TITLE} to={`/${lang}/demand/${member.team_id}`}>
                {team}
              </Anchor>
            </td>}
          {role && <td className={CLS.SMALL_HALF}><label>{role}</label></td>}
          {bio && <td>{bio}</td>}
        </>
      }
    </TableHead>
  )
}

export default CollectiveMember