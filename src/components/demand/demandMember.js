import { CLS } from '../../constants/styleConstants'
import useLang from '../../hooks/useLang'
import Anchor from '../common/anchor'
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
              <Anchor to={organization_links[i]}>
                {org}
              </Anchor>
            </li>
          )}
        </ul>
      </td>
      <td className={CLS.SMALL_HALF}><label>{role}</label></td>
    </TableHead>
  )
}

export default DemandMember