import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MENU } from '../../data/translations'
import useLang from '../../hooks/useLang'
import pageData from '../../pages.json'
import { validateString } from '../../utils/commonUtils'
import MenuLink from './menuLink'

const Menu = ({ footerRef }) => {
  const [visibility, setVisibility] = useState(false)
  const { lang, translations } = useLang(MENU)

  const handleContactClick = () => {
    setVisibility(false)
    footerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div id='menu-button'
        onClick={() => setVisibility(!visibility)}
        className={validateString(visibility, 'active')}>
        <div className='menu-button-square top-left'></div>
        <div className='menu-button-square top-right'></div>
        <div className='menu-button-square center'></div>
        <div className='menu-button-square bottom-left'></div>
        <div className='menu-button-square bottom-right'></div>
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
