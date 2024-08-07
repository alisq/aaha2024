import { useContext, useState } from 'react'
import { CLS, CSS_ID } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import { MENU } from '../../data/translations'
import useLang from '../../hooks/useLang'
import { validateString } from '../../utils/commonUtils'
import MenuLink from './menuLink'
import MenuSquares from './menuSquares'

const Menu = ({ footerRef }) => {
  const [visibility, setVisibility] = useState(false)
  const { lang, translations } = useLang(MENU)
  const { pages, scrollToSection } = useContext(GlobalContext) ?? {}

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
            handleClick={() => {
              setVisibility(false)
              scrollToSection()
            }} />
          {pages?.map((page, i) =>
            <MenuLink
              key={i}
              to={`page/${page.field_id}`}
              title={page.title}
              handleClick={() => {
                setVisibility(false)
                scrollToSection(page.field_id)
              }} />
          )}
          <MenuLink
            title={translations.contact}
            handleClick={handleContactClick} />
          <li>
            <div className={CLS.EMBED_CONTAINER}>
              <iframe src='https://www.youtube.com/embed/WW8PxLUfAww' frameBorder='0' allowFullScreen />
            </div>
          </li>
        </ul>
        <div className={CLS.MENU_RIGHT} />
      </section>
    </>
  )
}

export default Menu
