import { useMemo } from 'react'
import parserServices from '../../services/parserServices'
import Anchor from '../common/anchor'

const Committee = ({ data }) => {
  const { name, bio, link } = useMemo(() =>
    parserServices.parseMember(data), [data])

  return (
    <tr>
      <td>
        <h5><Anchor to={link}>{name}</Anchor></h5>
      </td>
      <td><div>{bio}</div></td>
    </tr>
  )
}

export default Committee