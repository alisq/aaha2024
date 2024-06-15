import { useState } from 'react'
import pageData from '../pages.json'
import MenuLink from './menuLink'
import useIsEn from '../hooks/useIsEn'
import { Link } from 'react-router-dom'

const Menu = ({ footerRef }) => {
  const [visibility, setVisibility] = useState(false)
  const isEn = useIsEn()

  const handleContactClick = () => {
    setVisibility(false)
    footerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div id='menu-button'
        onClick={() => setVisibility(!visibility)}
        className={visibility ? 'active' : ''}>
        <div className='menu-button-square top-left'></div>
        <div className='menu-button-square top-right'></div>
        <div className='menu-button-square center'></div>
        <div className='menu-button-square bottom-left'></div>
        <div className='menu-button-square bottom-right'></div>
      </div>
      <section id='menu' className={visibility ? 'active' : ''}>
        <ul>
          <li><Link to='/'>{isEn ? 'DEMANDS' : 'DEMANDES'}</Link></li>
          {pageData.map((page, i) =>
            <MenuLink
              key={i}
              to={`page/${page.page_id}`}
              page={page}
              handleClick={() => setVisibility(false)} />
          )}
          <MenuLink
            page={{
              'en': { title: 'CONTACT' },
              'fr': { title: 'CONTACTER' }
            }}
            handleClick={handleContactClick} />
        </ul>
      </section>
    </>
  )
}

export default Menu
