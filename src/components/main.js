import { useRef } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import DemandHeader from './demand/demandHeader'
import Footer from './footer/footer'
import HomeFist from './homeFist'
import Menu from './menu/menu'
import { LANGS } from '../constants/commonConstants'
import demandData from '../demands.json'
import useLang from '../hooks/useLang'
import { getUrlParts, updateUrl } from '../utils/urlUtils'
import { validateString } from '../utils/commonUtils'
import { CLS } from '../constants/styleConstants'
import { MAIN } from '../data/translations'
import { joinClasses } from '../utils/styleUtils'
import Canada from './common/canada'

const Main = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const footerRef = useRef(null)
  const { lang: currentLang, translations } = useLang(MAIN)
  const isEn = currentLang === LANGS[0]

  const handleLangSwitch = lang => {
    if (currentLang !== lang)
      navigate(updateUrl(location, 'lang', lang))
  }

  const handleHeaderClick = header =>
    navigate(`demand/${header.demand_id}`, { replace: header.demand_id === getUrlParts(location).content })

  return (
    <>
      <Menu
        navigate={navigate}
        footerRef={footerRef} />
      <HomeFist />
      <div id='lang'>
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
          {demandData.map((header, i) =>
            <DemandHeader {...header}
              key={i}
              data={header[currentLang]}
              handleClick={() => { handleHeaderClick(header) }} />)}
        </div>
        <h1 className={CLS.TITLE_BOTTOM}>
          <Link to='https://docs.google.com/forms/d/1A4sRDWE8gjoyg1w0XlH9CImhx4BbAv9yCo67JPOkVkc/viewform?edit_requested=true#responses' target='_blank'>
            {translations.bottomTitle}
          </Link>
        </h1>
      </section>
      <Outlet />
      <Footer ref={footerRef} />
    </>
  )
}

export default Main