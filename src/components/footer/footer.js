import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import useLang from '../../hooks/useLang'
import { FOOTER } from '../../data/translations'
import { CLS, CLSES } from '../../constants/styleConstants'
import { joinClasses } from '../../utils/styleUtils'

const Footer = forwardRef(function Footer(_, ref) {
  const { lang, translations } = useLang(FOOTER)

  return (
    <section id='contact' className={CLS.INVERSE} ref={ref}>
      <div className={CLS.CONTAINER}>
        <div className={CLS.ROW}>
          <div className={CLSES.FOUR_COLUMNS}>
            <h3>{translations.notForSale}</h3>
            <p>{translations.description}</p>
          </div>
          <div className={joinClasses(CLSES.FOUR_COLUMNS, CLS.TEXT_CENTER)}>
            <h3>
              <Link to='mailto:info@aaha.ca'>info@aaha.ca</Link>
            </h3>
            <br />
            <div className={CLS.SOCIALS}>
              <Link to='https://www.tiktok.com/@aaha.ca' target='_blank'><i className='fa-brands fa-tiktok' /></Link>&nbsp;&nbsp;
              <Link to='https://www.instagram.com/aaha.ca' target='_blank'><i className='fa-brands fa-instagram' /></Link>
            </div>
            <h3>
              <Link className={CLS.AAHA_TEXT} to='https://www.dropbox.com/sh/v45fyvebyivi7g8/AABwz65YK1-10i8TTwmcSdL2a?dl=0' target='_blank'>
                {translations.pressKit}
              </Link>
            </h3>
            <br /><br />
          </div>
          <div className={joinClasses(CLSES.FOUR_COLUMNS, CLS.TEXT_RIGHT)}>
            <span className={CLS.AAHA_TEXT}>
              <Link to={`/${lang}`}>{translations.demands}</Link><br />
              <Link to={`/${lang}/page/aaha-manifesto`}>{translations.manifesto}</Link><br />
              <Link to={`/${lang}/page/collective`}>{translations.collective}</Link><br />
              <Link to={`/${lang}/page/exhibition`}>{translations.exhibition}</Link>
              <br /><br />
              2023, Architects Against Housing Alienation
            </span>
          </div>
        </div>
      </div>
    </section>
  )

})

export default Footer