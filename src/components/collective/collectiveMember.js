import { Link } from 'react-router-dom'
import useLang from '../../hooks/useLang'

const CollectiveMember = ({ member }) => {
  const { lang } = useLang()
  const { title, team, organization, organization_links, role, bio } = member[lang]
  return (
    <tr>
      <td className='sidebearing'></td>
      <td><strong>{member.name}</strong></td>
      {member.category === 'collaborator' ?
        <>
          <td><label>{title}</label></td>
          <td>{bio}</td>
          <td className='sidebearing'></td>
        </> :
        <>
          {title && (<td><label>{title}</label></td>)}
          <td>
            <ul className='orgLinks'>
              {organization.map((org, i) =>
                <li key={i}>
                  <Link target='_blank' to={organization_links[i]}>
                    {org}
                  </Link>
                </li>)}
            </ul>
          </td>
          {member.team_id &&
            <td className='smallHalf'>
              <Link className='teamTitle' to={`/${lang}/demand/${member.team_id}`}>
                {team}
              </Link>
            </td>}
          {role && <td className='smallHalf'><label>{role}</label></td>}
          {bio && <td>{bio}</td>}
          <td className='sidebearing'></td>
        </>
      }
    </tr>
  )
}

export default CollectiveMember