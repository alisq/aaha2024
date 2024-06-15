import { Link } from 'react-router-dom'
import useLang from '../hooks/useLang'

const MemberDemand = ({ member }) => {
  const lang = useLang()
  const { organization, organization_links, role } = member[lang]
  return (
    <tr>
      <td className='sidebearing'></td>
      <td><strong>{member.name}</strong></td>
      <td>
        <ul className='orgLinks'>
          {organization.map((org, i) =>
            <li key={i}>
              <Link target='_blank' to={organization_links[i]}>
                {org}
              </Link>
            </li>
          )}
        </ul>
      </td>
      <td className='smallHalf'><label>{role}</label></td>
      <td className='sidebearing'></td>
    </tr>
  )
}

export default MemberDemand