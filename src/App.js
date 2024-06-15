import { useEffect, useLayoutEffect, useRef } from 'react'
import ReactGA from 'react-ga'
import usePromise from 'react-promise'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './app.css'
import DemandBody from './components/demandBody'
import PageBody from './components/pageBody'
import { LANGS } from './constants/constants'
import demandData from './demands.json'
import usePrevious from './hooks/usePrevious'
import Main from './main'
import pageData from './pages.json'
import apiServices from './services/apiServices'
import { getBrowserLang } from './utils/languageUtils'
import { getUrlParts } from './utils/urlUtils'
import { GlobalContext } from './contexts/contexts'


const OUR_TRACKING_ID = "G-8JJ40D5L38"
ReactGA.initialize(OUR_TRACKING_ID)


const App = () => {
  const location = useLocation()
  const sectionRef = useRef()
  const prevLocation = usePrevious(location)

  const { value } = usePromise(apiServices.data)
  console.log(value)

  const browserLang = getBrowserLang()
  const fallbackLang = LANGS.includes(browserLang) ? browserLang : LANGS[0]

  useLayoutEffect(() => {
    const urlParts = getUrlParts(location)
    const { lang, category, content } = urlParts

    if (
      prevLocation &&
      location.pathname === prevLocation.pathname &&
      location.hash === prevLocation.hash
    ) return

    if (sectionRef.current) {
      const prevUrlParts = prevLocation ? getUrlParts(prevLocation) : {}
      if (lang === prevUrlParts.lang)
        sectionRef.current.scrollIntoView({ behavior: 'smooth' })
    } else if (!category && !content)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location])

  return (
    <GlobalContext.Provider value={value}>
      <Routes location={location}>
        {LANGS.map((lang, i) =>
          <Route
            path={lang}
            element={<Main currentLang={lang} />}
            key={i}>
            <Route index element={null} />
            {demandData.map((demand, i) =>
              <Route
                path={`demand/${demand.demand_id}`}
                element={<DemandBody {...demand}
                  ref={sectionRef}
                  nid={i}
                  content={demand[lang]} />}
                key={i} />)}
            {pageData.map((page, i) =>
              <Route
                path={`page/${page.page_id}`}
                element={<PageBody {...page}
                  ref={sectionRef}
                  title={page[lang].title}
                  body={page[lang].body} />}
                key={i} />)}
          </Route>
        )}
        <Route path='*' element={<Navigate replace to={fallbackLang} />} />
      </Routes>
    </GlobalContext.Provider>
  )
}



export default App
