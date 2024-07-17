import { useState } from 'react'
import { CLS, CSS_ID } from '../../constants/styleConstants'
import { MENU } from '../../data/translations'
import useLang from '../../hooks/useLang'
import pageData from '../../pages.json'
import { validateString } from '../../utils/commonUtils'
import MenuLink from './menuLink'
import MenuSquares from './menuSquares'

const Menu = ({ footerRef }) => {
  const [visibility, setVisibility] = useState(false)
  const { lang, translations } = useLang(MENU)

  const handleContactClick = () => {
    setVisibility(false)
    footerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <MenuSquares
        handleClick={() => setVisibility(!visibility)}
        className={validateString(visibility, CLS.ACTIVE)} />
      <section id={CSS_ID.MENU} className={validateString(visibility, CLS.ACTIVE)}>
        <ul>
          <MenuLink
            title={translations.demands}
            to={`/${lang}`}
            handleClick={() => setVisibility(false)} />
          {pageData.map((page, i) => 
            <MenuLink
              key={i}
              to={`page/${page.page_id}`}
              title={page[lang].title}
              handleClick={() => setVisibility(false)} />
          )}
          <MenuLink
            title={translations.contact}
            handleClick={handleContactClick} />
          <li>
            <div className='embedContainer'>
              <iframe src='https://www.youtube.com/embed/WW8PxLUfAww' frameBorder='0' allowFullScreen />
            </div>
          </li>
        </ul>

        <div className='menuRight'>
       
        </div>
      </section>
    </>
  )
}

export default Menu
