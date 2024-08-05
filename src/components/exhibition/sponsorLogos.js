import { CLS, CLSES } from '../../constants/styleConstants'
import { EXHIBITION } from '../../data/translations'
import useLang from '../../hooks/useLang'
import { ReactComponent as LogoAFBC } from '../../svg/LogoAFBC.svg'
import { ReactComponent as LogoCCA } from '../../svg/LogoCCA.svg'
import { ReactComponent as LogoFed } from '../../svg/LogoFed.svg'
import { ReactComponent as LogoOAA } from '../../svg/LogoOAA.svg'
import { ReactComponent as LogoRAIC } from '../../svg/LogoRAIC.svg'
import { ReactComponent as LogoSALA } from '../../svg/LogoSALA.svg'
import { ReactComponent as LogoUW } from '../../svg/LogoUW.svg'
import SponsorLogo from './sponsorLogo'

const SponsorLogos = () => {
  const { translations } = useLang(EXHIBITION)
  return (
    <>
      <h3 className={CLSES.SMALL_HEADER}>{translations.sponsors}</h3>
      <div className={CLS.PARTNERS}>
        <h4>{translations.commissioner}</h4>
        <SponsorLogo to='https://canadacouncil.ca/' id='logoCCA' Svg={LogoCCA} />
        <h4>{translations.primarySponsor}</h4>
        <SponsorLogo to='https://sala.ubc.ca/' id='logoSALA' Svg={LogoSALA} />
        <h4>{translations.coSponsor}</h4>
        <SponsorLogo to='https://uwaterloo.ca/architecture/' id='logoUW' Svg={LogoUW} />
        <h4>{translations.sponsors}</h4>
        <SponsorLogo to='https://raic.org/' id='logoRAIC' Svg={LogoRAIC} />
        <div className={CLS.THIRDS}>
          <SponsorLogo to='https://www.oaa.on.ca/' id='logoOAA' Svg={LogoOAA} />
          <SponsorLogo to='https://www.architecturefoundationbc.ca/' id='logoAFBC' Svg={LogoAFBC} />
          <SponsorLogo to='https://canadacouncil.ca/' id='logoFed' Svg={LogoFed} />
        </div>
      </div>
    </>
  )
}

export default SponsorLogos