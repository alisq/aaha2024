import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

const Action = ({ action }) => {
  const { link, label, body } = action
  return (
    <li>
      <Link to={link} target='_blank'>
        <label className='label--red'>
          {label}
        </label>
      </Link>
      {parse(body)}
    </li>
  )
}

export default Action