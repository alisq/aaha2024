import { useContext, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import DemandHeader from './demand/demandHeader'
import Footer from './footer/footer'
import HomeFist from './homeFist'
import Menu from './menu/menu'
import { LANGS } from '../constants/commonConstants'
import useLang from '../hooks/useLang'
import { getUrlParts, updateUrl } from '../utils/urlUtils'
import { validateString } from '../utils/commonUtils'
import { CLS, CSS_ID } from '../constants/styleConstants'
import { MAIN } from '../data/translations'
import { joinClasses } from '../utils/styleUtils'
import Canada from './common/canada'
import Anchor from './common/anchor'
import { DEMAND_FIELDS } from '../constants/apiConstants'
import { GlobalContext } from '../contexts/contexts'

const Main = () => {
  const { demands } = useContext(GlobalContext) ?? {}
  const navigate = useNavigate()
  const location = useLocation()

  const footerRef = useRef()
  const { lang: currentLang, translations } = useLang(MAIN)
  const isEn = currentLang === LANGS[0]

  const handleLangSwitch = lang => {
    if (currentLang !== lang)
      navigate(updateUrl(location, { lang }))
  }

  const handleHeaderClick = id =>
    navigate(`demand/${id}`, { replace: id === getUrlParts(location).content })

  return (
    demands &&
    <>
      <Menu
        navigate={navigate}
        footerRef={footerRef} />
      <HomeFist />
      <div id={CSS_ID.LANG}>
        {LANGS.map((lang, i) =>
          <div
            key={i}
            className={validateString(lang === currentLang, CLS.ACTIVE)}
            onClick={() => handleLangSwitch(lang)} >
            {lang.toLocaleUpperCase()}
          </div>
        )}
      </div>
      <section id={CLS.DEMANDS}>
        <h1 className={CLS.TITLE_TOP}>
          Architects Against Housing Alienation<span className={CLS.EXALT_2}>!</span>
        </h1>
        <div className={joinClasses(CLS.MANIFESTO, currentLang)}>
          <span className={CLS.INTRO}>
            {isEn ?
              <>TO END HOUSING ALIENATION IN <Canada /><br /> WE DEMAND...</> :
              <>POUR METTRE FIN À L’ALIÉNATION DU LOGEMENT AU <Canada />, NOUS DEMANDONS...</>}
          </span>
          {demands?.map((header, i) =>
            <DemandHeader
              key={i}
              title={header.title}
              number={header[DEMAND_FIELDS.NUMBER]}
              exMark={header[DEMAND_FIELDS.EX_MARK]}
              handleClick={() => handleHeaderClick(header[DEMAND_FIELDS.ID])} />)}
        </div>
        <h1 className={CLS.TITLE_BOTTOM}>
          <Anchor to='https://docs.google.com/forms/d/1A4sRDWE8gjoyg1w0XlH9CImhx4BbAv9yCo67JPOkVkc/viewform?edit_requested=true#responses'>
            {translations.bottomTitle}
          </Anchor>
        </h1>
      </section>
      <Outlet />
      <Footer ref={footerRef} />
    </>
  )
}

export default Main