import TableHead from '../common/tableHead'
import Anchor from '../common/anchor'
import parserServices from '../../services/parserServices'

const Committee = ({ data }) => {
  const { name, bio, link } = parserServices.parseMember(data)

  return (
    <TableHead>
      <td>
        <h5>
          <Anchor to={link}>{name}</Anchor>
        </h5>
      </td>
      <td><div>{bio}</div></td>
    </TableHead>
  )
}

export default Committee