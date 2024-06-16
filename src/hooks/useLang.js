import { useLocation } from 'react-router-dom'
import { getUrlParts } from '../utils/urlUtils'
import { LANGS } from '../constants/constants'
import { mapObject } from '../utils/commonUtils'

const useLang = translations => {
  const location = useLocation()
  const { lang } = getUrlParts(location)
  return {
    lang,
    translations: translations ?
      mapObject(translations, (_, value) =>
        value[LANGS.indexOf(lang)]
      ) : undefined
  }
}

export default useLang