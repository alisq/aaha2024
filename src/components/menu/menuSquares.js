import { CLS } from '../../constants/styleConstants'
import { joinClasses } from '../../utils/styleUtils'

const MenuSquares = ({ className, handleClick }) => {
  const classes = [
    CLS.TOP_LEFT,
    CLS.TOP_RIGHT,
    CLS.CENTER,
    CLS.BOTTOM_LEFT,
    CLS.BOTTOM_RIGHT
  ]

  return (
    <div id='menu-button'
      onClick={handleClick}
      className={className}>
      {classes.map((className, i) => <div
        key={i}
        className={joinClasses(CLS.MENU_BUTTON_SQUARE, className)} />)}
    </div>
  )
}

export default MenuSquares