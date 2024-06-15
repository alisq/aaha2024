import { useLocation } from 'react-router-dom'
import { getUrlParts } from '../utils/urlUtils'

const useLang = () => {
  const location = useLocation()
  const { lang } = getUrlParts(location)
  return lang
}

export default useLang