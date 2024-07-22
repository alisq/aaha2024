import parse from 'html-react-parser'
import { useLayoutEffect } from 'react'
import ReactGA from 'react-ga'
import usePromise from 'react-promise'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import DemandBody from './components/demand/demandBody'
import Main from './components/main'
import Section from './components/common/section'
import { LANGS } from './constants/commonConstants'
import { GlobalContext } from './contexts/contexts'
import pages from './data/pages'
import useLocationChange from './hooks/useLangChanged'
import pageData from './pages.json'
import apiServices from './services/apiServices'
import { getBrowserLang } from './utils/languageUtils'
import { getUrlParts } from './utils/urlUtils'
import useLang from './hooks/useLang'
import { DEMAND_FIELDS } from './constants/apiConstants'
import Page from './components/page'


const OUR_TRACKING_ID = 'G-8JJ40D5L38'
ReactGA.initialize(OUR_TRACKING_ID)

const App = () => {
  const location = useLocation()
  const locationChangeRef = useLocationChange()

  const { value } = usePromise(apiServices.data)

  const browserLang = getBrowserLang()
  const fallbackLang = LANGS.includes(browserLang) ? browserLang : LANGS[0]
  const { lang } = useLang() ?? { lang: fallbackLang }

  useLayoutEffect(() => {
    const urlParts = getUrlParts(location)
    const { category, content } = urlParts
    if (
      value &&
      !category &&
      !content &&
      !locationChangeRef.current.lang &&
      locationChangeRef.current.url
    )
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [value, location])

  const data = value?.[lang]

  const hardFixPages = ['aaha-manifesto', 'manifesto',]
  return (
    <GlobalContext.Provider value={data}>
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
            {pageData
              .filter(page => hardFixPages.includes(page.page_id))
              .map((page, i) =>
                <Route
                  key={i}
                  path={`page/${page.page_id}`}
                  element={
                    <Section
                      id={page.page_id}
                      title={page[lang].title}
                      center={<div>{parse(page[lang].body)}</div>}>
                      {pages[page.page_id]}
                    </Section>
                  } />)}
            {data?.pages
              .filter(page => !hardFixPages.includes(page.field_id))
              .map((page, i) =>
                <Route
                  key={i}
                  path={`page/${page.field_id}`}
                  element={
                    <Page
                      id={page.field_id}
                      title={page.title}
                      body={page.body}
                      data={page}
                      subpage={pages[page.field_id]} />
                  } />)}
          </Route>
        )}
        {value && <Route path='*' element={<Navigate replace to={fallbackLang} />} />}
      </Routes>
    </GlobalContext.Provider>
  )
}



export default App
