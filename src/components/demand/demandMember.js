import { Link } from 'react-router-dom'
import useLang from '../../hooks/useLang'
import { CLS } from '../../constants/styleConstants'
import TableHead from '../common/tableHead'

const DemandMember = ({ member }) => {
  const { lang } = useLang()
  const { organization, organization_links, role } = member[lang]

  return (
    <TableHead>
      <td><strong>{member.name}</strong></td>
      <td>
        <ul className={CLS.ORG_LINKS}>
          {organization.map((org, i) =>
            <li key={i}>
              <Link target='_blank' to={organization_links[i]}>
                {org}
              </Link>
            </li>
          )}
        </ul>
      </td>
      <td className={CLS.SMALL_HALF}><label>{role}</label></td>
    </TableHead>
  )
}

export default DemandMember