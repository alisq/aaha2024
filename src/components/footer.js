import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import useIsEn from '../hooks/useIsEn'
import useLang from '../hooks/useLang'

const Footer = forwardRef((_, ref) => {
  const isEn = useIsEn()
  const lang = useLang()
  return (
    <section id='contact' className='inverse' ref={ref}>
      <div className='container'>
        <div className='row'>
          <div className='four columns'>
            <h3>{isEn ? 'Not for Sale!' : 'Pas à vendre!'}</h3>
            <p>
              {isEn ?
                'We are Architects Against Housing Alienation and we believe the current housing system in c\\a\\n\\a\\d\\a must be abolished!' :
                'Nous sommes Architects Against Housing Alienation (AAHA) et nous croyons que le système du logement actuel au c\\a\\n\\a\\d\\a doit être aboli!'}
            </p>
          </div>
          <div className='four columns text-center'>
            <h3>
              <Link to='mailto:info@aaha.ca'>info@aaha.ca</Link>
            </h3>
            <br />
            <div className='socials'>
              <Link to='https://www.tiktok.com/@aaha.ca' target='_blank'><i className='fa-brands fa-tiktok' /></Link>&nbsp;&nbsp;
              <Link to='https://www.instagram.com/aaha.ca' target='_blank'><i className='fa-brands fa-instagram' /></Link>
            </div>
            <h3>
              <Link className='aaha-text' to='https://www.dropbox.com/sh/v45fyvebyivi7g8/AABwz65YK1-10i8TTwmcSdL2a?dl=0' target="_blank">
                {isEn ? 'Download Press Kit' : 'Télécharger le dossier de presse.'}
              </Link>
            </h3>
            <br /><br />
          </div>
          <div className='four columns text-right'>
            <span className='aaha-text'>
              <Link to={`/${lang}`}>{isEn ? 'DEMANDS' : 'DEMANDES'}</Link><br />
              <Link to={`/${lang}/page/aaha-manifesto`}>{isEn ? 'MANIFESTO' : 'MANIFESTE'}</Link><br />
              <Link to={`/${lang}/page/collective`}>{isEn ? 'COLLECTIVE' : 'COLLECTIF'}</Link><br />
              <Link to={`/${lang}/page/exhibition`}>{isEn ? 'EXHIBITION' : 'EXHIBITION'}</Link>
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