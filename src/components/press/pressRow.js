import Anchor from '../common/anchor'
import TableToggleRow from '../common/tableToggleRow'

const PressRow = ({ data }) => {
  const { title, date, outlet, body, link, isHighlighted, img } = data

  return (
    <TableToggleRow
      isHighlighted={isHighlighted}
      summary={
        <>
          <td>{link && <h4><Anchor to={link}>{title}</Anchor></h4>}</td>
          <td>{date}</td>
          <td>{outlet}</td>
        </>
      }
      content={
        <>
          <td />
          <td colSpan='2'>
            {img && <img src={img} />}
            {body && <div>{body}</div>}
          </td>
          <td />
        </>
      } />
  )
}

export default PressRow