import { forwardRef, useContext } from 'react'
import { CLS, CLSES, CSS_ID } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/contexts'
import { FOOTER } from '../../data/translations'
import useLang from '../../hooks/useLang'
import { joinClasses } from '../../utils/styleUtils'
import Anchor from '../common/anchor'
import parserServices from '../../services/parserServices'

const Footer = forwardRef(function Footer(_, ref) {
  const { lang, translations } = useLang(FOOTER)
  const { pages, scrollToSection } = useContext(GlobalContext) ?? {}
  return (
    <section id={CSS_ID.CONTACT} className={CLS.INVERSE} ref={ref}>
      <div className={CLS.CONTAINER}>
        <div className={CLS.ROW}>
          <div className={CLSES.FOUR_COLUMNS}>
            <h3>{translations.notForSale}</h3>
            <p>{parserServices.basicParse(translations.description)}</p>
          </div>
          <div className={joinClasses(CLSES.FOUR_COLUMNS, CLS.TEXT_CENTER)}>
            <h3><Anchor to='mailto:info@aaha.ca'>info@aaha.ca</Anchor></h3>
            <div className={CLS.SOCIALS}>
              <Anchor to='https://www.tiktok.com/@aaha.ca' ><i className='fa-brands fa-tiktok' /></Anchor>&nbsp;&nbsp;
              <Anchor to='https://www.instagram.com/aaha.ca' ><i className='fa-brands fa-instagram' /></Anchor>
            </div>
          </div>
          <div className={joinClasses(CLSES.FOUR_COLUMNS, CLS.TEXT_RIGHT)}>
            <span className={joinClasses(CLS.AAHA_TEXT, CLS.BLOCK_CONTAINER)}>
              <Anchor to={`/${lang}`} onClick={() => scrollToSection()}>{translations.demands}</Anchor>
              {pages?.map((page, i) =>
                <Anchor
                  key={i}
                  to={`/${lang}/page/${page.field_id}`}
                  onClick={() => scrollToSection(page.field_id)}>
                  {page.title.toLocaleUpperCase()}
                </Anchor>
              )}
              <p>2023, Architects Against Housing Alienation</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  )

})

export default Footer