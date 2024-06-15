import { Link } from 'react-router-dom'
import useIsEn from '../hooks/useIsEn'
import { ReactComponent as LogoAFBC } from '../svg/LogoAFBC.svg'
import { ReactComponent as LogoCCA } from '../svg/LogoCCA.svg'
import { ReactComponent as LogoFed } from '../svg/LogoFed.svg'
import { ReactComponent as LogoOAA } from '../svg/LogoOAA.svg'
import { ReactComponent as LogoRAIC } from '../svg/LogoRAIC.svg'
import { ReactComponent as LogoSALA } from '../svg/LogoSALA.svg'
import { ReactComponent as LogoUW } from '../svg/LogoUW.svg'

const Logos = () => {
  const isEn = useIsEn()
  return (
    <>
      <h3 className='text-center'>{isEn ? 'Sponsors' : 'Commanditaires'}</h3>
      <div className='partners'>
        <h4>{isEn ? 'Commissioner ' : 'Organisateur'} </h4>
        <Link to='https://canadacouncil.ca/' target='_blank'>
          <LogoCCA className='footerLogo' id='logoCCA' />
        </Link>

        <h4>{isEn ? 'Primary Presenting Sponsor' : 'Commanditaire présentateur principal'} </h4>
        <Link to='https://sala.ubc.ca/' target='_blank'>
          <LogoSALA className='footerLogo' id='logoSALA' />
        </Link>
        <br /><br />

        <h4>{isEn ? 'Co-Presenting Sponsor ' : 'Commanditaire co-présentateur'} </h4>
        <Link to='https://uwaterloo.ca/architecture/' target='_blank'>
          <LogoUW className='footerLogo' id='logoUW' />
        </Link>

        <br /><br />

        <h4>{isEn ? 'Sponsors' : 'Commanditaires'} </h4>
        <Link to='https://raic.org/' target='_blank'>
          <LogoRAIC className='footerLogo' id='logoRAIC' />
        </Link>

        <div className='thirds'>
          <div>
            <Link to='https://www.oaa.on.ca/' target='_blank'>
              <LogoOAA className='footerLogo' id='logoOAA' />
            </Link>
          </div>
          <div>
            <Link to='https://www.architecturefoundationbc.ca/' target='_blank'>
              <LogoAFBC className='footerLogo' id='logoAFBC' />
            </Link>
          </div>
          <div>
            <Link to='https://canadacouncil.ca/' target='_blank'>
              <LogoFed className='footerLogo' id='logoFed' />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Logos