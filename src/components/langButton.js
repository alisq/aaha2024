import { validateString } from '../utils/commonUtils'

const LangButton = ({ lang, isActive, handleClick }) =>
  <div
    className={validateString(isActive, 'active')}
    onClick={handleClick} >
    {lang.toLocaleUpperCase()}
  </div>


export default LangButton