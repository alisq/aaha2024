import { forwardRef } from 'react'
import { CLS, CLSES, CSS_ID } from '../../constants/styleConstants'
import { FOOTER } from '../../data/translations'
import useLang from '../../hooks/useLang'
import { joinClasses } from '../../utils/styleUtils'
import Anchor from '../common/anchor'

const Footer = forwardRef(function Footer(_, ref) {
  const { lang, translations } = useLang(FOOTER)

  // TODO feed footer link from menu API
  return (
    <section id={CSS_ID.CONTACT} className={CLS.INVERSE} ref={ref}>
      <div className={CLS.CONTAINER}>
        <div className={CLS.ROW}>
          <div className={CLSES.FOUR_COLUMNS}>
            <h3>{translations.notForSale}</h3>
            <p>{translations.description}</p>
          </div>
          <div className={joinClasses(CLSES.FOUR_COLUMNS, CLS.TEXT_CENTER)}>
            <h3><Anchor to='mailto:info@aaha.ca'>info@aaha.ca</Anchor></h3>
            <br />
            <div className={CLS.SOCIALS}>
              <Anchor to='https://www.tiktok.com/@aaha.ca' ><i className='fa-brands fa-tiktok' /></Anchor>&nbsp;&nbsp;
              <Anchor to='https://www.instagram.com/aaha.ca' ><i className='fa-brands fa-instagram' /></Anchor>
            </div>
            <br /><br />
          </div>
          <div className={joinClasses(CLSES.FOUR_COLUMNS, CLS.TEXT_RIGHT)}>
            <span className={joinClasses(CLS.AAHA_TEXT, CLS.BLOCK_CONTAINER)}>
              <Anchor to={`/${lang}`}>{translations.demands}</Anchor>
              <Anchor to={`/${lang}/page/aaha-manifesto`}>{translations.manifesto}</Anchor>
              <Anchor to={`/${lang}/page/collective`}>{translations.collective}</Anchor>
              <Anchor to={`/${lang}/page/exhibition`}>{translations.exhibition}</Anchor>
              <br />
              2023, Architects Against Housing Alienation
            </span>
          </div>
        </div>
      </div>
    </section>
  )

})

export default Footer