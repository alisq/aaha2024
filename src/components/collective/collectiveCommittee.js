import { Link } from 'react-router-dom'
import useLang from '../../hooks/useLang'
import TableHead from '../common/tableHead'

const CollectiveCommittee = ({ member }) => {
  const { lang } = useLang()
  const { links, name } = member
  return (
    <TableHead>
      <td>
        <h5>
          <Link href={links[0]} target='_blank'>{name}</Link>
        </h5>
      </td>
      <td><div>{member[lang].bio}</div></td>
    </TableHead>
  )
}

export default CollectiveCommittee