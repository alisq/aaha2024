import { Link } from 'react-router-dom'

const DemandMember = ({ member }) => {
  const { name, organization, organization_links, role } = member
  return (
    <tr>
      <td className='sidebearing'></td>
      <td><strong>{name}</strong></td>
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

export default DemandMember