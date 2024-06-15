import { useLocation } from 'react-router-dom'
import { getUrlParts } from '../utils/urlUtils'
import { LANGS } from '../constants/constants'

const useIsEn = () => {
  const location = useLocation()
  const { lang } = getUrlParts(location)
  return lang === LANGS[0]
}

export default useIsEn