import { useMemo } from 'react'
import useLang from '../../hooks/useLang'
import parserServices from '../../services/parserServices'

const CollectiveMember = ({ data }) => {
  // const { lang } = useLang()
  // const { title, bio } = member[lang]
  console.log(data)
  const { name, title, bio, ...rest } = useMemo(() =>
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