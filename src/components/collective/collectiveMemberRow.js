import { useMemo } from 'react'
import parserServices from '../../services/parserServices'

const CollectiveMember = ({ data }) => {
  const { name, title, bio } = useMemo(() =>
    parserServices.parseMember(data), [data])
  return (
    <tr>
      <td><p><strong>{name}</strong></p></td>
      <td><label>{title}</label></td>
      <td>{bio}</td>
    </tr>
  )
}

export default CollectiveMember