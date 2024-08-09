import { useLayoutEffect, useRef } from 'react'
import ReactGA from 'react-ga'
import usePromise from 'react-promise'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import DemandBody from './components/demand/demandBody'
import Main from './components/main'
import { LANGS } from './constants/commonConstants'
import { GlobalContext } from './contexts/contexts'
import pages from './data/pages'
import useLocationChange from './hooks/useLangChanged'
import apiServices from './services/apiServices'
import { getBrowserLang } from './utils/languageUtils'
import { getUrlParts } from './utils/urlUtils'
import useLang from './hooks/useLang'
import { DEMAND_FIELDS, PAGE_FIELDS } from './constants/apiConstants'
import Page from './components/page'
import { toTop } from './utils/commonUtils'


const OUR_TRACKING_ID = 'G-8JJ40D5L38'
ReactGA.initialize(OUR_TRACKING_ID)

const App = () => {
  const location = useLocation()
  const locationChangeRef = useLocationChange()

  const { value } = usePromise(apiServices.data)

  const browserLang = getBrowserLang()
  const fallbackLang = LANGS.includes(browserLang) ? browserLang : LANGS[0]
  const { lang } = useLang() ?? { lang: fallbackLang }

  const sectionRef = useRef()
  const scrollToSection = id => {
    const { content } = getUrlParts(location)
    if (!id) toTop()
    if (content === id)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useLayoutEffect(() => {
    const urlParts = getUrlParts(location)
    const { category, content } = urlParts
    if (
      value &&
      !category &&
      !content &&
      !locationChangeRef.current.lang &&
      locationChangeRef.current.url
    ) toTop()
  }, [value, location])

  const data = value?.[lang]


  return (
    <GlobalContext.Provider value={{ ...data, scrollToSection }}>
      <Routes location={location}>
        {LANGS.map((lang, i) =>
          <Route
            key={i}
            path={lang}
            element={<Main />}>
            <Route index element={null} />
            {data?.demands
              .map(data => <Route
                key={data.nid}
                path={`demand/${data[DEMAND_FIELDS.ID]}`}
                element={<DemandBody data={data} />} />
              )}
            {data?.pages
              .map((page, i) =>
                <Route
                  key={i}
                  path={`page/${page[PAGE_FIELDS.ID]}`}
                  element={
                    <Page
                      ref={sectionRef}
                      id={page[PAGE_FIELDS.ID]}
                      title={page.title}
                      body={page.body}
                      data={page}
                      subpage={pages[page[PAGE_FIELDS.ID]]} />
                  } />)}
          </Route>
        )}
        {value && <Route path='*' element={<Navigate replace to={fallbackLang} />} />}
      </Routes>
    </GlobalContext.Provider>
  )
}



export default App
