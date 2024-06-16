import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MENU } from '../../data/translations'
import useLang from '../../hooks/useLang'
import pageData from '../../pages.json'
import { validateString } from '../../utils/commonUtils'
import MenuLink from './menuLink'
import { joinClasses } from '../../utils/styleUtils'
import { CLS } from '../../constants/styleConstants'

const Menu = ({ footerRef }) => {
  const [visibility, setVisibility] = useState(false)
  const { lang, translations } = useLang(MENU)

  const handleContactClick = () => {
    setVisibility(false)
    footerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getMenuSquareClass = direction => joinClasses(CLS.MENU_BUTTON_SQUARE, direction)
  return (
    <>
      <div id='menu-button'
        onClick={() => setVisibility(!visibility)}
        className={validateString(visibility, 'active')}>
        <div className={getMenuSquareClass(CLS.TOP_LEFT)}></div>
        <div className={getMenuSquareClass(CLS.TOP_RIGHT)}></div>
        <div className={getMenuSquareClass(CLS.CENTER)}></div>
        <div className={getMenuSquareClass(CLS.BOTTOM_LEFT)}></div>
        <div className={getMenuSquareClass(CLS.BOTTOM_RIGHT)}></div>
      </div>
      <section id='menu' className={validateString(visibility, 'active')}>
        <ul>
          <li><Link to='/'>{translations.demands}</Link></li>
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
        </ul>
      </section>
    </>
  )
}

export default Menu
