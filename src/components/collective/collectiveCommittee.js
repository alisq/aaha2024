import useLang from '../../hooks/useLang'
import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'

const CollectiveCommittee = ({ member }) => {
  const { lang } = useLang()
  const { links, name } = member
  return (
    <TableHead>
      <td>
        <h5>
          <Anchor to={links[0]}>{name}</Anchor>
        </h5>
      </td>
      <td><div>{member[lang].bio}</div></td>
    </TableHead>
  )
}

export default CollectiveCommittee