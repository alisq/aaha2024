import { Link } from 'react-router-dom'
import useLang from '../../hooks/useLang'

const CollectiveCommittee = ({ member }) => {
  const { lang } = useLang()
  const { links, name } = member
  return (
    <tr>
      <td className='sidebearing'></td>
      <td className='hideText'>
        <h5>
          <Link href={links[0]} target='_blank'>{name}</Link>
        </h5>
      </td>
      <td><div className='longText'>{member[lang].bio}</div></td>
      <td className='sidebearing'></td>
    </tr>
  )
}

export default CollectiveCommittee