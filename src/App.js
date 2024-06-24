import parse from 'html-react-parser'
import { useLayoutEffect } from 'react'
import ReactGA from 'react-ga'
import usePromise from 'react-promise'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import DemandBody from './components/demand/demandBody'
import Main from './components/main'
import Columns from './components/common/section'
import { LANGS } from './constants/commonConstants'
import { GlobalContext } from './contexts/contexts'
import pages from './data/pages'
import useLocationChange from './hooks/useLangChanged'
import pageData from './pages.json'
import apiServices from './services/apiServices'
import { getBrowserLang } from './utils/languageUtils'
import { getUrlParts } from './utils/urlUtils'


const OUR_TRACKING_ID = 'G-8JJ40D5L38'
ReactGA.initialize(OUR_TRACKING_ID)

const App = () => {
  const location = useLocation()
  const locationChangeRef = useLocationChange()

  const { value } = usePromise(apiServices.data)

  const browserLang = getBrowserLang()
  const fallbackLang = LANGS.includes(browserLang) ? browserLang : LANGS[0]

  useLayoutEffect(() => {
    const urlParts = getUrlParts(location)
    const { category, content } = urlParts

    if (
      !category &&
      !content &&
      !locationChangeRef.current.lang &&
      locationChangeRef.current.url
    )
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [value, location])

  return (
    <GlobalContext.Provider value={value}>
      <Routes location={location}>
        {LANGS.map((lang, i) =>
          <Route
            key={i}
            path={lang}
            element={<Main currentLang={lang} />}>
            <Route index element={null} />
            {value?.demands[lang]
              .map(data => <Route
                key={data.nid}
                path={`demand/${data.field_demand_id}`}
                element={<DemandBody data={data} />} />
              )}
            {pageData.map((page, i) =>
              <Route
                key={i}
                path={`page/${page.page_id}`}
                element={
                  <Columns
                    id={page.page_id}
                    title={page[lang].title}
                    center={<div>{parse(page[lang].body)}</div>}>
                    {pages[page.page_id]}
                  </Columns>
                } />)}
          </Route>
        )}
        {value && <Route path='*' element={<Navigate replace to={fallbackLang} />} />}
      </Routes>
    </GlobalContext.Provider>
  )
}



export default App
