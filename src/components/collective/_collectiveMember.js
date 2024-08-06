import useLang from '../../hooks/useLang'
import { CLS } from '../../constants/styleConstants'
import Anchor from '../common/anchor'

// TODO: merge
const CollectiveMember = ({ member }) => {
  const { lang } = useLang()
  const { title, team, organization, organization_links, role, bio } = member[lang]
  console.log(member.category !== 'collaborator')
  return (
    <tr>
      <td><p><strong>{member.name}</strong></p></td>
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
            <td>
              <Anchor className={CLS.TEAM_TITLE} to={`/${lang}/demand/${member.team_id}`}>
                {team}
              </Anchor>
            </td>}
          {role && <td><label>{role}</label></td>}
          {bio && <td>{bio}</td>}
        </>
      }
    </tr>
  )
}

export default CollectiveMember