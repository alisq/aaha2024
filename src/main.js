import { useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import DemandHeader from './components/demandHeader'
import Footer from './components/footer'
import HomeFist from './components/homeFist'
import LangButton from './components/langButton'
import Menu from './components/menu'
import { LANGS } from './constants/constants'
import demandData from './demands.json'
import useLang from './hooks/useLang'
import { getUrlParts, updateUrl } from './utils/urlUtils'

const Main = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const footerRef = useRef(null)
  const currentLang = useLang()

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
          <LangButton
            lang={lang}
            isActive={lang === currentLang}
            handleClick={() => handleLangSwitch(lang)}
            key={i} />)}
      </div>
      <section id='demands'>
        <h1 className='title-top'>Architects Against Housing Alienation<span className='exAlt2'>!</span></h1>
        <div className={'manifesto ' + currentLang}>
          <span className='intro'>
            {currentLang === 'en' ? <>TO END HOUSING ALIENATION IN c<span className='red'>\</span>a<span className='red'>\</span>n<span className='red'>\</span>a<span className='red'>\</span>d<span className='red'>\</span>a<br /> WE DEMAND...</> :
              <>POUR METTRE FIN À L’ALIÉNATION DU LOGEMENT AU c<span className='red'>\</span>a<span className='red'>\</span>n<span className='red'>\</span>a<span
                className='red'>\</span>d<span className='red'>\</span>a, NOUS DEMANDONS…</>}
          </span>
          {demandData.map((header, i) =>
            <DemandHeader {...header}
              key={i}
              data={header[currentLang]}
              handleClick={() => { handleHeaderClick(header) }} />)}
        </div>
        <h1 className='title-bottom'><a href='https://docs.google.com/forms/d/1A4sRDWE8gjoyg1w0XlH9CImhx4BbAv9yCo67JPOkVkc/viewform?edit_requested=true#responses' target='blank'>
          {currentLang === 'en' ?
            'Join The Campaign' :
            'Rejoindre la campagne'}
        </a></h1>

      </section>

      <Outlet />
      <Footer ref={footerRef} />
    </>
  )
}

export default Main